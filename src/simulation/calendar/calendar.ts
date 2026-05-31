import { brandedId, CircuitId, RaceId, SeasonId } from '../types/ids';
import { RaceEvent, SeasonCalendar, SeasonWeek } from '../types/season';

const CIRCUIT_NAMES = [
  'Adriatic',
  'Bayside',
  'Cirrus',
  'Delta',
  'Eclipse',
  'Falcon',
  'Glacier',
  'Harbor',
  'Ion',
  'Jade',
  'Kite',
  'Luna',
];

const CIRCUIT_IDS: CircuitId[] = CIRCUIT_NAMES.map((_, index) =>
  brandedId<CircuitId>(`circuit-${index + 1}`),
);

function scheduledWeekForRound(round: number): number {
  if (round <= 4) {
    return 2 + round;
  }

  if (round <= 8) {
    return round + 4;
  }

  return round + 5;
}

export function generate12RaceSeasonCalendar(year: number): SeasonCalendar {
  const seasonId = brandedId<SeasonId>(`season-${year}`);

  const raceEvents: RaceEvent[] = CIRCUIT_NAMES.map((name, index) => {
    const round = index + 1;
    return {
      raceId: brandedId<RaceId>(`race-${year}-${round}`),
      round,
      name: `${name} Grand Prix`,
      scheduledWeek: scheduledWeekForRound(round),
      circuitId: CIRCUIT_IDS[index],
    };
  });

  const weeks: SeasonWeek[] = Array.from({ length: 18 }, (_, index) => {
    const weekIndex = index + 1;
    const raceEvent = raceEvents.find((event) => event.scheduledWeek === weekIndex);
    const phase: SeasonWeek['phase'] =
      weekIndex <= 2
        ? 'preseason'
        : weekIndex === 7 || weekIndex === 12
        ? 'summer_break'
        : weekIndex >= 17
        ? 'offseason'
        : 'season';

    return {
      weekIndex,
      phase,
      raceId: raceEvent?.raceId,
      raceName: raceEvent?.name,
      circuitId: raceEvent?.circuitId,
      description: raceEvent ? `Round ${raceEvent.round} race week` : undefined,
    };
  });

  return {
    seasonId,
    year,
    weeks,
    raceEvents,
  };
}
