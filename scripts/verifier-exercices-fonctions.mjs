// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Image, antécédent et
// courbe » de seconde (lib/fiches-exercices/maths-seconde-fonctions.tsx).
//
// ⭐ L'AUTRE CHEMIN :
//   · une image : la formule de l'énoncé est RELUE et évaluée en fractions
//     exactes ; chaque membre de la chaîne du corrigé doit valoir la même chose ;
//   · des antécédents : les coefficients du trinôme sont retrouvés par ses
//     valeurs en −1, 0, 1, puis ses racines par le discriminant, en exact —
//     « deux, un ou aucun » se compte, il ne se recopie pas ;
//   · une lecture graphique : la courbe est RELUE dans la figure, et les
//     solutions sont retrouvées sur une grille, changements de signe compris.
//
//   node scripts/verifier-exercices-fonctions.mjs

import { Q, D, egal, inf, plus, moins, fois, div, evalTex, evalTexReel, identiques, lireFeuille, outilsAlgebre, outilsIntervalles, outilsCourbes, outilsEgalites, racines, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" ? D(x) : Q(x));
const txt = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);


function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, vaut } = outilsAlgebre(v, f);
  const { ensemble, union } = outilsIntervalles(v, f);
  const { courbes, tableauDe, controlerTout, consts } = outilsCourbes(v, f, source);
  const egalites = outilsEgalites(v, f);
  const val = (t, x) => evalTex(t, nb(x));

  /** L'image de a par la formule vaut le premier membre de la chaîne écrite. */
  const image = (k, formule, a, chaine) => {
    egalites(k, chaine);
    const premier = evalTex(chaine.split(" = ")[0], Q(0));
    v.ok(`${k}. c'est bien l'image de ${txt(nb(a))} par ${formule}`, egal(val(formule, a), premier), `${txt(val(formule, a))} ≠ ${txt(premier)}`);
  };
  /** Les antécédents de kv par la formule : exactement `sols`, ni plus ni moins. */
  const antecedents = (k, formule, kv, sols, phrase) => {
    const r = racines((x) => moins(val(formule, x), nb(kv)));
    const attendu = sols.map(nb);
    const memes = r !== null && r.length === attendu.length && attendu.every((s) => r.some((x) => egal(x, s)));
    v.ok(`${k}. ${formule} = ${kv} : ${attendu.length ? attendu.map(txt).join(" et ") : "aucune solution"}`, memes && (!phrase || c(k).includes(phrase)), `racines : ${r ? r.map(txt).join(", ") : "tous les x"} ; phrase : ${phrase}`);
  };
  /** Sur [de ; a], F(x) = kv exactement en `sols` — les zéros de la grille, et
   *  aucun changement de signe entre deux points de la grille. */
  const lecture = (k, quoi, F, kv, sols, [de, a], phrase) => {
    const pts = [];
    for (let x = nb(de); !inf(nb(a), x); x = plus(x, Q(1, 8))) pts.push(x);
    const g = (x) => moins(F(x), nb(kv));
    const zeros = pts.filter((x) => egal(g(x), Q(0)));
    const signe = (x) => (inf(g(x), Q(0)) ? -1 : inf(Q(0), g(x)) ? 1 : 0);
    const saute = pts.slice(1).some((x, i) => signe(x) * signe(pts[i]) === -1);
    const attendu = sols.map(nb);
    const memes = zeros.length === attendu.length && attendu.every((s) => zeros.some((x) => egal(x, s)));
    v.ok(`${k}. ${quoi}`, memes && !saute && (!phrase || c(k).includes(phrase)), `zéros lus : ${zeros.map(txt).join(", ") || "aucun"} ; racine entre deux points : ${saute} ; phrase : ${phrase}`);
  };
  /** La courbe dessinée est-elle celle de la formule ? */
  const memeCourbe = (k, F, formule, role = "figure") =>
    v.ok(`${k}. la courbe ${role === "figure" ? "de l'énoncé" : "du corrigé"} est celle de ${formule}`, [-3, -2, -1, 0, 1, 2, 3].map((n) => Q(n)).concat([Q(1, 2)]).every((x) => egal(F(x), val(formule, x))));

  controlerTout();
  const { dessin } = outilsIntervalles(v, f);
  /** Le tableau de l'exercice k donne-t-il les images de la formule ? (« 1,6 », « 12,5 » compris) */
  const tableauJuste = (k, formule, vertical = false) => {
    const t = tableauDe(k);
    const ok = t.entete.slice(1).every((x, i) => egal(val(formule, String(x).replace(",", ".")), D(String(t.ligne[i + 1]))));
    v.ok(`${k}. le tableau du corrigé donne les images de ${formule}`, ok, JSON.stringify(t));
  };

  v.titre("★ Un seul geste");
  dit(1, "l'image de $0$ est $-1$");
  dit(1, "$-2$ et $3$ sont deux antécédents de $5$");
  dit(1, "on ne peut pas conclure");
  const t1 = tableauDe(1);
  v.ok("1. le tableau du corrigé reprend f(−2) = 5, f(0) = −1, f(3) = 5", JSON.stringify(t1.ligne) === '["f(x)",5,-1,5]' && JSON.stringify(t1.entete) === '["x","-2","0","3"]', JSON.stringify(t1));
  tableauJuste(2, "x^2 - 4x + 1");
  memeCourbe(3, courbes(3, "schema")[0], "3(x - 2)^2 - 5", "schema");
  tableauJuste(4, "5x - 8");
  memeCourbe(5, courbes(5, "schema")[0], "x^2 - 3", "schema");
  dessin(6, { de: 3, deInclus: true });
  memeCourbe(9, courbes(9, "schema")[0], "(x - 1)^2 - 4", "schema");
  dessin(11, { a: 3, aInclus: true });
  memeCourbe(14, courbes(14, "schema")[0], "-x + 3", "schema");
  memeCourbe(15, courbes(15, "schema")[0], "2x^2 - 3x - 5", "schema");
  tableauJuste(19, "0{,}005x^2");

  const f2 = "x^2 - 4x + 1";
  image(2, f2, 0, "0^2 - 4 \\times 0 + 1 = 1");
  image(2, f2, -2, "(-2)^2 - 4 \\times (-2) + 1 = 4 + 8 + 1 = 13");
  image(2, f2, 5, "5^2 - 4 \\times 5 + 1 = 25 - 20 + 1 = 6");

  const g3 = "3(x - 2)^2 - 5";
  image(3, g3, 4, "3 \\times (4 - 2)^2 - 5 = 3 \\times 4 - 5 = 7");
  image(3, g3, 0, "3 \\times (0 - 2)^2 - 5 = 3 \\times 4 - 5 = 7");
  image(3, g3, 2, "3 \\times 0^2 - 5 = -5");
  egalites(3, "(3 \\times 2)^2 = 36");

  antecedents(4, "5x - 8", 12, [4], "donc $x = 4$");
  antecedents(4, "5x - 8", -3, [1], "donc $x = 1$");
  antecedents(4, "5x - 8", 0, [Q(8, 5)], "donc $x = \\dfrac{8}{5} = 1{,}6$");
  egalites(4, "\\dfrac{8}{5} = 1{,}6");
  v.ok("4. le piège : f(12) = 52", egal(val("5x - 8", 12), Q(52)) && c(4).includes("$f(12) = 52$"));

  antecedents(5, "x^2 - 3", 1, [2, -2], "$x = 2$ ou $x = -2$");
  antecedents(5, "x^2 - 3", -3, [0], "$x = 0$. UN seul");
  antecedents(5, "x^2 - 3", -5, [], "AUCUN antécédent");

  antecedents(6, "x + 5", 0, [-5], "$\\mathbb{R} \\setminus \\{-5\\}$");
  ensemble(6, "x − 3 ≥ 0 ⇔ x ∈ [3 ; +∞[", (x) => !inf(val("x - 3", x), Q(0)), { de: 3, deInclus: true }, { phrase: "$[3\\,;\\,+\\infty[$" });
  antecedents(6, "2x - 6", 0, [3], "$\\mathbb{R} \\setminus \\{3\\}$");
  v.ok("6. h(−1) = 0 : le numérateur peut s'annuler", egal(val("\\dfrac{x + 1}{2x - 6}", -1), Q(0)));

  const f7 = "x^2 - 4";
  const t7 = tableauDe(7);
  v.ok("7. le tableau du corrigé : chaque image recalculée", t7.entete.slice(1).every((x, i) => egal(val(f7, Number(x)), Q(t7.ligne[i + 1]))), JSON.stringify(t7));
  for (const ch of ["9 - 4 = 5", "4 - 4 = 0", "1 - 4 = -3"]) egalites(7, ch);
  memeCourbe(7, courbes(7, "schema")[0], f7, "schema");
  antecedents(7, f7, 0, [-2, 2], "$0$ apparaît sous $-2$ et sous $2$");
  antecedents(7, f7, -3, [-1, 1], "$-3$ apparaît sous $-1$ et sous $1$");

  const [F8] = courbes(8);
  v.ok("8. f(2) = 3 lu sur la courbe", egal(F8(Q(2)), Q(3)) && c(8).includes("$f(2) = 3$"));
  lecture(8, "f(x) = 3 : x = 0 et x = 2", F8, 3, [0, 2], [-2, 4], "$x = 0$ et $x = 2$");
  lecture(8, "f(x) = 4 : x = 1 seulement", F8, 4, [1], [-2, 4], "une seule solution, $x = 1$");
  lecture(8, "f(x) = 5 : aucune solution", F8, 5, [], [-2, 4], "AUCUNE solution");
  memeCourbe(8, courbes(8, "schema")[0], "-x^2 + 2x + 3", "schema");

  v.titre("★★ Type devoir");
  const h9 = "(x - 1)^2 - 4";
  image(9, h9, -1, "(-2)^2 - 4 = 0");
  image(9, h9, 0, "(-1)^2 - 4 = -3");
  vaut(9, h9, "x^2 - 2x - 3", "$h(x) = x^2 - 2x + 1 - 4 = x^2 - 2x - 3$");
  antecedents(9, h9, -3, [0, 2], "$x = 0$ ou $x = 2$");
  antecedents(9, h9, -4, [1], "donc $x = 1$");

  const g10 = "x^2 - 3x + 2";
  v.ok("10. g(−1) = 6 et g(4) = 6 : A et C sur la courbe ; g(2) = 0 : B non", egal(val(g10, -1), Q(6)) && egal(val(g10, 4), Q(6)) && !egal(val(g10, 2), Q(1)));
  for (const ch of ["1 + 3 + 2 = 6", "4 - 6 + 2 = 0", "16 - 12 + 2 = 6"]) egalites(10, ch);
  dit(10, "$B$ n'est pas sur");
  vaut(10, "(x - 1)(x - 2)", g10, "= x^2 - 3x + 2$. ✓");
  antecedents(10, g10, 0, [1, 2], "$x = 1$ ou $x = 2$");
  memeCourbe(10, courbes(10, "schema")[0], g10, "schema");

  ensemble(11, "6 − 2x ≥ 0 ⇔ x ≤ 3", (x) => !inf(val("6 - 2x", x), Q(0)), { a: 3, aInclus: true }, { phrase: "$]{-\\infty}\\,;\\,3]$" });
  antecedents(11, "x^2 - 9", 0, [3, -3], "$\\mathbb{R} \\setminus \\{-3\\,;\\,3\\}$");
  union(11, "√x ÷ (x − 4) : x ≥ 0 et x ≠ 4", (x) => !inf(x, Q(0)) && !egal(x, Q(4)), [{ de: 0, a: 4, deInclus: true, aInclus: false }, { de: 4, deInclus: false }], { phrase: "$[0\\,;\\,4[ \\cup ]4\\,;\\,+\\infty[$" });

  const [F12] = courbes(12);
  const dans12 = (x) => !inf(x, Q(-2)) && !inf(Q(4), x);
  lecture(12, "f(x) = 1 : x = −1 et x = 3", F12, 1, [-1, 3], [-2, 4], "$x = -1$ ou $x = 3$");
  union(12, "f(x) ≤ 1 ⇔ [−1 ; 3]", (x) => dans12(x) && !inf(Q(1), F12(x)), [{ de: -1, a: 3, deInclus: true, aInclus: true }], { phrase: "$[-1\\,;\\,3]$", de: -4, a: 6 });
  union(12, "f(x) > 1 ⇔ [−2 ; −1[ ∪ ]3 ; 4]", (x) => dans12(x) && inf(Q(1), F12(x)), [{ de: -2, a: -1, deInclus: true, aInclus: false }, { de: 3, a: 4, deInclus: false, aInclus: true }], { phrase: "$[-2\\,;\\,-1[ \\cup ]3\\,;\\,4]$", de: -4, a: 6 });
  v.ok("12. le point le plus bas est à l'ordonnée −3", egal(F12(Q(1)), Q(-3)) && [-2, -1, 0, 2, 3, 4].every((n) => inf(Q(-3), F12(Q(n)))));
  lecture(12, "f(x) = −4 : aucune solution", F12, -4, [], [-2, 4], "AUCUNE solution");

  const [F13, G13] = courbes(13);
  memeCourbe(13, F13, "x^2 - 1");
  memeCourbe(13, G13, "x + 1");
  lecture(13, "f(x) = g(x) : x = −1 et x = 2", (x) => moins(F13(x), G13(x)), 0, [-1, 2], [-2, 3], "$x = -1$ ou $x = 2$");
  const dans13 = (x) => !inf(x, Q(-2)) && !inf(Q(3), x);
  union(13, "f(x) < g(x) ⇔ ]−1 ; 2[", (x) => dans13(x) && inf(F13(x), G13(x)), [{ de: -1, a: 2, deInclus: false, aInclus: false }], { phrase: "$]{-1}\\,;\\,2[$", de: -4, a: 5 });
  union(13, "f(x) ≥ g(x) ⇔ [−2 ; −1] ∪ [2 ; 3]", (x) => dans13(x) && !inf(F13(x), G13(x)), [{ de: -2, a: -1, deInclus: true, aInclus: true }, { de: 2, a: 3, deInclus: true, aInclus: true }], { phrase: "$[-2\\,;\\,-1] \\cup [2\\,;\\,3]$", de: -4, a: 5 });
  vaut(13, "x^2 - 1 - (x + 1)", "x^2 - x - 2", "$f(x) - g(x) = x^2 - 1 - x - 1 = x^2 - x - 2$");
  vaut(13, "(x - 2)(x + 1)", "x^2 - x - 2", "$(x - 2)(x + 1) = x^2 + x - 2x - 2 = x^2 - x - 2$");

  v.ok("14. a = −1 : f(4) = −1", egal(val("-x + 3", 4), Q(-1)) && c(14).includes("$a = -1$"));
  egalites(14, "-4 + 3 = -1");
  dit(14, "$g(-3) = 0$");
  dit(14, "$h(2) = 5$");

  const f15 = "2x^2 - 3x - 5";
  image(15, f15, -1, "2 \\times 1 + 3 - 5 = 0");
  image(15, f15, Q(1, 2), "2 \\times \\dfrac{1}{4} - \\dfrac{3}{2} - 5 = \\dfrac{1}{2} - \\dfrac{3}{2} - 5 = -6");
  image(15, f15, Q(5, 2), "2 \\times \\dfrac{25}{4} - \\dfrac{15}{2} - 5 = \\dfrac{25}{2} - \\dfrac{15}{2} - 5 = 0");
  egalites(15, "2 \\times 2 - 3\\sqrt{2} - 5 = -1 - 3\\sqrt{2}");
  const r15 = evalTexReel(f15, Math.SQRT2);
  v.ok("15. f(√2) = −1 − 3√2 ≈ −5,24", Math.abs(r15 - (-1 - 3 * Math.SQRT2)) < 1e-9 && Math.abs(r15 + 5.24) < 0.005 && c(15).includes("$-5{,}24$"));
  antecedents(15, f15, 0, [-1, Q(5, 2)], "$-1$ et $\\dfrac{5}{2}$ sont deux antécédents de $0$");

  const t16 = tableauDe(16);
  const rel16 = consts.RELEVES_16.pts;
  v.ok("16. le tableau de l'énoncé et les points du graphique disent la même chose", rel16.length === 7 && rel16.every(([h, T], i) => t16.entete[i + 1] === `${h}` && t16.ligne[i + 1] === T), JSON.stringify(t16));
  const [T16] = courbes(16, "schema");
  v.ok("16. −1 °C à 3 h et 5 h seulement ; minimum −2 °C à 4 h", JSON.stringify(rel16.filter(([, T]) => T === -1).map(([h]) => h)) === "[3,5]" && Math.min(...rel16.map(([, T]) => T)) === -2 && rel16.find(([, T]) => T === -2)[0] === 4);
  dit(16, "sous $3$ h et sous $5$ h");
  dit(16, "$-2$ °C, relevée à $4$ h");
  union(16, "gel (T < 0) ⇔ ]2 ; 5,5[", (x) => { const y = T16(x); return y !== null && inf(y, Q(0)); }, [{ de: 2, a: "5,5", deInclus: false, aInclus: false }], { phrase: "de $2$ h à $5$ h $30$ environ", de: 0, a: 6 });

  v.titre("★★★ Problèmes");
  const h17 = "-5x^2 + 5x + 10";
  v.ok("17. h(0) = 10", egal(val(h17, 0), Q(10)) && c(17).includes("$h(0) = 10$"));
  image(17, h17, "0,5", "-5 \\times 0{,}25 + 2{,}5 + 10 = 11{,}25");
  image(17, h17, 2, "-20 + 10 + 10 = 0");
  antecedents(17, h17, 10, [0, 1], "Donc $t = 0$ ou $t = 1$");
  antecedents(17, h17, 0, [2, -1], "elle entre dans l'eau");
  memeCourbe(17, courbes(17, "schema")[0], h17, "schema");
  dit(17, "$[0\\,;\\,2]$");

  const [P, C] = courbes(18);
  v.ok("18. P(10) = 3 kW et C(10) = 1 kW : trois fois plus", egal(P(Q(10)), Q(3)) && egal(C(Q(10)), Q(1)) && c(18).includes("$P(10) = 3$ kW et $C(10) = 1$ kW"));
  lecture(18, "P(t) = 3 : t = 10 et t = 16", P, 3, [10, 16], [6, 20], "$t = 10$ ou $t = 16$");
  lecture(18, "P(t) = C(t) : t = 8 et t = 18", (x) => moins(P(x), C(x)), 0, [8, 18], [6, 20], "$t = 8$ ou $t = 18$");
  const dans18 = (x) => !inf(x, Q(6)) && !inf(Q(20), x);
  union(18, "P(t) > C(t) ⇔ ]8 ; 18[", (x) => dans18(x) && inf(C(x), P(x)), [{ de: 8, a: 18, deInclus: false, aInclus: false }], { phrase: "$]8\\,;\\,18[$", de: 4, a: 22 });
  union(18, "le piège : P(t) > 0 ⇔ ]6 ; 20[", (x) => dans18(x) && inf(Q(0), P(x)), [{ de: 6, a: 20, deInclus: false, aInclus: false }], { phrase: "$]6\\,;\\,20[$", de: 4, a: 22 });

  const d19 = "0{,}005x^2";
  image(19, d19, 50, "0{,}005 \\times 2\\,500 = 12{,}5");
  image(19, d19, 100, "0{,}005 \\times 10\\,000 = 50");
  image(19, d19, 130, "0{,}005 \\times 16\\,900 = 84{,}5");
  egalites(19, "50 = 4 \\times 12{,}5");
  antecedents(19, d19, 32, [80, -80], "donc $v = 80$");
  dit(19, "$v = -80$");
  v.ok("19. 84,5 m : plus des trois quarts d'un terrain de 100 à 110 m", 84.5 > 0.75 * 110);

  const t20 = tableauDe(20);
  const noaa = { 1960: 316.91, 1980: 338.76, 2000: 369.71, 2010: 389.9, 2020: 414.21, 2024: 424.61 };
  v.ok("20. le tableau = les moyennes NOAA arrondies", t20.entete.slice(1).every((a, i) => Math.round(noaa[a]) === t20.ligne[i + 1]), JSON.stringify(t20.ligne));
  v.ok("20. C(2000) = 370, et 414 a pour antécédent 2020", t20.ligne[t20.entete.indexOf("2000")] === 370 && t20.entete[t20.ligne.indexOf(414)] === "2020");
  dit(20, "$C(2000) = 370$ ppm");
  dit(20, "son antécédent est $2020$");
  egalites(20, "339 - 317 = 22");
  egalites(20, "414 - 370 = 44");
  v.ok("20. l'augmentation a doublé : 44 = 2 × 22", 44 === 2 * 22);
  egalites(20, "\\dfrac{370 + 414}{2} = 392");
  v.ok("20. la mesure de 2010 : 390 ppm", Math.round(noaa[2010]) === 390 && c(20).includes("$390$ ppm"));
}

lancer({
  nom: "IMAGE, ANTÉCÉDENT ET COURBE · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-fonctions.tsx",
  notionId: "fonction_vocabulaire_2de",
  verifier,
  casses: [
    ["ex. 2 : −4 × (−2) compté −8", "= 4 + 8 + 1 = 13$", "= 4 - 8 + 1 = -3$"],
    ["ex. 5 : l'antécédent −2 oublié", "$x = 2$ ou $x = -2$. DEUX", "$x = 2$. DEUX"],
    ["ex. 7 : une image fausse dans le tableau", "[\"f(x)\", 5, 0, -3, -4, -3, 0, 5]", "[\"f(x)\", 5, 0, -3, -4, -3, 0, 4]"],
    ["ex. 8 : la courbe de l'énoncé modifiée", "const COURBE_8: Courbe[] = [{ q: [-1, 2, 3] }];", "const COURBE_8: Courbe[] = [{ q: [-1, 2, 2] }];"],
    ["ex. 10 : le point A marqué à côté de la courbe", "{ x: -1, y: 6, label: \"A\" }", "{ x: -1, y: 5, label: \"A\" }"],
    ["ex. 11 : le sens gardé en divisant par −2", "$]{-\\\\infty}\\\\,;\\\\,3]$", "$[3\\\\,;\\\\,+\\\\infty[$"],
    ["ex. 12 : le domaine oublié au c)", "$[-2\\\\,;\\\\,-1[ \\\\cup ]3\\\\,;\\\\,4]$", "$]{-\\\\infty}\\\\,;\\\\,-1[ \\\\cup ]3\\\\,;\\\\,+\\\\infty[$"],
    ["ex. 13 : la droite dessinée n'est plus x + 1", "{ q: [0, 1, 1], couleur: ORANGE }", "{ q: [0, 1, 2], couleur: ORANGE }"],
    ["ex. 15 : f(1/2) faux", "- \\\\dfrac{3}{2} - 5 = -6$", "- \\\\dfrac{3}{2} - 5 = -5$"],
    ["ex. 16 : un relevé changé sans le tableau", "[5, -1], [6, 1]]", "[5, -1], [6, 0]]"],
    ["ex. 17 : le sommet du saut", "+ 2{,}5 + 10 = 11{,}25$", "+ 2{,}5 + 10 = 12{,}25$"],
    ["ex. 18 : la consommation du soir modifiée", "[8, 1], [18, 1], [20, 2]", "[8, 1], [18, 2], [20, 2]"],
    ["ex. 19 : une vitesse fausse", "donc $v = 80$", "donc $v = 90$"],
    ["ex. 20 : une augmentation fausse", "$414 - 370 = 44$", "$414 - 370 = 34$"],
  ],
});
