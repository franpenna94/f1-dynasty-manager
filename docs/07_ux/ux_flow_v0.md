# F1 Dynasty Manager — UX Flow v0

## 0. Propósito

Este documento define cómo el jugador interactúa con F1 Dynasty Manager.

La prioridad es:

```text
profundidad de simulación > complejidad visual
```

La UI debe ser:

* minimalista
* rápida
* clara
* mobile-friendly
* desktop-friendly
* basada en decisiones
* orientada a reportes
* sin sobrecargar con números inútiles

El objetivo es que el jugador entienda:

```text
qué pasó
por qué importa
qué decisión debe tomar
```

---

# 1. Filosofía UX

## 1.1 Fast to play, slow to master

El juego debe poder jugarse rápido, pero dominarse durante muchas temporadas.

No queremos:

* mil gráficos mareantes
* pantallas técnicas incomprensibles
* clicks innecesarios
* telemetría excesiva
* revelar fórmulas internas

Queremos:

* pocos tabs importantes
* reportes claros
* decisiones significativas
* datos útiles
* profundidad emergente

---

## 1.2 No mostrar el código detrás de la magia

El jugador puede ver números y stats, pero no debe ver la fórmula cruda detrás de cada sistema.

Mostrar:

* ratings
* barras
* estados
* tendencias
* comparaciones simples
* reportes ejecutivos

No mostrar:

* fórmulas internas
* coeficientes exactos
* lógica AI
* cálculos ocultos
* código de simulación

---

## 1.3 UI tipo manager deportivo

Inspiraciones:

* Basketball GM: simpleza, tablas, navegación rápida
* Football Manager: inbox, reportes, mercado, relaciones
* Paradox: información por capas, decisiones estratégicas

Evitar:

* UI arcade
* dashboards sci-fi
* Excel extremo
* ingeniería aeroespacial incomprensible

---

# 2. Visual style

## 2.1 Dark mode

El juego debe usar dark mode por defecto.

Estilo sugerido:

```text
dark paddock / motorsport operations room
```

Características:

* fondo oscuro
* cards simples
* tablas legibles
* acentos sutiles
* colores por severidad
* buena lectura en mobile

---

## 2.2 Prioridad visual

Usar prioridad simple:

```text
info
warning
critical
decision required
```

No hace falta UI excesivamente compleja.

---

# 3. Navegación principal

## 3.1 Tabs principales

Tabs base recomendados:

```text
Overview
Inbox
Calendar
Car
Development
Drivers
Staff
Facilities
Finances
Sponsors
Academy
Standings
Junior Series
FIA
History
```

---

## 3.2 Tabs mínimos MVP

Para v0 jugable:

```text
Overview
Inbox
Calendar
Car
Development
Drivers
Finances
Standings
Race Weekend
```

Luego agregar:

```text
Staff
Facilities
Sponsors
Academy
FIA
History
Junior Series
```

---

# 4. Overview Screen

## 4.1 Propósito

Pantalla principal del jugador.

Debe responder:

```text
¿Qué necesita mi atención esta semana?
```

---

## 4.2 Contenido recomendado

Mostrar cards simples:

```text
Current Week
Next Race
Team Position
Driver Points
Cash
Cost Cap Remaining
Active Upgrades
Manufacturing Queue
Important Reports
Pending Decisions
```

---

## 4.3 Siempre visible

Stats principales siempre accesibles:

* cash
* cost cap remaining
* championship position
* next race
* current week
* pending decisions

---

# 5. Weekly Flow

## 5.1 Continue button

El avance principal es un botón:

```text
Continue
```

---

## 5.2 Calendar

Debe existir calendario visual simple.

Muestra:

* semanas
* carreras
* pretemporada
* parón de verano
* deadlines
* votaciones FIA
* sponsor deadlines
* contratos importantes

---

## 5.3 Auto-pause conditions

El tiempo se pausa automáticamente cuando ocurre:

* semana de carrera
* contrato importante
* upgrade terminado
* FIA vote
* sponsor decision
* crisis financiera
* lesión/incidente relevante
* decisión obligatoria del dueño

---

## 5.4 Fast weeks

Si una semana no tiene eventos importantes:

```text
Continue resolves quickly
```

La simulación automática parcial solo ocurre cuando:

* no hay decisiones pendientes
* no hay carrera
* no hay negociación activa
* no hay desarrollo crítico

---

# 6. Inbox / Reports

## 6.1 Propósito

El inbox es el sistema principal de comunicación.

Debe presentar información en forma ejecutiva.

---

## 6.2 Tipos de reportes

```text
engineering
scouting
media
finance
FIA
paddock rumors
race
sponsor
driver
academy
```

---

## 6.3 Estilo de reportes

Reportes cortos.

Cada reporte debe tener:

```text
title
short summary
severity
optional action
related screen link
```

---

## 6.4 Reportes archivados

No hace falta guardar todos los reportes.

Persistir solo:

* eventos históricos importantes
* noticias mayores
* decisiones regulatorias
* grandes crisis
* campeonatos

---

# 7. Car Screen

## 7.1 Propósito

Mostrar identidad, fortalezas y debilidades del auto actual.

---

## 7.2 Contenido

Mostrar:

```text
Core Concept
Sub Philosophy
Strengths
Weaknesses
Current Attribute Bars
Knowledge
Correlation Confidence
Track Fit Preview
Installed Parts
Damage State
```

---

## 7.3 Números y barras

Usar mezcla de:

* números 0-100
* barras visuales
* labels simples

Ejemplo:

```text
Downforce: 72
Drag Efficiency: 61
Tire Preservation: 68
Cooling: 44 warning
```

---

## 7.4 Comparación con rivales

Mostrar comparación simple.

Ejemplo:

```text
Estimated Car Rank: 7th-9th
High Speed: Above Midfield Average
Cooling: Weak
Race Pace: Similar to Haas/Williams group
```

No mostrar simulación exacta de todos los rivales si agrega ruido.

---

## 7.5 Incertidumbre visual

Cuando hay incertidumbre:

```text
Confidence: Low / Medium / High
```

Ejemplo:

```text
New floor performance estimate: +0.12s to +0.22s
Confidence: Medium
```

---

# 8. Development Screen

## 8.1 Propósito

Iniciar, monitorear y priorizar upgrades.

---

## 8.2 Iniciar upgrade

Flujo recomendado:

```text
Select Technical Area
↓
Select Upgrade Type
↓
Select Risk Level
↓
Review Cost / ETA / Confidence
↓
Confirm
```

---

## 8.3 Technical areas

```text
Floor
Front Wing
Rear Wing
Suspension
Cooling
Weight Reduction
Reliability
Power Integration
```

---

## 8.4 Risk levels

```text
Safe
Normal
Aggressive
```

Mostrar:

* expected gain
* risk
* confidence
* ETA
* development cost
* manufacturing cost
* cost cap impact

---

## 8.5 Visualización

Usar híbrido:

* lista de proyectos activos
* árbol técnico simple
* nodos desbloqueables
* estado de conocimiento por área

No forzar un árbol visual enorme en v0.

---

## 8.6 Capacidad

Aunque no se pidan límites visuales fuertes, la UI debe mostrar claramente:

```text
Active Projects: 1 / 2
Manufacturing Queue: 2 jobs
Cost Cap Remaining
```

---

# 9. Race Weekend Flow

## 9.1 Estructura

Race weekend se divide en:

```text
1. Pre-practice strategy
2. Practice report
3. Qualifying setup lock
4. Qualifying Q1/Q2/Q3
5. Parc fermé
6. Race strategy
7. Race simulation
8. Post-race report
```

---

## 9.2 Pre-practice

Antes de prácticas:

El jugador define enfoque inicial:

```text
setup direction
practice objective
race/quali bias
tire focus
cooling approach
```

---

## 9.3 Practice report

Prácticas son simples.

El jugador recibe:

```text
setup confidence
track fit
weather expectation
tire degradation estimate
driver feedback
engineering recommendation
```

---

## 9.4 Qualifying setup lock

Después de prácticas, el jugador define setup para quali.

Luego aplica parc fermé.

Después de qualifying:

```text
no major setup changes before race
```

A menos que el jugador decida salir desde pit lane.

---

## 9.5 Race strategy

Antes de carrera:

El jugador define estrategia óptima según:

* clima
* neumáticos
* posición de largada
* degradación esperada
* overtaking difficulty
* safety car probability

---

# 10. Race Simulation UX

## 10.1 Formato

Carrera sin visualización 3D.

Usar:

* live ticker textual
* tabla de posiciones
* mapa simple de gaps/posición
* eventos importantes
* decisiones emergentes

---

## 10.2 Duración objetivo

```text
1-2 minutes per race
```

---

## 10.3 Race event cards

Eventos importantes aparecen como cards.

Ejemplos:

```text
Safety Car deployed
Rain expected in 4 laps
Undercut opportunity vs Alpine
Driver reports tire drop-off
Pit window open
```

Cada evento puede tener:

```text
recommended option
risk summary
alternative options
```

---

## 10.4 Decisiones durante carrera

Decisiones principales:

* pit under safety car
* stay out
* switch to inters/wets
* undercut
* overcut
* stretch stint
* switch to one-stop
* conserve tires
* push
* team orders

---

## 10.5 Simple position map

Puede existir mapa simple.

No necesita track map real.

Opciones:

* vertical running order
* gap bars
* stint/tire badges
* pit window indicators

---

# 11. Qualifying UX

## 11.1 Q1/Q2/Q3

Clasificación completa.

Puede mostrarse como:

* tabla de tiempos
* cut line
* run planner simple
* tire choice
* push level

---

## 11.2 Controles

El jugador puede controlar:

* push lap
* fuel level
* timing
* tire choice

---

## 11.3 Tráfico

Tráfico existe como factor abstracto.

Mostrar:

```text
Track traffic risk: Low / Medium / High
```

---

# 12. Strategy Screen

## 12.1 Presets

La estrategia pre-race usa presets:

```text
Aggressive
Balanced
Tire Save
Weather Gamble
Safety Car Flexible
```

---

## 12.2 Staff recommendations

El staff ofrece recomendación.

Ejemplo:

```text
Recommended: Balanced 1-stop
Risk: Medium
Alternative: Aggressive 2-stop if early safety car appears
```

---

## 12.3 Planner visual

Planner visual simple.

Mostrar:

* stint 1
* stint 2
* optional stint 3
* tire compound
* target lap range
* expected risk

---

# 13. Drivers Screen

## 13.1 Driver profile

Mostrar:

```text
attributes
personality
contract
market value
morale
relations
media reputation
career stats
season stats
```

---

## 13.2 Historical stats

Debe poder verse:

* carreras
* victorias
* podios
* poles
* DNFs
* puntos
* títulos
* equipos anteriores

---

## 13.3 Development graphs

Gráficos simples.

No sobrecargar.

Mostrar:

* rating over time
* morale trend
* form trend

---

# 14. Market / Contracts UX

## 14.1 Negociación

Realista pero simple.

Flujo recomendado:

```text
Select driver
↓
Submit offer
↓
Agent response
↓
Adjust salary / role / clauses
↓
Accept / reject / wait
```

---

## 14.2 Rumores mercado

Sí existen.

Ejemplos:

```text
Driver considering top team exit clause
Rival team interested in your rookie
Sponsor pushing for local driver
```

---

## 14.3 Deadlines

Contratos importantes pueden pausar el avance semanal.

---

# 15. FIA / Politics UX

## 15.1 FIA screen

Mostrar:

```text
active regulations
upcoming votes
rumored rule changes
team positions
political pressure summary
```

---

## 15.2 Votaciones

Presentar como decisión simple:

```text
Proposal: Reduce wind tunnel allowance for top teams
Your recommendation: For
Impact on team: Medium positive
Political cost: Low
```

---

## 15.3 Lobbying

Lobbying no es una UI explícita grande.

Puede existir como acción abstracta o evento.

---

## 15.4 Relaciones políticas

No hace falta visualización compleja tipo mapa.

Mostrar señales simples:

```text
Likely allies
Likely opposition
Paddock mood
```

---

# 16. History UX

## 16.1 Hall of Fame

Debe existir.

Mostrar:

* mejores pilotos
* mejores equipos
* récords
* títulos
* wins
* podiums
* poles

---

## 16.2 Timeline histórico

Sí.

Mostrar eventos grandes:

* cambios regulatorios
* dinastías
* campeones
* crisis importantes
* rookies históricos
* equipos renacidos

---

## 16.3 Eras etiquetadas

El sistema puede etiquetar eras automáticamente.

Ejemplos:

```text
Low Drag Era
Red Bull Dynasty
Tire Saver Meta
Hybrid Reset Years
```

---

# 17. Technical UX

## 17.1 Desktop vs mobile

Recomendación:

```text
desktop-first responsive
```

Motivo:

* tablas y datos se disfrutan más en desktop
* pero debe poder jugarse en mobile

---

## 17.2 Responsive completo

Sí.

Mobile debe priorizar:

* tabs colapsados
* cards en columna
* tablas simplificadas
* decisiones rápidas

---

## 17.3 Keyboard shortcuts

No son prioridad.

Pueden agregarse luego:

```text
Continue
Inbox
Calendar
Race
```

---

## 17.4 Speed controls

No son prioridad fuerte.

El juego avanza por continue.

Durante carrera puede existir:

```text
normal / fast
```

pero no es esencial v0.

---

# 18. Tutorial / Advisor

## 18.1 Tutorial

No sumar complejidad alta.

Recomendación:

* onboarding corto
* first week guidance
* advisor hints opcionales

---

## 18.2 Tooltips

Tooltips moderados.

Usarlos para:

* conceptos clave
* cost cap
* parc fermé
* confidence
* track fit

No llenar todo de tooltips largos.

---

# 19. Screen priority MVP

## MVP must-have screens

```text
Overview
Inbox
Calendar
Car
Development
Drivers
Finances
Standings
Race Weekend
```

---

## MVP should-have screens

```text
Sponsors
Staff
Facilities
Academy
FIA
History
```

---

## Future screens

```text
Advanced Politics
Detailed Junior Series
Advanced Records
Technical History
Media Center
```

---

# 20. Core UX Loop

```text
Open Overview
↓
Read Inbox
↓
Resolve Required Decisions
↓
Check Development / Finance / Race Prep
↓
Continue Week
↓
React to Events
```

---

# 21. Race Weekend UX Loop

```text
Race Week Starts
↓
Pre-Practice Setup Direction
↓
Practice Report
↓
Qualifying Setup / Tire / Timing Decisions
↓
Q1/Q2/Q3
↓
Race Strategy Setup
↓
Race Ticker + Event Decisions
↓
Post-Race Report
↓
Update Standings / Finance / Morale / Development Data
```

---

# 22. UX Design Rules

Every screen must answer at least one:

```text
What happened?
Why does it matter?
What can I do?
What happens if I ignore this?
```

If a screen does not answer any of these, remove or merge it.

---

# 23. Implementation guidance

Recommended files:

```text
/src/ui/layout/AppShell.tsx
/src/ui/navigation/MainTabs.tsx
/src/ui/screens/OverviewScreen.tsx
/src/ui/screens/InboxScreen.tsx
/src/ui/screens/CalendarScreen.tsx
/src/ui/screens/CarScreen.tsx
/src/ui/screens/DevelopmentScreen.tsx
/src/ui/screens/DriversScreen.tsx
/src/ui/screens/FinanceScreen.tsx
/src/ui/screens/StandingsScreen.tsx
/src/ui/screens/RaceWeekendScreen.tsx
/src/ui/components/StatCard.tsx
/src/ui/components/ReportCard.tsx
/src/ui/components/RatingBar.tsx
/src/ui/components/DecisionCard.tsx
/src/ui/components/SimpleTable.tsx
/src/ui/components/ProgressBar.tsx
/src/ui/components/StrategyPlanner.tsx
/src/ui/components/RunningOrder.tsx
```

---

# 24. Status

UX Flow v0 define:

* minimal UI philosophy
* main tabs
* weekly flow
* inbox reports
* car screen
* development flow
* race weekend flow
* qualifying UX
* race decision UX
* market UX
* FIA UX
* history UX
* MVP screen priorities

Siguiente documento recomendado:

```text
implementation_plan.md
```
