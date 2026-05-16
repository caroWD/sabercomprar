import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import {
  User,
  UserAvatar,
  UserEmail,
  UserFirstName,
  UserHandle,
  UserLastName,
  UserPassword,
} from '../../../../auth/index.js'
import {
  RootId,
  RootState,
  RootStateEnum,
  TempoArchivedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
  type BaseInsert,
  type BaseSelect,
  type BaseSlug,
} from '../../../../primitives/index.js'
import {
  TeamNotFoundError,
  UserDoesNotExistsOnTeamError,
  type Team,
  type ITeamRepository,
} from '../../domain/index.js'
import {
  teamsTableSqlite,
  usersTableSqlite,
  userTeamsRolesTableSqlite,
} from '../../../../../db/sqliteSchema.js'
import {
  getTemporalFrom,
  getTemporalNow,
} from '../../../../../helpers/temporalHelper.js'
import { and, eq } from 'drizzle-orm'
import { TeamMapper } from '../services/TeamMapper.js'

export class DrizzleSqliteTeamRepository implements ITeamRepository {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async addUserToTeam(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .insert(userTeamsRolesTableSqlite)
      .values({
        userId: userId.value,
        teamId: teamId.value,
        teamRoleId: teamRoleId.value,
      })

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async editTeamUser(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .update(userTeamsRolesTableSqlite)
      .set({
        teamRoleId: teamRoleId.value,
        updatedAt: getTemporalNow().toJSON(),
      })
      .where(
        and(
          eq(userTeamsRolesTableSqlite.teamId, teamId.value),
          eq(userTeamsRolesTableSqlite.userId, userId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggleTeamUser(teamId: RootId, userId: RootId): Promise<void> {
    const [userTeamsRoles] = await this._sqlite
      .select({ state: userTeamsRolesTableSqlite.state })
      .from(userTeamsRolesTableSqlite)
      .where(
        and(
          eq(userTeamsRolesTableSqlite.userId, userId.value),
          eq(userTeamsRolesTableSqlite.teamId, teamId.value)
        )
      )

    if (!userTeamsRoles)
      throw new UserDoesNotExistsOnTeamError('User does not exists on team!')

    const { rowsAffected } = await this._sqlite
      .update(userTeamsRolesTableSqlite)
      .set({
        state: userTeamsRoles.state === 'active' ? 'archived' : 'active',
        archivedAt:
          userTeamsRoles.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(
        and(
          eq(userTeamsRolesTableSqlite.userId, userId.value),
          eq(userTeamsRolesTableSqlite.teamId, teamId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async removeTeamUser(teamId: RootId, userId: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(userTeamsRolesTableSqlite)
      .where(
        and(
          eq(userTeamsRolesTableSqlite.userId, userId.value),
          eq(userTeamsRolesTableSqlite.teamId, teamId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findUsersByTeam(teamId: RootId): Promise<User[]> {
    const users = (
      await this._sqlite
        .select()
        .from(userTeamsRolesTableSqlite)
        .where(eq(userTeamsRolesTableSqlite.teamId, teamId.value))
        .leftJoin(
          usersTableSqlite,
          eq(userTeamsRolesTableSqlite.userId, usersTableSqlite.id)
        )
    )
      .map((result) => result.users)
      .filter((result) => result !== null)

    return !users.length
      ? []
      : users.map(
          (user) =>
            new User(
              RootId.create(user.id),
              UserHandle.create(user.handle),
              UserFirstName.create(user.firstName),
              UserLastName.create(user.lastName),
              UserEmail.create(user.email),
              UserPassword.create(user.password),
              UserAvatar.create(user.avatar),
              RootId.create(user.roleId),
              RootState.create(
                user.state === 'active'
                  ? RootStateEnum.ACTIVE
                  : RootStateEnum.ARCHIVED
              ),
              TempoCreatedAt.create(getTemporalFrom(user.createdAt)),
              TempoUpdatedAt.create(getTemporalFrom(user.updatedAt)),
              TempoArchivedAt.create(
                !user.archivedAt ? null : getTemporalFrom(user.archivedAt)
              )
            )
        )
  }

  async ensureUserAlreadyExistsOnTeam(
    teamId: RootId,
    userId: RootId
  ): Promise<boolean> {
    const [exists] = await this._sqlite
      .select({
        userId: userTeamsRolesTableSqlite.userId,
        teamId: userTeamsRolesTableSqlite.teamId,
      })
      .from(userTeamsRolesTableSqlite)
      .where(
        and(
          eq(userTeamsRolesTableSqlite.userId, userId.value),
          eq(userTeamsRolesTableSqlite.teamId, teamId.value)
        )
      )

    return !exists ? false : true
  }

  async add(entity: Team): Promise<void> {
    const teamMapped: BaseInsert = await TeamMapper.mapToTeamInsert(entity)

    const { rowsAffected } = await this._sqlite
      .insert(teamsTableSqlite)
      .values(teamMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Team): Promise<void> {
    const teamMapped: BaseInsert = await TeamMapper.mapToTeamInsert(entity)

    const { rowsAffected } = await this._sqlite
      .update(teamsTableSqlite)
      .set({
        slug: teamMapped.slug,
        name: teamMapped.name,
        description: teamMapped.description,
        updatedAt: teamMapped.updatedAt,
      })
      .where(eq(teamsTableSqlite.id, teamMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggle(id: RootId): Promise<void> {
    const [team] = await this._sqlite
      .select({ state: teamsTableSqlite.state })
      .from(teamsTableSqlite)
      .where(eq(teamsTableSqlite.id, id.value))
    if (!team) throw new TeamNotFoundError('Team not found!')

    const { rowsAffected } = await this._sqlite
      .update(teamsTableSqlite)
      .set({
        state: team.state === 'active' ? 'archived' : 'active',
        archivedAt: team.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(eq(teamsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(teamsTableSqlite)
      .where(eq(teamsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Team[]> {
    const teams: BaseSelect[] = await this._sqlite
      .select()
      .from(teamsTableSqlite)

    return !teams.length
      ? []
      : await Promise.all(
          teams.map(async (team) => await TeamMapper.mapToTeam(team))
        )
  }

  async findOne(id: RootId): Promise<Team | null> {
    const [teamFinded] = await this._sqlite
      .select()
      .from(teamsTableSqlite)
      .where(eq(teamsTableSqlite.id, id.value))

    return !teamFinded ? null : await TeamMapper.mapToTeam(teamFinded)
  }

  async ensureAlreadyExists(slug: BaseSlug): Promise<boolean> {
    const [exists] = await this._sqlite
      .select({ slug: teamsTableSqlite.slug })
      .from(teamsTableSqlite)
      .where(eq(teamsTableSqlite.slug, slug.value))

    return !exists ? false : true
  }
}
