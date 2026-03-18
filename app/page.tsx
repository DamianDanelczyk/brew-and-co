"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ReservationModal from "./components/ReservationModal";

const POPULAR_ITEMS = [
  {
    name: "Vanilla Oat Latte",
    price: "$5.50",
    image: "/images/pexels-312418.webp",
    accent: "#C96235",
  },
  {
    name: "Honey Lavender Latte",
    price: "$5.75",
    image: "/images/pexels-3879495.webp",
    accent: "#C96235",
  },
  {
    name: "Almond Croissant",
    price: "$4.50",
    image: "/images/pexels-3892469.webp",
    accent: "#C9851F",
  },
  {
    name: "Cold Brew",
    price: "$4.50",
    image: "/images/pexels-4109743.webp",
    accent: "#3D8B7A",
  },
];

const EVENTS = [
  {
    title: "Open Mic Night",
    schedule: "Every Friday · 7:00 PM",
    description:
      "Grab a coffee and enjoy local artists, poets, and musicians in our cosy brick-arch space. All welcome.",
    accent: "#C96235",
    accentLight: "#F5E3D9",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
  {
    title: "Coffee Tasting",
    schedule: "Every Saturday · 10:00 AM",
    description:
      "Join our head barista Marcus for a guided tasting of single-origin beans from farms we personally visit.",
    accent: "#C9851F",
    accentLight: "#F7EDDA",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"
        />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Nav activePath="/" />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: "100svh", minHeight: "560px" }}
      >
        <Image
          src="/images/pexels-1307698.webp"
          alt="Cozy coffee shop interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,15,7,0.3) 0%, rgba(28,15,7,0.65) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p
            className="text-sm font-semibold uppercase mb-4"
            style={{ color: "#F5E3D9", letterSpacing: "0.15em" }}
          >
            Shoreditch, London
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", color: "#F8F1E6" }}
          >
            Where Every Cup
            <br />
            Tells a Story
          </h1>
          <p className="text-lg mb-10" style={{ color: "#EAD9C1" }}>
            Specialty coffee, seasonal pastries, and a community worth lingering in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "rgba(248,241,230,0.15)",
                color: "#F8F1E6",
                border: "1.5px solid rgba(248,241,230,0.5)",
              }}
            >
              View Menu
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 rounded-full font-semibold text-base text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#C96235" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#B55228")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#C96235")
              }
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </section>

      {/* Our Most Loved */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F1E6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase mb-3"
              style={{ color: "#C96235", letterSpacing: "0.15em" }}
            >
              Fan Favourites
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
            >
              Our Most Loved
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_ITEMS.map((item) => (
              <div key={item.name} className="group text-center">
                <div
                  className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 rounded-full overflow-hidden"
                  style={{ backgroundColor: item.accent + "22" }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 160px, 192px"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: "rgba(28,15,7,0.5)" }}
                  >
                    <button
                      className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: item.accent }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <h3
                  className="font-semibold text-base mb-1"
                  style={{ color: "#1C0F07" }}
                >
                  {item.name}
                </h3>
                <p className="font-bold text-base" style={{ color: "#C9851F" }}>
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F2E6D0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase mb-3"
              style={{ color: "#C96235", letterSpacing: "0.15em" }}
            >
              What&apos;s On
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
            >
              Events at Brew & Co
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.map((event) => (
              <div
                key={event.title}
                className="rounded-2xl p-8 transition-shadow duration-200 hover:shadow-lg"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDD9C0" }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full mb-5"
                  style={{
                    backgroundColor: event.accentLight,
                    color: event.accent,
                  }}
                >
                  {event.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#1C0F07",
                  }}
                >
                  {event.title}
                </h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: event.accent }}
                >
                  {event.schedule}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#6B4433" }}>
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
