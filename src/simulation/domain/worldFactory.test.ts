import { describe, it, expect } from 'vitest';
import { createWorld } from './worldFactory';
import { validateDriver } from './driver/driver';
import { validateTeam } from './team/team';
import { validateCar } from './car/car';
import { validateStaff } from './staff/staff';
import { validateOwner } from './owner/owner';
import { validateCircuit } from './circuit/circuit';
import { validateSeason } from './season/season';

describe('World factory', () => {
  it('builds a deterministic world with required counts', () => {
    const world = createWorld('sprint1-seed', 2026);

    expect(world.teams).toHaveLength(10);
    expect(world.drivers).toHaveLength(20);
    expect(world.circuits).toHaveLength(12);
    expect(world.season).toBeDefined();

    // validate samples
    expect(validateTeam(world.teams[0])).toBe(true);
    expect(validateDriver(world.drivers[0])).toBe(true);
    expect(validateCar(world.cars[0])).toBe(true);
    expect(validateStaff(world.staff[0])).toBe(true);
    expect(validateOwner(world.owners[0])).toBe(true);
    expect(validateCircuit(world.circuits[0])).toBe(true);
    expect(validateSeason(world.season)).toBe(true);
  });
});
