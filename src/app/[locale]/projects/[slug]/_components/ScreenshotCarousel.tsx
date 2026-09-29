'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Screenshot } from '@/content'

export function ScreenshotCarousel({
  screenshots,
}: {
  screenshots: Screenshot[]
}) {
  const t = useTranslations('ProjectPage')

  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const count = screenshots.length

  function show(index: number) {
    const track = trackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    track.scrollTo({
      left: ((index + count) % count) * track.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  function syncCurrent() {
    const track = trackRef.current
    if (!track) return

    setCurrent(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <section aria-label={t('screenshots')} className="mt-10 xl:mt-14">
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={t('screenshots')}
        onScroll={syncCurrent}
        className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto border-[1.5px] border-ink bg-surface"
      >
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.src}
            className="relative h-[240px] w-full shrink-0 snap-start sm:h-[420px] xl:h-[620px]"
          >
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1440px) 1200px, 100vw"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.src}
                type="button"
                onClick={() => show(index)}
                aria-label={t('screenshot', { number: index + 1 })}
                aria-current={index === current ? 'true' : undefined}
                className="flex size-7 items-center justify-center"
              >
                <span
                  className={`size-3 border-[1.5px] border-ink ${index === current ? 'bg-ink' : ''}`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <span aria-live="polite" className="mr-2 text-muted">
              {current + 1} / {count}
            </span>

            <button
              type="button"
              onClick={() => show(current - 1)}
              aria-label={t('previousScreenshot')}
              className="size-12 border-[1.5px] border-ink"
            >
              <span aria-hidden>←</span>
            </button>

            <button
              type="button"
              onClick={() => show(current + 1)}
              aria-label={t('nextScreenshot')}
              className="size-12 border-[1.5px] border-ink"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
