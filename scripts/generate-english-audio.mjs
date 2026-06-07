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
 *   expressions/a2, algebra/b1, fractions/a2, geometry/a2,
 *   statistics/b1, reasoning/b1, proof/b2, analysis/b2,
 *   sports/a1, sport_measurements/a1,
 *   sport_verbs/a2, sport_stats/a2, sport_physics/a2
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

  // ── A2 FRACTIONS — nouveaux ──────────────────────────────────────────────
  { file: "fractions/a2/numerator.mp3",          text: "numerator" },
  { file: "fractions/a2/denominator.mp3",        text: "denominator" },
  { file: "fractions/a2/fraction.mp3",           text: "fraction" },
  { file: "fractions/a2/half.mp3",               text: "half" },
  { file: "fractions/a2/quarter.mp3",            text: "quarter" },
  { file: "fractions/a2/third.mp3",              text: "third" },
  { file: "fractions/a2/irreducible.mp3",        text: "irreducible" },
  { file: "fractions/a2/common_denominator.mp3", text: "common denominator" },

  // ── A2 GEOMETRY — nouveaux ───────────────────────────────────────────────
  { file: "geometry/a2/angle.mp3",          text: "angle" },
  { file: "geometry/a2/right_angle.mp3",    text: "right angle" },
  { file: "geometry/a2/parallel.mp3",       text: "parallel" },
  { file: "geometry/a2/perpendicular.mp3",  text: "perpendicular" },
  { file: "geometry/a2/diagonal.mp3",       text: "diagonal" },
  { file: "geometry/a2/axis.mp3",           text: "axis" },
  { file: "geometry/a2/symmetry.mp3",       text: "symmetry" },
  { file: "geometry/a2/polygon.mp3",        text: "polygon" },

  // ── B1 STATISTICS — nouveaux ─────────────────────────────────────────────
  { file: "statistics/b1/mean.mp3",        text: "mean" },
  { file: "statistics/b1/median.mp3",      text: "median" },
  { file: "statistics/b1/mode.mp3",        text: "mode" },
  { file: "statistics/b1/range.mp3",       text: "range" },
  { file: "statistics/b1/frequency.mp3",   text: "frequency" },
  { file: "statistics/b1/probability.mp3", text: "probability" },
  { file: "statistics/b1/data.mp3",        text: "data" },
  { file: "statistics/b1/sample.mp3",      text: "sample" },

  // ── B1 REASONING — nouveaux ──────────────────────────────────────────────
  { file: "reasoning/b1/therefore.mp3",       text: "therefore" },
  { file: "reasoning/b1/given_that.mp3",      text: "given that" },
  { file: "reasoning/b1/let_x_be.mp3",        text: "let x be" },
  { file: "reasoning/b1/we_know_that.mp3",    text: "we know that" },
  { file: "reasoning/b1/it_follows_that.mp3", text: "it follows that" },
  { file: "reasoning/b1/if_and_only_if.mp3",  text: "if and only if" },
  { file: "reasoning/b1/we_can_deduce.mp3",   text: "we can deduce that" },
  { file: "reasoning/b1/which_gives.mp3",     text: "which gives" },

  // ── B2 VERBS — nouveaux ──────────────────────────────────────────────────
  { file: "verbs/b2/differentiate.mp3", text: "differentiate" },
  { file: "verbs/b2/integrate.mp3",     text: "integrate" },
  { file: "verbs/b2/converge.mp3",      text: "converge" },
  { file: "verbs/b2/generalise.mp3",    text: "generalise" },
  { file: "verbs/b2/conjecture.mp3",    text: "conjecture" },
  { file: "verbs/b2/verify.mp3",        text: "verify" },
  { file: "verbs/b2/construct.mp3",     text: "construct" },
  { file: "verbs/b2/parametrise.mp3",   text: "parametrise" },
  { file: "verbs/b2/transform.mp3",     text: "transform" },
  // already exist: approximate, derive, evaluate, interpret, model, prove
  { file: "verbs/b2/deduce.mp3",        text: "deduce" },
  { file: "verbs/b2/factorise.mp3",     text: "factorise" },

  // ── B2 PROOF — nouveaux ──────────────────────────────────────────────────
  { file: "proof/b2/theorem.mp3",       text: "theorem" },
  { file: "proof/b2/lemma.mp3",         text: "lemma" },
  { file: "proof/b2/hypothesis.mp3",    text: "hypothesis" },
  { file: "proof/b2/corollary.mp3",     text: "corollary" },
  { file: "proof/b2/proof.mp3",         text: "proof" },
  { file: "proof/b2/conjecture.mp3",    text: "conjecture" },
  { file: "proof/b2/induction.mp3",     text: "induction" },
  { file: "proof/b2/contradiction.mp3", text: "contradiction" },

  // ── B2 ANALYSIS — nouveaux ───────────────────────────────────────────────
  { file: "analysis/b2/derivative.mp3",  text: "derivative" },
  { file: "analysis/b2/integral.mp3",    text: "integral" },
  { file: "analysis/b2/limit.mp3",       text: "limit" },
  { file: "analysis/b2/asymptote.mp3",   text: "asymptote" },
  { file: "analysis/b2/sequence.mp3",    text: "sequence" },
  { file: "analysis/b2/series.mp3",      text: "series" },
  { file: "analysis/b2/continuous.mp3",  text: "continuous" },
  { file: "analysis/b2/convergent.mp3",  text: "convergent" },

  // ── A1 SPORTS ────────────────────────────────────────────────────────────
  { file: "sports/a1/football.mp3",    text: "football" },
  { file: "sports/a1/basketball.mp3",  text: "basketball" },
  { file: "sports/a1/athletics.mp3",   text: "athletics" },
  { file: "sports/a1/swimming.mp3",    text: "swimming" },
  { file: "sports/a1/cycling.mp3",     text: "cycling" },
  { file: "sports/a1/tennis.mp3",      text: "tennis" },
  { file: "sports/a1/rugby.mp3",       text: "rugby" },
  { file: "sports/a1/surfing.mp3",     text: "surfing" },
  { file: "sports/a1/running.mp3",     text: "running" },
  { file: "sports/a1/volleyball.mp3",  text: "volleyball" },

  // ── A1 SPORT MEASUREMENTS ────────────────────────────────────────────────
  { file: "sport_measurements/a1/metre.mp3",      text: "metre" },
  { file: "sport_measurements/a1/kilometre.mp3",  text: "kilometre" },
  { file: "sport_measurements/a1/second.mp3",     text: "second" },
  { file: "sport_measurements/a1/minute.mp3",     text: "minute" },
  { file: "sport_measurements/a1/hour.mp3",       text: "hour" },
  { file: "sport_measurements/a1/kilogram.mp3",   text: "kilogram" },
  { file: "sport_measurements/a1/centimetre.mp3", text: "centimetre" },
  { file: "sport_measurements/a1/lap.mp3",        text: "lap" },

  // ── A2 SPORT VERBS ───────────────────────────────────────────────────────
  { file: "sport_verbs/a2/run.mp3",     text: "run" },
  { file: "sport_verbs/a2/jump.mp3",    text: "jump" },
  { file: "sport_verbs/a2/throw.mp3",   text: "throw" },
  { file: "sport_verbs/a2/catch.mp3",   text: "catch" },
  { file: "sport_verbs/a2/kick.mp3",    text: "kick" },
  { file: "sport_verbs/a2/score.mp3",   text: "score" },
  { file: "sport_verbs/a2/win.mp3",     text: "win" },
  { file: "sport_verbs/a2/lose.mp3",    text: "lose" },
  { file: "sport_verbs/a2/train.mp3",   text: "train" },
  { file: "sport_verbs/a2/sprint.mp3",  text: "sprint" },
  { file: "sport_verbs/a2/measure.mp3", text: "measure" },
  { file: "sport_verbs/a2/record.mp3",  text: "record" },

  // ── A2 SPORT STATS ───────────────────────────────────────────────────────
  { file: "sport_stats/a2/score.mp3",      text: "score" },
  { file: "sport_stats/a2/goal.mp3",       text: "goal" },
  { file: "sport_stats/a2/point.mp3",      text: "point" },
  { file: "sport_stats/a2/record.mp3",     text: "record" },
  { file: "sport_stats/a2/average.mp3",    text: "average" },
  { file: "sport_stats/a2/ranking.mp3",    text: "ranking" },
  { file: "sport_stats/a2/percentage.mp3", text: "percentage" },
  { file: "sport_stats/a2/total.mp3",      text: "total" },
  { file: "sport_stats/a2/result.mp3",     text: "result" },
  { file: "sport_stats/a2/champion.mp3",   text: "champion" },

  // ── A2 SPORT PHYSICS ─────────────────────────────────────────────────────
  { file: "sport_physics/a2/speed.mp3",        text: "speed" },
  { file: "sport_physics/a2/distance.mp3",     text: "distance" },
  { file: "sport_physics/a2/time.mp3",         text: "time" },
  { file: "sport_physics/a2/weight.mp3",       text: "weight" },
  { file: "sport_physics/a2/height.mp3",       text: "height" },
  { file: "sport_physics/a2/acceleration.mp3", text: "acceleration" },
  { file: "sport_physics/a2/force.mp3",        text: "force" },
  { file: "sport_physics/a2/velocity.mp3",     text: "velocity" },
  { file: "sport_physics/a2/energy.mp3",       text: "energy" },
  { file: "sport_physics/a2/power.mp3",        text: "power" },
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
