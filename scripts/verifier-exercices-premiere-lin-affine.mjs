// Recalcul indépendant de la feuille « Fonction affine et taux d'accroissement »
// (1re sans spé, chapitre « Variation linéaire », 28/09/2026) :
// lib/fiches-exercices/maths-premiere-lin-affine.tsx
//
// Chaque fonction est reconstruite à partir des DEUX IMAGES de l'énoncé (a par
// le taux, b par une image), jamais recopiée ; chaque taux d'accroissement est
// recalculé ; chaque égalité numérique du corrigé est relue À SA PLACE et
// évaluée en fractions exactes (`outilsEgalites`) ; chaque sens de variation
// est comparé au signe de a. Les DESSINS sont relus dans le source : chaque
// droite est la fonction de l'exercice (mise à l'échelle des axes), chaque
// tableau et chaque barre en sont des valeurs. Plus les RÈGLES DE RENDU
// mesurées à 375 px, la couverture des micros annoncée en en-tête, 8 + 8 + 4
// et exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-lin-affine.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns, outilsEgalites, identiques } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-lin-affine.tsx";
const NOTION = "lin_affine";
const NOM = "Fonction affine et taux d'accroissement (1re)";
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
  /** La fonction affine qui passe par (x1 ; y1) et (x2 ; y2). */
  const parDeux = (x1, y1, x2, y2) => {
    const a = (y2 - y1) / (x2 - x1);
    const b = y1 - a * x1;
    return Object.assign((x) => a * x + b, { a, b });
  };
  const taux = (F, x1, x2) => (F(x2) - F(x1)) / (x2 - x1);
  const sensDe = (a) => (a > 0 ? "croissante" : a < 0 ? "décroissante" : "constante");
  /** Le dessin (repère) : la droite i vaut F mise à l'échelle (x → x·ex, y → y/ey). */
  const echelle = (k, role, i, F, ex, ey, xs) => courbe(k, role, i, (X) => F(X * ex) / ey, xs);

  /* ── ★ ── */
  const f1 = (x) => 3 * x - 2;
  eg(1, "3 \\times 1 - 2 = 1", "3 \\times 4 - 2 = 10", "\\dfrac{10 - 1}{4 - 1} = \\dfrac{9}{3} = 3");
  vaut("1. taux entre 1 et 4", taux(f1, 1, 4), 3);
  const g2 = (x) => -2 * x + 7;
  eg(2, "-2 \\times (-1) + 7 = 9", "-2 \\times 3 + 7 = 1", "\\dfrac{1 - 9}{3 - (-1)} = \\dfrac{-8}{4} = -2", "3 - (-1) = 4");
  vaut("2. taux entre −1 et 3", taux(g2, -1, 3), -2);
  const f3 = parDeux(2, 5, 6, 13);
  vaut("3. a", f3.a, 2);
  vaut("3. b", f3.b, 1);
  eg(3, "\\dfrac{13 - 5}{6 - 2} = \\dfrac{8}{4} = 2", "5 - 4 = 1", "2 \\times 6 + 1 = 13");
  dit(3, "$f(x) = 2x + 1$");
  const f4 = parDeux(0, 4, 5, -6);
  vaut("4. a", f4.a, -2);
  vaut("4. b", f4.b, 4);
  eg(4, "\\dfrac{-6 - 4}{5 - 0} = \\dfrac{-10}{5} = -2", "-2 \\times 5 + 4 = -6");
  dit(4, "$f(x) = -2x + 4$");
  [["a", 0.5, "$f$ est croissante"], ["b", -3, "$g$ est décroissante"], ["c", 0, "$h$ est constante"], ["d", -1, "$k$ est décroissante"]].forEach(([q, a, phrase]) =>
    v.ok(`5${q}. a = ${a} : « ${phrase} »`, phrase.endsWith(sensDe(a)) && c(5).split(`${q}) `)[1].split("\\n")[0].includes(phrase)),
  );
  v.ok("5b. 4 − 3x ≡ −3x + 4", identiques("4 - 3x", "-3x + 4"));
  {
    const [entete, ligne] = dessin(6, "figure").args;
    const xs = entete.slice(1).map(Number);
    const ys = ligne.slice(1).map(Number);
    const taux6 = xs.slice(1).map((x, i) => (ys[i + 1] - ys[i]) / (x - xs[i]));
    v.ok("6. les trois taux du tableau valent 3", taux6.every((t) => t === 3), taux6.join(", "));
    xs.forEach((x, i) => vaut(`6. f(${x}) = 3x + 1`, 3 * x + 1, ys[i]));
    eg(6, "\\dfrac{7 - 1}{2 - 0} = \\dfrac{6}{2} = 3", "\\dfrac{16 - 7}{5 - 2} = \\dfrac{9}{3} = 3", "\\dfrac{28 - 16}{9 - 5} = \\dfrac{12}{4} = 3");
  }
  {
    tableauVaut(7, "figure", (x) => x * x + 2);
    eg(7, "\\dfrac{3 - 2}{1 - 0} = 1", "\\dfrac{6 - 3}{2 - 1} = 3", "\\dfrac{11 - 6}{3 - 2} = 5");
    points(7, "schema", [0, 1, 2, 3].map((x) => [x, x * x + 2]));
  }
  {
    const f8 = parDeux(1, 10, 4, 4);
    eg(8, "\\dfrac{4 - 10}{4 - 1} = \\dfrac{-6}{3} = -2");
    v.ok("8. décroissante", sensDe(f8.a) === "décroissante" && c(8).includes("$f$ est décroissante"));
  }

  /* ── ★★ ── */
  {
    const F = (x) => 1.8 * x + 32;
    eg(9, "1{,}8 \\times 100 + 32 = 212", "\\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1{,}8", "1{,}8 \\times 20 + 32 = 68", "1{,}8 \\times (-10) + 32 = 14");
    vaut("9. f(0)", F(0), 32);
    vaut("9. taux 0 → 100", taux(F, 0, 100), 1.8);
    echelle(9, "schema", 0, F, 10, 10, [-2, 0, 2, 5]);
    points(9, "schema", [-10, 0, 20].map((x) => [x / 10, F(x) / 10]));
  }
  {
    const h = parDeux(2, 3.1, 10, 7.1);
    vaut("10. a", h.a, 0.5);
    vaut("10. b", h.b, 2.1);
    eg(10, "\\dfrac{7{,}1 - 3{,}1}{10 - 2} = \\dfrac{4}{8} = 0{,}5", "3{,}1 - 1 = 2{,}1", "0{,}5 \\times 10 + 2{,}1 = 7{,}1");
    echelle(10, "schema", 0, h, 1, 1, [0, 2, 10, 12]);
    points(10, "schema", [[2, 3.1], [10, 7.1]]);
  }
  {
    const C = parDeux(10, 1500, 30, 2300);
    vaut("11. a", C.a, 40);
    vaut("11. b", C.b, 1100);
    eg(11, "\\dfrac{2\\,300 - 1\\,500}{30 - 10} = \\dfrac{800}{20} = 40", "\\dfrac{1\\,500}{10} = 150");
    dit(11, "$C(q) = 40q + 1\\,100$");
    tableauVaut(11, "schema", C);
  }
  {
    const V = (d) => 50 - 0.06 * d;
    eg(12, "50 - 0{,}06 \\times 100 = 44", "50 - 0{,}06 \\times 500 = 20", "\\dfrac{20 - 44}{500 - 100} = \\dfrac{-24}{400} = -0{,}06", "0{,}06 \\times 100 = 6");
    vaut("12. taux 100 → 500", taux(V, 100, 500), -0.06);
    vaut("12. réservoir vide vers 833 km", Math.round(50 / 0.06), 833);
    echelle(12, "schema", 0, V, 100, 10, [0, 1, 5, 9]);
    points(12, "schema", [[1, V(100) / 10], [5, V(500) / 10]]);
  }
  {
    const h = (d) => 0.08 * d + 600;
    eg(13, "\\dfrac{8}{100} = 0{,}08", "0{,}08 \\times 2\\,500 + 600 = 800");
    echelle(13, "schema", 0, h, 1000, 100, [0, 2.5, 6]);
    points(13, "schema", [[2.5, h(2500) / 100]]);
  }
  {
    const B = parDeux(2, 76, 6, 52);
    vaut("14. a", B.a, -6);
    vaut("14. b", B.b, 88);
    eg(14, "\\dfrac{52 - 76}{6 - 2} = \\dfrac{-24}{4} = -6", "-6 \\times 12 + 88 = 16");
    vaut("14. 20 h = t 12", 20 - 8, 12);
    echelle(14, "schema", 0, B, 1, 10, [0, 2, 6, 12]);
    points(14, "schema", [2, 6, 12].map((t) => [t, B(t) / 10]));
  }
  {
    const d = (vit) => 0.006 * vit * vit;
    tableauVaut(15, "figure", (vit) => Math.round(d(vit) * 1e9) / 1e9);
    eg(15, "\\dfrac{15 - 0}{50 - 0} = 0{,}3", "\\dfrac{60 - 15}{100 - 50} = \\dfrac{45}{50} = 0{,}9", "0{,}3 \\times 100 = 30");
    vaut("15. deux fois plus vite, quatre fois plus loin", d(100) / d(50), 4);
    echelle(15, "schema", 0, d, 10, 10, [0, 5, 10]);
    courbe(15, "schema", 1, (X) => (0.3 * 10 * X) / 10, [0, 5, 10]);
    points(15, "schema", [[5, 1.5], [10, 6]]);
  }
  {
    const P = parDeux(0, 600, 12, 420);
    vaut("16. a", P.a, -15);
    eg(16, "\\dfrac{420 - 600}{12 - 0} = \\dfrac{-180}{12} = -15", "\\dfrac{600}{15} = 40");
    vaut("16. prix nul en 40 mois", -P.b / P.a, 40);
    echelle(16, "schema", 0, P, 10, 100, [0, 1.2, 4]);
    points(16, "schema", [[1.2, P(12) / 100], [4, P(40) / 100]]);
  }

  /* ── ★★★ ── */
  {
    const F = (x) => 220 - x;
    const E = (x) => 0.7 * (220 - x);
    eg(17, "220 - 16 = 204", "0{,}7 \\times 204 = 142{,}8", "154 - 0{,}7 \\times 20 = 140", "154 - 0{,}7 \\times 60 = 112", "\\dfrac{112 - 140}{60 - 20} = \\dfrac{-28}{40} = -0{,}7");
    v.ok("17. E(x) = 154 − 0,7x", identiques("0{,}7 \\times (220 - x)", "154 - 0{,}7x") && identiques("0{,}7 \\times 220 - 0{,}7x", "154 - 0{,}7x"));
    vaut("17. F(16)", F(16), 204);
    dessin(17, "schema").args[1].forEach((b) => vaut(`17. barre « ${b.label} »`, b.value, E(Number(b.label.split(" ")[0]))));
  }
  {
    const S = (x) => 0.05 * x + 1400;
    eg(18, "0{,}05 \\times 10\\,000 + 1\\,400 = 1\\,900", "0{,}05 \\times 30\\,000 + 1\\,400 = 2\\,900", "\\dfrac{2\\,900 - 1\\,900}{30\\,000 - 10\\,000} = \\dfrac{1\\,000}{20\\,000} = 0{,}05", "\\dfrac{600}{0{,}05} = 12\\,000");
    vaut("18. S(12 000)", S(12000), 2000);
    echelle(18, "schema", 0, S, 10000, 1000, [0, 1, 3, 4]);
    points(18, "schema", [[1, S(10000) / 1000], [3, S(30000) / 1000]]);
  }
  {
    const E = parDeux(0, 120, 3, 99);
    vaut("19. a", E.a, -7);
    eg(19, "\\dfrac{99 - 120}{3 - 0} = \\dfrac{-21}{3} = -7", "-7 \\times 10 + 120 = 50");
    vaut("19. disparition ≈ 17,1 j", Math.round((120 / 7) * 10) / 10, 17.1);
    v.ok("19. au cours du 18e jour", 120 / 7 > 17 && 120 / 7 < 18);
    echelle(19, "schema", 0, E, 1, 10, [0, 3, 10, 15]);
    points(19, "schema", [0, 3, 10].map((t) => [t, E(t) / 10]));
  }
  {
    const [entete, ligne] = dessin(20, "figure").args;
    const P = parDeux(0, 4, 10, 7);
    entete.slice(1).forEach((an, i) => vaut(`20. tableau ${an}`, P(Number(an) - 1990), ligne[i + 1]));
    eg(20, "\\dfrac{7 - 4}{10} = 0{,}3", "\\dfrac{13 - 7}{20} = \\dfrac{6}{20} = 0{,}3", "0{,}3 \\times 40 + 4 = 16");
    echelle(20, "schema", 0, P, 10, 1, [0, 3]);
    points(20, "schema", [0, 1, 2, 3].map((X) => [X, P(10 * X)]));
  }

  /* ── Dessins ajoutés (consigne du 28/09 : un canvas qui aide) ── */
  /** L'escalier orange de l'exercice k va de (x1 ; F(x1)) à (x2 ; F(x2)) en passant par (x2 ; F(x1)). */
  const escalierDe = (k, F, x1, x2) => {
    const d = dessin(k, "schema");
    courbe(k, "schema", 0, F, [x1, x2]);
    v.ok(`${k}. escalier de ${x1} à ${x2}`, JSON.stringify(d.args[1][1].pts) === JSON.stringify([[x1, F(x1)], [x2, F(x1)], [x2, F(x2)]]));
    points(k, "schema", [[x1, F(x1)], [x2, F(x2)]]);
  };
  escalierDe(1, f1, 1, 4);
  escalierDe(2, g2, -1, 3);
  escalierDe(3, (x) => 2 * x + 1, 2, 6);
  escalierDe(4, (x) => -2 * x + 4, 0, 5);
  [[0, (x) => 0.5 * x - 3], [1, (x) => 4 - 3 * x], [2, () => -7], [3, (x) => -x]].forEach(([i, F]) => courbe(5, "schema", i, F, [-2, 0, 4]));
  escalierDe(8, (x) => -2 * x + 12, 1, 4);
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
