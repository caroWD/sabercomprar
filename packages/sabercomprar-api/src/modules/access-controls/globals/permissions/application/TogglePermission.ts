import { RootId, type IBaseRepository } from '../../../../primitives/index.js'
import { PermissionNotFoundError, type Permission } from '../domain/index.js'

export class TogglePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<void> {
    const permissionToToggle: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionToToggle)
      throw new PermissionNotFoundError('Permission not found!')

    return await this._permissionRepository.toggle(permissionToToggle.id)
  }
}
