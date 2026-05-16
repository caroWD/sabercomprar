export class UserDto {
  id: string
  handle: string
  firstName: string
  lastName: string
  fullName: string
  emial: string
  avatar: string | null
  roleId: string
  roleName: string
  archived: boolean
  createdAt: string
  updatedAt: string

  constructor(
    id: string,
    handle: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    avatar: string | null,
    roleId: string,
    roleName: string,
    archived: boolean,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id
    this.handle = handle
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = fullName
    this.emial = email
    this.avatar = avatar
    this.roleId = roleId
    this.roleName = roleName
    this.archived = archived
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
