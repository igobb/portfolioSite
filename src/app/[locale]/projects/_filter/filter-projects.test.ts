import { describe, expect, it } from 'vitest'
import { filterProjects } from './filter-projects'

const projects = [
  { slug: 'eventtracker', skills: ['React', 'TypeScript', 'SWR'] },
  { slug: 'solis', skills: ['React', 'TypeScript', 'Mastra'] },
  { slug: 'i18n', skills: ['React', 'i18next'] },
]

const slugs = (list: { slug: string }[]) => list.map((project) => project.slug)

describe('filterProjects', () => {
  it('keeps every Project card when no Skill is selected', () => {
    expect(slugs(filterProjects(projects, []))).toEqual([
      'eventtracker',
      'solis',
      'i18n',
    ])
  })

  it('keeps the Project cards that have the selected Skill', () => {
    expect(slugs(filterProjects(projects, ['TypeScript']))).toEqual([
      'eventtracker',
      'solis',
    ])
  })

  it('keeps only the Project cards that have every selected Skill', () => {
    expect(slugs(filterProjects(projects, ['TypeScript', 'Mastra']))).toEqual([
      'solis',
    ])
  })

  it('returns nothing when no Project card has every selected Skill', () => {
    expect(filterProjects(projects, ['i18next', 'Mastra'])).toEqual([])
  })
})
