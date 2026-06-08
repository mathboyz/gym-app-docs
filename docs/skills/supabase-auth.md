# Supabase Auth

**Categoría:** Auth · **Prioridad:** 🟡 Media

---

## Por qué importa en este proyecto

Gestiona el ciclo completo de autenticación: invitar miembros por email, JWT con claims personalizados (gym_id, role), y es el que activa el RLS en PostgreSQL.

## Flujo de onboarding de un miembro

```
1. Admin crea member en backoffice (solo email)
2. Backend llama supabase.auth.admin.inviteUserByEmail()
3. Atleta recibe email → setea contraseña → completa perfil
4. Backend actualiza member.status = active / user_id = supabase_auth_id
```

```ts
// Invitar usuario
const { data, error } = await supabase.auth.admin.inviteUserByEmail(
  member.email,
  {
    redirectTo: `${APP_URL}/complete-profile`,
    data: { gym_id: gymId, member_id: memberId }
  }
)
```

## JWT y claims personalizados

```ts
// En Supabase: Auth Hook (SQL function) para agregar gym_id al JWT
CREATE OR REPLACE FUNCTION add_gym_claims(event jsonb)
RETURNS jsonb AS $$
  SELECT jsonb_set(
    event,
    '{claims,app_metadata}',
    event->'claims'->'app_metadata' || jsonb_build_object(
      'gym_id', (SELECT gym_id FROM members WHERE supabase_auth_id = (event->>'user_id')::uuid LIMIT 1)
    )
  )
$$ LANGUAGE sql;
```

## Validar JWT en NestJS

```ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const token = extractToken(ctx)
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return false

    const gymId = user.app_metadata?.gym_id
    const request = ctx.switchToHttp().getRequest()
    request.user = user
    request.gymId = gymId
    return true
  }
}
```

## RLS — setear contexto desde el JWT

```ts
// En cada request: setear gym_id para que el RLS lo use
await db.execute(sql`SET LOCAL app.current_gym_id = ${gymId}`)
```

## Recursos
- [Supabase Auth docs](https://supabase.com/docs/guides/auth)
- [Custom JWT claims](https://supabase.com/docs/guides/auth/auth-hooks)
- [NestJS + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nestjs)
