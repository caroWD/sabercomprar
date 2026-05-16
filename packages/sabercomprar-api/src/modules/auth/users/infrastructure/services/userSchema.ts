import z from '../../../../../helpers/zodHelper.js'
import { rootSchema } from '../../../../primitives/index.js'

const passwordSchema = z
  .string({ error: 'The Password must be a string.' })
  .refine((val) => !/\s+/g.test(val), {
    error: 'The Password cannot contain spaces.',
  })
  .regex(/^(?=.*[a-z]).+$/, {
    error: 'The Password must contain at least one lowercase letter.',
  })
  .regex(/^(?=.*[A-Z]).+$/, {
    error: 'The Password must contain at least one uppercase letter.',
  })
  .regex(/^(?=.*[0-9]).+$/, {
    error: 'The Password must contain at least one number.',
  })
  .regex(/^(?=.*\d)(?=.*[$@$!%*?&/])([A-Za-z\d$@$!%*?&/]|[^ ]).+$/, {
    error:
      'The Password must contain at least one of the following special characters: "$@$!%*?&/".',
  })
  .regex(/^.{8,20}$/, {
    error:
      'The password must be at least 8 characters long and no more than 20 characters long.',
  })

export const userSelectSchema = rootSchema.extend({
  handle: z
    .string({ error: 'The Handle must be a string.' })
    .min(5, { error: 'The Handle must be at least 5 characters long.' })
    .max(30, { error: 'The Handle must be no more than 30 characters long.' }),
  firstName: z
    .string({ error: 'The FirstName must be a string.' })
    .min(3, { error: 'The FirstName must be at least 3 characters long.' })
    .max(61, {
      error:
        'The words that make up the FirstName must be no more than 30 characters long.',
    }),
  lastName: z
    .string({ error: 'The LastName must be a string.' })
    .min(3, { error: 'The LastName must be at least 3 characters long.' })
    .max(61, {
      error:
        'The words that make up the LastName must be no more than 30 characters long.',
    }),
  email: z.email({
    error: 'The Email must be formatted as follows: example@domain.com',
  }),
  password: passwordSchema,
  avatar: z
    .url({ error: 'The Avatar does not have a valid URL format.' })
    .nullable(),
  roleId: z.uuidv7({ error: 'The RoleId must be in UUIDv7 format.' }),
})

export type UserSelect = z.infer<typeof userSelectSchema>

export const userInsertSchema = userSelectSchema.partial({
  state: true,
  createdAt: true,
  updatedAt: true,
  archivedAt: true,
})

export type UserInsert = z.infer<typeof userInsertSchema>

export const addUserRequestSchema = userSelectSchema.omit({
  state: true,
  createdAt: true,
  updatedAt: true,
  archivedAt: true,
})

export type AddUserRequest = z.infer<typeof addUserRequestSchema>

export const editUserRequestSchema = addUserRequestSchema.omit({
  password: true,
})

export type EditUserRequest = z.infer<typeof editUserRequestSchema>

export const editPasswordUserRequestSchema = editUserRequestSchema
  .pick({ id: true })
  .extend({
    current: passwordSchema,
    next: passwordSchema,
  })

export type EditPasswordUserRequest = z.infer<
  typeof editPasswordUserRequestSchema
>

export const userIdRequestSchema = z.object({
  userId: z.uuidv7({ error: 'The UserId must be in UUIDv7 format.' }),
})

export type UserIdRequest = z.infer<typeof userIdRequestSchema>

export const authUserRequestSchema = userSelectSchema.pick({
  handle: true,
  password: true,
})

export type AuthUserRequest = z.infer<typeof authUserRequestSchema>
