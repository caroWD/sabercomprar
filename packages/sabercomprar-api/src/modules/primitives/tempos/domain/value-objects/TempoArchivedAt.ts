import { Temporal } from 'temporal-polyfill'
import { DomainError } from '../../../errors/index.js'
import {
  compareTemporal,
  getTemporalNow,
} from '../../../../../helpers/index.js'

export class TempoArchivedAt {
  value: Temporal.PlainDateTime | null

  private constructor(value: Temporal.PlainDateTime | null) {
    this.value = value
  }

  public static create(value: Temporal.PlainDateTime | null): TempoArchivedAt {
    if (value !== null) {
      if (!(value instanceof Temporal.PlainDateTime))
        throw new DomainError(
          'The archive date must be a Temporal.PlainDateTime object.'
        )

      if (!compareTemporal(value, getTemporalNow()))
        throw new DomainError('The archive date cannot be in the future.')
    }
    return new TempoArchivedAt(value)
  }
}
