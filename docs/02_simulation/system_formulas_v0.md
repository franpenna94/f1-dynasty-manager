# F1 Dynasty Manager — System Formulas v0

## 0. Propósito del documento

Este documento define las fórmulas base del simulador.

Objetivo:

* convertir diseño sistémico en reglas implementables
* mantener causalidad visible
* evitar azar excesivo
* permitir balance progresivo
* crear una base clara para Codex

Principio rector:

> El jugador no necesita ver todas las fórmulas, pero el sistema debe poder explicar cada resultado.

---

# 1. Filosofía matemática

## 1.1 Determinismo con ruido controlado

La mayoría de resultados deben salir de variables del sistema.

El azar debe usarse solo para:

* incertidumbre humana
* pequeñas variaciones de ejecución
* condiciones externas parcialmente predecibles
* eventos raros modelados por riesgo acumulado

Nunca debe usarse para tapar falta de simulación.

---

## 1.2 Fórmula general de resultado

Muchos sistemas seguirán esta estructura:

```text
result = base + deterministic_modifiers + controlled_variance
```

Donde:

```text
controlled_variance = random_normal(0, variance_scale)
```

Pero `variance_scale` depende de atributos reales:

* consistencia del piloto
* calidad del staff
* presión
* clima
* fiabilidad
* confianza del equipo
* complejidad técnica

---

## 1.3 Información imperfecta

El sistema puede conocer valores exactos, pero el jugador ve estimaciones.

```text
visible_value = true_value + scouting_error
```

Donde:

```text
scouting_error = base_uncertainty × (1 - information_quality)
```

Ejemplo:

* piloto propio: baja incertidumbre
* junior desconocido: alta incertidumbre
* upgrade probado: baja incertidumbre
* upgrade experimental: alta incertidumbre

---

# 2. Escalas numéricas propuestas

## 2.1 Escala principal

La mayoría de atributos internos usan escala:

```text
0 - 100
```

Interpretación:

```text
0   = inexistente / catastrófico
25  = bajo
50  = promedio parrilla
75  = fuerte
90  = élite
100 = excepcional histórico
```

## 2.2 Escala de performance en pista

La performance debe convertirse a tiempo.

Unidad recomendada:

```text
seconds per lap delta
```

Ejemplo:

```text
car_delta = -0.350s
pilot_delta = -0.120s
weather_delta = +1.800s
```

Negativo = más rápido.
Positivo = más lento.

---

# 3. Modelo de performance del auto

## 3.1 Variables base del auto v0

Para v0, el auto puede comprimirse en estas variables:

```text
downforce
low_speed_grip
high_speed_grip
drag_efficiency
tire_preservation
cooling
reliability
weight_efficiency
setup_window
correlation_confidence
```

Todas en 0-100.

---

## 3.2 Performance por circuito

Cada circuito tiene pesos:

```text
downforce_weight
drag_weight
tire_stress_weight
power_weight
brake_weight
low_speed_weight
high_speed_weight
reliability_stress
weather_volatility
```

---

## 3.3 Car Track Fit Score

```text
car_track_fit =
    downforce        × circuit.downforce_weight +
    drag_efficiency  × circuit.drag_weight +
    tire_preservation × circuit.tire_stress_weight +
    power_unit_score × circuit.power_weight +
    brake_score      × circuit.brake_weight +
    low_speed_grip   × circuit.low_speed_weight +
    high_speed_grip  × circuit.high_speed_weight
```

Luego se normaliza por suma de pesos.

```text
car_track_fit_normalized = car_track_fit / total_weights
```

---

## 3.4 Conversión a delta de tiempo

Propuesta inicial:

```text
car_lap_delta = (grid_average_car_score - car_track_fit_normalized) × car_time_scale
```

Donde:

```text
car_time_scale = 0.025s por punto
```

Ejemplo:

Si el auto está 10 puntos por encima del promedio:

```text
car_lap_delta = -0.250s
```

---

# 4. Modelo de piloto

## 4.1 Variables v0

```text
pace
qualifying
racecraft
consistency
tire_management
wet_skill
feedback
aggression
pressure_resistance
experience
```

---

## 4.2 Driver lap delta

```text
driver_score =
    pace × 0.35 +
    consistency × 0.15 +
    tire_management × 0.15 +
    racecraft × 0.10 +
    experience × 0.10 +
    pressure_resistance × 0.10 +
    wet_skill × weather_wet_factor × 0.05
```

```text
driver_lap_delta = (grid_average_driver_score - driver_score) × driver_time_scale
```

Propuesta:

```text
driver_time_scale = 0.015s por punto
```

---

## 4.3 Variabilidad por consistencia

```text
execution_variance = base_driver_variance × (1 - consistency / 100)
```

Ejemplo:

```text
base_driver_variance = 0.120s
```

Un piloto con consistencia 90 varía muy poco.
Un piloto con consistencia 50 tiene más errores pequeños.

---

# 5. Modelo de vuelta

## 5.1 Lap time base

```text
lap_time =
    circuit.base_lap_time +
    car_lap_delta +
    driver_lap_delta +
    tire_delta +
    fuel_delta +
    weather_delta +
    traffic_delta +
    reliability_delta +
    execution_error
```

---

## 5.2 Fuel delta

El auto empieza más pesado y mejora con cada vuelta.

```text
fuel_delta = current_fuel_kg × fuel_time_per_kg
```

Propuesta:

```text
fuel_time_per_kg = 0.032s
```

---

# 6. Modelo de neumáticos

## 6.1 Variables de neumático

```text
compound
age_laps
wear
surface_temp
core_temp
grip
usable_life
cliff_point
```

---

## 6.2 Degradación por vuelta

```text
wear_gain =
    compound_base_wear ×
    circuit.tire_stress ×
    car_tire_wear_factor ×
    driver_tire_factor ×
    weather_factor ×
    push_factor
```

Donde:

```text
car_tire_wear_factor = 1 + ((50 - car.tire_preservation) / 100)
driver_tire_factor = 1 + ((50 - driver.tire_management) / 120)
```

---

## 6.3 Tire lap delta

```text
tire_delta = wear × compound_wear_penalty
```

Si supera cliff:

```text
tire_delta += cliff_penalty × (wear - cliff_point)
```

---

# 7. Modelo de clima

## 7.1 Estados de pista

```text
dry
damp
wet
heavy_wet
```

---

## 7.2 Cambio climático

Cada carrera tiene:

```text
weather_volatility
rain_probability
rain_intensity
track_drying_rate
```

El clima cambia por eventos probabilísticos suaves, no azar extremo.

---

## 7.3 Weather delta

```text
weather_delta =
    track_wetness_penalty × tire_mismatch_factor × driver_wet_modifier × car_wet_modifier
```

---

# 8. Incidentes y safety car

## 8.1 Riesgo de incidente

```text
incident_risk =
    base_incident_rate +
    aggression_factor +
    weather_factor +
    tire_wear_factor +
    pressure_factor +
    traffic_factor +
    reliability_factor
```

---

## 8.2 Principio

El incidente no debe ser puro azar.

El azar decide si se materializa, pero el riesgo viene de estados reales.

---

# 9. Fiabilidad

## 9.1 Estrés acumulado

```text
component_stress +=
    circuit.reliability_stress ×
    engine_mode_factor ×
    cooling_factor ×
    component_age_factor
```

---

## 9.2 Riesgo de fallo

```text
failure_risk = base_failure_rate × stress_multiplier
```

Donde:

```text
stress_multiplier = component_stress / safe_stress_threshold
```

---

# 10. Desarrollo técnico

## 10.1 Upgrade expected gain

```text
expected_gain =
    base_project_gain ×
    facility_modifier ×
    staff_modifier ×
    concept_synergy ×
    regulation_fit
```

---

## 10.2 Correlación

```text
actual_gain = expected_gain × correlation_roll
```

Pero `correlation_roll` no debe ser azar bruto.

```text
correlation_roll = normal(1.0, uncertainty)
```

Donde:

```text
uncertainty =
    base_uncertainty ×
    project_complexity ×
    (1 - correlation_confidence)
```

---

## 10.3 Tiempo de desarrollo

```text
development_weeks =
    base_weeks ×
    complexity_factor ×
    staff_speed_factor ×
    facility_factor
```

---

# 11. Economía

## 11.1 Monthly cash flow

```text
cash_next =
    cash_current +
    monthly_sponsor_income +
    owner_injection -
    monthly_operating_cost -
    development_spend -
    manufacturing_spend -
    debt_payment
```

---

## 11.2 Cost cap

```text
cost_cap_remaining = cost_cap_limit - cost_cap_spend_to_date
```

Gastos bajo cost cap:

* desarrollo auto
* fabricación piezas
* parte de staff técnico
* operaciones competitivas

Fuera de cost cap:

* pilotos
* marketing
* algunas infraestructuras
* academia según regla de diseño

---

# 12. Sponsors

## 12.1 Sponsor attractiveness

```text
sponsor_score =
    team_reputation × 0.30 +
    recent_results × 0.25 +
    driver_marketability × 0.20 +
    financial_stability × 0.10 +
    media_presence × 0.10 +
    sponsor_alignment × 0.05
```

---

# 13. Reputación

## 13.1 Reputation update

```text
reputation_next =
    reputation_current +
    sporting_delta +
    financial_delta +
    political_delta +
    media_delta +
    scandal_delta
```

---

# 14. Pilotos: progresión y declive

## 14.1 Desarrollo anual

```text
development_gain =
    learning_rate ×
    academy_or_team_quality ×
    seat_time_factor ×
    morale_factor ×
    age_curve_factor
```

---

## 14.2 Declive

```text
decline = age_decline_factor × motivation_factor × injury_factor
```

---

# 15. AI rival

## 15.1 Prioridad semanal AI

Cada equipo rival calcula prioridades:

```text
priority_score =
    weakness_urgency +
    budget_fit +
    owner_pressure +
    championship_context +
    regulation_context +
    team_identity_bias
```

---

# 16. FIA y regulaciones

## 16.1 Regulatory pressure

```text
regulation_pressure =
    dominance_pressure +
    cost_pressure +
    safety_pressure +
    entertainment_pressure +
    manufacturer_pressure +
    media_pressure
```

---

# 17. Preguntas abiertas para cerrar fórmulas v0

## 17.1 Escalas y visibilidad

1. ¿Querés que todos los atributos internos sean 0-100?
2. ¿Querés que el jugador vea ratings con letras/rangos en vez de números exactos?
3. ¿Querés que los reportes digan “muy bueno / bueno / promedio / malo” en vez de valores?
4. ¿Querés que solo algunos números sean visibles, como presupuesto y puntos?

## 17.2 Performance y tiempos

5. ¿Querés que la diferencia entre mejor y peor auto sea de cuántos segundos por vuelta aproximadamente?
6. ¿Querés que el piloto pueda compensar mucho o poco un mal auto?
7. ¿Qué debería pesar más en v0: auto o piloto?
8. ¿Querés que algunos circuitos generen sorpresas fuertes por encaje de auto?

## 17.3 Carrera

9. ¿Cuántas vueltas promedio querés simular por carrera? ¿Realista completa o reducida?
10. ¿Querés que las carreras duren en el juego 30 segundos, 2 minutos, o sean resolución casi instantánea por reportes?
11. ¿Querés que el jugador reciba 3-8 eventos por carrera como máximo?
12. ¿Qué tan frecuente debe ser que una estrategia alternativa gane por sobre ritmo puro?

## 17.4 Neumáticos y clima

13. ¿Querés 3 compuestos secos + intermedios + lluvia?
14. ¿Querés que el cliff de neumáticos sea fuerte o gradual?
15. ¿Querés que la lluvia sea el principal generador de decisiones in-race?
16. ¿Querés errores de predicción climática según calidad del staff?

## 17.5 Desarrollo técnico

17. ¿Querés que los upgrades den mejoras pequeñas frecuentes o pocas mejoras grandes?
18. ¿Querés que un upgrade pueda empeorar el auto?
19. ¿Qué tan común debe ser mala correlación?
20. ¿Querés que el árbol tecnológico bloquee caminos completos?

## 17.6 Economía

21. ¿Querés economía muy castigadora desde v0 o balance inicial más amable?
22. ¿Cuánto debería sufrir un equipo por chocar mucho?
23. ¿Querés que la caja negativa sea común o situación grave rara?
24. ¿Querés que el cost cap sea una restricción real ya en temporada 1?

## 17.7 Pilotos

25. ¿Querés que los ratings de piloto cambien rápido o lentamente?
26. ¿Querés rookies muy variables?
27. ¿Querés que la personalidad pueda destruir una dupla fuerte?
28. ¿Querés que pilotos estrella tengan poder político interno?

## 17.8 FIA / balance competitivo

29. ¿Querés que la FIA intervenga agresivamente contra dominancias?
30. ¿Cada cuántos años debería haber cambios regulatorios grandes?
31. ¿Querés cambios menores cada temporada?
32. ¿Querés que equipos chicos puedan votar reglas anti-grandes?

## 17.9 AI rival

33. ¿Querés que la AI juegue “justo” con las mismas reglas?
34. ¿Querés personalidad por equipo rival?
35. ¿Querés que la AI pueda cometer errores estratégicos serios?
36. ¿Querés que la AI pueda entrar en crisis financiera?

---

# 18. Decisiones cerradas de balance v0

## 18.1 Escalas y visibilidad

* Todos los atributos internos usan escala 0-100.
* El jugador puede ver números.
* No se ocultan ratings detrás de letras.
* Los reportes pueden interpretar los números, pero los valores numéricos son visibles.
* Presupuesto, puntos, ratings y performance pueden mostrarse directamente.

---

## 18.2 Performance y tiempos

La diferencia entre mejor y peor auto no es fija.

Debe depender del estado regulatorio:

```text
regulation_gap_multiplier:
    nuevo ciclo regulatorio grande = 1.25 - 1.50
    ciclo medio = 1.00
    ciclo maduro = 0.65 - 0.85
```

Diferencia objetivo:

```text
post_major_regulation_change: 2.0s - 3.0s por vuelta
mature_regulation_cycle: 0.8s - 1.5s por vuelta
```

El auto es la variable dominante.

El mejor piloto con el peor auto normalmente NO debe ganar por ritmo puro.

Peso objetivo v0:

```text
auto impact: 65% - 75%
driver impact: 20% - 30%
strategy/team execution: 5% - 15%
```

Circuit fit puede generar sorpresas, pero no en todas las carreras.

```text
circuit_specialization_strength:
    normal: 1.0
    specialist_track: 1.15 - 1.30
```

---

## 18.3 Carrera

* Carreras un poco más cortas que la distancia real.
* Objetivo de duración en UI: 1-2 minutos por carrera.
* Simulación vuelta a vuelta.
* El jugador recibe normalmente 3-8 eventos relevantes por carrera.
* Carreras muy accidentadas pueden superar ese rango.
* Estrategias alternativas pueden ganar, pero no debe ser lo más habitual.

Principio:

```text
raw_pace_usually_wins
strategy_can_flip_close_races
weather_or_safety_car_can_create_rare_big_swings
```

---

## 18.4 Neumáticos y clima

Compuestos:

* soft
* medium
* hard
* intermediate
* wet

El cliff de neumáticos debe ser gradual, no binario.

```text
tire_degradation_curve = progressive
cliff_effect = soft_acceleration_after_threshold
```

La lluvia no es el único generador de decisiones.

Generadores principales de decisiones in-race:

* pit windows
* lluvia
* incidentes
* safety car
* degradación inesperada
* oportunidad estratégica

La predicción climática puede fallar según calidad del staff.

```text
weather_forecast_error = base_weather_uncertainty × (1 - strategy_staff_weather_skill / 100)
```

---

## 18.5 Desarrollo técnico

Los upgrades pueden ser:

* pequeños y frecuentes
* grandes y caros

Depende de inversión y decisión del jugador.

Un upgrade puede empeorar el auto, pero debe ser raro.

```text
upgrade_negative_outcome_rate_target = low
```

La mala correlación debe ser baja en condiciones normales.

Sube cuando:

* proyecto es agresivo
* concepto es nuevo
* staff es débil
* facilities son malas
* hay cambio regulatorio grande
* se acelera el desarrollo

El árbol tecnológico puede bloquear caminos completos.

Ejemplo:

```text
High Downforce Concept incompatible with Extreme Low Drag Concept
Aggressive Floor Concept incompatible with Conservative Platform Concept
Cooling Minimalism increases PU thermal risk
```

---

## 18.6 Economía

La economía v0 debe ser amable al inicio, pero suficientemente seria.

* Caja negativa debe ser rara.
* El cost cap sí debe restringir desde temporada 1.
* Chocar mucho debe castigar bastante.
* El daño acumulado debe comerse presupuesto de forma gradual.

Principio:

```text
one_crash_hurts
many_crashes_change_the_season
cash_negative_is_crisis_not_routine
```

---

## 18.7 Pilotos

Los ratings cambian lentamente.

Excepciones:

* rookies pueden variar más rápido
* pilotos muy jóvenes desarrollan más rápido
* pilotos viejos pueden declinar más rápido
* crisis de confianza puede afectar forma temporal

Rookies deben ser más variables.

La personalidad puede destruir una dupla fuerte.

Pilotos estrella tienen poder político interno.

Esto puede afectar:

* moral del otro piloto
* decisiones del equipo
* sponsors
* prensa
* dueño
* renovación contractual

---

## 18.8 FIA y balance competitivo

La FIA puede intervenir contra dominancias, pero de forma realista.

No debe sentirse como rubber band artificial.

Cambios regulatorios grandes:

```text
cada 3 a 10 años aproximadamente
```

Cambios menores:

```text
frecuentes, pero no obligatorios cada temporada
```

Equipos chicos pueden votar reglas anti-grandes.

La presión regulatoria surge de:

* dominio excesivo
* costos altos
* falta de espectáculo
* seguridad
* presión mediática
* intereses de fabricantes
* bloque político de equipos chicos

---

## 18.9 AI rival

La AI debe jugar con las mismas reglas que el jugador.

Cada equipo rival debe tener personalidad.

La AI puede:

* cometer errores estratégicos serios
* tomar malas decisiones de desarrollo
* entrar en crisis financiera
* apostar por conceptos equivocados
* elegir mal pilotos
* sobreinvertir
* abandonar temporada demasiado tarde

Esto es importante para que el mundo se sienta vivo y no perfectamente optimizado.

---

# 19. Fórmulas ajustadas v0

## 19.1 Regulation Gap Multiplier

La amplitud de la parrilla depende de la madurez regulatoria.

```text
regulation_gap_multiplier =
    1.45 if major_regulation_year
    1.20 if regulation_year + 1
    1.00 if regulation_year + 2
    0.85 if mature_cycle
    0.75 if late_mature_cycle
```

Uso:

```text
car_time_scale_adjusted = base_car_time_scale × regulation_gap_multiplier
```

---

## 19.2 Car vs Driver impact

Objetivo:

```text
car_delta_range_target = 0.8s - 3.0s depending on regulation cycle
driver_delta_range_target = 0.3s - 0.8s
strategy_delta_range_target = 0.0s - 0.7s situational
```

Modelo:

```text
car_lap_delta = (grid_average_car_score - car_track_fit) × car_time_scale_adjusted
```

```text
driver_lap_delta = (grid_average_driver_score - driver_score) × driver_time_scale
```

Propuesta inicial:

```text
base_car_time_scale = 0.025
driver_time_scale = 0.010 - 0.015
```

---

## 19.3 Circuit surprise model

Algunos circuitos amplifican encaje de auto.

```text
track_fit_bonus =
    concept_match_score × circuit_specialization_strength × 0.01s
```

Donde:

```text
concept_match_score = -20 to +20
```

Resultado:

```text
specialist track can swing roughly 0.1s - 0.3s
```

Suficiente para cambiar midfield, no para que el peor auto domine.

---

## 19.4 Race length compression

Cada circuito tiene vueltas reales, pero v0 usa reducción.

```text
sim_laps = round(real_laps × race_length_factor)
```

Propuesta:

```text
race_length_factor = 0.50 - 0.65
```

Esto permite carreras dinámicas de 1-2 minutos manteniendo lógica de estrategia.

---

## 19.5 Event frequency model

Objetivo normal:

```text
3 - 8 relevant events per race
```

Eventos se generan cuando una condición cruza umbral:

```text
if pit_window_open: create_event
if rain_state_changed: create_event
if safety_car: create_event
if tire_degradation_unexpected: create_event
if undercut_opportunity_score > threshold: create_event
if incident_affects_strategy: create_event
```

No crear eventos por ruido irrelevante.

---

## 19.6 Tire degradation progressive curve

```text
tire_wear_percent += wear_gain_per_lap
```

```text
tire_delta =
    base_compound_delta +
    wear_percent × linear_wear_penalty +
    max(0, wear_percent - soft_cliff_start)² × cliff_curve_penalty
```

El cliff no es un muro. Es una aceleración progresiva.

---

## 19.7 Upgrade outcome model

```text
actual_gain = expected_gain × correlation_factor
```

```text
correlation_factor = normal(1.0, uncertainty)
```

Para evitar resultados absurdos:

```text
correlation_factor_clamped = clamp(correlation_factor, -0.25, 1.50)
```

Resultado negativo posible, pero raro.

Probabilidad aproximada de upgrade negativo:

```text
normal_project: 1% - 3%
aggressive_project: 5% - 10%
regulation_unknown_project: 8% - 15%
```

---

## 19.8 Crash financial damage

```text
crash_cost =
    base_repair_cost ×
    damage_severity ×
    car_complexity_factor ×
    manufacturing_efficiency_factor
```

Choques repetidos generan presión:

```text
season_crash_burden = total_crash_cost / flexible_development_budget
```

Si supera umbrales:

```text
> 10% budget: minor development pressure
> 20% budget: must delay upgrades
> 35% budget: financial crisis risk
```

---

## 19.9 Driver development speed

```text
development_gain =
    base_learning_rate ×
    age_curve ×
    potential_factor ×
    seat_time ×
    team_development_quality ×
    morale_factor
```

Age curve:

```text
18-21: high growth, high variance
22-25: strong growth
26-31: slow growth / prime stability
32-35: stability or mild decline
36+: decline risk
```

---

## 19.10 AI fairness principle

AI teams use the same:

* budget rules
* development slots
* cost cap
* upgrade risk
* crash costs
* driver market
* regulation pressure

But receive personality modifiers.

Example:

```text
aggressive_team:
    more likely to choose high-risk upgrades
    more likely to overspend early
    higher innovation upside
    higher correlation failure risk
```

---

# 20. Próximas preguntas para cerrar fórmulas específicas

## 20.1 Performance exacta

1. ¿Querés que el puntaje de auto se calcule como promedio ponderado simple o que tenga penalizaciones por debilidades extremas?
2. Ejemplo: si un auto tiene excelente downforce pero cooling horrible, ¿debe quedar muy castigado en circuitos calurosos?
3. ¿Querés que un auto muy desequilibrado sea rápido pero inconsistente?
4. ¿Setup_window debe afectar rendimiento máximo o facilidad de encontrar buen setup?

## 20.2 Pilotos exacto

5. ¿Querés separar rating de clasificación y carrera desde v0?
6. ¿Querés que agresividad mejore overtaking pero aumente incidentes?
7. ¿Querés que feedback del piloto impacte desarrollo técnico semanal?
8. ¿Querés que confianza/moral afecte pace temporal?

## 20.3 Neumáticos exacto

9. ¿Querés que cada compuesto tenga grip inicial, vida útil y sensibilidad térmica?
10. ¿Querés que soft sea siempre más rápido al inicio o dependa del circuito?
11. ¿Querés que el piloto pueda “cuidar neumáticos” sacrificando ritmo?
12. ¿Querés que aire sucio aumente degradación?

## 20.4 Carrera exacto

13. ¿Querés clasificación simulada con una sola vuelta representativa o varias rondas tipo Q1/Q2/Q3?
14. ¿Querés DRS abstracto desde v0?
15. ¿Querés tráfico y aire sucio desde v0?
16. ¿Querés safety car real o solo evento que comprime diferencias y abre pit window?

## 20.5 Desarrollo exacto

17. ¿Querés que cada upgrade apunte a una variable concreta o a un paquete mixto?
18. ¿Querés que cada proyecto tenga 3 opciones: seguro / normal / agresivo?
19. ¿Querés poder acelerar proyectos gastando más y subiendo riesgo?
20. ¿Querés que fabricación pueda fallar o retrasarse?

## 20.6 Economía exacta

21. ¿Cost cap debe limitar solo desarrollo/fabricación o también staff técnico?
22. ¿Academia cuenta dentro o fuera del cost cap?
23. ¿Facilities cuentan dentro o fuera del cost cap?
24. ¿Qué pasa si el jugador excede cost cap: multa, puntos, reputación, restricción futura?

---

# 21. Decisiones específicas cerradas

## 21.1 Performance exacta

### Weakness penalty model

El auto NO usa promedio simple puro.

Las debilidades extremas generan penalizaciones.

Principio:

```text
A car is only as strong as its weakest critical subsystem.
```

Ejemplo:

* downforce élite
* cooling terrible
* circuito caliente

Resultado:

* overheating
* tire degradation
* reliability stress
* pérdida de performance en stint largo

---

### Weakness penalty formula

```text
weakness_penalty =
    Σ(max(0, critical_threshold - subsystem_score) × subsystem_importance × circuit_exposure)
```

Ejemplo:

```text
critical_threshold = 35
```

Entonces:

```text
cooling = 20
hot circuit exposure = high
→ heavy penalty
```

---

### Disequilibrio de auto

Un auto desequilibrado puede:

* ser extremadamente rápido en qualifying
* degradar demasiado en carrera
* funcionar en ciertos circuitos
* ser inconsistente
* tener ventana de setup estrecha

Principio:

```text
specialized cars can create spikes
balanced cars create consistency
```

---

### Setup Window

`setup_window` NO afecta el techo máximo.

Afecta:

* facilidad de encontrar setup óptimo
* riesgo de setup incorrecto
* consistencia entre circuitos
* adaptación a clima

---

### Setup quality formula

```text
setup_quality =
    base_setup_skill +
    setup_window_modifier +
    driver_feedback_modifier +
    staff_engineering_modifier +
    weekend_learning
```

Autos con setup_window malo:

* requieren más trabajo
* tienen más riesgo de setup mediocre
* sufren más en weekends caóticos

---

## 21.2 Pilotos exacto

### Qualifying vs Race pace

Se separan internamente.

El jugador puede ver:

* overall rating
* fortalezas/debilidades

Pero internamente existen:

```text
qualifying_pace
race_pace
```

---

### Qualifying weighting

```text
qualifying_score =
    raw_pace × 0.45 +
    confidence × 0.15 +
    consistency × 0.15 +
    aggression × 0.10 +
    pressure_resistance × 0.15
```

---

### Race weighting

```text
race_score =
    race_pace × 0.35 +
    tire_management × 0.20 +
    consistency × 0.15 +
    racecraft × 0.15 +
    pressure_resistance × 0.10 +
    experience × 0.05
```

---

### Aggression model

La agresividad mejora:

* overtaking
* starts
* qualifying commitment
* wet attack potential

Pero aumenta:

* incident risk
* tire degradation
* lockups
* pressure mistakes

---

### Aggression formula

```text
overtake_bonus = aggression × aggression_attack_scale
incident_risk_bonus = aggression × aggression_risk_scale
```

---

### Driver feedback

El feedback del piloto impacta desarrollo.

```text
development_feedback_modifier =
    driver_feedback × seat_time × technical_staff_synergy
```

Impacta:

* correlación
* setup direction
* understanding gain
* upgrade validation speed

---

### Confidence and morale

Confianza y moral afectan pace temporal.

```text
temporary_driver_form =
    morale_modifier +
    confidence_modifier +
    team_environment_modifier
```

Esto crea:

* streaks
* slumps
* momentum
* collapse under pressure

---

## 21.3 Neumáticos exacto

Cada compuesto tiene:

```text
initial_grip
wear_rate
thermal_sensitivity
optimal_window
cliff_curve
warmup_speed
```

---

### Compound philosophy

#### Soft

* máximo grip inicial
* alta degradación
* alta sensibilidad térmica

#### Medium

* balance general

#### Hard

* menor grip inicial
* baja degradación
* estable

---

### Tire management mode

El piloto puede cuidar neumáticos.

Esto genera:

```text
pace_loss_now
lower_wear
better_stint_late
```

---

### Tire conservation formula

```text
wear_gain *= tire_push_multiplier
```

Ejemplo:

```text
push mode = 1.15 wear
balanced = 1.00
conserve = 0.82
```

---

### Dirty air degradation

El aire sucio aumenta degradación.

```text
dirty_air_wear_bonus =
    traffic_density × following_time × aero_dirty_air_sensitivity
```

Impacta:

* front tire temps
* sliding
* overheating
* graining probability

---

## 21.4 Carrera exacto

### Qualifying structure

Clasificación completa:

* Q1
* Q2
* Q3

Cada fase:

* elimina pilotos
* consume neumáticos
* genera decisiones estratégicas

---

### DRS

No existe DRS explícito en v0.

Se abstrae dentro de:

```text
overtaking_probability
```

---

### Traffic and dirty air

Sí existen desde v0.

Variables:

```text
traffic_loss
dirty_air_loss
following_time
clean_air_advantage
```

Impactan:

* lap time
* tire wear
* overtaking chance
* cooling

---

### Safety car

Safety car real.

Efectos:

```text
field_compression
reduced_pit_loss
reduced_tire_wear
reduced_component_stress
strategy_reset
```

---

### Pit stop under safety car

```text
pit_time_loss =
    normal_pit_loss × safety_car_modifier
```

Propuesta:

```text
safety_car_modifier = 0.45 - 0.60
```

---

## 21.5 Desarrollo exacto

### Upgrade targeting

Los upgrades pueden ser:

#### Focused

Ejemplo:

```text
+ high_speed_grip
- slight drag increase
```

#### Package

Ejemplo:

```text
small gains across:
- cooling
- aero efficiency
- tire preservation
```

---

### Project risk levels

Cada proyecto tiene:

#### Safe

* baja ganancia
* baja incertidumbre
* baja correlación negativa

#### Normal

* balanceado

#### Aggressive

* alta ganancia potencial
* más riesgo
* más complejidad
* más posibilidad de mala correlación
* más presión sobre fiabilidad

---

### Fast-track development

El jugador puede acelerar proyectos.

Efectos:

```text
- shorter development time
+ higher cost
+ higher uncertainty
+ manufacturing stress
+ failure risk
```

---

### Manufacturing risk

Fabricación puede:

* retrasarse
* producir menos piezas
* generar calidad subóptima

Factores:

```text
facility_quality
manufacturing_load
project_complexity
rush_factor
staff_efficiency
```

---

## 21.6 Economía exacta

### Cost cap scope

Dentro del cost cap:

* desarrollo
* fabricación

Fuera del cost cap:

* academia
* facilities
* pilotos
* marketing

---

### Cost cap violation model

La penalidad depende del exceso.

---

### Minor breach

```text
small fine
minor reputation hit
```

---

### Medium breach

```text
financial penalty
future testing reduction
political backlash
```

---

### Major breach

```text
points deduction
major reputation hit
future restrictions
possible FIA sanctions
```

---

### Cost cap pressure philosophy

El objetivo NO es castigar automáticamente.

El objetivo es crear decisiones:

```text
Do I bring one more upgrade?
Do I repair both cars fully?
Do I rush manufacturing?
Do I stop development early?
```

---

# 22. Nuevas preguntas críticas

## 22.1 Filosofía de performance

1. ¿Querés que existan “autos difíciles de manejar” que solo ciertos pilotos aprovechan?
2. ¿Querés que algunos pilotos sufran mucho con autos nerviosos?
3. ¿Querés que estabilidad del auto tenga peso propio?
4. ¿Querés que lluvia amplifique diferencias entre pilotos?

## 22.2 Setup y weekend

5. ¿Querés sesiones de práctica simuladas donde el jugador mejora setup?
6. ¿Querés parc fermé desde qualifying?
7. ¿Querés que un mal setup pueda arruinar todo el weekend?
8. ¿Querés que el setup perfecto sea raro?

## 22.3 Estrategia

9. ¿Querés undercut y overcut explícitos?
10. ¿Querés estrategias 1-stop vs 2-stop reales?
11. ¿Querés órdenes de equipo?
12. ¿Querés riesgo de pit mistakes?

## 22.4 AI rival avanzada

13. ¿Querés que algunos equipos prioricen marketing sobre performance?
14. ¿Querés equipos conservadores vs agresivos?
15. ¿Querés equipos que apuesten todo a cambio regulatorio futuro?
16. ¿Querés equipos con culturas internas distintas?

## 22.5 Mundo vivo

17. ¿Querés rumores de paddock y prensa?
18. ¿Querés filtraciones sobre upgrades rivales?
19. ¿Querés expectativas públicas y presión mediática?
20. ¿Querés narrativas emergentes tipo:

* rookie sensation
* dominant era
* failed wonderkid
* political scandal
* collapsing giant team

sin escribir historia manual?

---

# 23. Estado

El sistema ya tiene:

* filosofía matemática
* modelo base de performance
* piloto
* neumáticos
* clima
* carrera
* economía
* upgrades
* FIA
* AI

Falta cerrar:

* setup weekend loop
* estrategia avanzada
* AI personalities
* media system
* world simulation layer

Después de eso:

```text
system_formulas_v0.md
```

queda prácticamente listo para implementación.
