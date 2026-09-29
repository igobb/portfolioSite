import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header/Header'
import { SECTION_ID } from '@/constants/site'
import { Link } from '@/i18n/navigation'
import { NotFoundPanel } from './_not-found/NotFoundPanel'
import { RequestedPath } from './_not-found/RequestedPath'

const BUTTON = 'border-[1.5px] border-ink px-5 py-3.5 text-center'

export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    <>
      <Header variant="notFound" />

      <main className="flex-1">
        <div className="relative xl:h-dvh xl:min-h-[720px]">
          <NotFoundPanel />

          <div className="flex flex-col gap-4 px-4 pt-2 pb-14 xl:absolute xl:inset-y-0 xl:left-[max(120px,calc(50%-600px))] xl:w-[46%] xl:justify-center xl:gap-[22px] xl:p-0">
            <p className="text-sm break-words text-muted xl:text-base">
              ~/tgolab <span className="text-accent-text">$</span> cd{' '}
              <RequestedPath />
            </p>

            <p className="text-sm xl:text-base">{t('error')}</p>

            <h1 className="mt-2 text-[96px] leading-none font-bold tracking-[-0.04em] xl:text-[160px]">
              404
            </h1>

            <p className="text-base leading-[1.6] text-muted xl:text-lg">
              {t('description')}
            </p>

            <nav className="mt-2 flex flex-col gap-3 text-[15px] font-bold sm:flex-row">
              <Link href="/" className={BUTTON}>
                [ {t('home')} ]
              </Link>

              <Link href="/projects" className={BUTTON}>
                [ {t('projects')} ]
              </Link>

              <Link
                href={{ pathname: '/', hash: SECTION_ID.contact }}
                className={BUTTON}
              >
                [ {t('contact')} ]
              </Link>
            </nav>

            <p aria-hidden className="text-sm text-muted xl:text-base">
              ~/tgolab <span className="text-accent-text">$</span>{' '}
              <span className="inline-block h-[18px] w-2.5 bg-ink align-[-3px] motion-safe:animate-blink" />
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
