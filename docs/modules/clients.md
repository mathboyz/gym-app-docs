# Módulo: Clientes

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard

---

## Funcionalidades

- CRUD de miembros
- Ciclo de vida: activar / desactivar / congelar / dar de baja
- Perfil 360: asistencia, pagos, plan, progreso
- Búsqueda y filtros (por plan, estado, vencimiento, morosos)
- Acciones masivas (asignar plan, notificar, exportar)
- Comunicación individual (correo / recordatorios)
- Importar / exportar (XML)
- Adjuntar documentos (cert. médico, contrato, waiver)
- Template de correo de activación
- Auditoría de cambios
- Soft delete + anonimización (Ley 19.628)

## Flujo de registro

1. Admin ingresa email + datos básicos del miembro
2. Sistema crea el `member` en estado `pending` y envía email de invitación
3. Atleta acepta la invitación y completa su perfil (nombre, teléfono, fecha de nacimiento, etc.)
4. `member` pasa a estado `active`

## Campos

| Campo | Ingresado por | Notas |
|-------|--------------|-------|
| Email | Admin | identificador único dentro del gym |
| Rol | Admin | `owner`, `coach`, `athlete` |
| RUT | Admin / Atleta | validación formato chileno |
| Nombres / Apellidos | Atleta | se completa al aceptar invitación |
| Teléfono | Atleta | |
| Fecha de nacimiento | Atleta | obligatoria → habilita cumpleaños + categorías etarias |
| Género | Atleta | |
| Foto de perfil | Atleta | |
| Plan asignado + vencimiento | Admin | |
| Estado | Sistema | `pending`, `active`, `inactive`, `frozen` |
| Fecha de ingreso | Sistema | cuando el admin crea el registro |
| Contacto de emergencia | Atleta | nombre + teléfono |
| Salud / PAR-Q | Atleta | lesiones, condiciones, cert. médico |
| Cómo llegó | Admin | `referral`, `social_media`, `walk_in`, `other` |
| Notas internas | Admin | no visibles para el atleta |
| Tags / etiquetas | Admin | |
| Documentos adjuntos | Admin | cert. médico, contrato, waiver |

## Conexiones

- **Planes** → plan asignado y vencimiento definen el estado del miembro
- **Pagos** → historial de pagos, morosidad
- **Calendario / Reservas** → asistencia, no-shows
- **Gamificación** → XP, badges, misiones del atleta
- **Métricas** → progreso físico (PRs, tiempos)
- **Mensajes** → recordatorios y campañas
