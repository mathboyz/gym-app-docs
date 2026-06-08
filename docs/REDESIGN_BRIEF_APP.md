# Forja APP móvil — Brief de rediseño

Rediseñas mockups HTML de la APP MÓVIL de Forja (gimnasios crossfit) al sistema compartido nuevo.
Marca ember `#FB5215`. Reusa el sistema del backoffice. Soporta **claro Y oscuro** con el mismo mecanismo.

## REGLAS DURAS
- **NUNCA bordes/bandas de color de un solo lado** (border-top/left de acento, franjas `h-1 bg-brand`). Para acento: borde completo, fondo tintado (rgba), punto `.fj-dot`, badge o texto en color.
- **NO uses colores hex claros hardcodeados para fondos/bordes** (rompen el dark). Usa variables `var(--fj-ink-*)`, `var(--fj-surface)`, o tints rgba (ej. `rgba(251,82,21,.12)`) que sirven en ambos temas. Para texto usa clases Tailwind `text-ink-*` (el tema las flipea) o `var(--fj-ink-*)`.
- NO uses clases Tailwind con `!` important (ej. `!bg-white`) — escapan al tema.

## Head exacto (ajusta `<title>`)
```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forja · NOMBRE</title>
<script>(function(){var w=console.warn;console.warn=function(){var a=arguments[0];if(typeof a==="string"&&a.indexOf("cdn.tailwindcss.com")!==-1)return;return w.apply(console,arguments)};})();</script>
<script src="https://cdn.tailwindcss.com"></script>
<script src="../assets/forja.config.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/forja.css">
<link rel="stylesheet" href="../assets/forja-app.css">
<script src="../assets/forja-app.js"></script>
</head>
```

## Estructura del body
```html
<body data-app-tab="hoy">   <!-- valores: hoy | reservar | ranking | social | perfil. Omitir si la pantalla NO es de tab (ej. detalle, crear-post, ajustes, multi-gimnasio) -->
<div class="app-frame">
  <header class="app-bar"> ... </header>
  <main class="app-screen space-y-4"> ...contenido... </main>
</div>
</body>
```
- La **bottom tab bar** se inyecta sola si pones `data-app-tab` (con FAB de Ranking al centro). NO la escribas a mano.
- Pantallas que NO son de tab (detalle-ejercicio, ver-clase, crear-post, ajustes, multi-gimnasio): NO pongas `data-app-tab`; su app-bar lleva un botón "atrás" (`fj-icon-btn` con flecha izquierda) y NO aparece tab bar. En `.app-screen` quita el padding-bottom extra si quieres (o déjalo).
- **App bar con back**: `<header class="app-bar"><a href="X.html" class="fj-icon-btn" aria-label="Volver"><svg ...flecha izquierda.../></a><div class="flex-1"><p class="a-eyebrow">…</p><p class="app-bar-title">Título</p></div></header>`

## Clases disponibles
De **forja.css** (compartidas): `.fj-badge` + `-success/-warning/-danger/-info/-neutral/-brand`, `.fj-dot`, `.fj-fmt` + `-amrap/-emom/-fortime/-tabata` (chips WOD mono), `.fj-tag-rx`, `.fj-icon-btn`, `.fj-pills`/`.fj-pill`, `.fj-notif-dot`. Tokens: `--fj-ink-*`, `--fj-surface`, `--fj-brand`, tiers.
De **forja-app.css** (mobile): `.acard`/`.acard-pad` (card), `.arow` (fila lista), `.atile`/`.atile-num`/`.atile-lbl` (stat), `.a-av` (avatar gradiente), `.a-ring`/`.a-ring.seen` (anillo story), `.a-prog`>`div` (barra progreso), `.a-btn`+`.a-btn-primary`/`.a-btn-ghost` (botón full-width 48px), `.a-hero` (card oscura hero/WOD, identidad), `.a-seg`>`[aria-selected]` (tabs segment), `.a-switch`[aria-checked] (toggle), `.a-eyebrow`, `.a-h`, `.a-sub`, `.a-muted`.

## Tono
- Tipografía: títulos `.a-h`/`font-display` (Space Grotesk), números `font-mono` (JetBrains Mono), cuerpo Inter.
- Gamificación: tiers (Bronce→Diamante), XP, niveles, rachas, logros, leaderboards. Chips de formato WOD. Mucho ember.
- Mira **app/hoy.html** ya rediseñado como REFERENCIA de tono, estructura y uso del sistema (app-bar, acards, hero, arow, tab bar, light/dark).
- Datos chilenos realistas. Idioma es-CL tuteado.

## Reglas de trabajo
- NO uses Playwright (browser en uso). NO toques assets/ ni hoy.html. Sobrescribe completo cada archivo asignado, leyéndolo antes para conservar el contenido/intención.
- Asegúrate de que TODO se vea bien en claro Y oscuro (no hardcodees fondos claros).
