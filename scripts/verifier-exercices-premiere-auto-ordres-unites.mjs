// Recalcul indépendant de la feuille « Calcul mental, ordres de grandeur et
// unités » (1re sans spé, automatismes, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-auto-ordres-unites.tsx.
// Chaque conversion est refaite à partir des définitions des unités (1 m =
// 100 cm, 1 ha = 10 000 m², 1 h = 3 600 s…), chaque ordre de grandeur est
// confronté au calcul exact, chaque dessin (tableaux d'unités, droites,
// diagramme, repère) relu dans le source, évalué, et comparé aux calculs.
// Plus : dollars appariés, micros connues et couverture annoncée en en-tête,
// 20 corrections, étiquettes SVG sans `$`.
// Usage : node scripts/verifier-exercices-premiere-auto-ordres-unites.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-ordres-unites.tsx";
const MICROS = ["auto_num_calcul_mental", "auto_num_ordre_grandeur", "auto_num_vraisemblance", "auto_num_conversions"];
const src = fs.readFileSync(FICHIER, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));
/** « 3 400 », « 0,0034 », « −5 » → nombre. */
const nb = (v) => (typeof v === "number" ? v : Number(String(v).replace(/\s/g, "").replace(",", ".").replace("−", "-")));

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
  const numero = (src.slice(0, m.index).match(/\benonce:/g) || []).length;
  const fn = new Function(...aides, "ORANGE", "BLEU", `return (${src.slice(debut, i)});`);
  figures[numero] = fn(...aides.map(stub), "#ea580c", "#2563eb");
}
const donnees = (n) => figures[n].args[1].map((d) => d.value);
const memeListe = (nom, a, b) =>
  a.length === b.length && a.every((v, k) => proche(v, b[k])) ? ok++ : ko.push(`${nom} : [${a}] ≠ [${b}]`);
const ligne = (n) => figures[n].args[1].slice(1).map(nb);

for (const [n, f] of Object.entries(figures)) {
  const texte = JSON.stringify(f.args);
  vrai(`ex ${n} : un $ dans une étiquette SVG`, !texte.includes("$"));
  vrai(`ex ${n} : un tiret au lieu du signe moins`, !/"-\d/.test(texte));
  if (f.type === "tableau") vrai(`ex ${n} : tableau de longueurs inégales`, f.args[0].length === f.args[1].length);
  if (f.type === "tableauProba") f.args[1].forEach((l) => vrai(`ex ${n} : ligne de longueur inégale`, l.length === f.args[0].length));
  if (f.type === "droiteGraduee") {
    const [min, max, step, pts] = f.args;
    vrai(`ex ${n} : trop de graduations`, (max - min) / step <= 12.001);
    pts.forEach((p) => vrai(`ex ${n} : ${p.label} hors de la droite`, p.value >= min && p.value <= max));
  }
  if (f.type === "repere") {
    const [[xmin, xmax, ymin, ymax], courbes, marques = []] = f.args;
    vrai(`ex ${n} : ymin doit être < 0`, ymin < 0);
    vrai(`ex ${n} : fenêtre trop large`, xmax - xmin <= 16 && ymax - ymin <= 16);
    for (const p of marques) {
      const surUne = courbes.some((c) => c.q && proche(c.q[0] * p.x * p.x + c.q[1] * p.x + c.q[2], p.y, 1e-6));
      vrai(`ex ${n} : le point (${p.x} ; ${p.y}) n'est sur aucune courbe`, surUne);
    }
  }
}

/* ─── unités ─── */
const mm = 1e-3, cm = 1e-2, km = 1e3; // en m
const cm2 = cm * cm, m2 = 1, km2 = km * km, ha = 1e4;
const mm3 = mm ** 3, cm3 = cm ** 3, dm3 = 0.1 ** 3, m3 = 1, L = dm3;
const h = 3600, min = 60;

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
verif("1", 4 * (3 / 5) + 2, 22 / 5);
verif("1 décimal", 22 / 5, 4.4);
verif("2 a", 0.25 * 360, 90);
verif("2 b", 0.15 * 80, 12);
verif("2 b (10 % + 5 %)", 8 + 4, 12);
verif("3", (3400 * mm3) / cm3, 3.4);
memeListe("3 tableau", ligne(3), [(3400 * mm3) / dm3, (3400 * mm3) / cm3, 3400]);
verif("4", (2.5 * m2) / cm2, 25000);
memeListe("4 tableau", ligne(4), [2.5, (2.5 * m2) / 0.01, (2.5 * m2) / cm2]);
verif("5", (90 * km) / h, 25);
verif("5 raccourci", 90 / 3.6, 25);
verif("6 a", 1 + 45 / 60, 1.75);
verif("6 b", 0.3 * 60, 18);
verif("7 exact", 0.48 * 205, 98.4);
verif("7 estimation", 0.5 * 200, 100);
{
  const notes = [12, 15, 9, 14];
  const moy = notes.reduce((s, v) => s + v, 0) / notes.length;
  verif("8 moyenne", moy, 12.5);
  vrai("8 16,5 hors de [min ; max]", 16.5 > Math.max(...notes));
  memeListe("8 droite", figures[8].args[3].map((p) => p.value), [Math.min(...notes), moy, Math.max(...notes), 16.5]);
}

/* ═══════════════ ★★ Type devoir ═══════════════ */
{
  const reel = (c) => (c * 25000 * cm) / km;
  verif("9 a", reel(6), 1.5);
  memeListe("9 tableau", ligne(9), [1, 4, 6].map(reel));
  verif("9 b heures", 1.5 / 4, 0.375);
  verif("9 b minutes", 0.375 * 60, 22.5);
}
{
  const duree = 2 + 20 / 60;
  verif("10 durée", duree, 7 / 3);
  verif("10 vitesse", 420 / duree, 180);
  verif("10 m/s → km/h", (180 * h) / km, 648);
  vrai("10 plus du double de 320 km/h", 648 > 2 * 320);
  vrai("10 piège ≈ 191", Math.round(420 / 2.2) === 191);
  memeListe("10 tableau", ligne(10), [20 / 60, 1, duree].map((t) => 180 * t));
}
{
  verif("11 exact (t)", (5950000 * 0.98) / 1000, 5831);
  verif("11 estimation (t)", (6e6 * 1) / 1000, 6000);
  vrai("11 un an ≈ 2 millions de t", Math.abs(6000 * 365 - 2e6) / 2e6 < 0.15);
}
verif("12", 2000 * 12, 24000);
verif("12 facteur", 2400000 / 24000, 100);
{
  verif("13 ha", (12 * km2) / ha, 1200);
  verif("13 m²", 12 * km2, 12e6);
  memeListe("13 tableau", ligne(13), [12, (12 * km2) / ha, 12 * km2]);
  vrai("13 ≈ 1 700 terrains", Math.abs(12e6 / 7000 - 1700) < 50);
}
{
  verif("14 a", 800 * mm, 0.8);
  verif("14 m³", 50 * 800 * mm, 40);
  verif("14 L", (50 * 800 * mm * m3) / L, 40000);
}
{
  const p1 = 60 * 0.7;
  const p2 = p1 * 0.9;
  verif("15 soldé", p1, 42);
  verif("15 final", p2, 37.8);
  verif("15 −40 %", 60 * 0.6, 36);
  verif("15 remise", (60 - p2) / 60, 0.37);
  memeListe("15 barres", donnees(15), [60, p1, p2]);
}
{
  const jours = Math.round((Date.UTC(2026, 6, 14) - Date.UTC(1789, 6, 14)) / 864e5);
  verif("16 années", 2026 - 1789, 237);
  verif("16 estimation", 240 * 360, 86400);
  vrai(`16 exact « un peu plus de 86 500 » (${jours})`, jours > 86500 && jours < 86600);
  memeListe("16 frise", figures[16].args[3].map((p) => p.value), [1789, 2026]);
}

/* ═══════════════ ★★★ Problèmes ═══════════════ */
{
  const litres = (d) => (d / 100) * 6;
  verif("17 a", litres(800), 48);
  verif("17 b", 48 * 1.9, 91.2);
  verif("17 b mental", 96 - 4.8, 91.2);
  vrai("17 c 912 = 10 × 91,20", proche(912, 10 * 91.2));
  verif("17 d", 800 / 8, 100);
  memeListe("17 tableau", ligne(17), [100, 400, 800].map(litres));
}
{
  verif("18 décennie (cm)", (3 * 10 * mm) / cm, 3);
  verif("18 siècle (cm)", (3 * 100 * mm) / cm, 30);
  verif("18 3 m / 30 cm", 3 / 0.3, 10);
  vrai("18 ≈ 330 ans", Math.round(1000 / 3 / 10) * 10 === 330);
  // Repère : x en décennies, y en dm. Pente = 3 mm × 10 ans, en dm.
  const pente = (3 * 10 * mm) / 0.1;
  verif("18 pente", figures[18].args[1][0].q[1], pente);
  verif("18 point", pente * 10, 3);
}
{
  verif("19 a", (1 * 100000 * cm) / km, 1);
  verif("19 aire km²", 3 * 4, 12);
  verif("19 ha", (12 * km2) / ha, 1200);
  verif("19 élève m²", (12 * 100000 * cm2) / m2, 120);
  verif("19 échelle au carré", (12 * 100000 * 100000 * cm2) / km2, 12);
  verif("19 durée", (2 * (3 + 4)) / 4, 3.5);
  const t = figures[19].args[1];
  vrai("19 tableau", t[0][1] === "3 cm" && t[1][1] === "4 cm" && t[2][2] === "12 km²");
}
{
  verif("20 a", 1820 * 12, 21840);
  verif("20 b", 35 * 52, 1820);
  verif("20 c", 21840 / 1820, 12);
  verif("20 d", 1800 / 150, 12);
}

/* ═══════════════ contrôles de texte ═══════════════ */
const connues = new Set(
  [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
);
// Les micros de chaque exercice, dans l'ordre.
const morceaux = src.split(/\benonce:/).slice(1);
const parExercice = morceaux.map((t) => [...(t.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
parExercice.flat().forEach((id) => (connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`)));
for (const id of MICROS) vrai(`micro non couverte ${id}`, parExercice.some((l) => l.includes(id)));
// La couverture annoncée en en-tête doit être celle des exercices.
const entete = src.slice(src.indexOf("// Micro-compétences"), src.indexOf("\nimport")).replace(/\n\/\/ ?/g, " ");
for (const id of MICROS) {
  const annonce = (entete.match(new RegExp(`${id} \\(([^)]*)\\)`))?.[1] ?? "").split(",").map((s) => Number(s.trim()));
  const reels = parExercice.flatMap((l, k) => (l.includes(id) ? [k + 1] : []));
  memeListe(`en-tête ${id}`, annonce, reels);
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
