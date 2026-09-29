import type { Locale } from '@/i18n/routing'

export type Skill = {
  name: string
  hasProjects: boolean
}

export type SkillCategory = {
  name: string
  skills: Skill[]
}

export type Metric = {
  value: string
  label: string
}

export type Screenshot = {
  src: string
  alt: string
}

export type ProjectCard = {
  slug: string
  title: string
  context: string
  summary: string
  metrics: Metric[]
  skills: string[]
  cover: Screenshot | null
}

export type ProjectList = {
  projects: ProjectCard[]
  skills: string[]
}

export type ProjectCardSlice = {
  projects: ProjectCard[]
  hasMore: boolean
}

export type ProjectCardRange = {
  offset: number
  limit: number
}

export type Challenge = {
  title: string
  body: string
}

export type StackGroup = {
  label: string
  items: string[]
}

export type ProjectLink =
  { label: string; url: string } | { label: string; note: string }

export type ProjectPage = {
  slug: string
  title: string
  context: string
  summary: string
  metrics: Metric[]
  skills: string[]
  screenshots: Screenshot[]
  problem: string
  role: string
  built: string[]
  challenges: Challenge[]
  outcomes: string[]
  stack: StackGroup[]
  links: ProjectLink[]
  next: { slug: string; title: string } | null
}

export type ContentSource = {
  getSkillCategories(locale: Locale): Promise<SkillCategory[]>
  getProjectList(locale: Locale): Promise<ProjectList>
  getProjectCards(
    locale: Locale,
    range: ProjectCardRange,
  ): Promise<ProjectCardSlice>
  getProjectPage(locale: Locale, slug: string): Promise<ProjectPage | null>
}
