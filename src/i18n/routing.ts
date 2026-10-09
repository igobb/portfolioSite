import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'always',
  alternateLinks: false,
})

export type Locale = (typeof routing.locales)[number]
