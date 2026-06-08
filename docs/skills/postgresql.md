# PostgreSQL

**Categoría:** Base de datos · **Prioridad:** 🔴 Alta

---

## Por qué importa en este proyecto

Multi-tenant con RLS, queries complejas de disponibilidad en tiempo real, métricas agregadas. Necesitan entender cómo funciona PostgreSQL por dentro para escribir queries eficientes y configurar RLS correctamente.

## Temas clave

### Row Level Security (RLS) — multi-tenant
```sql
-- Habilitar RLS en todas las tablas del tenant
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policy: solo ver filas del gym_id del JWT
CREATE POLICY tenant_isolation ON reservations
  USING (gym_id = current_setting('app.current_gym_id')::uuid);

-- Desde NestJS: setear el contexto antes de cada query
SET LOCAL app.current_gym_id = '<gym_id>';
```

### Índices
```sql
-- Índice compuesto para queries frecuentes
CREATE INDEX idx_reservations_session_status
  ON reservations (class_session_id, status)
  WHERE status IN ('confirmed', 'pending_confirmation', 'waitlist');

-- Índice parcial para membresías activas
CREATE INDEX idx_memberships_active
  ON memberships (member_id, ends_at)
  WHERE status = 'active';
```

### EXPLAIN ANALYZE
```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM reservations
WHERE class_session_id = $1 AND status = 'confirmed';
-- Leer: Seq Scan vs Index Scan, rows estimados vs reales, buffers
```

### CTEs (queries complejas)
```sql
-- Cupos disponibles en tiempo real
WITH session_info AS (
  SELECT capacity, overbooking_limit FROM class_sessions WHERE id = $1
),
reserved AS (
  SELECT COUNT(*) AS cnt FROM reservations
  WHERE class_session_id = $1
    AND status IN ('confirmed', 'pending_confirmation')
)
SELECT
  s.capacity - r.cnt AS available_slots,
  r.cnt >= s.capacity AS is_full
FROM session_info s, reserved r;
```

### Transacciones y locks
```sql
-- Reservar un cupo — necesita lock para evitar race conditions
BEGIN;
  SELECT COUNT(*) FROM reservations
  WHERE class_session_id = $1 AND status IN ('confirmed','pending_confirmation')
  FOR UPDATE;  -- lock de lectura
  -- Si hay cupo → INSERT reservation
COMMIT;
```

### JSONB
```sql
-- Política de reservas guardada en JSONB
SELECT policy->>'reservation_window_max_days' AS max_days
FROM gyms WHERE id = $1;

-- Index GIN para búsquedas dentro del JSON
CREATE INDEX idx_gym_policy ON gyms USING GIN (reservation_policy);
```

### Soft delete + anonimización (Ley 19.628)
```sql
-- Soft delete
UPDATE members SET deleted_at = now() WHERE id = $1;

-- Anonimizar datos sensibles
UPDATE members SET
  email = 'anon_' || encode(gen_random_bytes(8), 'hex') || '@deleted.local',
  rut = NULL, phone = NULL, health_parq = NULL
WHERE id = $1;
```

## Recursos
- [PostgreSQL docs](https://www.postgresql.org/docs/)
- [Use the Index, Luke](https://use-the-index-luke.com/) — índices explicados
- [RLS guide](https://supabase.com/docs/guides/auth/row-level-security)
