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
import { TeamPermission } from '../../domain/index.js'

export class TeamPermissionMapper {
  public static async mapToTeamPermission(
    teamPermission: BaseSelect
  ): Promise<TeamPermission> {
    return new TeamPermission(
      RootId.create(teamPermission.id),
      BaseSlug.create(teamPermission.slug),
      BaseName.create(teamPermission.name),
      BaseDescription.create(teamPermission.description),
      RootState.create(
        teamPermission.state === 'active'
          ? RootStateEnum.ACTIVE
          : RootStateEnum.ARCHIVED
      ),
      TempoCreatedAt.create(
        Temporal.PlainDateTime.from(teamPermission.createdAt)
      ),
      TempoUpdatedAt.create(
        Temporal.PlainDateTime.from(teamPermission.updatedAt)
      ),
      TempoArchivedAt.create(
        !teamPermission.archivedAt
          ? null
          : Temporal.PlainDateTime.from(teamPermission.archivedAt)
      )
    )
  }

  public static async mapToTeamPermissionInsert(
    teamPermission: TeamPermission
  ): Promise<BaseInsert> {
    return {
      id: teamPermission.id.value,
      slug: teamPermission.slug.value,
      name: teamPermission.name.value,
      description: teamPermission.description.value,
      state:
        teamPermission.state.value === RootStateEnum.ACTIVE
          ? 'active'
          : 'archived',
      createdAt: teamPermission.createdAt.value.toJSON(),
      updatedAt: teamPermission.updatedAt.value.toJSON(),
      archivedAt: teamPermission.archivedAt.value?.toJSON() || null,
    }
  }
}
