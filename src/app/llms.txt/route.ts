import { getProjectList, getSkillCategories } from '@/content'
import { llmsTxt } from './llms-txt'

// Route handlers are dynamic by default; static keeps it cached until the Content tag is revalidated.
export const dynamic = 'force-static'

export async function GET() {
  const [skillCategories, { projects }] = await Promise.all([
    getSkillCategories('en'),
    getProjectList('en'),
  ])

  return new Response(llmsTxt({ skillCategories, projects }), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
