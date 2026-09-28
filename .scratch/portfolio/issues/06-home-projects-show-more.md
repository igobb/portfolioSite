# 06 — Home Projects with "Show more"

**What to build:** On the home page a recruiter sees the first three Projects as ProjectCards; "Show more" loads the next three in place until none are left, then disappears; a link leads to the full list with the filter.

**Blocked by:** 05 — Projects list, ProjectCard and Skill filter

**Status:** done

- [x] Content module query: a page of Project cards (offset, limit 3) with a "has more" flag
- [x] First page server-rendered; "Show more" calls a Server Action that returns the next page; the browser never talks to Supabase directly
- [x] Button shows a pending state while loading and is removed when "has more" is false; a load error shows a retry
- [x] "All projects · filter by Skill" link to the list page
- [x] Vitest: pagination and "has more" at the boundaries
- [x] Playwright: with six fixture Projects, one click shows six cards and the button disappears
