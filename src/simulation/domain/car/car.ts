import { brandedId, CarId } from '../../types/ids';

export interface Car {
  id: CarId;
  name: string;
  concept: string;
  rating: number; // 0-100
}

export function validateCar(c: Car): boolean {
  if (!c.id) return false;
  if (!c.name) return false;
  return typeof c.rating === 'number' && c.rating >= 0 && c.rating <= 100;
}

export function createCar(opts: Partial<Car>): Car {
  const name = opts.name ?? `Car ${Math.floor(Math.random() * 10000)}`;
  const concept = opts.concept ?? 'balanced';
  const rating = opts.rating ?? 60;
  return {
    id: opts.id ?? brandedId<CarId>(`car-${name.replace(/\s+/g, '-').toLowerCase()}`),
    name,
    concept,
    rating,
  };
}
