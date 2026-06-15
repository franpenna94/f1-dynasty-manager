import { SaveGame } from '../save/saveGame';
import { EngineSeasonPhase } from './seasonPhase';

export type SimulationResultStatus = 'success' | 'season_complete' | 'error';

export interface SimulationReport {
  type: 'race_prep' | 'development' | 'break' | 'offseason' | 'race_result' | 'season_summary';
  phase: EngineSeasonPhase;
  weekIndex: number;
  isRaceWeek: boolean;
  details: Record<string, unknown>;
}

export interface SimulationEvent {
  timestamp: string;
  eventType: 'week_advanced' | 'race_week_started' | 'season_complete' | 'invalid_save';
  weekIndex: number;
  data: Record<string, unknown>;
}

export interface SimulationResult {
  status: SimulationResultStatus;
  previousSave: SaveGame;
  nextSave: SaveGame | null;
  weekIndex: number;
  weeksCompleted: number;
  reports: SimulationReport[];
  events: SimulationEvent[];
  errorMessage?: string;
  seasonEndReason?: 'final_week_reached' | 'invalid_state';
}

/**
 * Create a successful week advancement result.
 */
export function createSuccessResult(
  previousSave: SaveGame,
  nextSave: SaveGame,
  weekIndex: number,
  reports: SimulationReport[] = [],
  events: SimulationEvent[] = [],
): SimulationResult {
  return {
    status: 'success',
    previousSave,
    nextSave,
    weekIndex,
    weeksCompleted: 1,
    reports,
    events,
  };
}

/**
 * Create a season complete result.
 */
export function createSeasonCompleteResult(
  previousSave: SaveGame,
  weekIndex: number,
  reports: SimulationReport[] = [],
  events: SimulationEvent[] = [],
): SimulationResult {
  return {
    status: 'season_complete',
    previousSave,
    nextSave: null,
    weekIndex,
    weeksCompleted: 0,
    reports,
    events,
    seasonEndReason: 'final_week_reached',
  };
}

/**
 * Create an error result.
 */
export function createErrorResult(
  previousSave: SaveGame,
  errorMessage: string,
): SimulationResult {
  const weekIndex = previousSave?.metadata?.currentWeekIndex ?? 0;
  return {
    status: 'error',
    previousSave,
    nextSave: null,
    weekIndex,
    weeksCompleted: 0,
    reports: [],
    events: [
      {
        timestamp: new Date().toISOString(),
        eventType: 'invalid_save',
        weekIndex,
        data: { error: errorMessage },
      },
    ],
    errorMessage,
    seasonEndReason: 'invalid_state',
  };
}
