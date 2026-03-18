"use client";

import { useState } from "react";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type Category =
  | "All"
  | "Espresso Drinks"
  | "Cold Drinks"
  | "Pastries"
  | "Sandwiches";

interface MenuItem {
  category: Exclude<Category, "All">;
  name: string;
  description: string;
  price: string;
  badge?: string;
  image: string;
  accent: string;
}

const PEXELS = (id: number) => `/images/pexels-${id}.webp`;

const MENU_ITEMS: MenuItem[] = [
  // Espresso Drinks
  {
    category: "Espresso Drinks",
    name: "Classic Espresso",
    description: "Double shot of our house blend. Bright, clean, and unapologetically direct.",
    price: "$3.50",
    image: PEXELS(302899),    // barista pouring espresso shot
    accent: "#C96235",
  },
  {
    category: "Espresso Drinks",
    name: "Vanilla Oat Latte",
    description: "Silky oat milk, house-made vanilla syrup, and a double ristretto. A crowd favourite.",
    price: "$5.50",
    badge: "Fan Favourite",
    image: PEXELS(312418),    // latte art in dark cup ✓
    accent: "#C96235",
  },
  {
    category: "Espresso Drinks",
    name: "Flat White",
    description: "Microfoam textured whole milk over a double ristretto. Strong, smooth, no fuss.",
    price: "$4.50",
    image: PEXELS(373639),    // barista holding flat white ✓
    accent: "#C96235",
  },
  {
    category: "Espresso Drinks",
    name: "Single Origin Pour Over",
    description: "Rotating single origin. Ask your barista what's on today — it's always worth it.",
    price: "$5.00",
    badge: "Seasonal",
    image: PEXELS(2396220),   // cappuccino/latte with leaf art on wooden table
    accent: "#C96235",
  },
  {
    category: "Espresso Drinks",
    name: "Honey Lavender Latte",
    description: "Lavender-infused honey, steamed oat milk, and a gentle espresso. Floral and calming.",
    price: "$5.75",
    badge: "Signature",
    image: PEXELS(3879495),   // specialty latte in yellow cup ✓
    accent: "#C96235",
  },
  {
    category: "Espresso Drinks",
    name: "Cortado",
    description: "Equal parts espresso and warm milk. Spanish simplicity. No art, just balance.",
    price: "$4.00",
    image: PEXELS(26626461),  // espresso in small glass with crema ✓
    accent: "#C96235",
  },
  {
    category: "Espresso Drinks",
    name: "Matcha Latte",
    description: "Ceremonial grade matcha whisked with steamed oat milk. Earthy, vibrant, energising.",
    price: "$5.25",
    image: PEXELS(28730007),  // matcha latte with leaf art in ceramic bowl ✓
    accent: "#7A8C3C",
  },

  // Cold Drinks
  {
    category: "Cold Drinks",
    name: "Cold Brew",
    description: "24-hour slow-steeped concentrate over ice. Smooth, low-acid, deeply satisfying.",
    price: "$4.50",
    badge: "Fan Favourite",
    image: PEXELS(2775860),   // dark iced coffee in crystal glass ✓
    accent: "#3D8B7A",
  },
  {
    category: "Cold Drinks",
    name: "Iced Vanilla Latte",
    description: "Cold milk, house vanilla syrup, and espresso poured over ice. Familiar done right.",
    price: "$5.00",
    image: PEXELS(11136849),  // iced latte in clear glass mug ✓
    accent: "#3D8B7A",
  },
  {
    category: "Cold Drinks",
    name: "Sparkling Brew",
    description: "Cold brew concentrate topped with sparkling water and a slice of orange. Unexpected and refreshing.",
    price: "$5.00",
    badge: "New",
    image: PEXELS(2615323),   // iced layered coffee with straw ✓
    accent: "#3D8B7A",
  },
  {
    category: "Cold Drinks",
    name: "Iced Matcha Tonic",
    description: "Matcha, lemon tonic, and oat milk. Bright, effervescent, a little bit wild.",
    price: "$5.50",
    image: PEXELS(6249729),   // iced matcha green in ceramic cup ✓
    accent: "#7A8C3C",
  },
  {
    category: "Cold Drinks",
    name: "Horchata Cold Brew",
    description: "Mexican-style cinnamon rice milk meets our 24-hour cold brew. Sweet, spiced, brilliant.",
    price: "$5.75",
    badge: "Signature",
    image: PEXELS(4350051),   // barista pouring milk — creamy coffee aesthetic
    accent: "#3D8B7A",
  },
  {
    category: "Cold Drinks",
    name: "Still Lemonade",
    description: "House-pressed lemon juice, cane sugar, and a hint of rosemary. No shortcuts.",
    price: "$3.50",
    image: PEXELS(8042740),   // three glasses of lemonade with lemon slices ✓
    accent: "#C9851F",
  },

  // Pastries
  {
    category: "Pastries",
    name: "Almond Croissant",
    description: "Twice-baked with almond frangipane and toasted flaked almonds. Worth every crumb.",
    price: "$4.50",
    badge: "Fan Favourite",
    image: PEXELS(3892469),   // golden croissant on wooden board ✓
    accent: "#C9851F",
  },
  {
    category: "Pastries",
    name: "Cardamom Bun",
    description: "Swedish-inspired, lightly glazed with pearl sugar. Warming spice, soft dough.",
    price: "$4.00",
    badge: "Signature",
    image: PEXELS(267308),    // spiral cinnamon/cardamom buns ✓
    accent: "#C9851F",
  },
  {
    category: "Pastries",
    name: "Kouign-Amann",
    description: "Caramelised, laminated, utterly indulgent. A Breton classic we do very well.",
    price: "$4.50",
    image: PEXELS(3951310),   // glazed cinnamon rolls in baking dish ✓
    accent: "#C9851F",
  },
  {
    category: "Pastries",
    name: "Banana Walnut Loaf",
    description: "Dense, moist, loaded with walnuts and dark chocolate chips. A proper slice.",
    price: "$3.50",
    image: PEXELS(5419308),   // sliced banana bread with walnut interior ✓
    accent: "#C9851F",
  },
  {
    category: "Pastries",
    name: "Seasonal Tart",
    description: "Ask your barista what fruit is in season. Changes weekly with the best British produce.",
    price: "$5.00",
    badge: "Seasonal",
    image: PEXELS(461431),    // strawberry & blueberry tart on plate ✓
    accent: "#C9851F",
  },

  // Sandwiches
  {
    category: "Sandwiches",
    name: "Smashed Avo Toast",
    description: "Sourdough, avocado, pickled red onion, chilli flakes, and a poached egg on request.",
    price: "$9.50",
    image: PEXELS(1351238),   // smashed avocado on whole-grain toast with spinach ✓
    accent: "#7A8C3C",
  },
  {
    category: "Sandwiches",
    name: "Cheddar & Chutney",
    description: "Mature cheddar, caramelised onion chutney, rocket on malted bloomer. Simple and proud.",
    price: "$8.50",
    image: PEXELS(1600711),   // club sandwich with cheese layers on board ✓
    accent: "#7A8C3C",
  },
  {
    category: "Sandwiches",
    name: "Roasted Veg Flatbread",
    description: "Seasonal roasted veg, labneh, za'atar oil, and pomegranate on warm flatbread.",
    price: "$9.00",
    badge: "Vegan",
    image: PEXELS(1552635),   // flatbread with roasted mushrooms, peppers, veg ✓
    accent: "#7A8C3C",
  },
  {
    category: "Sandwiches",
    name: "Prosciutto & Fig",
    description: "Prosciutto, fresh fig, mascarpone, and rocket on sourdough. A classic pairing done simply.",
    price: "$10.50",
    badge: "Chef's Pick",
    image: PEXELS(6660067),   // charcuterie board with prosciutto crostini ✓
    accent: "#7A8C3C",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Espresso Drinks",
  "Cold Drinks",
  "Pastries",
  "Sandwiches",
];

const TAB_STYLES: Record<Category, { active: string; dot: string }> = {
  All: { active: "#1C0F07", dot: "#1C0F07" },
  "Espresso Drinks": { active: "#C96235", dot: "#C96235" },
  "Cold Drinks": { active: "#3D8B7A", dot: "#3D8B7A" },
  Pastries: { active: "#C9851F", dot: "#C9851F" },
  Sandwiches: { active: "#7A8C3C", dot: "#7A8C3C" },
};

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  "Fan Favourite": { bg: "#F5E3D9", color: "#C96235" },
  Signature: { bg: "#F7EDDA", color: "#C9851F" },
  Seasonal: { bg: "#E8EDD6", color: "#7A8C3C" },
  New: { bg: "#D6EDEA", color: "#3D8B7A" },
  Vegan: { bg: "#E8EDD6", color: "#7A8C3C" },
  "Chef's Pick": { bg: "#F5E4E2", color: "#C4756A" },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      <Nav activePath="/menu" />

      {/* Page header */}
      <div className="py-16 px-4 text-center" style={{ backgroundColor: "#1C0F07" }}>
        <p
          className="text-sm font-semibold uppercase mb-3"
          style={{ color: "#C96235", letterSpacing: "0.15em" }}
        >
          Shoreditch, London
        </p>
        <h1
          className="text-5xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "#F8F1E6" }}
        >
          Our Menu
        </h1>
        <p className="mt-4 text-base max-w-md mx-auto" style={{ color: "#9E6B52" }}>
          Seasonal ingredients, direct-trade beans, and a lot of love in every single thing.
        </p>
      </div>

      {/* Sticky category tabs */}
      <div
        className="sticky z-[100] border-b"
        style={{ top: "64px", backgroundColor: "#F8F1E6", borderColor: "#E2CBAD" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const style = TAB_STYLES[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? style.active : "transparent",
                    color: isActive ? "#F8F1E6" : "#3D1F10",
                    border: isActive ? "none" : "1px solid #E2CBAD",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <main className="py-12 px-4" style={{ backgroundColor: "#F8F1E6", minHeight: "60vh" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => {
              const badge = item.badge ? BADGE_COLORS[item.badge] : null;
              return (
                <div
                  key={item.name}
                  className="rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-lg"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDD9C0" }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    {/* Badge */}
                    {badge && item.badge && (
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: badge.bg, color: badge.color }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-semibold text-base leading-tight" style={{ color: "#1C0F07" }}>
                        {item.name}
                      </h3>
                      <span
                        className="flex-shrink-0 font-bold text-sm mt-0.5"
                        style={{ color: "#C9851F" }}
                      >
                        {item.price}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed overflow-hidden"
                      style={{
                        color: "#6B4433",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
