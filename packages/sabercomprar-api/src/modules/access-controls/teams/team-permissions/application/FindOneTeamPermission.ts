import {
  RootId,
  RootStateEnum,
  type IBaseRepository,
} from '../../../../primitives/index.js'
import {
  TeamPermissionDto,
  TeamPermissionNotFoundError,
  type TeamPermission,
} from '../domain/index.js'

export class FindOneTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string): Promise<TeamPermissionDto> {
    const teamPermission: TeamPermission | null =
      await this._teamPermissionRepository.findOne(RootId.create(id))
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    return new TeamPermissionDto(
      teamPermission.id.value,
      teamPermission.name.value,
      teamPermission.description.value,
      teamPermission.state.value === RootStateEnum.ACTIVE ? false : true,
      teamPermission.createdAt.value.toJSON(),
      teamPermission.updatedAt.value.toJSON(),
      teamPermission.archivedAt.value?.toJSON() || null
    )
  }
}
