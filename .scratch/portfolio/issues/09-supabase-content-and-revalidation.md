# 09 — Supabase Content, seed and revalidation

**What to build:** The live site reads Content from Supabase, and when the owner edits a row in the Supabase dashboard the site updates within seconds without a deploy. Seed data (Polish Content) is loaded from the owner's project descriptions and the approved Skill list.

**Blocked by:** 04 — Skills section; 06 — Home Projects with "Show more"; 07 — Project page and 404

**Status:** ready-for-agent

**Human in the loop:** the owner creates a free Supabase project and adds its keys as Vercel environment variables; the agent gives step-by-step instructions.

- [ ] Schema as in the spec: profile, skill_categories, skills, projects, project_skills, project_screenshots, contact_messages; required text fields NOT NULL in both Locales; lists as JSON with empty defaults; published flag; sort orders
- [ ] Row-level security: anonymous reads of published Content only; contact_messages not readable or writable anonymously
- [ ] Storage buckets for Screenshots and CVs
- [ ] Migrations and seed kept in the repo; seed contains the Profile, the approved Skills and categories and the six Projects with Polish Content. Because every field is required in both Locales, English columns temporarily repeat the Polish text; ticket 11 replaces them before launch (the site is not public until ticket 13)
- [ ] Supabase source implementing every content module query; source chosen by environment; CI keeps using fixtures
- [ ] Cached, tagged reads; revalidation endpoint secured by a shared secret; Supabase database webhook on Content tables calls it
- [ ] Vercel Cron calls a keep-alive endpoint daily that runs a trivial query
- [ ] Manual check on the preview: editing a Project title in Supabase changes the page within seconds
