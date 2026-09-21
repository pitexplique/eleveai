// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les expressions
// littérales » de seconde (lib/fiches-exercices/maths-seconde-expressions.tsx).
//
// ⭐ L'AUTRE CHEMIN : les formes réduites sont lues telles qu'écrites et
// comparées à l'expression de départ en neuf valeurs de x ; les substitutions
// sont refaites par le lecteur, pas recopiées ; une formule « isolée »
// (t = d/v, C = (F − 32)/1,8) est vérifiée en faisant l'ALLER puis le RETOUR sur
// des nombres : si l'on retrouve le nombre de départ, la formule inverse est juste.
// La lettre n de la feuille devient x pour le lecteur : même expression.
//
//   node scripts/verifier-exercices-expressions.mjs

import { Q, D, egal, inf, fois, div, moins, tex, evalTex, identiques, lireFeuille, outilsAlgebre, lancer } from "./verifier-exercices-commun.mjs";

const val = (t, x) => evalTex(t, typeof x === "object" ? x : typeof x === "string" ? D(x) : Q(x));
const X = [-7, -3, -1, 0, 2, 5, 12].map((n) => Q(n)).concat([Q(3, 4)]);

function verifier(source, v) {
  const f = lireFeuille(source);
  const { dit, chaine, vaut } = outilsAlgebre(v, f);
  /** Une formule inverse : aller(x) puis retour doit redonner x. */
  const inverse = (k, quoi, aller, retour) =>
    v.ok(`${k}. ${quoi} : l'aller puis le retour redonnent le nombre de départ`, X.every((x) => egal(retour(aller(x)), x)));

  v.titre("★ Un seul geste");
  v.ok("1. pour x = 10 : 2x − 5 = 15 mais 2(x − 5) = 10", egal(val("2x - 5", 10), Q(15)) && egal(val("2(x - 5)", 10), Q(10)));
  for (const p of ["$2x - 5$", "$2(x - 5)$", "$x^2 + 1$", "$(x + 1)^2$", "2x - 5 = 15$", "2(x - 5) = 10$"]) dit(1, p);
  v.ok("1. x² + 1 et (x + 1)² sont deux expressions différentes", !identiques("x^2 + 1", "(x + 1)^2"));

  vaut(2, "2[(x + 4) + x]", "4x + 8", "= 2(2x + 4) = 4x + 8$");
  chaine(2, "x(x + 4)", "x^2 + 4x", { enonce: false });
  v.ok("2. le piège 2 × x + 4 + x n'est pas le périmètre", !identiques("2 \\times x + 4 + x", "4x + 8"));

  chaine(3, "5x - 3 + 2x + 8", "7x + 5");
  chaine(3, "4x^2 + 3x - x^2 - 5x", "3x^2 - 2x");
  chaine(3, "2x \\times 3x", "6x^2");
  vaut(3, "x + x + x", "3x", "$x + x + x = 3x$");
  vaut(3, "x \\times x \\times x", "x^3", "$x \\times x \\times x = x^3$");

  const A4 = "3x^2 - 2x + 1";
  v.ok("4. A(2) = 9, A(−1) = 6, A(0) = 1", egal(val(A4, 2), Q(9)) && egal(val(A4, -1), Q(6)) && egal(val(A4, 0), Q(1)));
  dit(4, "= 12 - 4 + 1 = 9$");
  dit(4, "= 3 + 2 + 1 = 6$");
  dit(4, "- 2 \\times 0 + 1 = 1$");

  v.ok("5. E(−2) = 15 et E(3) = 0", egal(val("(x - 3)(2x + 1)", -2), Q(15)) && egal(val("(x - 3)(2x + 1)", 3), Q(0)));
  dit(5, "(-5) \\times (-3) = 15$");
  dit(5, "0 \\times 7 = 0$");

  inverse(6, "d = v × t puis t = d ÷ v (v = 3)", (t) => fois(Q(3), t), (d) => div(d, Q(3)));
  inverse(6, "P = 2(L + ℓ) puis L = P ÷ 2 − ℓ (ℓ = 5)", (L) => fois(Q(2), Q(L.n + 5n * L.d, L.d)), (P) => moins(div(P, Q(2)), Q(5)));
  v.ok("6. le piège L = P − 2ℓ ne redonne pas L", !egal(moins(Q(20), Q(6)), Q(7)));
  dit(6, "$t = \\dfrac{d}{v}$");
  dit(6, "$L = \\dfrac{P}{2} - \\ell$");
  dit(6, "$r = \\dfrac{C}{2\\pi}$");
  v.ok("6. r = C ÷ 2π redonne le rayon", [1, 2.5, 10].every((r) => Math.abs((2 * Math.PI * r) / (2 * Math.PI) - r) < 1e-12));

  inverse(7, "y = 5x − 3 puis x = (y + 3) ÷ 5", (x) => val("5x - 3", x), (y) => val("\\dfrac{x + 3}{5}", y));
  inverse(7, "y = −2x + 8 puis x = (y − 8) ÷ (−2)", (x) => val("-2x + 8", x), (y) => val("\\dfrac{x - 8}{-2}", y));
  v.ok("7. (y − 8) ÷ (−2) et (8 − y) ÷ 2 sont la même expression", identiques("\\dfrac{x - 8}{-2}", "\\dfrac{8 - x}{2}"));
  dit(7, "$x = \\dfrac{y + 3}{5}$");
  dit(7, "= \\dfrac{8 - y}{2}$");
  dit(7, "\\dfrac{7 + 3}{5} = 2$");

  const vf8 = [identiques("3x + 2x", "5x"), identiques("3x \\times 2x", "6x"), identiques("(2x)^2", "2x^2"), identiques("x + 3 - (x - 3)", "6")];
  v.ok("8. vrai, faux, faux, vrai", JSON.stringify(vf8) === "[true,false,false,true]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(8, `${l}) ${vf8[i] ? "VRAI" : "FAUX"}.`));
  v.ok("8. x = 1 cache l'erreur du b), x = 2 la montre (24 contre 12)", egal(val("3x \\times 2x", 1), val("6x", 1)) && egal(val("3x \\times 2x", 2), Q(24)) && egal(val("6x", 2), Q(12)));
  dit(8, "= 24$");
  dit(8, "6 \\times 2 = 12$");
  v.ok("8. (2x)² = 4x²", identiques("(2x)^2", "4x^2") && identiques("3x \\times 2x", "6x^2"));

  v.titre("★★ Type devoir");
  v.ok("9. n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)", identiques("x + (x + 1) + (x + 2)", "3x + 3") && identiques("3x + 3", "3(x + 1)"));
  dit(9, "= 3n + 3$");
  dit(9, "$3n + 3 = 3(n + 1)$");
  v.ok("9. 3n + 3 = 150 pour n = 49, et 49 + 50 + 51 = 150", egal(val("3x + 3", 49), Q(150)) && 49 + 50 + 51 === 150);
  dit(9, "$n = 49$");

  const prog10 = "\\dfrac{4x + 8}{2} - 2x";
  v.ok("10. le programme vaut 4 pour tout x", identiques(prog10, "4"));
  v.ok("10. et 4 avec 3 comme avec −7", egal(val(prog10, 3), Q(4)) && egal(val(prog10, -7), Q(4)));
  dit(10, "10 - 6 = 4$");
  dit(10, "-10 - (-14) = 4$");
  chaine(10, "\\dfrac{4x + 8}{2}", "2x + 4", { enonce: false });
  dit(10, "$2x + 4 - 2x = 4$");

  v.ok("11. contre-exemples : 2 × (−1) < −1 et 0,5² < 0,5", inf(Q(-2), Q(-1)) && inf(fois(D("0,5"), D("0,5")), D("0,5")));
  v.ok("11. et x² ≥ 0 ne tombe en défaut sur aucune valeur essayée", X.every((x) => !inf(fois(x, x), Q(0))));
  ["a) FAUX.", "b) FAUX.", "c) VRAI."].forEach((p) => dit(11, p));
  dit(11, "$x^2 = 0{,}25$");

  vaut(12, "3(x - 2) + 2(4 - x) - x", "3x - 6 + 8 - 2x - x", "$A = 3x - 6 + 8 - 2x - x$");
  vaut(12, "3(x - 2) + 2(4 - x) - x", "2", "Donc $A = 2$");
  dit(12, "= 24 - 12 - 10 = 2$");

  const B13 = "-x^2 + 3x - 2";
  v.ok("13. B(−2) = −12, B(1) = 0, B(2) = 0", egal(val(B13, -2), Q(-12)) && egal(val(B13, 1), Q(0)) && egal(val(B13, 2), Q(0)));
  dit(13, "= -4 - 6 - 2 = -12$");
  dit(13, "$B = -1 + 3 - 2 = 0$");
  dit(13, "$B = -4 + 6 - 2 = 0$");
  vaut(13, B13, "-(x - 1)(x - 2)", "$B = -(x - 1)(x - 2)$");

  v.ok("14. 30 °C = 86 °F", egal(val("1{,}8x + 32", 30), Q(86)));
  dit(14, "= 54 + 32 = 86$");
  inverse(14, "F = 1,8C + 32 puis C = (F − 32) ÷ 1,8", (c) => val("1{,}8x + 32", c), (F) => val("\\dfrac{x - 32}{1{,}8}", F));
  dit(14, "$C = \\dfrac{F - 32}{1{,}8}$");
  v.ok("14. 212 °F = 100 °C", egal(val("\\dfrac{x - 32}{1{,}8}", 212), Q(100)));
  dit(14, "= 100$ °C");
  v.ok("14. −40 °C = −40 °F, et c'est la seule", egal(val("1{,}8x + 32", -40), Q(-40)) && !egal(val("1{,}8x + 32", 0), Q(0)));
  dit(14, "$C = -40$");

  const h15 = div(fois(Q(2), Q(30)), Q(8 + 4));
  v.ok("15. h = 2 × 30 ÷ 12 = 5, et l'aire redonne bien 30", egal(h15, Q(5)) && egal(div(fois(Q(8 + 4), h15), Q(2)), Q(30)));
  dit(15, "$h = \\dfrac{2A}{B + b}$");
  dit(15, "= \\dfrac{60}{12} = 5$ cm");
  dit(15, "$B = \\dfrac{2A}{h} - b$");
  v.ok("15. B = 2 × 30 ÷ 5 − 4 = 8", egal(moins(div(Q(60), Q(5)), Q(4)), Q(8)));
  dit(15, "= 12 - 4 = 8$");

  const A16 = "5 + 2x";
  const B16 = "3{,}5x";
  v.ok("16. A(2) = 9, B(2) = 7, A(4) = 13, B(4) = 14", egal(val(A16, 2), Q(9)) && egal(val(B16, 2), Q(7)) && egal(val(A16, 4), Q(13)) && egal(val(B16, 4), Q(14)));
  ["$A(2) = 5 + 4 = 9$", "$B(2) = 7$", "$A(4) = 5 + 8 = 13$", "$B(4) = 14$"].forEach((p) => dit(16, p));
  v.ok("16. les prix sont égaux pour 10/3 h = 3 h 20 min", egal(val(A16, Q(10, 3)), val(B16, Q(10, 3))) && egal(fois(Q(10, 3), Q(60)), Q(200)));
  dit(16, "= \\dfrac{10}{3}$ h");
  dit(16, "$3$ h $20$ min");

  v.titre("★★★ Problèmes");
  const tour = "\\dfrac{2(x + 7) - 4}{2} - x";
  v.ok("17. le tour donne 5 pour tout x, et avec 10 comme avec −3", identiques(tour, "5") && egal(val(tour, 10), Q(5)) && egal(val(tour, -3), Q(5)));
  dit(17, "15 - 10 = 5$");
  dit(17, "2 - (-3) = 5$");
  chaine(17, "2(x + 7) - 4", "2x + 10", { enonce: false });
  chaine(17, "\\dfrac{2x + 10}{2}", "x + 5", { enonce: false });

  chaine(18, "x(20 - x)", "20x - x^2", { enonce: false });
  v.ok("18. A(5) = 75, A(8) = 96, A(10) = 100", egal(val("x(20 - x)", 5), Q(75)) && egal(val("x(20 - x)", 8), Q(96)) && egal(val("x(20 - x)", 10), Q(100)));
  ["5 \\times 15 = 75$", "8 \\times 12 = 96$", "10 \\times 10 = 100$"].forEach((p) => dit(18, p));
  v.ok("18. A(x) = 100 − (x − 10)², et A ne dépasse jamais 100", identiques("100 - (x - 10)^2", "20x - x^2") && [0, 3, 9, 11, 17, 20].every((n) => !inf(Q(100), val("x(20 - x)", n))));
  dit(18, "= 20x - x^2$. C'est bien $A(x)$");
  dit(18, "pour $x = 10$");

  v.ok("19. 4 × 10 − 3 × 11 = 7", 4 * 10 - 3 * 11 === 7);
  dit(19, "= 40 - 33 = 7$");
  v.ok("19. (n + 1)(n + 7) − n(n + 8) = 7 pour tout n", identiques("(x + 1)(x + 7) - x(x + 8)", "7") && identiques("(x + 1)(x + 7)", "x^2 + 8x + 7") && identiques("x(x + 8)", "x^2 + 8x"));
  dit(19, "$(n + 1)(n + 7) = n^2 + 8n + 7$");
  dit(19, "$n(n + 8) = n^2 + 8n$");
  dit(19, "- 8n = 7$");

  const ht = div(Q(434), D("1,085"));
  v.ok("20. 434 ÷ 1,085 = 400 exactement", egal(ht, Q(400)));
  dit(20, "= 400$ €");
  v.ok("20. 400 × 1,2 = 480, soit 46 € de plus", egal(fois(Q(400), D("1,2")), Q(480)) && 480 - 434 === 46);
  dit(20, "= 480$ € TTC");
  dit(20, "$46$ €");
  dit(20, `\\approx ${tex(fois(Q(434), D("0,915")))}$ €`);
}

lancer({
  nom: "LES EXPRESSIONS LITTÉRALES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-expressions.tsx",
  notionId: "expressions_litterales_2de",
  verifier,
  casses: [
    ["ex. 1 : le double sans parenthèses", "« Le double de » porte sur toute la différence : $2(x - 5)$.", "« Le double de » porte sur toute la différence : $2x - 5$."],
    ["ex. 3 : x² et x additionnés", "= 3x^2 - 2x$.", "= x^2$."],
    ["ex. 4 : le carré négatif", "= 3 + 2 + 1 = 6$", "= -3 + 2 + 1 = 0$"],
    ["ex. 7 : retirer au lieu d'ajouter", "$x = \\\\dfrac{y + 3}{5}$", "$x = \\\\dfrac{y - 3}{5}$"],
    ["ex. 8 : l'égalité fausse déclarée vraie", "b) FAUX. En réalité", "b) VRAI. En réalité"],
    ["ex. 10 : un calcul du test faux", "-10 - (-14) = 4$", "-10 - (-14) = -24$"],
    ["ex. 13 : −x² = 4", "= -4 - 6 - 2 = -12$", "= 4 - 6 - 2 = -4$"],
    ["ex. 14 : l'ordre défait à l'envers", "$C = \\\\dfrac{F - 32}{1{,}8}$", "$C = \\\\dfrac{F}{1{,}8} - 32$"],
    ["ex. 16 : l'heure d'égalité fausse", "$3$ h $20$ min", "$3$ h $30$ min"],
    ["ex. 19 : la différence fausse", "- 8n = 7$", "- 8n = 8$"],
    ["ex. 20 : le piège de la TVA appliqué", "= 400$ €", "= 397{,}11$ €"],
    ["un $ dans un canvas", "values: [\"9 €\", \"13 €\"]", "values: [\"$9$ €\", \"13 €\"]"],
  ],
});
