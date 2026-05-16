import { getTemporalNow } from '../../../../helpers/temporalHelper.js'
import {
  RoleNotFoundError,
  type IRoleRepository,
  type Role,
} from '../../../access-controls/index.js'
import {
  RootId,
  RootState,
  RootStateEnum,
  TempoArchivedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
} from '../../../primitives/index.js'
import {
  User,
  UserAvatar,
  UserEmail,
  UserEmailAlreadyExistsError,
  UserFirstName,
  UserHandle,
  UserHandleAlreadyExistsError,
  UserLastName,
  UserPassword,
  type IUserRepository,
} from '../domain/index.js'

export class AddUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(
    id: string,
    handle: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string | null,
    roleId: string
  ): Promise<void> {
    const userHandle: UserHandle = UserHandle.create(handle)
    const userHandleExists: boolean =
      await this._userRepository.ensureHandleAlreadyExists(userHandle)
    if (userHandleExists)
      throw new UserHandleAlreadyExistsError('Handle already exists!')

    const userEmail: UserEmail = UserEmail.create(email)
    const userEmailExists: boolean =
      await this._userRepository.ensureEmailAlreadyExists(userEmail)
    if (userEmailExists)
      throw new UserEmailAlreadyExistsError('Email already exists!')

    const role: Role | null = await this._roleRepository.findOne(
      RootId.create(roleId)
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return await this._userRepository.add(
      new User(
        RootId.create(id),
        userHandle,
        UserFirstName.create(firstName),
        UserLastName.create(lastName),
        userEmail,
        UserPassword.create(password),
        UserAvatar.create(avatar),
        role.id,
        RootState.create(RootStateEnum.ACTIVE),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
