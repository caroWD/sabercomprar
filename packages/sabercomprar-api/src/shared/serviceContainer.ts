import {
  permissionRepository,
  roleRepository,
  teamPermissionRepository,
  teamRepository,
  teamRoleRepository,
  userRepository,
} from './repositories.js'
import {
  PermissionShared,
  RoleShared,
  TeamRoleShared,
  TeamPermissionShared,
  TeamShared,
  UserShared,
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
  auth: {
    user: new UserShared(userRepository, roleRepository),
  },
  workspace: {
    team: new TeamShared(
      teamRepository,
      userRepository,
      teamRoleRepository,
      roleRepository
    ),
  },
}
