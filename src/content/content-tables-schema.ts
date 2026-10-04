import { z } from 'zod'
import type { ContentTables } from './table-source'

const text = z.string()
const requiredText = z.string().trim().min(1)

const metric = z.object({ value: requiredText, label: requiredText })
const challenge = z.object({ title: requiredText, body: requiredText })
const stackGroup = z.object({
  label: requiredText,
  items: z.array(requiredText),
})
const projectLink = z.union([
  z.object({ label: requiredText, url: z.url() }),
  z.object({ label: requiredText, note: requiredText }),
])

const perLocale = <Field extends string, Schema extends z.ZodType>(
  field: Field,
  schema: Schema,
) =>
  ({ [`${field}_pl`]: schema, [`${field}_en`]: schema }) as Record<
    `${Field}_pl` | `${Field}_en`,
    Schema
  >

const integer = z.number().int()
const id = integer

export const contentTablesSchema: z.ZodType<ContentTables> = z.object({
  skill_categories: z.array(
    z.object({ id, ...perLocale('name', requiredText), sort_order: integer }),
  ),
  skills: z.array(
    z.object({ id, name: requiredText, category_id: id, sort_order: integer }),
  ),
  projects: z.array(
    z.object({
      id,
      slug: requiredText,
      sort_order: integer,
      published: z.boolean(),
      ...perLocale('title', requiredText),
      ...perLocale('context', requiredText),
      ...perLocale('summary', requiredText),
      ...perLocale('metrics', z.array(metric)),
      ...perLocale('problem', text),
      ...perLocale('role', text),
      ...perLocale('built', z.array(requiredText)),
      ...perLocale('challenges', z.array(challenge)),
      ...perLocale('outcomes', z.array(requiredText)),
      ...perLocale('stack', z.array(stackGroup)),
      ...perLocale('links', z.array(projectLink)),
    }),
  ),
  project_skills: z.array(z.object({ project_id: id, skill_id: id })),
  project_screenshots: z.array(
    z.object({
      id,
      project_id: id,
      storage_path: requiredText,
      ...perLocale('alt', requiredText),
      sort_order: integer,
    }),
  ),
})
