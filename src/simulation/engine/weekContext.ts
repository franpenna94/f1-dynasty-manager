import { SeasonCalendar, SeasonWeek } from '../types/season';
import { EngineSeasonPhase, mapSeasonPhase } from './seasonPhase';

export interface WeekContext {
  weekIndex: number;
  totalWeeks: number;
  calendarWeek: SeasonWeek;
  phase: EngineSeasonPhase;
  isRaceWeek: boolean;
  raceRound?: number;
  raceName?: string;
  isSeasonEnd: boolean;
}

/**
 * Create context information about a specific week.
 */
export function getWeekContext(calendar: SeasonCalendar, weekIndex: number): WeekContext | null {
  if (weekIndex < 0 || weekIndex >= calendar.weeks.length) {
    return null;
  }

  const calendarWeek = calendar.weeks[weekIndex];
  const phase = mapSeasonPhase(calendarWeek.phase);
  const isRaceWeek = calendarWeek.raceId !== undefined;
  const isSeasonEnd = weekIndex >= calendar.weeks.length - 1;

  let raceRound: number | undefined;
  let raceName: string | undefined;

  if (isRaceWeek && calendarWeek.raceId) {
    const raceEvent = calendar.raceEvents.find((r) => r.raceId === calendarWeek.raceId);
    if (raceEvent) {
      raceRound = raceEvent.round;
      raceName = raceEvent.name;
    }
  }

  return {
    weekIndex,
    totalWeeks: calendar.weeks.length,
    calendarWeek,
    phase,
    isRaceWeek,
    raceRound,
    raceName,
    isSeasonEnd,
  };
}

/**
 * Check if we can advance to the next week.
 */
export function canAdvanceFromWeek(weekContext: WeekContext): boolean {
  // Can advance unless we're at the final week
  return !weekContext.isSeasonEnd;
}
