# F1 Dynasty Manager — AI Design v0

## 0. Propósito

Este documento define cómo funcionan los equipos controlados por AI en F1 Dynasty Manager.

La AI NO usa modelos externos ni LLMs.

Toda la AI debe ser código determinista:

```text
rules + weights + team personality + world context + controlled variance
```

Objetivos:

* crear equipos rivales creíbles
* evitar AI perfecta
* permitir errores humanos realistas
* generar eras, crisis y renacimientos
* mantener dificultad sin rubber band artificial
* sostener partidas de 100+ temporadas

---

# 1. Filosofía general

## 1.1 AI semi-humana

La AI debe ser competente, pero no perfecta.

No debe jugar como un solver óptimo.

Debe jugar como una organización real:

* con sesgos
* con presión política
* con dueños
* con cultura
* con miedo
* con ambición
* con errores
* con memoria histórica

Principio:

```text
AI should not optimize perfectly.
AI should roleplay survival, ambition, politics and identity.
```

---

## 1.2 Dificultad basada en calidad de decisión

La dificultad afecta principalmente la capacidad de la AI.

NO debería dar buffs artificiales directos de performance salvo casos mínimos y opcionales.

La dificultad modifica:

* calidad de scouting
* calidad estratégica
* timing de upgrades
* gestión financiera
* lectura del reglamento
* capacidad de detectar conceptos fallidos
* frecuencia de errores
* eficiencia de mercado de pilotos

---

## 1.3 Sin targeting artificial al jugador

La AI trata al jugador como otro equipo más.

No debe existir:

```text
if target == player: attack_player
```

Sí puede ocurrir que el jugador sea atacado políticamente si:

* domina demasiado
* bloquea intereses de otros
* compite por pilotos
* rompe alianzas
* acumula poder político

Pero debe surgir del sistema, no de script anti-player.

---

## 1.4 Sin rubber band artificial

No usar:

```text
if player_winning: nerf_player
```

Usar presiones sistémicas:

* cambios regulatorios
* cost cap
* staff poaching
* burocratización
* presión mediática
* dificultad de mantener cultura
* desgaste de pilotos
* bloque político anti-dominante

---

# 2. Arquitectura general AI

Cada equipo tiene un perfil persistente.

```ts
interface TeamAIProfile {
  team_id: string
  competence: AICompetenceProfile
  culture: AICultureProfile
  economy: AIEconomicProfile
  technical: AITechnicalProfile
  drivers: AIDriverMarketProfile
  race_strategy: AIRaceStrategyProfile
  politics: AIPoliticalProfile
  long_term: AILongTermProfile
  stability: AIStabilityProfile
}
```

Cada decisión usa:

```text
decision_score = context_score + personality_bias + strategic_priority + random_human_noise
```

Luego se elige la opción con mayor score, salvo que la dificultad/cultura genere error.

---

# 3. AI Competence

## 3.1 AICompetenceProfile

```ts
interface AICompetenceProfile {
  overall: number
  technical_decision_quality: number
  race_strategy_quality: number
  financial_management_quality: number
  driver_market_quality: number
  political_reading_quality: number
  long_term_planning_quality: number
  crisis_management_quality: number
}
```

Escala 0-100.

Interpretación:

```text
30 = mala organización
50 = promedio
70 = fuerte
85 = elite
95 = excepcional rara
```

---

## 3.2 Dificultad

```ts
type Difficulty = "easy" | "normal" | "hard"
```

### Easy

* más errores de timing
* scouting menos preciso
* más mala gestión financiera
* peor lectura de estrategias
* peor detección de conceptos fallidos

### Normal

* AI semi-humana realista
* errores moderados
* buena variedad

### Hard

* AI más eficiente
* menos errores graves
* mejor planificación
* mejor estrategia
* mejor adaptación

NO usar hard como:

```text
+10 car performance
```

---

## 3.3 Error model

```ts
interface AIErrorModel {
  minor_error_rate: number
  major_error_rate: number
  panic_error_rate: number
  correction_speed: number
}
```

Ejemplo:

```text
major_error_rate = base × difficulty_modifier × instability_modifier × pressure_modifier
```

Errores posibles:

* retrasar demasiado upgrade
* abandonar tarde una temporada perdida
* fichar piloto caro incorrecto
* sobreinvertir en concepto fallido
* mala estrategia bajo lluvia
* no proteger talento joven
* gastar de más antes del cost cap

---

# 4. Cultura organizacional

## 4.1 Traits principales

```ts
type AICultureTrait =
  | "aggressive"
  | "innovative"
  | "political"
  | "stable"
  | "chaotic"
  | "youth_focused"
  | "marketing_first"
```

Cada equipo tiene:

```ts
interface AICultureProfile {
  primary_trait: AICultureTrait
  secondary_trait?: AICultureTrait
  culture_strength: number
  culture_drift: number
  compatibility_map: Record<string, number>
}
```

---

## 4.2 Efectos por trait

### aggressive

* más upgrades agresivos
* más undercuts
* más riesgo financiero
* más probabilidad de apostar a pilotos rápidos pero conflictivos

### innovative

* más investigación de conceptos nuevos
* mejor upside técnico
* mayor riesgo de mala correlación
* mayor tendencia a romper con filosofía previa

### political

* más lobbying
* más alianzas
* más presión FIA
* mejor lectura de votos
* más conflictos de paddock

### stable

* menos errores graves
* mejor desarrollo sostenido
* menor upside disruptivo
* protege pilotos y staff

### chaotic

* más cambios repentinos
* más errores
* más crisis
* pero posibilidad de saltos inesperados

### youth_focused

* prioriza academia
* protege rookies
* acepta años de transición
* puede perder resultados inmediatos

### marketing_first

* prioriza pilotos vendibles
* sponsors
* mercados nacionales
* imagen pública
* puede sacrificar rendimiento puro

---

## 4.3 Cambio cultural

Las culturas cambian lentamente.

Eventos que pueden modificar cultura:

* nuevo dueño
* nuevo director técnico
* nuevo team principal
* piloto histórico influyente
* crisis financiera
* era dominante
* colapso competitivo
* sanción FIA grande

```text
culture_change_speed = slow
```

Cambio de cultura debe generar fricción:

* moral baja
* staff incompatible
* pilotos incómodos
* pérdida temporal de eficiencia

---

## 4.4 Compatibilidad piloto-cultura

Pilotos pueden encajar o chocar con culturas.

Ejemplos:

```text
political driver + political team = high influence, possible drama
rookie + youth_focused team = strong development
selfish star + stable team = possible conflict
aggressive driver + nervous car + chaotic team = high ceiling, high incident risk
```

---

# 5. Technical Development AI

## 5.1 Riesgo técnico base

Distribución objetivo aproximada:

```text
25% conservative
50% balanced
25% aggressive
```

```ts
type TechnicalRiskProfile = "conservative" | "balanced" | "aggressive"
```

---

## 5.2 AITechnicalProfile

```ts
interface AITechnicalProfile {
  risk_profile: TechnicalRiskProfile
  concept_loyalty: number
  innovation_appetite: number
  copycat_tendency: number
  regulation_bet_tendency: number
  current_year_focus: number
  next_year_focus: number
  failure_detection_quality: number
}
```

---

## 5.3 Development decision priorities

Cada semana AI calcula prioridades:

```text
current_car_need
championship_context
budget_context
regulation_context
concept_confidence
owner_pressure
team_culture_bias
```

---

## 5.4 Abandonar temporada

La AI puede abandonar la temporada actual cada tanto.

Condiciones:

```text
if championship_position_bad
and points_gap_large
and next_regulation_or_next_car_opportunity_high
and owner_patience_allows
then increase_next_year_focus
```

No debe ocurrir todo el tiempo.

---

## 5.5 Sandbagging

Sandbagging existe, pero es raro.

Puede ocurrir en:

* pretemporada
* primeras carreras
* equipos top
* equipos políticos
* equipos con alta estabilidad

```text
sandbagging_probability = low
```

No debe afectar resultados reales, solo percepción/scouting.

---

## 5.6 Apostar a futuro reglamento

AI puede invertir fuerte en reglamento futuro.

Factores:

* cambio regulatorio rumoreado
* mala temporada actual
* alta planificación largo plazo
* dueño paciente
* buena caja
* cultura innovadora

---

## 5.7 Copiar conceptos rivales

AI puede copiar conceptos exitosos.

```text
copy_score = rival_success × visibility × copycat_tendency × concept_compatibility
```

Riesgos:

* falta de conocimiento interno
* mala integración
* pérdida de identidad
* retraso temporal

---

## 5.8 Detectar concepto fallido

AI debe entender cuándo un concepto no funciona, pero con retraso humano.

```text
detection_chance = failure_detection_quality × data_quality × weeks_of_evidence
```

Equipos malos pueden insistir demasiado.

Equipos buenos pivotan antes.

---

# 6. Driver Market AI

## 6.1 AIDriverMarketProfile

```ts
interface AIDriverMarketProfile {
  pace_priority: number
  experience_priority: number
  marketability_priority: number
  nationality_priority: number
  academy_priority: number
  cost_priority: number
  potential_priority: number
  hierarchy_preference: number
  rookie_patience: number
  loyalty_bias: number
}
```

---

## 6.2 Fichajes contextuales

La AI no usa una prioridad universal.

Ejemplos:

### equipo marketing_first

```text
marketability + nationality + sponsor_value
```

### equipo youth_focused

```text
potential + academy + cost
```

### equipo top estable

```text
pace + consistency + pressure_resistance
```

### equipo survival

```text
cost + sponsor_bringing + reliability
```

---

## 6.3 Jerarquía interna

Algunos equipos son jerárquicos.

Variables:

```text
hierarchy_preference
star_driver_power
owner_expectations
team_culture
```

Efectos:

* piloto #1 protegido
* órdenes de equipo más probables
* rookie subordinado
* conflictos con pilotos ambiciosos

---

## 6.4 Piloto de la casa

Equipos pueden proteger pilotos históricos.

```text
home_driver_score =
    years_with_team +
    academy_origin +
    fan_support +
    loyalty +
    past_success
```

Esto puede llevar a decisiones no óptimas pero creíbles.

---

## 6.5 Pilotos rechazando equipos

Pilotos pueden rechazar equipos por:

* bajo rendimiento
* mala reputación
* falta de status
* cultura incompatible
* sueldo insuficiente
* crisis financiera
* mala relación histórica

---

## 6.6 Exigir status #1

Pilotos estrella pueden exigir:

* salario alto
* rol #1
* cláusulas de salida
* influencia interna
* garantía deportiva

---

# 7. Economic AI

## 7.1 Tipos económicos

```ts
type EconomicStyle = "spender" | "conservative" | "survival"
```

### spender

* invierte fuerte
* usa margen financiero
* más riesgo de crisis
* más upside competitivo

### conservative

* mantiene caja
* evita deuda
* desarrollo más lento
* menor riesgo existencial

### survival

* prioriza existir
* contrata barato
* acepta sponsors riesgosos
* puede sacrificar rendimiento

---

## 7.2 AIEconomicProfile

```ts
interface AIEconomicProfile {
  style: EconomicStyle
  cash_reserve_target: number
  debt_tolerance: number
  cost_cap_aggression: number
  sponsor_dependency: number
  crash_cost_sensitivity: number
  owner_injection_likelihood: number
}
```

---

## 7.3 Crisis financiera

Reacción depende de equipo.

Posibles acciones:

* detener upgrades
* fichar piloto barato
* aceptar sponsor riesgoso
* despedir staff
* reducir fabricación
* pedir inyección del dueño
* priorizar supervivencia

---

## 7.4 Hundimiento lento

Equipos pueden hundirse lentamente.

Causas:

* malos contratos
* crash costs
* bajo prize money
* sponsors débiles
* mala reputación
* dueño impaciente
* staff caro

---

## 7.5 Supervivencia milagrosa

Puede ocurrir ocasionalmente por:

* nuevo sponsor
* dueño nuevo
* rookie barato brillante
* cambio regulatorio acertado
* staff clave
* alianza política

Debe ser raro pero posible.

---

# 8. Race Strategy AI

## 8.1 AIRaceStrategyProfile

```ts
interface AIRaceStrategyProfile {
  baseline_aggression: number
  undercut_tendency: number
  overcut_tendency: number
  rain_gamble_tendency: number
  safety_car_reactivity: number
  pit_crew_confidence: number
  team_order_willingness: number
  mistake_rate: number
}
```

---

## 8.2 Estrategia contextual

La agresividad depende de:

* cultura del equipo
* staff de estrategia
* piloto
* posición en carrera
* clima
* estado de neumáticos
* rival cercano
* presión de puntos

---

## 8.3 Errores humanos realistas

Errores posibles:

* pit stop lento
* llamar tarde a boxes
* quedarse afuera una vuelta de más bajo lluvia
* cubrir rival equivocado
* no dividir estrategias
* sobreestimar neumático

Frecuencia depende de:

* strategy quality
* pit crew quality
* pressure
* difficulty
* weather chaos

---

## 8.4 Pit crew differences

Pit crews varían entre equipos.

```text
pit_stop_time = base + crew_delta + pressure_error
```

Equipos mejores tienen:

* menor promedio
* menor variabilidad
* menos errores graves

---

## 8.5 Team orders

Órdenes de equipo dependen de:

* jerarquía
* campeonato
* cultura
* piloto estrella
* dueño
* rivalidad interna

Pueden generar:

* puntos mejores
* moral baja
* conflicto interno
* prensa negativa

---

# 9. FIA / Politics AI

## 9.1 AIPoliticalProfile

```ts
interface AIPoliticalProfile {
  rationality: number
  political_aggression: number
  alliance_loyalty: number
  betrayal_tendency: number
  lobbying_strength: number
  anti_dominance_bias: number
  manufacturer_agenda_strength: number
}
```

---

## 9.2 Votaciones FIA

Los votos mezclan racionalidad y política.

```text
vote_score =
    team_benefit +
    alliance_pressure +
    anti_dominance_pressure +
    manufacturer_agenda +
    owner_preference +
    political_bias
```

---

## 9.3 Alianzas persistentes

Alianzas pueden formarse por:

* intereses comunes
* fabricante compartido
* bloque chico vs grande
* presión anti-dominante
* historia positiva

---

## 9.4 Traiciones

Traiciones pueden pasar.

Factores:

* baja lealtad política
* alto beneficio individual
* presión de dueño
* crisis financiera
* cambio de reglamento

---

## 9.5 Lobbying invisible

Lobbying existe como sistema interno.

El jugador ve señales imperfectas:

* rumores
* reportes de paddock
* cambios de postura
* titulares de prensa

---

## 9.6 Guerras políticas largas

Raras, pero posibles.

Condiciones:

* dominio fuerte
* polémica regulatoria
* fabricantes enfrentados
* equipos chicos presionando
* FIA buscando espectáculo

---

# 10. Long Term AI

## 10.1 Planning horizon

Depende del equipo.

```ts
type PlanningHorizon = "short" | "medium" | "long"
```

### short

* resultados inmediatos
* presión de dueño
* poca paciencia

### medium

* balance temporada/futuro

### long

* academia
* reglamentos futuros
* infraestructura
* paciencia con rookies

---

## 10.2 AILongTermProfile

```ts
interface AILongTermProfile {
  planning_horizon: PlanningHorizon
  rebuild_tolerance: number
  dynasty_hunger: number
  complacency_risk: number
  bureaucracy_growth_rate: number
  youth_pipeline_commitment: number
}
```

---

## 10.3 Eras dominantes

Eras dominantes pueden existir, pero son difíciles de mantener.

Factores de caída natural:

* burocratización
* staff poaching
* FIA pressure
* driver aging
* owner complacency
* cost cap pressure
* regulation shifts

---

## 10.4 Burocratización del dominante

Equipos dominantes pueden volverse lentos.

```text
bureaucracy += dominance_years × bureaucracy_growth_rate
```

Efectos:

* menor innovación
* más resistencia al cambio
* más complacencia
* peor adaptación regulatoria

No ocurre siempre.

---

## 10.5 Colapso de equipos históricos

Puede ocurrir, pero es raro.

Más común:

* épocas flojas
* mala transición regulatoria
* crisis política
* pérdida de staff

Desaparición completa debe ser muy rara.

---

## 10.6 Renacimientos

Equipos caídos pueden renacer por:

* nuevo dueño
* cambio cultural
* talento generacional
* acierto regulatorio
* fichaje técnico clave
* academia fuerte

---

# 11. Player Relationship AI

## 11.1 Tratamiento neutral

El jugador es un equipo más.

La AI no tiene targeting artificial.

---

## 11.2 Rivalidades persistentes

Rivalidades pueden surgir entre:

* jugador y otro equipo
* pilotos
* team principals
* fabricantes
* bloques políticos

Rivalidades afectan:

* votos
* prensa
* mercado de pilotos
* agresividad estratégica
* negociaciones

---

## 11.3 Reputación del jugador

La reputación del jugador afecta:

* pilotos disponibles
* sponsors
* política
* staff
* prensa
* confianza de dueños

---

# 12. Transparencia e información imperfecta

## 12.1 Explicabilidad parcial

El jugador debe entender señales generales, no fórmulas completas.

Reportes posibles:

* “El equipo rival parece convencido de que viene un cambio regulatorio.”
* “El piloto está incómodo con su rol interno.”
* “La junta empieza a perder paciencia.”
* “Se rumorea que un equipo grande está preparando un cambio de concepto.”

---

## 12.2 Qué se oculta

Ocultar:

* pesos exactos de decisión AI
* presupuestos exactos rivales si no hay información
* intención política precisa
* potencial real de juniors
* estado real de upgrades ocultos

Mostrar con incertidumbre:

* rumores
* reportes de scouts
* prensa
* filtraciones
* paddock talk

---

## 12.3 Scouting imperfecto rival

```text
visible_rival_intent = true_intent + scouting_noise
```

La calidad depende de:

* reputación política
* staff
* prensa
* relaciones
* inversión en análisis

---

# 13. Narrativas emergentes

## 13.1 Historias deseadas

El sistema debe permitir:

* joven talento generacional
* equipo en caída con nuevo dueño
* equipo histórico intentando volver
* dinastía difícil de romper
* rookie que revoluciona la parrilla
* greatest season ever
* crisis mediática
* guerra interna piloto vs equipo
* era técnica recordada históricamente

---

## 13.2 Restricción de realismo

No debe haber grandes dramas todos los años.

```text
major_narrative_frequency = low_to_moderate
```

Narrativas fuertes deben ser consecuencia de acumulación sistémica.

---

# 14. Escalabilidad AI

## 14.1 F1 completa

Todos los equipos F1 se simulan con AI completa.

Incluye:

* desarrollo
* economía
* pilotos
* política
* carrera
* estrategia

---

## 14.2 F2/F3 abstractas

F2 y F3 se simulan de forma abstracta.

Incluye:

* standings
* progresión pilotos
* generación de talento
* scouting

No incluye:

* carrera detallada
* estrategia completa
* economía completa

---

## 14.3 Equipos secundarios no se ignoran

Aunque el jugador solo controla su equipo, todos los equipos F1 avanzan con las mismas reglas principales.

No hay equipos congelados.

---

## 14.4 Fast ticks

Semanas sin carrera pueden resolverse rápido si:

* no hay negociación activa
* no hay desarrollo crítico
* no hay decisión política
* no hay evento económico importante

---

# 15. AI Decision Loop

Cada semana para cada equipo AI:

```text
1. Evaluate team state
2. Evaluate championship context
3. Evaluate financial context
4. Evaluate technical context
5. Evaluate driver/staff context
6. Evaluate regulation/political context
7. Generate candidate actions
8. Score actions
9. Apply personality modifiers
10. Apply competence/error model
11. Execute top action(s)
12. Generate internal consequences
```

---

# 16. Example weekly AI decision

## Context

```text
Team is P8
Cash low
Driver expensive
Car weak in high speed
Owner impatient
Culture: survival
Technical risk: conservative
```

## Candidate actions

```text
A. Start aggressive aero upgrade
B. Stop current car development
C. Seek cheap driver for next year
D. Accept risky sponsor
E. Invest in facilities
```

## Result

Likely action:

```text
C + D
```

Reason:

Survival team with cash pressure and weak competitiveness prioritizes financial stability.

---

# 17. Example race AI decision

## Context

```text
Rain expected in 5 laps
Driver P9
Tires old
Strategy staff weak
Team aggressive
```

## Candidate actions

```text
A. Pit now for inters
B. Stay out
C. Pit for fresh mediums
```

Aggressive culture increases chance of early inters.
Weak strategy increases chance of timing error.

---

# 18. Example political AI decision

## Context

```text
Dominant team has huge aero advantage
Small teams struggling
FIA proposes aero restriction
Team is midfield
Political trait: high
```

Likely vote:

```text
FOR restriction
```

Reason:

Midfield political team benefits from reducing dominant team's advantage.

---

# 19. Implementation guidance

Recommended files:

```text
/src/simulation/ai/types.ts
/src/simulation/ai/teamAIProfile.ts
/src/simulation/ai/decisionScoring.ts
/src/simulation/ai/developmentAI.ts
/src/simulation/ai/driverMarketAI.ts
/src/simulation/ai/economyAI.ts
/src/simulation/ai/raceStrategyAI.ts
/src/simulation/ai/politicsAI.ts
/src/simulation/ai/longTermAI.ts
/src/simulation/ai/errorModel.ts
```

---

# 20. Status

AI Design v0 está listo como especificación inicial.

Siguiente documento recomendado:

```text
tech_tree_v0.md
```

Porque el árbol técnico define el meta estratégico y las decisiones de desarrollo.
