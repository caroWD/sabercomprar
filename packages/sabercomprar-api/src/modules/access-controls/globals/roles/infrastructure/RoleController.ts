import type { NextFunction, Request, Response } from 'express'
import {
  baseRequestSchema,
  idBaseRequestSchema,
  type BaseRequest,
  type BaseResponse,
  type IdBaseRequest,
} from '../../../../primitives/index.js'
import {
  RoleAlreadyExistsError,
  RoleAlreadyHasThatPermissionError,
  RoleNotFoundError,
} from '../domain/RoleErrors.js'
import { serviceContainer } from '../../../../../shared/serviceContainer.js'
import {
  roleIdRequestSchema,
  rolePermissionRequesSchema,
  type RoleIdRequest,
  type RolePermissionRequest,
} from './services/roleSchema.js'
import {
  PermissionDto,
  PermissionNotFoundError,
} from '../../permissions/index.js'
import type { RoleDto } from '../domain/index.js'

export class RoleController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.accessControl.global.role.add({
        id,
        name,
        description,
      })

      res.status(201).json({ message: 'Role added successfully!', state: true })
    } catch (error) {
      if (error instanceof RoleAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async addPermissionToRole(
    req: Request<RolePermissionRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { roleId, permissionId } =
        await rolePermissionRequesSchema.parseAsync(req.body)

      const permission: PermissionDto =
        await serviceContainer.accessControl.global.permission.findOne({
          id: permissionId,
        })

      await serviceContainer.accessControl.global.role.addPermissionToRole({
        roleId,
        permissionId: permission.id,
      })

      res
        .status(200)
        .json({ message: 'RolePermission added successfully!', state: true })
    } catch (error) {
      if (
        error instanceof RoleNotFoundError ||
        error instanceof PermissionNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof RoleAlreadyHasThatPermissionError)
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

      await serviceContainer.accessControl.global.role.edit({
        id,
        name,
        description,
      })

      res
        .status(200)
        .json({ message: 'Role edited successfully!', state: true })
    } catch (error) {
      if (error instanceof RoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof RoleAlreadyExistsError)
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

      await serviceContainer.accessControl.global.role.toggle({ id })

      res
        .status(200)
        .json({ message: 'Role toogle archived successfully!', state: true })
    } catch (error) {
      if (error instanceof RoleNotFoundError)
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

      await serviceContainer.accessControl.global.role.remove({ id })

      res
        .status(200)
        .json({ message: 'Role toogle archived successfully!', state: true })
    } catch (error) {
      if (error instanceof RoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async removePermissionToRole(
    req: Request<RolePermissionRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { roleId, permissionId } =
        await rolePermissionRequesSchema.parseAsync(req.body)

      const permission: PermissionDto =
        await serviceContainer.accessControl.global.permission.findOne({
          id: permissionId,
        })

      await serviceContainer.accessControl.global.role.removePermissionToRole({
        roleId,
        permissionId: permission.id,
      })

      res
        .status(200)
        .json({ message: 'RolePermission removed successfully!', state: true })
    } catch (error) {
      if (
        error instanceof RoleNotFoundError ||
        error instanceof PermissionNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof RoleAlreadyHasThatPermissionError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<RoleDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const roles: RoleDto[] =
        await serviceContainer.accessControl.global.role.findAll()

      res.status(200).json(roles)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<RoleDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.params)

      const role: RoleDto =
        await serviceContainer.accessControl.global.role.findOne({ id })

      res.status(200).json(role)
    } catch (error) {
      if (error instanceof RoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findPermissionsForRole(
    req: Request<RoleIdRequest>,
    res: Response<PermissionDto[] | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { roleId } = await roleIdRequestSchema.parseAsync(req.params)

      const permissions: PermissionDto[] =
        await serviceContainer.accessControl.global.role.findPermissionForRole({
          roleId,
        })

      res.status(200).json(permissions)
    } catch (error) {
      if (error instanceof RoleNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
