import { expect, test } from '@playwright/test'

const cases = [
  { from: '/pl', to: '/en', switchTo: 'EN', heading: 'Tomasz Gołąb' },
  { from: '/en', to: '/pl', switchTo: 'PL', heading: 'Tomasz Gołąb' },
  {
    from: '/pl/projects',
    to: '/en/projects',
    switchTo: 'EN',
    heading: 'Projects',
  },
  {
    from: '/en/projects',
    to: '/pl/projects',
    switchTo: 'PL',
    heading: 'Projekty',
  },
]

for (const { from, to, switchTo, heading } of cases) {
  test(`switching ${from} to ${switchTo} opens ${to}`, async ({ page }) => {
    await page.goto(from)

    await page.getByRole('link', { name: switchTo, exact: true }).click()

    await expect(page).toHaveURL(to)
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      switchTo.toLowerCase(),
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
  })
}

test('the UI copy follows the Locale', async ({ page }) => {
  await page.goto('/pl/projects')
  const nav = page.getByRole('navigation', { name: 'Główna' })
  await expect(nav.getByRole('link', { name: 'Umiejętności' })).toBeVisible()

  await page.getByRole('link', { name: 'EN', exact: true }).click()

  await expect(page).toHaveURL('/en/projects')
  const enNav = page.getByRole('navigation', { name: 'Main' })
  await expect(enNav.getByRole('link', { name: 'Skills' })).toBeVisible()
  await expect(enNav.getByRole('link', { name: 'Contact' })).toBeVisible()
})
