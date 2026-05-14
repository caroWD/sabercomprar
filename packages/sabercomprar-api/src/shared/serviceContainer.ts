import { PermissionShared } from '../modules/access-controls/globals/permissions/index.js'
import { TeamRoleShared } from '../modules/access-controls/teams/team-roles/index.js'
import { TeamPermissionShared } from '../modules/index.js'
import {
  permissionRepository,
  teamPermissionRepository,
  teamRoleRepository,
} from './repositories.js'

export const serviceContainer = {
  accessControl: {
    global: {
      permission: new PermissionShared(permissionRepository),
    },
    team: {
      teamPermission: new TeamPermissionShared(teamPermissionRepository),
      teamRole: new TeamRoleShared(
        teamRoleRepository,
        teamPermissionRepository
      ),
    },
  },
}
