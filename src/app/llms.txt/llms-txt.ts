import {
  CV_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  OWNER_EMAIL,
  OWNER_NAME,
  ROLES,
} from '@/constants/profile'
import { SITE_URL } from '@/constants/site'
import type { ProjectCard, SkillCategory } from '@/content'
import { localizedUrl } from '@/i18n/locale-alternates'

const SUMMARY =
  'Tomasz Gołąb is a Fullstack and Frontend Developer working daily with React, Next.js and TypeScript, plus AI automation.'

const oneLine = (text: string) => text.replace(/\s+/g, ' ').trim()

export function llmsTxt({
  skillCategories,
  projects,
}: {
  skillCategories: SkillCategory[]
  projects: ProjectCard[]
}) {
  return (
    [
      `# ${OWNER_NAME}`,
      `> ${SUMMARY}`,
      `${ROLES.en.join(', ')}. Portfolio in English: ${localizedUrl('en')}, in Polish: ${localizedUrl('pl')}. All projects: ${localizedUrl('en', '/projects')}.`,
      [
        `- Email: mailto:${OWNER_EMAIL}`,
        `- GitHub: ${GITHUB_URL}`,
        `- LinkedIn: ${LINKEDIN_URL}`,
        `- CV: [English](${SITE_URL}${CV_URL.en}), [Polish](${SITE_URL}${CV_URL.pl})`,
      ].join('\n'),
      '## Skills',
      skillCategories
        .map(
          ({ name, skills }) =>
            `- ${name}: ${skills.map((skill) => skill.name).join(', ')}`,
        )
        .join('\n'),
      '## Projects',
      projects
        .map(
          ({ slug, title, context, summary }) =>
            `- [${title}](${localizedUrl('en', `/projects/${slug}`)}) (${context}): ${oneLine(summary)} Polish: ${localizedUrl('pl', `/projects/${slug}`)}`,
        )
        .join('\n'),
    ].join('\n\n') + '\n'
  )
}
