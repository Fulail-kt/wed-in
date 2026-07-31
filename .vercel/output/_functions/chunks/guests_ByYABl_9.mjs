import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as getGuest, f as envGet, o as listGuests, t as createGuest, u as summarizeGuests } from "./guests_CO5La-UZ.mjs";
//#region src/pages/api/guests.ts
var guests_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
function isAdmin(key) {
	const secret = envGet("ADMIN_SECRET_KEY");
	return Boolean(secret && key === secret);
}
var GET = async ({ url }) => {
	const key = url.searchParams.get("key");
	const id = url.searchParams.get("id");
	if (id) {
		const guest = await getGuest(id);
		if (!guest) return new Response(JSON.stringify({ error: "Guest not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({ guest }), { headers: { "Content-Type": "application/json" } });
	}
	if (!isAdmin(key)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const guests = await listGuests();
	const summary = summarizeGuests(guests);
	return new Response(JSON.stringify({
		guests,
		summary
	}), { headers: { "Content-Type": "application/json" } });
};
var POST = async ({ request }) => {
	try {
		const { name, key } = await request.json();
		if (!isAdmin(key)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		if (!name?.trim()) return new Response(JSON.stringify({ error: "Name required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const guest = await createGuest(name.trim());
		if (!guest) return new Response(JSON.stringify({ error: "Storage unavailable" }), {
			status: 503,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({ guest }), { headers: { "Content-Type": "application/json" } });
	} catch {
		return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/guests@_@ts
var page = () => guests_exports;
//#endregion
export { page };
