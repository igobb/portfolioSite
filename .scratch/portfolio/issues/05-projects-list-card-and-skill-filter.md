# 05 — Projects list, ProjectCard and Skill filter

**What to build:** At `/pl/projects` and `/en/projects` a recruiter sees every published Project as a ProjectCard and can narrow the list by selecting Skills; the selection lives in the URL, shows a count, and has a no-results state with reset.

**Blocked by:** 03 — Content module (fixtures) and hero

**Status:** ready-for-agent

- [ ] Content module query: all published Project cards for a Locale (ordered by sort order) plus the Skills that appear on them; fixtures contain the six approved Projects with their slugs
- [ ] ProjectCard component as on the canvas: folder tab with slug, cover (first Screenshot or striped placeholder), context, two-line title, five-line summary, Metrics block, Skills pinned to the bottom, "Open" last; fixed-height rows so cards align; whole card is a link to the Project page URL
- [ ] Pure Skill filter function with AND semantics over Project cards
- [ ] Filter chips with `aria-pressed`; selection stored in `skill` search params; count "X of N"; selected Skills highlighted on cards; "clear filter" action; no-results state with reset
- [ ] Mobile: single-column cards, horizontally scrollable filter row
- [ ] Vitest: list query (order, published-only, Locale) and the filter function (none, one, several, no match)
- [ ] Playwright: extend the ticket 04 test so clicking a linked Skill on the home page shows that Skill's chip pressed
- [ ] Playwright: selecting two Skills narrows results and updates the URL; a combination with no match shows the empty state and reset restores all
