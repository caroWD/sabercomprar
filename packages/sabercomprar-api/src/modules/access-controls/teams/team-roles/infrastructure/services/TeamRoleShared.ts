import type {
  BaseRequest,
  IBaseRepository,
  IdBaseRequest,
} from '../../../../../primitives/index.js'
import type {
  TeamPermission,
  TeamPermissionDto,
} from '../../../team-permissions/index.js'
import {
  AddTeamPermissionToTeamRole,
  AddTeamRole,
  EditTeamRole,
  FindAllTeamRole,
  FindOneTeamRole,
  FindTeamPermissionsForTeamRole,
  RemoveTeamPermissionToTeamRole,
  RemoveTeamRole,
  ToggleTeamRole,
} from '../../application/index.js'
import type { ITeamRoleRepository, TeamRoleDto } from '../../domain/index.js'
import type {
  TeamRoleIdRequest,
  TeamRoleTeamPermissionRequest,
} from './teamRoleSchema.js'

export class TeamRoleShared {
  private readonly _add: AddTeamRole
  private readonly _addTeamPermissionToTeamRole: AddTeamPermissionToTeamRole
  private readonly _edit: EditTeamRole
  private readonly _toggle: ToggleTeamRole
  private readonly _remove: RemoveTeamRole
  private readonly _removeTeamPermissionToTeamRole: RemoveTeamPermissionToTeamRole
  private readonly _findAll: FindAllTeamRole
  private readonly _findOne: FindOneTeamRole
  private readonly _findTeamPermissionsForTeamRole: FindTeamPermissionsForTeamRole

  constructor(
    teamRoleRepository: ITeamRoleRepository,
    teamPermissionRepository: IBaseRepository<TeamPermission>
  ) {
    this._add = new AddTeamRole(teamRoleRepository)
    this._addTeamPermissionToTeamRole = new AddTeamPermissionToTeamRole(
      teamRoleRepository,
      teamPermissionRepository
    )
    this._edit = new EditTeamRole(teamRoleRepository)
    this._toggle = new ToggleTeamRole(teamRoleRepository)
    this._remove = new RemoveTeamRole(teamRoleRepository)
    this._removeTeamPermissionToTeamRole = new RemoveTeamPermissionToTeamRole(
      teamRoleRepository,
      teamPermissionRepository
    )
    this._findAll = new FindAllTeamRole(teamRoleRepository)
    this._findOne = new FindOneTeamRole(teamRoleRepository)
    this._findTeamPermissionsForTeamRole = new FindTeamPermissionsForTeamRole(
      teamRoleRepository
    )
  }

  async add({ id, name, description }: BaseRequest): Promise<void> {
    return await this._add.handler(id, name, description)
  }

  async addTeamPermissionToTeamRole({
    teamRoleId,
    teamPermissionId,
  }: TeamRoleTeamPermissionRequest): Promise<void> {
    return await this._addTeamPermissionToTeamRole.handler(
      teamRoleId,
      teamPermissionId
    )
  }

  async edit({ id, name, description }: BaseRequest): Promise<void> {
    return await this._edit.handler(id, name, description)
  }

  async toggle({ id }: IdBaseRequest): Promise<void> {
    return await this._toggle.handler(id)
  }

  async remove({ id }: IdBaseRequest): Promise<void> {
    return await this._remove.handler(id)
  }

  async removeTeamPermissionToTeamRole({
    teamRoleId,
    teamPermissionId,
  }: TeamRoleTeamPermissionRequest): Promise<void> {
    return await this._removeTeamPermissionToTeamRole.handler(
      teamRoleId,
      teamPermissionId
    )
  }

  async findAll(): Promise<TeamRoleDto[]> {
    return await this._findAll.handler()
  }

  async findOne({ id }: IdBaseRequest): Promise<TeamRoleDto> {
    return await this._findOne.handler(id)
  }

  async findTeamPermissionsForTeamRole({
    teamRoleId,
  }: TeamRoleIdRequest): Promise<TeamPermissionDto[]> {
    return await this._findTeamPermissionsForTeamRole.handler(teamRoleId)
  }
}
