import { RootId } from '../../../primitives/index.js'
import { UserNotFoundError, type User } from '../domain/index.js'
import type { IUserRepository } from '../domain/IUserRepository.js'

export class RemoveUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(id: string): Promise<void> {
    const userToRemove: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToRemove) throw new UserNotFoundError('User not found!')

    return await this._userRepository.remove(userToRemove.id)
  }
}
