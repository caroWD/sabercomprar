import type { NextFunction, Request, Response } from 'express'
import {
  baseRequestSchema,
  idBaseRequestSchema,
  type BaseRequest,
  type BaseResponse,
  type IdBaseRequest,
} from '../../../../primitives/index.js'
import {
  PermissionAlreadyExistsError,
  PermissionNotFoundError,
} from '../domain/PermissionError.js'
import { serviceContainer } from '../../../../../shared/serviceContainer.js'
import type { PermissionDto } from '../domain/index.js'

export class PermissionController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.accessControl.global.permission.add({
        id,
        name,
        description,
      })

      res
        .status(201)
        .json({ message: 'Permission added successfully!', state: true })
    } catch (error) {
      if (error instanceof PermissionAlreadyExistsError)
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

      await serviceContainer.accessControl.global.permission.edit({
        id,
        name,
        description,
      })

      res
        .status(200)
        .json({ message: 'Permission edited successfully!', state: true })
    } catch (error) {
      if (error instanceof PermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof PermissionAlreadyExistsError)
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

      await serviceContainer.accessControl.global.permission.toggle({ id })

      res
        .status(200)
        .json({ message: 'Permission archived successfully!', state: true })
    } catch (error) {
      if (error instanceof PermissionNotFoundError)
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

      await serviceContainer.accessControl.global.permission.remove({ id })

      res
        .status(200)
        .json({ message: 'Permission removed successfully!', state: true })
    } catch (error) {
      if (error instanceof PermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<PermissionDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const permissions: PermissionDto[] =
        await serviceContainer.accessControl.global.permission.findAll()

      res.status(200).json(permissions)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<PermissionDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.params)

      const permission: PermissionDto =
        await serviceContainer.accessControl.global.permission.findOne({ id })

      res.status(200).json(permission)
    } catch (error) {
      if (error instanceof PermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof PermissionAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }
}
