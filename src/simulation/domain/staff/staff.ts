import { brandedId, StaffId } from '../../types/ids';

export type StaffRole = 'Engineer' | 'HeadOfAerodynamics' | 'ChiefMechanic' | 'Strategist' | 'Coach';

export interface StaffMember {
  id: StaffId;
  firstName: string;
  lastName: string;
  role: StaffRole;
  skill: number; // 0-100
}

export function validateStaff(s: StaffMember): boolean {
  if (!s.id) return false;
  if (!s.firstName || !s.lastName) return false;
  return typeof s.skill === 'number' && s.skill >= 0 && s.skill <= 100;
}

export function createStaff(opts: Partial<StaffMember>): StaffMember {
  const firstName = opts.firstName ?? `Staff${Math.floor(Math.random() * 10000)}`;
  const lastName = opts.lastName ?? `Surname${Math.floor(Math.random() * 10000)}`;
  const role = opts.role ?? 'Engineer';
  const skill = opts.skill ?? 60;
  return {
    id: opts.id ?? brandedId<StaffId>(`staff-${firstName}-${lastName}`),
    firstName,
    lastName,
    role,
    skill,
  };
}
