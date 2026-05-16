import { DomainError } from '../../../../primitives/index.js'

export class UserAvatar {
  value: string | null

  private constructor(value: string | null) {
    this.value = value
  }

  public static create(value: string | null): UserAvatar {
    if (value !== null) {
      if (typeof value !== 'string')
        throw new DomainError('The Avatar must be a string.')

      if (!value.trim().length)
        throw new DomainError('The Avatar cannot be left blank.')

      if (/\s+/g.test(value))
        throw new DomainError('The Avatar cannot contain spaces.')

      if (
        !/^(https?:\/\/)?(localhost|([a-z0-9-]+(\.[a-z0-9-]+)+))([/a-z0-9?.-]*)*\/?$/i.test(
          value
        )
      )
        throw new DomainError('The Avatar does not have a valid URL format.')
    }

    return new UserAvatar(value)
  }
}
