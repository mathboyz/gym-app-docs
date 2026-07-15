# Molar — Design System (draft)

> Sistema visual derivado del dashboard **Molar AI** (screenshots de referencia): SaaS de agente IA,
> luz limpia, blanco sobre gris muy claro, un único **panel héroe oscuro** para el agente, violeta
> como color de sistema, tarjetas definidas por **borde hairline** (no sombra) y un panel de chat
> lateral ("Ask Molar").
> Aplicado al **backoffice de Forja** (panel del dueño/coach). Modo claro.
>
> **Estado:** borrador. La dirección oficial es [MASTER.md](../design-system/MASTER.md).
> Showcase: [fragua-redesign-molar-app.html](../fragua-redesign-molar-app.html) *(variante app; backoffice pendiente)*.

---

## 0. Principios

1. **Luz plana, una sola sombra fuerte.** Todo es blanco sobre gris claro, definido por bordes
   hairline. La profundidad se reserva para **dos cosas**: el panel héroe del agente (indigo oscuro)
   y las pills oscuras de acción. El contraste ES la jerarquía.
2. **El agente IA es el protagonista.** Hay exactamente un bloque oscuro por pantalla — el estado
   "en vivo" del asistente. Nada más compite con él. La marca del producto es "la IA está trabajando".
3. **Violeta = sistema, no decoración.** El violeta marca lo interactivo y lo de la IA (nav activa,
   acciones del agente, progreso, sparkles). Los datos usan semánticos (verde/rojo/ámbar), no violeta.
4. **Densidad de datos legible.** Es un backoffice: mucha cifra, tabla y timeline. Números grandes en
   `tabular-nums`, labels chicos en gris, barras de progreso finas. Aireado pero productivo.
5. **Borde antes que sombra.** Superficies = `1px --border`. Sombra solo para flotantes (pills
   oscuras, dropdowns, el teléfono/ventana del showcase).
6. Backoffice desktop. Copy es-CL, tuteada, sentence case. Marca **placeholder** = "Forja".

---

## 1. Color

Extraído de los screenshots. Lienzo gris muy claro, app blanca, un acento violeta y un héroe indigo.

### Fondo y superficies
| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#ECEBF1` | Lienzo de la página (detrás de la app) |
| `--surface` | `#FFFFFF` | App, sidebar, tarjetas |
| `--surface-2` | `#FAFAFB` | Insets suaves: search, filas hover, mini-tiles |
| `--border` | `#ECEBF1` | Hairline de tarjeta (define la superficie) |
| `--border-2` | `#E4E2EC` | Hairline con un paso más de contraste (inputs) |
| `--sep` | `#F1F0F5` | Separadores dentro de listas/tablas |

### Tinta y texto
| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#1B1725` | Casi-negro: títulos, cifras, **pills oscuras** de acción |
| `--ink-press` | `#100C1A` | Pill oscura presionada |
| `--label` | `#211D2E` | Texto principal |
| `--label-2` | `#6E6B7B` | Texto secundario, labels de KPI |
| `--label-3` | `#9B98A8` | Terciario / captions / metadata |
| `--label-4` | `#C2BFD0` | Deshabilitado / placeholders / iconos inertes |

### Violeta (sistema + IA) — brandeable por gym
| Token | Hex | Uso |
|---|---|---|
| `--violet` | `#7A5AF8` | Acción/IA: nav activa, progreso, logo, sparkles |
| `--violet-press` | `#6A45F2` | Presionado |
| `--violet-soft` | `#EEEBFE` | Fondo de nav activa, chips de IA |
| `--violet-tint` | `#F4F1FE` | Tinte muy suave (hover, insets violeta) |

### Héroe del agente (panel oscuro, único por pantalla)
```
--hero: linear-gradient(135deg, #2C1E52 0%, #241A45 55%, #1E1638 100%);
--hero-glow: radial-gradient(120% 140% at 12% 0%, rgba(124,92,248,0.40), transparent 55%);
--hero-tile: rgba(255,255,255,0.055);      /* mini-tiles internos */
--hero-tile-bd: rgba(255,255,255,0.10);
--hero-label: rgba(255,255,255,0.62);
```

### Semánticos (datos y estados)
| Token | Hex | Soft |
|---|---|---|
| `--green` (ok/confirmado/aprobado) | `#12B76A` | `--green-soft #E7F7EF` |
| `--red` (ausencia/alerta) | `#F0645B` | `--red-soft #FDECEA` |
| `--amber` (por revisar/pendiente) | `#F5A623` | `--amber-soft #FCF3E1` |
| `--sky` (serie secundaria) | `#4E9BF0` | `--sky-soft #E9F2FD` |

### Tintes de tile (bloques de resumen tipo "claims")
`--tint-green #EAF7F0` · `--tint-violet #EFEDFB` · `--tint-amber #FBF2E1`

---

## 2. Tipografía

**Familia:** `Inter` (fallback `system-ui`). Sin itálicas. Énfasis con peso + color.

| Rol | Tamaño / Peso | Color |
|---|---|---|
| Saludo / H1 topbar | 22 / 600 | `--label` |
| Cifra héroe / KPI | 28–30 / 700, `tnum` | `--label` (o blanco en héroe) |
| Título de tarjeta | 16 / 600 | `--label` |
| Nav / headline | 14 / 500–600 | `--label` |
| Body | 14 / 400 | `--label-2` |
| Meta / timestamp | 13 / 400 | `--label-3` |
| Caption / label KPI | 12–13 / 500 | `--label-2` |
| Eyebrow de sección (WORKSPACE) | 12 / 600, uppercase, `0.04em` | `--label-3` |
| Números | `font-variant-numeric: tabular-nums` | — |

---

## 3. Espaciado, radios, sombras

- **Espaciado:** múltiplos de 4 (4·8·12·16·20·24). Padding de tarjeta 20px; gap de grilla 16px.
- **Radios:** app/ventana `18px` · tarjeta `16px` · héroe `18px` · input/pill-suave `12px` ·
  icon-chip `10px` · pill/badge/avatar `full` · barra de progreso `full`.
- **Sombras** (muy sutiles; la superficie la define el borde):
  - `--sh-card`: `0 1px 2px rgba(20,16,40,0.04)` — apenas un asiento.
  - `--sh-pop`: `0 10px 28px rgba(28,18,66,0.18)` — pills oscuras, dropdowns, chat result.
  - `--sh-win`: `0 40px 90px rgba(40,30,90,0.18)` — ventana del showcase.
- **Borde de foco:** `0 0 0 3px var(--violet-soft)` en inputs/botones.

---

## 4. Componentes

- **Sidebar** — blanco, borde derecho hairline. De arriba a abajo: logo (cuadro violeta + wordmark),
  **workspace switcher** (pill con ícono + nombre del box + chevron), **search** (input `--surface-2`
  con atajo `/`), secciones con eyebrow (Workspace / Manage), **nav items** (ícono + label + count
  badge), spacer, **user card** (avatar + nombre/rol + pill oscura "Pregúntale a Forja").
- **Nav item** — 40px alto, ícono 18px, radio 10px. Activo = fondo `--violet-soft` + texto/ícono
  `--violet` + peso 600. Count badge = número `--label-3` a la derecha (o pill si es alerta).
- **Topbar** — saludo H1 + subtítulo con dato **en violeta**; a la derecha: status pill ("Todo
  en orden" con dot verde) + **pill oscura CTA** con sparkle ("3 pagos por revisar").
- **Panel héroe del agente** — `--hero` + `--hero-glow`. Orbe con sparkle + pill "AGENTE IA · EN VIVO"
  (dot verde) + headline + pills de tarea en curso + 3 **mini-tiles** (`--hero-tile`) con label,
  cifra y micro-barras.
- **KPI card** — ícono-chip arriba-izq + label; cifra 28/700; sub en `--label-3`; fila "Progreso ·
  %"; **barra fina** coloreada por semántica (violeta ingreso, rojo ausencias, ámbar pendientes).
- **Barra de progreso** — pista `--sep` 6px full; relleno sólido del color semántico (no degradado).
- **Fila de actividad (feed)** — icon-chip cuadrado + texto (verbo en `--label` 600 + resto) + meta
  "✦ Asistente · hace Xm". Divisor `--sep`.
- **Timeline de agenda** — fila con hora + duración a la izquierda (borde izq de color según estado),
  nombre/clase, **chip de estado** a la derecha (verde confirmada, violeta recordatorio enviado).
- **Segmented tabs** — Hoy / Mañana / Semana con count; activa subrayada o con pill suave.
- **Chip de estado** — pill 12/600 con dot: verde/violeta/ámbar/rojo. Outline = `--border-2` + texto
  `--label-3`.
- **Stat tile tintado** — bloque `--tint-*` con ícono + label + cifra + monto; para resúmenes
  (Aprobados/Procesando/Revisar).
- **Panel de chat "Pregúntale a Forja"** — header con orbe + título + expand; fecha; burbujas
  (usuario claro, agente `--surface-2`); **chips de sugerencia** (borde violeta suave); **card de
  resultado** estructurada; input con adjuntos (link/imagen/archivo) + botón enviar circular oscuro;
  botón "Detener" pill oscura mientras genera.
- **Pill oscura (CTA/acción)** — fondo `--ink`, texto blanco, radio full, sparkle opcional,
  `--sh-pop`. Es el gesto de acción más fuerte de la interfaz; úsalo poco.
- **Icon-chip** — 32–36px, `--surface-2` + borde, ícono `--label-2`; en contexto IA va `--violet`.

---

## 5. Movimiento

- Entrada de vista: `320ms cubic-bezier(0.32,0.72,0,1)`, fade + `translateY(6px)`.
- Hover de tarjeta/fila: fondo `--surface-2` o borde `--border-2`, 150ms. Sin levantar (es flat).
- "En vivo": el dot verde del agente **pulsa** (opacity/scale loop 2s); las micro-barras del héroe
  pueden animar sutil. Nada más se mueve solo.
- Press: `scale(0.98)` + baja opacidad en pills.
- Streaming del chat: caret parpadeante + "Detener generación" visible. Sin scroll-jacking.

---

## 6. Qué evitar (anti-slop)

- **Más de un bloque oscuro** por pantalla: el héroe pierde su papel de foco.
- Violeta en datos/gráficos de negocio (usa semánticos); el violeta es de la IA y lo interactivo.
- Sombras en tarjetas normales: aquí manda el borde hairline. Sombra = flota de verdad.
- Degradados por todos lados: solo el héroe y el logo. El resto, color plano.
- Sparkles decorativos: el sparkle SIEMPRE significa "esto lo hizo/hace la IA".
- Cantos redondos en hairlines, separadores o números tabulares.

---

## 7. Mapa del showcase → backoffice de Forja

El SaaS de referencia es un panel dental con agente IA. Se mapea 1:1 al **panel del box**:

| Molar AI | Forja (backoffice) |
|---|---|
| Molar / agente IA | Asistente Forja (coach IA) |
| Beverly Hills Dental | box activo (ej. "CrossFit Providencia") |
| Appointments / No-show / Claims / Revenue | Reservas hoy / Ausencias / Pagos por revisar / Ingresos del mes |
| Today's schedule | Agenda de clases de hoy |
| Insurance Claims | Pagos / membresías (aprobados/procesando/revisar) |
| Ask Molar | Pregúntale a Forja |

`fragua-redesign-molar-app.html` valida el lenguaje sobre la app del atleta (Hoy · La pizarra · La
forja), con el mismo *shell* de propuesta que el resto de `fragua-redesign-*` (rail con contexto +
marco de teléfono + navegación por JS). La variante backoffice (Dashboard + Pagos) queda pendiente.
