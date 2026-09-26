# 11 — English version

**What to build:** A visitor reading `/en` sees a complete, natural English site: all UI copy and all Content (Skill categories, Projects, Screenshot alt texts) translated from the Polish and approved by the owner.

**Blocked by:** 04 — Skills section; 06 — Home Projects with "Show more"; 07 — Project page and 404; 08 — Contact section and form (fakes); 09 — Supabase Content, seed and revalidation

**Status:** ready-for-agent

**Human in the loop:** the owner reviews and approves the English texts before merge.

- [ ] `messages/en.json` complete; no Polish UI copy on any `/en` page
- [ ] English Content written for every Project (keeping Metrics and facts identical to the Polish) and Skill categories; applied to the Supabase seed/data and to the fixtures
- [ ] English Roles in the Profile constant reviewed
- [ ] Playwright: key pages in `/en` contain no strings from `pl.json`
