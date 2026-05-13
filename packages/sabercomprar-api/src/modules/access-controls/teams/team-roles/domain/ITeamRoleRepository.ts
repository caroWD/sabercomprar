import type { IBaseRepository, RootId } from '../../../../primitives/index.js'
import type { TeamPermission } from '../../team-permissions/index.js'
import type { TeamRole } from './models/TeamRole.js'

export interface ITeamRoleRepository extends IBaseRepository<TeamRole> {
  addTeamPermissionToTeamRole(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<void>

  removeTeamPermissionToTeamRole(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<void>

  findTeamPermissionsForTeamRole(teamRoleId: RootId): Promise<TeamPermission[]>

  ensureTeamRoleHasThisTeamPermission(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<boolean>
}
