// Recalcul indépendant de la feuille « Parabole : sommet et axe de symétrie »
// (1re sans spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-quad-sommet-axe.tsx.
// Chaque sommet annoncé est retrouvé par un AUTRE chemin que le corrigé : on
// balaie la fonction sur une grille fine et on prend son extremum (le corrigé,
// lui, passe par la symétrie). Chaque image symétrique est recalculée ; les
// chaînes « a = b = c » sont relues et évaluées en fractions exactes ; chaque
// courbe dessinée est comparée au modèle ; l'axe tracé est contrôlé par le
// module commun ; les tableaux et diagrammes sont relus.
// Le reste (règles de rendu, micros, 8 + 8 + 4, dollars, en-tête, aucun
// discriminant) : scripts/verifier-exercices-premiere-quad-outils.mjs.
// Usage : node scripts/verifier-exercices-premiere-quad-sommet-axe.mjs

import { lancerQuad } from "./verifier-exercices-premiere-quad-outils.mjs";

/** L'extremum d'une parabole trouvé par balayage (pas de 1/1000), sans formule. */
const extremum = (f, de, a) => {
  let meilleur = { x: de, y: f(de) };
  let pire = { x: de, y: f(de) };
  for (let k = 0; k <= (a - de) * 1000; k++) {
    const x = de + k / 1000;
    const y = f(x);
    if (y > meilleur.y) meilleur = { x, y };
    if (y < pire.y) pire = { x, y };
  }
  return { max: meilleur, min: pire };
};

lancerQuad({
  nom: "Parabole : sommet et axe de symétrie (1re)",
  fichier: "lib/fiches-exercices/maths-premiere-quad-sommet-axe.tsx",
  notionId: "quad_sommet_axe",
  calculs: ({ dessin, courbeEst, verif, vrai, dit, egalites }) => {
    const sommet = (quoi, f, sens, xs, ys, de = -20, a = 20) => {
      const s = extremum(f, de, a)[sens];
      verif(`${quoi} : abscisse du ${sens} (balayage)`, s.x, xs, 1e-6);
      verif(`${quoi} : ordonnée du ${sens} (balayage)`, s.y, ys, 1e-6);
    };
    const memes = (quoi, f, g) => vrai(quoi, [-3, -1.5, 0, 0.5, 2, 4, 7].every((x) => Math.abs(f(x) - g(x)) < 1e-9));

    /* ★ 1 : les signes de a */
    dit(1, "$a = -2 < 0$");
    dit(1, "$a = 0{,}5 > 0$");
    dit(1, "$a = -1 < 0$");
    courbeEst(1, "schema", 0, (x) => -2 * x * x + 3 * x - 1, "f");
    courbeEst(1, "schema", 1, (x) => 0.5 * x * x - 4, "g");
    courbeEst(1, "schema", 2, (x) => 3 - x * x + 2 * x, "k");
    vrai("1 k : coefficient de x² de 3 − x² + 2x", ((x) => 3 - x * x + 2 * x)(1) - 2 * ((x) => 3 - x * x + 2 * x)(0) + ((x) => 3 - x * x + 2 * x)(-1) === -2);

    /* ★ 2 */
    const f2 = (x) => (x - 1) * (x - 5);
    sommet("2", f2, "min", 3, -4);
    egalites(2, "\\dfrac{1 + 5}{2} = 3");
    egalites(2, "(3 - 1)(3 - 5) = 2 \\times (-2) = -4");
    courbeEst(2, "schema", 0, f2);

    /* ★ 3 */
    const f3 = (x) => 2 * (x - 3) ** 2 + 1;
    sommet("3", f3, "min", 3, 1);
    courbeEst(3, "schema", 0, f3);

    /* ★ 4 : axe x = 2 */
    const f4 = (x) => x * x - 4 * x + 5;
    sommet("4 (le modèle dessiné)", f4, "min", 2, 1);
    verif("4 f(0)", f4(0), 5);
    verif("4 f(−1)", f4(-1), 10);
    verif("4 f(4) = f(0)", f4(4), f4(0));
    verif("4 f(5) = f(−1)", f4(5), f4(-1));
    courbeEst(4, "schema", 0, f4);
    dit(4, "$f(4) = f(0) = 5$");
    dit(4, "$f(5) = f(-1) = 10$");

    /* ★ 5 */
    const f5 = (x) => x * x - 6 * x + 2;
    verif("5 f(0) = 2", f5(0), 2);
    verif("5 f(6) = 2", f5(6), 2);
    sommet("5", f5, "min", 3, -7);
    egalites(5, "\\dfrac{0 + 6}{2} = 3");
    egalites(5, "9 - 18 + 2 = -7");
    courbeEst(5, "schema", 0, f5);

    /* ★ 6 */
    const f6 = (x) => -(x + 2) * (x - 4);
    sommet("6", f6, "max", 1, 9);
    egalites(6, "\\dfrac{-2 + 4}{2} = 1");
    egalites(6, "-(1 + 2)(1 - 4) = -(3 \\times (-3)) = 9");
    courbeEst(6, "schema", 0, f6);

    /* ★ 7 */
    const f7 = (x) => -0.5 * x * x + 2 * x + 1;
    courbeEst(7, "figure", 0, f7);
    sommet("7", f7, "max", 2, 3);
    egalites(7, "-0{,}5 \\times 4 + 4 + 1 = 3");

    /* ★ 8 : tableau de x² − 4x + 2 */
    const f8 = (x) => x * x - 4 * x + 2;
    const t8 = dessin(8, "figure", "tableau").args;
    vrai("8 tableau relu = x² − 4x + 2", t8[1].slice(1).every((v, k) => v === f8(Number(t8[0][k + 1]))));
    sommet("8", f8, "min", 2, -2);
    verif("8 f(5)", f8(5), 7);
    verif("8 f(−1)", f8(-1), 7);

    /* ★★ 9 */
    const h9 = (x) => -0.5 * x * (x - 6);
    sommet("9", h9, "max", 3, 4.5);
    egalites(9, "\\dfrac{0 + 6}{2} = 3");
    egalites(9, "-0{,}5 \\times 3 \\times (-3) = 4{,}5");
    egalites(9, "-0{,}5 \\times 1 \\times (-5) = 2{,}5");
    verif("9 h(5)", h9(5), 2.5);
    courbeEst(9, "schema", 0, h9);

    /* ★★ 10 */
    const B = (x) => -0.5 * x * x + 4 * x - 2;
    verif("10 B(0)", B(0), -2);
    verif("10 B(8)", B(8), -2);
    egalites(10, "\\dfrac{4}{0{,}5} = 8");
    sommet("10", B, "max", 4, 6, 0, 8);
    egalites(10, "-0{,}5 \\times 16 + 16 - 2 = 6");
    courbeEst(10, "schema", 0, B);

    /* ★★ 11 */
    const C = (x) => (x - 3) ** 2 + 5;
    sommet("11", C, "min", 3, 5);
    egalites(11, "(1 - 3)^2 + 5 = 4 + 5 = 9");
    verif("11 C(5)", C(5), 9);
    courbeEst(11, "schema", 0, C);

    /* ★★ 12 : voûte */
    const h12 = (x) => -0.5 * x * (x - 8);
    const t12 = dessin(12, "figure", "tableau").args;
    vrai("12 tableau relu = −0,5x(x − 8)", t12[1].slice(1).every((v, k) => v === h12(Number(t12[0][k + 1]))));
    sommet("12", h12, "max", 4, 8);
    egalites(12, "-0{,}5 \\times 1 \\times (-7) = 3{,}5");
    verif("12 h(7)", h12(7), 3.5);
    courbeEst(12, "schema", 0, h12);

    /* ★★ 13 : vallée */
    const y13 = (x) => 0.25 * (x - 1) * (x - 9);
    verif("13 rebord 1", y13(1), 0);
    verif("13 rebord 9", y13(9), 0);
    sommet("13", y13, "min", 5, -4);
    egalites(13, "\\dfrac{1 + 9}{2} = 5");
    egalites(13, "0{,}25 \\times (5 - 1) \\times (5 - 9) = 0{,}25 \\times 4 \\times (-4) = -4");
    courbeEst(13, "schema", 0, y13);

    /* ★★ 14 : volley */
    const h14 = (x) => -0.2 * x * x + 1.6 * x + 2;
    verif("14 h(8)", h14(8), 2);
    egalites(14, "\\dfrac{1{,}6}{0{,}2} = 8");
    sommet("14", h14, "max", 4, 5.2);
    egalites(14, "-0{,}2 \\times 16 + 1{,}6 \\times 4 + 2 = -3{,}2 + 6{,}4 + 2 = 5{,}2");
    courbeEst(14, "schema", 0, h14);

    /* ★★ 15 : cinéma */
    const R15 = (p) => p * (200 - 10 * p);
    verif("15 R(8)", R15(8), 960);
    verif("15 R(12)", R15(12), 960);
    sommet("15", R15, "max", 10, 1000, 0, 20);
    memes("15 développée", R15, (p) => -10 * p * p + 200 * p);
    egalites(15, "\\dfrac{8 + 12}{2} = 10");
    egalites(15, "10 \\times (200 - 100) = 1\\,000");
    verif("15 R(6)", R15(6), 840);
    verif("15 R(14)", R15(14), 840);
    const d15 = dessin(15, "schema", "diagramme").args[1];
    vrai("15 diagramme relu", d15.every((b) => b.value === R15(Number(b.label.replace(" €", "")))));

    /* ★★ 16 : plongeon */
    const h16 = (t) => -5 * (t - 2) * (t + 1);
    egalites(16, "-5 \\times (-2) \\times 1 = 10");
    egalites(16, "\\dfrac{-1 + 2}{2} = 0{,}5");
    egalites(16, "-5 \\times (-1{,}5) \\times 1{,}5 = 11{,}25");
    sommet("16", h16, "max", 0.5, 11.25);
    courbeEst(16, "schema", 0, h16);

    /* ★★★ 17 : arche, en dizaines de mètres */
    const h17 = (x) => -0.75 * x * (x - 4);
    courbeEst(17, "figure", 0, h17);
    courbeEst(17, "schema", 0, h17);
    sommet("17", h17, "max", 2, 3);
    egalites(17, "-0{,}75 \\times 2 \\times (-2) = 3");
    egalites(17, "-0{,}75 \\times 1 \\times (-3) = 2{,}25");
    // Le bateau (rectangle dessiné) : de 1 à 3, haut de 2 ; l'arche au-dessus partout.
    const bateau = dessin(17, "schema", "parabole").args[1][1].pts;
    vrai("17 bateau dessiné : 20 m × 20 m centré", JSON.stringify(bateau) === JSON.stringify([[1, 0], [1, 2], [3, 2], [3, 0]]));
    vrai("17 l'arche passe au-dessus du bateau partout", Array.from({ length: 201 }, (_, k) => 1 + k / 100).every((x) => h17(x) >= 2.25 - 1e-9 && h17(x) > 2));
    verif("17 marge", (h17(1) - 2) * 10, 2.5);

    /* ★★★ 18 : salle de concert */
    const R18 = (x) => x * (600 - 20 * x);
    memes("18 développée", R18, (x) => -20 * x * x + 600 * x);
    memes("18 factorisée", R18, (x) => -20 * x * (x - 30));
    verif("18 R(10)", R18(10), 4000);
    verif("18 R(20)", R18(20), 4000);
    sommet("18", R18, "max", 15, 4500, 0, 30);
    verif("18 spectateurs", 600 - 20 * 15, 300);
    verif("18 R(26)", R18(26), 2080);
    verif("18 R(4)", R18(4), 2080);
    const d18 = dessin(18, "schema", "diagramme").args[1];
    vrai("18 diagramme relu", d18.every((b) => b.value === R18(Number(b.label.replace(" €", "")))));

    /* ★★★ 19 : saut à ski */
    const h19 = (x) => -0.25 * (x - 4) ** 2 + 4;
    courbeEst(19, "figure", 0, h19);
    sommet("19", h19, "max", 4, 4);
    egalites(19, "-0{,}25 \\times 16 + 4 = 0");
    egalites(19, "-0{,}25 \\times 4 + 4 = 3");
    verif("19 h(8)", h19(8), 0);
    verif("19 h(6)", h19(6), 3);
    memes("19 développée", h19, (x) => -0.25 * x * x + 2 * x);
    memes("19 factorisée", h19, (x) => -0.25 * x * (x - 8));

    /* ★★★ 20 : lob */
    const h20 = (x) => -0.25 * (x - 3) ** 2 + 4.25;
    const t20 = dessin(20, "figure", "tableau").args;
    vrai("20 tableau relu = modèle", t20[1].slice(1).every((v, k) => Math.abs(v - h20(Number(t20[0][k + 1]))) < 1e-9));
    sommet("20", h20, "max", 3, 4.25);
    egalites(20, "-0{,}25 \\times 9 + 4{,}25 = -2{,}25 + 4{,}25 = 2");
    egalites(20, "-0{,}25 \\times 4 + 4{,}25 = 3{,}25");
    vrai("20 hors de portée", h20(5) > 3);
    courbeEst(20, "schema", 0, h20);
  },
});
