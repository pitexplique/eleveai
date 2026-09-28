// Recalcul indépendant de la feuille « Problème de seuil : croissance
// linéaire » (1re sans spé, chapitre « Variation linéaire », 28/09/2026) :
// lib/fiches-exercices/maths-premiere-lin-seuil.tsx
//
// Chaque seuil annoncé est retrouvé par BALAYAGE : on parcourt les rangs (ou
// les réels, au centième) jusqu'au premier qui franchit le seuil, sans passer
// par l'inéquation du corrigé. Le rang d'avant ne doit pas le franchir. Sur les
// dessins relus dans le source, l'HORIZONTALE doit être le seuil (à l'échelle
// des axes) et la droite doit la croiser à l'abscisse annoncée ; les tableaux
// sont recalculés case par case. Les égalités numériques du corrigé sont
// relues À LEUR PLACE et évaluées en fractions exactes (`outilsEgalites`).
// Plus les RÈGLES DE RENDU mesurées à 375 px, la couverture des micros
// annoncée en en-tête, 8 + 8 + 4 et exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-lin-seuil.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, outilsEgalites, identiques } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-lin-seuil.tsx";
const NOTION = "lin_seuil";
const NOM = "Problème de seuil : croissance linéaire (1re)";
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
  const tests = { ">=": (a, b) => a >= b - 1e-12, ">": (a, b) => a > b + 1e-12, "<": (a, b) => a < b - 1e-12 };
  /** Le premier rang entier (à partir de n0) où u franchit le seuil, par balayage. */
  const premierRang = (u, op, seuil, n0 = 0) => {
    for (let n = n0; n < 10000; n++) if (tests[op](u(n), seuil)) return n;
    return NaN;
  };
  /** Le seuil de rang k est-il juste : k franchit, k − 1 non ? */
  const rang = (k, u, op, seuil, attendu, n0 = 0) => {
    const n = premierRang(u, op, seuil, n0);
    v.ok(`${k}. premier rang ${op} ${seuil} : ${attendu}`, n === attendu && (n === n0 || !tests[op](u(n - 1), seuil)), `balayage : ${n}`);
  };
  /** Le seuil réel d'une fonction affine, par balayage au centième. */
  const seuilReel = (k, f, op, seuil, attendu) => {
    let x = -100;
    while (x < 1000 && !tests[op](f(x), seuil)) x = Math.round((x + 0.01) * 100) / 100;
    v.ok(`${k}. premier x ${op} ${seuil} ≈ ${attendu}`, Math.abs(x - attendu) <= 0.011, `balayage : ${x}`);
  };
  /** Le dessin : la droite, l'horizontale du seuil et leur croisement. */
  const horizontale = (k, role, h, xCroise) => {
    const d = dessin(k, role);
    const F = evalCourbe(d.args[1][0]);
    vaut(`${k}. horizontale du seuil (${role})`, d.args[3], h);
    vaut(`${k}. la droite croise l'horizontale en ${xCroise}`, F(xCroise), h);
  };

  /* ── ★ ── */
  rang(1, suite(50, 8), ">=", 120, 9);
  eg(1, "\\dfrac{70}{8} = 8{,}75", "50 + 8 \\times 8 = 114", "50 + 8 \\times 9 = 122");
  rang(2, suite(200, -15), "<", 100, 7);
  eg(2, "200 - 15 \\times 6 = 110", "200 - 15 \\times 7 = 95");
  vaut("2. 100/15 ≈ 6,67", Math.round((100 / 15) * 100) / 100, 6.67);
  tableauVaut(3, "figure", suite(12, 7));
  rang(3, suite(12, 7), ">", 30, 3);
  dit(3, "à partir du rang $3$");
  horizontale(4, "figure", 8, 4);
  courbe(4, "figure", 0, (x) => 1.5 * x + 2, [0, 4]);
  seuilReel(4, (x) => 1.5 * x + 2, ">=", 8, 4);
  eg(4, "\\dfrac{6}{1{,}5} = 4");
  seuilReel(5, (x) => 3 * x + 5, ">=", 20, 5);
  eg(5, "3 \\times 5 + 5 = 20");
  horizontale(6, "figure", 3, 3.5);
  courbe(6, "figure", 0, (x) => -2 * x + 10, [0, 3.5]);
  seuilReel(6, (x) => -2 * x + 10, "<", 3, 3.51);
  tableauVaut(7, "figure", suite(80, -8));
  rang(7, suite(80, -8), "<", 50, 4);
  eg(7, "80 - 8 \\times 4 = 48");
  rang(8, suite(1000, 250), ">=", 3000, 8);
  rang(8, suite(1000, 250), ">", 3000, 9);
  eg(8, "1\\,000 + 250 \\times 8 = 3\\,000");

  /* ── ★★ ── */
  rang(9, suite(1500, 120), ">=", 3000, 13);
  eg(9, "\\dfrac{1\\,500}{120} = 12{,}5", "1\\,500 + 120 \\times 12 = 2\\,940", "1\\,500 + 120 \\times 13 = 3\\,060");
  tableauVaut(9, "schema", suite(1500, 120));
  {
    const E = (t) => 60 - 4 * t;
    rang(10, E, "<", 30, 8);
    vaut("10. 2020 + 8", 2020 + 8, 2028);
    horizontale(10, "figure", 30 / 10, 7.5);
    courbe(10, "figure", 0, (t) => E(t) / 10, [0, 7.5, 12]);
    eg(10, "60 - 4 \\times 7 = 32", "60 - 4 \\times 8 = 28");
  }
  tableauVaut(11, "figure", suite(340, 25));
  rang(11, suite(340, 25), ">", 500, 7);
  eg(11, "\\dfrac{160}{25} = 6{,}4");
  {
    const u = (n) => 40 + 5 * (n - 1);
    v.ok("12. 40 + 5(n − 1) = 5n + 35", identiques("40 + 5(x - 1)", "5x + 35"));
    rang(12, u, ">=", 100, 13, 1);
    eg(12, "5 \\times 13 + 35 = 100", "40 + 12 \\times 5 = 100");
    horizontale(12, "schema", 10, 13);
    courbe(12, "schema", 0, (n) => u(n) / 10, [1, 13]);
    points(12, "schema", [[1, 4], [13, 10]]);
  }
  {
    const H = (t) => 0.15 * t + 1.2;
    seuilReel(13, H, ">=", 2.4, 8);
    horizontale(13, "figure", 2.4, 8);
    eg(13, "\\dfrac{1{,}2}{0{,}15} = 8", "6 + 8 = 14");
    vaut("13. 14 h − 3 h", 14 - 3, 11);
  }
  {
    const Q = (t) => 3 - 0.4 * t;
    seuilReel(14, Q, "<", 0.5, 6.26);
    eg(14, "\\dfrac{2{,}5}{0{,}4} = 6{,}25");
    vaut("14. 0,25 h = 15 min", 0.25 * 60, 15);
    tableauVaut(14, "schema", (t) => Math.round(Q(t) * 1e9) / 1e9);
  }
  {
    const A = (t) => 0.36 * t;
    tableauVaut(15, "schema", (t) => Math.round(A(t) * 1e9) / 1e9);
    eg(15, "0{,}36 \\times 25 = 9", "\\dfrac{9}{0{,}36} = 25", "20 + 25 = 45");
    seuilReel(15, A, ">=", 9, 25);
    vaut("15. 30 m × 12 millionièmes par °C", 30000 * 12e-6, 0.36);
  }
  {
    const C = (n) => 12 + 2.5 * n;
    rang(16, C, ">=", 40, 12);
    eg(16, "\\dfrac{28}{2{,}5} = 11{,}2", "12 + 2{,}5 \\times 11 = 39{,}5", "12 + 2{,}5 \\times 12 = 42");
    horizontale(16, "figure", 4, 11.2);
    courbe(16, "figure", 0, (n) => C(n) / 10, [0, 11.2, 14]);
  }

  /* ── ★★★ ── */
  {
    const u = suite(120, 35);
    rang(17, u, ">=", 400, 8);
    dit(17, "$u_6 = 330$, $u_7 = 365$, $u_8 = 400$, $u_9 = 435$");
    [6, 7, 8, 9].forEach((n) => v.ok(`17. u_${n} = ${u(n)}`, c(17).includes(`$u_${n} = ${u(n)}$`)));
    points(17, "schema", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => [n, u(n) / 100]));
    vaut("17. horizontale", dessin(17, "schema").args[3], 4);
  }
  {
    const u = suite(150, -4);
    rang(18, u, "<", 50, 26);
    tableauVaut(18, "schema", u);
    dit(18, "le 27 mars");
    vaut("18. 1er mars + 26 jours", 1 + 26, 27);
  }
  {
    const a = suite(25, 3);
    const b = suite(60, -2);
    rang(19, (n) => a(n) - b(n), ">", 0, 8);
    eg(19, "25 + 3 \\times 7 = 46", "60 - 2 \\times 7 = 46");
    dit(19, `$a_8 = ${a(8)}$ et $b_8 = ${b(8)}$`);
    courbe(19, "schema", 0, (n) => a(n) / 10, [0, 7, 10]);
    courbe(19, "schema", 1, (n) => b(n) / 10, [0, 7, 10]);
    points(19, "schema", [[7, a(7) / 10]]);
  }
  {
    const u = suite(40, 6);
    tableauVaut(20, "figure", (an) => u(an - 2015));
    eg(20, "52 - 40 = 12", "64 - 52 = 76 - 64 = 88 - 76 = 12", "\\dfrac{12}{2} = 6", "40 + 6 \\times 10 = 100");
    rang(20, u, ">=", 100, 10);
    horizontale(20, "schema", 10, 10);
    courbe(20, "schema", 0, (n) => u(n) / 10, [0, 10]);
  }

  /* ── Dessins ajoutés (consigne du 28/09 : un canvas qui aide) ── */
  points(1, "schema", [8, 9].map((n) => [n, suite(50, 8)(n) / 10]));
  courbe(1, "schema", 0, (n) => suite(50, 8)(n) / 10, [0, 10]);
  vaut("1. horizontale 120 en dizaines", dessin(1, "schema").args[3], 12);
  points(2, "schema", [6, 7].map((n) => [n, suite(200, -15)(n) / 100]));
  courbe(2, "schema", 0, (n) => suite(200, -15)(n) / 100, [0, 10]);
  vaut("2. horizontale 100 en centaines", dessin(2, "schema").args[3], 1);
  horizontale(5, "schema", 2, 5);
  courbe(5, "schema", 0, (x) => (3 * x + 5) / 10, [0, 5, 6]);
  tableauVaut(8, "schema", suite(1000, 250));
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
