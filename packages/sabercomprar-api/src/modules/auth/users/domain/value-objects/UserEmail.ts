import { DomainError } from '../../../../primitives/index.js'

export class UserEmail {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): UserEmail {
    if (value === null) throw new DomainError('The Email cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Email must be a string.')

    if (!value.trim().length)
      throw new DomainError('The Email cannot be left blank.')

    if (/\s+/g.test(value))
      throw new DomainError('The Email cannot contain spaces.')

    if (
      !/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/i.test(
        value
      )
    )
      throw new DomainError(
        'The Email must be formatted as follows: example@domain.com'
      )

    return new UserEmail(value)
  }
}
