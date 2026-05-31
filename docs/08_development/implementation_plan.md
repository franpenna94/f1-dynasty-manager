# F1 Dynasty Manager — Implementation Plan

## Purpose

Este documento define la estrategia técnica para construir F1 Dynasty Manager.

No define mecánicas.

No define fórmulas.

No define balance.

Esos temas pertenecen a otros documentos.

Este documento define:

* arquitectura general
* stack tecnológico
* organización del proyecto
* orden de implementación
* filosofía de desarrollo

---

# Project Goal

Construir un simulador profundo de gestión de Fórmula 1 centrado en:

* management
* desarrollo técnico
* economía
* estrategia
* política
* progresión histórica

El foco principal es:

```text
simulation first
```

La UI existe para servir a la simulación.

Nunca al revés.

---

# Authoritative Documents

Todos los sistemas deben implementarse respetando el siguiente orden de autoridad.

## Product

* vision.md
* mvp_scope_v1.md
* balance_philosophy.md

---

## Simulation

* simulation_architecture.md
* simulation_engine_architecture.md
* system_formulas_v0.md
* race_simulation_deep_dive.md

---

## Data

* data_schema_v0.md
* savegame_spec.md
* seed_data_spec.md

---

## AI

* ai_design_v0.md

---

## Technical Development

* tech_tree_v0.md

---

## World

* event_system_v0.md
* content_generation_rules.md

---

## UX

* ux_flow_v0.md

---

## Execution

* technical_backlog.md
* balance_metrics_dashboard.md

---

# Conflict Resolution

Si dos documentos entran en conflicto:

```text
vision.md
↓
simulation_architecture.md
↓
system_formulas_v0.md
↓
data_schema_v0.md
↓
implementation_plan.md
```

El documento superior tiene prioridad.

---

# Technical Philosophy

## Simulation First

El simulador debe existir antes que la interfaz.

Orden correcto:

```text
Simulation
↓
Validation
↓
UI
```

Nunca:

```text
UI
↓
Simulation
```

---

## Deterministic Core

Todos los sistemas centrales deben ser deterministas.

La variabilidad debe surgir de:

* información imperfecta
* clima
* errores humanos
* decisiones estratégicas

No de azar arbitrario.

---

## Data Driven

Toda la simulación debe construirse alrededor de datos.

Evitar:

```text
hardcoded logic
```

Preferir:

```text
configuration
schemas
seed data
```

---

## Long-Term Stability

El sistema debe soportar:

```text
100+ seasons
```

sin degradación significativa.

---

# Technology Stack

## Frontend

```text
Next.js
TypeScript
Tailwind
```

---

## State Management

```text
Zustand
```

---

## Validation

```text
Zod
```

---

## Charts

Opcional:

```text
Recharts
```

---

## Persistence

Inicialmente:

```text
JSON Saves
```

Luego:

```text
compressed saves
```

---

# Project Structure

```text
/src

app/

simulation/
core/
features/
ui/
data/
types/
utils/
```

---

# Simulation Layer

```text
simulation/
```

Contiene:

* race simulation
* economy
* development
* AI
* politics
* world systems

No contiene UI.

---

# Data Layer

```text
data/
```

Contiene:

* seed data
* static data
* regulation data
* circuit data

---

# UI Layer

```text
ui/
```

Contiene:

* components
* layouts
* tables
* cards

No contiene lógica de simulación.

---

# Core Development Strategy

## Phase 1

Headless Simulation

Objetivo:

```text
simulate season
```

Sin interfaz.

---

## Phase 2

Playable Loop

Objetivo:

```text
week progression
```

---

## Phase 3

Economy

Objetivo:

```text
cash matters
```

---

## Phase 4

Technical Development

Objetivo:

```text
improve car
```

---

## Phase 5

Race Weekend

Objetivo:

```text
strategic racing
```

---

## Phase 6

Multi Season

Objetivo:

```text
long term careers
```

---

## Phase 7

AI

Objetivo:

```text
competitive opponents
```

---

## Phase 8

World Layer

Objetivo:

```text
living paddock
```

---

## Phase 9

Polish

Objetivo:

```text
alpha quality
```

---

# MVP Definition

El MVP está terminado cuando:

* el jugador puede elegir equipo
* puede jugar una temporada completa
* puede desarrollar el auto
* puede administrar presupuesto
* puede correr carreras
* puede guardar partida
* puede cargar partida
* puede comenzar temporada 2

---

# Non Goals For MVP

No implementar inicialmente:

* multiplayer
* modding
* advanced graphics
* detailed telemetry
* complete F2/F3 simulation
* complex contract clauses
* advanced politics

---

# Coding Standards

## Naming

Todo código debe estar en inglés.

---

## Schemas

Todo schema debe estar en inglés.

---

## UI

Todo texto visible debe estar en inglés.

---

## Documentation

Puede mantenerse en español.

---

# Codex Working Rules

Al implementar:

* no inventar sistemas
* respetar documentos
* priorizar simulación
* evitar sobreingeniería
* evitar dependencias innecesarias

Si falta información:

```text
flag the issue
do not invent mechanics
```

---

# Success Criteria

El proyecto es exitoso si:

* genera historias emergentes
* soporta carreras largas
* permite múltiples estrategias
* produce eras técnicas
* produce ciclos competitivos
* sigue siendo divertido después de muchas temporadas

---

# Golden Rule

```text
The simulation creates the story.

The code exists to support the simulation.
```
