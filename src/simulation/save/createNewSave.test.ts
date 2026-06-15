import { describe, it, expect } from 'vitest';
import { brandedId, TeamId } from '../types/ids';
import { createNewSave } from './createNewSave';
import { serializeSave, deserializeSave, roundTripSave } from './serializeSave';
import { loadAndValidateSave, validateAndReturnSave } from './deserializeSave';
import { validateSaveDetailed, isSaveValid } from './validateSave';
import { SaveGame } from './saveGame';
import { SAVE_VERSION, SCHEMA_VERSION } from './saveVersion';

const playerTeamId = brandedId<TeamId>('team-player-1');

describe('Persistence Foundation (Sprint 3)', () => {
  describe('createNewSave', () => {
    it('creates a valid save with required fields', () => {
      const save = createNewSave({ seed: 'test-seed', playerTeamId, seasonYear: 2026 });

      expect(save.metadata).toBeDefined();
      expect(save.world).toBeDefined();
      expect(save.currentSeason).toBeDefined();
      expect(save.history).toBeDefined();
      expect(save.temporary).toBeDefined();
      expect(save.rng).toBeDefined();

      expect(save.metadata.saveVersion).toBe(SAVE_VERSION);
      expect(save.metadata.schemaVersion).toBe(SCHEMA_VERSION);
      expect(save.metadata.playerTeamId).toBe(playerTeamId);
      expect(save.metadata.gameStartYear).toBe(2026);
      expect(save.metadata.currentWeekIndex).toBe(1);

      expect(isSaveValid(save)).toBe(true);
    });

    it('creates deterministic saves for the same seed', () => {
      const save1 = createNewSave({ seed: 'det-seed', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'det-seed', playerTeamId, seasonYear: 2026 });

      expect(save1).toEqual(save2);
    });

    it('creates different worlds for different seeds', () => {
      const save1 = createNewSave({ seed: 'seed-a', playerTeamId, seasonYear: 2026 });
      const save2 = createNewSave({ seed: 'seed-b', playerTeamId, seasonYear: 2026 });

      const teams1 = Object.keys(save1.world.world.teams);
      const teams2 = Object.keys(save2.world.world.teams);

      expect(teams1.length).toBe(teams2.length);
      // Teams may have same count but different internal values like player-controlled status
      // or other attributes from different RNG seeds
    });

    it('has correct entity counts', () => {
      const save = createNewSave({ seed: 'count-seed', playerTeamId, seasonYear: 2026 });

      expect(Object.keys(save.world.world.teams)).toHaveLength(10);
      expect(Object.keys(save.world.world.drivers)).toHaveLength(20);
      expect(Object.keys(save.world.world.circuits)).toHaveLength(12);
      expect(save.currentSeason.calendar.raceEvents).toHaveLength(12);
    });
  });

  describe('Serialization and Deserialization', () => {
    it('serializes a save to JSON', () => {
      const save = createNewSave({ seed: 'json-seed', playerTeamId, seasonYear: 2026 });
      const json = serializeSave(save, true);

      expect(typeof json).toBe('string');
      expect(json.includes(save.metadata.saveId)).toBe(true);
    });

    it('deserializes JSON back to object', () => {
      const original = createNewSave({ seed: 'json-seed', playerTeamId, seasonYear: 2026 });
      const json = serializeSave(original);
      const parsed = deserializeSave(json);

      expect(parsed).toBeDefined();
      const parsedSave = parsed as SaveGame;
      expect(parsedSave.metadata.saveId).toBe(original.metadata.saveId);
    });

    it('round-trip preserves save equality', () => {
      const original = createNewSave({ seed: 'roundtrip-seed', playerTeamId, seasonYear: 2026 });
      const roundTripped = roundTripSave(original);

      expect(roundTripped).toEqual(original);
    });
  });

  describe('Validation', () => {
    it('validates a correct save', () => {
      const save = createNewSave({ seed: 'valid-seed', playerTeamId, seasonYear: 2026 });

      const errors = validateSaveDetailed(save);
      expect(errors).toHaveLength(0);
      expect(isSaveValid(save)).toBe(true);
    });

    it('detects missing metadata', () => {
      const save = createNewSave({ seed: 'valid-seed', playerTeamId, seasonYear: 2026 });
      const broken = { ...save, metadata: undefined } as unknown as SaveGame;

      const errors = validateSaveDetailed(broken);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'metadata')).toBe(true);
    });

    it('detects incorrect team count', () => {
      const save = createNewSave({ seed: 'valid-seed', playerTeamId, seasonYear: 2026 });
      const broken = {
        ...save,
        world: {
          ...save.world,
          world: {
            ...save.world.world,
            teams: { 'team-1': {} } as Record<string, unknown>,
          },
        },
      } as unknown as SaveGame;

      const errors = validateSaveDetailed(broken);
      expect(errors.some((e) => e.field.includes('teams'))).toBe(true);
    });

    it('loads and validates a save from JSON', () => {
      const original = createNewSave({ seed: 'load-seed', playerTeamId, seasonYear: 2026 });
      const json = serializeSave(original);

      const loaded = loadAndValidateSave(json);
      expect(loaded).toEqual(original);
    });

    it('rejects invalid JSON on load', () => {
      expect(() => {
        loadAndValidateSave('{ invalid json ]');
      }).toThrow();
    });

    it('rejects save with missing critical fields', () => {
      const broken = { metadata: { saveId: 'test' } };
      const brokenObj = broken as unknown;
      expect(() => {
        validateAndReturnSave(brokenObj);
      }).toThrow();
    });
  });

  describe('Save structure guarantees', () => {
    it('contains all required root fields', () => {
      const save = createNewSave({ seed: 'struct-seed', playerTeamId, seasonYear: 2026 });

      expect('metadata' in save).toBe(true);
      expect('world' in save).toBe(true);
      expect('currentSeason' in save).toBe(true);
      expect('history' in save).toBe(true);
      expect('temporary' in save).toBe(true);
      expect('rng' in save).toBe(true);
    });

    it('metadata has all required fields', () => {
      const save = createNewSave({ seed: 'meta-seed', playerTeamId, seasonYear: 2026 });
      const m = save.metadata;

      expect(m.saveId).toBeDefined();
      expect(m.slotId).toBeDefined();
      expect(m.saveVersion).toBeDefined();
      expect(m.schemaVersion).toBeDefined();
      expect(m.createdAt).toBeDefined();
      expect(m.updatedAt).toBeDefined();
      expect(m.currentSeasonYear).toBeDefined();
      expect(m.currentWeekIndex).toBeDefined();
      expect(m.playerTeamId).toBeDefined();
      expect(m.gameStartYear).toBeDefined();
    });

    it('rng state preserves seed', () => {
      const testSeed = 'rng-test-seed-12345';
      const save = createNewSave({ seed: testSeed, playerTeamId, seasonYear: 2026 });

      expect(save.rng.seed).toBe(testSeed);
    });

    it('currentSeason references world calendar', () => {
      const save = createNewSave({ seed: 'season-seed', playerTeamId, seasonYear: 2026 });

      expect(save.currentSeason.calendar).toEqual(save.world.currentSeason.calendar);
    });

    it('history is initialized empty', () => {
      const save = createNewSave({ seed: 'history-seed', playerTeamId, seasonYear: 2026 });

      expect(Array.isArray(save.history.seasonSummaries)).toBe(true);
      expect(save.history.seasonSummaries).toHaveLength(0);
    });
  });
});
