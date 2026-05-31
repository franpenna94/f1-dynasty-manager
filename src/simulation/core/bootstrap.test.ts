import { describe, expect, it } from 'vitest';
import { createSeededRng } from '../rng/seededRng';
import { bootstrapSimulation } from './bootstrap';

describe('Simulation bootstrap', () => {
  it('creates a deterministic season state', () => {
    const state = bootstrapSimulation({ seed: 'bootstrap-seed', seasonYear: 2026 });

    expect(state.seed).toBe('bootstrap-seed');
    expect(state.seasonYear).toBe(2026);
    expect(state.calendar.raceEvents).toHaveLength(12);
    expect(state.driverStandings).toEqual([]);
    expect(state.constructorStandings).toEqual([]);

    const firstValue = state.rng.nextInt(1, 3);
    const secondValue = state.rng.nextInt(1, 3);
    expect(firstValue).toBeGreaterThanOrEqual(1);
    expect(firstValue).toBeLessThanOrEqual(3);
    expect(secondValue).toBeGreaterThanOrEqual(1);
    expect(secondValue).toBeLessThanOrEqual(3);
    expect(firstValue).toEqual(createSeededRng('bootstrap-seed').nextInt(1, 3));
  });
});
