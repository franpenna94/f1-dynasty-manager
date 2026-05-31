import { brandedId, CircuitId } from '../../types/ids';

export interface Circuit {
  id: CircuitId;
  name: string;
  country: string;
  lengthKm: number;
}

const CIRCUIT_NAMES = [
  'Adriatic',
  'Bayside',
  'Cirrus',
  'Delta',
  'Eclipse',
  'Falcon',
  'Glacier',
  'Harbor',
  'Ion',
  'Jade',
  'Kite',
  'Luna',
];

export function createCircuit(index: number): Circuit {
  const name = CIRCUIT_NAMES[index % CIRCUIT_NAMES.length];
  return {
    id: brandedId<CircuitId>(`circuit-${index + 1}`),
    name: `${name} Circuit`,
    country: 'Fictional',
    lengthKm: 5 + (index % 5) * 0.3,
  };
}

export function validateCircuit(c: Circuit): boolean {
  return !!c.id && !!c.name && typeof c.lengthKm === 'number';
}
