// Recalcul indépendant de la feuille « Racines et signe par la forme
// factorisée » (1re sans spé, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-quad-racines-signe.tsx.
// Chaque racine est réinjectée ; chaque forme factorisée est comparée à la
// forme développée en 7 points ; chaque ensemble de solutions annoncé est
// retrouvé en TESTANT l'inéquation sur une grille fine (pas de 1/100), bornes
// comprises ; les tableaux de signes sont refaits case par case par le module
// commun ; les chaînes « a = b = c » sont relues en fractions exactes ; les
// courbes dessinées sont comparées aux modèles.
// Le reste (règles de rendu, micros, 8 + 8 + 4, dollars, en-tête, aucun
// discriminant) : scripts/verifier-exercices-premiere-quad-outils.mjs.
// Usage : node scripts/verifier-exercices-premiere-quad-racines-signe.mjs

import { lancerQuad } from "./verifier-exercices-premiere-quad-outils.mjs";

lancerQuad({
  nom: "Racines et signe par la forme factorisée (1re)",
  fichier: "lib/fiches-exercices/maths-premiere-quad-racines-signe.tsx",
  notionId: "quad_racines_signe",
  calculs: ({ dessin, courbeEst, verif, vrai, dit, egalites }) => {
    const racine = (quoi, f, x) => verif(`${quoi} : f(${x}) = 0`, f(x), 0);
    const memes = (quoi, f, g) => vrai(quoi, [-3, -1.5, 0, 0.5, 2, 4, 7].every((x) => Math.abs(f(x) - g(x)) < 1e-9));
    /** L'ensemble { x ∈ [de ; a] : cond(x) } est-il la réunion d'intervalles annoncée ?
     *  ivs : [gauche, droite, gaucheIncluse, droiteIncluse]. */
    const ensemble = (quoi, cond, ivs, de = -30, a = 30) => {
      const dedans = (x) => ivs.some(([g, d, gi, di]) => (gi ? x >= g - 1e-12 : x > g + 1e-12) && (di ? x <= d + 1e-12 : x < d - 1e-12));
      const grille = [];
      for (let k = de * 100; k <= a * 100; k++) grille.push(k / 100);
      const faux = grille.find((x) => cond(x) !== dedans(x));
      vrai(`${quoi}${faux === undefined ? "" : ` — désaccord en x = ${faux}`}`, faux === undefined);
    };

    /* ★ 1 */
    const f1 = (x) => 3 * (x - 2) * (x + 5);
    racine("1", f1, 2);
    racine("1", f1, -5);
    egalites(1, "3 \\times (-7) \\times 0 = 0");

    /* ★ 2 */
    const g2 = (x) => -x * (2 * x - 6);
    racine("2", g2, 0);
    racine("2", g2, 3);
    vrai("2 : 6 n'est pas racine", g2(6) !== 0);
    courbeEst(2, "schema", 0, g2, "g");
    courbeEst(3, "schema", 0, (x) => -x * (x - 3), "g de 3 b");
    courbeEst(4, "schema", 0, (x) => (x - 4) * (x + 2), "(x − 4)(x + 2)");

    /* ★ 3 */
    const f3 = (x) => 2 * (x + 1) * (x - 4);
    racine("3 a", f3, -1);
    racine("3 a", f3, 4);
    const g3 = (x) => -x * (x - 3);
    racine("3 b", g3, 0);
    racine("3 b", g3, 3);
    dit(3, "$f(x) = 2(x - (-1))(x - 4) = 2(x + 1)(x - 4)$");

    /* ★ 4 */
    memes("4 (x − 4)(x + 2) = x² − 2x − 8", (x) => (x - 4) * (x + 2), (x) => x * x - 2 * x - 8);
    racine("4", (x) => x * x - 2 * x - 8, 4);
    racine("4", (x) => x * x - 2 * x - 8, -2);

    /* ★ 5, ★ 6 : tableaux refaits par le module ; on vérifie ici le texte */
    ensemble("5 f < 0 entre 1 et 4", (x) => (x - 1) * (x - 4) < 0, [[1, 4, false, false]]);
    ensemble("6 f > 0 entre −3 et 1", (x) => -2 * (x + 3) * (x - 1) > 0, [[-3, 1, false, false]]);

    /* ★ 7 */
    ensemble("7 (x − 2)(x + 3) < 0 ⇔ ]−3 ; 2[", (x) => (x - 2) * (x + 3) < 0, [[-3, 2, false, false]]);
    const iv7 = dessin(7, "schema", "droite").args[2];
    vrai("7 la droite dessinée montre ]−3 ; 2[", iv7.de === -3 && iv7.a === 2 && iv7.deInclus === false && iv7.aInclus === false);
    dit(7, "$]-3 ; 2[$");

    /* ★ 8 */
    const f8 = (x) => 0.5 * (x + 2) * (x - 4);
    courbeEst(8, "figure", 0, f8);
    verif("8 f(0)", f8(0), -4);
    verif("8 a", -4 / -8, 0.5);
    racine("8", f8, -2);
    racine("8", f8, 4);

    /* ★★ 9 */
    const B9 = (x) => -(x - 2) * (x - 10);
    racine("9", B9, 2);
    racine("9", B9, 10);
    ensemble("9 B > 0 ⇔ ]2 ; 10[ sur [0 ; 12]", (x) => B9(x) > 0, [[2, 10, false, false]], 0, 12);

    /* ★★ 10 : grenouille */
    const h10 = (x) => -0.1 * x * (x - 10);
    courbeEst(10, "figure", 0, h10);
    memes("10 développée", h10, (x) => -0.1 * x * x + x);
    egalites(10, "-0{,}1 \\times 5 \\times (-5) = 2{,}5");

    /* ★★ 11 : gel */
    const T = (t) => 0.5 * (t - 2) * (t - 8);
    courbeEst(11, "figure", 0, T);
    racine("11", T, 2);
    racine("11", T, 8);
    ensemble("11 T < 0 ⇔ ]2 ; 8[ sur [0 ; 10]", (t) => T(t) < 0, [[2, 8, false, false]], 0, 10);
    egalites(11, "0{,}5 \\times 3 \\times (-3) = -4{,}5");
    vrai("11 minimum en 5", [4.9, 5.1, 3, 7].every((t) => T(t) > T(5)));

    /* ★★ 12 : brasserie */
    const B12 = (x) => -x * x + 9 * x - 14;
    memes("12 −(x − 2)(x − 7)", B12, (x) => -(x - 2) * (x - 7));
    memes("12 (2 − x)(x − 7)", B12, (x) => (2 - x) * (x - 7));
    memes("12 développement écrit", (x) => (x - 2) * (x - 7), (x) => x * x - 9 * x + 14);
    racine("12", B12, 2);
    racine("12", B12, 7);
    courbeEst(12, "schema", 0, B12);

    /* ★★ 13 : potager */
    const A = (x) => x * (12 - x);
    memes("13 A − 20", (x) => A(x) - 20, (x) => -(x - 2) * (x - 10));
    ensemble("13 A ≥ 20 ⇔ [2 ; 10]", (x) => A(x) >= 20 - 1e-12, [[2, 10, true, true]], 0, 12);
    verif("13 périmètre", 2 * (5 + (12 - 5)), 24);

    /* ★★ 14 : pont en arc */
    const h14 = (x) => -0.5 * (x + 3) * (x - 3);
    courbeEst(14, "figure", 0, h14);
    verif("14 h(0)", h14(0), 4.5);
    verif("14 a", 4.5 / -9, -0.5);
    memes("14 développée", h14, (x) => -0.5 * x * x + 4.5);
    egalites(14, "\\dfrac{4{,}5}{-9} = -0{,}5");

    /* ★★ 15 : trésorerie */
    const S = (t) => 0.5 * (t - 1) * (t - 7);
    courbeEst(15, "figure", 0, S);
    ensemble("15 S < 0 ⇔ ]1 ; 7[ sur [0 ; 9]", (t) => S(t) < 0, [[1, 7, false, false]], 0, 9);

    /* ★★ 16 */
    ensemble("16 (x + 4)(x − 1) ≥ 0", (x) => (x + 4) * (x - 1) >= 0, [[-Infinity, -4, false, true], [1, Infinity, true, false]]);
    const iv16 = dessin(16, "schema", "intervalles").args[2];
    vrai("16 le dessin montre ]−∞ ; −4] ∪ [1 ; +∞[", iv16[0].a === -4 && iv16[0].aInclus === true && iv16[0].de === undefined && iv16[1].de === 1 && iv16[1].deInclus === true && iv16[1].a === undefined);
    dit(16, "$]-\\infty ; -4] \\cup [1 ; +\\infty[$");

    /* ★★★ 17 : lob */
    const h17 = (x) => -0.05 * x * (x - 20);
    memes("17 développée", h17, (x) => -0.05 * x * x + x);
    memes("17 h − 1,8", (x) => h17(x) - 1.8, (x) => -0.05 * (x - 2) * (x - 18));
    ensemble("17 h > 1,8 ⇔ ]2 ; 18[", (x) => h17(x) > 1.8 + 1e-12, [[2, 18, false, false]], 0, 20);
    egalites(17, "-0{,}05 \\times 3 \\times (-17) = 2{,}55");
    racine("17", h17, 20);

    /* ★★★ 18 : ferme bio */
    const B18 = (x) => -0.5 * x * x + 7 * x - 20;
    courbeEst(18, "figure", 0, B18);
    memes("18 factorisée", B18, (x) => -0.5 * (x - 4) * (x - 10));
    ensemble("18 B > 0 ⇔ ]4 ; 10[", (x) => B18(x) > 1e-12, [[4, 10, false, false]], 0, 12);
    egalites(18, "-0{,}5 \\times 3 \\times (-3) = 4{,}5");

    /* ★★★ 19 : crue */
    const d = (t) => -0.1 * (t - 2) * (t - 8);
    verif("19 d(0)", d(0), -1.6);
    verif("19 a", -1.6 / 16, -0.1);
    memes("19 développée", d, (t) => -0.1 * t * t + t - 1.6);
    ensemble("19 d > 0 ⇔ ]2 ; 8[", (t) => d(t) > 1e-12, [[2, 8, false, false]], 0, 10);
    egalites(19, "-0{,}1 \\times 3 \\times (-3) = 0{,}9");

    /* ★★★ 20 : club */
    const R = (x) => -x * x + 14 * x;
    const C = (x) => 3 * x + 18;
    memes("20 B = R − C", (x) => R(x) - C(x), (x) => -x * x + 11 * x - 18);
    memes("20 factorisée", (x) => R(x) - C(x), (x) => -(x - 2) * (x - 9));
    courbeEst(20, "figure", 0, (x) => R(x) / 10, "R en dizaines de milliers");
    courbeEst(20, "figure", 1, (x) => C(x) / 10, "C en dizaines de milliers");
    ensemble("20 B > 0 ⇔ ]2 ; 9[", (x) => R(x) - C(x) > 1e-12, [[2, 9, false, false]], 0, 12);
    verif("20 croisement en 2", R(2), C(2));
    verif("20 croisement en 9", R(9), C(9));
  },
});
