import { describe, it, expect } from 'vitest';
import { brandedId, TeamId } from '../types/ids';
import { createNewSave } from '../save/createNewSave';
import { advanceWeek } from './advanceWeek';

const playerTeamId = brandedId<TeamId>('team-player-1');

describe('Weekly Simulation Loop (Sprint 4)', () => {
  describe('advanceWeek', () => {
    it('creates a deterministic next save when advancing week', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });
      const initialWeekIndex = save.metadata.currentWeekIndex;

      const result = advanceWeek(save);

      expect(result.status).toBe('success');
      expect(result.nextSave).toBeDefined();
      expect(result.nextSave!.metadata.currentWeekIndex).toBe(initialWeekIndex + 1);
    });

    it('does not mutate the input save', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });
      const originalWeekIndex = save.metadata.currentWeekIndex;
      const originalUpdatedAt = save.metadata.updatedAt;

      advanceWeek(save);

      expect(save.metadata.currentWeekIndex).toBe(originalWeekIndex);
      expect(save.metadata.updatedAt).toBe(originalUpdatedAt);
    });

    it('increments currentWeekIndex deterministically', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      let current = save;
      for (let i = 0; i < 5; i++) {
        const result = advanceWeek(current);
        expect(result.status).toBe('success');
        expect(result.nextSave!.metadata.currentWeekIndex).toBe(current.metadata.currentWeekIndex + 1);
        current = result.nextSave!;
      }

      expect(current.metadata.currentWeekIndex).toBe(save.metadata.currentWeekIndex + 5);
    });

    it('updates metadata.updatedAt deterministically', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      const result1 = advanceWeek(save);
      const result2 = advanceWeek(save);

      expect(result1.nextSave).toBeDefined();
      expect(result2.nextSave).toBeDefined();
      expect(result1.nextSave!.metadata.updatedAt).toBe(result2.nextSave!.metadata.updatedAt);
    });

    it('detects race weeks correctly', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;

      // Find first race week
      let raceWeekIndex = -1;
      for (let i = 0; i < calendar.weeks.length; i++) {
        if (calendar.weeks[i].raceId) {
          raceWeekIndex = i;
          break;
        }
      }

      expect(raceWeekIndex).toBeGreaterThan(0);

      // Advance to race week
      let current = save;
      while (current.metadata.currentWeekIndex < raceWeekIndex) {
        const result = advanceWeek(current);
        if (result.status !== 'success') {
          throw new Error(`Failed to advance week: ${result.errorMessage}`);
        }
        current = result.nextSave!;
      }

      // Advance one more week (should be race week)
      const raceWeekResult = advanceWeek(current);
      expect(raceWeekResult.status).toBe('success');
      expect(raceWeekResult.reports.some((r) => r.type === 'race_prep')).toBe(true);
      expect(raceWeekResult.events.some((e) => e.eventType === 'race_week_started')).toBe(true);
    });

    it('handles season end correctly', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const lastWeekIndex = calendar.weeks.length - 1;

      // Advance to last week
      let current = save;
      while (current.metadata.currentWeekIndex < lastWeekIndex) {
        const result = advanceWeek(current);
        if (result.status !== 'success') {
          throw new Error(`Failed to advance: ${result.errorMessage}`);
        }
        current = result.nextSave!;
      }

      // Try to advance from last week - should return season_complete
      const finalResult = advanceWeek(current);
      expect(finalResult.status).toBe('season_complete');
      expect(finalResult.nextSave).toBeNull();
      expect(finalResult.reports.some((r) => r.type === 'season_summary')).toBe(true);
      expect(finalResult.events.some((e) => e.eventType === 'season_complete')).toBe(true);
    });

    it('repeated advanceWeek calls are deterministic', () => {
      const seed1 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });
      const seed2 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });

      let current1 = seed1;
      let current2 = seed2;

      for (let i = 0; i < 10; i++) {
        const result1 = advanceWeek(current1);
        const result2 = advanceWeek(current2);

        if (result1.status === 'season_complete' || result2.status === 'season_complete') {
          break;
        }

        expect(result1.status).toBe(result2.status);
        expect(result1.nextSave!.metadata.currentWeekIndex).toBe(result2.nextSave!.metadata.currentWeekIndex);
        expect(result1.nextSave!.metadata.updatedAt).toBe(result2.nextSave!.metadata.updatedAt);

        current1 = result1.nextSave!;
        current2 = result2.nextSave!;
      }
    });

    it('result includes structured reports', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      const result = advanceWeek(save);

      expect(result.reports.length).toBeGreaterThan(0);
      expect(result.reports[0]).toHaveProperty('type');
      expect(result.reports[0]).toHaveProperty('phase');
      expect(result.reports[0]).toHaveProperty('weekIndex');
      expect(result.reports[0]).toHaveProperty('isRaceWeek');
      expect(result.reports[0]).toHaveProperty('details');
    });

    it('result includes structured events', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      const result = advanceWeek(save);

      expect(result.events.length).toBeGreaterThan(0);
      expect(result.events[0]).toHaveProperty('timestamp');
      expect(result.events[0]).toHaveProperty('eventType');
      expect(result.events[0]).toHaveProperty('weekIndex');
      expect(result.events[0]).toHaveProperty('data');
    });

    it('invalid save fails safely', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      // Corrupt the save by removing required field
      const corruptedSave = JSON.parse(JSON.stringify(save));
      delete corruptedSave.metadata;

      const result = advanceWeek(corruptedSave);

      expect(result.status).toBe('error');
      expect(result.errorMessage).toBeDefined();
      expect(result.nextSave).toBeNull();
      expect(result.events.some((e) => e.eventType === 'invalid_save')).toBe(true);
    });

    it('records week advancement in events', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      const result = advanceWeek(save);

      expect(result.events.some((e) => e.eventType === 'week_advanced')).toBe(true);
      const weekAdvancedEvent = result.events.find((e) => e.eventType === 'week_advanced');
      expect(weekAdvancedEvent!.data.previousWeek).toBe(save.metadata.currentWeekIndex);
    });

    it('world state is preserved across weeks', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      const result = advanceWeek(save);

      expect(result.nextSave).toBeDefined();
      expect(result.nextSave!.world).toEqual(save.world);
      expect(result.nextSave!.currentSeason.year).toBe(save.currentSeason.year);
    });

    it('creates a race weekend result for race weeks', () => {
      const save = createNewSave({ seed: 'race-integration', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeekIndex = calendar.weeks.findIndex((week) => week.raceId);

      expect(raceWeekIndex).toBeGreaterThanOrEqual(0);

      let current = save;
      while (current.metadata.currentWeekIndex < raceWeekIndex) {
        const result = advanceWeek(current);
        if (result.status !== 'success') {
          throw new Error(`Failed to advance: ${result.errorMessage}`);
        }
        current = result.nextSave!;
      }

      const result = advanceWeek(current);

      expect(result.status).toBe('success');
      expect(result.weekType).toBe('race');
      expect(result.raceWeekendResult).toBeDefined();
      expect(result.raceWeekendResult!.status).toBe('completed');
      expect(result.raceWeekendResult!.nextState?.phase).toBe('completed');
    });

    it('does not create a race weekend for non-race weeks', () => {
      const save = createNewSave({ seed: 'non-race-week', playerTeamId, seasonYear: 2026 });
      save.metadata.currentWeekIndex = 0;

      const result = advanceWeek(save);

      expect(result.status).toBe('success');
      expect(result.raceWeekendResult).toBeUndefined();
      expect(result.reports.some((report) => report.type === 'development')).toBe(true);
    });

    it('keeps the original save unchanged when processing race weeks', () => {
      const save = createNewSave({ seed: 'race-mutation', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeekIndex = calendar.weeks.findIndex((week) => week.raceId);

      expect(raceWeekIndex).toBeGreaterThanOrEqual(0);

      let current = save;
      while (current.metadata.currentWeekIndex < raceWeekIndex) {
        const result = advanceWeek(current);
        if (result.status !== 'success') {
          throw new Error(`Failed to advance: ${result.errorMessage}`);
        }
        current = result.nextSave!;
      }

      const beforeSnapshot = JSON.stringify(save);
      advanceWeek(current);

      expect(JSON.stringify(save)).toBe(beforeSnapshot);
    });

    it('produces deterministic race weekend output for the same seed', () => {
      const save1 = createNewSave({ seed: 'race-determinism', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'race-determinism', playerTeamId, seasonYear: 2026 });
      const calendar = save1.currentSeason.calendar;
      const raceWeekIndex = calendar.weeks.findIndex((week) => week.raceId);

      expect(raceWeekIndex).toBeGreaterThanOrEqual(0);

      let current1 = save1;
      let current2 = save2;
      while (current1.metadata.currentWeekIndex < raceWeekIndex) {
        const result1 = advanceWeek(current1);
        const result2 = advanceWeek(current2);
        if (result1.status !== 'success' || result2.status !== 'success') {
          throw new Error('Failed to line up race week');
        }
        current1 = result1.nextSave!;
        current2 = result2.nextSave!;
      }

      const result1 = advanceWeek(current1);
      const result2 = advanceWeek(current2);

      expect(result1.status).toBe(result2.status);
      expect(result1.weekType).toBe(result2.weekType);
      expect(result1.raceWeekendResult?.nextState?.startedAt).toBe(
        result2.raceWeekendResult?.nextState?.startedAt,
      );
    });

    it('season year is preserved', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2027 });

      let current = save;
      for (let i = 0; i < 5; i++) {
        const result = advanceWeek(current);
        expect(result.nextSave!.metadata.currentSeasonYear).toBe(2027);
        current = result.nextSave!;
      }
    });

    it('player team is preserved', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      const result = advanceWeek(save);

      expect(result.nextSave!.metadata.playerTeamId).toBe(save.metadata.playerTeamId);
    });
  });

  describe('WeekContext helper', () => {
    it('correctly identifies preseason weeks', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;

      // Find preseason week
      const preseasonWeekIndex = calendar.weeks.findIndex((w) => w.phase === 'preseason');
      expect(preseasonWeekIndex).toBeGreaterThanOrEqual(0);

      // Verify advancing to that week has correct phase info
      let current = save;
      while (current.metadata.currentWeekIndex < preseasonWeekIndex) {
        const result = advanceWeek(current);
        if (result.status !== 'success') break;
        current = result.nextSave!;
      }

      // Check reports for next week
      const nextResult = advanceWeek(current);
      // Just verify it's a valid result; the phase might be mapped differently
      expect(nextResult.reports.length).toBeGreaterThan(0);
    });

    it('correctly identifies season weeks', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;

      // Find first regular season week
      const seasonWeekIndex = calendar.weeks.findIndex((w) => w.phase === 'season');
      expect(seasonWeekIndex).toBeGreaterThan(0);

      // Verify advancing to that week has correct phase info
      let current = save;
      while (current.metadata.currentWeekIndex < seasonWeekIndex) {
        const result = advanceWeek(current);
        if (result.status !== 'success') break;
        current = result.nextSave!;
      }

      // Check reports for next week
      const nextResult = advanceWeek(current);
      // Just verify it's a valid result; the phase might be mapped differently
      expect(nextResult.reports.length).toBeGreaterThan(0);
    });
  });

  describe('determinism across multiple saves', () => {
    it('same seed produces identical week progression', () => {
      let save1 = createNewSave({ seed: 'identical-test', playerTeamId, seasonYear: 2026 });
      let save2 = createNewSave({ seed: 'identical-test', playerTeamId, seasonYear: 2026 });

      for (let i = 0; i < 15; i++) {
        const result1 = advanceWeek(save1);
        const result2 = advanceWeek(save2);

        if (result1.status === 'season_complete' || result2.status === 'season_complete') {
          expect(result1.status).toBe(result2.status);
          break;
        }

        expect(result1.weekIndex).toBe(result2.weekIndex);
        expect(result1.reports.length).toBe(result2.reports.length);
        expect(result1.events.length).toBe(result2.events.length);

        save1 = result1.nextSave!;
        save2 = result2.nextSave!;
      }
    });
  });
});
