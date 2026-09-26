# The Profile lives in code, not in Supabase

Amends ADR 0001: only Skills and Projects are stored in Supabase. The Profile — name, Roles, email, GitHub and LinkedIn links — is a constant in `src/constants/profile.ts`, and the CVs are files in `public/cv/`. These change perhaps once a year, and a change through a PR deploys in a minute or two, so a database table, a query, fixtures and a storage bucket would cost more than they save. Skills stay in Supabase with Projects because Projects reference them: the "has Projects" flag, Skill links and the Skill filter all rely on that relation, which the database keeps consistent.

## Consequences

- The content module starts with the Skills query (ticket 04), not with the Profile.
- Roles are kept per Locale next to the rest of the Profile, not in `messages/*.json`: they describe the owner, not the interface.
- Replacing a CV means replacing the PDF in `public/cv/` in a PR; old versions remain in git history.
