export class TeamPermissionDto {
  id: string
  name: string
  description: string
  archived: boolean
  createdAt: string
  updatedAt: string
  archivedAt: string | null

  constructor(
    id: string,
    name: string,
    description: string,
    archived: boolean,
    createdAt: string,
    updatedAt: string,
    archivedAt: string | null
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.archived = archived
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.archivedAt = archivedAt
  }
}
