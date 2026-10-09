# 13 — Production launch

**What to build:** The portfolio is live at `https://portfolio.tgolab.dev` with production Content, privacy-friendly analytics and a protected `master`.

**Blocked by:** 10 — Contact on production: Supabase and Resend; 11 — English version; 12 — Machine readability

**Status:** ready-for-agent

**Human in the loop:** the owner adds the `portfolio` CNAME record at the `tgolab.dev` DNS provider and enables branch protection if the agent lacks permission; the agent gives step-by-step instructions.

- [ ] Custom domain `portfolio.tgolab.dev` attached in Vercel with HTTPS
- [ ] Vercel Web Analytics enabled (no cookies, no consent banner)
- [ ] Production environment variables set (Supabase, revalidation secret, Resend, owner address, content source = Supabase)
- [ ] Supabase database webhooks (one per Content table, 5 in total) point at `https://portfolio.tgolab.dev/api/revalidate`; for now they point at the Vercel production domain `https://portfolio-site-omega-teal-69.vercel.app/api/revalidate` (fixed in ticket 12: they had pointed at a stale branch alias, so production never refreshed). The `x-vercel-protection-bypass` header is dropped (production is public). Check that every trigger has the new URL:

  ```sql
  select tgrelid::regclass as content_table,
         substring(pg_get_triggerdef(oid) from 'http_request\(''([^'']*)''') as url
  from pg_trigger
  where not tgisinternal
    and tgrelid::regclass::text in ('projects', 'skills', 'skill_categories', 'project_skills', 'project_screenshots');
  ```
- [ ] Vercel Cron Job `/api/keep-alive` listed under Settings → Cron Jobs and a manual run returns 200
- [ ] `master` protected: PRs only, squash merge only, required CI checks
- [ ] README updated with the live URL
- [ ] Manual smoke on production: both Locales, theme, filter, a Project page, contact form, an edit in Supabase appearing live
