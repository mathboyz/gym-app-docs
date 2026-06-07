# Módulo: Mensajes / Notificaciones

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin/instructor envía) · App Mobile (atleta recibe)

---

## Funcionalidades

- Admin envía anuncio a todos los miembros (push)
- Instructor envía anuncio solo a miembros de su clase
- Notificaciones automáticas del sistema:
  - Cancelación de clase
  - Cambio de instructor
  - Bloqueo de slot
  - Cupo libre (lista de espera)
- Historial de mensajes enviados
- Estado de entrega por mensaje (enviado / leído / fallido)
- Plantillas de mensaje predefinidas
- Programar envío futuro (scheduled)
- Filtrar destinatarios (todos / por clase / por plan)

## Campos

| Campo | Notas |
|-------|-------|
| Remitente | `admin` o `instructor` |
| Tipo | `manual` (anuncio) o `system` (notificación automática) |
| Destinatarios | todos / por clase / por plan |
| Título | |
| Cuerpo | |
| Canal | `push`, `email`, `whatsapp` |
| Fecha y hora de envío | inmediato o programado |
| Estado | `draft`, `sent`, `failed` |

## Conexiones

- **Miembros** → destinatarios filtrados por plan o estado
- **Calendario** → disparadores automáticos (cancelación, cambio de instructor, bloqueo)
- **Reservas** → aviso de cupo libre al siguiente en lista de espera
- **Planes** → filtro de destinatarios por plan
