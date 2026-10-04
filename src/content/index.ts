import { revalidateTag } from 'next/cache'
import type { Locale } from '@/i18n/routing'
import { createFixtureSource } from './fixture-source'
import { FIXTURE_TABLES } from './fixtures'
import {
  CONTENT_TAG,
  createSupabaseSource,
  pingSupabase,
} from './supabase-source'
import type { ContentSource } from './types'

export type {
  Challenge,
  Metric,
  ProjectCard,
  ProjectCardSlice,
  ProjectLink,
  ProjectList,
  ProjectPage,
  Screenshot,
  Skill,
  SkillCategory,
  StackGroup,
} from './types'

const PROJECT_CARDS_PER_LOAD = 3

const contentSourceName = () => process.env.CONTENT_SOURCE ?? 'fixtures'

function contentSource(): ContentSource {
  const name = contentSourceName()

  if (name === 'fixtures') return createFixtureSource(FIXTURE_TABLES)
  if (name === 'supabase') return createSupabaseSource()

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

export async function getProjectPage(locale: Locale, slug: string) {
  return contentSource().getProjectPage(locale, slug)
}

export function revalidateContent() {
  revalidateTag(CONTENT_TAG, { expire: 0 })
}

export async function keepContentSourceAwake() {
  if (contentSourceName() === 'supabase') await pingSupabase()
}
