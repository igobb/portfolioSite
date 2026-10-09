# Spec: tgolab portfolio v1

Status: ready-for-agent

Design reference: Design canvas "tgolab portfolio – hero" — https://claude.ai/artifact/Nq8vAVbVCzm1fpPgNVoJ5G (page **Desktop**: Home, /projekty, /projekty/eventtracker, 404 and the `ProjectCard` component, each in light and dark; page **Mobile**: Home and /projekty, light and dark; page **Kierunki hero**: archived explorations, variant A was chosen). Vocabulary: `CONTEXT.md`. Decisions: `docs/adr/`.

## Problem Statement

The owner (a frontend/fullstack developer) has no portfolio that quickly tells a recruiter — or an AI agent reading on a recruiter's behalf — who he is, what he can do and what he has built. His strongest work is commercial and closed-source, so it can only be shown through well-structured descriptions. Whatever he builds must cost nothing to run, and adding a new Project or Skill must not require touching code or deploying.

## Solution

A bilingual (PL/EN) portfolio at `portfolio.tgolab.dev` in a light-retro "Terminal" style (IBM Plex Mono, paper/ink palette, red accent used only on the Contact button and cursors), with light and dark modes.

- The home page shows the hero (name, typewriter cycling the Roles, social links, logo), all Skills grouped into Skill categories, the first three Projects with "Show more", and a Contact section with a copyable email, CV, LinkedIn, GitHub and a contact form.
- `/projects` lists every Project as a Project card with a Skill filter; each Project has its own Project page with Metrics, a Screenshot carousel and a fixed structure (problem, role, what was built, challenges, outcomes, stack, links).
- Content lives in Supabase with both Locales per field and is edited in the Supabase dashboard; the site revalidates automatically. UI copy lives in the repo.
- Pages are server-rendered, carry complete metadata and an `llms.txt`, so machines read the same facts people do.
- The repository itself demonstrates production practice: small PRs with Conventional Commit titles, CI running lint, typecheck, unit tests, build and E2E on every PR, preview deploys and a README explaining the workflow.

## User Stories

### Recruiter / visitor — first impression

1. As a recruiter, I want to see the owner's name and Roles immediately on landing, so that I know within seconds whether the profile matches my search.
2. As a recruiter, I want the Roles to cycle in a typewriter animation, so that I see all of them without the hero getting crowded.
3. As a recruiter, I want links to email, GitHub and LinkedIn in the hero, so that I can reach or verify the owner without scrolling.
4. As a recruiter, I want a "See projects" call to action and a "Download CV" link in the hero, so that I can go straight to the evidence or take the CV to my ATS.
5. As a visitor, I want the owner's logo displayed prominently, so that the site feels personal and recognisable.
6. As a visitor on a phone, I want the hero stacked vertically with the logo on top, so that everything is readable without zooming.

### Navigation, Locale and theme

7. As a visitor, I want a header with Skills, Portfolio and a highlighted Contact link, so that I can jump to what I need.
8. As a visitor on a phone, I want the navigation behind a menu button, so that the header stays compact.
9. As a Polish-speaking visitor, I want the site in Polish by default, so that I read it in my language.
10. As an English-speaking visitor, I want to switch to English with one click and land on the equivalent page, so that I don't lose my place.
11. As a visitor arriving at the bare domain, I want to be redirected to the Locale matching my browser, so that I start in a language I understand.
12. As a recruiter, I want each Locale to have its own URL (`/pl/...`, `/en/...`), so that I can share a link to the English version.
13. As a visitor, I want the site to follow my system's light/dark preference, so that it matches my environment.
14. As a visitor, I want to toggle light/dark mode and have my choice remembered, so that it stays the way I like it.
15. As a visitor, I want no flash of the wrong theme on load, so that the site feels polished.
16. As a visitor, I want the email address visible in the header on desktop, so that I can contact the owner from any page.

### Skills

17. As a recruiter, I want all Skills grouped into Skill categories on the home page, so that I can scan the whole stack in one place.
18. As a recruiter, I want Skill categories laid out in an aligned grid with equal-height headings, so that the list is easy to scan.
19. As a recruiter, I want Skills used in at least one Project to be links, so that I can see where the owner actually applied them.
20. As a recruiter, I want clicking a linked Skill to open `/projects` filtered by that Skill, so that I get the evidence in one click.
21. As a visitor, I want a short legend explaining that underlined Skills lead to Projects, so that the interaction is discoverable.
22. As a recruiter, I want Skills without Projects shown as plain text, so that I don't hit empty results.

### Projects on the home page

23. As a recruiter, I want to see the first three Projects on the home page, so that I get the highlights without leaving the page.
24. As a recruiter, I want a "Show more" button that loads the next three Projects, so that I can keep browsing in place.
25. As a recruiter, I want "Show more" to disappear once all Projects are shown, so that I know I've seen everything.
26. As a visitor, I want a link to all Projects with the Skill filter, so that I can explore in depth.

### Project cards

27. As a recruiter, I want each Project card to show the Project's context (e.g. the company), title, summary, Metrics and Skills, so that I understand it without opening it.
28. As a recruiter, I want every Project card to have the same internal alignment (context, title, summary, Metrics, Skills at the bottom, "Open" last), so that I can compare cards at a glance.
29. As a recruiter, I want Metrics shown as short headline figures, so that I grasp the scale immediately.
30. As a visitor, I want the Project card to show the first Screenshot as a cover, so that I get a visual impression.
31. As a visitor, I want the whole card to be clickable, so that it's easy to open a Project.

### /projects

32. As a recruiter, I want to see all published Projects at once as Project cards, so that I have the complete picture.
33. As a recruiter, I want to filter Projects by one or more Skills, so that I only see the relevant work.
34. As a recruiter, I want multiple selected Skills to narrow the list (every selected Skill must be present), so that the filter behaves predictably.
35. As a recruiter, I want selected Skills highlighted on the matching cards, so that I see why a Project matched.
36. As a recruiter, I want a count like "2 of 6 Projects", so that I know how much the filter removed.
37. As a recruiter, I want the filter state kept in the URL, so that I can share "Projects with React" as a link.
38. As a visitor, I want a clear "no results" state with a one-click reset, so that I never hit a dead end.
39. As a visitor on a phone, I want the Skill filter as a horizontally scrollable row, so that it doesn't push the Projects far down.

### Project page

40. As a recruiter, I want a Project page with title, context, summary and Skills at the top, so that I can orient myself immediately.
41. As a recruiter, I want the Metrics shown as large figures with a short label each, so that the impact is obvious.
42. As a recruiter, I want a Screenshot carousel with previous/next controls and position indicators, so that I can see the product.
43. As a visitor on a phone, I want to swipe through Screenshots, so that the carousel feels native.
44. As a recruiter, I want sections for Problem, My role, What I built, Challenges and Outcomes, so that I can judge the owner's responsibility and impact.
45. As a recruiter, I want sections without content to be omitted, so that no Project page shows empty headings.
46. As a recruiter, I want the stack shown grouped by area (e.g. dashboard, tracking script, CI/CD), so that I understand the technical shape.
47. As a recruiter, I want links to the product page and a note when the code is closed, so that I know what I can verify.
48. As a recruiter, I want a link to the next Project and back to all Projects, so that I can keep reading.
49. As a recruiter, I want each Project page to have a stable URL per Locale, so that I can reference a specific Project.

### Contact

50. As a recruiter, I want the owner's email shown prominently with a copy button, so that I can paste it into my mail client.
51. As a recruiter, I want confirmation that the email was copied, so that I know it worked.
52. As a recruiter, I want to download the CV in the current Locale, so that I get the right language version.
53. As a recruiter, I want LinkedIn and GitHub links in the Contact section, so that I can check the owner's profiles.
54. As a visitor, I want to send a message through a form with name, email and message, so that I can reach out without opening my mail client.
55. As a visitor, I want inline validation errors in my language, so that I can fix mistakes before sending.
56. As a visitor, I want to see sending, success and error states, so that I know what happened and can retry.
57. As the owner, I want every Contact message stored and forwarded to my email, so that I never miss one.
58. As the owner, I want bots and floods filtered out (honeypot, minimum fill time, per-IP rate limit), so that I don't receive spam.

### Other pages and chrome

59. As a visitor who follows a broken link, I want a 404 page in the same style with links home, to Projects and to Contact, so that I can recover.
60. As a developer visiting the site, I want a footer link to the site's source on GitHub, so that I can inspect how it's built.

### Machines — search engines and AI agents

61. As an AI agent summarising a candidate, I want all Content rendered in the server HTML, so that I can read it without running JavaScript.
62. ~~As an AI agent, I want structured data describing the owner (Person) and the Projects, so that I can extract facts reliably.~~ Dropped in ticket 12: agents read the server-rendered pages and `llms.txt` directly.
63. As an AI agent, I want an `llms.txt` with a concise summary and links to every Project in both Locales, so that I can find everything quickly.
64. As a search engine, I want `hreflang` alternates, a sitemap and robots rules, so that both Locales are indexed correctly.
65. As a recruiter pasting a link into LinkedIn or Slack, I want a generated Open Graph preview (one universal card for every page), so that the link looks credible before it's clicked.

### Owner — editing Content

66. As the owner, I want to add or edit a Project, Skill or Skill category in the Supabase dashboard, so that I never need a code change for Content.
67. As the owner, I want the live site to reflect my edit within seconds without a deploy, so that updates are effortless.
68. As the owner, I want the database to reject Content missing either Locale, so that the site never shows a half-translated Project.
69. As the owner, I want to hide a Project without deleting it, so that I can retire outdated work reversibly.
70. As the owner, I want to control the order of Projects, Skill categories and Skills, so that the strongest work comes first.
71. As the owner, I want to upload Screenshots to storage and reference them from Content, so that media is managed in one place.
72. As the owner, I want the free Supabase project kept awake automatically, so that editing always works.
73. As the owner, I want to know which pages recruiters visit (privacy-friendly, no cookie banner), so that I can tell whether the portfolio works.

### Owner — repository as a showcase

74. As a reviewer reading the repo, I want a README explaining what the project is, its architecture and the development workflow, so that I see how the owner works professionally.
75. As a reviewer, I want every change to arrive as a small PR with a Conventional Commit title, squash-merged into a protected `master`, so that history is clean and reviewable.
76. As a reviewer, I want CI to run lint, typecheck, unit tests, a production build and E2E tests on every PR, so that quality is enforced, not promised.
77. As a reviewer, I want a preview deployment per PR, so that changes can be checked in a real environment before merge.
78. As a reviewer, I want domain vocabulary and architecture decisions documented, so that I can follow the reasoning.

## Implementation Decisions

### Stack and hosting
- Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel Hobby; Supabase free tier for Postgres and Storage; Resend free tier for notification email; Vercel Web Analytics. Everything stays on free tiers.
- Domain `portfolio.tgolab.dev` via a CNAME to Vercel.

### Routing and Locales (ADR 0002)
- next-intl with the Locale always in the URL. Paths are English and identical in both Locales; only the prefix changes: `/pl`, `/en` (home); `/pl/projects`, `/en/projects` (list); `/pl/projects/[slug]`, `/en/projects/[slug]` (Project page). Slugs are shared across Locales.
- `/` redirects by `Accept-Language` (fallback `pl`). The Locale switch maps the current route to its counterpart.
- Home sections have anchors for Skills and Contact; header links scroll to them from the home page and navigate to `/<locale>#…` from elsewhere. "About" is not in the navigation until that page exists.
- UI copy in `messages/pl.json` and `messages/en.json` with typed keys; `pl.json` is written first, `en.json` before launch.

### Profile (ADR 0003)
- The Profile (name, Roles per Locale, email, GitHub and LinkedIn URLs) is a constant in `src/constants/profile.ts`; the CVs are `public/cv/tomasz-golab-cv-pl.pdf` and `…-en.pdf`. Changing them is a code change.

### Content module (the one data seam — ADR 0001)
- A single content module exposes deep, Locale-aware queries and hides where data comes from:
  - get Skill categories with their Skills for a Locale, each Skill flagged with whether any published Project uses it;
  - get a page of Project cards for a Locale (offset + limit, default 3) with a "has more" flag;
  - get all published Project cards for a Locale plus the list of Skills that appear on them (for the filter);
  - get one Project page by slug for a Locale (or not-found), including the next Project's slug and title.
- Two sources behind the same interface: Supabase (production and preview) and in-repo fixtures (Vitest, Playwright, local dev without credentials). The source is chosen by environment configuration.
- The module returns domain objects already resolved to the requested Locale — callers never see `_pl` / `_en` columns.
- Reads are cached and tagged; a revalidation endpoint secured by a shared secret is called by a Supabase database webhook on any Content change and invalidates the tag.
- Skill filtering (AND semantics) is a pure function over Project cards and selected Skill names, used by `/projects` with the selection read from the `skill` search params.

### Data model (Supabase)
- `skill_categories`: name per Locale, sort order.
- `skills`: name (same in both Locales), category, sort order.
- `projects`: slug (unique), sort order, published flag (default true), and per Locale: title, context, summary, problem, role; per-Locale lists stored as JSON: what was built (strings), challenges (title + body), outcomes (strings), Metrics (value + label), stack groups (label + items), links (label + URL or a note such as "closed source").
- `project_skills`: many-to-many between Projects and Skills.
- `project_screenshots`: Project, storage path, alt text per Locale, sort order; the first Screenshot is the card cover.
- `contact_messages`: name, email, message, Locale, hashed IP, created at.
- Every required text field is NOT NULL in both Locales; optional lists default to empty. Row-level security allows anonymous reads of published Content only; `contact_messages` is written server-side only.
- Seed data comes from the owner's `portfolio.txt` (6 Projects, edited into the template above) and the amended Skill list approved on the canvas (includes SWR, Recharts, i18next, Mastra, Vercel AI SDK, Sentry, Mixpanel, Lokalise, Jira; categories: Języki, Frontend, UI i stylowanie, Stan i dane, Backend i bazy danych, Testy, Narzędzia i wdrożenia, Monitoring i analityka, AI). English Content is written from the Polish before launch.
- Approved slugs: `eventtracker`, `solis`, `i18n`, `raportowanie-bledow`, `analityka-mixpanel`, `automatyzacje-ai`.

### Home "Show more"
- The first three Project cards are server-rendered. "Show more" calls a Server Action that asks the content module for the next page and appends the returned cards; the button disappears when "has more" is false. The browser never talks to Supabase directly.

### Contact message submission (the second seam)
- One Zod schema (name, email, message, honeypot, form start timestamp) shared by the client form and the server.
- Client: React Hook Form with the Zod resolver; error messages from UI copy; sending / success / error states.
- Server: a Server Action delegating to a submission module that receives its dependencies (message store, notifier, clock, rate limiter) so it can be tested with fakes. It re-validates with the schema, silently accepts-and-drops honeypot or too-fast submissions, rejects when the per-IP limit is exceeded, stores the Contact message and sends a notification via Resend to the owner's address.
- Resend sends from a verified `tgolab.dev` sender; DNS records are added with the owner, guided step by step.

### Theme
- Light/dark via a `data-theme` attribute; initial value from the stored choice, else `prefers-color-scheme`; applied by an inline script before paint to avoid a flash. Storage access is wrapped so the site works when storage is unavailable.
- Design tokens (paper, ink, muted, line, surface, panel, accent — `#C0352C` light / `#C8392F` dark for fills, `#C0352C` / `#E0564B` for red text so it keeps ≥ 4.5:1) defined once as CSS variables for both themes and exposed to Tailwind.

### Components (from the canvas)
- A shared **ProjectCard** used on the home page and `/projects`, with fixed-height rows (context, two-line title, five-line summary, Metrics block), Skills pinned to the bottom and the "Open" label last; responsive single-column on mobile.
- Header (home variant over the diagonal panel; subpage variant with small logo and active link), Footer with source link, Hero with typewriter, Skills grid with legend tile, Screenshot carousel (CSS scroll-snap + buttons + dots, no library), Contact section, 404.
- Accessibility: real buttons and links, `aria-pressed` on filter chips, `aria-label` on icon buttons, visible focus, text contrast ≥ 4.5:1 in both themes, reduced motion disables the typewriter animation and cursor blink.

### Machine readability
- All Content server-rendered; no JSON-LD (dropped in ticket 12).
- `llms.txt` generated from the content module: who the owner is, Skills by category, and every Project with a one-line summary and URLs in both Locales.
- `sitemap.xml` with `hreflang` alternates, a minimal `robots.txt` pointing at the sitemap, per-page metadata; one generated Open Graph image shared by every page (last, non-blocking).

### Operations
- Vercel Cron calls a keep-alive endpoint daily that runs a trivial query against Supabase.
- Environment variables: Supabase URL and keys (anon for reads, service role server-only), revalidation secret, Resend API key, owner notification address, content source switch.

### Repository workflow
- Branches `feat/…`, `fix/…`, `chore/…`, `docs/…`, `test/…`; protected `master`; squash merge only; PR title in Conventional Commits format, checked in CI.
- GitHub Actions on every PR: lint, typecheck, Vitest, production build, Playwright (against the build with the fixture source).
- Vercel preview deployment per PR.
- README (for reviewers and recruiters): what it is, architecture overview, how Content and revalidation work, testing strategy, workflow and how to run locally with fixtures.

## Testing Decisions

- Good tests assert externally visible behaviour through the public interface of a seam — what a user sees or what a module returns — never internal state, component structure or which function called which. Tests use domain vocabulary from `CONTEXT.md`.
- **Seam 1 — the whole app (Playwright, primary).** Runs the production build with the fixture content source. Covers: Locale switch preserves the page and changes URL and copy; `/` redirect; theme toggle persists and follows the system by default; typewriter shows a Role; "Show more" appends three Project cards and disappears at the end; Skill link on home opens the filtered list; Skill filter AND semantics, URL state, count and no-results reset; Project page sections, omitted empty sections, carousel navigation, next-Project link; copy-email feedback; contact form validation and success state (submission dependencies faked); 404; canonical and `hreflang` in page metadata, `sitemap.xml` and `llms.txt`.
- **Seam 2 — the content module (Vitest).** Against the fixture source: Locale resolution of every field, ordering by sort order, published-only filtering, pagination with "has more", Skill "has Projects" flag, next-Project resolution, not-found for unknown or unpublished slugs; plus the pure Skill filter function.
- **Seam 3 — Contact message submission (Vitest).** With fake store, notifier, clock and rate limiter: valid message is stored and notified; invalid input returns field errors; honeypot and too-fast submissions are dropped without notification; exceeding the per-IP limit is rejected; notifier failure still keeps the stored message and reports an error.
- The Supabase source and Resend are not exercised in CI; they are verified manually on the Vercel preview of the PR that introduces them.
- Prior art: none yet — this spec creates the first tests; the E2E and Vitest setups established in the first tickets are the pattern for the rest.

## Out of Scope

- The About page (planned later; hidden from navigation until then).
- Any custom admin panel — Content is edited in the Supabase dashboard.
- Real Screenshots — striped placeholders until the owner provides images.
- Blog, comments, newsletter, search.
- CAPTCHA (Cloudflare Turnstile) — only if spam appears despite the honeypot and rate limit.
- Locales other than Polish and English; fallback between Locales (Content is always complete in both).
- Automated tests against real Supabase or Resend.

## Further Notes

- The "Terminal" style details (prompt lines like `~/tgolab $ ls ./projekty`, block cursor, bracketed buttons, diagonal hero split) are part of the design and should be carried over faithfully; the canvas is the source of truth for spacing and typography.
- Contact email shown on the site: `t.golab06@gmail.com`. LinkedIn: `https://www.linkedin.com/in/igobb/`. GitHub: `https://github.com/igobb`. CV PDFs (PL and EN) are provided by the owner and kept in `public/cv/`.
- The owner will set up Supabase, Vercel, Resend and DNS accounts; agents prepare everything else and give step-by-step instructions for the manual parts.
