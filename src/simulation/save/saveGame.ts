import { SaveMetadata } from './saveMetadata';
import { WorldState } from '../world/worldState';
import { SeasonCalendar } from '../types/season';

export interface HistoricalRecords {
  seasonSummaries: Array<{
    year: number;
    totalIncome: number;
    totalExpenses: number;
    endingCash: number;
  }>;
}

export interface TemporaryState {
  raceWeekendState?: Record<string, unknown>;
  decisions?: Record<string, unknown>;
}

export interface RngState {
  seed: string;
}

export interface SaveGame {
  metadata: SaveMetadata;
  world: WorldState;
  currentSeason: {
    year: number;
    calendar: SeasonCalendar;
  };
  history: HistoricalRecords;
  temporary: TemporaryState;
  rng: RngState;
}

export function validateSaveGame(save: SaveGame): boolean {
  if (!save.metadata) return false;
  if (!save.world) return false;
  if (!save.currentSeason) return false;
  if (!save.history) return false;
  if (!save.temporary) return false;
  if (!save.rng) return false;

  // Validate world has required teams/drivers
  const teams = Object.keys(save.world.world.teams);
  const drivers = Object.keys(save.world.world.drivers);
  if (teams.length !== 10) return false;
  if (drivers.length !== 20) return false;

  // Validate calendar
  if (!save.currentSeason.calendar.raceEvents || save.currentSeason.calendar.raceEvents.length !== 12) {
    return false;
  }

  return true;
}
