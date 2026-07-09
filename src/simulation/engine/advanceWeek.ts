import { SaveGame, validateSaveGame } from '../save/saveGame';
import { SimulationResult, SimulationWeekType, createSuccessResult, createSeasonCompleteResult, createErrorResult, SimulationReport, SimulationEvent } from './simulationResult';
import { getWeekContext, canAdvanceFromWeek } from './weekContext';
import { createSeededRng } from '../rng/seededRng';
import { createRaceWeekend } from '../raceWeekend/createRaceWeekend';
import { advanceRaceWeekend } from '../raceWeekend/advanceRaceWeekend';
import { RaceWeekendResult } from '../raceWeekend/raceWeekendResult';

/**
 * Advance the simulation by one week.
 *
 * This is a pure function: same input produces same output.
 * It does not mutate the input save.
 *
 * @param save The current SaveGame state
 * @returns SimulationResult with nextSave if successful, or error details
 */
export function advanceWeek(save: SaveGame): SimulationResult {
  // Validate input save
  if (!validateSaveGame(save)) {
    return createErrorResult(save, 'Invalid save game structure');
  }

  const currentWeekIndex = save.metadata.currentWeekIndex;
  const calendar = save.currentSeason.calendar;
  const weekContext = getWeekContext(calendar, currentWeekIndex);

  // Check if week is valid
  if (!weekContext) {
    return createErrorResult(save, `Invalid week index: ${currentWeekIndex}`);
  }

  // Check if we're at season end
  if (!canAdvanceFromWeek(weekContext)) {
    const reports: SimulationReport[] = [
      {
        type: 'season_summary',
        phase: weekContext.phase,
        weekIndex: currentWeekIndex,
        isRaceWeek: false,
        details: {
          seasonYear: save.currentSeason.year,
          totalWeeks: calendar.weeks.length,
          seasonEndedAt: currentWeekIndex,
        },
      },
    ];

    const events: SimulationEvent[] = [
      {
        timestamp: new Date().toISOString(),
        eventType: 'season_complete',
        weekIndex: currentWeekIndex,
        data: {
          seasonYear: save.currentSeason.year,
          message: 'Season has ended',
        },
      },
    ];

    const weekType: SimulationWeekType = weekContext.isRaceWeek ? 'race' : 'development';
    return createSeasonCompleteResult(save, currentWeekIndex, reports, events, weekType);
  }

  // Deep clone the save to avoid mutation
  const nextSave = JSON.parse(JSON.stringify(save)) as SaveGame;

  // Increment week index
  const nextWeekIndex = currentWeekIndex + 1;
  nextSave.metadata.currentWeekIndex = nextWeekIndex;

  // Deterministically update updatedAt using seeded RNG
  const weekRng = createSeededRng(save.rng.seed + `-week-${nextWeekIndex}`);
  const updatedAtMs = 1600000000000 + Math.floor(weekRng.nextFloat() * 1000000000);
  const updatedAt = new Date(updatedAtMs).toISOString();
  nextSave.metadata.updatedAt = updatedAt;

  // Get context for the next week
  const nextWeekContext = getWeekContext(calendar, nextWeekIndex);
  if (!nextWeekContext) {
    return createErrorResult(save, `Failed to get context for week ${nextWeekIndex}`);
  }

  // Generate reports based on week context
  const reports: SimulationReport[] = [];
  const events: SimulationEvent[] = [];
  const weekType: SimulationWeekType = nextWeekContext.isRaceWeek ? 'race' : 'development';
  let raceWeekendResult: RaceWeekendResult | undefined;

  if (nextWeekContext.isRaceWeek) {
    reports.push({
      type: 'race_prep',
      phase: nextWeekContext.phase,
      weekIndex: nextWeekIndex,
      isRaceWeek: true,
      details: {
        raceRound: nextWeekContext.raceRound,
        raceName: nextWeekContext.raceName,
        circuitId: nextWeekContext.calendarWeek.circuitId,
      },
    });

    events.push({
      timestamp: updatedAt,
      eventType: 'race_week_started',
      weekIndex: nextWeekIndex,
      data: {
        raceRound: nextWeekContext.raceRound,
        raceName: nextWeekContext.raceName,
        message: `Race weekend for ${nextWeekContext.raceName} begins`,
      },
    });

    const raceWeekendState = createRaceWeekend(nextSave, nextWeekIndex);
    if (raceWeekendState) {
      let currentWeekendState = raceWeekendState;
      while (currentWeekendState.phase !== 'completed') {
        const weekendResult = advanceRaceWeekend(currentWeekendState);
        if (weekendResult.status === 'error' || !weekendResult.nextState) {
          break;
        }
        raceWeekendResult = weekendResult;
        currentWeekendState = weekendResult.nextState;
      }
    }
  } else {
    reports.push({
      type: 'development',
      phase: nextWeekContext.phase,
      weekIndex: nextWeekIndex,
      isRaceWeek: false,
      details: {
        phase: nextWeekContext.phase,
        description: `Regular ${nextWeekContext.phase} week`,
      },
    });
  }

  // Always log week advancement
  events.push({
    timestamp: updatedAt,
    eventType: 'week_advanced',
    weekIndex: nextWeekIndex,
    data: {
      previousWeek: currentWeekIndex,
      phase: nextWeekContext.phase,
    },
  });

  return createSuccessResult(save, nextSave, nextWeekIndex, reports, events, weekType, raceWeekendResult);
}
