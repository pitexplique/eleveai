// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les fonctions de
// référence » de seconde (lib/fiches-exercices/maths-seconde-fonctions-reference.tsx).
//
// ⭐ L'AUTRE CHEMIN : les courbes de la racine et de l'inverse sont RELUES point
// par point (y² = x, x × y = 1, en exact) ; les solutions d'inéquations sont
// retrouvées sur une grille ; les encadrements, en balayant l'intervalle ; les
// tableaux de variations, confrontés à la fonction.
//
//   node scripts/verifier-exercices-fonctions-reference.mjs

import { Q, D, egal, inf, plus, moins, fois, div, evalTex, lireFeuille, outilsAlgebre, outilsIntervalles, outilsCourbes, outilsEgalites, racines, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));
const num = (q) => Number(q.n) / Number(q.d);
const abs = (q) => (inf(q, Q(0)) ? Q(-q.n, q.d) : q);

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit } = outilsAlgebre(v, f);
  const { ensemble, union } = outilsIntervalles(v, f);
  const { courbes, tableauDe, controlerTout, consts, tableauVariationsDe, accord } = outilsCourbes(v, f, source);
  const egalites = outilsEgalites(v, f);
  const val = (t, x) => evalTex(t, nb(x));
  const tx = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);
  const memeCourbe = (k, F, t, quoi, xs = [-2, -1, 0, 1, 2, 3]) => v.ok(`${k}. ${quoi} est celle de ${t}`, xs.map(nb).every((x) => egal(F(x), val(t, x))));
  const zeros = (k, formule, sols, phrase) => {
    const r = racines((x) => val(formule, x));
    const ok = r && r.length === sols.length && sols.every((s) => r.some((x) => egal(x, nb(s))));
    v.ok(`${k}. ${formule} = 0 : ${sols.join(" ou ") || "rien"}`, ok && (!phrase || c(k).includes(phrase)), `racines : ${r ? r.map(tx) : "tous"}`);
  };
  /** Min et max de F sur [a ; b], par balayage fin (les fonctions sont continues ici). */
  const bornes = (F, a, b) => {
    let mi = null;
    let ma = null;
    for (let x = nb(a); !inf(nb(b), x); x = plus(x, Q(1, 16))) {
      const y = F(x);
      if (mi === null || inf(y, mi)) mi = y;
      if (ma === null || inf(ma, y)) ma = y;
    }
    return [mi, ma];
  };

  controlerTout();

  v.titre("Les courbes exactes");
  v.ok("RACINE : chaque point vérifie y² = x", consts.RACINE.pts.every(([x, y]) => egal(fois(nb(y), nb(y)), nb(x))));
  v.ok("INVERSE : chaque point vérifie x × y = 1", [...consts.INVERSE_POS.pts, ...consts.INVERSE_NEG.pts].every(([x, y]) => egal(fois(nb(x), nb(y)), Q(1))));

  v.titre("★ Un seul geste");
  for (const ch of ["(-1{,}5)^2 = 2{,}25", "0{,}1^2 = 0{,}01", "(\\sqrt{5})^2 = 5", "(-8)^2 = 64", "8^2 = 64"]) egalites(1, ch);
  memeCourbe(1, courbes(1, "schema")[0], "x^2", "1. la parabole du corrigé");

  egalites(2, "\\dfrac{1}{4} = 0{,}25");
  egalites(2, "\\dfrac{1}{-0{,}5} = -2");
  v.ok("2. g(2/3) = 3/2", egal(div(Q(1), Q(2, 3)), Q(3, 2)) && c(2).includes("= \\dfrac{3}{2}$"));
  egalites(2, "\\dfrac{1}{5} = 0{,}2");

  egalites(3, "0{,}5^2 = 0{,}25");
  egalites(3, "1{,}2^2 = 1{,}44");
  dit(3, "$h(100) = 10$");

  egalites(4, "(-3)^3 = -27");
  egalites(4, "(-5)^3 = -125");
  v.ok("4. k(0,5) = 0,125 et k(10) = 1 000", egal(val("x^3", "0.5"), D("0.125")) && egal(val("x^3", 10), Q(1000)) && c(4).includes("$k(0{,}5) = 0{,}125$") && c(4).includes("$k(10) = 1\\,000$"));
  memeCourbe(4, courbes(4, "schema")[0], "x^3", "4. la courbe du corrigé");

  v.ok("5. |−7| = 7 ; |3 − 5| = 2 ; π − 4 < 0 donc |π − 4| = 4 − π", Math.PI - 4 < 0 && c(5).includes("$|-7| = 7$") && c(5).includes("$|3 - 5| = |-2| = 2$") && c(5).includes("$|\\pi - 4| = 4 - \\pi$"));
  const [V5] = courbes(5, "schema");
  v.ok("5. le V du corrigé est la courbe de |x|", [-4, -3, -1, 0, 2, 4].every((x) => egal(V5(Q(x)), abs(Q(x)))));

  v.ok("6. 1,07² < 1,7² ; (−3,2)² > (−2,3)² ; 1/0,4 = 2,5 > 2 = 1/0,5", inf(fois(D("1.07"), D("1.07")), fois(D("1.7"), D("1.7"))) && inf(fois(D("-2.3"), D("-2.3")), fois(D("-3.2"), D("-3.2"))) && egal(div(Q(1), D("0.4")), D("2.5")) && egal(div(Q(1), D("0.5")), Q(2)));
  for (const p of ["$1{,}07^2 < 1{,}7^2$", "$(-3{,}2)^2 > (-2{,}3)^2$", "$\\dfrac{1}{0{,}4} > \\dfrac{1}{0{,}5}$"]) dit(6, p);

  v.ok("7. a) ±√2 : deux solutions opposées", Math.abs(Math.SQRT2 ** 2 - 2) < 1e-12 && c(7).includes("$x = \\sqrt{2}$ ou $x = -\\sqrt{2}$"));
  zeros(7, "x^2 - 0{,}49", ["0.7", "-0.7"], "$x = 0{,}7$ ou $x = -0{,}7$");
  zeros(7, "x^2 + 9", [], "AUCUNE solution");
  v.ok("7. d) x³ = 64 : x = 4 seulement", egal(val("x^3", 4), Q(64)) && !egal(val("x^3", -4), Q(64)) && c(7).includes("$x = 4$"));

  const [R8] = courbes(8);
  v.ok("8. sur la courbe : √4 = 2 et √6,25 = 2,5", egal(R8(Q(4)), Q(2)) && egal(R8(D("6.25")), D("2.5")));
  v.ok("8. √x = 1,5 en x = 2,25, et seulement là", egal(R8(D("2.25")), D("1.5")) && c(8).includes("$x = 2{,}25$"));
  union(8, "√x ≤ 2 ⇔ [0 ; 4]", (x) => !inf(x, Q(0)) && !inf(Q(9), x) && !inf(Q(2), R8(x)), [{ de: 0, a: 4, deInclus: true, aInclus: true }], { phrase: "$[0\\,;\\,4]$", de: -1, a: 9 });

  v.titre("★★ Type devoir");
  ensemble(9, "x² ≤ 9 ⇔ [−3 ; 3]", (x) => !inf(Q(9), fois(x, x)), { de: -3, a: 3, deInclus: true, aInclus: true }, { phrase: "$[-3\\,;\\,3]$" });
  union(9, "x² > 4 ⇔ ]−∞ ; −2[ ∪ ]2 ; +∞[", (x) => inf(Q(4), fois(x, x)), [{ a: -2, aInclus: false }, { de: 2, deInclus: false }], { phrase: "$]{-\\infty}\\,;\\,-2[ \\cup ]2\\,;\\,+\\infty[$" });
  union(9, "x² < −1 : aucune solution", (x) => inf(fois(x, x), Q(-1)), [], { phrase: "AUCUNE solution" });

  const inv = (x) => (egal(x, Q(0)) ? null : div(Q(1), x));
  union(10, "1/x ≥ 2 ⇔ ]0 ; 0,5]", (x) => inv(x) !== null && !inf(inv(x), Q(2)), [{ de: 0, a: "0,5", deInclus: false, aInclus: true }], { phrase: "$]0\\,;\\,0{,}5]$", de: -5, a: 5, pas: Q(1, 16) });
  union(10, "1/x < −1 ⇔ ]−1 ; 0[", (x) => inv(x) !== null && inf(inv(x), Q(-1)), [{ de: -1, a: 0, deInclus: false, aInclus: false }], { phrase: "$]{-1}\\,;\\,0[$", de: -5, a: 5, pas: Q(1, 16) });

  const [c2, C2] = bornes((x) => fois(x, x), 2, 5);
  const [i2, I2] = bornes((x) => div(Q(1), x), 2, 5);
  v.ok("11. sur [2 ; 5] : x² de 4 à 25, 1/x de 0,2 à 0,5", egal(c2, Q(4)) && egal(C2, Q(25)) && egal(i2, D("0.2")) && egal(I2, D("0.5")));
  for (const p of ["$4 \\leqslant x^2 \\leqslant 25$", "$0{,}2 \\leqslant \\dfrac{1}{x} \\leqslant 0{,}5$", "$\\sqrt{2} \\leqslant \\sqrt{x} \\leqslant \\sqrt{5}$"]) dit(11, p);

  const [c3, C3] = bornes((x) => fois(x, x), -3, 2);
  const [k3, K3] = bornes((x) => fois(x, fois(x, x)), -1, 3);
  v.ok("12. sur [−3 ; 2] : x² de 0 à 9 ; sur [−1 ; 3] : x³ de −1 à 27", egal(c3, Q(0)) && egal(C3, Q(9)) && egal(k3, Q(-1)) && egal(K3, Q(27)));
  dit(12, "$0 \\leqslant x^2 \\leqslant 9$");
  dit(12, "$-1 \\leqslant x^3 \\leqslant 27$");
  accord(12, tableauVariationsDe(12, "schema"), (x) => fois(x, x), "le tableau du corrigé résume x² sur [−3 ; 2]");

  const f13 = (x) => abs(moins(x, Q(2)));
  v.ok("13. f(−1) = 3, f(2) = 0, f(5) = 3", egal(f13(Q(-1)), Q(3)) && egal(f13(Q(2)), Q(0)) && egal(f13(Q(5)), Q(3)));
  accord(13, tableauVariationsDe(13, "schema"), f13, "le tableau du corrigé résume |x − 2| sur [−2 ; 6]");
  const [V13] = courbes(13, "schema");
  v.ok("13. le V du corrigé est la courbe de |x − 2|", [-2, -1, 0, 2, 3, 5, 6].every((x) => egal(V13(Q(x)), f13(Q(x)))));
  union(13, "|x − 2| = 3 ⇔ x = −1 ou x = 5", (x) => egal(f13(x), Q(3)), [{ de: -1, a: -1, deInclus: true, aInclus: true }, { de: 5, a: 5, deInclus: true, aInclus: true }], { phrase: "$x = 2 - 3 = -1$ et $x = 2 + 3 = 5$" });

  egalites(14, "0{,}25^2 = 0{,}0625");
  egalites(14, "4^2 = 16");
  v.ok("14. √0,25 = 0,5 et √4 = 2 ; rangements justes", egal(fois(D("0.5"), D("0.5")), D("0.25")) && c(14).includes("$0{,}0625 < 0{,}25 < 0{,}5$") && c(14).includes("$2 < 4 < 16$"));
  const [X14, C14, R14] = courbes(14, "schema");
  memeCourbe(14, X14, "x", "14. la droite bleue");
  memeCourbe(14, C14, "x^2", "14. la parabole orange");
  v.ok("14. la courbe verte est la racine", [0, "0.25", 1, 4].every((x) => egal(fois(R14(nb(x)), R14(nb(x))), nb(x))));

  zeros(15, "(x - 3)^2 - 16", [7, -1], "soit $x = 7$ ou $x = -1$");
  zeros(15, "2x^2 - 50", [5, -5], "$x = 5$ ou $x = -5$");
  zeros(15, "(x + 1)^2 + 4", [], "AUCUNE solution");

  zeros(16, "x^2 - 36", [6, -6]);
  dit(16, "$c = 6$ m");
  egalites(16, "12^2 = 144");
  egalites(16, "\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}");
  v.ok("16. 6√2 ≈ 8,49 et √2 ≈ 1,41", Math.abs(6 * Math.SQRT2 - 8.49) < 0.005 && Math.abs(Math.SQRT2 - 1.41) < 0.005 && c(16).includes("\\approx 8{,}49$ m"));

  v.titre("★★★ Problèmes");
  egalites(17, "5 \\times 2^2 = 5 \\times 4 = 20");
  egalites(17, "5 \\times 16 = 80");
  zeros(17, "5x^2 - 80", [4, -4], "$t = 4$ s");
  v.ok("17. √20 = 2√5 ≈ 4,5", Math.abs(Math.sqrt(20) - 2 * Math.sqrt(5)) < 1e-12 && Math.abs(Math.sqrt(20) - 4.5) < 0.05 && c(17).includes("\\approx 4{,}5$ s"));
  const t17 = tableauDe(17);
  v.ok("17. le tableau du corrigé donne 5t²", t17.entete.slice(1).every((t, i) => egal(val("5x^2", String(t).replace(",", ".")), D(String(t17.ligne[i + 1])))), JSON.stringify(t17));

  const T = (x) => 42.195 / x;
  v.ok("18. t(10) = 4,2195 h ≈ 4 h 13 ; t(12) ≈ 3,52 h ≈ 3 h 31", T(10) === 4.2195 && Math.round((T(10) - 4) * 60) === 13 && Math.abs(T(12) - 3.52) < 0.005 && Math.round((T(12) - 3) * 60) === 31);
  v.ok("18. moins de 2 h ⇔ v > 21,0975 km/h", Math.abs(42.195 / 2 - 21.0975) < 1e-12 && c(18).includes("$v > 21{,}0975$ km/h"));
  const sawe = 1 + 59.5 / 60;
  v.ok("18. 1 h 59 min 30 s ≈ 1,9917 h, soit ≈ 21,2 km/h", Math.abs(sawe - 1.9917) < 0.00005 && Math.abs(42.195 / sawe - 21.2) < 0.05 && c(18).includes("\\approx 21{,}2$ km/h"));
  v.ok("18. de 10 à 12 km/h on gagne ≈ 42 min, pas 2 h", Math.round((T(10) - T(12)) * 60) === 42 && c(18).includes("environ $42$ minutes"));
  const [M18] = courbes(18, "schema");
  v.ok("18. la courbe du corrigé suit 42,195 / v à 0,001 près", [6, 7, 10, 12, 15, 20, 25].every((x) => Math.abs(num(M18(Q(x))) - T(x)) < 0.001));

  const M = (L) => 0.009 * L ** 3;
  v.ok("19. M(4,5) ≈ 0,8 t ; M(15) ≈ 30 t", Math.abs(M(4.5) - 0.8) < 0.05 && Math.abs(M(15) - 30.375) < 1e-9 && c(19).includes("\\approx 0{,}8$ t") && c(19).includes("\\approx 30$ t"));
  v.ok("19. (2L)³ = 8 L³", [1, 2.5, 7].every((L) => Math.abs(M(2 * L) - 8 * M(L)) < 1e-9));
  v.ok("19. 24 t : L³ ≈ 2 667, L ≈ 13,9 m", Math.round(24 / 0.009) === 2667 && Math.abs(Math.cbrt(24 / 0.009) - 13.9) < 0.05 && c(19).includes("\\approx 13{,}9$ m"));

  const d20 = (x) => abs(moins(x, Q(12)));
  v.ok("20. d(4) = 8, d(12) = 0, d(15) = 3", egal(d20(Q(4)), Q(8)) && egal(d20(Q(12)), Q(0)) && egal(d20(Q(15)), Q(3)));
  accord(20, tableauVariationsDe(20, "schema"), d20, "le tableau du corrigé résume |x − 12| sur [0 ; 20]");
  union(20, "|x − 12| = 3 ⇔ km 9 et km 15", (x) => egal(d20(x), Q(3)), [{ de: 9, a: 9, deInclus: true, aInclus: true }, { de: 15, a: 15, deInclus: true, aInclus: true }], { phrase: "aux kilomètres $15$ et $9$", de: 0, a: 20 });
  ensemble(20, "|x − 12| ≤ 2 ⇔ [10 ; 14]", (x) => !inf(Q(2), d20(x)), { de: 10, a: 14, deInclus: true, aInclus: true }, { phrase: "sur $[10\\,;\\,14]$", de: 0, a: 20 });
}

lancer({
  nom: "LES FONCTIONS DE RÉFÉRENCE · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-fonctions-reference.tsx",
  notionId: "fonctions_reference_2de",
  verifier,
  casses: [
    ["ex. 1 : le carré d'un négatif rendu négatif", "(-1{,}5)^2 = 2{,}25", "(-1{,}5)^2 = -2{,}25"],
    ["ex. 2 : l'inverse confondu avec l'opposé", "\\\\dfrac{1}{-0{,}5} = -2$", "\\\\dfrac{1}{-0{,}5} = 2$"],
    ["ex. 3 : 1,2² faux", "1{,}2^2 = 1{,}44", "1{,}2^2 = 2{,}4"],
    ["ex. 4 : un cube négatif rendu positif", "(-5)^3 = -125", "(-5)^3 = 125"],
    ["ex. 6 : l'ordre gardé sur les négatifs", "$(-3{,}2)^2 > (-2{,}3)^2$", "$(-3{,}2)^2 < (-2{,}3)^2$"],
    ["ex. 8 : un point de la racine faux", "[2.25, 1.5]", "[2.25, 1.4]"],
    ["ex. 9 : « x ≤ 3 » au lieu de [−3 ; 3]", "Les solutions forment $[-3\\\\,;\\\\,3]$", "Les solutions forment $]{-\\\\infty}\\\\,;\\\\,3]$"],
    ["ex. 10 : 0 compris dans les solutions", "$]0\\\\,;\\\\,0{,}5]$", "$[0\\\\,;\\\\,0{,}5]$"],
    ["ex. 12 : le minimum 0 oublié", "Donc $0 \\\\leqslant x^2 \\\\leqslant 9$", "Donc $4 \\\\leqslant x^2 \\\\leqslant 9$"],
    ["ex. 13 : le sommet du V déplacé", "tableauVariations([-2, 2, 6], [4, 0, 4])", "tableauVariations([-2, 2, 6], [4, 1, 4])"],
    ["ex. 15 : une solution fausse", "soit $x = 7$ ou $x = -1$", "soit $x = 7$ ou $x = 1$"],
    ["ex. 17 : une durée fausse", "avec $t > 0$ : $t = 4$ s", "avec $t > 0$ : $t = 3$ s"],
    ["ex. 18 : le seuil des 2 heures faux", "$v > 21{,}0975$ km/h", "$v > 20{,}0975$ km/h"],
    ["ex. 19 : une longueur fausse", "\\\\approx 13{,}9$ m", "\\\\approx 12{,}9$ m"],
    ["ex. 20 : la zone de réseau fausse", "sur $[10\\\\,;\\\\,14]$", "sur $[9\\\\,;\\\\,15]$"],
  ],
});
