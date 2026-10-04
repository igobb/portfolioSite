import { describe, expect, it } from 'vitest'
import { createFixtureSource } from './fixture-source'
import type { ContentTables } from './table-source'
import { getProjectList, getProjectPage } from '.'

const projectRow = (
  id: number,
  slug: string,
  sort_order: number,
  published = true,
): ContentTables['projects'][number] => ({
  id,
  slug,
  sort_order,
  published,
  title_pl: `Tytuł ${slug}`,
  title_en: `Title ${slug}`,
  context_pl: 'Firma',
  context_en: 'Company',
  summary_pl: `Opis ${slug}`,
  summary_en: `Summary ${slug}`,
  metrics_pl: [{ value: '30 kB', label: 'skryptu' }],
  metrics_en: [{ value: '30 kB', label: 'script' }],
  problem_pl: 'Problem',
  problem_en: 'Problem',
  role_pl: 'Rola',
  role_en: 'Role',
  built_pl: ['Dashboard'],
  built_en: ['A dashboard'],
  challenges_pl: [{ title: 'Rozmiar', body: 'Mały skrypt' }],
  challenges_en: [{ title: 'Size', body: 'A small script' }],
  outcomes_pl: ['Wdrożone'],
  outcomes_en: ['Shipped'],
  stack_pl: [{ label: 'Skrypt', items: ['TypeScript', 'Vite'] }],
  stack_en: [{ label: 'Script', items: ['TypeScript', 'Vite'] }],
  links_pl: [
    { label: 'Strona produktowa', url: 'https://example.com/pl' },
    { label: 'Repozytorium', note: 'kod zamknięty' },
  ],
  links_en: [
    { label: 'Product page', url: 'https://example.com/en' },
    { label: 'Repository', note: 'closed source' },
  ],
})

const tables: ContentTables = {
  skill_categories: [
    { id: 1, name_pl: 'Języki', name_en: 'Languages', sort_order: 1 },
  ],
  skills: [
    { id: 1, name: 'TypeScript', category_id: 1, sort_order: 1 },
    { id: 2, name: 'React', category_id: 1, sort_order: 2 },
  ],
  projects: [
    projectRow(1, 'third', 4),
    projectRow(2, 'hidden', 2, false),
    projectRow(3, 'first', 1),
    projectRow(4, 'second', 3),
  ],
  project_skills: [
    { project_id: 3, skill_id: 2 },
    { project_id: 3, skill_id: 1 },
  ],
  project_screenshots: [
    {
      id: 1,
      project_id: 3,
      storage_path: 'first/later.png',
      alt_pl: 'Później',
      alt_en: 'Later',
      sort_order: 2,
    },
    {
      id: 2,
      project_id: 3,
      storage_path: 'first/cover.png',
      alt_pl: 'Okładka',
      alt_en: 'Cover',
      sort_order: 1,
    },
    {
      id: 3,
      project_id: 4,
      storage_path: 'second/cover.png',
      alt_pl: 'Inny',
      alt_en: 'Other',
      sort_order: 1,
    },
  ],
}

const source = createFixtureSource(tables)

describe('getProjectPage', () => {
  it('returns the Project page resolved to the Locale', async () => {
    const pl = await source.getProjectPage('pl', 'first')
    const en = await source.getProjectPage('en', 'first')

    expect(pl).toEqual({
      slug: 'first',
      title: 'Tytuł first',
      context: 'Firma',
      summary: 'Opis first',
      metrics: [{ value: '30 kB', label: 'skryptu' }],
      skills: ['React', 'TypeScript'],
      screenshots: [
        { src: '/first/cover.png', alt: 'Okładka' },
        { src: '/first/later.png', alt: 'Później' },
      ],
      problem: 'Problem',
      role: 'Rola',
      built: ['Dashboard'],
      challenges: [{ title: 'Rozmiar', body: 'Mały skrypt' }],
      outcomes: ['Wdrożone'],
      stack: [{ label: 'Skrypt', items: ['TypeScript', 'Vite'] }],
      links: [
        { label: 'Strona produktowa', url: 'https://example.com/pl' },
        { label: 'Repozytorium', note: 'kod zamknięty' },
      ],
      next: { slug: 'second', title: 'Tytuł second' },
    })
    expect(en).toMatchObject({
      title: 'Title first',
      context: 'Company',
      summary: 'Summary first',
      metrics: [{ value: '30 kB', label: 'script' }],
      screenshots: [
        { src: '/first/cover.png', alt: 'Cover' },
        { src: '/first/later.png', alt: 'Later' },
      ],
      role: 'Role',
      built: ['A dashboard'],
      challenges: [{ title: 'Size', body: 'A small script' }],
      outcomes: ['Shipped'],
      stack: [{ label: 'Script', items: ['TypeScript', 'Vite'] }],
      links: [
        { label: 'Product page', url: 'https://example.com/en' },
        { label: 'Repository', note: 'closed source' },
      ],
      next: { slug: 'second', title: 'Title second' },
    })
  })

  it('has no Screenshots when none are stored for the Project', async () => {
    const page = await source.getProjectPage('pl', 'third')

    expect(page?.screenshots).toEqual([])
  })

  it('points to the next published Project in sort order', async () => {
    const page = await source.getProjectPage('pl', 'second')

    expect(page?.next).toEqual({ slug: 'third', title: 'Tytuł third' })
  })

  it('wraps from the last Project to the first', async () => {
    const page = await source.getProjectPage('en', 'third')

    expect(page?.next).toEqual({ slug: 'first', title: 'Title first' })
  })

  it('has no next Project when it is the only published one', async () => {
    const single = createFixtureSource({
      ...tables,
      projects: [projectRow(1, 'only', 1), projectRow(2, 'hidden', 2, false)],
    })

    const page = await single.getProjectPage('pl', 'only')

    expect(page?.next).toBeNull()
  })

  it('is not found for an unknown slug', async () => {
    expect(await source.getProjectPage('pl', 'missing')).toBeNull()
  })

  it('is not found for an unpublished Project', async () => {
    expect(await source.getProjectPage('pl', 'hidden')).toBeNull()
    expect(await source.getProjectPage('en', 'hidden')).toBeNull()
  })

  describe('with the default fixtures', () => {
    it('has a Project page for every published Project in both Locales', async () => {
      for (const locale of ['pl', 'en'] as const) {
        const { projects } = await getProjectList(locale)

        for (const { slug, title } of projects) {
          expect(await getProjectPage(locale, slug)).toMatchObject({
            slug,
            title,
          })
        }
      }
    })
  })
})
