import { brandedId, OwnerId } from '../../types/ids';

export type OwnerPersonality = 'conservative' | 'ambitious' | 'marketing_first' | 'cost_cutter' | 'prestige_driven' | 'patient_builder';

export interface Owner {
  id: OwnerId;
  name: string;
  personality: OwnerPersonality;
  patience: number; // 0-100
  ambition: number; // 0-100
}

export function validateOwner(o: Owner): boolean {
  if (!o.id) return false;
  if (!o.name) return false;
  return typeof o.patience === 'number' && typeof o.ambition === 'number';
}

export function createOwner(opts: Partial<Owner>): Owner {
  const name = opts.name ?? `Owner ${Math.floor(Math.random() * 10000)}`;
  return {
    id: opts.id ?? brandedId<OwnerId>(`owner-${name.replace(/\s+/g, '-').toLowerCase()}`),
    name,
    personality: opts.personality ?? 'ambitious',
    patience: opts.patience ?? 50,
    ambition: opts.ambition ?? 60,
  };
}
