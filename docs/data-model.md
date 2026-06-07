# Modelo de Datos

Entidades del sistema con sus campos. Solo se documentan las entidades con definición completa o parcial.
Las entidades de módulos pendientes (Planes, Pagos, Gamificación, Notificaciones) tienen esqueleto.

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
Qué planes tienen acceso a cada tipo de clase.

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
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

---

### `reservations`
Un member reserva un class_session.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `class_session_id` | UUID FK → class_sessions | |
| `member_id` | UUID FK → members | |
| `status` | ENUM | `confirmed`, `cancelled`, `no_show`, `waitlist` |
| `waitlist_position` | INTEGER | nullable — posición en lista de espera |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

UNIQUE: `(class_session_id, member_id)`

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
| `name` | VARCHAR | |
| `description` | TEXT | nullable |
| `video_url` | VARCHAR | nullable |
| `created_at` | TIMESTAMPTZ | |

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

## Pendientes de definición

### `plans` / `memberships` / `payments`
> Esqueleto — se define cuando se trabaje Planes y Pagos en Miro.

### `gamification_profiles` / `badges` / `missions` / `challenges`
> Esqueleto — se define cuando se trabaje Gamificación en Miro.

### `notifications` / `notification_preferences`
> Esqueleto — se define cuando se trabaje Notificaciones en Miro.
