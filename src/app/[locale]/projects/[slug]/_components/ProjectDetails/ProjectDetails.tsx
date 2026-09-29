import { useTranslations } from 'next-intl'
import type { ProjectPage } from '@/content'
import { BulletList } from './components/BulletList'
import { DetailSection } from './components/DetailSection'
import { StackPanel } from './components/StackPanel'

export function ProjectDetails({ project }: { project: ProjectPage }) {
  const t = useTranslations('ProjectPage')

  const { problem, role, built, challenges, outcomes, stack, links } = project

  const hasSections = [problem, role, built, challenges, outcomes].some(
    (section) => section.length > 0,
  )
  const hasPanel = stack.length > 0 || links.length > 0

  if (!hasSections && !hasPanel) return null

  return (
    <div className="mt-14 flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-8 xl:mt-20">
      {hasSections && (
        <article className="flex flex-col gap-12 text-base leading-[1.7] lg:col-span-8 xl:gap-14 xl:text-[17px]">
          {problem && (
            <DetailSection title={t('problem')}>
              <p>{problem}</p>
            </DetailSection>
          )}

          {role && (
            <DetailSection title={t('role')}>
              <p>{role}</p>
            </DetailSection>
          )}

          {built.length > 0 && (
            <DetailSection title={t('built')}>
              <BulletList items={built} />
            </DetailSection>
          )}

          {challenges.length > 0 && (
            <DetailSection title={t('challenges')}>
              <div className="mt-2.5 flex flex-col gap-6">
                {challenges.map((challenge, index) => (
                  <div
                    key={challenge.title}
                    className="flex flex-col gap-2.5 border-l-[1.5px] border-ink pl-5 xl:pl-6"
                  >
                    <h3 className="text-lg leading-[1.4] font-bold xl:text-xl">
                      {String(index + 1).padStart(2, '0')} · {challenge.title}
                    </h3>

                    <p>{challenge.body}</p>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {outcomes.length > 0 && (
            <DetailSection title={t('outcomes')}>
              <BulletList items={outcomes} />
            </DetailSection>
          )}
        </article>
      )}

      {hasPanel && <StackPanel stack={stack} links={links} />}
    </div>
  )
}
