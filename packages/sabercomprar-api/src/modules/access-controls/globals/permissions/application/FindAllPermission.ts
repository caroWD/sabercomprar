import {
  RootStateEnum,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import { PermissionDto, type Permission } from '../domain/index.js'

export class FindAllPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(): Promise<PermissionDto[]> {
    const permissions: Permission[] = await this._permissionRepository.findAll()

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
