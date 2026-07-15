---
version: 1.0
name: Aurora
description: >
  Soft-glass SaaS aesthetic derived from the "Tasklyn" dashboard: frosted white
  panels floating on a lavender aurora gradient, pastel category tints, one deep
  indigo for primary action, and a warm coral reserved for energy (streak / PR).
  Applied to the Forja athlete app. Light mode only.
status: draft            # NOT the official direction — that is design-system/MASTER.md
reference: Tasklyn dashboard (soft glassmorphism)
showcase: fragua-redesign-aurora.html

tokens:
  colors:
    bg: "linear-gradient(160deg,#ECE9F8 0%,#E4DEF2 55%,#EAD9E6 100%)"
    surface: "rgba(255,255,255,0.82)"       # frosted card
    surface-strong: "rgba(255,255,255,0.90)"
    surface-inset: "rgba(255,255,255,0.50)"
    glass-nav: "rgba(238,235,248,0.72)"     # + blur, for navbar/tabbar
    hairline: "rgba(255,255,255,0.70)"      # the lit top edge of glass
    line: "rgba(70,60,110,0.09)"
    ink: "#2E2A5C"          # deep indigo — primary action, max-contrast text
    ink-press: "#242049"
    text: "#262340"
    text-2: "#5C5878"
    text-3: "#8B87A5"
    text-4: "#B6B2CB"
    violet: "#8B7ED9"       # system / interactive
    violet-deep: "#6F61C4"
    violet-soft: "rgba(139,126,217,0.14)"
    coral: "#F0876A"        # brand energy — streak, PR (use sparingly)
    coral-soft: "rgba(240,135,106,0.16)"
    sky: "#A9C7E8"
    mint: "#5FBF9B"         # success
    amber: "#E4A64B"        # warning
    danger: "#E86A6A"
    tint-blue: "#DCE8F7"    # category / priority tints
    tint-lavender: "#E8E2F8"
    tint-peach: "#FBE3D7"
    gold: "#E4B043"
    silver: "#A9A6C0"
    bronze: "#C08457"
  typography:
    display: "'Plus Jakarta Sans', system-ui, sans-serif"
    ui: "'Inter', system-ui, sans-serif"
    display-xl: "40 / 700 / -0.03em"
    display-lg: "34 / 700 / -0.03em"
    title: "22 / 700 / -0.02em"
    card-title: "20 / 600 / -0.015em"
    headline: "16 / 600 / -0.01em"
    body: "15 / 400"
    subhead: "14 / 400"
    caption: "13 / 400"
    eyebrow: "12 / 600 / 0.06em / uppercase"
  rounded:
    xs: "8px"
    sm: "12px"
    md: "16px"
    lg: "20px"
    xl: "28px"
    pill: "999px"
  spacing:
    base: "4px scale — 4 · 8 · 12 · 16 · 20 · 24 · 32"
    card-pad: "18–20px"
    gutter: "18px"
---

# Aurora — Design System

> **Draft.** The official Forja direction is [design-system/MASTER.md](../design-system/MASTER.md).
> Aurora is an alternate art proposal, like the other `fragua-redesign-*`.
> Showcase: [fragua-redesign-aurora.html](../fragua-redesign-aurora.html).

## Overview

Aurora is what a wellness/productivity SaaS feels like: calm, soft, and expensive.
The whole interface is a stack of **frosted glass panels floating over a lavender
aurora gradient** — depth comes from translucency and diffuse shadow, never from hard
borders or saturation. Color is rationed: a single deep indigo carries every primary
action, pastel tints classify content, and one warm coral is reserved for moments of
energy (a streak, a PR). Nothing shouts.

**Key characteristics**

- Lavender aurora background; near-white frosted cards with a lit top hairline.
- Generous radii (cards `{rounded.xl}`), diffuse violet-tinted shadows.
- Pastel category tints (`{colors.tint-blue}` / `{colors.tint-lavender}` / `{colors.tint-peach}`) — the "priority card" motif from the reference.
- Deep indigo `{colors.ink}` = the only primary. Violet `{colors.violet}` = interactive/system. Coral `{colors.coral}` = brand energy, sparing.
- Rounded geometric display type (Plus Jakarta Sans) over a neutral UI face (Inter). No italics; emphasis via weight + color.
- Mobile-first, touch targets ≥ 44px, copy es-CL, tuteada, sentence case.

## Colors

> Sampled from the Tasklyn reference: lavender canvas, translucent white panels, deep
> indigo pills, pastel priority cards, and a violet/coral/sky chart triad.

### Surface
| Token | Value | Use |
|---|---|---|
| `{colors.bg}` | lavender gradient | App canvas (the aurora) |
| `{colors.surface}` | `rgba(255,255,255,0.82)` | Default frosted card |
| `{colors.surface-strong}` | `rgba(255,255,255,0.90)` | Card needing more legibility (WOD, hero) |
| `{colors.surface-inset}` | `rgba(255,255,255,0.50)` | Insets, segmented track, progress rails |
| `{colors.glass-nav}` | `rgba(238,235,248,0.72)` + blur | Navbar / tabbar (real backdrop blur) |
| `{colors.hairline}` | `rgba(255,255,255,0.70)` | Lit top edge of every glass panel |
| `{colors.line}` | `rgba(70,60,110,0.09)` | Row separators inside a card |

### Brand & Accent
| Token | Hex | Role |
|---|---|---|
| `{colors.ink}` | `#2E2A5C` | **Primary** — buttons, active nav, max-contrast text |
| `{colors.violet}` | `#8B7ED9` | System/interactive: progress, links, selection |
| `{colors.violet-deep}` | `#6F61C4` | Violet on light surfaces (rep numbers, scheme labels) |
| `{colors.coral}` | `#F0876A` | **Brand energy** — streak flame, PR, XP. Sparing. |
| `{colors.sky}` | `#A9C7E8` | Third chart series, calm accents |

### Category tints
| Token | Hex | Use |
|---|---|---|
| `{colors.tint-lavender}` | `#E8E2F8` | Priority/shortcut tile A |
| `{colors.tint-peach}` | `#FBE3D7` | Priority/shortcut tile B |
| `{colors.tint-blue}` | `#DCE8F7` | Priority/shortcut tile C |

### Text
| Token | Hex | Use |
|---|---|---|
| `{colors.text}` | `#262340` | Primary text |
| `{colors.text-2}` | `#5C5878` | Secondary |
| `{colors.text-3}` | `#8B87A5` | Tertiary / captions |
| `{colors.text-4}` | `#B6B2CB` | Disabled / chevrons |

### Semantic
| Token | Hex | Meaning |
|---|---|---|
| `{colors.mint}` | `#5FBF9B` | Success / done |
| `{colors.amber}` | `#E4A64B` | Warning / por confirmar |
| `{colors.danger}` | `#E86A6A` | Error / cupo liberado |
| `{colors.violet}` | `#8B7ED9` | Info / IA |

Tiers (fixed, not brandable): `{colors.gold}` `#E4B043` · `{colors.silver}` `#A9A6C0` · `{colors.bronze}` `#C08457`.

## Typography

**Font family** — Display: `{typography.display}` (Plus Jakarta Sans — soft, rounded, geometric; gives Aurora its personality). UI/body: `{typography.ui}` (Inter). No italics.

| Style | Token | Size / Weight / Tracking |
|---|---|---|
| Large title | `{typography.display-lg}` | 34 / 700 / −0.03em |
| Screen title | `{typography.title}` | 22 / 700 / −0.02em |
| Card title | `{typography.card-title}` | 20 / 600 / −0.015em |
| Headline | `{typography.headline}` | 16 / 600 / −0.01em |
| Body | `{typography.body}` | 15 / 400 |
| Subhead | `{typography.subhead}` | 14 / 400 · `{colors.text-2}` |
| Caption | `{typography.caption}` | 13 / 400 · `{colors.text-3}` |
| Eyebrow | `{typography.eyebrow}` | 12 / 600 / 0.06em / uppercase · `{colors.text-3}` |

**Principles** — Hierarchy is weight + size + color, never italics. Numbers use
`font-variant-numeric: tabular-nums` (Plus Jakarta Sans) so cifras don't jump. Display
face only for titles and numerals; everything conversational stays in Inter.

**Font substitutes** — If Plus Jakarta Sans is unavailable: `Manrope, "SF Pro Rounded",
system-ui`. Inter falls back to `system-ui, -apple-system, sans-serif`.

## Layout

**Spacing system** — 4px base: `{spacing.base}`. Card padding `{spacing.card-pad}`;
screen gutter `{spacing.gutter}`; section gap 24–30px.

**Grid & container** — Single mobile column, 18px gutters. Shortcut tiles = 3-up grid,
12px gap. Content clears the fixed blurred navbar (top padding ≈ 150px for the
collapsing large-title header).

**Whitespace philosophy** — Aurora is airy on purpose: low text density, one idea per
card, breathing room between sections. If a screen feels full, cut a card, don't shrink
the gaps.

## Elevation & Depth

Depth = translucency + diffuse, violet-tinted shadow. Borders are for the *lit edge*,
not for separation.

| Level | Shadow | Use |
|---|---|---|
| Flat | none | Insets, segmented track |
| Card | `0 12px 34px rgba(90,78,150,0.14), 0 2px 8px rgba(90,78,150,0.06)` | Frosted panels |
| Raised | `0 18px 44px rgba(90,78,150,0.20)` | Hero, active tile |
| Float | `0 40px 90px rgba(70,55,130,0.28)` | Phone frame, modals |

**Decorative depth** — Each glass panel carries a `1px` top hairline in
`{colors.hairline}` (the light catching the edge). Real `backdrop-filter: blur(20px)`
is used only on the navbar and tabbar. A soft coral radial bleeds behind the hero and a
coral→violet radial behind the PR screen — pure atmosphere, pointer-events: none.

## Shapes

**Border radius scale**

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 8px | Icon chips, badges |
| `{rounded.sm}` | 12px | Buttons, inputs, segmented pills |
| `{rounded.md}` | 16px | List groups, rows container |
| `{rounded.lg}` | 20px | Tiles, class card |
| `{rounded.xl}` | 28px | Hero, WOD, primary panels |
| `{rounded.pill}` | 999px | Pills, badges, avatars |

**Illustration geometry** — Avatars are full circles with soft gradient fills
(violet / coral / sky / mint). Progress is a rounded rail. No sharp corners anywhere
except hairline separators.

## Components

- **Frosted card** — bg `{colors.surface}`, `{rounded.xl}`, top hairline `{colors.hairline}`, shadow Card. The default container.
- **Hero (streak)** — frosted card; coral flame in a `{colors.coral-soft}` chip; big number in display; progress rail filled `{colors.coral}`→`{colors.amber}`; level/XP row in `{colors.text-3}`.
- **Class card** — frosted; hour in display 30/700; status badge `{colors.amber}` ("por confirmar"); cup dots `{colors.violet}` filled / `{colors.surface-inset}` free; warn strip on `{colors.amber}` soft.
- **List group + row** — group `{rounded.md}` frosted; rows separated by `{colors.line}`; leading icon-chip 30px (done = `{colors.mint}` on soft, pending = inset); value in `{colors.coral}` for XP.
- **Shortcut tiles** — 3-up; each on a category tint (`{colors.tint-lavender}` / `{colors.tint-peach}` / `{colors.tint-blue}`) with a stronger-colored icon chip. This is the reference's "priority card" motif.
- **Primary button** — bg `{colors.ink}`, text white, `{rounded.sm}`, shadow Raised. The only high-emphasis action.
- **Ghost button** — transparent, text `{colors.text}`, `1px {colors.line}` border, glass hover.
- **Badge / chip** — pill; `{colors.amber}` / `{colors.mint}` / `{colors.violet}` on their soft fills, 11–12/600.
- **Segmented control** — track `{colors.surface-inset}`; active pill `{colors.surface-strong}` with shadow; slides via transform 300ms.
- **WOD card** — `{colors.surface-strong}`, `{rounded.xl}`; scheme eyebrow `{colors.violet-deep}`; move numbers `{colors.violet-deep}` display; coach note on `{colors.line}` divider.
- **Avatar cluster** — 38px circles, gradient fills, overlapped; `+N` pill in `{colors.violet-deep}`.
- **Navbar / tabbar** — `{colors.glass-nav}` + blur + hairline; collapsing large title on scroll; tabbar active `{colors.ink}`.
- **PR screen (La forja)** — coral→violet radial glow; huge display numeral; tier pills that light up (bronze/silver/gold); XP line with coral emphasis.

## Do's and Don'ts

**Do**
- Keep one primary (`{colors.ink}`) and at most one coral moment per screen.
- Let panels float — translucency + shadow, lit top hairline.
- Use tints to mean a category, not to decorate.
- Rely on the lavender gradient as the only gradient on screen.

**Don't**
- Don't gradient the cards themselves; the background is the gradient.
- Don't spend coral on ordinary UI — it's for energy (streak/PR) only.
- Don't add hard borders for separation; that breaks the glass read.
- Don't round hairline separators or tabular numbers.
- Don't raise text density to fill space — cut a card instead.

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| ≤ 980px | Showcase rail hides; phone fills the viewport (`100svh`), radius 0. |
| Mobile (default) | Single column, 18px gutters, blurred sticky navbar. |

**Touch targets** — ≥ 44px rows and buttons. **Collapsing strategy** — large title
collapses into a centered navbar title on scroll > 40px. **Image behavior** — avatars
are gradient placeholders; no photography in the mockup.

## Iteration Guide

1. Change color only via the `tokens.colors` block; never hard-code hex in components.
2. Keep the coral budget: grep the showcase for `--coral` — if it appears outside
   streak/PR/XP, you're overspending it.
3. New surface? Start from **Frosted card** and adjust radius by role, not by taste.
4. Validate on the three showcase screens (Hoy / La pizarra / La forja) before extending.
5. If it starts feeling busy, remove a card before touching spacing.

## Known Gaps

- Dark mode undefined (reference is light-only).
- Backoffice/desktop variant not specified — Aurora is drawn for the athlete app.
- Heavy `backdrop-filter` use: fine for a mockup, budget it on low-end devices in prod.
- Chart/donut components sketched in prose only; not built in the showcase.
