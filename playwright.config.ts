import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.PORT ?? 3000)
const isCI = Boolean(process.env.CI)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // CI builds in an earlier step; locally build first so tests always hit a production build.
    command: isCI ? 'npm run start' : 'npm run build && npm run start',
    url: `http://localhost:${PORT}/pl`,
    // A reused local dev server keeps its own CONTACT_DELIVERY; run on another PORT if it is 'live'.
    env: { CONTACT_DELIVERY: 'log' },
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
})
