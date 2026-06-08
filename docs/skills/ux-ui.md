# UX/UI Pro — Principios Aplicados

**Categoría:** Frontend · UX · Diseño · **Prioridad:** 🔴 Alta
**Referencia:** Nielsen Norman Group, Laws of UX, Material Design, Apple HIG

---

## Por qué importa en este proyecto

Hay dos superficies con usuarios distintos:
- **Backoffice (Web)**: admin/coach, experto en el dominio, usa a diario, eficiencia > estética
- **App móvil (atleta)**: usuario casual, motivación variable, contexto de movilidad, emoción > eficiencia

Cada una necesita principios de UX diferentes.

---

## Backoffice — UX para usuarios expertos

### Principio de eficiencia
El admin ve listas, filtra, actúa. No necesita onboarding cada vez.
```
✅ DataTable con búsqueda, filtros, ordenamiento, acciones en fila
✅ Shortcuts de teclado para acciones frecuentes
✅ Estado de carga visible pero no bloqueante (skeleton, no spinner)
✅ Confirmación solo para acciones destructivas
❌ Wizard de 5 pasos para crear un cliente → 1 form con todos los campos
```

### Densidad de información
El backoffice puede ser denso — el admin lo quiere así:
```
✅ Vista de tabla: 20+ filas visibles sin scroll
✅ Cards del dashboard: 4-6 métricas en la primera pantalla
✅ Panel lateral (Sheet) para detalles sin salir de la lista
```

### Gestión de errores en backoffice
```
✅ Inline validation en formularios
✅ Toast de error con descripción útil ("No se puede eliminar: el cliente tiene reservas activas")
✅ Estado vacío con CTA ("Aún no hay clientes. Agregar primero")
```

---

## App Móvil — UX para atletas

### Mobile-first design constraints
- Pantallas de 375-430px de ancho (iPhone SE → Pro Max)
- Uso con una mano: zona de pulgar ≤ 340px desde el fondo
- Contexto de uso: vestuario, gym, de pie
- Sesiones cortas (< 2 min por apertura)

```
Zona de pulgar segura:
┌─────────────────┐
│   ← difícil     │ (top)
│                 │
│   ← cómodo     │ (centro)
│                 │
│   ← fácil ✅   │ (bottom 340px)
└─────────────────┘
CTA principal → siempre en la parte inferior
```

### Jerarquía en pantallas de app

Cada pantalla tiene **1 acción principal** visible sin scroll:
- Home: "Ver WOD de hoy" o "Ver mi reserva"
- Calendario: "Reservar clase"
- Mi Plan: "Ver estado de mi membresía"
- Perfil: "Mis PRs / Mi progreso"

### Onboarding progresivo
```
✅ No pedir todo al registro — solo email + contraseña
✅ Completar perfil después de la primera acción
✅ Mostrar el valor antes de pedir datos ("Aquí verías tus estadísticas — configura tu perfil")
❌ Form de 10 campos en el registro
```

### Micro-interacciones que importan
- Animación al ganar XP / subir de nivel (Lottie o CSS)
- Vibración háptica al confirmar reserva (si la app lo soporta)
- Pull-to-refresh con feedback visual
- Skeleton loaders, no spinners

---

## Leyes de UX relevantes

### Ley de Hick — tiempo de decisión ↑ con opciones
```
❌ Home con 8 iconos de navegación
✅ Home con 3 acciones clave + acceso secundario al resto
```

### Ley de Fitts — tiempo de acción ∝ distancia / tamaño
```
✅ Botones de CTA: min 44×44px (Apple HIG)
✅ CTA principal al alcance del pulgar
❌ Botón de "Confirmar reserva" en la esquina superior derecha
```

### Efecto de posición serial — recordamos inicio y final
```
✅ En listas de planes: el plan recomendado va en el medio (highlight)
✅ En el onboarding: primer y último paso son los más memorables
```

### Umbral de Jakob — los usuarios esperan lo convencional
```
✅ Tab bar abajo en móvil (Home, Calendario, Progreso, Perfil)
✅ Pull-to-refresh para actualizar
✅ Swipe-back para ir atrás en iOS
❌ Menú hamburguesa en móvil para navegación principal
```

---

## Estados de UI — todos los casos

Para cada pantalla, diseñar **todos** los estados:
```
1. Loading  → Skeleton loader (no spinner de página completa)
2. Empty    → Ilustración + CTA ("Aún no tienes reservas. Reserva tu primera clase →")
3. Error    → Mensaje + retry ("No pudimos cargar. Intentar de nuevo")
4. Success  → Feedback claro (toast o confirmación inline)
5. Filled   → La vista normal con datos
```

---

## Accesibilidad mínima

```
✅ Contraste 4.5:1 para texto normal, 3:1 para texto grande
✅ Labels en todos los inputs (no solo placeholders)
✅ Estados focus visibles (no outline: none)
✅ Alt text en imágenes funcionales
✅ No solo color para indicar estado (usar ícono + color + texto)
```

---

## Recursos
- [Laws of UX](https://lawsofux.com/)
- [Nielsen Norman Group](https://www.nngroup.com/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io/)
