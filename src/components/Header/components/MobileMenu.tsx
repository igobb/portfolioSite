'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

type MobileMenuProps = {
  label: string
  buttonClassName: string
  children: ReactNode
}

export function MobileMenu({
  label,
  buttonClassName,
  children,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const menuId = useId()

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setOpen(false)

      buttonRef.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`flex size-11 items-center justify-center border-[1.5px] ${buttonClassName}`}
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>

      <nav
        id={menuId}
        aria-label={label}
        hidden={!open}
        onClick={(event) => {
          if ((event.target as Element).closest('a')) setOpen(false)
        }}
        className="absolute inset-x-0 top-full z-20 flex flex-col border-b-[1.5px] border-panel-ink bg-panel px-4 pt-2 pb-5 text-lg text-panel-ink"
      >
        {children}
      </nav>
    </>
  )
}
