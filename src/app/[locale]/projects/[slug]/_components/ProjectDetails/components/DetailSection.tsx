import type { ReactNode } from 'react'

type DetailSectionProps = {
  title: string
  children: ReactNode
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="flex flex-col gap-3.5">
      <h2 className="text-sm tracking-[0.08em] text-muted uppercase xl:text-[15px]">
        <span aria-hidden>## </span>
        {title}
      </h2>

      {children}
    </section>
  )
}
