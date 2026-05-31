import { describe, expect, it } from 'vitest';
import { generate12RaceSeasonCalendar } from './calendar';

describe('Season calendar generator', () => {
  it('builds a 12-race season calendar with phases', () => {
    const calendar = generate12RaceSeasonCalendar(2026);

    expect(calendar.year).toBe(2026);
    expect(calendar.raceEvents).toHaveLength(12);
    expect(calendar.weeks[0].phase).toBe('preseason');
    expect(calendar.weeks[6].phase).toBe('summer_break');
    expect(calendar.weeks[11].phase).toBe('summer_break');
    expect(calendar.weeks[17].phase).toBe('offseason');
    expect(calendar.raceEvents[0].scheduledWeek).toBe(3);
    expect(calendar.raceEvents[11].scheduledWeek).toBe(17);
  });
});
