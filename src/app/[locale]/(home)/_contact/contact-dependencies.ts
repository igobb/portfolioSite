import 'server-only'
import { requiredEnv } from '@/env/required-env'
import { createResendNotifier } from './resend-notifier'
import type { SubmitDependencies } from './submit-contact-message'
import { createSupabaseContactMessages } from './supabase-contact-messages'

type ContactDelivery = {
  dependencies: SubmitDependencies
  ipHashSecret: string
}

const now = () => new Date()

const logOnly: ContactDelivery = {
  dependencies: {
    store: {
      save: async (message) => {
        console.info(
          'Contact message (CONTACT_DELIVERY=log, not stored)',
          message,
        )
      },
    },
    rateLimiter: { countSince: async () => 0 },
    notifier: { notify: async () => {} },
    now,
  },
  ipHashSecret: 'log-only',
}

export function contactDelivery(): ContactDelivery {
  if (process.env.CONTACT_DELIVERY !== 'live') return logOnly

  const table = createSupabaseContactMessages()

  return {
    dependencies: {
      store: table,
      rateLimiter: table,
      notifier: createResendNotifier(),
      now,
    },
    ipHashSecret: requiredEnv('IP_HASH_SECRET'),
  }
}
