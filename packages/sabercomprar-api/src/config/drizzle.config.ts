import { DB_FILE_NAME } from './config.js'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/sqliteSchema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: DB_FILE_NAME,
  },
})
