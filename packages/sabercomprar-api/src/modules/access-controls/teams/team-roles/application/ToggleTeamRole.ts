import { RootId } from '../../../../primitives/index.js'
import {
  TeamRoleNotFoundError,
  type ITeamRoleRepository,
  type TeamRole,
} from '../domain/index.js'

export class ToggleTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string): Promise<void> {
    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(id)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    return await this._teamRoleRepository.toggle(teamRole.id)
  }
}
