'use client'

import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('Header')

  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={t('toggleTheme')}
      className={`flex size-11 items-center justify-center ${className ?? ''}`}
    >
      <Moon className="size-[18px] dark:hidden" aria-hidden />

      <Sun className="hidden size-[18px] dark:block" aria-hidden />
    </button>
  )
}
