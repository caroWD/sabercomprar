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
  RoleAlreadyExistsError,
  RoleNotFoundError,
  type IRoleRepository,
} from '../domain/index.js'

export class EditRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const roleToEdit: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleToEdit) throw new RoleNotFoundError('Role not found!')

    const roleName: BaseName = BaseName.create(name)
    const roleSlug: BaseSlug = BaseSlug.create(roleName.value)

    if (roleSlug.value !== roleToEdit.slug.value) {
      const roleExists: boolean =
        await this._roleRepository.ensureAlreadyExists(roleSlug)
      if (roleExists) throw new RoleAlreadyExistsError('Role already exists!')
    }

    return await this._roleRepository.edit(
      new Role(
        roleToEdit.id,
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
