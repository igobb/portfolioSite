import type { Locale } from '@/i18n/routing'
import { createFixtureSource } from './fixture-source'
import { FIXTURE_TABLES } from './fixtures'
import type { ContentSource } from './types'

export type {
  Metric,
  ProjectCard,
  ProjectCardSlice,
  ProjectList,
  Screenshot,
  Skill,
  SkillCategory,
} from './types'

const PROJECT_CARDS_PER_LOAD = 3

function contentSource(): ContentSource {
  const name = process.env.CONTENT_SOURCE ?? 'fixtures'

  if (name === 'fixtures') return createFixtureSource(FIXTURE_TABLES)

  throw new Error(`Unknown CONTENT_SOURCE: ${name}`)
}

export async function getSkillCategories(locale: Locale) {
  return contentSource().getSkillCategories(locale)
}

export async function getProjectList(locale: Locale) {
  return contentSource().getProjectList(locale)
}

export async function getProjectCards(
  locale: Locale,
  {
    offset,
    limit = PROJECT_CARDS_PER_LOAD,
  }: { offset: number; limit?: number },
) {
  return contentSource().getProjectCards(locale, { offset, limit })
}
