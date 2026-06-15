export const SAVE_VERSION = '0.1.0';
export const SCHEMA_VERSION = 'schema_001';

export interface SaveVersion {
  saveVersion: string;
  schemaVersion: string;
  gameBuild?: string;
}
