import type { StoredContactMessage } from './submit-contact-message'

// A line break in a header value would start a new header (e.g. "Bcc:").
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ')

export function notificationEmail({
  name,
  email,
  message,
  locale,
}: StoredContactMessage) {
  return {
    replyTo: email,
    subject: `Wiadomość z portfolio od ${singleLine(name)}`,
    text: [
      `Od: ${name} <${email}>`,
      `Wersja językowa: ${locale}`,
      '',
      message,
    ].join('\n'),
  }
}
