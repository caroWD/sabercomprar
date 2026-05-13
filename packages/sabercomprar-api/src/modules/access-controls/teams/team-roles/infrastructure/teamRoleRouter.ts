import { Router } from 'express'
import { TeamRoleController } from './TeamRoleController.js'

const teamRoleController = new TeamRoleController()

export const teamRoleRouter: Router = Router()

teamRoleRouter.post('/', teamRoleController.add)
teamRoleRouter.post(
  '/team-permission',
  teamRoleController.addTeamPermissionToTeamRole
)
teamRoleRouter.put('/', teamRoleController.edit)
teamRoleRouter.patch('/', teamRoleController.toggle)
teamRoleRouter.delete('/', teamRoleController.remove)
teamRoleRouter.delete(
  '/team-permission',
  teamRoleController.removeTeamPermissionToTeamRole
)
teamRoleRouter.get('/', teamRoleController.findAll)
teamRoleRouter.get('/:id', teamRoleController.findOne)
teamRoleRouter.get(
  '/team-permission/:teamRoleId',
  teamRoleController.findTeamPermissionsForTeamRole
)
