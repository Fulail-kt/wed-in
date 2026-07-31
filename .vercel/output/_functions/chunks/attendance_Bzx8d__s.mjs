import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as getFullSummary } from "./guests_CO5La-UZ.mjs";
//#region src/pages/api/attendance.ts
var attendance_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	const summary = await getFullSummary();
	return new Response(JSON.stringify({
		count: summary.totalAttending,
		attending: summary.totalAttending,
		declined: summary.declined,
		pending: summary.pending,
		responded: summary.guests.responded + summary.unknown.total,
		totalGuests: summary.invited,
		unknownGuests: summary.unknownGuests
	}), { headers: { "Content-Type": "application/json" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/attendance@_@ts
var page = () => attendance_exports;
//#endregion
export { page };
