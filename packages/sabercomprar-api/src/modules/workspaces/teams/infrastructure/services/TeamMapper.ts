import { getTemporalFrom } from '../../../../../helpers/temporalHelper.js'
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
} from '../../../../primitives/index.js'
import { Team } from '../../domain/index.js'

export class TeamMapper {
  public static async mapToTeam(team: BaseSelect): Promise<Team> {
    return new Team(
      RootId.create(team.id),
      BaseSlug.create(team.slug),
      BaseName.create(team.name),
      BaseDescription.create(team.description),
      RootState.create(
        team.state === 'active' ? RootStateEnum.ACTIVE : RootStateEnum.ARCHIVED
      ),
      TempoCreatedAt.create(getTemporalFrom(team.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(team.updatedAt)),
      TempoArchivedAt.create(
        !team.archivedAt ? null : getTemporalFrom(team.archivedAt)
      )
    )
  }

  public static async mapToTeamInsert(team: Team): Promise<BaseInsert> {
    return {
      id: team.id.value,
      slug: team.slug.value,
      name: team.name.value,
      description: team.description.value,
      createdAt: team.createdAt.value.toJSON(),
      updatedAt: team.updatedAt.value.toJSON(),
      archivedAt: team.archivedAt.value?.toJSON() || null,
      state: team.state.value === RootStateEnum.ACTIVE ? 'active' : 'archived',
    }
  }
}
