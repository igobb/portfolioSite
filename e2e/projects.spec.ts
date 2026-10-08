import { expect, test, type Page } from '@playwright/test'

const SLUGS = [
  'eventtracker',
  'solis',
  'automatyzacje-ai',
  'i18n',
  'raportowanie-bledow',
  'analityka-mixpanel',
  'czat-wsparcia-ai',
  'rejestracja-i-logowanie',
  'mapy-klikniec-i-scrolla',
]

const skillFilter = (page: Page) => page.getByTestId('skill-filter')
const chip = (page: Page, name: string) =>
  skillFilter(page).getByRole('button', { name, exact: true })
const projectCardTitles = (page: Page) =>
  page.getByRole('main').getByRole('heading', { level: 2 })
const skillParams = (page: Page) =>
  new URL(page.url()).searchParams.getAll('skill')

test('lists every published Project as a Project card', async ({ page }) => {
  await page.goto('/pl/projects')

  await expect(page.getByText('9 projektów')).toBeVisible()
  await expect(projectCardTitles(page)).toHaveCount(9)

  const hrefs = await page
    .getByRole('main')
    .getByRole('listitem')
    .getByRole('link')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
  expect(hrefs).toEqual(SLUGS.map((slug) => `/pl/projects/${slug}`))
})

test('selecting two Skills narrows the list and updates the URL', async ({
  page,
}) => {
  await page.goto('/pl/projects')

  await chip(page, 'React').click()
  await chip(page, 'TypeScript').click()

  await expect(chip(page, 'React')).toHaveAttribute('aria-pressed', 'true')
  await expect(chip(page, 'TypeScript')).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('7 z 9 projektów')).toBeVisible()
  await expect(projectCardTitles(page)).toHaveText([
    'EventTracker',
    'Solis — agent AI',
    'Raportowanie błędów',
    'Standard analityki w Mixpanel',
    'Czat wsparcia AI',
    'Rejestracja i logowanie',
    'Mapy kliknięć i scrolla',
  ])
  expect(skillParams(page)).toEqual(['React', 'TypeScript'])

  await chip(page, 'React').click()

  await expect(chip(page, 'React')).toHaveAttribute('aria-pressed', 'false')
  expect(skillParams(page)).toEqual(['TypeScript'])
})

test('a combination with no match shows the empty state and reset restores all', async ({
  page,
}) => {
  await page.goto('/en/projects?skill=Sentry&skill=Mixpanel')

  await expect(
    page.getByText('No projects have all the selected Skills.'),
  ).toBeVisible()
  await expect(page.getByText('0 of 9 projects')).toBeVisible()
  await expect(projectCardTitles(page)).toHaveCount(0)

  await page
    .getByRole('main')
    .getByRole('button', { name: 'clear filter' })
    .last()
    .click()

  await expect(projectCardTitles(page)).toHaveCount(9)
  await expect(page.getByText('9 projects')).toBeVisible()
  await expect(skillFilter(page).locator('[aria-pressed="true"]')).toHaveCount(
    0,
  )
  expect(new URL(page.url()).search).toBe('')
})

test('counts a single remaining Project in the singular', async ({ page }) => {
  await page.goto('/en/projects?skill=Mastra')

  await expect(page.getByText('1 of 9 projects')).toBeVisible()
  await expect(projectCardTitles(page)).toHaveText(['Solis — AI agent'])
})

test.describe('mobile Projects list', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('stacks the Project cards and scrolls the filter row sideways', async ({
    page,
  }) => {
    await page.goto('/pl/projects')

    await expect
      .poll(() =>
        projectCardTitles(page).evaluateAll((headings) => {
          const [first, second] = headings.map((heading) =>
            heading.getBoundingClientRect(),
          )
          return (
            !!first && !!second && second.x === first.x && second.y > first.y
          )
        }),
      )
      .toBe(true)

    const row = chip(page, 'React').locator('..')
    const { scrollWidth, clientWidth } = await row.evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
    }))
    expect(scrollWidth).toBeGreaterThan(clientWidth)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  })
})
