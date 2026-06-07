# Módulo: Competencias

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin organiza y gestiona) · App Mobile (atleta compite y ve leaderboard)

---

## Concepto

Eventos organizados por el gym. Pueden ser torneos puntuales, ligas semanales o leaderboards de benchmark. El admin los crea, un juez registra resultados desde la app, y los atletas compiten.

## Funcionalidades

### 🖥️ Backoffice (Web)
- CRUD de competencias + duplicar (útil para recurrentes / semanales)
- Configurar pruebas / WODs (rutina o ejercicio + tipo de score)
- Configurar categorías / divisiones (Rx/Scaled, género, edad)
- Configurar heats (tandas con capacidad, ej. 10 por heat)
- Parametrizar elegibilidad (nivel, plan, género, edad, sede)
- Asignar juez/es
- Abrir / cerrar inscripciones + gestionar inscritos
- Registrar resultados (el juez, desde su apartado en la app)
- Leaderboard en vivo
- Cerrar → repartir puntaje + badges + XP + premios externos
- Notificaciones (inscripción, recordatorios, resultados)

### 📱 App (Atleta)
- Ver competencias disponibles e inscribirse
- Ver sus heats y categoría asignada
- Ver leaderboard en vivo
- Recibir notificaciones de resultados y premios
- Juez: registrar resultados de los atletas en su heat (rol especial)

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `name` | VARCHAR | |
| `description` | TEXT | nullable |
| `banner_url` | VARCHAR | nullable |
| `type` | ENUM | `tournament`, `weekly_league`, `benchmark_leaderboard` |
| `class_type_id` | UUID FK → class_types | nullable — tipo de clase asociado |
| `dates` | JSONB | fechas o recurrencia (semanal) |
| `status` | ENUM | `draft`, `open`, `in_progress`, `finished` |
| `eligibility` | JSONB | nivel, plan(es), género, edad, sede |
| `registration_mode` | ENUM | `open`, `invite`, `admin` |
| `total_capacity` | INTEGER | nullable |
| `scoring_system` | JSONB | posición tipo Games / valor directo + tie-breakers |
| `prizes` | JSONB | puntaje + badges + XP + premios externos |
| `visibility` | ENUM | `public`, `private` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

### Tablas relacionadas

- **`competition_categories`** — divisiones (Rx/Scaled, género, edad)
- **`competition_heats`** — tandas con capacidad y atletas asignados
- **`competition_wods`** — pruebas con tipo de score
- **`competition_results`** — resultado por atleta por WOD (registrado por juez)
- **`competition_judges`** — (competition_id, member_id) — jueces asignados
- **`competition_registrations`** — (competition_id, member_id, category_id, heat_id, status)

## Conexiones

- **Gamificación** → al cerrar la competencia: reparte puntaje, badges y XP
- **Clases** → tipo de clase asociado + leaderboard de categoría
- **Ejercicios / Rutina** → las pruebas / WODs de la competencia
- **Clientes** → participantes inscritos + miembros con rol de juez
- **Planes** → criterio de elegibilidad
- **Métricas** → participación, scores históricos
- **Calendario** → (futuro) integración con slots de sesión
- **Red Social** → publicación de resultados y podio
- **Multi-gimnasio** → (futuro) competencias entre sedes
