import { useTranslations } from 'next-intl'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import type { ProjectList } from '@/content'
import { Link } from '@/i18n/navigation'
import { filterProjects } from '../../../filter-projects'
import { NoResults } from './components/NoResults'
import { SkillFilter } from './components/SkillFilter'

type ProjectsViewProps = ProjectList & {
  selectedSkills: string[]
  onSelect: (skills: string[]) => void
}

export function ProjectsView({
  projects,
  skills,
  selectedSkills,
  onSelect,
}: ProjectsViewProps) {
  const t = useTranslations('ProjectsPage')

  const visibleProjects = filterProjects(projects, selectedSkills)

  const skillFlags = selectedSkills
    .map((skill) => ` --skill="${skill}"`)
    .join('')

  const clear = () => onSelect([])

  function toggle(skill: string) {
    onSelect(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((selected) => selected !== skill)
        : [...selectedSkills, skill],
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2.5 px-4 xl:gap-3.5 xl:px-0">
        <Link href="/" className="text-[13px] text-muted xl:hidden">
          <span aria-hidden>← </span>
          {t('homeLink')}
        </Link>

        <p className="mt-3 text-[13px] break-words text-muted xl:mt-0 xl:text-base">
          ~/tgolab <span className="text-accent-text">$</span>{' '}
          {t('promptCommand')}
          <span className="hidden xl:inline">{skillFlags}</span>
        </p>

        <h1 className="text-4xl font-bold tracking-[-0.02em] xl:text-[56px] xl:leading-[1.1]">
          {t('title')}
        </h1>

        <p aria-live="polite" className="text-sm text-muted xl:text-[15px]">
          {selectedSkills.length > 0
            ? t('filteredCount', {
                shown: visibleProjects.length,
                total: projects.length,
              })
            : t('count', { total: projects.length })}
        </p>
      </div>

      <SkillFilter
        skills={skills}
        selectedSkills={selectedSkills}
        onToggle={toggle}
        onClear={clear}
      />

      {visibleProjects.length > 0 ? (
        <ul className="mt-8 grid gap-8 px-4 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-10 xl:px-0">
          {visibleProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                highlightedSkills={selectedSkills}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoResults
          command={`${t('promptCommand')}${skillFlags}`}
          onClear={clear}
        />
      )}
    </>
  )
}
