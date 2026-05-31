import { brandedId, TeamId, OwnerId, CarId, DriverId } from '../../types/ids';

export type Series = 'F1' | 'F2' | 'F3';

export interface Team {
  id: TeamId;
  name: string;
  shortName: string;
  country: string;
  series: Series;
  isPlayerControlled: boolean;
  ownerId: OwnerId;
  driverIds: DriverId[];
  currentCarId?: CarId;
}

export function validateTeam(t: Team): boolean {
  if (!t.id) return false;
  if (!t.name || !t.shortName) return false;
  if (!t.ownerId) return false;
  if (!Array.isArray(t.driverIds)) return false;
  return true;
}

export function createTeam(opts: Partial<Team>): Team {
  const name = opts.name ?? `Team ${Math.floor(Math.random() * 10000)}`;
  return {
    id: opts.id ?? brandedId<TeamId>(`team-${name.replace(/\s+/g, '-').toLowerCase()}`),
    name,
    shortName: opts.shortName ?? name.split(' ')[0],
    country: opts.country ?? 'Unknown',
    series: opts.series ?? 'F1',
    isPlayerControlled: opts.isPlayerControlled ?? false,
    ownerId: opts.ownerId ?? (brandedId<OwnerId>('owner-unknown') as OwnerId),
    driverIds: opts.driverIds ?? [],
    currentCarId: opts.currentCarId,
  };
}
