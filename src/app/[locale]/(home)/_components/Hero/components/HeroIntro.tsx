import { Mail } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import {
  CV_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  OWNER_EMAIL,
  OWNER_NAME,
  ROLES,
} from '@/constants/profile'
import { Link } from '@/i18n/navigation'
import { Typewriter } from './Typewriter'

export const TEXT_COLUMN_LEFT = 'xl:left-[max(120px,calc(50%-600px))]'
const ICON_SIZE = 'size-5 xl:size-[22px]'

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={ICON_SIZE}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={ICON_SIZE}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export async function HeroIntro() {
  const t = await getTranslations('Hero')
  const locale = await getLocale()

  const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
    {
      label: t('email'),
      href: `mailto:${OWNER_EMAIL}`,
      icon: <Mail strokeWidth={1.8} aria-hidden className={ICON_SIZE} />,
    },
    { label: 'GitHub', href: GITHUB_URL, icon: <GitHubIcon /> },
    { label: 'LinkedIn', href: LINKEDIN_URL, icon: <LinkedInIcon /> },
  ]

  return (
    <div
      className={`flex flex-col gap-[18px] px-4 pt-2 pb-14 xl:absolute xl:inset-y-0 xl:w-[46%] xl:justify-center xl:gap-7 xl:p-0 ${TEXT_COLUMN_LEFT}`}
    >
      <p className="text-sm text-muted xl:text-base">
        ~/tgolab <span className="text-accent-text">$</span> whoami
      </p>

      <h1 className="text-5xl leading-none font-bold tracking-[-0.03em] sm:text-7xl lg:text-[80px]">
        {OWNER_NAME}
      </h1>

      <Typewriter roles={ROLES[locale]} />

      <ul className="mt-2 flex gap-3 xl:mt-4 xl:gap-3.5">
        {socialLinks.map(({ label, href, icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className="flex size-12 items-center justify-center border-[1.5px] border-ink xl:size-[52px]"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex flex-col gap-2.5 text-[15px] font-bold xl:mt-0 xl:flex-row xl:items-center xl:gap-8 xl:text-base">
        <Link
          href="/projects"
          className="flex h-[52px] items-center justify-center bg-ink text-paper xl:h-auto xl:border-b-2 xl:border-ink xl:bg-transparent xl:pt-2.5 xl:pb-1 xl:text-ink"
        >
          <span aria-hidden>[&nbsp;</span>
          {t('seeProjects')}
          <span aria-hidden>&nbsp;→&nbsp;]</span>
        </Link>

        <a
          href={CV_URL[locale]}
          download
          className="flex h-[52px] items-center justify-center border-[1.5px] border-ink xl:h-auto xl:border-0 xl:pt-2.5 xl:pb-1 xl:font-normal xl:text-muted"
        >
          {t('downloadCv')}
          <span aria-hidden>&nbsp;↓</span>
        </a>
      </div>
    </div>
  )
}
