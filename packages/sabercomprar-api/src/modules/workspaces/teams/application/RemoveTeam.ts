import { RootId } from '../../../primitives/index.js'
import {
  TeamNotFoundError,
  type ITeamRepository,
  type Team,
} from '../domain/index.js'

export class RemoveTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string): Promise<void> {
    const teamToRemove: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamToRemove) throw new TeamNotFoundError('Team not found!')

    return await this._teamRepository.remove(teamToRemove.id)
  }
}
