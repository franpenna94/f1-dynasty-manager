import { createDriver } from '../domain/driver/driver';
import { Team } from '../domain/team/team';

export function seedDrivers(seed: string, teams: Team[], count = 20) {
  const drivers = [];
  for (let i = 0; i < count; i++) {
    const teamIndex = Math.floor(i / 2) % teams.length;
    const team = teams[teamIndex];
    const d = createDriver({ teamId: team.id }, `${seed}-driver-${i}`);
    drivers.push(d);
    team.driverIds.push(d.id);
  }
  return drivers;
}

export default seedDrivers;
