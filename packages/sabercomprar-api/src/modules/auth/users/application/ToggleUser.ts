import { RootId } from '../../../primitives/index.js'
import { UserNotFoundError, type User } from '../domain/index.js'
import type { IUserRepository } from '../domain/IUserRepository.js'

export class ToggleUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(id: string): Promise<void> {
    const userToToggle: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToToggle) throw new UserNotFoundError('User not found!')

    return await this._userRepository.toggle(userToToggle.id)
  }
}
