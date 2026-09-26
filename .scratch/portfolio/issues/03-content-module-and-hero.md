# 03 — Content module (fixtures) and hero

**What to build:** The home hero driven by real Content: name, the Roles cycling in a typewriter, social links, "See projects" and "Download CV", and the logo on the diagonal panel — read through the content module, which in this ticket has its fixture source and its first query (the Profile).

**Blocked by:** 02 — Header, footer, theme and Locale switch

**Status:** ready-for-agent

- [ ] Content module with a Locale-aware "get Profile" query and a fixture source selected by environment configuration; callers receive Locale-resolved domain objects (no `_pl` / `_en` fields)
- [ ] Hero matches the canvas on desktop (text left, logo on the diagonal panel right) and mobile (logo panel on top, content stacked)
- [ ] Typewriter cycles the Profile's Roles; with `prefers-reduced-motion` it shows the Roles without animation and the cursor doesn't blink
- [ ] Email, GitHub and LinkedIn links from the Profile; "Download CV" links to the Locale's CV and is hidden when no CV is set
- [ ] Vitest: the Profile query returns Locale-resolved values for both Locales from fixtures
- [ ] Playwright: hero shows the name, a Role and working social links in both Locales
