// Recalcul indépendant de la feuille « Développer et factoriser » (1re sans
// spé, automatismes, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-auto-developper-factoriser.tsx.
// Chaque développement et chaque factorisation annoncés sont comparés à
// l'expression de départ en 41 points ; chaque valeur numérique est refaite.
// Les dessins sont relus dans le source et évalués : grilles « × » (chaque
// case = en-tête de ligne × en-tête de colonne), diagrammes, tableaux, courbes,
// tableau de signes (signes testés au milieu de chaque intervalle).
// Plus : dollars appariés, micros connues et couverture annoncée en en-tête,
// 20 corrections, étiquettes SVG sans `$`.
// Usage : node scripts/verifier-exercices-premiere-auto-developper-factoriser.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-developper-factoriser.tsx";
const MICROS = ["auto_alg_developper", "auto_alg_identites", "auto_alg_factoriser_commun", "auto_alg_factoriser_identite"];
const src = fs.readFileSync(FICHIER, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));
/** Deux expressions égales en 41 points de [de ; a] ? */
const memes = (nom, f, g, de = -5, a = 5) => {
  for (let k = 0; k <= 40; k++) {
    const x = de + ((a - de) * k) / 40;
    if (!proche(f(x), g(x), 1e-9)) return ko.push(`${nom} : diffère en x = ${x}`);
  }
  ok++;
};
const memeListe = (nom, a, b) =>
  a.length === b.length && a.every((v, k) => proche(v, b[k])) ? ok++ : ko.push(`${nom} : [${a}] ≠ [${b}]`);

/* ─── les dessins, relus dans le source et évalués ─── */
const stub = (type) => (...args) => ({ type, args });
const aides = ["diagramme", "tableau", "droiteGraduee", "repere", "tableauProba", "droite", "intervalles", "tableauSignes", "balance"];
const dessins = { schema: {}, figure: {} };
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
  const numero = (src.slice(0, m.index).match(/\benonce:/g) || []).length;
  const fn = new Function(...aides, "ecranSeulement", "ORANGE", "BLEU", `return (${src.slice(debut, i)});`);
  dessins[m[1]][numero] = fn(...aides.map(stub), (d) => d, "#ea580c", "#2563eb");
}
const S = dessins.schema;
const donnees = (n) => S[n].args[1].map((d) => d.value);

/** « 2x² », « −10x », « 25 », « x » → [coefficient, degré]. */
const monome = (s) => {
  const m = s.replace("−", "-").match(/^(-?)(\d*)(x²|x)?$/);
  if (!m) throw new Error(`monôme illisible : ${s}`);
  const c = (m[1] ? -1 : 1) * (m[2] ? Number(m[2]) : 1);
  return [c, m[3] === "x²" ? 2 : m[3] === "x" ? 1 : 0];
};
const grille = (nom, f) => {
  const [entete, lignes] = f.args;
  for (const l of lignes)
    for (let j = 1; j < entete.length; j++) {
      const [a, p] = monome(l[0]);
      const [b, q] = monome(entete[j]);
      const [c, r] = monome(l[j]);
      vrai(`${nom} : case ${l[0]} × ${entete[j]} ≠ ${l[j]}`, a * b === c && p + q === r);
    }
};

for (const [genre, tous] of Object.entries(dessins))
  for (const [n, f] of Object.entries(tous)) {
    const texte = JSON.stringify(f.args);
    if (f.type !== "tableauSignes") vrai(`ex ${n} (${genre}) : un $ dans une étiquette SVG`, !texte.includes("$"));
    if (f.type !== "tableauSignes") vrai(`ex ${n} (${genre}) : un tiret au lieu du signe moins`, !/"-\d/.test(texte));
    if (f.type === "tableau") vrai(`ex ${n} : tableau de longueurs inégales`, f.args[0].length === f.args[1].length);
    if (f.type === "tableauProba") f.args[1].forEach((l) => vrai(`ex ${n} : ligne inégale`, l.length === f.args[0].length));
    if (f.type === "repere") {
      const [[xmin, xmax, ymin, ymax], , marques = []] = f.args;
      vrai(`ex ${n} : ymin doit être < 0`, ymin < 0);
      vrai(`ex ${n} : fenêtre trop large`, xmax - xmin <= 16 && ymax - ymin <= 16);
      for (const p of marques) vrai(`ex ${n} : point hors courbe`, f.args[1].some((c) => c.q && proche(c.q[0] * p.x ** 2 + c.q[1] * p.x + c.q[2], p.y, 1e-6)));
    }
    if (f.type === "tableauSignes") f.args[1].forEach(([, signes, marques = []]) => vrai(`ex ${n} : tableau de signes mal dimensionné`, signes.length === f.args[0].length - 1 && marques.length === f.args[0].length - 2));
  }

// ⛔ Rendu à 375 px (mesuré le 28/09) : sous 4 barres ou plus, 9 signes au plus ;
// un axe de plus de 10 unités passe en `repere(…, grand = true)` ; une droite
// graduée aux nombres de 4 chiffres porte 5 étiquettes au plus.
for (const f of [...Object.values(dessins.schema), ...Object.values(dessins.figure)]) {
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
memes("1 A", (x) => 3 * (2 * x - 5), (x) => 6 * x - 15);
memes("1 B", (x) => -2 * (x - 4), (x) => -2 * x + 8);
memes("2", (x) => (2 * x + 3) * (x - 5), (x) => 2 * x * x - 7 * x - 15);
verif("2 test", (2 + 3) * (1 - 5), -20);
grille("2 grille", S[2]);
memes("3", (x) => (2 * x - 5) ** 2, (x) => 4 * x * x - 20 * x + 25);
grille("3 grille", S[3]);
memes("4", (x) => (3 * x + 1) * (3 * x - 1), (x) => 9 * x * x - 1);
memes("5", (x) => 6 * x * x + 15 * x, (x) => 3 * x * (2 * x + 5));
memes("6", (x) => x * x - 49, (x) => (x - 7) * (x + 7));
memes("7", (x) => x * x + 10 * x + 25, (x) => (x + 5) ** 2);
grille("7 grille", S[7]);
memes("8", (x) => (x + 1) * (2 * x - 3) + (x + 1) * (x + 4), (x) => (x + 1) * (3 * x + 1));

/* ═══════════════ ★★ Type devoir ═══════════════ */
memes("9 a", (x) => (x + 3) ** 2, (x) => x * x + 6 * x + 9);
verif("9 c", (5 + 3) ** 2 - 5 ** 2, 39);
verif("9 c formule", 6 * 5 + 9, 39);
grille("9 grille", S[9]);
{
  const R = (x) => (8 - x) * (200 + 50 * x);
  memes("10 R", R, (x) => -50 * x * x + 200 * x + 1600);
  const vals = [0, 1, 2, 3, 4].map(R);
  memeListe("10 valeurs", vals, [1600, 1750, 1800, 1750, 1600]);
  memeListe("10 barres", donnees(10), vals);
  memeListe("10 étiquettes", S[10].args[1].map((d) => Number(d.label.replace(" €", ""))), [0, 1, 2, 3, 4].map((x) => 8 - x));
  vrai("10 barre surlignée = maximum", S[10].args[2] === vals.indexOf(Math.max(...vals)));
}
verif("11 a", 21 * 19, 399);
verif("11 b", 102 * 98, 9996);
verif("11 c", 101 ** 2, 10201);
{
  memes("12 a", (x) => 12 * x * x + 30 * x, (x) => 6 * x * (2 * x + 5));
  const moyen = (x) => (12 * x * x + 30 * x) / x;
  memes("12 b", moyen, (x) => 12 * x + 30, 0.5, 6);
  memeListe("12 tableau", S[12].args[1].slice(1), [1, 2, 5].map(moyen));
}
memes("13", (x) => x * x - 16, (x) => (x - 4) * (x + 4));
verif("13 aire", 24 ** 2 - 16, 560);
verif("13 prix", 560 * 50, 28000);
{
  memes("14 b", (x) => (x - 2) ** 2, (x) => x * x - 4 * x + 4);
  verif("14 a gauche", (0 - 2) ** 2, 4);
  verif("14 a droite", 0 - 4, -4);
  const courbes = dessins.figure[14].args[1];
  memes("14 courbe bleue", (x) => courbes[0].q[0] * x * x + courbes[0].q[1] * x + courbes[0].q[2], (x) => (x - 2) ** 2);
  memes("14 courbe orange", (x) => courbes[1].q[0] * x * x + courbes[1].q[1] * x + courbes[1].q[2], (x) => x * x - 4);
  // Un seul point commun : (x − 2)² − (x² − 4) = −4x + 8, nul en 2 seulement.
  memes("14 différence", (x) => (x - 2) ** 2 - (x * x - 4), (x) => -4 * x + 8);
  verif("14 intersection", (2 - 2) ** 2, 0);
}
{
  verif("15 a", 200 * 1.1 * 0.9, 198);
  memes("15 b", (t) => (1 + t) * (1 - t), (t) => 1 - t * t);
  verif("15 t = 0,2", 1 - 0.2 ** 2, 0.96);
  memeListe("15 barres", donnees(15), [200, 220, 198]);
}
memes("16 a", (x) => 4 * x * x - 12 * x + 9, (x) => (2 * x - 3) ** 2);
memes("16 b", (x) => (x + 3) ** 2 - 25, (x) => (x - 2) * (x + 8));

/* ═══════════════ ★★★ Problèmes ═══════════════ */
{
  memes("17 pelouse", (x) => (20 - 2 * x) * (12 - 2 * x), (x) => 4 * x * x - 64 * x + 240);
  const allee = (x) => 240 - (20 - 2 * x) * (12 - 2 * x);
  memes("17 allée", allee, (x) => 64 * x - 4 * x * x);
  memes("17 factorisée", allee, (x) => 4 * x * (16 - x));
  verif("17 c", allee(1), 60);
  verif("17 prix", 60 * 25, 1500);
  verif("17 directe", 240 - 18 * 10, 60);
  memeListe("17 tableau", S[17].args[1].slice(1), [1, 2, 3].map(allee));
}
{
  const R = (x) => 2000 - 2 * (x - 10) ** 2;
  memes("18 a", R, (x) => -2 * x * x + 40 * x + 1800, 0, 20);
  const vals = [0, 5, 10, 15, 20].map(R);
  memeListe("18 valeurs", vals, [1800, 1950, 2000, 1950, 1800]);
  memeListe("18 barres", donnees(18), vals);
  vrai("18 barre surlignée = maximum", S[18].args[2] === 2);
}
{
  memes("19 a", (a) => (a + 7) ** 2 - (a - 7) ** 2, (a) => 4 * a * 7);
  verif("19 c", (40 ** 2 - 6 ** 2) / 4, 23 * 17);
  verif("19 c", 23 * 17, 391);
}
{
  const B = (x) => 4 - (x - 3) ** 2;
  memes("20 a", B, (x) => -x * x + 6 * x - 5);
  memes("20 b", B, (x) => (5 - x) * (x - 1));
  verif("20 B(1)", B(1), 0);
  verif("20 B(5)", B(5), 0);
  verif("20 max", B(3), 4);
  const q = dessins.figure[20].args[1][0].q;
  memes("20 courbe", (x) => q[0] * x * x + q[1] * x + q[2], B);
  // Tableau de signes : chaque signe testé au milieu de son intervalle.
  const bornes = S[20].args[0].map(Number);
  const facteurs = [(x) => x - 1, (x) => 5 - x, B];
  S[20].args[1].forEach(([nom, signes], k) =>
    signes.forEach((s, j) => {
      const milieu = (bornes[j] + bornes[j + 1]) / 2;
      vrai(`20 signe de ${nom} en ${milieu}`, (facteurs[k](milieu) > 0 ? "+" : "-") === s);
    }),
  );
}

/* ═══════════════ contrôles de texte ═══════════════ */
const connues = new Set(
  [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
);
const parExercice = src
  .split(/\benonce:/)
  .slice(1)
  .map((t) => [...(t.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
parExercice.flat().forEach((id) => (connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`)));
for (const id of MICROS) vrai(`micro non couverte ${id}`, parExercice.some((l) => l.includes(id)));
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
const nbDessins = Object.keys(S).length + Object.keys(dessins.figure).length;
vrai(`${nbDessins} dessins (7 à 12 attendus)`, nbDessins >= 7 && nbDessins <= 12);
const imprimes = (src.match(/\n\s+(schema|figure): (?!ecranSeulement)/g) || []).length;
vrai(`${imprimes} dessins imprimés (10 au plus)`, imprimes <= 10);

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
