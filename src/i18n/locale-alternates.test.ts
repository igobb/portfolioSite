import { describe, expect, it } from 'vitest'
import { localeAlternates } from './locale-alternates'

describe('localeAlternates', () => {
  it('points canonical at the page in its own Locale', () => {
    expect(localeAlternates('en', '/projects').canonical).toBe(
      'https://portfolio.tgolab.dev/en/projects',
    )
  })

  it('lists every Locale and x-default (the default Locale) as language alternates', () => {
    expect(localeAlternates('en', '/projects/eventtracker').languages).toEqual({
      pl: 'https://portfolio.tgolab.dev/pl/projects/eventtracker',
      en: 'https://portfolio.tgolab.dev/en/projects/eventtracker',
      'x-default': 'https://portfolio.tgolab.dev/pl/projects/eventtracker',
    })
  })

  it('uses the bare Locale prefix for the home page', () => {
    expect(localeAlternates('pl')).toEqual({
      canonical: 'https://portfolio.tgolab.dev/pl',
      languages: {
        pl: 'https://portfolio.tgolab.dev/pl',
        en: 'https://portfolio.tgolab.dev/en',
        'x-default': 'https://portfolio.tgolab.dev/pl',
      },
    })
  })
})
