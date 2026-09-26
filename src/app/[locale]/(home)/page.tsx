import { Header } from '@/components/header/Header'
import { Hero } from './_components/Hero'

export default function HomePage() {
  return (
    <>
      <Header variant="home" />

      <main className="flex-1">
        <Hero />
      </main>
    </>
  )
}
