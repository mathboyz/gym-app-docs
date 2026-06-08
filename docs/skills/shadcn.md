# shadcn/ui

**Categoría:** Frontend · UI Components · **Prioridad:** 🔴 Alta
**Superficie:** Web Dashboard (Next.js)

---

## Por qué importa en este proyecto

Es el sistema de componentes del backoffice. No es una librería instalada — los componentes se copian al repo y se modifican. Esto significa control total sobre el diseño, sin pelear contra estilos de terceros.

## Conceptos clave

### No es una librería — es código tuyo
```bash
# El componente se copia a tu repo
npx shadcn@latest add button
# → genera src/components/ui/button.tsx
# Lo puedes modificar como quieras
```

### Stack que usa internamente
- **Radix UI** — primitivos accesibles (Dialog, Popover, Select, etc.) sin estilos
- **Tailwind CSS** — utilidades de estilo
- **class-variance-authority (cva)** — variantes de componentes tipadas
- **clsx + tailwind-merge** — combinar clases sin conflictos

### Variantes con cva
```ts
// Así están construidos los componentes
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default:  'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:  'border border-input bg-background hover:bg-accent',
        ghost:    'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-9 px-3',
        lg:      'h-11 px-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)
```

### CSS Variables — theming por gym
Los colores de shadcn son CSS variables. Para el branding multi-tenant (cada gym tiene sus colores), se cambian las variables dinámicamente:
```css
/* globals.css — tema por defecto */
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

/* Aplicar branding del gym dinámicamente */
```
```ts
// En el layout del dashboard
<div style={{
  '--primary': gymBranding.colorPrimary,
  '--primary-foreground': gymBranding.colorButtonText,
} as React.CSSProperties}>
```

## Componentes más usados en el proyecto

| Componente | Usado en |
|-----------|----------|
| `DataTable` | Listado de clientes, reservas, pagos |
| `Calendar` | Vista del calendario de clases |
| `Dialog` | Modales de crear/editar |
| `Form` + `Input` | Formularios con React Hook Form + Zod |
| `Badge` | Estado de reservas, planes, miembros |
| `Sheet` | Panel lateral de detalle |
| `Tabs` | Perfil del cliente (plan, historial, métricas) |
| `Chart` | Métricas del dashboard |
| `Command` | Búsqueda de clientes |
| `Sonner` (toast) | Feedback de acciones |

## Formularios — React Hook Form + Zod + shadcn

```tsx
const schema = z.object({
  email: z.string().email(),
  planId: z.string().uuid(),
})

function CreateMemberForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <FormField control={form.control} name="email" render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </Form>
  )
}
```

## Recursos
- [shadcn/ui docs](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [cva docs](https://cva.style/docs)
