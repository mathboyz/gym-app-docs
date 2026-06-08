# Forja · Mockups — contexto para trabajar el repo

Mockups HTML estáticos navegables del producto **Forja** (plataforma de gestión de gimnasios crossfit).
Este doc es la fuente de contexto para cualquiera (humano o IA) que vaya a extender o mantener los mockups.

## Qué hay

Dos superficies + un gallery:

- **Backoffice del gym** (desktop) → `backoffice/*.html`
- **App del atleta** (mobile) → `app/*.html`
- **Gallery / índice** → `index.html` (lista todas las pantallas; tiene toggle de tema)
- La app entra por `app/login.html`.

Cada gimnasio es un **tenant** (un "Box" branded). "Forja" es la plataforma. El onboarding lo lidera
el gym (no hay auto-registro: el box crea la cuenta y el atleta la **activa**). Backend pensado
multi-tenant con RLS.

## Sistema de diseño compartido — úsalo siempre, no dupliques nada

| Archivo | Qué hace |
|---|---|
| `assets/forja.config.js` | Config de Tailwind (CDN) + aplica el tema guardado + inyecta favicon. Va en **todas** las páginas. |
| `assets/forja.css` | Tokens (variables `--fj-*`), shell, componentes y **tema claro/oscuro** vía `[data-theme="dark"]`. |
| `assets/forja.js` | **Backoffice**: inyecta sidebar (colapsable, Cmd+B) + topbar (toggle de tema + notificaciones) desde los `data-*` del `<body>`. Helpers `Forja.Drawer`, `Forja.SaveBar`, `Forja.DnD`. |
| `assets/forja-app.css` | **App móvil**: frame de teléfono, app-bar, área de scroll, bottom tab bar y componentes mobile. |
| `assets/forja-app.js` | **App móvil**: inyecta la bottom tab bar desde `data-app-tab`. Helper `ForjaApp.toggleTheme()`. |

### Componentes principales
- **forja.css**: `.fj-panel`, `.fj-list`/`.fj-row`/`.fj-row-static`, `.fj-table`, `.fj-btn(-primary/-ghost/-danger/-success)`, `.fj-icon-btn`, `.fj-badge-*` (success/warning/danger/info/neutral/brand), `.fj-dot`, `.fj-pill`, `.fj-fmt` + `-amrap/-emom/-fortime/-tabata` (chips WOD mono), `.fj-tag-rx`, `.fj-label`/`.fj-input`, `.fj-drawer`, savebar (`Forja.SaveBar`).
- **forja-app.css**: `.app-frame`, `.app-bar`, `.app-screen`, `.acard`/`.acard-pad`, `.arow`, `.atile`, `.a-av` (avatar), `.a-ring`, `.a-prog`, `.a-btn(-primary/-ghost)`, `.a-hero` (card oscura siempre), `.a-seg` (tabs segment), `.a-switch` (toggle), `.a-lvl` (badge de nivel), `.auth-wrap` (login/activar/recuperar).

## Estructura del `<body>`

**Backoffice:**
```html
<body data-page="clientes" data-title="Clientes" data-eyebrow="Forja Box · Providencia"
      data-cta-label="Nuevo cliente" data-cta-href="nuevo-cliente.html">
  <div data-fj-content>
    <div class="fj-pad fj-maxw space-y-5"> …contenido… </div>
  </div>
</body>
```
`data-page` válidos: `dashboard, clientes, calendario, clases, rutinas, ejercicios, planes, pagos, mensajes, metricas, resenas, competencias, config`. El sidebar y topbar se inyectan solos (no los escribas a mano). Páginas inmersivas (calendario, constructores) usan `data-immersive` y arman su propia barra.

**App móvil:**
```html
<body data-app-tab="hoy">   <!-- hoy | reservar | ranking | social | perfil -->
  <div class="app-frame">
    <header class="app-bar"> … </header>
    <main class="app-screen space-y-4"> …contenido… </main>
  </div>
</body>
```
La bottom tab bar se inyecta sola. Pantallas que NO son de tab (detalles, formularios, auth) omiten `data-app-tab` y llevan un botón "atrás" en el app-bar.

## Reglas duras

1. **NUNCA bordes/bandas de color de un solo lado** (border-top/left de acento, franjas decorativas). Para acento: borde completo, fondo tintado `rgba()`, `.fj-dot`, badge o texto en color.
2. **No hardcodees colores claros** (fondos `#fff`/hex claros, textos de acento oscuros) — rompen el dark. Usa `var(--fj-*)`, tints `rgba()`, y para acentos sobre tints usa las variables `--tier-gold/silver/bronze` y `--tx-blue/teal/green/purple/ember` (flipean por tema y sirven en estilos inline).
3. **No uses clases Tailwind con `!important`** (ej. `!bg-white`) — escapan al override de tema.
4. **Card vs lista**: lista/tabla por defecto (escala a 30–200+ socios); card solo para pocos ítems heterogéneos o un hero único.
5. Idioma **es-CL tuteado**. Marca **ember `#FB5215`**. Identidad crossfit: Rx/Scaled, formatos WOD (AMRAP/EMOM/For Time/Tabata), tiers Bronce→Diamante, XP/niveles/rachas.

## Para agregar una pantalla nueva

1. Copia el `<head>` canónico de cualquier `.html` (CDN Tailwind + `forja.config.js` + fuentes + `forja.css` (+ `forja-app.css` si es app) + `forja.js`/`forja-app.js`).
2. Usa el `<body data-page>` (backoffice) o `<body data-app-tab>` (app).
3. Arma el contenido con las clases del sistema.
4. Verifica en **claro Y oscuro** y que **todos los links** apunten a archivos que existen.
5. Agrégala al `index.html`.

## Estado actual

Verificado: **todas las páginas conectadas (0 links rotos, 0 huérfanas)**, consola limpia, todo en claro/oscuro.
Briefs de referencia usados al construir: `docs/REDESIGN_BRIEF.md` (backoffice) y `docs/REDESIGN_BRIEF_APP.md` (app).

## Previsualizar

```bash
python3 -m http.server 8848   # en la raíz del repo
# abrir http://localhost:8848  → arranca en index.html
```
