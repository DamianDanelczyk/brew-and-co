import sharp from "sharp";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import { get } from "https";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/images");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// All unique Pexels image IDs used in the app, with their intended max-width
const IMAGES = [
  // Hero / full-width images → 1920px wide
  { id: 1307698, width: 1920, label: "home-hero" },
  { id: 1995842, width: 1920, label: "about-hero" },
  // Founders photo (half-width section) → 1200px
  { id: 3184423, width: 1200, label: "about-founders" },
  // Menu card images → 800px
  { id: 302899,   width: 800, label: "espresso" },
  { id: 312418,   width: 800, label: "vanilla-oat-latte" },
  { id: 373639,   width: 800, label: "flat-white" },
  { id: 2396220,  width: 800, label: "pour-over" },
  { id: 3879495,  width: 800, label: "honey-lavender-latte" },
  { id: 26626461, width: 800, label: "cortado" },
  { id: 28730007, width: 800, label: "matcha-latte" },
  { id: 2775860,  width: 800, label: "cold-brew" },
  { id: 11136849, width: 800, label: "iced-vanilla-latte" },
  { id: 2615323,  width: 800, label: "sparkling-brew" },
  { id: 6249729,  width: 800, label: "iced-matcha-tonic" },
  { id: 4350051,  width: 800, label: "horchata-cold-brew" },
  { id: 8042740,  width: 800, label: "still-lemonade" },
  { id: 3892469,  width: 800, label: "almond-croissant" },
  { id: 267308,   width: 800, label: "cardamom-bun" },
  { id: 3951310,  width: 800, label: "kouign-amann" },
  { id: 5419308,  width: 800, label: "banana-walnut-loaf" },
  { id: 461431,   width: 800, label: "seasonal-tart" },
  { id: 1351238,  width: 800, label: "smashed-avo-toast" },
  { id: 1600711,  width: 800, label: "cheddar-chutney" },
  { id: 1552635,  width: 800, label: "roasted-veg-flatbread" },
  { id: 6660067,  width: 800, label: "prosciutto-fig" },
  // Popular items on home page (circular thumbnails, also in menu) → 400px
  { id: 2135,     width: 400, label: "almond-croissant-thumb" },
  { id: 4109743,  width: 400, label: "cold-brew-thumb" },
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function processImage({ id, width, label }) {
  const outFile = join(OUTPUT_DIR, `pexels-${id}.webp`);

  if (existsSync(outFile)) {
    console.log(`  ✓ pexels-${id}.webp already exists, skipping`);
    return;
  }

  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width * 2}`;
  console.log(`  ↓ Downloading ${label} (${id})…`);

  try {
    const buf = await downloadBuffer(url);
    await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outFile);
    const kb = Math.round((await import("fs")).statSync(outFile).size / 1024);
    console.log(`  ✓ pexels-${id}.webp  (${kb} KB)`);
  } catch (err) {
    console.error(`  ✗ Failed ${id}: ${err.message}`);
  }
}

console.log(`Processing ${IMAGES.length} images…\n`);
for (const img of IMAGES) {
  await processImage(img);
}
console.log("\nDone.");
