# 12 — Machine readability

**What to build:** Search engines and AI agents can read and index everything: complete page metadata, an `llms.txt` summarising the owner, Skills and Projects in both Locales, and a sitemap with language alternates.

**Blocked by:** 04 — Skills section; 07 — Project page and 404

**Status:** done

- [x] ~~JSON-LD: `Person` on the home page (name, Roles, links), `ItemList` on the list page, `CreativeWork` on each Project page~~ — dropped by the owner: the pages are already server-rendered text that agents read directly
- [x] `llms.txt` generated from the content module: who the owner is, Skills by category, each Project with a one-line summary and URLs in both Locales
- [x] `sitemap.xml` with `hreflang` alternates for every page and Project; a minimal `robots.txt` (allow all, `Sitemap:` line)
- [x] Per-page title, description, canonical and language alternates
- [x] Playwright: canonical and language alternates on a Project page; `llms.txt` and `sitemap.xml` list every fixture Project; `robots.txt` points at the sitemap
