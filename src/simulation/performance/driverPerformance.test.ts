import { describe, expect, it } from 'vitest';
import { createDriver } from '../domain/driver/driver';
import { calculateDriverPerformance } from './driverPerformance';

function buildDriver(overrides: Partial<ReturnType<typeof createDriver>> = {}) {
  return createDriver({
    firstName: 'Test',
    lastName: 'Driver',
    age: 28,
    racePace: 70,
    qualifying: 72,
    consistency: 68,
    overall: 70,
    ...overrides,
  });
}

describe('Driver Performance Model (Sprint 8)', () => {
  it('returns identical output for the same seed and driver', () => {
    const driver = buildDriver();
    const input = {
      driver,
      seed: 'deterministic-seed',
      pressure: 60,
      aggression: 40,
      wetWeather: false,
    };

    const first = calculateDriverPerformance(input);
    const second = calculateDriverPerformance(input);

    expect(first).toEqual(second);
  });

  it('gives stronger drivers better performance outputs', () => {
    const weakDriver = buildDriver({ racePace: 55, qualifying: 58, consistency: 60, overall: 56 });
    const strongDriver = buildDriver({ racePace: 88, qualifying: 90, consistency: 84, overall: 87 });

    const weak = calculateDriverPerformance({ driver: weakDriver, seed: 'stronger-driver', pressure: 50, aggression: 35, wetWeather: false });
    const strong = calculateDriverPerformance({ driver: strongDriver, seed: 'stronger-driver', pressure: 50, aggression: 35, wetWeather: false });

    expect(strong.qualifyingPerformance).toBeGreaterThan(weak.qualifyingPerformance);
    expect(strong.racePerformance).toBeGreaterThan(weak.racePerformance);
  });

  it('uses consistency to reduce performance volatility and mistake risk', () => {
    const inconsistentDriver = buildDriver({ consistency: 40, racePace: 72, qualifying: 74, overall: 70 });
    const consistentDriver = buildDriver({ consistency: 90, racePace: 72, qualifying: 74, overall: 70 });

    const inconsistent = calculateDriverPerformance({ driver: inconsistentDriver, seed: 'consistency', pressure: 55, aggression: 35, wetWeather: false });
    const consistent = calculateDriverPerformance({ driver: consistentDriver, seed: 'consistency', pressure: 55, aggression: 35, wetWeather: false });

    expect(consistent.consistencyEffect).toBeGreaterThan(inconsistent.consistencyEffect);
    expect(consistent.mistakeRisk).toBeLessThan(inconsistent.mistakeRisk);
  });

  it('increases mistake risk with higher aggression', () => {
    const calm = calculateDriverPerformance({ driver: buildDriver(), seed: 'aggression', pressure: 50, aggression: 20, wetWeather: false });
    const aggressive = calculateDriverPerformance({ driver: buildDriver(), seed: 'aggression', pressure: 50, aggression: 80, wetWeather: false });

    expect(aggressive.mistakeRisk).toBeGreaterThan(calm.mistakeRisk);
  });

  it('uses wet skill to boost wet weather effect', () => {
    const weakWetSkill = calculateDriverPerformance({ driver: buildDriver(), seed: 'wet', pressure: 50, aggression: 40, wetWeather: true, wetSkill: 20 });
    const strongWetSkill = calculateDriverPerformance({ driver: buildDriver(), seed: 'wet', pressure: 50, aggression: 40, wetWeather: true, wetSkill: 85 });

    expect(strongWetSkill.wetWeatherEffect).toBeGreaterThan(weakWetSkill.wetWeatherEffect);
  });

  it('keeps all output values within the expected 0-100 bounds', () => {
    const result = calculateDriverPerformance({ driver: buildDriver(), seed: 'bounds', pressure: 40, aggression: 60, wetWeather: true, wetSkill: 70 });

    expect(result.qualifyingPerformance).toBeGreaterThanOrEqual(0);
    expect(result.qualifyingPerformance).toBeLessThanOrEqual(100);
    expect(result.racePerformance).toBeGreaterThanOrEqual(0);
    expect(result.racePerformance).toBeLessThanOrEqual(100);
    expect(result.consistencyEffect).toBeGreaterThanOrEqual(0);
    expect(result.consistencyEffect).toBeLessThanOrEqual(100);
    expect(result.pressureEffect).toBeGreaterThanOrEqual(0);
    expect(result.pressureEffect).toBeLessThanOrEqual(100);
    expect(result.wetWeatherEffect).toBeGreaterThanOrEqual(0);
    expect(result.wetWeatherEffect).toBeLessThanOrEqual(100);
    expect(result.mistakeRisk).toBeGreaterThanOrEqual(0);
    expect(result.mistakeRisk).toBeLessThanOrEqual(100);
  });

  it('does not mutate the original driver', () => {
    const driver = buildDriver();
    const originalSnapshot = JSON.stringify(driver);

    calculateDriverPerformance({ driver, seed: 'mutation', pressure: 45, aggression: 50, wetWeather: false });

    expect(JSON.stringify(driver)).toBe(originalSnapshot);
  });
});
