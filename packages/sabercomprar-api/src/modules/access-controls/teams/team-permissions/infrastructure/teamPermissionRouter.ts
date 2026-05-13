import { Router } from 'express'
import { TeamPermissionController } from './TeamPermissionController.js'

const teamPermissionController = new TeamPermissionController()

export const teamPermissionRouter: Router = Router()

teamPermissionRouter.post('/', teamPermissionController.add)
teamPermissionRouter.put('/', teamPermissionController.edit)
teamPermissionRouter.patch('/', teamPermissionController.toggle)
teamPermissionRouter.delete('/', teamPermissionController.remove)
teamPermissionRouter.get('/', teamPermissionController.findAll)
teamPermissionRouter.get('/:id', teamPermissionController.findOne)
