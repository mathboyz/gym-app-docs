# Módulo: Rutinas / Constructor de Entrenamientos

**Estado:** Funcionalidades ✅ · Campos 🔲 · Conexiones 🔲 · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (coach crea) · App Mobile (atleta ve y registra resultados)

---

## Rol por superficie

| Superficie | Qué hace |
|------------|---------|
| Web Dashboard | Selector de disciplina, constructor de rutinas, asignar a sesiones del calendario, gestionar glosario de ejercicios |
| App Mobile | Ver la rutina del día, ver detalle de ejercicios (descripción, video), registrar resultado, registrar PRs |

---

## Modelo conceptual

```
Tipo de Clase (ej. CrossFit)
  └── Categoría (ej. Calentamiento · Skill · WOD)
        └── Rutina (asignada a una sesión del calendario)
              └── Ejercicio + prescripción (sets, reps, duración, notas)
```

## Selector de disciplina

El coach elige una disciplina antes de construir la rutina. La disciplina se arrastra al builder como contexto.

**Disciplinas disponibles:**
Metcon · Bodybuilding · Powerlifting · Halterofilia · HIIT · Aeróbico · Gimnasia · Estiramiento · Pilates · Yoga · Resistencia · Functional

Cada disciplina tiene: nombre, descripción, tags y color de identidad.

## Funcionalidades

- Selector de disciplina al crear una rutina
- Constructor de rutinas (builder)
- Asignar rutina a una sesión del calendario
- Definir categorías dentro de un tipo de clase y su orden
- Popover para cambiar disciplina dentro del builder

## Preguntas abiertas

- ¿El coach crea rutinas manualmente y la IA las sugiere, o la IA las genera desde cero?
- ¿El glosario global de ejercicios es editable por el gym o solo lectura?
- Campos completos del builder pendientes de definir en Miro
