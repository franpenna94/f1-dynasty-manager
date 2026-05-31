# F1 Dynasty Manager — Tech Tree v0

## 0. Propósito

Este documento define el sistema técnico y de desarrollo del auto en F1 Dynasty Manager.

El objetivo NO es crear un simulador de ingeniería hiper técnico.

El objetivo es:

* crear eras técnicas
* generar filosofías de auto distintas
* permitir apuestas estratégicas profundas
* crear identidades de equipo
* producir convergencia y resets regulatorios naturales
* generar narrativa emergente técnica
* recompensar conocimiento organizacional

---

# 1. Filosofía general

## 1.1 Arquitectura híbrida

El sistema técnico usa un modelo híbrido.

Cada equipo tiene:

```text
1. Core concept
2. Technical branches
3. Component upgrades
4. Organizational knowledge
5. Correlation quality
6. Facilities capability
```

Esto evita:

```text
spam de upgrades lineales
```

Y crea:

```text
philosophy evolution
```

---

## 1.2 El auto es una filosofía

El auto NO es simplemente un conjunto de stats.

Es una identidad técnica.

Ejemplo:

```text
Core philosophy:
low_drag

Sub philosophy:
unstable_high_peak

Strength:
high speed corners

Weakness:
tire degradation

Knowledge:
high

Correlation:
medium
```

Resultado:

```text
extremely fast in qualifying
inconsistent over race distance
```

---

## 1.3 Knowledge como recurso principal

El recurso más importante del juego es:

```text
know-how
```

No:

* dinero
* facilities
* pilotos

Porque el conocimiento explica:

* dominancias largas
* dificultad de copiar conceptos
* convergencia natural
* eras técnicas
* colapsos regulatorios
* capacidad de adaptación

---

# 2. Arquitectura técnica global

## 2.1 Stack técnico del auto

Cada auto está compuesto por:

```text
Core Concept
↓
Sub Philosophies
↓
Technical Areas
↓
Parts
↓
Manufacturing Quality
↓
Track Fit
↓
Driver Compatibility
```

---

## 2.2 Capas técnicas

### Layer 1 — Core Concept

Macro identidad del auto.

Define:

* strengths
* weaknesses
* desarrollo futuro
* dificultad de setup
* potencial máximo
* compatibilidad con reglamentos

---

### Layer 2 — Sub Philosophies

Especializaciones.

Ej:

```text
stable platform
quali specialist
tire saver
cooling aggressive
```

---

### Layer 3 — Technical Areas

Áreas de expertise.

```text
aero
cooling
suspension
mechanical grip
weight reduction
power integration
reliability
```

---

### Layer 4 — Parts

Upgrades físicos.

```text
floor
front wing
rear wing
suspension
cooling package
chassis
brakes
weight package
```

---

# 3. Core Concepts

## 3.1 Filosofías base

### low_drag

Fortalezas:

* velocidad punta
* eficiencia
* tracks rápidos
* qualifying fuerte

Debilidades:

* curvas lentas
* dirty air
* lluvia
* desgaste neumáticos

---

### high_downforce

Fortalezas:

* curvas lentas
* estabilidad
* lluvia
* consistencia

Debilidades:

* drag alto
* velocidad punta
* overheating

---

### balanced

Fortalezas:

* adaptable
* setup fácil
* consistente
* desarrollo estable

Debilidades:

* techo competitivo menor
* menos edge técnico

---

### tire_saver

Fortalezas:

* stints largos
* estrategias flexibles
* carreras calientes
* consistency

Debilidades:

* peak pace menor
* qualifying más flojo

---

### unstable_high_peak

Fortalezas:

* pace máximo altísimo
* qualifying excelente
* breakthroughs potenciales

Debilidades:

* inconsistencia
* difícil manejo
* mala ventana setup
* pilotos incompatibles

---

### quali_specialist

Fortalezas:

* una vuelta extremadamente fuerte
* calentamiento neumático rápido
* peak grip alto

Debilidades:

* degradación fuerte
* race pace inconsistente
* sensibilidad clima

---

# 4. Conceptos híbridos

## 4.1 Filosofías combinadas

Los equipos pueden combinar conceptos.

Ejemplos:

```text
low_drag + tire_saver
high_downforce + stable_platform
balanced + quali_specialist
```

---

## 4.2 Compatibilidad de conceptos

No todas las combinaciones funcionan igual.

Ejemplo:

```text
low_drag + unstable_high_peak
```

Puede generar:

```text
extreme qualifying pace
very difficult race car
```

---

## 4.3 Compatibilidad de pilotos

Algunos pilotos funcionan mejor con ciertos conceptos.

Ejemplos:

```text
aggressive driver + nervous car = high upside
consistent driver + stable car = reliable points
poor adaptability + unstable concept = underperformance
```

---

# 5. Technical Branches

## 5.1 Branch structure

Cada concepto abre ramas técnicas.

Ejemplo:

```text
low_drag
 ├── rear stability
 ├── tire preservation
 ├── cooling optimization
 ├── floor efficiency
 └── high speed aero
```

---

## 5.2 Branch specialization

Especializarse genera:

* ventajas concretas
* debilidades concretas
* identidad técnica
* divergencia entre equipos

---

## 5.3 Paths incompatibles

Algunas ramas se bloquean mutuamente.

Ejemplo:

```text
extreme cooling optimization
X
aggressive bodywork packaging
```

---

## 5.4 Coste de cambio filosófico

Cambiar filosofía tiene curva de aprendizaje.

Efectos temporales:

* peor correlación
* menor understanding
* setup inconsistente
* upgrades menos eficientes
* fabricación más lenta

---

# 6. Technical Areas

## 6.1 Aero

Variables:

* downforce
* drag efficiency
* airflow stability
* dirty air resistance
* wake management

---

## 6.2 Suspension

Variables:

* ride stability
* curb handling
* mechanical grip
* tire wear influence

---

## 6.3 Cooling

Variables:

* overheating resistance
* engine cooling
* brake cooling
* weather sensitivity

---

## 6.4 Weight Reduction

Variables:

* acceleration
* tire stress
* balance
* efficiency

---

## 6.5 Reliability

Variables:

* failure risk
* consistency
* aggressive setup tolerance
* stress tolerance

---

## 6.6 Power Integration

Variables:

* PU compatibility
* deployment efficiency
* fuel efficiency
* acceleration profile

---

# 7. Knowledge System

## 7.1 Team Knowledge

Cada equipo acumula experiencia por:

* concepto
* área técnica
* reglamento
* track type

```ts
knowledge_score: 0-100
```

---

## 7.2 Effects of knowledge

Knowledge mejora:

* correlación
* velocidad de desarrollo
* calidad upgrades
* setup confidence
* adaptability
* detection de problemas

---

## 7.3 Difficult to copy know-how

Copiar un concepto NO copia el conocimiento.

Ejemplo:

```text
Team A invents dominant concept
Team B copies concept
Team B still struggles because understanding is low
```

---

## 7.4 Knowledge decay

Knowledge puede perderse por:

* salida de staff clave
* cambio reglamentario
* abandono de filosofía
* reorganización interna

---

# 8. Correlation System

## 8.1 Filosofía

Correlación imperfecta existe.

Pero:

```text
moderada
```

No queremos randomness absurda.

---

## 8.2 Correlation score

```ts
correlation_score: 0-100
```

Afecta:

* confianza upgrades
* precisión simulaciones
* detección problemas
* desarrollo agresivo

---

## 8.3 Mala correlación

Puede generar:

```text
expected gain: +0.25
real gain: +0.10
```

O:

```text
upgrade improves one circuit type but hurts another
```

---

## 8.4 Qué afecta correlación

* facilities
* staff quality
* concept familiarity
* regulation stability
* rushed development
* aggressive risk

---

# 9. Upgrade System

## 9.1 Filosofía upgrades

Los upgrades NO son simples boosts lineales.

Cada upgrade tiene:

* target area
* concept synergy
* risk
* manufacturing complexity
* correlation confidence

---

## 9.2 Tipos de upgrades

### floor

Impacta:

* aero balance
* downforce
* dirty air
* setup sensitivity

---

### front wing

Impacta:

* turn-in
* low speed grip
* airflow stability

---

### rear wing

Impacta:

* stability
* drag
* traction

---

### suspension

Impacta:

* tire wear
* consistency
* wet performance
* curb handling

---

### cooling package

Impacta:

* overheating
* reliability
* weather tolerance
* bodywork compromise

---

### weight reduction

Impacta:

* acceleration
* tire efficiency
* balance
* reliability risk

---

# 10. Upgrade scales

## 10.1 Small upgrades

Más comunes.

```text
small gains
small risk
fast manufacturing
```

---

## 10.2 Medium upgrades

Más importantes.

```text
meaningful performance changes
moderate risk
```

---

## 10.3 Breakthroughs

Muy raros.

Pueden generar:

* dominant concept
* regulation controversy
* technical era

No deben ocurrir seguido.

---

# 11. Regulation Interaction

## 11.1 Regulation philosophy

Los reglamentos:

* buffean conceptos
* matan conceptos
* crean oportunidades nuevas

No deben resetear TODO completamente.

---

## 11.2 Regulation resets

Grandes cambios regulatorios generan:

```text
larger grid spread
high uncertainty
more concept diversity
```

---

## 11.3 Convergencia natural

Con el tiempo:

```text
copying
knowledge growth
optimization
```

Hace que el grid converja.

---

## 11.4 Dead concepts

Algunos conceptos pueden quedar obsoletos.

Ejemplo:

```text
old aero philosophy no longer works under new floor rules
```

---

## 11.5 FIA Rumors

Rumores regulatorios existen.

No siempre son precisos.

Pueden afectar:

* long term planning
* investments
* concept direction
* political lobbying

---

# 12. Technical Politics

## 12.1 Lobbying técnico

Equipos pueden intentar:

* proteger conceptos dominantes
* matar conceptos rivales
* reducir costos
* bloquear innovaciones

---

## 12.2 Political leverage

Depende de:

* reputation
* alliances
* manufacturer support
* recent success
* FIA relationship

---

# 13. Manufacturing System

## 13.1 Filosofía

Fabricación existe pero abstracta.

No buscamos micromanagement extremo.

---

## 13.2 Manufacturing limits

Cada equipo tiene:

* capacity
* speed
* quality
* efficiency

---

## 13.3 Supply chain

Abstracta.

Variables:

* material efficiency
* rush manufacturing
* failure risk
* cost escalation

---

## 13.4 Crash damage

Accidentes destruyen stock.

Consecuencias:

* emergency manufacturing
* budget pressure
* fewer upgrade copies
* delayed rollout

---

# 14. Circuit Interaction

## 14.1 Track fit

Los circuitos modifican pesos relativos.

No crean azar arcade.

Ejemplo:

```text
low drag car performs better at Monza-type tracks
```

Pero:

```text
midfield car does not become dominant magically
```

---

## 14.2 Circuit specialists

Algunos autos:

* funcionan mejor en ciertos perfiles
* sufren más en otros

Esto crea:

* track variance
* strategic calendar pressure
* realistic unpredictability

---

## 14.3 Track profiles

Circuitos ponderan:

* high speed
* low speed
* tire stress
* cooling stress
* braking
* overtaking
* weather volatility

---

# 15. Risk System

## 15.1 Risk philosophy

El riesgo existe.

Pero:

```text
rare catastrophic randomness
```

---

## 15.2 Upgrade failure

Upgrades negativos:

```text
rare
```

Más probable:

```text
upgrade smaller than expected
```

---

## 15.3 Technical gambles

Apuestas enormes existen.

Pero:

```text
very rare
```

Ejemplos:

* radical floor redesign
* cooling revolution
* ultra aggressive packaging

---

## 15.4 Technical collapse

Colapsos técnicos totales deben ser extremadamente raros.

Más común:

* mala temporada
* concepto mediocre
* desarrollo estancado
* mala adaptación reglamentaria

---

# 16. Long Term Evolution

## 16.1 Technical eras

El sistema debe permitir:

```text
2026-2028:
low drag dominance

2029:
cooling crisis

2030:
stable platform era

2031:
high tire preservation meta
```

---

## 16.2 Historic concepts

Algunas filosofías pueden quedar históricamente recordadas.

Ejemplos:

* legendary dominant concept
* failed revolutionary car
* best qualifying car ever
* tire whisperer era

---

## 16.3 Technical dynasties

Dominancias técnicas son posibles.

Pero difíciles de mantener.

Presiones:

* copying
* regulation changes
* FIA pressure
* complacency
* staff poaching

---

# 17. UX Philosophy

## 17.1 Mostrar información útil

Mostrar:

* barras
* ratings
* strengths
* weaknesses
* concept summaries
* confidence indicators

---

## 17.2 Ocultar complejidad inútil

NO mostrar:

* aero equations
* CFD jargon extremo
* engineering spreadsheets
* incomprensible telemetry

---

## 17.3 Uncertainty

El jugador nunca tiene certeza total.

Ejemplo:

```text
Engineers believe the new floor may improve high speed stability.
Confidence: Medium
```

---

## 17.4 Imperfect engineer feedback

Muy ocasionalmente:

* engineers overestimate
* wrong assumptions
* poor simulation confidence
* misleading early data

Pero:

```text
rare
```

---

# 18. AI Interaction

## 18.1 AI innovation

AI muy innovadora debe ser rara.

Mayoría:

```text
incremental optimization
```

---

## 18.2 AI copycat

Copying ocurre ocasionalmente.

Especialmente:

* tras reglamentos nuevos
* tras dominancias fuertes
* equipos medianos

---

## 18.3 Conservative teams

Algunos equipos:

* priorizan estabilidad
* evitan revoluciones
* convergen lento
* prefieren upgrades seguros

---

## 18.4 Technical geniuses

Muy raros.

Pueden generar:

* dominant concepts
* revolutionary eras
* unexpected breakthroughs

No deben aparecer frecuentemente.

---

# 19. Example Emergent Narrative

## Example 1

```text
2026:
Team discovers low drag concept

2027:
dominates high speed circuits

2028:
everyone copies

2029:
FIA changes floor regulations

2030:
concept dies
```

---

## Example 2

```text
Small team hires genius technical director

slow development initially

2031:
new tire-saving concept appears

2032:
becomes podium contender
```

---

# 20. Technical Meta Goals

The system should create:

* meaningful philosophy choices
* realistic convergence
* historical eras
* team identities
* difficult transitions
* strategic uncertainty
* organizational learning
* emergent narratives

NOT:

* stat inflation
* linear upgrades
* random chaos
* scripted dominance

---

# 21. Recommended Implementation Files

```text
/src/simulation/tech/coreConcepts.ts
/src/simulation/tech/technicalAreas.ts
/src/simulation/tech/conceptCompatibility.ts
/src/simulation/tech/knowledgeSystem.ts
/src/simulation/tech/correlationSystem.ts
/src/simulation/tech/upgradeGenerator.ts
/src/simulation/tech/manufacturing.ts
/src/simulation/tech/regulationInteraction.ts
/src/simulation/tech/trackFit.ts
/src/simulation/tech/technicalMeta.ts
/src/simulation/tech/technicalHistory.ts
```

---

# 22. Status

Tech Tree v0 define:

* philosophy architecture
* concept evolution
* technical identity
* regulation interaction
* convergence system
* knowledge accumulation
* manufacturing abstraction
* long term technical eras

Siguiente documento recomendado:

```text
ux_flow_v0.md
```
