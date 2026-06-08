# Hooked — Habit-Forming Products

**Categoría:** Frontend · UX · Producto · **Prioridad:** 🔴 Alta
**Referencia:** Libro de Nir Eyal — *Hooked: How to Build Habit-Forming Products*

---

## Por qué importa en este proyecto

La gamificación, las misiones, las rachas y las notificaciones push son el corazón de la retención del atleta. Hooked da el framework exacto para diseñar estos loops de comportamiento — no como manipulación, sino como creación de hábitos que benefician al usuario (entrenar más = objetivo real del atleta).

---

## El Hook Model

```
TRIGGER → ACTION → VARIABLE REWARD → INVESTMENT
    ↑                                      |
    └──────────────────────────────────────┘
```

### 1. TRIGGER — Qué inicia el comportamiento

**External triggers** (notificaciones):
```
✅ "¡Tu clase de mañana empieza en 2 horas! Confirma tu reserva 🏋️"
✅ "Llevas 5 días de racha — no la rompas hoy 🔥"
✅ "Juan acaba de superar tu PR en Back Squat"
❌ "Tienes una notificación pendiente" (vago, sin valor)
```

**Internal triggers** (estados emocionales que el usuario asocia al producto):
- "Necesito ver mi progreso" → abrir la app
- "Quiero ver el WOD de mañana" → abrir la app
- "Quiero superar mi PR" → abrir la app

El diseño debe reforzar estas asociaciones desde el primer uso.

### 2. ACTION — La acción más simple posible

**Regla de Fogg:** `Behavior = Motivation × Ability × Trigger`

Para cada acción, maximizar **Ability** (reducir fricción):
```
❌ Para confirmar reserva: abrir app → login → menú → reservas → encontrar la correcta → confirmar
✅ Para confirmar reserva: tap en la notificación push → confirmar con 1 tap
```

En la app móvil:
- Confirmar reserva desde la notificación: **1 tap**
- Ver el WOD del día desde el home: **0 taps** (ya está en el home)
- Registrar un PR: **máximo 3 taps**

### 3. VARIABLE REWARD — La recompensa impredecible

Lo que engancha no es la recompensa — es la **variabilidad**. Tres tipos:

**Recompensas del Tribe (sociales):**
- "3 personas de tu gym también marcaron PR esta semana"
- Leaderboard de la clase de hoy
- Reacciones a logros de otros atletas

**Recompensas de la Hunt (búsqueda/logro):**
- Misiones con progreso visible: "Completa 3 WODs esta semana (2/3 ✅)"
- XP que se acumula con animación
- Badges que aparecen por sorpresa: "¡Obtuviste 'Madrugador' por entrenar antes de las 7am!"

**Recompensas del Self (auto-superación):**
- "Nuevo PR en Fran — 3:42 (anterior: 4:15) 🔥"
- "Tu mejor semana del mes — 4 clases"
- Nivel subido: "Subiste a Nivel 8 ⚡"

**Variable = no siempre la misma recompensa.** A veces una misión da XP extra, a veces una sorpresa.

### 4. INVESTMENT — El usuario invierte en el producto

Cada acción que el usuario hace aumenta el valor percibido del producto:
- Registrar PRs → su historial es valioso, no cambia de app
- Completar su perfil → siente que la app "lo conoce"
- Racha de días → no quiere perder la racha
- Puntos acumulados → tiene algo que perder si abandona

Diseñar para que el **sunk cost** sea positivo (el usuario invirtió en su progreso, no en el producto).

---

## Aplicado al módulo de Gamificación

```
TRIGGER:
  - Push: "Tu racha termina en 6 horas ⚡"
  - Internal: "Quiero ver si Juan me superó en el ranking"

ACTION:
  - Abrir app → Home muestra directamente el estado de la racha

VARIABLE REWARD:
  - Al completar misión: XP + chance de badge sorpresa
  - Leaderboard: ¿subí o bajé? (buscar el resultado)

INVESTMENT:
  - Cada PR registrado → historial crece
  - Cada clase completada → avanza en la temporada
```

---

## Reglas de diseño para notificaciones

```
✅ Timing relevante: notificar cuando el trigger externo tiene sentido
   → Confirmación de reserva: 2h antes de la clase
   → Recordatorio de racha: cuando el usuario normalmente entrena

✅ Contenido de valor: la notificación tiene la información, no solo el CTA
   → "Falta 1 clase para completar la misión 'Semana Perfecta'"

✅ Frecuencia controlada: no más de 2-3 notificaciones por día por gym

❌ Nunca notificar solo para "aumentar DAU" sin valor real para el usuario
```

---

## Ética — la línea entre hábito y manipulación

Nir Eyal lo llama "The Manipulation Matrix":
- ¿El producto mejora la vida del usuario? → ✅ (entrenar sí lo hace)
- ¿El creador usaría el producto? → ✅ (nosotros entrenaríamos en el gym)

Si ambas respuestas son sí → construir el hábito es legítimo.

---

## Recursos
- [Hooked — Nir Eyal](https://www.nirandfar.com/hooked/)
- [Hooked Model summary](https://www.nirandfar.com/how-to-manufacture-desire/)
