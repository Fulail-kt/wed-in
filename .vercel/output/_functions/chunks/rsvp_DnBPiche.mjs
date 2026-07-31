import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as getGuest, c as saveGuestRsvp, l as saveUnknownRsvp, n as deleteUnknownRsvp } from "./guests_CO5La-UZ.mjs";
//#region src/pages/api/rsvp.ts
var rsvp_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST
});
var POST = async ({ request }) => {
	try {
		const { guestId, anonymousId, attending, guestCount = 1 } = await request.json();
		const count = attending ? Math.max(1, Math.min(25, Number(guestCount) || 1)) : 0;
		if (guestId) {
			if (!await getGuest(guestId)) return new Response(JSON.stringify({ error: "Guest not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
			await saveGuestRsvp(guestId, attending, count);
		} else if (anonymousId) await saveUnknownRsvp(String(anonymousId), attending, count);
		else return new Response(JSON.stringify({ error: "Guest or anonymous ID required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({
			success: true,
			guestCount: count
		}), { headers: { "Content-Type": "application/json" } });
	} catch {
		return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ request }) => {
	try {
		const { anonymousId } = await request.json();
		if (!anonymousId) return new Response(JSON.stringify({ error: "Anonymous ID required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await deleteUnknownRsvp(String(anonymousId));
		return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
	} catch {
		return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/rsvp@_@ts
var page = () => rsvp_exports;
//#endregion
export { page };
