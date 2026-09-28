// Recalcul indépendant de la feuille « Équations et inéquations » (1re sans
// spé, automatismes, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-auto-equations.tsx.
// Chaque solution annoncée est remise dans l'équation de départ ; chaque
// inéquation est testée de part et d'autre de sa borne (et sur la borne) ;
// les dessins sont relus dans le source et évalués : balances (chaque ligne a
// la même solution que la dernière), droites graduées, repères (le point
// marqué est sur les deux droites), tableaux.
// Plus : dollars appariés, micros connues et couverture annoncée en en-tête,
// 20 corrections, étiquettes SVG sans `$`.
// Usage : node scripts/verifier-exercices-premiere-auto-equations.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-equations.tsx";
const MICROS = ["auto_alg_equation_premier_degre", "auto_alg_equation_carre", "auto_alg_equation_quotient", "auto_alg_inequation"];
const src = fs.readFileSync(FICHIER, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));
const memeListe = (nom, a, b) =>
  a.length === b.length && a.every((v, k) => proche(v, b[k])) ? ok++ : ko.push(`${nom} : [${a}] ≠ [${b}]`);
/** L'ensemble des solutions d'une inéquation `p(x)` est-il { x ⋚ borne } ?
 *  On teste la borne elle-même et deux points de chaque côté. */
const inequation = (nom, p, sens, borne) => {
  const attendu = { "<": (x) => x < borne, "<=": (x) => x <= borne, ">": (x) => x > borne, ">=": (x) => x >= borne }[sens];
  for (const x of [borne - 1, borne - 0.01, borne, borne + 0.01, borne + 1])
    if (p(x) !== attendu(x)) return ko.push(`${nom} : se trompe en x = ${x}`);
  ok++;
};

/* ─── les dessins, relus dans le source et évalués ─── */
const stub = (type) => (...args) => ({ type, args });
const aides = ["diagramme", "tableau", "droiteGraduee", "repere", "tableauProba", "droite", "intervalles", "tableauSignes", "balance"];
const S = {};
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
  S[numero] = fn(...aides.map(stub), (d) => d, "#ea580c", "#2563eb");
}
/** « 7x + 4 », « 12/x », « 60x + 500 » → fonction de x. */
const expr = (s) => new Function("x", `return ${s.replace(/−/g, "-").replace(/(\d)x/g, "$1*x")};`);

for (const [n, f] of Object.entries(S)) {
  const texte = JSON.stringify(f.args);
  vrai(`ex ${n} : un $ dans une étiquette SVG`, !texte.includes("$"));
  if (f.type !== "balance") vrai(`ex ${n} : un tiret au lieu du signe moins`, !/"-\d/.test(texte));
  if (f.type === "tableau") vrai(`ex ${n} : tableau de longueurs inégales`, f.args[0].length === f.args[1].length);
  if (f.type === "tableauProba") f.args[1].forEach((l) => vrai(`ex ${n} : ligne inégale`, l.length === f.args[0].length));
  if (f.type === "droite" || f.type === "intervalles") vrai(`ex ${n} : plus de dix graduations`, (f.args[1] - f.args[0]) / (f.args[3] ?? 1) <= 10);
  if (f.type === "repere") {
    const [[xmin, xmax, ymin, ymax], courbes, marques = []] = f.args;
    vrai(`ex ${n} : ymin doit être < 0`, ymin < 0);
    vrai(`ex ${n} : fenêtre trop large`, xmax - xmin <= 16 && ymax - ymin <= 16);
    for (const p of marques)
      vrai(`ex ${n} : point (${p.x} ; ${p.y}) hors courbe`, courbes.some((c) => proche(c.q[0] * p.x ** 2 + c.q[1] * p.x + c.q[2], p.y, 1e-3)));
  }
  if (f.type === "balance") {
    const etapes = f.args[0];
    const fin = etapes[etapes.length - 1];
    const sol = Number(fin.g === "x" ? fin.d : fin.g);
    vrai(`ex ${n} : la balance ne finit pas sur « x = … »`, (fin.g === "x" || fin.d === "x") && Number.isFinite(sol));
    etapes.forEach((e, k) => verif(`ex ${n} balance, ligne ${k + 1}`, expr(e.g)(sol), expr(e.d)(sol)));
  }
}

// ⛔ Rendu à 375 px (mesuré le 28/09) : sous 4 barres ou plus, 9 signes au plus ;
// un axe de plus de 10 unités passe en `repere(…, grand = true)` ; une droite
// graduée aux nombres de 4 chiffres porte 5 étiquettes au plus.
for (const f of Object.values(S)) {
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
verif("1", 7 * 1 + 4, 5 * 1 + 6);
vrai("1 solution unique (7 ≠ 5)", 7 !== 5);
verif("2", 3 * (5 - 2), 5 + 4);
verif("3 +√5", Math.sqrt(5) ** 2, 5);
memeListe("3 points", S[3].args[2].map((p) => p.x), [-2.236, 2.236].map((v) => +v));
verif("3 point ≈ √5", S[3].args[2][1].x, Math.sqrt(5), 1e-3);
verif("3 horizontale", S[3].args[3], 5);
verif("4 a", 7 ** 2, 49);
verif("4 a (−7)", (-7) ** 2, 49);
verif("4 b piège", (-2) ** 2, 4);
verif("5", 12 / 4, 3);
verif("5 piège", 12 / 36, 1 / 3);
verif("6", 5 / -2.5, -2);
inequation("7", (x) => -2 * x + 3 > 7, "<", -2);
vrai("7 droite", S[7].args[2].a === -2 && S[7].args[2].aInclus === false && S[7].args[2].de === undefined);
inequation("8", (x) => 3 * x - 5 <= x + 1, "<=", 3);

/* ═══════════════ ★★ Type devoir ═══════════════ */
{
  const A = (x) => 40 + 0.2 * x;
  const B = (x) => 60 + 0.1 * x;
  verif("9 égalité", A(200), B(200));
  verif("9 prix", A(200), 80);
  verif("9 A(300)", A(300), 100);
  verif("9 B(300)", B(300), 90);
  // Repère : x en centaines de km, y en dizaines d'euros.
  const [bleue, orange] = S[9].args[1];
  for (const x of [0, 1, 2, 3, 4]) {
    verif(`9 bleue en ${x}`, bleue.q[1] * x + bleue.q[2], A(100 * x) / 10);
    verif(`9 orange en ${x}`, orange.q[1] * x + orange.q[2], B(100 * x) / 10);
  }
}
{
  const O = (p) => 2 * p - 4;
  const D = (p) => 20 - p;
  verif("10 équilibre", O(8), D(8));
  verif("10 quantité", D(8), 12);
  const [offre, demande] = S[10].args[1];
  vrai("10 courbes", offre.q.join() === "0,2,-4" && demande.q.join() === "0,-1,20");
  verif("10 piège", 24 / 2, 12);
}
verif("11", 480 / 12, 40);
verif("12", 900000 / 15000, 60);
verif("13 m²", 2.25 * 10000, 22500);
verif("13", 150 ** 2, 22500);
{
  inequation("14", (x) => 20 + 5 * x < 9 * x, ">", 5);
  const t = S[14].args[1];
  memeListe("14 sans", t[0].slice(1).map(Number), [4, 5, 6].map((x) => 9 * x));
  memeListe("14 avec", t[1].slice(1).map(Number), [4, 5, 6].map((x) => 20 + 5 * x));
}
{
  inequation("15", (h) => 18 - 6 * h < 0, ">", 3);
  verif("15 h = 4", 18 - 6 * 4, -6);
  vrai("15 droite", S[15].args[2].de === 3 && S[15].args[2].deInclus === false && S[15].args[2].a === undefined);
}
{
  verif("16", 1000 * 1.1 ** 2, 1210);
  verif("16 (−2,1)", (1 - 2.1) ** 2, 1.21);
  verif("16 année 1", 1000 * 1.1, 1100);
}

/* ═══════════════ ★★★ Problèmes ═══════════════ */
{
  const A = (n) => 50000 + 1000 * n;
  const B = (n) => 80000 - 500 * n;
  verif("17 égalité", A(20), B(20));
  verif("17 population", A(20), 70000);
  inequation("17 b", (n) => A(n) > B(n), ">", 20);
  const [bleue, orange] = S[17].args[1];
  for (const d of [0, 1, 2, 3, 4]) {
    verif(`17 bleue en ${d}`, bleue.q[1] * d + bleue.q[2], A(10 * d) / 10000);
    verif(`17 orange en ${d}`, orange.q[1] * d + orange.q[2], B(10 * d) / 10000);
  }
}
{
  const part = (x) => 1200 / x;
  verif("18 a", part(30) + 10, 50);
  verif("18 b", part(50), 24);
  verif("18 c", part(40) + 10, 40);
  inequation("18 d", (x) => part(x) + 10 <= 40, ">=", 40);
  memeListe("18 tableau", S[18].args[1].slice(1), [20, 30, 40, 50].map(part));
}
{
  verif("19 a", 200 ** 2, 4 * 10000);
  verif("19 b", (200 * 100) / 10000, 2);
  verif("19 c", 4 * 200 * 15 + 500, 12500);
  verif("19 d", 60 * 150 + 500, 9500);
  verif("19 d aire (ha)", 150 ** 2 / 10000, 2.25);
}
{
  inequation("20 a", (x) => 4 + 2 * x <= 30, "<=", 13);
  inequation("20 b", (x) => 4 + 2 * x < 7 + 1.5 * x, "<", 6);
  verif("20 c taxi", 4 + 2 * 6, 16);
  verif("20 c VTC", 7 + 1.5 * 6, 16);
  const [taxi, vtc] = S[20].args[2];
  vrai("20 droite taxi", taxi.a === 6 && taxi.aInclus === false);
  vrai("20 droite VTC", vtc.de === 6 && vtc.deInclus === false);
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
// Dollars : seulement dans les données de la feuille (après `export const`).
const donneesFeuille = src.slice(src.indexOf("export const"));
for (const m of donneesFeuille.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
  const n = (m[1].match(/\$/g) || []).length;
  if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
  else ok++;
}
const nbEx = (src.match(/correction:/g) || []).length;
nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
const nbDessins = Object.keys(S).length;
vrai(`${nbDessins} dessins (7 à 12 attendus)`, nbDessins >= 7 && nbDessins <= 12);
const imprimes = (src.match(/\n\s+(schema|figure): (?!ecranSeulement)/g) || []).length;
vrai(`${imprimes} dessins imprimés (10 au plus)`, imprimes <= 10);

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
