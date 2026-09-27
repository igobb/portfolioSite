import type { Locale } from '@/i18n/routing'

export type Skill = {
  name: string
  hasProjects: boolean
}

export type SkillCategory = {
  name: string
  skills: Skill[]
}

export type ContentSource = {
  getSkillCategories(locale: Locale): Promise<SkillCategory[]>
}
