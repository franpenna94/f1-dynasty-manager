import { SaveGame } from '../save/saveGame';
import { Driver } from '../domain/driver/driver';
import { DriverId, TeamId } from '../types/ids';
import { QualifyingClassificationEntry, QualifyingResult, QualifyingSessionResult } from './qualifyingResult';
import { simulateQualifyingSession } from './qualifyingSession';

function sortDrivers(drivers: Driver[]): Driver[] {
  return drivers.slice().sort((left, right) => left.id.localeCompare(right.id));
}

function buildStartingGrid(
  q1: QualifyingSessionResult,
  q2: QualifyingSessionResult,
  q3: QualifyingSessionResult,
  drivers: Driver[],
): QualifyingClassificationEntry[] {
  const driverLookup = new Map<DriverId, Driver>(drivers.map((driver) => [driver.id, driver]));
  const combinedEntries = [
    ...q3.classification,
    ...q2.classification.filter((entry) => entry.eliminated),
    ...q1.classification.filter((entry) => entry.eliminated),
  ];

  const resolvedEntries = combinedEntries
    .map((entry) => {
      const driver = driverLookup.get(entry.driverId);
      if (!driver) {
        return undefined;
      }

      return {
        ...entry,
        teamId: driver.teamId ?? ('' as TeamId),
      };
    })
    .filter((entry): entry is QualifyingClassificationEntry => entry !== undefined);

  return resolvedEntries.map((entry, index) => ({
    ...entry,
    position: index + 1,
  }));
}

export function simulateQualifying(save: SaveGame, weekIndex = save.metadata.currentWeekIndex): QualifyingResult {
  const drivers = sortDrivers(Object.values(save.world.world.drivers));
  const teams = save.world.world.teams;
  const sessionSeed = `${save.rng.seed}-${weekIndex}`;

  const q1 = simulateQualifyingSession(drivers, teams, 'Q1', `${sessionSeed}-q1`, 5, 45);
  const q2Drivers = drivers.filter((driver) => !q1.eliminatedDriverIds.includes(driver.id));
  const q2 = simulateQualifyingSession(q2Drivers, teams, 'Q2', `${sessionSeed}-q2`, 5, 60);
  const q3Drivers = q2Drivers.filter((driver) => !q2.eliminatedDriverIds.includes(driver.id));
  const q3 = simulateQualifyingSession(q3Drivers, teams, 'Q3', `${sessionSeed}-q3`, 0, 70);

  const classification = buildStartingGrid(q1, q2, q3, drivers);
  const startingGrid = classification.slice().sort((left, right) => left.position - right.position);
  const poleSitter = startingGrid[0];

  return {
    weekIndex,
    sessionResults: [q1, q2, q3],
    classification,
    poleSitter,
    startingGrid,
  };
}
