# Event-Driven Architecture

**Categoría:** Arquitectura · **Prioridad:** 🟡 Media

---

## Por qué importa en este proyecto

Los domain events son el pegamento entre módulos: `AttendanceCheckedIn` dispara XP en Gamificación sin que Reservas sepa que Gamificación existe. El bajo acoplamiento entre bounded contexts depende de esto.

## Domain Events vs Integration Events

| | Domain Event | Integration Event |
|--|--|--|
| **Scope** | Dentro del mismo proceso | Entre servicios / módulos |
| **Bus** | In-memory (NestJS EventBus) | Redis Pub/Sub o BullMQ |
| **Consistencia** | Síncrono / transaccional | Eventual |
| **Ejemplo** | `ReservationConfirmed` | `PaymentProcessed` → facturación |

En el monolito usamos principalmente **domain events in-memory**.

## Flujo completo

```
1. Use Case ejecuta lógica de dominio
2. Entidad acumula domain events (addEvent)
3. Repositorio guarda entidad → publishes events
4. Event handlers en otros módulos reaccionan

ReservationConfirmed
  → GamificationHandler: calcular XP
  → NotificationHandler: push al atleta
  → MetricsHandler: registrar asistencia
```

## Implementación con NestJS EventBus

```ts
// 1. Domain event
export class ReservationConfirmed {
  constructor(
    readonly reservationId: string,
    readonly memberId: string,
    readonly gymId: string,
    readonly occurredAt = new Date()
  ) {}
}

// 2. Entidad acumula eventos
class Reservation extends AggregateRoot {
  confirm() {
    this.status = 'confirmed'
    this.apply(new ReservationConfirmed(this.id, this.memberId, this.gymId))
  }
}

// 3. Use case publica
await this.publisher.mergeObjectContext(reservation)
reservation.confirm()
await this.repo.save(reservation)
reservation.commit()  // publica los eventos

// 4. Handler en otro módulo
@EventsHandler(ReservationConfirmed)
export class AwardXpOnConfirmation implements IEventHandler<ReservationConfirmed> {
  async handle(event: ReservationConfirmed) {
    await this.gamification.awardXp(event.memberId, event.gymId, 'reservation_confirmed')
  }
}
```

## Cuándo usar eventos vs llamadas directas

**Usar evento cuando:**
- El módulo receptor es un efecto secundario (no el flujo principal)
- Puede fallar sin romper el flujo (log, métricas, notificaciones)
- Múltiples módulos escuchan el mismo hecho

**Llamada directa cuando:**
- Necesitas la respuesta para continuar (validación de plan al reservar)
- Es parte del mismo aggregate / use case

## Eventos del proyecto

| Evento | Publicado por | Escuchado por |
|--------|--------------|---------------|
| `ReservationConfirmed` | Reservas | Gamificación, Notificaciones |
| `ReservationAutoCancelled` | Reservas (job) | Notificaciones, Waitlist |
| `NoShowRecorded` | Reservas | Gamificación |
| `AttendanceCheckedIn` | Reservas | Gamificación, Métricas, Reseñas |
| `PaymentConfirmed` | Pagos | Membresías, Facturación, Notificaciones |
| `SessionCancelled` | Calendario | Reservas, Notificaciones |

## Recursos
- [NestJS CQRS module](https://docs.nestjs.com/recipes/cqrs)
- *Implementing Domain-Driven Design* cap. 8 — Vaughn Vernon
