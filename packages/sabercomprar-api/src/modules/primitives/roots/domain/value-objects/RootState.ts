import { DomainError } from '../../../errors/index.js'

export enum RootStateEnum {
  ACTIVE,
  ARCHIVED,
}

export class RootState {
  value: RootStateEnum

  private constructor(value: RootStateEnum) {
    this.value = value
  }

  public static create(value: RootStateEnum): RootState {
    if (value === null) throw new DomainError('The State cannot be null.')

    if (typeof value !== 'number')
      throw new DomainError('The State must be a number.')

    if (!Object.values(RootStateEnum).includes(value))
      throw new DomainError('The State must be a RootStateEnum.')

    return new RootState(value)
  }
}
