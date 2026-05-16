import type {
  IRoleRepository,
  ITeamRoleRepository,
} from '../../../../access-controls/index.js'
import type { IUserRepository, UserDto } from '../../../../auth/index.js'
import {
  AddTeam,
  AddUserToTeam,
  EditTeam,
  EditTeamUser,
  FindAllTeam,
  FindOneTeam,
  FindUsersByTeam,
  RemoveTeam,
  RemoveTeamUser,
  ToggleTeam,
  ToggleTeamUser,
} from '../../application/index.js'
import type { ITeamRepository, TeamDto } from '../../domain/index.js'
import {
  baseRequestSchema,
  idBaseRequestSchema,
  type BaseRequest,
  type IdBaseRequest,
} from '../../../../primitives/index.js'
import {
  teamIdRequestSchema,
  teamUserRequestSchema,
  userTeamRoleRequestSchema,
  type TeamIdRequest,
  type TeamUserRequest,
  type UserTeamRoleRequest,
} from './teamSchema.js'

export class TeamShared {
  private readonly _add: AddTeam
  private readonly _addUserToTeam: AddUserToTeam
  private readonly _edit: EditTeam
  private readonly _editTeamUser: EditTeamUser
  private readonly _findAll: FindAllTeam
  private readonly _findOne: FindOneTeam
  private readonly _findUsersByTeam: FindUsersByTeam
  private readonly _remove: RemoveTeam
  private readonly _removeTeamUser: RemoveTeamUser
  private readonly _toggle: ToggleTeam
  private readonly _toggleTeamUser: ToggleTeamUser

  constructor(
    teamRepository: ITeamRepository,
    userRepository: IUserRepository,
    teamRoleRepository: ITeamRoleRepository,
    roleRepository: IRoleRepository
  ) {
    this._add = new AddTeam(teamRepository)
    this._addUserToTeam = new AddUserToTeam(
      teamRepository,
      userRepository,
      teamRoleRepository
    )
    this._edit = new EditTeam(teamRepository)
    this._editTeamUser = new EditTeamUser(
      teamRepository,
      userRepository,
      teamRoleRepository
    )
    this._findAll = new FindAllTeam(teamRepository)
    this._findOne = new FindOneTeam(teamRepository)
    this._findUsersByTeam = new FindUsersByTeam(teamRepository, roleRepository)
    this._remove = new RemoveTeam(teamRepository)
    this._removeTeamUser = new RemoveTeamUser(teamRepository, userRepository)
    this._toggle = new ToggleTeam(teamRepository)
    this._toggleTeamUser = new ToggleTeamUser(teamRepository, userRepository)
  }

  async add(req: BaseRequest): Promise<void> {
    const { id, name, description } = await baseRequestSchema.parseAsync(req)

    return await this._add.handler(id, name, description)
  }

  async addUserToTeam(req: UserTeamRoleRequest): Promise<void> {
    const { teamId, userId, teamRoleId } =
      await userTeamRoleRequestSchema.parseAsync(req)

    return await this._addUserToTeam.handler(teamId, userId, teamRoleId)
  }

  async edit(req: BaseRequest): Promise<void> {
    const { id, name, description } = await baseRequestSchema.parseAsync(req)

    return this._edit.handler(id, name, description)
  }

  async editTeamUser(req: UserTeamRoleRequest): Promise<void> {
    const { teamId, userId, teamRoleId } =
      await userTeamRoleRequestSchema.parseAsync(req)

    return await this._editTeamUser.handler(teamId, userId, teamRoleId)
  }

  async findAll(): Promise<TeamDto[]> {
    return await this._findAll.handler()
  }

  async findOne(req: IdBaseRequest): Promise<TeamDto> {
    const { id } = await idBaseRequestSchema.parseAsync(req)

    return await this._findOne.handler(id)
  }

  async findUsersByTeam(req: TeamIdRequest): Promise<UserDto[]> {
    const { teamId } = await teamIdRequestSchema.parseAsync(req)

    return await this._findUsersByTeam.handler(teamId)
  }

  async remove(req: IdBaseRequest): Promise<void> {
    const { id } = await idBaseRequestSchema.parseAsync(req)

    return await this._remove.handler(id)
  }

  async removeTeamUser(req: TeamUserRequest): Promise<void> {
    const { teamId, userId } = await teamUserRequestSchema.parseAsync(req)

    return await this._removeTeamUser.handler(teamId, userId)
  }

  async toggle(req: IdBaseRequest): Promise<void> {
    const { id } = await idBaseRequestSchema.parseAsync(req)

    return await this._toggle.handler(id)
  }

  async toggleTeamUser(req: TeamUserRequest): Promise<void> {
    const { teamId, userId } = await teamUserRequestSchema.parseAsync(req)

    return await this._toggleTeamUser.handler(teamId, userId)
  }
}
