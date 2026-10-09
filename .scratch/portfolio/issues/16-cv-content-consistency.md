# 16 — CV content consistency

**What to build:** Both CVs (`public/cv/tomasz-golab-cv-pl.pdf`, `public/cv/tomasz-golab-cv-en.pdf`) say the same things as the portfolio site, so a recruiter who reads the CV and then visits the site (or the other way round) finds no contradictions.

**Blocked by:** —

**Status:** needs-triage

- [ ] Profile matches: name, roles/title, contact links (email, GitHub, LinkedIn, site URL) in the CVs vs `src/constants/profile.ts` and the Hero
- [ ] Skills match: every skill in the CVs appears in the Skills section (Supabase content), and key skills on the site aren't missing from the CVs; naming is consistent (e.g. "Next.js" vs "NextJS")
- [ ] Projects match: projects in the CVs exist on the site with the same names, dates, tech stack, links and descriptions (no outdated facts after the content refresh)
- [ ] Experience / education / languages in the CVs don't contradict anything stated on the site (About text, Hero)
- [ ] PL and EN CVs say the same thing as each other, and match the PL and EN versions of the site respectively
- [ ] Discrepancies listed in this ticket's `## Comments`, each with a decision: fix the CV, fix the site (Supabase / code), or accept the difference
- [ ] Agreed fixes applied: updated PDFs in `public/cv/` and/or content changes in Supabase and fixtures
- [ ] The CV download links (PL and EN) still serve the current files
