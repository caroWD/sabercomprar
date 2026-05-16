import { DomainError } from '../../../../primitives/index.js'

export class UserPassword {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): UserPassword {
    if (value === null) throw new DomainError('The Password cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Password must be a string.')

    if (!value.trim().length)
      throw new DomainError('The Password cannot be left blank.')

    if (/\s+/g.test(value))
      throw new DomainError('The Password cannot contain spaces.')

    if (!/^(?=.*[a-z]).+$/.test(value))
      throw new DomainError(
        'The Password must contain at least one lowercase letter.'
      )

    if (!/^(?=.*[A-Z]).+$/.test(value))
      throw new DomainError(
        'The Password must contain at least one uppercase letter.'
      )

    if (!/^(?=.*[0-9]).+$/.test(value))
      throw new DomainError('The Password must contain at least one number.')

    if (!/^(?=.*\d)(?=.*[$@$!%*?&/])([A-Za-z\d$@$!%*?&/]|[^ ]).+$/.test(value))
      throw new DomainError(
        'The Password must contain at least one of the following special characters: "$@$!%*?&/".'
      )

    if (!/^.{8,}$/.test(value))
      throw new DomainError('The Password must be at least 8 characters long.')

    return new UserPassword(value)
  }
}
