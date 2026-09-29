import { useTranslations } from 'next-intl'
import type { ProjectPage } from '@/content'
import { SkillChip } from '@/components/SkillChip'
import { Link } from '@/i18n/navigation'

export function ProjectIntro({ project }: { project: ProjectPage }) {
  const t = useTranslations('ProjectPage')

  return (
    <div className="flex flex-col">
      <Link
        href="/projects"
        className="self-start text-[13px] text-muted xl:text-sm"
      >
        <span aria-hidden>← </span>
        {t('allProjects')}
      </Link>

      <div className="mt-8 flex flex-col gap-3.5 xl:mt-10 xl:gap-[18px]">
        <p className="text-[13px] break-words text-muted xl:text-base">
          ~/tgolab/{t('promptDirectory')}{' '}
          <span className="text-accent-text">$</span> cat {project.slug}.md
        </p>

        <h1 className="text-[40px] leading-none font-bold tracking-[-0.03em] break-words sm:text-6xl xl:text-7xl">
          {project.title}
        </h1>

        <p className="text-xs tracking-[0.08em] text-muted uppercase xl:text-sm">
          {project.context}
        </p>

        <p className="mt-2 max-w-[860px] text-base leading-[1.6] xl:text-xl">
          {project.summary}
        </p>

        {project.skills.length > 0 && (
          <ul aria-label={t('skills')} className="mt-1.5 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <li key={skill}>
                <SkillChip
                  skill={skill}
                  href={{ pathname: '/projects', query: { skill } }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
