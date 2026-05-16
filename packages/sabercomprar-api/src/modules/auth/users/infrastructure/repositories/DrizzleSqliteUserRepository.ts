import { compare, hash } from 'bcryptjs'
import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type { RootId } from '../../../../primitives/index.js'
import { TeamMapper, type Team } from '../../../../workspaces/index.js'
import {
  UnauthorizedUserError,
  UserNotFoundError,
  type IUserRepository,
  type User,
  type UserEmail,
  type UserHandle,
  type UserPassword,
} from '../../domain/index.js'
import {
  UserMapper,
  type UserInsert,
  type UserSelect,
} from '../services/index.js'
import {
  teamsTableSqlite,
  usersTableSqlite,
  userTeamsRolesTableSqlite,
} from '../../../../../db/sqliteSchema.js'
import { eq } from 'drizzle-orm'
import { SALT_ROUNDS } from '../../../../../config/config.js'
import { getTemporalNow } from '../../../../../helpers/temporalHelper.js'

export class DrizzleSqliteUserRepository implements IUserRepository {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async add(user: User): Promise<void> {
    const userMapped: UserInsert = await UserMapper.mapToUserInsert(user)

    const { rowsAffected } = await this._sqlite
      .insert(usersTableSqlite)
      .values(userMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(user: User): Promise<void> {
    const userMapped: UserInsert = await UserMapper.mapToUserInsert(user)

    const { rowsAffected } = await this._sqlite
      .update(usersTableSqlite)
      .set({
        handle: userMapped.handle,
        firstName: userMapped.firstName,
        lastName: userMapped.lastName,
        email: userMapped.email,
        avatar: userMapped.avatar,
        roleId: userMapped.roleId,
        updatedAt: userMapped.updatedAt,
      })
      .where(eq(usersTableSqlite.id, userMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async editPassword(
    id: RootId,
    current: UserPassword,
    next: UserPassword
  ): Promise<void> {
    const [user] = await this._sqlite
      .select({ password: usersTableSqlite.password })
      .from(usersTableSqlite)
      .where(eq(usersTableSqlite.id, id.value))
    if (!user) throw new UnauthorizedUserError('Unauthorized user!')

    if (!(await compare(current.value, user.password)))
      throw new UnauthorizedUserError('Unauthorized user!')

    const { rowsAffected } = await this._sqlite
      .update(usersTableSqlite)
      .set({
        password: await hash(next.value, Number(SALT_ROUNDS)),
        updatedAt: getTemporalNow().toJSON(),
      })
      .where(eq(usersTableSqlite.id, id.value))

    if (!rowsAffected) throw new UnauthorizedUserError('Unauthorized user!')
  }

  async toggle(id: RootId): Promise<void> {
    const [user] = await this._sqlite
      .select({ state: usersTableSqlite.state })
      .from(usersTableSqlite)
      .where(eq(usersTableSqlite.id, id.value))
    if (!user) throw new UserNotFoundError('User not found!')

    const { rowsAffected } = await this._sqlite
      .update(usersTableSqlite)
      .set({
        state: user.state === 'active' ? 'archived' : 'active',
        archivedAt: user.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(eq(usersTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(usersTableSqlite)
      .where(eq(usersTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async auth(handle: UserHandle): Promise<User | null> {
    const [user] = await this._sqlite
      .select()
      .from(usersTableSqlite)
      .where(eq(usersTableSqlite.handle, handle.value))

    return !user ? null : await UserMapper.mapToUser(user)
  }

  async findAll(): Promise<User[]> {
    const users: UserSelect[] = await this._sqlite
      .select()
      .from(usersTableSqlite)

    return !users.length
      ? []
      : await Promise.all(
          users.map(async (user) => await UserMapper.mapToUser(user))
        )
  }

  async findOne(id: RootId): Promise<User | null> {
    const [user] = await this._sqlite
      .select()
      .from(usersTableSqlite)
      .where(eq(usersTableSqlite.id, id.value))

    return !user ? null : await UserMapper.mapToUser(user)
  }

  async findTeamsByUser(userId: RootId): Promise<Team[]> {
    const teams = (
      await this._sqlite
        .select()
        .from(userTeamsRolesTableSqlite)
        .where(eq(userTeamsRolesTableSqlite.userId, userId.value))
        .leftJoin(
          teamsTableSqlite,
          eq(teamsTableSqlite.id, userTeamsRolesTableSqlite.teamId)
        )
    )
      .map((result) => result.teams)
      .filter((result) => result !== null)

    return !teams.length
      ? []
      : await Promise.all(
          teams.map(async (team) => await TeamMapper.mapToTeam(team))
        )
  }

  async ensureHandleAlreadyExists(handle: UserHandle): Promise<boolean> {
    const [user] = await this._sqlite
      .select({ handle: usersTableSqlite.handle })
      .from(usersTableSqlite)
      .where(eq(usersTableSqlite.handle, handle.value))

    return !user ? false : true
  }

  async ensureEmailAlreadyExists(email: UserEmail): Promise<boolean> {
    const [user] = await this._sqlite
      .select({ email: usersTableSqlite.email })
      .from(usersTableSqlite)
      .where(eq(usersTableSqlite.email, email.value))

    return !user ? false : true
  }
}
