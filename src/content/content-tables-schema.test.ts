import { describe, expect, it } from 'vitest'
import { contentTablesSchema } from './content-tables-schema'
import { FIXTURE_TABLES } from './fixtures'

const withFirstProject = (changes: Record<string, unknown>) => ({
  ...FIXTURE_TABLES,
  projects: [
    { ...FIXTURE_TABLES.projects[0], ...changes },
    ...FIXTURE_TABLES.projects.slice(1),
  ],
})

describe('contentTablesSchema', () => {
  it('accepts the fixture Content', () => {
    expect(contentTablesSchema.safeParse(FIXTURE_TABLES).success).toBe(true)
  })

  it('rejects a Project missing its title in one Locale', () => {
    expect(
      contentTablesSchema.safeParse(withFirstProject({ title_en: ' ' }))
        .success,
    ).toBe(false)
  })

  it('rejects a Metric without a label', () => {
    expect(
      contentTablesSchema.safeParse(
        withFirstProject({ metrics_pl: [{ value: '30 kB' }] }),
      ).success,
    ).toBe(false)
  })

  it('rejects a link with neither a URL nor a note', () => {
    expect(
      contentTablesSchema.safeParse(
        withFirstProject({ links_en: [{ label: 'Repository' }] }),
      ).success,
    ).toBe(false)
  })
})
