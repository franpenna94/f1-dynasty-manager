import { RaceId, CircuitId } from '../types/ids';
import { RaceWeekendPhase } from './raceWeekendPhase';

export interface PracticeReport {
  type: 'practice';
  details: {
    sessionCount: number;
    teamSetups: Record<string, { setupQuality: number; driverFeedback: number }>;
    description: string;
  };
}

export interface QualifyingReport {
  type: 'qualifying';
  details: {
    provisionalPolePosition: string;
    q1Cutoff: string;
    q2Cutoff: string;
    description: string;
  };
}

export interface RaceReport {
  type: 'race';
  details: {
    gridPositions: Record<string, number>;
    winner: string;
    description: string;
  };
}

export interface WeekendCompletedReport {
  type: 'weekend_completed';
  details: {
    totalDuration: string;
    racesCompleted: number;
    description: string;
  };
}

export type RaceWeekendReport = PracticeReport | QualifyingReport | RaceReport | WeekendCompletedReport;

export interface RaceWeekendState {
  raceId: RaceId;
  circuitId: CircuitId;
  weekIndex: number;
  phase: RaceWeekendPhase;
  startedAt: string;
  currentPhaseStartedAt: string;
  reports: RaceWeekendReport[];
  practiceData?: {
    setupQualityByTeam: Record<string, number>;
    driverFeedbackByDriver: Record<string, number>;
  };
  qualifyingData?: {
    qualifyingPositions: Record<string, number>;
    polePosition: string;
  };
  raceData?: {
    gridPositions: Record<string, number>;
    raceResult?: {
      winner: string;
      finishers: string[];
    };
  };
}

export function validateRaceWeekendState(state: RaceWeekendState): boolean {
  if (!state.raceId) return false;
  if (!state.circuitId) return false;
  if (state.weekIndex < 0) return false;
  if (!state.phase) return false;
  if (!state.startedAt) return false;
  if (!state.currentPhaseStartedAt) return false;
  if (!Array.isArray(state.reports)) return false;
  return true;
}
