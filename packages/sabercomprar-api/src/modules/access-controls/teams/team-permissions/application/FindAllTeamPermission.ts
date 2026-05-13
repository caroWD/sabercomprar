import {
  RootStateEnum,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import { TeamPermissionDto, type TeamPermission } from '../domain/index.js'

export class FindAllTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(): Promise<TeamPermissionDto[]> {
    const teamPermissions: TeamPermission[] =
      await this._teamPermissionRepository.findAll()

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
