# Brew & Co — Design System

Complete design system for the Brew & Co coffee and beverage platform.

## Structure

```
docs/design/
├── README.md               ← This file — overview & quick start
├── style-guide.md          ← Full brand and visual language guide
├── tokens.css              ← Design tokens (CSS vars + Tailwind v4 @theme)
└── components/
    ├── Button.tsx           ← Button spec + reference implementation
    ├── Badge.tsx            ← Badge, CategoryPill, PriceBadge specs
    ├── Card.tsx             ← ProductCard, CategoryCard, FeatureCard specs
    ├── Input.tsx            ← Input, SearchInput, Textarea, Select specs
    ├── Nav.tsx              ← Navigation bar spec
    └── index.tsx            ← Visual showcase page (copy to app/design/page.tsx)
```

## Quick Start

### 1. Import fonts in `app/layout.tsx`

```tsx
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
```

### 2. Import tokens in `app/globals.css`

```css
@import "../docs/design/tokens.css";
```

### 3. View the showcase

Copy `docs/design/components/index.tsx` to `app/design/page.tsx` and visit `/design`.

---

## Design Foundations

| Token | Description |
|-------|-------------|
| **Colors** | Warm parchment backgrounds, espresso darks, terracotta primary accent |
| **Fonts** | Playfair Display (display/editorial) + DM Sans (UI/body) |
| **Radius** | Pill buttons, 2xl cards, circular product images |
| **Motion** | 200ms warm ease `cubic-bezier(0.22, 1, 0.36, 1)` |
| **Shadows** | Espresso-tinted base shadows, terracotta glow on CTAs |

## Brand Color Quick Reference

```
Cream      #F8F1E6   Primary background
Espresso   #1C0F07   Primary text
Terracotta #C96235   Primary accent (CTAs, links, active)
Gold       #C9851F   Pricing, premium
Olive      #7A8C3C   Food, fresh
Teal       #3D8B7A   Drinks, cool
Rose       #C4756A   Tea, delicate
```

## Component Quick Reference

### Button
```tsx
<Button>Get Promo</Button>
<Button variant="secondary">Browse Menu</Button>
<Button variant="ghost">View Details</Button>
<Button loading>Adding…</Button>
```

### Badge
```tsx
<Badge color="terracotta">Coffee</Badge>
<Badge color="olive" dot>New Arrival</Badge>
<PriceBadge price={30} />
<CategoryPill label="COFFEE" color="terracotta" active />
```

### Cards
```tsx
<ProductCard name="Nutella Mudslide" price={30} accent="terracotta" ... />
<CategoryCard name="Coffee" accent="terracotta" active ... />
<FeatureCard heading="When Life Gives You Lemons..." ... />
```

### Inputs
```tsx
<Input label="Name" placeholder="John Doe" />
<Input label="Email" error="Invalid email" />
<SearchInput placeholder="Search menu..." />
<Select label="Size" options={[...]} />
```

### Nav
```tsx
<Nav cartCount={3} onSearch={(q) => router.push(`/search?q=${q}`)} />
```
