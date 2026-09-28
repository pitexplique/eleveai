// Recalcul indépendant de la feuille « Le tableau de variations » (1re sans
// spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-der-variations.tsx
//
// Chaque tableau de variations DESSINÉ est relu (bornes, signes de f′,
// valeurs) et comparé à la fonction de l'énoncé : image à chaque borne, signe
// du taux d'accroissement sur chaque morceau, f′ nulle sous chaque borne
// intérieure. Chaque tableau de signes est recalculé case par case. Chaque
// « on admet que f′(x) = … » est comparé au taux d'accroissement de f, chaque
// maximum ou minimum annoncé est retrouvé par balayage de l'intervalle.
// Plus les règles de rendu et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-der-variations.mjs

import { ouvrir, d, poly } from "./verifier-exercices-premiere-der-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-der-variations.tsx", "der_variations");
const { exercice, annonce, derivee, identite, dit, vaut, vrai, variations, signes, dessin } = F;
const e5 = { eps: 1e-5 };

/** Le maximum (sens 1) ou le minimum (sens −1) de f sur [a ; b], par balayage au millième. */
const extremum = (f, a, b, sens = 1) => {
  let best = { x: a, y: f(a) };
  for (let i = 0; i <= 1000; i++) {
    const x = a + ((b - a) * i) / 1000;
    const y = f(x);
    if (sens * (y - best.y) > 1e-12) best = { x, y };
  }
  return best;
};
const extr = (k, nom, f, a, b, sens, x, y) => {
  // Le balayage ne tombe pas forcément sur x : aucun point ne doit DÉPASSER y,
  // et le meilleur point trouvé doit en être tout proche.
  const m = extremum(f, a, b, sens);
  vrai(`${k}. ${nom} : rien ne dépasse ${y} sur [${a} ; ${b}]`, sens * (m.y - y) <= 1e-9 && Math.abs(m.y - y) < 1e-3, `${m.y}`);
  vrai(`${k}. ${nom} : atteint en ${x}`, Math.abs(f(x) - y) < 1e-9);
};

/* ── ★ ── */
exercice(1, () => signes.juste(1, { 0: "-(x + 1)(x - 4)" }, "figure"));
exercice(2, () => {
  const f = poly(1, -4, 1);
  derivee(2, "On a $f'(x)", "2x - 4", f, { ou: "enonce" });
  variations(2, f);
  annonce(2, "f(-1) = 1 + 4 + 1 = 6", f(-1));
  annonce(2, "f(2) = 4 - 8 + 1 = -3", f(2));
  annonce(2, "f(5) = 25 - 20 + 1 = 6", f(5));
});
exercice(3, () => {
  const [bornes, , valeurs] = dessin(3, "figure", "tableauVariations").args;
  vaut("3. maximum lu : 5", Math.max(...valeurs), 5);
  vaut("3. atteint en 3", bornes[valeurs.indexOf(5)], 3);
  vaut("3. minimum lu : 1", Math.min(...valeurs), 1);
  vaut("3. atteint en 0", bornes[valeurs.indexOf(1)], 0);
});
exercice(4, () => {
  const f = poly(-1, 6, 0);
  derivee(4, "f'(x)", "-2x + 6", f);
  variations(4, f);
  annonce(4, "f(3) = -9 + 18 = 9", f(3));
  annonce(4, "f(6) = -36 + 36 = 0", f(6));
  extr(4, "maximum", f, 0, 6, 1, 3, 9);
  extr(4, "minimum", f, 0, 6, -1, 0, 0);
});
exercice(5, () => {
  // Un contre-exemple pour c) : f(x) = x − 5 est croissante sur [0 ; 10] et f(0) < 0.
  const g = (x) => x - 5;
  vrai("5. c) contre-exemple : croissante et f(0) < 0", d(g, 3) > 0 && g(0) < 0);
});
exercice(6, () => {
  signes.juste(6, { 2: "(x - 1)(x - 5)" });
  const f = poly(1 / 3, -3, 5, 0); // une primitive de (x − 1)(x − 5)
  vrai("6. croît, décroît, croît", d(f, 0) > 0 && d(f, 3) < 0 && d(f, 6) > 0);
});
exercice(7, () => {
  const f = poly(1, 0, -3, 0);
  derivee(7, "On admet que $f'(x)", "3(x - 1)(x + 1)", f, { ou: "enonce" });
  variations(7, f);
  annonce(7, "f(-2) = -8 + 6 = -2", f(-2));
  annonce(7, "f(-1) = -1 + 3 = 2", f(-1));
  annonce(7, "f(1) = 1 - 3 = -2", f(1));
  annonce(7, "f(2) = 8 - 6 = 2", f(2));
  extr(7, "maximum", f, -2, 2, 1, -1, 2);
  vaut("7. maximum aussi en 2", f(2), 2);
  extr(7, "minimum", f, -2, 2, -1, 1, -2);
  vaut("7. minimum aussi en −2", f(-2), -2);
});
exercice(8, () => dit(8, "$-3 \\leqslant f(x) \\leqslant 5$", "$f(3) \\leqslant f(4) = 5$"));

/* ── ★★ ── */
exercice(9, () => {
  const T = poly(-1, 20, 20);
  derivee(9, "T'(t)", "-2t + 20", T, { variable: "t" });
  variations(9, T);
  annonce(9, "T(10) = -100 + 200 + 20 = 120", T(10));
  annonce(9, "T(15) = -225 + 300 + 20 = 95", T(15));
  extr(9, "maximum", T, 0, 15, 1, 10, 120);
});
exercice(10, () => {
  const B = poly(-2, 40, -100);
  derivee(10, "B'(x)", "-4x + 40", B);
  variations(10, B);
  annonce(10, "B(10) = -200 + 400 - 100 = 100", B(10));
  annonce(10, "B(15) = -450 + 600 - 100 = 50", B(15));
  extr(10, "maximum", B, 0, 15, 1, 10, 100);
  dit(10, "$1\\,000$ €", "$100$ bols");
});
exercice(11, () => {
  const h = poly(-5, 5, 10);
  derivee(11, "h'(t)", "-10t + 5", h, { variable: "t" });
  variations(11, h);
  annonce(11, "h(0{,}5) = -1{,}25 + 2{,}5 + 10 = 11{,}25", h(0.5));
  annonce(11, "h(2) = -20 + 10 + 10 = 0", h(2));
  extr(11, "maximum", h, 0, 2, 1, 0.5, 11.25);
  annonce(11, "5 \\times 0{,}5^2 = 5 \\times 0{,}25 = 1{,}25", 1.25);
});
exercice(12, () => {
  const P = poly(-0.5, 3, 0, 10);
  derivee(12, "On admet que $P'(t)", "-1{,}5t(t - 4)", P, { variable: "t", ou: "enonce" });
  variations(12, P);
  annonce(12, "P(4) = -32 + 48 + 10 = 26", P(4));
  annonce(12, "P(5) = -62{,}5 + 75 + 10 = 22{,}5", P(5));
  extr(12, "maximum", P, 0, 5, 1, 4, 26);
});
exercice(13, () => {
  const C = poly(1, -12, 36, 0);
  derivee(13, "On admet que $C'(t)", "3(t - 2)(t - 6)", C, { variable: "t", ou: "enonce" });
  variations(13, C);
  annonce(13, "C(2) = 8 - 48 + 72 = 32", C(2));
  annonce(13, "C(6) = 216 - 432 + 216 = 0", C(6));
  extr(13, "maximum", C, 0, 6, 1, 2, 32);
});
exercice(14, () => {
  const D = poly(-2, 20, 0);
  derivee(14, "d'(t)", "20 - 4t", D, { variable: "t" });
  annonce(14, "20 \\times 3{,}6 = 72", 72);
  variations(14, D);
  annonce(14, "d(5) = 100 - 50 = 50", D(5));
  vaut("14. arrêt à t = 5", d(D, 5), 0, 1e-5);
  extr(14, "distance de freinage", D, 0, 5, 1, 5, 50);
});
exercice(15, () => {
  const a = poly(0.5, -4.5, 12, 3);
  derivee(15, "On admet que $a'(x)", "1{,}5(x - 2)(x - 4)", a, { ou: "enonce" });
  variations(15, a);
  annonce(15, "a(2) = 4 - 18 + 24 + 3 = 13", a(2));
  annonce(15, "a(4) = 32 - 72 + 48 + 3 = 11", a(4));
  annonce(15, "a(6) = 108 - 162 + 72 + 3 = 21", a(6));
  extr(15, "point le plus haut (l'arrivée)", a, 0, 6, 1, 6, 21);
  dit(15, "$1\\,300$ m", "$1\\,100$ m", "$2\\,100$ m");
});
exercice(16, () => {
  identite(16, "x(40 - 2x)", "-2x^2 + 40x");
  const A = poly(-2, 40, 0);
  derivee(16, "A'(x)", "-4x + 40", A);
  variations(16, A);
  annonce(16, "A(10) = -200 + 400 = 200", A(10));
  extr(16, "aire maximale", A, 0, 20, 1, 10, 200);
});

/* ── ★★★ ── */
exercice(17, () => {
  const B = poly(-1, 12, -21, -10);
  derivee(17, "B'(x)", "-3x^2 + 24x - 21", B);
  identite(17, "-3(x^2 - 8x + 7)", "-3x^2 + 24x - 21");
  signes.juste(17, { 3: "-3(x - 1)(x - 7)" });
  variations(17, B);
  annonce(17, "B(1) = -1 + 12 - 21 - 10 = -20", B(1));
  annonce(17, "B(7) = -343 + 588 - 147 - 10 = 88", B(7));
  annonce(17, "B(10) = -1000 + 1200 - 210 - 10 = -20", B(10));
  extr(17, "bénéfice maximal", B, 0, 10, 1, 7, 88);
  dit(17, "$8\\,800$ euros", "$7\\,000$ pots");
});
exercice(18, () => {
  const N = poly(-1, 15, 0, 100);
  derivee(18, "N'(t)", "-3t^2 + 30t", N, { variable: "t" });
  identite(18, "-3t(t - 10)", "-3t^2 + 30t", { variable: "t" });
  variations(18, N);
  annonce(18, "N(10) = -1000 + 1500 + 100 = 600", N(10));
  annonce(18, "N(14) = -2744 + 2940 + 100 = 296", N(14));
  annonce(18, "N'(2) = -12 + 60 = 48", d(N, 2), e5);
  annonce(18, "N'(5) = -75 + 150 = 75", d(N, 5), e5);
  annonce(18, "N'(8) = -192 + 240 = 48", d(N, 8), e5);
  vaut("18. N(8)", N(8), 548);
  vaut("18. N(5)", N(5), 350);
  extr(18, "le pic", N, 0, 14, 1, 10, 600);
});
exercice(19, () => {
  const R = (x) => (40 + x) * (1000 - 20 * x);
  identite(19, "(40 + x)(1\\,000 - 20x)", "-20x^2 + 200x + 40\\,000");
  derivee(19, "R'(x)", "-40x + 200", R);
  variations(19, R);
  annonce(19, "45 \\times 900 = 40\\,500", 45 * 900);
  annonce(19, "R(5) = -500 + 1\\,000 + 40\\,000 = 40\\,500", R(5));
  extr(19, "recette maximale", R, 0, 50, 1, 5, 40500);
});
exercice(20, () => {
  const T = poly(0.25, -2, 3);
  derivee(20, "T'(t)", "0{,}5t - 2", T, { variable: "t" });
  variations(20, T);
  annonce(20, "T(4) = 4 - 8 + 3 = -1", T(4));
  annonce(20, "T(8) = 16 - 16 + 3 = 3", T(8));
  extr(20, "minimum", T, 0, 8, -1, 4, -1);
  identite(20, "0{,}25(t - 2)(t - 6)", "0{,}25t^2 - 2t + 3", { variable: "t" });
  const gel = Array.from({ length: 81 }, (_, i) => i / 10).filter((t) => T(t) < 0);
  vrai("20. il gèle exactement entre t = 2 et t = 6", gel.every((t) => t > 2 && t < 6) && gel.length === 39, `${gel[0]} … ${gel[gel.length - 1]}`);
});

/* ── Les dessins d'appoint (28/09 au soir) ── */
exercice(5, () => {
  F.estLaCourbe(5, "schema", 0, (x) => x - 5, "x − 5");
  annonce(5, "f(0) = -5", -5);
});
exercice(8, () => {
  const [bornes, sg, val] = dessin(8, "schema", "tableauVariations").args;
  vrai("8. tableau : croissante de f(1) = −3 à f(4) = 5", JSON.stringify([bornes, sg, val]) === JSON.stringify([[1, 4], ["+"], [-3, 5]]));
});

F.fin("Le tableau de variations (1re)");
