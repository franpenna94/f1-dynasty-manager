import { SaveGame } from './saveGame';

/**
 * Serialize a SaveGame to a JSON string.
 * In development, returns pretty-printed JSON.
 * In production, could be compressed.
 */
export function serializeSave(save: SaveGame, pretty = true): string {
  return JSON.stringify(save, null, pretty ? 2 : undefined);
}

/**
 * Parse a JSON string back into a SaveGame object.
 * Branded IDs are preserved as strings within the parsed structure.
 */
export function deserializeSave(json: string): unknown {
  try {
    return JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(`Failed to deserialize save: ${error}`);
  }
}

/**
 * Round-trip: serialize then deserialize.
 * Used in tests to verify structure preservation.
 */
export function roundTripSave(save: SaveGame): SaveGame {
  const json = serializeSave(save, true);
  const parsed = deserializeSave(json);
  return parsed as SaveGame;
}

const serializeSaveExports = {
  serializeSave,
  deserializeSave,
  roundTripSave,
};

export default serializeSaveExports;
