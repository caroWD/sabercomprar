import { RootId, RootStateEnum } from '../../../../primitives/index.js'
import {
  RoleDto,
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../domain/index.js'

export class FindOneRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<RoleDto> {
    const roleFinded: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleFinded) throw new RoleNotFoundError('Role not found!')

    return new RoleDto(
      roleFinded.id.value,
      roleFinded.name.value,
      roleFinded.description.value,
      roleFinded.state.value === RootStateEnum.ACTIVE ? false : true,
      roleFinded.createdAt.value.toJSON(),
      roleFinded.updatedAt.value.toJSON(),
      roleFinded.archivedAt.value?.toJSON() || null
    )
  }
}
