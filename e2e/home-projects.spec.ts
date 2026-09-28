import { expect, test, type Page, type Route } from '@playwright/test'

const projectsSection = (page: Page, name = 'Projekty') =>
  page.getByRole('region', { name })

const cardTitles = (page: Page, name?: string) =>
  projectsSection(page, name).getByRole('heading', { level: 3 })

const isServerAction = (route: Route) =>
  route.request().method() === 'POST' &&
  'next-action' in route.request().headers()

test.describe('desktop home Projects', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('shows three Project cards and loads the other three on "Show more"', async ({
    page,
  }) => {
    await page.goto('/pl')
    const section = projectsSection(page)

    await expect(section).toHaveAttribute('id', 'projects')
    await expect(cardTitles(page)).toHaveText([
      'EventTracker',
      'Solis — agent AI',
      'Internacjonalizacja aplikacji',
    ])

    await section.getByRole('button', { name: 'Pokaż więcej' }).click()

    await expect(cardTitles(page)).toHaveCount(6)
    await expect(
      section.getByRole('button', { name: 'Pokaż więcej' }),
    ).toHaveCount(0)
    await expect(
      section.getByRole('link', { name: 'Raportowanie błędów' }),
    ).toBeFocused()
  })

  test('links to the full Projects list', async ({ page }) => {
    await page.goto('/en')

    await projectsSection(page, 'Projects')
      .getByRole('link', { name: 'All projects · filter by Skill' })
      .click()

    await expect(page).toHaveURL('/en/projects')
  })

  test('offers a retry when loading more fails', async ({ page }) => {
    await page.goto('/pl')
    const section = projectsSection(page)

    await page.route('**/pl', (route) =>
      isServerAction(route) ? route.abort() : route.continue(),
    )
    await section.getByRole('button', { name: 'Pokaż więcej' }).click()

    await expect(
      section.getByText('Nie udało się wczytać kolejnych projektów.'),
    ).toBeVisible()
    await expect(cardTitles(page)).toHaveCount(3)

    await page.unroute('**/pl')
    await section.getByRole('button', { name: 'Spróbuj ponownie' }).click()

    await expect(cardTitles(page)).toHaveCount(6)
    await expect(
      section.getByText('Nie udało się wczytać kolejnych projektów.'),
    ).toHaveCount(0)
  })

  test('shows a pending state while loading', async ({ page }) => {
    await page.goto('/pl')
    const section = projectsSection(page)

    let release = () => {}
    const held = new Promise<void>((resolve) => (release = resolve))
    await page.route('**/pl', async (route) => {
      if (isServerAction(route)) await held
      await route.continue()
    })
    await section.getByRole('button', { name: 'Pokaż więcej' }).click()

    const pending = section.getByRole('button', { name: 'Wczytuję…' })
    await expect(pending).toHaveAttribute('aria-busy', 'true')
    await expect(pending).toBeFocused()

    release()

    await expect(cardTitles(page)).toHaveCount(6)
  })
})

test.describe('mobile home Projects', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('uses the short link below the cards', async ({ page }) => {
    await page.goto('/pl')
    const section = projectsSection(page)

    await expect(
      section.getByRole('link', {
        name: 'Wszystkie projekty · filtruj',
        exact: true,
      }),
    ).toBeVisible()
    await expect(
      section.getByRole('link', {
        name: 'Wszystkie projekty · filtruj po Skillach',
      }),
    ).toBeHidden()
  })
})
