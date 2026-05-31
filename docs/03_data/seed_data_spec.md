# F1 Dynasty Manager — Seed Data Spec v1

## 0. Propósito

Este documento define el contenido inicial mínimo necesario para arrancar una partida MVP.

No define nuevas mecánicas.

Su objetivo es evitar que Codex invente datos base sin criterio.

Este documento debe usarse junto con:

* `mvp_scope_v1.md`
* `data_schema_v0.md`
* `system_formulas_v0.md`
* `implementation_plan.md`

Principio rector:

```text
Seed data should be simple, deterministic, editable and good enough to validate the simulation.
```

---

# 1. Alcance del seed inicial

El seed inicial debe cubrir:

* 11 F1 teams
* 22 F1 drivers
* 12 race calendar
* basic circuits
* basic cars
* basic finances
* basic sponsors
* basic regulations
* basic AI profiles
* basic facilities
* basic staff placeholders

No necesita cubrir en MVP inicial:

* F2/F3 completas
* academia profunda
* mercado completo de staff
* sponsors complejos
* contratos avanzados
* base histórica completa

---

# 2. Naming convention

Todos los IDs deben estar en inglés, snake_case.

Ejemplos:

```text
team_williams
driver_alex_albon
circuit_bahrain
sponsor_title_williams_2026
regulation_2026_base
```

Los labels visibles pueden estar en inglés.

Ejemplo:

```json
{
  "id": "team_williams",
  "name": "Williams",
  "shortName": "WIL"
}
```

---

# 3. Teams seed

## 3.1 Número de equipos

MVP usa:

```text
11 F1 teams
```

El jugador solo puede elegir equipos de mitad/fondo de parrilla.

---

## 3.2 Team fields mínimos

Cada equipo debe incluir:

```ts
interface TeamSeed {
  id: string
  name: string
  shortName: string
  country: string
  tier: "front" | "upper_midfield" | "midfield" | "backmarker"
  selectableByPlayer: boolean
  startingCash: number
  reputation: number
  facilitiesLevel: number
  staffQuality: number
  aiProfileId: string
  ownerProfileId: string
  technicalConceptId: string
}
```

---

## 3.3 Team tiers

Usar tiers para balance inicial.

```text
front
upper_midfield
midfield
backmarker
```

Los tiers afectan:

* car baseline
* cash
* facilities
* reputation
* owner expectations
* sponsor attractiveness

---

## 3.4 Player selectable teams

Para MVP, `selectableByPlayer` debe ser `true` solo para equipos:

```text
midfield
backmarker
```

No permitir empezar con equipos top.

---

# 4. Drivers seed

## 4.1 Número de pilotos

MVP usa:

```text
22 F1 starting drivers
```

---

## 4.2 Driver fields mínimos

```ts
interface DriverSeed {
  id: string
  firstName: string
  lastName: string
  nationality: string
  age: number
  currentTeamId: string
  marketValue: number
  salary: number
  attributes: DriverAttributesSeed
  personality: DriverPersonalitySeed
}
```

---

## 4.3 Driver attributes mínimos

Escala 0-100.

```ts
interface DriverAttributesSeed {
  pace: number
  qualifying: number
  racePace: number
  consistency: number
  racecraft: number
  overtaking: number
  defending: number
  tireManagement: number
  wetSkill: number
  feedback: number
  aggression: number
  pressureResistance: number
  experience: number
  adaptability: number
  marketability: number
}
```

---

## 4.4 Driver personality mínimos

```ts
interface DriverPersonalitySeed {
  ego: number
  loyalty: number
  ambition: number
  emotionalStability: number
  mediaComfort: number
  traits: string[]
}
```

---

# 5. Car seed

## 5.1 Car baseline por equipo

Cada equipo inicia con un auto asociado.

```ts
interface CarSeed {
  id: string
  teamId: string
  year: number
  conceptId: string
  attributes: CarAttributesSeed
  stability: CarStabilitySeed
}
```

---

## 5.2 Car attributes mínimos

Escala 0-100.

```ts
interface CarAttributesSeed {
  downforce: number
  lowSpeedGrip: number
  highSpeedGrip: number
  dragEfficiency: number
  tirePreservation: number
  cooling: number
  reliability: number
  weightEfficiency: number
  setupWindow: number
  correlationConfidence: number
  powerUnitScore: number
  brakeScore: number
}
```

---

## 5.3 Car stability mínimos

```ts
interface CarStabilitySeed {
  overallStability: number
  rearStability: number
  brakingStability: number
  wetStability: number
  nervousness: number
  driverDifficulty: number
}
```

---

# 6. Technical concepts seed

## 6.1 Conceptos iniciales

Usar los conceptos definidos en `tech_tree_v0.md`:

```text
low_drag
high_downforce
balanced
tire_saver
unstable_high_peak
quali_specialist
```

---

## 6.2 Concept fields mínimos

```ts
interface TechnicalConceptSeed {
  id: string
  name: string
  strengths: string[]
  weaknesses: string[]
  compatibleConceptIds: string[]
  incompatibleConceptIds: string[]
}
```

---

# 7. Calendar seed

## 7.1 Número de carreras

MVP usa:

```text
12 races
```

---

## 7.2 RaceWeekend seed

```ts
interface RaceWeekendSeed {
  id: string
  year: number
  round: number
  circuitId: string
  raceName: string
  weekIndex: number
}
```

---

## 7.3 Calendar rules

El calendario debe:

* distribuir 12 carreras durante la temporada
* dejar semanas sin carrera para desarrollo
* incluir un summer break simple si no complica MVP
* permitir season transition

---

# 8. Circuits seed

## 8.1 Circuit fields mínimos

```ts
interface CircuitSeed {
  id: string
  name: string
  country: string
  baseLapTime: number
  laps: number
  downforceWeight: number
  dragWeight: number
  tireStressWeight: number
  powerWeight: number
  brakeWeight: number
  lowSpeedWeight: number
  highSpeedWeight: number
  reliabilityStress: number
  overtakingDifficulty: number
  weatherVolatility: number
  safetyCarBaseRate: number
}
```

---

## 8.2 Circuit profile examples

Debe haber variedad de perfiles:

```text
high_speed
low_speed
balanced
street
hot_tire_stress
wet_variable
power_sensitive
```

---

# 9. Regulations seed

## 9.1 MVP regulation

MVP necesita un único reglamento base:

```text
regulation_2026_base
```

---

## 9.2 Regulation fields mínimos

```ts
interface RegulationSeed {
  id: string
  name: string
  startYear: number
  costCapLimit: number
  developmentSlotsLimit: number
  raceLengthFactor: number
  active: boolean
}
```

---

# 10. Sponsors seed

## 10.1 Sponsor mínimo por equipo

Cada equipo debe iniciar con al menos:

* title sponsor or main sponsor
* monthly payment
* simple performance bonus

---

## 10.2 Sponsor fields mínimos

```ts
interface SponsorSeed {
  id: string
  name: string
  teamId: string
  tier: "title" | "major" | "minor" | "technical_partner" | "regional"
  monthlyPayment: number
  performanceBonus: number
  reputationSensitivity: number
}
```

---

# 11. Facilities seed

## 11.1 Facility baseline

Para MVP, facilities pueden empezar como ratings agregados.

```ts
interface FacilitiesSeed {
  teamId: string
  windTunnel: number
  cfd: number
  simulator: number
  manufacturing: number
  academy: number
  pitCrewCenter: number
  headquarters: number
}
```

Escala 0-100.

---

# 12. Staff seed

## 12.1 Staff placeholder

MVP puede usar staff agregado por equipo.

```ts
interface StaffSeed {
  teamId: string
  technicalDirectorQuality: number
  aeroQuality: number
  strategyQuality: number
  manufacturingQuality: number
  academyQuality: number
  commercialQuality: number
}
```

Escala 0-100.

---

# 13. AI profile seed

## 13.1 AI profiles mínimos

Cada equipo debe tener un perfil AI.

```ts
interface AIProfileSeed {
  id: string
  teamId: string
  competence: number
  technicalRisk: "conservative" | "balanced" | "aggressive"
  economicStyle: "spender" | "conservative" | "survival"
  culture: "aggressive" | "innovative" | "political" | "stable" | "chaotic" | "youth_focused" | "marketing_first"
  planningHorizon: "short" | "medium" | "long"
}
```

---

# 14. Owner profile seed

## 14.1 Owner fields mínimos

```ts
interface OwnerProfileSeed {
  id: string
  teamId: string
  personality: "conservative" | "ambitious" | "marketing_first" | "cost_cutter" | "prestige_driven" | "patient_builder"
  patience: number
  ambition: number
  financialStrength: number
  interference: number
}
```

---

# 15. Free agents seed

## 15.1 MVP free agents

MVP puede incluir un pool pequeño:

```text
10-20 free agent drivers
```

Uso:

* testing de contratos futuros
* replacement drivers
* season 2 expansion

No necesita mercado profundo en primer corte.

---

# 16. Junior seed

## 16.1 MVP juniors

Para MVP, junior system puede ser placeholder.

Opcional:

```text
20-40 junior drivers
```

No requiere simulación F2/F3 completa.

---

# 17. Initial balance rules

## 17.1 Team performance spread

Seed inicial debe respetar:

```text
front teams > upper midfield > midfield > backmarkers
```

Pero no debe bloquear progreso.

---

## 17.2 Car gap target

Usar como guía:

```text
best car vs worst car: around 1.5s - 2.5s per lap in MVP seed
```

---

## 17.3 Player team difficulty

Los equipos seleccionables deben tener:

* limitaciones claras
* potencial de progreso
* cash suficiente para no quebrar inmediatamente
* objetivos realistas

---

# 18. File layout

Seed data sugerido:

```text
/src/data/seeds/teams.ts
/src/data/seeds/drivers.ts
/src/data/seeds/cars.ts
/src/data/seeds/circuits.ts
/src/data/seeds/calendar.ts
/src/data/seeds/regulations.ts
/src/data/seeds/sponsors.ts
/src/data/seeds/facilities.ts
/src/data/seeds/staff.ts
/src/data/seeds/aiProfiles.ts
/src/data/seeds/owners.ts
/src/data/seeds/index.ts
```

---

# 19. Validation rules

Seed data debe validar:

* todos los teams tienen 2 drivers
* todos los drivers tienen team válido o free agent status
* todos los cars tienen team válido
* todos los race weekends tienen circuit válido
* todos los sponsors tienen team válido
* todos los teams tienen AI profile
* todos los teams tienen facilities
* no duplicate IDs

---

# 20. MVP done condition

Seed data está listo cuando:

* new save can be generated
* all IDs resolve
* 12-race season can simulate
* standings can update
* finances can tick monthly
* development can start
* save/load validates

---

# 21. Golden Rule

```text
Seed data is not final content.
Seed data exists to make the simulation playable and testable.
```
