import { createSeededRng } from '../rng';
import { generate12RaceSeasonCalendar } from '../calendar';
import { createDriver, Driver } from './driver/driver';
import { createTeam, Team } from './team/team';
import { createCar, Car } from './car/car';
import { createStaff, StaffMember } from './staff/staff';
import { createOwner, Owner } from './owner/owner';
import { createCircuit, Circuit } from './circuit/circuit';
import { Season } from './season/season';

export interface World {
  teams: Team[];
  drivers: Driver[];
  cars: Car[];
  staff: StaffMember[];
  owners: Owner[];
  circuits: Circuit[];
  season: Season;
}

export function createWorld(seed: string, seasonYear: number): World {
  const rng = createSeededRng(seed);

  const circuits: Circuit[] = Array.from({ length: 12 }, (_, i) => createCircuit(i));

  const owners: Owner[] = Array.from({ length: 10 }, (_, i) =>
    createOwner({ name: `Owner ${i + 1}`, patience: rng.nextInt(30, 80), ambition: rng.nextInt(30, 90) }),
  );

  const teams: Team[] = Array.from({ length: 10 }, (_, i) =>
    createTeam({ name: `Team ${i + 1}`, ownerId: owners[i].id }),
  );

  const cars: Car[] = teams.map((t) => createCar({ name: `${t.name} Car`, rating: rng.nextInt(45, 90) }));

  // assign cars to teams
  teams.forEach((t, i) => (t.currentCarId = cars[i].id));

  // drivers: 2 per team
  const drivers: Driver[] = [];
  for (let i = 0; i < 20; i++) {
    const teamIndex = Math.floor(i / 2);
    const d = createDriver({ teamId: teams[teamIndex].id }, `${seed}-driver-${i}`);
    drivers.push(d);
    teams[teamIndex].driverIds.push(d.id);
  }

  const staff = teams.flatMap((t, teamIndex) =>
    Array.from({ length: 3 }, (_, j) =>
      createStaff({ firstName: `${t.name}-Staff${j + 1}`, lastName: `${teamIndex + 1}`, skill: rng.nextInt(40, 85) }),
    ),
  );

  const calendar = generate12RaceSeasonCalendar(seasonYear);

  const season: Season = { calendar };

  return { teams, drivers, cars, staff, owners, circuits, season };
}
