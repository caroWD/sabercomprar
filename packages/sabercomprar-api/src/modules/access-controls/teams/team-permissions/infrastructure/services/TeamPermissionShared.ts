import type {
  BaseRequest,
  IBaseRepository,
  IdBaseRequest,
} from '../../../../../primitives/index.js'
import {
  AddTeamPermission,
  EditTeamPermission,
  FindAllTeamPermission,
  FindOneTeamPermission,
  RemoveTeamPermission,
  ToggleTeamPermission,
} from '../../application/index.js'
import type { TeamPermission, TeamPermissionDto } from '../../domain/index.js'

export class TeamPermissionShared {
  private readonly _add: AddTeamPermission
  private readonly _edit: EditTeamPermission
  private readonly _toggle: ToggleTeamPermission
  private readonly _remove: RemoveTeamPermission
  private readonly _findAll: FindAllTeamPermission
  private readonly _findOne: FindOneTeamPermission

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._add = new AddTeamPermission(teamPermissionRepository)
    this._edit = new EditTeamPermission(teamPermissionRepository)
    this._toggle = new ToggleTeamPermission(teamPermissionRepository)
    this._remove = new RemoveTeamPermission(teamPermissionRepository)
    this._findAll = new FindAllTeamPermission(teamPermissionRepository)
    this._findOne = new FindOneTeamPermission(teamPermissionRepository)
  }

  async add({ id, name, description }: BaseRequest): Promise<void> {
    return await this._add.handler(id, name, description)
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

  async findAll(): Promise<TeamPermissionDto[]> {
    return await this._findAll.handler()
  }

  async findOne({ id }: IdBaseRequest): Promise<TeamPermissionDto> {
    return await this._findOne.handler(id)
  }
}
