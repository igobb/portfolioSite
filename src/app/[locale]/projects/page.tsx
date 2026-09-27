import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header/Header'
import { OWNER_NAME } from '@/constants/profile'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProjectsPage')
  return { title: `${t('title')} – ${OWNER_NAME}` }
}

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage')

  return (
    <>
      <Header variant="subpage" current="projects" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-8 pb-14 xl:px-[120px] xl:pt-[72px] xl:pb-[120px]">
        <div className="flex flex-col gap-3.5">
          <p className="text-[13px] text-muted xl:text-base">
            ~/tgolab <span className="text-accent-text">$</span>{' '}
            {t('promptCommand')}
          </p>

          <h1 className="text-4xl font-bold tracking-[-0.02em] xl:text-[56px] xl:leading-[1.1]">
            {t('title')}
          </h1>
        </div>
      </main>
    </>
  )
}
