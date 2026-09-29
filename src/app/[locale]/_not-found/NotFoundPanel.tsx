import { useTranslations } from 'next-intl'
import { Logo } from '@/components/Logo'

export function NotFoundPanel() {
  const t = useTranslations('NotFound')
  const tLogo = useTranslations('Logo')

  return (
    <div className="flex h-[300px] items-center justify-center bg-panel text-panel-ink [clip-path:polygon(0_0,100%_0,100%_78%,0_100%)] xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:w-[54%] xl:pl-[120px] xl:[clip-path:polygon(190px_0,100%_0,100%_100%,0_100%)]">
      <div className="-mt-10 flex flex-col items-center gap-7 xl:mt-0">
        <Logo
          label={tLogo('label')}
          className="size-[200px] rotate-320 xl:size-[380px]"
        />

        <p className="hidden text-sm tracking-[0.08em] opacity-70 xl:block">
          {`// ${t('caption')}`}
        </p>
      </div>
    </div>
  )
}
