'use client'

import { useEffect, useState } from 'react'

type Step = { role: number; typed: number; deleting: boolean }

const TYPE_MS = 75
const DELETE_MS = 35
const HOLD_MS = 1600
const NEXT_ROLE_MS = 300

function advance(step: Step, roles: string[]): { next: Step; delay: number } {
  const full = roles[step.role] ?? ''

  if (!step.deleting) {
    return step.typed < full.length
      ? { next: { ...step, typed: step.typed + 1 }, delay: TYPE_MS }
      : { next: { ...step, deleting: true }, delay: HOLD_MS }
  }

  return step.typed > 0
    ? { next: { ...step, typed: step.typed - 1 }, delay: DELETE_MS }
    : {
        next: {
          role: (step.role + 1) % roles.length,
          typed: 0,
          deleting: false,
        },
        delay: NEXT_ROLE_MS,
      }
}

export function Typewriter({ roles }: { roles: string[] }) {
  const [step, setStep] = useState<Step>({
    role: 0,
    typed: roles[0]?.length ?? 0,
    deleting: false,
  })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { next, delay } = advance(step, roles)
    const timer = setTimeout(() => setStep(next), delay)

    return () => clearTimeout(timer)
  }, [step, roles])

  return (
    <p className="min-h-[30px] text-[19px] leading-[30px] xl:min-h-10 xl:text-[28px] xl:leading-10">
      <span aria-hidden className="mr-2.5 text-muted xl:mr-3.5">
        &gt;
      </span>

      <span
        data-testid="typewriter-roles"
        className="sr-only motion-reduce:not-sr-only"
      >
        {roles.join(' · ')}
      </span>

      <span
        aria-hidden
        data-testid="typewriter-text"
        className="whitespace-pre motion-reduce:hidden"
      >
        {roles[step.role]?.slice(0, step.typed)}
      </span>

      <span
        aria-hidden
        data-testid="typewriter-cursor"
        className="ml-[3px] inline-block h-[22px] w-2.5 bg-accent align-middle motion-safe:animate-blink xl:ml-1 xl:h-[30px] xl:w-3.5"
      />
    </p>
  )
}
