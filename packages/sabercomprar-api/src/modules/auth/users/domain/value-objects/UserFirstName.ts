import { DomainError } from '../../../../primitives/index.js'

export class UserFirstName {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): UserFirstName {
    if (value === null) throw new DomainError('The FirstName cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The FirstName must be a string.')

    if (!value.trim().length)
      throw new DomainError('The FirstName cannot be left blank.')

    if (/^(?=.*[0-9]).+$/.test(value))
      throw new DomainError('The FirstName cannot contain numbers.')

    if (value.trim().length < 3)
      throw new DomainError('The FirstName must be at least 3 characters long.')

    if (value.trim().split(' ').length > 2)
      throw new DomainError(
        'The FirstName cannot consist of more than two words.'
      )

    value = value
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((name) => {
        if (name.length < 3)
          throw new DomainError(
            'The words that make up the FirstName must be at least 3 characters long.'
          )

        if (name.length > 30)
          throw new DomainError(
            'The words that make up the FirstName must be no more than 30 characters long.'
          )

        return name.at(0)?.toUpperCase() + name.substring(1).toLowerCase()
      })
      .join(' ')

    return new UserFirstName(value)
  }
}
