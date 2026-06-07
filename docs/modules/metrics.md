# Módulo: Métricas

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin ve KPIs del gym) · App Mobile (atleta ve su progreso personal)

---

## Perspectiva Admin (Web Dashboard)

- Dashboard operacional en tiempo real
- Asistencia por clase, instructor y horario
- Tasa de ocupación por clase (cupos usados vs disponibles)
- Métricas de clientes: activos / inactivos / nuevos / churn / retención
- Métricas financieras: ingresos por período y plan, mora, MRR
- Clases más asistidas y horarios más populares
- Ranking de clientes (gamificación)

## Perspectiva Atleta (App Mobile)

- Resumen de asistencia semanal / mensual y racha (streak)
- Historial de clases asistidas por tipo
- Registro de progreso físico (peso, medidas corporales, % grasa)
- Gráficas temporales de evolución de métricas físicas
- PRs por ejercicio
- Distribución de entrenamiento por grupo muscular
- Comparativa vs períodos anteriores

## Campos — Progreso Físico (registro periódico)

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `recorded_at` | DATE | |
| `height_cm` | DECIMAL | nullable |
| `weight_kg` | DECIMAL | nullable |
| `waist_cm` | DECIMAL | nullable |
| `hip_cm` | DECIMAL | nullable |
| `chest_cm` | DECIMAL | nullable |
| `thigh_cm` | DECIMAL | nullable |
| `arm_cm` | DECIMAL | nullable |
| `body_fat_pct` | DECIMAL | nullable |
| `photo_url` | VARCHAR | nullable |
| `created_at` | TIMESTAMPTZ | |

## Campos — Personal Records (PR)

Ya modelado en `personal_records` (ver `data-model.md`).

| Campo | Notas |
|-------|-------|
| `exercise_id` | FK → exercises |
| `type` | `max_weight`, `max_reps`, `best_time` |
| `value` | kg / reps / segundos |
| `recorded_at` | fecha del PR |
| `notes` | nullable |
