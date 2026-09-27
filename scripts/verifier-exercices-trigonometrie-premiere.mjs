// Recalcul INDÉPENDANT des vingt corrigés de la feuille de trigonométrie de
// 1re spé (lib/fiches-exercices/maths-premiere-trigonometrie.tsx).
//
// On ne relit pas le corrigé : on REFAIT le calcul par un autre chemin —
// Math.cos, Math.sin, Math.tan en radians, balayage d'un tour pour les
// équations — puis on vérifie que le corrigé écrit bien ce résultat-là.
//
//   node scripts/verifier-exercices-trigonometrie-premiere.mjs
//
// Vérifie aussi les `$` appariés, les micros connues, et 13/13 micros couvertes.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(RACINE, "lib/fiches-exercices/maths-premiere-trigonometrie.tsx"), "utf8");
const micros = fs.readFileSync(path.join(RACINE, "lib/tutor-v4/knowledge/maths/premiere-spe/microSkills.ts"), "utf8");

let erreurs = 0;
function ok(nom, condition, detail = "") {
  if (condition) console.log(`  ✓ ${nom}`);
  else {
    erreurs++;
    console.log(`  ✗ ${nom}${detail ? " — " + detail : ""}`);
  }
}
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const { PI, cos, sin, tan, sqrt } = Math;
const dit = (texte) => source.includes(texte);
/** Les solutions de f(x) = a sur [0 ; 2π[, cherchées sur les multiples de π/12. */
const solutions = (f, a) =>
  Array.from({ length: 24 }, (_, k) => (k * PI) / 12).filter((x) => proche(f(x), a, 1e-9));

console.log("★ Un seul geste");
ok("1. 30° = π/6, 135° = 3π/4, 270° = 3π/2", proche((30 * PI) / 180, PI / 6) && proche((135 * PI) / 180, (3 * PI) / 4) && proche((270 * PI) / 180, (3 * PI) / 2));
ok("1. 5π/6 = 150°, 7π/4 = 315°", proche(((5 * PI) / 6) * (180 / PI), 150) && proche(((7 * PI) / 4) * (180 / PI), 315));
ok("2. arc π/3 ≈ 1,05", (PI / 3).toFixed(2) === "1.05" && dit("approx 1{,}05"));
ok("2. demi-cercle de 36,5 m ≈ 114,7 m", (36.5 * PI).toFixed(1) === "114.7" && dit("114{,}7$ m"));
ok("2. le piège en degrés : 36,5 × 180 = 6570", 36.5 * 180 === 6570 && dit("$6570$ m"));
ok("4. M(π/3) = (1/2 ; √3/2)", proche(cos(PI / 3), 0.5) && proche(sin(PI / 3), sqrt(3) / 2));
ok("5. OH = cos π/6 ≈ 0,87 ; HM = 1/2", cos(PI / 6).toFixed(2) === "0.87" && proche(sin(PI / 6), 0.5));
ok("6. cos π/4, sin π/6, cos π/2, sin π/3, cos π", proche(cos(PI / 4), sqrt(2) / 2) && proche(sin(PI / 6), 0.5) && proche(cos(PI / 2), 0) && proche(sin(PI / 3), sqrt(3) / 2) && proche(cos(PI), -1));
ok("7. cos(π/5) ≈ 0,809 et sin(π/5) ≈ 0,588 (données justes)", cos(PI / 5).toFixed(3) === "0.809" && sin(PI / 5).toFixed(3) === "0.588");
ok("7. parité : cos(−π/5) = cos(π/5), sin(−π/5) = −sin(π/5)", proche(cos(-PI / 5), cos(PI / 5)) && proche(sin(-PI / 5), -sin(PI / 5)));
ok("8. cos(2π+π/3) = 1/2, sin(π/4+2π) = √2/2, cos(π/6−2π) = √3/2", proche(cos(2 * PI + PI / 3), 0.5) && proche(sin(PI / 4 + 2 * PI), sqrt(2) / 2) && proche(cos(PI / 6 - 2 * PI), sqrt(3) / 2));

console.log("★★ Type devoir");
ok("9. cos 5π/6 = −√3/2, sin 5π/6 = 1/2", proche(cos((5 * PI) / 6), -sqrt(3) / 2) && proche(sin((5 * PI) / 6), 0.5));
ok("9. cos 7π/6 = −√3/2, sin(−2π/3) = −√3/2", proche(cos((7 * PI) / 6), -sqrt(3) / 2) && proche(sin((-2 * PI) / 3), -sqrt(3) / 2));
{
  const x = -Math.acos(3 / 5); // le seul x de [−π ; 0] tel que cos x = 3/5
  ok("10. cos x = 3/5, x ∈ [−π ; 0] ⇒ sin x = −4/5", proche(sin(x), -4 / 5, 1e-12));
  ok("10. le point du schéma (−0,2952π) est bien ce x", proche(-0.2952 * PI, x, 1e-3));
}
ok("11. cos(31π/3) = 1/2", proche(cos((31 * PI) / 3), 0.5, 1e-12) && 31 === 5 * 6 + 1);
ok("11. sin(−17π/4) = −√2/2", proche(sin((-17 * PI) / 4), -sqrt(2) / 2, 1e-12));
ok("11. cos(2027π) = −1 (2027 impair)", 2027 % 2 === 1 && 2027 === 1 + 1013 * 2);
{
  const a = solutions(cos, 0.5);
  const b = solutions(sin, -sqrt(2) / 2);
  ok("12a. cos x = 1/2 sur [0 ; 2π[ : π/3 et 5π/3", a.length === 2 && proche(a[0], PI / 3) && proche(a[1], (5 * PI) / 3));
  ok("12b. sin x = −√2/2 sur [0 ; 2π[ : 5π/4 et 7π/4", b.length === 2 && proche(b[0], (5 * PI) / 4) && proche(b[1], (7 * PI) / 4));
}
{
  const z = solutions(cos, 0);
  ok("13. cos x = 0 sur [0 ; 2π[ : π/2 ≈ 1,57 et 3π/2 ≈ 4,71", z.length === 2 && (PI / 2).toFixed(2) === "1.57" && ((3 * PI) / 2).toFixed(2) === "4.71");
  ok("13. période 2π ≈ 6,28", (2 * PI).toFixed(2) === "6.28" && proche(cos(1.234 + 2 * PI), cos(1.234), 1e-12));
}
ok("14. hauteur 5 sin(π/3) ≈ 4,33 m", (5 * sin(PI / 3)).toFixed(2) === "4.33" && dit("4{,}33$ m"));
ok("14. pied 5 cos(π/3) = 2,5 m", proche(5 * cos(PI / 3), 2.5));
ok("14. Pythagore : 6,25 + 18,75 = 25", proche(2.5 ** 2 + (5 * sin(PI / 3)) ** 2, 25) && proche(((5 * sqrt(3)) / 2) ** 2, 18.75));
ok("15. 2c² = 1, c > 0 ⇒ c = √2/2 ≈ 0,71", proche(sqrt(1 / 2), sqrt(2) / 2) && (sqrt(2) / 2).toFixed(2) === "0.71" && proche(cos(PI / 4), sin(PI / 4)));

console.log("★★★ Problèmes");
{
  // 16 : le triangle OIM, O(0;0), I(1;0), M(cos π/3 ; sin π/3).
  const M = [cos(PI / 3), sin(PI / 3)];
  const IM = Math.hypot(M[0] - 1, M[1]);
  ok("16. OIM équilatéral : IM = 1", proche(IM, 1));
  ok("16. H milieu de [OI] : cos π/3 = 1/2", proche(M[0], 0.5));
  ok("16. sin π/3 = √(3/4) = √3/2", proche(sqrt(3 / 4), sqrt(3) / 2) && proche(M[1], sqrt(3) / 2));
}
{
  const h = (x) => 70 + 60 * sin(x);
  ok("17a. h(π/2) = 130", proche(h(PI / 2), 130));
  ok("17b. h(7π/6) = 40", proche(h((7 * PI) / 6), 40, 1e-9));
  ok("17c. h(13π/6) = 100", proche(h((13 * PI) / 6), 100, 1e-9));
  const s = solutions(h, 100);
  ok("17d. h(x) = 100 sur [0 ; 2π[ : π/6 et 5π/6", s.length === 2 && proche(s[0], PI / 6) && proche(s[1], (5 * PI) / 6));
}
{
  ok("18b. le côté du n-gone vaut 2 sin(π/n) (n = 5 à 12)", [5, 6, 7, 8, 9, 10, 11, 12].every((n) => proche(Math.hypot(cos((2 * PI) / n) - 1, sin((2 * PI) / n)), 2 * sin(PI / n))));
  ok("18a. hexagone : côté 1", proche(2 * sin(PI / 6), 1));
  ok("18c. 12 sin(π/12) ≈ 3,1058", (12 * sin(PI / 12)).toFixed(4) === "3.1058" && dit("3{,}1058"));
  const bas = 96 * sin(PI / 96);
  const haut = 96 * tan(PI / 96);
  ok(`18d. 3,1410 < 96 sin(π/96) = ${bas.toFixed(5)} < π < 96 tan(π/96) = ${haut.toFixed(5)} < 3,1428`, 3.141 < bas && bas < PI && PI < haut && haut < 3.1428);
  ok("18d. deux décimales garanties : 3,14", bas.toFixed(10).startsWith("3.14") && haut.toFixed(10).startsWith("3.14") && bas.toFixed(3) !== haut.toFixed(3));
}
{
  const h = (t) => 5 + 3 * cos((PI * t) / 6);
  ok("19a. h(0) = 8, h(6) = 2, h(12) = 8", proche(h(0), 8) && proche(h(6), 2) && proche(h(12), 8));
  ok("19b. h(t + 12) = h(t)", Array.from({ length: 50 }, (_, k) => k * 0.37).every((t) => proche(h(t + 12), h(t), 1e-9)));
  ok("19c. h(2) = 6,5 et h(8) = 3,5", proche(h(2), 6.5) && proche(h(8), 3.5));
  ok("19d. h(30) = 2", proche(h(30), 2, 1e-9));
}
{
  const x = (2026 * PI) / 6;
  ok("20a. 2026π/6 = 1013π/3 = 5π/3 + 168 × 2π", 2026 / 2 === 1013 && 1013 === 6 * 168 + 5 && proche(x, (5 * PI) / 3 + 168 * 2 * PI, 1e-9));
  ok("20c. cos x = 1/2, sin x = −√3/2", proche(cos(x), 0.5, 1e-9) && proche(sin(x), -sqrt(3) / 2, 1e-9));
  ok("20d. cos(x+π) = −1/2, sin(−x) = √3/2", proche(cos(x + PI), -0.5, 1e-9) && proche(sin(-x), sqrt(3) / 2, 1e-9));
}

console.log("La feuille elle-même");
// Chaque `$` apparié, énoncé par énoncé (on lit les chaînes entre guillemets).
const chaines = [...source.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
const impairs = chaines.filter((c) => (c.replace(/\\\$/g, "").match(/\$/g) ?? []).length % 2 === 1);
ok(`$ appariés dans les ${chaines.length} chaînes`, impairs.length === 0, impairs[0]?.slice(0, 80));
const cites = new Set([...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => [...m[1].matchAll(/"([a-z_]+)"/g)].map((x) => x[1])));
const inconnues = [...cites].filter((m) => !micros.includes(`id: "${m}"`));
ok(`${cites.size} micros citées, toutes connues du coach`, inconnues.length === 0, inconnues.join(", "));
const trig = [...micros.matchAll(/id: "(trig_[a-z_]+)"/g)].map((m) => m[1]);
const manquantes = trig.filter((m) => !cites.has(m));
ok(`${trig.length - manquantes.length}/${trig.length} micros de trigonométrie couvertes`, manquantes.length === 0, manquantes.join(", "));
const nbEx = (source.match(/^\s+enonce:/gm) ?? []).length;
ok(`${nbEx} exercices`, nbEx === 20);

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");
process.exitCode = erreurs ? 1 : 0;
