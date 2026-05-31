# F1 Dynasty Manager — Documento Base de Diseño Sistémico

## 0. Visión del proyecto

F1 Dynasty Manager es un simulador profundo de management, ingeniería, política y estrategia de Formula 1. El jugador controla una escudería durante décadas, no conduce el auto. El objetivo no es ganar una carrera aislada, sino construir, sostener o reconstruir una institución competitiva en un ecosistema cambiante.

El juego debe evitar narrativa vacía, azar excesivo y bonificaciones abstractas. La fantasía central es la causalidad visible: cada resultado debe poder explicarse por decisiones previas, atributos del auto, pilotos, clima, economía, regulaciones, política y ejecución operativa.

El jugador debe sentir que administra una organización tecnológica viva: diseño del auto, talento humano, reputación, academias, sponsors, presupuesto, cash flow, política FIA, staff, pilotos, desarrollo técnico y estrategia de carrera.

---

## 1. Pilares de diseño

### 1.1 Causalidad visible

Cada consecuencia importante debe tener una cadena causal rastreable.

Ejemplo:

* Se eligió una filosofía aerodinámica agresiva.
* El auto ganó carga en curvas rápidas.
* La plataforma se volvió sensible a altura.
* En circuitos bacheados perdió consistencia.
* El piloto con baja adaptabilidad cometió errores.
* El equipo perdió puntos.
* Los sponsors redujeron bonus.
* El flujo de caja empeoró.

### 1.2 Determinismo con variabilidad controlada

El sistema no debe ser puramente aleatorio. Debe combinar:

* modelos deterministas
* incertidumbre de información
* variabilidad pequeña y explicable
* distribución de errores humanos
* condiciones externas parcialmente previsibles

El jugador no debería sentir que perdió por dados invisibles, sino por riesgo aceptado, mala lectura o tradeoffs.

### 1.3 Tradeoffs reales

Toda mejora debe costar algo.

Ejemplos:

* Más downforce aumenta carga, pero también drag, sensibilidad al aire sucio y temperatura de neumáticos.
* Más desarrollo agresivo aumenta performance potencial, pero reduce fiabilidad y sube costos.
* Fichar una estrella mejora rendimiento, pero puede destruir el cash flow o la moral interna.
* Presionar políticamente a FIA puede favorecer reglas futuras, pero dañar alianzas.

### 1.4 Identidad de equipo

Cada escudería debe desarrollar una identidad persistente:

* filosofía técnica
* cultura organizacional
* reputación política
* capacidad de desarrollo
* tolerancia al riesgo
* academia
* calidad de staff
* relación con sponsors

La progresión no debe ser solo subir números, sino consolidar una forma de competir.

### 1.5 Información imperfecta

El jugador no debe conocer todos los valores exactos siempre. La profundidad aparece cuando decide con información incompleta.

Fuentes de incertidumbre:

* correlación simulador-pista
* scouting de pilotos jóvenes
* rumores regulatorios
* clima futuro
* upgrades rivales
* motivaciones políticas
* rasgos ocultos de staff
* fatiga real de componentes

---

## 2. Core gameplay loop

### 2.1 Loop macro: décadas

1. Definir identidad de equipo.
2. Construir infraestructura.
3. Contratar staff clave.
4. Desarrollar pilotos o fichar talento externo.
5. Diseñar autos bajo reglas vigentes.
6. Competir temporada tras temporada.
7. Influir o adaptarse a cambios FIA.
8. Mantener sponsors, reputación y finanzas.
9. Entrar en ciclos de dominio, crisis, reconstrucción o transición tecnológica.

### 2.2 Loop de temporada

1. Revisión de reglas vigentes y futuras.
2. Plan técnico anual.
3. Diseño inicial del monoplaza.
4. Pretemporada y test.
5. Calendario de carreras.
6. Ciclos de análisis, desarrollo, fabricación y upgrades.
7. Gestión contractual de pilotos y staff.
8. Negociación de sponsors.
9. Reuniones políticas FIA/equipos.
10. Cierre financiero y evaluación de reputación.
11. Preparación del siguiente auto.

### 2.3 Loop semanal

1. Recibir reportes:

   * performance del auto
   * estado financiero
   * staff
   * pilotos
   * componentes
   * clima próximo GP
   * rumores políticos
   * mercado
2. Tomar decisiones:

   * ingeniería
   * fabricación
   * presupuesto
   * staff
   * pilotos
   * sponsors
   * política
   * estrategia de carrera
3. Simular progreso:

   * investigación
   * desgaste
   * moral
   * cash flow
   * reputación
   * scouting
4. Obtener feedback:

   * datos de pista
   * errores de correlación
   * reacción de sponsors
   * rendimiento rival
5. Ajustar plan.

---

## 3. Modelo sistémico general

El juego se divide en simuladores conectados.

### 3.1 Simulador técnico

Responsable de:

* diseño del auto
* desarrollo de upgrades
* correlación CFD/túnel/simulador/pista
* performance por circuito
* fiabilidad
* desgaste de componentes
* manufactura

### 3.2 Simulador deportivo

Responsable de:

* rendimiento de pilotos
* estrategia de carrera
* clasificación
* carrera
* neumáticos
* clima
* tráfico
* incidentes causales
* puntos y campeonato

### 3.3 Simulador económico

Responsable de:

* ingresos
* sponsors
* premios
* costos
* cash flow
* deuda
* inversiones
* cost cap
* penalizaciones financieras

### 3.4 Simulador humano

Responsable de:

* pilotos
* staff
* academias
* moral
* contratos
* rivalidades
* liderazgo
* adaptación
* conflictos internos

### 3.5 Simulador político/regulatorio

Responsable de:

* FIA
* votaciones
* regulaciones futuras
* lobbying
* alianzas entre equipos
* protestas técnicas
* directivas técnicas
* intereses comerciales del deporte

### 3.6 Simulador reputacional

Responsable de:

* prestigio histórico
* valor de marca
* atracción de talento
* atracción de sponsors
* confianza de pilotos
* percepción FIA
* imagen pública

---

## 4. Entidades principales

### 4.1 Team

Representa una escudería.

Campos principales:

* id
* name
* country
* founding_year
* ownership_type
* brand_value
* prestige
* fanbase_size
* political_capital
* technical_identity
* risk_profile
* financial_health
* reputation_profile
* facilities
* staff_roster
* driver_roster
* academy
* sponsors
* car_current
* car_next_year_project
* component_pool

### 4.2 Car

Representa el monoplaza de una temporada.

Campos:

* season
* regulation_set_id
* design_philosophy
* chassis
* aerodynamics
* suspension
* power_unit
* cooling
* electronics
* gearbox
* brakes
* reliability_profile
* weight
* balance_map
* setup_window
* development_history

### 4.3 Driver

Representa piloto principal, reserva, junior o rival.

Campos:

* age
* nationality
* contract_status
* salary
* market_value
* morale
* ambition
* loyalty
* pressure_resistance
* media_value
* sponsor_value
* political_value
* development_curve
* hidden_potential
* injury_risk
* race_attributes
* feedback_attributes
* personality_traits

### 4.4 StaffMember

Representa ingenieros, directores, estrategas, jefes de aero, jefes de PU, etc.

Campos:

* role
* specialization
* salary
* contract_length
* leadership
* creativity
* discipline
* adaptability
* communication
* political_skill
* loyalty
* ego
* morale
* market_reputation
* hidden_traits

### 4.5 Facility

Infraestructura del equipo.

Campos:

* wind_tunnel_level
* cfd_cluster_level
* simulator_level
* manufacturing_level
* composites_level
* pit_training_center
* academy_center
* data_center
* hq_efficiency
* maintenance_cost
* upgrade_cost
* staff_capacity

### 4.6 RegulationSet

Reglas FIA activas o futuras.

Campos:

* season_start
* season_end
* cost_cap
* aero_rules
* power_unit_rules
* tire_rules
* testing_limits
* wind_tunnel_limits
* cfd_limits
* safety_rules
* parc_ferme_rules
* component_limits
* penalty_rules
* voting_origin
* political_support_map

### 4.7 Circuit

Representa pista y contexto competitivo.

Campos:

* name
* country
* layout_type
* lap_distance
* sector_profiles
* overtaking_difficulty
* dirty_air_severity
* tire_stress_front
* tire_stress_rear
* brake_stress
* power_sensitivity
* drag_sensitivity
* downforce_sensitivity
* kerb_aggression
* surface_abrasion
* bumpiness
* altitude
* weather_profile
* safety_car_probability_base

### 4.8 RaceWeekend

Representa un GP completo.

Campos:

* circuit
* season
* date
* weather_forecast
* practice_sessions
* qualifying
* race
* tire_allocations
* component_allocations
* parc_ferme_state
* penalties
* political_context

### 4.9 Sponsor

Representa patrocinador actual o potencial.

Campos:

* industry
* budget
* brand_alignment
* region_interest
* performance_expectations
* driver_preference
* reputation_sensitivity
* contract_value
* bonus_structure
* exit_clauses

### 4.10 Academy

Sistema juvenil.

Campos:

* scouting_network_level
* karting_program
* f2_partnerships
* coaching_quality
* simulator_access
* scholarship_budget
* junior_drivers
* graduation_probability
* reputation_bonus

---

## 5. Variables técnicas del auto

### 5.1 Aerodynamics

* front_downforce
* rear_downforce
* total_downforce
* drag_coefficient
* aero_efficiency
* floor_efficiency
* diffuser_efficiency
* front_wing_sensitivity
* rear_wing_sensitivity
* yaw_sensitivity
* ride_height_sensitivity
* pitch_sensitivity
* roll_sensitivity
* dirty_air_tolerance
* following_loss
* crosswind_sensitivity
* porpoising_risk
* cooling_drag
* drs_effectiveness

### 5.2 Chassis

* mass
* center_of_gravity_height
* torsional_rigidity
* crash_structure_weight
* packaging_efficiency
* serviceability
* manufacturing_complexity
* upgrade_modularity

### 5.3 Suspension

* mechanical_grip
* platform_control
* tire_preservation
* kerb_handling
* bump_absorption
* setup_range
* wet_stability
* traction
* braking_stability

### 5.4 Power Unit

* peak_power
* torque_curve
* fuel_efficiency
* thermal_efficiency
* ers_harvest_rate
* ers_deployment_efficiency
* battery_capacity
* battery_degradation_rate
* cooling_requirement
* reliability
* throttle_response

### 5.5 Brakes

* braking_power
* cooling_efficiency
* wear_rate
* temperature_window_min
* temperature_window_max
* brake_by_wire_quality
* lockup_resistance

### 5.6 Gearbox

* shift_speed
* reliability
* weight
* drivetrain_loss
* ratio_optimization

### 5.7 Reliability

Separar fiabilidad por componente:

* engine_wear
* turbo_wear
* mgu_h_wear
* mgu_k_wear
* battery_wear
* gearbox_wear
* hydraulics_wear
* suspension_wear
* brake_wear
* electronics_wear

La falla no debe ser un evento aleatorio puro. Debe ser probabilidad emergente desde estrés acumulado.

---

## 6. Variables de pilotos

### 6.1 Pace

* qualifying_precision
* one_lap_peak
* race_pace
* starts
* braking_confidence
* throttle_control
* corner_entry_skill
* corner_exit_skill
* high_speed_commitment
* low_speed_rotation_skill

### 6.2 Racecraft

* overtaking
* defending
* spatial_awareness
* traffic_management
* restart_skill
* blue_flag_efficiency
* wheel_to_wheel_risk

### 6.3 Tire and car management

* tire_management
* fuel_saving
* ers_management
* brake_management
* component_sympathy
* wet_adaptability

### 6.4 Technical contribution

* feedback_quality
* setup_direction_accuracy
* development_feedback_depth
* simulator_work_ethic
* correlation_help

### 6.5 Psychology

* consistency
* pressure_resistance
* morale_stability
* confidence
* aggression
* ambition
* loyalty
* ego
* rivalry_proneness

### 6.6 Commercial and political value

* media_skill
* sponsor_appeal
* national_market_value
* fanbase
* political_leverage

---

## 7. Variables de staff

### 7.1 Technical staff

* domain_expertise
* creativity
* development_speed
* error_rate
* correlation_skill
* concept_understanding
* regulation_interpretation
* manufacturing_awareness

### 7.2 Leadership staff

* morale_management
* department_alignment
* crisis_management
* delegation
* political_navigation
* sponsor_handling
* media_handling

### 7.3 Strategy staff

* tire_modeling
* weather_reading
* pit_window_analysis
* risk_assessment
* traffic_prediction
* opponent_modeling
* real_time_adaptation

### 7.4 Pit crew

* average_stop_time
* consistency
* pressure_resistance
* fatigue
* training_level
* error_rate

---

## 8. Economía y cash flow

### 8.1 Ingresos

* title_sponsor_income
* secondary_sponsor_income
* prize_money
* owner_investment
* merchandise_income
* licensing_income
* driver_commercial_income
* engine_customer_income

### 8.2 Gastos

* salaries_drivers
* salaries_staff
* facility_upkeep
* r_and_d_budget
* manufacturing_cost
* logistics_cost
* crash_damage
* component_replacement
* academy_budget
* lobbying_cost
* debt_service

### 8.3 Cash flow

Cada mes:

cash_next = cash_current + income_month - expenses_month

Pero se debe separar:

* committed_spend
* flexible_spend
* emergency_reserve
* debt_capacity
* cost_cap_spend
* non_cost_cap_spend

### 8.4 Cost cap

El cost cap no debe ser solo un límite. Debe crear decisiones:

* gastar temprano vs guardar para upgrades tardíos
* reparar daños vs desarrollar
* fichar staff caro vs mantener eficiencia
* fabricar paquetes experimentales vs seguros

---

## 9. Sponsors

### 9.1 Tipos de sponsor

* title sponsor
* technical sponsor
* regional sponsor
* driver-linked sponsor
* performance sponsor
* long-term heritage sponsor
* risky sponsor

### 9.2 Intereses

Cada sponsor evalúa:

* resultados
* exposición mediática
* mercados geográficos
* pilotos
* reputación ética
* estabilidad financiera
* estilo de equipo
* riesgo de escándalo

### 9.3 Contratos

Variables:

* base_payment
* performance_bonus
* championship_bonus
* driver_clause
* morality_clause
* termination_clause
* duration
* exclusivity

---

## 10. Academia juvenil

### 10.1 Objetivo

Crear pipeline de talento barato, identidad deportiva y ventaja a largo plazo.

### 10.2 Sistemas

* scouting regional
* karting
* F4/F3/F2 partnerships
* simulator program
* coaching
* psychological support
* media training
* sponsor matching

### 10.3 Variables junior

* raw_speed
* learning_rate
* discipline
* adaptability
* family_funding
* pressure_response
* marketability
* ceiling_hidden
* floor_visible

### 10.4 Decisiones

* financiar carrera junior
* promover a reserva
* prestar a equipo menor
* cortar contrato
* proteger de presión mediática
* acelerar o retrasar debut

---

## 11. Política y FIA

### 11.1 Actores

* FIA
* FOM/comercial
* equipos grandes
* equipos chicos
* motoristas
* sponsors globales
* proveedores de neumáticos
* medios
* fans

### 11.2 Capital político

Cada equipo posee political_capital.

Se gana por:

* prestigio
* historia
* alianzas
* cumplir reglas
* aportar espectáculo
* influencia comercial

Se pierde por:

* protestas excesivas
* trampas
* conflictos públicos
* bloquear consensos
* escándalos

### 11.3 Regulaciones dinámicas

Las reglas cambian por presiones:

* seguridad
* costos
* espectáculo
* sostenibilidad
* competitividad
* presión de fabricantes
* crisis económicas

### 11.4 Acciones políticas del jugador

* apoyar regulación
* bloquear regulación
* proponer cambios
* aliarse con otro equipo
* protestar diseño rival
* negociar concesiones
* filtrar a prensa
* aceptar compromiso

---

## 12. Simulación de carrera

### 12.1 Filosofía

La carrera debe ser simulada por estados, no por narrativa prefabricada.

El resultado debe emerger de:

* circuito
* auto
* setup
* piloto
* neumático
* combustible
* clima
* tráfico
* estrategia
* fiabilidad
* ejecución del equipo

### 12.2 Modelo por sectores

Cada circuito se divide en sectores y microsegmentos.

Segmentos posibles:

* straight
* braking_zone
* slow_corner
* medium_corner
* fast_corner
* traction_zone
* kerb_zone
* drs_zone

Cada segmento pondera distintas variables.

### 12.3 Lap time model

lap_time = base_track_time + car_delta + driver_delta + tire_delta + fuel_delta + weather_delta + traffic_delta + reliability_delta + execution_error

execution_error debe ser pequeño y derivado de atributos, no azar puro.

### 12.4 Neumáticos

Variables:

* compound
* age_laps
* surface_temp
* core_temp
* wear
* graining
* blistering
* pressure
* heat_cycles
* grip

Factores:

* track_temp
* driving_style
* car_balance
* downforce
* sliding
* fuel_load
* dirty_air
* setup

### 12.5 Clima

Variables:

* air_temp
* track_temp
* humidity
* wind_speed
* wind_direction
* rain_intensity_by_sector
* drying_rate
* rubber_level

### 12.6 Estrategia

Decisiones:

* starting tire
* pit lap target
* undercut/overcut
* tire conservation
* push mode
* ERS deploy
* fuel saving
* team orders
* safety car response
* weather gamble

### 12.7 Incidentes

Incidentes no deben ser aleatorios planos. Se generan por riesgo acumulado:

incident_risk = driver_aggression + pressure + tire_state + weather + traffic_density + car_instability + fatigue + strategic_push

---

## 13. Desarrollo técnico

### 13.1 Fases de upgrade

1. Concepto
2. Investigación
3. Simulación CFD
4. Túnel de viento
5. Diseño detallado
6. Fabricación
7. Instalación
8. Correlación pista
9. Iteración

### 13.2 Posibles resultados

* upgrade funciona como esperado
* upgrade funciona pero en ventana estrecha
* upgrade mejora un área y empeora otra
* upgrade no correlaciona
* upgrade requiere setup específico
* upgrade da potencial futuro aunque poco rendimiento inmediato

### 13.3 Variables de proyecto

* expected_gain
* uncertainty
* cost
* development_time
* manufacturing_time
* correlation_risk
* reliability_risk
* regulation_risk
* concept_dependency

---

## 14. Reputación

### 14.1 Dimensiones

* technical_reputation
* sporting_reputation
* political_reputation
* financial_reputation
* driver_reputation
* staff_reputation
* sponsor_reputation
* ethical_reputation

### 14.2 Impactos

La reputación afecta:

* sponsors
* pilotos disponibles
* staff disponible
* poder político
* moral interna
* fans
* presión mediática

---

## 15. Rivalidades

### 15.1 Tipos

* rivalidad técnica
* rivalidad política
* rivalidad de pilotos
* rivalidad histórica
* rivalidad comercial
* rivalidad personal entre staff

### 15.2 Efectos

* más presión
* más motivación
* riesgo de errores
* guerra de protestas
* inflación salarial
* fichajes agresivos
* cambios regulatorios impulsados

---

## 16. Decisiones semana a semana

### 16.1 Ingeniería

* elegir proyecto de upgrade
* asignar CFD
* asignar túnel
* pausar desarrollo actual
* pivotear concepto
* fabricar piezas
* validar correlación
* priorizar siguiente temporada

### 16.2 Finanzas

* aprobar presupuesto
* negociar sponsor
* recortar gasto
* invertir en facility
* pagar deuda
* reservar caja
* asumir penalización por exceso de cost cap o evitarla

### 16.3 Staff

* contratar
* renovar
* despedir
* reasignar departamentos
* resolver conflicto
* proteger talento clave
* mejorar moral

### 16.4 Pilotos

* entrenamiento
* simulador
* feedback técnico
* gestión mental
* negociación contrato
* academia
* promociones
* roles de equipo

### 16.5 Política

* asistir reunión FIA
* votar reglas
* negociar alianza
* protestar rival
* aceptar directiva técnica
* filtrar presión a prensa

### 16.6 Carrera

* setup base
* motor allocation
* tire allocation
* estrategia inicial
* riesgo operativo
* pit crew training
* briefing de pilotos

---

## 17. MVP propuesto

### 17.1 No construir todo primero

El MVP debe demostrar el core sistémico.

### 17.2 MVP recomendado

Incluye:

* 10 equipos
* 20 pilotos
* 8 circuitos
* 1 temporada
* auto simplificado en 5 áreas
* economía básica
* upgrades simples pero con tradeoffs
* carrera simulada por sectores
* neumáticos básicos
* clima básico
* sponsors básicos

### 17.3 Variables MVP

Team:

* cash
* reputation
* staff_quality
* aero_facility
* manufacturing_quality

Car:

* downforce
* drag
* tire_wear
* reliability
* cooling

Driver:

* pace
* consistency
* tire_management
* feedback
* aggression

Circuit:

* downforce_weight
* drag_weight
* tire_stress
* overtaking
* weather_risk

Race:

* lap_time_model
* tire_degradation
* pit_strategy
* reliability_stress

### 17.4 MVP loops

* semana de desarrollo
* carrera
* ingresos/gastos
* upgrade feedback
* standings

---

## 18. Plan de ejecución

### Fase 1 — Diseño sistémico

Objetivo: cerrar reglas, variables y relaciones.

Entregables:

* documento de diseño completo
* diccionario de entidades
* lista de variables
* fórmulas iniciales
* loops de gameplay
* modelo MVP

### Fase 2 — Simulador headless

Objetivo: crear simulación sin UI.

Entregables:

* modelos de datos
* simulación de temporada
* simulación de carrera
* generación de reportes JSON
* tests deterministas

### Fase 3 — Balance sandbox

Objetivo: poder correr cientos de temporadas.

Entregables:

* script de auto-simulación
* métricas de balance
* detección de dominancia excesiva
* sensibilidad de variables

### Fase 4 — UI de management

Objetivo: interfaz jugable.

Entregables:

* dashboard equipo
* calendario
* pantalla desarrollo
* pantalla pilotos
* pantalla staff
* pantalla finanzas
* pantalla carrera

### Fase 5 — Profundización

Objetivo: agregar sistemas complejos.

Entregables:

* FIA dinámica
* política
* academias
* sponsors avanzados
* staff market
* reputación avanzada

### Fase 6 — Contenido histórico/generativo

Objetivo: décadas.

Entregables:

* eras regulatorias
* generación de pilotos
* retiro/envejecimiento
* evolución de equipos
* historia emergente

---

## 19. Preguntas abiertas

### 19.1 Alcance y plataforma

1. ¿Querés que sea juego de PC, web app, mobile, o simulador primero en consola/CLI?
2. ¿Querés gráficos 2D, UI tipo Football Manager, o dashboard técnico con visualizaciones?
3. ¿Será single player solamente?
4. ¿Querés nombres/licencias reales o universo ficticio inspirado en F1?
5. ¿La escala inicial será realista moderna o histórica desde décadas pasadas?

### 19.2 Profundidad técnica

6. ¿Querés que el jugador vea variables técnicas explícitas o reportes interpretados por ingenieros?
7. ¿Preferís fórmulas visibles tipo Paradox/strategy game o caja negra parcial tipo Football Manager?
8. ¿Qué tan hardcore debe ser el setup del auto?
9. ¿El jugador puede tocar alerones, suspensiones, presiones, mapas motor, o solo decisiones macro?
10. ¿Querés modelar unidades de potencia con proveedores externos?

### 19.3 Carrera

11. ¿La carrera debe verse en vivo o resolverse con reportes?
12. ¿El jugador toma decisiones durante la carrera?
13. ¿Puede pausar, acelerar y revisar telemetría?
14. ¿Querés simulación vuelta a vuelta o sector por sector?
15. ¿Qué tan frecuentes deben ser safety cars, incidentes y fallos?

### 19.4 Economía

16. ¿Querés cost cap estricto desde el inicio?
17. ¿Querés deuda, préstamos, dueños e inversores?
18. ¿El jugador puede quebrar?
19. ¿Puede vender participación del equipo?
20. ¿Querés presupuestos plurianuales?

### 19.5 Política

21. ¿La FIA debe ser muy visible como sistema jugable?
22. ¿Querés votaciones explícitas entre equipos?
23. ¿Querés protestas técnicas y zonas grises legales?
24. ¿Querés riesgo de sanciones por innovación agresiva?
25. ¿La prensa debe influir en política y reputación?

### 19.6 Pilotos y staff

26. ¿Querés pilotos generados proceduralmente?
27. ¿Querés envejecimiento, declive y retiro?
28. ¿Querés personalidades fuertes que causen conflictos?
29. ¿Querés que el staff sea tan importante como pilotos?
30. ¿Querés mercado global con contratos, cláusulas y gardening leave?

### 19.7 Academia

31. ¿La academia será sistema profundo o secundario?
32. ¿Querés categorías junior simuladas?
33. ¿Querés poder crear afiliaciones con equipos menores?
34. ¿Querés que el talento joven tenga potencial oculto?
35. ¿Querés scouting regional?

### 19.8 Filosofía de juego

36. ¿Querés que se pueda dominar durante años?
37. ¿O el sistema debe forzar ciclos de caída mediante reglas y economía?
38. ¿Qué tan castigador debe ser equivocarse?
39. ¿Querés ironman/permadeath financiero?
40. ¿Querés sandbox editable o experiencia más cerrada?

---

## 20. Decisiones de producto v0

Estas decisiones quedan fijadas como restricciones iniciales del diseño.

### 20.1 Plataforma

* Plataforma objetivo: web.
* Debe ser jugable desde PC y mobile.
* Prioridad: simulación profunda sobre presentación visual.
* UI inicial: simple, densa, funcional, cercana a Basketball GM.
* Single player solamente.

### 20.2 Universo

* Punto de partida: época actual.
* Preferencia: nombres reales cuando sea posible.
* Riesgo a considerar: nombres, logos, equipos y pilotos reales pueden tener implicaciones de licencia. Para desarrollo inicial se puede usar una capa de datos editable con nombres reales en entorno privado y opción de universo ficticio para distribución pública.

### 20.3 Profundidad técnica

* El jugador no ve todas las variables crudas.
* La información principal llega mediante reportes interpretados por ingenieros.
* Caja negra parcial estilo Football Manager.
* Setup con profundidad accesible.
* El jugador puede ajustar elementos superficiales:

  * carga aerodinámica baja/media/alta
  * balance hacia clasificación/carrera
  * agresividad de motor
  * enfriamiento conservador/agresivo
  * enfoque de neumáticos
  * altura/plataforma como decisión abstracta, no milimétrica
* Power units con proveedores externos elegibles según costo, potencia, fiabilidad, eficiencia, política y disponibilidad.

### 20.4 Carrera

* No habrá UI visual de carrera al inicio.
* Carrera por reportes y decisiones.
* El jugador toma decisiones durante la carrera.
* No se requiere pausa, aceleración ni telemetría detallada en vivo.
* Simulación vuelta a vuelta.
* Safety cars, incidentes y fallos deben existir con frecuencia realista, no excesiva.

### 20.5 Economía

* Cost cap activo desde el inicio.
* Sistema de deuda, préstamos, dueños e inversores.
* El jugador puede quebrar.
* No se venderá participación del equipo.
* Presupuestos plurianuales.
* El error financiero debe ser castigador, pero sin ironman/permadeath obligatorio.

### 20.6 Política y FIA

* FIA visible como sistema jugable.
* Puede imponer decisiones que afecten al juego.
* Votaciones explícitas entre equipos.
* No se priorizarán protestas técnicas complejas ni zonas grises legales en v0.
* Sí habrá riesgo de sanción por innovación agresiva.
* Prensa influye en política y reputación.

### 20.7 Pilotos y staff

* Pilotos generados proceduralmente.
* Envejecimiento, declive y retiro.
* Personalidades fuertes y conflictos.
* Los pilotos son más importantes que el staff en el corto plazo.
* El staff ejecutivo impacta mediano/largo plazo en calidad del auto, cultura, eficiencia y desarrollo.
* Pilotos con contratos y cláusulas.
* Staff con mercado más simple.

### 20.8 Academia

* Academia importante, pero menos compleja que el equipo principal.
* Categorías junior simuladas.
* Afiliaciones con equipos menores.
* Talento joven con potencial oculto.
* Scouting regional.

### 20.9 Filosofía de juego

* Se puede dominar durante años, pero debe ser difícil.
* Reglas, economía, envejecimiento, política y ciclos tecnológicos deben presionar contra hegemonías eternas.
* Equivocarse debe ser bastante castigador.
* Experiencia cerrada, no sandbox editable como prioridad inicial.

---

## 21. Preguntas operativas para cerrar el diseño v1

### 21.1 Modelo de tiempo

1. ¿Cada turno será una semana exacta del calendario?
2. ¿Durante semanas con carrera querés dividir en pre-race, race y post-race?
3. ¿La pretemporada debe tener más decisiones por semana que la temporada regular?
4. ¿Querés parón de verano con decisiones especiales?
5. ¿El invierno será una fase larga de diseño del auto siguiente?

### 21.2 Escudería inicial

6. ¿El jugador elige cualquier equipo actual o crea/compra una escudería nueva?
7. ¿Querés distintos niveles de dificultad según equipo?
8. ¿Se puede dirigir Ferrari/Red Bull/Mercedes desde el inicio?
9. ¿O conviene empezar con equipo ficticio de mitad/fondo de tabla?
10. ¿Querés objetivos de dueño distintos por equipo?

### 21.3 Datos reales vs ficticios

11. ¿Aceptás que usemos datos reales como inspiración pero con nombres editables?
12. ¿Querés base de datos tipo JSON/CSV para cambiar pilotos/equipos fácilmente?
13. ¿Querés que los ratings iniciales sean subjetivos o calculados con datos históricos?
14. ¿Querés que el juego pueda arrancar en 2026 específicamente?
15. ¿Querés que el calendario sea real o semi-ficticio?

### 21.4 Carrera y decisiones en vivo

16. ¿Cuántas veces por carrera debería intervenir el jugador normalmente?
17. ¿Querés decisiones solo cuando ocurre algo relevante o cada X vueltas?
18. ¿Querés que el jugador pueda definir una estrategia previa y luego solo reaccionar?
19. ¿Qué decisiones in-race son obligatorias para v0?
20. ¿Querés radio de pilotos como reporte textual?

### 21.5 Nivel de simulación

21. ¿Cuántos equipos y pilotos en parrilla para v0?
22. ¿Cuántas carreras en la primera temporada jugable?
23. ¿Querés sprint races?
24. ¿Querés penalizaciones de motor/componentes desde v0?
25. ¿Querés clima dinámico desde v0 o versión simple primero?

### 21.6 Desarrollo técnico

26. ¿Cuántos proyectos de upgrade simultáneos puede manejar el jugador?
27. ¿Querés árbol tecnológico o sistema libre por áreas?
28. ¿Querés que haya conceptos de auto incompatibles entre sí?
29. ¿Querés poder abandonar el auto actual y enfocarte en el año siguiente?
30. ¿Los upgrades deben fabricarse unidad por unidad para cada auto?

### 21.7 Economía

31. ¿Querés salarios mensuales o anuales prorrateados?
32. ¿Querés pagos de sponsors por carrera, por mes o por temporada?
33. ¿Querés prize money al final de temporada o adelantos durante el año?
34. ¿Qué pasa si el equipo entra en caja negativa?
35. ¿Querés que el dueño pueda exigir recortes o inyectar capital?

### 21.8 UX inicial

36. ¿Querés que la primera versión sea solo texto/tablas?
37. ¿Querés gráficos simples de evolución de performance, caja y standings?
38. ¿Querés pantalla principal tipo inbox con reportes?
39. ¿Querés tooltips explicativos para cada decisión?
40. ¿Querés logs históricos para entender por qué pasó cada cosa?

---

## 22. Decisiones operativas v1

### 22.1 Modelo temporal

* El juego avanza en turnos semanales exactos.
* Las semanas con carrera se dividen en:

  * pre-race
  * race
  * post-race
* La pretemporada tiene más densidad de decisiones.
* Existe parón de verano con decisiones estratégicas especiales.
* El invierno es la fase principal de diseño del auto siguiente.

### 22.2 Escudería inicial

* El jugador solo puede elegir equipos de mitad/fondo de parrilla.
* No puede empezar en Ferrari, Red Bull o Mercedes.
* Los equipos tienen distintas dificultades.
* Cada dueño posee objetivos propios.

Ejemplos:

* sobrevivir financieramente
* terminar P8
* desarrollar piloto local
* reducir costos
* crecer reputación
* preparar venta futura

### 22.3 Contexto inicial

* Inicio sugerido: temporada 2026.
* Calendario real.
* Ratings basados en datos y percepción real.
* Arquitectura preparada para reemplazar datos reales por ficticios si es necesario.

### 22.4 Carrera y decisiones in-race

La carrera es:

* simulación vuelta a vuelta
* basada en reportes
* sin visualización 3D
* sin control en tiempo real continuo

El jugador define estrategia previa.

Durante carrera solo interviene cuando ocurre algo importante:

* lluvia
* safety car
* choque
* degradación inesperada
* oportunidad de undercut
* problema mecánico

Decisiones v0:

* entrar o no a boxes
* cambiar neumáticos
* reaccionar a lluvia
* reaccionar a incidentes
* órdenes simples de riesgo/conservación

### 22.5 Nivel de simulación v0

* 11 equipos.
* 12 carreras.
* Sin sprint races en v0.
* Sin penalizaciones complejas de PU en v0.
* Clima dinámico incluido desde v0.

### 22.6 Desarrollo técnico

* Máximo 2 proyectos de upgrade simultáneos.
* Sistema de árbol tecnológico.
* Existen conceptos incompatibles.
* El jugador puede abandonar desarrollo actual para enfocarse en el siguiente año.
* Los upgrades deben fabricarse por unidad para cada auto.

### 22.7 Economía

* Salarios anuales.
* Sponsors pagan mensualmente.
* Prize money al final de temporada.
* Caja negativa bloquea gasto.
* Existe período límite para recuperar liquidez.
* El dueño puede:

  * exigir recortes
  * inyectar capital
  * imponer objetivos

### 22.8 UX inicial

* Primera versión funcional basada principalmente en:

  * texto
  * tablas
  * dashboards simples
* Inbox principal de reportes.
* Gráficos simples:

  * performance
  * standings
  * cash flow
  * desarrollo
* Sin tooltips pesados inicialmente.
* Logs históricos opcionales.

---

# 23. Arquitectura conceptual del juego

Ahora ya podemos definir la estructura REAL del proyecto.

La clave:

el juego NO es un simulador de carreras.

Es un:

* simulador organizacional
* simulador económico
* simulador técnico
* simulador humano
* simulador político

con carreras como punto de validación.

---

# 24. Mapa sistémico principal

## 24.1 Flujo central

```text
Regulaciones FIA
    ↓
Diseño del auto
    ↓
Performance potencial
    ↓
Resultados deportivos
    ↓
Dinero + reputación
    ↓
Capacidad de desarrollo
    ↓
Nuevo auto
```

Pero alrededor existen loops secundarios:

```text
Academia → pilotos → resultados

Sponsors → presupuesto → upgrades

Reputación → sponsors/staff/pilotos

Política → regulaciones → diseño viable

Staff → calidad de desarrollo
```

---

# 25. Estructura modular definitiva

## 25.1 Core Simulation Engine

Responsabilidad:

* avanzar tiempo
* ejecutar ticks semanales
* coordinar módulos
* resolver dependencias

Submódulos:

* calendar_engine
* event_engine
* notification_engine
* simulation_scheduler

---

## 25.2 Team Module

Responsabilidad:

* estado general de escudería
* facilities
* reputación
* objetivos del dueño
* cultura
* caja
* staff

Submódulos:

* facilities_system
* owner_system
* morale_system
* reputation_system

---

## 25.3 Car Development Module

Responsabilidad:

* diseño del auto
* árbol tecnológico
* upgrades
* correlación
* fabricación
* testing

Submódulos:

* aero_system
* chassis_system
* power_unit_system
* manufacturing_system
* concept_system
* upgrade_pipeline
* reliability_system

---

## 25.4 Race Simulation Module

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

## 25.5 Driver Module

Responsabilidad:

* pilotos principales
* reservas
* desarrollo
* personalidad
* contratos
* progresión

Submódulos:

* progression_system
* morale_system
* contract_system
* scouting_system
* personality_system

---

## 25.6 Staff Module

Responsabilidad:

* ingenieros
* directores
* estrategas
* pit crew

Submódulos:

* hiring_system
* leadership_system
* efficiency_system
* department_structure

---

## 25.7 Economy Module

Responsabilidad:

* ingresos
* gastos
* sponsors
* cost cap
* deuda
* inversiones

Submódulos:

* sponsor_system
* payroll_system
* budgeting_system
* debt_system
* cost_cap_system

---

## 25.8 FIA & Politics Module

Responsabilidad:

* regulaciones
* votaciones
* sanciones
* presión política
* equilibrio competitivo

Submódulos:

* regulation_engine
* voting_system
* sanction_system
* pressure_system
* media_system

---

## 25.9 Academy Module

Responsabilidad:

* scouting
* juniors
* afiliaciones
* desarrollo de talento

Submódulos:

* junior_generation
* scouting_regions
* feeder_series
* development_programs

---

# 26. Modelo de datos de alto nivel

## 26.1 Relaciones principales

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

# 27. Modelo de simulación temporal

## 27.1 Tick principal

El juego funciona por:

```text
1 semana = 1 tick principal
```

Dentro de cada semana:

```text
weekly_tick:
    economy_tick
    morale_tick
    development_tick
    scouting_tick
    manufacturing_tick
    politics_tick
```

En semanas de carrera:

```text
pre_race_tick
qualifying_tick
race_tick
post_race_tick
```

---

# 28. Filosofía de UI

La UI debe transmitir:

* presión
* limitación de recursos
* claridad ejecutiva
* complejidad manejable

Inspiraciones:

* Basketball GM
* Football Manager
* Motorsport Manager

NO:

* dashboards sci-fi excesivos
* simulación visual pesada
* micromanagement insoportable

---

# 29. Decisiones núcleo del jugador

## Cada semana el jugador decide:

### Técnica

* qué investigar
* qué fabricar
* qué sacrificar
* qué concepto seguir

### Deportiva

* estrategia próxima carrera
* desarrollo de pilotos
* academia

### Económica

* presupuesto
* contratos
* sponsors
* facilities

### Política

* votos FIA
* alineamientos
* presión pública

### Organizacional

* contrataciones
* despidos
* prioridades internas

---

# 30. Lo MÁS importante del proyecto

La profundidad NO viene de tener miles de stats.

Viene de:

* sistemas interdependientes
* tradeoffs reales
* consecuencias persistentes
* información imperfecta
* especialización organizacional
* timing

El jugador debe poder perder un campeonato:

* hace 8 meses
* por una decisión aparentemente correcta
* que generó consecuencias invisibles acumulativas

Ahí nace la fantasía.

---

# 31. Próximo documento crítico

El siguiente documento debería ser:

# SYSTEM FORMULAS v0

Y debe definir:

1. fórmula de performance del auto
2. fórmula de tiempo de vuelta
3. degradación neumáticos
4. clima
5. incidentes
6. upgrades
7. correlación
8. economía
9. sponsors
10. reputación
11. desarrollo pilotos
12. generación procedural
13. balance FIA
14. progresión tecnológica
15. AI de equipos rivales

Ese documento ya sería directamente implementable en Codex.
