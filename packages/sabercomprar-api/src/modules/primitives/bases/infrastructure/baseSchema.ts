import z from '../../../../helpers/zodHelper.js'
import { rootSchema } from '../../roots/index.js'

export const baseSelectSchema = rootSchema.extend({
  slug: z
    .string({ error: 'The Slug must be a string.' })
    .min(5, { error: 'The Slug must be at least 5 characters long.' })
    .max(50, { error: 'The Slug must be no more than 50 characters long.' }),
  name: z
    .string({ error: 'The Name must be a string.' })
    .min(5, { error: 'The Name must be at least 5 characters long.' })
    .max(50, { error: 'The Name must be no more than 50 characters long.' }),
  description: z
    .string({ error: 'The Description must be a string.' })
    .min(15, { error: 'The Description must be at least 15 characters long.' })
    .max(200, {
      error: 'The Description must be no more than 200 characters long.',
    }),
})

export type BaseSelect = z.infer<typeof baseSelectSchema>

export const baseInsertSchema = baseSelectSchema.partial({
  state: true,
  createdAt: true,
  updatedAt: true,
  archivedAt: true,
})

export type BaseInsert = z.infer<typeof baseInsertSchema>

export const baseRequestSchema = baseSelectSchema.pick({
  id: true,
  name: true,
  description: true,
})

export type BaseRequest = z.infer<typeof baseRequestSchema>

export const idBaseRequestSchema = baseRequestSchema.pick({ id: true })

export type IdBaseRequest = z.infer<typeof idBaseRequestSchema>

export type BaseResponse = {
  message: string
  state: boolean
}
