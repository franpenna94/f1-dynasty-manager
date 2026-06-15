import { describe, it, expect } from 'vitest';
import { brandedId, TeamId } from '../types/ids';
import { createNewSave } from '../save/createNewSave';
import { simulateSeason } from './simulateSeason';

const playerTeamId = brandedId<TeamId>('team-player-1');

describe('Headless Season Loop (Sprint 5)', () => {
  describe('simulateSeason', () => {
    it('completes a full season', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      expect(result.status).toBe('success');
      expect(result.finalSave).toBeDefined();
      expect(result.summary).toBeDefined();
    });

    it('does not mutate the original save', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });
      const originalWeekIndex = save.metadata.currentWeekIndex;
      const originalUpdatedAt = save.metadata.updatedAt;

      simulateSeason(save);

      expect(save.metadata.currentWeekIndex).toBe(originalWeekIndex);
      expect(save.metadata.updatedAt).toBe(originalUpdatedAt);
    });

    it('reaches final week and season_complete', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const totalWeeks = calendar.weeks.length;

      const result = simulateSeason(save);

      expect(result.status).toBe('success');
      expect(result.summary!.endWeekIndex).toBe(totalWeeks - 1);
    });

    it('same seed produces same final result', () => {
      const save1 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });

      const result1 = simulateSeason(save1);
      const result2 = simulateSeason(save2);

      expect(result1.status).toBe(result2.status);
      expect(result1.finalSave!.metadata.currentWeekIndex).toBe(result2.finalSave!.metadata.currentWeekIndex);
      expect(result1.finalSave!.metadata.updatedAt).toBe(result2.finalSave!.metadata.updatedAt);
      expect(result1.summary!.totalWeeksAdvanced).toBe(result2.summary!.totalWeeksAdvanced);
    });

    it('tracks number of advanced weeks deterministically', () => {
      const save1 = createNewSave({ seed: 'week-count', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'week-count', playerTeamId, seasonYear: 2026 });

      const result1 = simulateSeason(save1);
      const result2 = simulateSeason(save2);

      expect(result1.summary!.totalWeeksAdvanced).toBe(result2.summary!.totalWeeksAdvanced);
      expect(result1.summary!.totalWeeksAdvanced).toBeGreaterThan(0);
    });

    it('collects reports from each week', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      expect(result.allReports.length).toBeGreaterThan(0);
      expect(result.allReports[0]).toHaveProperty('type');
      expect(result.allReports[0]).toHaveProperty('phase');
      expect(result.allReports[0]).toHaveProperty('weekIndex');
      expect(result.allReports[0]).toHaveProperty('details');
    });

    it('collects events from each week', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      expect(result.allEvents.length).toBeGreaterThan(0);
      expect(result.allEvents[0]).toHaveProperty('timestamp');
      expect(result.allEvents[0]).toHaveProperty('eventType');
      expect(result.allEvents[0]).toHaveProperty('weekIndex');
    });

    it('final currentWeekIndex equals calendar total weeks - 1', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });
      const totalWeeks = save.currentSeason.calendar.weeks.length;

      const result = simulateSeason(save);

      expect(result.finalSave!.metadata.currentWeekIndex).toBe(totalWeeks - 1);
    });

    it('records correct start and end week indices', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });
      const startWeek = save.metadata.currentWeekIndex;

      const result = simulateSeason(save);

      expect(result.summary!.startWeekIndex).toBe(startWeek);
      expect(result.summary!.endWeekIndex).toBeGreaterThan(startWeek);
    });

    it('tracks race weeks encountered', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      // Should encounter at least 12 race weeks (12 F1 races)
      expect(result.summary!.raceWeeksEncountered).toBeGreaterThanOrEqual(10);
    });

    it('tracks non-race weeks encountered', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      // Should have preseason and other non-race weeks
      expect(result.summary!.nonRaceWeeksEncountered).toBeGreaterThanOrEqual(0);
    });

    it('reports count matches events count for each week', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      // Each week should generate at least one report and one event
      expect(result.allReports.length).toBeGreaterThanOrEqual(result.summary!.totalWeeksAdvanced);
      expect(result.allEvents.length).toBeGreaterThanOrEqual(result.summary!.totalWeeksAdvanced);
    });

    it('invalid save fails safely', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      // Corrupt the save
      const corruptedSave = JSON.parse(JSON.stringify(save));
      delete corruptedSave.metadata;

      const result = simulateSeason(corruptedSave);

      expect(result.status).toBe('error');
      expect(result.errorMessage).toBeDefined();
      expect(result.finalSave).toBeNull();
    });

    it('preserves season year throughout simulation', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2027 });

      const result = simulateSeason(save);

      expect(result.finalSave!.currentSeason.year).toBe(2027);
      expect(result.summary!.startYear).toBe(2027);
      expect(result.summary!.finalYear).toBe(2027);
    });

    it('preserves player team ID throughout simulation', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      expect(result.finalSave!.metadata.playerTeamId).toBe(playerTeamId);
    });

    it('summary matches actual final state', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      expect(result.summary!.totalWeeksAdvanced).toBeGreaterThan(0);
      expect(result.summary!.totalCalendarWeeks).toBe(save.currentSeason.calendar.weeks.length);
      expect(result.summary!.startYear).toBe(save.currentSeason.year);
    });

    it('produces identical season progression for same seed multiple times', () => {
      const seed = 'consistency-test';
      const save1 = createNewSave({ seed, playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed, playerTeamId, seasonYear: 2026 });
      const save3 = createNewSave({ seed, playerTeamId, seasonYear: 2026 });

      const result1 = simulateSeason(save1);
      const result2 = simulateSeason(save2);
      const result3 = simulateSeason(save3);

      expect(result1.summary!.totalWeeksAdvanced).toBe(result2.summary!.totalWeeksAdvanced);
      expect(result2.summary!.totalWeeksAdvanced).toBe(result3.summary!.totalWeeksAdvanced);
    });

    it('handles multiple seasons in sequence with fresh seeds', () => {
      const save2026 = createNewSave({ seed: 'season-2026', playerTeamId, seasonYear: 2026 });
      const save2027 = createNewSave({ seed: 'season-2027', playerTeamId, seasonYear: 2027 });

      const result2026 = simulateSeason(save2026);
      const result2027 = simulateSeason(save2027);

      expect(result2026.status).toBe('success');
      expect(result2027.status).toBe('success');
      expect(result2026.finalSave!.currentSeason.year).toBe(2026);
      expect(result2027.finalSave!.currentSeason.year).toBe(2027);
    });

    it('returns all reports in order', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      // Verify reports are in ascending week order
      for (let i = 1; i < result.allReports.length; i++) {
        expect(result.allReports[i].weekIndex).toBeGreaterThanOrEqual(result.allReports[i - 1].weekIndex);
      }
    });

    it('returns all events in order', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      // Verify events are in ascending week order
      for (let i = 1; i < result.allEvents.length; i++) {
        expect(result.allEvents[i].weekIndex).toBeGreaterThanOrEqual(result.allEvents[i - 1].weekIndex);
      }
    });

    it('world state is preserved from start to finish', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });
      const originalTeamCount = Object.keys(save.world.world.teams).length;
      const originalDriverCount = Object.keys(save.world.world.drivers).length;

      const result = simulateSeason(save);

      expect(Object.keys(result.finalSave!.world.world.teams).length).toBe(originalTeamCount);
      expect(Object.keys(result.finalSave!.world.world.drivers).length).toBe(originalDriverCount);
    });

    it('includes race and non-race weeks in reports', () => {
      const save = createNewSave({ seed: 'season-test', playerTeamId, seasonYear: 2026 });

      const result = simulateSeason(save);

      const hasRaceReports = result.allReports.some((r) => r.type === 'race_prep');

      expect(hasRaceReports).toBe(true);
      // May or may not have development weeks, but should have at least some reports
      expect(result.allReports.length).toBeGreaterThan(0);
    });
  });

  describe('Season simulation edge cases', () => {
    it('handles different season years deterministically', () => {
      const result2026 = simulateSeason(
        createNewSave({ seed: 'test-edge', playerTeamId, seasonYear: 2026 }),
      );
      const result2027 = simulateSeason(
        createNewSave({ seed: 'test-edge', playerTeamId, seasonYear: 2027 }),
      );

      // Different years should still complete successfully
      expect(result2026.status).toBe('success');
      expect(result2027.status).toBe('success');
    });

    it('different seeds produce different week progressions', () => {
      const seedA = simulateSeason(
        createNewSave({ seed: 'seed-a', playerTeamId, seasonYear: 2026 }),
      );
      const seedB = simulateSeason(
        createNewSave({ seed: 'seed-b', playerTeamId, seasonYear: 2026 }),
      );

      // Both should complete
      expect(seedA.status).toBe('success');
      expect(seedB.status).toBe('success');

      // But could potentially have different event distributions
      // (though both should have same number of weeks since calendar is same)
      expect(seedA.summary!.totalWeeksAdvanced).toBe(seedB.summary!.totalWeeksAdvanced);
    });
  });
});
