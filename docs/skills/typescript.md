# TypeScript avanzado

**Categoría:** Lenguaje · **Prioridad:** 🔴 Alta

---

## Por qué importa en este proyecto

Con DDD, el dominio vive en tipos. Un `MemberId` no es un `string`, una `Money` no es un `number`. TypeScript bien usado hace que el compilador sea tu primera línea de defensa.

## Temas clave

### Branded / Nominal types
```ts
type MemberId = string & { readonly _brand: 'MemberId' }
type GymId    = string & { readonly _brand: 'GymId' }

// El compilador te impide pasar un GymId donde va un MemberId
function getReservations(memberId: MemberId) { ... }
```

### Discriminated unions (modelar estados)
```ts
type Reservation =
  | { status: 'pending_confirmation'; confirmationDeadline: Date }
  | { status: 'confirmed'; confirmedAt: Date }
  | { status: 'auto_cancelled'; cancelledAt: Date }
  | { status: 'waitlist'; position: number }

// Exhaustive check en switch
function handle(r: Reservation) {
  switch (r.status) {
    case 'pending_confirmation': ...
    case 'confirmed': ...
    // TypeScript error si falta un caso
  }
}
```

### Generics + constraints
```ts
interface Repository<T extends { id: string }> {
  findById(id: T['id']): Promise<T | null>
  save(entity: T): Promise<void>
}
```

### Utility types
`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `ReturnType`, `Awaited` — usarlos en vez de repetir tipos.

### `satisfies` operator
```ts
const config = {
  maxRetries: 3,
  timeout: 5000,
} satisfies JobConfig  // valida sin widening del tipo
```

## Recursos
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Type-level TypeScript](https://type-level-typescript.com/)
- Matt Pocock — [Total TypeScript](https://www.totaltypescript.com/)
