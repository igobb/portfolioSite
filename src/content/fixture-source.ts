import { createTableSource, type ContentTables } from './table-source'

// Fixture Screenshots live in `public/`, so the storage path doubles as the URL.
export const createFixtureSource = (tables: ContentTables) =>
  createTableSource(tables, (storagePath) => `/${storagePath}`)
