import { expect, test, type Page } from '@playwright/test'

const metaContent = (page: Page, selector: string) =>
  page.locator(`meta[${selector}]`).getAttribute('content')

const PAGES = ['/pl', '/en/projects', '/pl/projects/eventtracker']

for (const path of PAGES) {
  test(`${path} shares the universal Open Graph image as a large Twitter card`, async ({
    page,
    request,
  }) => {
    await page.goto(path)

    const ogImage = await metaContent(page, 'property="og:image"')
    expect(ogImage).toMatch(
      /^https:\/\/portfolio\.tgolab\.dev\/(pl|en)\/opengraph-image/,
    )
    expect(await metaContent(page, 'property="og:image:alt"')).toBe(
      'Tomasz Gołąb – Fullstack & Frontend Developer',
    )
    expect(await metaContent(page, 'name="twitter:card"')).toBe(
      'summary_large_image',
    )
    expect(await metaContent(page, 'name="twitter:image"')).toBe(ogImage)

    const { pathname, search } = new URL(ogImage!)
    const response = await request.get(pathname + search)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toBe('image/png')
  })
}
