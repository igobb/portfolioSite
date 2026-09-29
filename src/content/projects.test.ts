import { describe, expect, it } from 'vitest'
import { createFixtureSource, type ContentTables } from './fixture-source'
import { NO_PAGE_SECTIONS } from './fixtures'
import { getProjectList } from '.'

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
  metrics_pl: [{ value: '6', label: 'wersji językowych' }],
  metrics_en: [{ value: '6', label: 'languages' }],
  ...NO_PAGE_SECTIONS,
})

const tables: ContentTables = {
  skill_categories: [
    { id: 1, name_pl: 'Języki', name_en: 'Languages', sort_order: 1 },
  ],
  skills: [
    { id: 1, name: 'TypeScript', category_id: 1, sort_order: 1 },
    { id: 2, name: 'React', category_id: 1, sort_order: 2 },
    { id: 3, name: 'n8n', category_id: 1, sort_order: 3 },
    { id: 4, name: 'Vitest', category_id: 1, sort_order: 4 },
  ],
  projects: [
    projectRow(1, 'second', 2),
    projectRow(2, 'hidden', 1, false),
    projectRow(3, 'first', 1),
  ],
  project_skills: [
    { project_id: 1, skill_id: 2 },
    { project_id: 1, skill_id: 1 },
    { project_id: 2, skill_id: 4 },
    { project_id: 3, skill_id: 3 },
    { project_id: 3, skill_id: 2 },
  ],
  project_screenshots: [
    {
      id: 1,
      project_id: 1,
      storage_path: 'second/later.png',
      alt_pl: 'Później',
      alt_en: 'Later',
      sort_order: 2,
    },
    {
      id: 2,
      project_id: 1,
      storage_path: 'second/cover.png',
      alt_pl: 'Okładka',
      alt_en: 'Cover',
      sort_order: 1,
    },
  ],
}

describe('getProjectList', () => {
  it('lists only published Project cards, ordered by sort order', async () => {
    const { projects } = await createFixtureSource(tables).getProjectList('pl')

    expect(projects.map((project) => project.slug)).toEqual(['first', 'second'])
  })

  it('resolves every Project card field to the Locale', async () => {
    const source = createFixtureSource(tables)

    const [, pl] = (await source.getProjectList('pl')).projects
    const [, en] = (await source.getProjectList('en')).projects

    expect(pl).toEqual({
      slug: 'second',
      title: 'Tytuł second',
      context: 'Firma',
      summary: 'Opis second',
      metrics: [{ value: '6', label: 'wersji językowych' }],
      skills: ['React', 'TypeScript'],
      cover: { src: '/second/cover.png', alt: 'Okładka' },
    })
    expect(en).toMatchObject({
      title: 'Title second',
      context: 'Company',
      summary: 'Summary second',
      metrics: [{ value: '6', label: 'languages' }],
      cover: { src: '/second/cover.png', alt: 'Cover' },
    })
  })

  it('leaves the cover empty when a Project has no Screenshots', async () => {
    const { projects } = await createFixtureSource(tables).getProjectList('pl')

    expect(projects[0]?.cover).toBeNull()
  })

  it('lists the Skills of published Projects once, alphabetically', async () => {
    const { skills } = await createFixtureSource(tables).getProjectList('en')

    expect(skills).toEqual(['n8n', 'React', 'TypeScript'])
  })

  describe('with the default fixtures', () => {
    it('lists the six approved Projects in both Locales', async () => {
      const pl = await getProjectList('pl')
      const en = await getProjectList('en')

      const slugs = [
        'eventtracker',
        'solis',
        'i18n',
        'raportowanie-bledow',
        'analityka-mixpanel',
        'automatyzacje-ai',
      ]
      expect(pl.projects.map((project) => project.slug)).toEqual(slugs)
      expect(en.projects.map((project) => project.slug)).toEqual(slugs)
      expect(en.skills).toEqual(pl.skills)

      for (const project of [...pl.projects, ...en.projects]) {
        expect(project.title).not.toBe('')
        expect(project.context).not.toBe('')
        expect(project.summary).not.toBe('')
      }
    })
  })
})
