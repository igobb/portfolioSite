# 14 — Open Graph images

**What to build:** A link to the portfolio or to a Project pasted into LinkedIn, Slack or Messenger shows a generated preview card in the Terminal style — home: name, Roles and logo; Project: title, context and Metrics — created automatically for every new Project.

**Blocked by:** 07 — Project page and 404; 12 — Machine readability

**Status:** ready-for-agent

- [ ] Generated Open Graph images for the home page and each Project page in both Locales, using the design tokens and IBM Plex Mono
- [ ] Referenced from page metadata (Open Graph and Twitter card)
- [ ] Images regenerate when Content changes (follow the same revalidation)
- [ ] Playwright or Vitest: the image routes respond with an image for home and a fixture Project
