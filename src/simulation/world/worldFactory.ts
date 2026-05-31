import { seedAll } from '../seed';
import { generate12RaceSeasonCalendar } from '../calendar';
import { createSeededRng } from '../rng';
import { WorldState, validateNoDuplicateIds } from './worldState';

export function buildWorldState(seed: string, seasonYear: number): WorldState {
  const rng = createSeededRng(seed + '-meta');
  const now = new Date(1600000000000 + Math.floor(rng.nextFloat() * 1000000000)).toISOString();
  const { owners, teams, circuits, drivers, staff } = seedAll(seed);

  // Build maps keyed by id
  const teamsMap = Object.fromEntries(teams.map((t) => [String(t.id), t]));
  const driversMap = Object.fromEntries(drivers.map((d) => [String(d.id), d]));
  const staffMap = Object.fromEntries(staff.map((s) => [String(s.id), s]));
  const ownersMap = Object.fromEntries(owners.map((o) => [String(o.id), o]));
  const circuitsMap = Object.fromEntries(circuits.map((c) => [String(c.id), c]));

  const calendar = generate12RaceSeasonCalendar(seasonYear);

  // validate duplicates
  const ok = validateNoDuplicateIds([owners, teams, drivers, staff, circuits]);
  if (!ok) {
    throw new Error('Duplicate IDs detected in seeded world');
  }

  const worldState: WorldState = {
    metadata: {
      saveId: `seed-${seed}-${seasonYear}`,
      seed,
      createdAt: now,
      currentSeasonYear: seasonYear,
      currentWeekIndex: 1,
    },
    world: {
      teams: teamsMap,
      drivers: driversMap,
      staff: staffMap,
      owners: ownersMap,
      circuits: circuitsMap,
    },
    currentSeason: {
      year: seasonYear,
      calendar,
    },
  };

  return worldState;
}

export default buildWorldState;
