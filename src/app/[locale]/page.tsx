import { useTranslations } from 'next-intl'
import { OWNER_NAME } from '@/constants/profile'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-7 px-4 sm:px-8">
      <p className="text-base text-muted">
        ~/tgolab <span className="text-accent">$</span> {t('promptCommand')}
      </p>
      <h1 className="text-5xl leading-none font-bold tracking-[-0.03em] sm:text-7xl lg:text-[80px]">
        {OWNER_NAME}
      </h1>
    </main>
  )
}
