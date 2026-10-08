import { useTranslations } from 'next-intl'
import type { ProjectCard as ProjectCardContent } from '@/content'
import { Link } from '@/i18n/navigation'
import { ProjectCover } from './components/ProjectCover'

const CARD_METRICS_LIMIT = 2

type ProjectCardProps = {
  project: ProjectCardContent
  highlightedSkills?: string[]
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({
  project,
  highlightedSkills = [],
  headingLevel: Heading = 'h2',
}: ProjectCardProps) {
  const t = useTranslations('ProjectCard')

  const titleId = `project-${project.slug}-title`

  const metrics = project.metrics.slice(0, CARD_METRICS_LIMIT)

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-labelledby={titleId}
      className="group mx-auto flex w-full max-w-[380px] flex-col md:h-[704px]"
    >
      <span className="self-start border-[1.5px] border-b-0 border-ink bg-surface px-3 py-[5px] text-xs md:px-3.5 md:py-1.5 md:text-[13px]">
        {project.slug}/
      </span>

      <div className="flex grow flex-col border-[1.5px] border-ink bg-surface">
        <ProjectCover cover={project.cover} />

        <div className="flex grow flex-col gap-3 p-[18px] md:gap-3.5 md:p-6">
          <p className="text-[11px] tracking-[0.08em] text-muted uppercase md:h-[17px] md:shrink-0 md:text-xs md:leading-[17px]">
            {project.context}
          </p>

          <Heading
            id={titleId}
            className="text-[21px] leading-[1.2] font-bold md:line-clamp-2 md:h-[58px] md:shrink-0 md:text-2xl md:leading-[29px]"
          >
            {project.title}
          </Heading>

          <p className="text-sm leading-[1.6] md:line-clamp-6 md:h-[144px] md:shrink-0 md:text-[15px] md:leading-6">
            {project.summary}
          </p>

          <ul
            className={`flex-col gap-1 text-[13px] font-bold md:flex md:h-11 md:shrink-0 md:text-sm md:leading-5 ${
              metrics.length > 0 ? 'flex' : 'hidden'
            }`}
          >
            {metrics.map((metric) => (
              <li key={metric.label}>
                <span aria-hidden>▸ </span>
                {metric.value} {metric.label}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-1.5 md:mt-auto">
            {project.skills.map((skill) => (
              <li
                key={skill}
                className={`border px-2 py-[3px] text-[11px] md:text-xs ${
                  highlightedSkills.includes(skill)
                    ? 'border-ink font-bold text-ink'
                    : 'border-line text-muted'
                }`}
              >
                {skill}
              </li>
            ))}
          </ul>

          <p className="text-sm font-bold group-hover:underline">
            {t('open')} <span aria-hidden>→</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
