import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from './route'

const keepAliveRequest = (authorization?: string) =>
  new Request('http://localhost/api/keep-alive', {
    headers: authorization ? { authorization } : {},
  })

describe('GET /api/keep-alive', () => {
  beforeEach(() => {
    vi.stubEnv('CRON_SECRET', 'cron-secret')
    vi.stubEnv('CONTENT_SOURCE', 'fixtures')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('pings the Content source when called by the cron', async () => {
    const response = await GET(keepAliveRequest('Bearer cron-secret'))

    expect(response.status).toBe(200)
  })

  it('rejects a call without the cron secret', async () => {
    const response = await GET(keepAliveRequest('Bearer guessed-secret'))

    expect(response.status).toBe(401)
  })
})
