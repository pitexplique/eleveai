/**
 * generate-english-audio.mjs
 *
 * Génère les fichiers audio MP3 pour le coach English Maths
 * via l'API TTS d'OpenAI (voice: nova — anglais britannique clair).
 *
 * Usage :
 *   node scripts/generate-english-audio.mjs
 *   node scripts/generate-english-audio.mjs --dry-run   (liste sans générer)
 *   node scripts/generate-english-audio.mjs --missing   (génère uniquement les manquants)
 *   node scripts/generate-english-audio.mjs --group geometry (génère un seul groupe)
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "audio", "english-maths");

// ─── Config ───────────────────────────────────────────────────────────────────

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VOICE = "nova";          // nova = anglais clair, légèrement féminin
const MODEL = "tts-1";         // tts-1 (rapide) ou tts-1-hd (meilleure qualité)
const DELAY_MS = 300;          // délai entre requêtes pour éviter le rate limit

// ─── Tous les audios à générer ─────────────────────────────────────────────────

const AUDIO_ENTRIES = [

  // ── GEOMETRY (manquant + nouveaux) ────────────────────────────────────────
  { file: "geometry/angle.mp3",                  text: "angle" },
  { file: "geometry/angle-sentence.mp3",          text: "This is an angle." },
  { file: "geometry/area.mp3",                    text: "area" },
  { file: "geometry/area-sentence.mp3",           text: "The area of a rectangle is length times width." },
  { file: "geometry/parallel.mp3",                text: "parallel" },
  { file: "geometry/parallel-sentence.mp3",       text: "Parallel lines never meet." },
  { file: "geometry/perpendicular.mp3",           text: "perpendicular" },
  { file: "geometry/perpendicular-sentence.mp3",  text: "Perpendicular lines form a right angle." },
  { file: "geometry/diagonal.mp3",                text: "diagonal" },
  { file: "geometry/diagonal-sentence.mp3",       text: "A diagonal connects two opposite vertices." },
  { file: "geometry/axis.mp3",                    text: "axis" },
  { file: "geometry/axis-sentence.mp3",           text: "The x-axis is horizontal." },
  { file: "geometry/coordinates.mp3",             text: "coordinates" },
  { file: "geometry/coordinates-sentence.mp3",    text: "The coordinates are two and three." },
  { file: "geometry/symmetry.mp3",                text: "symmetry" },
  { file: "geometry/symmetry-sentence.mp3",       text: "A circle has infinite lines of symmetry." },
  { file: "geometry/vector.mp3",                  text: "vector" },
  { file: "geometry/vector-sentence.mp3",         text: "A vector has a direction and a magnitude." },
  { file: "geometry/tangent.mp3",                 text: "tangent" },
  { file: "geometry/tangent-sentence.mp3",        text: "A tangent touches the circle at one point." },

  // ── NUMBERS ───────────────────────────────────────────────────────────────
  { file: "numbers/zero.mp3",                     text: "zero" },
  { file: "numbers/zero-sentence.mp3",            text: "Zero is nothing." },
  { file: "numbers/one.mp3",                      text: "one" },
  { file: "numbers/one-sentence.mp3",             text: "One plus one equals two." },
  { file: "numbers/two.mp3",                      text: "two" },
  { file: "numbers/two-sentence.mp3",             text: "Two is an even number." },
  { file: "numbers/three.mp3",                    text: "three" },
  { file: "numbers/three-sentence.mp3",           text: "A triangle has three sides." },
  { file: "numbers/four.mp3",                     text: "four" },
  { file: "numbers/four-sentence.mp3",            text: "A square has four sides." },
  { file: "numbers/five.mp3",                     text: "five" },
  { file: "numbers/five-sentence.mp3",            text: "Five is an odd number." },
  { file: "numbers/even.mp3",                     text: "even" },
  { file: "numbers/even-sentence.mp3",            text: "Two, four and six are even numbers." },
  { file: "numbers/odd.mp3",                      text: "odd" },
  { file: "numbers/odd-sentence.mp3",             text: "One, three and five are odd numbers." },
  { file: "numbers/fraction.mp3",                 text: "fraction" },
  { file: "numbers/fraction-sentence.mp3",        text: "One half is a fraction." },
  { file: "numbers/decimal.mp3",                  text: "decimal" },
  { file: "numbers/decimal-sentence.mp3",         text: "Zero point five is a decimal number." },
  { file: "numbers/negative.mp3",                 text: "negative" },
  { file: "numbers/negative-sentence.mp3",        text: "Negative numbers are less than zero." },
  { file: "numbers/integer.mp3",                  text: "integer" },
  { file: "numbers/integer-sentence.mp3",         text: "An integer is a whole number." },
  { file: "numbers/percentage.mp3",               text: "percentage" },
  { file: "numbers/percentage-sentence.mp3",      text: "Fifty percent means fifty out of one hundred." },
  { file: "numbers/ratio.mp3",                    text: "ratio" },
  { file: "numbers/ratio-sentence.mp3",           text: "The ratio is three to one." },
  { file: "numbers/proportion.mp3",               text: "proportion" },
  { file: "numbers/proportion-sentence.mp3",      text: "A proportion compares two ratios." },
  { file: "numbers/square-root.mp3",              text: "square root" },
  { file: "numbers/square-root-sentence.mp3",     text: "The square root of nine is three." },
  { file: "numbers/prime.mp3",                    text: "prime" },
  { file: "numbers/prime-sentence.mp3",           text: "Seven is a prime number." },
  { file: "numbers/coefficient.mp3",              text: "coefficient" },
  { file: "numbers/coefficient-sentence.mp3",     text: "The coefficient of x is three." },
  { file: "numbers/variable.mp3",                 text: "variable" },
  { file: "numbers/variable-sentence.mp3",        text: "x is a variable." },
  { file: "numbers/equation.mp3",                 text: "equation" },
  { file: "numbers/equation-sentence.mp3",        text: "Solve the equation for x." },
  { file: "numbers/inequality.mp3",               text: "inequality" },
  { file: "numbers/inequality-sentence.mp3",      text: "An inequality uses the less than or greater than sign." },
  { file: "numbers/function.mp3",                 text: "function" },
  { file: "numbers/function-sentence.mp3",        text: "f of x is a function of x." },

  // ── VERBS B1 (nouveaux) ───────────────────────────────────────────────────
  { file: "verbs/b1/identify.mp3",                text: "identify" },
  { file: "verbs/b1/identify-sentence.mp3",       text: "Identify the type of triangle." },

  // ── VERBS B2 (nouveaux) ───────────────────────────────────────────────────
  { file: "verbs/b2/deduce.mp3",                  text: "deduce" },
  { file: "verbs/b2/deduce-sentence.mp3",         text: "Deduce the value of x." },
  { file: "verbs/b2/factorise.mp3",               text: "factorise" },
  { file: "verbs/b2/factorise-sentence.mp3",      text: "Factorise the expression." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generateAudio(text, outputPath) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      voice: VOICE,
      input: text,
      response_format: "mp3",
    });

    const options = {
      hostname: "api.openai.com",
      path: "/v1/audio/speech",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errorData = "";
        res.on("data", (chunk) => (errorData += chunk));
        res.on("end", () => reject(new Error(`HTTP ${res.statusCode}: ${errorData}`)));
        return;
      }

      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buffer);
        resolve();
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const onlyMissing = args.includes("--missing");
  const groupArg = args.find((a) => a.startsWith("--group="))?.split("=")[1];

  if (!isDryRun && !OPENAI_API_KEY) {
    console.error("❌  Variable OPENAI_API_KEY manquante dans .env.local");
    console.error("    Ajoutez : OPENAI_API_KEY=sk-...");
    process.exit(1);
  }

  let entries = AUDIO_ENTRIES;

  if (groupArg) {
    entries = entries.filter((e) => e.file.startsWith(groupArg));
    console.log(`\n🔍  Groupe "${groupArg}" : ${entries.length} fichiers\n`);
  }

  if (onlyMissing) {
    entries = entries.filter((e) => !fileExists(path.join(OUTPUT_DIR, e.file)));
    console.log(`\n🔍  Fichiers manquants uniquement : ${entries.length}\n`);
  }

  const total = entries.length;
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  console.log(`\n🎙️  OpenAI TTS — voice: ${VOICE} — model: ${MODEL}`);
  console.log(`📁  Destination : public/audio/english-maths/`);
  console.log(`📋  ${total} fichiers à traiter\n`);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const outputPath = path.join(OUTPUT_DIR, entry.file);
    const label = `[${String(i + 1).padStart(3, "0")}/${total}]`;

    if (!isDryRun && fileExists(outputPath) && !args.includes("--force")) {
      console.log(`${label} ⏭️  ${entry.file} (déjà existant)`);
      skipped++;
      continue;
    }

    if (isDryRun) {
      console.log(`${label} 📝  ${entry.file}`);
      console.log(`         → "${entry.text}"`);
      continue;
    }

    try {
      ensureDir(outputPath);
      process.stdout.write(`${label} 🎙️  ${entry.file} ... `);
      await generateAudio(entry.text, outputPath);
      console.log("✅");
      generated++;
      await sleep(DELAY_MS);
    } catch (err) {
      console.log(`❌  ${err.message}`);
      errors++;
    }
  }

  if (!isDryRun) {
    console.log(`\n──────────────────────────────────────`);
    console.log(`✅  Générés  : ${generated}`);
    console.log(`⏭️  Ignorés  : ${skipped}`);
    console.log(`❌  Erreurs  : ${errors}`);
    console.log(`──────────────────────────────────────\n`);
  }
}

main();
