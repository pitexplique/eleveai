// Recalcul indépendant de la feuille « Fractions et puissances » (1re sans
// spé, automatismes, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-auto-fractions-puissances.tsx.
// Chaque résultat annoncé est refait en fractions EXACTES (numérateur,
// dénominateur entiers) ou en puissances ; les dessins (diagrammes, tableau,
// droite graduée) sont relus dans le source, évalués, et comparés aux calculs.
// Plus : dollars appariés, micros connues du coach de première, 20 corrections,
// étiquettes SVG sans `$`, tableaux de même longueur.
// Usage : node scripts/verifier-exercices-premiere-auto-fractions-puissances.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-fractions-puissances.tsx";
const src = fs.readFileSync(FICHIER, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));

/* ─── fractions exactes ─── */
const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
const F = (n, d = 1) => {
  const g = pgcd(n, d) * Math.sign(d);
  return { n: n / g, d: d / g };
};
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const div = (a, b) => F(a.n * b.d, a.d * b.n);
const egal = (nom, a, b) => (a.n === b.n && a.d === b.d ? ok++ : ko.push(`${nom} : ${a.n}/${a.d} ≠ ${b.n}/${b.d}`));

/* ─── les dessins, relus dans le source et évalués ─── */
const stub = (type) => (...args) => ({ type, args });
const aides = ["diagramme", "tableau", "droiteGraduee", "repere", "tableauProba", "droite", "intervalles", "tableauSignes"];
const figures = {};
for (const m of src.matchAll(/\n\s+(schema|figure): /g)) {
  let i = m.index + m[0].length;
  const debut = i;
  let prof = 0;
  let chaine = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (chaine) {
      if (c === "\\") i++;
      else if (c === chaine) chaine = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") chaine = c;
    else if ("([{".includes(c)) prof++;
    else if (")]}".includes(c)) prof--;
    else if (c === "," && prof === 0) break;
  }
  const expr = src.slice(debut, i);
  const numero = (src.slice(0, m.index).match(/\benonce:/g) || []).length;
  const fn = new Function(...aides, "ORANGE", "BLEU", `return (${expr});`);
  figures[numero] = fn(...aides.map(stub), "#ea580c", "#2563eb");
}
const donnees = (n) => figures[n].args[1].map((d) => d.value);
const memeListe = (nom, a, b) =>
  a.length === b.length && a.every((v, k) => proche(v, b[k])) ? ok++ : ko.push(`${nom} : [${a}] ≠ [${b}]`);

// Contrôles génériques des dessins.
for (const [n, f] of Object.entries(figures)) {
  const texte = JSON.stringify(f.args);
  vrai(`ex ${n} : un $ dans une étiquette SVG`, !texte.includes("$"));
  vrai(`ex ${n} : un tiret au lieu du signe moins`, !/"-\d/.test(texte.replace(/"value":-?/g, "")));
  if (f.type === "tableau") vrai(`ex ${n} : tableau de longueurs inégales`, f.args[0].length === f.args[1].length);
  if (f.type === "droiteGraduee") {
    const [min, max, step, pts] = f.args;
    vrai(`ex ${n} : trop de graduations`, (max - min) / step <= 12.001);
    pts.forEach((p) => vrai(`ex ${n} : ${p.label} hors de la droite`, p.value >= min && p.value <= max));
  }
}

// ⛔ Rendu à 375 px (mesuré le 28/09) : sous 4 barres ou plus, 9 signes au plus ;
// un axe de plus de 10 unités passe en `repere(…, grand = true)` ; une droite
// graduée aux nombres de 4 chiffres porte 5 étiquettes au plus.
for (const f of Object.values(figures)) {
  if (f.type === "diagramme" && f.args[1].length >= 4)
    f.args[1].forEach((d) => vrai(`libellé trop long sous les barres : « ${d.label} »`, d.label.length <= 9));
  if (f.type === "repere") {
    const [x0, x1, y0, y1] = f.args[0];
    if (x1 - x0 > 10 || y1 - y0 > 10) vrai(`repère [${f.args[0]}] de plus de 10 unités sans grand = true`, f.args[4] === true);
  }
  if (f.type === "droiteGraduee" && Math.max(Math.abs(f.args[0]), Math.abs(f.args[1])) >= 1000)
    vrai(`droite graduée [${f.args[0]} ; ${f.args[1]}] : plus de 5 étiquettes`, (f.args[1] - f.args[0]) / f.args[2] + 1 <= 5);
}

/* ═══════════════ ★ Un seul geste ═══════════════ */
egal("1", sub(F(2, 5), F(3, 10)), F(1, 10));
memeListe("1 droite", figures[1].args[3].map((p) => p.value), [3 / 10, 2 / 5]);
egal("2", mul(F(3, 4), F(2, 9)), F(1, 6));
egal("2 simplifiée", mul(F(1, 2), F(1, 3)), F(1, 6));
egal("3", div(F(5, 6), F(10, 3)), F(1, 4));
egal("3 vérif", mul(F(1, 4), F(10, 3)), F(5, 6));
verif("4 exposant", 3 * 4 + 10, 22);
verif("4 piège", 3 + 4 + 10, 17);
verif("5", (2 ** 7 * 2 ** -3) / 2 ** 2, 4);
verif("5 2^-3", 2 ** -3, 1 / 8);
verif("6 décimal", 2 / 5, 0.4);
verif("6 %", (2 / 5) * 100, 40);
egal("7", F(125, 1000), F(1, 8));
verif("7 %", 0.125 * 100, 12.5);
verif("8 a", 3.2 * 10 ** 4, 32000);
verif("8 b", 5 * 10 ** -3, 0.005);

/* ═══════════════ ★★ Type devoir ═══════════════ */
{
  const parts = add(F(1, 3), F(1, 4));
  egal("9 parts", parts, F(7, 12));
  egal("9 reste", sub(F(1), parts), F(5, 12));
  verif("9 euros", (2400 * 5) / 12, 1000);
  memeListe("9 camembert", donnees(9), [2400 / 3, 2400 / 4, (2400 * 5) / 12]);
  verif("9 total", donnees(9).reduce((s, v) => s + v, 0), 2400);
}
egal("10", mul(F(3, 8), F(2, 3)), F(1, 4));
{
  const taux = [F(1, 20), F(8, 100), F(3, 50)].map((f) => (100 * f.n) / f.d);
  memeListe("11 pourcentages", taux, [5, 8, 6]);
  memeListe("11 barres", donnees(11), taux);
  vrai("11 ordre A < C < B", taux[0] < taux[2] && taux[2] < taux[1]);
}
verif("12 habitants", 6 * 10 ** 7, 60e6);
verif("12 dépenses", 4.8 * 10 ** 11, 480e9);
verif("12 par habitant", 480e9 / 60e6, 8000);
{
  const somme = add(add(F(1, 2), F(1, 3)), F(1, 9));
  egal("13 somme", somme, F(17, 18));
  egal("13 reste", sub(F(1), somme), F(1, 18));
  const parts = [18 / 2, 18 / 3, 18 / 9];
  memeListe("13 barres", donnees(13), [...parts, 18 - parts.reduce((s, v) => s + v, 0)]);
}
egal("14", F(1000, 800), F(5, 4));
verif("14 hausse", (1000 / 800 - 1) * 100, 25);
memeListe("14 barres", donnees(14), [800, 1000]);
{
  const prix = [0, 1, 2, 3, 4].map((k) => 10 ** 3 / 10 ** k);
  memeListe("15 tableau", figures[15].args[1].slice(1), prix);
  memeListe("15 années", figures[15].args[0].slice(1).map(Number), [2000, 2005, 2010, 2015, 2020]);
  verif("15 quotient", 10 ** 3 / 10 ** -1, 10 ** 4);
}
{
  const [forets, agri, autres] = donnees(16);
  egal("16 forêts", F(forets, 100), F(3, 10));
  egal("16 agricole", F(agri, 100), F(1, 2));
  egal("16 autres", F(autres, 100), F(1, 5));
  egal("16 somme", add(add(F(3, 10), F(1, 2)), F(1, 5)), F(1));
  verif("16 surface", (550000 * 3) / 10, 165000);
}

/* ═══════════════ ★★★ Problèmes ═══════════════ */
{
  const pa = div(F(6, 5), F(5, 4));
  egal("17", pa, F(24, 25));
  verif("17 %", (100 * pa.n) / pa.d, 96);
  memeListe("17 barres (base 100)", donnees(17), [100, (100 * 6) / 5, (100 * 5) / 4]);
}
{
  verif("18 A PIB", 2.8 * 10 ** 12, 2800e9);
  verif("18 B PIB", 1.8 * 10 ** 13, 18000e9);
  const a = 2800e9 / 70e6;
  const b = 18000e9 / 300e6;
  verif("18 A", a, 40000);
  verif("18 B", b, 60000);
  verif("18 rapport", b / a, 1.5);
  memeListe("18 barres", donnees(18), [a / 1000, b / 1000]);
  vrai("18 « environ six fois »", Math.round(18000 / 2800) === 6);
  vrai("18 « environ quatre fois »", Math.round(300 / 70) === 4);
}
{
  egal("19 TVA", F(20, 100), F(1, 5));
  const ttc = mul(F(50), F(6, 5));
  egal("19 TTC", ttc, F(60));
  const solde = mul(ttc, sub(F(1), F(1, 6)));
  egal("19 soldé", solde, F(50));
  egal("19 inverses", mul(F(6, 5), F(5, 6)), F(1));
  verif("19 1/6 en %", Math.round(100 / 6), 17);
  egal("19 remise 20 %", mul(ttc, F(4, 5)), F(48));
  memeListe("19 barres", donnees(19), [50, 60, 50]);
}
{
  verif("20 doublements", (1970 - 1850) / 30, 4);
  verif("20 1970", 5000 * 2 ** 4, 80000);
  verif("20 2090", 5000 * 2 ** ((2090 - 1850) / 30), 1280000);
  memeListe("20 barres", donnees(20), [0, 1, 2, 3, 4].map((k) => (5000 * 2 ** k) / 1000));
  memeListe("20 années", figures[20].args[1].map((d) => Number(d.label)), [0, 1, 2, 3, 4].map((k) => 1850 + 30 * k));
}

/* ═══════════════ contrôles de texte ═══════════════ */
const connues = new Set(
  [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
);
const MICROS = ["auto_num_fractions_operations", "auto_num_puissances", "auto_num_ecritures"];
const parExercice = src
  .split(/\benonce:/)
  .slice(1)
  .map((t) => [...(t.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
parExercice.flat().forEach((id) => (connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`)));
for (const id of MICROS) vrai(`micro non couverte ${id}`, parExercice.some((l) => l.includes(id)));
// La couverture annoncée en en-tête doit être celle des exercices.
const entete = src.slice(src.indexOf("// Micro-compétences"), src.indexOf("\nimport")).replace(/\n\/\/ ?/g, " ");
for (const id of MICROS) {
  const annonce = (entete.match(new RegExp(`${id} \\(([^)]*)\\)`))?.[1] ?? "").split(",").map((s) => Number(s.trim()));
  memeListe(`en-tête ${id}`, annonce, parExercice.flatMap((l, k) => (l.includes(id) ? [k + 1] : [])));
}
for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
  const n = (m[1].match(/\$/g) || []).length;
  if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
  else ok++;
}
const nbEx = (src.match(/correction:/g) || []).length;
nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
const nbDessins = Object.keys(figures).length;
vrai(`${nbDessins} dessins (7 à 12 attendus)`, nbDessins >= 7 && nbDessins <= 12);

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
