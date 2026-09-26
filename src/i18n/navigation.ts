import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Locale-aware replacements for next/link and next/navigation; always use these.
export const { Link, usePathname } = createNavigation(routing)
