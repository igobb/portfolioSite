import { expect, test, type Page } from '@playwright/test'

const CATEGORIES_PL = [
  'Języki',
  'Frontend',
  'UI i stylowanie',
  'Stan i dane',
  'Backend i bazy',
  'Testy',
  'Narzędzia i wdrożenia',
  'Monitoring i analityka',
  'AI',
]

const skillsSection = (page: Page, name = 'Umiejętności') =>
  page.getByRole('region', { name })

test.describe('desktop Skills section', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('groups every Skill into Skill categories with a legend', async ({
    page,
  }) => {
    await page.goto('/pl')
    const section = skillsSection(page)

    await expect(section.getByRole('heading', { level: 3 })).toHaveText(
      CATEGORIES_PL.map(
        (name, index) =>
          new RegExp(`^${String(index + 1).padStart(2, '0')}\\s*${name}$`),
      ),
    )
    await expect(section.getByRole('link')).toHaveCount(16)
    await expect(section.getByRole('listitem')).toHaveCount(42)
    await expect(section.getByRole('link', { name: 'Next.js' })).toHaveCount(0)
    await expect(section.getByText('Next.js', { exact: true })).toBeVisible()
    await expect(
      section.getByText(
        'Podkreślone Skille prowadzą do projektów, w których ich użyłem.',
      ),
    ).toBeVisible()
  })

  test('starts every Skill list in a row at the same height', async ({
    page,
  }) => {
    await page.goto('/pl')
    const lists = skillsSection(page).getByRole('list')

    const tops = await Promise.all(
      [0, 1, 2, 3, 4].map(
        async (index) => (await lists.nth(index).boundingBox())!.y,
      ),
    )

    expect(new Set(tops).size).toBe(1)
  })

  test('the hero link scrolls to the section', async ({ page }) => {
    await page.goto('/pl')

    await page
      .getByTestId('hero')
      .getByRole('link', { name: 'Umiejętności' })
      .click()

    await expect(page).toHaveURL('/pl#skills')
    await expect(
      skillsSection(page).getByRole('heading', { level: 2 }),
    ).toBeInViewport()
  })

  test('the header link leads to the section from another page', async ({
    page,
  }) => {
    await page.goto('/pl/projects')

    await page
      .getByRole('navigation', { name: 'Główna' })
      .getByRole('link', { name: 'Umiejętności' })
      .click()

    await expect(page).toHaveURL('/pl#skills')
    await expect(
      skillsSection(page).getByRole('heading', { level: 2 }),
    ).toBeInViewport()
  })
})

for (const { locale, section, skill, projectsHeading } of [
  {
    locale: 'pl',
    section: 'Umiejętności',
    skill: 'React',
    projectsHeading: 'Projekty',
  },
  {
    locale: 'en',
    section: 'Skills',
    skill: 'Vercel AI SDK',
    projectsHeading: 'Projects',
  },
]) {
  test(`a linked Skill opens the Projects list filtered by it (${locale})`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`)

    await skillsSection(page, section)
      .getByRole('link', { name: skill })
      .click()

    await expect(
      page.getByRole('heading', { level: 1, name: projectsHeading }),
    ).toBeVisible()
    const url = new URL(page.url())
    expect(url.pathname).toBe(`/${locale}/projects`)
    expect(url.searchParams.getAll('skill')).toEqual([skill])
  })
}

test.describe('mobile Skills section', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('stacks the Skill categories', async ({ page }) => {
    await page.goto('/pl')
    const headings = skillsSection(page).getByRole('heading', { level: 3 })

    const first = (await headings.nth(0).boundingBox())!
    const second = (await headings.nth(1).boundingBox())!

    expect(second.x).toBe(first.x)
    expect(second.y).toBeGreaterThan(first.y)
  })

  test('the menu link scrolls to the section', async ({ page }) => {
    await page.goto('/pl')

    await page.getByRole('button', { name: 'Menu' }).click()
    await page
      .getByRole('navigation', { name: 'Menu' })
      .getByRole('link', { name: 'Umiejętności' })
      .click()

    await expect(page).toHaveURL('/pl#skills')
    await expect(
      skillsSection(page).getByRole('heading', { level: 2 }),
    ).toBeInViewport()
  })
})
