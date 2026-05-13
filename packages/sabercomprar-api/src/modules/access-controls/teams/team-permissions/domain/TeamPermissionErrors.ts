export class TeamPermissionNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamPermissionNotFoundError'
  }
}

export class TeamPermissionAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamPermissionAlreadyExistsError'
  }
}
