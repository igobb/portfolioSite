import { getLocale, getTranslations } from 'next-intl/server'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { SECTION_ID } from '@/constants/site'
import { getProjectCards } from '@/content'
import { Link } from '@/i18n/navigation'
import { ShowMoreProjects } from './components/ShowMoreProjects'

const ALL_PROJECTS_LINK =
  'border-b-2 border-ink pb-1 text-sm font-bold md:text-[15px]'

export async function HomeProjects() {
  const t = await getTranslations('HomeProjects')

  const locale = await getLocale()

  const { projects, hasMore } = await getProjectCards(locale, { offset: 0 })

  return (
    <section
      id={SECTION_ID.projects}
      aria-labelledby="projects-heading"
      className="border-t-[1.5px] border-ink"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pt-12 pb-14 xl:gap-12 xl:px-[120px] xl:pt-[110px] xl:pb-[72px]">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5 xl:gap-3.5">
            <p className="text-sm text-muted xl:text-base">
              ~/tgolab <span className="text-accent-text">$</span>{' '}
              {t('promptCommand')}
            </p>

            <h2
              id="projects-heading"
              className="text-[32px] leading-tight font-bold tracking-[-0.02em] xl:text-5xl xl:leading-[1.1]"
            >
              {t('title')}
            </h2>
          </div>

          <Link
            href="/projects"
            className={`hidden md:inline ${ALL_PROJECTS_LINK}`}
          >
            {t('allProjects')} <span aria-hidden>→</span>
          </Link>
        </div>

        <ShowMoreProjects
          locale={locale}
          initialSlugs={projects.map((project) => project.slug)}
          initialHasMore={hasMore}
        >
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingLevel="h3" />
            </li>
          ))}
        </ShowMoreProjects>

        <Link
          href="/projects"
          className={`self-center md:hidden ${ALL_PROJECTS_LINK}`}
        >
          {t('allProjectsShort')} <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}
