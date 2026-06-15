import { RaceWeekendState, RaceWeekendReport } from './raceWeekendState';

export type RaceWeekendResultStatus = 'success' | 'completed' | 'error';

export interface RaceWeekendResult {
  status: RaceWeekendResultStatus;
  previousState: RaceWeekendState;
  nextState: RaceWeekendState | null;
  newReports: RaceWeekendReport[];
  errorMessage?: string;
}

/**
 * Create a successful phase advancement result.
 */
export function createSuccessRaceWeekendResult(
  previousState: RaceWeekendState,
  nextState: RaceWeekendState,
  newReports: RaceWeekendReport[] = [],
): RaceWeekendResult {
  return {
    status: 'success',
    previousState,
    nextState,
    newReports,
  };
}

/**
 * Create a race weekend completed result.
 */
export function createCompletedRaceWeekendResult(
  previousState: RaceWeekendState,
  finalState: RaceWeekendState,
  newReports: RaceWeekendReport[] = [],
): RaceWeekendResult {
  return {
    status: 'completed',
    previousState,
    nextState: finalState,
    newReports,
  };
}

/**
 * Create an error result.
 */
export function createErrorRaceWeekendResult(
  previousState: RaceWeekendState,
  errorMessage: string,
): RaceWeekendResult {
  return {
    status: 'error',
    previousState,
    nextState: null,
    newReports: [],
    errorMessage,
  };
}
