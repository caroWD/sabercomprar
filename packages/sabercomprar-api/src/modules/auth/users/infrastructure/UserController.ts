import { SignJWT } from 'jose'
import type { NextFunction, Request, Response } from 'express'
import type {
  AddUserRequest,
  AuthUserRequest,
  EditPasswordUserRequest,
  EditUserRequest,
  UserIdRequest,
} from './services/index.js'
import type { BaseResponse, IdBaseRequest } from '../../../primitives/index.js'
import {
  UnauthorizedUserError,
  UserEmailAlreadyExistsError,
  UserHandleAlreadyExistsError,
  UserNotFoundError,
} from '../domain/UserErros.js'
import { RoleNotFoundError } from '../../../access-controls/index.js'
import { serviceContainer } from '../../../../shared/serviceContainer.js'
import type { UserAuthDto, UserDto } from '../domain/index.js'
import {
  JWT_ALG,
  JWT_AUDIENCE,
  JWT_CLAIM,
  JWT_ISSUER,
  JWT_SECRET,
  NODE_ENV,
} from '../../../../config/config.js'
import type { TeamDto } from '../../../workspaces/index.js'

export class UserController {
  async add(
    req: Request<AddUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.user.add(req.body)

      res.status(201).json({ message: 'User successfully added!', state: true })
    } catch (error) {
      if (
        error instanceof UserHandleAlreadyExistsError ||
        error instanceof UserEmailAlreadyExistsError
      )
        res.status(422).json({ message: error.message, state: false })

      if (error instanceof RoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async auth(
    req: Request<AuthUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: UserAuthDto = await serviceContainer.auth.user.auth(req.body)

      const adminRoles: string[] = [
        'Super admin',
        'Catalog moderator',
        'Technical support',
      ]

      const jwt = await new SignJWT({
        [JWT_CLAIM]: true,
        id: user.id,
        handle: user.handle,
        fullName: user.fullName,
        email: user.emial,
        roleId: user.roleId,
        roleName: user.roleName,
        admin: adminRoles.includes(user.roleName),
      })
        .setProtectedHeader({ alg: JWT_ALG })
        .setIssuedAt()
        .setIssuer(JWT_ISSUER)
        .setAudience(JWT_AUDIENCE)
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(JWT_SECRET))

      res
        .status(200)
        .cookie('access-token', jwt, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60,
        })
        .json({ message: 'Authorized user!', state: true })
    } catch (error) {
      if (error instanceof UnauthorizedUserError)
        res.status(401).json({ message: error.message, state: false })

      next(error)
    }
  }

  async editPassword(
    req: Request<EditPasswordUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.user.editPassword(req.body)

      res
        .status(200)
        .json({ message: 'User successfully edited!', state: true })
    } catch (error) {
      if (error instanceof UserNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof UnauthorizedUserError)
        res.status(401).json({ message: error.message, state: false })

      next(error)
    }
  }

  async edit(
    req: Request<EditUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      await serviceContainer.auth.user.edit(req.body)

      res
        .status(200)
        .json({ message: 'User successfully edited!', state: true })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof RoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (
        error instanceof UserHandleAlreadyExistsError ||
        error instanceof UserEmailAlreadyExistsError
      )
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<UserDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: UserDto[] = await serviceContainer.auth.user.findAll()

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<UserDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: UserDto = await serviceContainer.auth.user.findOne(req.params)

      res.status(200).json(user)
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof RoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findTeams(
    req: Request<UserIdRequest>,
    res: Response<TeamDto[] | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const teams: TeamDto[] = await serviceContainer.auth.user.findTeams(
        req.params
      )

      res.status(200).json(teams)
    } catch (error) {
      if (error instanceof UserNotFoundError)
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
      await serviceContainer.auth.user.remove(req.body)

      res
        .status(200)
        .json({ message: 'User successfully removed!', state: false })
    } catch (error) {
      if (error instanceof UserNotFoundError)
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
      await serviceContainer.auth.user.toggle(req.body)

      res
        .status(200)
        .json({ message: 'User successfully toggled!', state: true })
    } catch (error) {
      if (error instanceof UserNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
