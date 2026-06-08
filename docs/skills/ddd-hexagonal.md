# DDD + Arquitectura Hexagonal

**Categoría:** Arquitectura · **Prioridad:** 🔴 Alta

---

## Por qué importa en este proyecto

Es la columna vertebral del diseño. El dominio (reglas de negocio) no depende del framework ni de la base de datos. Cambiar Drizzle por otra ORM, o NestJS por Express, no debería tocar el dominio.

## DDD — conceptos aplicados

### Entidades y Value Objects
```ts
// Entidad — tiene identidad
class Reservation {
  constructor(
    readonly id: ReservationId,
    private status: ReservationStatus,
    private confirmationDeadline: Date | null,
  ) {}

  confirm(): void {
    if (this.status !== 'pending_confirmation') throw new DomainError(...)
    this.status = 'confirmed'
    this.addEvent(new ReservationConfirmed(this.id))
  }
}

// Value Object — no tiene identidad, se compara por valor
class Money {
  constructor(readonly amount: number, readonly currency: 'CLP') {}
  equals(other: Money) { return this.amount === other.amount }
}
```

### Aggregates
Un aggregate es el límite de consistencia. Todo cambia a través del aggregate root.
```
Reservation (aggregate root)
  └── no tiene sub-entidades en este caso — es simple
```

### Domain Events
```ts
class ReservationConfirmed {
  constructor(
    readonly reservationId: ReservationId,
    readonly occurredAt: Date = new Date()
  ) {}
}

// La entidad acumula eventos → se publican al guardar (Unit of Work)
```

### Repositorios (ports)
```ts
// En domain/ — solo la interface
interface ReservationRepository {
  findById(id: ReservationId): Promise<Reservation | null>
  findBySession(sessionId: ClassSessionId): Promise<Reservation[]>
  save(reservation: Reservation): Promise<void>
}
```

### Application Services / Use Cases
```ts
class ConfirmReservationUseCase {
  constructor(
    private repo: ReservationRepository,
    private events: EventBus,
  ) {}

  async execute(cmd: ConfirmReservationCommand): Promise<void> {
    const reservation = await this.repo.findById(cmd.reservationId)
    if (!reservation) throw new NotFoundError()
    reservation.confirm()
    await this.repo.save(reservation)
    await this.events.publishAll(reservation.pullEvents())
  }
}
```

## Hexagonal — Ports & Adapters

```
┌─────────────────────────────────────────┐
│              APPLICATION                 │
│  ┌──────────────────────────────────┐   │
│  │           DOMAIN                 │   │
│  │  Entities · VOs · Domain Events  │   │
│  └──────────────────────────────────┘   │
│  Use Cases ←→ Ports (interfaces)        │
└───────┬──────────────────┬──────────────┘
        │ driving          │ driven
   ┌────▼────┐        ┌────▼──────────┐
   │ HTTP    │        │ Drizzle Repo  │
   │ BullMQ  │        │ Redis Cache   │
   │ (input) │        │ MP Gateway    │
   └─────────┘        └───────────────┘
```

- **Driving adapters** — inician acciones: controllers HTTP, consumers de queue
- **Driven adapters** — son invocados por el dominio: repos, gateways externos

## Regla de dependencia

```
domain/ ← application/ ← infrastructure/
```
El dominio no importa nada de fuera. La infraestructura implementa las interfaces del dominio.

## Recursos
- *Domain-Driven Design* — Eric Evans
- *Implementing Domain-Driven Design* — Vaughn Vernon
- [DDD Forum](https://github.com/stemmlerjs/ddd-forum) — referencia open source
