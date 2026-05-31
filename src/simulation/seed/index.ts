import seedOwners from './owners';
import seedTeams from './teams';
import seedDrivers from './drivers';
import seedCircuits from './circuits';
import seedStaff from './staff';

export function seedAll(seed: string) {
  const owners = seedOwners(seed);
  const teams = seedTeams(seed, owners);
  const circuits = seedCircuits();
  const drivers = seedDrivers(seed, teams);
  const staff = seedStaff(seed, teams);

  return { owners, teams, circuits, drivers, staff };
}

export default seedAll;
