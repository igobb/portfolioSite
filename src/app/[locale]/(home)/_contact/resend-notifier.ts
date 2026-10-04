import 'server-only'
import { Resend } from 'resend'
import { requiredEnv } from '@/env/required-env'
import { notificationEmail } from './notification-email'
import type { SubmitDependencies } from './submit-contact-message'

const SENDER = 'Portfolio <portfolio@tgolab.dev>'

export function createResendNotifier(): SubmitDependencies['notifier'] {
  const resend = new Resend(requiredEnv('RESEND_API_KEY'))
  const owner = requiredEnv('CONTACT_NOTIFY_EMAIL')

  return {
    async notify(message) {
      const { error } = await resend.emails.send({
        from: SENDER,
        to: owner,
        ...notificationEmail(message),
      })

      if (error) throw new Error(`Sending via Resend failed: ${error.message}`)
    },
  }
}
