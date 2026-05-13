import { RootId, RootStateEnum } from '../../../../primitives/index.js'
import {
  TeamPermissionDto,
  type TeamPermission,
} from '../../team-permissions/index.js'
import type { ITeamRoleRepository } from '../domain/index.js'

export class FindTeamPermissionsForTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(teamRoleId: string): Promise<TeamPermissionDto[]> {
    const teamPermissions: TeamPermission[] =
      await this._teamRoleRepository.findTeamPermissionsForTeamRole(
        RootId.create(teamRoleId)
      )

    return !teamPermissions.length
      ? []
      : teamPermissions.map(
          (teamPermission) =>
            new TeamPermissionDto(
              teamPermission.id.value,
              teamPermission.name.value,
              teamPermission.description.value,
              teamPermission.state.value === RootStateEnum.ACTIVE
                ? false
                : true,
              teamPermission.createdAt.value.toJSON(),
              teamPermission.updatedAt.value.toJSON(),
              teamPermission.archivedAt.value?.toJSON() || null
            )
        )
  }
}
