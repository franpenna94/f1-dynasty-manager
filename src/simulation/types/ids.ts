export type Brand<K, T> = K & { readonly __brand: T };

export type BrandedId<T extends string> = Brand<string, T>;
export type AnyBrandedId = Brand<string, string>;

export function brandedId<T extends AnyBrandedId>(value: string): T;
export function brandedId<T extends string>(value: string): BrandedId<T>;
export function brandedId(value: string): AnyBrandedId {
  return value as AnyBrandedId;
}

export type TeamId = BrandedId<'TeamId'>;
export type DriverId = BrandedId<'DriverId'>;
export type ConstructorId = BrandedId<'ConstructorId'>;
export type CarId = BrandedId<'CarId'>;
export type RaceId = BrandedId<'RaceId'>;
export type SeasonId = BrandedId<'SeasonId'>;
export type ChampionshipId = BrandedId<'ChampionshipId'>;
export type CircuitId = BrandedId<'CircuitId'>;
