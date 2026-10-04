import { createClient } from '@supabase/supabase-js'
import { contentTablesSchema } from './content-tables-schema'
import { createTableSource, type ContentTables } from './table-source'
import type { ContentSource } from './types'

export const CONTENT_TAG = 'content'

const SCREENSHOTS_BUCKET = 'screenshots'

const TABLE_NAMES = [
  'skill_categories',
  'skills',
  'projects',
  'project_skills',
  'project_screenshots',
] as const satisfies (keyof ContentTables)[]

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable ${name}`)
  return value
}

function supabaseClient(cacheOptions: RequestInit) {
  return createClient(
    requiredEnv('SUPABASE_URL'),
    requiredEnv('SUPABASE_PUBLISHABLE_KEY'),
    {
      global: {
        fetch: (input, init) => fetch(input, { ...init, ...cacheOptions }),
      },
    },
  )
}

async function loadTableSource() {
  const client = supabaseClient({
    cache: 'force-cache',
    next: { tags: [CONTENT_TAG] },
  })

  const rows = await Promise.all(
    TABLE_NAMES.map(async (table) => {
      const { data, error } = await client.from(table).select('*')
      if (error) throw new Error(`Loading ${table} failed: ${error.message}`)
      return [table, data] as const
    }),
  )

  const tables = contentTablesSchema.parse(Object.fromEntries(rows))

  return createTableSource(
    tables,
    (storagePath) =>
      client.storage.from(SCREENSHOTS_BUCKET).getPublicUrl(storagePath).data
        .publicUrl,
  )
}

export function createSupabaseSource(): ContentSource {
  return {
    getSkillCategories: async (locale) =>
      (await loadTableSource()).getSkillCategories(locale),
    getProjectList: async (locale) =>
      (await loadTableSource()).getProjectList(locale),
    getProjectCards: async (locale, range) =>
      (await loadTableSource()).getProjectCards(locale, range),
    getProjectPage: async (locale, slug) =>
      (await loadTableSource()).getProjectPage(locale, slug),
  }
}

export async function pingSupabase() {
  const { error } = await supabaseClient({ cache: 'no-store' })
    .from('skill_categories')
    .select('id')
    .limit(1)

  if (error) throw new Error(`Supabase keep-alive failed: ${error.message}`)
}
