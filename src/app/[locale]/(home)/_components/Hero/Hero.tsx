import { getTranslations } from 'next-intl/server'
import { SECTION_ID } from '@/constants/site'
import { Link } from '@/i18n/navigation'
import { HeroIntro, TEXT_COLUMN_LEFT } from './components/HeroIntro'
import { HeroPanel } from './components/HeroPanel'

export async function Hero() {
  const t = await getTranslations('Hero')

  return (
    <section data-testid="hero" className="relative xl:h-dvh xl:min-h-[720px]">
      <HeroPanel />

      <HeroIntro />

      <Link
        href={{ pathname: '/', hash: SECTION_ID.skills }}
        className={`absolute bottom-10 hidden text-[13px] text-muted xl:block ${TEXT_COLUMN_LEFT}`}
      >
        <span aria-hidden>↓ </span>
        {t('skillsLink')}
      </Link>
    </section>
  )
}
