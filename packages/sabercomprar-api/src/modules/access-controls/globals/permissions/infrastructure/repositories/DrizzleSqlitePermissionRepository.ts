import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type {
  BaseInsert,
  BaseSelect,
  BaseSlug,
  IBaseRepository,
  RootId,
} from '../../../../../primitives/index.js'
import { PermissionNotFoundError, type Permission } from '../../domain/index.js'
import { PermissionMapper } from '../services/index.js'
import { permissionsTableSqlite } from '../../../../../../db/index.js'
import { eq } from 'drizzle-orm'
import { Temporal } from 'temporal-polyfill'

export class DrizzleSqlitePermissionRepository implements IBaseRepository<Permission> {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async add(entity: Permission): Promise<void> {
    const permissionMapped: BaseInsert =
      await PermissionMapper.mapToPermissionInsert(entity)

    const { rowsAffected } = await this._sqlite
      .insert(permissionsTableSqlite)
      .values(permissionMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Permission): Promise<void> {
    const permissionMapped: BaseInsert =
      await PermissionMapper.mapToPermissionInsert(entity)

    const { rowsAffected } = await this._sqlite
      .update(permissionsTableSqlite)
      .set({
        slug: permissionMapped.slug,
        name: permissionMapped.name,
        description: permissionMapped.description,
        updatedAt: permissionMapped.updatedAt,
      })
      .where(eq(permissionsTableSqlite.id, permissionMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggle(id: RootId): Promise<void> {
    const [permission] = await this._sqlite
      .select({ state: permissionsTableSqlite.state })
      .from(permissionsTableSqlite)
      .where(eq(permissionsTableSqlite.id, id.value))
    if (!permission) throw new PermissionNotFoundError('Permission not found!')

    const { rowsAffected } = await this._sqlite
      .update(permissionsTableSqlite)
      .set({
        state: permission.state === 'active' ? 'archived' : 'active',
        updatedAt: Temporal.Now.plainDateTimeISO(
          Temporal.Now.timeZoneId()
        ).toJSON(),
        archivedAt:
          permission.state === 'active'
            ? Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()
            : null,
      })
      .where(eq(permissionsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }
  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(permissionsTableSqlite)
      .where(eq(permissionsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Permission[]> {
    const permissions: BaseSelect[] = await this._sqlite
      .select({
        id: permissionsTableSqlite.id,
        slug: permissionsTableSqlite.slug,
        name: permissionsTableSqlite.name,
        description: permissionsTableSqlite.description,
        state: permissionsTableSqlite.state,
        createdAt: permissionsTableSqlite.createdAt,
        updatedAt: permissionsTableSqlite.updatedAt,
        archivedAt: permissionsTableSqlite.archivedAt,
      })
      .from(permissionsTableSqlite)

    return !permissions.length
      ? []
      : await Promise.all(
          permissions.map(
            async (permission) =>
              await PermissionMapper.mapToPermission(permission)
          )
        )
  }

  async findOne(id: RootId): Promise<Permission | null> {
    const [permission] = await this._sqlite
      .select({
        id: permissionsTableSqlite.id,
        slug: permissionsTableSqlite.slug,
        name: permissionsTableSqlite.name,
        description: permissionsTableSqlite.description,
        state: permissionsTableSqlite.state,
        createdAt: permissionsTableSqlite.createdAt,
        updatedAt: permissionsTableSqlite.updatedAt,
        archivedAt: permissionsTableSqlite.archivedAt,
      })
      .from(permissionsTableSqlite)
      .where(eq(permissionsTableSqlite.id, id.value))

    return !permission
      ? null
      : await PermissionMapper.mapToPermission(permission)
  }

  async ensureAlreadyExists(slug: BaseSlug): Promise<boolean> {
    const [permission] = await this._sqlite
      .select({ slug: permissionsTableSqlite.slug })
      .from(permissionsTableSqlite)
      .where(eq(permissionsTableSqlite.slug, slug.value))

    return !permission ? false : true
  }
}
