# Módulo: Configuración

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin configura) · App Mobile (atleta consume — solo lectura)

---

## Funcionalidades

### 🖥️ Backoffice (Web)

**Profesionales**
- CRUD de profesionales del gym (crear, editar, listar, desactivar)
- Datos: nombre, foto, contacto, bio corta, especialidades
- Asociar a disciplinas / tipos de clase (desde módulo Tipo de Clases)
- Asignar horario laboral (desde módulo Calendario)
- Estado activo / inactivo — no se elimina si tiene historial

**Branding**
- Personalizar colores de la app: botones, fondos, texto, acentos, estados (éxito/error)
- Vista previa en vivo antes de guardar
- Reset a tema por defecto
- Subir / reemplazar logo (y variante para fondo oscuro)

### 📱 App (Atleta)
- Ver perfil del coach asignado a la clase (foto, bio, especialidades)
- Experiencia visual con branding del gym (colores y logo)
- Logo del gym siempre visible en barra superior
- En multi-gimnasio: el tema cambia al cambiar de sede

## Campos

### `professionals`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | tenant |
| `name` | VARCHAR | |
| `photo_url` | VARCHAR | nullable |
| `email` | VARCHAR | nullable |
| `phone` | VARCHAR | nullable |
| `bio` | TEXT | nullable |
| `specialties` | VARCHAR[] | nullable |
| `status` | ENUM | `active`, `inactive` |
| `created_at` | TIMESTAMPTZ | |

### `professional_disciplines` (N:M — se gestiona en Tipo de Clases)

| Campo | Tipo |
|-------|------|
| `professional_id` | UUID FK → professionals |
| `discipline_id` | UUID FK → disciplines |

### `professional_schedules` (horario laboral — se gestiona en Calendario)

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `professional_id` | UUID FK → professionals | |
| `gym_id` | UUID FK → gyms | |
| `weekday` | INTEGER | 0–6 (lun–dom) |
| `start_time` | TIME | |
| `end_time` | TIME | |

### `gym_branding` (1:1 por tenant)

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | UNIQUE |
| `logo_url` | VARCHAR | nullable |
| `logo_dark_url` | VARCHAR | nullable — variante para fondo oscuro |
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

## Conexiones

- **Tipo de Clases** → asocia profesionales a disciplinas / tipos de clase
- **Calendario** → horario laboral del profesional y agendado en sesiones
- **Rutina** → identidad del coach y color de disciplina
- **App Mobile** → colores y logo aplicados en toda la app del atleta
- **Multi-gimnasio** → el tema cambia al cambiar de sede
- **Backoffice** → tematización del panel admin (a definir alcance)

## Dudas / Decisiones abiertas

- ¿El atleta puede ver el perfil completo del coach o solo nombre + foto?
- ¿Los colores del backoffice también se tematizan o solo la app mobile?
- ¿Hay roles distintos dentro de "profesionales" (ej. coach vs nutricionista)?
