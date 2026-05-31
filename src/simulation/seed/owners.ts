import { createSeededRng } from '../rng';
import { createOwner } from '../domain/owner/owner';

export function seedOwners(seed: string, count = 10) {
  const rng = createSeededRng(seed + '-owners');
  return Array.from({ length: count }, (_, i) =>
    createOwner({
      name: `Owner ${i + 1}`,
      patience: rng.nextInt(30, 80),
      ambition: rng.nextInt(30, 90),
    }),
  );
}

export default seedOwners;
