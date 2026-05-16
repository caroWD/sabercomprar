export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundError'
  }
}

export class UserHandleAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserHandleAlreadyExistsError'
  }
}

export class UserEmailAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserEmailAlreadyExistsError'
  }
}

export class UnauthorizedUserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedUserError'
  }
}
