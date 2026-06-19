# Design: Holy Communion Invitation

## Technical Approach

JSON-driven single-page invitation. `App.jsx` imports `invitacion.json` at build time, passes slices as props to 9 section components wrapped in a layout shell (Navbar + Footer). Zero runtime state, zero backend. All styling via Tailwind v4 utility classes + a small `components.css` for repeated patterns (glass cards, gold dividers, buttons).

## Architecture Decisions

| Decision | Choice | Alternative | Rationale |
|----------|--------|-------------|-----------|
| Data source | Single JSON imported at build | Fetch at runtime, multiple JSONs | One import = zero network requests, Vite bundles it, type-safe enough for static content |
| CSS architecture | `tokens.css` (variables) + `components.css` (reusable classes) + Tailwind utilities inline | `utilities.css` with hand-written helpers (portfolioLawyer pattern) | portfolioLawyer's 1000-line utilities.css duplicated Tailwind. Components.css holds only what Tailwind can't express in one class (`.glass-card`, `.gold-divider`) |
| Smooth scroll | CSS `scroll-behavior: smooth` + `id` anchors + `scroll-margin-top` | JS scroll library, IntersectionObserver | Zero deps, works without JS, `prefers-reduced-motion` media query disables it |
| State management | None — props only | Context, Zustand | No shared state, no user interaction beyond links. Adding state = speculative complexity |
| Maps | `<iframe src={mapaEmbedUrl}>` | Google Maps JS API, leaflet | Zero API keys, zero JS payload, works in static build |
| RSVP | `wa.me/{phone}?text={encoded}` link | Form + backend, Formspree | Zero deps, opens native WhatsApp, pre-filled message from JSON |
| Icons | lucide-react (tree-shakeable) | Heroicons, inline SVGs | Matches proposal spec, tree-shakes to used icons only |

## Data Flow

```
invitacion.json
      │
      ▼
   App.jsx ────── destructures & passes props ──────┐
      │                                              │
      ▼                                              ▼
  Navbar ──── anchor links ────→ section ids    Hero(nino, evento)
  Footer                                        EventDetails(misa, evento)
                                                Schedule(misa, recepcion)
                                                Location(misa.mapaEmbedUrl)
                                                Reception(recepcion)
                                                Gallery(nino.galeria)
                                                Prayer(oracion)
                                                Bendicion(bendicion)
                                                Rsvp(rsvp)
```

Each section receives only the JSON slice it needs. No section imports JSON directly.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Create | Vite entry, `<div id="root">`, Google Fonts preconnect |
| `vite.config.js` | Create | React plugin, base config |
| `package.json` | Create | react 19, vite 8, tailwindcss 4, lucide-react |
| `tailwind.config.js` | Create | Not needed — Tailwind v4 uses CSS-only config via `@theme` |
| `src/main.jsx` | Create | `createRoot`, render `<App />` |
| `src/App.jsx` | Create | Import JSON, compose Navbar + 9 sections + Footer |
| `src/index.css` | Create | `@import "tailwindcss"`, `@theme` block, Google Fonts import |
| `src/styles/tokens.css` | Create | CSS custom properties (spacing scale, shadows) |
| `src/styles/components.css` | Create | `.glass-card`, `.btn-primary`, `.btn-cta`, `.gold-divider`, `.section-padding` |
| `src/data/invitacion.json` | Create | All invitation content (see Interfaces) |
| `src/components/layout/Navbar.jsx` | Create | Fixed top bar, mobile hamburger, smooth-scroll links |
| `src/components/layout/Footer.jsx` | Create | Copyright, child name, year |
| `src/components/sections/Hero.jsx` | Create | Full-viewport hero with photo, name, date, verse |
| `src/components/sections/EventDetails.jsx` | Create | Church name, date, time — icon cards |
| `src/components/sections/Schedule.jsx` | Create | Vertical timeline: Misa → Recepcion |
| `src/components/sections/Location.jsx` | Create | Google Maps iframe + fallback address |
| `src/components/sections/Reception.jsx` | Create | Reception venue details |
| `src/components/sections/Gallery.jsx` | Create | Responsive photo grid |
| `src/components/sections/Prayer.jsx` | Create | Prayer title + text, decorative card |
| `src/components/sections/Bendicion.jsx` | Create | Blessing phrase + bank transfer details |
| `src/components/sections/Rsvp.jsx` | Create | CTA button → wa.me link |

## Interfaces / Contracts

### invitacion.json shape

```json
{
  "nino": {
    "nombre": "string",
    "fotoPrincipal": "string (URL or path)",
    "frase": "string (biblical verse)",
    "galeria": ["string (image URLs)"]
  },
  "evento": {
    "fecha": "string (display format)",
    "hora": "string"
  },
  "misa": {
    "iglesia": "string",
    "direccion": "string",
    "mapaEmbedUrl": "string (iframe src)"
  },
  "recepcion": {
    "lugar": "string",
    "direccion": "string",
    "hora": "string",
    "mapaEmbedUrl": "string"
  },
  "oracion": {
    "titulo": "string",
    "texto": "string"
  },
  "bendicion": {
    "frase": "string",
    "transferencia": {
      "banco": "string",
      "titular": "string",
      "alias": "string",
      "cbu": "string"
    }
  },
  "rsvp": {
    "telefono": "string (international, no +)",
    "mensaje": "string (URL-encoded)"
  }
}
```

### Component props (each receives its JSON slice)

| Component | Props |
|-----------|-------|
| `Hero` | `{ nombre, fotoPrincipal, frase, fecha }` |
| `EventDetails` | `{ iglesia, direccion, fecha, hora }` |
| `Schedule` | `{ misa: { hora, iglesia }, recepcion: { hora, lugar } }` |
| `Location` | `{ mapaEmbedUrl, direccion }` |
| `Reception` | `{ lugar, direccion, hora, mapaEmbedUrl }` |
| `Gallery` | `{ imagenes: string[] }` |
| `Prayer` | `{ titulo, texto }` |
| `Bendicion` | `{ frase, transferencia }` |
| `Rsvp` | `{ telefono, mensaje }` |
| `Navbar` | `{ sections: { id, label }[] }` — hardcoded anchor list |
| `Footer` | `{ nombre }` |

## Section Design Details

### Hero
Full-viewport (`min-h-screen`), centered content. Child's photo in circular frame with gold border (`ring-4 ring-cta`). Name in `font-script` (Great Vibes), 3rem+. Date below in `font-serif`. Biblical verse in muted italic. Background: subtle gradient `from-background to-secondary/10`.

### EventDetails
Three icon cards in a row (desktop) / stacked (mobile). Each card: `.glass-card` with lucide icon (`Church`, `CalendarDays`, `Clock`). Label + value.

### Schedule
Vertical timeline with gold line (`border-l-2 border-cta`). Two nodes: Misa and Recepcion. Each node: time (bold), venue name, address. lucide icons as node markers.

### Location
Full-width `.glass-card` with `<iframe>` (height 300px, rounded corners). Address text below as fallback. `loading="lazy"` on iframe.

### Reception
Same pattern as Location — iframe + address. Separated by `.gold-divider`.

### Gallery
CSS Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`. Images with `aspect-square object-cover rounded-lg`. Click to open full-size (native `<dialog>` or just `target="_blank"` — keep simple, no lightbox lib).

### Prayer
Centered `.glass-card` with decorative top border. Title in `font-script`, text in `font-serif` italic. `max-w-2xl` for readability.

### Bendicion
Blessing phrase centered in `font-script`. Transfer details in a `.glass-card` below — structured as labeled rows (Banco, Titular, Alias, CBU). Copy-to-clipboard on alias/cbu rows (one `navigator.clipboard.writeText` call, no lib).

### Rsvp
CTA section with gold background accent. Large button: `.btn-cta` → `https://wa.me/{telefono}?text={encodeURIComponent(mensaje)}`. `target="_blank" rel="noopener"`.

### Navbar
Fixed top, `backdrop-blur` glass effect. Logo/name left, anchor links right (desktop). Hamburger menu (mobile) toggles a slide-down panel. Links use `<a href="#section-id">` with CSS smooth scroll. Active section highlighting optional (skip — adds IntersectionObserver complexity, YAGNI for invitation).

### Footer
Simple centered text: child's name, "Primera Comunión", year. Muted colors.

## Responsive Strategy

| Breakpoint | Behavior |
|------------|----------|
| < 640px (sm) | Single column, stacked cards, hamburger nav, hero text 2rem |
| 640-768px (md) | 2-col gallery, cards in row |
| 768-1024px (lg) | 3-col gallery, full nav, hero text 3rem |
| > 1024px (xl) | 4-col gallery, max-width containers (`max-w-6xl mx-auto`) |

All sections use `px-4 sm:px-6 lg:px-8` for consistent horizontal padding.

## Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- All images: `alt` from JSON or decorative `alt=""`
- Focus rings: `focus-visible:ring-3 focus-visible:ring-cta`
- `prefers-reduced-motion`: disable smooth scroll and transitions
- Contrast: text `#4C1D95` on `#FAF5FF` = 8.2:1 (passes AAA)
- Touch targets: minimum 44x44px on nav links and buttons

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No test runner in project scope. JSON is static, components are pure presentational. |
| Manual | Visual QA | `npm run dev` + browser DevTools responsive mode at 375/768/1024/1440 |
| Build | `npm run build` exits 0 | Verify static output in `dist/` |
| Lighthouse | Performance ≥ 90, A11y ≥ 90 | Chrome DevTools audit post-build |

No automated tests planned — project is a static invitation with zero logic. Testing infrastructure would be speculative complexity.

## Migration / Rollout

No migration required. Greenfield project.

## Open Questions

- None. All decisions resolved by proposal + design system spec.

## Pre-Delivery Checklist

- [x] No emojis as icons — lucide-react SVGs throughout
- [x] `cursor-pointer` on all clickable elements (buttons, nav links, gallery images)
- [x] Hover states with `transition-all duration-200`
- [x] Text contrast 8.2:1 (AAA)
- [x] Focus states: `focus-visible:ring-3`
- [x] `prefers-reduced-motion` respected
- [x] Responsive: 375px, 768px, 1024px, 1440px
