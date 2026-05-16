import {
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../../../access-controls/index.js'
import { UserDto, type User } from '../../../auth/index.js'
import { RootId, RootStateEnum } from '../../../primitives/index.js'
import {
  TeamNotFoundError,
  type ITeamRepository,
  type Team,
} from '../domain/index.js'

export class FindUsersByTeam {
  private readonly _teamRepository: ITeamRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    teamRepository: ITeamRepository,
    roleRepository: IRoleRepository
  ) {
    this._teamRepository = teamRepository
    this._roleRepository = roleRepository
  }

  async handler(teamId: string): Promise<UserDto[]> {
    const team: Team | null = await this._teamRepository.findOne(
      RootId.create(teamId)
    )
    if (!team) throw new TeamNotFoundError('Team not found!')

    const users: User[] = await this._teamRepository.findUsersByTeam(team.id)

    return !users.length
      ? []
      : await Promise.all(
          users.map(async (user) => {
            const role: Role | null = await this._roleRepository.findOne(
              user.roleId
            )
            if (!role) throw new RoleNotFoundError('Role not found!')

            return new UserDto(
              user.id.value,
              user.handle.value,
              user.firstName.value,
              user.lastName.value,
              user.fullName,
              user.email.value,
              user.avatar.value || null,
              role.id.value,
              role.name.value,
              user.state.value === RootStateEnum.ACTIVE ? false : true,
              user.createdAt.value.toJSON(),
              user.updatedAt.value.toJSON()
            )
          })
        )
  }
}
