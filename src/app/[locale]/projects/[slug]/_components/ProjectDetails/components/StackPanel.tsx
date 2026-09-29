import { useTranslations } from 'next-intl'
import type { ProjectLink, StackGroup } from '@/content'

const PANEL_HEADING =
  'border-ink px-6 py-5 text-[13px] tracking-[0.08em] uppercase'

type StackPanelProps = {
  stack: StackGroup[]
  links: ProjectLink[]
}

export function StackPanel({ stack, links }: StackPanelProps) {
  const t = useTranslations('ProjectPage')

  return (
    <aside className="flex flex-col border-[1.5px] border-ink bg-surface lg:col-span-4 lg:self-start">
      {stack.length > 0 && (
        <>
          <h2 className={`border-b-[1.5px] ${PANEL_HEADING}`}>{t('stack')}</h2>

          <dl className="flex flex-col gap-5 p-6 text-[15px] leading-[1.6]">
            {stack.map((group) => (
              <div key={group.label}>
                <dt className="text-[13px] text-muted">{group.label}</dt>

                <dd>{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {links.length > 0 && (
        <>
          <h2
            className={`border-b-[1.5px] ${stack.length > 0 ? 'border-t-[1.5px]' : ''} ${PANEL_HEADING}`}
          >
            {t('links')}
          </h2>

          <ul className="flex flex-col px-6 pt-3 pb-5 text-[15px]">
            {links.map((link) => (
              <li
                key={link.label}
                className="border-b border-line last:border-b-0"
              >
                {'url' in link ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between gap-4 py-3 hover:underline"
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                  </a>
                ) : (
                  <p className="flex justify-between gap-4 py-3 text-muted">
                    {link.label}
                    <span>{link.note}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  )
}
