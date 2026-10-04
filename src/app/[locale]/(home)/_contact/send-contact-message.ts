'use server'

import { hasLocale } from 'next-intl'
import { headers } from 'next/headers'
import { routing } from '@/i18n/routing'
import { contactDelivery } from './contact-dependencies'
import { hashIp } from './hash-ip'
import {
  submitContactMessage,
  type SubmitResult,
} from './submit-contact-message'

export type ContactFormResult = Exclude<
  SubmitResult,
  { status: 'stored-not-notified' }
>

// Vercel sets these headers itself and drops the values a client sends.
async function senderIp() {
  const requestHeaders = await headers()

  return (
    requestHeaders.get('x-real-ip') ??
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

export async function sendContactMessage(
  input: unknown,
  locale: unknown,
): Promise<ContactFormResult> {
  try {
    const { dependencies, ipHashSecret } = contactDelivery()

    const sender = {
      ipHash: hashIp(await senderIp(), ipHashSecret),
      locale: hasLocale(routing.locales, locale)
        ? locale
        : routing.defaultLocale,
    }

    const result = await submitContactMessage(input, sender, dependencies)

    // The message is safely stored, so the visitor must not retry and create a duplicate.
    return result.status === 'stored-not-notified' ? { status: 'sent' } : result
  } catch (error) {
    console.error('Sending a Contact message failed', error)

    return { status: 'failed' }
  }
}
