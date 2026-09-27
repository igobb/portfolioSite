import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header/Header'
import { OWNER_NAME } from '@/constants/profile'
import { getProjectList } from '@/content'
import { ProjectsBrowser } from './_filter/ProjectsBrowser/ProjectsBrowser'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProjectsPage')
  return { title: `${t('title')} – ${OWNER_NAME}` }
}

export default async function ProjectsPage() {
  const locale = await getLocale()

  const { projects, skills } = await getProjectList(locale)

  return (
    <>
      <Header variant="subpage" current="projects" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 pt-8 pb-14 xl:px-[120px] xl:pt-[72px] xl:pb-[120px]">
        <ProjectsBrowser projects={projects} skills={skills} />
      </main>
    </>
  )
}
