/**
 * Brew & Co — Card Components
 * ─────────────────────────────────────────────────────────────────────────────
 * Spec + Reference Implementation
 *
 * Components:  ProductCard | CategoryCard | FeatureCard
 *
 * Tech stack:  Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
 */

import React from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccentColor = "terracotta" | "olive" | "teal" | "rose" | "gold";

// ─── Color maps ───────────────────────────────────────────────────────────────

const accentCircleBg: Record<AccentColor, string> = {
  terracotta: "bg-[#F5E3D9]",
  olive:      "bg-[#E8EDD6]",
  teal:       "bg-[#D6EDEA]",
  rose:       "bg-[#F5E4E2]",
  gold:       "bg-[#F7EDDA]",
};

const accentText: Record<AccentColor, string> = {
  terracotta: "text-[#C96235]",
  olive:      "text-[#7A8C3C]",
  teal:       "text-[#3D8B7A]",
  rose:       "text-[#C4756A]",
  gold:       "text-[#C9851F]",
};

// ─── ProductCard ──────────────────────────────────────────────────────────────
// Matches the bottom section of the reference: circular colored image + name + price

interface ProductCardProps {
  name:         string;
  price:        number;
  currency?:    string;
  imageSrc:     string;
  imageAlt:     string;
  accent?:      AccentColor;
  badge?:       string;            // optional "New" / "Hot" label
  href?:        string;            // if provided, wraps in anchor
  onAddToCart?: () => void;
  className?:   string;
}

export function ProductCard({
  name,
  price,
  currency = "$",
  imageSrc,
  imageAlt,
  accent = "terracotta",
  badge,
  href,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const cardContent = (
    <div
      className={[
        // Container
        "group relative flex flex-col items-center gap-4",
        "bg-white rounded-2xl p-5 pb-6",
        "border border-[#EDD9C0]",
        "shadow-[0_2px_12px_rgba(28,15,7,0.08),0_1px_3px_rgba(28,15,7,0.05)]",
        // Hover
        "hover:shadow-[0_10px_20px_rgba(28,15,7,0.1),0_4px_6px_rgba(28,15,7,0.06)]",
        "hover:-translate-y-1",
        // Transition
        "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      ].join(" ")}
    >
      {/* Status badge */}
      {badge && (
        <span
          className={[
            "absolute top-4 left-4",
            "inline-flex items-center h-[1.375rem] px-2",
            "rounded-full text-[0.6875rem] font-semibold tracking-wide uppercase",
            "font-['DM_Sans',sans-serif]",
            "bg-[#F5E3D9] text-[#8A3A1E]",
          ].join(" ")}
        >
          {badge}
        </span>
      )}

      {/* Circular image with accent background */}
      <div
        className={[
          "relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0",
          "flex items-center justify-center",
          accentCircleBg[accent],
          // Inner ring
          "ring-4 ring-white ring-offset-2 ring-offset-[#F8F1E6]",
          "shadow-[0_4px_12px_rgba(28,15,7,0.10)]",
        ].join(" ")}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3
          className={[
            "text-base font-semibold leading-snug",
            "font-['DM_Sans',sans-serif]",
            "text-[#1C0F07]",
          ].join(" ")}
        >
          {name}
        </h3>

        {/* Price */}
        <span
          className={[
            "text-xl font-bold",
            "font-['DM_Sans',sans-serif]",
            accentText.gold,
          ].join(" ")}
        >
          <span className="text-[0.6em]">{currency}</span>
          {price.toFixed(2)}
        </span>
      </div>

      {/* Add to cart — appears on hover */}
      {onAddToCart && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart();
          }}
          className={[
            "mt-1 w-full h-10",
            "inline-flex items-center justify-center",
            "rounded-full",
            "text-sm font-semibold font-['DM_Sans',sans-serif]",
            "bg-[#C96235] text-white",
            "opacity-0 group-hover:opacity-100",
            "translate-y-2 group-hover:translate-y-0",
            "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:bg-[#B55228]",
            "active:scale-[0.98]",
            "focus-visible:opacity-100 focus-visible:translate-y-0",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
          ].join(" ")}
          aria-label={`Add ${name} to cart`}
        >
          Add to cart
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

// ─── CategoryCard ─────────────────────────────────────────────────────────────
// Larger clickable category tile with background color fill

interface CategoryCardProps {
  name:       string;
  count?:     number;     // optional item count
  imageSrc?:  string;
  imageAlt?:  string;
  accent:     AccentColor;
  active?:    boolean;
  onClick?:   () => void;
  className?: string;
}

const categoryCardBg: Record<AccentColor, string> = {
  terracotta: "bg-[#F5E3D9]",
  olive:      "bg-[#E8EDD6]",
  teal:       "bg-[#D6EDEA]",
  rose:       "bg-[#F5E4E2]",
  gold:       "bg-[#F7EDDA]",
};

const categoryCardActiveBg: Record<AccentColor, string> = {
  terracotta: "bg-[#C96235]",
  olive:      "bg-[#7A8C3C]",
  teal:       "bg-[#3D8B7A]",
  rose:       "bg-[#C4756A]",
  gold:       "bg-[#C9851F]",
};

export function CategoryCard({
  name,
  count,
  imageSrc,
  imageAlt,
  accent,
  active = false,
  onClick,
  className = "",
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "group flex flex-col items-center gap-3 p-5",
        "rounded-2xl",
        "border border-transparent",
        active
          ? `${categoryCardActiveBg[accent]} border-transparent`
          : `${categoryCardBg[accent]} hover:border-[#E2CBAD]`,
        "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
        className,
      ].join(" ")}
    >
      {/* Image */}
      {imageSrc && (
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white/50">
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          className={[
            "text-sm font-bold tracking-wide uppercase",
            "font-['DM_Sans',sans-serif]",
            active ? "text-white" : "text-[#1C0F07]",
          ].join(" ")}
        >
          {name}
        </span>
        {count !== undefined && (
          <span
            className={[
              "text-xs font-medium",
              "font-['DM_Sans',sans-serif]",
              active ? "text-white/75" : "text-[#9E6B52]",
            ].join(" ")}
          >
            {count} items
          </span>
        )}
      </div>
    </button>
  );
}

// ─── FeatureCard ──────────────────────────────────────────────────────────────
// Large editorial hero/promo card with overlaid text and background image

interface FeatureCardProps {
  eyebrow?:   string;        // small label above heading
  heading:    string;
  body?:      string;
  ctaLabel?:  string;
  ctaHref?:   string;
  imageSrc:   string;
  imageAlt:   string;
  accent?:    AccentColor;
  className?: string;
}

export function FeatureCard({
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  accent = "terracotta",
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl",
        "min-h-[400px]",
        "bg-[#1C0F07]",
        className,
      ].join(" ")}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-60"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[rgba(28,15,7,0.85)] via-[rgba(28,15,7,0.5)] to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
        {eyebrow && (
          <span
            className={[
              "inline-block mb-3",
              "text-[0.6875rem] font-semibold tracking-[0.15em] uppercase",
              "font-['DM_Sans',sans-serif]",
              accentText[accent],
            ].join(" ")}
          >
            {eyebrow}
          </span>
        )}

        <h2
          className={[
            "text-3xl md:text-4xl font-bold leading-tight",
            "font-['Playfair_Display',Georgia,serif]",
            "text-[#F8F1E6]",
            "mb-3",
          ].join(" ")}
        >
          {heading}
        </h2>

        {body && (
          <p
            className={[
              "text-base leading-relaxed",
              "font-['DM_Sans',sans-serif]",
              "text-[#EAD9C1]",
              "mb-6 max-w-sm",
            ].join(" ")}
          >
            {body}
          </p>
        )}

        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className={[
              "self-start inline-flex items-center justify-center",
              "h-11 px-6 rounded-full",
              "text-sm font-semibold font-['DM_Sans',sans-serif]",
              "bg-[#C96235] text-white",
              "shadow-[0_4px_14px_rgba(201,98,53,0.30)]",
              "hover:bg-[#B55228] hover:shadow-[0_8px_28px_rgba(201,98,53,0.35)]",
              "active:scale-[0.98]",
              "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
            ].join(" ")}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Spec ─────────────────────────────────────────────────────────────────────
//
// PRODUCT CARD
//   Layout:    vertical flex, centered, padding 20px/24px
//   Shape:     rounded-2xl (24px), white bg, subtle border + shadow
//   Image:     w-28 h-28 circular, on accent-color bg, ring-4 white ring
//   Name:      text-base, font-semibold, centered, text-espresso
//   Price:     text-xl, font-bold, gold color (#C9851F)
//   Badge:     absolute top-left, pill, terracotta-light bg
//   CTA:       "Add to cart" button, appears on hover with fade+lift
//   Hover:     card lifts -translate-y-1, shadow deepens
//   Transition: 200ms warm ease
//
//   Accent background map (for image circle):
//     terracotta → #F5E3D9  (coffee)
//     gold       → #F7EDDA  (caramel/bakery)
//     teal       → #D6EDEA  (drinks)
//     rose       → #F5E4E2  (tea)
//     olive      → #E8EDD6  (food)
//
// CATEGORY CARD
//   Compact clickable tile with optional icon + label + count
//   active state: accent color fill, white text
//   inactive: light tint bg, espresso text
//   Transition: scale(1.02) on hover, scale(0.98) on click
//
// FEATURE CARD
//   Large editorial promo card (full bleed image + overlay text)
//   Background: dark overlay gradient from-espresso
//   Eyebrow: small caps accent-colored label
//   Heading: Playfair Display, cream
//   CTA button: terracotta pill
//
// ─── Usage examples ──────────────────────────────────────────────────────────
//
// <ProductCard
//   name="Nutella Mudslide"
//   price={30}
//   imageSrc="/images/nutella-mudslide.jpg"
//   imageAlt="Nutella Mudslide shake"
//   accent="terracotta"
//   badge="Hot"
//   onAddToCart={() => addToCart("nutella-mudslide")}
// />
//
// <CategoryCard
//   name="Coffee"
//   count={24}
//   imageSrc="/images/categories/coffee.png"
//   imageAlt="Coffee category"
//   accent="terracotta"
//   active={activeCategory === "coffee"}
//   onClick={() => setActiveCategory("coffee")}
// />
//
// <FeatureCard
//   eyebrow="Featured This Week"
//   heading="When Life Gives You Lemons, Trade Them For Coffee"
//   body="Shake up your taste buds with a chocolate delight."
//   ctaLabel="Get Promo"
//   ctaHref="/promo"
//   imageSrc="/images/hero-drink.jpg"
//   imageAlt="Featured chocolate shake"
// />
