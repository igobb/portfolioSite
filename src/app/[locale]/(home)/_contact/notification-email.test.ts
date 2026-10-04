import { describe, expect, it } from 'vitest'
import { notificationEmail } from './notification-email'
import type { StoredContactMessage } from './submit-contact-message'

const stored: StoredContactMessage = {
  name: 'Anna Nowak',
  email: 'anna@example.com',
  message: 'Hello,\nI would like to talk about a role.',
  locale: 'en',
  ipHash: 'hash-a',
}

describe('notificationEmail', () => {
  it('lets the owner reply straight to the sender', () => {
    const email = notificationEmail(stored)

    expect(email.replyTo).toBe('anna@example.com')
    expect(email.subject).toBe('Wiadomość z portfolio od Anna Nowak')
  })

  it('includes the sender, Locale and message in the text', () => {
    const { text } = notificationEmail(stored)

    expect(text).toContain('Anna Nowak <anna@example.com>')
    expect(text).toContain('en')
    expect(text).toContain('Hello,\nI would like to talk about a role.')
    expect(text).not.toContain('hash-a')
  })

  it('keeps line breaks in the name out of the subject', () => {
    const { subject } = notificationEmail({
      ...stored,
      name: 'Jan\r\nBcc: victims@spam.example',
    })

    expect(subject).toBe(
      'Wiadomość z portfolio od Jan Bcc: victims@spam.example',
    )
  })
})
