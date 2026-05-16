import type { RootId } from '../../../primitives/index.js'
import type { Team } from '../../../workspaces/index.js'
import type { User } from './models/index.js'
import type {
  UserEmail,
  UserHandle,
  UserPassword,
} from './value-objects/index.js'

export interface IUserRepository {
  add(user: User): Promise<void>

  edit(user: User): Promise<void>

  editPassword(
    id: RootId,
    current: UserPassword,
    next: UserPassword
  ): Promise<void>

  toggle(id: RootId): Promise<void>

  remove(id: RootId): Promise<void>

  auth(handle: UserHandle): Promise<User | null>

  findAll(): Promise<User[]>

  findOne(id: RootId): Promise<User | null>

  findTeamsByUser(userId: RootId): Promise<Team[]>

  ensureHandleAlreadyExists(handle: UserHandle): Promise<boolean>

  ensureEmailAlreadyExists(email: UserEmail): Promise<boolean>
}
