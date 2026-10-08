import { expect, test, type Page } from '@playwright/test'

const main = (page: Page) => page.getByRole('main')
const sectionHeadings = (page: Page) =>
  main(page).locator('article').getByRole('heading', { level: 2 })
const carousel = (page: Page) =>
  page.getByRole('region', { name: 'Zrzuty ekranu' })

test('a Project page renders its header block, Metrics and sections', async ({
  page,
}) => {
  await page.goto('/pl/projects/eventtracker')

  await expect(page).toHaveTitle('EventTracker – Tomasz Gołąb')
  await expect(
    main(page).getByRole('heading', { level: 1, name: 'EventTracker' }),
  ).toBeVisible()
  await expect(
    main(page).getByText('~/tgolab/projekty $ cat eventtracker.md'),
  ).toBeVisible()
  await expect(
    main(page).getByRole('list', { name: 'Metryki' }).getByRole('listitem'),
  ).toHaveText(['1,2 mln+sesji dziennie', '< 25 kBskryptu śledzącego'])

  await expect(sectionHeadings(page)).toHaveText([
    '## Problem',
    '## Moja rola',
    '## Wyzwania',
    '## Efekt',
  ])
  await expect(
    main(page).getByRole('heading', {
      level: 3,
      name: '01 · Skrypt, który nie może kosztować klienta wyników',
    }),
  ).toBeVisible()

  const panel = main(page).getByRole('complementary')
  await expect(panel.getByText('Skrypt śledzący')).toBeVisible()
  await expect(
    panel.getByText('React, TypeScript, SWR, Recharts'),
  ).toBeVisible()
  await expect(
    panel.getByRole('link', { name: 'Strona produktowa' }),
  ).toHaveAttribute('href', 'https://landingi.com/pl/produkt/eventtracker/')
  await expect(panel.getByText('kod zamknięty')).toBeVisible()
})

test('a Project page is translated in English', async ({ page }) => {
  await page.goto('/en/projects/eventtracker')

  await expect(sectionHeadings(page)).toHaveText([
    '## Problem',
    '## My role',
    '## Challenges',
    '## Outcomes',
  ])
  await expect(
    page.getByRole('region', { name: 'Screenshots' }).getByRole('img').first(),
  ).toHaveAttribute('alt', 'Analytics dashboard')
  await expect(
    page.getByRole('link', { name: 'Product page' }),
  ).toHaveAttribute('href', 'https://landingi.com/product/eventtracker/')
})

test('sections without content are omitted and a striped placeholder replaces Screenshots', async ({
  page,
}) => {
  await page.goto('/pl/projects/solis')

  await expect(
    main(page).getByRole('heading', { level: 1, name: 'Solis — agent AI' }),
  ).toBeVisible()
  await expect(main(page).locator('article')).toHaveCount(0)
  await expect(main(page).getByRole('complementary')).toHaveCount(0)
  await expect(carousel(page)).toHaveCount(0)
  await expect(main(page).getByText('[ screenshot ]')).toBeVisible()
})

test('the Screenshot carousel moves with the buttons and the dots', async ({
  page,
}) => {
  await page.goto('/pl/projects/eventtracker')
  const region = carousel(page)
  const dot = (number: number) =>
    region.getByRole('button', { name: `Zrzut ${number}`, exact: true })

  await expect(region.getByText('1 / 3')).toBeVisible()
  await expect(dot(1)).toHaveAttribute('aria-current', 'true')

  await region.getByRole('button', { name: 'Następny zrzut' }).click()

  await expect(region.getByText('2 / 3')).toBeVisible()
  await expect(dot(2)).toHaveAttribute('aria-current', 'true')
  await expect(dot(1)).not.toHaveAttribute('aria-current')

  await dot(3).click()

  await expect(region.getByText('3 / 3')).toBeVisible()

  await region.getByRole('button', { name: 'Następny zrzut' }).click()

  await expect(region.getByText('1 / 3')).toBeVisible()

  await region.getByRole('button', { name: 'Poprzedni zrzut' }).click()

  await expect(region.getByText('3 / 3')).toBeVisible()
})

test('a Skill on the Project page opens the filtered Projects list', async ({
  page,
}) => {
  await page.goto('/pl/projects/eventtracker')

  await main(page)
    .getByRole('list', { name: 'Skille' })
    .getByRole('link', { name: 'Recharts' })
    .click()

  await expect(page).toHaveURL('/pl/projects?skill=Recharts')
  await expect(page.getByText('1 z 9 projektów')).toBeVisible()
})

test('links to the next Project and wraps from the last to the first', async ({
  page,
}) => {
  await page.goto('/pl/projects/eventtracker')
  const nav = page.getByRole('navigation', { name: 'Nawigacja po projektach' })

  await nav.getByRole('link', { name: /Solis — agent AI/ }).click()

  await expect(page).toHaveURL('/pl/projects/solis')

  await page.goto('/pl/projects/mapy-klikniec-i-scrolla')
  await nav.getByRole('link', { name: /EventTracker/ }).click()

  await expect(page).toHaveURL('/pl/projects/eventtracker')

  await nav.getByRole('link', { name: 'Wszystkie projekty' }).click()

  await expect(page).toHaveURL('/pl/projects')
})

test.describe('mobile Project page', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('swiping the carousel updates its position', async ({ page }) => {
    await page.goto('/pl/projects/eventtracker')
    const region = carousel(page)

    await region
      .getByRole('img', { name: 'Lista zdarzeń' })
      .scrollIntoViewIfNeeded()

    await expect(region.getByText('2 / 3')).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  })
})
