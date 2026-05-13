import { getTemporalNow } from '../../../../../helpers/index.js'
import {
  BaseDescription,
  BaseName,
  BaseSlug,
  RootId,
  RootState,
  RootStateEnum,
  TempoUpdatedAt,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import {
  TeamPermission,
  TeamPermissionAlreadyExistsError,
  TeamPermissionNotFoundError,
} from '../domain/index.js'

export class EditTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamPermissionToEdit: TeamPermission | null =
      await this._teamPermissionRepository.findOne(RootId.create(id))
    if (!teamPermissionToEdit)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    const teamPermissionName: BaseName = BaseName.create(name)
    const teamPermissoinSlug: BaseSlug = BaseSlug.create(
      teamPermissionName.value
    )

    if (teamPermissoinSlug.value !== teamPermissionToEdit.slug.value) {
      const teamPermissionExists: boolean =
        await this._teamPermissionRepository.ensureAlreadyExists(
          teamPermissoinSlug
        )
      if (teamPermissionExists)
        throw new TeamPermissionAlreadyExistsError(
          'TeamPermission already exists!'
        )
    }

    return await this._teamPermissionRepository.edit(
      new TeamPermission(
        teamPermissionToEdit.id,
        teamPermissoinSlug,
        teamPermissionName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        teamPermissionToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        teamPermissionToEdit.archivedAt
      )
    )
  }
}
