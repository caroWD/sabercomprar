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
import { TeamRole } from '../../domain/index.js'

export class TeamRoleMapper {
  public static async mapToTeamRole(teamRole: BaseSelect): Promise<TeamRole> {
    return new TeamRole(
      RootId.create(teamRole.id),
      BaseSlug.create(teamRole.slug),
      BaseName.create(teamRole.name),
      BaseDescription.create(teamRole.description),
      RootState.create(
        teamRole.state === 'active'
          ? RootStateEnum.ACTIVE
          : RootStateEnum.ARCHIVED
      ),
      TempoCreatedAt.create(Temporal.PlainDateTime.from(teamRole.createdAt)),
      TempoUpdatedAt.create(Temporal.PlainDateTime.from(teamRole.updatedAt)),
      TempoArchivedAt.create(
        !teamRole.archivedAt
          ? null
          : Temporal.PlainDateTime.from(teamRole.archivedAt)
      )
    )
  }

  public static async mapToTeamRoleInsert(
    teamRole: TeamRole
  ): Promise<BaseInsert> {
    return {
      id: teamRole.id.value,
      slug: teamRole.slug.value,
      name: teamRole.name.value,
      description: teamRole.description.value,
      state:
        teamRole.state.value === RootStateEnum.ACTIVE ? 'active' : 'archived',
      createdAt: teamRole.createdAt.value.toJSON(),
      updatedAt: teamRole.updatedAt.value.toJSON(),
      archivedAt: teamRole.archivedAt.value?.toJSON() || null,
    }
  }
}
