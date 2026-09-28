import { describe, expect, it } from 'vitest'
import { createFixtureSource, type ContentTables } from './fixture-source'
import { getProjectCards } from '.'

const projectRow = (
  id: number,
  sort_order: number,
  published = true,
): ContentTables['projects'][number] => ({
  id,
  slug: `project-${sort_order}`,
  sort_order,
  published,
  title_pl: `Projekt ${sort_order}`,
  title_en: `Project ${sort_order}`,
  context_pl: 'Firma',
  context_en: 'Company',
  summary_pl: `Opis ${sort_order}`,
  summary_en: `Summary ${sort_order}`,
  metrics_pl: [],
  metrics_en: [],
})

const tables: ContentTables = {
  skill_categories: [],
  skills: [{ id: 1, name: 'React', category_id: 1, sort_order: 1 }],
  projects: [
    projectRow(6, 6),
    projectRow(2, 2),
    projectRow(5, 5),
    projectRow(7, 4, false),
    projectRow(1, 1),
    projectRow(4, 4),
    projectRow(3, 3),
    projectRow(8, 7),
  ],
  project_skills: [{ project_id: 2, skill_id: 1 }],
  project_screenshots: [],
}

const source = createFixtureSource(tables)

const slugsOf = (page: { projects: { slug: string }[] }) =>
  page.projects.map((project) => project.slug)

describe('getProjectCards', () => {
  it('returns the first page of published Project cards', async () => {
    const page = await source.getProjectCards('pl', { offset: 0, limit: 3 })

    expect(slugsOf(page)).toEqual(['project-1', 'project-2', 'project-3'])
    expect(page.hasMore).toBe(true)
  })

  it('returns a page from the middle of the list', async () => {
    const page = await source.getProjectCards('pl', { offset: 2, limit: 2 })

    expect(slugsOf(page)).toEqual(['project-3', 'project-4'])
    expect(page.hasMore).toBe(true)
  })

  it('returns a short last page without more to load', async () => {
    const page = await source.getProjectCards('pl', { offset: 6, limit: 3 })

    expect(slugsOf(page)).toEqual(['project-7'])
    expect(page.hasMore).toBe(false)
  })

  it('has no more when the page ends exactly on the last Project', async () => {
    const page = await source.getProjectCards('pl', { offset: 4, limit: 3 })

    expect(slugsOf(page)).toEqual(['project-5', 'project-6', 'project-7'])
    expect(page.hasMore).toBe(false)
  })

  it('has more when a single Project is left after the page', async () => {
    const page = await source.getProjectCards('pl', { offset: 3, limit: 3 })

    expect(page.hasMore).toBe(true)
  })

  it('returns an empty page when the offset is past the end', async () => {
    const page = await source.getProjectCards('pl', { offset: 10, limit: 3 })

    expect(page).toEqual({ projects: [], hasMore: false })
  })

  it('skips unpublished Projects', async () => {
    const page = await source.getProjectCards('pl', { offset: 0, limit: 10 })

    expect(slugsOf(page)).toEqual([
      'project-1',
      'project-2',
      'project-3',
      'project-4',
      'project-5',
      'project-6',
      'project-7',
    ])
  })

  it('returns Project cards resolved to the Locale', async () => {
    const {
      projects: [pl],
    } = await source.getProjectCards('pl', { offset: 1, limit: 1 })
    const {
      projects: [en],
    } = await source.getProjectCards('en', { offset: 1, limit: 1 })

    expect(pl).toEqual({
      slug: 'project-2',
      title: 'Projekt 2',
      context: 'Firma',
      summary: 'Opis 2',
      metrics: [],
      skills: ['React'],
      cover: null,
    })
    expect(en).toMatchObject({
      title: 'Project 2',
      context: 'Company',
      summary: 'Summary 2',
    })
  })

  it('matches the Project cards of the full list', async () => {
    const { projects } = await source.getProjectList('en')
    const page = await source.getProjectCards('en', { offset: 3, limit: 3 })

    expect(page.projects).toEqual(projects.slice(3, 6))
  })

  describe('with the default fixtures', () => {
    it('loads the six Projects three at a time by default', async () => {
      const first = await getProjectCards('pl', { offset: 0 })
      const second = await getProjectCards('pl', { offset: 3 })

      expect(first.projects).toHaveLength(3)
      expect(first.hasMore).toBe(true)
      expect(second.projects).toHaveLength(3)
      expect(second.hasMore).toBe(false)
    })
  })
})
