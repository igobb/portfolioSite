# CLAUDE.md

Personal portfolio site for the owner of `tgolab.dev`, served at `portfolio.tgolab.dev`.

## Goal

A fast, scannable portfolio: who I am, my skills, and a guided walk through my projects.
Content (skills, projects) is edited in the database, with no redeploy needed; the profile (name, roles, links, CV) lives in code.

## Stack (decided)

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Storage) as the content source, edited via Supabase dashboard
- Vercel (Hobby) hosting; on-demand revalidation triggered by a Supabase DB webhook → `/api/revalidate`
- Daily keep-alive query (Vercel Cron) so the free Supabase project isn't paused
- Everything must stay on free tiers

## Conventions

- Communicate with the user in Polish; code, comments and commits in English.
- Pages are statically rendered and cached; the browser never talks to Supabase directly (home "load more" uses a Server Action).
- File structure: colocate by page. Each page's folder under `src/app/[locale]/` holds its own components in a private `_components/` folder (the home page lives in the `(home)` route group so its components aren't mistaken for layout-wide ones). A component with its own child components gets a folder named after it, with the children in a nested `components/` folder (`_components/Hero/Hero.tsx`, `_components/Hero/components/HeroPanel.tsx`); the same applies in `src/components/` (`Header/Header.tsx`, `Header/components/MobileMenu.tsx`). A page-only feature with its own logic (e.g. the home contact form: UI, Zod schema, Server Action, tests) gets its own private folder next to the page (`(home)/_contact/`). A component moves to `src/components/` only once more than one page uses it. Non-UI modules shared across pages live in their own folders under `src/` (`src/content/` for all data access, `src/i18n/`). Global constants used across pages live in `src/constants/`, one file per topic (e.g. `profile.ts`). No catch-all `utils/` or `services/` folders.
- Comments only for something genuinely complex that can't be understood from the code at a glance; no comments restating what the code does.
- In JSX, separate sibling elements with a blank line:

  ```tsx
  <nav>
    <Link href="/">Home</Link>

    <Link href="/projects">Projects</Link>
  </nav>
  ```

- Domain vocabulary is in `CONTEXT.md`; decisions in `docs/adr/`.
- Spec: `.scratch/portfolio/spec.md`; tickets: `.scratch/portfolio/issues/` (one ticket = one PR). When a ticket is done, mark its checkboxes, set its `Status:` to done and update the README roadmap row.
- Design source of truth: Design canvas https://claude.ai/artifact/Nq8vAVbVCzm1fpPgNVoJ5G.

## Git workflow

- Never commit to `master`; branch as `feat/…`, `fix/…`, `chore/…`, `docs/…`, `test/…`.
- Never commit without the owner's approval: when the work is done (checks green, review done), stop, summarise the changes and wait for the owner to review the code and explicitly accept it. This overrides any skill step that says to commit (e.g. `/implement`).
- PR titles in Conventional Commits format; squash merge only.
- No AI attribution lines in commits or PR descriptions.

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
