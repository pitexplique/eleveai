// Recalcul INDÉPENDANT des vingt corrigés de la fiche d'exercices sur les
// variations (lib/fiches-exercices/maths-premiere-variations.tsx).
//
// Même règle que pour l'exponentielle et le second degré : on ne relit pas le
// corrigé, on REFAIT le calcul par un autre chemin. Ici la dérivée annoncée est
// recalculée par TAUX D'ACCROISSEMENT — jamais en dérivant la formule à la
// main, sans quoi on ne ferait que recopier le raisonnement qu'on veut vérifier.
// Les sens de variation sont confirmés par balayage de la fonction elle-même,
// les extremums comparés à un minimum ou un maximum cherché sur une grille fine.
//
//   node scripts/verifier-exercices-variations.mjs
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
const proche = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
const grille = (min, max, pas) => {
  const g = [];
  for (let x = min; x <= max + 1e-12; x += pas) g.push(Math.round(x * 1e6) / 1e6);
  return g;
};

/** ⭐ La dérivée par TAUX D'ACCROISSEMENT : le chemin indépendant. */
const deriveeNum = (f) => (x) => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5;

/** La dérivée annoncée dans le corrigé est-elle la bonne ? */
function memeDerivee(f, fPrimeAnnoncee, pts) {
  return pts.every((x) => proche(deriveeNum(f)(x), fPrimeAnnoncee(x), 1e-4));
}

/** f est-elle croissante sur [a ; b] ? Constaté sur la FONCTION, pas sur sa dérivée. */
function croissanteSur(f, a, b, pas = 0.01) {
  for (let x = a; x + pas <= b + 1e-12; x += pas) {
    if (f(x + pas) < f(x) - 1e-9) return false;
  }
  return true;
}
function decroissanteSur(f, a, b, pas = 0.01) {
  for (let x = a; x + pas <= b + 1e-12; x += pas) {
    if (f(x + pas) > f(x) + 1e-9) return false;
  }
  return true;
}
/** Le minimum de f sur [a ; b], cherché par balayage. */
function minSur(f, a, b, pas = 0.001) {
  let m = Infinity;
  let arg = a;
  for (let x = a; x <= b + 1e-12; x += pas) {
    const v = f(x);
    if (v < m) {
      m = v;
      arg = x;
    }
  }
  return { valeur: m, x: arg };
}
function maxSur(f, a, b, pas = 0.001) {
  const r = minSur((x) => -f(x), a, b, pas);
  return { valeur: -r.valeur, x: r.x };
}
const X = grille(-6, 6, 0.25);

console.log("★ Un seul geste");
{
  const fp = (x) => 2 * x - 6;
  ok("1. f′ = 2x − 6 négative ⇔ x ≤ 3", grille(-5, 10, 0.25).every((x) => (fp(x) <= 0) === (x <= 3)));
}
{
  const f = (x) => x * x - 8 * x + 1;
  ok("2. f = x² − 8x + 1 : f′ = 2x − 8", memeDerivee(f, (x) => 2 * x - 8, X));
  const m = minSur(f, -5, 12);
  ok("2. minimum −15 atteint en 4", proche(m.valeur, -15, 1e-4) && proche(m.x, 4, 1e-2) && f(4) === -15);
  ok("2. décroît avant 4, croît après", decroissanteSur(f, -5, 4) && croissanteSur(f, 4, 12));
}
ok("3. f′ = 3x² + 2 > 0 partout", grille(-20, 20, 0.1).every((x) => 3 * x * x + 2 > 0));
{
  const fp = (x) => (x - 2) ** 2;
  ok("4. f′ = (x − 2)² ≥ 0, nulle seulement en 2", grille(-10, 10, 0.05).every((x) => fp(x) >= 0) && fp(2) === 0 && grille(-10, 10, 0.05).filter((x) => fp(x) === 0).length === 1);
  // Une primitive de (x−2)² est croissante : on le constate sur elle.
  const F = (x) => ((x - 2) ** 3) / 3;
  ok("4. une primitive est croissante sur ℝ (aucun extremum)", croissanteSur(F, -8, 8, 0.01));
}
{
  const f = () => 5;
  const g = (x) => -4 * x + 7;
  ok("5. f = 5 : dérivée nulle partout", X.every((x) => proche(deriveeNum(f)(x), 0, 1e-6)));
  ok("5. g = −4x + 7 : dérivée −4, g décroissante", memeDerivee(g, () => -4, X) && decroissanteSur(g, -10, 10));
}
ok("6. maximum 8 en x = 1 ; deux traversées de 0 (−3→8 puis 8→−2)", 8 > -3 && 8 > -2 && -3 < 0 && 8 > 0 && -2 < 0);
{
  const f = (x) => -2 * x * x + 8 * x;
  ok("7. −2x² + 8x : sommet en 2, maximum 8", proche(-8 / (2 * -2), 2) && f(2) === 8 && maxSur(f, -6, 10).valeur <= 8 + 1e-9);
  ok("7. croît avant 2, décroît après", croissanteSur(f, -6, 2) && decroissanteSur(f, 2, 10));
}
{
  // f′ positive entre −1 et 3, négative dehors : une telle f décroît, croît, décroît.
  const fp = (x) => -(x + 1) * (x - 3);
  ok("8. f′ > 0 sur ]−1 ; 3[ et < 0 dehors", grille(-6, 8, 0.05).every((x) => (fp(x) > 0) === (x > -1 && x < 3)));
}

console.log("★★ Type devoir");
{
  const f = (x) => x ** 3 - 3 * x * x - 9 * x + 5;
  ok("9. f′ = 3x² − 6x − 9 = 3(x − 3)(x + 1)", memeDerivee(f, (x) => 3 * x * x - 6 * x - 9, X) && X.every((x) => proche(3 * x * x - 6 * x - 9, 3 * (x - 3) * (x + 1))));
  ok("9. f(−1) = 10 et f(3) = −22", f(-1) === 10 && f(3) === -22);
  ok("9. croît, décroît sur [−1 ; 3], croît", croissanteSur(f, -6, -1) && decroissanteSur(f, -1, 3) && croissanteSur(f, 3, 8));
  ok("9. max local en −1, min local en 3", proche(maxSur(f, -3, 1).x, -1, 1e-2) && proche(minSur(f, 1, 5).x, 3, 1e-2));
}
{
  const f = (x) => 2 * x ** 3 - 9 * x * x + 12 * x;
  ok("10. f′ = 6x² − 18x + 12 = 6(x − 1)(x − 2)", memeDerivee(f, (x) => 6 * x * x - 18 * x + 12, X) && X.every((x) => proche(6 * x * x - 18 * x + 12, 6 * (x - 1) * (x - 2))));
  ok("10. maximum local 5 en 1, minimum local 4 en 2", f(1) === 5 && f(2) === 4 && proche(maxSur(f, 0.2, 1.8).x, 1, 1e-2) && proche(minSur(f, 1.2, 2.8).x, 2, 1e-2));
}
{
  const f = (x) => x ** 3 - 3 * x * x + 3 * x;
  ok("11. f′ = 3(x − 1)², positive et nulle seulement en 1", memeDerivee(f, (x) => 3 * (x - 1) ** 2, X) && grille(-8, 8, 0.05).every((x) => 3 * (x - 1) ** 2 >= 0));
  ok("11. f croissante sur ℝ, aucun extremum", croissanteSur(f, -8, 8, 0.01));
}
{
  const f = (x) => x ** 3 - 12 * x;
  ok("12. f′ = 3x² − 12 = 3(x − 2)(x + 2)", memeDerivee(f, (x) => 3 * x * x - 12, X) && X.every((x) => proche(3 * x * x - 12, 3 * (x - 2) * (x + 2))));
  ok("12. f(−3) = 9, f(−2) = 16, f(2) = −16, f(4) = 16", f(-3) === 9 && f(-2) === 16 && f(2) === -16 && f(4) === 16);
  const mx = maxSur(f, -3, 4);
  const mn = minSur(f, -3, 4);
  ok("12. sur [−3 ; 4] : maximum 16 (atteint deux fois), minimum −16", proche(mx.valeur, 16, 1e-4) && proche(mn.valeur, -16, 1e-4) && proche(mn.x, 2, 1e-2));
}
{
  const h = (x) => x ** 3 - 3 * x + 2;
  ok("13. h = f − g = x³ − 3x + 2 = (x − 1)²(x + 2)", X.every((x) => proche(h(x), (x - 1) ** 2 * (x + 2))));
  ok("13. h ≥ 0 ⇔ x ≥ −2", grille(-6, 6, 0.01).every((x) => (h(x) >= -1e-12) === (x >= -2 - 1e-12)));
  ok("13. tangence en 1 : h(1) = 0 sans changement de signe", h(1) === 0 && h(0.9) > 0 && h(1.1) > 0);
  ok("13. traversée en −2 : h change de signe", h(-2) === 0 && h(-2.1) < 0 && h(-1.9) > 0);
}
{
  const h = (x) => x ** 3 - 3 * x + 4;
  ok("14. h′ = 3(x − 1)(x + 1)", memeDerivee(h, (x) => 3 * (x - 1) * (x + 1), X));
  const m = minSur(h, 0, 30);
  ok("14. minimum de h sur [0 ; +∞[ vaut 2, en x = 1", h(1) === 2 && proche(m.valeur, 2, 1e-4) && proche(m.x, 1, 1e-2));
  ok("14. donc x³ + 4 ≥ 3x pour tout x ≥ 0", grille(0, 50, 0.01).every((x) => x ** 3 + 4 >= 3 * x - 1e-9));
}
{
  const fp = (x) => (x - 4) * (x * x + 1);
  ok("15. x² + 1 > 0 partout, donc signe de f′ = signe de (x − 4)", grille(-20, 20, 0.1).every((x) => x * x + 1 > 0 && (fp(x) > 0) === (x > 4) && (fp(x) < 0) === (x < 4)));
}

console.log("★★★ Problèmes");
{
  const V = (x) => x * (12 - 2 * x) ** 2;
  ok("16a. x ∈ ]0 ; 6[", 12 - 2 * 6 === 0 && 12 - 2 * 5.999 > 0);
  ok("16b. V(x) = x(12 − 2x)² = 4x³ − 48x² + 144x", grille(0, 6, 0.05).every((x) => proche(V(x), 4 * x ** 3 - 48 * x * x + 144 * x)));
  ok("16c. V′ = 12(x − 2)(x − 6)", memeDerivee(V, (x) => 12 * (x - 2) * (x - 6), grille(0.2, 5.8, 0.2)));
  const m = maxSur(V, 0.001, 5.999);
  ok("16c. maximum 128 cm³ en x = 2", V(2) === 128 && proche(m.valeur, 128, 1e-4) && proche(m.x, 2, 1e-2));
}
{
  const A = (x) => x * (40 - 2 * x);
  ok("17a. A(x) = x(40 − 2x), étude sur ]0 ; 20[", grille(0, 20, 0.5).every((x) => proche(A(x), 40 * x - 2 * x * x)) && 40 - 2 * 20 === 0);
  ok("17a. le grillage boucle : 2x + (40 − 2x) = 40", grille(1, 19, 1).every((x) => 2 * x + (40 - 2 * x) === 40));
  ok("17b. A′ = 40 − 4x", memeDerivee(A, (x) => 40 - 4 * x, grille(0.5, 19.5, 0.5)));
  const m = maxSur(A, 0.001, 19.999);
  ok("17b. maximum 200 m² pour x = 10, longueur 20", A(10) === 200 && proche(m.valeur, 200, 1e-4) && proche(m.x, 10, 1e-2) && 40 - 2 * 10 === 20);
}
{
  const C = (x) => x * x + 20 * x + 300;
  const B = (x) => 80 * x - C(x);
  ok("18a. B(x) = −x² + 60x − 300", grille(0, 60, 1).every((x) => proche(B(x), -x * x + 60 * x - 300)));
  ok("18b. B′ = −2x + 60", memeDerivee(B, (x) => -2 * x + 60, grille(1, 59, 1)));
  const m = maxSur(B, 0, 60);
  ok("18b. bénéfice maximal 600 € pour 30 tee-shirts", B(30) === 600 && proche(m.valeur, 600, 1e-4) && proche(m.x, 30, 1e-2));
  const d = 60 * 60 - 4 * -1 * -300;
  const r1 = (-60 + Math.sqrt(d)) / -2;
  const r2 = (-60 - Math.sqrt(d)) / -2;
  ok("18c. Δ = 2400, racines ≈ 5,5 et ≈ 54,5", d === 2400 && proche(Math.min(r1, r2), 5.505, 1e-2) && proche(Math.max(r1, r2), 54.494, 1e-2));
  ok("18c. B > 0 entre les racines : dès 6 tee-shirts, jusqu'à 54", B(5) < 0 && B(6) > 0 && B(54) > 0 && B(55) < 0);
}
{
  const f = (x) => x ** 3 - 6 * x * x + 9 * x;
  ok("19a. f′ = 3(x − 1)(x − 3)", memeDerivee(f, (x) => 3 * (x - 1) * (x - 3), X));
  ok("19a. f(1) = 4 (max local), f(3) = 0 (min local)", f(1) === 4 && f(3) === 0 && croissanteSur(f, -3, 1) && decroissanteSur(f, 1, 3) && croissanteSur(f, 3, 8));
  const h = (x) => f(x) - 9 * x;
  ok("19b. h = x²(x − 6)", X.every((x) => proche(h(x), x * x * (x - 6))));
  ok("19b. signe de h = signe de (x − 6)", grille(-6, 12, 0.01).every((x) => (h(x) > 1e-12) === (x > 6)));
  ok("19c. rencontres en 0 (tangence) et 6 (traversée, point (6 ; 54))", h(0) === 0 && h(6) === 0 && h(-0.5) < 0 && h(0.5) < 0 && h(5.9) < 0 && h(6.1) > 0 && f(6) === 54 && 9 * 6 === 54);
}
{
  // f′ est la parabole de racines −2 et 4, de sommet (1 ; −9) : f′(x) = (x + 2)(x − 4).
  const fp = (x) => (x + 2) * (x - 4);
  ok("20. la parabole de racines −2 et 4 a bien pour sommet (1 ; −9)", proche(-(-2) / 2, 1) && fp(1) === -9);
  ok("20a. f′ > 0 hors [−2 ; 4], < 0 entre", grille(-4, 6, 0.05).every((x) => (fp(x) > 0) === (x < -2 || x > 4)));
  ok("20c. f′(1) = −9 ≠ 0 : aucun extremum en 1", fp(1) !== 0);
  ok("20d. le maximum local est en −2 (f′ y change de + à −)", fp(-2.1) > 0 && fp(-1.9) < 0);
}

console.log("Le texte de la fiche");
const source = fs.readFileSync(
  path.join(RACINE, "lib", "fiches-exercices", "maths-premiere-variations.tsx"),
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
const toutesVar = [...microSkills.matchAll(/id: "(var_[a-z_]+)"/g)].map((m) => m[1]);
const sansExercice = toutesVar.filter((id) => !micros.has(id));
ok(`les ${toutesVar.length} micros des variations ont chacune un exercice`, sansExercice.length === 0, sansExercice.join(", "));

/* ─── Les tableaux DESSINÉS des corrigés (ajoutés le 17/09/2026) ──────────────
 * ⛔ Un canvas de tableau de variations DÉDUIT ses flèches en comparant les
 * valeurs successives. Une valeur que `Number()` ne sait pas lire devient NaN,
 * et NaN ne compare jamais vrai : toutes les flèches partent alors vers le bas,
 * sans erreur visible. On relit donc ici chaque tableau écrit dans la fiche et
 * l'on vérifie que le signe annoncé et le sens de la flèche disent la MÊME
 * chose. C'est ce contrôle qui a trouvé l'infini illisible du canvas. */
console.log("Les tableaux dessinés des corrigés");
const lire = (t) => {
  const net = String(t).replace(/−/g, "-").replace(/\s| /g, "").replace(",", ".");
  if (/^\+?∞$/.test(net)) return Infinity;
  if (/^-∞$/.test(net)) return -Infinity;
  return Number(net);
};
const appels = [...source.matchAll(/schema: tableau(Variations|Signes)\(([\s\S]*?)\),\n/g)];
ok(`${appels.length} tableaux dessinés dans les corrigés`, appels.length >= 8, `${appels.length}`);
let tableauxJustes = 0;
for (const [, type, args] of appels) {
  // Les trois tableaux d'arguments de l'appel, dans l'ordre.
  // ⛔ Ne pas découper sur les virgules : « "34,5" » est UNE valeur, et un
  // `split(",")` en faisait deux — le script criait au tableau mal dimensionné
  // sur une donnée juste. On lit donc les chaînes entre guillemets d'un bloc.
  const listes = [...args.matchAll(/\[([^\]]*)\]/g)].map((m) =>
    [...m[1].matchAll(/"[^"]*"|[^,\s]+/g)].map((x) => x[0].replace(/^["']|["']$/g, "")),
  );
  if (type === "Signes") {
    const [bornes, signes] = [listes[0], listes[1]];
    if (!bornes || !signes) continue;
    ok(`  signes : ${signes.length} signes pour ${bornes.length} bornes`, signes.length === bornes.length - 1, args.slice(0, 50));
    tableauxJustes++;
    continue;
  }
  const [bornes, signes, valeurs] = listes;
  if (!bornes || !signes || !valeurs) continue;
  ok(`  variations : ${valeurs.length} valeurs pour ${bornes.length} bornes`, valeurs.length === bornes.length, args.slice(0, 50));
  const lues = valeurs.map(lire);
  ok(`  variations : toutes les valeurs sont lisibles (${valeurs.join(" ")})`, lues.every((v) => !Number.isNaN(v)), valeurs.join(" "));
  // ⭐ Le cœur du contrôle : un « + » doit produire une flèche qui MONTE.
  const accord = signes.every((s, i) => (s === "+" ? lues[i + 1] > lues[i] : lues[i + 1] < lues[i]));
  ok(`  variations : les flèches suivent les signes (${signes.join(" ")})`, accord, `${valeurs.join(" → ")}`);
  tableauxJustes++;
}
ok(`${tableauxJustes} tableaux relus`, tableauxJustes === appels.length);

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");
process.exitCode = erreurs ? 1 : 0;
