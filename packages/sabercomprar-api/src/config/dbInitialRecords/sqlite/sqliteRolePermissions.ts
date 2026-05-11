import { rolePermissionsTableSqlite } from '../../../db/sqliteSchema.js'
import { sqlitePermissions } from './sqlitePermissions.js'
import { sqliteRoles } from './sqliteRoles.js'

export const sqliteRolePermissions: (typeof rolePermissionsTableSqlite.$inferInsert)[] =
  []

sqliteRoles.forEach((role) =>
  sqlitePermissions.forEach((permission) => {
    if (role.slug === 'super-admin')
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (
      role.slug === 'technical-support' &&
      permission.slug !== 'system-config-view' &&
      permission.slug !== 'system-config-manage' &&
      permission.slug !== 'users-manage'
    )
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (
      role.slug === 'catalog-moderator' &&
      (permission.slug === 'catalog-products-manage' ||
        permission.slug === 'catalog-brands-manage' ||
        permission.slug === 'catalog-supermarkets-manage' ||
        permission.slug === 'catalog-presentations-manage')
    )
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (
      role.slug === 'premium-user' &&
      (permission.slug === 'users-view' ||
        permission.slug === 'teams-view-all' ||
        permission.slug === 'reports-global-view')
    )
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (
      role.slug === 'standard-user' &&
      (permission.slug === 'users-view' || permission.slug === 'teams-view-all')
    )
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (role.slug === 'guest-user' && permission.slug === 'teams-view-all')
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })
  })
)
