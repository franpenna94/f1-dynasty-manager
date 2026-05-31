import { createSeededRng, SeededRng } from '../rng';
import { generate12RaceSeasonCalendar } from '../calendar';
import { SeasonCalendar } from '../types';
import {
  calculateConstructorStandings,
  calculateDriverStandings,
  ConstructorStandingEntry,
  DriverStandingEntry,
  RaceResult,
} from '../championship';

export interface SimulationBootstrapOptions {
  seed: string;
  seasonYear: number;
}

export interface SimulationBootstrapState {
  seed: string;
  seasonYear: number;
  rng: SeededRng;
  calendar: SeasonCalendar;
  driverStandings: DriverStandingEntry[];
  constructorStandings: ConstructorStandingEntry[];
}

export function bootstrapSimulation(options: SimulationBootstrapOptions): SimulationBootstrapState {
  const rng = createSeededRng(options.seed);
  const calendar = generate12RaceSeasonCalendar(options.seasonYear);

  return {
    seed: options.seed,
    seasonYear: options.seasonYear,
    rng,
    calendar,
    driverStandings: [],
    constructorStandings: [],
  };
}

export function buildChampionshipStandings(results: RaceResult[]) {
  return {
    driverStandings: calculateDriverStandings(results),
    constructorStandings: calculateConstructorStandings(results),
  };
}
