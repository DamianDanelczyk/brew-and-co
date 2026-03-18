# Brew & Co — Design Style Guide

> A complete guide to the visual language, brand identity, and design principles for the Brew & Co platform.

---

## 1. Brand Identity

**Brew & Co** is an artisanal coffee and beverage brand. The design aesthetic is **Warm Editorial** — the feeling of a well-curated specialty coffee menu meets a beautiful food magazine. It should feel premium but approachable: rich, warm, and inviting without being fussy.

### Personality
- Warm, handcrafted, authentic
- Editorial and considered — every detail is intentional
- Unpretentious luxury — premium without exclusion
- Sensory — evoking aroma, texture, and warmth

### Design Principles
1. **Warmth first** — Every surface, color, and interaction should feel warm, not clinical
2. **Generous space** — Breathe. Negative space is as important as content
3. **Purposeful contrast** — Strong typographic hierarchy separates signal from noise
4. **Tactile motion** — Transitions feel physical and organic, never mechanical

---

## 2. Color System

All colors are available as CSS custom properties (see `tokens.css`) and Tailwind utilities via `@theme`.

### Primary Palette

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `--color-cream` | `#F8F1E6` | `bg-cream` | Primary background — warm parchment |
| `--color-parchment` | `#F2E6D0` | `bg-parchment` | Secondary surface, cards |
| `--color-linen` | `#EAD9C1` | `bg-linen` | Dividers, hover states, chip bg |
| `--color-espresso` | `#1C0F07` | `text-espresso` | Primary text — deepest dark |
| `--color-cocoa` | `#3D1F10` | `text-cocoa` | Headings, strong emphasis |
| `--color-bark` | `#6B4433` | `text-bark` | Secondary text |
| `--color-umber` | `#9E6B52` | `text-umber` | Muted text, captions, labels |
| `--color-dust` | `#C4A98A` | `text-dust` | Placeholder, disabled |
| `--color-border` | `#E2CBAD` | — | Default border color |

```
Cream    Parchment  Linen    Espresso   Cocoa    Bark     Umber    Dust
#F8F1E6  #F2E6D0   #EAD9C1  #1C0F07   #3D1F10  #6B4433  #9E6B52  #C4A98A
```

### Accent Colors

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `--color-terracotta` | `#C96235` | `bg-terracotta` / `text-terracotta` | Primary CTA, active states, highlights |
| `--color-olive` | `#7A8C3C` | `bg-olive` | Fresh, nature, food pairings |
| `--color-teal-brand` | `#3D8B7A` | `bg-teal-brand` | Drinks, cool beverages |
| `--color-rose-brand` | `#C4756A` | `bg-rose-brand` | Tea, delicate flavors |
| `--color-gold-brand` | `#C9851F` | `bg-gold-brand` | Pricing, premium items, caramel |

### Light tint variants (for badge/chip backgrounds)

Each accent has a `-light` tint token:
- `--color-terracotta-light: #F5E3D9`
- `--color-olive-light: #E8EDD6`
- `--color-teal-light: #D6EDEA`
- `--color-rose-light: #F5E4E2`
- `--color-gold-light: #F7EDDA`

### Color Usage Rules

- **Never** use pure black (`#000`) or pure white (`#fff`) in brand contexts — use `--color-espresso` and `--color-cream` instead
- Primary actions and links always use `--color-terracotta`
- Decorative category colors are assigned semantically:
  - Coffee → terracotta
  - Drinks → teal
  - Tea → rose
  - Bakery → gold
  - Food → olive
- Accessibility: all text/background pairs must meet WCAG AA (4.5:1 for body text, 3:1 for large text)

---

## 3. Typography

All type is loaded via Next.js Google Fonts. Import in `layout.tsx`.

### Font Families

| Role | Family | Variable |
|------|--------|----------|
| **Display** | Playfair Display | `--font-display` |
| **Body / UI** | DM Sans | `--font-sans` |
| **Mono** | Geist Mono | `--font-mono` |

**Playfair Display** is used exclusively for large editorial headings (hero titles, section openers, pull quotes). It should feel like a newspaper nameplate — never used for body copy or UI labels.

**DM Sans** is the workhorse: navigation, body text, buttons, forms, cards.

### Type Scale

| Size | Token | px | Use |
|------|-------|----|-----|
| `text-xs` | `--text-xs` | 12 | Captions, metadata, timestamps |
| `text-sm` | `--text-sm` | 14 | Secondary labels, helper text |
| `text-base` | `--text-base` | 16 | Body text, form inputs |
| `text-lg` | `--text-lg` | 18 | Lead paragraphs, card descriptions |
| `text-xl` | `--text-xl` | 20 | Section labels, emphasized body |
| `text-2xl` | `--text-2xl` | 24 | Sub-headings, card titles |
| `text-3xl` | `--text-3xl` | 30 | Section headings |
| `text-4xl` | `--text-4xl` | 36 | Page headings |
| `text-5xl` | `--text-5xl` | 48 | Hero sub-headings |
| `text-6xl` | `--text-6xl` | 60 | Hero headings |
| `text-7xl` | `--text-7xl` | 72 | Display / editorial headlines |

### Type Roles

```
Display Heading (Playfair Display, 700, text-6xl–7xl)
  "When Life Gives You Lemons, Trade Them For Coffee"

Section Heading (DM Sans, 700, text-3xl–4xl)
  Our Menu

Sub-heading (DM Sans, 600, text-xl–2xl)
  Specialty Drinks

Body (DM Sans, 400, text-base–lg, leading-relaxed)
  Shake up your taste buds with a chocolate delight.

Label (DM Sans, 600, text-sm, tracking-wide, uppercase)
  COFFEE · TEA · DRINKS

Caption (DM Sans, 400, text-xs, text-umber)
  Starting from $4.50
```

### Type Rules

- Display headings: Playfair Display, always `font-bold` (700) or `font-extrabold` (800)
- Never use `font-light` (300) — minimum weight is `font-regular` (400)
- All-caps labels use `tracking-caps` (`0.15em`) for legibility
- Line height: `leading-tight` for display, `leading-snug` for headings, `leading-relaxed` for body

---

## 4. Spacing

Based on a 4px base unit. Use Tailwind's spacing scale directly.

| Steps | px | Common use |
|-------|----|------------|
| 1 (4px) | 4 | Tight icon gaps |
| 2 (8px) | 8 | Inline element gaps |
| 3 (12px) | 12 | Compact padding |
| 4 (16px) | 16 | Standard padding, form gaps |
| 6 (24px) | 24 | Card padding, section gaps |
| 8 (32px) | 32 | Large section padding |
| 12 (48px) | 48 | Section vertical spacing |
| 16 (64px) | 64 | Page section separation |
| 20 (80px) | 80 | Hero/feature vertical padding |
| 24 (96px) | 96 | Maximum section padding |

### Spacing Rules

- **Padding over margin** for component internals
- Section vertical rhythm: minimum `py-16` (64px) between major sections
- Content max-width: `max-w-7xl` (1280px), centered with `mx-auto px-6`
- Mobile: `px-4` horizontal padding; Desktop: `px-6` or `px-8`

---

## 5. Border Radius

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `--radius-sm` | 4px | `rounded-sm` | Subtle roundings, tags |
| `--radius-md` | 8px | `rounded-md` | Inputs, small cards |
| `--radius-lg` | 12px | `rounded-lg` | Standard cards, modals |
| `--radius-xl` | 16px | `rounded-xl` | Large cards |
| `--radius-2xl` | 24px | `rounded-2xl` | Feature cards, hero elements |
| `--radius-full` | 9999px | `rounded-full` | Buttons (pill), badges, avatars |

**Category image circles** are always `rounded-full`.
**Product cards** use `rounded-2xl`.
**Buttons** default to `rounded-full` (pill).

---

## 6. Shadows

| Token | Use |
|-------|-----|
| `--shadow-xs` | Subtle lift — chips, secondary elements |
| `--shadow-sm` | Standard elements |
| `--shadow-card` | Cards at rest |
| `--shadow-lg` | Cards on hover, dropdowns |
| `--shadow-warm` | Primary CTA buttons |
| `--shadow-warm-lg` | Primary CTA on hover |

All shadows use espresso-tinted base (`rgba(28, 15, 7, ...)`) — never pure black.
CTA glow shadows use terracotta base (`rgba(201, 98, 53, ...)`).

---

## 7. Motion & Animation

### Principles
- Transitions should feel **physical and warm** — like a gentle breath, not a mechanical click
- Use the brand easing function: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-warm`)
- Interactive elements respond in `200ms` (base duration)
- Page reveals use `350ms–500ms` with staggered delays
- Never use easing that feels linear or mechanical

### Duration Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 120ms | Focus rings, color flips |
| `--duration-base` | 200ms | Hover states, button transitions |
| `--duration-slow` | 350ms | Enter/exit animations |
| `--duration-slower` | 500ms | Page-level reveals |

### Stagger Pattern (page load)

```css
/* Header at 0ms, nav at 100ms, hero at 200ms, cards at 300ms+ */
.reveal-1 { animation-delay: 0ms; }
.reveal-2 { animation-delay: 100ms; }
.reveal-3 { animation-delay: 200ms; }
.reveal-4 { animation-delay: 300ms; }
```

### Standard Transitions

```tsx
// Button hover
className="transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"

// Card hover lift
className="transition-[transform,shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg"

// Focus ring
className="transition-[outline-color] duration-[120ms]"
```

---

## 8. Iconography

- Use **Lucide React** icons (or HeroIcons) for UI icons — consistent stroke width of `1.5`
- Size: `16px` (sm), `20px` (md, default), `24px` (lg)
- Category icons are illustrated/filled circular icons on colored backgrounds
- Icon color matches text context (`currentColor`), or semantic accent on colored chips

---

## 9. Layout

### Grid
- Default: 12-column grid at desktop, 4-column at mobile
- Product grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Category pills: `flex flex-wrap gap-3`
- Max content width: `max-w-7xl`

### Navigation
- Height: `h-16` (64px) desktop, `h-14` (56px) mobile
- Background: `bg-cream/90 backdrop-blur-sm` for sticky nav
- Logo: display font, large and bold

### Hero
- Minimum height: `min-h-[560px]`
- Split layout: content left (~45%), product image center (~40%), categories right (~15%)
- Background: warm gradient from `--color-cream` to `--color-parchment`

---

## 10. Imagery

- Product shots on **colored circular backgrounds** (use category accent colors)
- Background colors for product circles: `terracotta-light`, `gold-light`, `teal-light`, etc.
- Photography style: warm-toned, natural light, artisanal feel
- No pure white product cutouts — always on warm background
- Illustrations feel hand-crafted; avoid flat/geometric AI illustration styles

---

## 11. Component Overview

See individual spec files in `docs/design/components/`:

| File | Components |
|------|-----------|
| `Button.tsx` | Primary, Secondary, Ghost, Icon, Loading variants |
| `Badge.tsx` | Category, Status, Price, Quantity badges |
| `Card.tsx` | ProductCard, CategoryCard, FeatureCard |
| `Input.tsx` | Text input, Search input, Textarea, Select |
| `Nav.tsx` | Navigation bar with search + mobile menu |

All components are production-ready TSX using Tailwind CSS v4 utilities.

---

## 12. Accessibility

- All interactive elements have visible focus rings: `outline-2 outline-offset-2 outline-terracotta`
- Minimum touch target size: `44×44px`
- Text contrast minimum: WCAG AA (4.5:1 body, 3:1 large text)
- Images always have descriptive `alt` text
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<button>`, `<a>`
- Don't use color alone to convey meaning — always pair with text or shape
