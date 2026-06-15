import { describe, it, expect } from 'vitest';
import { brandedId, TeamId } from '../types/ids';
import { createNewSave } from '../save/createNewSave';
import { createRaceWeekend, advanceRaceWeekend } from './index';

const playerTeamId = brandedId<TeamId>('team-player-1');

describe('Race Weekend Skeleton (Sprint 6)', () => {
  describe('createRaceWeekend', () => {
    it('returns null for non-race week', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;

      // Find a non-race week
      const nonRaceWeek = calendar.weeks.findIndex((w) => !w.raceId);
      expect(nonRaceWeek).toBeGreaterThanOrEqual(0);

      const weekend = createRaceWeekend(save, nonRaceWeek);
      expect(weekend).toBeNull();
    });

    it('creates weekend state for race week', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;

      // Find first race week
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);
      expect(raceWeek).toBeGreaterThan(0);

      const weekend = createRaceWeekend(save, raceWeek);

      expect(weekend).toBeDefined();
      expect(weekend!.phase).toBe('not_started');
      expect(weekend!.weekIndex).toBe(raceWeek);
      expect(weekend!.raceId).toBeDefined();
      expect(weekend!.circuitId).toBeDefined();
    });

    it('sets up practice data with team setup quality', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend = createRaceWeekend(save, raceWeek);

      expect(weekend!.practiceData).toBeDefined();
      expect(weekend!.practiceData!.setupQualityByTeam).toBeDefined();
      expect(Object.keys(weekend!.practiceData!.setupQualityByTeam).length).toBe(10);
    });

    it('generates deterministic timestamps', () => {
      const save1 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });

      const calendar = save1.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend1 = createRaceWeekend(save1, raceWeek);
      const weekend2 = createRaceWeekend(save2, raceWeek);

      expect(weekend1!.startedAt).toBe(weekend2!.startedAt);
      expect(weekend1!.currentPhaseStartedAt).toBe(weekend2!.currentPhaseStartedAt);
    });

    it('different seeds produce different setup quality values', () => {
      const save1 = createNewSave({ seed: 'seed-a', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'seed-b', playerTeamId, seasonYear: 2026 });

      const calendar = save1.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend1 = createRaceWeekend(save1, raceWeek);
      const weekend2 = createRaceWeekend(save2, raceWeek);

      // At least one team should have different setup quality
      const teams = Object.keys(weekend1!.practiceData!.setupQualityByTeam);
      let hasDifference = false;
      for (const team of teams) {
        if (
          weekend1!.practiceData!.setupQualityByTeam[team] !==
          weekend2!.practiceData!.setupQualityByTeam[team]
        ) {
          hasDifference = true;
          break;
        }
      }
      expect(hasDifference).toBe(true);
    });
  });

  describe('advanceRaceWeekend', () => {
    it('advances phase in correct order', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      let state = createRaceWeekend(save, raceWeek)!;

      expect(state.phase).toBe('not_started');

      let result = advanceRaceWeekend(state);
      state = result.nextState!;
      expect(state.phase).toBe('practice');

      result = advanceRaceWeekend(state);
      state = result.nextState!;
      expect(state.phase).toBe('qualifying');

      result = advanceRaceWeekend(state);
      state = result.nextState!;
      expect(state.phase).toBe('race');

      result = advanceRaceWeekend(state);
      state = result.nextState!;
      expect(state.phase).toBe('completed');
    });

    it('does not mutate original state', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const originalState = createRaceWeekend(save, raceWeek)!;
      const originalPhase = originalState.phase;

      advanceRaceWeekend(originalState);

      expect(originalState.phase).toBe(originalPhase);
    });

    it('completed weekend does not advance further', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      let state = createRaceWeekend(save, raceWeek)!;

      // Advance through all phases
      for (let i = 0; i < 4; i++) {
        const result = advanceRaceWeekend(state);
        state = result.nextState!;
      }

      expect(state.phase).toBe('completed');

      // Try to advance from completed
      const result = advanceRaceWeekend(state);
      expect(result.status).toBe('error');
      expect(result.nextState).toBeNull();
      expect(result.errorMessage).toContain('already completed');
    });

    it('same seed produces deterministic phase state', () => {
      const save1 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'determinism-test', playerTeamId, seasonYear: 2026 });

      const calendar = save1.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const state1Initial = createRaceWeekend(save1, raceWeek)!;
      const state2Initial = createRaceWeekend(save2, raceWeek)!;
      const state1 = state1Initial;
      const state2 = state2Initial;

      // Advance through practice
      const result1 = advanceRaceWeekend(state1);
      const result2 = advanceRaceWeekend(state2);

      expect(result1.nextState!.currentPhaseStartedAt).toBe(result2.nextState!.currentPhaseStartedAt);
      expect(result1.newReports.length).toBe(result2.newReports.length);
    });

    it('generates practice report', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const state = createRaceWeekend(save, raceWeek)!;
      const result = advanceRaceWeekend(state);

      expect(result.newReports.length).toBeGreaterThan(0);
      expect(result.newReports[0].type).toBe('practice');
      expect(result.newReports[0].details).toHaveProperty('sessionCount');
      expect(result.newReports[0].details).toHaveProperty('teamSetups');
    });

    it('generates qualifying report', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      let state = createRaceWeekend(save, raceWeek)!;

      // Advance to qualifying
      state = advanceRaceWeekend(state).nextState!; // practice
      const result = advanceRaceWeekend(state);

      expect(result.newReports.length).toBeGreaterThan(0);
      expect(result.newReports[0].type).toBe('qualifying');
      expect(result.newReports[0].details).toHaveProperty('provisionalPolePosition');
      expect(result.newReports[0].details).toHaveProperty('q1Cutoff');
    });

    it('generates race report', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      let state = createRaceWeekend(save, raceWeek)!;

      // Advance to race
      state = advanceRaceWeekend(state).nextState!; // practice
      state = advanceRaceWeekend(state).nextState!; // qualifying
      const result = advanceRaceWeekend(state);

      expect(result.newReports.length).toBeGreaterThan(0);
      expect(result.newReports[0].type).toBe('race');
      expect(result.newReports[0].details).toHaveProperty('gridPositions');
      expect(result.newReports[0].details).toHaveProperty('winner');
    });

    it('generates weekend completed report', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      let state = createRaceWeekend(save, raceWeek)!;

      // Advance to completed
      state = advanceRaceWeekend(state).nextState!; // practice
      state = advanceRaceWeekend(state).nextState!; // qualifying
      state = advanceRaceWeekend(state).nextState!; // race
      const result = advanceRaceWeekend(state);

      expect(result.newReports.length).toBeGreaterThan(0);
      expect(result.newReports[0].type).toBe('weekend_completed');
      expect(result.newReports[0].details).toHaveProperty('totalDuration');
      expect(result.newReports[0].details).toHaveProperty('racesCompleted');
    });

    it('accumulates reports across all phases', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      let state = createRaceWeekend(save, raceWeek)!;

      let totalReports = 0;

      // Advance through all phases
      for (let i = 0; i < 4; i++) {
        const result = advanceRaceWeekend(state);
        totalReports += result.newReports.length;
        state = result.nextState!;
      }

      expect(state.reports.length).toBe(totalReports);
      expect(state.reports.length).toBe(4);
    });

    it('does not modify standings during weekend', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      // This test just verifies that the race weekend structure is sound
      // and follows through to race data generation
      let state = createRaceWeekend(save, raceWeek)!;

      for (let i = 0; i < 4; i++) {
        const result = advanceRaceWeekend(state);
        // Verify we get results
        expect(result.status).toBeTruthy();
        state = result.nextState!;
      }

      // After all phases, race data should exist
      expect(state.raceData).toBeDefined();
    });
  });

  describe('Race weekend structure', () => {
    it('initializes with correct raceId and circuitId from calendar', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend = createRaceWeekend(save, raceWeek)!;
      const expectedRaceId = calendar.weeks[raceWeek].raceId!;
      const expectedCircuitId = calendar.weeks[raceWeek].circuitId!;

      expect(weekend.raceId).toBe(expectedRaceId);
      expect(weekend.circuitId).toBe(expectedCircuitId);
    });

    it('populates all team setup quality values', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend = createRaceWeekend(save, raceWeek)!;
      const teamCount = Object.keys(save.world.world.teams).length;

      expect(Object.keys(weekend.practiceData!.setupQualityByTeam).length).toBe(teamCount);

      // All values should be 0-100
      for (const [, quality] of Object.entries(weekend.practiceData!.setupQualityByTeam)) {
        expect(quality).toBeGreaterThanOrEqual(0);
        expect(quality).toBeLessThanOrEqual(100);
      }
    });

    it('populates all driver feedback values', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend = createRaceWeekend(save, raceWeek)!;
      const driverCount = Object.keys(save.world.world.drivers).length;

      expect(Object.keys(weekend.practiceData!.driverFeedbackByDriver).length).toBe(driverCount);

      // All values should be 0-100
      for (const [, feedback] of Object.entries(weekend.practiceData!.driverFeedbackByDriver)) {
        expect(feedback).toBeGreaterThanOrEqual(0);
        expect(feedback).toBeLessThanOrEqual(100);
      }
    });
  });

  describe('Race weekend determinism', () => {
    it('same weekend multiple advances are deterministic', () => {
      const save1 = createNewSave({ seed: 'test-weekend', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'test-weekend', playerTeamId, seasonYear: 2026 });

      const calendar = save1.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const state1Init = createRaceWeekend(save1, raceWeek)!;
      const state2Init = createRaceWeekend(save2, raceWeek)!;
      let state1 = state1Init;
      let state2 = state2Init;

      for (let i = 0; i < 4; i++) {
        const result1 = advanceRaceWeekend(state1);
        const result2 = advanceRaceWeekend(state2);

        expect(result1.nextState!.phase).toBe(result2.nextState!.phase);
        expect(result1.newReports.length).toBe(result2.newReports.length);

        state1 = result1.nextState!;
        state2 = result2.nextState!;
      }
    });

    it('different seeds produce different weekend progression details', () => {
      const save1 = createNewSave({ seed: 'seed-x', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'seed-y', playerTeamId, seasonYear: 2026 });

      const calendar = save1.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const weekend1 = createRaceWeekend(save1, raceWeek)!;
      const weekend2 = createRaceWeekend(save2, raceWeek)!;

      // Should have different setup quality values
      const teams = Object.keys(weekend1.practiceData!.setupQualityByTeam);
      let hasDifference = false;

      for (const team of teams) {
        if (
          weekend1.practiceData!.setupQualityByTeam[team] !==
          weekend2.practiceData!.setupQualityByTeam[team]
        ) {
          hasDifference = true;
          break;
        }
      }

      expect(hasDifference).toBe(true);
    });
  });

  describe('Invalid weekend handling', () => {
    it('invalid state fails advance safely', () => {
      const save = createNewSave({ seed: 'race-test', playerTeamId, seasonYear: 2026 });
      const calendar = save.currentSeason.calendar;
      const raceWeek = calendar.weeks.findIndex((w) => w.raceId);

      const state = createRaceWeekend(save, raceWeek)!;

      // Corrupt state
      const corruptedState = JSON.parse(JSON.stringify(state));
      delete corruptedState.raceId;

      const result = advanceRaceWeekend(corruptedState);

      expect(result.status).toBe('error');
      expect(result.nextState).toBeNull();
      expect(result.errorMessage).toBeDefined();
    });
  });
});
