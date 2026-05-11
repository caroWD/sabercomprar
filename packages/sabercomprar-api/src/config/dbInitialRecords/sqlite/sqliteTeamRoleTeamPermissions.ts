import type { teamRoleTeamPermissionsTableSqlite } from '../../../db/sqliteSchema.js'
import { sqliteTeamPermissions } from './sqliteTeamPermissions.js'
import { sqliteTeamRoles } from './sqliteTeamRoles.js'

export const sqliteTeamRoleTeamPermissions: (typeof teamRoleTeamPermissionsTableSqlite.$inferInsert)[] =
  []

sqliteTeamRoles.forEach((teamRole) =>
  sqliteTeamPermissions.forEach((teamPermission) => {
    if (teamRole.slug === 'team-owner')
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'team-manager' &&
      teamPermission.slug !== 'team-settings-edit' &&
      teamPermission.slug !== 'team-delete'
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'list-editor' &&
      teamPermission.slug !== 'team-members-manage' &&
      teamPermission.slug !== 'team-settings-edit' &&
      teamPermission.slug !== 'team-delete'
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'contributor' &&
      (teamPermission.slug === 'list-view' ||
        teamPermission.slug === 'list-products-add' ||
        teamPermission.slug === 'list-products-update' ||
        teamPermission.slug === 'list-products-remove' ||
        teamPermission.slug === 'team-reports-view')
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'observer' &&
      (teamPermission.slug === 'list-view' ||
        teamPermission.slug === 'team-reports-view')
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })
  })
)
