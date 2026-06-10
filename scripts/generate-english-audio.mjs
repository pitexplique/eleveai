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
  { file: "digits/a1/zero.mp3",    text: "zero" },
  { file: "digits/a1/one.mp3",     text: "one" },
  { file: "digits/a1/two.mp3",     text: "two" },
  { file: "digits/a1/three.mp3",   text: "three" },
  { file: "digits/a1/four.mp3",    text: "four" },
  { file: "digits/a1/five.mp3",    text: "five" },
  { file: "digits/a1/six.mp3",     text: "six" },
  { file: "digits/a1/seven.mp3",   text: "seven" },
  { file: "digits/a1/eight.mp3",   text: "eight" },
  { file: "digits/a1/nine.mp3",    text: "nine" },
  { file: "digits/a1/ten.mp3",     text: "ten" },

  // ── UNIT 2 — NUMBERS (round numbers) ─────────────────────────────────────
  // hundred, thousand already exist in numbers/ — keeping path consistent
  { file: "numbers/a1/twenty.mp3",   text: "twenty" },
  { file: "numbers/a1/thirty.mp3",   text: "thirty" },
  { file: "numbers/a1/forty.mp3",    text: "forty" },
  { file: "numbers/a1/fifty.mp3",    text: "fifty" },
  { file: "numbers/a1/million.mp3",  text: "million" },
  // already exist: hundred.mp3, thousand.mp3

  // ── UNIT 3 — OPERATIONS ───────────────────────────────────────────────────
  // already exist: plus.mp3, minus.mp3, equal.mp3, greater-than.mp3, less-than.mp3
  { file: "operations/a1/times.mp3",      text: "times" },
  { file: "operations/a1/divided-by.mp3", text: "divided by" },
  { file: "operations/a1/equals.mp3",     text: "equals" },
  { file: "operations/a1/result.mp3",     text: "result" },

  // ── UNIT 4 — COMPARISONS ─────────────────────────────────────────────────
  // already exist in operations/: greater-than.mp3, less-than.mp3
  { file: "comparisons/a1/equal-to.mp3", text: "equal to" },
  { file: "comparisons/a1/odd.mp3",      text: "odd" },
  { file: "comparisons/a1/even.mp3",     text: "even" },

  // ── UNIT 5 — SHAPES (geometry/) ──────────────────────────────────────────
  // already exist: triangle, square, rectangle, circle, point, line, side, vertex, perimeter
  { file: "geometry/a1/angle.mp3", text: "angle" },
  { file: "geometry/a1/angle-sentence.mp3", text: "This is an angle." },

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

  // ── B1 SPORT VERBS ───────────────────────────────────────────────────────
  { file: "sport_verbs/b1/analyse.mp3",   text: "analyse" },
  { file: "sport_verbs/b1/calculate.mp3", text: "calculate" },
  { file: "sport_verbs/b1/measure.mp3",   text: "measure" },
  { file: "sport_verbs/b1/compare.mp3",   text: "compare" },
  { file: "sport_verbs/b1/estimate.mp3",  text: "estimate" },
  { file: "sport_verbs/b1/convert.mp3",   text: "convert" },
  { file: "sport_verbs/b1/plot.mp3",      text: "plot" },
  { file: "sport_verbs/b1/represent.mp3", text: "represent" },
  { file: "sport_verbs/b1/record.mp3",    text: "record" },
  { file: "sport_verbs/b1/compute.mp3",   text: "compute" },

  // ── B1 SPORT PHYSICS ─────────────────────────────────────────────────────
  { file: "sport_physics/b1/velocity.mp3",     text: "velocity" },
  { file: "sport_physics/b1/acceleration.mp3", text: "acceleration" },
  { file: "sport_physics/b1/momentum.mp3",     text: "momentum" },
  { file: "sport_physics/b1/displacement.mp3", text: "displacement" },
  { file: "sport_physics/b1/frequency.mp3",    text: "frequency" },
  { file: "sport_physics/b1/amplitude.mp3",    text: "amplitude" },
  { file: "sport_physics/b1/trajectory.mp3",   text: "trajectory" },
  { file: "sport_physics/b1/resistance.mp3",   text: "resistance" },

  // ── B1 SPORT STATS ───────────────────────────────────────────────────────
  { file: "sport_stats/b1/mean.mp3",         text: "mean" },
  { file: "sport_stats/b1/median.mp3",       text: "median" },
  { file: "sport_stats/b1/variance.mp3",     text: "variance" },
  { file: "sport_stats/b1/deviation.mp3",    text: "deviation" },
  { file: "sport_stats/b1/ratio.mp3",        text: "ratio" },
  { file: "sport_stats/b1/proportion.mp3",   text: "proportion" },
  { file: "sport_stats/b1/sample.mp3",       text: "sample" },
  { file: "sport_stats/b1/distribution.mp3", text: "distribution" },

  // ── B2 SPORT VERBS ───────────────────────────────────────────────────────
  { file: "sport_verbs/b2/model.mp3",       text: "model" },
  { file: "sport_verbs/b2/derive.mp3",      text: "derive" },
  { file: "sport_verbs/b2/optimise.mp3",    text: "optimise" },
  { file: "sport_verbs/b2/maximise.mp3",    text: "maximise" },
  { file: "sport_verbs/b2/minimise.mp3",    text: "minimise" },
  { file: "sport_verbs/b2/simulate.mp3",    text: "simulate" },
  { file: "sport_verbs/b2/predict.mp3",     text: "predict" },
  { file: "sport_verbs/b2/extrapolate.mp3", text: "extrapolate" },

  // ── B2 SPORT SCIENCE ─────────────────────────────────────────────────────
  { file: "sport_science/b2/trajectory.mp3",       text: "trajectory" },
  { file: "sport_science/b2/projectile.mp3",       text: "projectile" },
  { file: "sport_science/b2/friction.mp3",         text: "friction" },
  { file: "sport_science/b2/gravity.mp3",          text: "gravity" },
  { file: "sport_science/b2/momentum.mp3",         text: "momentum" },
  { file: "sport_science/b2/kinetic_energy.mp3",   text: "kinetic energy" },
  { file: "sport_science/b2/potential_energy.mp3", text: "potential energy" },
  { file: "sport_science/b2/resultant.mp3",        text: "resultant" },

  // ── B2 SPORT DATA ────────────────────────────────────────────────────────
  { file: "sport_data/b2/dataset.mp3",      text: "dataset" },
  { file: "sport_data/b2/distribution.mp3", text: "distribution" },
  { file: "sport_data/b2/outlier.mp3",      text: "outlier" },
  { file: "sport_data/b2/regression.mp3",   text: "regression" },
  { file: "sport_data/b2/coefficient.mp3",  text: "coefficient" },
  { file: "sport_data/b2/histogram.mp3",    text: "histogram" },
  { file: "sport_data/b2/correlation.mp3",  text: "correlation" },
  { file: "sport_data/b2/scatter_plot.mp3", text: "scatter plot" },

  // ── A1 SCIENCE — LIVING WORLD ────────────────────────────────────────────
  { file: "science_living/a1/cell.mp3",    text: "cell" },
  { file: "science_living/a1/plant.mp3",   text: "plant" },
  { file: "science_living/a1/animal.mp3",  text: "animal" },
  { file: "science_living/a1/organ.mp3",   text: "organ" },
  { file: "science_living/a1/body.mp3",    text: "body" },
  { file: "science_living/a1/leaf.mp3",    text: "leaf" },
  { file: "science_living/a1/root.mp3",    text: "root" },
  { file: "science_living/a1/seed.mp3",    text: "seed" },
  { file: "science_living/a1/fish.mp3",    text: "fish" },
  { file: "science_living/a1/bird.mp3",    text: "bird" },

  // ── A1 SCIENCE — EARTH ───────────────────────────────────────────────────
  { file: "science_earth/a1/water.mp3",   text: "water" },
  { file: "science_earth/a1/air.mp3",     text: "air" },
  { file: "science_earth/a1/soil.mp3",    text: "soil" },
  { file: "science_earth/a1/rock.mp3",    text: "rock" },
  { file: "science_earth/a1/sun.mp3",     text: "sun" },
  { file: "science_earth/a1/moon.mp3",    text: "moon" },
  { file: "science_earth/a1/star.mp3",    text: "star" },
  { file: "science_earth/a1/cloud.mp3",   text: "cloud" },
  { file: "science_earth/a1/rain.mp3",    text: "rain" },
  { file: "science_earth/a1/volcano.mp3", text: "volcano" },

  // ── A2 SCIENCE — BIOLOGY ─────────────────────────────────────────────────
  { file: "science_biology/a2/cell.mp3",           text: "cell" },
  { file: "science_biology/a2/nucleus.mp3",        text: "nucleus" },
  { file: "science_biology/a2/tissue.mp3",         text: "tissue" },
  { file: "science_biology/a2/organ.mp3",          text: "organ" },
  { file: "science_biology/a2/organism.mp3",       text: "organism" },
  { file: "science_biology/a2/reproduction.mp3",   text: "reproduction" },
  { file: "science_biology/a2/photosynthesis.mp3", text: "photosynthesis" },
  { file: "science_biology/a2/digestion.mp3",      text: "digestion" },
  { file: "science_biology/a2/respiration.mp3",    text: "respiration" },
  { file: "science_biology/a2/evolution.mp3",      text: "evolution" },

  // ── A2 SCIENCE — CHEMISTRY ───────────────────────────────────────────────
  { file: "science_chemistry/a2/atom.mp3",     text: "atom" },
  { file: "science_chemistry/a2/molecule.mp3", text: "molecule" },
  { file: "science_chemistry/a2/element.mp3",  text: "element" },
  { file: "science_chemistry/a2/mixture.mp3",  text: "mixture" },
  { file: "science_chemistry/a2/solution.mp3", text: "solution" },
  { file: "science_chemistry/a2/acid.mp3",     text: "acid" },
  { file: "science_chemistry/a2/metal.mp3",    text: "metal" },
  { file: "science_chemistry/a2/gas.mp3",      text: "gas" },
  { file: "science_chemistry/a2/solid.mp3",    text: "solid" },
  { file: "science_chemistry/a2/liquid.mp3",   text: "liquid" },

  // ── A2 SCIENCE — PHYSICS ─────────────────────────────────────────────────
  { file: "science_physics/a2/light.mp3",       text: "light" },
  { file: "science_physics/a2/sound.mp3",       text: "sound" },
  { file: "science_physics/a2/wave.mp3",        text: "wave" },
  { file: "science_physics/a2/temperature.mp3", text: "temperature" },
  { file: "science_physics/a2/pressure.mp3",    text: "pressure" },
  { file: "science_physics/a2/current.mp3",     text: "current" },
  { file: "science_physics/a2/magnet.mp3",      text: "magnet" },
  { file: "science_physics/a2/circuit.mp3",     text: "circuit" },
  { file: "science_physics/a2/energy.mp3",      text: "energy" },
  { file: "science_physics/a2/voltage.mp3",     text: "voltage" },

  // ── B1 SCIENCE — BIOLOGY ─────────────────────────────────────────────────
  { file: "science_biology/b1/chromosome.mp3", text: "chromosome" },
  { file: "science_biology/b1/enzyme.mp3",     text: "enzyme" },
  { file: "science_biology/b1/protein.mp3",    text: "protein" },
  { file: "science_biology/b1/membrane.mp3",   text: "membrane" },
  { file: "science_biology/b1/mutation.mp3",   text: "mutation" },
  { file: "science_biology/b1/hormone.mp3",    text: "hormone" },
  { file: "science_biology/b1/antibody.mp3",   text: "antibody" },
  { file: "science_biology/b1/ecosystem.mp3",  text: "ecosystem" },

  // ── B1 SCIENCE — CHEMISTRY ───────────────────────────────────────────────
  { file: "science_chemistry/b1/oxidation.mp3",     text: "oxidation" },
  { file: "science_chemistry/b1/reaction.mp3",      text: "reaction" },
  { file: "science_chemistry/b1/bond.mp3",          text: "bond" },
  { file: "science_chemistry/b1/concentration.mp3", text: "concentration" },
  { file: "science_chemistry/b1/compound.mp3",      text: "compound" },
  { file: "science_chemistry/b1/ion.mp3",           text: "ion" },
  { file: "science_chemistry/b1/electron.mp3",      text: "electron" },
  { file: "science_chemistry/b1/periodic.mp3",      text: "periodic table" },

  // ── B1 SCIENCE — PHYSICS ─────────────────────────────────────────────────
  { file: "science_physics/b1/refraction.mp3",  text: "refraction" },
  { file: "science_physics/b1/resistance.mp3",  text: "resistance" },
  { file: "science_physics/b1/voltage.mp3",     text: "voltage" },
  { file: "science_physics/b1/frequency.mp3",   text: "frequency" },
  { file: "science_physics/b1/spectrum.mp3",    text: "spectrum" },
  { file: "science_physics/b1/radiation.mp3",   text: "radiation" },
  { file: "science_physics/b1/circuit.mp3",     text: "circuit" },
  { file: "science_physics/b1/nuclear.mp3",     text: "nuclear" },

  // ── B2 SCIENCE — BIOLOGY ─────────────────────────────────────────────────
  { file: "science_biology/b2/genome.mp3",       text: "genome" },
  { file: "science_biology/b2/mitosis.mp3",      text: "mitosis" },
  { file: "science_biology/b2/metabolism.mp3",   text: "metabolism" },
  { file: "science_biology/b2/homeostasis.mp3",  text: "homeostasis" },
  { file: "science_biology/b2/catalyst.mp3",     text: "catalyst" },
  { file: "science_biology/b2/neural.mp3",       text: "neural" },
  { file: "science_biology/b2/biodiversity.mp3", text: "biodiversity" },
  { file: "science_biology/b2/meiosis.mp3",      text: "meiosis" },

  // ── B2 SCIENCE — CHEMISTRY ───────────────────────────────────────────────
  { file: "science_chemistry/b2/electrolysis.mp3",   text: "electrolysis" },
  { file: "science_chemistry/b2/titration.mp3",      text: "titration" },
  { file: "science_chemistry/b2/equilibrium.mp3",    text: "equilibrium" },
  { file: "science_chemistry/b2/entropy.mp3",        text: "entropy" },
  { file: "science_chemistry/b2/polymer.mp3",        text: "polymer" },
  { file: "science_chemistry/b2/isomer.mp3",         text: "isomer" },
  { file: "science_chemistry/b2/oxidation_state.mp3",text: "oxidation state" },
  { file: "science_chemistry/b2/stoichiometry.mp3",  text: "stoichiometry" },

  // ── B2 SCIENCE — PHYSICS ─────────────────────────────────────────────────
  { file: "science_physics/b2/quantum.mp3",         text: "quantum" },
  { file: "science_physics/b2/electromagnetic.mp3", text: "electromagnetic" },
  { file: "science_physics/b2/thermodynamics.mp3",  text: "thermodynamics" },
  { file: "science_physics/b2/interference.mp3",    text: "interference" },
  { file: "science_physics/b2/photoelectric.mp3",   text: "photoelectric" },
  { file: "science_physics/b2/wave_function.mp3",   text: "wave function" },
  { file: "science_physics/b2/relativity.mp3",      text: "relativity" },
  { file: "science_physics/b2/entropy.mp3",         text: "entropy" },

  // ── A1 ÉCONOMIE - GESTION — MONEY ────────────────────────────────────────
  { file: "money/a1/euro.mp3",    text: "euro" },
  { file: "money/a1/cent.mp3",    text: "cent" },
  { file: "money/a1/price.mp3",   text: "price" },
  { file: "money/a1/coin.mp3",    text: "coin" },
  { file: "money/a1/note.mp3",    text: "note" },
  { file: "money/a1/buy.mp3",     text: "buy" },
  { file: "money/a1/sell.mp3",    text: "sell" },
  { file: "money/a1/pay.mp3",     text: "pay" },
  { file: "money/a1/change.mp3",  text: "change" },
  { file: "money/a1/receipt.mp3", text: "receipt" },

  // ── A1 ÉCONOMIE - GESTION — FAMILY BUDGET ────────────────────────────────
  { file: "family_budget/a1/rent.mp3",      text: "rent" },
  { file: "family_budget/a1/food.mp3",      text: "food" },
  { file: "family_budget/a1/bill.mp3",      text: "bill" },
  { file: "family_budget/a1/save.mp3",      text: "save" },
  { file: "family_budget/a1/spend.mp3",     text: "spend" },
  { file: "family_budget/a1/budget.mp3",    text: "budget" },
  { file: "family_budget/a1/income.mp3",    text: "income" },
  { file: "family_budget/a1/cost.mp3",      text: "cost" },
  { file: "family_budget/a1/free.mp3",      text: "free" },
  { file: "family_budget/a1/expensive.mp3", text: "expensive" },

  // ── A2 ÉCONOMIE - GESTION — ECONOMY BASICS ───────────────────────────────
  { file: "economy_basics/a2/profit.mp3",   text: "profit" },
  { file: "economy_basics/a2/loss.mp3",     text: "loss" },
  { file: "economy_basics/a2/tax.mp3",      text: "tax" },
  { file: "economy_basics/a2/discount.mp3", text: "discount" },
  { file: "economy_basics/a2/interest.mp3", text: "interest" },
  { file: "economy_basics/a2/salary.mp3",   text: "salary" },
  { file: "economy_basics/a2/invoice.mp3",  text: "invoice" },
  { file: "economy_basics/a2/deposit.mp3",  text: "deposit" },
  { file: "economy_basics/a2/refund.mp3",   text: "refund" },
  { file: "economy_basics/a2/fee.mp3",      text: "fee" },

  // ── A2 ÉCONOMIE - GESTION — FAMILY FINANCE ───────────────────────────────
  { file: "family_finance/a2/savings.mp3",      text: "savings" },
  { file: "family_finance/a2/expense.mp3",      text: "expense" },
  { file: "family_finance/a2/insurance.mp3",    text: "insurance" },
  { file: "family_finance/a2/loan.mp3",         text: "loan" },
  { file: "family_finance/a2/subscription.mp3", text: "subscription" },
  { file: "family_finance/a2/mortgage.mp3",     text: "mortgage" },
  { file: "family_finance/a2/utility.mp3",      text: "utility bill" },
  { file: "family_finance/a2/credit.mp3",       text: "credit" },
  { file: "family_finance/a2/account.mp3",      text: "account" },
  { file: "family_finance/a2/transfer.mp3",     text: "transfer" },

  // ── A2 ÉCONOMIE - GESTION — PERCENTAGES ──────────────────────────────────
  { file: "percentages_eco/a2/percentage.mp3", text: "percentage" },
  { file: "percentages_eco/a2/increase.mp3",   text: "increase" },
  { file: "percentages_eco/a2/decrease.mp3",   text: "decrease" },
  { file: "percentages_eco/a2/reduction.mp3",  text: "reduction" },
  { file: "percentages_eco/a2/rate.mp3",       text: "rate" },
  { file: "percentages_eco/a2/net.mp3",        text: "net" },
  { file: "percentages_eco/a2/gross.mp3",      text: "gross" },
  { file: "percentages_eco/a2/total.mp3",      text: "total" },
  { file: "percentages_eco/a2/vat.mp3",        text: "VAT" },
  { file: "percentages_eco/a2/balance.mp3",    text: "balance" },

  // ── B1 ÉCONOMIE - GESTION — ECONOMY ──────────────────────────────────────
  { file: "economy/b1/inflation.mp3",    text: "inflation" },
  { file: "economy/b1/recession.mp3",    text: "recession" },
  { file: "economy/b1/gdp.mp3",          text: "GDP" },
  { file: "economy/b1/unemployment.mp3", text: "unemployment" },
  { file: "economy/b1/export.mp3",       text: "export" },
  { file: "economy/b1/import.mp3",       text: "import" },
  { file: "economy/b1/market.mp3",       text: "market" },
  { file: "economy/b1/demand.mp3",       text: "demand" },
  { file: "economy/b1/supply.mp3",       text: "supply" },
  { file: "economy/b1/growth.mp3",       text: "growth" },

  // ── B1 ÉCONOMIE - GESTION — FINANCE ──────────────────────────────────────
  { file: "finance/b1/investment.mp3",    text: "investment" },
  { file: "finance/b1/dividend.mp3",      text: "dividend" },
  { file: "finance/b1/capital.mp3",       text: "capital" },
  { file: "finance/b1/asset.mp3",         text: "asset" },
  { file: "finance/b1/revenue.mp3",       text: "revenue" },
  { file: "finance/b1/margin.mp3",        text: "margin" },
  { file: "finance/b1/balance_sheet.mp3", text: "balance sheet" },
  { file: "finance/b1/liability.mp3",     text: "liability" },

  // ── B1 ÉCONOMIE - GESTION — FAMILY MANAGEMENT ────────────────────────────
  { file: "family_management/b1/household.mp3",     text: "household" },
  { file: "family_management/b1/installment.mp3",   text: "installment" },
  { file: "family_management/b1/interest_rate.mp3", text: "interest rate" },
  { file: "family_management/b1/debit.mp3",         text: "debit" },
  { file: "family_management/b1/statement.mp3",     text: "statement" },
  { file: "family_management/b1/allowance.mp3",     text: "allowance" },
  { file: "family_management/b1/pension.mp3",       text: "pension" },
  { file: "family_management/b1/tax_return.mp3",    text: "tax return" },

  // ── B2 ÉCONOMIE - GESTION — MACROECONOMICS ───────────────────────────────
  { file: "macroeconomics/b2/monetary_policy.mp3", text: "monetary policy" },
  { file: "macroeconomics/b2/fiscal_policy.mp3",   text: "fiscal policy" },
  { file: "macroeconomics/b2/deficit.mp3",         text: "deficit" },
  { file: "macroeconomics/b2/surplus.mp3",         text: "surplus" },
  { file: "macroeconomics/b2/trade_balance.mp3",   text: "trade balance" },
  { file: "macroeconomics/b2/exchange_rate.mp3",   text: "exchange rate" },
  { file: "macroeconomics/b2/depreciation.mp3",    text: "depreciation" },
  { file: "macroeconomics/b2/appreciation.mp3",    text: "appreciation" },

  // ── B2 ÉCONOMIE - GESTION — BUSINESS ─────────────────────────────────────
  { file: "business/b2/shareholder.mp3",    text: "shareholder" },
  { file: "business/b2/equity.mp3",         text: "equity" },
  { file: "business/b2/portfolio.mp3",      text: "portfolio" },
  { file: "business/b2/liquidity.mp3",      text: "liquidity" },
  { file: "business/b2/hedge.mp3",          text: "hedge" },
  { file: "business/b2/derivative.mp3",     text: "derivative" },
  { file: "business/b2/bond.mp3",           text: "bond" },
  { file: "business/b2/yield.mp3",          text: "yield" },

  // ── B2 ÉCONOMIE - GESTION — ECO STATISTICS ───────────────────────────────
  { file: "eco_statistics/b2/index.mp3",       text: "index" },
  { file: "eco_statistics/b2/elasticity.mp3",  text: "elasticity" },
  { file: "eco_statistics/b2/forecast.mp3",    text: "forecast" },
  { file: "eco_statistics/b2/trend.mp3",       text: "trend" },
  { file: "eco_statistics/b2/coefficient.mp3", text: "coefficient" },
  { file: "eco_statistics/b2/regression.mp3",  text: "regression" },
  { file: "eco_statistics/b2/deviation.mp3",   text: "deviation" },
  { file: "eco_statistics/b2/indicator.mp3",   text: "indicator" },

  // ── A1 GÉOGRAPHIE - VOYAGE — COUNTRIES ───────────────────────────────────
  { file: "countries/a1/france.mp3",     text: "France" },
  { file: "countries/a1/reunion.mp3",    text: "Réunion" },
  { file: "countries/a1/madagascar.mp3", text: "Madagascar" },
  { file: "countries/a1/mauritius.mp3",  text: "Mauritius" },
  { file: "countries/a1/africa.mp3",     text: "Africa" },
  { file: "countries/a1/europe.mp3",     text: "Europe" },
  { file: "countries/a1/asia.mp3",       text: "Asia" },
  { file: "countries/a1/america.mp3",    text: "America" },
  { file: "countries/a1/australia.mp3",  text: "Australia" },
  { file: "countries/a1/india.mp3",      text: "India" },

  // ── A1 GÉOGRAPHIE - VOYAGE — BASIC GEOGRAPHY ─────────────────────────────
  { file: "geography_basic/a1/island.mp3",   text: "island" },
  { file: "geography_basic/a1/mountain.mp3", text: "mountain" },
  { file: "geography_basic/a1/river.mp3",    text: "river" },
  { file: "geography_basic/a1/sea.mp3",      text: "sea" },
  { file: "geography_basic/a1/ocean.mp3",    text: "ocean" },
  { file: "geography_basic/a1/beach.mp3",    text: "beach" },
  { file: "geography_basic/a1/forest.mp3",   text: "forest" },
  { file: "geography_basic/a1/city.mp3",     text: "city" },
  { file: "geography_basic/a1/village.mp3",  text: "village" },
  { file: "geography_basic/a1/road.mp3",     text: "road" },

  // ── A2 GÉOGRAPHIE - VOYAGE — TRAVEL ──────────────────────────────────────
  { file: "travel/a2/airport.mp3",  text: "airport" },
  { file: "travel/a2/passport.mp3", text: "passport" },
  { file: "travel/a2/ticket.mp3",   text: "ticket" },
  { file: "travel/a2/hotel.mp3",    text: "hotel" },
  { file: "travel/a2/luggage.mp3",  text: "luggage" },
  { file: "travel/a2/flight.mp3",   text: "flight" },
  { file: "travel/a2/bus.mp3",      text: "bus" },
  { file: "travel/a2/train.mp3",    text: "train" },
  { file: "travel/a2/taxi.mp3",     text: "taxi" },
  { file: "travel/a2/map.mp3",      text: "map" },

  // ── A2 GÉOGRAPHIE - VOYAGE — GEOGRAPHY ───────────────────────────────────
  { file: "geography/a2/continent.mp3",  text: "continent" },
  { file: "geography/a2/capital.mp3",    text: "capital" },
  { file: "geography/a2/coast.mp3",      text: "coast" },
  { file: "geography/a2/volcano.mp3",    text: "volcano" },
  { file: "geography/a2/coral_reef.mp3", text: "coral reef" },
  { file: "geography/a2/lagoon.mp3",     text: "lagoon" },
  { file: "geography/a2/climate.mp3",    text: "climate" },
  { file: "geography/a2/population.mp3", text: "population" },
  { file: "geography/a2/border.mp3",     text: "border" },
  { file: "geography/a2/latitude.mp3",   text: "latitude" },

  // ── A2 GÉOGRAPHIE - VOYAGE — DIRECTIONS ──────────────────────────────────
  { file: "directions/a2/north.mp3",    text: "north" },
  { file: "directions/a2/south.mp3",    text: "south" },
  { file: "directions/a2/east.mp3",     text: "east" },
  { file: "directions/a2/west.mp3",     text: "west" },
  { file: "directions/a2/left.mp3",     text: "left" },
  { file: "directions/a2/right.mp3",    text: "right" },
  { file: "directions/a2/near.mp3",     text: "near" },
  { file: "directions/a2/far.mp3",      text: "far" },
  { file: "directions/a2/between.mp3",  text: "between" },
  { file: "directions/a2/opposite.mp3", text: "opposite" },

  // ── B1 GÉOGRAPHIE - VOYAGE — PHYSICAL GEOGRAPHY ──────────────────────────
  { file: "physical_geography/b1/relief.mp3",      text: "relief" },
  { file: "physical_geography/b1/altitude.mp3",    text: "altitude" },
  { file: "physical_geography/b1/longitude.mp3",   text: "longitude" },
  { file: "physical_geography/b1/coordinates.mp3", text: "coordinates" },
  { file: "physical_geography/b1/hemisphere.mp3",  text: "hemisphere" },
  { file: "physical_geography/b1/equator.mp3",     text: "equator" },
  { file: "physical_geography/b1/tropics.mp3",     text: "tropics" },
  { file: "physical_geography/b1/erosion.mp3",     text: "erosion" },
  { file: "physical_geography/b1/sediment.mp3",    text: "sediment" },
  { file: "physical_geography/b1/tectonic.mp3",    text: "tectonic" },

  // ── B1 GÉOGRAPHIE - VOYAGE — TRAVEL CULTURE ──────────────────────────────
  { file: "travel_culture/b1/heritage.mp3",     text: "heritage" },
  { file: "travel_culture/b1/tourism.mp3",      text: "tourism" },
  { file: "travel_culture/b1/tradition.mp3",    text: "tradition" },
  { file: "travel_culture/b1/diversity.mp3",    text: "diversity" },
  { file: "travel_culture/b1/migration.mp3",    text: "migration" },
  { file: "travel_culture/b1/urbanisation.mp3", text: "urbanisation" },
  { file: "travel_culture/b1/exchange.mp3",     text: "exchange" },
  { file: "travel_culture/b1/custom.mp3",       text: "custom" },
  { file: "travel_culture/b1/identity.mp3",     text: "identity" },
  { file: "travel_culture/b1/region.mp3",       text: "region" },

  // ── B1 GÉOGRAPHIE - VOYAGE — ENVIRONMENT ─────────────────────────────────
  { file: "environment/b1/ecosystem.mp3",      text: "ecosystem" },
  { file: "environment/b1/biodiversity.mp3",   text: "biodiversity" },
  { file: "environment/b1/deforestation.mp3",  text: "deforestation" },
  { file: "environment/b1/pollution.mp3",      text: "pollution" },
  { file: "environment/b1/conservation.mp3",   text: "conservation" },
  { file: "environment/b1/habitat.mp3",        text: "habitat" },
  { file: "environment/b1/climate_change.mp3", text: "climate change" },
  { file: "environment/b1/renewable.mp3",      text: "renewable" },
  { file: "environment/b1/sustainability.mp3", text: "sustainability" },
  { file: "environment/b1/species.mp3",        text: "species" },

  // ── B2 GÉOGRAPHIE - VOYAGE — GEOPOLITICS ─────────────────────────────────
  { file: "geopolitics/b2/sovereignty.mp3",   text: "sovereignty" },
  { file: "geopolitics/b2/territory.mp3",     text: "territory" },
  { file: "geopolitics/b2/conflict.mp3",      text: "conflict" },
  { file: "geopolitics/b2/diplomacy.mp3",     text: "diplomacy" },
  { file: "geopolitics/b2/treaty.mp3",        text: "treaty" },
  { file: "geopolitics/b2/globalisation.mp3", text: "globalisation" },
  { file: "geopolitics/b2/development.mp3",   text: "development" },
  { file: "geopolitics/b2/inequality.mp3",    text: "inequality" },
  { file: "geopolitics/b2/alliance.mp3",      text: "alliance" },
  { file: "geopolitics/b2/sanction.mp3",      text: "sanction" },

  // ── B2 GÉOGRAPHIE - VOYAGE — CLIMATE SCIENCE ─────────────────────────────
  { file: "climate_science/b2/greenhouse.mp3",      text: "greenhouse effect" },
  { file: "climate_science/b2/carbon_footprint.mp3",text: "carbon footprint" },
  { file: "climate_science/b2/sea_level.mp3",       text: "sea level" },
  { file: "climate_science/b2/desertification.mp3", text: "desertification" },
  { file: "climate_science/b2/el_nino.mp3",         text: "El Niño" },
  { file: "climate_science/b2/precipitation.mp3",   text: "precipitation" },
  { file: "climate_science/b2/ozone.mp3",           text: "ozone layer" },
  { file: "climate_science/b2/anomaly.mp3",         text: "anomaly" },

  // ── A1 VIE QUOTIDIENNE — FAMILY ──────────────────────────────────────────
  { file: "family/a1/father.mp3",      text: "father"      },
  { file: "family/a1/mother.mp3",      text: "mother"      },
  { file: "family/a1/brother.mp3",     text: "brother"     },
  { file: "family/a1/sister.mp3",      text: "sister"      },
  { file: "family/a1/son.mp3",         text: "son"         },
  { file: "family/a1/daughter.mp3",    text: "daughter"    },
  { file: "family/a1/grandfather.mp3", text: "grandfather" },
  { file: "family/a1/grandmother.mp3", text: "grandmother" },
  { file: "family/a1/uncle.mp3",       text: "uncle"       },
  { file: "family/a1/aunt.mp3",        text: "aunt"        },

  // ── A1 VIE QUOTIDIENNE — SCHOOL ───────────────────────────────────────────
  { file: "school/a1/pen.mp3",       text: "pen"       },
  { file: "school/a1/pencil.mp3",    text: "pencil"    },
  { file: "school/a1/book.mp3",      text: "book"      },
  { file: "school/a1/bag.mp3",       text: "bag"       },
  { file: "school/a1/ruler.mp3",     text: "ruler"     },
  { file: "school/a1/table.mp3",     text: "table"     },
  { file: "school/a1/chair.mp3",     text: "chair"     },
  { file: "school/a1/board.mp3",     text: "board"     },
  { file: "school/a1/classroom.mp3", text: "classroom" },
  { file: "school/a1/teacher.mp3",   text: "teacher"   },

  // ── A1 VIE QUOTIDIENNE — COLORS ───────────────────────────────────────────
  { file: "colors/a1/red.mp3",    text: "red"    },
  { file: "colors/a1/blue.mp3",   text: "blue"   },
  { file: "colors/a1/green.mp3",  text: "green"  },
  { file: "colors/a1/yellow.mp3", text: "yellow" },
  { file: "colors/a1/black.mp3",  text: "black"  },
  { file: "colors/a1/white.mp3",  text: "white"  },
  { file: "colors/a1/orange.mp3", text: "orange" },
  { file: "colors/a1/pink.mp3",   text: "pink"   },
  { file: "colors/a1/purple.mp3", text: "purple" },
  { file: "colors/a1/grey.mp3",   text: "grey"   },

  // ── A1 VIE QUOTIDIENNE — BODY ─────────────────────────────────────────────
  { file: "body/a1/head.mp3",  text: "head"  },
  { file: "body/a1/eye.mp3",   text: "eye"   },
  { file: "body/a1/ear.mp3",   text: "ear"   },
  { file: "body/a1/mouth.mp3", text: "mouth" },
  { file: "body/a1/nose.mp3",  text: "nose"  },
  { file: "body/a1/hand.mp3",  text: "hand"  },
  { file: "body/a1/arm.mp3",   text: "arm"   },
  { file: "body/a1/leg.mp3",   text: "leg"   },
  { file: "body/a1/foot.mp3",  text: "foot"  },
  { file: "body/a1/back.mp3",  text: "back"  },

  // ── A1 VIE QUOTIDIENNE — FOOD ─────────────────────────────────────────────
  { file: "food/a1/bread.mp3",     text: "bread"     },
  { file: "food/a1/rice.mp3",      text: "rice"      },
  { file: "food/a1/fruit.mp3",     text: "fruit"     },
  { file: "food/a1/vegetable.mp3", text: "vegetable" },
  { file: "food/a1/water.mp3",     text: "water"     },
  { file: "food/a1/milk.mp3",      text: "milk"      },
  { file: "food/a1/meat.mp3",      text: "meat"      },
  { file: "food/a1/fish.mp3",      text: "fish"      },
  { file: "food/a1/egg.mp3",       text: "egg"       },
  { file: "food/a1/juice.mp3",     text: "juice"     },

  // ── A2 VIE QUOTIDIENNE — HOME ─────────────────────────────────────────────
  { file: "home/a2/bedroom.mp3",     text: "bedroom"     },
  { file: "home/a2/kitchen.mp3",     text: "kitchen"     },
  { file: "home/a2/bathroom.mp3",    text: "bathroom"    },
  { file: "home/a2/living_room.mp3", text: "living room" },
  { file: "home/a2/door.mp3",        text: "door"        },
  { file: "home/a2/window.mp3",      text: "window"      },
  { file: "home/a2/bed.mp3",         text: "bed"         },
  { file: "home/a2/sofa.mp3",        text: "sofa"        },
  { file: "home/a2/floor.mp3",       text: "floor"       },
  { file: "home/a2/roof.mp3",        text: "roof"        },

  // ── A2 VIE QUOTIDIENNE — DAILY VERBS ─────────────────────────────────────
  { file: "daily_verbs/a2/eat.mp3",   text: "to eat"   },
  { file: "daily_verbs/a2/drink.mp3", text: "to drink" },
  { file: "daily_verbs/a2/sleep.mp3", text: "to sleep" },
  { file: "daily_verbs/a2/work.mp3",  text: "to work"  },
  { file: "daily_verbs/a2/play.mp3",  text: "to play"  },
  { file: "daily_verbs/a2/read.mp3",  text: "to read"  },
  { file: "daily_verbs/a2/write.mp3", text: "to write" },
  { file: "daily_verbs/a2/run.mp3",   text: "to run"   },
  { file: "daily_verbs/a2/walk.mp3",  text: "to walk"  },
  { file: "daily_verbs/a2/speak.mp3", text: "to speak" },

  // ── A2 VIE QUOTIDIENNE — ADJECTIVES ──────────────────────────────────────
  { file: "adjectives/a2/big.mp3",   text: "big"   },
  { file: "adjectives/a2/small.mp3", text: "small" },
  { file: "adjectives/a2/hot.mp3",   text: "hot"   },
  { file: "adjectives/a2/cold.mp3",  text: "cold"  },
  { file: "adjectives/a2/fast.mp3",  text: "fast"  },
  { file: "adjectives/a2/slow.mp3",  text: "slow"  },
  { file: "adjectives/a2/tall.mp3",  text: "tall"  },
  { file: "adjectives/a2/short.mp3", text: "short" },
  { file: "adjectives/a2/old.mp3",   text: "old"   },
  { file: "adjectives/a2/young.mp3", text: "young" },

  // ── A2 VIE QUOTIDIENNE — JOBS ─────────────────────────────────────────────
  { file: "jobs/a2/teacher.mp3",   text: "teacher"        },
  { file: "jobs/a2/doctor.mp3",    text: "doctor"         },
  { file: "jobs/a2/engineer.mp3",  text: "engineer"       },
  { file: "jobs/a2/nurse.mp3",     text: "nurse"          },
  { file: "jobs/a2/farmer.mp3",    text: "farmer"         },
  { file: "jobs/a2/police.mp3",    text: "police officer" },
  { file: "jobs/a2/chef.mp3",      text: "chef"           },
  { file: "jobs/a2/driver.mp3",    text: "driver"         },
  { file: "jobs/a2/student.mp3",   text: "student"        },
  { file: "jobs/a2/scientist.mp3", text: "scientist"      },

  // ── B2 GÉOGRAPHIE - VOYAGE — GEO STATISTICS ──────────────────────────────
  { file: "geo_statistics/b2/density.mp3",           text: "density" },
  { file: "geo_statistics/b2/urbanisation_rate.mp3", text: "urbanisation rate" },
  { file: "geo_statistics/b2/hdi.mp3",               text: "H D I" },
  { file: "geo_statistics/b2/gdp_per_capita.mp3",    text: "G D P per capita" },
  { file: "geo_statistics/b2/birth_rate.mp3",        text: "birth rate" },
  { file: "geo_statistics/b2/death_rate.mp3",        text: "death rate" },
  { file: "geo_statistics/b2/migration_rate.mp3",    text: "migration rate" },
  { file: "geo_statistics/b2/growth_rate.mp3",       text: "growth rate" },
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
