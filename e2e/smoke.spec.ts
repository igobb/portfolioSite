import { expect, test } from '@playwright/test'

// The browser locale drives the Accept-Language header.
test.describe('/ redirects by Accept-Language', () => {
  const cases = [
    { browserLanguage: 'en-US', expected: '/en' },
    { browserLanguage: 'pl-PL', expected: '/pl' },
    { browserLanguage: 'de-DE', expected: '/pl' },
  ]

  for (const { browserLanguage, expected } of cases) {
    test(`${browserLanguage} → ${expected}`, async ({ browser }) => {
      const context = await browser.newContext({ locale: browserLanguage })
      const page = await context.newPage()

      await page.goto('/')

      await expect(page).toHaveURL(expected)
      await context.close()
    })
  }
})

for (const locale of ['pl', 'en'] as const) {
  test(`/${locale} renders the home page`, async ({ page }) => {
    await page.goto(`/${locale}`)

    await expect(page.locator('html')).toHaveAttribute('lang', locale)
    await expect(
      page.getByRole('heading', { level: 1, name: 'Tomasz Gołąb' }),
    ).toBeVisible()
    await expect(page.getByText('~/tgolab $ whoami')).toBeVisible()
  })
}

test('an unprefixed path gets the default Locale', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'de-DE' })
  const page = await context.newPage()

  await page.goto('/some-page')

  await expect(page).toHaveURL('/pl/some-page')
  await context.close()
})
