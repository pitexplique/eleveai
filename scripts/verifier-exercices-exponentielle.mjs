// Recalcul INDÉPENDANT des vingt corrigés de la fiche d'exercices de
// l'exponentielle (lib/fiches-exercices/maths-premiere-exponentielle.tsx).
//
// La règle du coach vaut pour une feuille écrite à la main : on ne relit pas le
// corrigé, on REFAIT le calcul par un autre chemin — valeurs numériques, racines
// cherchées sur une grille, dérivées par taux d'accroissement — et on compare.
// Un corrigé faux sur une feuille destinée à un élève moyen est le pire défaut
// possible : c'est précisément celui qui ne verra pas l'erreur.
//
//   node scripts/verifier-exercices-exponentielle.mjs
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
/** Dérivée numérique centrée. */
const derivee = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Une grille de réels pour tester une égalité de fonctions ou une inéquation. */
const grille = (min, max, pas) => {
  const g = [];
  for (let x = min; x <= max + 1e-12; x += pas) g.push(Math.round(x * 1e6) / 1e6);
  return g;
};
/** Vrai si f et g coïncident sur toute la grille. */
const memeFonction = (f, g, pts) => pts.every((x) => proche(f(x), g(x), 1e-7));
/** Vrai si la dérivée numérique de f est g sur toute la grille. */
const memeDerivee = (f, g, pts) => pts.every((x) => proche(derivee(f, x), g(x), 1e-5));

const E = Math.E;
const X = grille(-4, 4, 0.25);

console.log("★ Un seul geste");
ok("1. e^4 × e^-7 = e^-3", proche(E ** 4 * E ** -7, E ** -3));
ok("2. e^{5x}/e^{2x} = e^{3x}", memeFonction((x) => E ** (5 * x) / E ** (2 * x), (x) => E ** (3 * x), X));
ok("3. (e^{3x})^2 × e^{-x} = e^{5x}", memeFonction((x) => (E ** (3 * x)) ** 2 * E ** -x, (x) => E ** (5 * x), X));
ok("4. e^2 × e / e^-1 = e^4", proche((E ** 2 * E) / E ** -1, E ** 4));
ok("5. e^{-x} > 0 pour x > 0", grille(0.01, 20, 0.5).every((x) => E ** -x > 0));
ok("5. e^-1 ≈ 0,37", Math.round(E ** -1 * 100) / 100 === 0.37);
ok("6. e^-1 < e^0,5, et 0,37 < 1,65", E ** -1 < E ** 0.5 && Math.round(E ** 0.5 * 100) / 100 === 1.65);
ok("7. x = 8 : e^{x-3} = e^5", proche(E ** (8 - 3), E ** 5));
ok("8. x = 0 est LA solution de e^{2x} = 1", proche(E ** 0, 1) && X.filter((x) => proche(E ** (2 * x), 1, 1e-9)).length === 1);

console.log("★★ Type devoir");
ok("9. x = -3 : e^{3x+1} = e^{x-5}", proche(E ** (3 * -3 + 1), E ** (-3 - 5)));
ok("9. et c'est la seule solution (affine)", 3 * -3 + 1 === -3 - 5 && 3 !== 1);
ok("10. x = 3 : e^{x+1} = e × e^{2x-3}", proche(E ** (3 + 1), E * E ** (2 * 3 - 3)));
ok("11. x = 1 et x = 2 : e^{x²} = e^{3x-2}", proche(E ** 1, E ** (3 - 2)) && proche(E ** 4, E ** (6 - 2)));
ok("11. Δ = 1, pas d'autre racine", (-3) ** 2 - 4 * 2 === 1 && (3 - 1) / 2 === 1 && (3 + 1) / 2 === 2);
ok("12. e^{2x-1} ≥ e^{5-x} ⇔ x ≥ 2", X.every((x) => (E ** (2 * x - 1) >= E ** (5 - x)) === x >= 2));
ok("13. e^{-3x+1} < e^4 ⇔ x > -1", X.every((x) => (E ** (-3 * x + 1) < E ** 4) === x > -1));
ok("14. (2x+8)e^x = 0 ⇔ x = -4", X.every((x) => proche((2 * x + 8) * E ** x, 0, 1e-12) === (x === -4)));
ok("15. (e^{-2t})' = -2e^{-2t}", memeDerivee((t) => E ** (-2 * t), (t) => -2 * E ** (-2 * t), X));
ok("15. (50e^{0,1t})' = 5e^{0,1t}", memeDerivee((t) => 50 * E ** (0.1 * t), (t) => 5 * E ** (0.1 * t), X));
ok("16. ((x+3)e^x)' = (x+4)e^x", memeDerivee((x) => (x + 3) * E ** x, (x) => (x + 4) * E ** x, X));

console.log("★★★ Problèmes");
const f17 = (x) => (2 * x + 4) * E ** -x;
const f17p = (x) => -2 * (x + 1) * E ** -x;
ok("17a. f' = -2(x+1)e^{-x}", memeDerivee(f17, f17p, X));
ok("17b. f' > 0 avant -1, < 0 après", X.every((x) => (x < -1 ? f17p(x) > 0 : x > -1 ? f17p(x) < 0 : proche(f17p(x), 0))));
ok("17c/d. maximum f(-1) = 2e ≈ 5,44", proche(f17(-1), 2 * E) && Math.round(2 * E * 100) / 100 === 5.44 && X.every((x) => f17(x) <= f17(-1) + 1e-12));
const f18 = (x) => (x - 3) * E ** x;
const f18p = (x) => (x - 2) * E ** x;
ok("18a. f' = (x-2)e^x", memeDerivee(f18, f18p, X));
ok("18b. minimum f(2) = -e² ≈ -7,39", proche(f18(2), -(E ** 2)) && Math.round(-(E ** 2) * 100) / 100 === -7.39 && X.every((x) => f18(x) >= f18(2) - 1e-12));
ok("18c. f(0) = -3 > f(2) : f a diminué", f18(0) === -3 && f18(0) > f18(2));
const T = (t) => 25 + 70 * E ** (-0.2 * t);
ok("19a. T(0) = 95", T(0) === 95);
ok("19b. T' = -14e^{-0,2t} < 0", memeDerivee(T, (t) => -14 * E ** (-0.2 * t), grille(0, 60, 1)) && grille(0, 60, 1).every((t) => -14 * E ** (-0.2 * t) < 0));
// ⚠️ On teste le TERME 70e^{-0,2t}, comme le fait le corrigé, et non « T(t) > 25 » :
// à t = 200, 70e^{-40} ≈ 3·10^-16 et 25 + 3·10^-16 vaut exactement 25 en flottant.
// Le premier essai disait faux sur une inégalité vraie — l'instrument, pas les maths.
ok("19c. T - 25 = 70e^{-0,2t} > 0 toujours", grille(0, 200, 1).every((t) => 70 * E ** (-0.2 * t) > 0));
ok("19d. T(10) ≈ 34,5 et e^-2 ≈ 0,135", Math.round(T(10) * 10) / 10 === 34.5 && Math.round(E ** -2 * 1000) / 1000 === 0.135);
const N = (t) => 200 * E ** (0.5 * t);
ok("20a. N(0) = 200, N(2) ≈ 544", N(0) === 200 && Math.round(N(2)) === 544);
ok("20b. N' = 100e^{0,5t} > 0", memeDerivee(N, (t) => 100 * E ** (0.5 * t), grille(0, 10, 0.25)));
ok("20c. v_{n+1}/v_n = e^{0,5} pour n = 0..20", grille(0, 20, 1).every((n) => proche(N(n + 1) / N(n), E ** 0.5)));
ok("20d. e^{0,5} ≈ 1,65 et 1,65² ≈ 2,72", Math.round(E ** 0.5 * 100) / 100 === 1.65 && Math.round(1.65 ** 2 * 100) / 100 === 2.72);

console.log("Le texte de la fiche");
const source = fs.readFileSync(
  path.join(RACINE, "lib", "fiches-exercices", "maths-premiere-exponentielle.tsx"),
  "utf8",
);
// Chaque chaîne littérale doit avoir un nombre pair de `$` : un dollar orphelin
// rend la formule en clair (TexteMath le tolère, l'élève le voit).
const chaines = source.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
const impaires = chaines.filter((c) => (c.match(/\$/g) ?? []).length % 2 === 1);
ok(`dollars appariés dans ${chaines.length} chaînes`, impaires.length === 0, impaires.slice(0, 3).join(" | "));
// Vingt exercices, pas dix-neuf.
const nbEnonces = (source.match(/^\s*enonce:/gm) ?? []).length;
ok("20 énoncés, 20 corrigés", nbEnonces === 20 && (source.match(/^\s*correction:/gm) ?? []).length === 20, `${nbEnonces}`);
// Les micros citées existent dans la banque de connaissances.
const micros = new Set(
  [...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => m[1].match(/"([^"]+)"/g).map((s) => s.slice(1, -1))),
);
const microSkills = fs.readFileSync(
  path.join(RACINE, "lib", "tutor-v4", "knowledge", "maths", "premiere-spe", "microSkills.ts"),
  "utf8",
);
const inconnues = [...micros].filter((id) => !microSkills.includes(`id: "${id}"`));
ok(`${micros.size} micros citées, toutes connues du coach`, inconnues.length === 0, inconnues.join(", "));

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");
process.exitCode = erreurs ? 1 : 0;
