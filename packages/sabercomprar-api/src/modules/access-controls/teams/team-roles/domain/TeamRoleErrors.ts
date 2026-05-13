export class TeamRoleNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamRoleNotFoundError'
  }
}

export class TeamRoleAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamRoleAlreadyExistsError'
  }
}

export class TeamRoleDoesNotHaveThatTeamPermissionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamRoleDoesNotHaveThatTeamPermissionError'
  }
}

export class TeamRoleAlreadyHasThatTeamPermissionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TeamRoleAlreadyHasThatTeamPermissionError'
  }
}
