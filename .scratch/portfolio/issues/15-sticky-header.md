# 15 — Sticky header

**What to build:** When a visitor scrolls, the header sticks to the top edge of the viewport on every page, so navigation (Skills, Portfolio, Contact, theme and Locale switch, mobile menu) is always one click away.

**Blocked by:** 02 — Header, footer, theme and Locale switch

**Status:** needs-triage

- [ ] Subpage header (`/projects`, Project page, 404) sticks to the top on scroll, desktop and mobile, with its bottom border and an opaque `paper` background so content doesn't show through
- [ ] Home header sticks too; on desktop it currently sits absolutely and transparently over the hero's diagonal panel (`xl:absolute xl:bg-transparent`), so once the hero scrolls away it needs an opaque background and a bottom border (decide: switch on scroll, or always opaque when stuck); on mobile it keeps the `panel` background
- [ ] Anchor links (`#skills`, `#contact`) still land with the section heading visible below the header (`scroll-margin-top` / `scroll-padding-top`)
- [ ] The open mobile menu still works while the header is stuck
- [ ] Works in light and dark theme; no layout shift when the header becomes stuck; respects reduced motion if any transition is added
- [ ] Playwright: after scrolling down on home and on `/projects` (desktop and mobile), the header is in the viewport at the top; the Skills anchor heading is not covered by the header
- [ ] Design: confirm the stuck state on the Design canvas (not drawn yet)
