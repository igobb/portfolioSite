'use client'

import { usePathname } from 'next/navigation'

export function RequestedPath() {
  return usePathname()
}
