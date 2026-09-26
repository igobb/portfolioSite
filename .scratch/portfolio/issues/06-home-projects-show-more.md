# 06 — Home Projects with "Show more"

**What to build:** On the home page a recruiter sees the first three Projects as ProjectCards; "Show more" loads the next three in place until none are left, then disappears; a link leads to the full list with the filter.

**Blocked by:** 05 — Projects list, ProjectCard and Skill filter

**Status:** ready-for-agent

- [ ] Content module query: a page of Project cards (offset, limit 3) with a "has more" flag
- [ ] First page server-rendered; "Show more" calls a Server Action that returns the next page; the browser never talks to Supabase directly
- [ ] Button shows a pending state while loading and is removed when "has more" is false; a load error shows a retry
- [ ] "All projects · filter by Skill" link to the list page
- [ ] Vitest: pagination and "has more" at the boundaries
- [ ] Playwright: with six fixture Projects, one click shows six cards and the button disappears
