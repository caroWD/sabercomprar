import { UserNotFoundError } from '../../../auth/index.js'
import { RootId, RootStateEnum } from '../../../primitives/index.js'
import { TeamDto, type ITeamRepository, type Team } from '../domain/index.js'

export class FindOneTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string): Promise<TeamDto> {
    const teamFinded: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamFinded) throw new UserNotFoundError('User not found!')

    return new TeamDto(
      teamFinded.id.value,
      teamFinded.name.value,
      teamFinded.description.value,
      teamFinded.state.value === RootStateEnum.ACTIVE ? false : true,
      teamFinded.createdAt.value.toJSON(),
      teamFinded.updatedAt.value.toJSON()
    )
  }
}
