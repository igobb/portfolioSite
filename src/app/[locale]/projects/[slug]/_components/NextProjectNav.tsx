import { useTranslations } from 'next-intl'
import type { ProjectPage } from '@/content'
import { Link } from '@/i18n/navigation'

export function NextProjectNav({ next }: { next: ProjectPage['next'] }) {
  const t = useTranslations('ProjectPage')

  return (
    <nav
      aria-label={t('projectNav')}
      className="mt-16 flex flex-col gap-6 border-y-[1.5px] border-ink py-6 sm:flex-row sm:items-center sm:justify-between xl:mt-24 xl:py-8"
    >
      <Link href="/projects" className="text-sm text-muted xl:text-[15px]">
        <span aria-hidden>← </span>
        {t('allProjects')}
      </Link>

      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="flex flex-col gap-1.5 sm:items-end"
        >
          <span className="text-[13px] text-muted">{t('nextProject')}</span>

          <span className="text-xl font-bold xl:text-2xl">
            {next.title} <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </nav>
  )
}
