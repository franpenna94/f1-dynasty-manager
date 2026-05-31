# F1 Dynasty Manager — MVP Scope v1

## 0. Propósito

Este documento define el alcance exacto de la primera versión jugable.

Objetivo:

- evitar overengineering
- llegar rápido a una versión jugable
- validar el core loop
- permitir iterar balance
- preparar base sólida para expansión

Principio rector:

```text
Build the smallest version that proves the simulation is fun.
```

---

# 1. MVP Goal

El MVP debe permitir jugar una temporada completa de 12 carreras con:

- 11 equipos
- 22 pilotos
- calendario reducido
- standings
- finanzas simples
- cost cap
- desarrollo técnico simple
- AI básica para rivales
- carrera simulada
- save/load manual

El MVP debe demostrar:

```text
continue week → develop car → race → standings → finances → next season
```

---

# 2. Included in MVP

## 2.1 Full 12-race season

Incluido.

El jugador debe poder completar una temporada completa.

---

## 2.2 Transition to season 2

Incluido de forma simple.

Debe permitir:

- cerrar temporada
- guardar historial básico
- pagar prize money
- resetear standings
- generar calendario siguiente
- continuar jugando

No necesita offseason profunda todavía.

---

## 2.3 Save/load

Incluido.

Requisitos:

- save manual
- múltiples slots si es simple
- localStorage o JSON local
- save version
- validación básica

---

## 2.4 Teams and drivers

Incluido.

MVP:

- 11 equipos
- 22 pilotos titulares
- ratings básicos
- contratos muy simples o placeholder
- sin mercado profundo todavía

---

## 2.5 Race simulation

Incluido.

Primera versión:

- resultados simulados
- qualifying básica Q1/Q2/Q3 si es viable
- carrera reducida
- neumáticos simples
- clima simple/dinámico básico
- safety car básico
- DNFs básicos
- puntos y standings

La carrera interactiva completa puede ser fase posterior del MVP.

---

## 2.6 Finances

Incluido.

Debe tener:

- cash
- sponsor income mensual
- operating costs
- development costs
- manufacturing costs simples
- crash damage básico
- prize money final
- negative cash warning

---

## 2.7 Cost cap

Incluido.

Versión simple:

- desarrollo y fabricación consumen cost cap
- mostrar remaining
- bloquear gastos si no hay margen
- sin sanciones complejas inicialmente

---

## 2.8 Sponsors simples

Incluido.

MVP:

- sponsor principal
- ingreso mensual
- bonus simple por standings/resultados
- sin negociación avanzada

---

## 2.9 Development system simple

Incluido.

Debe permitir:

- máximo 2 proyectos activos
- elegir área de upgrade
- elegir risk level: safe/normal/aggressive
- ETA en semanas
- costo
- mejora estimada
- resultado aplicado al auto

No necesita tech tree completo en MVP inicial.

---

## 2.10 AI teams basic

Incluido.

La AI debe:

- avanzar semanas
- correr carreras
- desarrollar autos de forma básica
- gastar presupuesto
- mejorar/empeorar con el tiempo
- no quedarse congelada

---

## 2.11 Basic reports

Incluido.

Reportes básicos:

- race result
- development complete
- finance warning
- sponsor income
- season end
- standings update

---

## 2.12 Basic UI

Incluido.

Pantallas MVP:

- Overview
- Inbox
- Calendar
- Car
- Development
- Drivers
- Finances
- Standings
- Race Result

La UI puede ser funcional y simple.

---

# 3. Excluded from MVP

## 3.1 Full academy

Excluido.

Puede existir placeholder visual, pero no sistema profundo.

---

## 3.2 F2/F3 simulation

Excluido o muy abstracto.

No necesario para primera versión jugable.

---

## 3.3 Full FIA politics

Excluido.

Puede existir regulation state fijo.

Votaciones y política van después.

---

## 3.4 Full driver market

Excluido.

Contratos profundos, cláusulas, agentes y bidding wars van después.

---

## 3.5 Staff market

Excluido.

Staff puede existir como rating agregado.

---

## 3.6 Full tech tree

Excluido del primer MVP.

Usar upgrades simples por área.

Tech tree completo se agrega después de validar loop.

---

## 3.7 Interactive race weekend full

Excluido del primer corte si retrasa demasiado.

Primero race result/sim headless.

Luego:

- practice
- setup
- Q1/Q2/Q3 controlada
- pit events
- safety car decisions
- rain decisions

---

## 3.8 Hall of Fame full

Excluido.

Guardar season history básico.

Hall of Fame avanzado después.

---

## 3.9 Event system completo

Excluido.

Solo reports básicos.

Noticias/narrativas emergentes después.

---

## 3.10 Content generation system

Excluido.

Templates avanzados después.

---

# 4. MVP Phases

## Phase MVP-0 — Headless Simulation

Goal:

```text
simulate a full season without UI
```

Includes:

- teams
- drivers
- cars
- races
- standings
- champions

Done when:

- 12 races simulate
- champions generated
- no crashes
- same seed reproduces same results

---

## Phase MVP-1 — Minimal UI Loop

Goal:

```text
make simulation playable
```

Includes:

- Overview
- Continue Week
- Race Results
- Standings
- Save/load

Done when:

- user can complete a season manually
- standings visible
- saves work

---

## Phase MVP-2 — Development Loop

Goal:

```text
player decisions affect performance
```

Includes:

- start upgrade
- ETA
- cost
- apply car stat gain
- AI also develops

Done when:

- player can improve car
- upgrades affect race results
- cost cap matters

---

## Phase MVP-3 — Economy Loop

Goal:

```text
money creates pressure
```

Includes:

- cash
- monthly sponsor payments
- operating costs
- cost cap
- crash damage
- prize money

Done when:

- reckless development can hurt finances
- crash-heavy seasons matter

---

## Phase MVP-4 — Season 2 Transition

Goal:

```text
prove long-term loop
```

Includes:

- season summary
- prize money
- standings reset
- next year cars
- basic aging/progression

Done when:

- player can start season 2

---

# 5. MVP Success Criteria

MVP is successful if:

- one full season is playable
- save/load works
- race results feel plausible
- development affects performance
- finances matter
- AI teams evolve
- no system feels completely fake
- player wants to play another season

---

# 6. Non-goals

MVP does NOT need:

- beautiful UI
- complete realism
- full F1 politics
- deep contracts
- advanced academy
- full tech tree
- historical Hall of Fame
- procedural news
- perfect balance

---

# 7. First Codex Build Target

Build this first:

```text
A web app where the player can:
1. create a new save
2. choose a midfield/backmarker team
3. continue week by week
4. simulate 12 races
5. see standings
6. start simple upgrades
7. see finances
8. save/load
9. finish season
10. start season 2
```

---

# 8. Golden Rule

Do not add a complex feature until the core loop is playable.

```text
Playable > complete.
Simulation > UI.
Decisions > decoration.
```
