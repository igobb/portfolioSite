# next-intl with the Locale in the URL

Every page lives under `/pl/...` or `/en/...` so search engines and AI agents can read and link both versions (with `hreflang`). We chose next-intl over i18next — even though the owner has production experience with i18next — because next-intl natively supports App Router locale routing, Server Components and typed message keys, while i18next would need custom glue for all three.
