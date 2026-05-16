import { RootStateEnum } from '../../../primitives/index.js'
import { TeamDto, type ITeamRepository, type Team } from '../domain/index.js'

export class FindAllTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(): Promise<TeamDto[]> {
    const teams: Team[] = await this._teamRepository.findAll()

    return !teams.length
      ? []
      : teams.map(
          (team) =>
            new TeamDto(
              team.id.value,
              team.name.value,
              team.description.value,
              team.state.value === RootStateEnum.ACTIVE ? false : true,
              team.createdAt.value.toJSON(),
              team.updatedAt.value.toJSON()
            )
        )
  }
}
