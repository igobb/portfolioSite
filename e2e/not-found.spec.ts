import { expect, test } from '@playwright/test'

test('an unknown Project slug returns the 404 page', async ({ page }) => {
  const response = await page.goto('/pl/projects/nieistniejacy')

  expect(response?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { level: 1, name: '404' }),
  ).toBeVisible()
  await expect(
    page.getByText('~/tgolab $ cd /pl/projects/nieistniejacy'),
  ).toBeVisible()
  await expect(
    page.getByText('bash: cd: nie ma takiego pliku ani katalogu'),
  ).toBeVisible()
})

test('any unknown URL returns the 404 page in its Locale', async ({ page }) => {
  const response = await page.goto('/en/does/not/exist')

  expect(response?.status()).toBe(404)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(
    page.getByRole('heading', { level: 1, name: '404' }),
  ).toBeVisible()
  await expect(
    page.getByText('bash: cd: no such file or directory'),
  ).toBeVisible()
})

test('the 404 page links home, to Projects and to Contact', async ({
  page,
}) => {
  await page.goto('/pl/nieistniejaca-strona')
  const main = page.getByRole('main')

  await expect(
    main.getByRole('link', { name: '[ strona główna ]' }),
  ).toHaveAttribute('href', '/pl')
  await expect(main.getByRole('link', { name: '[ kontakt ]' })).toHaveAttribute(
    'href',
    '/pl#contact',
  )

  await main.getByRole('link', { name: '[ projekty ]' }).click()

  await expect(page).toHaveURL('/pl/projects')
})
