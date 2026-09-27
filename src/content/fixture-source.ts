import type { Locale } from '@/i18n/routing'
import type { ContentSource } from './types'

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
}

export type ProjectSkillRow = {
  project_id: number
  skill_id: number
}

export type ContentTables = {
  skill_categories: SkillCategoryRow[]
  skills: SkillRow[]
  projects: ProjectRow[]
  project_skills: ProjectSkillRow[]
}

const bySortOrder = (a: { sort_order: number }, b: { sort_order: number }) =>
  a.sort_order - b.sort_order

export function createFixtureSource(tables: ContentTables): ContentSource {
  return {
    async getSkillCategories(locale: Locale) {
      const publishedProjectIds = new Set(
        tables.projects
          .filter((project) => project.published)
          .map((project) => project.id),
      )
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
  }
}
