import type { Locale } from '@/i18n/routing'
import { z } from 'zod'
import {
  contactMessageSchema,
  isContactFieldError,
  MIN_FILL_TIME_MS,
  type ContactFieldError,
  type ContactFormField,
  type ContactFormValues,
  type ContactMessage,
} from './contact-message-schema'

const RATE_LIMIT_MAX_MESSAGES = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

export type StoredContactMessage = ContactMessage & {
  locale: Locale
  ipHash: string
}

export type SubmitDependencies = {
  store: { save(message: StoredContactMessage): Promise<void> }
  rateLimiter: { countSince(ipHash: string, since: Date): Promise<number> }
  notifier: { notify(message: StoredContactMessage): Promise<void> }
  now: () => Date
}

export type ContactFieldErrors = Partial<
  Record<ContactFormField, ContactFieldError>
>

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'invalid'; fieldErrors: ContactFieldErrors }
  | { status: 'rate-limited' }
  | { status: 'failed' }
  | { status: 'stored-not-notified' }

function toFieldErrors(
  error: z.ZodError<ContactFormValues>,
): ContactFieldErrors {
  const { fieldErrors } = z.flattenError(error)

  return Object.fromEntries(
    Object.entries(fieldErrors)
      .map(([field, keys]) => [field, keys?.[0]])
      .filter(([, key]) => isContactFieldError(key)),
  )
}

export async function submitContactMessage(
  input: unknown,
  sender: { ipHash: string; locale: Locale },
  deps: SubmitDependencies,
): Promise<SubmitResult> {
  const parsed = contactMessageSchema.safeParse(input)

  if (!parsed.success) {
    return { status: 'invalid', fieldErrors: toFieldErrors(parsed.error) }
  }

  const { name, email, message, website, startedAt } = parsed.data

  const now = deps.now().getTime()

  if (website !== '' || now - startedAt < MIN_FILL_TIME_MS) {
    return { status: 'sent' }
  }

  const stored: StoredContactMessage = { name, email, message, ...sender }

  try {
    const recentCount = await deps.rateLimiter.countSince(
      sender.ipHash,
      new Date(now - RATE_LIMIT_WINDOW_MS),
    )

    if (recentCount >= RATE_LIMIT_MAX_MESSAGES) {
      return { status: 'rate-limited' }
    }

    await deps.store.save(stored)
  } catch (error) {
    console.error('Storing a Contact message failed', error)

    return { status: 'failed' }
  }

  try {
    await deps.notifier.notify(stored)
  } catch (error) {
    console.error('Notifying about a stored Contact message failed', error)

    return { status: 'stored-not-notified' }
  }

  return { status: 'sent' }
}
