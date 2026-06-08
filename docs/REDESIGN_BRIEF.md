# Forja Backoffice — Brief de rediseño (sistema compartido)

Estás rediseñando mockups HTML estáticos del backoffice de **Forja** (gestión de gimnasios crossfit).
Marca: ember `#FB5215`. Tono: denso, tipo "ops console", identidad crossfit (Rx/Scaled, formatos WOD).
Sirve a gimnasios con **30–200 socios** → todo debe ESCALAR.

## Sistema compartido — USAR SIEMPRE (no duplicar config Tailwind)

Cada página parte con este `<head>` exacto (ajusta el `<title>`):

```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forja · NOMBRE</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="../assets/forja.config.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/forja.css">
<script src="../assets/forja.js"></script>
</head>
```

El `<body>` declara la página y el chrome se inyecta solo (sidebar colapsable + topbar):

```html
<body data-page="PAGE_ID" data-title="Título" data-eyebrow="Forja Box · Providencia"
      data-cta-label="Nueva clase" data-cta-href="calendario.html">  <!-- cta opcional -->
<div data-fj-content>
  <div class="fj-pad fj-maxw space-y-5">
    ...CONTENIDO DE LA PÁGINA...
  </div>
</div>
</body>
```

- `data-page` válidos: `dashboard, clientes, calendario, clases, rutinas, planes, pagos, metricas, competencias, config`.
- **NO** escribas el sidebar ni el topbar a mano (los inyecta `forja.js`).
- **NO** uses `<main>` con `h-screen`/`min-h-screen` ni `overflow` propio: el shell ya resuelve el scroll.

## Clases del sistema (forja.css) — preferir sobre Tailwind crudo

- Layout contenido: `.fj-pad` (padding 24px) + `.fj-maxw` (max 1180px centrado). Formularios: `.fj-form-w` (max 780px).
- Superficie: `.fj-panel` (card blanca, borde ink-200, radio 16). Título de sección: `.fj-section-h`. Eyebrow: `.fj-eyebrow`.
- **Lista** (DEFAULT para muchos ítems): `.fj-list` > `.fj-list-head` + filas `.fj-row` (clickeable) / `.fj-row-static`.
- **Tabla** (datos tabulares densos, 50–200 filas): `.fj-table` (thead sticky incluido). Envuélvela en `.fj-list` para el borde.
- Botones: `.fj-btn` + `.fj-btn-primary` / `.fj-btn-ghost` / `.fj-btn-danger` (+ `.fj-btn-sm`). Icono: `.fj-icon-btn`.
- Badges: `.fj-badge` + `-success/-warning/-danger/-info/-neutral/-brand`. Punto de color: `.fj-dot`.
- Pills de filtro: `.fj-pills` > `.fj-pill[aria-selected="true"]`.
- **Identidad crossfit**: `.fj-fmt` (chip mono mayúscula) + `-amrap/-emom/-fortime/-tabata`. Rx/Scaled: `.fj-tag-rx`.
- Formularios: `.fj-label`, `.fj-input` (inputs/selects/textarea).
- Color por modalidad (CSS vars): `--m-crossfit` (ember), `--m-gimnasia` (azul), `--m-haltero` (morado), `--m-endurance` (verde). Úsalas como `style="background:var(--m-crossfit)"` en `.fj-dot`.

## Barra flotante de GUARDAR (reemplaza botones inline cortados)

En páginas de formulario NO pongas "Guardar/Cancelar" al final del scroll (se cortan). Usa la barra flotante:

```html
<script>
Forja.SaveBar.bindDirty('[data-fj-content]', { msg:'Tienes cambios sin guardar' });
</script>
```
Aparece sola al editar cualquier campo. (Para mostrarla manual: `Forja.SaveBar.mount().show()`.)

## Doctrina CARD vs LISTA (regla, no decoración)

- **Card** solo si: pocos ítems (≤6), heterogéneos, visuales, actúas sobre cada uno como objeto, o un "hero" único.
- **Lista/tabla** si: muchos, homogéneos, comparables, escala a 30–200+. Es el DEFAULT.
- **PROHIBIDO**: la "banda de color en el borde superior" de los cards (`<div class="h-1 bg-brand">`). Eliminada. El color de modalidad va como `.fj-dot` o acento sutil.

## Tono visual

- Tipografía: títulos `font-display` (Space Grotesk), números/datos `font-mono` (JetBrains Mono), cuerpo Inter.
- Densidad alta pero aireada; hover sutil en filas; nada de sombras pesadas.
- Estados con badges semánticos. Empty states con `.fj-empty`.
- No uses Material-ish genérico. Mira `backoffice/dashboard.html` ya rediseñado como REFERENCIA de tono y uso del sistema.

## Reglas de trabajo

- NO uses Playwright (hay una sesión de browser en uso). Solo escribe HTML limpio siguiendo el sistema.
- NO toques `assets/*` ni `dashboard.html`.
- Datos de ejemplo realistas en español chileno (nombres, RUT, planes, $CLP).
- Mantén accesibilidad: `aria-label` en icon-buttons, `alt` en imágenes de contenido.
