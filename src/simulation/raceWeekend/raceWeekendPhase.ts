export type RaceWeekendPhase = 'not_started' | 'practice' | 'qualifying' | 'race' | 'completed';

/**
 * Get the next phase in the race weekend sequence.
 */
export function getNextPhase(currentPhase: RaceWeekendPhase): RaceWeekendPhase | null {
  const sequence: RaceWeekendPhase[] = ['not_started', 'practice', 'qualifying', 'race', 'completed'];
  const currentIndex = sequence.indexOf(currentPhase);

  if (currentIndex === -1 || currentIndex >= sequence.length - 1) {
    return null;
  }

  return sequence[currentIndex + 1];
}

/**
 * Check if a phase is the final phase.
 */
export function isRaceWeekendComplete(phase: RaceWeekendPhase): boolean {
  return phase === 'completed';
}

/**
 * Get a human-readable description of a phase.
 */
export function getPhaseDescription(phase: RaceWeekendPhase): string {
  switch (phase) {
    case 'not_started':
      return 'Race weekend not started';
    case 'practice':
      return 'Practice sessions';
    case 'qualifying':
      return 'Qualifying sessions';
    case 'race':
      return 'Race day';
    case 'completed':
      return 'Race weekend completed';
  }
}
