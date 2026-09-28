'use client'

import { useTranslations } from 'next-intl'
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from 'react'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import type { ProjectCard as ProjectCardContent } from '@/content'
import type { Locale } from '@/i18n/routing'
import {
  loadMoreProjects,
  type LoadMoreProjectsResult,
} from '../load-more-projects'

type ShowMoreProjectsProps = {
  locale: Locale
  initialSlugs: string[]
  initialHasMore: boolean
  children: ReactNode
}

export function ShowMoreProjects({
  locale,
  initialSlugs,
  initialHasMore,
  children,
}: ShowMoreProjectsProps) {
  const t = useTranslations('HomeProjects')

  const [loaded, setLoaded] = useState<ProjectCardContent[]>([])

  const [hasMore, setHasMore] = useState(initialHasMore)

  const [failed, setFailed] = useState(false)

  const [focusSlug, setFocusSlug] = useState<string | null>(null)

  const [isPending, startTransition] = useTransition()

  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!focusSlug) return

    listRef.current
      ?.querySelector<HTMLElement>(`[data-slug="${focusSlug}"] a`)
      ?.focus()
  }, [focusSlug])

  const loadMore = () => {
    if (isPending) return

    startTransition(async () => {
      let result: LoadMoreProjectsResult
      try {
        result = await loadMoreProjects(
          locale,
          initialSlugs.length + loaded.length,
        )
      } catch {
        // A network failure rejects instead of returning; without the catch it would reach the error boundary.
        result = { ok: false }
      }

      startTransition(() => {
        setFailed(!result.ok)

        if (!result.ok) return

        // The first page is a static snapshot; if Projects changed since, the offset can overlap what is shown.
        const shownSlugs = [...initialSlugs, ...loaded.map(({ slug }) => slug)]
        const fresh = result.projects.filter(
          ({ slug }) => !shownSlugs.includes(slug),
        )

        setLoaded([...loaded, ...fresh])
        setHasMore(result.hasMore)

        // The button unmounts with the last page, so hand focus to the first new card.
        if (!result.hasMore) setFocusSlug(fresh[0]?.slug ?? null)
      })
    })
  }

  const buttonLabel = isPending
    ? t('loading')
    : failed
      ? t('retry')
      : t('showMore')

  return (
    <>
      <ul
        ref={listRef}
        className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-y-10"
      >
        {children}

        {loaded.map((project) => (
          <li key={project.slug} data-slug={project.slug}>
            <ProjectCard project={project} headingLevel="h3" />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="flex flex-col gap-3 md:items-center">
          <p
            aria-live="polite"
            className="text-center text-sm text-accent-text empty:hidden"
          >
            {failed && !isPending ? t('loadError') : null}
          </p>

          <button
            type="button"
            onClick={loadMore}
            aria-disabled={isPending}
            aria-busy={isPending}
            className={`h-[52px] border-[1.5px] border-ink px-7 text-[15px] font-bold ${
              isPending ? 'cursor-wait text-muted' : ''
            }`}
          >
            [ {buttonLabel} ]
          </button>
        </div>
      )}
    </>
  )
}
