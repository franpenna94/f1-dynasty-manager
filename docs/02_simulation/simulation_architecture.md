# F1 Dynasty Manager — Simulation Architecture

## 1. Core gameplay loop

### 1.1 Macro loop: décadas

1. Elegir o asumir una escudería de mitad/fondo.
2. Definir identidad técnica y deportiva.
3. Construir organización.
4. Desarrollar auto.
5. Competir.
6. Ganar o perder reputación/dinero.
7. Adaptarse a regulaciones FIA.
8. Renovar pilotos, staff y sponsors.
9. Construir academia.
10. Repetir durante décadas.

---

### 1.2 Seasonal loop

1. Invierno: diseño del auto siguiente.
2. Pretemporada: testing, correlación, fabricación inicial.
3. Temporada: carreras, upgrades, sponsors, política, economía.
4. Parón de verano: decisiones estratégicas especiales.
5. Final de temporada: prize money, evaluación de dueño, contratos.
6. Offseason: mercado de pilotos/staff, FIA, nuevo auto.

---

### 1.3 Weekly loop

Cada semana:

1. Recibir reportes.
2. Tomar decisiones.
3. Simular progreso.
4. Actualizar estado.
5. Generar consecuencias.

En semanas sin carrera:

* desarrollo técnico
* fabricación
* scouting
* academia
* sponsors
* política
* finanzas
* staff

En semanas con carrera:

* pre-race
* qualifying
* race
* post-race

---

## 2. Simuladores conectados

El juego se divide en simuladores conectados.

### 2.1 Technical Simulator

Responsable de:

* diseño del auto
* árbol tecnológico
* upgrades
* fabricación
* correlación
* fiabilidad
* performance potencial

### 2.2 Sporting Simulator

Responsable de:

* pilotos
* clasificación
* carrera
* estrategia
* neumáticos
* clima
* incidentes
* resultados

### 2.3 Economic Simulator

Responsable de:

* cash
* sponsors
* cost cap
* gastos
* deuda
* prize money
* dueño
* restricciones de gasto

### 2.4 Human Simulator

Responsable de:

* pilotos
* staff
* moral
* conflictos
* contratos
* progresión
* retiro
* personalidad

### 2.5 Political Simulator

Responsable de:

* FIA
* regulaciones
* votaciones
* sanciones
* presión mediática
* balance competitivo

### 2.6 Reputation Simulator

Responsable de:

* prestigio
* marca
* fans
* atracción de sponsors
* atracción de pilotos
* atracción de staff
* imagen pública

---

## 3. Módulos principales

### 3.1 Core Simulation Engine

Responsabilidad:

* avanzar el calendario
* ejecutar ticks semanales
* coordinar módulos
* resolver dependencias
* generar reportes

Submódulos:

* calendar_engine
* event_engine
* notification_engine
* simulation_scheduler

---

### 3.2 Team Module

Responsabilidad:

* estado general de escudería
* facilities
* reputación
* objetivos de dueño
* cultura
* caja
* staff
* pilotos

Submódulos:

* facilities_system
* owner_system
* morale_system
* reputation_system

---

### 3.3 Car Development Module

Responsabilidad:

* diseño del auto
* árbol tecnológico
* upgrades
* correlación
* fabricación
* testing
* conceptos incompatibles

Submódulos:

* aero_system
* chassis_system
* power_unit_system
* manufacturing_system
* concept_system
* upgrade_pipeline
* reliability_system

---

### 3.4 Race Simulation Module

Responsabilidad:

* simulación vuelta a vuelta
* estrategia
* neumáticos
* clima
* incidentes
* clasificación
* resultados

Submódulos:

* lap_engine
* tire_engine
* weather_engine
* incident_engine
* strategy_engine
* qualifying_engine
* race_control

---

### 3.5 Driver Module

Responsabilidad:

* pilotos principales
* reservas
* juniors
* desarrollo
* personalidad
* contratos
* progresión
* retiro

Submódulos:

* progression_system
* morale_system
* contract_system
* scouting_system
* personality_system

---

### 3.6 Staff Module

Responsabilidad:

* ingenieros
* directores
* estrategas
* pit crew
* contratación
* eficiencia organizacional

Submódulos:

* hiring_system
* leadership_system
* efficiency_system
* department_structure

---

### 3.7 Economy Module

Responsabilidad:

* ingresos
* gastos
* sponsors
* cost cap
* deuda
* inversiones
* caja negativa

Submódulos:

* sponsor_system
* payroll_system
* budgeting_system
* debt_system
* cost_cap_system

---

### 3.8 FIA & Politics Module

Responsabilidad:

* regulaciones
* votaciones
* sanciones
* presión política
* equilibrio competitivo
* prensa

Submódulos:

* regulation_engine
* voting_system
* sanction_system
* pressure_system
* media_system

---

### 3.9 Academy Module

Responsabilidad:

* scouting
* pilotos junior
* afiliaciones
* desarrollo de talento
* categorías menores

Submódulos:

* junior_generation
* scouting_regions
* feeder_series
* development_programs

---

## 4. Entidades principales

### 4.1 Team

Representa una escudería.

Campos conceptuales:

* id
* name
* country
* owner
* difficulty
* cash
* reputation
* brand_value
* political_capital
* facilities
* staff
* drivers
* academy
* sponsors
* current_car
* next_car_project
* owner_objectives

---

### 4.2 Car

Representa el auto de una temporada.

Campos conceptuales:

* season
* regulation_set_id
* concept
* aero_profile
* chassis_profile
* suspension_profile
* power_unit_supplier
* reliability
* weight
* cooling
* tire_wear
* drag
* downforce
* manufacturing_complexity
* upgrade_slots
* correlation_confidence

---

### 4.3 Driver

Representa piloto titular, reserva o junior.

Campos conceptuales:

* id
* name
* age
* nationality
* role
* salary
* contract
* morale
* reputation
* potential_hidden
* pace
* consistency
* tire_management
* aggression
* racecraft
* wet_skill
* feedback_quality
* marketability
* personality

---

### 4.4 StaffMember

Representa staff técnico o ejecutivo.

Campos conceptuales:

* id
* name
* role
* salary
* skill
* leadership
* creativity
* adaptability
* loyalty
* morale
* department
* contract_simple

---

### 4.5 Facility

Infraestructura del equipo.

Campos conceptuales:

* wind_tunnel_level
* cfd_level
* simulator_level
* manufacturing_level
* academy_level
* pit_crew_level
* maintenance_cost
* upgrade_cost

---

### 4.6 RegulationSet

Reglas FIA activas o futuras.

Campos conceptuales:

* season
* cost_cap
* aero_restrictions
* power_unit_rules
* testing_limits
* component_limits
* safety_rules
* voting_result
* political_pressure

---

### 4.7 Circuit

Representa un circuito.

Campos conceptuales:

* name
* country
* laps
* downforce_weight
* drag_weight
* tire_stress
* brake_stress
* overtaking_difficulty
* weather_volatility
* safety_car_base_rate
* track_evolution
* race_length

---

### 4.8 RaceWeekend

Representa un GP.

Campos conceptuales:

* circuit
* date
* season
* weather_forecast
* pre_race_report
* qualifying_results
* race_results
* incidents
* strategy_log
* post_race_report

---

### 4.9 Sponsor

Representa patrocinador.

Campos conceptuales:

* name
* industry
* monthly_payment
* performance_bonus
* reputation_sensitivity
* market_interest
* driver_preference
* contract_duration
* exit_clause

---

### 4.10 Academy

Representa el programa junior.

Campos conceptuales:

* scouting_level
* regional_focus
* junior_drivers
* feeder_teams
* budget
* development_quality
* reputation

---

## 5. Relaciones principales

```text
League
 ├── Teams
 │     ├── Drivers
 │     ├── Staff
 │     ├── Facilities
 │     ├── Sponsors
 │     ├── Cars
 │     └── Academy
 │
 ├── Seasons
 │     ├── RaceWeekends
 │     ├── Regulations
 │     └── Standings
 │
 └── Global Systems
       ├── FIA
       ├── Economy
       ├── Media
       └── Driver Market
```

---

## 6. Modelo temporal

### 6.1 Tick semanal

```text
weekly_tick:
    economy_tick
    morale_tick
    development_tick
    scouting_tick
    manufacturing_tick
    politics_tick
    report_generation
```

### 6.2 Semana de carrera

```text
race_week:
    pre_race_tick
    qualifying_tick
    race_tick
    post_race_tick
```

### 6.3 Invierno

```text
offseason:
    finalize_previous_year
    pay_prize_money
    evaluate_owner_objectives
    driver_market
    staff_market
    regulation_update
    next_car_design_phase
```

---

## 7. Variables técnicas del auto

### 7.1 Aerodynamics

* downforce
* drag
* aero_efficiency
* dirty_air_tolerance
* ride_height_sensitivity
* yaw_sensitivity
* cooling_drag
* drs_effectiveness
* porpoising_risk

### 7.2 Chassis

* weight
* stiffness
* packaging_efficiency
* serviceability
* manufacturing_complexity

### 7.3 Suspension

* mechanical_grip
* tire_preservation
* kerb_handling
* platform_control
* wet_stability

### 7.4 Power Unit

* supplier
* power
* fuel_efficiency
* reliability
* cooling_requirement
* ers_quality

### 7.5 Reliability

* engine_wear
* gearbox_wear
* brake_wear
* suspension_wear
* electronics_wear
* thermal_stress

---

## 8. Variables de pilotos

### 8.1 Performance

* pace
* qualifying
* race_pace
* consistency
* starts
* wet_skill

### 8.2 Racecraft

* overtaking
* defending
* spatial_awareness
* aggression
* incident_avoidance

### 8.3 Management

* tire_management
* fuel_saving
* component_sympathy
* feedback_quality

### 8.4 Psychology

* confidence
* pressure_resistance
* morale
* ambition
* loyalty
* ego

### 8.5 Commercial

* marketability
* sponsor_appeal
* national_value
* media_skill

---

## 9. Economía

### 9.1 Ingresos

* sponsor_income_monthly
* prize_money_end_season
* owner_injection
* merchandise_income
* driver_commercial_income

### 9.2 Gastos

* driver_salaries_annual
* staff_salaries_annual
* facility_upkeep
* development_cost
* manufacturing_cost
* academy_budget
* logistics
* debt_payment

### 9.3 Caja negativa

Si cash < 0:

* bloquear gasto no esencial
* permitir operaciones mínimas
* activar plazo de recuperación
* posible inyección del dueño
* posibles penalidades si no se corrige

---

## 10. Desarrollo técnico

### 10.1 Pipeline de upgrade

1. Selección de proyecto.
2. Investigación.
3. Diseño.
4. Simulación.
5. Fabricación.
6. Instalación.
7. Validación en carrera.
8. Reporte de correlación.

### 10.2 Restricciones

* máximo 2 proyectos simultáneos
* costo en cash
* consumo de cost cap
* tiempo de desarrollo
* tiempo de fabricación
* riesgo de mala correlación
* riesgo de sanción si es agresivo
* conceptos incompatibles

### 10.3 Fabricación

Los upgrades deben producirse por unidad:

* pieza para auto 1
* pieza para auto 2
* repuestos opcionales

Esto crea decisiones:

* llevar upgrade a un solo piloto
* retrasar ambos autos
* priorizar piloto mejor posicionado
* ahorrar fabricación

---

## 11. Carrera

### 11.1 Simulación

* vuelta a vuelta
* sin visualización 3D
* reportes
* decisiones por evento relevante

### 11.2 Input previo

Antes de carrera:

* setup abstracto
* estrategia inicial
* neumáticos
* nivel de riesgo
* agresividad de motor
* prioridad entre pilotos

### 11.3 Eventos de decisión

El jugador interviene por:

* ventana de boxes
* lluvia
* safety car
* choque
* degradación inesperada
* oportunidad de undercut
* problema mecánico

### 11.4 Resultado

La carrera produce:

* resultado final
* puntos
* daño
* desgaste
* reputación
* moral
* sponsor reaction
* datos técnicos
* reporte post-race

---

## 12. Clima

El clima dinámico existe desde v0.

Variables:

* dry
* damp
* wet
* heavy_wet
* rain_probability
* rain_intensity
* track_drying
* weather_volatility
* tire_suitability

El clima afecta:

* lap time
* tire choice
* incident risk
* driver wet_skill
* pit strategy
* safety car probability

---

## 13. FIA y política

### 13.1 Sistemas

* votaciones
* cambios regulatorios
* presión mediática
* sanciones
* equilibrio competitivo

### 13.2 Acciones del jugador

* votar reglas
* apoyar bloque político
* aceptar cambios
* resistir cambios
* priorizar reputación o ventaja técnica

### 13.3 Impacto

FIA afecta:

* diseño del auto
* cost cap
* desarrollo
* testing
* restricciones técnicas
* equilibrio entre equipos

---

## 14. Academia

### 14.1 Sistemas

* scouting regional
* pilotos junior
* categorías menores
* afiliaciones
* desarrollo
* potencial oculto

### 14.2 Decisiones

* invertir presupuesto
* seleccionar regiones
* firmar juniors
* prestar pilotos
* promover reserva
* cortar contratos

---

## 15. UX inicial

Pantallas mínimas:

1. Inbox
2. Team Overview
3. Calendar
4. Standings
5. Car Development
6. Race Prep
7. Race Report
8. Drivers
9. Academy
10. Finance
11. Sponsors
12. FIA

UI:

* tablas
* texto
* reportes
* gráficos simples
* responsive para mobile

---

## 16. Dependencias sistémicas clave

### 16.1 Técnica → Carrera

Un mejor auto mejora potencial, pero depende de:

* circuito
* setup
* piloto
* clima
* neumáticos
* fiabilidad

### 16.2 Carrera → Economía

Buenos resultados generan:

* mejor prize money
* sponsors más fuertes
* reputación
* moral

Malos resultados generan:

* presión de dueño
* pérdida de sponsors
* menor atractivo de pilotos

### 16.3 Economía → Desarrollo

Más caja permite:

* upgrades
* fabricación
* facilities
* academia
* staff

Pero cost cap limita el gasto competitivo.

### 16.4 FIA → Técnica

Reglas cambian:

* conceptos viables
* áreas de desarrollo
* costos
* ventajas competitivas

### 16.5 Academia → Pilotos

La academia crea:

* talento barato
* identidad de equipo
* activos futuros
* posibles ventas/cesiones

### 16.6 Reputación → Todo

Reputación afecta:

* sponsors
* pilotos
* staff
* política
* fans
* presión mediática

---

## 17. Principio arquitectónico

Todos los módulos deben generar reportes comprensibles.

El jugador no necesita ver toda la matemática interna, pero sí debe entender las consecuencias.

Cada sistema debe producir:

* estado actual
* cambio respecto a semana anterior
* causa probable
* riesgo futuro
* decisión recomendada opcional

---

## 18. Próximos documentos técnicos

Después de esta arquitectura, los documentos necesarios son:

1. system_formulas_v0.md
2. data_schema_v0.md
3. rival_ai_design.md
4. ux_flow.md
5. tech_tree.md
6. content_seed_2026.md
7. implementation_plan.md
