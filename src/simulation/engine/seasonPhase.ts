import { SeasonPhase } from '../types/season';

export type EngineSeasonPhase = 'preseason' | 'regular_season' | 'summer_break' | 'postseason' | 'offseason';

/**
 * Map from calendar SeasonPhase to engine EngineSeasonPhase.
 * Maps calendar phases to engine phases for consistency.
 */
export function mapSeasonPhase(calendarPhase: SeasonPhase): EngineSeasonPhase {
  switch (calendarPhase) {
    case 'preseason':
      return 'preseason';
    case 'season':
      return 'regular_season';
    case 'summer_break':
      return 'summer_break';
    case 'offseason':
      return 'postseason';
  }
}

/**
 * Determine if a given phase is competitive (races can occur).
 */
export function isCompetitivePhase(phase: EngineSeasonPhase): boolean {
  return phase === 'regular_season';
}

/**
 * Determine if a given phase allows development activities.
 */
export function isDevelopmentPhase(phase: EngineSeasonPhase): boolean {
  return phase === 'preseason' || phase === 'regular_season' || phase === 'postseason' || phase === 'offseason';
}
