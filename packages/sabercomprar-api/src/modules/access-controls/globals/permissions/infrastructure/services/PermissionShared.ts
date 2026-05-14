import type {
  BaseRequest,
  IBaseRepository,
  IdBaseRequest,
} from '../../../../../primitives/index.js'
import {
  AddPermission,
  EditPermission,
  FindAllPermission,
  FindOnePermission,
  RemovePermission,
  TogglePermission,
} from '../../application/index.js'
import type { Permission, PermissionDto } from '../../domain/index.js'

export class PermissionShared {
  private readonly _add: AddPermission
  private readonly _edit: EditPermission
  private readonly _toggle: TogglePermission
  private readonly _remove: RemovePermission
  private readonly _findAll: FindAllPermission
  private readonly _findOne: FindOnePermission

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._add = new AddPermission(permissionRepository)
    this._edit = new EditPermission(permissionRepository)
    this._toggle = new TogglePermission(permissionRepository)
    this._remove = new RemovePermission(permissionRepository)
    this._findAll = new FindAllPermission(permissionRepository)
    this._findOne = new FindOnePermission(permissionRepository)
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

  async findAll(): Promise<PermissionDto[]> {
    return await this._findAll.handler()
  }

  async findOne({ id }: IdBaseRequest): Promise<PermissionDto> {
    return await this._findOne.handler(id)
  }
}
