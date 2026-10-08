import { describe, expect, it } from 'vitest'
import { FIXTURE_TABLES } from './fixtures'

// Words that read the same in both Locales; anything else copied from *_pl to *_en is untranslated.
const SAME_IN_BOTH = new Set([
  ...FIXTURE_TABLES.skills.map((skill) => skill.name),
  'EventTracker',
  'Landingi',
  'Frontend',
  'AI',
  'Dashboard',
  'CI/CD',
])

// URLs and Metric values are facts, so they may legitimately match.
const FACT_KEYS = new Set(['url', 'value'])

type TextPair = { path: string; pl: unknown; en: unknown }

function textPairs(pl: unknown, en: unknown, path: string): TextPair[] {
  if (Array.isArray(pl)) {
    const enItems: unknown[] = Array.isArray(en) ? en : []
    const items = Array.from(
      { length: Math.max(pl.length, enItems.length) },
      (_, index) => index,
    )
    return items.flatMap((index) =>
      textPairs(pl[index], enItems[index], `${path}[${index}]`),
    )
  }
  if (typeof pl === 'object' && pl !== null) {
    return Object.entries(pl).flatMap(([key, value]) =>
      FACT_KEYS.has(key)
        ? []
        : textPairs(
            value,
            (en as Record<string, unknown> | undefined)?.[key],
            `${path}.${key}`,
          ),
    )
  }
  return [{ path, pl, en }]
}

// A missing item on either side means the two Locales list different things.
const isUntranslated = ({ pl, en }: TextPair) =>
  pl === undefined ||
  en === undefined ||
  (pl === en && pl !== '' && !SAME_IN_BOTH.has(String(pl)))

const rows = [
  ...FIXTURE_TABLES.skill_categories.map((row) => ({
    name: `Skill category ${row.id}`,
    row,
  })),
  ...FIXTURE_TABLES.projects.map((row) => ({ name: row.slug, row })),
  ...FIXTURE_TABLES.project_screenshots.map((row) => ({
    name: `Screenshot ${row.id}`,
    row,
  })),
]

describe('fixture Content in English', () => {
  it.each(rows)(
    '$name has no Polish copied into its English fields',
    ({ row }) => {
      const untranslated = Object.entries(row)
        .filter(([column]) => column.endsWith('_pl'))
        .flatMap(([column, pl]) => {
          const field = column.slice(0, -'_pl'.length)
          return textPairs(pl, row[`${field}_en` as keyof typeof row], field)
        })
        .filter(isUntranslated)
        .map(({ path }) => path)

      expect(untranslated).toEqual([])
    },
  )
})
