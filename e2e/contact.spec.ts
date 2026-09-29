import { expect, test, type Page } from '@playwright/test'

const EMAIL = 't.golab06@gmail.com'

const contactSection = (page: Page, name = 'Kontakt') =>
  page.getByRole('region', { name })

const sentMessages = (page: Page) => {
  const messages: string[] = []
  page.on('console', (message) => {
    if (message.text().startsWith('Contact message'))
      messages.push(message.text())
  })
  return messages
}

async function fillValidMessage(page: Page) {
  const section = contactSection(page)
  await section.getByLabel('Imię').fill('Anna Nowak')
  await section.getByLabel('E-mail').fill('anna@example.com')
  await section
    .getByLabel('Wiadomość')
    .fill('Cześć, mamy dla Ciebie ciekawy projekt.')
}

test.describe('desktop Contact section', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('the header Contact link scrolls to the section', async ({ page }) => {
    await page.goto('/pl')

    await page
      .getByRole('navigation', { name: 'Główna' })
      .getByRole('link', { name: 'Kontakt' })
      .click()

    await expect(page).toHaveURL('/pl#contact')
    await expect(
      contactSection(page).getByRole('heading', { name: 'Kontakt' }),
    ).toBeInViewport()
  })

  test('shows the email, CV for the current Locale, LinkedIn and GitHub', async ({
    page,
  }) => {
    await page.goto('/en')
    const section = contactSection(page, 'Contact')

    await expect(section.getByRole('link', { name: EMAIL })).toHaveAttribute(
      'href',
      `mailto:${EMAIL}`,
    )
    await expect(
      section.getByRole('link', { name: 'CV (PDF, EN)' }),
    ).toHaveAttribute('href', '/cv/tomasz-golab-cv-en.pdf')
    await expect(
      section.getByRole('link', { name: 'LinkedIn · /in/igobb' }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/igobb/')
    await expect(
      section.getByRole('link', { name: 'GitHub · igobb' }),
    ).toHaveAttribute('href', 'https://github.com/igobb')
  })

  test('copies the email and confirms it', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/pl')
    const section = contactSection(page)

    await section.getByRole('button', { name: 'Kopiuj', exact: true }).click()

    await expect(
      section.getByRole('button', { name: 'Skopiowano ✓' }),
    ).toBeVisible()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      EMAIL,
    )
    await expect(
      section.getByRole('button', { name: 'Kopiuj', exact: true }),
    ).toBeVisible({ timeout: 5_000 })
  })

  test('shows validation errors from UI copy', async ({ page }) => {
    await page.goto('/pl')
    const section = contactSection(page)

    await section.getByRole('button', { name: 'Wyślij wiadomość →' }).click()

    await expect(section.getByText('Podaj imię.')).toBeVisible()
    await expect(section.getByText('Podaj adres e-mail.')).toBeVisible()
    await expect(
      section.getByText('Wiadomość musi mieć co najmniej 10 znaków.'),
    ).toBeVisible()
    await expect(section.getByLabel('Imię')).toBeFocused()
    await expect(section.getByLabel('Imię')).toHaveAttribute(
      'aria-invalid',
      'true',
    )

    await section.getByLabel('E-mail').fill('anna@')

    await expect(
      section.getByText('To nie wygląda na poprawny adres e-mail.'),
    ).toBeVisible()
  })

  test('shows the success state after sending a valid message', async ({
    page,
  }) => {
    const sent = sentMessages(page)
    await page.goto('/pl')
    const section = contactSection(page)

    await fillValidMessage(page)
    await section.getByRole('button', { name: 'Wyślij wiadomość →' }).click()

    const confirmation = section.getByRole('status').filter({
      hasText: 'Wiadomość wysłana ✓',
    })
    await expect(confirmation).toBeVisible()
    await expect(confirmation).toBeFocused()
    await expect(section.getByRole('button', { name: /Wyślij/ })).toHaveCount(0)
    expect(sent).toHaveLength(1)
  })

  test('shows success to a bot that fills in the honeypot, but sends nothing', async ({
    page,
  }) => {
    const sent = sentMessages(page)
    await page.goto('/pl')
    const section = contactSection(page)

    await fillValidMessage(page)
    await section.locator('input[name="website"]').fill('https://spam.example')
    await section.getByRole('button', { name: 'Wyślij wiadomość →' }).click()

    await expect(section.getByText('Wiadomość wysłana ✓')).toBeVisible()
    expect(sent).toHaveLength(0)
  })
})
