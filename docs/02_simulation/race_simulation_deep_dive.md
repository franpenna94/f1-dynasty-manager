# F1 Dynasty Manager — Race Simulation Deep Dive

## Purpose

Este documento define el funcionamiento completo de un fin de semana de carrera.

Describe:

* prácticas
* setup
* clasificación
* estrategia
* carrera
* neumáticos
* clima
* safety car
* decisiones del jugador

No define UI.

No define implementación técnica.

No define fórmulas exactas.

This document defines race logic.

All mathematical formulas are owned by:

system_formulas_v0.md

---

# Race Weekend Structure

Cada fin de semana se divide en:

```text
Practice
↓
Qualifying
↓
Race
```

---

# Practice Sessions

## Purpose

Las prácticas sirven para:

* mejorar setup
* obtener información del circuito
* mejorar predicción estratégica

No existen decisiones extremadamente técnicas.

La profundidad debe ser accesible.

---

## Setup Development

Cada equipo llega con:

```text
Base Setup
```

La calidad inicial depende de:

* track understanding
* calidad técnica
* experiencia previa
* feedback de pilotos

---

## Setup Quality

Cada auto posee:

```text
setupQuality
```

Escala:

```text
0-100
```

---

Un setup mejor genera:

* mejor qualifying
* mejor carrera
* mejor gestión de neumáticos

---

## Setup Window

Cada auto posee:

```text
setupWindow
```

Representa qué tan fácil es encontrar un setup competitivo.

Autos extremos:

```text
más difíciles
```

Autos equilibrados:

```text
más fáciles
```

---

# Driver Feedback

Los pilotos generan feedback.

La calidad depende de:

```text
feedback
experience
confidence
```

---

Pilotos con mejor feedback:

* ayudan setup
* ayudan desarrollo técnico

---

# Qualifying

## Structure

Clasificación completa:

```text
Q1
Q2
Q3
```

---

## Qualifying Performance

La performance de clasificación surge de:

```text
carPerformance
qualifyingSkill
setupQuality
trackFit
weather
traffic
```

---

## Traffic

Existe tráfico abstracto.

Puede afectar:

```text
lap quality
```

---

Nunca debe destruir una clasificación completa de forma frecuente.

---

## Push Lap

Los pilotos realizan vueltas push.

La ejecución depende de:

```text
qualifyingSkill
confidence
consistency
```

---

## Qualifying Output

Resultado:

```text
startingGrid
```

---

# Parc Fermé

Después de clasificación:

```text
Parc Fermé
```

---

No pueden modificarse elementos importantes del setup.

---

Salir desde pit lane permite:

```text
romper parc fermé
```

Con penalización correspondiente.

---

# Race Strategy

Antes de la carrera el jugador define:

## Primary Strategy

Ejemplos:

```text
Aggressive
Balanced
Tire Saving
```

---

## Starting Compound

Opciones:

```text
Soft
Medium
Hard
```

---

## Pit Plan

Plan inicial:

```text
1 Stop
2 Stop
Flexible
```

---

## Team Orders

Opcional.

Puede definirse:

```text
Free Race
Protect Position
Support Lead Driver
```

---

# Tyre Model

## Compounds

Disponibles:

```text
Soft
Medium
Hard
Intermediate
Wet
```

---

## Tyre Properties

Cada compuesto posee:

```text
initialGrip
durability
thermalSensitivity
```

---

## Soft

Características:

```text
máximo grip
menor duración
```

---

## Medium

Características:

```text
balanceado
```

---

## Hard

Características:

```text
menor grip
mayor duración
```

---

## Intermediate

Usado en:

```text
lluvia moderada
```

---

## Wet

Usado en:

```text
lluvia intensa
```

---

# Tyre Degradation

La degradación depende de:

```text
compound
temperature
carConcept
driverStyle
dirtyAir
setup
```

---

## Dirty Air

El aire sucio aumenta:

```text
degradation
```

---

## Tire Saving

Los pilotos pueden:

```text
Push
Normal
Conserve
```

---

Conservar neumáticos:

```text
menos ritmo
menos degradación
```

---

# Weather System

## Philosophy

El clima es dinámico.

No cambia por azar puro.

Cada carrera posee:

```text
weatherForecast
```

---

## Forecast Accuracy

La precisión depende de:

```text
staffQuality
```

---

## Conditions

Estados:

```text
Dry
Light Rain
Moderate Rain
Heavy Rain
```

---

## Rain Impact

La lluvia aumenta la importancia de:

```text
driver skill
setup
strategy
```

---

# Race Simulation

## Simulation Scale

La carrera se simula:

```text
lap by lap
```

---

No sector por sector.

---

## Race Pace

Cada vuelta utiliza:

```text
carPerformance
driverPerformance
tyreState
weather
fuelEffect
traffic
```

---

# Overtaking

Los adelantamientos dependen de:

```text
pace advantage
driver skill
tyre advantage
track characteristics
```

---

## Undercut

Implementado.

Beneficia:

```text
neumáticos frescos
```

---

## Overcut

Implementado.

Beneficia:

```text
aire limpio
```

---

# Incidents

## Philosophy

Los incidentes existen.

No dominan la simulación.

---

## Possible Incidents

```text
Spin
Collision
Damage
DNF
```

---

## Influencing Factors

```text
aggression
weather
pressure
reliability
```

---

# Reliability

Cada auto posee:

```text
reliability
```

---

Afecta:

```text
DNF risk
```

---

# Pit Stops

## Standard Stop

Incluye:

```text
entry
service
exit
```

---

## Pit Crew Quality

Cada equipo posee:

```text
pitCrewRating
```

---

Afecta:

```text
pit time
mistake chance
```

---

## Pit Mistakes

Posibles:

```text
slow stop
wheel issue
```

---

Deben ser poco frecuentes.

---

# Safety Car

## Trigger

Puede generarse por:

```text
major crash
track blockage
weather
```

---

## Effects

Comprime diferencias.

Reduce tiempo perdido en pits.

Reordena oportunidades estratégicas.

---

## Strategic Impact

Puede provocar:

```text
free stop
strategy change
compound switch
```

---

# In-Race Decisions

El jugador interviene únicamente cuando es relevante.

---

## Weather Decision

Ejemplo:

```text
Stay Out
Pit for Intermediates
Pit for Wets
```

---

## Safety Car Decision

Ejemplo:

```text
Pit
Stay Out
```

---

## Strategy Adjustment

Ejemplo:

```text
Undercut
Overcut
Extend Stint
Push
Conserve
```

---

# AI Race Behavior

La IA utiliza:

```text
same race systems
same weather systems
same tyre systems
same pit systems
```

---

La IA puede cometer errores.

---

Depende de:

```text
team culture
staff quality
driver quality
difficulty
```

---

# Race Outputs

Al finalizar la carrera se generan:

```text
race result
driver points
constructor points
DNFs
fastest lap
standings update
```

---

# Desired Feel

El jugador debe sentir:

```text
La carrera fue decidida por:
auto
pilotos
estrategia
clima
incidentes
```

y no por:

```text
azar arbitrario
```

---

# Golden Rule

```text
Strategy can beat pace.

But pace should win most of the time.
```
