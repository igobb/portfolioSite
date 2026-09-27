# 04 — Skills section

**What to build:** On the home page, a recruiter sees every Skill grouped into Skill categories in the aligned grid from the canvas, with a legend tile; Skills used in at least one published Project are links to `/projects` filtered by that Skill.

**Blocked by:** 03 — Hero

**Status:** done

- [x] Content module (the first data seam) with a fixture source selected by environment configuration; callers receive Locale-resolved domain objects (no `_pl` / `_en` fields)
- [x] Content module query: Skill categories with their Skills for a Locale, ordered by sort order, each Skill flagged with whether any published Project uses it; fixtures cover the approved Skill list and categories
- [x] Grid of Skill categories with equal-height headings so Skill lists start at the same height; legend tile explaining underlined Skills
- [x] Linked Skills point to the list page with the `skill` search param in the current Locale; Skills without Projects are plain text
- [x] Mobile: categories stacked, Skills wrap inline
- [x] Header "Skills" link scrolls to the section (and navigates to it from other pages)
- [x] Vitest: ordering, Locale resolution and the "has Projects" flag
- [x] Playwright: clicking a linked Skill opens the list page with that Skill selected (asserted through the `skill` search param; ticket 05 adds the filter chips and asserts the pressed chip)
