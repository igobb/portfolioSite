import { Header } from '@/components/Header/Header'
import { Hero } from './_components/Hero/Hero'
import { Skills } from './_components/Skills'
import { HomeProjects } from './_components/HomeProjects/HomeProjects'
import { Contact } from './_components/Contact/Contact'

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
