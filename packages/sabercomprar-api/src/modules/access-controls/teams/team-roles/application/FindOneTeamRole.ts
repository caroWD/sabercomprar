import { RootId, RootStateEnum } from '../../../../primitives/index.js'
import {
  TeamRoleDto,
  TeamRoleNotFoundError,
  type ITeamRoleRepository,
  type TeamRole,
} from '../domain/index.js'

export class FindOneTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string): Promise<TeamRoleDto> {
    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(id)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    return new TeamRoleDto(
      teamRole.id.value,
      teamRole.name.value,
      teamRole.description.value,
      teamRole.state.value === RootStateEnum.ACTIVE ? false : true,
      teamRole.createdAt.value.toJSON(),
      teamRole.updatedAt.value.toJSON(),
      teamRole.archivedAt.value?.toJSON() || null
    )
  }
}
