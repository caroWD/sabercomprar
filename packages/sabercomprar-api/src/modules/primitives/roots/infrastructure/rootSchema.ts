import { uuidv7, enum as enum_ } from 'zod'
import { tempoSchema } from '../../tempos/index.js'

export const rootSchema = tempoSchema.extend({
  id: uuidv7({ error: 'The Id must be in UUIDv7 format.' }),
  state: enum_(['active', 'archived'], {
    error: 'The State must be “active” or “archived”.',
  }),
})
