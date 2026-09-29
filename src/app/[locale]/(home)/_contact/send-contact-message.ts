import type { ContactMessage } from './contact-message-schema'

// No backend yet: ticket 10 connects this to storage and the owner's inbox.
export async function sendContactMessage(message: ContactMessage) {
  console.info('Contact message (not sent, no backend yet)', message)
}
