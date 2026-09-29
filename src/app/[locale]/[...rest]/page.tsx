import { notFound } from 'next/navigation'

// Unknown URLs under a Locale render the Locale's not-found page, inside the layout.
export default function UnknownPage() {
  notFound()
}
