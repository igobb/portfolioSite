# 14 — Open Graph image

**What to build:** A link to any page of the portfolio pasted into LinkedIn, Slack or Messenger shows the same generated preview card in the Terminal style: name, a short role line, logo and domain.

**Blocked by:** 07 — Project page and 404; 12 — Machine readability

**Status:** done

**Scope reduced (owner's call):** one universal image for every page and Locale instead of per-Project cards with Metrics, so nothing depends on Content and nothing needs regenerating.

- [x] One generated Open Graph image shared by every page in both Locales, using the design tokens and the default font
- [x] Referenced from page metadata (Open Graph and Twitter card)
- [x] Playwright: home, the projects list and a fixture Project link the image, and the image route responds with a PNG
