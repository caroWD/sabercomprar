import {
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../../../access-controls/index.js'
import { RootStateEnum } from '../../../primitives/index.js'
import {
  UnauthorizedUserError,
  UserAuthDto,
  UserHandle,
  type User,
  type IUserRepository,
} from '../domain/index.js'

export class AuthUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(handle: string): Promise<UserAuthDto> {
    const authUser: User | null = await this._userRepository.auth(
      UserHandle.create(handle)
    )
    if (!authUser) throw new UnauthorizedUserError('Unauthorized user!')

    const role: Role | null = await this._roleRepository.findOne(
      authUser.roleId
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return new UserAuthDto(
      authUser.id.value,
      authUser.handle.value,
      authUser.fullName,
      authUser.email.value,
      authUser.password.value,
      role.id.value,
      role.name.value,
      authUser.state.value === RootStateEnum.ACTIVE ? false : true
    )
  }
}
