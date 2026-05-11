import { DomainError } from '../../../errors/index.js'

export class BaseSlug {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): BaseSlug {
    if (value === null) throw new DomainError('The Slug cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The Slug must be a string.')

    if (!value.trim().length) throw new DomainError('The Slug cannot be empty.')

    if (value.trim().length < 5)
      throw new DomainError('The Slug must be at least 5 characters long.')

    if (value.trim().length > 50)
      throw new DomainError('The Slug must be no more than 50 characters long.')

    return new BaseSlug(value.trim().toLowerCase().split(' ').join('-'))
  }
}
