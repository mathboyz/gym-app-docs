# Modern Web — Standards y Best Practices

**Categoría:** Frontend · Web Platform · **Prioridad:** 🟡 Media
**Referencia:** web.dev, MDN, Next.js docs, React 19

---

## Por qué importa en este proyecto

El backoffice se construye en Next.js. Usar las APIs modernas de la plataforma web (en lugar de workarounds con librerías) significa menos código, mejor performance y mejor mantenimiento.

---

## Next.js App Router — patrones clave

### Server Components vs Client Components

```
Regla: todo es Server Component por defecto.
Agregar 'use client' solo cuando sea necesario.

✅ Server Component (por defecto):
- Data fetching directo desde la DB / API
- Componentes estáticos: layout, sidebar, headers
- Renderizado inicial de páginas

✅ Client Component ('use client'):
- Interactividad: onClick, onChange, hover states
- Hooks de React: useState, useEffect, useContext
- Browser APIs: localStorage, navigator
- Librerías que necesitan el browser: chart.js, dnd-kit
```

Patrón común — pasar datos del server al client:
```tsx
// app/members/page.tsx — Server Component
export default async function MembersPage() {
  const members = await getMembersFromDB()  // directo, sin API call
  return <MembersTable initialData={members} />  // pasa datos al client
}

// components/members-table.tsx — Client Component
'use client'
export function MembersTable({ initialData }: { initialData: Member[] }) {
  const [data, setData] = useState(initialData)
  // interactividad aquí
}
```

### Data Fetching moderno

```tsx
// fetch con cache en Server Components
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }  // ISR: revalidar cada 60s
})

// Sin cache (datos siempre frescos)
const data = await fetch('...', { cache: 'no-store' })

// Server Action para mutaciones (sin API route)
async function createMember(formData: FormData) {
  'use server'
  const name = formData.get('name')
  await db.insert(members).values({ name })
  revalidatePath('/members')
}
```

### Loading y Error boundaries

```tsx
// app/members/loading.tsx — automático mientras carga
export default function Loading() {
  return <MembersTableSkeleton />
}

// app/members/error.tsx — errores de página
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Error al cargar los clientes</p>
      <Button onClick={reset}>Reintentar</Button>
    </div>
  )
}
```

---

## Performance — Web Vitals

### Core Web Vitals que importan

```
LCP (Largest Contentful Paint) < 2.5s
  → No SSR bloqueado por datos lentos (usar Suspense)
  → Imágenes con next/image (lazy load, AVIF/WebP)

CLS (Cumulative Layout Shift) < 0.1
  → Siempre definir width/height en imágenes
  → Skeleton loaders con las mismas dimensiones que el contenido real
  → Reservar espacio para contenido dinámico

INP (Interaction to Next Paint) < 200ms
  → Client Components ligeros
  → Evitar re-renders innecesarios (memo, useCallback cuando aplica)
  → Listas largas: virtualización con TanStack Virtual
```

### Optimización de imágenes

```tsx
// Siempre usar next/image
import Image from 'next/image'

<Image
  src={gym.logoUrl}
  alt={`Logo ${gym.name}`}
  width={48}
  height={48}
  className="rounded-full"
/>

// Para imágenes de fondo / hero
<Image
  src="/hero.jpg"
  alt="CrossFit athletes"
  fill  // llena el contenedor
  priority  // cargar inmediatamente (above-the-fold)
  className="object-cover"
/>
```

---

## CSS Moderno

### Container Queries — responsive por componente

```css
/* El componente se adapta a su contenedor, no a la ventana */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .metric-card {
    display: flex;
    flex-direction: row;
  }
}
```

### CSS Grid para layouts

```css
/* Dashboard layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* Layout de 2 columnas con sidebar */
.page-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
}
```

### Custom Properties para theming

```css
/* Definidas en :root, sobreescritas por gym */
:root {
  --gym-primary: #3b82f6;
  --gym-secondary: #1e40af;
}

/* En React, sobreescribir dinámicamente */
<div style={{ '--gym-primary': gym.colorPrimary } as React.CSSProperties}>
```

---

## Accesibilidad — WCAG mínimo

```tsx
// Botones con iconos → siempre con label accesible
<Button size="icon" aria-label="Eliminar cliente">
  <Trash2 className="h-4 w-4" />
</Button>

// Tablas → headers correctos
<th scope="col">Nombre</th>
<th scope="row">{member.name}</th>

// Formularios → labels asociados
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// Estado de carga → anuncio para screen readers
<div role="status" aria-live="polite">
  {isLoading ? 'Cargando...' : ''}
</div>
```

---

## TypeScript moderno en React

```tsx
// Tipos de componentes
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'default' | 'destructive'
  isLoading?: boolean
}

// Inferir tipos de query params en Next.js
type PageProps = {
  params: { gymId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Tipo para Server Actions
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }
```

---

## Recursos
- [web.dev](https://web.dev/) — guías de performance y estándares
- [Next.js docs](https://nextjs.org/docs)
- [React 19 docs](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Core Web Vitals](https://web.dev/vitals/)
