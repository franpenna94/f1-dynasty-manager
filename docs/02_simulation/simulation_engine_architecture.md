# F1 Dynasty Manager — Simulation Engine Architecture

## 0. Propósito

Este documento define cómo debe funcionar el motor de simulación de F1 Dynasty Manager.

Objetivo:

* ejecutar semanas, carreras, temporadas y décadas de forma consistente
* mantener determinismo mediante seeds
* evitar estados corruptos
* coordinar módulos independientes
* permitir simulaciones rápidas de 100+ temporadas
* facilitar testing y debugging

Principio rector:

```text
A simulation tick should be deterministic, ordered, testable and explainable.
```

---

# 1. Filosofía del motor

## 1.1 Estado único de verdad

El savegame es el estado único de verdad.

```text
SaveGame in → Simulation Step → SaveGame out
```

No modificar estado global oculto.

Cada función importante debe ser pura o casi pura.

Ejemplo ideal:

```ts
const nextSave = advanceWeek(currentSave)
```

---

## 1.2 Determinismo

Con el mismo estado y la misma seed, el resultado debe ser igual.

Esto aplica a:

* carreras
* desarrollo
* AI decisions
* regens
* clima
* eventos
* economía

---

## 1.3 Módulos desacoplados

Cada módulo debe hacer una cosa clara.

```text
core scheduler
race simulation
economy
development
AI
drivers
staff
academy
politics
history
reports
```

El core engine coordina.

Los módulos no deberían llamarse entre sí de forma caótica.

---

## 1.4 Simulation first

El motor debe poder correr sin UI.

La UI solo lee estado y dispara acciones.

---

# 2. Capas del motor

## 2.1 Engine layers

```text
UI Action Layer
↓
Command Layer
↓
Simulation Engine
↓
Domain Modules
↓
SaveGame State
```

---

## 2.2 UI Action Layer

Ejemplos:

```text
Click Continue
Start Upgrade
Submit Contract Offer
Choose Pit Stop
Vote FIA Proposal
```

La UI no calcula consecuencias profundas.

Solo envía comandos.

---

## 2.3 Command Layer

Valida acciones.

Ejemplo:

```ts
startDevelopmentProject(save, command)
```

Debe verificar:

* dinero suficiente
* slots disponibles
* cost cap
* fase correcta
* decisión permitida

---

## 2.4 Simulation Engine

Ejecuta ticks.

Funciones principales:

```ts
advanceWeek(save)
advanceRaceWeekend(save)
advanceOffseason(save)
simulateRace(save, raceWeekendId)
simulateSeasonHeadless(save)
```

---

# 3. Tipos de ticks

## 3.1 Weekly Tick

Unidad principal del juego.

```text
1 week = 1 main tick
```

---

## 3.2 Race Weekend Tick

Ocurre durante semana de carrera.

Fases:

```text
pre_practice
practice_report
qualifying
race_strategy
race
post_race
```

---

## 3.3 Monthly Tick

Se ejecuta cuando cambia el mes.

Responsable de:

* sponsor payments
* operating costs
* salary accounting if needed
* facility maintenance
* debt/simple finance updates

---

## 3.4 Season Transition Tick

Ocurre al final de temporada.

Responsable de:

* prize money
* final standings
* Hall of Fame
* aging
* retirements
* regens
* contract expiry
* regulation updates
* next season calendar

---

## 3.5 Offseason Tick

Semanas especiales entre temporadas.

Responsable de:

* driver market
* staff market
* car concept selection
* winter development
* owner objectives

---

# 4. Weekly execution order

El orden debe ser estable.

```text
advanceWeek(save):
    1. validateSaveState
    2. clearExpiredTemporaryReports
    3. resolvePendingAutomatedEffects
    4. processMonthlyTickIfNeeded
    5. processDevelopmentTick
    6. processManufacturingTick
    7. processDriverMoraleTick
    8. processStaffMoraleTick
    9. processAcademyTick
    10. processAIDecisions
    11. processPoliticsTick
    12. checkRaceWeekend
    13. generateReports
    14. advanceCalendarPosition
    15. validateSaveState
```

---

## 4.1 Why order matters

Development should complete before race weekend reports.

AI should make decisions before standings and political reports update.

Finance should tick before allowing new spending.

Validation should happen before and after.

---

# 5. Race weekend execution order

```text
raceWeekendFlow:
    1. prePracticeSetupCommand
    2. simulatePractice
    3. generatePracticeReport
    4. qualifyingSetupLockCommand
    5. simulateQualifyingQ1Q2Q3
    6. generateQualifyingReport
    7. raceStrategyCommand
    8. simulateRaceWithDecisionEvents
    9. generateRaceResult
    10. applyDamageAndWear
    11. updateStandings
    12. updateMorale
    13. updateSponsorsAndMedia
    14. updateTechnicalLearning
    15. summarizeTemporaryRaceState
    16. clearLapByLapTemporaryState
```

---

# 6. Race simulation mode

## 6.1 Interactive player race

For player race weekends:

```text
race sim pauses on decision events
```

Decision events:

* safety car
* rain transition
* pit window
* undercut opportunity
* overcut opportunity
* tire cliff risk
* mechanical issue
* team orders opportunity

---

## 6.2 AI-only race simulation

When simulating AI decisions during race:

* same race engine
* AI strategy module handles choices
* no UI pauses

---

## 6.3 Headless simulation

Used for:

* tests
* 10/30/100 season simulations
* balancing

Must not require React/UI.

---

# 7. Pending decisions

## 7.1 Purpose

Pending decisions stop time progression.

Examples:

* contract response
* sponsor offer
* FIA vote
* race strategy
* pit decision
* upgrade completed requiring manufacturing choice

---

## 7.2 PendingDecision schema

```ts
interface PendingDecision {
  id: string
  type: PendingDecisionType
  year: number
  week: number
  related_entity_ids: string[]
  title: string
  summary: string
  options: DecisionOption[]
  expires_week?: number
  required: boolean
}
```

```ts
type PendingDecisionType =
  | "contract"
  | "sponsor"
  | "fia_vote"
  | "race_strategy"
  | "pit_decision"
  | "upgrade_manufacturing"
  | "owner_demand"
```

---

## 7.3 Decision resolution

```ts
resolveDecision(save, decisionId, optionId): SaveGame
```

Should:

* validate option
* apply consequences
* remove or update decision
* generate report
* keep deterministic state

---

# 8. Reports system

## 8.1 Reports are output, not logic

Reports explain what happened.

They should not drive simulation.

Simulation creates events.
Reports summarize them.

---

## 8.2 Report generation

Each module can emit report candidates.

Then report engine filters:

* relevance
* severity
* player team relation
* importance
* duplicates

---

## 8.3 Report lifecycle

```text
minor reports: expire after weeks
major reports: archived as news/historical event if important
critical reports: stay until addressed
```

---

# 9. RNG architecture

## 9.1 Seeded RNG

Use deterministic seeded RNG.

Recommended:

```text
world_seed
season_seed
week_seed
race_seed
```

---

## 9.2 RNG channels

Separate RNG channels prevent unrelated changes from cascading too much.

```text
rng.race
rng.development
rng.ai
rng.weather
rng.regen
rng.media
```

---

## 9.3 Example

```ts
const rng = createRng(save.rng.world_seed, `race:${raceWeekendId}`)
```

---

## 9.4 Avoid Math.random

Never use:

```ts
Math.random()
```

inside simulation.

---

# 10. Module responsibilities

## 10.1 Core module

Responsible for:

* tick order
* calendar
* phase changes
* validation
* orchestration

Does not know detailed formulas.

---

## 10.2 Race module

Responsible for:

* qualifying
* race
* tire state
* weather
* safety car
* incidents
* pit events
* standings output

---

## 10.3 Development module

Responsible for:

* project progress
* correlation
* upgrade completion
* manufacturing handoff
* knowledge changes

---

## 10.4 Economy module

Responsible for:

* monthly cash
* cost cap
* crash costs
* sponsor payments
* negative cash rules

---

## 10.5 AI module

Responsible for:

* team decisions
* strategy decisions
* contracts
* technical focus
* politics
* budget decisions

---

## 10.6 Driver module

Responsible for:

* morale
* form
* progression
* aging
* contracts effects
* retirement checks

---

## 10.7 Academy module

Responsible for:

* junior standings
* scouting
* regens
* talent development

---

## 10.8 Politics module

Responsible for:

* FIA votes
* regulation pressure
* political blocks
* vote results
* regulation creation

---

## 10.9 History module

Responsible for:

* season summaries
* career stats
* records
* Hall of Fame
* eras
* historical events

---

# 11. State mutation policy

## 11.1 Preferred approach

Use immutable-style updates where practical.

```ts
function processEconomyTick(save: SaveGame): SaveGame
```

---

## 11.2 Avoid hidden side effects

Do not mutate unrelated systems inside low-level functions.

Bad:

```ts
calculateLapTime() updates morale
```

Good:

```ts
calculateLapTime() returns lap result
postRaceMoraleSystem() updates morale
```

---

# 12. Validation

## 12.1 Pre/post validation

Important engine entry points should validate:

```text
before tick
after tick
before save load
after migration
```

---

## 12.2 Critical invariants

Validate:

* team IDs exist
* driver IDs exist
* no duplicate active drivers
* cash is number
* standings points are number
* current week valid
* race weekend status valid
* no active project exceeds limit
* component stock valid
* save version valid

---

# 13. Error handling

## 13.1 Simulation errors

Hard fail in development.

In production:

* show recoverable error
* prevent save corruption
* keep backup previous save

---

## 13.2 Save backups

Before saving:

```text
keep previous valid save snapshot
```

---

# 14. Headless simulation tools

Build internal tools early.

```ts
simulateOneSeason(seed)
simulateManySeasons(seed, count)
runBalanceBatch(seedCount)
```

Outputs:

* champions
* cash distribution
* race winners
* average gaps
* bankruptcies
* driver age distribution
* upgrade success rates

---

# 15. Performance strategy

## 15.1 Do not persist micro history

Never keep permanently:

* every lap forever
* every practice run forever
* every minor report forever

Summarize.

---

## 15.2 Active race only

Lap-by-lap state lives only during active race.

After race:

```text
summarize → store result → clear temporary logs
```

---

## 15.3 Batch simulations

For AI-only seasons:

* skip UI
* skip minor reports
* summarize events
* use same formulas

---

# 16. Testing architecture

## 16.1 Unit tests

Test each module separately:

* economy tick
* development tick
* race lap time
* tire wear
* AI decision scoring
* save migration

---

## 16.2 Integration tests

Test:

```text
new save → simulate 1 race → update standings
new save → simulate 1 season → produce champion
new save → simulate 10 seasons → no corruption
```

---

## 16.3 Deterministic tests

```text
same seed + same commands = same result
```

---

# 17. Command examples

## 17.1 Start development project

```ts
interface StartDevelopmentProjectCommand {
  type: "START_DEVELOPMENT_PROJECT"
  team_id: string
  area: TechnicalArea
  target_type: "focused" | "package"
  risk_level: "safe" | "normal" | "aggressive"
}
```

---

## 17.2 Continue week

```ts
interface ContinueWeekCommand {
  type: "CONTINUE_WEEK"
}
```

---

## 17.3 Race strategy

```ts
interface SetRaceStrategyCommand {
  type: "SET_RACE_STRATEGY"
  race_weekend_id: string
  driver_id: string
  preset: "aggressive" | "balanced" | "tire_save" | "weather_gamble"
}
```

---

# 18. Recommended implementation files

```text
/src/simulation/core/advanceWeek.ts
/src/simulation/core/scheduler.ts
/src/simulation/core/phases.ts
/src/simulation/core/pendingDecisions.ts
/src/simulation/core/commands.ts
/src/simulation/core/validation.ts

/src/simulation/rng/seededRng.ts
/src/simulation/rng/rngChannels.ts

/src/simulation/reports/reportEngine.ts
/src/simulation/reports/reportTypes.ts

/src/simulation/race/simulateRace.ts
/src/simulation/race/simulateQualifying.ts
/src/simulation/race/tireEngine.ts
/src/simulation/race/weatherEngine.ts
/src/simulation/race/strategyEvents.ts

/src/simulation/development/developmentTick.ts
/src/simulation/development/upgradeCompletion.ts
/src/simulation/development/correlation.ts

/src/simulation/economy/economyTick.ts
/src/simulation/economy/costCap.ts

/src/simulation/ai/runTeamAI.ts
/src/simulation/ai/scoreActions.ts

/src/simulation/history/seasonHistory.ts
/src/simulation/history/hallOfFame.ts
```

---

# 19. Minimum engine MVP

Minimum engine must support:

```text
new save
continue week
race week detection
simulate qualifying
simulate race
update standings
generate reports
manual save/load
```

---

# 20. Engine alpha definition

Engine alpha is ready when:

* 1 season can be completed headless
* 12 races simulate correctly
* standings update correctly
* save/load works
* same seed reproduces same season
* reports generate
* no invalid IDs

---

# 21. Status

Simulation Engine Architecture is ready for implementation planning.

Recommended next documents:

```text
balance_philosophy.md
race_simulation_deep_dive.md
event_system_v0.md
```

Before Codex coding, export all docs into `/docs`.
