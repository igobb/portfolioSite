export function filterProjects<Project extends { skills: string[] }>(
  projects: Project[],
  selectedSkills: string[],
) {
  return projects.filter((project) =>
    selectedSkills.every((skill) => project.skills.includes(skill)),
  )
}
