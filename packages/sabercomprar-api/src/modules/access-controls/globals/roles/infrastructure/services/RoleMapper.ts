import { Temporal } from 'temporal-polyfill'
import {
  BaseDescription,
  BaseName,
  BaseSlug,
  RootId,
  RootState,
  RootStateEnum,
  TempoArchivedAt,
  TempoCreatedAt,
  TempoUpdatedAt,
  type BaseInsert,
  type BaseSelect,
} from '../../../../../primitives/index.js'
import { Role } from '../../domain/index.js'

export class RoleMapper {
  public static async mapToRole(role: BaseSelect): Promise<Role> {
    return new Role(
      RootId.create(role.id),
      BaseSlug.create(role.slug),
      BaseName.create(role.name),
      BaseDescription.create(role.description),
      RootState.create(
        role.state === 'active' ? RootStateEnum.ACTIVE : RootStateEnum.ARCHIVED
      ),
      TempoCreatedAt.create(Temporal.PlainDateTime.from(role.createdAt)),
      TempoUpdatedAt.create(Temporal.PlainDateTime.from(role.updatedAt)),
      TempoArchivedAt.create(
        !role.archivedAt ? null : Temporal.PlainDateTime.from(role.archivedAt)
      )
    )
  }

  public static async mapToRoleInsert(role: Role): Promise<BaseInsert> {
    return {
      id: role.id.value,
      slug: role.slug.value,
      name: role.name.value,
      description: role.description.value,
      state: role.state.value === RootStateEnum.ACTIVE ? 'active' : 'archived',
      createdAt: role.createdAt.value.toJSON(),
      updatedAt: role.updatedAt.value.toJSON(),
      archivedAt: role.archivedAt.value?.toJSON() || null,
    }
  }
}
