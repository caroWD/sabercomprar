import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type {
  BaseInsert,
  BaseSelect,
  BaseSlug,
  IBaseRepository,
  RootId,
} from '../../../../../primitives/index.js'
import {
  TeamPermissionNotFoundError,
  type TeamPermission,
} from '../../domain/index.js'
import { TeamPermissionMapper } from '../services/index.js'
import { teamPermissionsTableSqlite } from '../../../../../../db/sqliteSchema.js'
import { eq } from 'drizzle-orm'
import { getTemporalNow } from '../../../../../../helpers/index.js'

export class DrizzleSqliteTeamPermissionRepository implements IBaseRepository<TeamPermission> {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async add(entity: TeamPermission): Promise<void> {
    const teamPermissionMapped: BaseInsert =
      await TeamPermissionMapper.mapToTeamPermissionInsert(entity)

    const { rowsAffected } = await this._sqlite
      .insert(teamPermissionsTableSqlite)
      .values(teamPermissionMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: TeamPermission): Promise<void> {
    const teamPermissionMapped: BaseInsert =
      await TeamPermissionMapper.mapToTeamPermissionInsert(entity)

    const { rowsAffected } = await this._sqlite
      .update(teamPermissionsTableSqlite)
      .set({
        slug: teamPermissionMapped.slug,
        name: teamPermissionMapped.name,
        description: teamPermissionMapped.description,
        updatedAt: teamPermissionMapped.updatedAt,
      })
      .where(eq(teamPermissionsTableSqlite.id, teamPermissionMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggle(id: RootId): Promise<void> {
    const [teamPermission] = await this._sqlite
      .select({ state: teamPermissionsTableSqlite.state })
      .from(teamPermissionsTableSqlite)
      .where(eq(teamPermissionsTableSqlite.id, id.value))
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    const { rowsAffected } = await this._sqlite
      .update(teamPermissionsTableSqlite)
      .set({
        state: teamPermission.state === 'active' ? 'archived' : 'active',
        updatedAt: getTemporalNow().toJSON(),
        archivedAt:
          teamPermission.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(eq(teamPermissionsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(teamPermissionsTableSqlite)
      .where(eq(teamPermissionsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<TeamPermission[]> {
    const teamPermissions: BaseSelect[] = await this._sqlite
      .select()
      .from(teamPermissionsTableSqlite)

    return !teamPermissions.length
      ? []
      : await Promise.all(
          teamPermissions.map(
            async (teamPermission) =>
              await TeamPermissionMapper.mapToTeamPermission(teamPermission)
          )
        )
  }

  async findOne(id: RootId): Promise<TeamPermission | null> {
    const [teamPermission] = await this._sqlite
      .select()
      .from(teamPermissionsTableSqlite)
      .where(eq(teamPermissionsTableSqlite.id, id.value))

    return !teamPermission
      ? null
      : await TeamPermissionMapper.mapToTeamPermission(teamPermission)
  }

  async ensureAlreadyExists(slug: BaseSlug): Promise<boolean> {
    const [teamPermission] = await this._sqlite
      .select({ slug: teamPermissionsTableSqlite.slug })
      .from(teamPermissionsTableSqlite)
      .where(eq(teamPermissionsTableSqlite.slug, slug.value))

    return !teamPermission ? false : true
  }
}
