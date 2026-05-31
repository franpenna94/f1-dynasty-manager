import { CircuitId, RaceId, SeasonId } from './ids';

export type SeasonPhase = 'preseason' | 'season' | 'summer_break' | 'offseason';

export interface SeasonWeek {
  weekIndex: number;
  phase: SeasonPhase;
  raceId?: RaceId;
  raceName?: string;
  circuitId?: CircuitId;
  description?: string;
}

export interface RaceEvent {
  raceId: RaceId;
  round: number;
  name: string;
  scheduledWeek: number;
  circuitId: CircuitId;
}

export interface SeasonCalendar {
  seasonId: SeasonId;
  year: number;
  weeks: SeasonWeek[];
  raceEvents: RaceEvent[];
}
