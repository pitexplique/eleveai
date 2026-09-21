// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Équations et
// inéquations » de seconde (lib/fiches-exercices/maths-seconde-equations.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé résout ; ici on ne résout RIEN.
//   · Une équation du premier degré : on vérifie que la solution annule
//     gauche − droite, et que cette différence est affine de pente non nulle —
//     la solution est donc la seule.
//   · Une inéquation : l'ensemble des solutions est RETROUVÉ en testant la
//     condition sur une grille de nombres (pas d'un quart, plus chaque borne et
//     ses deux voisins immédiats), puis comparé à l'intervalle du corrigé ET à
//     celui du dessin. Une borne comprise à tort, un sens oublié : la grille le voit.
//
//   node scripts/verifier-exercices-equations.mjs

import { Q, D, egal, inf, fois, div, moins, puissance, evalTex, dans, lireFeuille, outilsAlgebre, outilsIntervalles, lancer } from "./verifier-exercices-commun.mjs";

const val = (t, x) => evalTex(t, x);
const nb = (x) => (typeof x === "object" ? x : typeof x === "string" ? D(x) : Q(x));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, chaine, vaut } = outilsAlgebre(v, f);
  const { ensemble, dessin } = outilsIntervalles(v, f);

  /** gauche = droite a pour seule solution s. */
  const lineaire = (k, g, d, s, phrase) => {
    const h = (x) => moins(val(g, x), val(d, x));
    const [h0, h1, h2] = [0, 1, 2].map((n) => h(Q(n)));
    const affine = egal(moins(h2, h1), moins(h1, h0));
    const pente = !egal(h1, h0);
    const annule = egal(h(nb(s)), Q(0));
    v.ok(`${k}. ${g} = ${d} : seule solution ${s}`, affine && pente && annule && c(k).includes(phrase), `affine : ${affine} ; pente ≠ 0 : ${pente} ; annule : ${annule} ; phrase : ${c(k).includes(phrase)}`);
  };
  const cmp = (g, op, d) => (x) => {
    const [l, r] = [val(g, x), val(d, x)];
    return { "<": inf(l, r), "<=": !inf(r, l), ">": inf(r, l), ">=": !inf(l, r) }[op];
  };

  v.titre("★ Un seul geste");
  lineaire(1, "3x - 7", "11", 6, "$x = 6$");
  lineaire(1, "5 - 2x", "13", -4, "$x = -4$");
  lineaire(1, "6x + 1", "2x - 11", -3, "$x = -3$");
  dit(1, "= -17$");

  lineaire(2, "2(x - 3)", "5x + 9", -5, "$x = -5$");
  lineaire(2, "\\dfrac{x}{3} + 2", "7", 15, "$x = 15$");
  lineaire(2, "\\dfrac{x + 4}{2}", "\\dfrac{x - 1}{3}", -14, "$x = -14$");
  dit(2, "$3(x + 4) = 2(x - 1)$");

  v.ok("3. −2 annule 3x + 5 − (x + 1) ; 1 n'annule pas 2x − 7 − (5x − 4)", egal(val("3x + 5", Q(-2)), val("x + 1", Q(-2))) && !egal(val("2x - 7", Q(1)), val("5x - 4", Q(1))));
  dit(3, "$3 \\times (-2) + 5 = -1$");
  dit(3, "$5 \\times 1 - 4 = 1$");
  lineaire(3, "2x - 7", "5x - 4", -1, "Donc $x = -1$");

  const iv4a = { a: 5, aInclus: false };
  const iv4b = { de: -3, deInclus: true };
  ensemble(4, "3x − 4 < 11 ⇔ x ∈ ]−∞ ; 5[", cmp("3x - 4", "<", "11"), iv4a, { phrase: "$]{-\\infty}\\,;\\,5[$" });
  ensemble(4, "2x + 7 ≥ 1 ⇔ x ∈ [−3 ; +∞[", cmp("2x + 7", ">=", "1"), iv4b, { phrase: "$[-3\\,;\\,+\\infty[$" });

  const iv5b = { de: -5, deInclus: true };
  ensemble(5, "−5x > 20 ⇔ x ∈ ]−∞ ; −4[", cmp("-5x", ">", "20"), { a: -4, aInclus: false }, { phrase: "$]{-\\infty}\\,;\\,-4[$" });
  ensemble(5, "7 − 2x ≤ 17 ⇔ x ∈ [−5 ; +∞[", cmp("7 - 2x", "<=", "17"), iv5b, { phrase: "$[-5\\,;\\,+\\infty[$" });
  dessin(5, iv5b);
  v.ok("5. la vérification : −5 × (−10) = 50 > 20", egal(val("-5x", Q(-10)), Q(50)));

  const iv6 = { de: -3, a: 4, deInclus: false, aInclus: true };
  ensemble(6, "x > −1 ⇔ ]−1 ; +∞[", (x) => inf(Q(-1), x), { de: -1, deInclus: false }, { phrase: "$]{-1}\\,;\\,+\\infty[$" });
  ensemble(6, "x ≤ 2,5 ⇔ ]−∞ ; 2,5]", (x) => !inf(D("2,5"), x), { a: "2,5", aInclus: true }, { phrase: "$]{-\\infty}\\,;\\,2{,}5]$" });
  ensemble(6, "−3 < x ≤ 4 ⇔ ]−3 ; 4]", (x) => inf(Q(-3), x) && !inf(Q(4), x), iv6, { phrase: "$]{-3}\\,;\\,4]$" });
  v.ok("6. 4 ∈ ]−3 ; 4] mais 4 ∉ ]−3 ; 4[", dans(Q(4), iv6) && !dans(Q(4), { ...iv6, aInclus: false }));
  dessin(6, iv6);

  lineaire(7, "4x - 6", "x + 9", 5, "Le nombre pensé est $5$");
  dit(7, "$4x - 6 = x + 9$");

  const d8 = moins(Q(7, 9), D("0,78"));
  v.ok("8. 7/9 − 0,78 = −2/900 < 0", egal(d8, Q(-2, 900)) && inf(d8, Q(0)));
  dit(8, "= -\\dfrac{2}{900}$");
  v.ok("8. 2¹⁰ ÷ 10³ = 1,024 > 1", egal(div(puissance(Q(2), 10), puissance(Q(10), 3)), D("1,024")));
  dit(8, "= 1{,}024$");

  v.titre("★★ Type devoir");
  const iv9 = { a: "4,25", aInclus: false };
  ensemble(9, "3(2x − 1) − 4 < 2(x + 5) ⇔ x < 17/4", cmp("3(2x - 1) - 4", "<", "2(x + 5)"), iv9, { phrase: "$]{-\\infty}\\,;\\,\\dfrac{17}{4}[$" });
  v.ok("9. 17/4 = 4,25, et 4 est le plus grand entier solution", egal(Q(17, 4), D("4,25")) && cmp("3(2x - 1) - 4", "<", "2(x + 5)")(Q(4)) && !cmp("3(2x - 1) - 4", "<", "2(x + 5)")(Q(5)));
  dit(9, "Le plus grand entier solution est $4$");
  dessin(9, iv9);

  ensemble(10, "x/2 − 1 > x/3 + 1 ⇔ x > 12", cmp("\\dfrac{x}{2} - 1", ">", "\\dfrac{x}{3} + 1"), { de: 12, deInclus: false }, { phrase: "$]12\\,;\\,+\\infty[$" });
  vaut(10, "6(\\dfrac{x}{2} - 1)", "3x - 6", "soit $3x - 6 > 2x + 6$");
  v.ok("10. le piège : x = 3 ne vérifie pas l'inéquation (0,5 > 2 est faux)", !cmp("\\dfrac{x}{2} - 1", ">", "\\dfrac{x}{3} + 1")(Q(3)) && egal(val("\\dfrac{x}{2} - 1", Q(3)), D("0,5")) && egal(val("\\dfrac{x}{3} + 1", Q(3)), Q(2)));

  const iv11 = { de: -2, a: 3, deInclus: true, aInclus: false };
  ensemble(11, "−1 ≤ 2x + 3 < 9 ⇔ x ∈ [−2 ; 3[", (x) => !inf(val("2x + 3", x), Q(-1)) && inf(val("2x + 3", x), Q(9)), iv11, { phrase: "$[-2\\,;\\,3[$" });
  const entiers11 = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((n) => dans(Q(n), iv11));
  v.ok("11. les entiers solutions sont −2, −1, 0, 1, 2", JSON.stringify(entiers11) === "[-2,-1,0,1,2]");
  dit(11, "$-2$, $-1$, $0$, $1$ et $2$");
  dessin(11, iv11);

  ensemble(12, "1 − 3(x + 2) ≤ x + 3 ⇔ x ≥ −2", cmp("1 - 3(x + 2)", "<=", "x + 3"), { de: -2, deInclus: true }, { phrase: "$[-2\\,;\\,+\\infty[$" });
  vaut(12, "1 - 3(x + 2)", "-3x - 5", "soit $-3x - 5 \\leqslant x + 3$");

  const h13a = (x) => moins(val("3(x + 2)", x), val("3x + 5", x));
  const h13b = (x) => moins(val("2(x - 1) + 4", x), val("2x + 2", x));
  v.ok("13. a) la différence vaut 1 partout : aucune solution", [-5, 0, 3, 7].every((n) => egal(h13a(Q(n)), Q(1))));
  v.ok("13. b) la différence vaut 0 partout : tous les nombres", [-5, 0, 3, 7].every((n) => egal(h13b(Q(n)), Q(0))));
  dit(13, "l'équation n'a AUCUNE solution");
  dit(13, "TOUS les nombres sont solutions");

  vaut(14, "(x + 3)^2 - x(x + 6)", "9", "- 6x = 9$");
  v.ok("14. 9⁹ = 3¹⁸ et 3²⁰ ÷ 3¹⁸ = 9", egal(puissance(Q(9), 9), puissance(Q(3), 18)) && egal(div(puissance(Q(3), 20), puissance(Q(9), 9)), Q(9)));
  dit(14, "= 3^2 = 9$");

  lineaire(15, "3x + 2(x + 2)", "19", 3, "$x = 3$");
  dit(15, "Un kilo de letchis coûte $3$ € et un ananas $5$ €");
  dit(15, "= 9 + 10 = 19$");

  const iv16 = { de: 10, deInclus: false };
  ensemble(16, "30 + 6x < 9x ⇔ x > 10", cmp("30 + 6x", "<", "9x"), iv16, { phrase: "$x > 10$" });
  v.ok("16. à 10 places, 90 € des deux côtés ; à 11, B est moins cher", egal(val("9x", Q(10)), Q(90)) && egal(val("30 + 6x", Q(10)), Q(90)) && cmp("30 + 6x", "<", "9x")(Q(11)));
  dit(16, "à partir de $11$ places");
  dessin(16, iv16);

  v.titre("★★★ Problèmes");
  const T = "20 - 0{,}006(x - 1200)";
  v.ok("17. T(3 070) = 8,78 °C", egal(val(T, Q(3070)), D("8,78")));
  dit(17, "= 8{,}78$ °C");
  lineaire(17, T, "11", 2700, "$h = 2\\,700$ m");
  const iv17 = { de: 2700, a: 3070, deInclus: false, aInclus: true };
  ensemble(17, "sur le chemin, T < 11 ⇔ h ∈ ]2 700 ; 3 070]", (x) => cmp(T, "<", "11")(x) && !inf(Q(3070), x), iv17, { phrase: "$]2\\,700\\,;\\,3\\,070]$", de: 1200, a: 3070, pas: Q(10) });
  dessin(17, iv17);

  chaine(18, "(x + 5)(x - 1)", "x^2 + 4x - 5", { enonce: false });
  vaut(18, "(x + 5)(x - 1) - x^2", "4x - 5", "= 4x - 5$");
  ensemble(18, "4x − 5 > 0 ⇔ x > 5/4", cmp("4x - 5", ">", "0"), { de: "1,25", deInclus: false }, { phrase: "$x > 1{,}25$" });
  v.ok("18. à x = 1,25 les aires sont égales ; à x = 2 : 7 contre 4", egal(val("(x + 5)(x - 1)", D("1,25")), val("x^2", D("1,25"))) && egal(val("(x + 5)(x - 1)", Q(2)), Q(7)));

  ensemble(19, "(31 + 2x) ÷ 5 ≥ 12 ⇔ x ≥ 14,5", cmp("\\dfrac{31 + 2x}{5}", ">=", "12"), { de: "14,5", deInclus: true }, { phrase: "$x \\geqslant 14{,}5$" });
  v.ok("19. 8 + 12 + 11 = 31 et la somme des coefficients vaut 5", 8 + 12 + 11 === 31 && 1 + 1 + 1 + 2 === 5);
  ensemble(19, "(31 + 2x) ÷ 5 ≥ 15 ⇔ x ≥ 22, hors de [0 ; 20]", cmp("\\dfrac{31 + 2x}{5}", ">=", "15"), { de: 22, deInclus: true }, { phrase: "$x \\geqslant 22$" });

  lineaire(20, "12x", "2 + 9x", Q(2, 3), "$t = \\dfrac{2}{3}$ h");
  v.ok("20. 2/3 h = 40 min, à 8 km", egal(fois(Q(2, 3), Q(60)), Q(40)) && egal(fois(Q(12), Q(2, 3)), Q(8)));
  dit(20, "$40$ min");
  dit(20, "= 8$ km");
  v.ok("20. Léa : 50 min ; Tom : 8/9 h = 53 min 20 s", egal(fois(div(Q(10), Q(12)), Q(60)), Q(50)) && egal(fois(Q(8, 9), Q(3600)), Q(53 * 60 + 20)));
  dit(20, "$53$ min $20$ s");
  ensemble(20, "(10 − d) ÷ 9 < 10 ÷ 12 ⇔ d > 2,5", cmp("\\dfrac{10 - x}{9}", "<", "\\dfrac{10}{12}"), { de: "2,5", deInclus: false }, { phrase: "$d > 2{,}5$", de: 0, a: 10 });
}

lancer({
  nom: "ÉQUATIONS ET INÉQUATIONS · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-equations.tsx",
  notionId: "equations_inequations_1er_degre",
  verifier,
  casses: [
    ["ex. 1 : le signe oublié en divisant par −2", "On divise par $-2$ : $x = -4$.", "On divise par $-2$ : $x = 4$."],
    ["ex. 2 : un calcul faux au c)", "puis $x = -14$.", "puis $x = -10$."],
    ["ex. 4 : une borne comprise à tort", "$]{-\\\\infty}\\\\,;\\\\,5[$", "$]{-\\\\infty}\\\\,;\\\\,5]$"],
    ["ex. 5 : le sens gardé en divisant par −5", "$]{-\\\\infty}\\\\,;\\\\,-4[$", "$]{-4}\\\\,;\\\\,+\\\\infty[$"],
    ["ex. 5 : le dessin tourné du mauvais côté", "{ de: -5, deInclus: true, label", "{ a: -5, aInclus: true, label"],
    ["ex. 6 : le crochet du dessin inversé", "{ de: -3, a: 4, deInclus: false, aInclus: true", "{ de: -3, a: 4, deInclus: true, aInclus: true"],
    ["ex. 9 : 17/3 au lieu de 17/4", "$]{-\\\\infty}\\\\,;\\\\,\\\\dfrac{17}{4}[$", "$]{-\\\\infty}\\\\,;\\\\,\\\\dfrac{17}{3}[$"],
    ["ex. 11 : le 3 compté parmi les entiers", "$-2$, $-1$, $0$, $1$ et $2$", "$-2$, $-1$, $0$, $1$, $2$ et $3$"],
    ["ex. 12 : le sens gardé en divisant par −4", "$[-2\\\\,;\\\\,+\\\\infty[$", "$]{-\\\\infty}\\\\,;\\\\,-2]$"],
    ["ex. 16 : dix places au lieu de onze", "à partir de $11$ places", "à partir de $10$ places"],
    ["ex. 17 : la température au sommet", "= 8{,}78$ °C", "= 9{,}78$ °C"],
    ["ex. 17 : une altitude fausse", "$h = 2\\\\,700$ m", "$h = 2\\\\,500$ m"],
    ["ex. 19 : diviser par 4 au lieu de 5", "$x \\\\geqslant 14{,}5$", "$x \\\\geqslant 12{,}5$"],
    ["ex. 20 : l'avance nécessaire", "$d > 2{,}5$", "$d > 2$"],
  ],
});
