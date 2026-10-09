import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots.txt', () => {
  it('lets every crawler in and points it at the sitemap', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://portfolio.tgolab.dev/sitemap.xml',
    })
  })
})
