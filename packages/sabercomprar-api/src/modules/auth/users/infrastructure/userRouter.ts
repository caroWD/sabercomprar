import { Router } from 'express'
import { UserController } from './UserController.js'

const userController = new UserController()

export const userRouter: Router = Router()

userRouter.post('/', userController.add)
userRouter.put('/', userController.edit)
userRouter.patch('/password', userController.editPassword)
userRouter.patch('/', userController.toggle)
userRouter.delete('/', userController.remove)
userRouter.post('/login', userController.auth)
userRouter.get('/', userController.findAll)
userRouter.get('/:id', userController.findOne)
userRouter.get('/team/:userId', userController.findTeams)
