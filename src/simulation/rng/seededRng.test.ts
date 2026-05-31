import { describe, expect, it } from 'vitest';
import { createSeededRng } from './seededRng';

describe('Seeded RNG', () => {
  it('returns the same sequence for the same seed', () => {
    const first = createSeededRng('test-seed');
    const second = createSeededRng('test-seed');

    expect(first.nextFloat()).toBe(second.nextFloat());
    expect(first.nextInt(0, 100)).toBe(second.nextInt(0, 100));
    expect(first.nextBoolean()).toBe(second.nextBoolean());
  });

  it('shuffles deterministically', () => {
    const first = createSeededRng('shuffle-seed');
    const second = createSeededRng('shuffle-seed');
    const list = [1, 2, 3, 4, 5];

    expect(first.shuffle(list)).toEqual(second.shuffle(list));
  });
});
