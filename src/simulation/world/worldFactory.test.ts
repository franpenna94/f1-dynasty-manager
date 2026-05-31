import { describe, it, expect } from 'vitest';
import { buildWorldState } from './worldFactory';
import { Owner } from '../domain/owner/owner';
import { Team } from '../domain/team/team';
import { Driver } from '../domain/driver/driver';
import { StaffMember } from '../domain/staff/staff';
import { Circuit } from '../domain/circuit/circuit';

describe('Seeded world state', () => {
  it('creates same world for same seed', () => {
    const a = buildWorldState('seed-abc', 2026);
    const b = buildWorldState('seed-abc', 2026);
    expect(a).toEqual(b);
  });

  it('creates different worlds for different seeds (non-critical values)', () => {
    const a = buildWorldState('seed-abc', 2026);
    const b = buildWorldState('seed-xyz', 2026);
    // worlds should differ by more than identity; check a driver name differs or car assignment
    const aDriver = Object.values(a.world.drivers)[0];
    const bDriver = Object.values(b.world.drivers)[0];
    expect(aDriver.firstName !== bDriver.firstName || aDriver.lastName !== bDriver.lastName).toBe(true);
  });

  it('has correct entity counts and valid references', () => {
    const w = buildWorldState('seed-check', 2026);
    const teamIds = Object.keys(w.world.teams);
    const driverIds = Object.keys(w.world.drivers);
    const circuitIds = Object.keys(w.world.circuits);
    const ownerIds = Object.keys(w.world.owners);
    const staffIds = Object.keys(w.world.staff);

    expect(teamIds).toHaveLength(10);
    expect(driverIds).toHaveLength(20);
    expect(circuitIds).toHaveLength(12);
    expect(ownerIds).toHaveLength(10);
    expect(staffIds.length).toBeGreaterThanOrEqual(10 * 1);

    // team-driver references
    for (const teamId of teamIds) {
      const t = w.world.teams[teamId];
      for (const did of t.driverIds) {
        expect(w.world.drivers[did as unknown as string]).toBeDefined();
      }
    }

    // owners reference
    for (const teamId of teamIds) {
      const t = w.world.teams[teamId];
      expect(w.world.owners[t.ownerId as unknown as string]).toBeDefined();
    }

    // calendar circuit references
    for (const ev of w.currentSeason.calendar.raceEvents) {
      expect(w.world.circuits[ev.circuitId as unknown as string]).toBeDefined();
    }
  });

  it('has no duplicate ids', () => {
    const w = buildWorldState('seed-unique', 2026);
    const all: Array<Owner | Team | Driver | StaffMember | Circuit> = [
      ...Object.values(w.world.owners),
      ...Object.values(w.world.teams),
      ...Object.values(w.world.drivers),
      ...Object.values(w.world.staff),
      ...Object.values(w.world.circuits),
    ];
    const ids = all.map((x) => String(x.id));
    const set = new Set(ids);
    expect(set.size).toBe(ids.length);
  });
});
