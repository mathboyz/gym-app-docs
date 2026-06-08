# Redis

**Categoría:** Cache / Pub-Sub · **Prioridad:** 🟡 Media

---

## Por qué importa en este proyecto

BullMQ usa Redis como backend. Además: caché de cupos en tiempo real (los atletas ven disponibilidad constantemente), rate limiting de endpoints, y sesiones.

## Casos de uso en el proyecto

| Uso | Descripción |
|-----|-------------|
| **BullMQ backend** | Cola de jobs para confirmaciones, cobros, NPS |
| **Caché de cupos** | Disponibilidad de clases en tiempo real — evita hits constantes a PG |
| **Rate limiting** | Limitar reservas, intentos de login, push notifications |
| **Lock distribuido** | Evitar race conditions al reservar el último cupo |

## Caché de cupos en tiempo real

```ts
const CUPOS_TTL = 30 // segundos

async function getAvailableSlots(sessionId: string): Promise<number> {
  const cached = await redis.get(`slots:${sessionId}`)
  if (cached) return parseInt(cached)

  const slots = await db.query.calculateAvailableSlots(sessionId)
  await redis.setex(`slots:${sessionId}`, CUPOS_TTL, slots.toString())
  return slots
}

// Invalidar al reservar o cancelar
async function invalidateSlots(sessionId: string) {
  await redis.del(`slots:${sessionId}`)
}
```

## Lock distribuido (reserva del último cupo)

```ts
import Redlock from 'redlock'

const redlock = new Redlock([redis])

async function reserveSpot(sessionId: string, memberId: string) {
  const lock = await redlock.acquire([`lock:session:${sessionId}`], 5000)
  try {
    // Verificar cupos dentro del lock
    const available = await getAvailableSlots(sessionId)
    if (available <= 0) throw new NoSpotsAvailableError()
    await createReservation(sessionId, memberId)
    await invalidateSlots(sessionId)
  } finally {
    await lock.release()
  }
}
```

## Rate limiting

```ts
// Con ioredis + sliding window
async function checkRateLimit(key: string, limit: number, windowSec: number) {
  const now = Date.now()
  const windowStart = now - windowSec * 1000
  await redis.zremrangebyscore(key, 0, windowStart)
  const count = await redis.zcard(key)
  if (count >= limit) throw new RateLimitExceededError()
  await redis.zadd(key, now, `${now}`)
  await redis.expire(key, windowSec)
}
```

## Recursos
- [ioredis](https://github.com/redis/ioredis)
- [Redlock](https://github.com/mike-marcacci/node-redlock) — distributed locks
- [BullMQ](https://docs.bullmq.io/) — usa Redis internamente
