import { getTemporalNow } from '../../../../../helpers/temporalHelper.js'
import {
  BaseDescription,
  BaseName,
  BaseSlug,
  RootId,
  TempoUpdatedAt,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import {
  Permission,
  PermissionAlreadyExistsError,
  PermissionNotFoundError,
} from '../domain/index.js'

export class EditPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const permissionToEdit: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionToEdit)
      throw new PermissionNotFoundError('Permission not found!')

    const permissionName: BaseName = BaseName.create(name)
    const permissionSlug: BaseSlug = BaseSlug.create(permissionName.value)

    if (permissionSlug.value !== permissionToEdit.slug.value) {
      const permissionExists: boolean =
        await this._permissionRepository.ensureAlreadyExists(permissionSlug)
      if (permissionExists)
        throw new PermissionAlreadyExistsError('Permission already exists!')
    }

    return await this._permissionRepository.edit(
      new Permission(
        permissionToEdit.id,
        permissionSlug,
        permissionName,
        BaseDescription.create(description),
        permissionToEdit.state,
        permissionToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        permissionToEdit.archivedAt
      )
    )
  }
}
