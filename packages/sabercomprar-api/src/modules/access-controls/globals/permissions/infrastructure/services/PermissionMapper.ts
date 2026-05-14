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
import { Permission } from '../../domain/index.js'

export class PermissionMapper {
  public static async mapToPermission(
    permission: BaseSelect
  ): Promise<Permission> {
    return new Permission(
      RootId.create(permission.id),
      BaseSlug.create(permission.slug),
      BaseName.create(permission.name),
      BaseDescription.create(permission.description),
      RootState.create(
        permission.state === 'active'
          ? RootStateEnum.ACTIVE
          : RootStateEnum.ARCHIVED
      ),
      TempoCreatedAt.create(Temporal.PlainDateTime.from(permission.createdAt)),
      TempoUpdatedAt.create(Temporal.PlainDateTime.from(permission.updatedAt)),
      TempoArchivedAt.create(
        !permission.archivedAt
          ? null
          : Temporal.PlainDateTime.from(permission.archivedAt)
      )
    )
  }

  public static async mapToPermissionInsert(
    permission: Permission
  ): Promise<BaseInsert> {
    return {
      id: permission.id.value,
      slug: permission.slug.value,
      name: permission.name.value,
      description: permission.description.value,
      state:
        permission.state.value === RootStateEnum.ACTIVE ? 'active' : 'archived',
      createdAt: permission.createdAt.value.toJSON(),
      updatedAt: permission.updatedAt.value.toJSON(),
      archivedAt: !permission.archivedAt.value
        ? null
        : permission.archivedAt.value.toJSON(),
    }
  }
}
