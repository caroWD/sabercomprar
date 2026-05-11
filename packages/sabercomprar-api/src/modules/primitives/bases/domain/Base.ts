import { Root, RootId, RootState } from '../../roots/index.js'
import type {
  TempoCreatedAt,
  TempoArchivedAt,
  TempoUpdatedAt,
} from '../../tempos/index.js'
import type {
  BaseDescription,
  BaseName,
  BaseSlug,
} from './value-objects/index.js'

export abstract class Base extends Root {
  private _slug: BaseSlug
  private _name: BaseName
  private _description: BaseDescription

  constructor(
    id: RootId,
    slug: BaseSlug,
    name: BaseName,
    description: BaseDescription,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(id, state, createdAt, updatedAt, archivedAt)
    this._slug = slug
    this._name = name
    this._description = description
  }

  get slug(): BaseSlug {
    return this._slug
  }

  get name(): BaseName {
    return this._name
  }

  get description(): BaseDescription {
    return this._description
  }
}
