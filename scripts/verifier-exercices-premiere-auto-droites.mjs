// Recalcul indépendant de la feuille « Droites et coefficient directeur » (1re,
// automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-droites.tsx
//
// Les droites sont RELUES dans les appels `repere(…)` du source (`q: [0, a, b]`)
// et évaluées en fractions exactes : ordonnée à l'origine, coefficient
// directeur, points annoncés, intersections. Chaque ESCALIER dessiné (ligne
// brisée orange : on avance, puis on monte) part d'un point de la droite,
// arrive sur la droite, et monte exactement de a × (l'avancée). Chaque
// coefficient calculé à partir de deux points est refait ; les égalités du
// corrigé sont évaluées (`outilsEgalites`) ; chaque point marqué est sur sa
// courbe. Plus le socle commun (8 + 8 + 4, dollars, LaTeX, canvas, micros de la
// notion, exactement 20 `correction:`).
// Usage : node scripts/verifier-exercices-premiere-auto-droites.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, moins, fois, div, egal, inf, lireFeuille, controlesCommuns, outilsCourbes, outilsEgalites, evalCourbe, identiques } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-droites.tsx";
const NOTION = "auto_droites";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

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
const egalites = outilsEgalites(v, f);
const { reperes, courbes, tableauDe, controlerTout } = outilsCourbes(v, f, source);

const n = (x) => (typeof x === "object" ? x : D(String(x)));
const txt = (q) => (q.d === 1n ? `${q.n}` : `${q.n}/${q.d}`);
const vaut = (nom, a, b) => v.ok(nom, a !== null && egal(n(a), n(b)), a === null ? "hors courbe" : `${txt(n(a))} ≠ ${txt(n(b))}`);
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));
/** Coefficient directeur entre deux points. */
const pente = ([xa, ya], [xb, yb]) => div(moins(n(yb), n(ya)), moins(n(xb), n(xa)));
/** La droite F a-t-elle pour équation y = a x + b ? (lue en 0 et en 1) */
const droite = (nom, F, a, b) => {
  vaut(`${nom} : b`, F(Q(0)), b);
  vaut(`${nom} : a`, moins(F(Q(1)), F(Q(0))), a);
};
/** L'escalier (ligne brisée) du schéma de l'exercice k, contre la droite d'indice iDroite. */
function escalier(k, iDroite = 0) {
  const r = reperes(k).find((x) => x.role === "schema");
  const F = evalCourbe(r.courbes[iDroite]);
  const esc = r.courbes.find((x) => x.pts && x.pts.length === 3 && x.pts[0][0] !== x.pts[2][0] && x.pts[1][0] === x.pts[2][0]);
  if (!esc) throw new Error(`exercice ${k} : pas d'escalier`);
  const [[x0, y0], [x1, y1], [x2, y2]] = esc.pts.map(([x, y]) => [n(x), n(y)]);
  const a = moins(F(Q(1)), F(Q(0)));
  v.ok(`${k}. escalier : part de la droite, horizontal, puis vertical jusqu'à la droite, montée = a × avancée`,
    egal(F(x0), y0) && egal(y1, y0) && egal(x2, x1) && egal(F(x2), y2) && egal(moins(y2, y1), fois(a, moins(x1, x0))));
}

try {
  /* ── ★ ── */
  v.ok("1. x/2 + 4 ≡ 0,5x + 4", identiques("\\dfrac{x}{2} + 4", "0{,}5x + 4"));
  dit(1, "$g$ est affine ET linéaire", "$l(x) = 7$ est affine aussi, avec $a = 0$", "$h$ (un carré) et $k$ ($x$ au dénominateur) ne sont pas affines");
  eg(2, "\\dfrac{10}{4} = 2{,}5", "2{,}5 \\times 6 = 15");
  vaut("2. 4a = 10", fois(Q(4), D("2,5")), 10);
  {
    const [F] = courbes(3, "schema");
    droite("3. y = 2x − 1", F, 2, -1);
    vaut("3. (1 ; 1)", F(Q(1)), 1);
    vaut("3. (3 ; 5)", F(Q(3)), 5);
    eg(3, "2 \\times 3 - 1 = 5");
    escalier(3);
  }
  {
    const [F] = courbes(4, "schema");
    droite("4. y = −2x + 5", F, -2, 5);
    vaut("4. passe par A(1 ; 3)", F(Q(1)), 3);
    vaut("4. (2 ; 1)", F(Q(2)), 1);
    vaut("4. b = 3 + 2 × 1", plus(Q(3), fois(Q(2), Q(1))), 5);
    escalier(4);
  }
  {
    const [F] = courbes(5, "figure");
    droite("5. y = 1,5x − 1", F, "1,5", -1);
    vaut("5. (2 ; 2) sur la droite", F(Q(2)), 2);
    eg(5, "\\dfrac{3}{2} = 1{,}5");
    escalier(5);
  }
  {
    vaut("6. pente AB", pente([-1, 2], [-3, 4]), -1);
    eg(6, "\\dfrac{4 - 2}{-3 - (-1)} = \\dfrac{2}{-2} = -1", "-3 - (-1) = -3 + 1 = -2");
    const [F] = courbes(6, "schema");
    vaut("6. la droite dessinée passe par A", F(Q(-1)), 2);
    vaut("6. la droite dessinée passe par B", F(Q(-3)), 4);
    escalier(6);
  }
  {
    vaut("7. pente AB", pente([2, 1], [6, 3]), "0,5");
    vaut("7. b = 1 − 0,5 × 2", moins(Q(1), fois(D("0,5"), Q(2))), 0);
    eg(7, "\\dfrac{3 - 1}{6 - 2} = \\dfrac{2}{4} = 0{,}5", "0{,}5 \\times 6 = 3");
    const [F] = courbes(7, "schema");
    vaut("7. schéma : A", F(Q(2)), 1);
    vaut("7. schéma : B", F(Q(6)), 3);
  }
  {
    const [bleue, orange, verte] = courbes(8, "figure");
    droite("8. bleue y = 2x", bleue, 2, 0);
    droite("8. orange y = −x + 3", orange, -1, 3);
    droite("8. verte y = 3", verte, 0, 3);
  }

  /* ── ★★ ── */
  {
    const [T1, T2] = courbes(9, "schema");
    droite("9. T1 = x + 3", T1, 1, 3);
    droite("9. T2 = 2x", T2, 2, 0);
    vaut("9. croisement en 3 : 6 €", T1(Q(3)), 6);
    vaut("9. croisement en 3 (T2)", T2(Q(3)), 6);
    v.ok("9. avant 3 km, T2 moins cher ; après, T1", inf(T2(Q(1)), T1(Q(1))) && inf(T1(Q(5)), T2(Q(5))));
    eg(9, "3 + 3 = 6", "2 \\times 3 = 6");
  }
  {
    const [F] = courbes(10, "figure");
    droite("10. y = 2x + 3", F, 2, 3);
    vaut("10. 8 heures", plus(fois(Q(2), Q(8)), Q(3)), 19);
    eg(10, "2 \\times 8 + 3 = 19");
    escalier(10);
  }
  {
    vaut("11. pente", pente([1980, 6], [2010, "4,5"]), "-0,05");
    eg(11, "\\dfrac{4{,}5 - 6}{2010 - 1980} = \\dfrac{-1{,}5}{30} = -0{,}05", "-0{,}05 \\times 50 + 6 = -2{,}5 + 6 = 3{,}5");
    const [F] = courbes(11, "schema");
    droite("11. schéma, par décennie", F, fois(D("-0,05"), Q(10)), 6);
    vaut("11. schéma : 2010", F(Q(3)), "4,5");
    vaut("11. schéma : 2030", F(Q(5)), "3,5");
  }
  {
    vaut("12. vitesse", pente([9, 20], [11, 60]), 20);
    vaut("12. départ : 20 − 20 × 1", moins(Q(20), Q(20)), 0);
    eg(12, "\\dfrac{60 - 20}{11 - 9} = \\dfrac{40}{2} = 20", "20 + 20 = 40");
    const [F] = courbes(12, "schema");
    vaut("12. schéma : 9 h (dizaines de km)", F(Q(1)), 2);
    vaut("12. schéma : 11 h", F(Q(3)), 6);
    vaut("12. schéma : 8 h", F(Q(0)), 0);
    escalier(12);
  }
  {
    const { entete, ligne } = tableauDe(13);
    entete.slice(1).forEach((x, i) => vaut(`13. f(${x}) = 25x + 12`, plus(fois(Q(25), n(x)), Q(12)), ligne[i + 1]));
    eg(13, "37 - 12 = 62 - 37 = 87 - 62 = 25", "2 \\times 37 = 74");
  }
  {
    const [F] = courbes(14, "figure");
    droite("14. y = −1,5x + 9", F, "-1,5", 9);
    vaut("14. (2 ; 6)", F(Q(2)), 6);
    vaut("14. vide en 6", F(Q(6)), 0);
    eg(14, "\\dfrac{-3}{2} = -1{,}5", "-1{,}5 \\times 6 + 9 = 0");
    escalier(14);
  }
  {
    vaut("15. pente", pente([2015, 120000], [2021, 150000]), 5000);
    eg(15, "\\dfrac{150\\,000 - 120\\,000}{2021 - 2015} = \\dfrac{30\\,000}{6} = 5\\,000", "120\\,000 + 3 \\times 5\\,000 = 135\\,000", "150\\,000 + 4 \\times 5\\,000 = 170\\,000");
    const { entete, ligne } = tableauDe(15);
    entete.slice(1).forEach((an, i) => vaut(`15. tableau ${an}`, plus(Q(120000), fois(Q(5000), Q(Number(an) - 2015))), Number(String(ligne[i + 1]).replace(/ /g, ""))));
  }
  {
    const [F] = courbes(16, "schema");
    droite("16. P = 0,5x + 4", F, "0,5", 4);
    vaut("16. 7 milliers en x = 6", F(Q(6)), 7);
    vaut("16. (2 ; 5)", F(Q(2)), 5);
    escalier(16);
  }

  /* ── ★★★ ── */
  {
    const [R, C] = courbes(17, "figure");
    droite("17. R = 2x", R, 2, 0);
    droite("17. C = x + 4", C, 1, 4);
    vaut("17. croisement (4 ; 8) : R", R(Q(4)), 8);
    vaut("17. croisement (4 ; 8) : C", C(Q(4)), 8);
    v.ok("17. B(x) = 2x − (x + 4) ≡ x − 4", identiques("2x - (x + 4)", "x - 4"));
    escalier(17, 1);
  }
  {
    vaut("18. pente par an", pente([1990, 0], [2020, 6]), "0,2");
    eg(18, "\\dfrac{6 - 0}{2020 - 1990} = \\dfrac{6}{30} = 0{,}2", "0{,}2 \\times 10 = 2");
    const [F] = courbes(18, "schema");
    droite("18. y = 2x", F, 2, 0);
    vaut("18. 2020 (x = 3)", F(Q(3)), 6);
    vaut("18. 10 cm en x = 5", F(Q(5)), 10);
    escalier(18);
  }
  {
    vaut("19. jours 10 → 20", pente([10, 20], [20, 50]), 3);
    vaut("19. jours 20 → 30", pente([20, 50], [30, 90]), 4);
    eg(19, "\\dfrac{50 - 20}{20 - 10} = \\dfrac{30}{10} = 3", "\\dfrac{90 - 50}{30 - 20} = \\dfrac{40}{10} = 4", "50 + 3 \\times 10 = 80");
    const [mesures, modele] = courbes(19, "schema");
    [[1, 2], [2, 5], [3, 9]].forEach(([x, y]) => vaut(`19. mesure au jour ${10 * x}`, mesures(Q(x)), y));
    vaut("19. le modèle passe par le jour 10", modele(Q(1)), 2);
    vaut("19. le modèle passe par le jour 20", modele(Q(2)), 5);
    vaut("19. le modèle prévoit 80 cm", modele(Q(3)), 8);
  }
  {
    const A = (x) => plus(fois(Q(10), n(x)), Q(40));
    const S = (x) => fois(Q(15), n(x));
    vaut("20. A(2)", A(2), 60);
    vaut("20. A(6)", A(6), 100);
    vaut("20. pente", pente([2, 60], [6, 100]), 10);
    vaut("20. A(8)", A(8), 120);
    vaut("20. S(8)", S(8), 120);
    v.ok("20. au-delà de 8 trajets, A < S ; avant, A > S", inf(A(9), S(9)) && inf(S(7), A(7)));
    eg(20, "\\dfrac{100 - 60}{6 - 2} = \\dfrac{40}{4} = 10", "10 \\times 2 + 40 = 60");
    const [Ad, Sd] = courbes(20, "schema");
    droite("20. schéma A en dizaines", Ad, 1, 4);
    droite("20. schéma S en dizaines", Sd, "1,5", 0);
    vaut("20. schéma : croisement (8 ; 12)", Ad(Q(8)), 12);
  }
  controlerTout();
} catch (e) {
  v.ok("le recalcul s'exécute", false, String(e?.stack ?? e));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Droites et coefficient directeur (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
