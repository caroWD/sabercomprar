import { compare } from 'bcryptjs'
import type { IRoleRepository } from '../../../../access-controls/index.js'
import {
  idBaseRequestSchema,
  type IdBaseRequest,
} from '../../../../primitives/index.js'
import type { TeamDto } from '../../../../workspaces/index.js'
import {
  AddUser,
  AuthUser,
  EditPasswordUser,
  EditUser,
  FindAllUser,
  FindOneUser,
  FindTeamsByUser,
  RemoveUser,
  ToggleUser,
} from '../../application/index.js'
import {
  UnauthorizedUserError,
  type IUserRepository,
  type UserAuthDto,
  type UserDto,
} from '../../domain/index.js'
import {
  addUserRequestSchema,
  authUserRequestSchema,
  editPasswordUserRequestSchema,
  editUserRequestSchema,
  userIdRequestSchema,
  type AddUserRequest,
  type AuthUserRequest,
  type EditPasswordUserRequest,
  type EditUserRequest,
  type UserIdRequest,
} from './userSchema.js'

export class UserShared {
  private readonly _add: AddUser
  private readonly _auth: AuthUser
  private readonly _editPassword: EditPasswordUser
  private readonly _edit: EditUser
  private readonly _findAll: FindAllUser
  private readonly _findOne: FindOneUser
  private readonly _findTeams: FindTeamsByUser
  private readonly _remove: RemoveUser
  private readonly _toggle: ToggleUser

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._add = new AddUser(userRepository, roleRepository)
    this._auth = new AuthUser(userRepository, roleRepository)
    this._edit = new EditUser(userRepository, roleRepository)
    this._editPassword = new EditPasswordUser(userRepository)
    this._findAll = new FindAllUser(userRepository, roleRepository)
    this._findOne = new FindOneUser(userRepository, roleRepository)
    this._findTeams = new FindTeamsByUser(userRepository)
    this._remove = new RemoveUser(userRepository)
    this._toggle = new ToggleUser(userRepository)
  }

  async add(req: AddUserRequest): Promise<void> {
    const { id, handle, firstName, lastName, email, password, avatar, roleId } =
      await addUserRequestSchema.parseAsync(req)

    return await this._add.handler(
      id,
      handle,
      firstName,
      lastName,
      email,
      password,
      avatar,
      roleId
    )
  }

  async auth(req: AuthUserRequest): Promise<UserAuthDto> {
    const { handle, password } = await authUserRequestSchema.parseAsync(req)

    const user: UserAuthDto = await this._auth.handler(handle)

    if (!(await compare(password, user.password)) || !user.archived)
      throw new UnauthorizedUserError('Unauthorized user!')

    return user
  }

  async editPassword(req: EditPasswordUserRequest): Promise<void> {
    const { id, current, next } =
      await editPasswordUserRequestSchema.parseAsync(req)

    return await this._editPassword.handler(id, current, next)
  }

  async edit(req: EditUserRequest): Promise<void> {
    const { id, handle, firstName, lastName, email, avatar, roleId } =
      await editUserRequestSchema.parseAsync(req)

    return await this._edit.handler(
      id,
      handle,
      firstName,
      lastName,
      email,
      avatar,
      roleId
    )
  }

  async findAll(): Promise<UserDto[]> {
    return await this._findAll.handler()
  }

  async findOne(req: IdBaseRequest): Promise<UserDto> {
    const { id } = await idBaseRequestSchema.parseAsync(req)

    return await this._findOne.handler(id)
  }

  async findTeams(req: UserIdRequest): Promise<TeamDto[]> {
    const { userId } = await userIdRequestSchema.parseAsync(req)

    return await this._findTeams.handler(userId)
  }

  async remove(req: IdBaseRequest): Promise<void> {
    const { id } = await idBaseRequestSchema.parseAsync(req)

    return await this._remove.handler(id)
  }

  async toggle(req: IdBaseRequest): Promise<void> {
    const { id } = await idBaseRequestSchema.parseAsync(req)

    return await this._toggle.handler(id)
  }
}
