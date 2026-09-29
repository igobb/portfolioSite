import { getLocale, getTranslations } from 'next-intl/server'
import {
  CV_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  OWNER_EMAIL,
} from '@/constants/profile'
import { SECTION_ID } from '@/constants/site'
import { ContactForm } from '../../_contact/ContactForm/ContactForm'
import { CopyButton } from './components/CopyButton'

const profilePath = (url: string) => new URL(url).pathname.replace(/\/$/, '')

export async function Contact() {
  const t = await getTranslations('Contact')

  const locale = await getLocale()

  const links = [
    { label: t('cv'), href: CV_URL[locale], icon: '↓', download: true },
    {
      label: `LinkedIn · ${profilePath(LINKEDIN_URL)}`,
      href: LINKEDIN_URL,
      icon: '↗',
    },
    {
      label: `GitHub · ${profilePath(GITHUB_URL).slice(1)}`,
      href: GITHUB_URL,
      icon: '↗',
    },
  ]

  return (
    <section
      id={SECTION_ID.contact}
      aria-labelledby="contact-heading"
      className="border-b border-panel-muted bg-panel text-panel-ink"
    >
      <div className="mx-auto grid max-w-[1440px] px-4 pt-12 pb-14 xl:grid-cols-2 xl:gap-x-24 xl:px-[120px] xl:py-[110px]">
        <div className="flex flex-col gap-4 xl:gap-3.5">
          <p className="text-sm text-panel-muted xl:text-base">
            ~/tgolab <span className="text-accent">$</span> {t('promptCommand')}
          </p>

          <h2
            id="contact-heading"
            className="mb-2 text-[32px] leading-tight font-bold tracking-[-0.02em] xl:mb-6 xl:text-5xl xl:leading-[1.1]"
          >
            {t('title')}
          </h2>

          <p className="text-sm text-panel-muted xl:text-[15px]">
            {t('mailFirst')}
          </p>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <a
              href={`mailto:${OWNER_EMAIL}`}
              className="text-xl font-bold break-all xl:text-[30px]"
            >
              {OWNER_EMAIL}
            </a>

            <CopyButton
              text={OWNER_EMAIL}
              className="h-12 border-[1.5px] border-panel-ink text-sm font-bold xl:h-11 xl:px-4"
            />
          </div>

          <ul className="mt-2 flex flex-col text-[15px] xl:mt-8 xl:gap-1 xl:text-base">
            {links.map(({ label, href, icon, download }) => (
              <li key={href}>
                <a
                  href={href}
                  download={download}
                  className="flex justify-between border-b border-panel-muted py-3.5"
                >
                  {label}

                  <span aria-hidden>{icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
