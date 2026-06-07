/**
 * generate-english-audio.mjs
 *
 * Génère les fichiers audio MP3 pour le coach English Maths
 * via l'API TTS d'OpenAI (voice: nova).
 *
 * Usage :
 *   node scripts/generate-english-audio.mjs
 *   node scripts/generate-english-audio.mjs --dry-run
 *   node scripts/generate-english-audio.mjs --missing
 *   node scripts/generate-english-audio.mjs --group=digits
 *   node scripts/generate-english-audio.mjs --force
 *
 * Groupes disponibles : digits, numbers, operations, comparisons, geometry,
 *   verbs/a1, verbs/a2, verbs/b1, verbs/b2,
 *   expressions/a2, algebra/b1
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "audio", "english-maths");

// ─── Charge .env.local automatiquement ───────────────────────────────────────
function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnvLocal();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VOICE = "nova";
const MODEL = "tts-1";
const DELAY_MS = 300;

// ─── AUDIO ENTRIES ────────────────────────────────────────────────────────────
// Organisé par les 6 unités du A1 English Maths
// Format : { file: "dossier/nom.mp3", text: "texte à lire" }

const AUDIO_ENTRIES = [

  // ── UNIT 1 — DIGITS (zero → ten) ─────────────────────────────────────────
  { file: "digits/zero.mp3",    text: "zero" },
  { file: "digits/one.mp3",     text: "one" },
  { file: "digits/two.mp3",     text: "two" },
  { file: "digits/three.mp3",   text: "three" },
  { file: "digits/four.mp3",    text: "four" },
  { file: "digits/five.mp3",    text: "five" },
  { file: "digits/six.mp3",     text: "six" },
  { file: "digits/seven.mp3",   text: "seven" },
  { file: "digits/eight.mp3",   text: "eight" },
  { file: "digits/nine.mp3",    text: "nine" },
  { file: "digits/ten.mp3",     text: "ten" },

  // ── UNIT 2 — NUMBERS (round numbers) ─────────────────────────────────────
  // hundred, thousand already exist in numbers/ — keeping path consistent
  { file: "numbers/twenty.mp3",   text: "twenty" },
  { file: "numbers/thirty.mp3",   text: "thirty" },
  { file: "numbers/forty.mp3",    text: "forty" },
  { file: "numbers/fifty.mp3",    text: "fifty" },
  { file: "numbers/million.mp3",  text: "million" },
  // already exist: hundred.mp3, thousand.mp3

  // ── UNIT 3 — OPERATIONS ───────────────────────────────────────────────────
  // already exist: plus.mp3, minus.mp3, equal.mp3, greater-than.mp3, less-than.mp3
  { file: "operations/times.mp3",      text: "times" },
  { file: "operations/divided-by.mp3", text: "divided by" },
  { file: "operations/equals.mp3",     text: "equals" },
  { file: "operations/result.mp3",     text: "result" },

  // ── UNIT 4 — COMPARISONS ─────────────────────────────────────────────────
  // already exist in operations/: greater-than.mp3, less-than.mp3
  { file: "comparisons/equal-to.mp3", text: "equal to" },
  { file: "comparisons/odd.mp3",      text: "odd" },
  { file: "comparisons/even.mp3",     text: "even" },

  // ── UNIT 5 — SHAPES (geometry/) ──────────────────────────────────────────
  // already exist: triangle, square, rectangle, circle, point, line, side, vertex, perimeter
  { file: "geometry/angle.mp3", text: "angle" },

  // ── UNIT 6 — MATH VERBS A1 ───────────────────────────────────────────────
  // already exist: add.mp3, count.mp3, draw.mp3, measure.mp3
  { file: "verbs/a1/subtract.mp3",  text: "subtract" },
  { file: "verbs/a1/calculate.mp3", text: "calculate" },
  { file: "verbs/a1/find.mp3",      text: "find" },
  { file: "verbs/a1/write.mp3",     text: "write" },

  // ── A2 VERBS — existants ─────────────────────────────────────────────────
  // calculate, divide, multiply, order, solve, subtract — déjà générés

  // ── A2 VERBS — nouveaux (enrichissement 2026-06) ─────────────────────────
  { file: "verbs/a2/round.mp3",     text: "round" },
  { file: "verbs/a2/compare.mp3",   text: "compare" },
  { file: "verbs/a2/group.mp3",     text: "group" },
  { file: "verbs/a2/check.mp3",     text: "check" },
  { file: "verbs/a2/convert.mp3",   text: "convert" },
  { file: "verbs/a2/identify.mp3",  text: "identify" },
  { file: "verbs/a2/complete.mp3",  text: "complete" },
  { file: "verbs/a2/simplify.mp3",  text: "simplify" },
  { file: "verbs/a2/plot.mp3",      text: "plot" },

  // ── A2 EXPRESSIONS — nouveaux ────────────────────────────────────────────
  { file: "expressions/a2/equals.mp3",        text: "equals" },
  { file: "expressions/a2/result_is.mp3",     text: "the result is" },
  { file: "expressions/a2/greater_than.mp3",  text: "is greater than" },
  { file: "expressions/a2/less_than.mp3",     text: "is less than" },
  { file: "expressions/a2/sum_of.mp3",        text: "the sum of" },
  { file: "expressions/a2/difference_of.mp3", text: "the difference of" },
  { file: "expressions/a2/product_of.mp3",    text: "the product of" },
  { file: "expressions/a2/quotient_of.mp3",   text: "the quotient of" },

  // ── B1 VERBS — existants ─────────────────────────────────────────────────
  // convert, estimate, explain, justify, represent, simplify — déjà générés

  // ── B1 VERBS — nouveaux (enrichissement 2026-06) ─────────────────────────
  { file: "verbs/b1/deduce.mp3",      text: "deduce" },
  { file: "verbs/b1/conclude.mp3",    text: "conclude" },
  { file: "verbs/b1/prove.mp3",       text: "prove" },
  { file: "verbs/b1/factorise.mp3",   text: "factorise" },
  { file: "verbs/b1/expand.mp3",      text: "expand" },
  { file: "verbs/b1/reduce.mp3",      text: "reduce" },
  { file: "verbs/b1/substitute.mp3",  text: "substitute" },
  { file: "verbs/b1/evaluate.mp3",    text: "evaluate" },
  { file: "verbs/b1/demonstrate.mp3", text: "demonstrate" },

  // ── B1 ALGEBRA — nouveaux ────────────────────────────────────────────────
  { file: "algebra/b1/equation.mp3",    text: "equation" },
  { file: "algebra/b1/variable.mp3",    text: "variable" },
  { file: "algebra/b1/coefficient.mp3", text: "coefficient" },
  { file: "algebra/b1/expression.mp3",  text: "expression" },
  { file: "algebra/b1/inequality.mp3",  text: "inequality" },
  { file: "algebra/b1/solution.mp3",    text: "solution" },
  { file: "algebra/b1/formula.mp3",     text: "formula" },
  { file: "algebra/b1/function.mp3",    text: "function" },

  // ── B2 VERBS ─────────────────────────────────────────────────────────────
  // already exist: approximate, derive, evaluate, interpret, model, prove
  { file: "verbs/b2/deduce.mp3",    text: "deduce" },
  { file: "verbs/b2/factorise.mp3", text: "factorise" },
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

  console.log(`\n─────────────────────────────────────`);
  if (isDryRun) {
    console.log(`📝  Dry run terminé — ${total} fichiers listés`);
  } else {
    console.log(`✅  Générés  : ${generated}`);
    console.log(`⏭️  Ignorés  : ${skipped}`);
    console.log(`❌  Erreurs  : ${errors}`);
  }
  console.log(`─────────────────────────────────────\n`);
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
