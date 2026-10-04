import { keepContentSourceAwake } from '@/content'
import { hasBearerSecret } from '../_auth/has-bearer-secret'

export async function GET(request: Request) {
  if (!hasBearerSecret(request, process.env.CRON_SECRET)) {
    return new Response(null, { status: 401 })
  }

  await keepContentSourceAwake()

  return Response.json({ ok: true })
}
