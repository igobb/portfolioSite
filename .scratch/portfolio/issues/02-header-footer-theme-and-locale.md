# 02 — Header, footer, theme and Locale switch

**What to build:** The site chrome from the canvas: a visitor sees the header (home variant over the diagonal panel, subpage variant with small logo and active link), a mobile menu, and a footer with the source link; they can toggle light/dark (following the system by default, remembered, no flash) and switch PL/EN while staying on the equivalent page.

**Blocked by:** 01 — App skeleton and CI

**Status:** done

- [x] Header shows email, theme toggle and PL/EN switch on the left; Skills, Portfolio and highlighted Contact on the right; "About" is not shown
- [x] Mobile header collapses navigation behind an accessible menu button (`aria-expanded`), with email and Contact inside the menu
- [x] Theme follows `prefers-color-scheme` on first visit, the toggle's choice is remembered, and no wrong-theme flash occurs on load; the site still works when storage is unavailable
- [x] Locale switch navigates to the same page in the other Locale (`/pl/projects` ↔ `/en/projects`: paths are English in both Locales, only the prefix changes; the list page is a placeholder for now)
- [x] Footer with copyright and a link to the GitHub repository
- [x] Icon-only buttons have `aria-label`; focus is visible; contrast ≥ 4.5:1 in both themes
- [x] Playwright: theme toggle persists across reload; Locale switch keeps the page and changes the URL and UI copy
