import { RootId } from '../../../primitives/index.js'
import {
  TeamNotFoundError,
  type ITeamRepository,
  type Team,
} from '../domain/index.js'

export class ToggleTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string): Promise<void> {
    const teamToToggle: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamToToggle) throw new TeamNotFoundError('Team not found!')

    return await this._teamRepository.toggle(teamToToggle.id)
  }
}
