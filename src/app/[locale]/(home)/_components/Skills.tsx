import { getLocale, getTranslations } from 'next-intl/server'
import { SECTION_ID } from '@/constants/site'
import { getSkillCategories } from '@/content'
import { Link } from '@/i18n/navigation'

const GRID_CELL =
  'border-b-[1.5px] border-ink sm:border-r-[1.5px] sm:p-6 xl:min-h-[330px]'

export async function Skills() {
  const t = await getTranslations('Skills')

  const locale = await getLocale()

  const categories = await getSkillCategories(locale)

  return (
    <section
      id={SECTION_ID.skills}
      aria-labelledby="skills-heading"
      className="border-t-[1.5px] border-ink"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pt-12 pb-14 xl:gap-12 xl:px-[120px] xl:pt-[110px] xl:pb-[120px]">
        <div className="flex flex-col gap-2.5 xl:gap-3.5">
          <p className="text-sm text-muted xl:text-base">
            ~/tgolab <span className="text-accent-text">$</span>{' '}
            {t('promptCommand')}
          </p>

          <h2
            id="skills-heading"
            className="text-[32px] leading-tight font-bold tracking-[-0.02em] xl:text-5xl xl:leading-[1.1]"
          >
            {t('title')}
          </h2>
        </div>

        <div className="grid border-t-[1.5px] border-ink sm:grid-cols-2 sm:border-l-[1.5px] xl:grid-cols-5">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`flex flex-col gap-2.5 py-4 sm:gap-[18px] ${GRID_CELL}`}
            >
              <h3 className="flex gap-2.5 text-xs tracking-[0.06em] text-muted uppercase sm:min-h-[38px] sm:shrink-0 sm:text-[13px] sm:leading-[19px]">
                <span aria-hidden>{String(index + 1).padStart(2, '0')}</span>

                {category.name}
              </h3>

              <ul className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[15px] sm:flex-col sm:items-start sm:text-base">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    {skill.hasProjects ? (
                      <Link
                        href={{
                          pathname: '/projects',
                          query: { skill: skill.name },
                        }}
                        className="underline decoration-[1.5px] underline-offset-4"
                      >
                        {skill.name}
                      </Link>
                    ) : (
                      skill.name
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            className={`flex flex-col justify-end gap-2.5 py-4 text-sm text-muted ${GRID_CELL}`}
          >
            <p>{t('legend')}</p>

            <p aria-hidden className="hidden text-ink sm:block">
              ${' '}
              <span className="inline-block h-4 w-[9px] bg-ink align-[-2px] motion-safe:animate-blink" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
