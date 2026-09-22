// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le signe d'une
// expression » de seconde (lib/fiches-exercices/maths-seconde-signes.tsx).
//
// ⭐ L'AUTRE CHEMIN : aucun tableau de signes n'est recopié. Chacun est RELU
// dans le source, et chaque case recalculée sur la formule de sa ligne (voir
// `outilsSignes` dans le socle). Les ensembles de solutions sont retrouvés sur
// une grille, la condition testée nombre par nombre — puis comparés à
// l'intervalle écrit dans le corrigé.
//
//   node scripts/verifier-exercices-signes.mjs

import { Q, D, egal, inf, plus, moins, div, evalTex, lireFeuille, outilsAlgebre, outilsIntervalles, outilsCourbes, outilsEgalites, outilsSignes, racines, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, vaut } = outilsAlgebre(v, f);
  const { ensemble, union } = outilsIntervalles(v, f);
  const { courbes, controlerTout } = outilsCourbes(v, f, source);
  const { juste, tableau, signeEn } = outilsSignes(v, f);
  const egalites = outilsEgalites(v, f);
  const val = (t, x) => evalTex(t, nb(x));
  const tx = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);
  /** Les solutions de formule = 0 sont exactement `sols`. */
  const zeros = (k, formule, sols, phrase) => {
    const r = racines((x) => val(formule, x));
    const ok = r && r.length === sols.length && sols.every((s) => r.some((x) => egal(x, nb(s))));
    v.ok(`${k}. ${formule} = 0 : ${sols.join(" ou ") || "rien"}`, ok && (!phrase || c(k).includes(phrase)), `racines : ${r ? r.map(tx) : "tous"} ; phrase : ${phrase}`);
  };
  /** La condition « formule op 0 », là où elle existe, contre la réunion écrite. */
  const cond = (formule, op) => (x) => {
    const s = signeEn(formule, x);
    if (s === "||") return false;
    return { ">": s === "+", ">=": s === "+" || s === "0", "<": s === "-", "<=": s === "-" || s === "0" }[op];
  };

  controlerTout();

  v.titre("★ Un seul geste");
  zeros(1, "2x - 8", [4], "donc $x = 4$");
  juste(1);
  zeros(2, "-3x - 6", [-2], "donc $x = -2$");
  juste(2);
  ensemble(2, "−3x − 6 > 0 ⇔ x < −2", cond("-3x - 6", ">"), { a: -2, aInclus: false }, { phrase: "$]{-\\infty}\\,;\\,-2[$" });

  juste(3, { 2: "(x - 5)(x + 1)" });
  dit(3, "$-\\infty$, $-1$, $5$, $+\\infty$");
  dit(3, "TROIS colonnes");
  juste(4, { 2: "(3 - x)(2x + 4)" });
  juste(5, { 2: "\\dfrac{2x - 1}{x + 4}" });
  dit(5, "La valeur interdite est $-4$");

  zeros(6, "(x - 4)(3x + 9)", [4, -3], "$x = 4$ ou $x = -3$");
  zeros(6, "x(5 - x)", [0, 5], "$x = 0$ ou $x = 5$");
  zeros(6, "(2x + 1)^2", [Q(-1, 2)], "donc $x = -\\dfrac{1}{2}$");

  // Exercice 7 : le tableau de l'énoncé EST la fonction. On le relit et on en
  // déduit une fonction de signe, puis on vérifie les réunions écrites.
  const t7 = tableau(7, "figure");
  const [, s7] = t7.lignes[0];
  const signe7 = (x) => {
    const j = t7.bornes.findIndex((b, i) => i > 0 && (b === Infinity || inf(x, b)));
    const bornesFinies = t7.bornes.filter((b) => typeof b === "object");
    if (bornesFinies.some((b) => egal(b, x))) return "0";
    return s7[j - 1];
  };
  v.ok("7. les zéros lus : −3, 1 et 4", JSON.stringify(t7.bornes.filter((b) => typeof b === "object").map(tx)) === '["-3","1","4"]' && c(7).includes("$x = -3$, $x = 1$ et $x = 4$"));
  union(7, "f(x) > 0 ⇔ ]−∞ ; −3[ ∪ ]1 ; 4[", (x) => signe7(x) === "+", [{ a: -3, aInclus: false }, { de: 1, a: 4, deInclus: false, aInclus: false }], { phrase: "$]{-\\infty}\\,;\\,-3[ \\cup ]1\\,;\\,4[$" });
  union(7, "f(x) ≤ 0 ⇔ [−3 ; 1] ∪ [4 ; +∞[", (x) => signe7(x) === "-" || signe7(x) === "0", [{ de: -3, a: 1, deInclus: true, aInclus: true }, { de: 4, deInclus: true }], { phrase: "$[-3\\,;\\,1] \\cup [4\\,;\\,+\\infty[$" });

  const [U8] = courbes(8);
  v.ok("8. la courbe de l'énoncé est celle de x² + x − 2", [-3, -1, 0, 2].every((n) => egal(U8(Q(n)), val("x^2 + x - 2", n))));
  juste(8, { 0: "x^2 + x - 2" });
  union(8, "u(x) < 0 ⇔ ]−2 ; 1[", (x) => !inf(x, Q(-3)) && !inf(Q(2), x) && inf(U8(x), Q(0)), [{ de: -2, a: 1, deInclus: false, aInclus: false }], { phrase: "$]{-2}\\,;\\,1[$", de: -3, a: 2 });

  v.titre("★★ Type devoir");
  juste(9);
  ensemble(9, "(4 − 2x)(x + 3) > 0 ⇔ ]−3 ; 2[", cond("(4 - 2x)(x + 3)", ">"), { de: -3, a: 2, deInclus: false, aInclus: false }, { phrase: "$]{-3}\\,;\\,2[$" });
  vaut(9, "(4 - 2x)(x + 3)", "-2x^2 - 2x + 12", "$-2x^2 - 2x + 12 > 0$");

  juste(10);
  ensemble(10, "(x − 5)/(2x + 2) ≤ 0 ⇔ ]−1 ; 5]", cond("\\dfrac{x - 5}{2x + 2}", "<="), { de: -1, a: 5, deInclus: false, aInclus: true }, { phrase: "$]{-1}\\,;\\,5]$" });

  juste(11, { 2: "x^2 - 9" });
  vaut(11, "x^2 - 9", "(x - 3)(x + 3)", "$f(x) = (x - 3)(x + 3)$");
  ensemble(11, "x² < 9 ⇔ ]−3 ; 3[", cond("x^2 - 9", "<"), { de: -3, a: 3, deInclus: false, aInclus: false }, { phrase: "$]{-3}\\,;\\,3[$" });
  v.ok("11. le contre-exemple : −5 < 3 mais 25 > 9", egal(val("x^2", -5), Q(25)));

  juste(12, { 2: "3x^2 - 12x" });
  vaut(12, "3x^2 - 12x", "3x(x - 4)", "$g(x) = 3x(x - 4)$");
  zeros(12, "3x^2 - 12x", [0, 4], "$x = 0$ ou $x = 4$");
  ensemble(12, "g(x) < 0 ⇔ ]0 ; 4[", cond("3x^2 - 12x", "<"), { de: 0, a: 4, deInclus: false, aInclus: false }, { phrase: "$]0\\,;\\,4[$" });

  juste(13, { 3: "(x + 2)(x - 1)(3 - x)" });
  union(13, "h(x) ≥ 0 ⇔ ]−∞ ; −2] ∪ [1 ; 3]", cond("(x + 2)(x - 1)(3 - x)", ">="), [{ a: -2, aInclus: true }, { de: 1, a: 3, deInclus: true, aInclus: true }], { phrase: "$]{-\\infty}\\,;\\,-2] \\cup [1\\,;\\,3]$" });

  juste(14);
  v.ok("14. 3/(x − 2) − 1 = (5 − x)/(x − 2), hors de x = 2", [-3, 0, 1, 3, 4, 7, 11].every((x) => egal(val("\\dfrac{3}{x - 2} - 1", x), val("\\dfrac{5 - x}{x - 2}", x))));
  ensemble(14, "3/(x − 2) ≥ 1 ⇔ ]2 ; 5]", (x) => signeEn("x - 2", x) !== "0" && !inf(val("\\dfrac{3}{x - 2}", x), Q(1)), { de: 2, a: 5, deInclus: false, aInclus: true }, { phrase: "$]2\\,;\\,5]$" });

  juste(15, { 2: "x^2 - (2x + 3)" });
  vaut(15, "x^2 - (2x + 3)", "(x - 3)(x + 1)", "$(x - 3)(x + 1) = x^2 + x - 3x - 3 = x^2 - 2x - 3$");
  const [F15, G15] = courbes(15, "schema");
  v.ok("15. les courbes du corrigé sont x² et 2x + 3", [-2, 0, 1, 3].every((n) => egal(F15(Q(n)), val("x^2", n)) && egal(G15(Q(n)), val("2x + 3", n))));
  union(15, "f(x) > g(x) ⇔ ]−∞ ; −1[ ∪ ]3 ; +∞[", cond("x^2 - 2x - 3", ">"), [{ a: -1, aInclus: false }, { de: 3, deInclus: false }], {});
  dit(15, "sur $]{-\\infty}\\,;\\,-1[$ et sur $]3\\,;\\,+\\infty[$");

  juste(16, { 3: "-2(x - 10)(x - 60)" });
  ensemble(16, "B(x) > 0 ⇔ ]10 ; 60[", cond("-2(x - 10)(x - 60)", ">"), { de: 10, a: 60, deInclus: false, aInclus: false }, { phrase: "$]10\\,;\\,60[$", de: 0, a: 80 });
  egalites(16, "-2 \\times 60 \\times 10 = -1\\,200");
  v.ok("16. B(70) = −1 200", egal(val("-2(x - 10)(x - 60)", 70), Q(-1200)));
  dit(16, "de $11$ à $59$ paniers");

  v.titre("★★★ Problèmes");
  const h17 = "0{,}4x - 0{,}01x^2";
  vaut(17, `${h17} - 3`, "-0{,}01(x - 10)(x - 30)", "$-0{,}01(x - 10)(x - 30) = -0{,}01(x^2 - 40x + 300) = -0{,}01x^2 + 0{,}4x - 3$");
  juste(17, { 3: `${h17} - 3` });
  ensemble(17, "h(x) ≥ 3 ⇔ [10 ; 30]", (x) => !inf(val(h17, x), Q(3)), { de: 10, a: 30, deInclus: true, aInclus: true }, { phrase: "$[10\\,;\\,30]$", de: 0, a: 40 });
  zeros(17, h17, [0, 40], "le ballon retombe à $40$ m");
  vaut(17, h17, "0{,}01x(40 - x)", "$h(x) = 0{,}01x(40 - x)$");

  const C18 = "\\dfrac{20x}{x^2 + 4}";
  vaut(18, `${C18} - 4`, "\\dfrac{-4(x - 1)(x - 4)}{x^2 + 4}", "= \\dfrac{-4t^2 + 20t - 16}{t^2 + 4}$");
  vaut(18, "-4(x - 1)(x - 4)", "-4x^2 + 20x - 16", "$-4(t - 1)(t - 4) = -4(t^2 - 5t + 4) = -4t^2 + 20t - 16$");
  juste(18, { 4: `${C18} - 4` });
  ensemble(18, "C(t) ≥ 4 ⇔ [1 ; 4]", (x) => !inf(val(C18, x), Q(4)), { de: 1, a: 4, deInclus: true, aInclus: true }, { phrase: "$[1\\,;\\,4]$", de: 0, a: 12 });
  const [K18] = courbes(18, "schema");
  v.ok("18. la courbe du corrigé suit C(t) à 0,01 près", [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8].every((t) => { const y = K18(nb(t)); return Math.abs(Number(y.n) / Number(y.d) - (20 * t) / (t * t + 4)) < 0.01; }));
  dit(18, "soit pendant $3$ heures");

  // (pas `vaut` : il essaie x = 0, où M n'existe pas)
  v.ok("19. M(n) − 11 = (300 − 6n)/n pour n > 0", [1, 7, 50, 51, 120].every((n) => egal(moins(val("\\dfrac{300 + 5x}{x}", n), Q(11)), val("\\dfrac{300 - 6x}{x}", n))) && c(19).includes("$M(n) - 11 = \\dfrac{300 + 5n - 11n}{n} = \\dfrac{300 - 6n}{n}$"));
  juste(19, { 2: "\\dfrac{300 - 6x}{x}" });
  ensemble(19, "M(n) < 11 pour n > 0 ⇔ n > 50", (x) => inf(Q(0), x) && inf(val("\\dfrac{300 + 5x}{x}", x), Q(11)), { de: 50, deInclus: false }, { phrase: "pour $n > 50$", de: 1, a: 200 });
  egalites(19, "300 + 250 = 550");
  egalites(19, "50 \\times 11 = 550");
  dit(19, "À partir de $51$ séances");

  const [V20] = courbes(20);
  // Le tableau du corrigé face à la courbe de l'énoncé : on relit le signe de la
  // courbe au milieu de chaque colonne, et ses zéros aux bornes.
  const ts20 = tableau(20);
  const fautes20 = [];
  ts20.lignes[0][1].forEach((s, j) => {
    const y = V20(div(plus(ts20.bornes[j], ts20.bornes[j + 1]), Q(2)));
    const lu = inf(y, Q(0)) ? "-" : inf(Q(0), y) ? "+" : "0";
    if (lu !== s) fautes20.push(`colonne ${j + 1}`);
  });
  ts20.bornes.slice(1, -1).forEach((b) => { if (!egal(V20(b), Q(0))) fautes20.push(`v(${tx(b)}) ≠ 0`); });
  v.ok("20. le tableau du corrigé dit le signe de la courbe de l'énoncé", fautes20.length === 0, fautes20.join(", "));
  dit(20, "sur $[0\\,;\\,2[$, puis sur $]5\\,;\\,8[$");
  dit(20, "en $t = 2$ et en $t = 8$");
  v.ok("20. le piège : v est maximale en t = 1, pas au sommet", [0, 2, 3, 5, 6, 7, 8, 10].every((t) => inf(V20(Q(t)), V20(Q(1)))) && c(20).includes("répondre $t = 1$"));
}

lancer({
  nom: "LE SIGNE D'UNE EXPRESSION · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-signes.tsx",
  notionId: "signes_expression_2de",
  verifier,
  casses: [
    ["ex. 2 : le sens de ax + b gardé malgré a < 0", "[[\"$-3x - 6$\", [\"+\", \"-\"], [\"0\"]]]", "[[\"$-3x - 6$\", [\"-\", \"+\"], [\"0\"]]]"],
    ["ex. 3 : la règle des signes appliquée à l'envers", "[\"$h(x)$\", [\"+\", \"-\", \"+\"], [\"0\", \"0\"]]", "[\"$h(x)$\", [\"-\", \"+\", \"-\"], [\"0\", \"0\"]]"],
    ["ex. 4 : le zéro de 3 − x posé sous la mauvaise borne", "[\"$3 - x$\", [\"+\", \"+\", \"-\"], [\"\", \"0\"]]", "[\"$3 - x$\", [\"+\", \"+\", \"-\"], [\"0\", \"\"]]"],
    ["ex. 5 : un zéro sous la valeur interdite", "[\"$g(x)$\", [\"+\", \"-\", \"+\"], [\"||\", \"0\"]]", "[\"$g(x)$\", [\"+\", \"-\", \"+\"], [\"0\", \"0\"]]"],
    ["ex. 6 : x = 0 oublié", "$x = 0$ ou $x = 5$", "$x = 5$"],
    ["ex. 7 : une colonne + oubliée", "$]{-\\\\infty}\\\\,;\\\\,-3[ \\\\cup ]1\\\\,;\\\\,4[$", "$]1\\\\,;\\\\,4[$"],
    ["ex. 8 : la courbe de l'énoncé modifiée", "const COURBE_8: Courbe[] = [{ q: [1, 1, -2] }];", "const COURBE_8: Courbe[] = [{ q: [1, 1, -6] }];"],
    ["ex. 10 : le crochet fermé sur la valeur interdite", "$]{-1}\\\\,;\\\\,5]$", "$[-1\\\\,;\\\\,5]$"],
    ["ex. 11 : « x < 3 » au lieu de ]−3 ; 3[", "c'est la colonne $-$, soit $]{-3}\\\\,;\\\\,3[$", "c'est la colonne $-$, soit $]{-\\\\infty}\\\\,;\\\\,3[$"],
    ["ex. 13 : la troisième ligne oubliée dans le produit", "[\"$h(x)$\", [\"+\", \"-\", \"+\", \"-\"]", "[\"$h(x)$\", [\"-\", \"+\", \"-\", \"+\"]"],
    ["ex. 14 : les deux membres multipliés par x − 2", "On garde la colonne $+$ et le zéro : $]2\\\\,;\\\\,5]$", "On garde la colonne $+$ et le zéro : $]{-\\\\infty}\\\\,;\\\\,5]$"],
    ["ex. 16 : le −2 oublié", "[\"$B(x)$\", [\"-\", \"+\", \"-\"]", "[\"$B(x)$\", [\"+\", \"-\", \"+\"]"],
    ["ex. 17 : l'intervalle de tir faux", "pour $x$ dans $[10\\\\,;\\\\,30]$", "pour $x$ dans $[10\\\\,;\\\\,40]$"],
    ["ex. 18 : une durée fausse", "soit pendant $3$ heures", "soit pendant $4$ heures"],
    ["ex. 19 : 50 séances suffisent", "pour $n > 50$", "pour $n \\\\geqslant 50$"],
    ["ex. 20 : le variomètre relevé autrement", "[3, -2], [5, 0], [6, 2]", "[3, -2], [5, -1], [6, 2]"],
  ],
});
