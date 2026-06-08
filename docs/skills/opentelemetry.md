# OpenTelemetry

**Categoría:** Observabilidad · **Prioridad:** 🟢 Baja

---

## Por qué importa en este proyecto

En producción necesitan saber qué está fallando y por qué. OpenTelemetry da trazas distribuidas (qué pasó en cada request), métricas (latencia, error rate) y logs estructurados. Stack: OTel → Grafana + Sentry.

## Stack de observabilidad

```
App (OTel SDK)
  → OpenTelemetry Collector
    → Grafana Tempo (trazas)
    → Prometheus (métricas)
    → Grafana Loki (logs)
  → Sentry (errores + performance)
  → PostHog (analytics de producto)
```

## Setup básico en NestJS

```ts
// tracing.ts — debe importarse ANTES que cualquier otra cosa
import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'gym-app-api',
})

sdk.start()
```

```ts
// main.ts
import './tracing'  // primero
import { NestFactory } from '@nestjs/core'
```

## Spans personalizados

```ts
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('reservations')

async function confirmReservation(id: string) {
  return tracer.startActiveSpan('reservation.confirm', async (span) => {
    span.setAttributes({ 'reservation.id': id })
    try {
      const result = await doConfirm(id)
      span.setStatus({ code: SpanStatusCode.OK })
      return result
    } catch (err) {
      span.recordException(err)
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw err
    } finally {
      span.end()
    }
  })
}
```

## Qué instrumentar automáticamente

Con `getNodeAutoInstrumentations()` se instrumenta automáticamente:
- HTTP requests (entrada y salida)
- PostgreSQL queries (pg / drizzle)
- Redis commands (ioredis)
- BullMQ jobs

## Recursos
- [OpenTelemetry Node.js](https://opentelemetry.io/docs/languages/js/)
- [Grafana + OTel](https://grafana.com/docs/grafana/latest/datasources/tempo/)
- [Sentry NestJS](https://docs.sentry.io/platforms/javascript/guides/nestjs/)
