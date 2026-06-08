# BullMQ

**Categoría:** Queues / Jobs · **Prioridad:** 🔴 Alta

---

## Por qué importa en este proyecto

El flujo de reservas depende 100% de jobs: enviar push de confirmación X horas antes, auto-cancelar si no responde, cobros automáticos, reintentos. Si los jobs fallan, la experiencia se rompe.

## Casos de uso en el proyecto

| Job | Cuándo se agenda | Qué hace |
|-----|-----------------|----------|
| `send-confirmation-request` | Al crear reserva | Push X horas antes pidiendo confirmar |
| `auto-cancel-reservation` | Al crear reserva | Cancela si no se confirmó antes del deadline |
| `subscription-billing` | Al vencer membresía | Genera cobro automático |
| `billing-retry` | Al fallar cobro | Reintenta N veces con backoff |
| `nps-survey-trigger` | Al registrar asistencia | Push de encuesta post-clase |
| `session-reminder` | Al reservar | Recordatorio N horas antes de la clase |

## Patrones clave

### Delayed jobs (el más importante aquí)
```ts
// Al crear reserva → agenda push para 24h antes de la clase
await confirmationQueue.add(
  'send-confirmation-request',
  { reservationId: reservation.id },
  { delay: msUntil24hBefore, jobId: `confirm-${reservation.id}` }
)

// Al crear reserva → agenda auto-cancel para el deadline
await confirmationQueue.add(
  'auto-cancel-reservation',
  { reservationId: reservation.id },
  { delay: msUntilDeadline, jobId: `autocancel-${reservation.id}` }
)
```

### Cancelar jobs si ya no aplican
```ts
// El atleta confirmó → cancelar el auto-cancel job
const job = await confirmationQueue.getJob(`autocancel-${reservationId}`)
await job?.remove()
```

### Reintentos con backoff exponencial
```ts
await billingQueue.add('charge-subscription', payload, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 * 60 * 60 * 48 }, // 48h entre reintentos
})
```

### Worker
```ts
const worker = new Worker('reservations', async (job) => {
  switch (job.name) {
    case 'send-confirmation-request':
      await sendConfirmationPush(job.data.reservationId)
      break
    case 'auto-cancel-reservation':
      await autoCancelReservation(job.data.reservationId)
      break
  }
}, { connection: redisConnection })

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Job failed')
})
```

### Idempotencia
Los jobs deben ser idempotentes — si se ejecutan dos veces, el resultado debe ser el mismo. Verificar el estado actual antes de actuar:
```ts
async function autoCancelReservation(reservationId: string) {
  const reservation = await repo.findById(reservationId)
  // Si ya fue confirmada o cancelada → no hacer nada
  if (reservation.status !== 'pending_confirmation') return
  await reservation.autoCancel()
  await repo.save(reservation)
}
```

## Recursos
- [BullMQ docs](https://docs.bullmq.io/)
- [BullMQ + NestJS](https://docs.nestjs.com/techniques/queues)
