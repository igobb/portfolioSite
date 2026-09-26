# CLAUDE.md

Personal portfolio site for the owner of `tgolab.dev`, served at `portfolio.tgolab.dev`.

## Goal

A fast, scannable portfolio: who I am, my skills, and a guided walk through my projects.
Content (profile, skills, projects) is edited in the database, with no redeploy needed.

## Stack (decided)

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Storage) as the content source, edited via Supabase dashboard
- Vercel (Hobby) hosting; on-demand revalidation triggered by a Supabase DB webhook → `/api/revalidate`
- Daily keep-alive query (Vercel Cron) so the free Supabase project isn't paused
- Everything must stay on free tiers

## Conventions

- Communicate with the user in Polish; code, comments and commits in English.
- Pages are statically rendered and cached; the browser never talks to Supabase directly (home "load more" uses a Server Action).
- Domain vocabulary is in `CONTEXT.md`; decisions in `docs/adr/`.
- Spec: `.scratch/portfolio/spec.md`; tickets: `.scratch/portfolio/issues/` (one ticket = one PR). When a ticket is done, mark its checkboxes, set its `Status:` to done and update the README roadmap row.
- Design source of truth: Design canvas https://claude.ai/artifact/Nq8vAVbVCzm1fpPgNVoJ5G.

## Git workflow

- Never commit to `master`; branch as `feat/…`, `fix/…`, `chore/…`, `docs/…`, `test/…`.
- PR titles in Conventional Commits format; squash merge only.
- No AI attribution lines in commits or PR descriptions.

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
