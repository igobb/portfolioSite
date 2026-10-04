import { revalidateTag } from 'next/cache'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))

const revalidateRequest = (authorization?: string) =>
  new Request('http://localhost/api/revalidate', {
    method: 'POST',
    headers: authorization ? { authorization } : {},
  })

describe('POST /api/revalidate', () => {
  beforeEach(() => {
    vi.stubEnv('REVALIDATE_SECRET', 'webhook-secret')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.mocked(revalidateTag).mockClear()
  })

  it('revalidates Content when called with the shared secret', async () => {
    const response = await POST(revalidateRequest('Bearer webhook-secret'))

    expect(response.status).toBe(200)
    expect(revalidateTag).toHaveBeenCalledWith('content', { expire: 0 })
  })

  it.each([
    ['no secret', undefined],
    ['a wrong secret', 'Bearer guessed-secret'],
    ['the secret without the Bearer scheme', 'webhook-secret'],
  ])('rejects a call with %s', async (_, authorization) => {
    const response = await POST(revalidateRequest(authorization))

    expect(response.status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('rejects every call when no secret is configured', async () => {
    vi.stubEnv('REVALIDATE_SECRET', '')

    const response = await POST(revalidateRequest('Bearer '))

    expect(response.status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
