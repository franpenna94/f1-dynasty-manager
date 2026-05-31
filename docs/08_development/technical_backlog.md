# F1 Dynasty Manager — Technical Backlog

## Purpose

Este documento define el orden recomendado de implementación.

Objetivos:

* construir el MVP lo antes posible
* minimizar retrabajo
* validar la simulación temprano
* evitar sobreingeniería

Principio rector:

```text
Playable > Complete
```

---

# Sprint 0 — Foundation

## Goal

Crear la base técnica del proyecto.

---

## TASK-001

Project Bootstrap

Implementar:

```text
Next.js
TypeScript
Tailwind
Zustand
Zod
```

Done cuando:

```text
la aplicación compila y corre
```

---

## TASK-002

Folder Structure

Crear:

```text
/src

/core
/simulation
/features
/ui
/data
/types
```

---

## TASK-003

Core Types

Implementar:

```text
Team
Driver
Car
Race
Season
SaveGame
```

---

## TASK-004

Game State Store

Implementar:

```text
GameState
```

Incluyendo:

```text
season
week
calendar
teams
drivers
standings
```

---

# Sprint 1 — Headless Simulator

## Goal

Simular una temporada sin UI.

---

## TASK-005

Calendar Generator

Generar:

```text
12 races
race weeks
off weeks
```

---

## TASK-006

Standings Engine

Implementar:

```text
Driver Standings
Constructor Standings
```

---

## TASK-007

Car Performance Engine

Implementar:

```text
car performance
track fit
car rating
```

---

## TASK-008

Driver Performance Engine

Implementar:

```text
race pace
qualifying pace
consistency
```

---

## TASK-009

Race Simulator v0

Inputs:

```text
cars
drivers
track
weather
```

Outputs:

```text
race result
points
DNFs
```

---

## TASK-010

Season Simulator

Debe permitir:

```text
simulate full season
```

Resultado:

```text
champion
constructor champion
season standings
```

---

# Sprint 2 — Playable Loop

## Goal

Jugar semana a semana.

---

## TASK-011

Week Advance System

Botón:

```text
Continue Week
```

---

## TASK-012

Calendar Screen

Mostrar:

```text
current week
next race
calendar
```

---

## TASK-013

Standings Screen

Mostrar:

```text
drivers
constructors
```

---

## TASK-014

Race Results Screen

Mostrar:

```text
classification
points
DNFs
```

---

## TASK-015

Overview Screen

Mostrar:

```text
team
cash
position
objectives
```

---

# Sprint 3 — Economy

## Goal

Que el dinero importe.

---

## TASK-016

Cash System

Implementar:

```text
income
expenses
cash
```

---

## TASK-017

Sponsor System v0

Implementar:

```text
monthly income
bonus
```

---

## TASK-018

Operating Costs

Implementar:

```text
staff costs
operations costs
```

---

## TASK-019

Prize Money

Implementar:

```text
season rewards
```

---

## TASK-020

Negative Cash Rules

Implementar:

```text
warnings
spending restrictions
```

---

# Sprint 4 — Development

## Goal

Permitir mejorar el auto.

---

## TASK-021

Upgrade Areas

Implementar:

```text
floor
front wing
rear wing
suspension
cooling
weight reduction
```

---

## TASK-022

Project System

Cada proyecto posee:

```text
cost
ETA
risk
```

---

## TASK-023

Upgrade Resolution

Resultados posibles:

```text
success
partial success
rare failure
```

---

## TASK-024

AI Development

Los rivales desarrollan autos.

---

## TASK-025

Performance Evolution

Las mejoras afectan realmente al auto.

---

# Sprint 5 — Race Weekend

## Goal

Agregar profundidad deportiva.

---

## TASK-026

Practice System

Implementar:

```text
setup confidence
track understanding
```

---

## TASK-027

Qualifying System

Implementar:

```text
Q1
Q2
Q3
```

---

## TASK-028

Tyre Model

Implementar:

```text
soft
medium
hard
intermediate
wet
```

---

## TASK-029

Weather System

Implementar:

```text
forecast
dynamic weather
```

---

## TASK-030

Safety Car System

Implementar:

```text
deployment
race compression
pit opportunities
```

---

## TASK-031

Race Decisions

Implementar:

```text
pit decisions
weather decisions
strategy adjustments
```

---

# Sprint 6 — Long Term Simulation

## Goal

Validar múltiples temporadas.

---

## TASK-032

Season Transition

Implementar:

```text
new season
reset standings
prize money
```

---

## TASK-033

Driver Aging

Implementar:

```text
aging
decline
retirement
```

---

## TASK-034

Driver Progression

Implementar:

```text
development
potential realization
```

---

## TASK-035

Historical Records

Guardar:

```text
champions
wins
podiums
titles
```

---

# Sprint 7 — Persistence

## Goal

Guardar carreras largas.

---

## TASK-036

Save System

Implementar:

```text
manual save
```

---

## TASK-037

Load System

Implementar:

```text
manual load
```

---

## TASK-038

Multiple Save Slots

Implementar:

```text
save slots
```

---

## TASK-039

Save Versioning

Implementar:

```text
save_version
schema_version
```

---

# Sprint 8 — AI

## Goal

Crear rivales competentes.

---

## TASK-040

AI Economy

---

## TASK-041

AI Development

---

## TASK-042

AI Strategy

---

## TASK-043

AI Driver Decisions

---

## TASK-044

Difficulty Levels

Implementar:

```text
Easy
Normal
Hard
Expert
```

---

# Sprint 9 — World Layer

## Goal

Dar vida al mundo.

---

## TASK-045

Basic Event System

---

## TASK-046

News System

---

## TASK-047

Narrative System

---

## TASK-048

Reputation System

---

# Sprint 10 — Polish

## Goal

Preparar Alpha.

---

## TASK-049

Balance Pass

---

## TASK-050

Performance Pass

---

## TASK-051

UI Cleanup

---

## TASK-052

Bug Fixing

---

# MVP Complete Definition

El MVP se considera completo cuando el jugador puede:

```text
choose a team
↓
play a season
↓
develop the car
↓
manage finances
↓
race
↓
save
↓
load
↓
start season 2
```

---

# Alpha Complete Definition

Además del MVP:

```text
events
narratives
history
stable AI
balanced economy
```

---

# Golden Rule

Si una tarea no mejora:

```text
decision making
simulation quality
replayability
```

No pertenece al MVP.
