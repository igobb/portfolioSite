# Supabase setup

One-time setup of the free Supabase project that holds the Content. The schema and seed live in this folder; secrets and the webhook are configured in the dashboards.

1. **Create the project** at supabase.com (free plan, region Central EU). Under Security keep "Enable Data API" and "Enable automatic RLS" on and turn "Automatically expose new tables" off: the migration grants access explicitly.
2. **Create the schema:** SQL Editor → run [`migrations/20260929120000_content_schema.sql`](migrations/20260929120000_content_schema.sql). It creates the Content tables with row-level security, the `contact_messages` table and the public `screenshots` bucket.
3. **Load the seed:** SQL Editor → run [`seed.sql`](seed.sql) on the empty tables.
4. **Add environment variables in Vercel** (Settings → Environment Variables, Production and Preview):

   | Name                       | Value                                               |
   | -------------------------- | --------------------------------------------------- |
   | `CONTENT_SOURCE`           | `supabase`                                          |
   | `SUPABASE_URL`             | Project Settings → API → Project URL                |
   | `SUPABASE_PUBLISHABLE_KEY` | Project Settings → API Keys → publishable key       |
   | `REVALIDATE_SECRET`        | a random string, e.g. `openssl rand -hex 32`        |
   | `CRON_SECRET`              | another random string; Vercel Cron sends it as auth |

   `SUPABASE_URL` must be present at build time: `next.config.ts` uses it to allow Screenshot images.

5. **Create the database webhook:** Database → Webhooks → Create a new hook
   - Tables: `skill_categories`, `skills`, `projects`, `project_skills`, `project_screenshots`
   - Events: Insert, Update, Delete
   - Type: HTTP Request, method `POST`, URL `https://<deployment>/api/revalidate`
   - HTTP header: `Authorization: Bearer <REVALIDATE_SECRET>`
   - If the deployment is behind Vercel Deployment Protection (previews are by default), also add `x-vercel-protection-bypass: <secret>` from Vercel → Settings → Deployment Protection → Protection Bypass for Automation.

6. **Check it:** edit a Project title in the Table Editor and reload its page on the deployment; the new title appears within seconds.

Screenshots: upload images to the `screenshots` bucket and add a `project_screenshots` row whose `storage_path` is the file's path inside the bucket.
