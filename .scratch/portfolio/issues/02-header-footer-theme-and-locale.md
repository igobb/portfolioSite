# 02 — Header, footer, theme and Locale switch

**What to build:** The site chrome from the canvas: a visitor sees the header (home variant over the diagonal panel, subpage variant with small logo and active link), a mobile menu, and a footer with the source link; they can toggle light/dark (following the system by default, remembered, no flash) and switch PL/EN while staying on the equivalent page.

**Blocked by:** 01 — App skeleton and CI

**Status:** ready-for-agent

- [ ] Header shows email, theme toggle and PL/EN switch on the left; Skills, Portfolio and highlighted Contact on the right; "About" is not shown
- [ ] Mobile header collapses navigation behind an accessible menu button (`aria-expanded`), with email and Contact inside the menu
- [ ] Theme follows `prefers-color-scheme` on first visit, the toggle's choice is remembered, and no wrong-theme flash occurs on load; the site still works when storage is unavailable
- [ ] Locale switch navigates to the same page in the other Locale (localised pathnames `/pl/projekty` ↔ `/en/projects` configured now, even if the pages are placeholders)
- [ ] Footer with copyright and a link to the GitHub repository
- [ ] Icon-only buttons have `aria-label`; focus is visible; contrast ≥ 4.5:1 in both themes
- [ ] Playwright: theme toggle persists across reload; Locale switch keeps the page and changes the URL and UI copy
