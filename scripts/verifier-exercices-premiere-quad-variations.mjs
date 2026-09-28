// Recalcul indépendant de la feuille « Parabole : variations et extremum »
// (1re sans spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-quad-variations.tsx.
// Chaque extremum est retrouvé par BALAYAGE de la fonction (le corrigé passe
// par la symétrie) ; chaque tableau de variations DESSINÉ est relu : ses
// bornes, ses valeurs recalculées, et la monotonie de la fonction entre deux
// bornes ; chaque comparaison annoncée est tranchée par le calcul des deux
// images ; les chaînes « a = b = c » sont relues en fractions exactes.
// Le reste (règles de rendu, micros, 8 + 8 + 4, dollars, en-tête, aucun
// discriminant) : scripts/verifier-exercices-premiere-quad-outils.mjs.
// Usage : node scripts/verifier-exercices-premiere-quad-variations.mjs

import { lancerQuad } from "./verifier-exercices-premiere-quad-outils.mjs";

const extremum = (f, de, a) => {
  let max = { x: de, y: f(de) };
  let min = { x: de, y: f(de) };
  for (let k = 0; k <= (a - de) * 1000; k++) {
    const x = de + k / 1000;
    const y = f(x);
    if (y > max.y) max = { x, y };
    if (y < min.y) min = { x, y };
  }
  return { max, min };
};

lancerQuad({
  nom: "Parabole : variations et extremum (1re)",
  fichier: "lib/fiches-exercices/maths-premiere-quad-variations.tsx",
  notionId: "quad_variations",
  calculs: ({ dessin, courbeEst, variationsDe, verif, vrai, dit, egalites }) => {
    const sommet = (quoi, f, sens, xs, ys, de, a) => {
      const s = extremum(f, de, a)[sens];
      verif(`${quoi} : abscisse du ${sens} (balayage)`, s.x, xs, 1e-6);
      verif(`${quoi} : ${sens} (balayage)`, s.y, ys, 1e-6);
    };
    const memes = (quoi, f, g) => vrai(quoi, [-3, -1.5, 0, 0.5, 2, 4, 7].every((x) => Math.abs(f(x) - g(x)) < 1e-9));
    /** « f(u) < f(v) » annoncé : vrai au calcul ? */
    const ordre = (quoi, f, u, sens, v) => vrai(`${quoi} : f(${u}) ${sens} f(${v})`, sens === "<" ? f(u) < f(v) : sens === ">" ? f(u) > f(v) : Math.abs(f(u) - f(v)) < 1e-9);

    /* ★ 1 */
    const f1 = (x) => 2 * (x - 1) ** 2 + 3;
    sommet("1", f1, "min", 1, 3, -2, 4);
    variationsDe(1, "schema", f1, [-2, 1, 4]);
    egalites(1, "2 \\times (-3)^2 + 3 = 21");
    egalites(1, "2 \\times 3^2 + 3 = 21");

    /* ★ 2 */
    const f2 = (x) => -(x - 2) * (x - 6);
    sommet("2", f2, "max", 4, 4, -10, 10);
    egalites(2, "\\dfrac{2 + 6}{2} = 4");
    egalites(2, "-(4 - 2)(4 - 6) = -(2 \\times (-2)) = 4");
    courbeEst(2, "schema", 0, f2);

    /* ★ 3 : tableau de (x − 3)² − 2 */
    const f3 = (x) => (x - 3) ** 2 - 2;
    variationsDe(3, "figure", f3, [0, 3, 7]);
    ordre("3 a", f3, 1, ">", 2);
    ordre("3 b", f3, 4, "<", 6);
    ordre("3 c", f3, 1, "=", 5);
    verif("3 f(1)", f3(1), 2);

    /* ★ 4 */
    const f4 = (x) => 0.5 * x * x - 2 * x - 1;
    courbeEst(4, "figure", 0, f4);
    sommet("4", f4, "min", 2, -3, -1, 5);
    variationsDe(4, "schema", f4, [-1, 2, 5]);
    egalites(4, "0{,}5 \\times 4 - 4 - 1 = -3");
    egalites(4, "0{,}5 + 2 - 1 = 1{,}5");
    egalites(4, "12{,}5 - 10 - 1 = 1{,}5");

    /* ★ 5 */
    sommet("5", (x) => 5 - 3 * x * x, "max", 0, 5, -10, 10);
    courbeEst(5, "schema", 0, (x) => 5 - 3 * x * x, "g");

    /* ★ 6 */
    const f6 = (x) => (x - 1) ** 2;
    verif("6 f(−2) = f(4)", f6(-2), f6(4));
    ordre("6", f6, 3, "<", -2);
    verif("6 f(3)", f6(3), 4);
    verif("6 f(−2)", f6(-2), 9);
    courbeEst(6, "schema", 0, f6);

    /* ★ 7 */
    const f7 = (x) => 2 * x * (x - 4);
    sommet("7", f7, "min", 2, -8, -1, 5);
    variationsDe(7, "schema", f7, [-1, 2, 5]);
    egalites(7, "2 \\times 2 \\times (-2) = -8");
    egalites(7, "2 \\times (-1) \\times (-5) = 10");
    egalites(7, "2 \\times 5 \\times 1 = 10");

    /* ★ 8 */
    const f8 = (x) => -0.25 * (x - 4) ** 2 + 9;
    variationsDe(8, "figure", f8, [0, 4, 10]);
    ordre("8 a", f8, 1, "<", 3);
    ordre("8 a", f8, 5, ">", 8);
    ordre("8 b", f8, 2, ">", 7);
    verif("8 f(2)", f8(2), 8);
    verif("8 f(7)", f8(7), 6.75);

    /* ★★ 9 */
    const B = (x) => -2 * (x - 2) * (x - 10);
    sommet("9", B, "max", 6, 32, 0, 12);
    variationsDe(9, "schema", B, [0, 6, 12]);
    egalites(9, "\\dfrac{2 + 10}{2} = 6");
    egalites(9, "-2 \\times (-2) \\times (-10) = -40");
    egalites(9, "-2 \\times 4 \\times (-4) = 32");
    egalites(9, "-2 \\times 10 \\times 2 = -40");

    /* ★★ 10 : zone de baignade */
    const A = (x) => x * (40 - 2 * x);
    memes("10 −2x(x − 20)", A, (x) => -2 * x * (x - 20));
    sommet("10", A, "max", 10, 200, 0, 20);
    variationsDe(10, "schema", A, [0, 10, 20]);
    verif("10 bouées utilisées", 2 * 10 + 20, 40);

    /* ★★ 11 : serre */
    const T = (h) => -0.5 * (h - 14) ** 2 + 30;
    variationsDe(11, "figure", T, [8, 14, 20]);
    sommet("11", T, "max", 14, 30, 8, 20);
    ordre("11 b", T, 10, "<", 12);
    ordre("11 b", T, 15, ">", 19);
    ordre("11 c", T, 16, ">", 11);
    egalites(11, "-4{,}5 + 30 = 25{,}5");
    egalites(11, "-2 + 30 = 28");

    /* ★★ 12 : rugby */
    const h12 = (t) => -5 * (t - 2) ** 2 + 21;
    sommet("12", h12, "max", 2, 21, 0, 4);
    variationsDe(12, "schema", h12, [0, 2, 4]);
    ordre("12 c", h12, 3.5, "<", 1);
    verif("12 h(1)", h12(1), 16);
    verif("12 h(3,5)", h12(3.5), 9.75);

    /* ★★ 13 : consommation */
    const C = (v) => 0.002 * (v - 80) ** 2 + 5;
    sommet("13", C, "min", 80, 5, 50, 130);
    variationsDe(13, "schema", C, [50, 80, 130]);
    egalites(13, "0{,}002 \\times 900 + 5 = 6{,}8");
    egalites(13, "0{,}002 \\times 2\\,500 + 5 = 10");
    egalites(13, "0{,}002 \\times 400 + 5 = 5{,}8");
    ordre("13 c", C, 90, "<", 110);
    ordre("13 c", C, 60, "=", 100);
    verif("13 deux fois plus", C(130) / C(80), 2);

    /* ★★ 14 : parc national */
    const V = (m) => -0.5 * (m - 7) ** 2 + 12;
    courbeEst(14, "figure", 0, V);
    sommet("14", V, "max", 7, 12, 3, 11);
    variationsDe(14, "schema", V, [3, 7, 11]);
    ordre("14 c", V, 5, ">", 10);
    verif("14 V(5)", V(5), 10);
    verif("14 V(10)", V(10), 7.5);
    egalites(14, "-8 + 12 = 4");

    /* ★★ 15 : vélos */
    const R15 = (p) => p * (120 - 4 * p);
    memes("15 −4p(p − 30)", R15, (p) => -4 * p * (p - 30));
    sommet("15", R15, "max", 15, 900, 0, 30);
    egalites(15, "15 \\times 60 = 900");
    variationsDe(15, "schema", R15, [0, 15, 30]);
    ordre("15 d", R15, 25, "<", 10);
    verif("15 R(10)", R15(10), 800);
    verif("15 R(25)", R15(25), 500);

    /* ★★ 16 */
    const f16 = (x) => -3 * (x + 1) * (x - 5);
    sommet("16", f16, "max", 2, 27, -1, 5);
    egalites(16, "\\dfrac{-1 + 5}{2} = 2");
    egalites(16, "-3 \\times 3 \\times (-3) = 27");
    variationsDe(16, "schema", f16, [-1, 2, 5]);
    ordre("16 c", f16, -0.5, "<", 1.5);
    ordre("16 c", f16, Math.PI, ">", Math.sqrt(10));
    vrai("16 π < √10", Math.PI < Math.sqrt(10) && Math.abs(Math.PI - 3.14) < 0.005 && Math.abs(Math.sqrt(10) - 3.16) < 0.005);

    /* ★★★ 17 : fusée, dessin en dizaines de mètres */
    const h17 = (t) => -5 * t * (t - 6);
    sommet("17", h17, "max", 3, 45, 0, 6);
    egalites(17, "-5 \\times 3 \\times (-3) = 45");
    variationsDe(17, "schema", h17, [0, 3, 6]);
    courbeEst(17, "schema", 0, (t) => h17(t) / 10, "h en dizaines de mètres");
    ordre("17 d", h17, 4.5, ">", 1);
    verif("17 h(1)", h17(1), 25);
    verif("17 h(4,5)", h17(4.5), 33.75);
    memes("17 h − 40", (t) => h17(t) - 40, (t) => -5 * (t - 2) * (t - 4));
    vrai("17 au-dessus de 40 m entre 2 et 4", h17(3) > 40 && h17(1.9) < 40 && h17(4.1) < 40);
    verif("17 horizontale = 40 m", dessin(17, "schema", "parabole").args[3].horizontale * 10, 40);

    /* ★★★ 18 : pêche */
    const G = (N) => -0.005 * N * (N - 100);
    verif("18 G(0)", G(0), 0);
    verif("18 G(100)", G(100), 0);
    sommet("18", G, "max", 50, 12.5, 0, 100);
    egalites(18, "-0{,}005 \\times 50 \\times (-50) = 12{,}5");
    variationsDe(18, "schema", G, [0, 50, 100]);
    ordre("18 c", G, 30, ">", 80);
    verif("18 G(30)", G(30), 10.5);
    verif("18 G(80)", G(80), 8);
    const d18 = dessin(18, "schema", "diagramme").args[1];
    vrai("18 diagramme relu", d18.every((b) => Math.abs(b.value - G(Number(b.label.replace(" t", "")))) < 1e-9));

    /* ★★★ 19 : escalade */
    const R19 = (p) => p * (500 - 10 * p);
    memes("19 −10p(p − 50)", R19, (p) => -10 * p * (p - 50));
    sommet("19", R19, "max", 25, 6250, 0, 50);
    egalites(19, "25 \\times 250 = 6\\,250");
    egalites(19, "20 \\times 300 = 6\\,000");
    egalites(19, "32 \\times 180 = 5\\,760");
    variationsDe(19, "schema", R19, [0, 25, 50]);
    verif("19 gain", R19(25) - R19(20), 250);
    ordre("19 d", R19, 32, "<", 20);

    /* ★★★ 20 : vol parabolique */
    const z = (t) => -2 * (t - 10) ** 2 + 8000;
    sommet("20", z, "max", 10, 8000, 0, 20);
    variationsDe(20, "schema", z, [0, 10, 20]);
    egalites(20, "-2 \\times 100 + 8\\,000 = 7\\,800");
    ordre("20 c", z, 4, ">", 18);
    verif("20 z(4)", z(4), 7928);
    verif("20 z(18)", z(18), 7872);
    memes("20 z − 7950", (t) => z(t) - 7950, (t) => -2 * (t - 5) * (t - 15));
    dit(20, "pendant $10$ secondes");
  },
});
