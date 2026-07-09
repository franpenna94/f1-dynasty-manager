import { Driver } from '../domain/driver/driver';

export interface DriverPerformanceInput {
  driver: Driver;
  seed: string;
  pressure: number;
  aggression: number;
  wetWeather: boolean;
  wetSkill?: number;
}
