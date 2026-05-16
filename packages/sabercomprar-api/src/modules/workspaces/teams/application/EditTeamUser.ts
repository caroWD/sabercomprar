import {
  TeamRoleNotFoundError,
  type ITeamRoleRepository,
  type TeamRole,
} from '../../../access-controls/index.js'
import {
  UserNotFoundError,
  type IUserRepository,
  type User,
} from '../../../auth/index.js'
import { RootId } from '../../../primitives/index.js'
import {
  TeamAlreadyExistsError,
  UserDoesNotExistsOnTeamError,
  type ITeamRepository,
  type Team,
} from '../domain/index.js'

export class EditTeamUser {
  private readonly _teamRepository: ITeamRepository
  private readonly _userRepository: IUserRepository
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(
    teamRepository: ITeamRepository,
    userRepository: IUserRepository,
    teamRoleRepository: ITeamRoleRepository
  ) {
    this._teamRepository = teamRepository
    this._userRepository = userRepository
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(
    teamId: string,
    userId: string,
    teamRoleId: string
  ): Promise<void> {
    const team: Team | null = await this._teamRepository.findOne(
      RootId.create(teamId)
    )
    if (!team) throw new TeamAlreadyExistsError('Team not found!')

    const user: User | null = await this._userRepository.findOne(
      RootId.create(userId)
    )
    if (!user) throw new UserNotFoundError('User not found!')

    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(teamRoleId)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    const userExistsOnTeam =
      await this._teamRepository.ensureUserAlreadyExistsOnTeam(team.id, user.id)
    if (!userExistsOnTeam)
      throw new UserDoesNotExistsOnTeamError('User does not exists on Team!')

    return await this._teamRepository.editTeamUser(
      team.id,
      user.id,
      teamRole.id
    )
  }
}
