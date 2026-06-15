import { TeamId } from '../types/ids';

export interface SaveMetadata {
  saveId: string;
  slotId: string;
  saveVersion: string;
  schemaVersion: string;
  createdAt: string;
  updatedAt: string;
  currentSeasonYear: number;
  currentWeekIndex: number;
  playerTeamId: TeamId;
  gameStartYear: number;
  gameBuild?: string;
}

export function validateSaveMetadata(m: SaveMetadata): boolean {
  if (!m.saveId || !m.slotId) return false;
  if (!m.saveVersion || !m.schemaVersion) return false;
  if (!m.createdAt || !m.updatedAt) return false;
  if (!m.playerTeamId) return false;
  if (typeof m.currentSeasonYear !== 'number' || typeof m.currentWeekIndex !== 'number') return false;
  if (typeof m.gameStartYear !== 'number') return false;
  return true;
}
