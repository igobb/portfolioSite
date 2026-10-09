import type { MetadataRoute } from 'next'
import { getProjectList } from '@/content'
import { languageAlternates, localizedUrl } from '@/i18n/locale-alternates'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getProjectList(routing.defaultLocale)

  const paths = [
    '',
    '/projects',
    ...projects.map(({ slug }) => `/projects/${slug}`),
  ]

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
