import type { ContentTables, ProjectSkillRow } from './table-source'

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
    name_pl: 'Backend i bazy danych',
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
  'Backend i bazy danych': [
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
  'Monitoring i analityka': ['Sentry', 'Mixpanel', 'Google Analytics'],
  AI: ['Claude Code', 'Codex', 'Mastra', 'Vercel AI SDK', 'n8n', 'MCP'],
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

// Only EventTracker has full Project page Content (from the Design canvas); the rest arrives with Supabase (ticket 09).
export const NO_PAGE_SECTIONS = {
  problem_pl: '',
  problem_en: '',
  role_pl: '',
  role_en: '',
  built_pl: [],
  built_en: [],
  challenges_pl: [],
  challenges_en: [],
  outcomes_pl: [],
  outcomes_en: [],
  stack_pl: [],
  stack_en: [],
  links_pl: [],
  links_en: [],
} satisfies Partial<ContentTables['projects'][number]>

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
      { value: '< 25 kB', label: 'skryptu śledzącego' },
    ],
    metrics_en: [
      { value: '1.2M+', label: 'sessions a day' },
      { value: '< 25 kB', label: 'tracking script' },
    ],
    problem_pl:
      'Klienci Landingi potrzebowali danych o tym, jak odwiedzający zachowują się na ich landing page’ach — żeby lepiej rozumieć swoich klientów i trafniej dobierać treści, a w efekcie zdobywać więcej leadów i więcej sprzedawać. I to bez konfigurowania narzędzi i wklejania kodu. Rozwiązaniem jest analityka wbudowana w platformę, która zbiera zdarzenia automatycznie na każdej opublikowanej stronie.',
    problem_en:
      'Landingi customers needed data on how visitors behave on their landing pages, so they could understand their own customers better and choose content more accurately, which in turn means more leads and more sales. And they needed it without configuring tools or pasting code. The answer is analytics built into the platform that collects events automatically on every published page.',
    role_pl:
      'Architektura całości po stronie klienckiej oraz implementacja frontendu — dashboard analityczny i skrypt śledzący. Przepływ danych zaprojektowałem sam; poza moim zakresem było wyłącznie ich składowanie na backendzie.',
    role_en:
      'The whole client-side architecture and the frontend implementation: the analytics dashboard and the tracking script. I designed the data flow myself; only storing the data on the backend was outside my scope.',
    built_pl: [],
    built_en: [],
    challenges_pl: [
      {
        title: 'Skrypt, który nie może kosztować klienta wyników',
        body: 'Skrypt trafia na strony klientów, więc każdy kilobajt i każda milisekunda obciążają ich Core Web Vitals. Napisałem go w czystym TypeScripcie, z minimalnymi zależnościami i konfiguracją Vite nastawioną na rozmiar paczki — plik wynikowy waży poniżej 25 kB. Zdarzenia wysyła sendBeacon z throttlingiem po stronie klienta, żeby nie obciążać głównego wątku ani sieci użytkownika.',
      },
      {
        title: 'Dashboard przy dużym wolumenie zdarzeń',
        body: 'Paginacja zamiast ładowania pełnych zbiorów, cache i deduplikacja zapytań w SWR oraz optimistic UI przy zmianach konfiguracji, żeby interfejs odpowiadał natychmiast.',
      },
    ],
    challenges_en: [
      {
        title: 'A script that must not cost customers their scores',
        body: 'The script runs on customers’ pages, so every kilobyte and millisecond weighs on their Core Web Vitals. I wrote it in plain TypeScript with minimal dependencies and a Vite config tuned for bundle size; the output weighs under 25 kB. Events are sent with sendBeacon and throttled on the client so they don’t load the main thread or the visitor’s network.',
      },
      {
        title: 'A dashboard for a high volume of events',
        body: 'Pagination instead of loading full data sets, request caching and deduplication with SWR, and optimistic UI for configuration changes so the interface responds instantly.',
      },
    ],
    outcomes_pl: [
      'Zdarzenia zbierane z ponad 1,2 mln sesji dziennie.',
      'Dane z EventTrackera stały się podstawą kilkunastu kolejnych funkcjonalności platformy.',
      'Dostęp do danych jest osobno monetyzowany w abonamencie.',
    ],
    outcomes_en: [
      'Events collected from over 1.2 million sessions a day.',
      'EventTracker data became the basis for more than a dozen further platform features.',
      'Access to the data is monetised separately in the subscription.',
    ],
    stack_pl: [
      {
        label: 'Dashboard',
        items: ['React', 'TypeScript', 'SWR', 'Recharts'],
      },
      {
        label: 'Skrypt śledzący',
        items: [
          'TypeScript bez frameworka',
          'Vite',
          'własna konfiguracja builda',
        ],
      },
      { label: 'CI/CD', items: ['GitHub Actions'] },
    ],
    stack_en: [
      {
        label: 'Dashboard',
        items: ['React', 'TypeScript', 'SWR', 'Recharts'],
      },
      {
        label: 'Tracking script',
        items: ['framework-free TypeScript', 'Vite', 'custom build config'],
      },
      { label: 'CI/CD', items: ['GitHub Actions'] },
    ],
    links_pl: [
      {
        label: 'Strona produktowa',
        url: 'https://landingi.com/pl/produkt/eventtracker/',
      },
      { label: 'Repozytorium', note: 'kod zamknięty' },
    ],
    links_en: [
      {
        label: 'Product page',
        url: 'https://landingi.com/product/eventtracker/',
      },
      { label: 'Repository', note: 'closed source' },
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
      'Agent AI, który na podstawie danych z EventTrackera sam cyklicznie podsuwa rekomendacje. W czacie odpowiada na pytania o dane i na żywo wskazuje zmiany podnoszące konwersję.',
    summary_en:
      'An AI agent that regularly makes recommendations on its own from EventTracker data. In a chat it answers questions about the data and suggests changes that raise conversion, streamed live.',
    metrics_pl: [{ value: 'Kilkuset', label: 'aktywnych klientów' }],
    metrics_en: [{ value: 'Hundreds of', label: 'active customers' }],
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 3,
    slug: 'i18n',
    sort_order: 4,
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
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 4,
    slug: 'raportowanie-bledow',
    sort_order: 5,
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
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 5,
    slug: 'analityka-mixpanel',
    sort_order: 6,
    published: true,
    title_pl: 'Standard analityki w Mixpanel',
    title_en: 'Mixpanel analytics standard',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Z chaosu w nazwach zdarzeń do jednego standardu: tracking plan, wspólna funkcja wysyłki i uporządkowane dane, na których product managerowie pracują samodzielnie.',
    summary_en:
      'From inconsistent event names to one standard: a tracking plan, a shared sending function and cleaned-up data that product managers work with on their own.',
    metrics_pl: [],
    metrics_en: [],
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 6,
    slug: 'automatyzacje-ai',
    sort_order: 3,
    published: true,
    title_pl: 'Automatyzacje AI w zespole',
    title_en: 'AI automation for the team',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Skille AI dla zespołu: taski w Jirze tworzone z dokumentacji biznesowej, drafty PR-ów, wsparcie code review i ustrukturyzowane planowanie funkcjonalności.',
    summary_en:
      'AI skills for the team: Jira tasks created from business documentation, PR drafts, code review support and structured feature planning.',
    metrics_pl: [],
    metrics_en: [],
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 7,
    slug: 'czat-wsparcia-ai',
    sort_order: 7,
    published: true,
    title_pl: 'Czat wsparcia AI',
    title_en: 'AI support chat',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Czat AI wbudowany we wszystkie aplikacje Landingi. Odpowiada na powtarzalne pytania na podstawie bazy wiedzy, a trudniejsze rozmowy przekazuje do człowieka.',
    summary_en:
      'An AI chat built into every Landingi app. It answers repetitive questions from the knowledge base and hands harder conversations over to a person.',
    metrics_pl: [{ value: '24/7', label: 'wsparcia klientów' }],
    metrics_en: [{ value: '24/7', label: 'customer support' }],
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 8,
    slug: 'rejestracja-i-logowanie',
    sort_order: 8,
    published: true,
    title_pl: 'Rejestracja i logowanie',
    title_en: 'Registration and sign-in',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Ujednolicone wejście do platformy: rejestracja, logowanie, weryfikacja e-maila, odzyskiwanie hasła i 2FA w jednym spójnym przepływie zamiast kilku rozproszonych wariantów.',
    summary_en:
      'A unified way into the platform: registration, sign-in, email verification, password recovery and 2FA in one consistent flow instead of several scattered variants.',
    metrics_pl: [],
    metrics_en: [],
    ...NO_PAGE_SECTIONS,
  },
  {
    id: 9,
    slug: 'mapy-klikniec-i-scrolla',
    sort_order: 9,
    published: true,
    title_pl: 'Mapy kliknięć i scrolla',
    title_en: 'Event and scroll maps',
    context_pl: 'Landingi',
    context_en: 'Landingi',
    summary_pl:
      'Heatmapy kliknięć i mapy scrolla nałożone na opublikowany landing page, zbudowane na danych z EventTrackera. Klient widzi, gdzie użytkownicy klikają i jak daleko przewijają stronę.',
    summary_en:
      'Click heatmaps and scroll maps laid over a published landing page, built on EventTracker data. Customers see where visitors click and how far they scroll.',
    metrics_pl: [],
    metrics_en: [],
    ...NO_PAGE_SECTIONS,
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
  'automatyzacje-ai': ['Codex', 'Claude Code', 'MCP', 'GitHub', 'Jira'],
  'czat-wsparcia-ai': ['React', 'TypeScript', 'JavaScript', 'n8n'],
  'rejestracja-i-logowanie': [
    'React',
    'TypeScript',
    'SWR',
    'React Hook Form',
    'Zod',
    'Vitest',
  ],
  'mapy-klikniec-i-scrolla': ['React', 'TypeScript', 'SWR'],
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

const EVENTTRACKER_SCREENSHOTS = [
  { alt_pl: 'Dashboard analityczny', alt_en: 'Analytics dashboard' },
  { alt_pl: 'Lista zdarzeń', alt_en: 'Event list' },
  { alt_pl: 'Ustawienia śledzenia', alt_en: 'Tracking settings' },
]

const project_screenshots: ContentTables['project_screenshots'] =
  EVENTTRACKER_SCREENSHOTS.map(({ alt_pl, alt_en }, index) => ({
    id: index + 1,
    project_id: idOf(
      projects,
      (project) => project.slug === 'eventtracker',
      'Project: eventtracker',
    ),
    storage_path: `fixtures/eventtracker/${index + 1}.svg`,
    alt_pl,
    alt_en,
    sort_order: index + 1,
  }))

export const FIXTURE_TABLES: ContentTables = {
  skill_categories,
  skills,
  projects,
  project_skills,
  project_screenshots,
}
