# Interface Design — Patrones y Componentes

**Categoría:** Frontend · Diseño de interfaces · **Prioridad:** 🟡 Media
**Referencia:** Patrones de UI, Design Systems, Atomic Design

---

## Por qué importa en este proyecto

Definir patrones de interfaz antes de construir evita inconsistencias (cada dev hace las cosas diferente) y acelera el desarrollo (hay decisiones ya tomadas para cada situación).

---

## Design System mínimo del proyecto

### Tokens de diseño

```ts
// Están en CSS variables via shadcn + Tailwind
// Colores semánticos (no usar colores directos)
--background        // fondo de página
--foreground        // texto principal
--primary           // color del gym (theming)
--primary-foreground
--muted             // backgrounds sutiles
--muted-foreground  // texto secundario
--destructive       // errores, eliminar
--border            // bordes

// Espaciado: usar escala de Tailwind (4, 6, 8, 12, 16, 24)
// NO usar valores arbitrarios (p-[13px])
```

### Tipografía — 4 estilos máximo

```tsx
// Título de página
<h1 className="text-2xl font-bold tracking-tight">Clientes</h1>

// Título de sección / card
<h2 className="text-lg font-semibold">Plan activo</h2>

// Texto de cuerpo
<p className="text-sm text-foreground">Descripción</p>

// Metadata / labels secundarios
<span className="text-xs text-muted-foreground">Vence 30 jun</span>
```

---

## Patrones de pantalla — Backoffice

### Patrón: List + Detail (más común en backoffice)

```
┌─────────────────────────────────────────────┐
│ Clientes        [Buscar...] [Filtros] [+ Nuevo] │
├─────────────────────────────────────────────┤
│ ☐ Juan Pérez    CrossFit 12  Activo  $50.000 │ ← row con acciones inline
│ ☐ María García  HIIT 8       Moroso  $30.000 │
│ ☐ Pedro López   CrossFit 12  Activo  $50.000 │
└─────────────────────────────────────────────┘
                    ↓ click en fila
┌─── Sheet lateral ─────────────────────────┐
│ Juan Pérez                           [×]  │
│ Tabs: [Plan] [Historial] [Métricas]       │
│ ...                                       │
└───────────────────────────────────────────┘
```

Implementación:
```tsx
// El detail abre en Sheet para no perder el contexto de la lista
<Sheet open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
  <SheetContent>
    <MemberDetail member={selectedMember} />
  </SheetContent>
</Sheet>
```

### Patrón: Dashboard con métricas

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 45       │ │ 12       │ │ 87%      │ │ $2.4M    │
│ Activos  │ │ Nuevos   │ │ Ocup.    │ │ MRR      │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
┌─────────────────────────┐ ┌───────────────────────┐
│ Clases de hoy           │ │ Alertas               │
│ [gráfico de barras]     │ │ • 3 pagos vencidos    │
└─────────────────────────┘ └───────────────────────┘
```

### Patrón: Crear/Editar en Dialog (no página nueva)

Para entidades simples (profesionales, planes) — usar Dialog:
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Nuevo Profesional</DialogTitle>
    </DialogHeader>
    <ProfessionalForm onSuccess={() => setOpen(false)} />
  </DialogContent>
</Dialog>
```

Para entidades complejas (clientes, competencias) — usar página propia.

---

## Patrones de pantalla — App Móvil

### Patrón: Home Screen

```
┌─────────────────────┐
│ 👋 Hola, Juan       │  ← greeting personalizado
│ Semana 3 · Nivel 7  │  ← contexto gamificación
├─────────────────────┤
│ WOD DE HOY          │  ← siempre visible
│ 21-15-9 Thruster... │
│ [Ver completo]      │
├─────────────────────┤
│ TU PRÓXIMA CLASE    │  ← si tiene reserva
│ Hoy 18:00 CrossFit  │
│ [Confirmar] [Ver]   │  ← CTAs de la acción pendiente
├─────────────────────┤
│ RACHA: 🔥 5 días    │  ← gamification hook
└─────────────────────┘
```

### Patrón: Lista con estados de carga

```tsx
// ✅ Skeleton, no spinner de página completa
function ClassList() {
  if (isLoading) return <ClassListSkeleton />
  if (error) return <ErrorState onRetry={refetch} />
  if (classes.length === 0) return <EmptyState />
  return <>{classes.map(c => <ClassCard key={c.id} class={c} />)}</>
}

function ClassListSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
  ))
}
```

### Patrón: Confirmación de acción crítica

Para acciones destructivas o irreversibles:
```tsx
// Confirmar reserva (crítico → dialog)
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Confirmar reserva</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Confirmar asistencia</AlertDialogTitle>
    <AlertDialogDescription>
      Clase del Martes 18:00 — CrossFit. Al confirmar, tu cupo queda reservado
      y no podrá cancelarse.
    </AlertDialogDescription>
    <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
    <AlertDialogCancel>Cancelar</AlertDialogCancel>
  </AlertDialogContent>
</AlertDialog>
```

---

## Componentes compuestos reutilizables

### StatusBadge — estado de reserva/membresía

```tsx
const statusConfig = {
  pending_confirmation: { label: 'Por confirmar', variant: 'outline' },
  confirmed:            { label: 'Confirmada',    variant: 'default' },
  auto_cancelled:       { label: 'Cancelada',     variant: 'secondary' },
  waitlist:             { label: 'Lista de espera', variant: 'outline' },
} satisfies Record<ReservationStatus, BadgeConfig>

function StatusBadge({ status }: { status: ReservationStatus }) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
```

### MetricCard — para el dashboard

```tsx
function MetricCard({ title, value, delta, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {delta && (
          <p className={cn("text-xs", trend === 'up' ? 'text-green-600' : 'text-red-600')}>
            {trend === 'up' ? '↑' : '↓'} {delta} vs mes anterior
          </p>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## Recursos
- [Atomic Design — Brad Frost](https://atomicdesign.bradfrost.com/)
- [UI Patterns](https://ui-patterns.com/)
- [shadcn/ui blocks](https://ui.shadcn.com/blocks)
