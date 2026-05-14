import { RootId, RootStateEnum } from '../../../../primitives/index.js'
import { PermissionDto, type Permission } from '../../permissions/index.js'
import type { IRoleRepository } from '../domain/index.js'

export class FindPermissionsForRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(roleId: string): Promise<PermissionDto[]> {
    const permissions: Permission[] =
      await this._roleRepository.findPermissionsForRole(RootId.create(roleId))

    return !permissions.length
      ? []
      : permissions.map(
          (permission) =>
            new PermissionDto(
              permission.id.value,
              permission.name.value,
              permission.description.value,
              permission.state.value === RootStateEnum.ACTIVE ? false : true,
              permission.createdAt.value.toJSON(),
              permission.updatedAt.value.toJSON(),
              permission.archivedAt.value?.toJSON() || null
            )
        )
  }
}
