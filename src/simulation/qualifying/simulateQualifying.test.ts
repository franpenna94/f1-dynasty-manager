import { describe, expect, it } from 'vitest';
import { createNewSave } from '../save/createNewSave';
import { brandedId, TeamId } from '../types/ids';
import { simulateQualifying } from './simulateQualifying';
import { SaveGame } from '../save/saveGame';

const playerTeamId = brandedId<TeamId>('team-player-1');

describe('Qualifying Simulation (Sprint 9)', () => {
  it('produces identical qualifying results for the same seed, save, and week', () => {
    const save1 = createNewSave({ seed: 'qualifying-seed', playerTeamId, seasonYear: 2026 });
    const save2 = createNewSave({ seed: 'qualifying-seed', playerTeamId, seasonYear: 2026 });

    const result1 = simulateQualifying(save1, 3);
    const result2 = simulateQualifying(save2, 3);

    expect(result1.sessionResults.map((session) => session.name)).toEqual(result2.sessionResults.map((session) => session.name));
    expect(result1.startingGrid).toEqual(result2.startingGrid);
  });

  it('produces the correct elimination counts for 20 drivers', () => {
    const save = createNewSave({ seed: 'qualifying-elims', playerTeamId, seasonYear: 2026 });

    const result = simulateQualifying(save, 3);

    expect(result.sessionResults[0].eliminatedCount).toBe(5);
    expect(result.sessionResults[1].eliminatedCount).toBe(5);
    expect(result.sessionResults[2].eliminatedCount).toBe(0);
  });

  it('returns a full 20-driver starting grid', () => {
    const save = createNewSave({ seed: 'qualifying-grid', playerTeamId, seasonYear: 2026 });

    const result = simulateQualifying(save, 3);

    expect(result.startingGrid).toHaveLength(20);
    expect(new Set(result.startingGrid.map((entry) => entry.driverId)).size).toBe(20);
  });

  it('places the pole sitter first in the classification', () => {
    const save = createNewSave({ seed: 'qualifying-pole', playerTeamId, seasonYear: 2026 });

    const result = simulateQualifying(save, 3);

    expect(result.poleSitter).toBeDefined();
    expect(result.poleSitter?.driverId).toBe(result.startingGrid[0].driverId);
  });

  it('generally ranks stronger drivers ahead', () => {
    const save = createNewSave({ seed: 'qualifying-strength', playerTeamId, seasonYear: 2026 });
    const clonedSave = JSON.parse(JSON.stringify(save)) as SaveGame;
    const drivers = Object.values(clonedSave.world.world.drivers);

    drivers[0].racePace = 95;
    drivers[0].qualifying = 96;
    drivers[0].consistency = 92;
    drivers[1].racePace = 55;
    drivers[1].qualifying = 54;
    drivers[1].consistency = 45;

    const result = simulateQualifying(clonedSave, 3);
    const strong = result.startingGrid.find((entry) => entry.driverId === drivers[0].id);
    const weak = result.startingGrid.find((entry) => entry.driverId === drivers[1].id);

    expect(strong?.position).toBeLessThan(weak?.position ?? 999);
  });

  it('does not mutate the original save or world state', () => {
    const save = createNewSave({ seed: 'qualifying-mutation', playerTeamId, seasonYear: 2026 });
    const originalSnapshot = JSON.stringify(save);

    simulateQualifying(save, 3);

    expect(JSON.stringify(save)).toBe(originalSnapshot);
  });

  it('uses valid driver and team references in output', () => {
    const save = createNewSave({ seed: 'qualifying-refs', playerTeamId, seasonYear: 2026 });

    const result = simulateQualifying(save, 3);

    for (const entry of result.startingGrid) {
      expect(save.world.world.drivers[entry.driverId]).toBeDefined();
      expect(save.world.world.teams[entry.teamId]).toBeDefined();
    }
  });
});
