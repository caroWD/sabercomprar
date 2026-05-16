import { DomainError } from '../../../../primitives/index.js'

export class UserHandle {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): UserHandle {
    if (value === null) throw new DomainError('The Handle cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Handle must be a string.')

    if (!value.trim().length)
      throw new DomainError('The Handle cannot be left blank.')

    if (/\s+/g.test(value))
      throw new DomainError('The Handle cannot contain spaces.')

    if (value.trim().at(0) !== '@')
      throw new DomainError('The Handle must start with an “@”.')

    if (value.trim().length < 5)
      throw new DomainError('The Handle must be at least 5 characters long.')

    if (value.trim().length > 30)
      throw new DomainError(
        'The Handle must be no more than 30 characters long.'
      )

    return new UserHandle(value.trim())
  }
}
