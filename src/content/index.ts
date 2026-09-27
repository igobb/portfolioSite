import type { Locale } from '@/i18n/routing'
import { createFixtureSource } from './fixture-source'
import { FIXTURE_TABLES } from './fixtures'
import type { ContentSource } from './types'

export type { Skill, SkillCategory } from './types'

function contentSource(): ContentSource {
  const name = process.env.CONTENT_SOURCE ?? 'fixtures'

  if (name === 'fixtures') return createFixtureSource(FIXTURE_TABLES)

  throw new Error(`Unknown CONTENT_SOURCE: ${name}`)
}

export async function getSkillCategories(locale: Locale) {
  return contentSource().getSkillCategories(locale)
}
