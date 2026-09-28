// Recalcul indépendant de la feuille « Comparer deux nombres » (1re, automatismes).
// Usage : node scripts/verifier-exercices-premiere-auto-comparer.mjs

import fs from "node:fs";

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));

verif("1 a−b", 3 / 7 - 2 / 5, 1 / 35);
verif("2", 0.6 ** 2, 0.36);
vrai("3 ordre", 5 / 9 < 5 / 7 && 5 / 7 < 5 / 6);
verif("4 croix", 7 * 8, 56);
verif("4 croix", 5 * 12, 60);
vrai("4", 7 / 12 < 5 / 8);
vrai("5 ordre", 1 / 12 < 0.1 && 0.1 < 1 / 9 && 1 / 9 < 1 / 8);
vrai("6 x²<x", [0.1, 0.5, 0.9].every((x) => x * x < x));
verif("7 A", 1 / 3 + 1 / 4, 7 / 12);
verif("7 B", 1 / 2 + 1 / 12, 7 / 12);
verif("8", 3 ** 20 / 9 ** 9, 9);
verif("9 prix au kilo", 4.5 / 0.75, 6);
verif("10 A", 50000 / 40000, 1.25);
verif("10 B", 180000 / 150000, 1.2);
verif("11", 0.67 - 2 / 3, 1 / 300);
verif("12", 999 * 1001 - 1000 * 1000, -1);
verif("13 France", 66e6 / 550e3, 120);
verif("13 Allemagne", Math.round(84e6 / 357e3), 235);
verif("14 A", 18 / 30, 0.6);
verif("14 B", 14 / 25, 0.56);
vrai("15", 2 ** 30 > 1e9 && 1024 ** 3 === 2 ** 30);
const forfait = (x) => 20 + 0.1 * x - 30;
verif("16 50", forfait(50), -5);
verif("16 100", forfait(100), 0);
verif("16 150", forfait(150), 5);
verif("17", 1.03 ** 2, 1.0609);
verif("17 écart", 10000 * 1.03 ** 2 - 10000 * 1.06, 9, 1e-6);
verif("18 diff", 1430 - 1410, 20);
verif("18 quotient", Math.round((1430 / 1410) * 1000) / 1000, 1.014);
verif("19 somme", 2 / 5 + 1 / 4 + 3 / 10, 19 / 20);
verif("19 culture", 2e6 / 20, 100000);
const remise = (x) => x - 20 - 0.85 * x;
verif("20 100", remise(100), -5);
verif("20 200", remise(200), 10);
vrai("20 133", Math.abs(remise(133)) < 0.1);
verif("20 seuil", Math.round((20 / 0.15) * 100) / 100, 133.33);

const src = fs.readFileSync("lib/fiches-exercices/maths-premiere-auto-comparer.tsx", "utf8");
const connues = new Set([...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]));
for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) vrai(`micro ${id[1]}`, connues.has(id[1]));
for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) vrai(`dollars « ${m[1].slice(0, 50)} »`, (m[1].match(/\$/g) || []).length % 2 === 0);
verif("20 exercices", (src.match(/correction:/g) || []).length, 20);

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
