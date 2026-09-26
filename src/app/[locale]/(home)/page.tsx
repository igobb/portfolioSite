import { Header } from '@/components/header/Header'
import { OWNER_NAME } from '@/constants/profile'
import { HeroPanel } from './_components/HeroPanel'

export default function HomePage() {
  return (
    <>
      <Header variant="home" />

      <main className="flex-1">
        <section className="relative xl:h-dvh xl:min-h-[720px]">
          <HeroPanel />

          <div className="flex flex-col gap-7 px-4 pt-2 pb-14 xl:absolute xl:inset-y-0 xl:left-[max(120px,calc(50%-600px))] xl:w-[46%] xl:justify-center xl:p-0">
            <p className="text-base text-muted">
              ~/tgolab <span className="text-accent-text">$</span> whoami
            </p>

            <h1 className="text-5xl leading-none font-bold tracking-[-0.03em] sm:text-7xl lg:text-[80px]">
              {OWNER_NAME}
            </h1>
          </div>
        </section>
      </main>
    </>
  )
}
