"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C0F07", color: "#F8F1E6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Wordmark + Hours */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
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
                style={{ fontFamily: "var(--font-display)", color: "#F8F1E6" }}
              >
                Brew & Co<span style={{ color: "#C96235" }}>.</span>
              </span>
            </Link>
            <p className="text-sm mb-4" style={{ color: "#C4A98A" }}>
              Specialty coffee rooted in community.
            </p>
            <div className="space-y-1 text-sm" style={{ color: "#9E6B52" }}>
              <p className="font-semibold mb-2" style={{ color: "#F8F1E6" }}>
                Opening Hours
              </p>
              <p>Mon – Fri: 7:00 AM – 7:00 PM</p>
              <p>Saturday: 8:00 AM – 8:00 PM</p>
              <p>Sunday: 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          {/* Column 2: Nav links */}
          <div>
            <p className="font-semibold mb-6 text-sm tracking-widest uppercase" style={{ color: "#9E6B52" }}>
              Explore
            </p>
            <nav className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Menu", href: "/menu" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm transition-colors duration-150"
                  style={{ color: "#C4A98A" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F1E6")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#C4A98A")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Address */}
          <div>
            <p className="font-semibold mb-6 text-sm tracking-widest uppercase" style={{ color: "#9E6B52" }}>
              Find Us
            </p>
            <address className="not-italic space-y-1 text-sm" style={{ color: "#C4A98A" }}>
              <p>12 Redchurch Street</p>
              <p>Shoreditch</p>
              <p>London, E2 7DD</p>
              <p className="mt-4">
                <a
                  href="mailto:hello@brewandco.coffee"
                  className="transition-colors duration-150"
                  style={{ color: "#C4A98A" }}
                >
                  hello@brewandco.coffee
                </a>
              </p>
              <p>
                <a
                  href="tel:+442071234567"
                  className="transition-colors duration-150"
                  style={{ color: "#C4A98A" }}
                >
                  +44 207 123 4567
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 text-center text-sm"
          style={{ borderTop: "1px solid #3D1F10", color: "#6B4433" }}
        >
          © 2026 Brew & Co. Made with love in London.
        </div>
      </div>
    </footer>
  );
}
