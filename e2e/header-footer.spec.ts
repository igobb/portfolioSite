import { expect, test } from '@playwright/test'

test.describe('desktop header', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('shows email, theme toggle, Locale switch and navigation', async ({
    page,
  }) => {
    await page.goto('/pl')
    const header = page.getByRole('banner')

    await expect(
      header.getByRole('link', { name: 't.golab06@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:t.golab06@gmail.com')
    await expect(
      header.getByRole('button', { name: 'Przełącz tryb jasny / ciemny' }),
    ).toBeVisible()
    await expect(
      header.getByRole('link', { name: 'PL', exact: true }),
    ).toBeVisible()
    await expect(
      header.getByRole('link', { name: 'EN', exact: true }),
    ).toBeVisible()

    const nav = header.getByRole('navigation', { name: 'Główna' })
    await expect(nav.getByRole('link')).toHaveText([
      'Umiejętności',
      'Portfolio',
      'Kontakt',
    ])
    await expect(header.getByText(/O mnie/)).toHaveCount(0)
    await expect(header.getByRole('button', { name: 'Menu' })).toBeHidden()
  })

  test('marks the current page on a subpage', async ({ page }) => {
    await page.goto('/pl/projects')
    const nav = page.getByRole('navigation', { name: 'Główna' })

    await expect(nav.getByRole('link', { name: 'Portfolio' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await expect(
      page.getByRole('banner').getByRole('link', { name: /strona główna/ }),
    ).toHaveAttribute('href', '/pl')
  })

  test('section links lead to the home page anchors', async ({ page }) => {
    await page.goto('/pl/projects')
    const nav = page.getByRole('navigation', { name: 'Główna' })

    await expect(
      nav.getByRole('link', { name: 'Umiejętności' }),
    ).toHaveAttribute('href', '/pl#skills')
    await expect(nav.getByRole('link', { name: 'Kontakt' })).toHaveAttribute(
      'href',
      '/pl#contact',
    )
    await expect(nav.getByRole('link', { name: 'Portfolio' })).toHaveAttribute(
      'href',
      '/pl/projects',
    )
  })
})

test.describe('mobile header', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  for (const path of ['/pl', '/pl/projects']) {
    test(`collapses the navigation behind a menu button on ${path}`, async ({
      page,
    }) => {
      await page.goto(path)
      const menuButton = page.getByRole('button', { name: 'Menu' })
      const menu = page.getByRole('navigation', { name: 'Menu' })

      await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      await expect(menu).toBeHidden()

      await menuButton.click()

      await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
      await expect(menu.getByRole('link')).toHaveText([
        'Umiejętności',
        'Portfolio',
        't.golab06@gmail.com',
        'Kontakt',
      ])

      await page.keyboard.press('Escape')

      await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      await expect(menu).toBeHidden()
      await expect(menuButton).toBeFocused()
    })
  }

  test('theme toggle and Locale switch stay outside the menu', async ({
    page,
  }) => {
    await page.goto('/pl')
    const header = page.getByRole('banner')

    await expect(
      header.getByRole('button', { name: 'Przełącz tryb jasny / ciemny' }),
    ).toBeVisible()
    await expect(
      header.getByRole('link', { name: 'EN', exact: true }),
    ).toBeVisible()
  })
})

for (const locale of ['pl', 'en']) {
  test(`footer links to the source on GitHub (${locale})`, async ({ page }) => {
    await page.goto(`/${locale}`)
    const footer = page.getByRole('contentinfo')

    await expect(footer).toContainText('© ')
    await expect(footer).toContainText('Tomasz Gołąb')
    await expect(footer.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/igobb/portfolioSite',
    )
  })

  test(`footer points AI agents at llms.txt (${locale})`, async ({ page }) => {
    await page.goto(`/${locale}`)

    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'llms.txt' }),
    ).toHaveAttribute('href', '/llms.txt')
  })
}
