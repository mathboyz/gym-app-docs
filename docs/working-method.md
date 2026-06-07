# Cómo trabajamos

## Herramienta principal

**Miro** — board compartido donde se definen todas las secciones antes de tocar código.

Link: https://miro.com/app/board/uXjVJ8uke40=/

## Fases del proyecto

```
Definiciones funcionales → Mockups HTML → Modelos → Implementación
        ← estamos aquí →
```

## Cómo se define cada módulo

Por cada sección se trabajan estas capas en orden:

1. **Funcionalidades** — qué hace el módulo, acciones posibles
2. **Campos** — qué datos maneja, tipos, restricciones
3. **Conexiones** — cómo se relaciona con otros módulos
4. **Dudas** — decisiones abiertas que bloquean o afectan el diseño

Una vez que las 4 capas están claras en Miro:
5. **Mockups HTML** — prototipo visual rápido
6. **Modelo de datos** — esquema Drizzle
7. **Implementación** — código

## Convenciones

- Código en **inglés**
- Conversación, comentarios de PR y docs en **español chileno**
- Cada módulo tiene su archivo en `docs/modules/`
- Decisiones técnicas importantes van en `docs/decisions/` como ADRs

## Equipo

4 desarrolladores — Greenbird
