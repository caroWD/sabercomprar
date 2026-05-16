export class TeamNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamNotFoundError'
  }
}

export class TeamAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamAlreadyExistsError'
  }
}

export class UserAlreadyExistsOnTeamError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserAlreadyExistsOnTeamError'
  }
}

export class UserDoesNotExistsOnTeamError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserDoesNotExistsOnTeamError'
  }
}
