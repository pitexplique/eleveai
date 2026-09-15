// Recalcul INDÉPENDANT des vingt corrigés de la fiche d'exercices du second
// degré (lib/fiches-exercices/maths-premiere-second-degre.tsx).
//
// Même règle que pour l'exponentielle : on ne relit pas le corrigé, on REFAIT
// le calcul par un autre chemin — les racines annoncées sont réinjectées dans
// le trinôme, les inéquations sont testées sur une grille, les formes
// canoniques et factorisées sont développées en une centaine de points, les
// extremums sont comparés à un balayage.
//
//   node scripts/verifier-exercices-second-degre.mjs
//
// Sort en code 1 à la première divergence. Vérifie aussi que chaque `$` est
// apparié dans les textes et que chaque micro citée existe dans microSkills.ts.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");

let erreurs = 0;
function ok(nom, condition, detail = "") {
  if (condition) console.log(`  ✓ ${nom}`);
  else {
    erreurs++;
    console.log(`  ✗ ${nom}${detail ? " — " + detail : ""}`);
  }
}
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
const grille = (min, max, pas) => {
  const g = [];
  for (let x = min; x <= max + 1e-12; x += pas) g.push(Math.round(x * 1e6) / 1e6);
  return g;
};
const memeFonction = (f, g, pts) => pts.every((x) => proche(f(x), g(x), 1e-9));
/** Le trinôme ax² + bx + c. */
const tri = (a, b, c) => (x) => a * x * x + b * x + c;
const delta = (a, b, c) => b * b - 4 * a * c;
/** Les racines par la formule, triées — ou [] si Δ < 0. */
function racines(a, b, c) {
  const d = delta(a, b, c);
  if (d < 0) return [];
  const r = Math.sqrt(d);
  return [...new Set([(-b - r) / (2 * a), (-b + r) / (2 * a)])].sort((u, v) => u - v);
}
/** Les racines cherchées AUTREMENT : par changement de signe ou tangence sur une grille fine. */
function racinesParBalayage(f, min = -20, max = 20, pas = 0.001) {
  const out = [];
  let prev = f(min);
  for (let x = min + pas; x <= max; x += pas) {
    const v = f(x);
    if (Math.abs(v) < 1e-9) out.push(Math.round(x * 1000) / 1000);
    else if (prev * v < 0) out.push(Math.round((x - pas / 2) * 1000) / 1000);
    prev = v;
  }
  return [...new Set(out.map((x) => Math.round(x * 100) / 100))];
}
const X = grille(-10, 10, 0.5);

console.log("★ Un seul geste");
ok("1. 3x² − 5x + 2 : a = 3, b = −5, c = 2", memeFonction(tri(3, -5, 2), (x) => 3 * x * x - 5 * x + 2, X));
ok("2. Δ(x² + 4x − 5) = 36", delta(1, 4, -5) === 36);
ok("3. Δ(2x² − 4x + 3) = −8, aucune racine", delta(2, -4, 3) === -8 && racinesParBalayage(tri(2, -4, 3)).length === 0);
ok("4. x² − 3x − 10 : racines −2 et 5", JSON.stringify(racines(1, -3, -10)) === "[-2,5]" && tri(1, -3, -10)(-2) === 0 && tri(1, -3, -10)(5) === 0);
ok("5. x² + 6x + 9 : Δ = 0, racine double −3, = (x+3)²", delta(1, 6, 9) === 0 && racines(1, 6, 9)[0] === -3 && memeFonction(tri(1, 6, 9), (x) => (x + 3) ** 2, X));
ok("6. x² − 2x + 7 : Δ = −24, aucune racine", delta(1, -2, 7) === -24 && racinesParBalayage(tri(1, -2, 7)).length === 0);
ok("7. 3(x − 1)(x + 4) s'annule en 1 et −4 seulement", JSON.stringify(racinesParBalayage((x) => 3 * (x - 1) * (x + 4))) === "[-4,1]");
const f8 = (x) => 2 * (x - 3) ** 2 + 1;
ok("8. 2(x − 3)² + 1 : minimum 1 en x = 3", f8(3) === 1 && X.every((x) => f8(x) >= 1));

console.log("★★ Type devoir");
ok("9. 2x² + 5x − 3 : racines −3 et 0,5", JSON.stringify(racines(2, 5, -3)) === "[-3,0.5]" && tri(2, 5, -3)(-3) === 0 && tri(2, 5, -3)(0.5) === 0);
ok("10. x² − x − 12 = (x + 3)(x − 4)", memeFonction(tri(1, -1, -12), (x) => (x + 3) * (x - 4), X));
ok("11. 3x² + 6x − 9 : f(1) = 0, autre racine −3, = 3(x − 1)(x + 3)", tri(3, 6, -9)(1) === 0 && tri(3, 6, -9)(-3) === 0 && memeFonction(tri(3, 6, -9), (x) => 3 * (x - 1) * (x + 3), X) && -9 / 3 === -3 && -6 / 3 === -2);
ok("12. somme 7, produit 10 : 2 et 5", 2 + 5 === 7 && 2 * 5 === 10 && JSON.stringify(racines(1, -7, 10)) === "[2,5]");
const f13 = tri(1, 4, -1);
ok("13. x² + 4x − 1 = (x + 2)² − 5, minimum −5 en −2", memeFonction(f13, (x) => (x + 2) ** 2 - 5, X) && f13(-2) === -5 && X.every((x) => f13(x) >= -5));
const f14 = tri(2, -8, 6);
ok("14. 2x² − 8x + 6 : racines 1 et 3, > 0 dehors, < 0 entre", JSON.stringify(racines(2, -8, 6)) === "[1,3]" && X.every((x) => (x < 1 || x > 3 ? f14(x) > 0 : x > 1 && x < 3 ? f14(x) < 0 : f14(x) === 0)));
ok("15. x² − 4x − 5 ≤ 0 ⇔ x ∈ [−1 ; 5]", X.every((x) => (tri(1, -4, -5)(x) <= 0) === (x >= -1 && x <= 5)));
ok("16. −x² + 2x + 8 < 0 ⇔ x < −2 ou x > 4", X.every((x) => (tri(-1, 2, 8)(x) < 0) === (x < -2 || x > 4)));

console.log("★★★ Problèmes");
const h = tri(-5, 20, 25);
ok("17a. h(0) = 25", h(0) === 25);
ok("17b. h(t) = 0 en t = 5 (et −1, rejeté)", JSON.stringify(racines(-5, 20, 25)) === "[-1,5]" && h(5) === 0);
ok("17c. h(t) = −5(t − 2)² + 45, maximum 45 en t = 2", memeFonction(h, (t) => -5 * (t - 2) ** 2 + 45, X) && h(2) === 45 && grille(0, 5, 0.01).every((t) => h(t) <= 45 + 1e-9));
const A = (x) => x * (40 - 2 * x);
ok("18a. A(x) = x(40 − 2x) = −2x² + 40x", memeFonction(A, tri(-2, 40, 0), X));
ok("18b. A(x) = −2(x − 10)² + 200, maximum 200 en x = 10", memeFonction(A, (x) => -2 * (x - 10) ** 2 + 200, X) && A(10) === 200 && grille(0, 20, 0.01).every((x) => A(x) <= 200 + 1e-9));
ok("18c. A(x) ≥ 150 ⇔ x ∈ [5 ; 15] (sur ]0 ; 20[)", grille(0.01, 19.99, 0.01).every((x) => (A(x) >= 150 - 1e-9) === (x >= 5 - 1e-9 && x <= 15 + 1e-9)) && delta(1, -20, 75) === 100);
const P = tri(1, 1, -2);
const d = (x) => 3 * x + 1;
ok("19a. P et d se coupent en (−1 ; −2) et (3 ; 10)", P(-1) === -2 && d(-1) === -2 && P(3) === 10 && d(3) === 10 && JSON.stringify(racinesParBalayage((x) => P(x) - d(x))) === "[-1,3]");
ok("19b. y = 3x + k tangente ⇔ k = −3 (Δ = 12 + 4k), en x = 1", 12 + 4 * -3 === 0 && racinesParBalayage((x) => P(x) - (3 * x - 3)).length === 1 && P(1) === 3 * 1 - 3 && grille(-4, -2, 0.5).every((k) => (racinesParBalayage((x) => P(x) - (3 * x + k)).length === 2) === (k > -3)));
ok("20a. Δ(x² − 6x + m) = 36 − 4m", grille(-10, 20, 1).every((m) => delta(1, -6, m) === 36 - 4 * m));
ok("20b/c/d. deux racines ⇔ m < 9 ; m = 9 → racine 3 = (x−3)² ; aucune ⇔ m > 9", grille(-10, 20, 0.5).every((m) => racines(1, -6, m).length === (m < 9 ? 2 : m === 9 ? 1 : 0)) && racines(1, -6, 9)[0] === 3 && memeFonction(tri(1, -6, 9), (x) => (x - 3) ** 2, X));

console.log("Le texte de la fiche");
const source = fs.readFileSync(
  path.join(RACINE, "lib", "fiches-exercices", "maths-premiere-second-degre.tsx"),
  "utf8",
);
const chaines = source.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
const impaires = chaines.filter((c) => (c.match(/\$/g) ?? []).length % 2 === 1);
ok(`dollars appariés dans ${chaines.length} chaînes`, impaires.length === 0, impaires.slice(0, 3).join(" | "));
const nbEnonces = (source.match(/^\s*enonce:/gm) ?? []).length;
ok("20 énoncés, 20 corrigés", nbEnonces === 20 && (source.match(/^\s*correction:/gm) ?? []).length === 20, `${nbEnonces}`);
const micros = new Set(
  [...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => m[1].match(/"([^"]+)"/g).map((s) => s.slice(1, -1))),
);
const microSkills = fs.readFileSync(
  path.join(RACINE, "lib", "tutor-v4", "knowledge", "maths", "premiere-spe", "microSkills.ts"),
  "utf8",
);
const inconnues = [...micros].filter((id) => !microSkills.includes(`id: "${id}"`));
ok(`${micros.size} micros citées, toutes connues du coach`, inconnues.length === 0, inconnues.join(", "));
// Les onze micros du second degré ont chacune au moins un exercice.
const toutesSd = [...microSkills.matchAll(/id: "(sd_[a-z_]+)"/g)].map((m) => m[1]);
const sansExercice = toutesSd.filter((id) => !micros.has(id));
ok(`les ${toutesSd.length} micros du second degré ont chacune un exercice`, sansExercice.length === 0, sansExercice.join(", "));

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");
process.exitCode = erreurs ? 1 : 0;
