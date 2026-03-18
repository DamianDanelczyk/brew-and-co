/**
 * Brew & Co — Badge Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Spec + Reference Implementation
 *
 * Variants:    category | status | price | quantity
 * Colors:      terracotta | olive | teal | rose | gold | espresso
 * Sizes:       sm | md
 *
 * Tech stack:  Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
 */

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = "category" | "status" | "price" | "quantity";
type BadgeColor   = "terracotta" | "olive" | "teal" | "rose" | "gold" | "espresso";
type BadgeSize    = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  color?:   BadgeColor;
  size?:    BadgeSize;
  dot?:     boolean;          // small colored dot prefix
  icon?:    React.ReactNode;  // icon prefix
  children: React.ReactNode;
  className?: string;
}

// ─── Color maps ───────────────────────────────────────────────────────────────

const colorStyles: Record<BadgeColor, { bg: string; text: string; dot: string }> = {
  terracotta: {
    bg:   "bg-[#F5E3D9]",
    text: "text-[#8A3A1E]",
    dot:  "bg-[#C96235]",
  },
  olive: {
    bg:   "bg-[#E8EDD6]",
    text: "text-[#4A5A1E]",
    dot:  "bg-[#7A8C3C]",
  },
  teal: {
    bg:   "bg-[#D6EDEA]",
    text: "text-[#1F5A52]",
    dot:  "bg-[#3D8B7A]",
  },
  rose: {
    bg:   "bg-[#F5E4E2]",
    text: "text-[#7A3D36]",
    dot:  "bg-[#C4756A]",
  },
  gold: {
    bg:   "bg-[#F7EDDA]",
    text: "text-[#7A4E0A]",
    dot:  "bg-[#C9851F]",
  },
  espresso: {
    bg:   "bg-[#1C0F07]",
    text: "text-[#F8F1E6]",
    dot:  "bg-[#F8F1E6]",
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-[1.375rem] px-2 text-[0.6875rem] gap-1",   // 22px
  md: "h-7 px-2.5 text-xs gap-1.5",                  // 28px
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({
  variant   = "category",
  color     = "terracotta",
  size      = "md",
  dot       = false,
  icon,
  children,
  className = "",
}: BadgeProps) {
  const { bg, text, dot: dotColor } = colorStyles[color];

  const baseStyles = [
    "inline-flex items-center justify-center",
    "rounded-full",
    "font-['DM_Sans',sans-serif] font-semibold",
    "tracking-wide uppercase",
    "leading-none whitespace-nowrap",
    "select-none",
    bg, text,
    sizeStyles[size],
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={baseStyles}>
      {dot && (
        <span
          className={`flex-shrink-0 rounded-full ${dotColor} ${size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"}`}
          aria-hidden="true"
        />
      )}
      {icon && !dot && (
        <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
    </span>
  );
}

// ─── Specialised badge compositions ──────────────────────────────────────────

/** Price badge — large gold tag for product prices */
interface PriceBadgeProps {
  price: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceBadge({
  price,
  currency = "$",
  size = "md",
  className = "",
}: PriceBadgeProps) {
  const formatted = price.toFixed(2);

  const sizeMap = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <span
      className={[
        "inline-flex items-baseline gap-0.5",
        "font-['DM_Sans',sans-serif] font-bold",
        "text-[#C9851F]",   // gold
        sizeMap[size],
        className,
      ].join(" ")}
    >
      <span className="text-[0.6em] leading-none">{currency}</span>
      {formatted}
    </span>
  );
}

/** Category icon pill — circular colored icon + label (from reference design) */
interface CategoryPillProps {
  label:    string;
  color:    BadgeColor;
  icon?:    React.ReactNode;
  active?:  boolean;
  onClick?: () => void;
}

const categoryBgMap: Record<BadgeColor, string> = {
  terracotta: "bg-[#F5E3D9] hover:bg-[#EDCFBF]",
  olive:      "bg-[#E8EDD6] hover:bg-[#D8E2C0]",
  teal:       "bg-[#D6EDEA] hover:bg-[#C0E0DB]",
  rose:       "bg-[#F5E4E2] hover:bg-[#EDD0CC]",
  gold:       "bg-[#F7EDDA] hover:bg-[#EDDFC0]",
  espresso:   "bg-[#1C0F07] hover:bg-[#3D1F10]",
};

const categoryActiveBgMap: Record<BadgeColor, string> = {
  terracotta: "bg-[#C96235] text-white",
  olive:      "bg-[#7A8C3C] text-white",
  teal:       "bg-[#3D8B7A] text-white",
  rose:       "bg-[#C4756A] text-white",
  gold:       "bg-[#C9851F] text-white",
  espresso:   "bg-[#F8F1E6] text-[#1C0F07]",
};

export function CategoryPill({
  label,
  color,
  icon,
  active = false,
  onClick,
}: CategoryPillProps) {
  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      onClick={onClick}
      className={[
        "inline-flex flex-col items-center gap-2",
        "cursor-pointer",
        "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        onClick ? "hover:scale-105 active:scale-95" : "",
      ].filter(Boolean).join(" ")}
    >
      {/* Icon circle */}
      <span
        className={[
          "flex items-center justify-center",
          "w-14 h-14 rounded-full",
          "shadow-[0_2px_8px_rgba(28,15,7,0.08)]",
          "transition-all duration-200",
          active ? categoryActiveBgMap[color] : categoryBgMap[color],
        ].join(" ")}
        aria-hidden="true"
      >
        {icon}
      </span>
      {/* Label */}
      <span
        className={[
          "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
          "font-['DM_Sans',sans-serif]",
          active ? "text-[#1C0F07]" : "text-[#9E6B52]",
        ].join(" ")}
      >
        {label}
      </span>
    </Tag>
  );
}

// ─── Spec ─────────────────────────────────────────────────────────────────────
//
// BADGE VARIANT: category
//   Pill-shaped label for product/menu categories.
//   Always uppercase, semibold, tight letter-spacing.
//
//   Colors:
//     terracotta → bg: #F5E3D9 · text: #8A3A1E  ← COFFEE
//     olive      → bg: #E8EDD6 · text: #4A5A1E  ← FOOD
//     teal       → bg: #D6EDEA · text: #1F5A52  ← DRINKS
//     rose       → bg: #F5E4E2 · text: #7A3D36  ← TEA
//     gold       → bg: #F7EDDA · text: #7A4E0A  ← BAKERY
//     espresso   → bg: #1C0F07 · text: #F8F1E6  ← dark pill
//
// BADGE VARIANT: status
//   Used for product/order states: "New", "Hot", "Limited", "Sold Out"
//   Uses dot prefix to indicate state:
//     dot + terracotta → "Hot"
//     dot + olive      → "New"
//     dot + espresso   → "Sold Out"
//
// PRICE BADGE
//   Stand-alone price display in gold color.
//   Currency symbol is smaller (0.6em) for visual hierarchy.
//   Sizes: sm (body inline), md (card), lg (hero/featured)
//
// CATEGORY PILL
//   Vertical stack: colored circle icon above all-caps label.
//   Based directly on reference design (right sidebar: Coffee/Drinks/Tea/Bakery).
//   active state inverts: colored circle → accent fill.
//
// ─── Usage examples ──────────────────────────────────────────────────────────
//
// <Badge color="terracotta">Coffee</Badge>
//
// <Badge color="olive" dot>New</Badge>
//
// <Badge color="teal" size="sm">Drinks</Badge>
//
// <PriceBadge price={30} />                → "$30.00"
// <PriceBadge price={4.5} size="sm" />    → "$4.50"
//
// <CategoryPill
//   label="Coffee"
//   color="terracotta"
//   icon={<CoffeeIcon />}
//   active
//   onClick={() => setCategory("coffee")}
// />
