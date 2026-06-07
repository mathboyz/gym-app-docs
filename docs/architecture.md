# Arquitectura y Stack

## Decisión general

**Modular Monolith** con NestJS, diseñado para extraer microservicios cuando haya necesidad real. No se sobre-ingeniería desde el inicio pero se dejan las costuras correctas.

## Stack

### Backend
| Capa | Tecnología |
|------|-----------|
| Framework | NestJS |
| Arquitectura | DDD + Hexagonal (ports & adapters) + Event-driven |
| Monorepo | Nx |
| API | REST + OpenAPI (cliente typesafe generado) |
| ORM | Drizzle |
| Base de datos | PostgreSQL — multi-tenant con RLS + `tenant_id` |
| Cache / Colas | Redis + BullMQ |
| Auth | Supabase Auth |

### Frontend
| Superficie | Tecnología | Usuarios |
|------------|-----------|----------|
| Web Dashboard | Next.js + Tailwind + shadcn/ui | Dueño / Admin / Coach — **crea y configura**: miembros, clases, calendario, planes, pagos, rutinas, gamificación |
| App Mobile (iOS + Android) | React Native (Expo) | Miembros (atletas) — **experimenta y consume**: reservas, rutinas del día, XP, misiones, ranking. El dueño puede usarla también como miembro de su propio gym |

### Servicios externos
| Propósito | Servicio |
|-----------|---------|
| Pagos | MercadoPago · Khipu · Flow |
| Push / Email | Expo Push · Resend / Brevo |
| WhatsApp | Twilio (opcional) |
| IA (rutinas) | OpenAI / Anthropic |
| Infra | Docker → Cloud Run (GCP) → K8s |
| Observabilidad | OpenTelemetry · Sentry · PostHog · Grafana |

## Multi-tenant

Cada gimnasio es un tenant. Un atleta puede pertenecer a múltiples gyms.
- Aislamiento por `tenant_id` en todas las tablas
- RLS en PostgreSQL como segunda línea de defensa
- Branding configurable por gym en la app mobile

## Event-driven

Los módulos se comunican via eventos de dominio internos. Ejemplos:
- `ReservaCreada` → Gamificación, Métricas, Notificaciones
- `PagoVencido` → estado moroso en Clientes
- `ClaseCompletada` → XP en Gamificación

## Estructura de módulos (bounded contexts)

Cada módulo tiene: `domain` · `application` · `infrastructure`

```
src/
  clients/
  class-types/
  calendar/
  reservations/
  plans/
  payments/
  gamification/
  metrics/
  notifications/
  routines/
```

## Convenciones

- Código en **inglés**
- Conversación y docs en **español chileno**
- API REST documentada con OpenAPI, cliente typesafe generado automáticamente
