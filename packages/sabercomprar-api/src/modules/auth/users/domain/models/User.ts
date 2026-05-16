import {
  Root,
  RootId,
  RootState,
  TempoArchivedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
} from '../../../../primitives/index.js'
import type {
  UserAvatar,
  UserEmail,
  UserFirstName,
  UserHandle,
  UserLastName,
  UserPassword,
} from '../value-objects/index.js'

export class User extends Root {
  private _handle: UserHandle
  private _firstName: UserFirstName
  private _lastName: UserLastName
  private _fullName: string
  private _email: UserEmail
  private _password: UserPassword
  private _avatar: UserAvatar
  private _roleId: RootId

  constructor(
    id: RootId,
    handle: UserHandle,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword,
    avatar: UserAvatar,
    roleId: RootId,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(id, state, createdAt, updatedAt, archivedAt)
    this._handle = handle
    this._firstName = firstName
    this._lastName = lastName
    this._fullName = `${firstName.value} ${lastName.value}`
    this._email = email
    this._password = password
    this._avatar = avatar
    this._roleId = roleId
  }

  get handle(): UserHandle {
    return this._handle
  }

  get firstName(): UserFirstName {
    return this._firstName
  }

  get lastName(): UserLastName {
    return this._lastName
  }

  get fullName(): string {
    return this._fullName
  }

  get email(): UserEmail {
    return this._email
  }

  get password(): UserPassword {
    return this._password
  }

  get avatar(): UserAvatar {
    return this._avatar
  }

  get roleId(): RootId {
    return this._roleId
  }
}
