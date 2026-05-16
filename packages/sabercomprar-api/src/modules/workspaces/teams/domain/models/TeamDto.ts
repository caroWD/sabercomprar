export class TeamDto {
  id: string
  name: string
  description: string
  archived: boolean
  createdAt: string
  updatedAt: string

  constructor(
    id: string,
    name: string,
    description: string,
    archived: boolean,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.archived = archived
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
