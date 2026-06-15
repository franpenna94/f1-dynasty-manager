import { TeamId } from '../types/ids';
import { buildWorldState } from '../world/worldFactory';
import { SAVE_VERSION, SCHEMA_VERSION } from './saveVersion';
import { SaveGame, HistoricalRecords, TemporaryState, RngState } from './saveGame';
import { SaveMetadata, validateSaveMetadata } from './saveMetadata';
import { createSeededRng } from '../rng';

export interface CreateNewSaveOptions {
  seed: string;
  playerTeamId: TeamId;
  seasonYear?: number;
  slotId?: string;
}

export function createNewSave(opts: CreateNewSaveOptions): SaveGame {
  const seasonYear = opts.seasonYear ?? 2026;
  const rng = createSeededRng(opts.seed + '-meta');
  
  // Generate deterministic slotId from seeded RNG if not provided
  const slotId = opts.slotId ?? `slot-${Math.floor(rng.nextFloat() * 10000000000)}`;
  
  const now = new Date(1600000000000 + Math.floor(rng.nextFloat() * 1000000000)).toISOString();

  const gameStartYear = seasonYear;
  const currentWeekIndex = 1;

  const metadata: SaveMetadata = {
    saveId: `save-${opts.seed}-${seasonYear}`,
    slotId,
    saveVersion: SAVE_VERSION,
    schemaVersion: SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    currentSeasonYear: seasonYear,
    currentWeekIndex,
    playerTeamId: opts.playerTeamId,
    gameStartYear,
  };

  if (!validateSaveMetadata(metadata)) {
    throw new Error('Invalid save metadata generated');
  }

  const world = buildWorldState(opts.seed, seasonYear);

  const history: HistoricalRecords = {
    seasonSummaries: [],
  };

  const temporary: TemporaryState = {
    raceWeekendState: undefined,
    decisions: undefined,
  };

  const rngState: RngState = {
    seed: opts.seed,
  };

  const save: SaveGame = {
    metadata,
    world,
    currentSeason: {
      year: seasonYear,
      calendar: world.currentSeason.calendar,
    },
    history,
    temporary,
    rng: rngState,
  };

  return save;
}

export default createNewSave;
