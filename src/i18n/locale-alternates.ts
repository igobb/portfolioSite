import { SITE_URL } from '@/constants/site'
import { routing, type Locale } from './routing'

export function localizedUrl(locale: Locale, path = '') {
  return `${SITE_URL}/${locale}${path}`
}

export function languageAlternates(path = '') {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    ),
    'x-default': localizedUrl(routing.defaultLocale, path),
  } as Record<Locale | 'x-default', string>
}

export function localeAlternates(locale: Locale, path = '') {
  return {
    canonical: localizedUrl(locale, path),
    languages: languageAlternates(path),
  }
}
