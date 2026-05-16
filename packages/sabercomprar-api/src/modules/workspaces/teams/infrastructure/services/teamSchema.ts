import z from '../../../../../helpers/zodHelper.js'

export const userTeamRoleRequestSchema = z.object({
  teamId: z.uuidv7({ error: 'The TeamId must be in UUIDv7 format.' }),
  userId: z.uuidv7({ error: 'The UserId must be in UUIDv7 format.' }),
  teamRoleId: z.uuidv7({ error: 'The TeamRoleId must be in UUIDv7 format.' }),
})

export type UserTeamRoleRequest = z.infer<typeof userTeamRoleRequestSchema>

export const teamUserRequestSchema = userTeamRoleRequestSchema.omit({
  teamRoleId: true,
})

export type TeamUserRequest = z.infer<typeof teamUserRequestSchema>

export const teamIdRequestSchema = teamUserRequestSchema.omit({ userId: true })

export type TeamIdRequest = z.infer<typeof teamIdRequestSchema>
