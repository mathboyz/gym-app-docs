# NestJS

**Categoría:** Framework · **Prioridad:** 🔴 Alta

---

## Por qué importa en este proyecto

Es el framework del backend. Todo el modular monolith vive en NestJS — módulos, providers, guards, pipes, interceptors. Hay que entenderlo a fondo para estructurarlo bien con DDD.

## Temas clave

### Módulos como bounded contexts
```ts
@Module({
  imports: [DrizzleModule, EventBusModule],
  providers: [
    ReservationService,
    { provide: RESERVATION_REPO, useClass: DrizzleReservationRepository },
  ],
  exports: [ReservationService],
})
export class ReservationsModule {}
```
Cada módulo = un bounded context. No importar providers de otro módulo directamente — pasar por el módulo.

### Dependency Injection y tokens
```ts
// Port (abstracto)
export const RESERVATION_REPO = Symbol('RESERVATION_REPO')
export interface ReservationRepository { ... }

// Binding en módulo
{ provide: RESERVATION_REPO, useClass: DrizzleReservationRepository }

// Uso en service
constructor(
  @Inject(RESERVATION_REPO) private repo: ReservationRepository
) {}
```

### Guards (autenticación + tenant)
```ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean { ... }
}

// Guard de tenant: extrae gym_id del JWT y lo inyecta en el request
```

### Interceptors (logging, transform)
```ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap(() => logger.log('request completed'))
    )
  }
}
```

### Pipes (validación)
```ts
// class-validator + class-transformer + ValidationPipe global
app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
```

### Exception filters
```ts
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) { ... }
}
```

## Estructura de carpetas por módulo
```
src/modules/reservations/
  domain/
    reservation.entity.ts
    reservation.repository.ts   ← interface (port)
    events/
  application/
    use-cases/
    dtos/
  infrastructure/
    drizzle-reservation.repository.ts  ← adapter
    reservations.controller.ts
  reservations.module.ts
```

## Recursos
- [NestJS docs](https://docs.nestjs.com/)
- [NestJS + DDD — enterprise patterns](https://docs.nestjs.com/recipes/cqrs)
