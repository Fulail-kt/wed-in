import { g as addAttribute, h as renderHead, s as renderSlot, u as renderTemplate, w as createAstro } from "./server_C_mbWrjf.mjs";
import { t as createComponent } from "./compiler_DNGa_OgE.mjs";
//#region src/config/wedding.ts
var weddingConfig = {
	groom: "groom",
	groomParents: "Son of Mr. & Mrs. Name",
	bride: "bride",
	brideParents: "Daughter of Mr. & Mrs. Name",
	coupleNames: "Groom & Bride",
	weddingDate: /* @__PURE__ */ new Date("2026-08-30T10:00:00+05:30"),
	weddingDateDisplay: "August 30, 2026",
	weddingDayName: "SUNDAY",
	hijriDate: "17 Rabi'al Awwal 1448",
	ceremonyTime: "10:00 AM",
	ceremonyVenue: "MALABAR MARINA",
	ceremonyAddress: "Kottakkal, Malappuram, Kerala",
	ceremonyMapUrl: "https://maps.google.com/?q=Kottakkal+Malappuram",
	get googleCalendarUrl() {
		return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${this.coupleNames} Wedding`)}&dates=20260830T100000Z/20260830T160000Z&details=${encodeURIComponent(`You are invited to the Nikah ceremony of ${this.coupleNames} at ${this.ceremonyVenue}, ${this.ceremonyAddress}.`)}&location=${encodeURIComponent(this.ceremonyAddress)}`;
	},
	rsvpDeadline: "August 28, 2026",
	musicTracks: [{
		title: "Wedding",
		url: "/music/wedding.mp3"
	}, {
		title: "Asalayavale",
		url: "/music/asalayavale.mp3"
	}]
};
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const defaultTitle = `${weddingConfig.coupleNames} — Wedding Invitation`;
	const defaultDescription = `You are cordially invited to the wedding celebration of ${weddingConfig.coupleNames} on ${weddingConfig.weddingDateDisplay}.`;
	const { title = defaultTitle, description = defaultDescription, guestName } = Astro.props;
	const pageTitle = guestName ? `An Exclusive Invitation for ${guestName} | ${weddingConfig.coupleNames}` : title;
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#F9F7F2"><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><link rel="icon" href="/favicon.ico"><title>${pageTitle}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="min-h-screen antialiased">${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/Fulail/Desktop/wedding-in/src/layouts/Layout.astro", void 0);
//#endregion
export { weddingConfig as n, $$Layout as t };
