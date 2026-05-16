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
  UserNotFoundError,
  type IUserRepository,
  UserHandle,
  UserHandleAlreadyExistsError,
  UserEmail,
  UserEmailAlreadyExistsError,
  UserFirstName,
  UserLastName,
  UserAvatar,
} from '../domain/index.js'

export class EditUser {
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
    avatar: string | null,
    roleId: string
  ): Promise<void> {
    const userToEdit: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToEdit) throw new UserNotFoundError('User not found!')

    const userHandle: UserHandle = UserHandle.create(handle)
    if (userHandle.value !== userToEdit.handle.value) {
      const userHandleExists: boolean =
        await this._userRepository.ensureHandleAlreadyExists(userHandle)
      if (userHandleExists)
        throw new UserHandleAlreadyExistsError('Handle already exists!')
    }

    const userEmail: UserEmail = UserEmail.create(email)
    if (userEmail.value !== userToEdit.email.value) {
      const userEmailExists: boolean =
        await this._userRepository.ensureEmailAlreadyExists(userEmail)
      if (userEmailExists)
        throw new UserEmailAlreadyExistsError('Email already exists!')
    }

    const role: Role | null = await this._roleRepository.findOne(
      RootId.create(roleId)
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return await this._userRepository.edit(
      new User(
        userToEdit.id,
        userHandle,
        UserFirstName.create(firstName),
        UserLastName.create(lastName),
        userEmail,
        userToEdit.password,
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
