import { SaveGame } from './saveGame';
import { validateSaveMetadata } from './saveMetadata';

export interface SaveValidationError {
  field: string;
  message: string;
}

/**
 * Comprehensive save validation returning detailed errors.
 */
export function validateSaveDetailed(save: SaveGame): SaveValidationError[] {
  const errors: SaveValidationError[] = [];

  // Validate metadata
  if (!save.metadata) {
    errors.push({ field: 'metadata', message: 'Missing metadata' });
  } else if (!validateSaveMetadata(save.metadata)) {
    errors.push({ field: 'metadata', message: 'Invalid metadata structure' });
  }

  // Validate world
  if (!save.world) {
    errors.push({ field: 'world', message: 'Missing world state' });
  } else {
    const teams = Object.keys(save.world.world.teams);
    const drivers = Object.keys(save.world.world.drivers);
    if (teams.length !== 10) {
      errors.push({ field: 'world.teams', message: `Expected 10 teams, got ${teams.length}` });
    }
    if (drivers.length !== 20) {
      errors.push({ field: 'world.drivers', message: `Expected 20 drivers, got ${drivers.length}` });
    }
  }

  // Validate current season
  if (!save.currentSeason) {
    errors.push({ field: 'currentSeason', message: 'Missing current season' });
  } else if (!save.currentSeason.calendar || !save.currentSeason.calendar.raceEvents) {
    errors.push({ field: 'currentSeason.calendar', message: 'Missing calendar or race events' });
  } else if (save.currentSeason.calendar.raceEvents.length !== 12) {
    errors.push({
      field: 'currentSeason.calendar',
      message: `Expected 12 race events, got ${save.currentSeason.calendar.raceEvents.length}`,
    });
  }

  // Validate history
  if (!save.history) {
    errors.push({ field: 'history', message: 'Missing history' });
  }

  // Validate temporary state
  if (!save.temporary) {
    errors.push({ field: 'temporary', message: 'Missing temporary state' });
  }

  // Validate rng state
  if (!save.rng) {
    errors.push({ field: 'rng', message: 'Missing rng state' });
  } else if (!save.rng.seed) {
    errors.push({ field: 'rng.seed', message: 'Missing seed' });
  }

  return errors;
}

/**
 * Check if a save is valid without detailed errors.
 */
export function isSaveValid(save: SaveGame): boolean {
  return validateSaveDetailed(save).length === 0;
}

const validateSaveExports = {
  validateSaveDetailed,
  isSaveValid,
};

export default validateSaveExports;
