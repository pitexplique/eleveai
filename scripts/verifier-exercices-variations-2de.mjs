// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Variations et
// extremums » de seconde (lib/fiches-exercices/maths-seconde-variations.tsx).
//
// ⭐ L'AUTRE CHEMIN : un tableau de variations n'est jamais recopié. Il est
// RELU dans le source et confronté à la fonction qu'il résume — la formule, ou
// la courbe dessinée — borne par borne, puis flèche par flèche sur une grille.
// Ce qu'on en lit (maximum, minimum, nombre de solutions) est recalculé sur ses
// nombres, et doit être la phrase écrite dans le corrigé.
//
//   node scripts/verifier-exercices-variations-2de.mjs

import { Q, D, egal, inf, plus, moins, fois, div, evalTex, lireFeuille, outilsAlgebre, outilsCourbes, outilsEgalites, lireTableauVariations, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, e, dit, vaut } = outilsAlgebre(v, f);
  const { courbes, tableauDe, controlerTout, tableauVariationsDe, accord } = outilsCourbes(v, f, source);
  const egalites = outilsEgalites(v, f);
  const val = (t, x) => evalTex(t, nb(x));
  const formule = (t) => (x) => evalTex(t, x);
  const memeCourbe = (k, F, t, quoi) => v.ok(`${k}. ${quoi} est celle de ${t}`, [-3, -2, -1, 0, 1, 2, 3].map((n) => Q(n)).concat([Q(1, 2)]).every((x) => egal(F(x), val(t, x))));
  const tx = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);
  /** Le max et le min LUS dans le tableau sont-ils ceux du corrigé ? */
  const extremums = (k, t, { max, enMax, min, enMin }) => {
    const l = lireTableauVariations(t);
    const memes = (xs, ys) => xs.length === ys.length && ys.every((y) => xs.some((x) => egal(x, nb(y))));
    v.ok(`${k}. le tableau donne max ${max} en ${enMax}, min ${min} en ${enMin}`, egal(l.max, nb(max)) && memes(l.enMax, enMax) && egal(l.min, nb(min)) && memes(l.enMin, enMin), `lu : max ${tx(l.max)} en ${l.enMax.map(tx)}, min ${tx(l.min)} en ${l.enMin.map(tx)}`);
  };
  /** Nombre de changements de signe de F − k sur [a ; b] (grille de 1/64). */
  const traversees = (F, k, a, b) => {
    let n = 0;
    let prec = null;
    for (let x = nb(a); !inf(nb(b), x); x = plus(x, Q(1, 64))) {
      const s = inf(F(x), nb(k)) ? -1 : inf(nb(k), F(x)) ? 1 : 0;
      if (s !== 0 && prec !== null && s !== prec) n++;
      if (s !== 0) prec = s;
    }
    return n;
  };

  controlerTout();

  v.titre("★ Un seul geste");
  const [F1] = courbes(1);
  memeCourbe(1, F1, "x^2 + 2x - 3", "1. la courbe de l'énoncé");
  accord(1, tableauVariationsDe(1, "schema"), F1, "le tableau du corrigé résume la courbe de l'énoncé");
  dit(1, "décroissante sur $[-4\\,;\\,-1]$ et croissante sur $[-1\\,;\\,2]$");
  dit(1, "$f(-4) = 5$, $f(-1) = -4$ et $f(2) = 5$");

  const t2 = tableauVariationsDe(2);
  const l2 = lireTableauVariations(t2);
  v.ok("2. le tableau monte sur [0 ; 3], descend sur [−4 ; 0] et [3 ; 5]", JSON.stringify(l2.morceaux(1).map((m) => m.map(tx))) === '[["0","3"]]' && JSON.stringify(l2.morceaux(-1).map((m) => m.map(tx))) === '[["-4","0"],["3","5"]]');
  dit(2, "croissante sur $[0\\,;\\,3]$");
  dit(2, "décroissante sur $[-4\\,;\\,0]$ et sur $[3\\,;\\,5]$");
  extremums(2, t2, { max: 4, enMax: [3], min: -3, enMin: [0] });
  dit(2, "le maximum vaut $4$, atteint en $x = 3$");
  dit(2, "le minimum vaut $-3$, atteint en $x = 0$");

  v.ok("3. 2,05 < 2,5 et √2 ≈ 1,414 < 1,5", inf(D("2,05"), D("2,5")) && Math.SQRT2 < 1.5 && Math.abs(Math.SQRT2 - 1.414) < 0.0005);
  dit(3, "$f(-3) < f(1)$");
  dit(3, "$f(2{,}05) < f(2{,}5)$");
  dit(3, "$g(\\sqrt{2}) > g(1{,}5)$");

  const t4 = tableauVariationsDe(4);
  extremums(4, t4, { max: 7, enMax: [1], min: -4, enMin: [6] });
  dit(4, "le maximum vaut $7$, atteint en $x = 1$");
  dit(4, "Le minimum vaut $-4$, atteint en $x = 6$");

  const [F5, G5] = courbes(5, "schema");
  memeCourbe(5, F5, "4x - 7", "5. la droite bleue");
  memeCourbe(5, G5, "-2x + 5", "5. la droite orange");
  vaut(5, "3 - \\dfrac{x}{2}", "-\\dfrac{1}{2}x + 3", "$h(x) = -\\dfrac{1}{2}x + 3$");
  dit(5, "$f$ est croissante sur $\\mathbb{R}$");
  dit(5, "$g$ est décroissante sur $\\mathbb{R}$");
  dit(5, "$h$ est décroissante");
  dit(5, "$k$ est constante");

  const t6 = tableauVariationsDe(6, "schema");
  v.ok("6. le tableau reprend l'énoncé : u(0) = 5, u(3) = −1, u(8) = 7", e(6).includes("$u(0) = 5$, $u(3) = -1$ et $u(8) = 7$") && JSON.stringify(t6.bornes.map(tx)) === '["0","3","8"]' && JSON.stringify(t6.valeurs.map(tx)) === '["5","-1","7"]');
  extremums(6, t6, { max: 7, enMax: [8], min: -1, enMin: [3] });
  dit(6, "Le minimum vaut $-1$, atteint en $x = 3$");
  dit(6, "Le maximum vaut $7$, atteint en $x = 8$");

  const t7 = tableauVariationsDe(7);
  const [A7, B7] = courbes(7, "schema");
  accord(7, t7, A7, "la courbe bleue a le tableau de l'énoncé");
  accord(7, t7, B7, "la courbe orange a le même tableau");
  v.ok("7. et elles se contredisent : bleue f(0) < f(4), orange f(0) > f(4)", inf(A7(Q(0)), A7(Q(4))) && inf(B7(Q(4)), B7(Q(0))));
  dit(7, "$f(-1) < f(1)$");
  dit(7, "$f(3) > f(5)$");

  const t8 = tableauVariationsDe(8);
  const l8 = lireTableauVariations(t8);
  v.ok("8. a) vrai : [−4 ; −1] descend ; b) faux : f(−1) = −2 < 0 ; c) faux : le min vaut −2 ; d) vrai : 4 atteint une fois", JSON.stringify(l8.morceaux(-1).map((m) => m.map(tx))) === '[["-4","-1"]]' && egal(l8.min, Q(-2)) && egal(l8.enMin[0], Q(-1)) && l8.solutions(Q(4)) === 1);
  for (const p of ["a) VRAI", "b) FAUX", "c) FAUX", "d) VRAI"]) dit(8, p);
  const [F8] = courbes(8, "schema");
  accord(8, t8, F8, "la courbe possible a bien ce tableau");
  v.ok("8. l'horizontale y = 4 coupe la courbe possible une fois, en x = 2", traversees(F8, 4, -4, 4) === 1 && egal(F8(Q(2)), Q(4)));

  v.titre("★★ Type devoir");
  const paires = [[-3, 1], [0, 2], [Q(1, 2), 5], [-7, -2]];
  v.ok("9. f(b) − f(a) = −3(b − a) < 0 pour tous les a < b essayés", paires.every(([a, b]) => { const d = moins(val("-3x + 2", b), val("-3x + 2", a)); return egal(d, fois(Q(-3), moins(nb(b), nb(a)))) && inf(d, Q(0)); }));
  dit(9, "$f(b) - f(a) = (-3b + 2) - (-3a + 2) = -3b + 3a = -3(b - a)$");
  dit(9, "$-3(b - a) < 0$");
  memeCourbe(9, courbes(9, "schema")[0], "-3x + 2", "9. la droite du corrigé");

  vaut(10, "(x - 3)^2 + 2", "x^2 - 6x + 11", "$(x - 3)^2 + 2 = x^2 - 6x + 9 + 2 = x^2 - 6x + 11$");
  v.ok("10. f(3) = 2, et f(x) − 2 = (x − 3)² ≥ 0", egal(val("x^2 - 6x + 11", 3), Q(2)) && [-5, 0, 3, 8].every((x) => !inf(val("x^2 - 6x + 11", x), Q(2))));
  dit(10, "Le minimum de $f$ vaut $2$, atteint en $x = 3$");
  memeCourbe(10, courbes(10, "schema")[0], "x^2 - 6x + 11", "10. la courbe du corrigé");

  const [F11] = courbes(11);
  memeCourbe(11, F11, "x^3 - 3x^2 + 2", "11. la courbe de l'énoncé");
  const t11 = tableauVariationsDe(11, "schema");
  accord(11, t11, F11, "le tableau du corrigé résume la courbe de l'énoncé");
  extremums(11, t11, { max: 2, enMax: [0, 3], min: -2, enMin: [-1, 2] });
  v.ok("11. f(x) = 1 : trois solutions, comptées sur le tableau ET sur la courbe", lireTableauVariations(t11).solutions(Q(1)) === 3 && traversees(F11, 1, -1, 3) === 3);
  dit(11, "L'équation $f(x) = 1$ a TROIS solutions");

  const [F12] = courbes(12, "schema");
  accord(12, { bornes: [Q(-6), Q(-2), Q(4)], valeurs: [F12(Q(-6)), Q(-5), F12(Q(4))] }, F12, "la courbe possible décroît sur [−6 ; −2], croît sur [−2 ; 4], passe par (−2 ; −5)");
  v.ok("12. sur la courbe possible : f(−5) > f(−3) et f(0) < f(3)", inf(F12(Q(-3)), F12(Q(-5))) && inf(F12(Q(0)), F12(Q(3))));
  dit(12, "$f(-5) > f(-3)$");
  dit(12, "$f(0) < f(3)$");

  const t13 = tableauVariationsDe(13);
  const l13 = lireTableauVariations(t13);
  v.ok("13. solutions comptées : 2 → 3, 5 → 1, −4 → 0", l13.solutions(Q(2)) === 3 && l13.solutions(Q(5)) === 1 && l13.solutions(Q(-4)) === 0);
  extremums(13, t13, { max: 6, enMax: [4], min: -3, enMin: [-5] });
  for (const p of ["TROIS solutions", "UNE solution", "AUCUNE solution", "Le maximum vaut $6$, atteint en $x = 4$", "Le minimum vaut $-3$, atteint en $x = -5$"]) dit(13, p);
  const [F13] = courbes(13, "schema");
  accord(13, t13, F13, "la courbe possible a bien ce tableau");

  const [H14] = courbes(14);
  const t14 = tableauVariationsDe(14, "schema");
  accord(14, t14, H14, "le tableau du corrigé résume la courbe de la crue");
  extremums(14, t14, { max: 6, enMax: [4], min: 1, enMin: [0] });
  v.ok("14. h(t) = 4 en t = 3 et t = 6 seulement : 3 heures au-dessus de 4 m", egal(H14(Q(3)), Q(4)) && egal(H14(Q(6)), Q(4)) && traversees(H14, 4, 0, 10) === 2);
  dit(14, "soit pendant $3$ heures");
  dit(14, "$h(1) < h(3)$");
  dit(14, "$h(5) > h(9)$");

  const g15 = "2 - (x + 1)^2";
  egalites(15, "2 - (-3)^2 = 2 - 9 = -7");
  egalites(15, "2 - 3^2 = 2 - 9 = -7");
  v.ok("15. g(−4) = g(2) = −7 et g(−1) = 2", egal(val(g15, -4), Q(-7)) && egal(val(g15, 2), Q(-7)) && egal(val(g15, -1), Q(2)));
  memeCourbe(15, courbes(15, "schema")[0], g15, "15. la courbe du corrigé");
  accord(15, tableauVariationsDe(15, "schema"), formule(g15), "le tableau du corrigé résume g");
  dit(15, "Le maximum vaut $2$, atteint en $x = -1$");

  const [U16, V16] = courbes(16, "schema");
  memeCourbe(16, U16, "x + 1", "16. la courbe bleue");
  memeCourbe(16, V16, "0{,}25x^2 + 1", "16. la courbe orange");
  const t16 = tableauVariationsDe(16, "schema");
  accord(16, t16, U16, "u a le tableau de f");
  accord(16, t16, V16, "v a le même tableau");
  egalites(16, "0{,}25 \\times 16 + 1 = 5");
  egalites(16, "0{,}25 \\times 4 + 1 = 2");
  dit(16, "$u(2) = 3$");
  dit(16, "$1 < f(2) < 5$");

  v.titre("★★★ Problèmes");
  const cumul = [1.89, 2.88, 3.78, 4.64, 5.47, 6.29, 7.1, 7.92, 8.75, 9.58];
  const temps = cumul.map((t, i) => Math.round((t - (i ? cumul[i - 1] : 0)) * 100) / 100);
  const t17 = tableauDe(17);
  v.ok("17. le tableau = les temps de passage officiels de Berlin 2009, tranche par tranche", t17.ligne.slice(1).every((s, i) => Number(s.replace(",", ".")) === temps[i]) && t17.ligne.length === 11, JSON.stringify(temps));
  const vit = temps.map((t) => 10 / t);
  const r2 = (x) => (Math.round(x * 100) / 100).toFixed(2).replace(".", "{,}");
  v.ok("17. vitesses : 5,29 m/s au départ, 12,35 m/s de 60 à 70 m ; puis 12,20 et 12,05", c(17).includes(`\\approx ${r2(vit[0])}$ m/s`) && c(17).includes(`\\approx ${r2(vit[6])}$ m/s`) && c(17).includes(`$${r2(vit[7])}$ m/s`) && c(17).includes(`$${r2(vit[8])}$ m/s`));
  v.ok("17. la vitesse croît jusqu'à la 7e tranche (temps strictement décroissants), puis décroît", temps.slice(0, 7).every((t, i) => i === 0 || t < temps[i - 1]) && temps[7] > temps[6] && Math.min(...temps) === temps[6]);
  v.ok("17. 10 ÷ 0,81 × 3,6 ≈ 44,4 km/h", Math.abs((10 / 0.81) * 3.6 - 44.4) < 0.05 && c(17).includes("\\approx 44{,}4$ km/h"));
  const [V17] = courbes(17, "schema");
  v.ok("17. la courbe du corrigé porte les vitesses arrondies", vit.every((x, i) => Math.abs(Number(V17(Q(i + 1)).n) / Number(V17(Q(i + 1)).d) - Math.round(x * 100) / 100) < 1e-9));

  vaut(18, "x(18 - x)", "81 - (x - 9)^2", "$A(x) = x(18 - x) = 18x - x^2$");
  vaut(18, "81 - (x - 9)^2", "18x - x^2", "$81 - (x - 9)^2 = 81 - x^2 + 18x - 81 = 18x - x^2$");
  accord(18, tableauVariationsDe(18, "schema"), formule("x(18 - x)"), "le tableau du corrigé résume A");
  dit(18, "L'aire maximale vaut $81$ m², pour $x = 9$");

  const [P19] = courbes(19);
  const t19 = tableauVariationsDe(19, "schema");
  accord(19, t19, P19, "le tableau (avec ses deux paliers) résume la courbe de l'éolienne");
  v.ok("19. P(5) < P(8) ; P(14) = P(22) = 3 ; P(12) ÷ P(6) = 6", inf(P19(Q(5)), P19(Q(8))) && egal(P19(Q(14)), Q(3)) && egal(P19(Q(22)), Q(3)) && egal(div(P19(Q(12)), P19(Q(6))), Q(6)));
  dit(19, "$P(5) < P(8)$");
  dit(19, "$P(14) = P(22) = 3$");
  dit(19, "la puissance est multipliée par $6$");

  const t20 = tableauVariationsDe(20);
  extremums(20, t20, { max: "152,1", enMax: [183], min: "147,1", enMin: [0, 365] });
  egalites(20, "152{,}1 - 147{,}1 = 5");
  v.ok("20. 5 ÷ 147,1 ≈ 0,034, soit 3,4 %", Math.abs(5 / 147.1 - 0.034) < 0.0005 && c(20).includes("\\approx 0{,}034$") && c(20).includes("$3{,}4$ %"));
  const j = new Date(Date.UTC(2026, 0, 3 + 183));
  v.ok("20. 3 janvier + 183 jours = 5 juillet", j.getUTCMonth() === 6 && j.getUTCDate() === 5 && c(20).includes("le 5 juillet"));
  dit(20, "$d(30) < d(90)$");
  dit(20, "$d(200) > d(300)$");
}

lancer({
  nom: "VARIATIONS ET EXTREMUMS · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-variations.tsx",
  notionId: "fonction_variations_extremums",
  verifier,
  casses: [
    ["ex. 1 : une valeur fausse dans le tableau du corrigé", "tableauVariations([-4, -1, 2], [5, -4, 5])", "tableauVariations([-4, -1, 2], [5, -3, 5])"],
    ["ex. 2 : l'abscisse donnée pour le maximum", "le maximum vaut $4$, atteint en $x = 3$", "le maximum vaut $3$, atteint en $x = 4$"],
    ["ex. 4 : le minimum pris au mauvais bord", "Le minimum vaut $-4$, atteint en $x = 6$", "Le minimum vaut $2$, atteint en $x = -3$"],
    ["ex. 7 : la courbe orange ne respecte plus le tableau", "[[-2, 0], [0, 4], [2, 5], [4, 2], [6, 1]]", "[[-2, 0], [0, 4], [2, 3], [4, 2], [6, 1]]"],
    ["ex. 8 : le tableau de l'énoncé changé", "tableauVariations([-4, -1, 4], [3, -2, 8])", "tableauVariations([-4, -1, 4], [5, -2, 8])"],
    ["ex. 10 : la forme canonique fausse", "$(x - 3)^2 + 2 = x^2 - 6x + 9 + 2 = x^2 - 6x + 11$", "$(x - 3)^2 + 2 = x^2 - 6x + 9 + 2 = x^2 - 6x + 13$"],
    ["ex. 11 : la courbe de l'énoncé modifiée", "const COURBE_11: Courbe[] = [{ p: [1, -3, 0, 2] }];", "const COURBE_11: Courbe[] = [{ p: [1, -3, 0, 3] }];"],
    ["ex. 13 : le sommet local pris pour le maximum", "Le maximum vaut $6$, atteint en $x = 4$", "Le maximum vaut $4$, atteint en $x = -2$"],
    ["ex. 14 : le pic de crue déplacé", "[4, 6], [7, 3]", "[4, 5], [7, 3]"],
    ["ex. 15 : g(−4) faux", "$g(-4) = 2 - (-3)^2 = 2 - 9 = -7$", "$g(-4) = 2 - (-3)^2 = 2 - 9 = -5$"],
    ["ex. 17 : un temps de passage recopié faux", "\"0,86\", \"0,83\", \"0,82\", \"0,81\"", "\"0,86\", \"0,85\", \"0,82\", \"0,81\""],
    ["ex. 19 : le palier du tableau dessiné en pente", "tableauVariations([0, 3, 12, 25], [0, 0, 3, 3], \"P\", \"v\")", "tableauVariations([0, 3, 12, 25], [0, 0, 3, 4], \"P\", \"v\")"],
    ["ex. 20 : un pourcentage faux", "$3{,}4$ %", "$3{,}2$ %"],
  ],
});
