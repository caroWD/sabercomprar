import { RootId } from '../../../../primitives/index.js'
import { RoleNotFoundError, type Role } from '../domain/index.js'
import type { IRoleRepository } from '../domain/IRoleRepository.js'

export class RemoveRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<void> {
    const roleToRemove: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleToRemove) throw new RoleNotFoundError('Role not found!')

    return await this._roleRepository.remove(roleToRemove.id)
  }
}
