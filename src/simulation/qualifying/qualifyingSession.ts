import { createSeededRng } from '../rng';
import { calculateDriverPerformance } from '../performance';
import { Driver } from '../domain/driver/driver';
import { Team } from '../domain/team/team';
import { DriverId, TeamId } from '../types/ids';
import { QualifyingClassificationEntry, QualifyingSessionName, QualifyingSessionResult } from './qualifyingResult';

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

function getPlaceholderTeamContribution(team: Team | undefined, sessionName: QualifyingSessionName, driverId: DriverId, seed: string): number {
  if (!team) {
    return 50;
  }

  // Placeholder assumption: the team contribution is intentionally small and deterministic.
  // It exists only to keep the model structurally aligned with the docs without implementing car performance yet.
  const teamSeed = createSeededRng(`${seed}-${sessionName}-${team.id}-${driverId}`);
  return clamp(48 + teamSeed.nextFloat() * 8 + team.driverIds.length * 0.4);
}

interface SessionScoredDriver {
  driver: Driver;
  teamId: TeamId;
  score: number;
}

export function simulateQualifyingSession(
  drivers: Driver[],
  teams: Record<string, Team>,
  sessionName: QualifyingSessionName,
  seed: string,
  eliminationCount: number,
  pressure: number,
): QualifyingSessionResult {
  const scoredDrivers: SessionScoredDriver[] = drivers.map((driver) => {
    const team = driver.teamId ? teams[driver.teamId] : undefined;
    const performance = calculateDriverPerformance({
      driver,
      seed: `${seed}-${sessionName}`,
      pressure,
      aggression: 35 + (sessionName === 'Q3' ? 8 : 0),
      wetWeather: false,
      wetSkill: driver.racePace,
    });
    const teamContribution = getPlaceholderTeamContribution(team, sessionName, driver.id, seed);
    const score = performance.qualifyingPerformance * 0.8 + teamContribution * 0.2;

    return {
      driver,
      teamId: driver.teamId ?? ('' as TeamId),
      score,
    };
  });

  const rankedDrivers = scoredDrivers
    .slice()
    .sort((left, right) => right.score - left.score || left.driver.id.localeCompare(right.driver.id));

  const advancedDrivers = rankedDrivers.slice(0, Math.max(0, rankedDrivers.length - eliminationCount));
  const eliminatedDrivers = rankedDrivers.slice(Math.max(0, rankedDrivers.length - eliminationCount));

  const classification: QualifyingClassificationEntry[] = rankedDrivers.map((entry, index) => ({
    position: index + 1,
    driverId: entry.driver.id,
    teamId: entry.teamId,
    session: sessionName,
    score: entry.score,
    eliminated: eliminationCount > 0 && index >= advancedDrivers.length,
  }));

  return {
    name: sessionName,
    driverIds: rankedDrivers.map((entry) => entry.driver.id),
    eliminatedDriverIds: eliminatedDrivers.map((entry) => entry.driver.id),
    eliminatedCount: eliminatedDrivers.length,
    classification,
  };
}
