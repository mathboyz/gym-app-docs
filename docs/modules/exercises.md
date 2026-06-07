# Módulo: Ejercicios (Glosario)

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin/coach gestiona) · App Mobile (atleta consulta — solo lectura)

---

## Funcionalidades

- CRUD de ejercicios (crear, editar, eliminar, listar)
- Nombre en ES y/o EN (al menos uno requerido)
- Descripción opcional
- Link a video (YouTube, Vimeo, etc.)
- Imagen de referencia / thumbnail
- Búsqueda y filtro por nombre, idioma, grupo muscular
- Glosario accesible desde la app del atleta (solo lectura)
- Ejercicios globales del sistema + propios del gym

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | nullable — null = ejercicio global del sistema |
| `name_es` | VARCHAR | requerido si no hay `name_en` |
| `name_en` | VARCHAR | requerido si no hay `name_es` |
| `description` | TEXT | nullable |
| `video_url` | VARCHAR | nullable — YouTube / Vimeo |
| `image_url` | VARCHAR | nullable — thumbnail de referencia |
| `muscle_group` | VARCHAR | nullable — grupo muscular / categoría |
| `difficulty` | ENUM | nullable: `beginner`, `intermediate`, `advanced` |
| `equipment` | VARCHAR[] | nullable: `barbell`, `dumbbell`, `none`, etc. |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

## Conexiones

- **Rutinas** → los ejercicios se usan en las rutinas con su prescripción (sets, reps, etc.)
- **Personal Records** → cada PR referencia un ejercicio
- **App Mobile** → glosario accesible para el atleta (solo lectura)
