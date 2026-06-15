import { SaveGame } from '../save/saveGame';
import { SimulationReport, SimulationEvent } from '../engine/simulationResult';

export type SeasonSimulationStatus = 'success' | 'error';

export interface SeasonSummary {
  startYear: number;
  finalYear: number;
  totalWeeksAdvanced: number;
  startWeekIndex: number;
  endWeekIndex: number;
  totalCalendarWeeks: number;
  raceWeeksEncountered: number;
  nonRaceWeeksEncountered: number;
}

export interface SeasonSimulationResult {
  status: SeasonSimulationStatus;
  originalSave: SaveGame;
  finalSave: SaveGame | null;
  summary: SeasonSummary | null;
  allReports: SimulationReport[];
  allEvents: SimulationEvent[];
  errorMessage?: string;
}

/**
 * Create a successful season simulation result.
 */
export function createSuccessSeasonResult(
  originalSave: SaveGame,
  finalSave: SaveGame,
  summary: SeasonSummary,
  reports: SimulationReport[] = [],
  events: SimulationEvent[] = [],
): SeasonSimulationResult {
  return {
    status: 'success',
    originalSave,
    finalSave,
    summary,
    allReports: reports,
    allEvents: events,
  };
}

/**
 * Create an error season simulation result.
 */
export function createErrorSeasonResult(
  originalSave: SaveGame,
  errorMessage: string,
): SeasonSimulationResult {
  return {
    status: 'error',
    originalSave,
    finalSave: null,
    summary: null,
    allReports: [],
    allEvents: [],
    errorMessage,
  };
}
