import { createSeededRng } from '../rng';
import { DriverPerformanceInput } from './driverPerformanceInput';
import { DriverPerformanceResult } from './driverPerformanceResult';

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

export function calculateDriverPerformance(input: DriverPerformanceInput): DriverPerformanceResult {
  const driver = input.driver;
  const pressure = clamp(input.pressure ?? 50);
  const aggression = clamp(input.aggression ?? 50);
  const consistency = clamp(driver.consistency);
  const qualifying = clamp(driver.qualifying);
  const racePace = clamp(driver.racePace);
  const overall = clamp(driver.overall);
  const wetSkill = clamp(input.wetSkill ?? Math.round(qualifying * 0.5 + consistency * 0.3 + racePace * 0.2));

  const varianceSeed = [
    input.seed,
    driver.id,
    String(pressure),
    String(aggression),
    input.wetWeather ? 'wet' : 'dry',
    String(wetSkill),
  ].join('-');

  const rng = createSeededRng(varianceSeed);

  const consistencyEffect = clamp(50 + (consistency - 50) * 0.6 + (overall - 50) * 0.1);
  const pressureEffect = clamp(50 + (100 - pressure) * 0.2 + (consistency - 50) * 0.2);

  const wetWeatherEffect = input.wetWeather
    ? clamp(30 + wetSkill * 0.5 + consistency * 0.1 + rng.nextFloat() * 10)
    : clamp(50 + rng.nextFloat() * 5);

  const variance = (1 - consistencyEffect / 100) * 8;
  const qualifyingBase = 0.45 * qualifying + 0.25 * overall + 0.2 * racePace + 0.1 * consistencyEffect;
  const raceBase = 0.4 * racePace + 0.3 * overall + 0.2 * consistencyEffect + 0.1 * qualifying;

  const qualifyingPerformance = clamp(
    qualifyingBase + (rng.nextFloat() - 0.5) * variance + (input.wetWeather ? (wetWeatherEffect - 50) * 0.06 : 0),
  );
  const racePerformance = clamp(
    raceBase + (rng.nextFloat() - 0.5) * variance + (input.wetWeather ? (wetWeatherEffect - 50) * 0.04 : 0),
  );
  const mistakeRisk = clamp(
    20 + aggression * 0.35 + (100 - consistencyEffect) * 0.2 + pressure * 0.08 + (input.wetWeather ? (100 - wetWeatherEffect) * 0.08 : 0),
  );

  return {
    qualifyingPerformance,
    racePerformance,
    consistencyEffect,
    pressureEffect,
    wetWeatherEffect,
    mistakeRisk,
  };
}
