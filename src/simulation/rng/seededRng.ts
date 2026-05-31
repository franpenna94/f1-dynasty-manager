export interface SeededRng {
  seed: string;
  next(): number;
  nextFloat(): number;
  nextInt(min: number, max: number): number;
  nextBoolean(): boolean;
  pick<T>(items: readonly T[]): T | undefined;
  shuffle<T>(items: readonly T[]): T[];
}

function hashSeed(seed: string | number): number {
  let value = typeof seed === 'number' ? seed >>> 0 : 2166136261;

  if (typeof seed === 'string') {
    for (let i = 0; i < seed.length; i += 1) {
      value ^= seed.charCodeAt(i);
      value = Math.imul(value, 16777619);
    }
  }

  return value >>> 0;
}

function createMulberry32(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeededRng(seed: string | number): SeededRng {
  const normalizedSeed = typeof seed === 'number' ? String(seed) : seed;
  const baseSeed = hashSeed(seed);
  const random = createMulberry32(baseSeed);

  return {
    seed: normalizedSeed,
    next(): number {
      return Math.floor(random() * 0x100000000);
    },
    nextFloat(): number {
      return random();
    },
    nextInt(min: number, max: number): number {
      if (min > max) {
        throw new Error('nextInt: min must be <= max');
      }
      return Math.floor(random() * (max - min + 1)) + min;
    },
    nextBoolean(): boolean {
      return random() >= 0.5;
    },
    pick<T>(items: readonly T[]): T | undefined {
      if (items.length === 0) {
        return undefined;
      }
      return items[this.nextInt(0, items.length - 1)];
    },
    shuffle<T>(items: readonly T[]): T[] {
      const result = [...items];
      for (let i = result.length - 1; i > 0; i -= 1) {
        const j = this.nextInt(0, i);
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    },
  };
}
