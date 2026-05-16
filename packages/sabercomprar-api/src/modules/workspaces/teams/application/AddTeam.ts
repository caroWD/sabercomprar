import { getTemporalNow } from '../../../../helpers/temporalHelper.js'
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
} from '../../../primitives/index.js'
import {
  Team,
  TeamAlreadyExistsError,
  type ITeamRepository,
} from '../domain/index.js'

export class AddTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamName: BaseName = BaseName.create(name)
    const teamSlug: BaseSlug = BaseSlug.create(teamName.value)

    const teamExists: boolean =
      await this._teamRepository.ensureAlreadyExists(teamSlug)
    if (!teamExists) throw new TeamAlreadyExistsError('Team already exists!')

    return await this._teamRepository.add(
      new Team(
        RootId.create(id),
        teamSlug,
        teamName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
