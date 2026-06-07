# Módulo: Tipo de Clases

**Estado:** Funcionalidades ✅ · Campos ✅ · Conexiones ✅ · Mockups 🔲 · Modelo 🔲
**Superficie:** Web Dashboard (admin crea) · App Mobile (atleta ve al reservar)

---

## Modelo conceptual

```
Tipo de Clase (ej. CrossFit)
  └── Categorías (ej. Strength, WOD, Mobility)
        └── Rutina
              └── Ejercicios
```

## Funcionalidades

- CRUD de tipos de clase
- Activar / desactivar / archivar
- Duplicar tipo de clase
- Definir categorías del tipo y su orden
- Asociar planes permitidos
- Configurar cupos / sobrecupo por defecto
- Configurar política de reserva (override de la global del gym)
- Lista de espera automática → avisa al siguiente al liberarse un cupo
- Notificación de disponibilidad (push / correo)
- Recordatorio de cupo libre (configurable por el atleta en sus notificaciones)

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| Nombre | VARCHAR | |
| Descripción | TEXT | nullable |
| Color | VARCHAR | hex — se usa en el calendario |
| Icono / Imagen | VARCHAR | nullable |
| Planes permitidos | FK[] | solo atletas con estos planes pueden reservar |
| Cupos | INTEGER | por sesión (default, override en calendario) |
| Sobrecupo | INTEGER | default 0 |
| Categorías | lista ordenada | ver `class_type_categories` |
| Estado | ENUM | `active`, `inactive`, `archived` |
| Política de reserva | JSONB | nullable — override de la política global del gym |

## Conexiones

- **Calendario** → cada sesión referencia un tipo de clase (hereda color, cupos, política de reserva)
- **Reservas** → cupos y planes permitidos controlan quién puede reservar
- **Planes** → define qué tipos de clase incluye cada plan
- **Rutinas** → jerarquía Tipo → Categorías → Rutina → Ejercicios
- **Gamificación** → asistencia a ciertos tipos puede dar XP o completar misiones
