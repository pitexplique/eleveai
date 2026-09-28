// Recalcul indépendant de la feuille « Suite arithmétique : terme général » (1re
// sans spé, chapitre « Variation linéaire », 28/09/2026) :
// lib/fiches-exercices/maths-premiere-lin-suite-terme-general.tsx
//
// Chaque terme annoncé est recalculé par u₀ + n·r (ou u₁ + (n − 1)·r), chaque
// égalité numérique du corrigé est relue À SA PLACE et évaluée en fractions
// exactes (`outilsEgalites`), chaque terme général écrit est comparé à la suite
// (`identiques`), chaque sens de variation au signe de la raison. Les DESSINS
// sont relus dans le source et comparés aux suites : chaque point marqué est
// le bon terme, chaque droite porte les bons termes. Plus les RÈGLES DE RENDU
// mesurées à 375 px, la couverture des micros annoncée en en-tête, 8 + 8 + 4
// et exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-lin-suite-terme-general.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, outilsEgalites, identiques } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-lin-suite-terme-general.tsx";
const NOTION = "lin_suite_terme_general";
const NOM = "Suite arithmétique : terme général (1re)";
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
  /** Le sens de variation écrit est-il celui du signe de la raison ? */
  const sens = (k, r, mot) => v.ok(`${k}. raison ${r} : « ${mot} »`, (r > 0 ? "croissante" : r < 0 ? "décroissante" : "constante") === mot && c(k).includes(mot));

  /* ── ★ ── */
  v.ok("1. u_n = 5 + 3n", identiques("5 + 3x", "5 + x \\times 3"));
  eg(1, "5 + 3 \\times 20 = 65", "5 + 3 = 8");
  vaut("1. u₂₀", suite(5, 3)(20), 65);
  v.ok("2. u_n = 40 − 2,5n", identiques("40 + x \\times (-2{,}5)", "40 - 2{,}5x"));
  dit(2, "$u_n = 40 - 2{,}5n$");
  eg(2, "40 - 2{,}5 \\times 8 = 40 - 20 = 20");
  v.ok("3. 7 + (n − 1) × 4 = 4n + 3", identiques("7 + (x - 1) \\times 4", "4x + 3") && identiques("7 + 4x - 4", "4x + 3"));
  dit(3, "$u_n = 4n + 3$");
  eg(3, "4 \\times 1 + 3 = 7", "4 \\times 15 + 3 = 63");
  vaut("3. u₁₅ depuis u₁", 7 + (15 - 1) * 4, 63);
  vaut("3. le piège 7 + 4n en n = 1", 7 + 4 * 1, 11);
  [["a", -3, "décroissante"], ["b", 2, "croissante"], ["c", 0.5, "croissante"], ["d", -1, "décroissante"], ["e", 0, "constante"]].forEach(([q, r, mot]) =>
    v.ok(`4${q}. raison ${r} : ${mot}`, c(4).includes(`${q}) `) && c(4).split(`${q}) `)[1].split("\\n")[0].includes(mot) && (r > 0 ? "croissante" : r < 0 ? "décroissante" : "constante") === mot),
  );
  points(5, "schema", [0, 1, 2, 3, 4].map((n) => [n, 2 * n - 1]));
  courbe(5, "schema", 0, (n) => 2 * n - 1, [0, 4]);
  dit(5, "$u_0 = -1$, $u_1 = 1$, $u_2 = 3$, $u_3 = 5$, $u_4 = 7$");
  points(6, "figure", [0, 1, 2, 3, 4, 5].map((n) => [n, suite(6, -1)(n)]));
  dit(6, "$u_0 = 6$", "$r = -1$", "$u_n = 6 - n$");
  sens(6, -1, "décroissante");
  eg(6, "6 - 5 = 1");
  eg(7, "12 - 0{,}5 \\times 0 = 12", "12 - 0{,}5 \\times 30 = 12 - 15 = -3");
  sens(7, -0.5, "décroissante");
  eg(8, "250 + 30 \\times 12 = 610", "30 \\times 12 = 360");

  /* ── ★★ ── */
  eg(9, "80 + 15 \\times 6 = 170");
  vaut("9. 2031 = rang 6", 2031 - 2025, 6);
  sens(9, 15, "croissante");
  dit(9, "$80$ ; $95$ ; $110$ ; $125$ ; $140$");
  points(9, "schema", [0, 1, 2, 3, 4].map((n) => [n, suite(80, 15)(n) / 10]));
  eg(10, "150 - 12 \\times 5 = 90", "150 - 12 \\times 10 = 30", "150 - 12 \\times 15 = -30");
  sens(10, -12, "décroissante");
  tableauVaut(10, "schema", (an) => suite(150, -12)(an - 2024));
  points(11, "figure", [0, 1, 2, 3, 4].map((n) => [n, suite(2, 1.5)(n)]));
  eg(11, "2 + 1{,}5 \\times 10 = 17");
  dit(11, "$u_0 = 2$", "$r = 1{,}5$", "$170$ panneaux");
  v.ok("12. 600 + (n − 1) × 25 = 575 + 25n", identiques("600 + (x - 1) \\times 25", "575 + 25x"));
  eg(12, "575 + 25 \\times 1 = 600", "575 + 25 \\times 10 = 825", "825 - 600 = 225");
  vaut("12. 9 hausses", 9 * 25, 225);
  eg(13, "900 - 35 \\times 10 = 550", "300 + 25 \\times 10 = 550", "900 - 35 \\times 12 = 480", "300 + 25 \\times 12 = 600");
  sens(13, -35, "décroissante");
  sens(13, 25, "croissante");
  courbe(13, "figure", 0, (n) => suite(900, -35)(n) / 100, [0, 5, 10, 12]);
  courbe(13, "figure", 1, (n) => suite(300, 25)(n) / 100, [0, 5, 10, 12]);
  eg(14, "4{,}5 + 0{,}8 \\times 10 = 12{,}5", "0{,}8 \\times 10 = 8");
  sens(14, 0.8, "croissante");
  dit(14, "$4{,}5$ ; $5{,}3$ ; $6{,}1$ ; $6{,}9$ ; $7{,}7$ ; $8{,}5$");
  points(14, "schema", [0, 1, 2, 3, 4, 5].map((n) => [n, suite(4.5, 0.8)(n)]));
  courbe(14, "schema", 0, suite(4.5, 0.8), [0, 5]);
  sens(15, -4, "décroissante");
  dit(15, "$60$ ; $56$ ; $52$ ; $48$ ; $44$ ; $40$");
  points(15, "schema", [0, 1, 2, 3, 4, 5].map((n) => [n, suite(60, -4)(n) / 10]));
  eg(15, "60 - 4 \\times 12 = 12");
  eg(16, "32\\,000 + 180 \\times 160 = 60\\,800", "180 \\times 160 = 28\\,800");

  /* ── ★★★ ── */
  sens(17, 3, "croissante");
  dit(17, "$12$ ; $15$ ; $18$ ; $21$ ; $24$");
  points(17, "schema", [0, 1, 2, 3, 4].map((n) => [n, suite(12, 3)(n) / 3]));
  courbe(17, "schema", 0, (n) => suite(12, 3)(n) / 3, [0, 4]);
  eg(17, "12 + 3 \\times 10 = 42", "12 + 3 \\times 5 = 27", "42 - 27 = 15");
  sens(18, -0.5, "décroissante");
  eg(18, "75 - 0{,}5 \\times 4 = 73", "75 - 0{,}5 \\times 8 = 71", "75 - 0{,}5 \\times 12 = 69", "75 - 0{,}5 \\times 150 = 0");
  tableauVaut(18, "schema", suite(75, -0.5));
  sens(19, -40, "décroissante");
  eg(19, "480 - 40 \\times 6 = 240", "\\dfrac{480}{40} = 12", "480 - 40 \\times 12 = 0");
  points(19, "schema", [0, 2, 4, 6, 8, 10, 12].map((n) => [n, suite(480, -40)(n) / 100]));
  vaut("19. émissions nulles en 2036", 2024 + 480 / 40, 2036);
  sens(20, 30, "croissante");
  sens(20, -30, "décroissante");
  eg(20, "1\\,400 - 400 = 1\\,000", "400 + 30 \\times 10 = 700", "1\\,000 - 30 \\times 10 = 700");
  v.ok("20. e_n + t_n = 1 400", identiques("400 + 30x + 1000 - 30x", "1400"));
  courbe(20, "schema", 0, (n) => suite(400, 30)(n) / 100, [0, 10, 12]);
  courbe(20, "schema", 1, (n) => suite(1000, -30)(n) / 100, [0, 10, 12]);
  points(20, "schema", [[10, 7]]);

  /* ── Dessins ajoutés (consigne du 28/09 : un canvas qui aide) ── */
  tableauVaut(1, "schema", suite(5, 3));
  points(2, "schema", [[0, 4], [8, suite(40, -2.5)(8) / 10]]);
  courbe(2, "schema", 0, (n) => suite(40, -2.5)(n) / 10, [0, 8]);
  v.ok("2. marche : 8 rangs, puis −20", JSON.stringify(dessin(2, "schema").args[1][1].pts) === JSON.stringify([[0, 4], [8, 4], [8, 4 - (8 * 2.5) / 10]]));
  eg(2, "8 \\times 2{,}5 = 20");
  tableauVaut(3, "schema", (n) => 7 + (n - 1) * 4);
  courbe(4, "schema", 0, suite(12, -3), [0, 4]);
  courbe(4, "schema", 1, suite(7, 0.5), [0, 4]);
  courbe(4, "schema", 2, suite(9, 0), [0, 4]);
  tableauVaut(7, "schema", suite(12, -0.5));
  points(8, "schema", [[0, 2.5], [12, suite(250, 30)(12) / 100]]);
  courbe(8, "schema", 0, (n) => suite(250, 30)(n) / 100, [0, 12]);
  v.ok("8. marche : 12 mois, puis +360", JSON.stringify(dessin(8, "schema").args[1][1].pts) === JSON.stringify([[0, 2.5], [12, 2.5], [12, 2.5 + 360 / 100]]));
  tableauVaut(12, "schema", (n) => 575 + 25 * n);
  tableauVaut(16, "schema", suite(32000, 180));
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
