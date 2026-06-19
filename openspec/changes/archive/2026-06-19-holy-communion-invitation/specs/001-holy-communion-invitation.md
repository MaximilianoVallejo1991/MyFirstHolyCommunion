# Holy Communion Invitation — Specification

## Purpose

Single-page static invitation. All content driven by `src/data/invitacion.json`. Zero backend. Sections: Hero, EventDetails, Schedule, Location, Reception, Gallery, Prayer, Bendición, RSVP, Footer.

## Data Schema

### invitacion.json

| Field | Type | Description |
|-------|------|-------------|
| `nino.nombre` | string | Child's first name |
| `nino.apellido` | string | Child's last name |
| `nino.frase` | string | Biblical verse text |
| `nino.fraseFuente` | string | Verse citation (e.g. "Mateo 19:14") |
| `nino.fotoPrincipal` | string | Main photo path/URL |
| `nino.galeria[]` | string[] | Gallery photo paths/URLs |
| `evento.fecha` | string | Date (display text) |
| `evento.hora` | string | Time (display text) |
| `evento.titulo` | string | Event title |
| `misa.iglesia` | string | Church name |
| `misa.direccion` | string | Church address |
| `misa.mapaEmbedUrl` | string | Google Maps iframe embed URL |
| `recepcion.lugar` | string | Reception venue |
| `recepcion.direccion` | string | Reception address |
| `recepcion.hora` | string | Reception time |
| `recepcion.mapaEmbedUrl` | string | Google Maps iframe embed URL |
| `codigoVestimenta` | string | Dress code |
| `oracion.titulo` | string | Prayer title |
| `oracion.texto` | string | Prayer body |
| `bendicion.frase` | string | Blessing phrase |
| `bendicion.mensaje` | string | Blessing invitation |
| `bendicion.transferencia.banco` | string | Bank name |
| `bendicion.transferencia.alias` | string | Bank alias |
| `bendicion.transferencia.cbu` | string | CBU number |
| `bendicion.transferencia.titular` | string | Account holder name |
| `rsvp.telefono` | string | WhatsApp number (intl format, no +) |
| `rsvp.mensaje` | string | Pre-filled WhatsApp message |
| `familia.padres[]` | string[] | Parent names |
| `familia.padrinos[]` | string[] | Godparent names |
| `navegacion[]` | {label, href}[] | Navbar items |
| `footer.copyright` | string | Copyright text |

### Data Flow

`invitacion.json` → imported directly in `App.jsx` → passed as props to section components. MUST NOT require runtime fetch.

## Requirements

### invitation-shell

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| SH-1 | Navbar renders `navegacion[]` links, sticky on scroll | MUST | **Desktop**: Links visible horizontally at ≥768px. **Mobile**: Hamburger toggles dropdown; tapping link closes menu. **Active**: Current section link highlighted during scroll. |
| SH-2 | Nav links trigger smooth scroll to `href` section | MUST | **Scroll**: Click → `scroll-behavior: smooth` to target `id`. |
| SH-3 | Footer displays `familia.padres[]`, `familia.padrinos[]`, `footer.copyright` | MUST | **Render**: Footer at bottom of page with all three data fields. |

### invitation-hero

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| HE-1 | First section: `nino.fotoPrincipal`, `nino.nombre` `nino.apellido`, `evento.fecha`, `nino.frase`, `nino.fraseFuente` | MUST | **Render**: All fields visible on load. **Missing photo**: `fotoPrincipal` empty → show CSS fallback placeholder. |
| HE-2 | Countdown to `evento.fecha` | SHOULD | **Active**: Days remaining shown. **Expired**: Countdown hides or shows "¡El día ha llegado!". |

### invitation-event

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| EV-1 | EventDetails: church name/address, date/time with lucide-react icons | MUST | **Render**: `misa.iglesia`, `misa.direccion`, `evento.fecha`, `evento.hora` shown with Calendar + Clock icons. |
| EV-2 | Schedule: vertical timeline (ceremony → reception) | MUST | **Render**: Timeline items from `evento` + `recepcion` fields. |
| EV-3 | Location: Google Maps iframe via `misa.mapaEmbedUrl` | MUST | **Iframe loads**: Map rendered. **Blocked**: Fallback address text visible. |
| EV-4 | Reception: `recepcion.lugar`, `recepcion.direccion`, `recepcion.hora`, `codigoVestimenta`, map iframe | MUST | **Render**: All fields + map iframe with same fallback as EV-3. |

### invitation-gallery

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| GA-1 | Photo grid from `nino.galeria[]` | MUST | **Has photos**: Responsive grid (1 col mobile, 2-3 col desktop). **Empty array**: Section hidden. |

### invitation-spiritual

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| SP-1 | Prayer: `oracion.titulo` + `oracion.texto` | MUST | **Render**: Both fields displayed in styled section. |
| SP-2 | Bendición: blessing phrase + bank transfer details (`banco`, `alias`, `cbu`, `titular`) as copyable fields | MUST | **Render**: Transfer info formatted for readability. Section positioned BEFORE Footer. |

### invitation-rsvp

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| RS-1 | WhatsApp button: `https://wa.me/{rsvp.telefono}?text={encodeURIComponent(rsvp.mensaje)}` | MUST | **Click**: Opens WhatsApp in new tab (`target="_blank" rel="noopener noreferrer"`). |

### design-system

| # | Requirement | Strength | Scenarios |
|---|-------------|----------|-----------|
| DS-1 | Tailwind v4 `@theme` directive in `index.css` maps CSS tokens to utility classes | MUST | **Tokens**: `tokens.css` defines CSS custom properties consumed by `@theme`. |
| DS-2 | `components.css` contains ONLY component classes (`.card`, `.btn-primary`). NO duplicate Tailwind utilities. | MUST | **Audit**: No `flex`, `grid`, `w-full`, `gap-*` in components.css. |
| DS-3 | `base.css`: minimal reset + typography | SHOULD | **Reset**: Box-sizing, margin reset on body. No normalize.css dependency. |
| DS-4 | Responsive: usable at 320px, optimized 768px, 1024px, 1440px | MUST | **Mobile**: All sections readable at 320px. No horizontal scroll. |
