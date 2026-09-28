// Recalcul indépendant de la feuille « Modéliser une croissance linéaire » (1re
// sans spé, chapitre « Variation linéaire », 28/09/2026) :
// lib/fiches-exercices/maths-premiere-lin-modeliser.tsx
//
// Chaque modèle est reconstruit à partir des données de l'énoncé (départ et
// quantité ajoutée), jamais recopié ; chaque verdict « linéaire / pas
// linéaire » est refait sur les ÉCARTS des données ; chaque choix « suite /
// fonction » est comparé à la nature du dessin (points isolés pour une suite,
// droite tracée pour une fonction) ; chaque égalité numérique du corrigé est
// relue À SA PLACE et évaluée en fractions exactes (`outilsEgalites`). Plus
// les RÈGLES DE RENDU mesurées à 375 px, la couverture des micros annoncée en
// en-tête, 8 + 8 + 4 et exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-lin-modeliser.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, outilsEgalites, identiques } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-lin-modeliser.tsx";
const NOTION = "lin_modeliser";
const NOM = "Modéliser une croissance linéaire (1re)";
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
  /** Les écarts successifs d'une liste sont-ils tous égaux ? */
  const lineaire = (vals) => vals.slice(1).every((x, i) => proche(x - vals[i], vals[1] - vals[0]));
  /** Discret : des points, aucune courbe ; continu : une droite tracée. */
  const discret = (k, role) => {
    const d = dessin(k, role);
    v.ok(`${k}. dessin d'une SUITE : des points, sans courbe`, d.args[1].length === 0 && (d.args[2] ?? []).length >= 4);
  };
  const continu = (k, role) => {
    const d = dessin(k, role);
    v.ok(`${k}. dessin d'une FONCTION : une droite tracée`, d.args[1].length >= 1 && !!d.args[1][0].q);
  };

  /* ── ★ ── */
  {
    const quatre = (depart, f) => [0, 1, 2, 3].map((n) => f(depart, n));
    const verdicts = {
      a: lineaire(quatre(10, (d, n) => d + 3 * n)),
      b: lineaire(quatre(1000, (d, n) => d * 1.03 ** n)),
      c: lineaire(quatre(500, (d, n) => d - 50 * n)),
      d: lineaire(quatre(1, (d, n) => d * 2 ** n)),
    };
    Object.entries(verdicts).forEach(([q, lin]) => {
      const ligne = c(1).split(`${q}) `)[1].split("\\n")[0];
      v.ok(`1${q}. ${lin ? "linéaire" : "pas linéaire"}`, lin ? ligne.includes("linéaire") && !ligne.includes("pas linéaire") : ligne.includes("pas linéaire"), ligne);
    });
  }
  dit(2, "a) On compte une fois par an : une suite", "b) La hauteur change à chaque instant : une fonction", "c) Un bilan chaque année : une suite", "d) La distance existe à tout instant : une fonction");
  eg(3, "3\\,000 + 150 \\times 8 = 4\\,200");
  vaut("3. u₈", suite(3000, 150)(8), 4200);
  eg(4, "\\dfrac{500}{20} = 25");
  vaut("4. vide en 25 min", 500 - 20 * 25, 0);
  vaut("5. u₈", suite(3500, 100)(8), 4300);
  eg(5, "100 \\times 8 = 800");
  v.ok("5. 8 mois après janvier : septembre", ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre"][8] === "septembre" && c(5).includes("La bonne phrase est b)"));
  {
    const [, ligne] = dessin(6, "figure").args;
    const vals = ligne.slice(1);
    v.ok("6. tableau linéaire", lineaire(vals));
    tableauVaut(6, "figure", suite(100, 30));
    eg(6, "130 - 100 = 30", "160 - 130 = 30", "190 - 160 = 30", "100 + 30 \\times 3 = 190");
    vaut("6. 190 centaines", 190 * 100, 19000);
  }
  {
    const d = dessin(7, "figure");
    const A = d.args[2].slice(0, 5).map((p) => p.y);
    const B = d.args[1][1].pts.map(([, y]) => y);
    v.ok("7. A linéaire, de 2 en 2", lineaire(A) && A[1] - A[0] === 2);
    v.ok("7. B pas linéaire, écarts qui doublent", !lineaire(B) && B.slice(1).map((y, i) => y - B[i]).join() === "0.5,1,2,4");
    courbe(7, "figure", 0, (n) => 1 + 2 * n, [0, 4]);
  }
  vaut("8. x = 10", (160 - 40) / 12, 10);
  dit(8, "$12x = 120$", "$10$ séances");

  /* ── ★★ ── */
  eg(9, "2\\,400 + 180 \\times 12 = 4\\,560");
  discret(9, "schema");
  points(9, "schema", [0, 2, 4, 6, 8, 10, 12].map((n) => [n, suite(2400, 180)(n) / 1000]));
  eg(10, "1{,}5 \\times 6 + 4 = 13");
  continu(10, "schema");
  courbe(10, "schema", 0, (t) => 1.5 * t + 4, [0, 6]);
  vaut("10. horizontale du bassin plein", dessin(10, "schema").args[3], 13);
  {
    const vals = dessin(11, "figure").args[1].map((b) => b.value);
    v.ok("11. diagramme linéaire", lineaire(vals));
    dessin(11, "figure").args[1].forEach((b) => vaut(`11. barre ${b.label}`, b.value, suite(1200, 300)(Number(b.label) - 2019)));
    eg(11, "1\\,500 - 1\\,200 = 300", "1\\,800 - 1\\,500 = 300", "2\\,100 - 1\\,800 = 300", "1\\,200 + 300 \\times 7 = 3\\,300");
  }
  {
    const vals = dessin(12, "figure").args[1].slice(1).map(nombre);
    vals.forEach((x, n) => vaut(`12. capital année ${n}`, x, Math.round(1000 * 1.04 ** n * 100) / 100));
    v.ok("12. pas linéaire", !lineaire(vals));
    eg(12, "1\\,040 - 1\\,000 = 40", "1\\,081{,}60 - 1\\,040 = 41{,}60", "1\\,000 + 40 \\times 2 = 1\\,080", "1\\,000 \\times 1{,}04 \\times 1{,}04 = 1\\,081{,}60");
  }
  {
    eg(13, "50 - 0{,}3 \\times 30 = 41");
    vaut("13. ≈ 167 ans", Math.round(50 / 0.3), 167);
    tableauVaut(13, "schema", (an) => Math.round(suite(50, -0.3)(an - 2025) * 1e9) / 1e9);
  }
  {
    eg(14, "0{,}8 \\times 15 + 2 = 14");
    dit(14, "$1\\,500$ locations", "$14\\,000$ €");
  }
  {
    eg(15, "250 \\times 20 + 2\\,000 = 7\\,000");
    continu(15, "schema");
    courbe(15, "schema", 0, (X) => (250 * 10 * X + 2000) / 1000, [0, 2]);
    points(15, "schema", [[2, 7]]);
    vaut("15. 250 m/min = 15 km/h", (250 * 60) / 1000, 15);
    vaut("15. distance courue", (250 * 20) / 1000, 5);
  }
  {
    eg(16, "120 + 40 \\times 5 = 320");
    dit(16, "$120$ ; $160$ ; $200$ ; $240$ ; $280$ ; $320$");
    discret(16, "schema");
    points(16, "schema", [0, 1, 2, 3, 4, 5].map((n) => [n, suite(120, 40)(n) / 100]));
    vaut("16. la droite reliée en n = 0,5", suite(120, 40)(0.5), 140);
  }

  /* ── ★★★ ── */
  {
    v.ok("17. L_n = 800 (45 + 5n)", identiques("800 \\times (45 + 5x)", "36\\,000 + 4\\,000x"));
    eg(17, "36\\,000 + 4\\,000 \\times 7 = 64\\,000");
    vaut("17. 80 chèvres en n = 7", (80 - 45) / 5, 7);
    vaut("17. 80 × 800", 80 * 800, 64000);
    discret(17, "schema");
    points(17, "schema", [0, 1, 2, 3, 4, 5, 6, 7].map((n) => [n, suite(45, 5)(n) / 10]));
  }
  {
    eg(18, "15 \\times 2 + 20 = 50");
    vaut("18. pleine en 80/15 h", 80 / 15, 16 / 3);
    vaut("18. un tiers d'heure = 20 min", (1 / 3) * 60, 20);
    v.ok("18. ≈ 5,33", Math.round((80 / 15) * 100) / 100 === 5.33);
    continu(18, "schema");
    courbe(18, "schema", 0, (t) => (15 * t + 20) / 10, [0, 2, 6]);
    vaut("18. horizontale des 100 %", dessin(18, "schema").args[3], 10);
    points(18, "schema", [[2, 5]]);
  }
  {
    const A = suite(750, 15);
    const B = (n) => 750 * 1.02 ** n;
    eg(19, "750 + 15 = 765", "750 \\times 1{,}02 = 765", "750 + 15 \\times 2 = 780", "765 \\times 1{,}02 = 780{,}30", "750 + 15 \\times 10 = 900");
    vaut("19. B(10) ≈ 914,25", Math.round(B(10) * 100) / 100, 914.25);
    vaut("19. écart ≈ 14", Math.round(B(10) - A(10)), 14);
    tableauVaut(19, "schema", (n) => Math.round((B(n) - A(n)) * 100) / 100);
  }
  {
    const h = (t) => 400 * t + 1200;
    vaut("20. sommet en t = 4", (2800 - 1200) / 400, 4);
    eg(20, "400 \\times 2{,}5 + 1\\,200 = 2\\,200");
    continu(20, "schema");
    courbe(20, "schema", 0, (t) => h(t) / 1000, [0, 2.5, 4]);
    points(20, "schema", [[2.5, 2.2], [4, 2.8]]);
    vaut("20. horizontale du sommet", dessin(20, "schema").args[3], 2.8);
  }

  /* ── Dessins ajoutés (consigne du 28/09 : un canvas qui aide) ── */
  courbe(1, "schema", 0, (n) => 1 + n, [0, 3]);
  courbe(1, "schema", 1, (n) => 2 ** n, [0, 1, 2, 3]);
  v.ok("1. le doublement n'est pas linéaire", !lineaire([0, 1, 2, 3].map((n) => 2 ** n)));
  points(2, "schema", [0, 1, 2, 3].map((n) => [n, n + 1]));
  discret(3, "schema");
  points(3, "schema", [0, 2, 4, 6, 8].map((n) => [n, suite(3000, 150)(n) / 1000]));
  continu(4, "schema");
  courbe(4, "schema", 0, (X) => (500 - 20 * 10 * X) / 100, [0, 2.5]);
  points(4, "schema", [[2.5, 0]]);
  {
    const [entete, ligne] = dessin(5, "schema").args;
    entete.slice(1).forEach((h, i) => vaut(`5. tableau rang ${h}`, nombre(ligne[i + 1]), suite(3500, 100)(Number(h))));
  }
  tableauVaut(8, "schema", (x) => 12 * x + 40);
  tableauVaut(14, "schema", (loc) => (0.8 * (loc / 100) + 2) * 1000);
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
