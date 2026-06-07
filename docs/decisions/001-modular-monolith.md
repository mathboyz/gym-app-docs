# ADR 001 — Modular Monolith sobre Microservicios

**Estado:** Aceptado

## Contexto

Al inicio del proyecto hay que decidir la arquitectura del backend: microservicios desde el día 1, monolito clásico, o algo intermedio.

## Decisión

**Modular Monolith con NestJS**, con arquitectura interna DDD + Hexagonal (ports & adapters) + Event-driven.

## Razones

- Un equipo de 4 personas no necesita la complejidad operacional de microservicios
- Los módulos con fronteras claras (DDD + hexagonal) permiten extraer servicios cuando haya necesidad real, sin reescribir
- El event bus interno (`ReservaCreada`, `PagoVencido`, etc.) facilita la futura extracción
- Menos infraestructura que mantener en etapas tempranas

## Consecuencias

- Cada bounded context vive en su carpeta con `domain / application / infrastructure`
- La comunicación entre módulos es solo via eventos de dominio o interfaces públicas — nunca imports directos entre capas de dominio de distintos módulos
- Cuando un módulo justifique escalar independientemente, tiene todo lo necesario para extraerse
