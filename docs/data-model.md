# Modelo de Datos

Entidades del sistema con sus campos. Solo se documentan las entidades con definición completa o parcial.
Las entidades de módulos pendientes (Gamificación) tienen esqueleto.

---

## Auth & Tenancy

### `users`
Cuenta de autenticación. Extiende `auth.users` de Supabase.
El admin crea el `member` con el email — el atleta completa su perfil al aceptar la invitación.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `supabase_auth_id` | UUID UNIQUE | FK a `auth.users` de Supabase |
| `email` | VARCHAR UNIQUE | |
| `first_name` | VARCHAR | completado por el atleta |
| `last_name` | VARCHAR | completado por el atleta |
| `phone` | VARCHAR | nullable |
| `birth_date` | DATE | nullable — habilita cumpleaños y categorías etarias |
| `gender` | ENUM | `male`, `female`, `other`, nullable |
| `avatar_url` | VARCHAR | nullable |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `gyms`
El tenant. Cada gimnasio es un gym. `gym_id` es el `tenant_id` en todo el sistema.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `name` | VARCHAR | |
| `slug` | VARCHAR UNIQUE | para URLs |
| `logo_url` | VARCHAR | nullable |
| `primary_color` | VARCHAR | hex, branding por gym |
| `country` | VARCHAR | default `CL` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `members`
Un `user` dentro de un `gym`. Puede existir en `pending` antes de que el user complete el registro.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | tenant_id |
| `user_id` | UUID FK → users | **nullable** — null hasta que complete el registro |
| `email` | VARCHAR | admin lo ingresa, link para la invitación |
| `role` | ENUM | `owner`, `coach`, `athlete` — determina permisos en el web dashboard, no qué app se usa |
| `status` | ENUM | `pending`, `active`, `inactive`, `frozen` |
| `rut` | VARCHAR | nullable — identificación chilena |
| `emergency_contact_name` | VARCHAR | nullable |
| `emergency_contact_phone` | VARCHAR | nullable |
| `health_parq` | JSONB | nullable — formulario PAR-Q: lesiones, condiciones, cert. médico |
| `how_they_found_us` | ENUM | `referral`, `social_media`, `walk_in`, `other`, nullable |
| `internal_notes` | TEXT | nullable — notas del admin, no visibles para el atleta |
| `tags` | VARCHAR[] | nullable — etiquetas internas |
| `joined_at` | DATE | cuando se creó el registro |
| `deleted_at` | TIMESTAMPTZ | nullable — soft delete (Ley 19.628) |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

UNIQUE: `(gym_id, email)`

#### Nota Ley 19.628
Soft delete + anonimización obligatoria al dar de baja definitiva.
Al anonimizar: `email`, `rut`, `phone`, `health_parq` y datos sensibles se reemplazan por un hash irreversible.

---

### `member_documents`
Documentos adjuntos al miembro (cert. médico, contrato, waiver).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `type` | ENUM | `medical_cert`, `contract`, `waiver`, `other` |
| `file_url` | VARCHAR | |
| `uploaded_at` | TIMESTAMPTZ | |

---

## Clases y Calendario

### `class_types`
Tipos de clase que ofrece el gym (ej. CrossFit, Weightlifting, Yoga).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `description` | TEXT | nullable |
| `color` | VARCHAR | hex |
| `icon_url` | VARCHAR | nullable |
| `capacity` | INTEGER | cupos por sesión (default) |
| `overbooking_limit` | INTEGER | sobrecupo, default 0 |
| `status` | ENUM | `active`, `inactive`, `archived` |
| `reservation_policy` | JSONB | nullable — override de la política global del gym |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `class_type_plan_permissions`
Qué planes tienen acceso a cada tipo de clase. Se gestiona desde el módulo Planes — el tipo de clase solo lo lee.

| Campo | Tipo |
|-------|------|
| `class_type_id` | UUID FK → class_types |
| `plan_id` | UUID FK → plans |

PK: `(class_type_id, plan_id)`

---

### `class_type_categories`
Categorías dentro de un tipo de clase (ej. Strength, WOD, Mobility dentro de CrossFit).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_type_id` | UUID FK → class_types | |
| `name` | VARCHAR | |
| `order` | INTEGER | orden de presentación |

---

### `class_sessions`
Instancia concreta en el calendario (día + hora + tipo de clase).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_type_id` | UUID FK → class_types | |
| `coach_id` | UUID FK → members | nullable |
| `starts_at` | TIMESTAMPTZ | |
| `ends_at` | TIMESTAMPTZ | |
| `duration_minutes` | INTEGER | derivado de starts_at/ends_at, útil para queries |
| `capacity_override` | INTEGER | nullable — sobreescribe el capacity del class_type |
| `status` | ENUM | `scheduled`, `in_progress`, `completed`, `cancelled`, `blocked` |
| `recurrence_type` | ENUM | `once`, `weekly`, `biweekly`, `monthly` |
| `recurrence_days` | INTEGER[] | nullable — días de la semana (0=dom…6=sáb), aplica si weekly/biweekly |
| `recurrence_ends_at` | DATE | nullable — fecha fin de recurrencia |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `reservations`
Un member reserva un class_session. El flujo requiere confirmación explícita antes de la clase.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_session_id` | UUID FK → class_sessions | |
| `member_id` | UUID FK → members | |
| `status` | ENUM | `pending_confirmation`, `confirmed`, `auto_cancelled`, `cancelled`, `no_show`, `waitlist` |
| `waitlist_position` | INTEGER | nullable |
| `confirmation_deadline` | TIMESTAMPTZ | nullable — cuándo expira el plazo para confirmar |
| `confirmed_at` | TIMESTAMPTZ | nullable |
| `cancelled_at` | TIMESTAMPTZ | nullable |
| `cancellation_source` | ENUM | nullable: `member`, `admin`, `system` |
| `promoted_from_waitlist_at` | TIMESTAMPTZ | nullable — audit trail |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

UNIQUE: `(class_session_id, member_id)`

**Flujo:** reserva → `pending_confirmation` → push X horas antes → atleta confirma → `confirmed`. Si no confirma en el plazo → `auto_cancelled`, cupo liberado. Una reserva `confirmed` no puede ser cancelada por el atleta.

---

### `attendances`
Confirmación de asistencia efectiva a una sesión.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_session_id` | UUID FK → class_sessions | |
| `member_id` | UUID FK → members | |
| `reservation_id` | UUID FK → reservations | nullable — puede asistir sin reserva |
| `checked_in_at` | TIMESTAMPTZ | |

---

## Ejercicios y Rutinas

### `exercises`
Glosario de ejercicios. Pueden ser globales del sistema o propios del gym.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | nullable — null = ejercicio global del sistema |
| `name_es` | VARCHAR | requerido si no hay `name_en` |
| `name_en` | VARCHAR | requerido si no hay `name_es` |
| `description` | TEXT | nullable |
| `video_url` | VARCHAR | nullable — YouTube / Vimeo |
| `image_url` | VARCHAR | nullable — thumbnail de referencia |
| `muscle_group` | VARCHAR | nullable |
| `difficulty` | ENUM | nullable: `beginner`, `intermediate`, `advanced` |
| `equipment` | VARCHAR[] | nullable: `barbell`, `dumbbell`, `none`, etc. |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `routines`
Rutina asignada a una sesión del calendario.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `category_id` | UUID FK → class_type_categories | |
| `class_session_id` | UUID FK → class_sessions | nullable |
| `name` | VARCHAR | nullable |
| `notes` | TEXT | nullable |
| `created_at` | TIMESTAMPTZ | |

---

### `routine_exercises`
Ejercicios dentro de una rutina con su prescripción.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `routine_id` | UUID FK → routines | |
| `exercise_id` | UUID FK → exercises | |
| `order` | INTEGER | |
| `sets` | INTEGER | nullable |
| `reps` | VARCHAR | nullable — VARCHAR porque puede ser "21-15-9" o "AMRAP" |
| `duration_seconds` | INTEGER | nullable |
| `notes` | VARCHAR | nullable |

---

### `personal_records`
PR de un member en un ejercicio.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `exercise_id` | UUID FK → exercises | |
| `value` | DECIMAL | |
| `unit` | ENUM | `kg`, `lb`, `seconds`, `reps`, `meters` |
| `recorded_at` | DATE | |
| `created_at` | TIMESTAMPTZ | |

---

---

## Planes, Membresías y Pagos

### `plans`
Catálogo de membresías que ofrece el gym.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `description` | TEXT | nullable |
| `type` | ENUM | `class_bundle`, `unlimited` |
| `periodicity` | ENUM | `monthly`, `quarterly`, `biannual`, `annual` |
| `price_clp` | INTEGER | precio en pesos chilenos |
| `class_quota` | INTEGER | nullable — null = ilimitado |
| `allows_freeze` | BOOLEAN | default false |
| `renewal` | ENUM | `manual`, `automatic` |
| `grace_period_days` | INTEGER | default 0 |
| `status` | ENUM | `active`, `inactive`, `archived` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `memberships`
Membresía activa (o histórica) de un miembro en un gym.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `plan_id` | UUID FK → plans | |
| `status` | ENUM | `active`, `frozen`, `cancelled`, `expired` |
| `starts_at` | DATE | |
| `ends_at` | DATE | vencimiento del período actual |
| `classes_used` | INTEGER | clases consumidas en el período actual |
| `frozen_at` | TIMESTAMPTZ | nullable |
| `frozen_until` | DATE | nullable |
| `freeze_reason` | TEXT | nullable |
| `cancelled_at` | TIMESTAMPTZ | nullable |
| `renewal` | ENUM | `manual`, `automatic` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `payments`
Registro de cada cobro / pago.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `membership_id` | UUID FK → memberships | nullable |
| `amount_clp` | INTEGER | |
| `method` | ENUM | `manual`, `mercadopago`, `khipu`, `flow` |
| `status` | ENUM | `pending`, `paid`, `failed`, `refunded` |
| `paid_at` | TIMESTAMPTZ | nullable |
| `due_date` | DATE | |
| `reference` | VARCHAR | nullable — comprobante externo |
| `dte_url` | VARCHAR | nullable — boleta/factura electrónica SII |
| `notes` | TEXT | nullable |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

## Métricas y Progreso

### `physical_progress_records`
Registro periódico de medidas corporales del atleta.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `recorded_at` | DATE | |
| `height_cm` | DECIMAL | nullable |
| `weight_kg` | DECIMAL | nullable |
| `waist_cm` | DECIMAL | nullable |
| `hip_cm` | DECIMAL | nullable |
| `chest_cm` | DECIMAL | nullable |
| `thigh_cm` | DECIMAL | nullable |
| `arm_cm` | DECIMAL | nullable |
| `body_fat_pct` | DECIMAL | nullable |
| `photo_url` | VARCHAR | nullable |
| `created_at` | TIMESTAMPTZ | |

---

---

## Configuración

### `gym_branding` (1:1 por tenant)

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | UNIQUE |
| `logo_url` | VARCHAR | nullable |
| `logo_dark_url` | VARCHAR | nullable |
| `color_primary` | VARCHAR | hex |
| `color_background` | VARCHAR | hex |
| `color_foreground` | VARCHAR | hex |
| `color_button` | VARCHAR | hex |
| `color_button_text` | VARCHAR | hex |
| `color_accent` | VARCHAR | hex |
| `color_success` | VARCHAR | hex |
| `color_error` | VARCHAR | hex |
| `updated_at` | TIMESTAMPTZ | |
| `updated_by` | UUID FK → users | |

### `professionals`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `photo_url` | VARCHAR | nullable |
| `email` | VARCHAR | nullable |
| `phone` | VARCHAR | nullable |
| `bio` | TEXT | nullable |
| `specialties` | VARCHAR[] | nullable |
| `status` | ENUM | `active`, `inactive` |
| `created_at` | TIMESTAMPTZ | |

---

## Gamificación

### `member_gamification` (perfil por atleta)

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | UNIQUE per gym |
| `xp_total` | INTEGER | acumulado histórico |
| `level` | INTEGER | calculado a partir de XP |
| `rank` | ENUM | `bronze`, `silver`, `gold`, `platinum`, `diamond` |
| `competition_score` | INTEGER | temporada actual |
| `current_streak` | INTEGER | racha actual |
| `updated_at` | TIMESTAMPTZ | |

### `missions`, `member_missions`, `badges`, `member_badges`
> Esquema detallado pendiente de definición (curva de niveles PENDIENTE).

---

## Competencias

### `competitions`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `type` | ENUM | `tournament`, `weekly_league`, `benchmark_leaderboard` |
| `status` | ENUM | `draft`, `open`, `in_progress`, `finished` |
| `eligibility` | JSONB | nivel, plan(es), género, edad, sede |
| `registration_mode` | ENUM | `open`, `invite`, `admin` |
| `scoring_system` | JSONB | |
| `prizes` | JSONB | puntaje + badges + XP + premios externos |
| `created_at` | TIMESTAMPTZ | |

Tablas relacionadas: `competition_categories`, `competition_heats`, `competition_wods`, `competition_results`, `competition_judges`, `competition_registrations`

---

## Reseñas (NPS)

### `surveys`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `title` | VARCHAR | |
| `is_anonymous` | BOOLEAN | si true → `athlete_id = null` en respuestas |
| `status` | ENUM | `active`, `inactive` |
| `created_by` | UUID FK → users | |

Tablas relacionadas: `survey_questions`, `survey_triggers`, `survey_responses`, `survey_answers`, `survey_templates`

> Disparador: `attendance.status = attended` → sistema evalúa frecuencia → envía push.

### `gamification_profiles` / `badges` / `missions` / `challenges`
> Esqueleto — se define cuando se trabaje Gamificación en Miro.

### `messages`
Mensajes manuales y automáticos enviados a miembros.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `sender_id` | UUID FK → members | admin o instructor |
| `type` | ENUM | `manual`, `system` |
| `title` | VARCHAR | |
| `body` | TEXT | |
| `channel` | ENUM | `push`, `email`, `whatsapp` |
| `audience` | ENUM | `all`, `by_class`, `by_plan` |
| `audience_ref_id` | UUID | nullable — FK a class_session o plan según audience |
| `scheduled_at` | TIMESTAMPTZ | nullable — si es programado |
| `sent_at` | TIMESTAMPTZ | nullable |
| `status` | ENUM | `draft`, `sent`, `failed` |
| `created_at` | TIMESTAMPTZ | |

### `message_deliveries`
Estado de entrega por destinatario.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `message_id` | UUID FK → messages | |
| `member_id` | UUID FK → members | |
| `status` | ENUM | `sent`, `read`, `failed` |
| `delivered_at` | TIMESTAMPTZ | nullable |
| `read_at` | TIMESTAMPTZ | nullable |

### `notification_preferences`
Preferencias del atleta sobre qué notificaciones recibir y por qué canal.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `member_id` | UUID FK → members | |
| `event_type` | VARCHAR | ej. `reservation_reminder`, `spot_available`, `class_cancelled` |
| `channel` | ENUM | `push`, `email`, `whatsapp` |
| `enabled` | BOOLEAN | default true |
