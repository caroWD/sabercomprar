import { createClient } from '@libsql/client'
import { DB_FILE_NAME } from '../config/index.js'
import { drizzle } from 'drizzle-orm/libsql'
import { DrizzleSqliteTeamPermissionRepository } from '../modules/index.js'

const client = createClient({ url: DB_FILE_NAME })
const sqlite = drizzle({ client })

export const teamPermissionRepository =
  new DrizzleSqliteTeamPermissionRepository(sqlite)
