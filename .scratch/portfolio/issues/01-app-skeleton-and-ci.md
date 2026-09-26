# 01 — App skeleton and CI

**What to build:** A deployable Next.js app that serves an empty Terminal-style home page at `/pl` and `/en`, redirects `/` by browser language, and is guarded by CI on every PR with a Vercel preview. This is the walking skeleton every later ticket builds on.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

**Human in the loop:** the owner creates a Vercel account (GitHub login) and imports the repository; the agent gives step-by-step instructions.

- [ ] Next.js (App Router) + TypeScript (strict) + Tailwind CSS, with the design tokens from the spec (paper, ink, muted, line, surface, panel, accent) defined once as CSS variables for light and dark and exposed to Tailwind; IBM Plex Mono as the only typeface
- [ ] next-intl with Locale always in the URL; `/pl` and `/en` render a placeholder home page (prompt line + "Tomasz Gołąb"); `/` redirects by `Accept-Language`, falling back to `pl`; `messages/pl.json` and `messages/en.json` exist with typed keys
- [ ] ESLint + Prettier configured; `lint`, `typecheck`, `test` (Vitest), `build` and `test:e2e` (Playwright) scripts
- [ ] Vitest runs with at least one passing test; Playwright runs against the production build with a smoke test covering `/` redirect and both Locales rendering
- [ ] GitHub Actions workflow on every PR: lint, typecheck, Vitest, build, Playwright; plus a check that the PR title follows Conventional Commits
- [ ] Vercel project connected; each PR gets a preview deployment
- [ ] README "Running locally" section updated if commands differ from what it says
