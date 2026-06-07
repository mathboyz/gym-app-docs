# Módulo: Calendario

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin gestiona) · App Mobile (atleta ve para reservar)

---

## Funcionalidades

- Crear / editar / cancelar / bloquear sesiones
- Múltiples clases en el mismo horario (ej. CrossFit y Gimnasia a la vez)
- Duplicar horario en la semana
- Recurrencia avanzada (quincenal, mensual, skip feriados)
- Ocultar días en el calendario
- Bloquear horarios y días específicos
- Detección de conflictos de instructor (alerta si doble-agendado)
- Notificación automática al cancelar / bloquear un slot
- Lista de espera visible en el slot (cuando cupo lleno)
- Historial de cambios del slot (audit log)
- Vistas: diaria / semanal / mensual
- Render con color del tipo de clase

## Campos

| Campo | Notas |
|-------|-------|
| Tipo de clase | hereda color, cupos y política de reserva |
| Instructor / Coach | nullable |
| Fecha y hora de inicio | |
| Duración | en minutos |
| Estado | `scheduled`, `in_progress`, `completed`, `cancelled`, `blocked` |
| Cupos override | nullable — sobreescribe el default del tipo de clase |
| Cupos usados / máximo | calculado en tiempo real |

## Conexiones

- **Tipo de Clases** → hereda color, cupos, planes permitidos y política de reserva
- **Reservas** → cada sesión tiene sus reservas y lista de espera
- **Rutinas** → se asigna una rutina del día a la sesión
- **Miembros** → el instructor es un member con rol coach
- **Notificaciones** → aviso automático al cancelar / bloquear
