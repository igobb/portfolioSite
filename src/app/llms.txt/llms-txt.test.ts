import { describe, expect, it } from 'vitest'
import { llmsTxt } from './llms-txt'

const BASE = 'https://portfolio.tgolab.dev'

const text = llmsTxt({
  skillCategories: [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', hasProjects: true },
        { name: 'Next.js', hasProjects: false },
      ],
    },
    { name: 'Testing', skills: [{ name: 'Playwright', hasProjects: true }] },
  ],
  projects: [
    {
      slug: 'eventtracker',
      title: 'EventTracker',
      context: 'Landingi',
      summary: 'An analytics tool\nbuilt into Landingi.',
      metrics: [],
      skills: ['React'],
      cover: null,
    },
  ],
})

describe('llms.txt', () => {
  it('starts with the owner as the title and a one-sentence summary', () => {
    expect(
      text.startsWith(
        '# Tomasz Gołąb\n\n> Tomasz Gołąb is a Fullstack and Frontend Developer working daily with React, Next.js and TypeScript, plus AI automation.\n',
      ),
    ).toBe(true)
  })

  it('links the home page and the CV in both Locales, and the owner’s profiles', () => {
    for (const url of [
      `${BASE}/en`,
      `${BASE}/pl`,
      `${BASE}/cv/tomasz-golab-cv-en.pdf`,
      `${BASE}/cv/tomasz-golab-cv-pl.pdf`,
      'https://github.com/igobb',
      'https://www.linkedin.com/in/igobb/',
      'mailto:t.golab06@gmail.com',
    ]) {
      expect(text).toContain(url)
    }
  })

  it('lists Skills by category', () => {
    expect(text).toContain(
      '## Skills\n\n- Frontend: React, Next.js\n- Testing: Playwright\n',
    )
  })

  it('lists each Project with a one-line summary and its URLs in both Locales', () => {
    expect(text).toContain(
      `- [EventTracker](${BASE}/en/projects/eventtracker) (Landingi): An analytics tool built into Landingi. Polish: ${BASE}/pl/projects/eventtracker\n`,
    )
  })
})
