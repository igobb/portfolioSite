import type { Locale } from '@/i18n/routing'

export const OWNER_NAME = 'Tomasz Gołąb'
export const OWNER_EMAIL = 't.golab06@gmail.com'
export const GITHUB_URL = 'https://github.com/igobb'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/igobb/'

export const ROLES: Record<Locale, string[]> = {
  pl: ['Fullstack Developer', 'Frontend Developer', 'Pasjonat AI'],
  en: ['Fullstack Developer', 'Frontend Developer', 'AI Enthusiast'],
}

export const CV_URL: Record<Locale, string> = {
  pl: '/cv/tomasz-golab-cv-pl.pdf',
  en: '/cv/tomasz-golab-cv-en.pdf',
}
