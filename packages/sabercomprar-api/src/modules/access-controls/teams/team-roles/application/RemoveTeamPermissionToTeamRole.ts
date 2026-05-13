import { RootId, type IBaseRepository } from '../../../../primitives/index.js'
import {
  TeamPermissionNotFoundError,
  type TeamPermission,
} from '../../team-permissions/index.js'
import {
  TeamRoleNotFoundError,
  type ITeamRoleRepository,
  type TeamRole,
} from '../domain/index.js'

export class RemoveTeamPermissionToTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(
    teamRoleRepository: ITeamRoleRepository,
    teamPermissionRepository: IBaseRepository<TeamPermission>
  ) {
    this._teamRoleRepository = teamRoleRepository
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(teamRoleId: string, teamPermissionId: string): Promise<void> {
    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(teamRoleId)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    const teamPermission: TeamPermission | null =
      await this._teamPermissionRepository.findOne(
        RootId.create(teamPermissionId)
      )
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    return await this._teamRoleRepository.removeTeamPermissionToTeamRole(
      teamRole.id,
      teamPermission.id
    )
  }
}
