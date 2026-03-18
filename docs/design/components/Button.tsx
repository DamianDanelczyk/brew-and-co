/**
 * Brew & Co — Button Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Spec + Reference Implementation
 *
 * Variants:    primary | secondary | ghost | danger
 * Sizes:       sm | md | lg
 * Options:     pill (default true), loading, disabled, icon-only, with icon
 *
 * Tech stack:  Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
 */

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  pill?:      boolean;       // rounded-full (default: true)
  loading?:   boolean;       // shows spinner, disables interaction
  iconLeft?:  React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?:  boolean;       // square/circle shape, no text label needed
  fullWidth?: boolean;
  children?:  React.ReactNode;
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#C96235] text-white",
    "hover:bg-[#B55228]",
    "active:bg-[#8A3A1E] active:scale-[0.98]",
    "shadow-[0_4px_14px_rgba(201,98,53,0.30)]",
    "hover:shadow-[0_8px_28px_rgba(201,98,53,0.35)]",
    "disabled:bg-[#C4A98A] disabled:shadow-none disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
  ].join(" "),

  secondary: [
    "bg-transparent text-[#1C0F07]",
    "border-[1.5px] border-[#1C0F07]",
    "hover:bg-[#1C0F07] hover:text-[#F8F1E6]",
    "active:scale-[0.98]",
    "disabled:border-[#C4A98A] disabled:text-[#C4A98A] disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C0F07]",
  ].join(" "),

  ghost: [
    "bg-transparent text-[#C96235]",
    "hover:bg-[#F5E3D9]",
    "active:bg-[#EAD9C1] active:scale-[0.98]",
    "disabled:text-[#C4A98A] disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
  ].join(" "),

  danger: [
    "bg-[#C03A2A] text-white",
    "hover:bg-[#A5301F]",
    "active:bg-[#8A2518] active:scale-[0.98]",
    "disabled:bg-[#E5A09A] disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C03A2A]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, { base: string; iconOnly: string }> = {
  sm: {
    base:     "h-8 px-[0.875rem] text-sm gap-1.5",
    iconOnly: "h-8 w-8",
  },
  md: {
    base:     "h-11 px-5 text-base gap-2",
    iconOnly: "h-11 w-11",
  },
  lg: {
    base:     "h-[3.25rem] px-7 text-lg gap-2.5",
    iconOnly: "h-[3.25rem] w-[3.25rem]",
  },
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === "sm" ? 14 : size === "lg" ? 20 : 16;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  variant   = "primary",
  size      = "md",
  pill      = true,
  loading   = false,
  iconLeft,
  iconRight,
  iconOnly  = false,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles = [
    // Layout
    "inline-flex items-center justify-center",
    "font-['DM_Sans',sans-serif] font-semibold",
    "leading-none whitespace-nowrap",
    "select-none",
    // Radius
    pill ? "rounded-full" : "rounded-lg",
    // Width
    fullWidth ? "w-full" : "",
    // Size
    iconOnly ? sizeStyles[size].iconOnly : sizeStyles[size].base,
    // Variant
    variantStyles[variant],
    // Transition
    "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
    // User overrides
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      className={baseStyles}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Spinner size={size} />
      ) : iconLeft ? (
        <span className="flex-shrink-0" aria-hidden="true">{iconLeft}</span>
      ) : null}

      {!iconOnly && children && (
        <span>{children}</span>
      )}

      {!loading && iconRight && (
        <span className="flex-shrink-0" aria-hidden="true">{iconRight}</span>
      )}
    </button>
  );
}

// ─── Spec: All variants & states (visual documentation) ──────────────────────
//
// PRIMARY  ┄ default brand CTA
//   • bg: #C96235 (terracotta)
//   • text: white
//   • shadow: warm glow (rgba(201,98,53,0.30))
//   • hover: bg → #B55228, shadow → rgba(201,98,53,0.35)
//   • active: bg → #8A3A1E, scale → 0.98
//   • disabled: bg → #C4A98A (dust), no shadow
//
// SECONDARY  ┄ outlined dark
//   • bg: transparent
//   • border: 1.5px solid #1C0F07 (espresso)
//   • text: #1C0F07
//   • hover: bg → #1C0F07, text → #F8F1E6
//   • disabled: border → #C4A98A, text → #C4A98A
//
// GHOST  ┄ subtle inline action
//   • bg: transparent
//   • text: #C96235 (terracotta)
//   • hover: bg → #F5E3D9 (terracotta-light)
//   • active: bg → #EAD9C1 (linen)
//
// DANGER  ┄ destructive action
//   • bg: #C03A2A (error red)
//   • text: white
//   • hover: bg → #A5301F
//
// SIZES
//   sm: h-8  (32px) · px-3.5 · text-sm (14px)
//   md: h-11 (44px) · px-5   · text-base (16px)  ← default
//   lg: h-13 (52px) · px-7   · text-lg (18px)
//
// SHAPE
//   pill=true (default): rounded-full
//   pill=false:          rounded-lg
//
// ICON PLACEMENT
//   iconLeft  → rendered before children text
//   iconRight → rendered after children text
//   iconOnly  → square/circle shape, no padding for text
//
// LOADING STATE
//   • Spinner replaces left icon (or stands alone)
//   • aria-busy="true" on <button>
//   • pointer-events implicitly blocked by disabled
//
// ─── Usage examples ──────────────────────────────────────────────────────────
//
// <Button>Get Promo</Button>
//
// <Button variant="secondary" size="lg">
//   Browse Menu
// </Button>
//
// <Button variant="ghost" size="sm">
//   View Details
// </Button>
//
// <Button loading>
//   Adding to cart...
// </Button>
//
// <Button iconLeft={<CoffeeIcon size={16} />} variant="primary">
//   Order Now
// </Button>
//
// <Button iconOnly variant="secondary" size="sm" aria-label="Search">
//   <SearchIcon size={16} />
// </Button>
