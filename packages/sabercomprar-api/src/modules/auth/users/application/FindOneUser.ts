import {
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../../../access-controls/index.js'
import { RootId, RootStateEnum } from '../../../primitives/index.js'
import {
  UserDto,
  UserNotFoundError,
  type IUserRepository,
  type User,
} from '../domain/index.js'

export class FindOneUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<UserDto> {
    const userFinded: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userFinded) throw new UserNotFoundError('User not found!')

    const role: Role | null = await this._roleRepository.findOne(
      userFinded.roleId
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return new UserDto(
      userFinded.id.value,
      userFinded.handle.value,
      userFinded.firstName.value,
      userFinded.lastName.value,
      userFinded.fullName,
      userFinded.email.value,
      userFinded.avatar.value,
      role.id.value,
      role.name.value,
      userFinded.state.value === RootStateEnum.ACTIVE ? false : true,
      userFinded.createdAt.value.toJSON(),
      userFinded.updatedAt.value.toJSON()
    )
  }
}
