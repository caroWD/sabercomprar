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
} from '../../../../primitives/index.js'
import {
  Role,
  RoleNotFoundError,
  type IRoleRepository,
} from '../domain/index.js'

export class AddRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const roleName: BaseName = BaseName.create(name)
    const roleSlug: BaseSlug = BaseSlug.create(roleName.value)

    const roleExists: boolean =
      await this._roleRepository.ensureAlreadyExists(roleSlug)
    if (roleExists) throw new RoleNotFoundError('Role not found!')

    return await this._roleRepository.add(
      new Role(
        RootId.create(id),
        roleSlug,
        roleName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
