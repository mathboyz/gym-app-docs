# Módulo: Reservas

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin gestiona) · App Mobile (atleta reserva)

---

## Funcionalidades

### 🖥️ Backoffice (Web)
- Ver todas las reservas de una sesión con sus estados
- Ver lista de espera + posición de cada atleta
- Registrar asistencia (check-in) manualmente · Marcar no-show
- Bulk check-in: marcar todos los presentes a la vez
- Reservar / cancelar en nombre de un atleta (bypass de ventana mínima)
- Ver historial de reservas de un atleta (desde su perfil)
- Exportar lista de asistentes de una sesión (CSV)
- Configurar política de reservas del gym

### 📱 App (Atleta)
- Ver clases con cupos disponibles en tiempo real
- Reservar una clase (dentro de la ventana configurada)
- Confirmar asistencia cuando el sistema lo solicite (antes de la clase)
- Unirse / salir de lista de espera
- Ver posición propia en lista de espera en tiempo real
- Ver mis reservas activas e historial con estados

---

## Flujo de reserva (App)

```
1. RESERVA
   El atleta reserva dentro de la ventana configurada por el admin.
   Ventana máxima: hasta N días antes (ej. 7 días)
   Ventana mínima: no menos de N horas antes (ej. 2h)
   → Estado: pending_confirmation

2. CONFIRMACIÓN
   X horas antes de la clase (configurable), el sistema envía push
   pidiendo al atleta que confirme su asistencia.
   - Si confirma → Estado: confirmed ✅
   - Si no responde en el plazo → Estado: auto_cancelled
     Cupo liberado → notifica al siguiente en waitlist

3. CANCELACIÓN
   Solo se puede cancelar mientras estado = pending_confirmation.
   Una vez confirmed → NO se puede cancelar.
```

---

## Política de reservas (configurable por gym)

| Configuración | Descripción |
|--------------|-------------|
| `reservation_window_max_days` | Hasta cuántos días antes se puede reservar (ej. 7) |
| `reservation_window_min_hours` | No reservar con menos de N horas antes (ej. 2) |
| `confirmation_hours_before` | Cuántas horas antes se envía el push de confirmación |
| `confirmation_deadline_minutes` | Minutos que tiene el atleta para confirmar antes del auto-cancel |
| `waitlist_mode` | `auto` (confirma automáticamente al quedar cupo) / `manual` |
| `waitlist_confirm_minutes` | Minutos para confirmar si viene de waitlist (ej. 30) |
| `max_active_reservations` | Límite de reservas activas simultáneas (ej. 3) |
| `overbooking_limit` | Cupos extra sobre el máximo — van directo a waitlist |

---

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_session_id` | UUID FK → class_sessions | |
| `member_id` | UUID FK → members | |
| `status` | ENUM | `pending_confirmation`, `confirmed`, `auto_cancelled`, `cancelled`, `no_show`, `waitlist` |
| `waitlist_position` | INTEGER | nullable |
| `confirmation_deadline` | TIMESTAMPTZ | nullable — cuándo expira el tiempo para confirmar |
| `confirmed_at` | TIMESTAMPTZ | nullable |
| `cancelled_at` | TIMESTAMPTZ | nullable |
| `cancellation_source` | ENUM | nullable: `member`, `admin`, `system` |
| `promoted_from_waitlist_at` | TIMESTAMPTZ | nullable — audit trail |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

UNIQUE: `(class_session_id, member_id)`

---

## Estados y transiciones

```
waitlist              → pending_confirmation  (cupo liberado, atleta tiene X min para confirmar)
pending_confirmation  → confirmed             (atleta confirma)
pending_confirmation  → auto_cancelled        (expiró el plazo de confirmación → cupo liberado)
pending_confirmation  → cancelled             (atleta cancela antes de confirmar)
confirmed             → no_show               (clase termina sin check-in registrado por admin)
```

- Una reserva **confirmed no puede ser cancelada** por el atleta
- No-show = pierde la clase, **sin penalización económica**
- Plan vencido → bloqueado: `membership.ends_at < session.starts_at`
- Sobrecupo: siempre va a `waitlist`; `confirmed` solo si hay cupo real

---

## Eventos de dominio

| Evento | Consecuencias |
|--------|--------------|
| `ReservationCreated` | Push de confirmación al atleta |
| `ConfirmationRequested` | Push X horas antes pidiendo confirmar asistencia |
| `ReservationConfirmed` | Estado → confirmed |
| `ReservationAutoCancelled` | Cupo liberado → notifica al siguiente en waitlist |
| `ReservationCancelled` | Cupo liberado → notifica al siguiente en waitlist |
| `WaitlistPromoted` | Atleta pasa a pending_confirmation → push con plazo |
| `NoShowRecorded` | Puede romper racha en gamificación |
| `SessionCancelled` | Cancela todas las reservas → notifica a afectados |

---

## Decisiones resueltas

- ✅ Ventana de reserva: configurable por gym (min y max en Política)
- ✅ Sobrecupo: siempre va a waitlist; confirmed solo si hay cupo real
- ✅ Admin: siempre bypass de ventana mínima (override explícito en backoffice)
- ✅ Cancelación tardía: no aplica — confirmada = bloqueada
- ✅ Plan vence entre reserva y clase: validación al intentar confirmar

## Conexiones

- **Planes / Membresías** → validar plan activo y no vencido
- **Tipo de Clases** → cupos, sobrecupo y política de reserva por defecto
- **Calendario** → la sesión define cuándo y qué tipo de clase
- **Gamificación** → no-show puede romper racha; confirmar asistencia puede dar XP
- **Notificaciones** → push en cada evento del flujo
