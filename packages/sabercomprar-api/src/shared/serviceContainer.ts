import {
  permissionRepository,
  roleRepository,
  teamPermissionRepository,
  teamRoleRepository,
} from './repositories.js'
import {
  PermissionShared,
  RoleShared,
  TeamRoleShared,
  TeamPermissionShared,
} from '../modules/index.js'

export const serviceContainer = {
  accessControl: {
    global: {
      permission: new PermissionShared(permissionRepository),
      role: new RoleShared(roleRepository, permissionRepository),
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
