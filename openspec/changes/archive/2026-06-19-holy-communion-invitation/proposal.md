# Proposal: Holy Communion Invitation

## Intent

Single-page static web invitation for a First Holy Communion. Data-driven via JSON, zero backend, deployable as static files.

## Scope

### In Scope
- 10 sections: Hero, EventDetails, Schedule, Location (Google Maps iframe), Reception, Gallery, Prayer, Bendición (bank transfer), RSVP (WhatsApp), Footer
- Responsive Navbar with smooth scroll to sections
- JSON data file (`src/data/invitacion.json`) driving all content
- Tailwind v4 design system with `@theme` token mapping
- lucide-react icons

### Out of Scope
- Backend, API, database, form submissions, auth, CMS, animation libraries, i18n, offline support

## Capabilities

### New Capabilities
- `invitation-shell`: Navbar (responsive + mobile menu), Footer, App.jsx data flow, smooth scroll
- `invitation-hero`: Photo, child's name, date, biblical verse
- `invitation-event`: EventDetails, Schedule timeline, Church/Reception via Google Maps iframe
- `invitation-gallery`: Photo grid
- `invitation-spiritual`: Prayer + Bendición (bank transfer details)
- `invitation-rsvp`: WhatsApp button with pre-filled message
- `design-system`: tokens.css, Tailwind v4 @theme, base.css (minimal reset), components.css (component classes only — no duplicate Tailwind utilities)

### Modified Capabilities
None (greenfield project).

## Approach

**Stack**: React 19 + Vite 8 + Tailwind v4 + lucide-react — replicates portfolioLawyer pattern.

**Architecture**: JSON-driven SPA. `App.jsx` imports `invitacion.json`, passes props to section components:
- `src/components/layout/` — Navbar, Footer
- `src/components/sections/` — Hero, EventDetails, Schedule, Location, Reception, Gallery, Prayer, Bendicion, Rsvp

**CSS (improved over portfolioLawyer)**: Replace the 1000-line `utilities.css` (full of Tailwind duplicates like flex/grid/gap/w-full) with `components.css` containing only real component classes (`.card`, `.btn-primary`, `.gold-divider`). Use Tailwind v4 `@theme` directive in `index.css` to map design tokens to Tailwind classes. Keep `tokens.css` for CSS variables and `base.css` for minimal reset + typography.

**Maps**: `<iframe>` embed URL stored in JSON — zero dependencies, zero API keys.

**RSVP**: `https://wa.me/` link with pre-filled message — zero dependencies.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json`, `vite.config.js`, `index.html` | New | React+Vite+Tailwind bootstrap |
| `src/main.jsx`, `src/App.jsx` | New | Entry + JSON-driven composition |
| `src/data/invitacion.json` | New | All invitation content |
| `src/index.css`, `src/styles/` (3 files) | New | Tailwind entry + tokens + base + components |
| `src/components/layout/` (2 files) | New | Navbar, Footer |
| `src/components/sections/` (9 files) | New | Content section components |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Google Maps iframe blocked by browser | Low | Fallback address text always visible in section |
| Tailwind v4 breaking changes during development | Low | Pin exact version in package.json |
| Bank transfer info in static page — privacy concern | Low | Mark as optional contribution, no different from sharing via printed card |

## Rollback Plan

Greenfield — no state to preserve. Delete and re-scaffold if needed. Post-deploy, revert to prior static build artifact.

## Dependencies

None — fully self-contained.

## Success Criteria

- [ ] All 10 sections render from JSON without manual HTML edits
- [ ] Navbar smooth-scrolls to each section on click
- [ ] Mobile responsive (320px–1440px+)
- [ ] Google Maps iframe loads church and reception locations
- [ ] WhatsApp button opens correct wa.me link with pre-filled message
- [ ] Builds to static output via `npm run build`
- [ ] Zero JavaScript console errors
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 90
