# 12 — Machine readability

**What to build:** Search engines and AI agents can read and index everything: structured data on every page, an `llms.txt` summarising the owner, Skills and Projects in both Locales, a sitemap with language alternates, robots rules and complete page metadata.

**Blocked by:** 04 — Skills section; 07 — Project page and 404

**Status:** ready-for-agent

- [ ] JSON-LD: `Person` on the home page (name, Roles, links), `ItemList` on the list page, `CreativeWork` on each Project page
- [ ] `llms.txt` generated from the content module: who the owner is, Skills by category, each Project with a one-line summary and URLs in both Locales
- [ ] `sitemap.xml` with `hreflang` alternates for every page and Project; `robots.txt`
- [ ] Per-page title, description, canonical and language alternates
- [ ] Playwright: JSON-LD present and parseable on home and a Project page; `llms.txt` lists every fixture Project
