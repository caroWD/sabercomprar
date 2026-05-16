import { Router } from 'express'
import { TeamController } from './TeamController.js'

const teamController = new TeamController()

export const teamRouter: Router = Router()

teamRouter.post('/', teamController.add)
teamRouter.post('/user', teamController.addUserToTeam)
teamRouter.put('/', teamController.edit)
teamRouter.put('/user', teamController.editTeamUser)
teamRouter.get('/', teamController.findAll)
teamRouter.get('/:id', teamController.findOne)
teamRouter.get('/user/:teamId', teamController.findUsersByTeam)
teamRouter.delete('/', teamController.remove)
teamRouter.delete('/user', teamController.removeTeamUser)
teamRouter.patch('/', teamController.toggle)
teamRouter.patch('/user', teamController.toggleTeamUser)
