import {
  RootId,
  RootStateEnum,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import {
  PermissionDto,
  PermissionNotFoundError,
  type Permission,
} from '../domain/index.js'

export class FindOnePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<PermissionDto> {
    const permissionFinded: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionFinded)
      throw new PermissionNotFoundError('Permission not found!')

    return new PermissionDto(
      permissionFinded.id.value,
      permissionFinded.name.value,
      permissionFinded.description.value,
      permissionFinded.state.value === RootStateEnum.ACTIVE ? false : true,
      permissionFinded.createdAt.value.toJSON(),
      permissionFinded.updatedAt.value.toJSON(),
      permissionFinded.archivedAt.value?.toJSON() || null
    )
  }
}
