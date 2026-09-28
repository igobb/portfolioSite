import type { Locale } from '@/i18n/routing'
import type { ContentSource, Metric, ProjectCard } from './types'

// Row shapes mirror the Supabase tables (ticket 09), so fixtures and the database stay interchangeable.
export type SkillCategoryRow = {
  id: number
  name_pl: string
  name_en: string
  sort_order: number
}

export type SkillRow = {
  id: number
  name: string
  category_id: number
  sort_order: number
}

export type ProjectRow = {
  id: number
  slug: string
  sort_order: number
  published: boolean
  title_pl: string
  title_en: string
  context_pl: string
  context_en: string
  summary_pl: string
  summary_en: string
  metrics_pl: Metric[]
  metrics_en: Metric[]
}

export type ProjectSkillRow = {
  project_id: number
  skill_id: number
}

export type ProjectScreenshotRow = {
  id: number
  project_id: number
  // Fixture Screenshots live in `public/`, so the path doubles as the URL.
  storage_path: string
  alt_pl: string
  alt_en: string
  sort_order: number
}

export type ContentTables = {
  skill_categories: SkillCategoryRow[]
  skills: SkillRow[]
  projects: ProjectRow[]
  project_skills: ProjectSkillRow[]
  project_screenshots: ProjectScreenshotRow[]
}

const bySortOrder = (a: { sort_order: number }, b: { sort_order: number }) =>
  a.sort_order - b.sort_order

export function createFixtureSource(tables: ContentTables): ContentSource {
  const publishedProjects = tables.projects
    .filter((project) => project.published)
    .toSorted(bySortOrder)
  const publishedProjectIds = new Set(
    publishedProjects.map((project) => project.id),
  )
  const skillNameById = new Map(
    tables.skills.map((skill) => [skill.id, skill.name]),
  )

  const skillNamesOf = (projectId: number) =>
    tables.project_skills
      .filter((link) => link.project_id === projectId)
      .flatMap((link) => skillNameById.get(link.skill_id) ?? [])

  const coverOf = (projectId: number, locale: Locale) => {
    const [first] = tables.project_screenshots
      .filter((screenshot) => screenshot.project_id === projectId)
      .toSorted(bySortOrder)

    return first
      ? { src: `/${first.storage_path}`, alt: first[`alt_${locale}`] }
      : null
  }

  const toProjectCard = (project: ProjectRow, locale: Locale): ProjectCard => ({
    slug: project.slug,
    title: project[`title_${locale}`],
    context: project[`context_${locale}`],
    summary: project[`summary_${locale}`],
    metrics: project[`metrics_${locale}`],
    skills: skillNamesOf(project.id),
    cover: coverOf(project.id, locale),
  })

  return {
    async getSkillCategories(locale: Locale) {
      const skillIdsWithProjects = new Set(
        tables.project_skills
          .filter((link) => publishedProjectIds.has(link.project_id))
          .map((link) => link.skill_id),
      )

      return tables.skill_categories.toSorted(bySortOrder).map((category) => ({
        name: category[`name_${locale}`],
        skills: tables.skills
          .filter((skill) => skill.category_id === category.id)
          .toSorted(bySortOrder)
          .map((skill) => ({
            name: skill.name,
            hasProjects: skillIdsWithProjects.has(skill.id),
          })),
      }))
    },

    async getProjectList(locale: Locale) {
      const projects = publishedProjects.map((project) =>
        toProjectCard(project, locale),
      )

      const skills = [
        ...new Set(projects.flatMap((project) => project.skills)),
      ].toSorted((a, b) => a.localeCompare(b, 'en'))

      return { projects, skills }
    },

    async getProjectCards(locale, { offset, limit }) {
      const end = offset + limit

      return {
        projects: publishedProjects
          .slice(offset, end)
          .map((project) => toProjectCard(project, locale)),
        hasMore: end < publishedProjects.length,
      }
    },
  }
}
