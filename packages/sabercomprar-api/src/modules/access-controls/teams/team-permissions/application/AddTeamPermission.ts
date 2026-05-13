import { getTemporalNow } from '../../../../../helpers/index.js'
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
import {
  TeamPermission,
  TeamPermissionAlreadyExistsError,
} from '../domain/index.js'

export class AddTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamPermissionName: BaseName = BaseName.create(name)
    const teamPermissionSlug: BaseSlug = BaseSlug.create(
      teamPermissionName.value
    )

    const teamPermissionExists: boolean =
      await this._teamPermissionRepository.ensureAlreadyExists(
        teamPermissionSlug
      )
    if (teamPermissionExists)
      throw new TeamPermissionAlreadyExistsError(
        'TeamPermission already exists!'
      )

    return await this._teamPermissionRepository.add(
      new TeamPermission(
        RootId.create(id),
        teamPermissionSlug,
        teamPermissionName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
