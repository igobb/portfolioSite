# 03 — Hero

**What to build:** The home hero from the canvas: name, the Roles cycling in a typewriter, social links, "See projects" and "Download CV", and the logo on the diagonal panel — driven by the Profile, which lives in code (ADR 0003).

**Blocked by:** 02 — Header, footer, theme and Locale switch

**Status:** ready-for-agent

- [ ] Profile constant (name, Roles per Locale, email, GitHub and LinkedIn URLs) used by the hero, header, footer and page metadata; CVs in `public/cv/` for both Locales
- [ ] Hero matches the canvas on desktop (text left, logo on the diagonal panel right) and mobile (logo panel on top, content stacked)
- [ ] Typewriter cycles the Profile's Roles for the Locale; with `prefers-reduced-motion` it shows the Roles without animation and the cursor doesn't blink
- [ ] Email, GitHub and LinkedIn links from the Profile; "Download CV" downloads the Locale's CV
- [ ] Playwright: hero shows the name, a Role for the Locale, working social links and the Locale's CV in both Locales
