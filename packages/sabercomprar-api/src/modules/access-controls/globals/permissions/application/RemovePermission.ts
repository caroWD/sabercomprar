import { RootId, type IBaseRepository } from '../../../../primitives/index.js'
import { PermissionNotFoundError, type Permission } from '../domain/index.js'

export class RemovePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<void> {
    const permissionToRemove: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionToRemove)
      throw new PermissionNotFoundError('Permission not found!')

    return await this._permissionRepository.remove(permissionToRemove.id)
  }
}
