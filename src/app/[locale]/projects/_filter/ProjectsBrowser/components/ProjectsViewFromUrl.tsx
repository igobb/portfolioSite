import { useSearchParams } from 'next/navigation'
import type { ProjectList } from '@/content'
import { ProjectsView } from './ProjectsView/ProjectsView'

const SKILL_PARAM = 'skill'

export function ProjectsViewFromUrl(props: ProjectList) {
  const searchParams = useSearchParams()

  const selectedSkills = [...new Set(searchParams.getAll(SKILL_PARAM))].filter(
    (skill) => props.skills.includes(skill),
  )

  function select(skills: string[]) {
    const params = new URLSearchParams(searchParams.toString())

    params.delete(SKILL_PARAM)

    for (const skill of skills) params.append(SKILL_PARAM, skill)

    const query = params.toString()

    window.history.replaceState(
      null,
      '',
      query ? `?${query}` : window.location.pathname,
    )
  }

  return (
    <ProjectsView
      {...props}
      selectedSkills={selectedSkills}
      onSelect={select}
    />
  )
}
