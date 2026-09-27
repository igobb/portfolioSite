import { afterEach, describe, expect, it, vi } from 'vitest'
import { createFixtureSource, type ContentTables } from './fixture-source'
import { getSkillCategories } from '.'

afterEach(() => {
  vi.unstubAllEnvs()
})

const tables: ContentTables = {
  skill_categories: [
    { id: 1, name_pl: 'Testy', name_en: 'Testing', sort_order: 2 },
    { id: 2, name_pl: 'Języki', name_en: 'Languages', sort_order: 1 },
  ],
  skills: [
    { id: 1, name: 'Playwright', category_id: 1, sort_order: 2 },
    { id: 2, name: 'Vitest', category_id: 1, sort_order: 1 },
    { id: 3, name: 'TypeScript', category_id: 2, sort_order: 1 },
    { id: 4, name: 'CSS', category_id: 2, sort_order: 2 },
  ],
  projects: [
    { id: 1, slug: 'published', sort_order: 1, published: true },
    { id: 2, slug: 'hidden', sort_order: 2, published: false },
  ],
  project_skills: [
    { project_id: 1, skill_id: 3 },
    { project_id: 2, skill_id: 2 },
  ],
}

describe('getSkillCategories', () => {
  it('orders Skill categories and their Skills by sort order', async () => {
    const categories =
      await createFixtureSource(tables).getSkillCategories('pl')

    expect(
      categories.map(({ name, skills }) => [name, skills.map((s) => s.name)]),
    ).toEqual([
      ['Języki', ['TypeScript', 'CSS']],
      ['Testy', ['Vitest', 'Playwright']],
    ])
  })

  it('resolves Skill category names to the Locale', async () => {
    const categories =
      await createFixtureSource(tables).getSkillCategories('en')

    expect(categories.map((category) => category.name)).toEqual([
      'Languages',
      'Testing',
    ])
  })

  it('flags only Skills used by a published Project', async () => {
    const categories =
      await createFixtureSource(tables).getSkillCategories('pl')

    expect(categories.flatMap((category) => category.skills)).toEqual([
      { name: 'TypeScript', hasProjects: true },
      { name: 'CSS', hasProjects: false },
      { name: 'Vitest', hasProjects: false },
      { name: 'Playwright', hasProjects: false },
    ])
  })

  describe('with the default fixtures', () => {
    it('returns the approved Skill categories in both Locales', async () => {
      const pl = await getSkillCategories('pl')
      const en = await getSkillCategories('en')

      expect(pl.map((category) => category.name)).toEqual([
        'Języki',
        'Frontend',
        'UI i stylowanie',
        'Stan i dane',
        'Backend i bazy',
        'Testy',
        'Narzędzia i wdrożenia',
        'Monitoring i analityka',
        'AI',
      ])
      expect(en.map((category) => category.name)).toEqual([
        'Languages',
        'Frontend',
        'UI and styling',
        'State and data',
        'Backend and databases',
        'Testing',
        'Tools and deployment',
        'Monitoring and analytics',
        'AI',
      ])
      expect(en.map((category) => category.skills)).toEqual(
        pl.map((category) => category.skills),
      )
    })

    it('links exactly the Skills used by the approved Projects', async () => {
      const skills = (await getSkillCategories('pl')).flatMap(
        (category) => category.skills,
      )

      expect(skills).toHaveLength(42)
      expect(
        skills.filter((skill) => skill.hasProjects).map((skill) => skill.name),
      ).toEqual([
        'TypeScript',
        'React',
        'i18next',
        'Recharts',
        'SWR',
        'GitHub',
        'GitHub Actions',
        'Vite',
        'Jira',
        'Lokalise',
        'Sentry',
        'Mixpanel',
        'Codex',
        'Mastra',
        'Vercel AI SDK',
        'n8n',
      ])
    })
  })

  it('rejects an unknown content source', async () => {
    vi.stubEnv('CONTENT_SOURCE', 'spreadsheet')

    await expect(getSkillCategories('pl')).rejects.toThrow(
      'Unknown CONTENT_SOURCE: spreadsheet',
    )
  })
})
