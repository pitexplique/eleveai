// Recalcul indépendant de la feuille « Suite arithmétique : reconnaître » (1re
// sans spé, chapitre « Variation linéaire », 28/09/2026) :
// lib/fiches-exercices/maths-premiere-lin-suite-arithmetique.tsx
//
// Chaque égalité numérique du corrigé est relue À SA PLACE et évaluée en
// fractions exactes (`outilsEgalites`) ; chaque terme annoncé est recalculé
// par la suite elle-même (u₀ + n·r), jamais recopié. Les DESSINS sont relus
// dans le source (repère, tableau, diagramme), évalués avec des aides
// factices, et comparés à la suite : chaque point marqué est le bon terme.
// Plus les RÈGLES DE RENDU mesurées à 375 px (cadre, `grand`, étiquettes
// hors des graduations et des autres points, tableaux, libellés de barres,
// texte nu), la couverture des micros annoncée en en-tête, 8 + 8 + 4 et
// exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-lin-suite-arithmetique.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, outilsEgalites } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-lin-suite-arithmetique.tsx";
const NOTION = "lin_suite_arithmetique";
const NOM = "Suite arithmétique : reconnaître (1re)";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

/* ═══════════════ Le socle (même bloc dans les six feuilles du chapitre) ═══════════════ */

let justes = 0;
const fausses = [];
const v = {
  ok(nom, condition, detail = "") {
    if (condition) justes++;
    else fausses.push(`${nom}${detail ? " — " + detail : ""}`);
  },
  titre() {},
};
const f = lireFeuille(source);
const c = (k) => f.corrections[k - 1] ?? "";
const e = (k) => f.enonces[k - 1] ?? "";
const egalites = outilsEgalites(v, f);
/** « a = b = c » écrit dans le corrigé k, et tous les membres égaux (exact). */
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));
const ditE = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans l'énoncé`, e(k).includes(p), "absent"));
const proche = (a, b) => typeof a === "number" && Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b));
const vaut = (nom, a, b) => v.ok(nom, proche(a, b), `${a} ≠ ${b}`);
const nombre = (s) => (typeof s === "number" ? s : Number(String(s).replace(/−/g, "-").replace(/\s/g, "").replace(",", ".")));

// Les dessins : chaque `schema:` / `figure:` est relu dans le source et évalué
// avec des aides factices qui renvoient leurs arguments.
const AIDES = ["repere", "tableau", "diagramme", "tableauVariations", "droite", "intervalles"];
const COULEURS = { ORANGE: "#ea580c", BLEU: "#2563eb", VERT: "#16a34a", GRIS: "#94a3b8" };
const dessins = [];
for (const m of source.matchAll(/\n\s+(schema|figure): /g)) {
  let i = m.index + m[0].length;
  const debut = i;
  let prof = 0;
  let chaine = null;
  for (; i < source.length; i++) {
    const ch = source[i];
    if (chaine) {
      if (ch === "\\") i++;
      else if (ch === chaine) chaine = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") chaine = ch;
    else if ("([{".includes(ch)) prof++;
    else if (")]}".includes(ch)) {
      if (prof === 0) break;
      prof--;
    } else if (ch === "," && prof === 0) break;
  }
  const texte = source.slice(debut, i);
  const k = (source.slice(0, m.index).match(/\benonce:/g) || []).length;
  let ecran = false;
  const stub = (type) => (...args) => ({ type, args });
  const fn = new Function(...AIDES, "ecranSeulement", ...Object.keys(COULEURS), `return (${texte});`);
  const r = fn(...AIDES.map(stub), (d) => ((ecran = true), d), ...Object.values(COULEURS));
  dessins.push({ k, role: m[1], ecran, texte, ...r });
}
const dessin = (k, role) => {
  const d = dessins.find((x) => x.k === k && x.role === role);
  if (!d) throw new Error(`exercice ${k} : pas de ${role}`);
  return d;
};
/** Une courbe du repère, évaluée : `q` (ax² + bx + c) ou `pts` (ligne brisée). */
const evalCourbe = (co) =>
  co.q
    ? (x) => co.q[0] * x * x + co.q[1] * x + co.q[2]
    : (x) => {
        const p = co.pts;
        for (let i = 0; i + 1 < p.length; i++)
          if (x >= p[i][0] - 1e-12 && x <= p[i + 1][0] + 1e-12) return p[i][1] + ((x - p[i][0]) * (p[i + 1][1] - p[i][1])) / (p[i + 1][0] - p[i][0]);
        return NaN;
      };
/** Les points marqués du repère de l'exercice k sont-ils exactement ces (x ; y) ? */
const points = (k, role, attendus) => {
  const got = dessin(k, role).args[2] ?? [];
  const ok = got.length === attendus.length && attendus.every(([x, y], i) => proche(got[i].x, x) && proche(got[i].y, y));
  v.ok(`${k}. points du dessin (${role})`, ok, JSON.stringify(got.map((p) => [p.x, p.y])));
};
/** La courbe i du repère de l'exercice k vaut-elle F en ces abscisses ? */
const courbe = (k, role, i, F, xs) => {
  const co = dessin(k, role).args[1][i];
  const G = evalCourbe(co);
  v.ok(`${k}. courbe ${i + 1} du dessin (${role})`, xs.every((x) => proche(G(x), F(x))), JSON.stringify(co));
};
/** La ligne du tableau de l'exercice k vaut-elle F(en-tête) ? */
const tableauVaut = (k, role, F) => {
  const [entete, ligne] = dessin(k, role).args;
  entete.slice(1).forEach((h, i) => vaut(`${k}. tableau, colonne « ${h} »`, nombre(ligne[i + 1]), F(nombre(h))));
};

/* ═══════════════ Les calculs, exercice par exercice ═══════════════ */

const suite = (u0, r) => (n) => u0 + n * r;
try {
  /* ── ★ ── */
  eg(1, "5 - 3 = 2", "7 - 5 = 2", "9 - 7 = 2", "11 - 9 = 2");
  points(1, "schema", [0, 1, 2, 3, 4].map((n) => [n, suite(3, 2)(n)]));
  courbe(1, "schema", 0, suite(3, 2), [0, 4]);
  eg(2, "45 - 50 = -5", "40 - 45 = -5", "35 - 40 = -5");
  dit(2, "$r = -5$");
  points(2, "schema", [0, 1, 2, 3].map((n) => [n, suite(50, -5)(n) / 5]));
  v.ok("2. escalier : chaque marche descend de 5 (un carreau)", JSON.stringify(dessin(2, "schema").args[1][1].pts) === JSON.stringify([0, 1, 2].flatMap((n) => [[n, suite(50, -5)(n) / 5], [n + 1, suite(50, -5)(n) / 5]]).concat([[3, 7]])));
  tableauVaut(4, "schema", suite(3, 4));
  tableauVaut(5, "schema", suite(3, 4));
  dit(5, "$u(0 + 1) = u(1) = 7$", "$u(0) + 1 = 4$");
  eg(6, "10 \\times 3 = 30");
  points(6, "schema", [[0, 2], [10, 5]]);
  courbe(6, "schema", 0, (n) => suite(20, 3)(n) / 10, [0, 10]);
  v.ok("6. la marche : 10 rangs, puis +30 (3 carreaux)", JSON.stringify(dessin(6, "schema").args[1][1].pts) === JSON.stringify([[0, 2], [10, 2], [10, 2 + (10 * 3) / 10]]));
  {
    const c7 = [1];
    for (let n = 0; n < 4; n++) c7.push(c7[n] + n);
    points(7, "schema", c7.map((u, n) => [n, u]));
    dit(7, "$1$ ; $1$ ; $2$ ; $4$ ; $7$");
  }
  eg(8, "5 + 2 \\times 2 = 9");
  tableauVaut(8, "schema", (n) => 5 + (n - 1) * 2);
  eg(3, "2 - 1 = 1", "4 - 2 = 2", "8 - 4 = 4");
  points(3, "schema", [0, 1, 2, 3].map((n) => [n, 2 ** n]));
  eg(4, "3 + 4 = 7", "7 + 4 = 11", "11 + 4 = 15");
  dit(5, "$u_1 = 7$", "$u_0 + 1 = 4$");
  vaut("5. u₁ de l'exercice 4", suite(3, 4)(1), 7);
  eg(6, "20 + 30 = 50");
  vaut("6. u₁₀", suite(20, 3)(10), 50);
  dit(6, "$u_1 = 23$", "$u_2 = 26$");
  vaut("6. u₂", suite(20, 3)(2), 26);
  dit(7, "de raison $7$", "de raison $-0{,}5$", "pas arithmétique");
  eg(8, "20 - 1 = 19", "5 + 38 = 43", "5 + 20 \\times 2 = 45");
  vaut("8. u₂₀ (depuis u₁)", 5 + (20 - 1) * 2, 43);

  /* ── ★★ ── */
  eg(9, "60 + 15 = 75", "75 + 15 = 90", "60 + 4 \\times 15 = 120");
  points(9, "schema", [0, 1, 2, 3, 4].map((n) => [n, suite(60, 15)(n) / 10]));
  eg(10, "1\\,300 - 1\\,200 = 100", "1\\,400 - 1\\,300 = 100", "1\\,500 - 1\\,400 = 100", "1\\,200 + 10 \\times 100 = 2\\,200");
  tableauVaut(10, "figure", suite(1200, 100));
  vaut("10. arbres plantés en 10 ans", suite(1200, 100)(10) - 1200, 1000);
  eg(11, "120 + 5 \\times (-10) = 120 - 50 = 70");
  points(11, "schema", [0, 1, 2, 3, 4, 5].map((n) => [n, suite(120, -10)(n) / 10]));
  courbe(11, "schema", 0, (n) => suite(120, -10)(n) / 10, [0, 5]);
  eg(12, "2024 + 3 = 2027", "40 + 6 \\times 6 = 76");
  tableauVaut(12, "figure", (an) => suite(40, 6)(an - 2024));
  dit(12, "$u(3) = 58$");
  eg(13, "25 - 20 = 5", "30 - 25 = 5", "35 - 30 = 5", "22 - 20 = 2", "26 - 22 = 4", "32 - 26 = 6", "35 + 5 = 40");
  ditE(13, "$20$ ; $25$ ; $30$ ; $35$", "$20$ ; $22$ ; $26$ ; $32$");
  points(13, "schema", [...[0, 1, 2, 3].map((n) => [n, suite(20, 5)(n) / 5]), ...[[1, 22], [2, 26], [3, 32]].map(([n, u]) => [n, u / 5])]);
  courbe(13, "schema", 0, (n) => suite(20, 5)(n) / 5, [0, 3]);
  courbe(13, "schema", 1, (n) => [20, 22, 26, 32][n] / 5, [0, 1, 2, 3]);
  eg(14, "3 + 2 = 5", "5 + 2 = 7", "3 + 10 \\times 2 = 23");
  points(14, "schema", [0, 1, 2, 3, 4].map((n) => [n, suite(3, 2)(n)]));
  eg(15, "800 + 50 = 850", "850 + 50 = 900", "12 - 1 = 11", "800 + 11 \\times 50 = 1\\,350");
  tableauVaut(15, "schema", (n) => suite(800, 50)(n - 1));
  eg(16, "15 + 10 \\times (-0{,}6) = 15 - 6 = 9", "15 - 25 \\times 0{,}6 = 15 - 15 = 0");
  tableauVaut(16, "schema", (alt) => Math.round((15 - 0.6 * (alt / 100)) * 1e9) / 1e9);

  /* ── ★★★ ── */
  eg(17, "800 + 150 = 950", "950 + 150 = 1\\,100", "800 \\times 1{,}1 = 880", "880 \\times 1{,}1 = 968", "880 - 800 = 80", "968 - 880 = 88", "800 + 6 \\times 150 = 1\\,700");
  vaut("17. 2031 = rang 6", 2031 - 2025, 6);
  const b17 = (n) => 800 * 1.1 ** n;
  points(17, "schema", [...[0, 1, 2, 3].map((n) => [n, suite(800, 150)(n) / 100]), ...[1, 2, 3].map((n) => [n, b17(n) / 100])]);
  courbe(17, "schema", 0, (n) => suite(800, 150)(n) / 100, [0, 3]);
  courbe(17, "schema", 1, (n) => b17(n) / 100, [0, 1, 2, 3]);
  eg(18, "12 + 3 = 15", "15 + 3 = 18", "12 + 7 \\times 3 = 33", "12 + 9 \\times 3 = 39");
  ditE(18, "$12 + 10 \\times 3 = 42$");
  vaut("18. calcul faux de l'ami", 12 + 10 * 3, 42);
  tableauVaut(18, "schema", (n) => suite(12, 3)(n - 1));
  eg(19, "525 - 540 = -15", "510 - 525 = -15", "495 - 510 = -15", "540 + 9 \\times (-15) = 540 - 135 = 405", "540 - 36 \\times 15 = 540 - 540 = 0");
  dessin(19, "figure").args[1].forEach((d, n) => vaut(`19. barre « ${d.label} »`, d.value, suite(540, -15)(n)));
  eg(20, "1\\,800 + 5 \\times 60 = 2\\,100", "1\\,950 + 5 \\times 30 = 2\\,100", "1\\,800 + 10 \\times 60 = 2\\,400", "1\\,950 + 10 \\times 30 = 2\\,250");
  tableauVaut(20, "schema", (n) => suite(1800, 60)(n) - suite(1950, 30)(n));
} catch (err) {
  v.ok("le recalcul s'exécute", false, String(err?.stack ?? err));
}

/* ═══════════════ Les règles de rendu (mesurées à 375 px, 28/09) ═══════════════ */

const chainesDe = (x) => (typeof x === "string" ? [x] : Array.isArray(x) ? x.flatMap(chainesDe) : x && typeof x === "object" ? Object.values(x).flatMap(chainesDe) : []);
const imprimes = dessins.filter((d) => !d.ecran).length;
v.ok(`${imprimes} dessins imprimés (10 à 14 attendus)`, imprimes >= 10 && imprimes <= 14);
for (const k of new Set(dessins.map((d) => d.k))) {
  const [fi, sc] = ["figure", "schema"].map((r) => dessins.find((d) => d.k === k && d.role === r));
  if (fi && sc) v.ok(`${k}. le même dessin dans l'énoncé et le corrigé`, fi.texte.replace(/ecranSeulement\((.*)\)$/s, "$1") !== sc.texte.replace(/ecranSeulement\((.*)\)$/s, "$1"));
}
for (const d of dessins) {
  const nom = `${d.k}. ${d.type} (${d.role})`;
  const textes = chainesDe(d.args).filter((s) => !s.startsWith("#"));
  v.ok(`${nom} : texte nu, sans $ ni antislash`, textes.every((s) => !/[$\\]/.test(s)), textes.join(" | "));
  v.ok(`${nom} : vrai signe moins`, textes.every((s) => !/(^|[\s(])-\s?\d/.test(s)), textes.join(" | "));
  v.ok(`${nom} : données écrites en clair`, !/Math\.|=>|\.map\(/.test(d.texte));
  if (d.type === "tableau") {
    const [entete, ligne, vertical] = d.args;
    v.ok(`${nom} : entete.length === ligne.length`, entete.length === ligne.length, `${entete.length} / ${ligne.length}`);
    if (entete.length >= 7) v.ok(`${nom} : ${entete.length} colonnes, donc vertical`, !!vertical);
  }
  if (d.type === "diagramme" && d.args[1].length >= 4)
    d.args[1].forEach((b) => v.ok(`${nom} : « ${b.label} » en 9 signes au plus`, [...b.label].length <= 9));
  if (d.type === "repere") {
    const [[xmin, xmax, ymin, ymax], courbes, marques = [], horizontale, grand = false] = d.args;
    const [lx, ly] = [xmax - xmin, ymax - ymin];
    v.ok(`${nom} : ymin < 0`, ymin < 0);
    v.ok(`${nom} : 16 unités au plus par axe`, lx <= 16 && ly <= 16, `${lx} × ${ly}`);
    v.ok(`${nom} : plus de 10 unités, donc grand = true`, grand === true || (lx <= 10 && ly <= 10), `${lx} × ${ly}`);
    v.ok(`${nom} : courbes q ou pts`, courbes.every((co) => Array.isArray(co.q) !== Array.isArray(co.pts)));
    for (const h of horizontale === undefined ? [] : [].concat(horizontale)) v.ok(`${nom} : horizontale ${h} dans le cadre`, h > ymin && h < ymax);
    const fs2 = courbes.map(evalCourbe);
    for (const p of marques) {
      v.ok(`${nom} : (${p.x} ; ${p.y}) dans le cadre`, p.x >= xmin && p.x <= xmax && p.y >= ymin && p.y <= ymax);
      if (courbes.length) v.ok(`${nom} : (${p.x} ; ${p.y}) sur une courbe`, fs2.some((F) => proche(F(p.x), p.y)));
    }
    // Géométrie de l'étiquette (FonctionGraphiqueCanvas : texte en 13, posé en
    // (x + 8 ; y − 8)) : dans le cadre, loin des nombres des axes, des autres
    // points et des autres étiquettes.
    const [W, H] = grand ? [272, 272] : [215, 200];
    const sx = (x) => ((x - xmin) / lx) * W;
    const sy = (y) => ((ymax - y) / ly) * H;
    const boite = (p) => ({ x0: sx(p.x) + 8, x1: sx(p.x) + 8 + 7.8 * [...p.label].length, y0: sy(p.y) - 21, y1: sy(p.y) - 5 });
    const coupe = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    const etiquetes = marques.filter((p) => p.label);
    const axeX = sy(0);
    const axeY = sx(0);
    const nombresY = axeY > 26 ? { x0: axeY - 30, x1: axeY - 3, y0: -1e9, y1: 1e9 } : { x0: axeY + 3, x1: axeY + 30, y0: -1e9, y1: 1e9 };
    const nombresX = { x0: -1e9, x1: 1e9, y0: axeX + 5, y1: axeX + 21 };
    for (const p of etiquetes) {
      const b = boite(p);
      const autres = marques.filter((q) => q !== p);
      v.ok(`${nom} : étiquette « ${p.label} » dans le cadre`, b.x1 <= W && b.y0 >= 0);
      v.ok(`${nom} : étiquette « ${p.label} » loin des nombres des axes`, !coupe(b, nombresX) && !coupe(b, nombresY));
      v.ok(`${nom} : étiquette « ${p.label} » sur aucun autre point`, autres.every((q) => !coupe(b, { x0: sx(q.x) - 5, x1: sx(q.x) + 5, y0: sy(q.y) - 5, y1: sy(q.y) + 5 })));
      v.ok(`${nom} : étiquette « ${p.label} » sur aucune autre étiquette`, etiquetes.filter((q) => q !== p).every((q) => !coupe(b, boite(q))));
    }
  }
}

/* ═══════════════ Le texte : en-tête, rappels, socle commun ═══════════════ */

const parExercice = source
  .slice(source.indexOf("series: ["))
  .split(/\benonce:/)
  .slice(1)
  .map((t) => [...(t.match(/micros: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"(\w+)"/g)].map((m) => m[1]));
const entete = source.slice(source.indexOf("// Micro-compétences"), source.indexOf("\nimport")).replace(/\n\/\/ ?/g, " ");
const annoncees = [...entete.matchAll(/(lin_\w+) \(([^)]*)\)/g)];
for (const [, id, liste] of annoncees) {
  const annonce = liste.split(",").map((s) => Number(s.trim()));
  const reel = parExercice.flatMap((l, i) => (l.includes(id) ? [i + 1] : []));
  v.ok(`en-tête : ${id} (${annonce.join(", ")})`, JSON.stringify(annonce) === JSON.stringify(reel), `réel : ${reel.join(", ")}`);
}
const toutes = new Set(parExercice.flat());
v.ok(`en-tête : « ${toutes.size}/${toutes.size} » et toutes les micros annoncées`, entete.includes(`${toutes.size}/${toutes.size}.`) && annoncees.length === toutes.size);
for (const m of source.matchAll(/rappel: \[([\s\S]*?)\n\s*\],/g)) {
  const n = (m[1].match(/^\s*"/gm) ?? []).length;
  v.ok(`rappel de ${n} lignes (2 à 4)`, n >= 2 && n <= 4);
}
const titres = [...source.matchAll(/\n {10}titre: "/g)].length;
v.ok(`${titres} problèmes titrés (au moins les 4 du ★★★)`, titres >= 4);

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

fausses.forEach((x) => console.log("  ✗", x));
console.log(`${NOM} — ${dessins.length} dessins dont ${imprimes} imprimés — ${justes} vérifications justes, ${fausses.length} fausses`);
process.exit(fausses.length ? 1 : 0);
