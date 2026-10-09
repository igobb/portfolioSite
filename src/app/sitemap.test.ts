import { describe, expect, it } from 'vitest'
import { getProjectList } from '@/content'
import sitemap from './sitemap'

const BASE = 'https://portfolio.tgolab.dev'

describe('sitemap.xml', () => {
  it('lists the home page, the list page and every published Project in both Locales', async () => {
    const { projects } = await getProjectList('pl')
    const urls = (await sitemap()).map((entry) => entry.url)

    const paths = [
      '',
      '/projects',
      ...projects.map((p) => `/projects/${p.slug}`),
    ]
    expect(urls.sort()).toEqual(
      paths
        .flatMap((path) => [`${BASE}/pl${path}`, `${BASE}/en${path}`])
        .sort(),
    )
  })

  it('gives every URL its language alternates, including x-default', async () => {
    const entry = (await sitemap()).find(
      ({ url }) => url === `${BASE}/en/projects/eventtracker`,
    )

    expect(entry?.alternates?.languages).toEqual({
      pl: `${BASE}/pl/projects/eventtracker`,
      en: `${BASE}/en/projects/eventtracker`,
      'x-default': `${BASE}/pl/projects/eventtracker`,
    })
  })
})
