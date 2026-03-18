/**
 * Brew & Co — Design System Showcase
 * ─────────────────────────────────────────────────────────────────────────────
 * A visual reference page showing all design system components in their
 * key variants and states. Drop this at app/design/page.tsx to view in browser.
 *
 * Tech stack:  Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
 */

"use client";

import React, { useState } from "react";

// ─── NOTE ─────────────────────────────────────────────────────────────────────
// To use this as a live page:
//   1. Copy this file to  app/design/page.tsx
//   2. Import components from their source locations once built
//   3. Add Google Fonts (Playfair Display + DM Sans) to app/layout.tsx
//   4. Import docs/design/tokens.css in app/globals.css
// ─────────────────────────────────────────────────────────────────────────────

export default function DesignShowcase() {
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(2);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "#F8F1E6", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ─── HEADER ──────────────────────────────────────────────────────── */}
      <div
        style={{ background: "#F8F1E6", borderBottom: "1px solid #EDD9C0" }}
        className="px-8 py-6"
      >
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1C0F07" }}
          className="text-4xl font-bold mb-1"
        >
          Brew & Co. Design System
        </h1>
        <p style={{ color: "#9E6B52" }} className="text-base">
          Component library · Visual reference · Version 1.0
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-20">

        {/* ─── COLOR SYSTEM ────────────────────────────────────────────────── */}
        <Section title="Color System">
          <div className="space-y-6">
            {/* Primary palette */}
            <div>
              <SectionLabel>Primary Palette</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Cream",      value: "#F8F1E6", textDark: true  },
                  { name: "Parchment",  value: "#F2E6D0", textDark: true  },
                  { name: "Linen",      value: "#EAD9C1", textDark: true  },
                  { name: "Espresso",   value: "#1C0F07", textDark: false },
                  { name: "Cocoa",      value: "#3D1F10", textDark: false },
                  { name: "Bark",       value: "#6B4433", textDark: false },
                  { name: "Umber",      value: "#9E6B52", textDark: false },
                  { name: "Dust",       value: "#C4A98A", textDark: true  },
                ].map((c) => (
                  <ColorSwatch key={c.name} {...c} />
                ))}
              </div>
            </div>

            {/* Accent palette */}
            <div>
              <SectionLabel>Accent Palette</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Terracotta",    value: "#C96235", textDark: false },
                  { name: "Terra-light",   value: "#F5E3D9", textDark: true  },
                  { name: "Olive",         value: "#7A8C3C", textDark: false },
                  { name: "Olive-light",   value: "#E8EDD6", textDark: true  },
                  { name: "Teal",          value: "#3D8B7A", textDark: false },
                  { name: "Teal-light",    value: "#D6EDEA", textDark: true  },
                  { name: "Rose",          value: "#C4756A", textDark: false },
                  { name: "Rose-light",    value: "#F5E4E2", textDark: true  },
                  { name: "Gold",          value: "#C9851F", textDark: false },
                  { name: "Gold-light",    value: "#F7EDDA", textDark: true  },
                ].map((c) => (
                  <ColorSwatch key={c.name} {...c} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─── TYPOGRAPHY ──────────────────────────────────────────────────── */}
        <Section title="Typography">
          <div className="space-y-6">
            <div
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1C0F07" }}
              className="space-y-2"
            >
              <SectionLabel>Display — Playfair Display</SectionLabel>
              <p className="text-7xl font-bold leading-tight">The Art of Coffee.</p>
              <p className="text-5xl font-bold leading-tight">Crafted With Care.</p>
              <p className="text-3xl font-bold leading-snug">Every Cup Tells a Story</p>
            </div>
            <div
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#1C0F07" }}
              className="space-y-3"
            >
              <SectionLabel>Body — DM Sans</SectionLabel>
              <p className="text-xl font-semibold" style={{ color: "#3D1F10" }}>
                Section Heading — 20px / Semibold
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#3D1F10" }}>
                Body text — 16px Regular. Shake up your taste buds with a chocolate delight.
                Chill out with our chocolicious shakes. Pure cocoa goodness in every sip.
              </p>
              <p className="text-sm" style={{ color: "#9E6B52" }}>
                Caption / label — 14px Regular. Starting from $4.50
              </p>
              <p
                className="text-xs font-semibold tracking-[0.15em] uppercase"
                style={{ color: "#9E6B52" }}
              >
                All-caps label — 12px Semibold · 0.15em tracking
              </p>
            </div>
          </div>
        </Section>

        {/* ─── BUTTONS ─────────────────────────────────────────────────────── */}
        <Section title="Buttons">
          <div className="space-y-5">
            {/* Primary */}
            <Row label="Primary">
              <ShowButton variant="primary" size="sm">Small</ShowButton>
              <ShowButton variant="primary" size="md">Get Promo</ShowButton>
              <ShowButton variant="primary" size="lg">Order Now</ShowButton>
              <ShowButton variant="primary" disabled>Disabled</ShowButton>
              <ShowButton variant="primary" loading>Loading</ShowButton>
            </Row>
            {/* Secondary */}
            <Row label="Secondary">
              <ShowButton variant="secondary" size="sm">Small</ShowButton>
              <ShowButton variant="secondary" size="md">Browse Menu</ShowButton>
              <ShowButton variant="secondary" size="lg">Learn More</ShowButton>
              <ShowButton variant="secondary" disabled>Disabled</ShowButton>
            </Row>
            {/* Ghost */}
            <Row label="Ghost">
              <ShowButton variant="ghost" size="sm">View</ShowButton>
              <ShowButton variant="ghost" size="md">View Details</ShowButton>
              <ShowButton variant="ghost" size="lg">Explore All</ShowButton>
            </Row>
            {/* Pill vs rounded */}
            <Row label="Shape">
              <ShowButton variant="primary" pill>Pill (default)</ShowButton>
              <ShowButton variant="primary" pill={false}>Rounded</ShowButton>
            </Row>
          </div>
        </Section>

        {/* ─── BADGES ──────────────────────────────────────────────────────── */}
        <Section title="Badges">
          <div className="space-y-4">
            <Row label="Category">
              {(["terracotta","olive","teal","rose","gold","espresso"] as const).map(color => (
                <ShowBadge key={color} color={color}>
                  {{ terracotta:"Coffee", olive:"Food", teal:"Drinks", rose:"Tea", gold:"Bakery", espresso:"New" }[color]}
                </ShowBadge>
              ))}
            </Row>
            <Row label="With dot">
              <ShowBadge color="terracotta" dot>Hot</ShowBadge>
              <ShowBadge color="olive" dot>New</ShowBadge>
              <ShowBadge color="teal" dot>Available</ShowBadge>
              <ShowBadge color="espresso" dot>Sold Out</ShowBadge>
            </Row>
            <Row label="Small">
              {(["terracotta","teal","gold"] as const).map(color => (
                <ShowBadge key={color} color={color} size="sm">
                  {{ terracotta:"Coffee", teal:"Drinks", gold:"Bakery" }[color]}
                </ShowBadge>
              ))}
            </Row>
            <Row label="Price">
              <PriceDisplay price={30}   size="sm"  />
              <PriceDisplay price={40}   size="md"  />
              <PriceDisplay price={35}   size="lg"  />
            </Row>
          </div>
        </Section>

        {/* ─── CATEGORY PILLS ──────────────────────────────────────────────── */}
        <Section title="Category Pills">
          <div className="flex gap-8">
            {[
              { label:"COFFEE", color:"terracotta" as const },
              { label:"DRINKS", color:"teal" as const       },
              { label:"TEA",    color:"rose" as const        },
              { label:"BAKERY", color:"gold" as const        },
              { label:"FOOD",   color:"olive" as const       },
            ].map(({ label, color }) => (
              <CategoryPillDemo
                key={label}
                label={label}
                color={color}
                active={activeCategory === label.toLowerCase()}
                onClick={() => setActiveCategory(label.toLowerCase())}
              />
            ))}
          </div>
        </Section>

        {/* ─── CARDS ───────────────────────────────────────────────────────── */}
        <Section title="Cards">
          <div className="space-y-8">
            <div>
              <SectionLabel>Product Cards</SectionLabel>
              <div className="flex flex-wrap gap-5">
                {[
                  { name:"Nutella Mudslide",    price:30, accent:"terracotta" as const },
                  { name:"Caramel Frappuccino", price:40, accent:"gold"       as const },
                  { name:"Hot Chocolate",       price:35, accent:"teal"       as const },
                  { name:"Jasmine Pearl Tea",   price:25, accent:"rose"       as const },
                ].map((p) => (
                  <ProductCardDemo key={p.name} {...p} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─── INPUTS ──────────────────────────────────────────────────────── */}
        <Section title="Inputs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <InputDemo label="Name" placeholder="John Doe" />
            <InputDemo label="Email" type="email" placeholder="you@example.com" />
            <InputDemo
              label="Email (error)"
              type="email"
              value="bad-email"
              error="Please enter a valid email address"
            />
            <InputDemo
              label="Promo Code"
              placeholder="BREW20"
              variant="filled"
              hint="Enter your promo code for a discount"
            />
            <div className="sm:col-span-2">
              <SearchInputDemo
                value={searchValue}
                onChange={(v) => setSearchValue(v)}
                placeholder="Search drinks, coffee, bakery..."
              />
            </div>
          </div>
        </Section>

        {/* ─── NAVIGATION ──────────────────────────────────────────────────── */}
        <Section title="Navigation">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #EDD9C0" }}
          >
            <NavDemo cartCount={cartCount} />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setCartCount(c => c + 1)}
              style={{ background: "#C96235" }}
              className="px-4 py-2 rounded-full text-white text-sm font-semibold"
            >
              + Add to cart
            </button>
            <button
              onClick={() => setCartCount(0)}
              style={{ border: "1.5px solid #1C0F07", color: "#1C0F07" }}
              className="px-4 py-2 rounded-full text-sm font-semibold"
            >
              Clear cart
            </button>
            <span style={{ color: "#9E6B52" }} className="text-sm">
              Cart: {cartCount} item{cartCount !== 1 ? "s" : ""}
            </span>
          </div>
        </Section>

        {/* ─── SHADOWS ─────────────────────────────────────────────────────── */}
        <Section title="Shadows">
          <div className="flex flex-wrap gap-6">
            {[
              { name: "xs",      shadow: "0 1px 2px rgba(28,15,7,0.06)"                                                  },
              { name: "sm",      shadow: "0 1px 3px rgba(28,15,7,0.08), 0 1px 2px rgba(28,15,7,0.06)"                   },
              { name: "card",    shadow: "0 2px 12px rgba(28,15,7,0.08), 0 1px 3px rgba(28,15,7,0.05)"                  },
              { name: "lg",      shadow: "0 10px 15px rgba(28,15,7,0.08), 0 4px 6px rgba(28,15,7,0.06)"                 },
              { name: "xl",      shadow: "0 20px 25px rgba(28,15,7,0.1), 0 10px 10px rgba(28,15,7,0.06)"                },
              { name: "warm",    shadow: "0 4px 14px rgba(201,98,53,0.30)"                                               },
              { name: "warm-lg", shadow: "0 8px 28px rgba(201,98,53,0.35)"                                               },
            ].map(({ name, shadow }) => (
              <div key={name} className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 rounded-2xl bg-white"
                  style={{ boxShadow: shadow }}
                />
                <span style={{ color: "#9E6B52", fontFamily: "'DM Sans',sans-serif" }} className="text-xs">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── SPACING & RADIUS ────────────────────────────────────────────── */}
        <Section title="Border Radius">
          <div className="flex flex-wrap gap-4 items-end">
            {[
              { name: "xs (2px)",   r: "2px"    },
              { name: "sm (4px)",   r: "4px"    },
              { name: "md (8px)",   r: "8px"    },
              { name: "lg (12px)",  r: "12px"   },
              { name: "xl (16px)",  r: "16px"   },
              { name: "2xl (24px)", r: "24px"   },
              { name: "3xl (32px)", r: "32px"   },
              { name: "full",       r: "9999px" },
            ].map(({ name, r }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16"
                  style={{
                    background: "#F5E3D9",
                    border: "1.5px solid #C96235",
                    borderRadius: r,
                  }}
                />
                <span style={{ color: "#9E6B52", fontFamily: "'DM Sans',sans-serif" }} className="text-xs text-center">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

// ─── Helper sub-components (self-contained for showcase) ─────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1C0F07", borderBottom: "1px solid #EDD9C0" }}
        className="text-2xl font-bold pb-4 mb-8"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ fontFamily: "'DM Sans',sans-serif", color: "#9E6B52" }}
      className="text-xs font-semibold tracking-[0.12em] uppercase mb-3"
    >
      {children}
    </p>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        style={{ color: "#9E6B52", fontFamily: "'DM Sans',sans-serif", minWidth: "80px" }}
        className="text-xs font-semibold tracking-wide uppercase"
      >
        {label}
      </span>
      {children}
    </div>
  );
}

// Inline button (no external import needed for showcase)
function ShowButton({
  variant, size = "md", disabled, loading, pill = true, children
}: {
  variant: string; size?: string; disabled?: boolean; loading?: boolean; pill?: boolean; children: React.ReactNode
}) {
  const sizeMap: Record<string, string> = {
    sm: "h-8 px-3.5 text-sm gap-1.5",
    md: "h-11 px-5 text-base gap-2",
    lg: "h-[3.25rem] px-7 text-lg gap-2.5",
  };
  const variantMap: Record<string, React.CSSProperties> = {
    primary:   { background: disabled ? "#C4A98A" : "#C96235", color: "white",    border: "none", boxShadow: disabled ? "none" : "0 4px 14px rgba(201,98,53,0.30)" },
    secondary: { background: "transparent", color: disabled ? "#C4A98A" : "#1C0F07", border: `1.5px solid ${disabled ? "#C4A98A" : "#1C0F07"}` },
    ghost:     { background: "transparent", color: "#C96235", border: "none" },
    danger:    { background: "#C03A2A", color: "white", border: "none" },
  };

  return (
    <button
      disabled={disabled || loading}
      className={["inline-flex items-center justify-center font-semibold leading-none select-none transition-all duration-200", sizeMap[size], pill ? "rounded-full" : "rounded-xl"].join(" ")}
      style={{ fontFamily: "'DM Sans',sans-serif", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1, ...variantMap[variant] }}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}

// Inline badge
function ShowBadge({ color, dot, size = "md", children }: { color: string; dot?: boolean; size?: string; children: React.ReactNode }) {
  const bgMap: Record<string, { bg: string; text: string; dot: string }> = {
    terracotta: { bg: "#F5E3D9", text: "#8A3A1E", dot: "#C96235" },
    olive:      { bg: "#E8EDD6", text: "#4A5A1E", dot: "#7A8C3C" },
    teal:       { bg: "#D6EDEA", text: "#1F5A52", dot: "#3D8B7A" },
    rose:       { bg: "#F5E4E2", text: "#7A3D36", dot: "#C4756A" },
    gold:       { bg: "#F7EDDA", text: "#7A4E0A", dot: "#C9851F" },
    espresso:   { bg: "#1C0F07", text: "#F8F1E6", dot: "#F8F1E6" },
  };
  const { bg, text, dot: dotColor } = bgMap[color] ?? bgMap.terracotta;
  const isSmall = size === "sm";

  return (
    <span
      className={["inline-flex items-center rounded-full font-semibold tracking-wide uppercase leading-none", isSmall ? "h-[1.375rem] px-2 gap-1 text-[0.6875rem]" : "h-7 px-2.5 gap-1.5 text-xs"].join(" ")}
      style={{ background: bg, color: text, fontFamily: "'DM Sans',sans-serif" }}
    >
      {dot && <span className={["rounded-full flex-shrink-0", isSmall ? "w-1.5 h-1.5" : "w-2 h-2"].join(" ")} style={{ background: dotColor }} />}
      {children}
    </span>
  );
}

// Price display
function PriceDisplay({ price, size }: { price: number; size: string }) {
  const sizeMap: Record<string, string> = { sm: "text-sm", md: "text-xl", lg: "text-3xl" };
  return (
    <span
      className={["inline-flex items-baseline gap-0.5 font-bold", sizeMap[size]].join(" ")}
      style={{ color: "#C9851F", fontFamily: "'DM Sans',sans-serif" }}
    >
      <span className="text-[0.6em]">$</span>
      {price.toFixed(2)}
    </span>
  );
}

// Category pill
type AccentColor = "terracotta" | "olive" | "teal" | "rose" | "gold";
function CategoryPillDemo({ label, color, active, onClick }: { label: string; color: AccentColor; active: boolean; onClick: () => void }) {
  const bgMap: Record<AccentColor, { inactive: string; active: string }> = {
    terracotta: { inactive: "#F5E3D9", active: "#C96235" },
    olive:      { inactive: "#E8EDD6", active: "#7A8C3C" },
    teal:       { inactive: "#D6EDEA", active: "#3D8B7A" },
    rose:       { inactive: "#F5E4E2", active: "#C4756A" },
    gold:       { inactive: "#F7EDDA", active: "#C9851F" },
  };
  const colors = bgMap[color];

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
      style={{ fontFamily: "'DM Sans',sans-serif" }}
    >
      <span
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
        style={{
          background: active ? colors.active : colors.inactive,
          boxShadow: "0 2px 8px rgba(28,15,7,0.08)",
          transition: "background 200ms",
        }}
      >
        {{ terracotta: "☕", olive: "🥗", teal: "🧋", rose: "🍵", gold: "🧁" }[color]}
      </span>
      <span
        className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase"
        style={{ color: active ? "#1C0F07" : "#9E6B52" }}
      >
        {label}
      </span>
    </button>
  );
}

// Product card
function ProductCardDemo({ name, price, accent }: { name: string; price: number; accent: AccentColor }) {
  const circleBg: Record<AccentColor, string> = {
    terracotta: "#F5E3D9", olive: "#E8EDD6", teal: "#D6EDEA", rose: "#F5E4E2", gold: "#F7EDDA",
  };
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-5 pb-6 bg-white w-44 cursor-pointer transition-all duration-200"
      style={{
        border: "1px solid #EDD9C0",
        boxShadow: hovered ? "0 10px 20px rgba(28,15,7,0.10), 0 4px 6px rgba(28,15,7,0.06)" : "0 2px 12px rgba(28,15,7,0.08), 0 1px 3px rgba(28,15,7,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image placeholder circle */}
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center text-4xl"
        style={{
          background: circleBg[accent],
          boxShadow: "0 4px 12px rgba(28,15,7,0.10)",
          outline: "4px solid white",
          outlineOffset: "2px",
        }}
      >
        {{ terracotta:"☕", gold:"🥤", teal:"🧋", rose:"🍵", olive:"🥐" }[accent]}
      </div>

      {/* Name + price */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3
          className="text-base font-semibold leading-snug"
          style={{ color: "#1C0F07", fontFamily: "'DM Sans',sans-serif" }}
        >
          {name}
        </h3>
        <span
          className="text-xl font-bold"
          style={{ color: "#C9851F", fontFamily: "'DM Sans',sans-serif" }}
        >
          <span style={{ fontSize: "0.6em" }}>$</span>{price.toFixed(2)}
        </span>
      </div>

      {/* Add to cart hover */}
      <button
        className="w-full h-10 rounded-full text-sm font-semibold text-white transition-all duration-200"
        style={{
          background: "#C96235",
          fontFamily: "'DM Sans',sans-serif",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

// Input demo
function InputDemo({
  label, placeholder, type, error, hint, value, variant
}: {
  label: string; placeholder?: string; type?: string; error?: string; hint?: string; value?: string; variant?: string
}) {
  const [val, setVal] = useState(value ?? "");
  const isOutlined = !variant || variant === "outlined";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-medium"
        style={{ color: "#3D1F10", fontFamily: "'DM Sans',sans-serif" }}
      >
        {label}
      </label>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="h-11 px-4 rounded-xl text-base outline-none transition-all duration-150"
        style={{
          background: isOutlined ? "white" : "#F2E6D0",
          border: `1.5px solid ${error ? "#C03A2A" : "#E2CBAD"}`,
          color: "#1C0F07",
          fontFamily: "'DM Sans',sans-serif",
        }}
      />
      {error && (
        <p className="text-xs font-medium" style={{ color: "#C03A2A", fontFamily: "'DM Sans',sans-serif" }}>{error}</p>
      )}
      {!error && hint && (
        <p className="text-xs" style={{ color: "#9E6B52", fontFamily: "'DM Sans',sans-serif" }}>{hint}</p>
      )}
    </div>
  );
}

// Search input demo
function SearchInputDemo({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <SectionLabel>Search Input</SectionLabel>
      <div className="relative flex items-center">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9E6B52" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-11 pr-5 rounded-full text-base outline-none transition-all duration-200 appearance-none"
          style={{
            background: "white",
            border: "1.5px solid #E2CBAD",
            color: "#1C0F07",
            fontFamily: "'DM Sans',sans-serif",
          }}
        />
      </div>
    </div>
  );
}

// Nav demo
function NavDemo({ cartCount }: { cartCount: number }) {
  return (
    <div
      className="flex items-center justify-between h-16 px-6 gap-6"
      style={{ background: "#F8F1E6", borderBottom: "1px solid #EDD9C0" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full text-white flex-shrink-0"
          style={{ background: "#C96235" }}
        >
          ☕
        </span>
        <span
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display',Georgia,serif", color: "#1C0F07" }}
        >
          Brew & Co<span style={{ color: "#C96235" }}>.</span>
        </span>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1">
        {["Home","Menu","Shop","About","Blog"].map((l, i) => (
          <span
            key={l}
            className="px-3 py-1.5 rounded-lg text-[0.9375rem] font-medium cursor-pointer transition-colors duration-150"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: i === 0 ? "#C96235" : "#3D1F10",
              background: i === 0 ? "#F5E3D9" : "transparent",
            }}
          >
            {l}
          </span>
        ))}
      </nav>

      {/* Search + cart */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9E6B52" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            readOnly
            className="h-9 w-44 pl-9 pr-4 rounded-full text-sm"
            style={{ background: "white", border: "1px solid #E2CBAD", fontFamily: "'DM Sans',sans-serif", color: "#C4A98A", outline: "none" }}
          />
        </div>
        <button
          className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150"
          style={{ color: "#3D1F10" }}
          aria-label={`Cart, ${cartCount} items`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {cartCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white"
              style={{ background: "#C96235", fontSize: "0.6rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}
            >
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
