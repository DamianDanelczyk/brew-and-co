/**
 * Brew & Co — Input Components
 * ─────────────────────────────────────────────────────────────────────────────
 * Spec + Reference Implementation
 *
 * Components:  Input | SearchInput | Textarea | Select
 * Variants:    outlined (default) | filled
 * Sizes:       sm | md | lg
 *
 * Tech stack:  Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
 */

"use client";

import React, { forwardRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type InputVariant = "outlined" | "filled";
type InputSize    = "sm" | "md" | "lg";

interface BaseInputProps {
  variant?:    InputVariant;
  size?:       InputSize;
  label?:      string;
  hint?:       string;
  error?:      string;
  success?:    boolean;
  iconLeft?:   React.ReactNode;
  iconRight?:  React.ReactNode;
  className?:  string;
  wrapperClassName?: string;
}

// ─── Size styles ──────────────────────────────────────────────────────────────

const sizeStyles: Record<InputSize, { input: string; icon: string; label: string }> = {
  sm: {
    input: "h-9 px-3 text-sm",
    icon:  "w-4 h-4",
    label: "text-xs mb-1",
  },
  md: {
    input: "h-11 px-4 text-base",
    icon:  "w-5 h-5",
    label: "text-sm mb-1.5",
  },
  lg: {
    input: "h-[3.25rem] px-5 text-lg",
    icon:  "w-5 h-5",
    label: "text-base mb-2",
  },
};

// ─── Base input styles ────────────────────────────────────────────────────────

function buildInputClass(
  variant: InputVariant,
  size: InputSize,
  hasError: boolean,
  hasIconLeft: boolean,
  hasIconRight: boolean,
  extraClass: string = "",
): string {
  const base = [
    "w-full rounded-xl",
    "font-['DM_Sans',sans-serif]",
    "text-[#1C0F07] placeholder:text-[#C4A98A]",
    "outline-none",
    "transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
    sizeStyles[size].input,
    hasIconLeft  ? (size === "sm" ? "pl-8" : size === "lg" ? "pl-12" : "pl-10") : "",
    hasIconRight ? (size === "sm" ? "pr-8" : size === "lg" ? "pr-12" : "pr-10") : "",
  ];

  if (variant === "outlined") {
    base.push(
      "bg-white",
      hasError
        ? "border-[1.5px] border-[#C03A2A] focus:border-[#C03A2A] focus:shadow-[0_0_0_3px_rgba(192,58,42,0.15)]"
        : "border-[1.5px] border-[#E2CBAD] hover:border-[#9E6B52] focus:border-[#C96235] focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]"
    );
  } else {
    base.push(
      "bg-[#F2E6D0]",
      "border-[1.5px] border-transparent",
      hasError
        ? "border-[#C03A2A] focus:border-[#C03A2A] focus:shadow-[0_0_0_3px_rgba(192,58,42,0.15)]"
        : "focus:border-[#C96235] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]"
    );
  }

  if (extraClass) base.push(extraClass);
  return base.filter(Boolean).join(" ");
}

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant  = "outlined",
    size     = "md",
    label,
    hint,
    error,
    success  = false,
    iconLeft,
    iconRight,
    className = "",
    wrapperClassName = "",
    id,
    ...props
  },
  ref
) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const iconPad = size === "sm" ? "left-2.5" : size === "lg" ? "left-4" : "left-3";
  const iconRightPad = size === "sm" ? "right-2.5" : size === "lg" ? "right-4" : "right-3";

  return (
    <div className={["flex flex-col", wrapperClassName].join(" ")}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={[
            "font-['DM_Sans',sans-serif] font-medium text-[#3D1F10]",
            sizeStyles[size].label,
          ].join(" ")}
        >
          {label}
          {props.required && (
            <span className="ml-1 text-[#C96235]" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {iconLeft && (
          <span
            className={[
              "absolute top-1/2 -translate-y-1/2 pointer-events-none",
              "text-[#9E6B52]",
              iconPad,
              sizeStyles[size].icon,
            ].join(" ")}
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className={buildInputClass(variant, size, !!error, !!iconLeft, !!iconRight, className)}
          aria-invalid={!!error}
          aria-describedby={
            error    ? `${inputId}-error`
            : hint   ? `${inputId}-hint`
            : undefined
          }
          {...props}
        />

        {(iconRight || success) && (
          <span
            className={[
              "absolute top-1/2 -translate-y-1/2 pointer-events-none",
              success ? "text-[#4A7C45]" : "text-[#9E6B52]",
              iconRightPad,
              sizeStyles[size].icon,
            ].join(" ")}
            aria-hidden="true"
          >
            {success ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            ) : iconRight}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-[#C03A2A] font-['DM_Sans',sans-serif]"
        >
          {error}
        </p>
      )}

      {/* Hint text */}
      {!error && hint && (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 text-xs text-[#9E6B52] font-['DM_Sans',sans-serif]"
        >
          {hint}
        </p>
      )}
    </div>
  );
});

// ─── SearchInput ──────────────────────────────────────────────────────────────

interface SearchInputProps extends Omit<InputProps, "iconLeft" | "type"> {
  onClear?: () => void;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onClear, value, variant = "outlined", size = "md", className = "", ...props },
  ref
) {
  return (
    <div className="relative flex items-center">
      {/* Search icon */}
      <span
        className={[
          "absolute top-1/2 -translate-y-1/2 pointer-events-none",
          "text-[#9E6B52]",
          size === "sm" ? "left-2.5" : size === "lg" ? "left-4" : "left-3",
          size === "sm" ? "w-4 h-4" : "w-5 h-5",
        ].join(" ")}
        aria-hidden="true"
      >
        <SearchIcon className="w-full h-full" />
      </span>

      <input
        ref={ref}
        type="search"
        value={value}
        className={[
          buildInputClass(variant, size, false, true, !!value, ""),
          "appearance-none [&::-webkit-search-cancel-button]:hidden",
          // Pill shape for search
          "!rounded-full",
          className,
        ].join(" ")}
        {...props}
      />

      {/* Clear button */}
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className={[
            "absolute top-1/2 -translate-y-1/2",
            size === "sm" ? "right-2.5" : size === "lg" ? "right-4" : "right-3",
            "text-[#9E6B52] hover:text-[#1C0F07]",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-[#C96235]",
          ].join(" ")}
          aria-label="Clear search"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"}>
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
});

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends BaseInputProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  rows?: number;
  resize?: "none" | "vertical" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    variant  = "outlined",
    size     = "md",
    label,
    hint,
    error,
    rows     = 4,
    resize   = "vertical",
    className = "",
    wrapperClassName = "",
    id,
    ...props
  },
  ref
) {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const resizeMap = { none: "resize-none", vertical: "resize-y", both: "resize" };

  const textareaClass = [
    "w-full rounded-xl py-3",
    "font-['DM_Sans',sans-serif] text-base",
    "text-[#1C0F07] placeholder:text-[#C4A98A]",
    "outline-none leading-relaxed",
    "transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
    size === "sm" ? "px-3 text-sm" : size === "lg" ? "px-5 text-lg" : "px-4",
    resizeMap[resize],
    variant === "outlined"
      ? (error
          ? "bg-white border-[1.5px] border-[#C03A2A] focus:shadow-[0_0_0_3px_rgba(192,58,42,0.15)]"
          : "bg-white border-[1.5px] border-[#E2CBAD] hover:border-[#9E6B52] focus:border-[#C96235] focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]")
      : (error
          ? "bg-[#F2E6D0] border-[1.5px] border-[#C03A2A]"
          : "bg-[#F2E6D0] border-[1.5px] border-transparent focus:border-[#C96235] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]"),
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={["flex flex-col", wrapperClassName].join(" ")}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[#3D1F10] font-['DM_Sans',sans-serif] mb-1.5"
        >
          {label}
          {props.required && <span className="ml-1 text-[#C96235]" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={textareaClass}
        aria-invalid={!!error}
        {...props}
      />

      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-[#C03A2A] font-['DM_Sans',sans-serif]">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="mt-1.5 text-xs text-[#9E6B52] font-['DM_Sans',sans-serif]">{hint}</p>
      )}
    </div>
  );
});

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectOption {
  value:    string;
  label:    string;
  disabled?: boolean;
}

interface SelectProps extends BaseInputProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options:      SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    variant  = "outlined",
    size     = "md",
    label,
    hint,
    error,
    options,
    placeholder,
    className = "",
    wrapperClassName = "",
    id,
    ...props
  },
  ref
) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const selectClass = [
    "w-full rounded-xl appearance-none cursor-pointer pr-10",
    "font-['DM_Sans',sans-serif] text-[#1C0F07]",
    "outline-none",
    "transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
    sizeStyles[size].input,
    variant === "outlined"
      ? (error
          ? "bg-white border-[1.5px] border-[#C03A2A]"
          : "bg-white border-[1.5px] border-[#E2CBAD] hover:border-[#9E6B52] focus:border-[#C96235] focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]")
      : (error
          ? "bg-[#F2E6D0] border-[1.5px] border-[#C03A2A]"
          : "bg-[#F2E6D0] border-[1.5px] border-transparent focus:border-[#C96235] focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]"),
    className,
  ].join(" ");

  return (
    <div className={["flex flex-col", wrapperClassName].join(" ")}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[#3D1F10] font-['DM_Sans',sans-serif] mb-1.5"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select ref={ref} id={selectId} className={selectClass} aria-invalid={!!error} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9E6B52]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-[#C03A2A] font-['DM_Sans',sans-serif]">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="mt-1.5 text-xs text-[#9E6B52] font-['DM_Sans',sans-serif]">{hint}</p>
      )}
    </div>
  );
});

// ─── Spec ─────────────────────────────────────────────────────────────────────
//
// INPUT ANATOMY
//   Optional label  →  Input field  →  Optional hint/error
//
// VARIANT: outlined (default)
//   bg: white
//   border: 1.5px, warm border color (#E2CBAD)
//   hover border: umber (#9E6B52)
//   focus border: terracotta (#C96235) + glow ring rgba(201,98,53,0.15)
//
// VARIANT: filled
//   bg: parchment (#F2E6D0) at rest
//   bg: white on focus
//   border: transparent → terracotta on focus
//
// STATES
//   default  → outlined border, warm bg
//   hover    → border darkens to umber
//   focus    → terracotta border + 3px terracotta glow
//   error    → error red (#C03A2A) border + error message below
//   success  → checkmark icon on right
//   disabled → opacity-50, cursor-not-allowed
//
// SEARCH INPUT
//   Uses pill shape (rounded-full) instead of rounded-xl
//   Left: search icon (always)
//   Right: clear ✕ button (only when value is non-empty)
//
// SIZES
//   sm: h-9  (36px)  · text-sm  · px-3
//   md: h-11 (44px)  · text-base · px-4  ← default
//   lg: h-13 (52px)  · text-lg  · px-5
//
// FOCUS RING (for keyboard navigation)
//   outline: 3px terracotta glow (box-shadow approach, no outline offset needed)
//
// ─── Usage examples ──────────────────────────────────────────────────────────
//
// <Input label="Your name" placeholder="John Doe" required />
//
// <Input label="Email" type="email" error="Please enter a valid email address" />
//
// <Input label="Promo code" variant="filled" success />
//
// <SearchInput placeholder="Search drinks, coffee..." />
//
// <Textarea label="Special instructions" rows={3} hint="Allergies, preferences, etc." />
//
// <Select
//   label="Size"
//   placeholder="Choose size"
//   options={[
//     { value: "sm", label: "Small (8oz)" },
//     { value: "md", label: "Medium (12oz)" },
//     { value: "lg", label: "Large (16oz)" },
//   ]}
// />
