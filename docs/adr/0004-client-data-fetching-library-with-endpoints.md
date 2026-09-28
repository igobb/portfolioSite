# Client-side data fetching and sending go through SWR or TanStack Query once endpoints exist

The only data the browser loads after the first render today is the home "Show more": one Server Action (`_components/HomeProjects/load-more-projects.ts`), with pending, error and retry state handled by hand in `ShowMoreProjects` (`useTransition`, `try/catch`, `useState`). That is acceptable for a single call, but it does not scale: every new client-side request would repeat the same loading/error/retry code, and none of it would get caching, deduplication or request cancellation.

Once the site gets endpoints (Route Handlers under `app/api/`), everything the browser fetches from or sends to them goes through a data-fetching library that owns loading, error and retry state: SWR or TanStack Query, both covered in `node_modules/next/dist/docs/01-app/02-guides/client-side-data-fetching/`. Reads use its queries, sends use its mutations. Which of the two is chosen when the first endpoint is added, not up front.

## Consequences

- No new hand-rolled loading/error state for client-side requests; the manual pattern in `ShowMoreProjects` is the one exception, not a template to copy.
- When the first endpoint lands, `ShowMoreProjects` moves onto the chosen library (e.g. an infinite query over the Project cards endpoint) in the same change.
- Server-rendered data (Server Components reading `src/content/`) is unaffected; the library is only for requests the browser makes.
