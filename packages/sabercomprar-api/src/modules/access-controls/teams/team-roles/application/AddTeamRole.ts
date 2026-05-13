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
  TeamRole,
  TeamRoleAlreadyExistsError,
  type ITeamRoleRepository,
} from '../domain/index.js'

export class AddTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamRoleName: BaseName = BaseName.create(name)
    const teamRoleSlug: BaseSlug = BaseSlug.create(teamRoleName.value)

    const teamRoleExists: boolean =
      await this._teamRoleRepository.ensureAlreadyExists(teamRoleSlug)
    if (teamRoleExists)
      throw new TeamRoleAlreadyExistsError('TeamRole already exists!')

    return await this._teamRoleRepository.add(
      new TeamRole(
        RootId.create(id),
        teamRoleSlug,
        teamRoleName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
