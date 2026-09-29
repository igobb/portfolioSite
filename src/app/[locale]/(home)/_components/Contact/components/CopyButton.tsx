'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const CONFIRMATION_MS = 2_000

type CopyResult = 'copied' | 'failed'

type CopyButtonProps = {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const t = useTranslations('CopyButton')

  const [result, setResult] = useState<CopyResult | null>(null)

  const resetTimer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setResult('copied')
    } catch {
      setResult('failed')
    }

    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(
      () => setResult(null),
      CONFIRMATION_MS,
    )
  }

  return (
    <>
      <button type="button" onClick={copy} className={className}>
        {result ? t(result) : t('copy')}
      </button>

      <span role="status" className="sr-only">
        {result ? t(`${result}Announcement`) : null}
      </span>
    </>
  )
}
