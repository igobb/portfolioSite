import { revalidateContent } from '@/content'
import { hasBearerSecret } from '../_auth/has-bearer-secret'

export async function POST(request: Request) {
  if (!hasBearerSecret(request, process.env.REVALIDATE_SECRET)) {
    return new Response(null, { status: 401 })
  }

  revalidateContent()

  return Response.json({ revalidated: true })
}
