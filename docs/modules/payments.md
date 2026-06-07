# Módulo: Pagos y Facturación

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin gestiona, ve estado, emite documentos) · App Mobile (atleta paga online, ve su historial)

---

## Medios de pago

| Tipo | Descripción |
|------|-------------|
| Manual | Transferencia / efectivo — el admin registra el pago |
| Online | MercadoPago · Khipu · Flow — el atleta paga desde la app |
| Cobro automático | Cargo recurrente al renovar membresía |

## Funcionalidades

### Admin (Web)
- Registrar pago manual (monto, medio, fecha, comprobante)
- Ver estado de pagos por miembro: al día / en mora / congelado
- Gestionar mora: días de gracia antes de suspender acceso
- Emitir boleta o factura electrónica (DTE / SII) vía integración
- Historial de pagos del gym (filtros por período, plan, estado)
- Intentos de cobro automático y reintentos fallidos

### Atleta (App Mobile)
- Ver monto y fecha de próximo cobro
- Pagar plan online (MercadoPago / Khipu / Flow)
- Ver historial de pagos propios
- Descargar comprobante / boleta

## Membresías (Subscriptions)

La membresía conecta a un miembro con un plan activo. Se gestiona desde:
- **Clientes (web)** → asignar, cambiar, congelar, cancelar, ver consumo
- **App Mobile** → ver plan activo, cuotas restantes, fecha de vencimiento

### Estados de membresía
`active` → `frozen` (congelado temporalmente) → `active`
`active` → `cancelled` / `expired` → reasignar nuevo plan

### Cambio de plan con prorrateo
Al cambiar de plan a mitad de período → calcular crédito proporcional del plan anterior.

## Campos — `plans`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `description` | TEXT | nullable |
| `type` | ENUM | `class_bundle`, `unlimited` |
| `periodicity` | ENUM | `monthly`, `quarterly`, `biannual`, `annual` |
| `price_clp` | INTEGER | precio en pesos chilenos |
| `class_quota` | INTEGER | nullable — null = ilimitado |
| `allows_freeze` | BOOLEAN | default false |
| `renewal` | ENUM | `manual`, `automatic` |
| `grace_period_days` | INTEGER | días de gracia antes de suspender, default 0 |
| `status` | ENUM | `active`, `inactive`, `archived` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

## Campos — `memberships`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `plan_id` | UUID FK → plans | |
| `status` | ENUM | `active`, `frozen`, `cancelled`, `expired` |
| `starts_at` | DATE | |
| `ends_at` | DATE | fecha de vencimiento del período actual |
| `classes_used` | INTEGER | clases consumidas en el período actual |
| `frozen_at` | TIMESTAMPTZ | nullable |
| `frozen_until` | DATE | nullable |
| `freeze_reason` | TEXT | nullable |
| `cancelled_at` | TIMESTAMPTZ | nullable |
| `renewal` | ENUM | `manual`, `automatic` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

## Campos — `payments`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `membership_id` | UUID FK → memberships | nullable |
| `amount_clp` | INTEGER | monto en pesos chilenos |
| `method` | ENUM | `manual`, `mercadopago`, `khipu`, `flow` |
| `status` | ENUM | `pending`, `paid`, `failed`, `refunded` |
| `paid_at` | TIMESTAMPTZ | nullable |
| `due_date` | DATE | fecha de vencimiento del cobro |
| `reference` | VARCHAR | nullable — número de comprobante externo |
| `dte_url` | VARCHAR | nullable — URL del documento tributario electrónico |
| `notes` | TEXT | nullable — para pagos manuales |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

## Facturación DTE / SII

- Integración con Bsale · Defontana · Facturar.cl (a definir)
- Emitir boleta electrónica o factura electrónica por cada pago
- RUT del miembro requerido para factura (ya en `members.rut`)
- URL del DTE emitido guardada en `payments.dte_url`

## Flujo de mora

1. Membresía vence (`ends_at < today`)
2. Si `grace_period_days` > 0 → acceso permitido por N días
3. Al superar gracia → `membership.status = expired`, acceso bloqueado en reservas
4. Admin registra pago manual → reactiva membresía
5. Con cobro automático → reintentos configurables (3 intentos / 48 hrs)

## Conexiones

- **Planes** → precio, periodicidad, quota de clases, grace period
- **Clientes** → membresía asignada y estado de cuenta
- **Reservas** → valida que membresía esté activa y con quota disponible
- **Métricas** → MRR, ingresos por plan, mora
- **Notificaciones** → alerta de vencimiento próximo, cobro fallido, pago confirmado
