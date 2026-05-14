import { Router } from 'express'
import { PermissionController } from './PermissionController.js'

const permissionController = new PermissionController()

export const permissionRouter: Router = Router()

permissionRouter.post('/', permissionController.add)
permissionRouter.put('/', permissionController.edit)
permissionRouter.patch('/', permissionController.toggle)
permissionRouter.delete('/', permissionController.remove)
permissionRouter.get('/', permissionController.findAll)
permissionRouter.get('/:id', permissionController.findOne)
