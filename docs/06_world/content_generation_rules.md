# F1 Dynasty Manager — Content Generation Rules

## Purpose

Este documento define cómo se genera todo el contenido textual del juego.

Objetivos:

* evitar repetición
* soportar décadas de simulación
* generar variedad
* mantener coherencia
* transformar hechos en contenido

Principio rector:

```text
Content describes the simulation.
It never replaces the simulation.
```

---

# Content Philosophy

La simulación genera hechos.

El sistema de contenido únicamente los interpreta.

---

Flujo:

```text
Simulation
↓
Facts
↓
Interpretation
↓
Narrative Tags
↓
Text
```

---

# Sources

Todo contenido debe originarse en hechos reales.

Fuentes válidas:

```text
Race Results
Drivers
Teams
Technical Development
Sponsors
Finance
Academy
Politics
FIA
History
```

---

No generar contenido sin origen.

---

# Content Layers

## Layer 1 — Facts

Datos puros.

Ejemplo:

```text
Age: 19
Wins: 3
Podiums: 6
Championship Position: 4
```

---

## Layer 2 — Interpretation

El sistema interpreta.

Ejemplo:

```text
Young
Overperforming
High Visibility
```

---

## Layer 3 — Narrative Tags

Resultado:

```text
ROOKIE_SENSATION
```

---

## Layer 4 — Generated Text

Resultado final:

```text
Martinez continues his impressive rookie campaign.
```

---

# Content Types

## News

Noticias generales.

Duración:

```text
Short
```

Ejemplo:

```text
McLaren introduces a new floor package.
```

---

## Headlines

Titulares.

Duración:

```text
Immediate
```

Ejemplo:

```text
Rookie Takes First Victory
```

---

## Reports

Información operativa.

Duración:

```text
Functional
```

Ejemplo:

```text
Engineers expect higher tyre degradation this weekend.
```

---

## Rumors

Información incompleta.

Duración:

```text
Very Short
```

Ejemplo:

```text
Rumors suggest Alpine may pursue a veteran driver.
```

---

## Historical Entries

Información permanente.

Duración:

```text
Permanent
```

Ejemplo:

```text
2032 Regulation Reset Begins New Aero Era
```

---

# Narrative Tags

El contenido siempre se genera desde tags.

Nunca directamente desde eventos.

---

# Driver Tags

```text
ROOKIE_SENSATION
FALLING_STAR
GENERATIONAL_TALENT
LATE_BLOOMER
VETERAN_RESURGENCE
CHAMPIONSHIP_CONTENDER
```

---

# Team Tags

```text
RISING_TEAM
FALLEN_GIANT
DYNASTY
REBUILDING
OVERACHIEVING
UNDERPERFORMING
```

---

# Technical Tags

```text
BREAKTHROUGH
FAILED_CONCEPT
META_LEADER
COPYCAT
TECH_REVOLUTION
```

---

# Political Tags

```text
FIA_PRESSURE
RULE_CHANGE_TARGET
PADDOCK_SUPPORT
POLITICAL_ISOLATION
```

---

# Template System

Cada tag posee múltiples templates.

---

Ejemplo:

Tag:

```text
ROOKIE_SENSATION
```

Templates:

```text
{driver} continues to impress during his rookie season.

The paddock is beginning to take notice of {driver}.

Another strong weekend strengthens the reputation of {driver}.
```

---

El sistema elige uno.

---

# Variable Injection

Variables disponibles:

```text
driverName
teamName
circuitName
wins
podiums
season
championshipPosition
age
```

---

Ejemplo:

Template:

```text
{driverName} secured his {wins}th victory of the season.
```

Resultado:

```text
Martinez secured his 5th victory of the season.
```

---

# Tone Rules

## News

Neutral.

---

## FIA

Formal.

---

## Engineering

Technical but accessible.

---

## Media

More emotional.

---

## Historical

Encyclopedic.

---

# Dynamic Headlines

Formato:

```text
Actor
+
Action
+
Context
```

---

Ejemplos:

```text
McLaren Secures Major Upgrade Before Spa

Veteran Driver Announces Retirement

FIA Approves Aero Regulation Changes
```

---

# Frequency Rules

## Minor News

Objetivo:

```text
2–4 per week
```

---

## Major News

Objetivo:

```text
Occasional
```

---

## Historic Events

Objetivo:

```text
Rare
```

---

# Anti-Repetition System

Cada template registra:

```text
lastUsed
timesUsed
```

---

Templates utilizados recientemente reciben menor prioridad.

---

# Hall of Fame Content

Cuando ocurre un récord:

Generar entrada histórica.

Ejemplo:

```text
Martinez becomes the youngest driver to reach 25 career victories.
```

---

# Era Generation

El sistema puede nombrar eras automáticamente.

Ejemplos:

```text
The High Downforce Era

The Ground Effect Reset

The Red Bull Dominance Years

The Tire Preservation Era
```

---

# Driver Legacy Generation

Al retirarse:

Generar resumen.

Ejemplo:

```text
4 Championships
51 Wins
89 Podiums

Remembered for exceptional consistency and wet-weather performance.
```

---

# Team Legacy Generation

Ejemplo:

```text
McLaren captured three consecutive Constructors Championships between 2034 and 2036.
```

---

# Narrative Expiration

Las narrativas no son permanentes.

---

Ejemplo:

```text
ROOKIE_SENSATION
```

expira cuando:

```text
age > 23
```

o

```text
seasonsInF1 > 3
```

---

# Localization

Todo contenido debe generarse mediante:

```text
Templates
Variables
Tags
```

---

Nunca mediante texto hardcodeado.

---

Esto permite:

```text
English
Spanish
Portuguese
German
etc.
```

---

# Modding Compatibility

A futuro:

```text
templates.json
headlines.json
narratives.json
```

podrán editarse sin modificar código.

---

# Persistence Rules

Guardar permanentemente:

```text
Historic Events
Championships
Records
Retirements
Named Eras
```

---

No guardar permanentemente:

```text
Routine News
Minor Reports
Minor Rumors
```

---

# Desired Feel

El jugador debe sentir:

```text
The world is reacting to the simulation.
```

No:

```text
The game is writing stories for me.
```

---

# Golden Rule

```text
The simulation creates the story.

The content system explains it.
```
