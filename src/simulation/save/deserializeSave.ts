import { SaveGame, validateSaveGame } from './saveGame';
import { deserializeSave } from './serializeSave';

/**
 * Load and validate a save from JSON string.
 * Throws if the save is invalid.
 */
export function loadAndValidateSave(json: string): SaveGame {
  const parsed = deserializeSave(json);
  
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Save is not a valid object');
  }

  const save = parsed as SaveGame;

  if (!validateSaveGame(save)) {
    throw new Error('Save failed validation');
  }

  return save;
}

/**
 * Validate an already-parsed SaveGame object.
 */
export function validateAndReturnSave(save: unknown): SaveGame {
  if (!save || typeof save !== 'object') {
    throw new Error('Save is not a valid object');
  }

  const typedSave = save as SaveGame;

  if (!validateSaveGame(typedSave)) {
    throw new Error('Save failed validation');
  }

  return typedSave;
}

const deserializeSaveExports = {
  loadAndValidateSave,
  validateAndReturnSave,
};

export default deserializeSaveExports;
