# Refactoring UI

**Categoría:** Frontend · Diseño visual · **Prioridad:** 🔴 Alta
**Referencia:** Libro de Adam Wathan & Steve Schoger

---

## Por qué importa en este proyecto

El backoffice y la app móvil necesitan verse profesionales. Refactoring UI enseña exactamente cómo pasar de una UI "funcional pero fea" a algo que se ve bien — con principios concretos, no vagas ideas de "buen diseño".

---

## Principios aplicados al proyecto

### 1. Empieza por las decisiones de alto nivel — no por los detalles
Antes de elegir colores o tipografía, define:
- ¿Qué personalidad tiene la app? (energética, profesional, friendly)
- ¿Quién la usa? (admin en escritorio vs atleta en móvil)
- ¿Cuál es la acción principal de cada pantalla?

Para el **Dashboard**: profesional, denso en información, orientado a eficiencia.
Para la **App móvil**: energética, motivacional, fácil de usar con una mano.

### 2. Jerarquía visual — no todo puede ser importante

```
❌ Todo tiene el mismo peso → el usuario no sabe dónde mirar
✅ 3 niveles: primario / secundario / terciario

Ejemplo en el perfil del cliente:
- Primario: nombre + estado (activo/moroso)
- Secundario: plan + vencimiento
- Terciario: fecha de ingreso, notas internas
```

Implementación con Tailwind:
```tsx
<div>
  <h2 className="text-xl font-semibold text-foreground">Juan Pérez</h2>
  <p className="text-sm text-muted-foreground">CrossFit 12 clases · vence 30 jun</p>
  <p className="text-xs text-muted-foreground/60">Ingresó 15 enero 2024</p>
</div>
```

### 3. Espacio en blanco — añadir antes de quitar

Más padding del que crees que necesitas. Los componentes "apretados" se ven amateur.
```tsx
// ❌
<div className="p-2">

// ✅ Para cards de dashboard
<div className="p-6">

// ✅ Para items de lista
<div className="px-4 py-3">
```

### 4. Colores — construye una paleta de grises primero

El 90% de la UI es gris. Los colores de acento son para lo importante.
```
gray-50   → backgrounds de página
gray-100  → backgrounds de cards
gray-200  → borders
gray-400  → placeholders, iconos secundarios
gray-600  → texto terciario
gray-800  → texto secundario
gray-900  → texto principal

color-500 → badges, botones primarios, indicadores de estado
color-100 → backgrounds de badges (con color-700 para el texto)
```

### 5. Sombras — para profundidad, no para estilo

```tsx
// Dropdown sobre la página
className="shadow-lg"

// Card en el dashboard
className="shadow-sm"

// Modal
className="shadow-xl"
```

### 6. Tipografía — menos tamaños, más peso

Usar 2-3 tamaños + variación de peso y color, no 6 tamaños distintos.
```
text-2xl font-bold      → títulos de página
text-base font-medium   → labels y nombres
text-sm text-muted      → metadata
text-xs text-muted/60   → info terciaria
```

### 7. Tablas de datos (DataTable en el backoffice)

- Alinear números a la derecha
- Alinear texto a la izquierda
- Usar `font-mono` para IDs, fechas y montos
- Columnas de estado: badge de color, no texto plano

```tsx
// Monto
<td className="text-right font-mono text-sm">$12.000</td>

// Estado
<Badge variant={member.status === 'active' ? 'default' : 'destructive'}>
  {member.status}
</Badge>
```

### 8. Formularios — guía al usuario con orden y contexto

- Agrupar campos relacionados visualmente
- Labels siempre visibles (no solo placeholders)
- Mensajes de error junto al campo, en rojo, con icono
- CTA principal siempre al final, bien diferenciado

---

## Recursos
- [Refactoring UI](https://www.refactoringui.com/) — el libro
- [Tailwind UI](https://tailwindui.com/) — ejemplos del mismo autor
