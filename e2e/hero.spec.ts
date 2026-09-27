import { expect, test } from '@playwright/test'

const locales = [
  {
    locale: 'pl',
    roles: ['Fullstack Developer', 'Frontend Developer', 'Pasjonat AI'],
    email: 'E-mail',
    seeProjects: 'Zobacz projekty',
    downloadCv: 'Pobierz CV',
    cvUrl: '/cv/tomasz-golab-cv-pl.pdf',
  },
  {
    locale: 'en',
    roles: ['Fullstack Developer', 'Frontend Developer', 'AI Enthusiast'],
    email: 'Email',
    seeProjects: 'See projects',
    downloadCv: 'Download CV',
    cvUrl: '/cv/tomasz-golab-cv-en.pdf',
  },
] as const

for (const {
  locale,
  roles,
  email,
  seeProjects,
  downloadCv,
  cvUrl,
} of locales) {
  test.describe(`hero (${locale})`, () => {
    test('shows the name and types a Role', async ({ page }) => {
      await page.goto(`/${locale}`)

      await expect(
        page.getByRole('heading', { level: 1, name: 'Tomasz Gołąb' }),
      ).toBeVisible()
      await expect(page.getByTestId('typewriter-text')).toHaveText(
        new RegExp(`^(${roles.join('|')})$`),
      )
    })

    test('links to email, GitHub, LinkedIn and the Projects', async ({
      page,
    }) => {
      await page.goto(`/${locale}`)
      const hero = page.getByTestId('hero')

      await expect(hero.getByRole('link', { name: email })).toHaveAttribute(
        'href',
        'mailto:t.golab06@gmail.com',
      )
      await expect(hero.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
        'href',
        'https://github.com/igobb',
      )
      await expect(
        hero.getByRole('link', { name: 'LinkedIn' }),
      ).toHaveAttribute('href', 'https://www.linkedin.com/in/igobb/')

      await hero.getByRole('link', { name: seeProjects }).click()

      await expect(page).toHaveURL(`/${locale}/projects`)
    })

    test('downloads the CV in this Locale', async ({ page }) => {
      await page.goto(`/${locale}`)
      const downloadStarted = page.waitForEvent('download')

      await page
        .getByRole('main')
        .getByRole('link', { name: downloadCv })
        .click()

      const download = await downloadStarted
      expect(new URL(download.url()).pathname).toBe(cvUrl)
      expect(await download.failure()).toBeNull()
    })
  })
}

test.describe('mobile hero', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('stacks the logo panel above the content', async ({ page }) => {
    await page.goto('/pl')

    const logo = await page
      .getByRole('main')
      .getByRole('img', { name: 'Logo tgolab' })
      .boundingBox()
    const name = await page.getByRole('heading', { level: 1 }).boundingBox()

    expect(logo!.y + logo!.height).toBeLessThan(name!.y)
  })
})

test.describe('with reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('shows every Role without animation', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByTestId('typewriter-roles')).toHaveText(
      'Fullstack Developer · Frontend Developer · AI Enthusiast',
    )
    await expect(page.getByTestId('typewriter-text')).toBeHidden()
    await expect(page.getByTestId('typewriter-cursor')).toHaveCSS(
      'animation-name',
      'none',
    )
  })
})
