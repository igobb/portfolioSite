import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { Header } from '@/components/Header/Header'
import { localeAlternates } from '@/i18n/locale-alternates'
import { Hero } from './_components/Hero/Hero'
import { Skills } from './_components/Skills'
import { HomeProjects } from './_components/HomeProjects/HomeProjects'
import { Contact } from './_components/Contact/Contact'

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: localeAlternates(await getLocale()) }
}

export default function HomePage() {
  return (
    <>
      <Header variant="home" />

      <main className="flex-1">
        <Hero />

        <Skills />

        <HomeProjects />

        <Contact />
      </main>
    </>
  )
}
