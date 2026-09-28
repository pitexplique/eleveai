// Recalcul indépendant de la feuille « Fonction affine : lire et exploiter »
// (1re sans spé, chapitre « Variation linéaire », 28/09/2026) :
// lib/fiches-exercices/maths-premiere-lin-affine-lecture.tsx
//
// Chaque LECTURE annoncée (image, antécédent, point d'intersection, hauteur au
// coude) est refaite sur la courbe RELUE dans le source du dessin, pas sur la
// formule du corrigé ; chaque barème par morceaux est recalculé tranche par
// tranche, indépendamment de sa formule, puis comparé à la ligne brisée
// dessinée ; chaque point d'équilibre est recalculé et doit être sur les deux
// droites. Les égalités numériques du corrigé sont relues À LEUR PLACE et
// évaluées en fractions exactes (`outilsEgalites`), les formules littérales
// comparées (`identiques`). Plus les RÈGLES DE RENDU mesurées à 375 px, la
// couverture des micros annoncée en en-tête, 8 + 8 + 4 et exactement 20
// `correction:`.
// Usage : node scripts/verifier-exercices-premiere-lin-affine-lecture.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, outilsEgalites, identiques } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-lin-affine-lecture.tsx";
const NOTION = "lin_affine_lecture";
const NOM = "Fonction affine : lire et exploiter (1re)";
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
  /** La courbe i du dessin de l'exercice k, évaluée. */
  const lue = (k, role, i = 0) => evalCourbe(dessin(k, role).args[1][i]);
  /** Un barème par tranches, calculé tranche par tranche : [[début, taux], …]. */
  const bareme = (tranches) => (x) =>
    tranches.reduce((s, [debut, taux], i) => {
      const fin = tranches[i + 1]?.[0] ?? Infinity;
      return s + Math.max(0, Math.min(x, fin) - debut) * taux;
    }, 0);
  /** L'intersection de y = a1 x + b1 et y = a2 x + b2. */
  const croise = (a1, b1, a2, b2) => {
    const x = (b2 - b1) / (a1 - a2);
    return [x, a1 * x + b1];
  };

  /* ── ★ ── */
  {
    const F = lue(1, "schema");
    [[0, 3], [3, 0], [-1, 4]].forEach(([x, y]) => vaut(`1. droite en ${x}`, F(x), y));
    eg(1, "-3 + 3 = 0", "1 + 3 = 4");
    points(1, "schema", [[0, 3], [3, 0], [-1, 4]]);
  }
  {
    eg(2, "0{,}5 \\times 2 + 1 = 2", "0{,}5 \\times 4 + 1 = 3");
    points(2, "schema", [0, 2, 4].map((x) => [x, 0.5 * x + 1]));
  }
  {
    const F = lue(3, "figure");
    vaut("3. f(2) lu", F(2), 1);
    vaut("3. f(0) lu", F(0), -3);
    vaut("3. antécédent de 5 lu", F(4), 5);
    dit(3, "$f(2) = 1$", "$f(0) = -3$", "$x = 4$");
    eg(3, "2 \\times 4 - 3 = 5");
  }
  {
    const F = lue(4, "figure");
    vaut("4. f(2) lu", F(2), 4);
    vaut("4. f(5) lu", F(5), 8);
    dit(4, "$f(2) = 4$ et $f(5) = 8$", "$f(x) = 2x$", "$f(x) = x + 3$");
    vaut("4. pente 1", (F(3) - F(0)) / 3, 2);
    vaut("4. pente 2", (F(6) - F(3)) / 3, 1);
    eg(4, "\\dfrac{6}{3} = 2", "\\dfrac{3}{3} = 1", "2 \\times 3 = 6", "3 + 3 = 6");
  }
  {
    const parking = bareme([[0, 2], [3, 1]]);
    vaut("5. 2 h", parking(2), 4);
    vaut("5. 5 h", parking(5), 8);
    eg(5, "2 \\times 2 = 4", "3 \\times 2 = 6", "2 \\times 1 = 2", "6 + 2 = 8", "5 \\times 2 = 10");
    const F = lue(5, "schema");
    [1, 2, 3, 4, 5, 6].forEach((h) => vaut(`5. le dessin suit le tarif en ${h} h`, F(h), parking(h)));
    v.ok("5. même courbe que l'exercice 4", JSON.stringify(dessin(5, "schema").args[1][0].pts) === JSON.stringify(dessin(4, "figure").args[1][0].pts));
    points(5, "schema", [[2, 4], [5, 8]]);
  }
  {
    const [p, q] = croise(3, -6, -2, 14);
    vaut("6. prix", p, 4);
    vaut("6. quantité", q, 6);
    eg(6, "3 \\times 4 - 6 = 6", "-2 \\times 4 + 14 = 6");
    courbe(6, "schema", 0, (x) => 3 * x - 6, [2, 4, 6]);
    courbe(6, "schema", 1, (x) => -2 * x + 14, [2, 4, 6]);
    points(6, "schema", [[p, q]]);
  }
  {
    const [x, y] = croise(1, 1, -1, 5);
    courbe(7, "figure", 0, (t) => t + 1, [0, 3]);
    courbe(7, "figure", 1, (t) => -t + 5, [0, 3]);
    vaut("7. x", x, 2);
    vaut("7. y", y, 3);
    eg(7, "2 + 1 = 3", "-2 + 5 = 3");
    dit(7, "$(2 ; 3)$");
  }
  {
    eg(8, "1{,}5 \\times 2 - 2 = 1", "1{,}5 \\times 4 - 2 = 4");
    points(8, "schema", [0, 2, 4].map((x) => [x, 1.5 * x - 2]));
    courbe(8, "schema", 0, (x) => 1.5 * x - 2, [0, 4]);
  }

  /* ── ★★ ── */
  {
    const impot = bareme([[0, 0], [10000, 0.1]]);
    vaut("9. 8 000 €", impot(8000), 0);
    vaut("9. 14 000 €", impot(14000), 400);
    eg(9, "14\\,000 - 10\\,000 = 4\\,000", "0{,}1 \\times 4\\,000 = 400", "\\dfrac{500}{5\\,000} = 0{,}1", "0{,}1 \\times 14\\,000 = 1\\,400");
    vaut("9. taux moyen ≈ 0,029", Math.round((400 / 14000) * 1000) / 1000, 0.029);
    const F = lue(9, "figure");
    [0, 5, 8, 10, 12, 14, 15].forEach((m) => vaut(`9. le dessin suit le barème en ${m} milliers`, F(m), impot(1000 * m) / 100));
  }
  {
    const eau = bareme([[0, 2], [30, 3]]);
    vaut("10. 20 m³", eau(20), 40);
    vaut("10. 50 m³", eau(50), 120);
    eg(10, "20 \\times 2 = 40", "30 \\times 2 = 60", "20 \\times 3 = 60", "60 + 60 = 120", "3 \\times 50 - 30 = 120");
    v.ok("10. 60 + 3(x − 30) = 3x − 30", identiques("60 + 3 \\times (x - 30)", "3x - 30") && identiques("60 + 3x - 90", "3x - 30"));
    [31, 40, 50].forEach((x) => vaut(`10. formule = barème en ${x}`, 3 * x - 30, eau(x)));
    const F = lue(10, "schema");
    [0, 1, 2, 3, 4, 5].forEach((X) => vaut(`10. le dessin suit le tarif en ${10 * X} m³`, F(X), eau(10 * X) / 10));
    points(10, "schema", [[2, 4], [5, 12]]);
  }
  {
    const [p, q] = croise(4, -8, -2, 16);
    vaut("11. prix", p, 4);
    vaut("11. quantité", q, 8);
    courbe(11, "figure", 0, (x) => 4 * x - 8, [2, 4, 6]);
    courbe(11, "figure", 1, (x) => -2 * x + 16, [2, 4, 6]);
    eg(11, "4 \\times 4 - 8 = 8", "4 \\times 5 - 8 = 12", "-2 \\times 5 + 16 = 6", "12 - 6 = 6");
  }
  {
    const P = (p) => 1 + 0.1 * p;
    eg(12, "1 + 0{,}1 \\times 10 = 2", "1 + 0{,}1 \\times 40 = 5", "1 + 0{,}1 \\times 20 = 3");
    const F = lue(12, "schema");
    [0, 1, 2, 4].forEach((X) => vaut(`12. le dessin en ${10 * X} m`, F(X), P(10 * X)));
    points(12, "schema", [[0, 1], [2, 3], [4, 5]]);
  }
  {
    const A = (x) => 0.05 * x + 80;
    const B = (x) => 0.02 * x + 200;
    const [x] = croise(0.05, 80, 0.02, 200);
    vaut("13. égalité en 4 000 pages", x, 4000);
    eg(13, "\\dfrac{120}{0{,}03} = 4\\,000", "0{,}05 \\times 4\\,000 + 80 = 280", "0{,}05 \\times 6\\,000 + 80 = 380", "0{,}02 \\times 6\\,000 + 200 = 320");
    vaut("13. B(4 000)", B(4000), 280);
    courbe(13, "schema", 0, (X) => A(1000 * X) / 100, [0, 4, 8]);
    courbe(13, "schema", 1, (X) => B(1000 * X) / 100, [0, 4, 8]);
  }
  {
    const salaire = bareme([[0, 12], [35, 15]]);
    vaut("14. 30 h", salaire(30), 360);
    vaut("14. 40 h", salaire(40), 495);
    eg(14, "30 \\times 12 = 360", "35 \\times 12 = 420", "5 \\times 15 = 75", "420 + 75 = 495", "15 \\times 40 - 105 = 495");
    v.ok("14. 420 + 15(x − 35) = 15x − 105", identiques("420 + 15 \\times (x - 35)", "15x - 105"));
    vaut("14. la formule en 30 h (faux exprès)", 15 * 30 - 105, 345);
    const F = lue(14, "schema");
    [0, 2, 3, 3.5, 4, 4.5].forEach((X) => vaut(`14. le dessin en ${10 * X} h`, F(X), salaire(10 * X) / 100));
  }
  {
    const d = (x) => (x * 25000) / 100000;
    vaut("15. 1 cm = 0,25 km", d(1), 0.25);
    eg(15, "0{,}25 \\times 12 = 3", "0{,}25 \\times 8 = 2");
    vaut("15. 2,5 km = 10 cm", 2.5 / 0.25, 10);
    courbe(15, "schema", 0, d, [0, 8, 12]);
    points(15, "schema", [8, 10, 12].map((x) => [x, d(x)]));
  }
  {
    const F = lue(16, "figure");
    vaut("16. restant à 2 h (lu)", F(2), 9);
    vaut("16. arrivée à 8 h (lu)", F(8), 0);
    vaut("16. départ (lu)", F(0), 12);
    eg(16, "\\dfrac{-3}{2} = -1{,}5", "-1{,}5 \\times 8 + 12 = 0");
  }

  /* ── ★★★ ── */
  {
    const impot = bareme([[0, 0], [10000, 0.1], [20000, 0.3]]);
    vaut("17. 20 000 €", impot(20000), 1000);
    vaut("17. 30 000 €", impot(30000), 4000);
    eg(17, "0{,}1 \\times 10\\,000 = 1\\,000", "0{,}3 \\times 10\\,000 = 3\\,000", "1\\,000 + 3\\,000 = 4\\,000", "0{,}3 \\times 30\\,000 - 5\\,000 = 4\\,000");
    vaut("17. taux moyen ≈ 0,133", Math.round((4000 / 30000) * 1000) / 1000, 0.133);
    v.ok("17. I(x) = 0,3x − 5 000", identiques("1\\,000 + 0{,}3 \\times (x - 20\\,000)", "0{,}3x - 5\\,000") && identiques("1\\,000 + 0{,}3x - 6\\,000", "0{,}3x - 5\\,000"));
    [20000, 25000, 30000, 40000].forEach((x) => vaut(`17. formule = barème en ${x}`, 0.3 * x - 5000, impot(x)));
    v.ok("17. après impôt, toujours croissant", [0, 5000, 15000, 25000, 35000].every((x) => x + 1000 - impot(x + 1000) > x - impot(x)));
    const F = lue(17, "schema");
    [0, 0.5, 1, 1.5, 2, 2.5, 3].forEach((X) => vaut(`17. le dessin en ${10000 * X} €`, F(X), impot(10000 * X) / 1000));
  }
  {
    const O = (p) => 2 * p - 20;
    const D = (p) => 100 - p;
    const [p, q] = croise(2, -20, -1, 100);
    vaut("18. prix", p, 40);
    vaut("18. quantité", q, 60);
    eg(18, "2 \\times 40 - 20 = 60", "100 - 40 = 60", "2 \\times 50 - 20 = 80", "100 - 50 = 50", "80 - 50 = 30", "2 \\times 30 - 20 = 40", "100 - 30 = 70");
    vaut("18. pénurie à 30 €", D(30) - O(30), 30);
    courbe(18, "schema", 0, (X) => O(10 * X) / 10, [1, 4, 7]);
    courbe(18, "schema", 1, (X) => D(10 * X) / 10, [1, 4, 7]);
    points(18, "schema", [[p / 10, q / 10]]);
  }
  {
    const f = (n) => (n <= 10 ? 60 : 60 + 5 * (n - 10));
    vaut("19. 8 levées", f(8), 60);
    vaut("19. 15 levées", f(15), 85);
    eg(19, "60 + 5 \\times 5 = 85", "5 \\times 10 + 10 = 60");
    v.ok("19. 60 + 5(n − 10) = 5n + 10", identiques("60 + 5 \\times (x - 10)", "5x + 10"));
    const F = lue(19, "schema");
    [0, 5, 8, 10, 12, 15].forEach((n) => vaut(`19. le dessin en ${n} levées`, F(n), f(n) / 10));
    points(19, "schema", [[8, 6], [15, 8.5]]);
  }
  {
    const A = (x) => 12000 - 300 * x;
    const B = (x) => 8000 + 500 * x;
    const [x, y] = croise(-300, 12000, 500, 8000);
    vaut("20. année", 2020 + x, 2025);
    vaut("20. population", y, 10500);
    eg(20, "12\\,000 - 300 \\times 5 = 10\\,500", "8\\,000 + 500 \\times 5 = 10\\,500", "12\\,000 - 300 \\times 8 = 9\\,600", "8\\,000 + 500 \\times 8 = 12\\,000");
    courbe(20, "figure", 0, (t) => A(t) / 1000, [0, 5, 8]);
    courbe(20, "figure", 1, (t) => B(t) / 1000, [0, 5, 8]);
    v.ok("20. en 2028, B au-dessus (lu sur le dessin)", lue(20, "figure", 1)(8) > lue(20, "figure", 0)(8));
  }
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
