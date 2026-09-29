# 07 — Project page and 404

**What to build:** Opening a Project shows its Project page as on the canvas (EventTracker as the reference): header block, Metrics, Screenshot carousel, Problem / My role / What I built / Challenges / Outcomes, the `stack.json` side panel with links, and navigation to the next Project. Unknown slugs and any unknown URL show the Terminal-style 404.

**Blocked by:** 05 — Projects list, ProjectCard and Skill filter

**Status:** done

- [x] Content module query: one Project page by slug for a Locale (or not-found), including the next Project's slug and title; unpublished Projects are not found
- [x] Sections with no content are omitted entirely; stack groups and links (URL or note such as "closed source") in the side panel
- [x] Screenshot carousel: CSS scroll-snap, previous/next buttons, position dots, swipe on touch; striped placeholder when a Project has no Screenshots; alt text per Locale
- [x] Skills on the page link to the filtered list
- [x] Statically generated for all published slugs in both Locales
- [x] 404 page in the hero composition with links home, to Projects and to Contact, in both Locales
- [x] Vitest: slug lookup, next-Project resolution (wraps or ends as decided in code), not-found for unknown and unpublished slugs
- [x] Playwright: a Project page renders its sections and carousel navigation works; an unknown slug returns the 404 page
