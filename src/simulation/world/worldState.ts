import { SeasonCalendar } from '../types/season';
import { Team } from '../domain/team/team';
import { Driver } from '../domain/driver/driver';
import { StaffMember } from '../domain/staff/staff';
import { Owner } from '../domain/owner/owner';
import { Circuit } from '../domain/circuit/circuit';

export interface WorldState {
  metadata: {
    saveId: string;
    seed: string;
    createdAt: string;
    currentSeasonYear: number;
    currentWeekIndex: number;
  };
  world: {
    teams: Record<string, Team>;
    drivers: Record<string, Driver>;
    staff: Record<string, StaffMember>;
    owners: Record<string, Owner>;
    circuits: Record<string, Circuit>;
  };
  currentSeason: {
    year: number;
    calendar: SeasonCalendar;
  };
}

export function validateNoDuplicateIds(arrays: Array<ReadonlyArray<{ id: string }>>): boolean {
  const seen = new Set<string>();
  for (const arr of arrays) {
    for (const item of arr) {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
    }
  }
  return true;
}
