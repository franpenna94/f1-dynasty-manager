# F1 Dynasty Manager — Vision

## 1. Visión del proyecto

F1 Dynasty Manager es un simulador profundo de management, ingeniería, política y estrategia de Formula 1.

El jugador controla una escudería durante décadas. No conduce el auto. Su rol es dirigir una organización tecnológica, deportiva, económica y política dentro de un ecosistema competitivo cambiante.

El objetivo no es ganar una carrera aislada, sino construir, sostener o reconstruir una institución capaz de competir durante años.

El juego debe evitar:

* azar excesivo
* narrativa vacía
* bonificaciones abstractas sin causa
* upgrades tipo “+5% velocidad”
* simulación visual compleja innecesaria

La experiencia debe centrarse en:

* decisiones difíciles
* consecuencias persistentes
* sistemas interconectados
* información imperfecta
* tradeoffs reales
* dominio tecnológico
* política deportiva
* presión financiera

La fantasía central es:

> “No administro un auto. Administro una escudería viva.”

---

## 2. Fantasía del jugador

El jugador debe sentir que es Team Principal / CEO de una escudería.

Debe tomar decisiones como:

* cuándo desarrollar el auto actual
* cuándo abandonar la temporada y enfocarse en el año siguiente
* qué pilotos contratar
* qué jóvenes desarrollar
* qué sponsors aceptar
* cómo manejar el cost cap
* cómo votar regulaciones FIA
* cómo responder a lluvia, choques o oportunidades estratégicas
* cómo sostener finanzas sin destruir rendimiento
* cómo construir una identidad técnica propia

El resultado ideal es que el jugador pueda explicar una derrota o victoria mediante una cadena causal.

Ejemplo:

> “Perdimos rendimiento porque elegimos un concepto de alto downforce. Funcionó en circuitos lentos, pero generó drag excesivo. Intentamos compensarlo con un upgrade agresivo de fondo plano, pero no correlacionó bien. Eso nos hizo gastar presupuesto de cost cap, retrasó la fabricación de piezas y llegamos a la segunda mitad de temporada sin margen financiero.”

---

## 3. Pilares de diseño

### 3.1 Causalidad visible

Cada consecuencia importante debe tener explicación sistémica.

El jugador no siempre ve todos los números, pero debe recibir reportes suficientes para entender por qué algo ocurrió.

Ejemplo:

* mala correlación de simulador
* desgaste excesivo de neumáticos traseros
* falta de eficiencia aerodinámica
* bajo feedback del piloto
* staff técnico lento
* presión financiera
* reglas FIA desfavorables

---

### 3.2 Determinismo con variabilidad controlada

El juego no debe sentirse como una tirada de dados.

Debe tener:

* modelos deterministas
* incertidumbre parcial
* variabilidad pequeña
* errores humanos modelados
* riesgo acumulativo
* resultados explicables

Ejemplo incorrecto:

> “Tu motor explotó aleatoriamente.”

Ejemplo correcto:

> “Tu motor venía acumulando estrés térmico por modos agresivos, mala refrigeración y alto kilometraje. La probabilidad de fallo subió vuelta a vuelta.”

---

### 3.3 Tradeoffs reales

Toda mejora debe tener costo.

Ejemplos:

* más downforce mejora curvas, pero aumenta drag
* más agresividad técnica mejora potencial, pero sube riesgo de sanción o mala correlación
* fichar un piloto estrella mejora puntos, pero tensiona presupuesto
* invertir en academia reduce liquidez actual, pero crea ventaja futura
* aceptar sponsor riesgoso aumenta caja, pero daña reputación

---

### 3.4 Identidad de equipo

Cada escudería debe desarrollar una identidad persistente.

Dimensiones posibles:

* filosofía técnica
* cultura organizacional
* reputación política
* estilo de pilotos
* academia
* tolerancia al riesgo
* eficiencia operativa
* relación con sponsors

El jugador debe poder construir una dinastía con personalidad propia.

---

### 3.5 Información imperfecta

El jugador no debe ver todos los valores exactos.

Debe tomar decisiones con reportes interpretados por ingenieros, analistas, scouts y directivos.

Fuentes de incertidumbre:

* potencial real de pilotos jóvenes
* correlación CFD/túnel/pista
* calidad exacta de upgrades rivales
* clima futuro
* rumores regulatorios
* intención política de otros equipos
* rasgos ocultos de staff
* fatiga real de componentes

---

## 4. Qué NO queremos hacer

No queremos:

* conducción manual
* visualización 3D pesada
* carreras arcade
* eventos narrativos vacíos
* exceso de RNG
* upgrades genéricos
* árboles tecnológicos sin tradeoffs
* micromanagement técnico incomprensible
* sandbox totalmente abierto en v0
* nombres falsos si se puede evitar en desarrollo privado

---

## 5. Qué SÍ queremos hacer

Queremos:

* simulador de escudería
* profundidad sistémica
* UI simple y funcional
* carreras por reportes y decisiones
* economía dura
* FIA activa
* pilotos con personalidad y progresión
* academia visible
* sponsors importantes
* cost cap desde el inicio
* clima dinámico
* desarrollo técnico con fabricación real de piezas
* decisiones semanales significativas
* ciclos de dominio y caída

---

## 6. Decisiones de producto v0/v1

### Plataforma

* Web.
* Jugable desde PC y mobile.
* Single player.
* UI simple tipo Basketball GM.
* Profundidad de simulación por encima de presentación visual.

### Universo

* Inspirado en F1 moderna.
* Inicio sugerido: temporada 2026.
* Calendario real.
* Nombres reales en lo posible para desarrollo privado.
* Arquitectura preparada para reemplazar por nombres ficticios si fuera necesario.

### Escudería inicial

* El jugador puede elegir equipos reales de mitad/fondo de parrilla.
* No puede iniciar con Ferrari, Red Bull o Mercedes.
* Cada equipo tiene dificultad distinta.
* Cada dueño tiene objetivos propios.

### Carrera

* Sin UI visual de carrera al inicio.
* Simulación vuelta a vuelta.
* Reportes y decisiones.
* El jugador interviene solo ante eventos relevantes.
* Decisiones principales:

  * boxes
  * lluvia
  * choques
  * degradación inesperada
  * oportunidad estratégica

### Temporada v0

* 11 equipos.
* 12 carreras.
* Sin sprint races en v0.
* Clima dinámico desde v0.
* Penalizaciones complejas de PU no necesarias en v0, pero previstas para futuro.

### Desarrollo técnico

* Máximo 2 proyectos simultáneos.
* Árbol tecnológico.
* Conceptos de auto incompatibles.
* Se puede abandonar el auto actual para enfocarse en el siguiente año.
* Upgrades fabricados unidad por unidad para cada auto.

### Economía

* Cost cap activo desde el inicio.
* Salarios anuales.
* Sponsors pagan mensualmente.
* Prize money al final de temporada.
* Deuda, préstamos, dueños e inversores.
* El jugador puede quebrar.
* Caja negativa bloquea gasto.
* Hay plazo para salir de caja negativa antes de penalidades.
* El dueño puede exigir recortes o inyectar capital.

### Política

* FIA visible como sistema jugable.
* Votaciones explícitas entre equipos.
* Decisiones regulatorias desde arriba.
* Prensa influye en reputación y política.
* No se priorizan protestas técnicas complejas en v0.
* Sí hay riesgo de sanción por innovación agresiva.

### Pilotos y staff

* Pilotos generados proceduralmente.
* Envejecimiento, declive y retiro.
* Personalidades fuertes y conflictos.
* Pilotos más importantes que staff en corto plazo.
* Staff ejecutivo influye en mediano/largo plazo.
* Contratos y cláusulas para pilotos.
* Staff con mercado más simple.

### Academia

* Importante, pero menos compleja que el equipo principal.
* Categorías junior simuladas.
* Afiliaciones con equipos menores.
* Potencial oculto.
* Scouting regional.

### Filosofía

* Experiencia cerrada, no sandbox editable como prioridad inicial.
* Equivocarse debe ser bastante castigador.
* Se puede dominar durante años, pero debe ser difícil.
* Reglas, economía, política y envejecimiento deben impedir hegemonías eternas.

---

## 7. Inspiraciones

Inspiraciones de diseño:

* Basketball GM: UI simple, profundidad sistémica, datos/tablas.
* Football Manager: reportes, scouting, personalidades, información imperfecta.
* Motorsport Manager: fantasía de escudería, estrategia y desarrollo.
* Paradox-style strategy games: sistemas conectados y consecuencias políticas.
* Formula 1 real: ingeniería, regulaciones, cost cap, ciclos técnicos.

---

## 8. MVP recomendado

El MVP debe demostrar el core sistémico sin intentar simular todo desde el día uno.

MVP:

* web app simple
* 11 equipos
* 22 pilotos titulares
* 12 carreras
* turno semanal
* inbox de reportes
* standings
* cash flow
* desarrollo técnico básico
* 2 upgrades simultáneos
* clima dinámico
* carrera vuelta a vuelta por reportes
* decisiones de pit/riesgo/lluvia
* sponsors mensuales
* cost cap
* academia básica
* FIA básica

---

## 9. Riesgo principal

El mayor riesgo es overengineering.

No hay que simular cada detalle microscópico. Hay que simular los detalles que generan decisiones interesantes.

Regla:

> Complejidad interna, claridad externa.

La interfaz debe hablar como un equipo de F1, no como una planilla de ingeniería aeroespacial.

Ejemplo correcto:

* “El paquete de alta carga funciona, pero degrada más los neumáticos traseros.”
* “El nuevo fondo plano promete rendimiento, pero el equipo de aero advierte riesgo de correlación.”
* “El sponsor exige resultados antes de renovar.”

Ejemplo incorrecto:

* “Radiator aperture coefficient = 0.172.”
* “Yaw delta coefficient increased by 0.0039.”

---

## 10. Principio rector

El juego debe permitir que el jugador pierda o gane por decisiones tomadas meses antes.

La profundidad nace cuando una decisión aparentemente correcta genera consecuencias acumulativas.

Ese es el corazón del proyecto.
