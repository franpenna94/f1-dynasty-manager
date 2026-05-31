import { brandedId, DriverId, TeamId } from '../../types/ids';
import { createSeededRng } from '../../rng';

export interface Driver {
  id: DriverId;
  firstName: string;
  lastName: string;
  age: number;
  overall: number; // 0-100
  racePace: number; // 0-100
  qualifying: number; // 0-100
  consistency: number; // 0-100
  teamId?: TeamId;
}

export function validateDriver(d: Driver): boolean {
  if (!d.id) return false;
  if (!d.firstName || !d.lastName) return false;
  if (d.age < 16 || d.age > 60) return false;
  const attrs = [d.overall, d.racePace, d.qualifying, d.consistency];
  return attrs.every((a) => typeof a === 'number' && a >= 0 && a <= 100);
}

export function createDriver(opts: Partial<Driver>, rngSeed = 'driver-seed'): Driver {
  const rng = createSeededRng(rngSeed + '-' + (opts.firstName ?? '') + '-' + (opts.lastName ?? ''));

  const firstName = opts.firstName ?? `Driver${rng.nextInt(1, 9999)}`;
  const lastName = opts.lastName ?? `Surname${rng.nextInt(1, 9999)}`;
  const age = opts.age ?? rng.nextInt(18, 40);
  const racePace = opts.racePace ?? rng.nextInt(50, 95);
  const qualifying = opts.qualifying ?? Math.max(40, Math.min(100, Math.round(racePace + rng.nextInt(-5, 5))));
  const consistency = opts.consistency ?? rng.nextInt(40, 95);
  const overall = opts.overall ?? Math.round((racePace * 0.6 + qualifying * 0.3 + consistency * 0.1));

  return {
    id: brandedId<DriverId>(`driver-${firstName}-${lastName}-${age}`),
    firstName,
    lastName,
    age,
    overall,
    racePace,
    qualifying,
    consistency,
    teamId: opts.teamId,
  };
}
