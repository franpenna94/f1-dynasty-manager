import { createSeededRng } from '../rng';
import { createStaff } from '../domain/staff/staff';
import { Team } from '../domain/team/team';

export function seedStaff(seed: string, teams: Team[], perTeam = 3) {
  const rng = createSeededRng(seed + '-staff');
  return teams.flatMap((t, ti) =>
    Array.from({ length: perTeam }, (_, j) =>
      createStaff({
        firstName: `${t.name}-Staff${j + 1}`,
        lastName: `${ti + 1}`,
        skill: rng.nextInt(40, 85),
      }),
    ),
  );
}

export default seedStaff;
