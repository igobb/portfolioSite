import { useTranslations } from 'next-intl'

type NoResultsProps = {
  command: string
  onClear: () => void
}

export function NoResults({ command, onClear }: NoResultsProps) {
  const t = useTranslations('ProjectsPage')

  return (
    <div className="mx-4 mt-8 flex flex-col items-center justify-center gap-3.5 border-[1.5px] border-dashed border-line px-5 py-10 text-center xl:mx-0 xl:mt-12 xl:h-80 xl:gap-4">
      <p className="hidden text-sm text-muted xl:block">$ {command}</p>

      <p className="text-lg font-bold xl:text-[22px]">{t('noResults')}</p>

      <p className="text-sm text-muted xl:text-[15px]">{t('noResultsHint')}</p>

      <button
        type="button"
        onClick={onClear}
        className="h-12 border-[1.5px] border-ink px-5 text-sm font-bold xl:mt-2 xl:px-[22px]"
      >
        <span aria-hidden>[ </span>
        {t('clearFilter')}
        <span aria-hidden> ]</span>
      </button>
    </div>
  )
}
