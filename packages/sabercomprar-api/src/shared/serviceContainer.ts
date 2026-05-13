import { TeamRoleShared } from '../modules/access-controls/teams/team-roles/index.js'
import { TeamPermissionShared } from '../modules/index.js'
import { teamPermissionRepository, teamRoleRepository } from './repositories.js'

export const serviceContainer = {
  accessControl: {
    team: {
      teamPermission: new TeamPermissionShared(teamPermissionRepository),
      teamRole: new TeamRoleShared(
        teamRoleRepository,
        teamPermissionRepository
      ),
    },
  },
}
