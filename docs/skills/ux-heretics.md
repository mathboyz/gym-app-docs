# UX Heretics — Cuestionando las Convenciones

**Categoría:** Frontend · UX · Pensamiento crítico · **Prioridad:** 🟢 Baja
**Referencia:** UX Heretics, Jared Spool, Luke Wroblewski, anti-patrones de UX

---

## Por qué importa en este proyecto

Muchas "mejores prácticas" de UX son mitos o reglas de otro contexto. UX Heretics cuestiona cuándo las convenciones te frenan — y cuestionar es lo que produce productos que se destacan.

---

## Herejías aplicadas al proyecto

### 1. "Los formularios deben ser cortos" — ¿siempre?

**Convención:** divide formularios largos en múltiples pasos (wizard).
**Herejía:** para usuarios expertos (el admin del gym), un formulario largo en una sola vista puede ser **más eficiente** que un wizard de 4 pasos.

```
Caso: Crear un nuevo plan de membresía
❌ Wizard: Paso 1 (nombre) → Paso 2 (precio) → Paso 3 (horarios) → Paso 4 (revisar)
✅ Form único: todos los campos visibles, scroll, submit al final
   Ventaja: el admin puede revisar todo antes de enviar, copiar de otro plan mentalmente
```

**Cuándo usar wizard:** cuando hay dependencias entre pasos que cambiarían campos futuros (ej: onboarding de nuevo gym con configuración inicial compleja).

### 2. "La navegación debe ser visible todo el tiempo"

**Convención:** sidebar siempre visible en el dashboard.
**Herejía:** en algunas vistas (calendario de clases, editor de WOD), colapsar el sidebar para dar más espacio al contenido.

```tsx
// Sidebar colapsable en vistas de contenido
const [collapsed, setCollapsed] = useState(false)

<aside className={cn(
  "transition-all duration-200",
  collapsed ? "w-16" : "w-64"
)}>
  {collapsed ? <IconNav /> : <FullNav />}
</aside>
```

### 3. "Los usuarios no hacen scroll"

**Convención:** poner todo above-the-fold.
**Herejía:** los usuarios de 2024 hacen scroll naturalmente. El problema real es no darles razón para hacerlo.

Para la **app móvil**: el scroll es nativo e intuitivo. El problema es cuando no hay señal visual de que hay contenido abajo.

```tsx
// ✅ Señal de scroll: cortar el último elemento visible
// El usuario ve que hay más contenido
<div className="overflow-hidden">
  <div className="pb-4">  {/* último item visible parcialmente */}
    <ClassCard class={lastVisibleClass} />
  </div>
</div>
```

### 4. "Siempre pide confirmación para acciones peligrosas"

**Convención:** modal de "¿Estás seguro?" para cualquier acción irreversible.
**Herejía:** los diálogos de confirmación que aparecen constantemente se convierten en ruido — el usuario hace clic en "Aceptar" sin leer.

**El estándar real de Gmail:** Undo en lugar de confirmación.

```tsx
// En lugar de "¿Eliminar?" con un diálogo...
// → Eliminar inmediatamente + toast con Undo

async function deleteMember(id: string) {
  await optimisticDelete(id)
  const { dismiss } = toast('Cliente eliminado', {
    action: {
      label: 'Deshacer',
      onClick: () => undoDelete(id),
    },
    duration: 5000,
  })
}
```

**Excepción para este proyecto:** La confirmación de reserva (modal AlertDialog) SÍ aplica porque la consecuencia es real (queda sin cupo), el usuario lo entiende, y solo pasa pocas veces por semana.

### 5. "La consistencia es lo más importante"

**Convención:** todos los componentes deben verse iguales en toda la app.
**Herejía:** la consistencia **contextual** importa más que la consistencia visual estricta.

```
Ejemplo: el estado "Confirmada" en una reserva del atleta
→ En la lista de reservas: Badge verde "Confirmada"
→ En el home: ícono de check + texto verde (más emocional, menos formal)
→ En la notificación push: "✅ Reserva confirmada"

Todos son distintos visualmente, pero todos comunican lo mismo.
La consistencia está en el SIGNIFICADO, no en el componente exacto.
```

### 6. "El usuario siempre lee el copy"

**Herejía inversa:** el usuario NO lee. Diseñar para usuarios que escanean, no que leen.

Implicaciones:
```
✅ Labels de campos: 1-2 palabras máximo ("Email" no "Dirección de correo electrónico")
✅ CTAs con verbo de acción claro: "Confirmar clase" no "Aceptar"
✅ Mensajes de error: directos: "Email inválido" no "Por favor ingrese una dirección de correo electrónico válida en el campo de email"
✅ Estados vacíos: título + 1 línea + CTA (no párrafo explicativo)
```

---

## Anti-patrones específicos a evitar

### Dark patterns que destruyen confianza

```
❌ Pre-check de "Quiero recibir emails de marketing" en el registro
❌ Cancelar suscripción más difícil que contratar
❌ Precios que cambian en el último paso del checkout
❌ "X personas están viendo este plan ahora mismo" (falso urgency)
```

En un gym local, la confianza del admin (quien paga) es crítica. No manipular.

### Cargo cult UX — copiar sin entender

```
❌ "Airbnb tiene onboarding de 10 pasos → nosotros también"
   (Airbnb tiene millones de usuarios, nosotros tenemos admins de gym)

❌ "Las apps de fitness usan gamificación → copiar exactamente"
   (Entender qué mechanic aplica al contexto específico: CrossFit vs running)

❌ "Amazon tiene este patrón → es bueno"
   (Amazon tiene 20 años de A/B testing en e-commerce, no en gym management)
```

---

## Cuándo ignorar las convenciones

| Convención | Ignorar cuando... |
|-----------|-------------------|
| Mobile-first design | El backoffice es 90% uso en desktop |
| Progressive disclosure | El usuario experto necesita todo a la vista |
| Wizard para flujos largos | El usuario necesita ver el contexto completo |
| Confirmación de acciones | La acción es fácilmente reversible (undo) |
| Loading spinner | Skeleton loader da mejor UX percibida |

---

## Recursos
- [UX Myths](https://uxmyths.com/) — mitos del UX desmontados con datos
- [UX Heretics](https://uxheretics.com/)
- [Jared Spool](https://articles.centercentre.com/)
- [Luke Wroblewski — Mobile First](https://www.lukew.com/ff/entry.asp?933)
