import type { NextFunction, Request, Response } from 'express'
import {
  baseRequestSchema,
  idBaseRequestSchema,
  type BaseRequest,
  type BaseResponse,
  type IdBaseRequest,
} from '../../../../primitives/index.js'
import {
  TeamRoleAlreadyExistsError,
  TeamRoleAlreadyHasThatTeamPermissionError,
  TeamRoleDoesNotHaveThatTeamPermissionError,
  TeamRoleNotFoundError,
} from '../domain/TeamRoleErrors.js'
import { serviceContainer } from '../../../../../shared/serviceContainer.js'
import {
  teamRoleIdRequestSchema,
  teamRoleteamPermissionRequestSchema,
  type TeamRoleIdRequest,
  type TeamRoleTeamPermissionRequest,
} from './services/teamRoleSchema.js'
import {
  TeamPermissionDto,
  TeamPermissionNotFoundError,
} from '../../team-permissions/index.js'
import type { TeamRoleDto } from '../domain/index.js'

export class TeamRoleController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.accessControl.team.teamRole.add({
        id,
        name,
        description,
      })

      res
        .status(201)
        .json({ message: 'TeamRole added successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamRoleAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async addTeamPermissionToTeamRole(
    req: Request<TeamRoleTeamPermissionRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamRoleId, teamPermissionId } =
        await teamRoleteamPermissionRequestSchema.parseAsync(req.body)

      const teamRole: TeamRoleDto =
        await serviceContainer.accessControl.team.teamRole.findOne({
          id: teamRoleId,
        })

      const teamPermission: TeamPermissionDto =
        await serviceContainer.accessControl.team.teamPermission.findOne({
          id: teamPermissionId,
        })

      await serviceContainer.accessControl.team.teamRole.addTeamPermissionToTeamRole(
        { teamRoleId: teamRole.id, teamPermissionId: teamPermission.id }
      )

      res.status(201).json({
        message: 'TeamRoleTeamPermssion added successfully!',
        state: true,
      })
    } catch (error) {
      if (
        error instanceof TeamRoleNotFoundError ||
        error instanceof TeamPermissionNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof TeamRoleAlreadyHasThatTeamPermissionError)
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
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.accessControl.team.teamRole.edit({
        id,
        name,
        description,
      })

      res
        .status(200)
        .json({ message: 'TeamRole edited successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamRoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof TeamRoleAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async toggle(
    req: Request<IdBaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.body)

      await serviceContainer.accessControl.team.teamRole.toggle({ id })

      res
        .status(200)
        .json({ message: 'TeamRole toggled successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamRoleNotFoundError)
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
      const { id } = await idBaseRequestSchema.parseAsync(req.body)

      await serviceContainer.accessControl.team.teamRole.remove({ id })

      res
        .status(200)
        .json({ message: 'TeamRole removed successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamRoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async removeTeamPermissionToTeamRole(
    req: Request<TeamRoleTeamPermissionRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamRoleId, teamPermissionId } =
        await teamRoleteamPermissionRequestSchema.parseAsync(req.body)

      const teamRole: TeamRoleDto =
        await serviceContainer.accessControl.team.teamRole.findOne({
          id: teamRoleId,
        })

      const teamPermission: TeamPermissionDto =
        await serviceContainer.accessControl.team.teamPermission.findOne({
          id: teamPermissionId,
        })

      await serviceContainer.accessControl.team.teamRole.removeTeamPermissionToTeamRole(
        { teamRoleId: teamRole.id, teamPermissionId: teamPermission.id }
      )

      res.status(200).json({
        message: 'TeamRoleTeamPermssion removed successfully!',
        state: true,
      })
    } catch (error) {
      if (
        error instanceof TeamRoleNotFoundError ||
        error instanceof TeamPermissionNotFoundError ||
        error instanceof TeamRoleDoesNotHaveThatTeamPermissionError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<TeamRoleDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const teamRoles: TeamRoleDto[] =
        await serviceContainer.accessControl.team.teamRole.findAll()

      res.status(200).json(teamRoles)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<TeamRoleDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.params)

      const teamRole: TeamRoleDto =
        await serviceContainer.accessControl.team.teamRole.findOne({ id })

      res.status(200).json(teamRole)
    } catch (error) {
      if (error instanceof TeamRoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findTeamPermissionsForTeamRole(
    req: Request<TeamRoleIdRequest>,
    res: Response<TeamPermissionDto[] | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamRoleId } = await teamRoleIdRequestSchema.parseAsync(
        req.params
      )

      const teamPermissions: TeamPermissionDto[] =
        await serviceContainer.accessControl.team.teamRole.findTeamPermissionsForTeamRole(
          { teamRoleId }
        )

      res.status(200).json(teamPermissions)
    } catch (error) {
      if (error instanceof TeamRoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
