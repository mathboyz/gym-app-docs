# Drizzle ORM

**Categoría:** ORM · **Prioridad:** 🔴 Alta

---

## Por qué importa en este proyecto

Es la capa entre NestJS y PostgreSQL. Tipado end-to-end desde el schema hasta los resultados de queries, migrations controladas, y compatibilidad nativa con RLS de Supabase.

## Temas clave

### Definir schema
```ts
import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const reservationStatusEnum = pgEnum('reservation_status', [
  'pending_confirmation', 'confirmed', 'auto_cancelled',
  'cancelled', 'no_show', 'waitlist',
])

export const reservations = pgTable('reservations', {
  id:                    uuid('id').primaryKey().defaultRandom(),
  gymId:                 uuid('gym_id').notNull().references(() => gyms.id),
  classSessionId:        uuid('class_session_id').notNull(),
  memberId:              uuid('member_id').notNull(),
  status:                reservationStatusEnum('status').notNull().default('pending_confirmation'),
  confirmationDeadline:  timestamp('confirmation_deadline'),
  confirmedAt:           timestamp('confirmed_at'),
  cancelledAt:           timestamp('cancelled_at'),
  createdAt:             timestamp('created_at').defaultNow().notNull(),
  updatedAt:             timestamp('updated_at').defaultNow().notNull(),
})
```

### Queries tipadas
```ts
// SELECT con filtros
const active = await db
  .select()
  .from(reservations)
  .where(
    and(
      eq(reservations.classSessionId, sessionId),
      inArray(reservations.status, ['confirmed', 'pending_confirmation'])
    )
  )

// JOIN
const result = await db
  .select({ reservation: reservations, member: members })
  .from(reservations)
  .innerJoin(members, eq(reservations.memberId, members.id))
  .where(eq(reservations.gymId, gymId))
```

### Mutations
```ts
// INSERT
await db.insert(reservations).values({
  gymId, classSessionId, memberId,
  status: 'pending_confirmation',
  confirmationDeadline: deadline,
})

// UPDATE
await db
  .update(reservations)
  .set({ status: 'confirmed', confirmedAt: new Date() })
  .where(eq(reservations.id, reservationId))
```

### Transactions
```ts
await db.transaction(async (tx) => {
  const [count] = await tx
    .select({ cnt: count() })
    .from(reservations)
    .where(
      and(
        eq(reservations.classSessionId, sessionId),
        inArray(reservations.status, ['confirmed', 'pending_confirmation'])
      )
    )
    .for('update')  // lock

  if (count.cnt >= capacity) throw new NoSpotsAvailableError()

  await tx.insert(reservations).values({ ... })
})
```

### Migrations
```bash
# Generar migration a partir del schema
npx drizzle-kit generate

# Aplicar migrations
npx drizzle-kit migrate
```

### RLS — setear el contexto del tenant
```ts
// Wrapper que setea gym_id antes de cada query
async function withTenant<T>(gymId: string, fn: () => Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`SET LOCAL app.current_gym_id = ${gymId}`)
    return fn()
  })
}
```

## Recursos
- [Drizzle docs](https://orm.drizzle.team/docs/overview)
- [Drizzle + NestJS](https://orm.drizzle.team/docs/guides/nestjs)
