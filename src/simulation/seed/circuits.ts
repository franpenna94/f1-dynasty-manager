import { createCircuit } from '../domain/circuit/circuit';

export function seedCircuits() {
  return Array.from({ length: 12 }, (_, i) => createCircuit(i));
}

export default seedCircuits;
