'use client'

import { Suspense } from 'react'
import type { ProjectList } from '@/content'
import { ProjectsView } from './components/ProjectsView/ProjectsView'
import { ProjectsViewFromUrl } from './components/ProjectsViewFromUrl'

// Reading the URL on the client keeps /projects statically rendered; the prerendered
// HTML (the Suspense fallback) lists every Project with no Skill selected.
export function ProjectsBrowser(props: ProjectList) {
  return (
    <Suspense
      fallback={
        <ProjectsView {...props} selectedSkills={[]} onSelect={() => {}} />
      }
    >
      <ProjectsViewFromUrl {...props} />
    </Suspense>
  )
}
