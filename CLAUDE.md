# gym-app-docs — repo público de Forja (prototipos + contexto navegable)

Este repo es el **showcase público** de Forja: prototipos navegables y documentos
de contexto. No tiene código de producto (eso vive en `forja-platform`) ni las
decisiones normativas (esas viven en `forja-mcp`, privado).

Si llegaste acá para *implementar* o *decidir reglas de negocio*, estás en el repo
equivocado: acá se **muestra** y se **documenta** el contexto abierto.

## Regla que no se rompe: esto es PÚBLICO

- **`gym-app-docs` publica todo su contenido tal cual** (GitHub Pages). Asumí que
  cualquier archivo que agregues acá queda visible en internet.
- **Nunca** entra material sensible: nombres reales de clientes, transcripciones,
  cifras de negocio, análisis de competidores ni decisiones internas. Todo eso
  vive SOLO en `forja-mcp` (privado). Antes de mover algo desde `forja-mcp`, revisa
  que no traiga nada de eso.

## Qué es Forja

Plataforma de gestión para boxes de CrossFit/funcional en Chile. Reemplaza a NFIT
(gestión) + WodUp (entrenamiento) en una sola app, en español chileno, con
gamificación y comunidad. El contexto completo y normativo está en `forja-mcp`.

## Qué hay acá

```
docs/                Base de conocimiento abierta: vision, architecture,
                     working-method, data-model, modules/, surfaces/
design-system/       Doctrina visual + styleguide
assets/              CSS/JS que las pantallas sueltas (app/, backoffice/) necesitan
app/                 Pantallas sueltas de la app (dependen de assets/)
backoffice/          Pantallas del dashboard (dependen de assets/)
fragua-redesign-*.html   Prototipos de la app del atleta (ver abajo)
index.html           Portada del showcase
```

## Prototipos: cuál manda

`fragua-redesign-electrico.html` (oscuro) es el **prototipo canónico vigente** de la
app del atleta: 26 pantallas, flujo completo, interacciones reales.
`-light.html` es el mismo en tema claro (mismos ids y lógica; solo cambia la
paleta). Un cambio estructural va a los dos o quedan desincronizados.

Las propuestas `fragua-redesign-{ios,moderna,aurora,molar-app,proposal}.html` y
`fragua-ronda1.html` son **históricas**: no construyas contra ellas.

A diferencia de la copia en `forja-mcp/mockups/`, **este repo sí trae `assets/`**,
así que las pantallas sueltas de `app/` y `backoffice/` se ven con su estilo real
(sírvelas por HTTP; `file://` bloquea esos assets).

## Sincronización con forja-mcp

`forja-mcp/mockups/` mantiene su propia copia de los prototipos eléctrico. Si
cambias un prototipo acá, sincroniza también allá (y viceversa) para que no
diverjan.

## Convenciones

- **Español chileno, tuteado.** Vocabulario oficial: pizarra (la clase del día) ·
  el muro = Comunidad (feed) · chócala (reacción) · la Forja (ceremonia de PR) ·
  disco (tier de PR) · racha · misión · WOD · Rx/Scaled (solo sugerencia de
  prescripción, no tag de resultado).
- Al citar archivos, usa rutas **relativas al repo**, nunca absolutas de tu máquina.

## Dónde está el resto

- **Código de producto y reglas técnicas:** `forja-platform` (ver su `CLAUDE.md`).
- **Contexto normativo, fuentes de verdad, specs, ADRs y material de clientes
  (privado):** `forja-mcp` (ver su `CLAUDE.md`).

## Git

Rama de trabajo actual: `feature/ui-redesign`. Conventional commits. Si un cambio
toca el prototipo canónico, recuerda sincronizar la copia de `forja-mcp/mockups/`.
