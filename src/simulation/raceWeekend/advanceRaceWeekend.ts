import { RaceWeekendState, RaceWeekendReport, validateRaceWeekendState } from './raceWeekendState';
import { RaceWeekendResult, createSuccessRaceWeekendResult, createCompletedRaceWeekendResult, createErrorRaceWeekendResult } from './raceWeekendResult';
import { getNextPhase, isRaceWeekendComplete } from './raceWeekendPhase';
import { createSeededRng } from '../rng/seededRng';

/**
 * Advance a race weekend to the next phase.
 *
 * This is a pure function: same input produces same output.
 * Does not mutate the input state.
 *
 * Phases advance: not_started → practice → qualifying → race → completed
 *
 * Each phase generates a report with deterministic but placeholder content.
 */
export function advanceRaceWeekend(state: RaceWeekendState): RaceWeekendResult {
  // Validate input state
  if (!validateRaceWeekendState(state)) {
    return createErrorRaceWeekendResult(state, 'Invalid race weekend state');
  }

  // Check if already completed
  if (isRaceWeekendComplete(state.phase)) {
    return createErrorRaceWeekendResult(state, 'Race weekend is already completed');
  }

  // Get next phase
  const nextPhase = getNextPhase(state.phase);
  if (!nextPhase) {
    return createErrorRaceWeekendResult(state, 'Cannot advance from current phase');
  }

  // Deep clone state to avoid mutation
  const newState = JSON.parse(JSON.stringify(state)) as RaceWeekendState;

  // Generate deterministic phase timestamp
  const rng = createSeededRng(state.startedAt + `-${nextPhase}`);
  const newPhaseStartedAtMs = 1600000000000 + Math.floor(rng.nextFloat() * 1000000000);
  const newPhaseStartedAt = new Date(newPhaseStartedAtMs).toISOString();

  newState.phase = nextPhase;
  newState.currentPhaseStartedAt = newPhaseStartedAt;

  // Generate reports for the phase
  const newReports: RaceWeekendReport[] = [];

  if (nextPhase === 'practice') {
    const practiceReport: RaceWeekendReport = {
      type: 'practice',
      details: {
        sessionCount: 3,
        teamSetups: newState.practiceData
          ? Object.entries(newState.practiceData.setupQualityByTeam).reduce(
              (acc, [teamId, setupQuality]) => {
                acc[teamId] = {
                  setupQuality,
                  driverFeedback: newState.practiceData?.driverFeedbackByDriver?.[teamId] ?? 50,
                };
                return acc;
              },
              {} as Record<string, { setupQuality: number; driverFeedback: number }>,
            )
          : {},
        description: 'Practice sessions completed with team setup work',
      },
    };
    newReports.push(practiceReport);
  } else if (nextPhase === 'qualifying') {
    // Generate provisional pole position deterministically
    const allTeamIds = Object.keys(newState.practiceData?.setupQualityByTeam ?? {});
    const poleTeamId = allTeamIds.length > 0 ? allTeamIds[0] : 'unknown';

    if (!newState.qualifyingData) {
      newState.qualifyingData = {
        qualifyingPositions: {},
        polePosition: poleTeamId,
      };

      // Assign deterministic qualifying positions
      for (let i = 0; i < allTeamIds.length; i++) {
        newState.qualifyingData.qualifyingPositions[allTeamIds[i]] = i + 1;
      }
    }

    const qualifyingReport: RaceWeekendReport = {
      type: 'qualifying',
      details: {
        provisionalPolePosition: poleTeamId,
        q1Cutoff: `Team ${allTeamIds[Math.floor(allTeamIds.length * 0.5)] ?? 'unknown'}`,
        q2Cutoff: `Team ${allTeamIds[Math.floor(allTeamIds.length * 0.25)] ?? 'unknown'}`,
        description: 'Qualifying sessions completed',
      },
    };
    newReports.push(qualifyingReport);
  } else if (nextPhase === 'race') {
    // Generate race data
    if (!newState.raceData) {
      const allTeamIds = Object.keys(newState.qualifyingData?.qualifyingPositions ?? {});

      newState.raceData = {
        gridPositions: newState.qualifyingData?.qualifyingPositions ?? {},
        raceResult: {
          winner: allTeamIds.length > 0 ? allTeamIds[0] : 'unknown',
          finishers: allTeamIds.slice(0, Math.min(10, allTeamIds.length)),
        },
      };
    }

    const raceReport: RaceWeekendReport = {
      type: 'race',
      details: {
        gridPositions: newState.raceData.gridPositions,
        winner: newState.raceData.raceResult?.winner ?? 'unknown',
        description: 'Race completed',
      },
    };
    newReports.push(raceReport);
  } else if (nextPhase === 'completed') {
    const completedReport: RaceWeekendReport = {
      type: 'weekend_completed',
      details: {
        totalDuration: '3 days',
        racesCompleted: 1,
        description: 'Race weekend concluded',
      },
    };
    newReports.push(completedReport);
  }

  // Add reports to state
  newState.reports.push(...newReports);

  // Return appropriate result
  if (isRaceWeekendComplete(nextPhase)) {
    return createCompletedRaceWeekendResult(state, newState, newReports);
  }

  return createSuccessRaceWeekendResult(state, newState, newReports);
}
