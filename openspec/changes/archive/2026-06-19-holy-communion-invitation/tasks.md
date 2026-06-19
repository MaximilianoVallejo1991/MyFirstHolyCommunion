# Tasks: Holy Communion Invitation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~550-650 |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Delivery strategy | ask-on-risk |
| Suggested split | PR1: Foundation → PR2: Layout → PR3: Sections A → PR4: Sections B |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Project scaffold + CSS + data | PR 1 | ~200 lines, base=main, independent |
| 2 | Navbar, Footer, App.jsx shell | PR 2 | ~120 lines, base=PR1, depends on CSS |
| 3 | Hero, EventDetails, Schedule, Location | PR 3 | ~155 lines, base=PR2, presentational |
| 4 | Reception, Gallery, Prayer, Bendicion, Rsvp | PR 4 | ~165 lines, base=PR2 or PR3, independent sections |

## Phase 1: Foundation

- [ ] 1.1 Create `package.json` with react 19, vite 8, tailwindcss 4, lucide-react deps
- [ ] 1.2 Create `vite.config.js` with React plugin
- [ ] 1.3 Create `index.html` with `<div id="root">`, Google Fonts preconnect, lang="es"
- [ ] 1.4 Create `src/main.jsx` — `createRoot(document.getElementById('root')).render(<App />)`
- [ ] 1.5 Create `src/index.css` — `@import "tailwindcss"`, `@theme` block, Google Fonts import
- [ ] 1.6 Create `src/styles/tokens.css` — CSS custom properties per palette (ivory, gold, purple, brown), fonts, shadows
- [ ] 1.7 Create `src/styles/components.css` — `.glass-card`, `.btn-primary`, `.btn-cta`, `.gold-divider`, `.section-padding`. Audit: NO Tailwind utility duplicates (DS-2)
- [ ] 1.8 Create `src/data/invitacion.json` — complete sample data covering all spec schema fields

## Phase 2: Layout Shell

- [ ] 2.1 Create `Navbar.jsx` — fixed top, `backdrop-blur`, desktop links + mobile hamburger toggle, smooth-scroll anchors (SH-1, SH-2)
- [ ] 2.2 Create `Footer.jsx` — `familia.padres[]`, `familia.padrinos[]`, `footer.copyright` (SH-3)
- [ ] 2.3 Create `App.jsx` — import JSON, compose Navbar + 9 sections + Footer, prop slicing per design §Component props

## Phase 3: Core Sections

- [ ] 3.1 Create `Hero.jsx` — `min-h-screen`, photo in gold-ring circle, name (Great Vibes), date, verse italic, countdown to fecha (HE-1, HE-2)
- [ ] 3.2 Create `EventDetails.jsx` — 3 icon cards (Church, CalendarDays, Clock) in `.glass-card`, responsive row/stack (EV-1)
- [ ] 3.3 Create `Schedule.jsx` — vertical timeline `border-l-2 border-cta`, two nodes with lucide markers (EV-2)
- [ ] 3.4 Create `Location.jsx` — `<iframe>` `.glass-card`, `loading="lazy"`, fallback address (EV-3)
- [ ] 3.5 Create `Reception.jsx` — venue map iframe + dress code, `.gold-divider` (EV-4)
- [ ] 3.6 Create `Gallery.jsx` — CSS Grid responsive, `aspect-square object-cover`, empty array → hidden (GA-1)
- [ ] 3.7 Create `Prayer.jsx` — centered `.glass-card`, script title, serif italic text (SP-1)
- [ ] 3.8 Create `Bendicion.jsx` — blessing phrase, transfer details `.glass-card`, `clipboard.writeText` on alias/cbu, BEFORE Footer (SP-2)
- [ ] 3.9 Create `Rsvp.jsx` — CTA `wa.me` link with `MessageCircle` icon, `target="_blank"` (RS-1)

## Phase 4: Verification

- [ ] 4.1 `npm install && npm run build` — exit 0, verify `dist/` exists
- [ ] 4.2 Manual QA at 375px, 768px, 1024px, 1440px — no horizontal scroll, all sections readable (DS-4)
- [ ] 4.3 Lighthouse audit — Performance ≥ 90, Accessibility ≥ 90
