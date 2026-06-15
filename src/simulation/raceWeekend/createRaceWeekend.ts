import { SaveGame } from '../save/saveGame';
import { RaceWeekendState, validateRaceWeekendState } from './raceWeekendState';
import { getWeekContext } from '../engine/weekContext';
import { createSeededRng } from '../rng/seededRng';

/**
 * Create a race weekend state for a given week if it's a race week.
 *
 * Returns null if the week is not a race week.
 */
export function createRaceWeekend(save: SaveGame, weekIndex: number): RaceWeekendState | null {
  const calendar = save.currentSeason.calendar;
  const weekContext = getWeekContext(calendar, weekIndex);

  // Check if valid week
  if (!weekContext) {
    return null;
  }

  // Check if race week
  if (!weekContext.isRaceWeek || !weekContext.calendarWeek.raceId || !weekContext.calendarWeek.circuitId) {
    return null;
  }

  // Generate deterministic timestamps using seeded RNG
  const rng = createSeededRng(save.rng.seed + `-race-${weekIndex}`);
  const startedAtMs = 1600000000000 + Math.floor(rng.nextFloat() * 1000000000);
  const startedAt = new Date(startedAtMs).toISOString();
  const currentPhaseStartedAtMs = startedAtMs + Math.floor(rng.nextFloat() * 3600000); // up to 1 hour later
  const currentPhaseStartedAt = new Date(currentPhaseStartedAtMs).toISOString();

  // Initialize setup quality for teams (deterministic)
  const setupQualityByTeam: Record<string, number> = {};
  for (const teamId of Object.keys(save.world.world.teams)) {
    setupQualityByTeam[teamId] = Math.floor(rng.nextFloat() * 100);
  }

  const driverFeedbackByDriver: Record<string, number> = {};
  for (const driverId of Object.keys(save.world.world.drivers)) {
    driverFeedbackByDriver[driverId] = Math.floor(rng.nextFloat() * 100);
  }

  const state: RaceWeekendState = {
    raceId: weekContext.calendarWeek.raceId,
    circuitId: weekContext.calendarWeek.circuitId,
    weekIndex,
    phase: 'not_started',
    startedAt,
    currentPhaseStartedAt,
    reports: [],
    practiceData: {
      setupQualityByTeam,
      driverFeedbackByDriver,
    },
  };

  if (!validateRaceWeekendState(state)) {
    return null;
  }

  return state;
}
