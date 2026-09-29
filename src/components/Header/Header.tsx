import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'
import { Logo } from '@/components/Logo'
import { OWNER_EMAIL } from '@/constants/profile'
import { SECTION_ID } from '@/constants/site'
import { Link } from '@/i18n/navigation'
import { LocaleSwitch } from './components/LocaleSwitch'
import { MobileMenu } from './components/MobileMenu'
import { ThemeToggle } from './components/ThemeToggle'

type HeaderProps =
  | { variant: 'home' }
  | { variant: 'notFound' }
  | { variant: 'subpage'; current?: 'projects' }

type Href = ComponentProps<typeof Link>['href']

export function Header(props: HeaderProps) {
  const t = useTranslations('Header')

  const isHome = props.variant === 'home'
  const isSubpage = props.variant === 'subpage'

  const current = isSubpage ? props.current : undefined

  const isProjectsCurrent = current === 'projects'

  const skillsLink = (className?: string) =>
    isHome ? (
      <a href={`#${SECTION_ID.skills}`} className={className}>
        {t('skills')}
      </a>
    ) : (
      <Link
        href={{ pathname: '/', hash: SECTION_ID.skills }}
        className={className}
      >
        {t('skills')}
      </Link>
    )

  const contactHref: Href = { pathname: '/', hash: SECTION_ID.contact }

  return (
    <header
      className={
        !isSubpage
          ? 'relative z-10 bg-panel text-panel-ink xl:absolute xl:inset-x-0 xl:top-0 xl:bg-transparent xl:text-ink'
          : 'relative z-10 border-b-[1.5px] border-ink'
      }
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 xl:h-[104px] xl:px-[120px]">
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            aria-label={t('homeLink')}
            className={`flex items-center gap-3 text-base font-bold ${isHome ? 'xl:hidden' : ''}`}
          >
            {isSubpage && <Logo className="hidden size-10 xl:block" />}
            tgolab
          </Link>

          {!isHome && (
            <span
              aria-hidden
              className="hidden h-7 w-[1.5px] bg-line xl:block"
            />
          )}

          <a
            href={`mailto:${OWNER_EMAIL}`}
            className="hidden text-muted xl:block"
          >
            {OWNER_EMAIL}
          </a>

          <div className="hidden items-center gap-6 xl:flex">
            <ThemeToggle className="border-[1.5px] border-ink" />

            <LocaleSwitch />
          </div>
        </div>

        <nav
          aria-label={t('mainNav')}
          className={`hidden items-center gap-9 text-[15px] xl:flex ${!isSubpage ? 'text-panel-ink' : ''}`}
        >
          {skillsLink()}

          <Link
            href="/projects"
            aria-current={isProjectsCurrent ? 'page' : undefined}
            className={
              isProjectsCurrent
                ? 'border-b-2 border-ink pb-0.5 font-bold'
                : undefined
            }
          >
            {t('portfolio')}
          </Link>

          <Link
            href={contactHref}
            className="bg-accent px-[22px] py-3 font-bold text-white"
          >
            {t('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-sm xl:hidden">
          <ThemeToggle />

          <LocaleSwitch onPanel={!isSubpage} />

          <MobileMenu
            label={t('menu')}
            buttonClassName={!isSubpage ? 'border-panel-ink' : 'border-ink'}
          >
            {skillsLink('border-b border-panel-muted py-3.5')}

            <Link
              href="/projects"
              aria-current={isProjectsCurrent ? 'page' : undefined}
              className={`border-b border-panel-muted py-3.5 ${isProjectsCurrent ? 'font-bold' : ''}`}
            >
              {t('portfolio')}
            </Link>

            <a
              href={`mailto:${OWNER_EMAIL}`}
              className="border-b border-panel-muted py-3.5"
            >
              {OWNER_EMAIL}
            </a>

            <Link
              href={contactHref}
              className="mt-4 bg-accent py-3.5 text-center font-bold text-white"
            >
              {t('contact')}
            </Link>
          </MobileMenu>
        </div>
      </div>
    </header>
  )
}
