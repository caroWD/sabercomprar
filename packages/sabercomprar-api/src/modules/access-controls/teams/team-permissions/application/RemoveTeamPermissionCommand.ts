import { RootId, type IBaseRepository } from '../../../../primitives/index.js'
import {
  TeamPermissionNotFoundError,
  type TeamPermission,
} from '../domain/index.js'

export class RemoveTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string): Promise<void> {
    const teamPermission: TeamPermission | null =
      await this._teamPermissionRepository.findOne(RootId.create(id))
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    return await this._teamPermissionRepository.remove(teamPermission.id)
  }
}
