import { ConstructorId, DriverId, RaceId } from '../types/ids';

export interface RaceResult {
  raceId: RaceId;
  position: number;
  driverId: DriverId;
  constructorId: ConstructorId;
  finished: boolean;
  points?: number;
}

export const DEFAULT_POINTS_BY_POSITION = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export function getPointsForPosition(position: number): number {
  if (position < 1) {
    return 0;
  }

  return DEFAULT_POINTS_BY_POSITION[position - 1] ?? 0;
}

export interface DriverStandingEntry {
  driverId: DriverId;
  points: number;
  wins: number;
  podiums: number;
  positions: Record<number, number>;
  racesStarted: number;
  racesFinished: number;
}

export interface ConstructorStandingEntry {
  constructorId: ConstructorId;
  points: number;
  wins: number;
  podiums: number;
  positions: Record<number, number>;
  racesStarted: number;
  racesFinished: number;
}

function createDriverStanding(driverId: DriverId): DriverStandingEntry {
  return {
    driverId,
    points: 0,
    wins: 0,
    podiums: 0,
    positions: {},
    racesStarted: 0,
    racesFinished: 0,
  };
}

function createConstructorStanding(constructorId: ConstructorId): ConstructorStandingEntry {
  return {
    constructorId,
    points: 0,
    wins: 0,
    podiums: 0,
    positions: {},
    racesStarted: 0,
    racesFinished: 0,
  };
}

export function calculateDriverStandings(results: RaceResult[]): DriverStandingEntry[] {
  const standingsMap = new Map<DriverId, DriverStandingEntry>();

  for (const result of results) {
    const points = result.points ?? getPointsForPosition(result.position);
    const entry = standingsMap.get(result.driverId) ?? createDriverStanding(result.driverId);

    entry.points += points;
    entry.racesStarted += 1;
    if (result.finished) {
      entry.racesFinished += 1;
    }
    if (result.position === 1) {
      entry.wins += 1;
    }
    if (result.position <= 3) {
      entry.podiums += 1;
    }
    entry.positions[result.position] = (entry.positions[result.position] ?? 0) + 1;
    standingsMap.set(result.driverId, entry);
  }

  return Array.from(standingsMap.values()).sort((left, right) => {
    if (right.points !== left.points) {
      return right.points - left.points;
    }
    if (right.wins !== left.wins) {
      return right.wins - left.wins;
    }
    if (right.podiums !== left.podiums) {
      return right.podiums - left.podiums;
    }
    return (right.positions[1] ?? 0) - (left.positions[1] ?? 0);
  });
}

export function calculateConstructorStandings(results: RaceResult[]): ConstructorStandingEntry[] {
  const standingsMap = new Map<ConstructorId, ConstructorStandingEntry>();

  for (const result of results) {
    const points = result.points ?? getPointsForPosition(result.position);
    const entry = standingsMap.get(result.constructorId) ?? createConstructorStanding(result.constructorId);

    entry.points += points;
    entry.racesStarted += 1;
    if (result.finished) {
      entry.racesFinished += 1;
    }
    if (result.position === 1) {
      entry.wins += 1;
    }
    if (result.position <= 3) {
      entry.podiums += 1;
    }
    entry.positions[result.position] = (entry.positions[result.position] ?? 0) + 1;
    standingsMap.set(result.constructorId, entry);
  }

  return Array.from(standingsMap.values()).sort((left, right) => {
    if (right.points !== left.points) {
      return right.points - left.points;
    }
    if (right.wins !== left.wins) {
      return right.wins - left.wins;
    }
    if (right.podiums !== left.podiums) {
      return right.podiums - left.podiums;
    }
    return (right.positions[1] ?? 0) - (left.positions[1] ?? 0);
  });
}
