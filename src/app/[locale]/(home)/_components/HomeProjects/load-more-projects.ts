'use server'

import { hasLocale } from 'next-intl'
import { getProjectCards, type ProjectCardSlice } from '@/content'
import { routing } from '@/i18n/routing'

export type LoadMoreProjectsResult =
  ({ ok: true } & ProjectCardSlice) | { ok: false }

export async function loadMoreProjects(
  locale: string,
  offset: number,
): Promise<LoadMoreProjectsResult> {
  if (
    !hasLocale(routing.locales, locale) ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return { ok: false }
  }

  try {
    return { ok: true, ...(await getProjectCards(locale, { offset })) }
  } catch (error) {
    console.error('Loading more Projects failed', error)
    return { ok: false }
  }
}
