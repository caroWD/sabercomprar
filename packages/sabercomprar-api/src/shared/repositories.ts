import { createClient } from '@libsql/client'
import { DB_FILE_NAME } from '../config/index.js'
import { drizzle } from 'drizzle-orm/libsql'
import { DrizzleSqliteTeamPermissionRepository } from '../modules/access-controls/teams/team-permissions/infrastructure/repositories/DrizzleSqliteTeamPermissionRepository.js'
import { DrizzleSqliteTeamRoleRepository } from '../modules/access-controls/teams/team-roles/infrastructure/repositories/DrizzleSqliteTeamRoleRepository.js'
import { DrizzleSqlitePermissionRepository } from '../modules/access-controls/globals/permissions/infrastructure/repositories/DrizzleSqlitePermissionRepository.js'
import { DrizzleSqliteRoleRepository } from '../modules/access-controls/globals/roles/infrastructure/repositories/DrizzleSqliteRoleRepository.js'

const client = createClient({ url: DB_FILE_NAME })
const sqlite = drizzle({ client })

export const teamPermissionRepository =
  new DrizzleSqliteTeamPermissionRepository(sqlite)
export const teamRoleRepository = new DrizzleSqliteTeamRoleRepository(sqlite)

export const permissionRepository = new DrizzleSqlitePermissionRepository(
  sqlite
)
export const roleRepository = new DrizzleSqliteRoleRepository(sqlite)
