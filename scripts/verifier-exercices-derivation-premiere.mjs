// Recalcul indépendant des deux feuilles « Dérivation » (28/09/2026) :
// lib/fiches-exercices/maths-premiere-derivation.tsx (1re spé) et
// lib/fiches-exercices/maths-premiere-tc-derivation.tsx (1re sans spé).
// Chaque nombre dérivé annoncé est refait par taux d'accroissement symétrique,
// chaque image recalculée, chaque factorisation « vérifiée » comparée en 41
// points, chaque tangente dessinée testée (passe par le point, bonne pente).
// Plus : dollars appariés, micros connues du coach de la classe.
// Usage : node scripts/verifier-exercices-derivation-premiere.mjs

import fs from "node:fs";

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-6) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const d = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const memes = (nom, f, g, de = -5, a = 5) => {
  for (let k = 0; k <= 40; k++) {
    const x = de + ((a - de) * k) / 40;
    // 1e-6 : une dérivée par différence finie ne tient pas 1e-9 (vu sur S13 a).
    if (!proche(f(x), g(x), 1e-6)) return ko.push(`${nom} : diffère en x = ${x}`);
  }
  ok++;
};
/** La droite y = m x + p est-elle la tangente à f en a ? */
const tangente = (nom, f, a, m, p) => {
  verif(`${nom} pente`, d(f, a), m, 1e-5);
  verif(`${nom} contact`, m * a + p, f(a));
};

/* ═══════════════ 1re spé ═══════════════ */
{
  const f1 = (x) => x * x - 3 * x;
  verif("S1 taux", (f1(4) - f1(1)) / 3, 2);
  verif("S1 sécante", 2 * 4 - 4, f1(4));
  const sq = (x) => x * x;
  verif("S2 f'(3)", d(sq, 3), 6, 1e-5);
  tangente("S2 tangente", sq, 3, 6, -9);
  verif("S2 sécante 3→4", (sq(4) - sq(3)) / 1, 7);
  const f3 = (x) => -x * x + 4 * x - 1;
  verif("S3 f(1)", f3(1), 2);
  tangente("S3", f3, 1, 2, 0);
  verif("S3 f(2)", f3(2), 3);
  verif("S4 a", d((x) => x ** 3, 2), 12, 1e-5);
  verif("S4 b", d((x) => 1 / x, -1), -1, 1e-5);
  verif("S4 c", d(Math.sqrt, 9), 1 / 6, 1e-5);
  verif("S5 g", d((x) => x ** -2, 1.3), -2 / 1.3 ** 3, 1e-5);
  verif("S5 h", d((x) => 3 / x ** 4, 1.3), -12 / 1.3 ** 5, 1e-5);
  memes("S6", (x) => d((t) => 4 * t ** 3 - 5 * t * t + 7 * t - 2, x), (x) => 12 * x * x - 10 * x + 7);
  const f7 = (x) => x * x - 3 * x + 1;
  tangente("S7", f7, 2, 1, -3);
  memes("S9", (x) => d((t) => (2 * t + 1) * (t * t - 3), x), (x) => 6 * x * x + 2 * x - 6);
  const f10 = (x) => x * Math.sqrt(x);
  verif("S10 f'(4)", d(f10, 4), 3, 1e-5);
  tangente("S10", f10, 4, 3, -4);
  memes("S11", (x) => d((t) => (2 * t - 1) / (t + 3), x), (x) => 7 / (x + 3) ** 2, -2, 5);
  const g12 = (x) => 1 / (x * x + 1);
  verif("S12 g'(0)", d(g12, 0), 0, 1e-5);
  verif("S12 g'(1)", d(g12, 1), -0.5, 1e-5);
  tangente("S12 tangente en 1", g12, 1, -0.5, 1);
  memes("S13 a", (x) => d((t) => (3 * t - 2) ** 4, x), (x) => 12 * (3 * x - 2) ** 3, -2, 2);
  verif("S13 b", d((x) => Math.sqrt(2 * x + 6), 5), 0.25, 1e-5);
  memes("S13 c", (x) => d((t) => 1 / (5 - t), x), (x) => 1 / (5 - x) ** 2, -4, 4);
  const f14 = (x) => x ** 3 - 2 * x;
  tangente("S14 T", f14, 1, 1, -2);
  tangente("S14 en 2", f14, 2, 10, -16);
  tangente("S14 en −2", f14, -2, 10, 16);
  tangente("S15", (x) => 1 / x, 2, -0.25, 1);
  const f16 = (x) => x ** 3 - 3 * x;
  tangente("S16 en −1", f16, -1, 0, 2);
  tangente("S16 en 0", f16, 0, -3, 0);
  tangente("S16 en 1", f16, 1, 0, -2);
  const d17 = (t) => 5 * t * t;
  verif("S17 moyenne", (d17(3) - d17(1)) / 2, 20);
  verif("S17 v(2)", d(d17, 2), 20, 1e-5);
  verif("S17 sol", d17(4), 80);
  verif("S17 v(4) km/h", d(d17, 4) * 3.6, 144, 1e-5);
  const C = (q) => q * q + 50 * q + 1000;
  verif("S18 C'(20)", d(C, 20), 90, 1e-5);
  verif("S18 C(21)−C(20)", C(21) - C(20), 91);
  verif("S18 C'(21)", d(C, 21), 92, 1e-5);
  verif("S18 C'(40)", d(C, 40), 130, 1e-5);
  tangente("S19 a=3", sq, 3, 6, -9);
  tangente("S19 a=−1", sq, -1, -2, -1);
  verif("S19 par A (3)", 6 * 1 - 9, -3);
  verif("S19 par A (−1)", -2 * 1 - 1, -3);
  const C20 = (t) => (10 * t) / (t * t + 1);
  memes("S20 C'", (t) => d(C20, t), (t) => (10 * (1 - t * t)) / (t * t + 1) ** 2, 0, 5);
  tangente("S20 origine", C20, 0, 10, 0);
  tangente("S20 en 1", C20, 1, 0, 5);
  verif("S20 C'(2)", d(C20, 2), -1.2, 1e-5);
  verif("S20 C(2)", C20(2), 4);
}

/* ═══════════════ 1re sans spé ═══════════════ */
{
  const f1 = (x) => 0.5 * x * x - 2;
  verif("P1 f(2)", f1(2), 0);
  tangente("P1", f1, 2, 2, -4);
  const f2 = (x) => x ** 3 - 3 * x;
  if (!(d(f2, -2) > 0 && d(f2, 0) < 0 && proche(d(f2, 1), 0, 1e-6))) ko.push("P2 signes");
  else ok++;
  tangente("P2 en −2", f2, -2, 9, 16);
  const f3 = (x) => x ** 3 - 6 * x * x + 9 * x;
  verif("P3 f(1)", f3(1), 4);
  verif("P3 f(3)", f3(3), 0);
  verif("P3 f'(1)", d(f3, 1), 0, 1e-5);
  verif("P3 f'(3)", d(f3, 3), 0, 1e-5);
  const h4 = (t) => -t * t + 6 * t;
  tangente("P4 jour 1", h4, 1, 4, 1);
  tangente("P4 jour 2", h4, 2, 2, 4);
  memes("P6 h", (x) => d((t) => 4 * t * t - 3 * t + 8, x), (x) => 8 * x - 3);
  const f7 = (x) => 2 * x ** 3 - 6 * x * x + x - 4;
  memes("P7", (x) => d(f7, x), (x) => 6 * x * x - 12 * x + 1);
  tangente("P7 en 0", f7, 0, 1, -4);
  const f8 = (x) => x ** 3 - 4 * x + 1;
  verif("P8 f'(2)", d(f8, 2), 8, 1e-5);
  verif("P8 f'(0)", d(f8, 0), -4, 1e-5);
  verif("P8 f'(−1)", d(f8, -1), -1, 1e-5);
  tangente("P8 en 0", f8, 0, -4, 1);
  verif("P9 tangente", -3 * 2 + 11, 5);
  verif("P10 pente", (7 - 3) / (3 - 1), 2);
  verif("P10 B", 2 * 3 + 1, 7);
  verif("P11 racine", (6) / 2, 3);
  const f13 = (x) => x ** 3 - 6 * x * x + 9 * x + 1;
  memes("P13", (x) => d(f13, x), (x) => 3 * (x - 1) * (x - 3));
  const f14 = (x) => x ** 3 - 3 * x * x - 9 * x + 2;
  memes("P14", (x) => d(f14, x), (x) => 3 * (x + 1) * (x - 3));
  [[-3, -25], [-1, 7], [3, -25], [5, 7]].forEach(([x, y]) => verif(`P14 f(${x})`, f14(x), y));
  const f15 = (x) => -(x ** 3) + 3 * x + 1;
  memes("P15", (x) => d(f15, x), (x) => 3 * (1 - x) * (1 + x));
  [[-2, 3], [-1, -1], [1, 3], [2, -1]].forEach(([x, y]) => verif(`P15 f(${x})`, f15(x), y));
  const f16 = (x) => 2 * x ** 3 - 3 * x * x - 12 * x + 5;
  memes("P16", (x) => d(f16, x), (x) => (6 * x + 6) * (x - 2));
  [[-2, 1], [-1, 12], [2, -15], [3, -4]].forEach(([x, y]) => verif(`P16 f(${x})`, f16(x), y));
  const B = (x) => -(x ** 3) + 12 * x * x - 21 * x - 10;
  memes("P17", (x) => d(B, x), (x) => -3 * (x - 1) * (x - 7));
  [[0, -10], [1, -20], [7, 88], [10, -20]].forEach(([x, y]) => verif(`P17 B(${x})`, B(x), y));
  const N = (t) => -(t ** 3) + 15 * t * t + 100;
  memes("P18", (t) => d(N, t), (t) => -3 * t * (t - 10));
  [[0, 100], [10, 600], [14, 296], [5, 350], [8, 548]].forEach(([x, y]) => verif(`P18 N(${x})`, N(x), y));
  [[2, 48], [5, 75], [8, 48]].forEach(([x, y]) => verif(`P18 N'(${x})`, d(N, x), y, 1e-5));
  const R = (x) => (40 + x) * (1000 - 20 * x);
  memes("P19 R", R, (x) => -20 * x * x + 200 * x + 40000);
  verif("P19 R'(5)", d(R, 5), 0, 1e-5);
  verif("P19 R(5)", R(5), 40500);
  verif("P19 R(50)", R(50), 0);
  const h = (x) => -0.25 * x ** 3 + 1.5 * x * x + 2;
  tangente("P20 A", h, 2, 3, 0);
  tangente("P20 S", h, 4, 0, 10);
  memes("P20 forme", (x) => d(h, x), (x) => -0.75 * (x - 2) ** 2 + 3);
  verif("P20 h(6)", h(6), 2);
}

/* ═══════════════ contrôles de texte ═══════════════ */
const micros = (classe) =>
  new Set(
    [...fs.readFileSync(`lib/tutor-v4/knowledge/maths/${classe}/microSkills.ts`, "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
  );
for (const [fichier, classe] of [
  ["lib/fiches-exercices/maths-premiere-derivation.tsx", "premiere-spe"],
  ["lib/fiches-exercices/maths-premiere-tc-derivation.tsx", "premiere"],
]) {
  const src = fs.readFileSync(fichier, "utf8");
  const connues = micros(classe);
  const citees = new Set();
  for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) citees.add(id[1]);
  for (const id of citees) (connues.has(id) ? ok++ : ko.push(`${fichier} : micro inconnue ${id}`));
  // Dollars appariés dans chaque chaîne d'énoncé, de correction ou de rappel.
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const n = (m[1].replace(/\\\$/g, "").match(/\$/g) || []).length;
    if (n % 2) ko.push(`${fichier} : dollars impairs dans « ${m[1].slice(0, 60)}… »`);
  }
  const nbEx = (src.match(/correction:/g) || []).length;
  nbEx === 20 ? ok++ : ko.push(`${fichier} : ${nbEx} exercices`);
}

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
