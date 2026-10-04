import { createHash, timingSafeEqual } from 'node:crypto'

const digest = (value: string) => createHash('sha256').update(value).digest()

export function hasBearerSecret(request: Request, secret: string | undefined) {
  if (!secret) return false

  const authorization = request.headers.get('authorization') ?? ''

  return timingSafeEqual(digest(authorization), digest(`Bearer ${secret}`))
}
