import {
  Base,
  BaseDescription,
  BaseName,
  BaseSlug,
  RootId,
  RootState,
  TempoCreatedAt,
  TempoArchivedAt,
  TempoUpdatedAt,
} from '../../../../../primitives/index.js'

export class Permission extends Base {
  constructor(
    id: RootId,
    slug: BaseSlug,
    name: BaseName,
    description: BaseDescription,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(id, slug, name, description, state, createdAt, updatedAt, archivedAt)
  }
}
