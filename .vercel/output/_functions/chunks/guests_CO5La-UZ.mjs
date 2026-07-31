import fs from "node:fs";
import nodePath from "node:path";
import { Redis } from "@upstash/redis";
//#region src/lib/env.ts
var cached = null;
function readProjectEnv() {
	if (cached) return cached;
	const out = {};
	try {
		const raw = fs.readFileSync(nodePath.join(process.cwd(), ".env"), "utf8");
		for (const line of raw.split(/\r?\n/)) {
			const t = line.trim();
			if (!t || t.startsWith("#")) continue;
			const i = t.indexOf("=");
			if (i < 0) continue;
			const key = t.slice(0, i).trim();
			let val = t.slice(i + 1).trim();
			if (val.startsWith("\"") && val.endsWith("\"") || val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
			out[key] = val;
		}
	} catch {}
	cached = out;
	return out;
}
function envGet(name, fallback = "") {
	return readProjectEnv()[name] || (typeof import.meta !== "undefined" ? String(Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, {})[name] ?? "") : "") || process.env[name] || fallback;
}
//#endregion
//#region src/lib/redis.ts
var client;
function getRedis() {
	if (client !== void 0) return client;
	const url = envGet("UPSTASH_REDIS_REST_URL");
	const token = envGet("UPSTASH_REDIS_REST_TOKEN");
	if (!url || !token || url.includes("your-db")) {
		client = null;
		return null;
	}
	client = new Redis({
		url,
		token
	});
	return client;
}
//#endregion
//#region src/lib/guests.ts
var IDS_KEY = "wedding:guest_ids";
var UNKNOWN_IDS_KEY = "wedding:unknown_ids";
var guestKey = (id) => `wedding:guest:${id}`;
var unknownKey = (id) => `wedding:unknown:${id}`;
function shortId() {
	return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}
function parseGuest(id, raw) {
	if (!raw || !raw.name) return null;
	const status = raw.status || "pending";
	return {
		id,
		name: String(raw.name),
		status: status === "yes" || status === "no" ? status : "pending",
		count: Number(raw.count) || 0,
		updatedAt: String(raw.updatedAt || "")
	};
}
async function createGuest(name) {
	const redis = getRedis();
	if (!redis) return null;
	const id = shortId();
	const record = {
		name: name.trim(),
		status: "pending",
		count: 0,
		updatedAt: ""
	};
	await redis.sadd(IDS_KEY, id);
	await redis.hset(guestKey(id), record);
	return {
		id,
		...record,
		status: "pending"
	};
}
async function getGuest(id) {
	const redis = getRedis();
	if (!redis) return null;
	return parseGuest(id, await redis.hgetall(guestKey(id)));
}
async function listGuests() {
	const redis = getRedis();
	if (!redis) return [];
	const ids = await redis.smembers(IDS_KEY);
	if (!ids?.length) return [];
	return (await Promise.all(ids.map(async (id) => {
		return parseGuest(id, await redis.hgetall(guestKey(id)));
	}))).filter((g) => g !== null).sort((a, b) => a.name.localeCompare(b.name));
}
async function saveGuestRsvp(id, attending, count) {
	const redis = getRedis();
	if (!redis) return null;
	const existing = await getGuest(id);
	if (!existing) return null;
	const record = {
		name: existing.name,
		status: attending ? "yes" : "no",
		count: attending ? Math.max(1, Math.min(25, count)) : 0,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	await redis.hset(guestKey(id), record);
	return {
		id,
		...record,
		status: record.status
	};
}
function parseUnknown(id, raw) {
	if (!raw || !raw.status) return null;
	const status = raw.status;
	return {
		id,
		status: status === "yes" || status === "no" ? status : "pending",
		count: Number(raw.count) || 0,
		updatedAt: String(raw.updatedAt || "")
	};
}
async function saveUnknownRsvp(id, attending, count) {
	const redis = getRedis();
	if (!redis || !id.trim()) return null;
	const record = {
		status: attending ? "yes" : "no",
		count: attending ? Math.max(1, Math.min(25, count)) : 0,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	await redis.sadd(UNKNOWN_IDS_KEY, id);
	await redis.hset(unknownKey(id), record);
	return {
		id,
		...record,
		status: record.status
	};
}
async function deleteUnknownRsvp(id) {
	const redis = getRedis();
	if (!redis || !id.trim()) return false;
	await redis.srem(UNKNOWN_IDS_KEY, id);
	await redis.del(unknownKey(id));
	return true;
}
async function listUnknownGuests() {
	const redis = getRedis();
	if (!redis) return [];
	const ids = await redis.smembers(UNKNOWN_IDS_KEY);
	if (!ids?.length) return [];
	return (await Promise.all(ids.map(async (id) => {
		return parseUnknown(id, await redis.hgetall(unknownKey(id)));
	}))).filter((r) => r !== null).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
function summarizeUnknown(unknown) {
	let totalAttending = 0;
	let declined = 0;
	for (const u of unknown) if (u.status === "yes") totalAttending += u.count;
	else if (u.status === "no") declined += 1;
	return {
		totalAttending,
		declined,
		total: unknown.length
	};
}
async function getFullSummary() {
	const [guests, unknown] = await Promise.all([listGuests(), listUnknownGuests()]);
	const guestSummary = summarizeGuests(guests);
	const unknownSummary = summarizeUnknown(unknown);
	return {
		guests: guestSummary,
		unknown: unknownSummary,
		totalAttending: guestSummary.totalAttending + unknownSummary.totalAttending,
		declined: guestSummary.declined + unknownSummary.declined,
		pending: guestSummary.pending,
		invited: guestSummary.totalGuests,
		unknownGuests: unknown.length
	};
}
function summarizeGuests(guests) {
	let totalAttending = 0;
	let declined = 0;
	let pending = 0;
	for (const g of guests) if (g.status === "yes") totalAttending += g.count;
	else if (g.status === "no") declined += 1;
	else pending += 1;
	return {
		totalAttending,
		declined,
		pending,
		responded: guests.length - pending,
		totalGuests: guests.length
	};
}
function formatGuestName(name) {
	const trimmed = name.trim();
	if (!trimmed) return trimmed;
	return trimmed.split(/\s+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
//#endregion
export { getGuest as a, saveGuestRsvp as c, getRedis as d, envGet as f, getFullSummary as i, saveUnknownRsvp as l, deleteUnknownRsvp as n, listGuests as o, formatGuestName as r, listUnknownGuests as s, createGuest as t, summarizeGuests as u };
