# 01 — App skeleton and CI

**What to build:** A deployable Next.js app that serves an empty Terminal-style home page at `/pl` and `/en`, redirects `/` by browser language, and is guarded by CI on every PR with a Vercel preview. This is the walking skeleton every later ticket builds on.

**Blocked by:** None — can start immediately.

**Status:** ready-for-human (the owner connects Vercel and protects `master`)

**Human in the loop:** the owner creates a Vercel account (GitHub login), imports the repository and protects `master`; steps below.

- [x] Next.js (App Router) + TypeScript (strict) + Tailwind CSS, with the design tokens from the spec (paper, ink, muted, line, surface, panel, accent) defined once as CSS variables for light and dark and exposed to Tailwind; IBM Plex Mono as the only typeface
- [x] next-intl with Locale always in the URL; `/pl` and `/en` render a placeholder home page (prompt line + "Tomasz Gołąb"); `/` redirects by `Accept-Language`, falling back to `pl`; `messages/pl.json` and `messages/en.json` exist with typed keys
- [x] ESLint + Prettier configured; `lint`, `typecheck`, `test` (Vitest), `build` and `test:e2e` (Playwright) scripts
- [x] Vitest runs with at least one passing test; Playwright runs against the production build with a smoke test covering `/` redirect and both Locales rendering
- [x] GitHub Actions workflow on every PR: lint, typecheck, Vitest, build, Playwright; plus a check that the PR title follows Conventional Commits
- [ ] Vercel project connected; each PR gets a preview deployment
- [ ] `master` protected: changes only through PRs, squash merge only, CI and PR title checks required
- [x] README "Running locally" section updated if commands differ from what it says

## Owner setup steps

### 1. Vercel

1. Sign in at https://vercel.com with GitHub (Hobby plan).
2. **Add New → Project**, then **Import** `igobb/portfolioSite`. If the repo isn't listed, use **Adjust GitHub App Permissions** to grant access to it.
3. Leave the detected settings (Framework: Next.js, no environment variables) and click **Deploy**.
4. From now on every PR gets a comment from Vercel with its preview URL, and every push to `master` deploys production.

### 2. Merge settings (GitHub → Settings → General → Pull Requests)

1. Untick **Allow merge commits** and **Allow rebase merging**; keep only **Allow squash merging**.
2. Under squash merging set the default message to **Pull request title** (so the Conventional Commits title becomes the commit on `master`).
3. Tick **Automatically delete head branches**.

### 3. Protect `master` (GitHub → Settings → Rules → Rulesets → New ruleset → New branch ruleset)

Do this after the first PR has run CI once; required checks can only be picked after GitHub has seen them.

1. Name: `master`; **Enforcement status: Active**.
2. **Target branches → Add target → Include default branch**.
3. Tick:
   - **Restrict deletions**
   - **Block force pushes**
   - **Require a pull request before merging** (required approvals: 0, since the owner is the only contributor; **Allowed merge methods: Squash**)
   - **Require status checks to pass**, then **Add checks**: `Lint, test, build, e2e` and `Conventional Commits`; tick **Require branches to be up to date before merging**
4. Leave **Bypass list** empty so the rules apply to the owner too.
5. **Create**.
