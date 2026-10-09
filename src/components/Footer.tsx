import { useTranslations } from 'next-intl'
import { OWNER_NAME } from '@/constants/profile'
import { SITE_DOMAIN, SOURCE_REPOSITORY_URL } from '@/constants/site'

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="bg-panel text-xs text-panel-muted xl:text-[13px]">
      <div className="mx-auto flex h-[110px] max-w-[1440px] flex-col justify-center gap-2 px-4 xl:h-[100px] xl:flex-row xl:items-center xl:justify-between xl:px-[120px]">
        <p>
          © {new Date().getFullYear()} {OWNER_NAME} · {SITE_DOMAIN}
        </p>

        <p className="opacity-80">
          {t('agentsHint')}{' '}
          <a href="/llms.txt" className="underline underline-offset-2">
            llms.txt
          </a>
        </p>

        <a href={SOURCE_REPOSITORY_URL} className="self-start xl:self-auto">
          {t('source')} <span aria-hidden>↗</span>
        </a>
      </div>
    </footer>
  )
}
