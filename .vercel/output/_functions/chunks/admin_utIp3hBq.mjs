import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { _ as defineScriptVars, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_C_mbWrjf.mjs";
import { t as createComponent } from "./compiler_DNGa_OgE.mjs";
import { t as $$Layout } from "./Layout_DSJvfRND.mjs";
import { d as getRedis, f as envGet, i as getFullSummary, o as listGuests, s as listUnknownGuests } from "./guests_CO5La-UZ.mjs";
//#region src/pages/admin.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Admin,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Admin = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const adminKey = envGet("ADMIN_SECRET_KEY", "admin");
	const providedKey = Astro.url.searchParams.get("key") ?? "";
	const isAuthorized = providedKey.length > 0 && providedKey === adminKey;
	let guests = [];
	let unknownGuests = [];
	let summary = {
		totalAttending: 0,
		declined: 0,
		pending: 0,
		invited: 0,
		unknownGuests: 0,
		unknownAttending: 0
	};
	let redisOk = false;
	if (isAuthorized) {
		redisOk = getRedis() !== null;
		if (redisOk) {
			const [guestList, unknownList, full] = await Promise.all([
				listGuests(),
				listUnknownGuests(),
				getFullSummary()
			]);
			guests = guestList;
			unknownGuests = unknownList;
			summary = {
				totalAttending: full.totalAttending,
				declined: full.declined,
				pending: full.pending,
				invited: full.invited,
				unknownGuests: full.unknownGuests,
				unknownAttending: full.unknown.totalAttending
			};
		}
	}
	const siteUrl = Astro.url.origin;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Panel — Wedding Invitation" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="min-h-screen w-full flex items-center justify-center px-4 py-12 sm:py-16 bg-[var(--bg-page)]">${!isAuthorized && renderTemplate`<div class="surface-card w-full max-w-md px-8 py-10 text-center"><p class="text-[11px] tracking-[0.28em] uppercase text-[#8A827B] font-medium mb-3">Restricted</p><h1 class="font-serif-title text-3xl text-[#2A2523] mb-3">Admin Access</h1><p class="text-sm text-[#8A827B] mb-6 leading-relaxed">Open with your secret key from <code class="text-[#4A6B53]">.env</code>(<code class="text-[#4A6B53]">ADMIN_SECRET_KEY</code>):</p><code class="block text-xs sm:text-sm text-[#4A6B53] bg-[#EBF2EC] px-4 py-3 rounded-xl break-all">/admin?key=YOUR_ADMIN_SECRET_KEY</code></div>`}${isAuthorized && renderTemplate`<div class="w-full max-w-3xl space-y-5"><div class="text-center mb-6"><p class="text-[11px] tracking-[0.28em] uppercase text-[#8A827B] font-medium mb-2">Restricted access</p><h1 class="font-serif-title text-3xl sm:text-4xl text-[#2A2523]">Admin Dashboard</h1><p class="font-serif-body text-lg italic text-[#8A827B] mt-2">Guest list &amp; RSVP counts</p></div>${!redisOk && renderTemplate`<div class="rounded-2xl border border-[#9E5A64]/30 bg-[#F7ECED] px-4 py-3 text-sm text-[#9E5A64] text-center">Redis not connected — add Upstash env vars in <code>.env</code></div>`}<div class="grid grid-cols-2 sm:grid-cols-4 gap-3"><div class="surface-card px-4 py-5 text-center"><div class="font-serif-title text-3xl text-[#4A6B53]">${summary.totalAttending}</div><p class="text-[10px] tracking-[0.18em] uppercase text-[#8A827B] mt-1">Attending</p></div><div class="surface-card px-4 py-5 text-center"><div class="font-serif-title text-3xl text-[#9E5A64]">${summary.declined}</div><p class="text-[10px] tracking-[0.18em] uppercase text-[#8A827B] mt-1">Declined</p></div><div class="surface-card px-4 py-5 text-center"><div class="font-serif-title text-3xl text-[#8A827B]">${summary.pending}</div><p class="text-[10px] tracking-[0.18em] uppercase text-[#8A827B] mt-1">Pending</p></div><div class="surface-card px-4 py-5 text-center"><div class="font-serif-title text-3xl text-[#2A2523]">${summary.invited}</div><p class="text-[10px] tracking-[0.18em] uppercase text-[#8A827B] mt-1">Invited</p></div></div>${summary.unknownGuests > 0 && renderTemplate`<div class="surface-card px-4 py-3 text-center text-sm text-[#8A827B]">+ ${summary.unknownGuests} unknown visitor${summary.unknownGuests === 1 ? "" : "s"}(${summary.unknownAttending} attending)</div>`}<div class="surface-card px-6 py-7 sm:px-8"><h2 class="font-serif-title text-xl text-[#2A2523] mb-2">Add guest</h2><p class="text-xs text-[#8A827B] mb-4">Creates guest in DB → link uses ID only (<code>/?g=abc123</code>)</p><div class="flex flex-col sm:flex-row gap-3"><input id="guest-name-input" type="text" placeholder="e.g. Uncle Sam" class="flex-1 border border-[#E8E2D8] bg-white rounded-xl px-4 py-3 text-sm text-[#2A2523] placeholder:text-[#8A827B]/60 outline-none focus:border-[#4A6B53] transition-colors"><button id="create-guest-btn" type="button" class="bg-[#4A6B53] hover:bg-[#3D5A44] text-white text-xs tracking-[0.14em] uppercase font-semibold px-5 py-3 rounded-xl transition-colors shrink-0">Create &amp; Copy Link</button></div><p id="create-msg" class="text-xs mt-3 hidden text-center"></p></div><div class="surface-card px-4 py-5 sm:px-6 overflow-x-auto"><h2 class="font-serif-title text-xl text-[#2A2523] mb-4 px-2">Guest list</h2>${guests.length === 0 ? renderTemplate`<p class="text-sm text-[#8A827B] text-center py-8">No guests yet — add one above.</p>` : renderTemplate`<table class="w-full text-sm"><thead><tr class="text-[10px] tracking-[0.15em] uppercase text-[#8A827B] border-b border-[#E8E2D8]"><th class="text-left py-3 px-2 font-medium">Name</th><th class="text-left py-3 px-2 font-medium">Status</th><th class="text-center py-3 px-2 font-medium">Count</th><th class="text-right py-3 px-2 font-medium">Link</th></tr></thead><tbody id="guest-table-body">${guests.map((g) => renderTemplate`<tr class="border-b border-[#E8E2D8]/60 last:border-0"${addAttribute(g.id, "data-guest-id")}><td class="py-3 px-2 text-[#2A2523]">${g.name}</td><td class="py-3 px-2">${g.status === "yes" && renderTemplate`<span class="text-[10px] tracking-wider uppercase font-semibold text-[#4A6B53] bg-[#EBF2EC] px-2 py-1 rounded-lg">Yes</span>`}${g.status === "no" && renderTemplate`<span class="text-[10px] tracking-wider uppercase font-semibold text-[#9E5A64] bg-[#F7ECED] px-2 py-1 rounded-lg">No</span>`}${g.status === "pending" && renderTemplate`<span class="text-[10px] tracking-wider uppercase font-semibold text-[#8A827B] bg-[#F9F7F2] px-2 py-1 rounded-lg">Pending</span>`}</td><td class="py-3 px-2 text-center font-serif-title text-lg text-[#2A2523]">${g.status === "yes" ? g.count : "—"}</td><td class="py-3 px-2 text-right"><button type="button" class="copy-link-btn text-[10px] tracking-wider uppercase text-[#4A6B53] hover:text-[#2A2523] cursor-pointer"${addAttribute(`${siteUrl}/?g=${g.id}`, "data-link")}>Copy</button></td></tr>`)}</tbody></table>`}</div><div class="surface-card px-4 py-5 sm:px-6 overflow-x-auto"><h2 class="font-serif-title text-xl text-[#2A2523] mb-1 px-2">Unknown visitors</h2><p class="text-xs text-[#8A827B] mb-4 px-2">No personal link — tracked by browser ID</p>${unknownGuests.length === 0 ? renderTemplate`<p class="text-sm text-[#8A827B] text-center py-6">None yet.</p>` : renderTemplate`<table class="w-full text-sm"><thead><tr class="text-[10px] tracking-[0.15em] uppercase text-[#8A827B] border-b border-[#E8E2D8]"><th class="text-left py-3 px-2 font-medium">ID</th><th class="text-left py-3 px-2 font-medium">Status</th><th class="text-center py-3 px-2 font-medium">Count</th><th class="text-right py-3 px-2 font-medium">When</th></tr></thead><tbody>${unknownGuests.map((u) => renderTemplate`<tr class="border-b border-[#E8E2D8]/60 last:border-0"><td class="py-3 px-2 text-[#8A827B] font-mono text-xs">${u.id}</td><td class="py-3 px-2">${u.status === "yes" && renderTemplate`<span class="text-[10px] tracking-wider uppercase font-semibold text-[#4A6B53] bg-[#EBF2EC] px-2 py-1 rounded-lg">Yes</span>`}${u.status === "no" && renderTemplate`<span class="text-[10px] tracking-wider uppercase font-semibold text-[#9E5A64] bg-[#F7ECED] px-2 py-1 rounded-lg">No</span>`}</td><td class="py-3 px-2 text-center font-serif-title text-lg text-[#2A2523]">${u.status === "yes" ? u.count : "—"}</td><td class="py-3 px-2 text-right text-[10px] text-[#8A827B]">${u.updatedAt ? new Date(u.updatedAt).toLocaleDateString() : "—"}</td></tr>`)}</tbody></table>`}</div></div>`}</main>` })}<script>(function(){${defineScriptVars({
		siteUrl,
		adminKey: providedKey
	})}
  const createBtn = document.getElementById('create-guest-btn');
  const input = document.getElementById('guest-name-input');
  const createMsg = document.getElementById('create-msg');

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  function showMsg(text, ok = true) {
    if (!createMsg) return;
    createMsg.textContent = text;
    createMsg.className = \`text-xs mt-3 text-center \${ok ? 'text-[#4A6B53]' : 'text-[#9E5A64]'}\`;
    createMsg.classList.remove('hidden');
    setTimeout(() => createMsg.classList.add('hidden'), 4000);
  }

  createBtn?.addEventListener('click', async () => {
    const name = input?.value?.trim();
    if (!name) return;

    createBtn.disabled = true;
    createBtn.textContent = 'Creating…';

    try {
      const res = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, key: adminKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        showMsg(data.error || 'Failed', false);
        return;
      }

      const link = \`\${siteUrl}/?g=\${data.guest.id}\`;
      await copyText(link);
      showMsg(\`Created \${data.guest.name} — link copied!\`);
      if (input) input.value = '';
      location.reload();
    } catch {
      showMsg('Network error', false);
    } finally {
      createBtn.disabled = false;
      createBtn.textContent = 'Create & Copy Link';
    }
  });

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') createBtn?.click();
  });

  document.querySelectorAll('.copy-link-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const link = btn.getAttribute('data-link');
      if (!link) return;
      await copyText(link);
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  });
})();<\/script>`;
}, "C:/Users/Fulail/Desktop/wedding-in/src/pages/admin.astro", void 0);
var $$file = "C:/Users/Fulail/Desktop/wedding-in/src/pages/admin.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin@_@astro
var page = () => admin_exports;
//#endregion
export { page };
