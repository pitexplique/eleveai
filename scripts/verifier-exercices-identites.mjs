// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les identités
// remarquables » de seconde (lib/fiches-exercices/maths-seconde-identites.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé applique une identité ; ici on n'en applique
// aucune. L'expression de départ et la forme du corrigé sont lues telles
// qu'elles sont écrites et comparées en neuf valeurs de x (fractions exactes).
// Les expressions à racines sont évaluées en décimal (`evalTexReel`), et les
// grands nombres en entiers exacts (BigInt).
//
//   node scripts/verifier-exercices-identites.mjs

import { Q, egal, tex, evalTex, evalTexReel, identiques, lireFeuille, outilsAlgebre, lancer } from "./verifier-exercices-commun.mjs";

const proche = (a, b) => Math.abs(a - b) < 1e-9;
const entier = (n) => tex(Q(n));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, chaine, vaut, solutions } = outilsAlgebre(v, f);
  /** Une expression à racines : sa valeur décimale est celle de la forme, et
   *  « orig = … = forme$ » se lit dans le corrigé. */
  const reel = (k, orig, forme) => {
    const a = evalTexReel(orig);
    const b = evalTexReel(forme);
    v.ok(`${k}. ${orig} ≈ ${a.toFixed(6)} = ${forme}`, proche(a, b) && c(k).includes(`= ${forme}$`), `forme : ${b.toFixed(6)} ; lu : ${c(k).includes(`= ${forme}$`)}`);
  };

  v.titre("★ Un seul geste");
  chaine(1, "(x + 7)^2", "x^2 + 14x + 49");
  chaine(1, "(3x + 1)^2", "9x^2 + 6x + 1");
  chaine(1, "(5 + 2x)^2", "25 + 20x + 4x^2");
  vaut(1, "(5 + 2x)^2", "4x^2 + 20x + 25", "en $4x^2 + 20x + 25$");
  v.ok("1. le piège : (3x)² n'est pas 3x²", !identiques("(3x)^2", "3x^2"));

  chaine(2, "(x - 9)^2", "x^2 - 18x + 81");
  chaine(2, "(2x - 5)^2", "4x^2 - 20x + 25");
  chaine(2, "(1 - 3x)^2", "1 - 6x + 9x^2");
  vaut(2, "(1 - 3x)^2", "9x^2 - 6x + 1", "en $9x^2 - 6x + 1$");

  chaine(3, "(x - 8)(x + 8)", "x^2 - 64");
  chaine(3, "(3x + 2)(3x - 2)", "9x^2 - 4");
  chaine(3, "(5 - x)(5 + x)", "25 - x^2");
  v.ok("3. le piège x² − 25 n'est pas (5 − x)(5 + x)", !identiques("x^2 - 25", "(5 - x)(5 + x)"));

  v.ok("4. en x = 1 : (1 + 3)² = 16 mais 1 + 9 = 10", egal(evalTex("(x + 3)^2", Q(1)), Q(16)) && egal(evalTex("x^2 + 9", Q(1)), Q(10)));
  dit(4, "4^2 = 16$");
  dit(4, "1^2 + 9 = 10$");
  chaine(4, "(x + 3)^2", "x^2 + 6x + 9");
  dit(4, "1 + 6 + 9 = 16$");

  chaine(5, "x^2 - 100", "(x - 10)(x + 10)");
  chaine(5, "4x^2 - 25", "(2x - 5)(2x + 5)");
  chaine(5, "49 - 16x^2", "(7 - 4x)(7 + 4x)");

  chaine(6, "x^2 + 20x + 100", "(x + 10)^2");
  chaine(6, "9x^2 - 12x + 4", "(3x - 2)^2");
  chaine(6, "4x^2 + 4x + 1", "(2x + 1)^2");

  for (const [orig, forme, valeur] of [["41^2", "(40 + 1)^2", 1681], ["29^2", "(30 - 1)^2", 841], ["38 \\times 42", "(40 - 2)(40 + 2)", 1596]]) {
    v.ok(`7. ${orig} = ${valeur}`, egal(evalTex(orig, Q(0)), Q(valeur)) && egal(evalTex(forme, Q(0)), Q(valeur)));
    dit(7, `= ${entier(valeur)}$`);
  }
  dit(7, "2 \\times 40 \\times 1 = 80$");

  chaine(8, "x^2 - 36", "(x - 6)(x + 6)");
  chaine(8, "x^2 - 10x + 25", "(x - 5)^2");
  // d) : aucun (x ± 5)² ne donne x² + 5x + 25, et x² + 36 n'a pas de racine réelle.
  v.ok("8. x² + 5x + 25 n'est ni (x + 5)² ni (x − 5)²", !identiques("x^2 + 5x + 25", "(x + 5)^2") && !identiques("x^2 + 5x + 25", "(x - 5)^2"));
  v.ok("8. x² + 36 ne s'annule jamais (donc aucun facteur x − r)", [-6, 0, 6].every((n) => !egal(evalTex("x^2 + 36", Q(n)), Q(0))));
  dit(8, "b) Une SOMME de deux carrés : aucune identité");
  dit(8, "pas $5x$ : aucune identité ne convient");

  v.titre("★★ Type devoir");
  vaut(9, "(x + 4)^2 - (x - 4)^2", "16x", "= 16x$");
  chaine(9, "(x + 4)^2", "x^2 + 8x + 16");
  chaine(9, "(x - 4)^2", "x^2 - 8x + 16");

  vaut(10, "(2x - 1)^2 - (x + 3)(x - 3)", "3x^2 - 4x + 10", "= 3x^2 - 4x + 10$");
  chaine(10, "(2x - 1)^2", "4x^2 - 4x + 1", { enonce: true });
  chaine(10, "(x + 3)(x - 3)", "x^2 - 9");

  reel(11, "\\left(3 + \\sqrt{2}\\right)^2", "11 + 6\\sqrt{2}");
  reel(11, "\\left(\\sqrt{5} - 1\\right)^2", "6 - 2\\sqrt{5}");

  dit(12, "= 16 - 3 = 13$");
  v.ok("12. (4 − √3)(4 + √3) = 13", proche(evalTexReel("\\left(4 - \\sqrt{3}\\right)\\left(4 + \\sqrt{3}\\right)"), 13));
  v.ok("12. (2√5 + 3)(2√5 − 3) = 11, et (2√5)² = 20", proche(evalTexReel("\\left(2\\sqrt{5} + 3\\right)\\left(2\\sqrt{5} - 3\\right)"), 11) && proche(evalTexReel("\\left(2\\sqrt{5}\\right)^2"), 20));
  dit(12, "= 20 - 9 = 11$");
  dit(12, "4 \\times 5 = 20$");

  vaut(13, "(2x + 1)^2 - 25", "(2x - 4)(2x + 6)", "= (2x - 4)(2x + 6)$");
  vaut(13, "(2x + 1)^2 - 25", "4(x - 2)(x + 3)", "= 4(x - 2)(x + 3)$");
  v.ok("13. la vérification en x = 0 donne −24", egal(evalTex("(2x + 1)^2 - 25", Q(0)), Q(-24)));
  dit(13, "4 \\times (-2) \\times 3 = -24$");

  vaut(14, "(x - 3)^2 - (2x + 1)^2", "(-x - 4)(3x - 2)", "$D = (-x - 4)(3x - 2)$");
  chaine(14, "x - 3 - 2x - 1", "-x - 4", { enonce: false });
  chaine(14, "x - 3 + 2x + 1", "3x - 2", { enonce: false });

  // a) : une racine DOUBLE. (x − 3)² ne s'annule qu'en 3.
  v.ok("15. x² − 6x + 9 = (x − 3)² : une seule solution, 3", identiques("x^2 - 6x + 9", "(x - 3)^2") && egal(evalTex("x^2 - 6x + 9", Q(3)), Q(0)));
  dit(15, "une seule solution, $x = 3$");
  solutions(15, "4x^2 - 9", "0", [Q(3, 2), Q(-3, 2)], "$x = \\dfrac{3}{2}$ ou $x = -\\dfrac{3}{2}$");
  v.ok("15. le piège 9/4 n'est pas solution", !egal(evalTex("4x^2 - 9", Q(9, 4)), Q(0)));

  v.ok("16. 999² = 998 001, 1 003 × 997 = 999 991, 75² − 25² = 5 000", 999n ** 2n === 998001n && 1003n * 997n === 999991n && 75n ** 2n - 25n ** 2n === 5000n);
  dit(16, "= 998\\,001$");
  dit(16, "= 999\\,991$");
  dit(16, "= 5\\,000$");

  v.titre("★★★ Problèmes");
  vaut(17, "(x + 3)^2 - x^2", "6x + 9", "= 6x + 9$");
  v.ok("17. pour x = 10 : 69 = 100 + 60 + 9 − 100 ; et 6x + 9 = 51 pour x = 7", egal(evalTex("6x + 9", Q(10)), Q(69)) && 100 + 60 + 9 === 13 * 13 && egal(evalTex("6x + 9", Q(7)), Q(51)));
  dit(17, "6 \\times 10 + 9 = 69$");
  dit(17, "$x = 7$");

  v.ok("18. 5² − 3² = 16 et 13² − 11² = 48, deux multiples de 8", 25 - 9 === 16 && 169 - 121 === 48 && 16 % 8 === 0 && 48 % 8 === 0);
  dit(18, "25 - 9 = 16$");
  dit(18, "169 - 121 = 48$");
  // La lettre est n dans la feuille, x pour le lecteur : même expression.
  v.ok("18. (2n + 3)² − (2n + 1)² = 2(4n + 4) = 8(n + 1)", identiques("(2x + 3)^2 - (2x + 1)^2", "2(4x + 4)") && identiques("2(4x + 4)", "8(x + 1)"));
  dit(18, "= 2(4n + 4)$");
  dit(18, "= 8n + 8 = 8(n + 1)$");

  v.ok("19. (√2 − 1)(√2 + 1) = 1 et 1 ÷ (√2 − 1) = √2 + 1", proche(evalTexReel("\\left(\\sqrt{2} - 1\\right)\\left(\\sqrt{2} + 1\\right)"), 1) && proche(evalTexReel("\\dfrac{1}{\\sqrt{2} - 1}"), evalTexReel("\\sqrt{2} + 1")));
  dit(19, "= 2 - 1 = 1$");
  dit(19, `\\approx ${tex(Q(Math.round(1000 / 0.414), 1000))}$`, "1 ÷ 0,414 ≈ 2,415");
  dit(19, `\\sqrt{2} + 1 \\approx ${tex(Q(Math.round((Math.SQRT2 + 1) * 1000), 1000))}$`);

  v.ok("20. 45² = 2 025, 2 025² = 4 100 625, 2 024 × 2 026 = 4 100 624, 2 026² − 2 024² = 8 100 = 90²", 45n ** 2n === 2025n && 2025n ** 2n === 4100625n && 2024n * 2026n === 4100624n && 2026n ** 2n - 2024n ** 2n === 8100n && 90n ** 2n === 8100n);
  dit(20, "1\\,600 + 400 + 25 = 2\\,025$");
  dit(20, "= 4\\,100\\,625$");
  dit(20, "= 4\\,100\\,624$");
  dit(20, "= 2 \\times 4\\,050 = 8\\,100$");
}

lancer({
  nom: "LES IDENTITÉS REMARQUABLES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-identites.tsx",
  notionId: "identites_remarquables_2de",
  verifier,
  casses: [
    ["ex. 1 : (3x)² = 3x²", "= 9x^2 + 6x + 1$", "= 3x^2 + 6x + 1$"],
    ["ex. 2 : le carré négatif", "= x^2 - 18x + 81$", "= x^2 - 18x - 81$"],
    ["ex. 3 : le mauvais carré soustrait", "= 25 - x^2$", "= x^2 - 25$"],
    ["ex. 5 : a = 4x", "= (2x - 5)(2x + 5)$", "= (4x - 5)(4x + 5)$"],
    ["ex. 7 : le double produit oublié", "= 1\\\\,681$", "= 1\\\\,601$"],
    ["ex. 11 : un double produit faux", "= 11 + 6\\\\sqrt{2}$", "= 11 + 3\\\\sqrt{2}$"],
    ["ex. 12 : (2√5)² = 10", "= 20 - 9 = 11$", "= 10 - 9 = 1$"],
    ["ex. 14 : le moins sur le premier terme seulement", "$D = (-x - 4)(3x - 2)$", "$D = (-x - 2)(3x - 2)$"],
    ["ex. 15 : une solution perdue", "ou $x = -\\\\dfrac{3}{2}$", "ou $x = -\\\\dfrac{2}{3}$"],
    ["ex. 16 : 999² faux", "= 998\\\\,001$", "= 998\\\\,011$"],
    ["ex. 18 : la factorisation fausse", "= 8n + 8 = 8(n + 1)$", "= 8n + 8 = 8(n + 8)$"],
    ["ex. 20 : 2 024 × 2 026 faux", "= 4\\\\,100\\\\,624$", "= 4\\\\,100\\\\,626$"],
    ["un $ dans une consigne", "On écrit d'abord qui est a et qui est b.", "On écrit d'abord qui est $a$ et qui est $b$."],
    ["un $ dans un canvas", "values: [\"x²\", \"100\"]", "values: [\"$x^2$\", \"100\"]"],
  ],
});
