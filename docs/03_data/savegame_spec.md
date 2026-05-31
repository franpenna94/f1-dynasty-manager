# F1 Dynasty Manager — Savegame Spec v1

## 0. Propósito

Este documento define cómo se guardan, cargan, validan y migran las partidas.

Objetivos:

- evitar corrupción de saves
- permitir partidas de 100+ temporadas
- soportar cambios futuros de schema
- facilitar debugging
- mantener compatibilidad entre versiones
- permitir export/import manual

Principio rector:

```text
A save must be portable, versioned, validated and recoverable.
```

---

# 1. Formato general

## 1.1 Save único por slot

Cada slot contiene un único snapshot completo del estado del mundo.

Formato lógico:

```text
SaveGame
```

Formato físico recomendado:

```text
save_slot_001.json
```

En producción puede comprimirse:

```text
save_slot_001.json.gz
```

---

## 1.2 Por qué snapshot único

Ventajas:

- fácil de exportar
- fácil de importar
- fácil de debuggear
- evita inconsistencias entre archivos
- suficiente para 100+ temporadas si se guarda historial agregado

---

# 2. Save root

Estructura raíz:

```ts
interface SaveGame {
  metadata: SaveMetadata
  settings: GameSettings
  world: WorldState
  current_season: CurrentSeasonState
  history: HistoricalRecords
  temporary: TemporaryState
  rng: RngState
}
```

---

# 3. Metadata

```ts
interface SaveMetadata {
  save_id: string
  slot_id: string
  save_version: string
  schema_version: string
  created_at: string
  updated_at: string
  current_date: string
  current_season_year: number
  current_week_index: number
  player_team_id: string
  game_start_year: number
  game_build?: string
}
```

---

# 4. Versionado

## 4.1 save_version

Representa la versión del archivo de save.

Ejemplo:

```text
0.1.0
```

---

## 4.2 schema_version

Representa la versión del schema de datos.

Ejemplo:

```text
schema_001
```

---

## 4.3 game_build

Opcional.

Sirve para debugging.

Ejemplo:

```text
alpha.0.3.12
```

---

# 5. Migraciones

## 5.1 Regla principal

Nunca asumir que un save viejo tiene todos los campos nuevos.

Todo save cargado debe pasar por:

```ts
migrateSave(rawSave): SaveGame
```

---

## 5.2 Migraciones secuenciales

Las migraciones deben aplicarse en orden.

Ejemplo:

```text
schema_001 → schema_002
schema_002 → schema_003
schema_003 → schema_004
```

Nunca saltar migraciones.

---

## 5.3 Estructura recomendada

```ts
type SaveMigration = {
  from: string
  to: string
  migrate: (save: unknown) => unknown
}
```

---

## 5.4 Ejemplo

```ts
const migration001To002 = {
  from: "schema_001",
  to: "schema_002",
  migrate: (save) => {
    return {
      ...save,
      metadata: {
        ...save.metadata,
        schema_version: "schema_002"
      }
    }
  }
}
```

---

# 6. Validación

## 6.1 Validación con Zod

Cada save debe validarse al cargar.

Recomendado:

```text
Zod schemas
```

Validar:

- estructura raíz
- IDs principales
- tipos numéricos
- arrays requeridos
- standings
- equipos
- pilotos
- current season
- history

---

## 6.2 Validación fuerte en desarrollo

En desarrollo:

```text
invalid save = throw error
```

---

## 6.3 Validación tolerante en producción

En producción:

- intentar migrar
- intentar reparar campos no críticos
- fallar solo si el save está corrupto en campos críticos

---

# 7. Campos críticos

Si estos campos faltan, el save no debe cargarse sin reparación explícita:

```text
metadata
settings
world
current_season
history
rng
player_team_id
teams
drivers
calendar
```

---

# 8. Invariantes del save

El save siempre debe cumplir:

```text
player_team_id existe
todos los driver_ids referencian pilotos existentes
todos los team_ids referencian equipos existentes
no hay pilotos titulares duplicados en F1
current_week_index está dentro del calendario
cash es número válido
standings no tienen NaN
race results no tienen posiciones duplicadas
development projects no exceden límite activo
cost cap spent <= número válido
```

---

# 9. Serialización

## 9.1 En desarrollo

Guardar como JSON legible.

```ts
JSON.stringify(save, null, 2)
```

---

## 9.2 En producción

Guardar como JSON compacto.

Opcional:

```text
gzip / compression stream / browser compression
```

---

# 10. Export / Import

## 10.1 Export

El jugador debería poder exportar un save como archivo.

Nombre sugerido:

```text
f1-dynasty-save-2032-week-14.json
```

o comprimido:

```text
f1-dynasty-save-2032-week-14.json.gz
```

---

## 10.2 Import

Al importar:

```text
read file
↓
decompress if needed
↓
parse JSON
↓
migrate
↓
validate
↓
load into slot
```

---

# 11. Backups

## 11.1 Backup automático interno

Antes de sobrescribir un save manual, mantener el snapshot anterior.

```text
slot_001_current
slot_001_backup
```

---

## 11.2 Recovery

Si current falla al cargar:

```text
try backup
```

---

# 12. Temporary State

## 12.1 No persistir microdatos innecesarios

No guardar permanentemente:

- lap-by-lap histórico completo
- cada práctica
- cada rumor menor
- cada reporte menor

---

## 12.2 Active race

Durante carrera activa, `temporary.active_race` puede guardar:

- lap state
- pit history
- strategy events
- safety car periods

Después de carrera:

```text
summarize
↓
store race result
↓
clear temporary race state
```

---

# 13. Historial persistente

Guardar para siempre:

- season standings
- champions
- driver career stats
- team career stats
- circuit aggregate stats
- regulations
- historic events
- Hall of Fame records

No guardar para siempre:

- micro telemetry
- all reports
- all rumors
- full lap logs

---

# 14. Deterministic RNG

El save debe guardar estado RNG.

```ts
interface RngState {
  world_seed: string
  current_seed: string
  race_seed?: string
  generation_counter: number
}
```

Nunca usar `Math.random()` en simulación.

---

# 15. Save timing

## 15.1 Manual save

MVP usa guardado manual.

---

## 15.2 Safe save points

Guardar preferentemente en estados seguros:

- inicio de semana
- fin de semana
- antes de carrera
- después de carrera
- offseason

Evitar guardar durante resolución parcial de una decisión.

---

## 15.3 In-race save

No prioritario para MVP.

Si se agrega en el futuro, debe guardar `temporary.active_race` completo.

---

# 16. Multiple slots

Cada slot debe tener metadata ligera para menú de carga.

```ts
interface SaveSlotSummary {
  slot_id: string
  display_name: string
  current_season_year: number
  current_week_index: number
  player_team_name: string
  updated_at: string
  save_version: string
}
```

---

# 17. Corruption handling

Si el save falla:

1. no sobrescribir
2. mostrar error claro
3. intentar backup
4. ofrecer exportar archivo corrupto para debug
5. volver al menú principal

---

# 18. Migration policy

## 18.1 Durante alpha

Se puede permitir romper compatibilidad si es necesario, pero documentarlo.

---

## 18.2 Después de beta

Mantener migraciones siempre que sea razonable.

---

## 18.3 Nunca hacer migraciones silenciosas destructivas

Si una migración elimina datos históricos importantes, debe estar documentada.

---

# 19. Testing

Tests mínimos:

```text
new save validates
save serializes
save deserializes
old save migrates
corrupt save fails safely
backup loads if current fails
100-season save remains valid
```

---

# 20. Recommended implementation files

```text
/src/simulation/save/types.ts
/src/simulation/save/saveSchemas.ts
/src/simulation/save/createNewSave.ts
/src/simulation/save/serializeSave.ts
/src/simulation/save/deserializeSave.ts
/src/simulation/save/migrateSave.ts
/src/simulation/save/validateSave.ts
/src/simulation/save/saveSlots.ts
/src/simulation/save/backupSave.ts
```

---

# 21. MVP requirements

For MVP, implement:

- manual save
- manual load
- one save snapshot per slot
- save_version
- schema_version
- Zod validation
- basic backup
- localStorage persistence or file export/import
- deterministic RNG state

---

# 22. Golden Rule

```text
Never let a bad save destroy a long-running career.
```
