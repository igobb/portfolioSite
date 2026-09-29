import { useTranslations } from 'next-intl'
import type { Metric } from '@/content'

export function ProjectMetrics({ metrics }: { metrics: Metric[] }) {
  const t = useTranslations('ProjectPage')

  return (
    <ul
      aria-label={t('metrics')}
      className="mt-10 flex flex-col gap-[1.5px] border-[1.5px] border-ink bg-ink sm:flex-row xl:mt-12"
    >
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="flex flex-1 flex-col gap-2 bg-surface p-5 xl:p-7"
        >
          <span className="text-[32px] leading-none font-bold tracking-[-0.02em] xl:text-[40px]">
            {metric.value}
          </span>

          <span className="text-[13px] text-muted xl:text-sm">
            {metric.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
