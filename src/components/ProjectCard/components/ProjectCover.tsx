import Image from 'next/image'
import type { Screenshot } from '@/content'

type ProjectCoverProps = {
  cover: Screenshot | null
}

export function ProjectCover({ cover }: ProjectCoverProps) {
  return (
    <div className="relative flex h-[170px] shrink-0 items-center justify-center border-b-[1.5px] border-ink bg-[repeating-linear-gradient(135deg,var(--stripe)_0_1.5px,transparent_1.5px_12px)] text-xs text-muted md:h-[210px] md:text-[13px]">
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <span aria-hidden>[ screenshot ]</span>
      )}
    </div>
  )
}
