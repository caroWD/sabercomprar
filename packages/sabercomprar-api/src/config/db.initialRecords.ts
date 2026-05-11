import { createClient } from '@libsql/client'
import { DB_FILE_NAME } from './config.js'
import { drizzle } from 'drizzle-orm/libsql'
import {
  permissionsTableSqlite,
  rolePermissionsTableSqlite,
  rolesTableSqlite,
  teamPermissionsTableSqlite,
  teamRolesTableSqlite,
  teamRoleTeamPermissionsTableSqlite,
} from '../db/index.js'
import {
  sqlitePermissions,
  sqliteRolePermissions,
  sqliteRoles,
  sqliteTeamPermissions,
  sqliteTeamRoles,
  sqliteTeamRoleTeamPermissions,
} from './dbInitialRecords/index.js'

const client = createClient({ url: DB_FILE_NAME })
const db = drizzle({ client })

const main = async (): Promise<void> => {
  await db.insert(teamPermissionsTableSqlite).values(sqliteTeamPermissions)

  await db.insert(teamRolesTableSqlite).values(sqliteTeamRoles)

  await db
    .insert(teamRoleTeamPermissionsTableSqlite)
    .values(sqliteTeamRoleTeamPermissions)

  await db.insert(permissionsTableSqlite).values(sqlitePermissions)

  await db.insert(rolesTableSqlite).values(sqliteRoles)

  await db.insert(rolePermissionsTableSqlite).values(sqliteRolePermissions)
}

main()
