import { describe, expect, it } from 'vitest';
import { brandedId } from '../types/ids';
import { calculateConstructorStandings, calculateDriverStandings, getPointsForPosition, RaceResult } from './standings';

const driverA = brandedId<'DriverId'>('driver-A');
const driverB = brandedId<'DriverId'>('driver-B');
const constructorA = brandedId<'ConstructorId'>('constructor-A');
const constructorB = brandedId<'ConstructorId'>('constructor-B');
const race1 = brandedId<'RaceId'>('race-1');
const race2 = brandedId<'RaceId'>('race-2');

const results: RaceResult[] = [
  { raceId: race1, position: 1, driverId: driverA, constructorId: constructorA, finished: true },
  { raceId: race1, position: 2, driverId: driverB, constructorId: constructorB, finished: true },
  { raceId: race2, position: 1, driverId: driverB, constructorId: constructorB, finished: true },
  { raceId: race2, position: 3, driverId: driverA, constructorId: constructorA, finished: true },
];

describe('Championship standings', () => {
  it('assigns base points by position', () => {
    expect(getPointsForPosition(1)).toBe(25);
    expect(getPointsForPosition(2)).toBe(18);
    expect(getPointsForPosition(11)).toBe(0);
  });

  it('calculates driver standings and sorts by points', () => {
    const drivers = calculateDriverStandings(results);

    expect(drivers[0].driverId).toBe(driverB);
    expect(drivers[0].points).toBe(43);
    expect(drivers[1].points).toBe(40);
    expect(drivers[0].wins).toBe(1);
    expect(drivers[0].podiums).toBe(2);
  });

  it('calculates constructor standings and sorts by points', () => {
    const constructors = calculateConstructorStandings(results);

    expect(constructors[0].constructorId).toBe(constructorB);
    expect(constructors[0].points).toBe(43);
    expect(constructors[1].points).toBe(40);
  });
});
