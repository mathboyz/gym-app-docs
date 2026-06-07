# Módulo: Planes

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin gestiona catálogo) · App Mobile (atleta ve su plan y consume clases)

---

## Concepto

Los planes son el **catálogo de membresías** que ofrece el gym. La membresía activa de cada persona no se gestiona aquí:
- En **Clientes** (web) → asignar plan, cambiar, congelar, renovar, ver consumo y vencimiento
- En **App Mobile** (Mi Plan) → ver plan activo y consumo, pagar, solicitar congelamiento

## Tipos de plan

| Tipo | Descripción |
|------|-------------|
| Recurrente con bolsa de clases | Ej. 12 clases al mes — el atleta las distribuye libremente |
| Ilimitado | Sin tope de clases en el período |

## Funcionalidades

- CRUD de planes
- Activar / desactivar / archivar
- Duplicar plan
- Definir tipos de clase incluidos (**fuente de verdad** de la relación plan ↔ clase)
- Configurar reglas: permite congelar, período de gracia, renovación
- Reportes de planes → ver en Métricas

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `description` | TEXT | nullable |
| `type` | ENUM | `class_bundle`, `unlimited` |
| `periodicity` | ENUM | `monthly`, `quarterly`, `biannual`, `annual` |
| `price_clp` | INTEGER | precio en pesos chilenos |
| `class_quota` | INTEGER | nullable — cantidad de clases del período (null = ilimitado) |
| `allows_freeze` | BOOLEAN | default false |
| `renewal` | ENUM | `manual`, `automatic` |
| `grace_period_days` | INTEGER | días de gracia antes de suspender, default 0 |
| `status` | ENUM | `active`, `inactive`, `archived` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

## Conexiones

- **Tipo de Clases** → los planes definen qué tipos de clase incluyen (se edita aquí)
- **Clientes** → membresía asignada, consumo y vencimiento
- **Reservas** → descuenta consumo de la bolsa y valida acceso
- **Pagos** → cobros online / transferencia, comprobantes, cupones
- **Facturación** → boleta / factura SII
- **Métricas** → ingresos por plan, distribución, churn
