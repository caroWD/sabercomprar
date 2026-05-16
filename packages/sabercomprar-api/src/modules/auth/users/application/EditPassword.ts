import { RootId } from '../../../primitives/index.js'
import { UserNotFoundError, UserPassword, type User } from '../domain/index.js'
import type { IUserRepository } from '../domain/IUserRepository.js'

export class EditPasswordUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(id: string, current: string, next: string): Promise<void> {
    const userToEdit: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToEdit) throw new UserNotFoundError('User not found!')

    return await this._userRepository.editPassword(
      userToEdit.id,
      UserPassword.create(current),
      UserPassword.create(next)
    )
  }
}
