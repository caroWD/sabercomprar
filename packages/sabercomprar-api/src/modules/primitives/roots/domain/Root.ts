import {
  Tempo,
  TempoCreatedAt,
  TempoArchivedAt,
  TempoUpdatedAt,
} from '../../tempos/index.js'
import type { RootId, RootState } from './value-objects/index.js'

export abstract class Root extends Tempo {
  private _id: RootId
  private _state: RootState

  constructor(
    id: RootId,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(createdAt, updatedAt, archivedAt)
    this._id = id
    this._state = state
  }

  get id(): RootId {
    return this._id
  }

  get state(): RootState {
    return this._state
  }
}
