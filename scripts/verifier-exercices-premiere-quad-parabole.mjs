// Recalcul indépendant de la feuille « Parabole et expression de degré 2 »
// (1re sans spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-quad-parabole.tsx.
// Chaque image annoncée est recalculée ; chaque chaîne « a = b = c » du corrigé
// est relue en LaTeX et ses membres comparés en fractions exactes ; chaque
// racine est réinjectée ; chaque courbe DESSINÉE est comparée, en 21 points, au
// modèle de l'énoncé (unités changées comprises) ; les tableaux sont relus.
// Le reste (règles de rendu à 375 px, micros, 8 + 8 + 4, dollars, en-tête,
// aucun discriminant) : scripts/verifier-exercices-premiere-quad-outils.mjs.
// Usage : node scripts/verifier-exercices-premiere-quad-parabole.mjs

import { lancerQuad } from "./verifier-exercices-premiere-quad-outils.mjs";

lancerQuad({
  nom: "Parabole et expression de degré 2 (1re)",
  fichier: "lib/fiches-exercices/maths-premiere-quad-parabole.tsx",
  notionId: "quad_parabole",
  calculs: ({ dessin, courbeEst, verif, vrai, dit, egalites }) => {
    const racine = (quoi, f, x) => verif(`${quoi} : f(${x}) = 0`, f(x), 0);
    const memes = (quoi, f, g) => vrai(quoi, [-3, -1.5, 0, 0.5, 2, 4, 7].every((x) => Math.abs(f(x) - g(x)) < 1e-9));

    /* ★ 1 */
    const f1 = (x) => 2 * x * x - 3 * x + 1;
    verif("1 f(0)", f1(0), 1);
    verif("1 f(2)", f1(2), 3);
    verif("1 f(−1)", f1(-1), 6);
    egalites(1, "2 \\times 0^2 - 3 \\times 0 + 1 = 1");
    egalites(1, "2 \\times 2^2 - 3 \\times 2 + 1 = 8 - 6 + 1 = 3");
    egalites(1, "2 \\times (-1)^2 - 3 \\times (-1) + 1 = 2 + 3 + 1 = 6");
    courbeEst(1, "schema", 0, f1);

    /* ★ 2 : bleue 2x², orange 0,5x², verte −x² */
    courbeEst(2, "figure", 0, (x) => 2 * x * x, "f = 2x²");
    courbeEst(2, "figure", 1, (x) => 0.5 * x * x, "g = 0,5x²");
    courbeEst(2, "figure", 2, (x) => -x * x, "h = −x²");
    vrai("2 couleurs : orange puis verte", dessin(2, "figure", "parabole").args[1][1].couleur === "#ea580c" && dessin(2, "figure", "parabole").args[1][2].couleur === "#16a34a");
    dit(2, "$f(1) = 2$ et $g(1) = 0{,}5$");

    /* ★ 3 */
    courbeEst(3, "schema", 0, (x) => x * x + 3, "x² + 3");
    courbeEst(3, "schema", 1, (x) => x * x, "x²");
    courbeEst(3, "schema", 2, (x) => x * x - 2, "x² − 2");
    egalites(3, "0^2 + 3 = 3");
    egalites(3, "0^2 - 2 = -2");

    /* ★ 4 */
    const f4 = (x) => (x + 1) * (x - 3);
    courbeEst(4, "figure", 0, f4, "(x + 1)(x − 3)");
    racine("4", f4, -1);
    racine("4", f4, 3);
    vrai("4 l'autre expression ne s'annule pas en −1", (-1 - 1) * (-1 + 3) !== 0);
    egalites(4, "(-1 + 1)(-1 - 3) = 0 \\times (-4) = 0");
    dit(4, "$f(x) = (x + 1)(x - 3)$");

    /* ★ 5 */
    const g5 = (x) => -0.5 * x * x + 4;
    verif("5 g(0)", g5(0), 4);
    verif("5 g(2)", g5(2), 2);
    verif("5 g(−2)", g5(-2), 2);
    verif("5 g(4)", g5(4), -4);
    egalites(5, "-0{,}5 \\times 2^2 + 4 = -2 + 4 = 2");
    egalites(5, "-0{,}5 \\times (-2)^2 + 4 = -0{,}5 \\times 4 + 4 = 2");
    egalites(5, "-0{,}5 \\times 4^2 + 4 = -8 + 4 = -4");
    courbeEst(5, "schema", 0, g5, "g");
    courbeEst(6, "schema", 0, (x) => -3 * x * x + x + 5, "f");
    courbeEst(6, "schema", 1, (x) => 4 - x * x, "h");

    /* ★ 6 : les signes de a */
    dit(6, "$a = -3 < 0$");
    dit(6, "$a = 0{,}2 > 0$");
    dit(6, "$a = -1 < 0$");

    /* ★ 7 */
    const f7 = (x) => -(x + 2) * (x - 1);
    courbeEst(7, "figure", 0, f7, "−(x + 2)(x − 1)");
    racine("7", f7, -2);
    racine("7", f7, 1);
    verif("7 f(0)", f7(0), 2);
    vrai("7 −x² + 2 ne s'annule pas en 1", -1 + 2 !== 0);
    verif("7 √2", Math.sqrt(2), 1.41, 0.01);
    egalites(7, "-(0 + 2)(0 - 1) = 2");

    /* ★ 8 */
    memes("8 (x − 2)(x + 2) = x² − 4", (x) => (x - 2) * (x + 2), (x) => x * x - 4);
    courbeEst(8, "schema", 1, (x) => x * x - 4, "x² − 4");
    courbeEst(8, "schema", 0, (x) => x * x, "x²");
    racine("8", (x) => x * x - 4, 2);
    racine("8", (x) => x * x - 4, -2);

    /* ★★ 9 */
    const h9 = (x) => -x * x + 4 * x;
    courbeEst(9, "figure", 0, h9, "−x² + 4x");
    memes("9 −x(x − 4)", h9, (x) => -x * (x - 4));
    verif("9 h(1)", h9(1), 3);
    verif("9 h(2)", h9(2), 4);
    verif("9 h(3)", h9(3), 3);
    egalites(9, "-1 + 4 = 3");
    egalites(9, "-4 + 8 = 4");
    egalites(9, "-9 + 12 = 3");
    racine("9", h9, 4);

    /* ★★ 10 */
    const B10 = (x) => -x * x + 10 * x - 16;
    courbeEst(10, "figure", 0, B10, "B");
    memes("10 −(x − 2)(x − 8)", B10, (x) => -(x - 2) * (x - 8));
    verif("10 B(0)", B10(0), -16);
    egalites(10, "-5^2 + 10 \\times 5 - 16 = -25 + 50 - 16 = 9");
    racine("10", B10, 2);
    racine("10", B10, 8);
    egalites(10, "-(2 - 2)(2 - 8) = 0");
    egalites(10, "-(8 - 2)(8 - 8) = 0");
    vrai("10 positif entre 2 et 8", B10(5) > 0 && B10(1) < 0 && B10(9) < 0);

    /* ★★ 11 */
    const h11 = (x) => -0.5 * x * x + 8;
    courbeEst(11, "figure", 0, h11, "−0,5x² + 8");
    memes("11 −0,5(x − 4)(x + 4)", h11, (x) => -0.5 * (x - 4) * (x + 4));
    egalites(11, "-0{,}5 \\times 2^2 + 8 = -2 + 8 = 6");
    verif("11 h(−2)", h11(-2), 6);
    egalites(11, "4 - (-4) = 8");
    egalites(11, "-0{,}5(4 - 4)(4 + 4) = 0");
    egalites(11, "-0{,}5(-4 - 4)(-4 + 4) = 0");

    /* ★★ 12 */
    courbeEst(12, "figure", 0, (x) => (x - 1) * (x - 3), "f bleue");
    courbeEst(12, "figure", 1, (x) => -(x - 1) * (x - 3), "g orange");
    courbeEst(12, "figure", 2, (x) => (x - 1) * (x + 3), "k verte");
    egalites(12, "(0 - 1)(0 + 3) = -3");

    /* ★★ 13 */
    egalites(13, "0{,}25 \\times 4^2 = 0{,}25 \\times 16 = 4");
    egalites(13, "0{,}5 \\times 4^2 = 0{,}5 \\times 16 = 8");
    courbeEst(13, "schema", 0, (x) => 0.25 * x * x, "A");
    courbeEst(13, "schema", 1, (x) => 0.5 * x * x, "B");

    /* ★★ 14 */
    const h14 = (x) => -0.5 * (x - 1) * (x - 5);
    courbeEst(14, "figure", 0, h14, "−0,5(x − 1)(x − 5)");
    racine("14", h14, 1);
    racine("14", h14, 5);
    egalites(14, "-0{,}5 \\times 2 \\times (-2) = 2");
    egalites(14, "-0{,}5 \\times (-1) \\times (-5) = -2{,}5");
    verif("14 h(3)", h14(3), 2);
    verif("14 h(0)", h14(0), -2.5);

    /* ★★ 15 */
    const d = (v) => 0.005 * v * v;
    verif("15 d(50)", d(50), 12.5);
    verif("15 d(100)", d(100), 50);
    verif("15 d(130)", d(130), 84.5);
    egalites(15, "0{,}005 \\times 2\\,500 = 12{,}5");
    egalites(15, "0{,}005 \\times 10\\,000 = 50");
    egalites(15, "0{,}005 \\times 16\\,900 = 84{,}5");
    egalites(15, "\\dfrac{50}{12{,}5} = 4");
    egalites(15, "0{,}008 \\times 10\\,000 = 80");
    verif("15 écart", 0.008 * 10000 - d(100), 30);
    const t15 = dessin(15, "schema", "tableau").args;
    vrai("15 tableau", JSON.stringify(t15[1].slice(1)) === JSON.stringify([50, 100, 130].map(d)) && t15[0].slice(1).join() === "50,100,130");

    /* ★★ 16 */
    const f16 = (x) => -x * x + 4;
    courbeEst(16, "figure", 0, f16, "−x² + 4");
    verif("16 a", -4 / 4, -1);
    racine("16", f16, 2);
    racine("16", f16, -2);
    memes("16 −(x + 2)(x − 2)", f16, (x) => -(x + 2) * (x - 2));

    /* ★★★ 17 : en dizaines de mètres */
    const h17 = (x) => -0.25 * (x + 1) * (x - 7);
    courbeEst(17, "figure", 0, h17, "−0,25(x + 1)(x − 7)");
    memes("17 développé", h17, (x) => -0.25 * x * x + 1.5 * x + 1.75);
    egalites(17, "-0{,}25 \\times 1 \\times (-7) = 1{,}75");
    egalites(17, "-0{,}25 \\times 3 \\times (-5) = 3{,}75");
    egalites(17, "-0{,}25 \\times 5 \\times (-3) = 3{,}75");
    racine("17", h17, 7);
    racine("17", h17, -1);
    verif("17 hauteur de lâcher", 1.75 * 10, 17.5);
    verif("17 hauteur en 2", 3.75 * 10, 37.5);
    memes("17 (x + 1)(x − 7)", (x) => (x + 1) * (x - 7), (x) => x * x - 6 * x - 7);

    /* ★★★ 18 */
    const R = (x) => x * (100 - 10 * x);
    memes("18 R développée", R, (x) => -10 * x * x + 100 * x);
    memes("18 R factorisée", R, (x) => -10 * x * (x - 10));
    verif("18 pots à 4 €", 100 - 10 * 4, 60);
    verif("18 R(4)", R(4), 240);
    verif("18 R(6)", R(6), 240);
    egalites(18, "-10 \\times 36 + 600 = 240");
    verif("18 pots à 6 €", 100 - 60, 40);
    racine("18", R, 0);
    racine("18", R, 10);
    verif("18 R(5)", R(5), 250);
    courbeEst(18, "schema", 0, (x) => R(x) / 100, "R en centaines d'euros");

    /* ★★★ 19 */
    const h19 = (t) => -5 * t * t + 20;
    const lune = (t) => -0.8 * t * t + 20;
    verif("19 h(1)", h19(1), 15);
    verif("19 h(2)", h19(2), 0);
    memes("19 −5(t − 2)(t + 2)", h19, (t) => -5 * (t - 2) * (t + 2));
    egalites(19, "-0{,}8 \\times 25 + 20 = -20 + 20 = 0");
    egalites(19, "\\dfrac{5}{0{,}8} = 6{,}25");
    const t19 = dessin(19, "schema", "tableau").args;
    vrai("19 tableau lunaire", t19[1].slice(1).every((v, k) => Math.abs(v - lune([0, 1, 2, 5][k])) < 1e-9) && t19[0].slice(1).join() === "0,1,2,5");

    /* ★★★ 20 : en centaines de papillons */
    const N = (t) => -0.2 * t * t + 1.6 * t + 1.8;
    courbeEst(20, "figure", 0, N, "N");
    memes("20 −0,2(t + 1)(t − 9)", N, (t) => -0.2 * (t + 1) * (t - 9));
    egalites(20, "-0{,}8 + 3{,}2 + 1{,}8 = 4{,}2");
    egalites(20, "-7{,}2 + 9{,}6 + 1{,}8 = 4{,}2");
    verif("20 N(2)", N(2), 4.2);
    verif("20 N(6)", N(6), 4.2);
    verif("20 N(4)", N(4), 5);
    racine("20", N, 9);
    // 1er juin + 9 semaines = 3 août ; + 4 semaines = 29 juin.
    vrai("20 dates", new Date(2026, 5, 1 + 63).getMonth() === 7 && new Date(2026, 5, 1 + 28).getDate() === 29);
  },
});
