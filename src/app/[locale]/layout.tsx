import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { routing } from '@/i18n/routing'
import { OWNER_NAME } from '@/constants/profile'
import { SITE_URL } from '@/constants/site'
import '../globals.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-plex-mono',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    metadataBase: new URL(SITE_URL),
    title: { template: `%s – ${OWNER_NAME}`, default: t('homeTitle') },
    description: t('homeDescription'),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    // next-themes sets data-theme on <html> from an inline script before hydration.
    <html lang={locale} className={plexMono.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-paper font-mono text-ink antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            {children}

            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
