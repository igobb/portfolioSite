import { Header } from '@/components/Header/Header'
import { Hero } from './_components/Hero/Hero'
import { Skills } from './_components/Skills'

export default function HomePage() {
  return (
    <>
      <Header variant="home" />

      <main className="flex-1">
        <Hero />

        <Skills />
      </main>
    </>
  )
}
