import type { User } from '../../../auth/index.js'
import type { IBaseRepository, RootId } from '../../../primitives/index.js'
import type { Team } from './models/index.js'

export interface ITeamRepository extends IBaseRepository<Team> {
  addUserToTeam(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void>

  editTeamUser(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void>

  toggleTeamUser(teamId: RootId, userId: RootId): Promise<void>

  removeTeamUser(teamId: RootId, userId: RootId): Promise<void>

  findUsersByTeam(teamId: RootId): Promise<User[]>

  ensureUserAlreadyExistsOnTeam(
    teamId: RootId,
    userId: RootId
  ): Promise<boolean>
}
