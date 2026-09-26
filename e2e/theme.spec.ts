import { expect, test, type Page } from '@playwright/test'

const LIGHT_PAPER = 'rgb(239, 235, 224)'
const DARK_PAPER = 'rgb(20, 20, 18)'

const background = (page: Page) =>
  page
    .locator('body')
    .evaluate((body) => getComputedStyle(body).backgroundColor)

const toggle = (page: Page) =>
  page.getByRole('button', { name: 'Przełącz tryb jasny / ciemny' })

for (const [colorScheme, paper] of [
  ['light', LIGHT_PAPER],
  ['dark', DARK_PAPER],
] as const) {
  test(`follows a ${colorScheme} system theme on the first visit`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme })
    const page = await context.newPage()

    await page.goto('/pl')

    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      colorScheme,
    )
    expect(await background(page)).toBe(paper)
    await context.close()
  })
}

test('follows a system theme change until a theme is picked', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/pl')

  await page.emulateMedia({ colorScheme: 'dark' })

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(await background(page)).toBe(DARK_PAPER)
})

test('the toggle switches the theme and the choice survives a reload', async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: 'light' })
  const page = await context.newPage()
  await page.goto('/pl')

  await toggle(page).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(await background(page)).toBe(DARK_PAPER)

  await page.reload()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(await background(page)).toBe(DARK_PAPER)

  await toggle(page).click()
  await page.getByRole('link', { name: 'EN', exact: true }).click()

  await expect(page).toHaveURL('/en')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  expect(await background(page)).toBe(LIGHT_PAPER)
  await context.close()
})

test('a stored theme is applied before any content is parsed', async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: 'light' })
  await context.addInitScript(() => localStorage.setItem('theme', 'dark'))

  // Record the theme at the moment the first piece of page content (the header)
  // is parsed, before any app JS runs.
  await context.addInitScript(() => {
    new MutationObserver((_, observer) => {
      if (!document.querySelector('header')) return
      ;(window as unknown as { themeAtHeader: string | null }).themeAtHeader =
        document.documentElement.getAttribute('data-theme')
      observer.disconnect()
    }).observe(document, { childList: true, subtree: true })
  })
  const page = await context.newPage()

  await page.goto('/pl')

  expect(
    await page.evaluate(
      () => (window as unknown as { themeAtHeader?: string }).themeAtHeader,
    ),
  ).toBe('dark')
  await context.close()
})

test('the site works when storage is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'light' })
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError')
      },
    })
  })
  const page = await context.newPage()
  const errors: Error[] = []
  page.on('pageerror', (error) => errors.push(error))

  await page.goto('/pl')
  await toggle(page).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(errors).toEqual([])
  await context.close()
})
