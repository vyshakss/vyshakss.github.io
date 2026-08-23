<div align="center">

# MAGNOVITE 2026

</div>

---

## What this is

Not a conventional fest website. The whole site is one continuous cosmic scene rendered
in WebGL, and the page content lives _inside_ it.

The opening sequence tells a single visual story:

```
PULSAR  →  DETONATION  →  MAGNOVITE 2026  →  EXPANSION  →  BUTTERFLY SWARM  →  COSMIC DUST  →  THE SITE
```

A dense white pulsar charges and holds its breath, detonates into a shockwave of debris,
resolves into the MAGNOVITE wordmark, then scatters into a swarm of MAGNOVITE butterfly
particles that slowly accrete into the galaxy of dust that becomes the permanent
background. That dust field never resets — scrolling from the hero through About,
Main Stage, Events and Gallery drives one continuous camera journey deeper into the
same cloud.

**Design rules the implementation holds to**

- One particle system for the entire site. No per-section backgrounds, no fade-to-new-starfield.
- Monochrome palette only — white, silver, soft grey, warm highlights, black space. No neon nebulae.
- Content cards are translucent dark glass with thin borders, so the environment stays dominant.
- The header stays out of the way during the opening and reveals itself once the dust settles.

## Tech stack

| Layer   | Choice                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------- |
| Build   | Vite 8 + TypeScript                                                                               |
| UI      | React 19, TanStack Router (file-based routes)                                                     |
| Styling | Tailwind CSS 4, Radix UI primitives, `lucide-react` icons                                         |
| 3D      | Three.js 0.185 — `BufferGeometry` point clouds, custom GLSL, `EffectComposer` + `UnrealBloomPass` |
| Deploy  | Static build → GitHub Pages (`.github/workflows/static.yml`)                                      |

## Getting started

Requires **Node.js `>=20.19.0`** (Node 20 LTS or newer).

```bash
nvm install && nvm use     # optional, respects .nvmrc

git clone <this-repository-url>
cd cosmic-reveal-main
npm i
npm run dev
```

| Script            | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                          |
| `npm run build`   | Production build, then `postbuild.js` (see below) |
| `npm run preview` | Serve the built `dist/` locally                   |
| `npm run lint`    | ESLint across the repo                            |
| `npm run format`  | Prettier write                                    |

## Project structure

```
src/
├── routes/                  TanStack file-based routes
│   ├── __root.tsx           Shell: header, cosmic canvas mount, outlet
│   ├── index.tsx            Home — the cinematic sequence + all sections
│   ├── about.tsx
│   ├── events.tsx           Event catalogue
│   ├── events_.$slug.tsx    Per-event detail page (50 slugs)
│   └── gallery.tsx
├── components/
│   ├── cosmic/
│   │   ├── CosmicScene/     The entire WebGL sequence (see below)
│   │   └── shaders.ts       GLSL for the core glow / bloom quad
│   ├── HomePage/            Section markup + all homepage copy in .data.ts
│   ├── Countdown/           Countdown to 2026-09-16T09:00+05:30
│   ├── SiteHeader/          Butterfly logo, CHRIST logo, hamburger nav
│   └── ui/                  Radix-based primitives
├── data/eventsData.ts       Single source of truth for all 50 events
└── lib/                     Error capture + reporting, utils

public/
├── logos/                   magnovite-butterfly.png ← the butterfly used everywhere
├── images/                  Section art, Shaan Rahman posters, per-event covers
├── models/hero.glb
└── BROCHURE.pdf
```

Every component folder follows the same convention: `X.tsx` (markup),
`X.data.ts` (content/constants), `X.hooks.ts` (behaviour), `index.ts` (barrel).
**Copy changes almost always belong in a `.data.ts` file, not in JSX.**

## The cosmic scene

`src/components/cosmic/CosmicScene/CosmicScene.hooks.ts` is the heart of the site.

**Geometry.** One galaxy is generated up front — spiral arm particles, a dense core, and
a background star field — each vertex carrying a scatter direction and per-particle random
values. The intro plays that generation _in reverse_: particles start collapsed at the
pulsar, blow outward along their scatter vectors, then accrete back into the galaxy.

**Pacing.** A single `uProgress` uniform (0 → 1) drives everything. `introSpeed()` advances
it at different rates per beat so the sequence has rhythm rather than a linear ramp:

| Progress    | Beat                                      | Rate        |
| ----------- | ----------------------------------------- | ----------- |
| 0.00 – 0.14 | Charge — the pulsar builds                | 0.20        |
| 0.14 – 0.18 | Anticipation — the inhale before the bang | 0.09        |
| 0.18 – 0.34 | Detonation                                | 0.62        |
| 0.34 – 0.62 | Expansion — debris drifts outward         | 0.30        |
| 0.62 – 1.00 | Accretion — decelerating into the galaxy  | 0.22 → 0.12 |

**Glow.** Three overlapping lifetimes are summed rather than branched on: the star _seed_
that carries the charge, the _flash_ that consumes it at detonation, and the _galactic core_
that reassembles at the end. Each hands off to the next with no explicit phase state. The
resting core is deliberately dim — it sits directly behind the white hero copy, and a hotter
bulge costs text legibility.

**Scroll.** Once the intro completes, `uProgress` pins at 1.0 and `window.scrollY` takes over,
mapping page position to a full 2π rotation of the field with damped interpolation. The intro
plays once per session (`globalHasPlayedIntro`); returning to the home route resumes at the
settled dust rather than replaying the explosion.

**Performance.** Particle budgets switch on device class and DPR is capped on mobile:

|         | Arms   | Core   | Background |
| ------- | ------ | ------ | ---------- |
| Desktop | 65,000 | 55,000 | 50,000     |
| Mobile  | 25,000 | 25,000 | 20,000     |

All 170k desktop particles live in two `BufferGeometry` point clouds — no per-particle DOM,
no per-frame allocation. `document.scrollHeight` is read once and cached rather than inside
the scroll handler, which would otherwise force a synchronous layout flush on every event.
`CosmicScene` is lazy-loaded so first paint doesn't wait on Three.js.

## Content

**Events.** `src/data/eventsData.ts` holds all 50 events — slug, description, rounds, rules,
FAQs, prize pool, date, fee, team size, image, registration link and coordinators. Both the
catalogue and the detail pages read from it, and the build derives its routes from it.

**Homepage copy.** `src/components/HomePage/HomePage.data.ts` — meta tags, hero strings,
the six battleground categories, stats, gallery entries, Shaan Rahman block.

**Countdown.** Target timestamp lives in `src/components/Countdown/Countdown.data.ts`.

## Build & deploy

`npm run build` runs Vite, then `postbuild.js`, which:

1. Parses every `"slug"` out of `eventsData.ts` and **fails the build if it finds none** —
   a reformat that unquotes those keys would otherwise ship a site with zero event routes.
2. Writes `dist/<route>/index.html` for each route so GitHub Pages serves deep links directly.
3. Copies `index.html` to `dist/404.html` as the SPA fallback.
4. Injects a `modulepreload` hint for the `CosmicScene-*.js` chunk.

Pushing to `main` triggers `.github/workflows/static.yml`, which uploads `dist/` to
GitHub Pages. `static-site/` holds the earlier pre-React static build, kept for reference.

## Browser support

Requires WebGL2. Desktop Chrome, Edge, Firefox and Safari 15+, plus modern mobile Safari
and Chrome. The site remains readable without the canvas — content sits above it in normal
document flow, so a failed WebGL context degrades to the dark layout rather than a blank page.
