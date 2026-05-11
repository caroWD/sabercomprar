import type { RootId } from '../../roots/index.js'
import type { BaseSlug } from './value-objects/index.js'

export interface IBaseRepository<T> {
  add(entity: T): Promise<void>

  edit(entity: T): Promise<void>

  toggle(id: RootId): Promise<void>

  remove(id: RootId): Promise<void>

  findAll(): Promise<T[]>

  findOne(id: RootId): Promise<T | null>

  ensureAlreadyExists(slug: BaseSlug): Promise<boolean>
}
