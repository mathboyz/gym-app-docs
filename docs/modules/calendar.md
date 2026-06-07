# Módulo: Calendario

**Estado:** Funcionalidades 🔲 · Campos 🔲 · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲

---

> Pendiente de definición en Miro.

## Lo que se sabe hasta ahora

- Múltiples clases pueden ocurrir en el mismo horario (ej. CrossFit y Gimnasia a la vez)
- Se puede duplicar un horario para toda la semana
- Se pueden ocultar días en el calendario
- Se pueden bloquear horarios y días específicos

## Campos (preliminares)

| Campo | Tipo | Notas |
|-------|------|-------|
| Horario | datetime | |
| Tipo de Clase | FK | |
| Estado | enum | activo / bloqueado |

## Preguntas abiertas

Ver `open-questions.md` — sección Reservas.
