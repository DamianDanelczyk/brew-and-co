/**
 * Brew & Co — Navigation Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Spec + Reference Implementation
 *
 * Features:
 *   - Logo (wordmark in display font)
 *   - Desktop nav links with hover underline
 *   - Search input (pill shape)
 *   - Cart icon with item count badge
 *   - Sticky with blur backdrop
 *   - Mobile: hamburger menu
 *
 * Tech stack:  Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href:  string;
  active?: boolean;
}

interface NavProps {
  links?:     NavLink[];
  cartCount?: number;
  logo?:      React.ReactNode;  // custom logo; defaults to wordmark
  onSearch?:  (query: string) => void;
  sticky?:    boolean;          // sticky + blur (default: true)
  className?: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3v18M18 3v18M3 12h18M3 6h18M3 18h18" />
      <path d="M8 3c0 2.5 2 3 2 5M12 3c0 2.5 2 3 2 5M16 3c0 2.5 2 3 2 5" />
    </svg>
  );
}

// ─── Default nav links ────────────────────────────────────────────────────────

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home",   href: "/"        },
  { label: "Menu",   href: "/menu"    },
  { label: "Shop",   href: "/shop"    },
  { label: "About",  href: "/about"   },
  { label: "Blog",   href: "/blog"    },
];

// ─── Logo wordmark ────────────────────────────────────────────────────────────

function Wordmark() {
  return (
    <Link
      href="/"
      className={[
        "inline-flex items-center gap-2",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C96235] focus-visible:rounded-sm",
      ].join(" ")}
    >
      {/* Cup icon */}
      <span
        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C96235] text-white flex-shrink-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10 2a1 1 0 011 1v.5h3a1 1 0 011 1v3a3 3 0 01-2.83 2.995A5.002 5.002 0 0110 14.9V16h2a1 1 0 110 2H8a1 1 0 110-2h2v-1.1A5.002 5.002 0 015.83 10.495 3 3 0 013 7.5v-3a1 1 0 011-1h3V3a1 1 0 011-1zm-5 5.5v1.5a3 3 0 002.83 2.995A5.002 5.002 0 015 7.5zm8.17 4.495A3 3 0 0016 9V7.5a5.002 5.002 0 01-2.83 4.495z" />
        </svg>
      </span>
      {/* Text */}
      <span
        className={[
          "text-xl font-bold text-[#1C0F07]",
          "font-['Playfair_Display',Georgia,serif]",
          "tracking-tight",
        ].join(" ")}
      >
        Brew & Co<span className="text-[#C96235]">.</span>
      </span>
    </Link>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Nav({
  links      = DEFAULT_LINKS,
  cartCount  = 0,
  logo,
  onSearch,
  sticky     = true,
  className  = "",
}: NavProps) {
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);

  // Detect scroll for shadow elevation
  useEffect(() => {
    if (!sticky) return;
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [sticky]);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(searchValue);
  }

  return (
    <>
      <header
        className={[
          "w-full z-[200]",
          sticky ? "sticky top-0" : "relative",
          "bg-[#F8F1E6]/90 backdrop-blur-sm",
          scrolled
            ? "shadow-[0_1px_12px_rgba(28,15,7,0.08)]"
            : "border-b border-[#EDD9C0]",
          "transition-shadow duration-200",
          className,
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            {logo ?? <Wordmark />}

            {/* Desktop nav links */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative px-3 py-1.5 rounded-lg",
                    "text-[0.9375rem] font-medium",
                    "font-['DM_Sans',sans-serif]",
                    "transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
                    link.active
                      ? "text-[#C96235]"
                      : "text-[#3D1F10] hover:text-[#C96235] hover:bg-[#F5E3D9]",
                    // Animated underline
                    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px]",
                    "after:bg-[#C96235] after:rounded-full",
                    "after:scale-x-0 hover:after:scale-x-100",
                    link.active ? "after:scale-x-100" : "",
                    "after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "after:origin-left",
                  ].join(" ")}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right: search + cart */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search */}
              <form onSubmit={handleSearch} role="search" className="relative flex items-center">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9E6B52]"
                  aria-hidden="true"
                >
                  <SearchIcon className="w-4 h-4" />
                </span>
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  aria-label="Search menu"
                  className={[
                    "h-9 w-[180px] pl-9 pr-4 rounded-full",
                    "text-sm font-['DM_Sans',sans-serif] text-[#1C0F07] placeholder:text-[#C4A98A]",
                    "bg-white border border-[#E2CBAD]",
                    "outline-none",
                    "transition-[width,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "focus:w-[240px] focus:border-[#C96235] focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)]",
                    "appearance-none [&::-webkit-search-cancel-button]:hidden",
                  ].join(" ")}
                />
              </form>

              {/* Cart */}
              <button
                className={[
                  "relative flex items-center justify-center",
                  "w-10 h-10 rounded-full",
                  "text-[#3D1F10] hover:text-[#C96235]",
                  "hover:bg-[#F5E3D9]",
                  "transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "active:scale-95",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
                ].join(" ")}
                aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              >
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className={[
                      "absolute -top-0.5 -right-0.5",
                      "flex items-center justify-center",
                      "w-4 h-4 rounded-full",
                      "text-[0.6rem] font-bold text-white",
                      "bg-[#C96235]",
                      "font-['DM_Sans',sans-serif]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#3D1F10] hover:bg-[#F5E3D9] transition-colors duration-150"
                aria-label={`Cart, ${cartCount} items`}
              >
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[0.6rem] font-bold text-white bg-[#C96235]"
                    aria-hidden="true"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-[#3D1F10] hover:bg-[#F5E3D9] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C96235]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={[
            "md:hidden overflow-hidden",
            "transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 border-t border-[#EDD9C0]">
            {/* Mobile search */}
            <form onSubmit={handleSearch} role="search" className="relative flex items-center py-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9E6B52]">
                <SearchIcon className="w-4 h-4" />
              </span>
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search menu..."
                aria-label="Search menu"
                className="h-10 w-full pl-9 pr-4 rounded-full text-sm font-['DM_Sans',sans-serif] text-[#1C0F07] placeholder:text-[#C4A98A] bg-white border border-[#E2CBAD] outline-none focus:border-[#C96235] focus:shadow-[0_0_0_3px_rgba(201,98,53,0.15)] appearance-none [&::-webkit-search-cancel-button]:hidden"
              />
            </form>

            {/* Mobile nav links */}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "flex items-center px-3 py-2.5 rounded-xl",
                  "text-base font-medium font-['DM_Sans',sans-serif]",
                  "transition-colors duration-150",
                  link.active
                    ? "bg-[#F5E3D9] text-[#C96235]"
                    : "text-[#3D1F10] hover:bg-[#F5E3D9] hover:text-[#C96235]",
                ].join(" ")}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

// ─── Spec ─────────────────────────────────────────────────────────────────────
//
// DESKTOP LAYOUT (≥768px)
//   [Logo]    [Nav Links]    [Search] [Cart]
//   h-16 (64px), max-w-7xl, centered, px-6–8
//
// MOBILE LAYOUT (<768px)
//   [Logo]    [Cart] [Hamburger]
//   Full-width dropdown menu panel below header
//
// LOGO / WORDMARK
//   Cup icon in terracotta circle + "Brew & Co." in Playfair Display
//   Dot at end styled in terracotta for brand accent
//
// NAV LINKS
//   Font: DM Sans, 15px, font-medium
//   Hover: text → terracotta + terracotta-light bg
//   Active: text-terracotta + underline
//   Animated underline: scaleX(0→1) from left origin on hover
//
// SEARCH INPUT
//   Pill shape, h-9, w-180 → expands to w-240 on focus
//   Width transition creates satisfying expand on focus
//   Right side: clear button when value present
//
// CART BUTTON
//   Icon-only pill button
//   Counter badge: absolute top-right, terracotta circle, white text
//   Badge capped at "9+" display
//
// STICKY BEHAVIOR
//   bg-cream/90 + backdrop-blur-sm
//   border-b at rest → box-shadow on scroll
//   Transition: shadow fades in at 8px scroll depth
//
// MOBILE MENU
//   Slides in with max-height + opacity transition
//   Contains search input + nav links as full-width rows
//   Closes on link click or window resize to desktop
//
// ─── Usage examples ──────────────────────────────────────────────────────────
//
// <Nav />   ← Fully functional with defaults
//
// <Nav
//   links={[
//     { label: "Home",  href: "/",     active: true },
//     { label: "Menu",  href: "/menu"               },
//     { label: "About", href: "/about"              },
//   ]}
//   cartCount={3}
//   onSearch={(q) => router.push(`/search?q=${q}`)}
// />
