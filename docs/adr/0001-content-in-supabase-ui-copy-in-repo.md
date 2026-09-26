# Content lives in Supabase, UI copy lives in the repo

Profile, Skills and Projects are stored in Supabase with a separate field per Locale (`*_pl`, `*_en`) and fetched for the Locale in the URL, so the owner can add or edit a Project without a deploy. UI copy stays in `messages/pl.json` / `messages/en.json` because it changes together with the code that renders it. We rejected keeping everything in JSON (every content edit would need a deploy) and keeping everything in the database (UI copy would drift from the components using it).

## Consequences

- Every Content field is required in both Locales; nothing is published with a missing translation, so there is no fallback between Locales.
- Pages are statically rendered and revalidated on demand by a Supabase database webhook. The browser never talks to Supabase directly: the home page's "load more" Projects goes through a Server Action on the same data module.
- All data access goes through one module with two sources — Supabase in production, in-repo fixtures in Vitest and Playwright — so CI never needs the database.
- Supabase's free tier pauses idle projects, so a daily keep-alive query is part of the setup.
