import { SaveGame } from '../save/saveGame';
import { advanceWeek } from '../engine/advanceWeek';
import { SimulationReport, SimulationEvent } from '../engine/simulationResult';
import {
  SeasonSimulationResult,
  SeasonSummary,
  createSuccessSeasonResult,
  createErrorSeasonResult,
} from './seasonResult';

/**
 * Simulate an entire season by advancing weeks until season_complete.
 *
 * This is a pure function: same input produces same output.
 * Does not mutate the input save.
 *
 * @param save The initial SaveGame state
 * @returns SeasonSimulationResult with finalSave and summary if successful
 */
export function simulateSeason(save: SaveGame): SeasonSimulationResult {
  // Validate input save
  if (!save || !save.metadata || !save.currentSeason) {
    return createErrorSeasonResult(save, 'Invalid save game structure');
  }

  const startYear = save.currentSeason.year;
  const startWeekIndex = save.metadata.currentWeekIndex;
  const totalCalendarWeeks = save.currentSeason.calendar.weeks.length;

  let currentSave = save;
  let weeksAdvanced = 0;
  let raceWeekCount = 0;
  let nonRaceWeekCount = 0;

  const allReports: SimulationReport[] = [];
  const allEvents: SimulationEvent[] = [];

  // Advance weeks until season complete or error
  for (let iteration = 0; iteration < totalCalendarWeeks + 10; iteration++) {
    const result = advanceWeek(currentSave);

    // Collect reports and events
    allReports.push(...result.reports);
    allEvents.push(...result.events);

    // Track race weeks
    if (result.reports.some((r) => r.type === 'race_prep')) {
      raceWeekCount++;
    } else if (result.reports.some((r) => r.type !== 'season_summary')) {
      nonRaceWeekCount++;
    }

    // Check for season complete
    if (result.status === 'season_complete') {
      const endWeekIndex = currentSave.metadata.currentWeekIndex;

      const summary: SeasonSummary = {
        startYear,
        finalYear: currentSave.currentSeason.year,
        totalWeeksAdvanced: weeksAdvanced,
        startWeekIndex,
        endWeekIndex,
        totalCalendarWeeks,
        raceWeeksEncountered: raceWeekCount,
        nonRaceWeeksEncountered: nonRaceWeekCount,
      };

      return createSuccessSeasonResult(save, currentSave, summary, allReports, allEvents);
    }

    // Check for error
    if (result.status === 'error') {
      return createErrorSeasonResult(save, result.errorMessage || 'Unknown error during week advancement');
    }

    // Check for successful advancement
    if (result.status === 'success') {
      if (!result.nextSave) {
        return createErrorSeasonResult(save, 'No next save returned on successful week advancement');
      }
      currentSave = result.nextSave;
      weeksAdvanced++;
    }
  }

  // If we get here, something went wrong
  return createErrorSeasonResult(save, 'Season did not complete after maximum iterations');
}
