import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const VALUES = [
  {
    title: "Community First",
    description:
      "Our shop exists because of the people in it. We host events, support local artists, and keep a table free for anyone who needs a quiet corner.",
    icon: "❤️",
  },
  {
    title: "Craft in Every Cup",
    description:
      "From grind size to water temperature, every variable is dialled in. Not because we're precious — because you deserve it.",
    icon: "☕",
  },
  {
    title: "Know Your Farmer",
    description:
      "We visit the farms we source from. We know the families. Their names are on our menu board, not just their country of origin.",
    icon: "🌱",
  },
  {
    title: "No Faff, Just Flavour",
    description:
      "We don't need seventeen ingredients to make something delicious. Good beans, good technique, good company — that's the whole thing.",
    icon: "✦",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav activePath="/about" />

      {/* Hero */}
      <section className="relative flex items-end" style={{ height: "60vh", minHeight: "400px" }}>
        <Image
          src="/images/pexels-1995842.webp"
          alt="People gathered at a coffee bar"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,15,7,0.15) 0%, rgba(28,15,7,0.55) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p
            className="text-sm font-semibold uppercase mb-2"
            style={{ color: "#F5E3D9", letterSpacing: "0.15em" }}
          >
            Our Story
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#F8F1E6" }}
          >
            About Brew & Co
          </h1>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-4" style={{ backgroundColor: "#F8F1E6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p
                className="text-sm font-semibold uppercase mb-4"
                style={{ color: "#C96235", letterSpacing: "0.15em" }}
              >
                The Founders
              </p>
              <h2
                className="text-4xl font-bold mb-8 leading-tight"
                style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
              >
                Two People.<br />One Argument About<br />Extraction Ratios.
              </h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "#3D1F10" }}>
                <p>
                  <strong>Clara Osei</strong> — Ghanaian-British, food science background — and{" "}
                  <strong>Nico Hartmann</strong> — German, ex-travelling barista — met in 2016 at a Bermondsey roastery.
                  They argued about extraction ratios. They became inseparable.
                </p>
                <p>
                  Three years of planning, pop-ups, and obsessive cupping sessions later, they signed a lease on a
                  Victorian railway arch on Redchurch Street in 2019.
                </p>
                <p>
                  It was Clara&apos;s idea to call it Brew & Co — &quot;plain enough to mean nothing, warm enough to mean
                  everything.&quot;
                </p>
                <p>
                  They still run the bar themselves most mornings. The beans are sourced directly from farms they&apos;ve
                  visited — families they know by name, not just by origin.
                </p>
              </div>
            </div>

            {/* Photo */}
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pexels-3184423.webp"
                alt="Clara and Nico behind the bar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4" style={{ backgroundColor: "#1C0F07" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase mb-4"
              style={{ color: "#C96235", letterSpacing: "0.15em" }}
            >
              What We Stand For
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "#F8F1E6" }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#3D1F10" }}
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "#F8F1E6" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#C4A98A" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote + CTA */}
      <section className="py-24 px-4 text-center" style={{ backgroundColor: "#F2E6D0" }}>
        <div className="max-w-2xl mx-auto">
          <blockquote
            className="text-3xl sm:text-4xl font-bold italic leading-snug mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
          >
            &ldquo;Plain enough to mean nothing.<br />
            Warm enough to mean everything.&rdquo;
          </blockquote>
          <p className="text-base mb-8" style={{ color: "#6B4433" }}>
            — Clara Osei, co-founder
          </p>
          <Link
            href="/menu"
            className="inline-block px-8 py-3 rounded-full font-semibold text-base text-white transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: "#C96235" }}
          >
            Come Say Hello
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
