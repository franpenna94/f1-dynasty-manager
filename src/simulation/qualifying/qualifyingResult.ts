import { DriverId, TeamId } from '../types/ids';

export type QualifyingSessionName = 'Q1' | 'Q2' | 'Q3';

export interface QualifyingClassificationEntry {
  position: number;
  driverId: DriverId;
  teamId: TeamId;
  session: QualifyingSessionName;
  score: number;
  eliminated: boolean;
}

export interface QualifyingSessionResult {
  name: QualifyingSessionName;
  driverIds: DriverId[];
  eliminatedDriverIds: DriverId[];
  eliminatedCount: number;
  classification: QualifyingClassificationEntry[];
}

export interface QualifyingResult {
  weekIndex: number;
  sessionResults: QualifyingSessionResult[];
  classification: QualifyingClassificationEntry[];
  poleSitter?: QualifyingClassificationEntry;
  startingGrid: QualifyingClassificationEntry[];
}
