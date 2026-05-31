import { SeasonCalendar } from '../../types/season';

export interface Season {
  calendar: SeasonCalendar;
}

export function validateSeason(s: Season): boolean {
  if (!s.calendar) return false;
  if (!Array.isArray(s.calendar.weeks)) return false;
  return s.calendar.raceEvents.length === 12;
}
