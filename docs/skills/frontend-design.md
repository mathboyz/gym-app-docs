# Frontend Design — Implementación y Arquitectura

**Categoría:** Frontend · Arquitectura · **Prioridad:** 🔴 Alta
**Referencia:** Component-Driven Development, Feature-Sliced Design, TanStack

---

## Por qué importa en este proyecto

El backoffice tiene muchas entidades (clientes, clases, planes, pagos, competencias) y el estado se vuelve complejo rápido. Una arquitectura de frontend bien definida evita el spaghetti code donde todo está mezclado.

---

## Estructura de carpetas — Next.js App Router

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group — layout de auth
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # Route group — layout del backoffice
│   │   ├── layout.tsx            # Sidebar + header
│   │   ├── page.tsx              # Dashboard home
│   │   ├── members/
│   │   │   ├── page.tsx          # Lista de clientes
│   │   │   ├── [id]/page.tsx     # Detalle de cliente
│   │   │   └── loading.tsx       # Skeleton
│   │   ├── classes/
│   │   ├── payments/
│   │   └── settings/
│   └── api/                      # API routes (webhooks, etc.)
│       └── webhooks/
│           └── mercadopago/route.ts
│
├── components/
│   ├── ui/                       # shadcn/ui (copiados, no tocar)
│   ├── layout/                   # Sidebar, Header, PageHeader
│   └── shared/                   # Compartidos entre módulos
│       ├── status-badge.tsx
│       ├── metric-card.tsx
│       └── data-table/
│
├── features/                     # Módulos de negocio
│   ├── members/
│   │   ├── components/           # MemberForm, MemberCard, etc.
│   │   ├── hooks/                # useMember, useMembersList
│   │   ├── actions.ts            # Server Actions
│   │   └── types.ts              # Tipos del módulo
│   ├── classes/
│   ├── reservations/
│   ├── payments/
│   └── gamification/
│
├── lib/
│   ├── api/                      # API client (fetch wrappers)
│   ├── db/                       # Drizzle client
│   └── utils.ts                  # cn(), formatCLP(), etc.
│
└── hooks/
    ├── use-gym.ts                 # Contexto del gym actual
    └── use-toast.ts              # Sonner wrapper
```

---

## Server Actions — mutations sin API layer

Para el backoffice en Next.js, las Server Actions eliminan la necesidad de una capa de API routes para mutaciones:

```ts
// features/members/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createMember(data: CreateMemberInput): Promise<ActionResult<Member>> {
  const { gymId } = await getSession()

  try {
    const member = await db.transaction(async (tx) => {
      // insert member + membership
      return tx.insert(members).values({ ...data, gymId }).returning()
    })

    revalidatePath('/members')  // invalida el cache de la lista
    return { success: true, data: member[0] }
  } catch (err) {
    return { success: false, error: 'No se pudo crear el cliente' }
  }
}
```

Llamada desde Client Component:
```tsx
'use client'
import { createMember } from '../actions'

async function handleSubmit(data: FormData) {
  const result = await createMember(data)
  if (result.success) {
    toast.success('Cliente creado')
    router.push(`/members/${result.data.id}`)
  } else {
    toast.error(result.error)
  }
}
```

---

## Data Fetching — TanStack Query para client state

Aunque Next.js maneja el server-side fetching, TanStack Query es ideal para:
- Datos que cambian frecuentemente (ocupación de clases en tiempo real)
- Búsqueda / filtros interactivos
- Optimistic updates

```tsx
// Búsqueda de clientes con TanStack Query
function MemberSearch() {
  const [query, setQuery] = useState('')

  const { data } = useQuery({
    queryKey: ['members', 'search', query],
    queryFn: () => searchMembers(query),
    enabled: query.length > 2,
    staleTime: 30_000,  // 30s de cache
  })

  return (
    <Command>
      <CommandInput value={query} onValueChange={setQuery} />
      <CommandList>
        {data?.map(m => <CommandItem key={m.id}>{m.name}</CommandItem>)}
      </CommandList>
    </Command>
  )
}
```

Optimistic update para toggle de estado:
```tsx
const { mutate } = useMutation({
  mutationFn: toggleMemberStatus,
  onMutate: async (memberId) => {
    await queryClient.cancelQueries({ queryKey: ['members'] })
    const previous = queryClient.getQueryData(['members'])
    queryClient.setQueryData(['members'], (old) =>
      old.map(m => m.id === memberId ? { ...m, active: !m.active } : m)
    )
    return { previous }  // para rollback
  },
  onError: (err, _, context) => {
    queryClient.setQueryData(['members'], context.previous)
    toast.error('Error al actualizar')
  },
})
```

---

## Estado global mínimo — Zustand

Solo para estado global real (no datos del servidor):

```ts
// store/gym-store.ts
import { create } from 'zustand'

type GymStore = {
  selectedClassId: string | null
  setSelectedClass: (id: string | null) => void
  filters: MemberFilters
  setFilters: (filters: Partial<MemberFilters>) => void
}

export const useGymStore = create<GymStore>((set) => ({
  selectedClassId: null,
  setSelectedClass: (id) => set({ selectedClassId: id }),
  filters: { status: 'all', planId: null },
  setFilters: (filters) => set(prev => ({
    filters: { ...prev.filters, ...filters }
  })),
}))
```

**Regla:** TanStack Query para datos del servidor. Zustand para UI state (selección, filtros, modales).

---

## Formularios con validación — patrón estándar

```ts
// features/members/schemas.ts
import { z } from 'zod'

export const createMemberSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\+?56\d{9}$/, 'Teléfono chileno inválido').optional(),
  planId: z.string().uuid('Selecciona un plan'),
})

export type CreateMemberInput = z.infer<typeof createMemberSchema>
```

```tsx
// features/members/components/member-form.tsx
'use client'
function MemberForm({ onSuccess }: { onSuccess: (member: Member) => void }) {
  const form = useForm<CreateMemberInput>({
    resolver: zodResolver(createMemberSchema),
  })

  async function onSubmit(data: CreateMemberInput) {
    const result = await createMember(data)
    if (result.success) onSuccess(result.data)
    else form.setError('root', { message: result.error })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* campos */}
        {form.formState.errors.root && (
          <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Guardando...' : 'Crear cliente'}
        </Button>
      </form>
    </Form>
  )
}
```

---

## Testing frontend — qué testear

```ts
// Solo testear comportamiento, no implementación
// Herramienta: Vitest + Testing Library

// ✅ Testear formulario con validación
it('muestra error cuando el email es inválido', async () => {
  render(<MemberForm onSuccess={vi.fn()} />)
  await userEvent.type(screen.getByLabelText('Email'), 'no-es-email')
  await userEvent.click(screen.getByRole('button', { name: 'Crear cliente' }))
  expect(screen.getByText('Email inválido')).toBeInTheDocument()
})

// ✅ Testear lógica de negocio en hooks
// ❌ No testear que shadcn Button renderiza un <button> (ya lo testa shadcn)
```

---

## Recursos
- [TanStack Query docs](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Testing Library](https://testing-library.com/)
