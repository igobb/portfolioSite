import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')
  return {
    title: t('notFoundTitle'),
    description: t('notFoundDescription'),
  }
}

// Unknown URLs under a Locale render the Locale's not-found page, inside the layout.
export default function UnknownPage() {
  notFound()
}
