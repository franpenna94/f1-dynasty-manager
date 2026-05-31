# F1 Dynasty Manager — Master Rules

## Purpose

This document contains the highest-level rules of the project.

It is intended as a quick reference.

It does not replace the detailed design documents.

If a rule here conflicts with a detailed document:

```text
system_formulas_v0.md
data_schema_v0.md
simulation_architecture.md
```

those documents win.

---

# Project Identity

F1 Dynasty Manager is:

```text
Management Simulation
Sports Strategy Game
Dynasty Builder
```

It is NOT:

```text
Driving Simulator
Action Game
Narrative Game
```

---

# Core Philosophy

```text
The simulation creates the story.
```

The game must never rely on scripted narratives.

---

# Player Role

The player controls:

```text
One F1 Team
```

The player does NOT control:

```text
FIA
Other Teams
Media
World Events
```

---

# Time Model

Primary time unit:

```text
1 Week
```

Game flow:

```text
Week
↓
Decisions
↓
Simulation
↓
Reports
↓
Next Week
```

---

# Season Model

MVP season:

```text
12 Races
```

Structure:

```text
Preseason
Season
Summer Break
Offseason
```

---

# World Structure

Simulated championships:

```text
F1
F2
F3
```

Simulation depth:

```text
F1 = Full Simulation

F2 = Abstract

F3 = Abstract
```

---

# Attribute Scale

Default scale:

```text
0-100
```

Used by:

```text
Drivers
Cars
Facilities
Staff
AI
Owners
```

---

# Performance Philosophy

Primary rule:

```text
Car > Driver
```

The best driver in the worst car should not normally win.

---

# Driver Philosophy

Drivers matter through:

```text
Race Pace
Qualifying Pace
Consistency
Feedback
Tyre Management
Wet Skill
Mental Attributes
```

Drivers evolve.

Drivers age.

Drivers retire.

---

# Car Philosophy

Cars evolve through:

```text
Development
Knowledge
Research
Manufacturing
```

Cars are not static.

---

# Technical Concepts

Valid concept families:

```text
low_drag

high_downforce

balanced

tire_saver

unstable_high_peak

quali_specialist
```

Concepts may become:

```text
dominant
obsolete
regulated
```

---

# Development Rules

Maximum active projects:

```text
2
```

Projects have:

```text
Cost
Risk
ETA
```

Upgrades may fail.

Failures should be rare.

---

# Knowledge Rules

Knowledge is persistent.

Knowledge accumulates.

Knowledge is difficult to copy.

---

# Race Simulation Rules

Race model:

```text
Lap By Lap
```

Not:

```text
Sector By Sector
```

---

# Weekend Structure

```text
Practice
↓
Qualifying
↓
Race
```

---

# Qualifying

Format:

```text
Q1
Q2
Q3
```

---

# Parc Fermé

Active after qualifying.

Major setup changes are restricted.

---

# Tyres

Available compounds:

```text
Soft
Medium
Hard
Intermediate
Wet
```

---

# Weather

Weather is:

```text
Dynamic
```

Weather is NOT:

```text
Pure Randomness
```

---

# Strategy

Important decisions:

```text
Pit Stops
Undercuts
Overcuts
Tyre Choices
Weather Reactions
Safety Car Decisions
```

---

# Safety Car

Safety Cars exist.

They:

```text
Compress Gaps
Change Strategy
Create Opportunities
```

---

# Economy

The game includes:

```text
Sponsors
Prize Money
Cash Flow
Cost Cap
Debt
Owners
```

---

# Cost Cap

Cost cap is active from season one.

Exceeding it may trigger:

```text
Fines
Reputation Loss
Restrictions
Penalties
```

---

# Financial Philosophy

Negative cash should be:

```text
Rare
```

Bankruptcy should be:

```text
Possible
```

Not common.

---

# AI Rules

AI uses the same systems as the player.

AI does not receive artificial advantages.

AI may:

```text
Make Mistakes
Change Philosophy
Enter Crises
Dominate Eras
Collapse
Recover
```

---

# AI Personality

Teams have persistent identities.

Examples:

```text
aggressive
innovative
political
stable
chaotic
youth_focused
marketing_first
```

---

# FIA Rules

FIA is active.

FIA may:

```text
Change Regulations
Introduce Directives
Vote Rules
React To Dominance
```

---

# Political Rules

Politics are systemic.

Not scripted.

Possible outcomes:

```text
Alliances
Conflicts
Voting Blocs
Regulation Pressure
```

---

# Media Rules

Media exists to:

```text
Interpret Simulation Results
```

Not create stories.

---

# Event Rules

Golden rule:

```text
No Event Without A Cause
```

Every event must originate from:

```text
Performance
Economy
Politics
Development
Relationships
History
```

---

# Narrative Rules

Golden rule:

```text
Narratives Describe Events

Narratives Do Not Create Events
```

---

# History Rules

The game stores:

```text
Champions
Wins
Podiums
Titles
Records
Hall Of Fame
Eras
```

Across all seasons.

---

# Save Rules

Persistence target:

```text
100+ Seasons
```

Manual save.

Multiple save slots.

---

# MVP Rules

MVP must allow:

```text
Choose Team
Play Season
Develop Car
Manage Finances
Run Race Weekends
Save
Load
Reach Season Two
```

Anything beyond this is secondary.

---

# Coding Rules

Code language:

```text
English
```

Schemas:

```text
English
```

Variables:

```text
English
```

UI:

```text
English
```

Documentation:

```text
Spanish Allowed
```

---

# Codex Rules

When information is missing:

```text
Flag It
Document It
Do Not Invent Systems
```

---

# Final Rule

```text
Simulation First.

Everything Else Second.
```
