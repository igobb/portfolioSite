import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header/Header'
import { OWNER_NAME } from '@/constants/profile'
import { getProjectList, getProjectPage } from '@/content'
import { routing } from '@/i18n/routing'
import { NextProjectNav } from './_components/NextProjectNav'
import { ProjectDetails } from './_components/ProjectDetails/ProjectDetails'
import { ProjectIntro } from './_components/ProjectIntro'
import { ProjectMetrics } from './_components/ProjectMetrics'
import { ScreenshotCarousel } from './_components/ScreenshotCarousel'
import { ScreenshotPlaceholder } from './_components/ScreenshotPlaceholder'

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}) {
  if (!hasLocale(routing.locales, params.locale)) return []

  const { projects } = await getProjectList(params.locale)

  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectPage(await getLocale(), slug)

  if (!project) return {}

  return {
    title: `${project.title} – ${OWNER_NAME}`,
    description: project.summary,
  }
}

export default async function ProjectRoute({
  params,
}: PageProps<'/[locale]/projects/[slug]'>) {
  const { slug } = await params

  const project = await getProjectPage(await getLocale(), slug)

  if (!project) notFound()

  return (
    <>
      <Header variant="subpage" current="projects" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-8 pb-14 xl:px-[120px] xl:pt-12 xl:pb-[120px]">
        <ProjectIntro project={project} />

        {project.metrics.length > 0 && (
          <ProjectMetrics metrics={project.metrics} />
        )}

        {project.screenshots.length > 0 ? (
          <ScreenshotCarousel screenshots={project.screenshots} />
        ) : (
          <ScreenshotPlaceholder />
        )}

        <ProjectDetails project={project} />

        <NextProjectNav next={project.next} />
      </main>
    </>
  )
}
