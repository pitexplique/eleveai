// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les fonctions
// affines » de seconde (lib/fiches-exercices/maths-seconde-affines.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque expression trouvée est confrontée aux DONNÉES de
// l'énoncé (les deux points, les deux factures) ; les droites dessinées sont
// RELUES dans le source et comparées à la formule ; les tableaux de signes sont
// recalculés case par case ; les solutions retrouvées en exact.
//
//   node scripts/verifier-exercices-affines.mjs

import { Q, D, egal, inf, moins, evalTex, lireFeuille, outilsAlgebre, outilsIntervalles, outilsCourbes, outilsEgalites, outilsSignes, racines, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, vaut } = outilsAlgebre(v, f);
  const { ensemble } = outilsIntervalles(v, f);
  const { courbes, tableauDe, controlerTout } = outilsCourbes(v, f, source);
  const { juste } = outilsSignes(v, f);
  const egalites = outilsEgalites(v, f);
  const val = (t, x) => evalTex(t, nb(x));
  const tx = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);
  const memeCourbe = (k, F, t, quoi) => v.ok(`${k}. ${quoi} est celle de ${t}`, [-3, -2, -1, 0, 1, 2, 3].map((n) => Q(n)).concat([Q(1, 2)]).every((x) => egal(F(x), val(t, x))));
  /** formule = k a pour seule solution s, écrite dans la phrase. */
  const seule = (k, formule, kv, s, phrase) => {
    const r = racines((x) => moins(val(formule, x), nb(kv)));
    v.ok(`${k}. ${formule} = ${kv} : x = ${tx(nb(s))} seulement`, r && r.length === 1 && egal(r[0], nb(s)) && (!phrase || c(k).includes(phrase)), `racines : ${r ? r.map(tx) : "tous"} ; phrase : ${phrase}`);
  };
  /** La droite passe-t-elle par ces points ? */
  const passe = (k, formule, pts) => v.ok(`${k}. ${formule} passe par ${pts.map(([x, y]) => `(${x} ; ${y})`).join(", ")}`, pts.every(([x, y]) => egal(val(formule, x), nb(y))));
  /** Le tableau du corrigé donne les images de la formule (tolérance pour une valeur arrondie). */
  const tableauJuste = (k, formule, tol = 0) => {
    const t = tableauDe(k);
    const ok = t.entete.slice(1).every((x, i) => {
      const y = val(formule, String(x).replace(/\s/g, "").replace(",", "."));
      const lu = D(String(t.ligne[i + 1]).replace(/\s/g, ""));
      return tol ? Math.abs(Number(moins(y, lu).n) / Number(moins(y, lu).d)) <= tol : egal(y, lu);
    });
    v.ok(`${k}. le tableau du corrigé donne les images de ${formule}`, ok, JSON.stringify(t));
  };

  controlerTout();

  v.titre("★ Un seul geste");
  vaut(1, "7 - 2x", "-2x + 7", "$f(x) = -2x + 7$");
  vaut(1, "\\dfrac{x}{4}", "\\dfrac{1}{4}x", "$h(x) = \\dfrac{1}{4}x$");
  vaut(1, "2(x - 3) + 1", "2x - 5", "$k(x) = 2x - 6 + 1 = 2x - 5$");
  const [F1, K1] = courbes(1, "schema");
  memeCourbe(1, F1, "-2x + 7", "1. la droite bleue");
  memeCourbe(1, K1, "2x - 5", "1. la droite orange");

  const f2 = "-4x + 6";
  egalites(2, "-4 \\times 2 + 6 = -8 + 6 = -2");
  egalites(2, "-4 \\times (-1{,}5) + 6 = 6 + 6 = 12");
  v.ok("2. ce sont bien f(2) et f(−1,5)", egal(val(f2, 2), Q(-2)) && egal(val(f2, "-1.5"), Q(12)));
  seule(2, f2, -10, 4, "donc $x = 4$");
  seule(2, f2, 0, "1.5", "donc $x = 1{,}5$");
  tableauJuste(2, f2);

  const [F3] = courbes(3);
  memeCourbe(3, F3, "2x - 1", "3. la droite de l'énoncé");
  dit(3, "$f(x) = 2x - 1$");
  egalites(3, "2 \\times 2 - 1 = 3");

  passe(4, "-2x + 5", [[-1, 7], [3, -1]]);
  egalites(4, "\\dfrac{-1 - 7}{4} = \\dfrac{-8}{4} = -2");
  dit(4, "Ainsi $f(x) = -2x + 5$");
  memeCourbe(4, courbes(4, "schema")[0], "-2x + 5", "4. la droite du corrigé");

  seule(5, "-2x + 7", 0, "3.5", "$x = \\dfrac{7}{2} = 3{,}5$");
  juste(5);

  tableauJuste(6, "3x - 2");
  for (const ch of ["3 - 2 = 1", "12 - 2 = 10", "-6 - 2 = -8", "3 \\times 3 = 9"]) egalites(6, ch);

  const F7 = "1{,}8x + 32";
  egalites(7, "1{,}8 \\times 20 + 32 = 36 + 32 = 68");
  egalites(7, "180 + 32 = 212");
  v.ok("7. F(100) = 212", egal(val(F7, 100), Q(212)));
  seule(7, F7, "98.6", 37, "donc $c = 37$");
  v.ok("7. F(c) = c seulement pour c = −40", (() => { const r = racines((x) => moins(val(F7, x), x)); return r.length === 1 && egal(r[0], Q(-40)); })() && c(7).includes("donc $c = -40$"));
  tableauJuste(7, F7);

  const f8 = "-\\dfrac{1}{2}x + 3";
  v.ok("8. f(0) = 3 et f(4) = 1", egal(val(f8, 0), Q(3)) && egal(val(f8, 4), Q(1)));
  seule(8, f8, 0, 6, "donc $x = 6$");
  memeCourbe(8, courbes(8, "schema")[0], f8, "8. la droite du corrigé");

  v.titre("★★ Type devoir");
  passe(9, "1{,}5x - 4", [[2, -1], [6, 5]]);
  egalites(9, "\\dfrac{5 - (-1)}{6 - 2} = \\dfrac{6}{4} = 1{,}5");
  egalites(9, "15 - 4 = 11");
  seule(9, "1{,}5x - 4", 0, Q(8, 3), "= \\dfrac{8}{3}$");
  egalites(9, "\\dfrac{4}{1{,}5} = \\dfrac{8}{3}");
  memeCourbe(9, courbes(9, "schema")[0], "1{,}5x - 4", "9. la droite du corrigé");

  juste(10);
  const f10 = "4 - 0{,}8x";
  ensemble(10, "f(x) > 0 ⇔ ]−∞ ; 5[", (x) => inf(Q(0), val(f10, x)), { a: 5, aInclus: false }, { phrase: "$]{-\\infty}\\,;\\,5[$" });
  ensemble(10, "f(x) ≥ 2 ⇔ ]−∞ ; 2,5]", (x) => !inf(val(f10, x), Q(2)), { a: "2,5", aInclus: true }, { phrase: "$]{-\\infty}\\,;\\,2{,}5]$" });

  seule(11, "2x - 3 - (-x + 6)", 0, 3, "$x = 3$");
  v.ok("11. le point d'intersection est (3 ; 3)", egal(val("2x - 3", 3), Q(3)) && egal(val("-x + 6", 3), Q(3)) && c(11).includes("$(3\\,;\\,3)$"));
  vaut(11, "2x - 3 - (-x + 6)", "3x - 9", "$f(x) - g(x) = 2x - 3 + x - 6 = 3x - 9$");
  juste(11);
  ensemble(11, "f(x) > g(x) ⇔ ]3 ; +∞[", (x) => inf(val("-x + 6", x), val("2x - 3", x)), { de: 3, deInclus: false }, { phrase: "$]3\\,;\\,+\\infty[$" });
  const [F11, G11] = courbes(11, "schema");
  memeCourbe(11, F11, "2x - 3", "11. la droite bleue");
  memeCourbe(11, G11, "-x + 6", "11. la droite orange");

  passe(12, "3x - 10", [[2, -4]]);
  dit(12, "$g(x) = 3x - 10$");
  const [F12, G12] = courbes(12, "schema");
  memeCourbe(12, F12, "3x - 1", "12. la droite bleue");
  memeCourbe(12, G12, "3x - 10", "12. la droite orange");

  const [F13, G13] = courbes(13);
  memeCourbe(13, F13, "-x + 3", "13. la droite bleue de l'énoncé");
  memeCourbe(13, G13, "1{,}5x - 2", "13. la droite orange de l'énoncé");
  seule(13, "-x + 3 - (1{,}5x - 2)", 0, 2, "donc $x = 2$");
  dit(13, "$(2\\,;\\,1)$");

  const V14 = "150 - 12x";
  egalites(14, "150 - 60 = 90");
  seule(14, V14, 30, 10, "donc $t = 10$ minutes");
  seule(14, V14, 0, "12.5", "donne $t = 12{,}5$");
  tableauJuste(14, V14);

  ensemble(15, "(m − 2) < 0 ⇔ m < 2", (x) => inf(val("x - 2", x), Q(0)), { a: 2, aInclus: false }, { phrase: "soit $m < 2$" });
  seule(15, "3(x - 2) + 1", 7, 4, "donc $m = 4$");
  const [F15, K15] = courbes(15, "schema");
  memeCourbe(15, F15, "2x + 1", "15. la droite bleue (m = 4)");
  memeCourbe(15, K15, "1", "15. la droite orange (m = 2)");

  passe(16, "-2x + 4", [[-1, 6], [2, 0]]);
  egalites(16, "\\dfrac{0 - 6}{2 - (-1)} = \\dfrac{-6}{3} = -2");
  dit(16, "Ainsi $f(x) = -2x + 4$");
  juste(16);
  memeCourbe(16, courbes(16, "schema")[0], "-2x + 4", "16. la droite du corrigé");

  v.titre("★★★ Problèmes");
  const T17 = "100 - \\dfrac{x}{300}";
  egalites(17, "100 - \\dfrac{4\\,800}{300} = 100 - 16 = 84");
  seule(17, T17, 90, 3000, "donc $h = 3\\,000$ m");
  v.ok("17. T(8 849) ≈ 70,5 °C", Math.abs(100 - 8849 / 300 - 70.5) < 0.05 && c(17).includes("\\approx 70{,}5$ °C"));
  vaut(17, T17, "-\\dfrac{1}{300}x + 100", "$T(h) = -\\dfrac{1}{300}h + 100$");
  tableauJuste(17, T17, 0.05);

  const v18 = "0{,}6x + 331";
  egalites(18, "0{,}6 \\times 20 + 331 = 12 + 331 = 343");
  seule(18, v18, 340, 15, "donc $T = 15$ °C");
  egalites(18, "343 \\times 6 = 2\\,058");
  tableauJuste(18, v18);

  const F19 = "0{,}25x + 12";
  const G19 = "0{,}20x + 22";
  passe(19, F19, [[350, "99.5"], [250, "74.5"]]);
  // ⛔ Sans ces deux phrases, un abonnement faux ÉCRIT dans le corrigé passait
  // (la casse « 0,25x + 14 » l'a montré, 22/09) : `passe` ne lisait que ma formule.
  dit(19, "donc $b = 12$ €");
  dit(19, "Ainsi $F(x) = 0{,}25x + 12$");
  egalites(19, "\\dfrac{99{,}50 - 74{,}50}{350 - 250} = \\dfrac{25}{100} = 0{,}25");
  egalites(19, "45 + 12 = 57");
  vaut(19, `${F19} - (${G19})`, "0{,}05x - 10", "$F(x) - G(x) = 0{,}05x - 10$");
  juste(19, { 0: `${F19} - (${G19})` });
  ensemble(19, "G(x) < F(x) ⇔ x > 200", (x) => inf(val(G19, x), val(F19, x)), { de: 200, deInclus: false }, { de: 0, a: 600, pas: Q(5), phrase: "Au-delà de $200$ kWh" });

  const A20 = "0{,}20x + 1";
  const B20 = "0{,}30x";
  v.ok("20. A(25) = 6 € et B(25) = 7,50 €", egal(val(A20, 25), Q(6)) && egal(val(B20, 25), D("7,5")));
  seule(20, `${A20} - ${B20}`, 0, 10, "donc $t = 10$");
  v.ok("20. à 10 minutes, les deux coûtent 3 €", egal(val(A20, 10), Q(3)) && c(20).includes("coûtent $3$ €"));
  juste(20, { 0: `${B20} - (${A20})` });
  const [A20c, B20c] = courbes(20, "schema");
  memeCourbe(20, A20c, A20, "20. la droite bleue (A)");
  memeCourbe(20, B20c, B20, "20. la droite orange (B)");
}

lancer({
  nom: "LES FONCTIONS AFFINES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-affines.tsx",
  notionId: "fonctions_affines_2de",
  verifier,
  casses: [
    ["ex. 2 : le signe de −8 + 6 perdu", "= -8 + 6 = -2$", "= -8 + 6 = 2$"],
    ["ex. 3 : la droite de l'énoncé modifiée", "const DROITE_3: Courbe[] = [{ q: [0, 2, -1] }];", "const DROITE_3: Courbe[] = [{ q: [0, 2, 1] }];"],
    ["ex. 4 : un b faux", "Ainsi $f(x) = -2x + 5$", "Ainsi $f(x) = -2x + 3$"],
    ["ex. 5 : le signe de ax + b retourné", "[[\"$-2x + 7$\", [\"+\", \"-\"], [\"0\"]]]", "[[\"$-2x + 7$\", [\"-\", \"+\"], [\"0\"]]]"],
    ["ex. 7 : −40 devenu 40", "donc $c = -40$", "donc $c = 40$"],
    ["ex. 9 : la fraction retournée", "= \\\\dfrac{8}{3}$.\\n⭐", "= \\\\dfrac{3}{8}$.\\n⭐"],
    ["ex. 10 : le sens gardé en divisant par −0,8", "$]{-\\\\infty}\\\\,;\\\\,2{,}5]$", "$[2{,}5\\\\,;\\\\,+\\\\infty[$"],
    ["ex. 11 : le moins oublié devant g(x)", "$f(x) - g(x) = 2x - 3 + x - 6 = 3x - 9$", "$f(x) - g(x) = 2x - 3 - x + 6 = x + 3$"],
    ["ex. 13 : la droite orange de l'énoncé modifiée", "{ q: [0, 1.5, -2], couleur: ORANGE }", "{ q: [0, 1.5, -1], couleur: ORANGE }"],
    ["ex. 14 : une durée fausse", "donc $t = 10$ minutes", "donc $t = 12$ minutes"],
    ["ex. 17 : l'ébullition au mont Blanc", "= 100 - 16 = 84$", "= 100 - 16 = 86$"],
    ["ex. 18 : la distance de l'orage", "343 \\\\times 6 = 2\\\\,058", "343 \\\\times 6 = 2\\\\,048"],
    ["ex. 19 : l'abonnement faux", "Ainsi $F(x) = 0{,}25x + 12$", "Ainsi $F(x) = 0{,}25x + 14$"],
    ["ex. 20 : le tableau de signes retourné", "[[\"$B(t) - A(t)$\", [\"-\", \"+\"]", "[[\"$B(t) - A(t)$\", [\"+\", \"-\"]"],
  ],
});
