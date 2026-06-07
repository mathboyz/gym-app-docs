# Módulo: Clientes

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲

---

## Funcionalidades

- CRUD de clientes
- Ciclo de vida: activar / desactivar / congelar / dar de baja
- Perfil 360: asistencia, pagos, plan, progreso
- Búsqueda y filtros (por plan, estado, vencimiento, morosos)
- Acciones masivas (asignar plan, notificar, exportar)
- Comunicación individual (correo / recordatorios)
- Importación de clientes (desde otros sistemas)

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| ID | UUID | |
| RUT | string | Validación formato chileno |
| Nombres | string | |
| Apellidos | string | |
| Correo | string | |
| Número | string | |
| Fecha de nacimiento | date | Obligatoria → habilita cumpleaños + categorías etarias |
| Género | enum | |
| Foto de perfil | url | |
| Plan asignado | FK | + fecha de vencimiento |
| Estado | enum | activo / inactivo / congelado / moroso |
| Fecha de ingreso | date | |
| Contacto de emergencia | object | nombre + teléfono |
| Saldo a favor | decimal | |

## Conexiones

- **Planes** → plan asignado y vencimiento definen el estado del cliente
- **Pagos** → historial de pagos, morosidad
- **Calendario / Reservas** → asistencia, no-shows
- **Gamificación** → XP, badges, misiones del atleta
- **Métricas** → progreso físico (pesos, tiempos, etc.)
- **Mensajes** → recordatorios y campañas de comunicación
