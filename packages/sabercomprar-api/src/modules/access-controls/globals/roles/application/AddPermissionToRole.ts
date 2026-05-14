import { RootId, type IBaseRepository } from '../../../../primitives/index.js'
import {
  PermissionNotFoundError,
  type Permission,
} from '../../permissions/index.js'
import {
  RoleAlreadyHasThatPermissionError,
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../domain/index.js'

export class AddPermissionToRole {
  private readonly _roleRepository: IRoleRepository
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(
    roleRepository: IRoleRepository,
    permissionRepository: IBaseRepository<Permission>
  ) {
    this._roleRepository = roleRepository
    this._permissionRepository = permissionRepository
  }

  async handler(roleId: string, permissionId: string): Promise<void> {
    const role: Role | null = await this._roleRepository.findOne(
      RootId.create(roleId)
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    const permission: Permission | null =
      await this._permissionRepository.findOne(RootId.create(permissionId))
    if (!permission) throw new PermissionNotFoundError('Permission not found!')

    const rolePermissionExists: boolean =
      await this._roleRepository.ensureRoleHasThisPermission(
        role.id,
        permission.id
      )
    if (rolePermissionExists)
      throw new RoleAlreadyHasThatPermissionError('Role has that permission!')

    return await this._roleRepository.addPermissionToRole(
      role.id,
      permission.id
    )
  }
}
