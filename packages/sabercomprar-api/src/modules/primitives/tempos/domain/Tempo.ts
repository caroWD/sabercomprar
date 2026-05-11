import type {
  TempoCreatedAt,
  TempoArchivedAt,
  TempoUpdatedAt,
} from './value-objects/index.js'

export abstract class Tempo {
  private _createdAt: TempoCreatedAt
  private _updatedAt: TempoUpdatedAt
  private _archivedAt: TempoArchivedAt

  constructor(
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._archivedAt = archivedAt
  }

  get createdAt(): TempoCreatedAt {
    return this._createdAt
  }

  get updatedAt(): TempoUpdatedAt {
    return this._updatedAt
  }

  get archivedAt(): TempoArchivedAt {
    return this._archivedAt
  }
}
