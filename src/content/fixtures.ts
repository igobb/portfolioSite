import type { ContentTables, ProjectSkillRow } from './fixture-source'

const skill_categories: ContentTables['skill_categories'] = [
  { id: 1, name_pl: 'Języki', name_en: 'Languages', sort_order: 1 },
  { id: 2, name_pl: 'Frontend', name_en: 'Frontend', sort_order: 2 },
  {
    id: 3,
    name_pl: 'UI i stylowanie',
    name_en: 'UI and styling',
    sort_order: 3,
  },
  { id: 4, name_pl: 'Stan i dane', name_en: 'State and data', sort_order: 4 },
  {
    id: 5,
    name_pl: 'Backend i bazy',
    name_en: 'Backend and databases',
    sort_order: 5,
  },
  { id: 6, name_pl: 'Testy', name_en: 'Testing', sort_order: 6 },
  {
    id: 7,
    name_pl: 'Narzędzia i wdrożenia',
    name_en: 'Tools and deployment',
    sort_order: 7,
  },
  {
    id: 8,
    name_pl: 'Monitoring i analityka',
    name_en: 'Monitoring and analytics',
    sort_order: 8,
  },
  { id: 9, name_pl: 'AI', name_en: 'AI', sort_order: 9 },
]

const SKILL_NAMES_BY_CATEGORY: Record<string, string[]> = {
  Języki: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
  Frontend: ['React', 'Next.js', 'i18next'],
  'UI i stylowanie': ['Tailwind CSS', 'shadcn/ui', 'CSS Modules', 'Recharts'],
  'Stan i dane': [
    'Redux Toolkit',
    'TanStack Query',
    'SWR',
    'React Hook Form',
    'Zod',
    'Axios',
  ],
  'Backend i bazy': [
    'Node.js',
    'Express',
    'REST API',
    'Prisma',
    'PostgreSQL',
    'MongoDB',
    'Supabase',
  ],
  Testy: ['Vitest', 'Testing Library', 'Playwright'],
  'Narzędzia i wdrożenia': [
    'Git',
    'GitHub',
    'GitHub Actions',
    'Vite',
    'Vercel',
    'Figma',
    'Jira',
    'Lokalise',
  ],
  'Monitoring i analityka': ['Sentry', 'Mixpanel'],
  AI: ['Claude Code', 'Codex', 'Mastra', 'Vercel AI SDK', 'n8n'],
}

const skills: ContentTables['skills'] = Object.entries(SKILL_NAMES_BY_CATEGORY)
  .flatMap(([categoryName, names]) =>
    names.map((name, index) => ({
      name,
      category_id: idOf(
        skill_categories,
        (category) => category.name_pl === categoryName,
        `Skill category: ${categoryName}`,
      ),
      sort_order: index + 1,
    })),
  )
  .map((skill, index) => ({ id: index + 1, ...skill }))

const projects: ContentTables['projects'] = [
  {
    id: 1,
    slug: 'eventtracker',
    sort_order: 1,
    published: true,
    title_pl: 'EventTracker',
    title_en: 'EventTracker',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Wbudowane w Landingi narzędzie analityczne. Automatycznie zbiera zdarzenia z opublikowanych landing page’y i pokazuje je w dashboardzie — bez konfiguracji po stronie klienta.',
    summary_en:
      'An analytics tool built into Landingi. It collects events from published landing pages automatically and shows them in a dashboard, with no setup on the customer’s side.',
    metrics_pl: [
      { value: '1,2 mln+', label: 'sesji dziennie' },
      { value: '30 kB', label: 'skryptu śledzącego' },
    ],
    metrics_en: [
      { value: '1.2M+', label: 'sessions a day' },
      { value: '30 kB', label: 'tracking script' },
    ],
  },
  {
    id: 2,
    slug: 'solis',
    sort_order: 2,
    published: true,
    title_pl: 'Solis — agent AI',
    title_en: 'Solis — AI agent',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Agent AI, który zamienia dane o landing page’ach w konkretne rekomendacje. Odpowiedzi streamowane do interfejsu na żywo.',
    summary_en:
      'An AI agent that turns landing page data into concrete recommendations, with answers streamed live to the interface.',
    metrics_pl: [{ value: 'Kilkuset', label: 'aktywnych klientów' }],
    metrics_en: [{ value: 'Hundreds of', label: 'active customers' }],
  },
  {
    id: 3,
    slug: 'i18n',
    sort_order: 3,
    published: true,
    title_pl: 'Internacjonalizacja aplikacji',
    title_en: 'App internationalisation',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'i18n od zera w istniejącej aplikacji i zautomatyzowany proces tłumaczeń z Lokalise — tłumacze pracują bez udziału dewelopera.',
    summary_en:
      'i18n from scratch in an existing app and an automated translation workflow with Lokalise, so translators work without a developer.',
    metrics_pl: [
      { value: '6', label: 'wersji językowych' },
      { value: '5 000+', label: 'kluczy tłumaczeń' },
    ],
    metrics_en: [
      { value: '6', label: 'languages' },
      { value: '5,000+', label: 'translation keys' },
    ],
  },
  {
    id: 4,
    slug: 'raportowanie-bledow',
    sort_order: 4,
    published: true,
    title_pl: 'Raportowanie błędów',
    title_en: 'Error reporting',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Z nieużywanego Sentry do procesu, w którym raportowanie jest domyślne: pełny kontekst każdego błędu i odfiltrowany szum.',
    summary_en:
      'From an unused Sentry to a process where reporting is the default: full context for every error and the noise filtered out.',
    metrics_pl: [],
    metrics_en: [],
  },
  {
    id: 5,
    slug: 'analityka-mixpanel',
    sort_order: 5,
    published: true,
    title_pl: 'Standard analityki w Mixpanel',
    title_en: 'Mixpanel analytics standard',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Tracking plan i jedna warstwa wysyłki zdarzeń. Dane porównywalne w całej aplikacji, PM-owie pracują na nich samodzielnie.',
    summary_en:
      'A tracking plan and a single event layer. Data is comparable across the app and PMs work with it on their own.',
    metrics_pl: [],
    metrics_en: [],
  },
  {
    id: 6,
    slug: 'automatyzacje-ai',
    sort_order: 6,
    published: true,
    title_pl: 'Automatyzacje AI w zespole',
    title_en: 'AI automation for the team',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Skille AI dla zespołu: taski w Jirze, drafty PR-ów, wsparcie code review i ustrukturyzowane planowanie funkcjonalności.',
    summary_en:
      'AI skills for the team: Jira tasks, PR drafts, code review support and structured feature planning.',
    metrics_pl: [],
    metrics_en: [],
  },
]

const SKILL_NAMES_BY_PROJECT: Record<string, string[]> = {
  eventtracker: [
    'React',
    'TypeScript',
    'SWR',
    'Recharts',
    'Vite',
    'GitHub Actions',
  ],
  solis: ['React', 'TypeScript', 'Mastra', 'Vercel AI SDK', 'n8n'],
  i18n: ['React', 'i18next', 'Lokalise', 'GitHub Actions'],
  'raportowanie-bledow': ['Sentry', 'React', 'TypeScript'],
  'analityka-mixpanel': ['Mixpanel', 'React', 'TypeScript'],
  'automatyzacje-ai': ['Codex', 'GitHub', 'Jira'],
}

function idOf<Row extends { id: number }>(
  rows: Row[],
  matches: (row: Row) => boolean,
  label: string,
) {
  const row = rows.find(matches)
  if (!row) throw new Error(`Fixture references an unknown ${label}`)
  return row.id
}

const project_skills: ProjectSkillRow[] = Object.entries(
  SKILL_NAMES_BY_PROJECT,
).flatMap(([slug, names]) =>
  names.map((name) => ({
    project_id: idOf(
      projects,
      (project) => project.slug === slug,
      `Project: ${slug}`,
    ),
    skill_id: idOf(skills, (skill) => skill.name === name, `Skill: ${name}`),
  })),
)

export const FIXTURE_TABLES: ContentTables = {
  skill_categories,
  skills,
  projects,
  project_skills,
  project_screenshots: [],
}
