# Visión del Producto

## Qué es

Plataforma de gestión para gimnasios pequeños y medianos de CrossFit/funcional en Chile.

Dos superficies:

### 1. Web Dashboard (Next.js)
Para el **dueño/admin/coach** del gym. El admin *crea y configura* — no consume como atleta.
- Gestión de miembros, clases, calendario, planes, pagos
- Configuración del gym (branding, instructores, políticas)
- **Gamificación**: crear/editar misiones, badges, desafíos, niveles, configurar reglas de XP
- **Rutinas y ejercicios**: crear rutinas, asignarlas a sesiones, gestionar el glosario de ejercicios
- Métricas y reportes del negocio

### 2. App Mobile (React Native / Expo) — iOS y Android
Para los **miembros del gym** (atletas). El atleta *experimenta y consume* lo que el admin configuró.
El dueño/admin puede descargarse la app y usarla como miembro de su propio gym — ve exactamente lo mismo que cualquier atleta.
- Reserva de clases
- Ver rutinas del día y registrar resultados / PRs
- Gamificación (ganar XP, completar misiones, ver ranking, desbloquear badges)
- Feed social tipo whiteboard
- Perfil personal

## Tesis

> El dueño compra porque sus atletas aman la app.

El diferenciador no es el módulo de gestión (todos los competidores lo tienen), sino la **experiencia del atleta + gamificación profunda**: XP, niveles, misiones, ranking, feed social tipo whiteboard.

## Mercado objetivo

- Gimnasios pequeños y medianos de CrossFit / entrenamiento funcional
- Chile como mercado inicial
- Multi-tenant: un atleta puede pertenecer a varios gyms, cada gym tiene su branding

## Problema que resuelve

Los dueños de gimnasios pequeños usan herramientas fragmentadas (Excel, WhatsApp, papel) o plataformas genéricas que no entienden el mundo CrossFit. Los atletas no tienen una experiencia propia — son solo un registro en una base de datos.

## Competidores y gaps

| Competidor | Fortaleza | Gap que atacamos |
|------------|-----------|------------------|
| BoxMagic | Líder chileno, gestión sólida | Sin experiencia atleta, sin gamificación |
| CrossHero | Whiteboard reconocido | Gestión débil, sin mobile atleta |
| NFIT | App atleta decente | Sin gamificación profunda |
| WodUp | Comunidad global | Caro, no localizado para Chile |
| AgendaPro | Gestión general | No entiende el dominio CrossFit |

**Ángulos de ataque:**
- Gamificación profunda (XP, niveles, misiones, ranking)
- Experiencia del atleta como producto principal
- Multi-gimnasio nativo
- Integración WhatsApp
- Anti no-shows (recordatorios, penalizaciones configurables)
