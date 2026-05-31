# F1 Dynasty Manager — Balance Metrics Dashboard

## Purpose

Este documento define las métricas internas utilizadas para validar el balance de la simulación.

Estas métricas NO son para el jugador.

Son herramientas de desarrollo.

Objetivos:

* detectar problemas de balance
* validar simulaciones largas
* identificar exploits
* monitorear salud del mundo
* comparar versiones del simulador

---

# Balance Philosophy

No balanceamos por intuición.

Balanceamos observando:

```text
100 seasons
1000 races
millions of simulated laps
```

---

# Dashboard Levels

## Level 1

Single Season Analysis

---

## Level 2

10 Season Analysis

---

## Level 3

100 Season Analysis

---

## Level 4

1000 Season Stress Test

Uso interno exclusivamente.

---

# Championship Metrics

## Constructor Diversity

Mide:

```text
unique constructor champions
```

---

Objetivo:

Múltiples campeones a lo largo de décadas.

---

## Driver Diversity

Mide:

```text
unique driver champions
```

---

## Dynasty Frequency

Mide:

```text
2 consecutive titles
3 consecutive titles
5 consecutive titles
8+ consecutive titles
```

---

Objetivo:

Las dinastías deben existir.

No deben ser frecuentes.

---

# Grid Competitiveness

## Front-To-Back Gap

Mide:

```text
P1 vs P22 performance gap
```

---

Objetivos aproximados:

Después de cambios regulatorios grandes:

```text
2.0s - 3.0s
```

---

Era madura:

```text
0.8s - 1.5s
```

---

## Midfield Density

Mide:

```text
P5-P10 gap
```

---

Objetivo:

Zona media competitiva.

---

# Race Metrics

## Winners Per Season

Mide:

```text
unique race winners
```

---

Objetivo aproximado:

```text
2-6 winners
```

---

## Podium Diversity

Mide:

```text
teams reaching podiums
```

---

## Safety Cars

Mide:

```text
safety cars per season
```

---

## Wet Races

Mide:

```text
wet race percentage
```

---

## DNF Rate

Mide:

```text
DNFs per race
```

---

Objetivo:

Comportamiento realista.

---

# Driver Metrics

## Average Driver Age

Mide:

```text
mean age
```

---

## Rookie Promotions

Mide:

```text
rookies entering F1
```

---

## Rookie Success

Mide:

```text
rookie podiums
rookie wins
```

---

## Generational Talent Frequency

Mide:

```text
GENERATIONAL_TALENT narratives
```

---

Objetivo:

Muy raro.

---

## Retirement Distribution

Mide:

```text
retirement age distribution
```

---

# Team Metrics

## Financial Distribution

Mide:

```text
cash distribution
```

---

## Financial Crises

Mide:

```text
teams entering severe financial stress
```

---

## Bankruptcies

Mide:

```text
team bankruptcies
```

---

Objetivo:

Muy poco frecuentes.

---

## Team Revivals

Mide:

```text
fallen giant recoveries
```

---

# Technical Metrics

## Upgrade Success Rate

Mide:

```text
successful upgrades
```

---

Objetivo:

Mayoría exitosos.

---

## Failed Upgrade Rate

Mide:

```text
failed upgrades
```

---

Objetivo:

Baja frecuencia.

---

## Concept Diversity

Mide:

```text
low_drag
high_downforce
balanced
tire_saver
unstable_high_peak
quali_specialist
```

---

Objetivo:

No converger a un único concepto.

---

## Meta Duration

Mide:

```text
years a concept remains dominant
```

---

# Economy Metrics

## Cash Distribution

Mide:

```text
mean
median
max
min
```

---

## Cost Cap Violations

Mide:

```text
violations per season
```

---

## Sponsor Churn

Mide:

```text
sponsors gained
sponsors lost
```

---

# AI Metrics

## AI Development Timing

Mide:

```text
upgrade timing
```

---

## AI Concept Changes

Mide:

```text
concept switches
```

---

## AI Driver Decisions

Mide:

```text
contract behavior
```

---

## AI Financial Health

Mide:

```text
cash emergencies
```

---

# Politics Metrics

## FIA Changes

Mide:

```text
major changes
minor changes
```

---

## Anti-Dominance Votes

Mide:

```text
frequency
```

---

## Political Alliances

Mide:

```text
alliances formed
alliances dissolved
```

---

# Narrative Metrics

## Rookie Sensations

Mide:

```text
frequency per decade
```

---

## Fallen Giants

Mide:

```text
frequency
```

---

## Technical Revolutions

Mide:

```text
frequency
```

---

## Political Crises

Mide:

```text
frequency
```

---

## Historic Seasons

Mide:

```text
historic season narratives
```

---

# Hall of Fame Metrics

## Championship Distribution

Mide:

```text
title histogram
```

---

## Win Distribution

Mide:

```text
career wins histogram
```

---

## GOAT Distribution

Mide:

```text
GOAT score histogram
```

---

# World Health Scores

## Competitive Health

Combina:

```text
champion diversity
winner diversity
grid gaps
```

---

## Technical Health

Combina:

```text
concept diversity
innovation
upgrade success
```

---

## Talent Health

Combina:

```text
rookies
aging
retirements
academy output
```

---

## Economic Health

Combina:

```text
cash
sponsors
financial stability
```

---

## Overall World Health

Combina todos los indicadores.

Escala:

```text
0-100
```

---

# Automatic Alerts

## Red Alerts

Ejemplos:

```text
same champion 12 seasons
concept dominance 20 seasons
no rookie podiums 15 years
extreme financial concentration
```

---

## Yellow Alerts

Ejemplos:

```text
shrinking midfield
declining rookie promotions
AI repeating same strategy
```

---

# Batch Simulation Tools

Herramientas internas:

```text
simulate_1_season()

simulate_10_seasons()

simulate_100_seasons()

simulate_1000_seasons()
```

---

Output esperado:

```json
{
  "worldHealth": 82,
  "competitiveHealth": 79,
  "technicalHealth": 88,
  "economicHealth": 80
}
```

---

# Desired Outcome

Las métricas deben permitir detectar:

* exploits
* dominancias excesivas
* estancamiento técnico
* problemas económicos
* problemas de IA

Antes de que lleguen al jugador.

---

# Golden Rule

```text
If a metric looks wrong,
fix the simulation.

Do not add artificial scripts.
```
