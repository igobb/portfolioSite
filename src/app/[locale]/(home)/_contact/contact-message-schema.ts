import { z } from 'zod'

export const CONTACT_FIELD_ERRORS = [
  'nameRequired',
  'nameTooLong',
  'emailRequired',
  'emailInvalid',
  'messageTooShort',
  'messageTooLong',
] as const

export type ContactFieldError = (typeof CONTACT_FIELD_ERRORS)[number]

export const NAME_MAX_LENGTH = 100
export const MESSAGE_MIN_LENGTH = 10
export const MESSAGE_MAX_LENGTH = 5_000
export const MIN_FILL_TIME_MS = 3_000

const errorKey = (key: ContactFieldError) => key

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, errorKey('nameRequired'))
    .max(NAME_MAX_LENGTH, errorKey('nameTooLong')),
  email: z
    .string()
    .trim()
    .min(1, errorKey('emailRequired'))
    .pipe(z.email(errorKey('emailInvalid')).max(254, errorKey('emailInvalid'))),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, errorKey('messageTooShort'))
    .max(MESSAGE_MAX_LENGTH, errorKey('messageTooLong')),
  // Honeypot
  website: z.string().max(500),
  startedAt: z.number().int().nonnegative(),
})

export type ContactFormValues = z.input<typeof contactMessageSchema>

export type ContactMessage = Omit<
  z.output<typeof contactMessageSchema>,
  'website' | 'startedAt'
>

export type ContactFormField = keyof ContactMessage

export const CONTACT_FORM_FIELDS = [
  'name',
  'email',
  'message',
] as const satisfies readonly ContactFormField[]

export const isContactFieldError = (
  value: unknown,
): value is ContactFieldError =>
  CONTACT_FIELD_ERRORS.includes(value as ContactFieldError)
