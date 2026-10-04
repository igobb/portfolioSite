import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { requiredEnv } from '@/env/required-env'
import type { SubmitDependencies } from './submit-contact-message'

const TABLE = 'contact_messages'

type ContactMessagesTable = SubmitDependencies['store'] &
  SubmitDependencies['rateLimiter']

export function createSupabaseContactMessages(): ContactMessagesTable {
  const client = createClient(
    requiredEnv('SUPABASE_URL'),
    requiredEnv('SUPABASE_SECRET_KEY'),
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
      },
    },
  )

  return {
    async save({ name, email, message, locale, ipHash }) {
      const { error } = await client
        .from(TABLE)
        .insert({ name, email, message, locale, ip_hash: ipHash })

      if (error) {
        throw new Error(`Inserting into ${TABLE} failed: ${error.message}`)
      }
    },

    async countSince(ipHash, since) {
      const { count, error, status } = await client
        .from(TABLE)
        .select('*', { count: 'exact', head: true })
        .eq('ip_hash', ipHash)
        .gt('created_at', since.toISOString())

      if (error) throw new Error(`Counting ${TABLE} failed with HTTP ${status}`)

      return count ?? 0
    },
  }
}
