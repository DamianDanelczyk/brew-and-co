"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReservationModal from "./ReservationModal";

interface NavProps {
  activePath: string;
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

function Wordmark() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C96235] focus-visible:rounded-sm">
      <span
        className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
        style={{ backgroundColor: "#C96235" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
          <path d="M10 2a1 1 0 011 1v.5h3a1 1 0 011 1v3a3 3 0 01-2.83 2.995A5.002 5.002 0 0110 14.9V16h2a1 1 0 110 2H8a1 1 0 110-2h2v-1.1A5.002 5.002 0 015.83 10.495 3 3 0 013 7.5v-3a1 1 0 011-1h3V3a1 1 0 011-1zm-5 5.5v1.5a3 3 0 002.83 2.995A5.002 5.002 0 015 7.5zm8.17 4.495A3 3 0 0016 9V7.5a5.002 5.002 0 01-2.83 4.495z" />
        </svg>
      </span>
      <span
        className="text-xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
      >
        Brew & Co<span style={{ color: "#C96235" }}>.</span>
      </span>
    </Link>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
];

export default function Nav({ activePath }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <header
        className={[
          "w-full sticky top-0 z-[200]",
          "bg-[#F8F1E6]/90 backdrop-blur-sm",
          scrolled
            ? "shadow-[0_1px_12px_rgba(28,15,7,0.08)]"
            : "border-b border-[#EDD9C0]",
          "transition-shadow duration-200",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Wordmark />

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "relative px-3 py-1.5 rounded-lg",
                      "text-[0.9375rem] font-medium",
                      "transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]",
                      isActive
                        ? "text-[#C96235]"
                        : "text-[#3D1F10] hover:text-[#C96235] hover:bg-[#F5E3D9]",
                      "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px]",
                      "after:bg-[#C96235] after:rounded-full",
                      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      "after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "after:origin-left",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right: Reserve CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96235]"
                style={{ backgroundColor: "#C96235" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B55228")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C96235")}
              >
                Reserve a Table
              </button>
            </div>

            {/* Mobile: hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-full text-[#3D1F10] hover:bg-[#F5E3D9] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C96235]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
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
            {NAV_LINKS.map((link) => {
              const isActive = activePath === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "flex items-center px-3 py-2.5 rounded-xl",
                    "text-base font-medium transition-colors duration-150",
                    isActive
                      ? "bg-[#F5E3D9] text-[#C96235]"
                      : "text-[#3D1F10] hover:bg-[#F5E3D9] hover:text-[#C96235]",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Mobile Reserve CTA */}
            <div className="pt-2">
              <button
                onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                className="w-full px-5 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "#C96235" }}
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </header>

      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
