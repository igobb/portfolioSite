import { describe, expect, it } from 'vitest'
import en from '../../messages/en.json'
import pl from '../../messages/pl.json'
import { routing } from './routing'

/** Flattens a message catalog into [dotted key path, leaf value] pairs. */
function leaves(messages: object, prefix = ''): [string, unknown][] {
  return Object.entries(messages).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'object' && value !== null
      ? leaves(value, path)
      : [[path, value] as [string, unknown]]
  })
}

const keysOf = (messages: object) =>
  leaves(messages)
    .map(([path]) => path)
    .sort()

describe('UI copy catalogs', () => {
  it('exist for every Locale, with pl as the default', () => {
    expect(routing.locales).toEqual(['pl', 'en'])
    expect(routing.defaultLocale).toBe('pl')
  })

  it('have the same keys in pl and en', () => {
    expect(keysOf(en)).toEqual(keysOf(pl))
  })

  it('have no empty strings', () => {
    for (const messages of [pl, en]) {
      for (const [, value] of leaves(messages)) {
        expect(typeof value === 'string' && value.trim() !== '').toBe(true)
      }
    }
  })
})
