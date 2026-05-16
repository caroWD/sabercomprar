export class UserAuthDto {
  id: string
  handle: string
  fullName: string
  emial: string
  password: string
  roleId: string
  roleName: string
  archived: boolean

  constructor(
    id: string,
    handle: string,
    fullName: string,
    email: string,
    password: string,
    roleId: string,
    roleName: string,
    archived: boolean
  ) {
    this.id = id
    this.handle = handle
    this.fullName = fullName
    this.emial = email
    this.password = password
    this.roleId = roleId
    this.roleName = roleName
    this.archived = archived
  }
}
