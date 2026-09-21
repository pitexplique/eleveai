// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Développer et
// factoriser » de seconde (lib/fiches-exercices/maths-seconde-devfac.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé développe et factorise à la main ; ici on ne
// développe RIEN. L'expression de l'énoncé et la forme du corrigé sont lues
// telles qu'elles sont écrites (`evalTex` du module commun), puis évaluées en
// fractions exactes en neuf valeurs de x. Deux écritures qui coïncident partout
// sont la même expression.
//
// ⭐ ET LE RÉSULTAT DOIT SE LIRE À SA PLACE : `chaine()` exige, dans UNE même
// formule du corrigé, l'expression de départ puis la forme finale
// (« $x^2 - 49 = (x - 7)(x + 7)$ ») — pas seulement la forme quelque part dans
// le texte. C'est la leçon du contrôle négatif de la feuille des puissances.
//
//   node scripts/verifier-exercices-devfac.mjs

import { Q, D, egal, moins, evalTex, identiques, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const echappe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function verifier(source, v) {
  const { enonces, corrections } = lireFeuille(source);
  const e = (k) => enonces[k - 1] ?? "";
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  /** « orig = … = forme$ » dans UNE formule du corrigé, orig lu dans l'énoncé,
   *  et les deux écritures identiques. */
  const chaine = (k, orig, forme, { enonce = true } = {}) => {
    const re = new RegExp(`${echappe(orig)}(?: = [^$]*)? = ${echappe(forme)}\\$`);
    const id = identiques(orig, forme);
    const lu = re.test(c(k));
    const dansEnonce = !enonce || e(k).includes(orig);
    v.ok(`${k}. ${orig} = ${forme}`, id && lu && dansEnonce, `identiques : ${id} ; lu dans le corrigé : ${lu} ; dans l'énoncé : ${dansEnonce}`);
  };
  /** La forme est identique à l'expression, et la phrase qui la porte est écrite. */
  const vaut = (k, orig, forme, phrase) => {
    const id = identiques(orig, forme);
    v.ok(`${k}. ${orig} ≡ ${forme} — « ${phrase} »`, id && c(k).includes(phrase), `identiques : ${id}`);
  };
  /** Les solutions de gauche = droite : chacune annule la différence, qui n'est
   *  pas nulle partout et reste de degré ≤ 2 — deux solutions distinctes sont
   *  donc TOUTES les solutions. */
  const solutions = (k, gauche, droite, sols, phrase) => {
    const f = (x) => moins(evalTex(gauche, x), evalTex(droite, x));
    const annule = sols.every((s) => egal(f(Q(s)), Q(0)));
    const [f0, f1, f2, f3] = [0, 1, 2, 3].map((n) => f(Q(n)));
    const degre2 = egal(moins(moins(f3, f0), fois3(moins(f2, f1))), Q(0));
    const nonNulle = [0, 1, 2, 3, 7].some((n) => !egal(f(Q(n)), Q(0)));
    const complet = new Set(sols).size === 2 && degre2 && nonNulle;
    v.ok(`${k}. ${gauche} = ${droite} : ${sols.join(" ou ")}, et rien d'autre`, annule && complet && c(k).includes(phrase), `annulent : ${annule} ; complet : ${complet} ; phrase : ${c(k).includes(phrase)}`);
  };
  const fois3 = (a) => Q(a.n * 3n, a.d);
  const val = (tex, x) => evalTex(tex, typeof x === "string" ? D(x) : Q(x));

  v.titre("★ Un seul geste");
  chaine(1, "5(x - 2)", "5x - 10");
  chaine(1, "-3(2x + 4)", "-6x - 12");
  chaine(1, "x(x - 7)", "x^2 - 7x");
  chaine(1, "2x(3x + 1)", "6x^2 + 2x");

  chaine(2, "10 - (x + 4)", "6 - x");
  chaine(2, "3x - (5 - 2x)", "5x - 5");
  chaine(2, "-(x - 1) + 2(x + 3)", "x + 7");
  v.ok("2. le piège 10 − x + 4 n'est pas 10 − (x + 4)", !identiques("10 - x + 4", "10 - (x + 4)"));

  chaine(3, "(x + 4)(x + 2)", "x^2 + 6x + 8");
  chaine(3, "(x - 3)(x + 7)", "x^2 + 4x - 21");

  chaine(4, "(3x - 1)(2x + 5)", "6x^2 + 13x - 5");
  chaine(4, "(4 - x)(x + 2)", "-x^2 + 2x + 8");

  chaine(5, "6x + 15", "3(2x + 5)");
  chaine(5, "10x - 4", "2(5x - 2)");
  chaine(5, "x^2 + 9x", "x(x + 9)");
  chaine(5, "12x^2 - 8x", "4x(3x - 2)");

  chaine(6, "(x + 2)(3x - 1) + (x + 2)(x + 6)", "(x + 2)(4x + 5)");
  vaut(6, "(x + 2)(3x - 1) + (x + 2)(x + 6)", "4x^2 + 13x + 10", "$4x^2 + 13x + 10$");

  chaine(7, "x^2 - 49", "(x - 7)(x + 7)");
  chaine(7, "x^2 + 8x + 16", "(x + 4)^2");
  chaine(7, "x^2 - 12x + 36", "(x - 6)^2");
  v.ok("7. le piège (x − 7)² n'est pas x² − 49", !identiques("(x - 7)^2", "x^2 - 49"));

  solutions(8, "(2x - 6)(x + 5)", "0", [3, -5], "$x = 3$ ou $x = -5$");
  vaut(8, "(2x - 6)(x + 5)", "2x^2 + 4x - 30", "$2x^2 + 4x - 30 = 0$");

  v.titre("★★ Type devoir");
  chaine(9, "(x + 3)(x - 2)", "x^2 + x - 6");
  chaine(9, "(x - 1)(x + 4)", "x^2 + 3x - 4");
  vaut(9, "(x + 3)(x - 2) - (x - 1)(x + 4)", "-2x - 2", "= -2x - 2$");

  chaine(10, "(x - 1)(x + 2)", "x^2 + x - 2");
  vaut(10, "3(x - 1)(x + 2)", "3x^2 + 3x - 6", "= 3x^2 + 3x - 6$");
  v.ok("10. le piège (3x − 3)(3x + 6) vaut 3 fois B", identiques("(3x - 3)(3x + 6)", "3(3x^2 + 3x - 6)"));

  vaut(11, "(2x - 3)(x + 4) - (2x - 3)(5x - 1)", "(2x - 3)(-4x + 5)", "$C = (2x - 3)(-4x + 5)$");
  chaine(11, "(x + 4) - (5x - 1)", "-4x + 5", { enonce: false });

  vaut(12, "(x - 4)(2x + 1) + (x - 4)", "(x - 4)(2x + 2)", "= (x - 4)(2x + 2)$");
  vaut(12, "(x - 4)(2x + 1) + (x - 4)", "2(x - 4)(x + 1)", "$D = 2(x - 4)(x + 1)$");

  vaut(13, "(x + 1)^2 - 9", "(x - 2)(x + 4)", "$E = (x - 2)(x + 4)$");
  vaut(13, "(x + 1)^2 - 9", "x^2 + 2x - 8", "$x^2 + 2x - 8$");

  v.ok("14. (x + 1)(x + 5) − (x + 3)² ne dépend pas de x : elle vaut −4", identiques("(x + 1)(x + 5) - (x + 3)^2", "-4"));
  chaine(14, "(x + 1)(x + 5)", "x^2 + 6x + 5");
  chaine(14, "(x + 3)(x + 3)", "x^2 + 6x + 9", { enonce: false });
  dit(14, "= 5 - 9 = -4$");
  v.ok("14. et en x = 100 : 101 × 105 − 103² = −4", 101 * 105 - 103 ** 2 === -4 && egal(val("(x + 1)(x + 5) - (x + 3)^2", 100), Q(-4)));

  solutions(15, "x^2", "5x", [0, 5], "$x = 0$ ou $x = 5$");
  vaut(15, "x^2 - 5x", "x(x - 5)", "$x(x - 5) = 0$");

  solutions(16, "(x + 2)(x - 3)", "(x + 2)(2x + 1)", [-2, -4], "$x = -2$ ou $x = -4$");
  vaut(16, "(x + 2)(x - 3) - (x + 2)(2x + 1)", "(x + 2)(-x - 4)", "$(x + 2)(-x - 4) = 0$");

  v.titre("★★★ Problèmes");
  chaine(17, "(x + 5)(x + 2)", "x^2 + 7x + 10", { enonce: false });
  vaut(17, "x^2 + 7x + 10 - x^2", "7x + 10", "= 7x + 10$");
  v.ok("17. pour x = 4 : 54, 16 et 38", egal(val("(x + 5)(x + 2)", 4), Q(54)) && egal(val("x^2", 4), Q(16)) && egal(val("7x + 10", 4), Q(38)) && 54 - 16 === 38);
  dit(17, "9 \\times 6 = 54$");
  dit(17, "4^2 = 16$");
  dit(17, "7 \\times 4 + 10 = 38$");
  v.ok("17. 7x + 10 = 45 pour x = 5", egal(val("7x + 10", 5), Q(45)));
  dit(17, "$x = 5$");

  const programme = (n) => (n + 3) * (n - 3) + 9;
  v.ok("18. le programme donne 16 avec 4 et 25 avec −5", programme(4) === 16 && programme(-5) === 25);
  dit(18, "7 + 9 = 16$");
  dit(18, "16 + 9 = 25$");
  chaine(18, "(x + 3)(x - 3)", "x^2 - 9", { enonce: false });
  vaut(18, "(x + 3)(x - 3) + 9", "x^2", "= x^2 - 9 + 9 = x^2$");

  chaine(19, "(10 + 2x)(15 + 2x)", "4x^2 + 50x + 150", { enonce: false });
  vaut(19, "(10 + 2x)(15 + 2x) - 10 \\times 15", "4x^2 + 50x", "mesure $4x^2 + 50x$ cm²");
  chaine(19, "4x^2 + 50x", "2x(2x + 25)", { enonce: false });
  v.ok("19. pour x = 2,5 le cadre fait 150 cm², l'aire de la photo", egal(val("2x(2x + 25)", "2,5"), Q(150)) && 10 * 15 === 150);
  dit(19, "5 \\times 30 = 150$");

  vaut(20, "(x - 3)^2 - 16", "x^2 - 6x - 7", "= x^2 - 6x - 7$");
  vaut(20, "(x - 3)^2 - 16", "(x - 7)(x + 1)", "= (x - 7)(x + 1)$");
  v.ok("20. g(0) = −7 et g(3) = −16", egal(val("(x - 3)^2 - 16", 0), Q(-7)) && egal(val("(x - 3)^2 - 16", 3), Q(-16)));
  dit(20, "g(0) = -7$");
  dit(20, "g(3) = 0^2 - 16 = -16$");
  solutions(20, "(x - 3)^2 - 16", "0", [7, -1], "$x = 7$ ou $x = -1$");
  solutions(20, "(x - 3)^2 - 16", "-7", [0, 6], "$x = 0$ ou $x = 6$");
}

lancer({
  nom: "DÉVELOPPER ET FACTORISER · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-devfac.tsx",
  notionId: "developpement_factorisation_2de",
  verifier,
  casses: [
    ["ex. 1 : 5(x − 2) = 5x − 2", "= 5x - 10$", "= 5x - 2$"],
    ["ex. 2 : le moins sur le premier terme seulement", "= 6 - x$", "= 14 - x$"],
    ["ex. 4 : −1 × 5 = +5", "= 6x^2 + 13x - 5$", "= 6x^2 + 13x + 5$"],
    ["ex. 5 : un mauvais facteur", "12x^2 - 8x = 4x(3x - 2)$", "12x^2 - 8x = 4x(3x - 8)$"],
    ["ex. 8 : une solution de signe faux", "$x = 3$ ou $x = -5$", "$x = 3$ ou $x = 5$"],
    ["ex. 11 : le piège du −1 appliqué", "$C = (2x - 3)(-4x + 5)$", "$C = (2x - 3)(-4x + 3)$"],
    ["ex. 15 : la solution 0 perdue", "Les solutions sont $x = 0$ ou $x = 5$.", "Les solutions sont $x = 5$."],
    ["ex. 16 : un signe faux dans le crochet", "soit $(x + 2)(-x - 4) = 0$", "soit $(x + 2)(-x + 4) = 0$"],
    ["ex. 19 : l'aire du cadre fausse", "5 \\\\times 30 = 150$", "5 \\\\times 30 = 160$"],
    ["ex. 20 : g(3) de signe faux", "g(3) = 0^2 - 16 = -16$", "g(3) = 0^2 - 16 = 16$"],
    ["une micro inconnue du coach", "micros: [\"devfac_factoriser_identite\"],\n        },\n        {\n          enonce: \"Résoudre l'équation $(2x", "micros: [\"devfac_inconnue\"],\n        },\n        {\n          enonce: \"Résoudre l'équation $(2x"],
    ["un $ dans un canvas", "values: [\"6x²\"", "values: [\"$6x^2$\""],
  ],
});
