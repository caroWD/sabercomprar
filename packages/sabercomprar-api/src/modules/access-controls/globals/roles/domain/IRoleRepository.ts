import type { IBaseRepository, RootId } from '../../../../primitives/index.js'
import type { Permission } from '../../permissions/index.js'
import type { Role } from './models/index.js'

export interface IRoleRepository extends IBaseRepository<Role> {
  addPermissionToRole(roleId: RootId, permissionId: RootId): Promise<void>

  removePermissionToRole(roleId: RootId, permissionId: RootId): Promise<void>

  findPermissionsForRole(roleId: RootId): Promise<Permission[]>

  ensureRoleHasThisPermission(
    roleId: RootId,
    permissionId: RootId
  ): Promise<boolean>
}
