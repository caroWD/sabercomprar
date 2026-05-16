import type { NextFunction, Request, Response } from 'express'
import type {
  BaseRequest,
  BaseResponse,
  IdBaseRequest,
} from '../../../primitives/index.js'
import {
  TeamAlreadyExistsError,
  TeamNotFoundError,
  UserAlreadyExistsOnTeamError,
  UserDoesNotExistsOnTeamError,
} from '../domain/TeamErrors.js'
import { serviceContainer } from '../../../../shared/serviceContainer.js'
import type {
  TeamIdRequest,
  TeamUserRequest,
  UserTeamRoleRequest,
} from './services/teamSchema.js'
import { UserDto, UserNotFoundError } from '../../../auth/index.js'
import { TeamRoleNotFoundError } from '../../../access-controls/index.js'
import type { TeamDto } from '../domain/index.js'

export class TeamController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.add(req.body)

      res.status(201).json({ message: 'Team successfully added!', state: true })
    } catch (error) {
      if (error instanceof TeamAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async addUserToTeam(
    req: Request<UserTeamRoleRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.addUserToTeam(req.body)

      res
        .status(200)
        .json({ message: 'User successfully added to the Team!', state: true })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof TeamRoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof UserAlreadyExistsOnTeamError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async edit(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.edit(req.body)

      res
        .status(200)
        .json({ message: 'Team successfully edited!', state: true })
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof TeamAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async editTeamUser(
    req: Request<UserTeamRoleRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.editTeamUser(req.body)

      res
        .status(200)
        .json({ message: 'User successfully edited to the Team!', state: true })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof TeamRoleNotFoundError ||
        error instanceof UserDoesNotExistsOnTeamError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<TeamDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const teams: TeamDto[] = await serviceContainer.workspace.team.findAll()

      res.status(200).json(teams)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<TeamDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const team: TeamDto = await serviceContainer.workspace.team.findOne(
        req.params
      )

      res.status(200).json(team)
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findUsersByTeam(
    req: Request<TeamIdRequest>,
    res: Response<UserDto[] | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: UserDto[] =
        await serviceContainer.workspace.team.findUsersByTeam(req.params)

      res.status(200).json(users)
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async remove(
    req: Request<IdBaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.remove(req.body)

      res
        .status(200)
        .json({ message: 'Team successfully removed!', state: true })
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async removeTeamUser(
    req: Request<TeamUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.removeTeamUser(req.body)

      res.status(200).json({
        message: 'User successfully removed to the Team!',
        state: true,
      })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof UserDoesNotExistsOnTeamError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async toggle(
    req: Request<IdBaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.toggle(req.body)

      res
        .status(200)
        .json({ message: 'Team successfully toggled!', state: true })
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async toggleTeamUser(
    req: Request<TeamUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.workspace.team.toggleTeamUser(req.body)

      res.status(200).json({
        message: 'User successfully toggled to the Team!',
        state: true,
      })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof UserDoesNotExistsOnTeamError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
