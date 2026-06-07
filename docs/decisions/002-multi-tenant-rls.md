# ADR 002 — Multi-tenant con PostgreSQL RLS

**Estado:** Aceptado

## Contexto

El sistema es multi-tenant (múltiples gimnasios en la misma instancia). Hay que decidir la estrategia de aislamiento de datos.

## Opciones consideradas

1. **Base de datos por tenant** — máximo aislamiento, costo operacional muy alto
2. **Schema por tenant** — buen aislamiento, migraciones complejas
3. **`tenant_id` en todas las tablas + RLS** — un solo schema, aislamiento por políticas de PostgreSQL

## Decisión

**Opción 3: `tenant_id` en todas las tablas + Row Level Security (RLS) en PostgreSQL.**

## Razones

- Operacionalmente simple: una sola base de datos, un solo schema
- RLS como segunda línea de defensa (si el código olvida filtrar por tenant, la DB lo rechaza)
- Escala razonablemente bien para el mercado objetivo (gyms pequeños/medianos en Chile)
- Drizzle tiene soporte para RLS

## Consideraciones especiales

- Un **atleta** puede pertenecer a múltiples gyms → el contexto del tenant se establece por sesión/request, no por usuario
- El `tenant_id` se inyecta a nivel de middleware en cada request autenticado
- Las migraciones deben considerar siempre el `tenant_id` en tablas nuevas
