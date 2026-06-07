# Módulo: Reseñas (NPS)

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin configura y ve resultados) · App Mobile (atleta responde encuesta)

---

## Concepto

Encuestas post-clase enviadas al atleta vía push, configurables por el admin. Pueden ser anónimas o identificadas. El admin construye sus propias preguntas o usa plantillas basadas en investigación NPS.

## Funcionalidades

### 🖥️ Backoffice (Web)
- Constructor de encuestas (preguntas a medida)
  - Tipos: NPS (0–10), escala, opción múltiple, texto libre
- Plantillas listas basadas en investigación NPS
- Activar / desactivar / duplicar encuestas
- Configurar frecuencia general (cada N clases / semanal / mensual)
- Configurar frecuencia para nuevos miembros (primeras clases)
- Límite anti-spam (máx X por período, cooldown_days)
- Opción de anonimato (anónima o identificada)
- Ver resultados: NPS promedio, tendencia, por clase / profesor / disciplina

### 📱 App (Atleta)
- Recibe push notification al terminar una clase asistida
- Responde la encuesta directamente desde la notificación
- Encuesta rápida (diseñada para completarse en <1 minuto)

## Flujo de disparo

1. Clase termina → `attendance.status = attended`
2. Sistema verifica si el atleta cumple la frecuencia configurada
3. Si sí → envía push (vía Mensajes) con link a la encuesta
4. Atleta responde → `survey_response` creada
5. Si es anónima → `athlete_id = null`

## Campos

### `surveys`
| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `gym_id` | UUID FK → gyms | |
| `title` | VARCHAR | |
| `description` | TEXT | nullable |
| `is_anonymous` | BOOLEAN | |
| `status` | ENUM | `active`, `inactive` |
| `template_id` | UUID FK → survey_templates | nullable |
| `created_by` | UUID FK → users | |

### `survey_questions`
| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `survey_id` | UUID FK → surveys | |
| `position` | INTEGER | orden |
| `text` | TEXT | |
| `type` | ENUM | `nps`, `scale`, `multiple_choice`, `text` |
| `options` | VARCHAR[] | nullable — para multiple_choice |
| `required` | BOOLEAN | |

### `survey_triggers`
| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `survey_id` | UUID FK → surveys | |
| `gym_id` | UUID FK → gyms | |
| `general_frequency` | ENUM | `every_n_classes`, `weekly`, `monthly` |
| `new_member_rule` | ENUM | `first_class`, `first_3`, `first_5`, `off` |
| `max_per_period` | INTEGER | límite anti-spam |
| `cooldown_days` | INTEGER | días mínimos entre encuestas al mismo atleta |

### `survey_responses`
| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `survey_id` | UUID FK → surveys | |
| `class_id` | UUID FK → class_sessions | clase que disparó la encuesta |
| `athlete_id` | UUID FK → users | **null si anónima** |
| `nps_score` | INTEGER | nullable — 0–10 |
| `submitted_at` | TIMESTAMPTZ | |

### `survey_answers`
| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | UUID PK | |
| `response_id` | UUID FK → survey_responses | |
| `question_id` | UUID FK → survey_questions | |
| `value` | TEXT | texto / número / opción seleccionada |

### `survey_templates` (semilla del sistema)
| Campo | Notas |
|-------|-------|
| `id` | |
| `name` | nombre de la plantilla |
| `description` | |
| `questions_json` | preguntas predefinidas |

## Conexiones

- **Calendario / Reservas** → fin de clase (`status: attended`) dispara la encuesta
- **Mensajes** → envía el push que lleva al atleta a la encuesta
- **Clientes** → detecta nuevos miembros y cuenta sus primeras clases (regla `new_member_rule`)
- **Métricas** → NPS promedio, tendencia, por clase / profesor / disciplina
- **Gamificación** → responder encuesta podría dar XP (opcional, a configurar)

## Multi-tenant

Encuestas, plantillas y respuestas aisladas por `gym_id` vía RLS. Si la encuesta es anónima, `athlete_id = null` — no hay vínculo entre respuesta y persona.
