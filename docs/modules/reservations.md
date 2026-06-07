# Módulo: Reservas

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin gestiona) · App Mobile (atleta reserva)

---

## Funcionalidades

**📱 App Mobile (atleta)**
- Ver clases con cupos disponibles en tiempo real
- Reservar / cancelar una clase
- Unirse / salir de lista de espera
- Ver mis reservas activas e historial de reservas

**🖥️ Web Dashboard (admin / coach)**
- Ver todas las reservas de una sesión con sus estados
- Ver lista de espera de una sesión
- Registrar asistencia (check-in) manualmente
- Marcar no-show
- Reservar / cancelar en nombre de un atleta
- Configurar política de reservas del gym

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_session_id` | UUID FK → class_sessions | |
| `member_id` | UUID FK → members | |
| `status` | ENUM | `confirmed`, `cancelled`, `no_show`, `waitlist` |
| `waitlist_position` | INTEGER | nullable |
| `cancelled_at` | TIMESTAMPTZ | nullable |
| `cancellation_source` | ENUM | nullable: `member`, `admin`, `system` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

UNIQUE: `(class_session_id, member_id)`

## Política de reservas (configurable por gym)

| Configuración | Descripción |
|--------------|-------------|
| Ventana mínima | No reservar con menos de Xh de anticipación |
| Ventana máxima | No reservar con más de X días de anticipación |
| Cancelación sin consecuencia | Hasta Xh antes; después = no-show |
| Waitlist: auto o manual | Si auto, se confirma sin acción del atleta |
| Tiempo para confirmar desde waitlist | Ej. 30 min; si no confirma → pasa al siguiente |
| Límite de reservas activas simultáneas | Máx X clases reservadas a la vez |

## Estados y transiciones

```
waitlist   → confirmed     (cupo liberado)
confirmed  → cancelled     (atleta o admin cancela)
confirmed  → no_show       (clase termina sin check-in)
confirmed  → attendance    (check-in registrado → tabla attendances)
```

- No-show = pierde la clase, **sin penalización económica**
- Plan vencido al reservar → bloqueado: `membership.ends_at < session.starts_at`

## Eventos de dominio

| Evento | Consecuencias |
|--------|--------------|
| `ReservationCreated` | Notificación de confirmación al atleta |
| `ReservationCancelled` | Libera cupo → notifica al siguiente en waitlist |
| `WaitlistPromoted` | Atleta pasa a confirmed → notificación |
| `NoShowRecorded` | Puede romper racha en gamificación |
| `AttendanceCheckedIn` | Dispara XP en gamificación |
| `SessionCancelled` | Cancela todas las reservas → notifica a afectados |

## Conexiones

- **Planes / Membresías** → validar plan activo y no vencido al momento de la clase
- **Tipo de Clases** → cupos, sobrecupo y política de reserva por defecto
- **Calendario** → la sesión define cuándo y qué tipo de clase
- **Asistencias** → check-in registra la asistencia efectiva
- **Gamificación** → asistencia da XP; no-show puede romper racha
- **Notificaciones** → confirmación, cancelación, cupo libre, recordatorios

## Dudas / Decisiones abiertas

- [ ] ¿Con cuánta anticipación se puede reservar? → ¿Configurable por gym?
- [ ] ¿El sobrecupo va directo a `confirmed` o a `waitlist`?
- [ ] Cancelación tardía → ¿cuenta como no-show para gamificación?
- [ ] ¿El admin puede reservar saltándose la ventana mínima de anticipación?
- [ ] Plan vence entre reserva y clase → ¿se cancela la reserva automáticamente?
