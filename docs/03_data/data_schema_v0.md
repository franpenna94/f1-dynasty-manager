# F1 Dynasty Manager — Data Schema v0

## 0. Propósito

Este documento define el modelo de datos persistente para F1 Dynasty Manager.

Objetivos:

* permitir partidas de 100+ temporadas
* mantener savegames livianos
* soportar simulación profunda sin guardar telemetría infinita
* facilitar implementación en Codex
* separar estado vivo, historial agregado y reportes temporales
* permitir futuro soporte de JSON editable/modding sin hacerlo prioridad v0

---

# 1. Principios de arquitectura de datos

## 1.1 Save único grande

La estructura recomendada es un único save snapshot por slot.

```text
save_slot_001.json.gz
save_slot_002.json.gz
```

Motivo:

* más simple para web
* más simple para backup/export
* más simple para Codex
* menor riesgo de inconsistencias entre archivos
* suficiente para 100+ temporadas si no se guarda lap-by-lap histórico completo

---

## 1.2 Compresión automática

Los saves deben comprimirse automáticamente.

Formato sugerido:

```text
JSON serializable en memoria
↓
compressed JSON para almacenamiento
```

Implementación sugerida:

* desarrollo: `.json` legible
* producción: `.json.gz` o compresión equivalente en browser storage/backend

---

## 1.3 Múltiples slots

El juego soporta múltiples slots.

```ts
SaveSlot {
  slot_id: string
  display_name: string
  created_at: string
  updated_at: string
  save_version: string
  current_season: number
  current_week: number
  player_team_id: string
}
```

---

## 1.4 Manual save

v0 usa guardado manual.

Autosave puede agregarse luego, pero no es requisito inicial.

---

## 1.5 Ironman

No es prioridad.

Se puede omitir en v0.

Si se agrega futuro:

```ts
ironman_enabled?: boolean
```

---

# 2. Capas del savegame

El save debe separar claramente:

```text
SaveGame
 ├── metadata
 ├── settings
 ├── world_state
 ├── current_season_state
 ├── historical_records
 ├── temporary_race_state
 └── rng_state
```

---

## 2.1 SaveGame root

```ts
interface SaveGame {
  metadata: SaveMetadata
  settings: GameSettings
  world: WorldState
  current_season: CurrentSeasonState
  history: HistoricalRecords
  temporary: TemporaryState
  rng: RngState
}
```

---

## 2.2 SaveMetadata

```ts
interface SaveMetadata {
  save_id: string
  slot_id: string
  save_version: string
  created_at: string
  updated_at: string
  current_date: string
  current_season_year: number
  current_week_index: number
  player_team_id: string
  game_start_year: number
}
```

---

## 2.3 GameSettings

```ts
interface GameSettings {
  difficulty: "easy" | "normal" | "hard"
  race_length_factor: number
  names_mode: "real_private" | "fictional"
  autosave_enabled: boolean
  ironman_enabled: boolean
  measurement_units: "metric"
}
```

Default v0:

```json
{
  "difficulty": "normal",
  "race_length_factor": 0.6,
  "names_mode": "real_private",
  "autosave_enabled": false,
  "ironman_enabled": false,
  "measurement_units": "metric"
}
```

---

# 3. WorldState

`WorldState` contiene el estado vivo actual del universo.

```ts
interface WorldState {
  league: LeagueState
  teams: Record<string, Team>
  drivers: Record<string, Driver>
  staff: Record<string, StaffMember>
  circuits: Record<string, Circuit>
  sponsors: Record<string, Sponsor>
  regulations: Record<string, RegulationSet>
  political_state: PoliticalState
  media_state: MediaState
  junior_world: JuniorWorldState
  free_agent_pool: FreeAgentPool
}
```

---

# 4. LeagueState

```ts
interface LeagueState {
  current_year: number
  current_week: number
  current_phase: SeasonPhase
  calendar: RaceWeekend[]
  f1_team_ids: string[]
  f2_team_ids: string[]
  f3_team_ids: string[]
  active_regulation_id: string
  next_regulation_id?: string
}
```

```ts
type SeasonPhase =
  | "offseason"
  | "preseason"
  | "regular_season"
  | "summer_break"
  | "postseason"
```

---

# 5. Team Schema

## 5.1 Team

```ts
interface Team {
  id: string
  name: string
  short_name: string
  country: string
  series: "F1" | "F2" | "F3"
  is_player_controlled: boolean
  difficulty: "easy" | "normal" | "hard" | "very_hard"

  owner: OwnerProfile
  culture: TeamCulture
  technical_philosophy: TechnicalPhilosophy

  finance: TeamFinance
  reputation: TeamReputation
  facilities: TeamFacilities
  departments: TeamDepartments

  driver_ids: string[]
  reserve_driver_ids: string[]
  academy_driver_ids: string[]
  staff_ids: string[]
  sponsor_ids: string[]

  current_car_id?: string
  next_car_project_id?: string

  component_stock: ComponentStock
  manufacturing_queue: ManufacturingJob[]
  development_projects: DevelopmentProject[]

  relationships: TeamRelationships
  owner_objectives: OwnerObjective[]
}
```

---

## 5.2 OwnerProfile

```ts
interface OwnerProfile {
  id: string
  name: string
  personality: OwnerPersonality
  patience: number
  ambition: number
  financial_strength: number
  marketing_focus: number
  interference: number
  can_inject_capital: boolean
}
```

```ts
type OwnerPersonality =
  | "conservative"
  | "ambitious"
  | "marketing_first"
  | "cost_cutter"
  | "prestige_driven"
  | "patient_builder"
```

Cambios de dueño existen, pero son eventos raros.

---

## 5.3 TeamCulture

```ts
interface TeamCulture {
  primary_trait: TeamCultureTrait
  secondary_trait?: TeamCultureTrait
  stability: number
  pressure_level: number
  innovation_bias: number
  political_bias: number
  youth_bias: number
  marketing_bias: number
  risk_tolerance: number
}
```

```ts
type TeamCultureTrait =
  | "ruthless"
  | "innovative"
  | "bureaucratic"
  | "chaotic"
  | "efficient"
  | "political"
  | "youth_focused"
  | "marketing_first"
  | "conservative"
```

---

## 5.4 TechnicalPhilosophy

```ts
interface TechnicalPhilosophy {
  concept_id: string
  name: string
  traits: TechnicalConceptTrait[]
  knowledge_by_area: Record<TechnicalArea, number>
  locked_paths: string[]
  preferred_paths: string[]
}
```

```ts
type TechnicalArea =
  | "aero"
  | "chassis"
  | "suspension"
  | "cooling"
  | "power_unit"
  | "tires"
  | "manufacturing"
```

```ts
type TechnicalConceptTrait =
  | "high_downforce"
  | "low_drag"
  | "balanced"
  | "nervous_high_peak"
  | "tire_saver"
  | "cooling_aggressive"
  | "stable_platform"
```

---

# 6. Team Finance

```ts
interface TeamFinance {
  cash: number
  season_start_cash: number
  projected_end_cash: number
  annual_driver_salary_commitment: number
  annual_staff_salary_commitment: number
  monthly_sponsor_income: number
  monthly_operating_cost: number
  current_debt: number
  negative_cash_weeks: number
  cost_cap: CostCapState
  season_financial_summary: SeasonFinancialSummary
}
```

---

## 6.1 CostCapState

Cost cap v0 incluye:

* desarrollo
* fabricación

No incluye:

* academia
* facilities
* pilotos
* marketing

```ts
interface CostCapState {
  limit: number
  spent: number
  remaining: number
  projected_spend: number
  breach_status: "none" | "minor" | "medium" | "major"
}
```

---

## 6.2 SeasonFinancialSummary

Solo se guarda balance final por temporada, no cashflow mensual histórico completo.

```ts
interface SeasonFinancialSummary {
  year: number
  starting_cash: number
  ending_cash: number
  total_income: number
  total_expenses: number
  sponsor_income: number
  prize_money: number
  development_spend: number
  manufacturing_spend: number
  crash_damage_spend: number
  debt_end: number
}
```

---

# 7. Reputation

```ts
interface TeamReputation {
  overall: number
  sporting: number
  technical: number
  financial: number
  political: number
  media: number
  sponsor: number
  academy: number
}
```

---

# 8. Facilities and Departments

Facilities individuales, pero sin sobrecomplejizar.

```ts
interface TeamFacilities {
  wind_tunnel: FacilityUnit
  cfd: FacilityUnit
  simulator: FacilityUnit
  manufacturing: FacilityUnit
  academy: FacilityUnit
  pit_crew_center: FacilityUnit
  headquarters: FacilityUnit
}
```

```ts
interface FacilityUnit {
  level: number
  condition: number
  maintenance_cost_monthly: number
  upgrade_cost: number
  upgrade_weeks_remaining?: number
}
```

---

## 8.1 Departments

```ts
interface TeamDepartments {
  aero: DepartmentState
  chassis: DepartmentState
  strategy: DepartmentState
  manufacturing: DepartmentState
  race_operations: DepartmentState
  academy: DepartmentState
}
```

```ts
interface DepartmentState {
  quality: number
  morale: number
  workload: number
  efficiency: number
  head_staff_id?: string
}
```

---

# 9. Driver Schema

## 9.1 Driver

```ts
interface Driver {
  id: string
  name: string
  nationality: string
  age: number
  birth_year: number
  series: "F1" | "F2" | "F3" | "FREE_AGENT" | "JUNIOR"
  current_team_id?: string

  career_stage: DriverCareerStage
  contract?: DriverContract
  attributes: DriverAttributes
  personality: DriverPersonality
  morale: DriverMorale
  development: DriverDevelopment
  relationships: DriverRelationships
  career_stats: DriverCareerStats
  season_stats: DriverSeasonStats
}
```

```ts
type DriverCareerStage =
  | "rookie"
  | "developing"
  | "prime"
  | "veteran"
  | "declining"
  | "retired"
```

---

## 9.2 DriverAttributes

```ts
interface DriverAttributes {
  pace: number
  qualifying: number
  race_pace: number
  consistency: number
  racecraft: number
  overtaking: number
  defending: number
  tire_management: number
  wet_skill: number
  feedback: number
  aggression: number
  pressure_resistance: number
  experience: number
  adaptability: number
  marketability: number
}
```

---

## 9.3 DriverPersonality

Personalidad con profundidad moderada.

```ts
interface DriverPersonality {
  traits: DriverTrait[]
  ego: number
  loyalty: number
  ambition: number
  political_power: number
  media_comfort: number
  emotional_stability: number
}
```

```ts
type DriverTrait =
  | "aggressive"
  | "political"
  | "loyal"
  | "emotional"
  | "media_friendly"
  | "selfish"
  | "technical"
  | "team_player"
  | "high_pressure"
```

---

## 9.4 DriverContract

Contrato complejo, pero no excesivo.

```ts
interface DriverContract {
  team_id: string
  start_year: number
  end_year: number
  annual_salary: number
  performance_bonus: number
  win_bonus: number
  podium_bonus: number
  buyout_clause: number
  exit_clauses: ExitClause[]
  option_year?: ContractOption
  role_expectation: "number_one" | "equal" | "support" | "reserve" | "junior"
}
```

```ts
interface ExitClause {
  type: "performance" | "relegation" | "top_team_offer" | "financial_crisis"
  threshold?: number
}
```

---

## 9.5 DriverRelationships

```ts
interface DriverRelationships {
  team_affinity: Record<string, number>
  teammate_rivalries: Record<string, RivalryState>
  manager_trust: number
}
```

```ts
interface RivalryState {
  intensity: number
  respect: number
  conflict_risk: number
  started_year: number
}
```

---

## 9.6 DriverCareerStats

Persistente para Hall of Fame.

```ts
interface DriverCareerStats {
  seasons: number
  race_starts: number
  wins: number
  podiums: number
  dnfs: number
  poles: number
  fastest_laps: number
  points: number
  driver_titles: number
  best_championship_position?: number
}
```

---

## 9.7 DriverSeasonStats

```ts
interface DriverSeasonStats {
  year: number
  race_starts: number
  wins: number
  podiums: number
  dnfs: number
  poles: number
  fastest_laps: number
  points: number
  current_position?: number
}
```

---

# 10. Staff Schema

Staff generado proceduralmente ilimitado.

```ts
interface StaffMember {
  id: string
  name: string
  nationality: string
  age: number
  role: StaffRole
  current_team_id?: string
  salary: number
  attributes: StaffAttributes
  personality: StaffPersonality
  contract_end_year?: number
  reputation: number
}
```

```ts
type StaffRole =
  | "technical_director"
  | "head_of_aero"
  | "head_of_chassis"
  | "race_strategist"
  | "manufacturing_lead"
  | "academy_director"
  | "commercial_director"
```

```ts
interface StaffAttributes {
  expertise: number
  leadership: number
  creativity: number
  efficiency: number
  adaptability: number
  communication: number
  strategy: number
  development_speed: number
}
```

```ts
interface StaffPersonality {
  risk_tolerance: number
  loyalty: number
  ego: number
  conflict_risk: number
}
```

---

# 11. Car Schema

## 11.1 Car

```ts
interface Car {
  id: string
  team_id: string
  year: number
  regulation_id: string
  concept: CarConcept
  attributes: CarAttributes
  stability: CarStability
  setup_memory: Record<string, TrackSetupMemory>
  parts: CarParts
  damage_state: CarDamageState
  upgrade_history: string[]
}
```

---

## 11.2 CarConcept

```ts
interface CarConcept {
  concept_id: string
  name: string
  traits: TechnicalConceptTrait[]
  incompatible_concept_ids: string[]
  maturity: number
  team_knowledge: number
}
```

---

## 11.3 CarAttributes

```ts
interface CarAttributes {
  downforce: number
  low_speed_grip: number
  high_speed_grip: number
  drag_efficiency: number
  tire_preservation: number
  cooling: number
  reliability: number
  weight_efficiency: number
  setup_window: number
  correlation_confidence: number
  power_unit_score: number
  brake_score: number
}
```

---

## 11.4 CarStability

```ts
interface CarStability {
  overall_stability: number
  rear_stability: number
  braking_stability: number
  wet_stability: number
  nervousness: number
  driver_difficulty: number
}
```

---

## 11.5 CarParts

Piezas individuales, pero abstractas.

```ts
interface CarParts {
  floor: CarPart
  front_wing: CarPart
  rear_wing: CarPart
  suspension: CarPart
  cooling_package: CarPart
  chassis: CarPart
  brakes: CarPart
  gearbox: CarPart
  power_unit: CarPart
}
```

```ts
interface CarPart {
  part_id: string
  version: number
  condition: number
  performance_level: number
  reliability_level: number
  is_installed: boolean
  damage: number
}
```

---

## 11.6 ComponentStock

Stock físico por equipo.

```ts
interface ComponentStock {
  floor: StockItem[]
  front_wing: StockItem[]
  rear_wing: StockItem[]
  suspension: StockItem[]
  cooling_package: StockItem[]
  chassis: StockItem[]
  brakes: StockItem[]
  gearbox: StockItem[]
  power_unit: StockItem[]
}
```

```ts
interface StockItem {
  stock_id: string
  part_type: keyof CarParts
  version: number
  condition: number
  assigned_car_id?: string
}
```

---

## 11.7 TrackSetupMemory

```ts
interface TrackSetupMemory {
  circuit_id: string
  understanding: number
  last_setup: AbstractSetup
  last_year_used: number
  confidence: number
}
```

```ts
interface AbstractSetup {
  aero_level: "low" | "medium" | "high"
  race_quali_bias: "race" | "balanced" | "qualifying"
  tire_bias: "conserve" | "balanced" | "attack"
  cooling_bias: "closed" | "balanced" | "open"
  engine_mode_bias: "conserve" | "balanced" | "attack"
}
```

---

# 12. Race Schema

## 12.1 RaceWeekend

```ts
interface RaceWeekend {
  id: string
  year: number
  round: number
  circuit_id: string
  race_name: string
  week_index: number
  status: "scheduled" | "active" | "completed"
  weather_seed: string
  qualifying_result?: QualifyingResult
  race_result?: RaceResult
  weekend_summary?: RaceWeekendSummary
}
```

---

## 12.2 TemporaryRaceState

Lap-by-lap only exists during active race week.

```ts
interface TemporaryRaceState {
  race_weekend_id?: string
  lap_state_log: LapState[]
  active_stints: DriverStintState[]
  pit_history: PitStop[]
  strategy_events: StrategyEvent[]
  safety_car_periods: SafetyCarPeriod[]
}
```

This should be cleared or summarized after post-race.

---

## 12.3 RaceResult

Permanent result.

```ts
interface RaceResult {
  race_weekend_id: string
  classified_results: ClassifiedResult[]
  winner_driver_id: string
  pole_driver_id?: string
  fastest_lap_driver_id?: string
  safety_car_count: number
  weather_summary: WeatherSummary
  pit_stop_summary: PitStopSummary[]
}
```

---

## 12.4 ClassifiedResult

```ts
interface ClassifiedResult {
  position: number
  driver_id: string
  team_id: string
  grid_position: number
  finish_status: "finished" | "dnf" | "dns" | "dsq"
  points: number
  laps_completed: number
  time_gap_summary: string
}
```

---

## 12.5 Circuit historical aggregates

No incidents históricos detallados.

Sí se guardan agregados.

```ts
interface CircuitHistoricalStats {
  circuit_id: string
  total_races: number
  winners_by_driver: Record<string, number>
  podiums_by_driver: Record<string, number>
  poles_by_driver: Record<string, number>
  lap_record?: LapRecord
  safety_cars_by_year: Record<number, number>
}
```

---

# 13. Circuit Schema

```ts
interface Circuit {
  id: string
  name: string
  country: string
  real_laps: number
  base_lap_time: number
  downforce_weight: number
  drag_weight: number
  tire_stress_weight: number
  power_weight: number
  brake_weight: number
  low_speed_weight: number
  high_speed_weight: number
  reliability_stress: number
  overtaking_difficulty: number
  weather_volatility: number
  safety_car_base_rate: number
  track_temperature_profile: TemperatureProfile
}
```

---

# 14. Development Schema

## 14.1 DevelopmentProject

```ts
interface DevelopmentProject {
  id: string
  team_id: string
  year: number
  name: string
  area: TechnicalArea
  target_type: "focused" | "package"
  risk_level: "safe" | "normal" | "aggressive"
  status: "research" | "design" | "manufacturing" | "completed" | "failed" | "cancelled"
  weeks_total: number
  weeks_remaining: number
  cost_cap_cost: number
  expected_gain: Partial<CarAttributes>
  actual_gain?: Partial<CarAttributes>
  correlation_result?: CorrelationResult
  unlocks_tech_node_id?: string
  prototype_failed: boolean
  historical_note?: string
}
```

---

## 14.2 TechTreeState

```ts
interface TechTreeState {
  unlocked_node_ids: string[]
  locked_node_ids: string[]
  researched_node_ids: string[]
  abandoned_node_ids: string[]
  concept_knowledge: Record<string, number>
  area_knowledge: Record<TechnicalArea, number>
}
```

---

## 14.3 UpgradeHistory

Each upgrade persists historically.

```ts
interface UpgradeHistoryEntry {
  id: string
  year: number
  team_id: string
  project_id: string
  name: string
  area: TechnicalArea
  risk_level: "safe" | "normal" | "aggressive"
  expected_gain_summary: string
  actual_gain_summary: string
  was_successful: boolean
  was_negative: boolean
  introduced_at_round?: number
}
```

---

# 15. Manufacturing Schema

## 15.1 ManufacturingJob

```ts
interface ManufacturingJob {
  id: string
  team_id: string
  part_type: keyof CarParts
  version: number
  quantity: number
  priority: "car_1" | "car_2" | "balanced" | "spares"
  weeks_remaining: number
  cost: number
  cost_cap_cost: number
  risk_of_delay: number
  status: "queued" | "in_progress" | "completed" | "delayed" | "cancelled"
}
```

---

# 16. Sponsor Schema

Sponsors multinivel, sin sobrecomplejizar.

```ts
interface Sponsor {
  id: string
  name: string
  tier: SponsorTier
  industry: string
  team_id?: string
  monthly_payment: number
  performance_bonus: number
  contract_start_year: number
  contract_end_year: number
  reputation_sensitivity: number
  market_alignment: number
  driver_preference_ids: string[]
}
```

```ts
type SponsorTier =
  | "title"
  | "major"
  | "minor"
  | "technical_partner"
  | "regional"
```

---

# 17. FIA / Politics Schema

## 17.1 RegulationSet

All historical regulations persist.

```ts
interface RegulationSet {
  id: string
  start_year: number
  end_year?: number
  name: string
  cost_cap_limit: number
  aero_rules: RegulationRuleSet
  power_unit_rules: RegulationRuleSet
  testing_rules: RegulationRuleSet
  sporting_rules: RegulationRuleSet
  regulation_gap_multiplier: number
  created_by_vote_id?: string
}
```

---

## 17.2 VoteRecord

Historical votes persist.

```ts
interface VoteRecord {
  id: string
  year: number
  topic: string
  proposal_type: "cost_cap" | "aero" | "engine" | "sporting" | "safety" | "testing"
  votes_by_team: Record<string, "for" | "against" | "abstain">
  passed: boolean
  political_blocks_involved: string[]
}
```

---

## 17.3 PoliticalState

```ts
interface PoliticalState {
  team_relationships: Record<string, Record<string, number>>
  political_blocks: PoliticalBlock[]
  active_votes: VoteRecord[]
  historical_votes: VoteRecord[]
}
```

```ts
interface PoliticalBlock {
  id: string
  name: string
  member_team_ids: string[]
  agenda: "big_team_power" | "small_team_support" | "manufacturer_interest" | "cost_control" | "entertainment"
  cohesion: number
}
```

---

# 18. Junior World Schema

F1 complete, F2/F3 abstracted.

```ts
interface JuniorWorldState {
  f2_standings: JuniorSeriesStanding[]
  f3_standings: JuniorSeriesStanding[]
  junior_driver_ids: string[]
  regional_pools: Record<ScoutingRegion, string[]>
  feeder_affiliations: FeederAffiliation[]
}
```

```ts
interface JuniorSeriesStanding {
  series: "F2" | "F3"
  year: number
  driver_id: string
  team_id: string
  points: number
  position: number
  wins: number
  podiums: number
}
```

```ts
type ScoutingRegion =
  | "western_europe"
  | "eastern_europe"
  | "latin_america"
  | "north_america"
  | "asia_pacific"
  | "middle_east_africa"
```

```ts
interface FeederAffiliation {
  parent_team_id: string
  junior_team_id: string
  series: "F2" | "F3"
  strength: number
  start_year: number
}
```

---

# 19. Free Agent Pool

```ts
interface FreeAgentPool {
  driver_ids: string[]
  staff_ids: string[]
  regen_settings: RegenSettings
}
```

```ts
interface RegenSettings {
  minimum_f3_candidates: number
  minimum_free_drivers: number
  minimum_staff_by_role: Record<StaffRole, number>
  yearly_driver_regen_rate: number
  yearly_staff_regen_rate: number
}
```

Default target population:

```text
F1 drivers: 22 starters + reserves
F2 drivers: abstract grid
F3 drivers: abstract grid
Free drivers: 40-80
Junior/regional pool: 100-200
Staff: generated as needed
```

---

# 20. Media and Narrative Schema

## 20.1 MediaState

```ts
interface MediaState {
  reputation_by_team: Record<string, number>
  reputation_by_driver: Record<string, number>
  active_headlines: NewsItem[]
  archived_major_news: NewsItem[]
}
```

---

## 20.2 NewsItem

Headlines procedurales persistentes para noticias relevantes.

```ts
interface NewsItem {
  id: string
  year: number
  week: number
  type: NewsType
  headline: string
  body_summary: string
  related_team_ids: string[]
  related_driver_ids: string[]
  importance: "minor" | "major" | "historic"
  expires_week?: number
}
```

```ts
type NewsType =
  | "race_result"
  | "driver_transfer"
  | "rookie_breakout"
  | "team_crisis"
  | "dominant_era"
  | "failed_wonderkid"
  | "political_scandal"
  | "financial_warning"
  | "regulation_change"
  | "technical_breakthrough"
```

---

## 20.3 HistoricalEvent

Only relevant historical events persist long-term.

```ts
interface HistoricalEvent {
  id: string
  year: number
  type: NewsType
  title: string
  summary: string
  involved_team_ids: string[]
  involved_driver_ids: string[]
  impact_score: number
}
```

---

# 21. Historical Records

## 21.1 HistoricalRecords root

```ts
interface HistoricalRecords {
  seasons: SeasonHistory[]
  drivers: Record<string, DriverCareerStats>
  teams: Record<string, TeamCareerStats>
  circuits: Record<string, CircuitHistoricalStats>
  hall_of_fame: HallOfFame
  historical_events: HistoricalEvent[]
  regulations: RegulationSet[]
  votes: VoteRecord[]
}
```

---

## 21.2 SeasonHistory

No full race details forever.

```ts
interface SeasonHistory {
  year: number
  driver_standings: StandingEntry[]
  constructor_standings: StandingEntry[]
  race_winners: RaceWinnerSummary[]
  champion_driver_id: string
  champion_team_id: string
  regulation_id: string
  financial_summaries_by_team: Record<string, SeasonFinancialSummary>
}
```

```ts
interface StandingEntry {
  entity_id: string
  position: number
  points: number
  wins: number
  podiums: number
}
```

```ts
interface RaceWinnerSummary {
  race_weekend_id: string
  circuit_id: string
  winner_driver_id: string
  winner_team_id: string
  pole_driver_id?: string
  fastest_lap_driver_id?: string
}
```

---

## 21.3 TeamCareerStats

```ts
interface TeamCareerStats {
  seasons: number
  constructor_titles: number
  driver_titles: number
  race_wins: number
  podiums: number
  poles: number
  points: number
  best_constructor_position?: number
}
```

---

## 21.4 HallOfFame

```ts
interface HallOfFame {
  goat_driver_rankings: HallOfFameEntry[]
  best_team_rankings: HallOfFameEntry[]
  records: RecordBook
}
```

```ts
interface HallOfFameEntry {
  entity_id: string
  entity_type: "driver" | "team"
  score: number
  rank: number
  summary: string
}
```

---

## 21.5 RecordBook

```ts
interface RecordBook {
  most_driver_titles: string[]
  most_constructor_titles: string[]
  most_wins_driver: string[]
  most_wins_team: string[]
  most_podiums_driver: string[]
  most_poles_driver: string[]
  youngest_winner?: string
  oldest_winner?: string
  longest_dominant_era?: string
}
```

---

# 22. Temporary State

Temporary state should stay small.

```ts
interface TemporaryState {
  active_race?: TemporaryRaceState
  active_reports: ReportItem[]
  pending_decisions: PendingDecision[]
}
```

---

## 22.1 ReportItem

```ts
interface ReportItem {
  id: string
  year: number
  week: number
  type: ReportType
  title: string
  summary: string
  severity: "info" | "warning" | "critical"
  related_entity_ids: string[]
  decision_required: boolean
}
```

```ts
type ReportType =
  | "engineering"
  | "finance"
  | "race"
  | "driver"
  | "staff"
  | "sponsor"
  | "fia"
  | "media"
  | "academy"
```

---

# 23. RNG State

Deterministic seed is recommended.

Reason:

* debugging
* reproducible simulation
* easier balance testing
* easier bug reports

```ts
interface RngState {
  world_seed: string
  current_seed: string
  race_seed?: string
  generation_counter: number
}
```

---

# 24. Persistence policy

## 24.1 Keep forever

* season standings
* driver career stats
* team career stats
* circuit aggregate stats
* regulations
* votes
* hall of fame
* historical events
* upgrade history summaries
* financial season summaries

## 24.2 Keep only current season

* race results
* qualifying results
* current standings
* development projects
* manufacturing queues
* current season financial state

## 24.3 Keep only active race/weekend

* lap-by-lap state
* pit history
* stint history
* detailed strategy log
* active telemetry

## 24.4 Discard or summarize after race

* every lap history
* detailed pit timing
* micro telemetry
* incident details unless historically important

---

# 25. Example SaveGame skeleton

```json
{
  "metadata": {
    "save_id": "save_001",
    "slot_id": "slot_001",
    "save_version": "0.1.0",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-03-15T00:00:00.000Z",
    "current_date": "2026-03-15",
    "current_season_year": 2026,
    "current_week_index": 11,
    "player_team_id": "team_williams",
    "game_start_year": 2026
  },
  "settings": {
    "difficulty": "normal",
    "race_length_factor": 0.6,
    "names_mode": "real_private",
    "autosave_enabled": false,
    "ironman_enabled": false,
    "measurement_units": "metric"
  },
  "world": {
    "league": {},
    "teams": {},
    "drivers": {},
    "staff": {},
    "circuits": {},
    "sponsors": {},
    "regulations": {},
    "political_state": {},
    "media_state": {},
    "junior_world": {},
    "free_agent_pool": {}
  },
  "current_season": {},
  "history": {},
  "temporary": {},
  "rng": {
    "world_seed": "f1dm-2026-001",
    "current_seed": "week-11",
    "generation_counter": 482
  }
}
```

---

# 26. Recommended repository placement

```text
/docs/data_schema_v0.md
/src/types/savegame.ts
/src/types/team.ts
/src/types/driver.ts
/src/types/car.ts
/src/types/race.ts
/src/types/economy.ts
/src/types/politics.ts
/src/types/history.ts
/src/simulation/save/loadSave.ts
/src/simulation/save/validateSave.ts
/src/simulation/save/migrateSave.ts
```

---

# 27. Save migration policy

Every save has:

```ts
save_version: string
```

Future changes require migration functions:

```ts
migrateSave(save: unknown): SaveGame
```

Keep migrations sequential:

```text
0.1.0 → 0.2.0
0.2.0 → 0.3.0
```

---

# 28. Validation policy

Use runtime validation.

Recommended:

* Zod schemas for TypeScript
* strict parsing on load
* fallback repair for non-critical fields
* hard fail for corrupt critical fields

---

# 29. Performance notes

For 100+ seasons:

Do not store:

* every lap forever
* full qualifying telemetry forever
* every minor report forever
* all pit decisions forever

Do store:

* aggregates
* records
* major events
* season summaries
* career stats

This keeps the save small and allows long careers.

---

# 30. Status

This schema is v0 but implementation-ready.

Next documents should be:

1. ai_design_v0.md
2. tech_tree_v0.md
3. ux_flow_v0.md
4. implementation_plan.md
