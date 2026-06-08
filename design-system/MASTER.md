# Forja — Design System (MASTER)

> Fuente de verdad del diseño para los mockups del gym-management app.
> Marca **placeholder** = "Forja" (brandeable por gimnasio). Inspirado en Musio + Nimalia.
> Última actualización: 2026-06-07

---

## ★ DIRECCIÓN VIGENTE: v1 LIMPIO (la v2 "Athletic Editorial" fue DESCARTADA por Patrick)

> La v2 (Archivo, papel cálido, negro, grano, bento extremo) NO gustó. **Vigente = v1 limpio y claro.** Gold standard: `design-system/styleguide.html`.

- **Tipografía v1:** `Space Grotesk` (títulos, font-display) + `Inter` (texto, font-sans) + `JetBrains Mono` (números, font-mono). Sin itálicas.
- **Backoffice = LIGHT:** `bg-ink-50`, superficies blancas, **cards con borde `ink-200` sutil (sin sombra)**, sidebar **clara** (blanca, borde derecho, item activo en `brand/10` + texto brand). Botones pill, chips de estado.
- **App = LIGHT también (NO negra):** fondo claro/blanco, **aireada, poca densidad de texto**, cards limpias. La gamificación va en claro (barras, badges, leaderboard sobre fondo claro). Bottom tab bar clara. *(El negro y la saturación de la v2 no gustaron.)*
- **NO usar:** Archivo, Hanken Grotesk, Space Mono, papel cálido, grano/noise, watermarks gigantes, bento asimétrico extremo, números gigantes saturados, dark mode.
- **`<head>` canónico v1:** cópialo de `design-system/styleguide.html` (Tailwind CDN + Google Fonts Space Grotesk/Inter/JetBrains Mono + `tailwind.config` con brand/ink/tier/semánticos + `<style>` `font-style:normal !important`).

## 🧭 Mapa de navegación (cablear hrefs reales en el sidebar/tabbar)

**Backoffice — sidebar** (item → archivo, marca el activo según la pantalla):
Dashboard → `dashboard.html` · Clientes → `clientes.html` · Calendario → `calendario.html` · Clases → `tipo-clases.html` · Rutinas → `constructor-rutina.html` · Planes → `planes.html` · Pagos → `pagos.html` · Métricas → `metricas.html` · Competencias → `competencias.html` · Configuración → `configuracion.html`. (El avatar/perfil cliente desde Clientes → `cliente-perfil.html`.)

**App — bottom tab bar** (5): Hoy → `hoy.html` · Reservar → `reservar.html` · Ranking → `ranking.html` · Social → `red-social.html` · Perfil → `perfil.html`.

> Todos los archivos del backoffice comparten EXACTO la misma sidebar (con estos hrefs) y topbar. Toda la app comparte la misma tab bar con estos hrefs.

---

## 0. Principios

1. **Moderno y atlético, no genérico.** Nada de estética "AI por defecto". Carácter: enérgico, premium, deportivo.
2. **Sin itálicas. Nunca.** El énfasis se logra con peso (500/600/700) y color.
3. **Dos temas, un sistema:**
   - **App del atleta → DARK** (energía, gamificación, se ve premium tipo Whoop/Strava).
   - **Backoffice del admin → LIGHT** (densidad de datos, tablas, productividad).
   - Misma marca, mismos tokens, mismas reglas.
4. **Brandeable por gimnasio:** el color `brand` es configurable por tenant. Todo lo demás (neutros, semánticos, tiers) es fijo.
5. **Bordes sobre sombras** en superficies (Musio). Sombra solo para flotantes (modales, dropdowns) y glow del CTA primario.
6. **Mobile-first** en la app (touch targets ≥ 44px). Copy **es-CL, tuteado, sentence case** (Nimalia).

---

## 1. Marca

- **Nombre:** Forja *(placeholder — cada gym pone el suyo)*
- **Tagline:** "Donde se forja tu mejor versión."
- **Logotipo (mockup):** wordmark en Space Grotesk 700 + ícono llama/yunque. En mockups uso el wordmark `Forja` con el punto/acento en color `brand`.
- **Personalidad:** fuerza + comunidad + juego (gamificación).

---

## 2. Color

### Marca — Ember (configurable por gym)
| Token | Hex |
|---|---|
| brand-50 | #FFF3EE |
| brand-100 | #FFE2D6 |
| brand-200 | #FFC4AD |
| brand-300 | #FF9E78 |
| brand-400 | #FF7340 |
| **brand-500 (base)** | **#FB5215** |
| brand-600 | #E0410A |
| brand-700 | #B83309 |
| brand-800 | #92290B |
| brand-900 | #76240E |

### Neutros — Ink (charcoal levemente frío)
`ink-950 #0C0D10` · `900 #131519` · `850 #181B20` · `800 #1F232B` · `700 #2B303A` · `600 #3A4150` · `500 #5A6172` · `400 #8A91A1` · `300 #B6BCC8` · `200 #D7DBE2` · `100 #EAECF1` · `50 #F6F7F9` · `white #FFFFFF`

### Semánticos
| Rol | Base | Uso |
|---|---|---|
| success | #18A957 | confirmaciones, asistencia, completado |
| warning | #E8A317 | por vencer, pendiente |
| danger | #E5484D | moroso, eliminar, error |
| info | #3E7BFA | informativo |

### Gamificación — Tiers (rango competitivo) y Podio
`bronce #C77B3C` · `plata #AEB7C4` · `oro #ECC04A` · `platino #61D2C4` · `diamante #6AA8FF`
Podio: 1º oro `#ECC04A` · 2º plata `#AEB7C4` · 3º bronce `#C77B3C`.
**Racha / fuego / XP** usan el color `brand` (ember).

### Tokens semánticos por tema
| Token | Light (Backoffice) | Dark (App) |
|---|---|---|
| `bg` (fondo app) | #F6F7F9 | #0C0D10 |
| `surface` (card) | #FFFFFF | #181B20 |
| `surface-2` (card elevada) | #FFFFFF | #1F232B |
| `border` | #D7DBE2 | rgba(255,255,255,.08) |
| `text` | #131519 | #F6F7F9 |
| `text-muted` | #5A6172 | #8A91A1 |
| `text-faint` | #8A91A1 | #5A6172 |

---

## 3. Tipografía (sin itálicas)

- **Display / Headings:** `Space Grotesk` (600, 700)
- **Texto / UI:** `Inter` (400, 500, 600, 700)
- **Números / timers / pesos / XP:** `JetBrains Mono` (500, 700) — usar en stats, reps, tiempos, cargas, contadores.

### Escala
| Token | Size / line-height | Peso | Familia |
|---|---|---|---|
| display | 44 / 48 | 700 | Space Grotesk |
| h1 | 32 / 38 | 700 | Space Grotesk |
| h2 | 26 / 32 | 600 | Space Grotesk |
| h3 | 21 / 28 | 600 | Space Grotesk |
| h4 | 18 / 24 | 600 | Inter |
| body-lg | 16 / 26 | 400 | Inter |
| body | 15 / 24 | 400 | Inter |
| sm | 14 / 20 | 400/500 | Inter |
| xs | 12 / 16 | 500 | Inter |
| overline | 11 / 16 · letter-spacing .08em · UPPERCASE | 600 | Inter |
| stat | 28–40 | 700 | JetBrains Mono |

---

## 4. Forma y elevación

- **Radius:** sm 8 · md 12 · lg 16 · xl 20 · 2xl 24 · full 9999.
  - Botones = **pill** (full). Cards = lg/xl (16–20). Inputs = md (12). Chips/badges = full.
- **Borde:** 1px. Light → `border` (#D7DBE2). Dark → white-alpha .08.
- **Sombras** (solo flotantes): `sm 0 1px 3px rgba(0,0,0,.08)` · `md 0 6px 18px rgba(0,0,0,.12)` · `lg 0 16px 40px rgba(0,0,0,.20)`. Dark profundiza.
- **Glow CTA (opcional, app):** `0 6px 20px rgba(251,82,21,.35)`.

---

## 5. Componentes (recetas)

- **Botón primario:** pill · `bg-brand-500 text-white font-semibold` · hover `bg-brand-600` · h-11 (app) / h-10 (backoffice) · px-5.
- **Botón secundario:** pill · borde + `text` · hover `bg` sutil.
- **Botón ghost:** sin borde · hover surface sutil.
- **Card:** `surface` · borde 1px · radius xl · padding 20–24 · sin sombra (sombra solo si flota).
- **Input:** h-11 · radius md · borde 1px · fondo `bg`/surface · focus `border-brand-500 + ring brand/30`.
- **Chip/Badge:** pill · `px-2.5 py-1 text-xs font-semibold` · color por estado (success/warning/danger/tier).
- **Tabla (backoffice):** header overline uppercase `text-faint`, filas con hover, divisores `border`.
- **Nav app:** bottom tab bar (5 íconos) en dark. **Nav backoffice:** sidebar izquierda en light.
- **Iconos:** SVG (Lucide), nunca emoji como ícono. Emoji solo decorativo puntual.

### Gamificación (componentes propios)
- **Barra XP:** track `surface-2`, fill `brand`, label mono "1.240 / 2.000 XP".
- **Nivel/Rango:** badge con color de tier + ícono.
- **Racha:** ícono llama + número mono + "días".
- **Leaderboard:** filas con avatar, posición (oro/plata/bronce en top 3), puntaje mono.
- **Logro robable:** card destacada con "en poder de @user".

---

## 6. Copy (es-CL)

- Tuteo, cercano. Sentence case (no Title Case). Sin punto en títulos/CTAs; con punto en descripciones.
- CTAs estándar: Guardar · Cancelar · Continuar · Reservar · Inscribirme.
- Errores en 2 partes: "No pudimos [X]. [Acción]." Éxitos cortos, sin signos: "Reserva confirmada".
- Sin itálicas. Emoji máximo 1 y solo celebratorio.

---

## 7. `<head>` canónico para cada mockup (copiar tal cual)

```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: { 50:'#FFF3EE',100:'#FFE2D6',200:'#FFC4AD',300:'#FF9E78',400:'#FF7340',500:'#FB5215',600:'#E0410A',700:'#B83309',800:'#92290B',900:'#76240E' },
        ink: { 950:'#0C0D10',900:'#131519',850:'#181B20',800:'#1F232B',700:'#2B303A',600:'#3A4150',500:'#5A6172',400:'#8A91A1',300:'#B6BCC8',200:'#D7DBE2',100:'#EAECF1',50:'#F6F7F9' },
        success:'#18A957', warning:'#E8A317', danger:'#E5484D', info:'#3E7BFA',
        tier: { bronce:'#C77B3C', plata:'#AEB7C4', oro:'#ECC04A', platino:'#61D2C4', diamante:'#6AA8FF' },
      },
      fontFamily: {
        display: ['"Space Grotesk"','sans-serif'],
        sans: ['Inter','sans-serif'],
        mono: ['"JetBrains Mono"','monospace'],
      },
      borderRadius: { md:'12px', lg:'16px', xl:'20px', '2xl':'24px' },
      boxShadow: {
        sm:'0 1px 3px rgba(0,0,0,.08)', md:'0 6px 18px rgba(0,0,0,.12)', lg:'0 16px 40px rgba(0,0,0,.20)',
        glow:'0 6px 20px rgba(251,82,21,.35)',
      },
    }
  }
}
</script>
<style> body{ -webkit-font-smoothing:antialiased; } *{ font-style:normal !important; } </style>
```

- **App (dark):** `<body class="bg-ink-950 text-ink-50 font-sans">`, ancho móvil 390–430px centrado.
- **Backoffice (light):** `<body class="bg-ink-50 text-ink-900 font-sans">`, layout con sidebar.

---

## 8. Pantallas a mockear

### App (dark, mobile)
1. Hoy / Home (próxima clase, racha, accesos) · 2. Ver clase (rutina por categorías) · 3. Reservar (calendario + cupos) · 4. Perfil (stats + feed + logros) · 5. Gamificación / Ranking · 6. Desafíos · 7. Duelos · 8. Red Social (feed) · 9. Multi-gimnasio (cambiar sede) · 10. Ajustes de cuenta.

### Backoffice (light, desktop)
1. Dashboard · 2. Clientes (lista + perfil 360) · 3. Calendario · 4. Tipo de Clases · 5. Constructor de rutina · 6. Planes · 7. Pagos · 8. Métricas · 9. Configuración (profes + branding) · 10. Competencias.

> Orden de construcción: **styleguide → 1 hero por plataforma (validar) → fan-out del resto en paralelo.**
