import { object, iso } from 'zod'
import {
  compareTemporal,
  getTemporalFrom,
  getTemporalNow,
} from '../../../../helpers/index.js'

export const tempoSchema = object({
  createdAt: iso
    .datetime({
      error:
        'The creation date must be in Temporal.PlainDateTime.String format.',
    })
    .refine(
      (dateTime) =>
        compareTemporal(getTemporalFrom(dateTime), getTemporalNow()),
      { error: 'The creation date cannot be in the future.' }
    ),
  updatedAt: iso
    .datetime({
      error: 'The update date must be in Temporal.PlainDateTime.String format.',
    })
    .refine(
      (dateTime) =>
        compareTemporal(getTemporalFrom(dateTime), getTemporalNow()),
      { error: 'The update date cannot be in the future.' }
    ),
  archivedAt: iso
    .datetime({
      error:
        'The delation date must be in Temporal.PlainDateTime.String format.',
    })
    .refine(
      (dateTime) =>
        compareTemporal(getTemporalFrom(dateTime), getTemporalNow()),
      { error: 'The archive date cannot be in the future.' }
    )
    .nullable(),
})
