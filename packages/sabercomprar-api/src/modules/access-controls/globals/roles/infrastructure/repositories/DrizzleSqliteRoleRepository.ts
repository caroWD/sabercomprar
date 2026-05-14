import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type {
  RootId,
  BaseSlug,
  BaseInsert,
  BaseSelect,
} from '../../../../../primitives/index.js'
import {
  PermissionMapper,
  type Permission,
} from '../../../permissions/index.js'
import {
  RoleNotFoundError,
  type Role,
  type IRoleRepository,
} from '../../domain/index.js'
import {
  permissionsTableSqlite,
  rolePermissionsTableSqlite,
  rolesTableSqlite,
} from '../../../../../../db/sqliteSchema.js'
import { and, eq } from 'drizzle-orm'
import { RoleMapper } from '../services/index.js'
import { Temporal } from 'temporal-polyfill'

export class DrizzleSqliteRoleRepository implements IRoleRepository {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async addPermissionToRole(
    roleId: RootId,
    permissionId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .insert(rolePermissionsTableSqlite)
      .values({ roleId: roleId.value, permissionId: permissionId.value })

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async removePermissionToRole(
    roleId: RootId,
    permissionId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(rolePermissionsTableSqlite)
      .where(
        and(
          eq(rolePermissionsTableSqlite.roleId, roleId.value),
          eq(rolePermissionsTableSqlite.permissionId, permissionId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findPermissionsForRole(roleId: RootId): Promise<Permission[]> {
    const permissions = (
      await this._sqlite
        .select()
        .from(rolePermissionsTableSqlite)
        .where(eq(rolePermissionsTableSqlite.roleId, roleId.value))
        .leftJoin(
          permissionsTableSqlite,
          eq(rolePermissionsTableSqlite.permissionId, permissionsTableSqlite.id)
        )
    )
      .map((result) => result.permissions)
      .filter((result) => result !== null)

    return !permissions.length
      ? []
      : await Promise.all(
          permissions.map(
            async (permission) =>
              await PermissionMapper.mapToPermission(permission)
          )
        )
  }

  async ensureRoleHasThisPermission(
    roleId: RootId,
    permissionId: RootId
  ): Promise<boolean> {
    const [rolePermission] = await this._sqlite
      .select()
      .from(rolePermissionsTableSqlite)
      .where(
        and(
          eq(rolePermissionsTableSqlite.roleId, roleId.value),
          eq(rolePermissionsTableSqlite.permissionId, permissionId.value)
        )
      )

    return !rolePermission ? false : true
  }

  async add(entity: Role): Promise<void> {
    const roleMapped: BaseInsert = await RoleMapper.mapToRoleInsert(entity)

    const { rowsAffected } = await this._sqlite
      .insert(rolesTableSqlite)
      .values(roleMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Role): Promise<void> {
    const roleMapped: BaseInsert = await RoleMapper.mapToRoleInsert(entity)

    const { rowsAffected } = await this._sqlite
      .update(rolesTableSqlite)
      .set({
        slug: roleMapped.slug,
        name: roleMapped.name,
        description: roleMapped.description,
        updatedAt: roleMapped.updatedAt,
      })
      .where(eq(rolesTableSqlite.id, roleMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggle(id: RootId): Promise<void> {
    const [role] = await this._sqlite
      .select({ state: rolesTableSqlite.state })
      .from(rolesTableSqlite)
      .where(eq(rolesTableSqlite.id, id.value))
    if (!role) throw new RoleNotFoundError('Role not found!')

    const { rowsAffected } = await this._sqlite
      .update(rolesTableSqlite)
      .set({
        state: role.state === 'active' ? 'archived' : 'active',
        updatedAt: Temporal.Now.plainDateTimeISO(
          Temporal.Now.timeZoneId()
        ).toJSON(),
        archivedAt:
          role.state === 'active'
            ? Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()
            : null,
      })
      .where(eq(rolesTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(rolesTableSqlite)
      .where(eq(rolesTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Role[]> {
    const roles: BaseSelect[] = await this._sqlite
      .select()
      .from(rolesTableSqlite)

    return !roles.length
      ? []
      : await Promise.all(
          roles.map(async (role) => await RoleMapper.mapToRole(role))
        )
  }

  async findOne(id: RootId): Promise<Role | null> {
    const [roleFinded] = await this._sqlite
      .select()
      .from(rolesTableSqlite)
      .where(eq(rolesTableSqlite.id, id.value))

    return !roleFinded ? null : await RoleMapper.mapToRole(roleFinded)
  }

  async ensureAlreadyExists(slug: BaseSlug): Promise<boolean> {
    const [roleExists] = await this._sqlite
      .select({ slug: rolesTableSqlite.slug })
      .from(rolesTableSqlite)
      .where(eq(rolesTableSqlite.slug, slug.value))

    return !roleExists ? false : true
  }
}
