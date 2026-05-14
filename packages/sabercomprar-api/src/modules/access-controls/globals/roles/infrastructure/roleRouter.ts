import { Router } from 'express'
import { RoleController } from './RoleController.js'

const roleController = new RoleController()

export const roleRouter: Router = Router()

roleRouter.post('/', roleController.add)
roleRouter.post('/permission', roleController.addPermissionToRole)
roleRouter.put('/', roleController.edit)
roleRouter.patch('/', roleController.toggle)
roleRouter.delete('/', roleController.remove)
roleRouter.delete('/permission', roleController.removePermissionToRole)
roleRouter.get('/', roleController.findAll)
roleRouter.get('/:id', roleController.findOne)
roleRouter.get('/permission/:roleId', roleController.findPermissionsForRole)
