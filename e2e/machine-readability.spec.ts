import { expect, test } from '@playwright/test'
import { FIXTURE_TABLES } from '../src/content/fixtures'

const BASE = 'https://portfolio.tgolab.dev'

const publishedProjects = FIXTURE_TABLES.projects.filter(
  ({ published }) => published,
)

test('pages have a canonical URL and language alternates', async ({ page }) => {
  await page.goto('/en/projects/eventtracker')

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${BASE}/en/projects/eventtracker`,
  )
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(3)
  await expect(
    page.locator('link[rel="alternate"][hreflang="x-default"]'),
  ).toHaveAttribute('href', `${BASE}/pl/projects/eventtracker`)
})

test('llms.txt lists every Project with its URLs in both Locales', async ({
  request,
}) => {
  const response = await request.get('/llms.txt')
  expect(response.ok()).toBe(true)
  const text = await response.text()

  for (const { slug, title_en } of publishedProjects) {
    expect(text).toContain(`[${title_en}](${BASE}/en/projects/${slug})`)
    expect(text).toContain(`${BASE}/pl/projects/${slug}`)
  }
})

test('sitemap.xml lists every Project page in both Locales', async ({
  request,
}) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()

  for (const { slug } of publishedProjects) {
    expect(sitemap).toContain(`<loc>${BASE}/pl/projects/${slug}</loc>`)
    expect(sitemap).toContain(`<loc>${BASE}/en/projects/${slug}</loc>`)
  }
})

test('robots.txt points crawlers at the sitemap', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()

  expect(robots).toContain('Sitemap: https://portfolio.tgolab.dev/sitemap.xml')
})
