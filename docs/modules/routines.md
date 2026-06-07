# Módulo: Rutinas y Ejercicios

**Estado:** Funcionalidades 🔲 · Campos 🔲 · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin crea) · App Mobile (atleta ve y registra resultados)

---

## Rol por superficie

| Superficie | Qué hace |
|------------|---------|
| Web Dashboard | Gestionar glosario de ejercicios, crear rutinas, asignarlas a sesiones del calendario, definir categorías |
| App Mobile | Ver la rutina del día, ver detalle de cada ejercicio (descripción, video), registrar resultado, registrar PRs |

---

## Modelo conceptual

```
Tipo de Clase (ej. CrossFit)
  └── Categoría (ej. Strength, WOD, Mobility)
        └── Rutina (asignada a una sesión del calendario)
              └── Ejercicio + prescripción (sets, reps, duración, notas)
```

## Lo que se sabe hasta ahora

- El glosario de ejercicios puede ser global (del sistema) o propio del gym
- La IA puede sugerir rutinas según lo que el atleta tenga en la semana
- Cada ejercicio en una rutina tiene su prescripción (sets, reps — puede ser "21-15-9" o "AMRAP")

## Preguntas abiertas

- ¿El coach crea rutinas manualmente y la IA las sugiere, o la IA las genera desde cero?
- ¿El glosario global de ejercicios es editable por el gym o es de solo lectura?
