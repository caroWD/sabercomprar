import z from '../../../../../../helpers/zodHelper.js'

export const teamRoleteamPermissionRequestSchema = z.object({
  teamRoleId: z.uuidv7({ error: 'The TeamRoleId must be in UUIDv7 format.' }),
  teamPermissionId: z.uuidv7({
    error: 'The TeamPermissionId must be in UUIDv7 format.',
  }),
})

export type TeamRoleTeamPermissionRequest = z.infer<
  typeof teamRoleteamPermissionRequestSchema
>

export const teamRoleIdRequestSchema = teamRoleteamPermissionRequestSchema.pick(
  { teamRoleId: true }
)

export type TeamRoleIdRequest = z.infer<typeof teamRoleIdRequestSchema>
