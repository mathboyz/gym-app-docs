# Preguntas Abiertas y Decisiones Pendientes

## Roles y superficies

- [ ] **¿Un owner/coach puede tener simultáneamente rol de atleta en su propio gym?**
  Ej. el dueño quiere aparecer en el ranking de gamificación y reservar clases como cualquier miembro.
  Opciones: un solo `member` record con rol `owner` que tiene acceso a ambas superficies / dos records separados (uno como owner, uno como athlete).
  Impacta: modelo de `members`, lógica de auth, qué muestra la app mobile según el usuario.

## Reservas

- [ ] **¿Con cuánta anticipación se puede reservar un horario?**
  Opciones: solo 24h antes / hasta 1 semana / configurable por gimnasio.
  Impacta: lógica de calendario, notificaciones, UI de la app atleta.

## Gamificación

- [ ] **¿Qué comportamientos concretos se quieren incentivar?**
  Opciones: asistencia, PRs registrados, racha semanal, participación en desafíos.
  Impacta: diseño del sistema de XP y misiones.

- [ ] **¿El ranking es por gym o global entre todos los gyms?**

- [ ] **¿El feed social (whiteboard) es por gym o cross-gym?**

## Multi-tenant / Multi-gimnasio

- [ ] **¿Un atleta puede tener plan activo en más de un gym simultáneamente?**

- [ ] **¿El branding por gym aplica solo a colores/logo o también a nombres de secciones?**

## Pagos

- [ ] **¿Facturación electrónica desde el inicio o es v2?**

- [ ] **¿Se maneja cobro recurrente automático o solo recordatorio manual?**

## Anti no-shows

- [ ] **¿Cuál es el mecanismo? ¿Penalización (bloqueo temporal), cobro, o solo tracking?**
  Impacta: modelo de reservas y configuración por gym.

## WhatsApp

- [ ] **¿Es diferenciador del MVP o es v2?**
  Costo de Twilio puede ser relevante para gyms pequeños.
