# Módulo: Gamificación

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin configura) · App Mobile (atleta experimenta)

---

## Sistema transversal de progresión y engagement

La gamificación es el diferenciador principal del producto. Es un módulo **transversal** — se alimenta de eventos de otros módulos (reservas, asistencia, PRs, misiones, competencias).

## 🕹️ Mecánicas

| Mecánica | Descripción |
|----------|-------------|
| XP → Nivel | Progresión general. Numérico, no baja. |
| Puntaje de competición → Rango | Bronce → Diamante, sube/baja. Por temporadas (estilo Valorant, con histórico). |
| Misiones | Objetivos con recompensa: "asistir 3x semana", "primer Murph" |
| Badges / logros | Coleccionables, desbloqueables por condiciones |
| Logros de desafío robables | Único por rutina — "cinturón de campeón" que otro puede quitarte |
| Rachas | Ligadas al plan: cumplir el cupo del mes; en ilimitado = meta configurable |
| Rankings | General (XP/nivel) y de competición (puntaje/rango) |

## 📈 Fuentes de puntos

**XP:**
- Asistir a clase (check-in)
- Reservar a tiempo
- Nuevo PR
- Completar una misión
- Mantener racha

**Puntaje de competición:**
- Ganar desafíos
- Posición en torneos / competencias

## Funcionalidades

### 🖥️ Backoffice (Web)
- Configurar reglas de XP por acción (feature flags)
- Crear / gestionar misiones
- Crear / gestionar badges y condiciones de desbloqueo
- Definir niveles / rangos y la curva de progresión (detalle numérico PENDIENTE)
- Gestionar temporadas del puntaje de competición
- Configurar rachas (qué cuenta, metas)

### 📱 App (Atleta)
- Ver nivel, rango, XP, puntaje y racha actual
- Misiones activas y progreso hacia cada una
- Colección de badges y logros en posesión
- Logros de desafío robables (cinturones)
- Rankings general y de competición

## Campos — perfil de gamificación del atleta

| Campo | Tipo | Notas |
|-------|------|-------|
| `xp_total` | INTEGER | acumulado histórico |
| `level` | INTEGER | calculado a partir de XP |
| `rank` | ENUM | `bronze`, `silver`, `gold`, `platinum`, `diamond` |
| `competition_score` | INTEGER | temporada actual |
| `competition_score_history` | JSONB | por temporada |
| `badges` | referencia → `member_badges` | |
| `active_missions` | referencia → `member_missions` | |
| `current_streak` | INTEGER | días/clases consecutivos |

## Conexiones

- **Reservas / Asistencia** → XP por asistir, rachas por check-in
- **Planes** → racha ligada al cupo mensual
- **Competencias + Desafíos** → puntaje de competición y badges
- **Clases / Rutina** → PRs, badges por rutina (logros robables)
- **Clientes** → perfil del atleta muestra sus datos de gamificación
- **Red Social** → logros y PRs se publican en el feed
- **Métricas** → distribución de niveles/XP, engagement por badges/misiones

## Preguntas abiertas

- Detalle numérico de la curva de niveles (cuánto XP por nivel) — PENDIENTE
