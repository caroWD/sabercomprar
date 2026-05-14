import { RootId } from '../../../../primitives/index.js'
import {
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../domain/index.js'

export class ToggleRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<void> {
    const roleToToggle: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleToToggle) throw new RoleNotFoundError('Role not found!')

    return await this._roleRepository.toggle(roleToToggle.id)
  }
}
