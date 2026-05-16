import { getTemporalNow } from '../../../../helpers/temporalHelper.js'
import {
  BaseDescription,
  BaseName,
  BaseSlug,
  RootId,
  RootState,
  RootStateEnum,
  TempoUpdatedAt,
} from '../../../primitives/index.js'
import {
  Team,
  TeamAlreadyExistsError,
  TeamNotFoundError,
  type ITeamRepository,
} from '../domain/index.js'

export class EditTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamToEdit: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamToEdit) throw new TeamNotFoundError('Team not found!')

    const teamName: BaseName = BaseName.create(name)
    const teamSlug: BaseSlug = BaseSlug.create(teamName.value)

    if (teamSlug.value !== teamToEdit.slug.value) {
      const teamExists: boolean =
        await this._teamRepository.ensureAlreadyExists(teamSlug)
      if (teamExists) throw new TeamAlreadyExistsError('Team already exists!')
    }

    return await this._teamRepository.edit(
      new Team(
        teamToEdit.id,
        teamSlug,
        teamName,
        BaseDescription.create(description),
        RootState.create(RootStateEnum.ACTIVE),
        teamToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        teamToEdit.archivedAt
      )
    )
  }
}
