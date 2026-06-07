# Módulo: Tipo de Clases

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲

---

## Modelo conceptual

```
Tipo de Clase
  └── Categorías
        └── Rutina
              └── Ejercicios
```

Un **Tipo de Clase** (ej. CrossFit, Weightlifting, Yoga) agrupa categorías.
Cada sesión del calendario referencia un Tipo de Clase.

## Funcionalidades

- CRUD de tipos de clase
- Notificación de disponibilidad (push o correo) cuando hay cupo
- Recordatorio de cupo libre / disponibilidad (configurable por el atleta en sus notificaciones)

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| Nombre | string | |
| Color | string | hex, para identificación visual en calendario |
| Icono / Imagen | url | |
| Cupos | integer | máximo de atletas por sesión |
| Sobrecupo | integer | cupos extra permitidos |
| Planes permitidos | FK[] | solo atletas con estos planes pueden reservar |

## Conexiones

- **Calendario** → cada horario referencia un Tipo de Clase
- **Reservas** → los cupos y planes permitidos controlan quién puede reservar
- **Planes** → define qué tipos de clase puede acceder cada plan
- **Rutinas** → jerarquía Tipo → Categorías → Rutina → Ejercicios
- **Gamificación** → asistencia a ciertos tipos puede dar XP o completar misiones
