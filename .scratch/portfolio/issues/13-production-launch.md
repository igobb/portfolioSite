# 13 — Production launch

**What to build:** The portfolio is live at `https://portfolio.tgolab.dev` with production Content, privacy-friendly analytics and a protected `master`.

**Blocked by:** 10 — Contact on production: Supabase and Resend; 11 — English version; 12 — Machine readability

**Status:** done

**Human in the loop:** the owner adds the `portfolio` CNAME record at the `tgolab.dev` DNS provider and enables branch protection if the agent lacks permission; the agent gives step-by-step instructions.

- [x] Custom domain `portfolio.tgolab.dev` attached in Vercel with HTTPS
- [x] Vercel Web Analytics enabled (no cookies, no consent banner)
- [x] Production environment variables set (Supabase, revalidation secret, Resend, owner address, content source = Supabase)
- [x] Supabase database webhooks (one per Content table, 5 in total) point at `https://portfolio.tgolab.dev/api/revalidate` (previously the Vercel production domain `https://portfolio-site-omega-teal-69.vercel.app/api/revalidate`, which Vercel Authentication protects, hence the bypass header). The `x-vercel-protection-bypass` header is dropped (the custom domain is public). Check that every trigger has the new URL:

  ```sql
  select tgrelid::regclass as content_table,
         substring(pg_get_triggerdef(oid) from 'http_request\(''([^'']*)''') as url
  from pg_trigger
  where not tgisinternal
    and tgrelid::regclass::text in ('projects', 'skills', 'skill_categories', 'project_skills', 'project_screenshots');
  ```
- [x] Vercel Cron Job `/api/keep-alive` listed under Settings → Cron Jobs and a manual run returns 200
- [x] `master` protected: PRs only, squash merge only, required CI checks
- [x] README updated with the live URL
- [x] Manual smoke on production: both Locales, theme, filter, a Project page, contact form, an edit in Supabase appearing live
