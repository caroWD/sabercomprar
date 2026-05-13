import { TeamPermissionShared } from '../modules/index.js'
import { teamPermissionRepository } from './repositories.js'

export const serviceContainer = {
  accessControl: {
    team: {
      teamPermission: new TeamPermissionShared(teamPermissionRepository),
    },
  },
}
