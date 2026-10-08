import { expect, test, type Page } from '@playwright/test'
import en from '../messages/en.json' with { type: 'json' }
import pl from '../messages/pl.json' with { type: 'json' }

function leaves(messages: object, prefix = ''): [string, string][] {
  return Object.entries(messages).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'object' && value !== null
      ? leaves(value, path)
      : [[path, String(value)] as [string, string]]
  })
}

const englishByPath = new Map(leaves(en))

// A value that is the same in both catalogs is not Polish, and ICU messages
// ({count, plural, …}) only appear in the page with their arguments filled in.
const polishStrings = leaves(pl)
  .filter(([path, value]) => value !== englishByPath.get(path))
  .filter(([, value]) => !value.includes('{'))
  .map(([, value]) => value)

async function textAndLabels(page: Page) {
  return page.evaluate(() => {
    const attributes = ['alt', 'aria-label', 'placeholder', 'title']
    const labels = [...document.querySelectorAll('*')].flatMap((element) =>
      attributes
        .map((attribute) => element.getAttribute(attribute))
        .filter((value): value is string => value !== null),
    )
    const description =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') ?? ''

    return [document.body.innerText, description, ...labels].join('\n')
  })
}

async function expectNoPolishUiCopy(page: Page, path: string) {
  await page.goto(path)
  const text = await textAndLabels(page)

  for (const polish of polishStrings) {
    expect
      .soft(text, `"${polish}" from pl.json on ${path}`)
      .not.toContain(polish)
  }
}

for (const path of ['/en', '/en/projects', '/en/does/not/exist']) {
  test(`${path} has no Polish UI copy`, async ({ page }) => {
    await expectNoPolishUiCopy(page, path)
  })
}

test('Project pages in /en have no Polish UI copy', async ({ page }) => {
  await page.goto('/en/projects')
  const paths = await page
    .locator('main a[href^="/en/projects/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((link) => link.getAttribute('href') ?? '')),
    ])
  expect(paths.length).toBeGreaterThan(0)

  for (const path of paths) {
    await expectNoPolishUiCopy(page, path)
  }
})
