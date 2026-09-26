# next-intl with the Locale in the URL

Every page lives under `/pl/...` or `/en/...` so search engines and AI agents can read and link both versions (with `hreflang`). We chose next-intl over i18next — even though the owner has production experience with i18next — because next-intl natively supports App Router locale routing, Server Components and typed message keys, while i18next would need custom glue for all three.

## Paths are not translated

URLs are English in both Locales (`/pl/projects`, `/en/projects`); only the Locale prefix differs. A path is an address, not Content, and search engines get the language from the prefix, `hreflang` and the page itself. We rejected localised pathnames (`/pl/projekty`): they need a pathname map in the routing config, typed `{ pathname, params }` links and redirects between variants, for a cosmetic gain.
