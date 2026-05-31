import { createTeam } from '../domain/team/team';
import { Owner } from '../domain/owner/owner';

export function seedTeams(seed: string, owners: Owner[], count = 10) {
  return Array.from({ length: count }, (_, i) =>
    createTeam({
      id: undefined,
      name: `Team ${i + 1}`,
      shortName: `T${i + 1}`,
      country: 'Fictional',
      series: 'F1',
      isPlayerControlled: false,
      ownerId: owners[i].id,
      driverIds: [],
    }),
  );
}

export default seedTeams;
