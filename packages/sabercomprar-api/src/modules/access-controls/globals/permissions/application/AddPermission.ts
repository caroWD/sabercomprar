import { getTemporalNow } from '../../../../../helpers/temporalHelper.js'
import {
  BaseDescription,
  BaseName,
  BaseSlug,
  RootId,
  RootState,
  RootStateEnum,
  TempoArchivedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import { Permission, PermissionAlreadyExistsError } from '../domain/index.js'

export class AddPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const permissionName: BaseName = BaseName.create(name)
    const permissionSlug: BaseSlug = BaseSlug.create(permissionName.value)

    const permissionExists: boolean =
      await this._permissionRepository.ensureAlreadyExists(permissionSlug)
    if (permissionExists)
      throw new PermissionAlreadyExistsError('Permission already exists!')

    return await this._permissionRepository.add(
      new Permission(
        RootId.create(id),
        permissionSlug,
        permissionName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
