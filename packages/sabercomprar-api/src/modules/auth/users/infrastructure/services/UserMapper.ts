import { hash } from 'bcryptjs'
import { getTemporalFrom } from '../../../../../helpers/temporalHelper.js'
import {
  RootId,
  RootState,
  RootStateEnum,
  TempoArchivedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
} from '../../../../primitives/index.js'
import {
  User,
  UserAvatar,
  UserEmail,
  UserFirstName,
  UserHandle,
  UserLastName,
  UserPassword,
} from '../../domain/index.js'
import type { UserInsert, UserSelect } from './userSchema.js'
import { SALT_ROUNDS } from '../../../../../config/config.js'

export class UserMapper {
  public static async mapToUser(user: UserSelect): Promise<User> {
    return new User(
      RootId.create(user.id),
      UserHandle.create(user.handle),
      UserFirstName.create(user.firstName),
      UserLastName.create(user.lastName),
      UserEmail.create(user.email),
      UserPassword.create(user.password),
      UserAvatar.create(user.avatar),
      RootId.create(user.roleId),
      RootState.create(
        user.state === 'active' ? RootStateEnum.ACTIVE : RootStateEnum.ARCHIVED
      ),
      TempoCreatedAt.create(getTemporalFrom(user.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(user.updatedAt)),
      TempoArchivedAt.create(
        !user.archivedAt ? null : getTemporalFrom(user.archivedAt)
      )
    )
  }

  public static async mapToUserInsert(user: User): Promise<UserInsert> {
    return {
      id: user.id.value,
      handle: user.handle.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value,
      password: await hash(user.password.value, Number(SALT_ROUNDS)),
      avatar: user.avatar.value,
      roleId: user.roleId.value,
      state: user.state.value === RootStateEnum.ACTIVE ? 'active' : 'archived',
      createdAt: user.createdAt.value.toJSON(),
      updatedAt: user.updatedAt.value.toJSON(),
      archivedAt: user.archivedAt.value?.toJSON() || null,
    }
  }
}
