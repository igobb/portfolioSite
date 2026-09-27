'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Fragment } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export function LocaleSwitch({ onPanel = false }: { onPanel?: boolean }) {
  const t = useTranslations('Header')

  const current = useLocale()
  const pathname = usePathname()
  const muted = onPanel ? 'text-panel-muted' : 'text-muted'

  return (
    <div
      role="group"
      aria-label={t('localeSwitch')}
      className="flex items-center"
    >
      {routing.locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && (
            <span aria-hidden className={muted}>
              /
            </span>
          )}

          <Link
            href={pathname}
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-current={locale === current ? 'true' : undefined}
            className={`flex h-11 items-center px-1.5 ${
              locale === current ? 'font-bold' : muted
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  )
}
