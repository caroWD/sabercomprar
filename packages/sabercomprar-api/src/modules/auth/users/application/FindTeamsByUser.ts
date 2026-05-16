import { RootId, RootStateEnum } from '../../../primitives/index.js'
import { TeamDto, type Team } from '../../../workspaces/index.js'
import {
  UserNotFoundError,
  type IUserRepository,
  type User,
} from '../domain/index.js'

export class FindTeamsByUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(userId: string): Promise<TeamDto[]> {
    const user: User | null = await this._userRepository.findOne(
      RootId.create(userId)
    )
    if (!user) throw new UserNotFoundError('User not found!')

    const teams: Team[] = await this._userRepository.findTeamsByUser(user.id)

    return !teams.length
      ? []
      : teams.map(
          (team) =>
            new TeamDto(
              team.id.value,
              team.name.value,
              team.description.value,
              team.state.value === RootStateEnum.ACTIVE,
              team.createdAt.value.toJSON(),
              team.updatedAt.value.toJSON()
            )
        )
  }
}
