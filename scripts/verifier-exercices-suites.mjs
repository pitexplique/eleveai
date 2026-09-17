// Recalcul INDÉPENDANT des vingt corrigés de la fiche d'exercices sur les
// suites (lib/fiches-exercices/maths-premiere-suites.tsx).
//
// Même règle que pour les trois feuilles précédentes : on ne relit pas le
// corrigé, on REFAIT le calcul par un autre chemin. Ici les suites sont
// SIMULÉES terme à terme — jamais par la formule annoncée, sans quoi on ne
// ferait que recopier le raisonnement qu'on veut vérifier. Les sommes sont
// additionnées une à une, les seuils atteints par boucle.
//
//   node scripts/verifier-exercices-suites.mjs
//
// Vérifie aussi que chaque `$` est apparié, que les micros citées existent, et
// que les frises dessinées dans les corrigés portent les VRAIS termes.

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
/** Un nombre écrit à la française : « 47,5 » vaut 47.5. */
const fr = (t) => Number(String(t).replace(",", ".").replace("−", "-"));

/** Simule une suite par récurrence et rend ses n premiers termes. */
function parRecurrence(u0, pas, n) {
  const out = [u0];
  let u = u0;
  for (let k = 0; k < n; k++) {
    u = pas(u);
    out.push(u);
  }
  return out;
}
/** Somme d'une suite arithmétique, additionnée terme à terme. */
function sommeArith(u0, r, rangFinal) {
  let s = 0;
  for (let k = 0; k <= rangFinal; k++) s += u0 + k * r;
  return s;
}
/** Rang à partir duquel la suite géométrique dépasse le seuil. */
function rangSeuil(u0, q, seuil) {
  let u = u0;
  let k = 0;
  while (u <= seuil && k < 1000) {
    u *= q;
    k++;
  }
  return k;
}

console.log("★ Un seul geste");
{
  const u = (n) => 3 * n + 5;
  ok("1. u(n) = 3n + 5 : u0 = 5, u1 = 8, u10 = 35", u(0) === 5 && u(1) === 8 && u(10) === 35);
}
{
  const t = parRecurrence(2, (x) => 3 * x - 1, 3);
  ok("2. u0 = 2, u(n+1) = 3u(n) − 1 : 2, 5, 14, 41", JSON.stringify(t) === "[2,5,14,41]", t.join(" "));
}
{
  const u = (n) => 4 * n - 7;
  const d = [0, 1, 5, 20].map((n) => u(n + 1) - u(n));
  ok("3. u(n) = 4n − 7 : différence constante 4, u0 = −7", d.every((x) => x === 4) && u(0) === -7);
}
{
  const u = (n) => 5 * 2 ** n;
  const q = [0, 1, 4, 9].map((n) => u(n + 1) / u(n));
  ok("4. u(n) = 5×2^n : quotient constant 2, u0 = 5", q.every((x) => x === 2) && u(0) === 5);
  ok("4. frise 5, 10, 20, 40, 80", JSON.stringify([0, 1, 2, 3, 4].map(u)) === "[5,10,20,40,80]");
}
{
  const u = (n) => -3 * n + 10;
  ok("5. u(n) = −3n + 10 : décroissante (différence −3)", [0, 3, 9].every((n) => u(n + 1) - u(n) === -3));
}
{
  const u = (n) => 100 + 15 * n;
  const rec = parRecurrence(100, (x) => x + 15, 3);
  ok("6. les deux écritures donnent la même suite", JSON.stringify(rec) === JSON.stringify([0, 1, 2, 3].map(u)) && rec[0] === 100);
  ok("6. frise 100, 115, 130, 145", JSON.stringify(rec) === "[100,115,130,145]");
}
{
  const v = 200 * 1.08 ** 3;
  ok("7. 200 € à +8 % pendant 3 ans ≈ 251,94 €", proche(Math.round(v * 100) / 100, 251.94, 1e-9), String(v));
  ok("7. et ce n'est PAS 248 € (trois fois 8 % de 200)", Math.round(v * 100) / 100 !== 200 + 3 * 16);
}
{
  let s = 0;
  for (let k = 1; k <= 50; k++) s += k;
  ok("8. 1 + 2 + … + 50 = 1275", s === 1275 && (50 * 51) / 2 === s);
}

console.log("★★ Type devoir");
{
  const u = (n) => 7 - 2 * n;
  ok("9. u(n) = 7 − 2n : différence −2, u0 = 7", [0, 2, 7].every((n) => u(n + 1) - u(n) === -2) && u(0) === 7);
}
{
  const u = (n) => 3 * 4 ** n;
  ok("10. u(n) = 3×4^n : quotient 4, u0 = 3", [0, 1, 3].every((n) => u(n + 1) / u(n) === 4) && u(0) === 3);
}
{
  ok("11. u0 = 5, r = 3 : somme jusqu'à u20 = 735 (21 termes)", sommeArith(5, 3, 20) === 735 && 5 + 20 * 3 === 65);
  ok("11. et compter 20 termes donnerait un autre résultat", sommeArith(5, 3, 19) !== 735);
}
{
  let s = 0;
  for (let k = 0; k <= 10; k++) s += 2 ** k;
  ok("12. 1 + 2 + … + 2^10 = 2047 (11 termes)", s === 2047 && s === 2 ** 11 - 1);
}
{
  const u = (n) => n * n - 6 * n;
  const d = [0, 1, 2, 3, 4].map((n) => u(n + 1) - u(n));
  ok("13. u(n) = n² − 6n : différence 2n − 5", d.every((x, n) => x === 2 * n - 5), d.join(" "));
  const vals = [0, 1, 2, 3, 4, 5].map(u);
  ok("13. minimum −9 au rang 3 ; frise 0, −5, −8, −9, −8, −5", Math.min(...vals) === -9 && u(3) === -9 && JSON.stringify(vals) === "[0,-5,-8,-9,-8,-5]");
}
{
  const n = rangSeuil(1000, 1.05, 2000);
  ok("14. 1000 € à 5 % dépasse 2000 € au rang 15", n === 15, String(n));
  ok("14. et pas au rang 14", 1000 * 1.05 ** 14 < 2000 && 1000 * 1.05 ** 15 > 2000);
  ok("14. valeurs annoncées ≈ 1979,93 puis ≈ 2078,93", proche(Math.round(1000 * 1.05 ** 14 * 100) / 100, 1979.93, 1e-9) && proche(Math.round(1000 * 1.05 ** 15 * 100) / 100, 2078.93, 1e-9));
}
{
  ok("15a. 250 + 30n : 400 membres dans 5 ans", 250 + 30 * 5 === 400);
  ok("15b. 250 × 1,12^5 ≈ 441 membres", Math.round(250 * 1.12 ** 5) === 441, String(250 * 1.12 ** 5));
}

console.log("★★★ Problèmes");
{
  // ⭐ La suite auxiliaire : on SIMULE u, et l'on vérifie que la formule colle.
  const t = parRecurrence(10, (x) => 0.8 * x + 6, 4);
  ok("16a. u1 = 14 et u2 = 17,2", proche(t[1], 14) && proche(t[2], 17.2), t.join(" "));
  const v = t.map((x) => x - 30);
  ok("16b. v(n) = u(n) − 30 est géométrique de raison 0,8", v.slice(0, -1).every((x, i) => proche(v[i + 1] / x, 0.8)));
  ok("16b. v0 = −20", v[0] === -20);
  const formule = (n) => -20 * 0.8 ** n + 30;
  ok("16c. u(n) = −20×0,8^n + 30 colle à la récurrence", t.every((x, n) => proche(x, formule(n))));
  let u = 10;
  for (let k = 0; k < 300; k++) u = 0.8 * u + 6;
  ok("16d. la suite s'approche de 30", proche(u, 30, 1e-9), String(u));
}
{
  ok("17a. raison 1,06", proche(1 + 6 / 100, 1.06));
  ok("17b. 800 × 1,06^10 ≈ 1433 oiseaux", Math.round(800 * 1.06 ** 10) === 1433, String(800 * 1.06 ** 10));
  const n = rangSeuil(800, 1.06, 1500);
  ok("17c. dépasse 1500 au rang 11", n === 11 && Math.round(800 * 1.06 ** 11) === 1519, `${n} · ${800 * 1.06 ** 11}`);
}
{
  const a = (n) => 15 + 2 * n;
  const b = (n) => 10 * 1.1 ** n;
  ok("18b. au mois 12 : A = 39 € et B ≈ 31,38 €", a(12) === 39 && proche(Math.round(b(12) * 100) / 100, 31.38, 1e-9));
  ok("18c. B dépasse A au mois 17, pas au 16", b(16) < a(16) && b(17) > a(17), `${b(16)} / ${a(16)} · ${b(17)} / ${a(17)}`);
  ok("18c. valeurs annoncées ≈ 45,95 et ≈ 50,54", proche(Math.round(b(16) * 100) / 100, 45.95, 1e-9) && proche(Math.round(b(17) * 100) / 100, 50.54, 1e-9));
}
{
  ok("19a. 20e case = 2^19 = 524 288 grains", 2 ** 19 === 524288);
  let s = 0;
  for (let k = 0; k <= 19; k++) s += 2 ** k;
  ok("19b. total = 2^20 − 1 = 1 048 575 grains", s === 1048575 && s === 2 ** 20 - 1);
  ok("19. la dernière case porte presque la moitié du total", 2 ** 19 / s > 0.49 && 2 ** 19 / s < 0.51);
}
{
  const t = parRecurrence(100, (x) => 0.5 * x + 20, 4);
  ok("20. les termes relevés : 100, 70, 55, 47,5", proche(t[1], 70) && proche(t[2], 55) && proche(t[3], 47.5), t.join(" "));
  const d = [t[1] - t[0], t[2] - t[1]];
  ok("20a. ni arithmétique (différences −30 puis −15)", d[0] === -30 && d[1] === -15 && d[0] !== d[1]);
  const q = [t[1] / t[0], t[2] / t[1]];
  ok("20a. ni géométrique (quotients 0,7 puis ≈ 0,786)", proche(q[0], 0.7) && !proche(q[1], 0.7));
  const v = t.map((x) => x - 40);
  ok("20c. v(n) = u(n) − 40 est géométrique de raison 0,5, v0 = 60", v[0] === 60 && v.slice(0, -1).every((x, i) => proche(v[i + 1] / x, 0.5)));
  let u = 100;
  for (let k = 0; k < 300; k++) u = 0.5 * u + 20;
  ok("20d. la suite s'approche de 40", proche(u, 40, 1e-9), String(u));
}

console.log("Le texte de la fiche");
const source = fs.readFileSync(path.join(RACINE, "lib", "fiches-exercices", "maths-premiere-suites.tsx"), "utf8");
const chaines = source.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
const impaires = chaines.filter((c) => (c.match(/\$/g) ?? []).length % 2 === 1);
ok(`dollars appariés dans ${chaines.length} chaînes`, impaires.length === 0, impaires.slice(0, 2).join(" | "));
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
const toutes = [...microSkills.matchAll(/id: "(suite_[a-z_]+)"/g)].map((m) => m[1]);
const sansExercice = toutes.filter((id) => !micros.has(id));
ok(`les ${toutes.length} micros des suites ont chacune un exercice`, sansExercice.length === 0, sansExercice.join(", "));
ok("la micro suite_auxiliaire, créée le 17/09, est travaillée", micros.has("suite_auxiliaire"));

/* ─── Les frises dessinées dans les corrigés ────────────────────────────────
 * ⛔ Une frise qui montre d'autres termes que ceux du corrigé enseignerait deux
 * suites différentes dans le même exercice. On relit donc chaque appel. */
console.log("Les frises dessinées");
const frises = [...source.matchAll(/schema: frise\(\[([^\]]*)\]/g)].map((m) =>
  [...m[1].matchAll(/"[^"]*"|[^,\s]+/g)].map((x) => fr(x[0].replace(/^"|"$/g, ""))),
);
ok(`${frises.length} frises dessinées`, frises.length === 6, `${frises.length}`);
ok("  frise 2 : la récurrence 3u − 1", JSON.stringify(frises[0]) === "[2,5,14,41]", String(frises[0]));
ok("  frise 4 : les puissances de 2", JSON.stringify(frises[1]) === "[5,10,20,40,80]", String(frises[1]));
ok("  frise 6 : +15 à chaque rang", JSON.stringify(frises[2]) === "[100,115,130,145]", String(frises[2]));
ok("  frise 13 : n² − 6n", JSON.stringify(frises[3]) === "[0,-5,-8,-9,-8,-5]", String(frises[3]));
ok("  frise 16 : 0,8u + 6", frises[4].every((x, i) => proche(x, parRecurrence(10, (u) => 0.8 * u + 6, 3)[i])), String(frises[4]));
ok("  frise 20 : 0,5u + 20", frises[5].every((x, i) => proche(x, parRecurrence(100, (u) => 0.5 * u + 20, 4)[i])), String(frises[5]));

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");
process.exitCode = erreurs ? 1 : 0;
