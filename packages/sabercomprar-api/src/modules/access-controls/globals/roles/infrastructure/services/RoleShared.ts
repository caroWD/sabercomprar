import type {
  BaseRequest,
  IBaseRepository,
  IdBaseRequest,
} from '../../../../../primitives/index.js'
import type { Permission, PermissionDto } from '../../../permissions/index.js'
import {
  AddPermissionToRole,
  AddRole,
  EditRole,
  FindAllRole,
  FindOneRole,
  FindPermissionsForRole,
  RemovePermissionToRole,
  RemoveRole,
  ToggleRole,
} from '../../application/index.js'
import type { IRoleRepository, RoleDto } from '../../domain/index.js'
import type { RoleIdRequest, RolePermissionRequest } from './roleSchema.js'

export class RoleShared {
  private readonly _add: AddRole
  private readonly _addPermissionToRole: AddPermissionToRole
  private readonly _edit: EditRole
  private readonly _toggle: ToggleRole
  private readonly _remove: RemoveRole
  private readonly _removePermissionToRole: RemovePermissionToRole
  private readonly _findAll: FindAllRole
  private readonly _findOne: FindOneRole
  private readonly _findPermissionForRole: FindPermissionsForRole

  constructor(
    roleRepository: IRoleRepository,
    permissionRepository: IBaseRepository<Permission>
  ) {
    this._add = new AddRole(roleRepository)
    this._addPermissionToRole = new AddPermissionToRole(
      roleRepository,
      permissionRepository
    )
    this._edit = new EditRole(roleRepository)
    this._toggle = new ToggleRole(roleRepository)
    this._remove = new RemoveRole(roleRepository)
    this._removePermissionToRole = new RemovePermissionToRole(
      roleRepository,
      permissionRepository
    )
    this._findAll = new FindAllRole(roleRepository)
    this._findOne = new FindOneRole(roleRepository)
    this._findPermissionForRole = new FindPermissionsForRole(roleRepository)
  }

  async add({ id, name, description }: BaseRequest): Promise<void> {
    return await this._add.handler(id, name, description)
  }

  async addPermissionToRole({
    roleId,
    permissionId,
  }: RolePermissionRequest): Promise<void> {
    return await this._addPermissionToRole.handler(roleId, permissionId)
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

  async removePermissionToRole({
    roleId,
    permissionId,
  }: RolePermissionRequest): Promise<void> {
    return await this._removePermissionToRole.handler(roleId, permissionId)
  }

  async findAll(): Promise<RoleDto[]> {
    return await this._findAll.handler()
  }

  async findOne({ id }: IdBaseRequest): Promise<RoleDto> {
    return await this._findOne.handler(id)
  }

  async findPermissionForRole({
    roleId,
  }: RoleIdRequest): Promise<PermissionDto[]> {
    return await this._findPermissionForRole.handler(roleId)
  }
}
