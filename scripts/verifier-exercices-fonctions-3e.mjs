// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Fonctions : image et
// antécédent » de 3e (lib/fiches-exercices/maths-3e-fonctions.tsx).
//
// ⭐ L'AUTRE CHEMIN :
//   · une image calculée : chaque membre de la chaîne écrite est réévalué en
//     fractions exactes, et le premier doit être l'image par la formule ;
//   · une image lue : la courbe est RELUE dans le source (coefficients, points)
//     et évaluée au point demandé ;
//   · des antécédents lus : l'horizontale est balayée sur une grille de 1/8,
//     changements de signe compris — « deux, trois ou aucun » se compte ;
//   · un tableau : chaque case est recalculée par la formule, ou par la courbe
//     dont il est tiré, et les antécédents sont retrouvés en le parcourant.
//
//   node scripts/verifier-exercices-fonctions-3e.mjs

import { Q, D, egal, inf, plus, moins, evalTex, lireFeuille, outilsAlgebre, outilsCourbes, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : D(String(x).replace(/−/g, "-")));
const txt = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, vaut, solutions } = outilsAlgebre(v, f);
  const { courbes, controlerTout, consts } = outilsCourbes(v, f, source);
  const egalites = outilsEgalites(v, f);
  const formule = (t) => (x) => evalTex(t, nb(x));

  /** Tous les `tableau([entête], [ligne])` de l'exercice k, dans l'ordre. */
  const tableaux = (k) =>
    [...(f.blocs[k - 1] ?? "").matchAll(/\btableau\((\[[^\]]*\]), (\[[^\]]*\])/g)].map((m) => ({
      entete: JSON.parse(m[1].replace(/−/g, "-")),
      ligne: JSON.parse(m[2].replace(/−/g, "-")),
    }));
  /** Chaque case remplie du tableau vaut-elle F(x) ? */
  const tableauJuste = (k, t, F, quoi) => {
    const fautes = t.entete.slice(1).filter((x, i) => t.ligne[i + 1] !== "…" && !egal(F(nb(x)), nb(t.ligne[i + 1])));
    v.ok(`${k}. ${quoi}`, fautes.length === 0, `cases fausses sous ${fautes.join(", ")}`);
  };
  /** Les x du tableau dont l'image est y — en le parcourant. */
  const anteTableau = (t, y) => t.entete.slice(1).filter((_, i) => t.ligne[i + 1] !== "…" && egal(nb(t.ligne[i + 1]), nb(y))).map(Number);
  /** Une image lue ou calculée, et la phrase qui la dit. */
  const image = (k, F, x, y, phrase) => v.ok(`${k}. image de ${x} : ${y} — « ${phrase} »`, egal(F(nb(x)), nb(y)) && c(k).includes(phrase), `calculé ${txt(F(nb(x)))}`);
  /** Sur [de ; a], F(x) = kv exactement en `sols` (grille de 1/8, sans racine cachée entre deux points). */
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
  /** Sur [de ; a], l'ensemble où F ≥ seuil est exactement [g ; d]. */
  const auDessus = (k, quoi, F, seuil, [g, d], [de, a]) => {
    const fautes = [];
    for (let x = nb(de); !inf(nb(a), x); x = plus(x, Q(1, 8))) {
      const dedans = !inf(x, nb(g)) && !inf(nb(d), x);
      if (!inf(F(x), nb(seuil)) !== dedans) fautes.push(txt(x));
    }
    v.ok(`${k}. ${quoi}`, fautes.length === 0, `désaccord en ${fautes.slice(0, 3).join(", ")}`);
  };
  const memeCourbe = (k, F, G, quoi, xs = [-3, -2, -1, 0, 1, 2, 3, "0.5"]) => v.ok(`${k}. ${quoi}`, xs.every((x) => egal(F(nb(x)), G(nb(x)))));

  controlerTout();

  v.titre("★ Un seul geste");
  const t1 = tableaux(1)[0];
  v.ok("1. le tableau dit f(−1) = 9 et f(4) = 9", JSON.stringify(anteTableau(t1, 9)) === "[-1,4]");
  dit(1, "l'image de $4$ est $9$.");
  dit(1, "$4$ et $-1$ sont deux antécédents de $9$");
  dit(1, "c) Non.");
  dit(1, "d) Non.");
  dit(1, "e) Oui");

  const f2 = formule("2x^2 - 5");
  egalites(2, "2 \\times 0^2 - 5 = -5");
  egalites(2, "2 \\times (-3)^2 - 5 = 2 \\times 9 - 5 = 13");
  egalites(2, "2 \\times 1{,}5^2 - 5 = 2 \\times 2{,}25 - 5 = -0{,}5");
  image(2, f2, 0, -5, "$f(0) = -5$");
  image(2, f2, -3, 13, "$f(-3) = 13$");
  image(2, f2, "1.5", "-0.5", "$f(1{,}5) = -0{,}5$");
  egalites(2, "(2 \\times (-3))^2 = 36");
  v.ok("2. le piège donne autre chose : 36 − 5 ≠ 13", !egal(Q(36 - 5), f2(-3)));
  tableauJuste(2, tableaux(2)[0], f2, "le tableau du corrigé donne les images de 2x² − 5");

  const f3 = formule("3x - 7");
  egalites(3, "3 \\times 5 - 7 = 8");
  for (const [k, x] of [[11, (11 + 7) / 3], [-1, (-1 + 7) / 3]]) {
    v.ok(`3. l'antécédent de ${k} est ${x}`, egal(f3(x), Q(k)) && Number.isInteger(x));
    egalites(3, `3 \\times ${x} - 7 = ${k}`);
  }
  dit(3, "$x = 6$");
  dit(3, "donc $x = 2$");
  egalites(3, "3 \\times 11 - 7 = 26");
  tableauJuste(3, tableaux(3)[0], f3, "le tableau du corrigé donne les images de 3x − 7");

  const t4 = tableaux(4)[0];
  const [F4] = courbes(4, "schema");
  tableauJuste(4, t4, F4, "le tableau du tableur est celui de la courbe du corrigé (x² − 4x + 2)");
  memeCourbe(4, F4, formule("x^2 - 4x + 2"), "la courbe du corrigé est x² − 4x + 2");
  image(4, (x) => nb(t4.ligne[t4.entete.indexOf(String(x.n)) ]), 1, -1, "$f(1) = -1$");
  image(4, (x) => nb(t4.ligne[t4.entete.indexOf(String(x.n))]), 4, 2, "$f(4) = 2$");
  v.ok("4. antécédents de −1 : 1 et 3", JSON.stringify(anteTableau(t4, -1)) === "[1,3]" && c(4).includes("Les antécédents de $-1$ sont $1$ et $3$"));
  v.ok("4. antécédents de 7 : −1 et 5", JSON.stringify(anteTableau(t4, 7)) === "[-1,5]" && c(4).includes("ses antécédents sont $-1$ et $5$"));
  v.ok("4. antécédents de −2 : un seul, 2", JSON.stringify(anteTableau(t4, -2)) === "[2]" && c(4).includes("un seul antécédent, $2$"));

  const [F5] = courbes(5);
  memeCourbe(5, F5, courbes(5, "schema")[0], "la courbe du corrigé est celle de l'énoncé");
  image(5, F5, 0, 1, "$h(0) = 1$");
  image(5, F5, 1, 4, "$h(1) = 4$");
  image(5, F5, 2, 5, "$h(2) = 5$");
  v.ok("5. 5 est le maximum de la courbe sur [0 ; 4]", [0, 1, 3, 4, "1.5", "2.5"].every((x) => inf(F5(nb(x)), Q(5))));

  const [F6] = courbes(6);
  lecture(6, "g(x) = 2 : x = 1 et x = 3", F6, 2, [1, 3], [-2, 5], "en $x = 1$ et en $x = 3$");
  lecture(6, "g(x) = 3 : x = 2 seulement", F6, 3, [2], [-2, 5], "un seul antécédent, $2$");
  lecture(6, "g(x) = 4 : aucune solution", F6, 4, [], [-2, 5], "AUCUN antécédent");
  lecture(6, "g(x) = 0 : x = −1,5, 0 et 4", F6, 0, ["-1.5", 0, 4], [-2, 5], "en $x = -1{,}5$, en $x = 0$ et en $x = 4$");

  const t7 = tableaux(7)[0];
  const ecrites7 = [...c(7).matchAll(/\$g\((-?\d+)\) = (-?\d+)\$/g)].map((m) => [Number(m[1]), Number(m[2])]);
  const attendu7 = [[2, 7], [3, -1], [0, 5], [4, 0]];
  v.ok("7. les quatre égalités : g(2) = 7, g(3) = −1, g(0) = 5, g(4) = 0", attendu7.every(([a, b]) => ecrites7.some(([x, y]) => x === a && y === b)) && ecrites7.every(([x, y]) => attendu7.some(([a, b]) => x === a && y === b) || (x === -1 && y === 3)), JSON.stringify(ecrites7));
  v.ok("7. le tableau porte les mêmes couples", attendu7.every(([a, b]) => anteTableau(t7, b).includes(a)));
  dit(7, "sort : $g(3) = -1$.", "b) g(3) = −1, à sa place");
  dit(7, "Réponse : $g(2) = 7$ ; $g(3) = -1$ ; $g(0) = 5$ ; $g(4) = 0$.");

  const fs8 = { f: "4x", g: "2x + 3", h: "x^2", k: "5 - x" };
  const affine = (t) => { const F = formule(t); const d1 = moins(F(1), F(0)); return [2, 3, -1, 5].every((x) => egal(moins(F(x), F(x - 1)), d1)); };
  const lineaire = (t) => affine(t) && egal(formule(t)(0), Q(0));
  v.ok("8. affines : f, g, k ; linéaire : f seule ; h ni l'une ni l'autre", ["f", "g", "k"].every((n) => affine(fs8[n])) && !affine(fs8.h) && lineaire(fs8.f) && !lineaire(fs8.g) && !lineaire(fs8.k) && egal(formule(fs8.h)(0), Q(0)));
  for (const [n, t] of Object.entries(fs8)) dit(8, `$${n}(0) = ${txt(formule(t)(0))}$`);
  dit(8, "seule $f$ est linéaire");
  const r8 = courbes(8, "schema");
  memeCourbe(8, r8[0], formule("4x"), "le bleu du schéma est f(x) = 4x");
  memeCourbe(8, r8[1], formule("2x + 3"), "l'orange du schéma est g(x) = 2x + 3");
  memeCourbe(8, r8[2], formule("x^2"), "le vert du schéma est h(x) = x²");

  v.titre("★★ Type devoir");
  const [T9] = courbes(9);
  image(9, T9, 0, -1, "$T(0) = -1$");
  image(9, T9, 10, 3, "$T(10) = 3$");
  lecture(9, "T(x) = −3 : 4 h et 6 h", T9, -3, [4, 6], [0, 12], "en $x = 4$ et en $x = 6$");
  const min9 = consts.TEMPERATURE_9[0].pts.reduce((m, p) => (p[1] < m[1] ? p : m));
  v.ok(`9. minimum ${min9[1]} °C à ${min9[0]} h`, min9[0] === 5 && min9[1] === -4 && c(9).includes("le minimum est $-4$ °C, atteint à $5$ h"));
  lecture(9, "T(x) = 0 : 8 h seulement", T9, 0, [8], [0, 12], "$T(8) = 0$ : à $8$ h");
  image(9, T9, 12, 4, "$T(12) = 4$");

  const [F10] = courbes(10);
  const verdicts10 = [
    egal(F10(Q(0)), Q(-2)),
    egal(F10(Q(-2)), Q(0)),
    true,
    egal(F10(Q(2)), Q(0)),
    false,
  ];
  lecture(10, "f(x) = 4 : −2 et 3 exactement", F10, 4, [-2, 3], [-3, 4], "d'abscisses $-2$ et $3$");
  lecture(10, "f(x) = −3 : aucune solution", F10, -3, [], [-3, 4]);
  v.ok("10. le minimum est −2,25 (en 0,5), au-dessus de −3", egal(F10(Q(1, 2)), Q(-9, 4)) && c(10).includes("$-2{,}25$"));
  image(10, F10, -2, 4, "$f(-2) = 4$");
  ["a", "b", "c", "d", "e"].forEach((l, i) => dit(10, `${l}) ${verdicts10[i] ? "VRAI" : "FAUX"}.`));

  const [fig11, sch11] = tableaux(11);
  const f11 = formule("x^2 - 2x");
  tableauJuste(11, fig11, f11, "les cases remplies du tableur sont celles de x² − 2x");
  tableauJuste(11, sch11, f11, "le tableau complété du corrigé est celui de x² − 2x");
  const formules11 = { "=2*B1": (x) => 2 * x, "=B1*B1-2*B1": (x) => x * x - 2 * x, "=B1*2+B1": (x) => x * 2 + x };
  const bonnes11 = Object.entries(formules11).filter(([, F]) => fig11.entete.slice(1).every((x, i) => fig11.ligne[i + 1] === "…" || F(Number(x)) === fig11.ligne[i + 1])).map(([n]) => n);
  v.ok(`11. une seule formule colle au tableau : ${bonnes11.join()}`, bonnes11.length === 1 && bonnes11[0] === "=B1*B1-2*B1" && c(11).includes("La formule est « =B1*B1-2*B1 »"));
  v.ok("11. les trois formules donnent 0 en 0 (le piège)", Object.values(formules11).every((F) => F(0) === 0));
  egalites(11, "2 \\times (-2) = -4");
  egalites(11, "(-2) \\times (-2) - 2 \\times (-2) = 4 + 4 = 8");
  egalites(11, "(-2) \\times 2 + (-2) = -6");
  egalites(11, "10^2 - 2 \\times 10 = 100 - 20 = 80");
  image(11, f11, 1, -1, "$f(1) = 1 - 2 = -1$");
  image(11, f11, 2, 0, "$f(2) = 4 - 4 = 0$");
  v.ok("11. antécédents de 3 : −1 et 3 ; de 0 : 0 et 2", JSON.stringify(anteTableau(sch11, 3)) === "[-1,3]" && JSON.stringify(anteTableau(sch11, 0)) === "[0,2]" && c(11).includes("$-1$ et $3$, puis $0$ et $2$"));

  const f12 = formule("(x + 2)^2 - 9");
  memeCourbe(12, courbes(12, "schema")[0], f12, "la courbe du corrigé est (x + 2)² − 9");
  egalites(12, "(1 + 2)^2 - 9 = 9 - 9 = 0");
  egalites(12, "(-5 + 2)^2 - 9 = 9 - 9 = 0");
  egalites(12, "(0{,}5 + 2)^2 - 9 = 6{,}25 - 9 = -2{,}75");
  egalites(12, "(-2 + 2)^2 - 9 = 0 - 9 = -9");
  image(12, f12, 1, 0, "$f(1) = (1 + 2)^2");
  image(12, f12, -5, 0, "$f(-5) = (-5 + 2)^2");
  image(12, f12, "0.5", "-2.75", "$f(0{,}5) = (0{,}5 + 2)^2");
  image(12, f12, -2, -9, "$f(-2) = (-2 + 2)^2");
  solutions(12, "(x + 2)^2 - 9", "0", [1, -5], "$0$ a deux antécédents, $1$ et $-5$");
  lecture(12, "f(x) = −10 : aucune solution (minimum −9)", f12, -10, [], [-6, 2], "$-10$ n'a aucun antécédent");

  const t13 = tableaux(13)[0];
  const [H13] = courbes(13, "schema");
  tableauJuste(13, t13, H13, "le tableau de l'énoncé et les points du graphique disent la même chose");
  v.ok("13. H(4) = 7 dans le tableau", anteTableau(t13, 7).includes(4) && c(13).includes("$H(4) = 7$"));
  v.ok("13. antécédents de 7 dans le tableau : 4 et 8", JSON.stringify(anteTableau(t13, 7)) === "[4,8]" && c(13).includes("Les antécédents de $7$ sont $4$ et $8$"));
  auDessus(13, "H ≥ 7 exactement de 4 h à 8 h", H13, 7, [4, 8], [0, 12]);
  egalites(13, "8 - 4 = 4");
  image(13, H13, 5, "7.5", "$H(5) \\approx 7{,}5$ m");

  const [A14, B14, C14] = tableaux(14);
  const ratios = A14.entete.slice(1).map((x, i) => A14.ligne[i + 1] / Number(x));
  v.ok("14. A : rapport constant 3", ratios.every((r) => r === 3));
  tableauJuste(14, A14, formule("3x"), "A est le tableau de 3x");
  tableauJuste(14, B14, formule("2x + 2"), "B est le tableau de 2x + 2");
  tableauJuste(14, C14, formule("x^2"), "C est le tableau de x²");
  v.ok("14. B n'est pas proportionnel, C n'a pas un pas constant", B14.ligne[1] / 1 !== B14.ligne[2] / 2 && C14.ligne[2] - C14.ligne[1] !== C14.ligne[3] - C14.ligne[2]);
  egalites(14, "2 \\times 3 + 2 = 8");
  dit(14, "A est linéaire, $x \\mapsto 3x$ ; B est affine, $x \\mapsto 2x + 2$ ; C n'est pas affine");
  const r14 = courbes(14, "schema");
  memeCourbe(14, r14[0], formule("3x"), "le bleu du schéma est 3x");
  memeCourbe(14, r14[1], formule("2x + 2"), "l'orange du schéma est 2x + 2");
  memeCourbe(14, r14[2], formule("x^2"), "le vert du schéma est x²");

  const f15 = formule("x^2 - 6x + 10");
  egalites(15, "0 - 0 + 10 = 10");
  egalites(15, "9 - 18 + 10 = 1");
  egalites(15, "36 - 36 + 10 = 10");
  image(15, f15, 3, 1, "$f(3) = 9 - 18 + 10 = 1$");
  image(15, f15, 6, 10, "$f(6) = 36 - 36 + 10 = 10$");
  vaut(15, "(x - 3)^2 + 1", "x^2 - 6x + 10", "$(x - 3)^2 + 1 = x^2 - 6x + 9 + 1 = x^2 - 6x + 10$");
  solutions(15, "x^2 - 6x + 10", "5", [5, 1], "$x = 5$ ou $x = 1$");
  egalites(15, "25 - 30 + 10 = 5");
  lecture(15, "f(x) = 0 : aucune solution", f15, 0, [], [-1, 7], "$0$ n'a AUCUN antécédent");
  lecture(15, "f(x) = 1 : x = 3 seulement", f15, 1, [3], [-1, 7], "$1$ n'en a qu'un, $3$");
  memeCourbe(15, courbes(15, "schema")[0], f15, "la courbe du corrigé est x² − 6x + 10");

  const t16 = tableaux(16)[0];
  const doublons = t16.entete.slice(1).filter((x, i, l) => l.indexOf(x) !== i);
  v.ok("16. dans le tableau, 2 a deux valeurs différentes", doublons.join() === "2" && new Set(t16.entete.slice(1).map((x, i) => (x === "2" ? t16.ligne[i + 1] : null)).filter((y) => y !== null)).size === 2);
  v.ok("16. 3² = 9 et (−3)² = 9", 3 ** 2 === 9 && (-3) ** 2 === 9);
  ["a) Oui.", "b) Non.", "c) Non.", "d) Oui"].forEach((p) => dit(16, p));
  const [F16] = courbes(16, "schema");
  lecture(16, "x² = 4 : −2 et 2 (deux antécédents, permis)", F16, 4, [-2, 2], [-3, 3]);

  v.titre("★★★ Problèmes");
  const h17 = formule("-5x^2 + 15x");
  memeCourbe(17, courbes(17)[0], h17, "la courbe de l'énoncé est −5t² + 15t");
  memeCourbe(17, courbes(17, "schema")[0], h17, "la courbe du corrigé est −5t² + 15t");
  egalites(17, "-5 \\times 1^2 + 15 \\times 1 = -5 + 15 = 10");
  egalites(17, "-5 \\times 2^2 + 15 \\times 2 = -20 + 30 = 10");
  egalites(17, "-5 \\times 3^2 + 15 \\times 3 = -45 + 45 = 0");
  egalites(17, "-5 \\times 1{,}5^2 + 15 \\times 1{,}5 = -11{,}25 + 22{,}5 = 11{,}25");
  image(17, h17, "1.5", "11.25", "$h(1{,}5) = -5");
  solutions(17, "-5x^2 + 15x", "10", [1, 2], "à $1$ s et à $2$ s");
  solutions(17, "-5x^2 + 15x", "0", [0, 3], "Le ballon retombe au bout de $3$ s");
  auDessus(17, "h ≥ 10 exactement entre 1 s et 2 s", h17, 10, [1, 2], [0, 3]);
  egalites(17, "(-5 \\times 1)^2 = 25");

  const [A18] = courbes(18);
  const pts18 = consts.ALTITUDE_18[0].pts;
  image(18, A18, 0, 6, "$A(0) = 6$");
  image(18, A18, 10, 6, "$A(10) = 6$");
  image(18, A18, 4, 11, "$A(4) = 11$");
  v.ok("18. 11 est le point le plus haut", Math.max(...pts18.map((p) => p[1])) === 11);
  lecture(18, "A(x) = 10 : trois antécédents, 3, 5 et 8", A18, 10, [3, 5, 8], [0, 10], "en $x = 3$, $x = 5$ et $x = 8$");
  v.ok("18. 4 km à 4 km/h : 1 h, donc 9 h", 8 + 4 / 4 === 9 && c(18).includes("elle y passe à $9$ h"));
  const deniv = pts18.slice(1).reduce((s, p, i) => s + Math.max(0, p[1] - pts18[i][1]), 0) * 100;
  v.ok(`18. dénivelé positif recalculé : ${deniv} m`, deniv === 600 && c(18).includes(`$500 + 100 = ${deniv}$ m`));
  memeCourbe(18, A18, courbes(18, "schema")[0], "la courbe du corrigé est celle de l'énoncé", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const V = (x) => x * (12 - 2 * x) ** 2;
  const [fig19, sch19] = tableaux(19);
  tableauJuste(19, fig19, (x) => Q(V(Number(x.n) / Number(x.d))), "les cases données du tableau valent x(12 − 2x)²");
  tableauJuste(19, sch19, (x) => Q(V(Number(x.n) / Number(x.d))), "le tableau complété du corrigé vaut x(12 − 2x)²");
  egalites(19, "1 \\times (12 - 2)^2 = 1 \\times 100 = 100");
  egalites(19, "2 \\times (12 - 4)^2 = 2 \\times 64 = 128");
  egalites(19, "3 \\times (12 - 6)^2 = 3 \\times 36 = 108");
  v.ok("19. le plus grand volume du tableau : 128 en x = 2", Math.max(...sch19.ligne.slice(1)) === 128 && sch19.entete[sch19.ligne.indexOf(128)] === "2");
  let passages = 0;
  for (let i = 0; i < 6000; i++) {
    const [a, b] = [V(i / 1000) - 108, V((i + 1) / 1000) - 108];
    if (a === 0 || a * b < 0) passages++;
  }
  v.ok(`19. V(x) = 108 sur [0 ; 6] : ${passages} solutions, dont 3 et une entre 1 et 2`, passages === 2 && V(3) === 108 && V(1) < 108 && V(2) > 108 && c(19).includes("Deux valeurs de $x$ conviennent"));
  const [P19] = courbes(19, "schema");
  v.ok("19. la courbe du schéma est V ÷ 10 (dizaines de cm³)", [0, 1, 2, 3, 4, 5, 6].every((x) => egal(P19(Q(x)), div10(V(x)))));

  const [H20] = courbes(20);
  const pts20 = consts.CRUE_20[0].pts;
  image(20, H20, 0, 1, "$H(0) = 1$");
  const max20 = pts20.reduce((m, p) => (p[1] > m[1] ? p : m));
  v.ok(`20. maximum ${max20[1]} m à ${max20[0]} h`, max20[0] === 4 && max20[1] === 7 && c(20).includes("la hauteur maximale est $7$ m, atteinte $4$ h"));
  image(20, H20, 8, 4, "$8$ heures après le début de l'orage, l'eau est à $4$ m");
  lecture(20, "H(t) = 6 : 3 et 5", H20, 6, [3, 5], [0, 12], "les antécédents de $6$ sont $3$ et $5$");
  lecture(20, "H(t) = 5 : 2,5 et 6", H20, 5, ["2.5", 6], [0, 12], "à $t = 2{,}5$");
  auDessus(20, "vigilance (H ≥ 5) de 2,5 h à 6 h", H20, 5, ["2.5", 6], [0, 12]);
  egalites(20, "6 - 2{,}5 = 3{,}5");
  v.ok("20. montée 4 h, décrue 8 h : deux fois plus", max20[0] - pts20[0][0] === 4 && pts20.at(-1)[0] - max20[0] === 8 && pts20.at(-1)[1] === 1);
}

/** n ÷ 10 en fraction exacte. */
function div10(n) {
  return Q(Math.round(n), 10);
}

lancer({
  nom: "FONCTIONS : IMAGE ET ANTÉCÉDENT · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-fonctions.tsx",
  notionId: "fonction_generalite",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : l'image et l'antécédent échangés, déclaré juste", "c) Non. C'est la phrase", "c) Oui. C'est la phrase"],
    ["ex. 2 : le 2 élevé au carré avec x", "2 \\\\times 9 - 5 = 13$.", "2 \\\\times 9 - 5 = 31$."],
    ["ex. 3 : l'image de 11 au lieu de son antécédent", "puis je divise par $3$ : $x = 6$", "puis je divise par $3$ : $x = 26$"],
    ["ex. 4 : une case du tableur fausse", "[\"f(x)\", 7, 2, -1, -2, -1, 2, 7]", "[\"f(x)\", 7, 2, -1, -2, -1, 2, 6]"],
    ["ex. 5 : un point rouge hors de la courbe", "{ x: 1, y: 4 }, { x: 2, y: 5, label", "{ x: 1, y: 3 }, { x: 2, y: 5, label"],
    ["ex. 6 : la courbe de l'énoncé modifiée", "[2, 3], [3, 2], [4, 0]", "[2, 3], [3, 1], [4, 0]"],
    ["ex. 7 : g(−1) = 3 au lieu de g(3) = −1", "c'est l'antécédent ; $-1$ sort : $g(3) = -1$.", "c'est l'antécédent ; $-1$ sort : $g(-1) = 3$."],
    ["ex. 8 : g déclarée linéaire", "seule $f$ est linéaire", "$f$ et $g$ sont linéaires"],
    ["ex. 9 : une heure mal lue", "en $x = 4$ et en $x = 6$", "en $x = 4$ et en $x = 7$"],
    ["ex. 10 : f(−2) = 0 déclaré vrai", "b) FAUX. Je pars", "b) VRAI. Je pars"],
    ["ex. 11 : une cellule complétée fausse", "[\"f(x)\", 8, 3, 0, -1, 0, 3]", "[\"f(x)\", 8, 3, 0, 1, 0, 3]"],
    ["ex. 12 : (−3)² = −9", "$f(-5) = (-5 + 2)^2 - 9 = 9 - 9 = 0$", "$f(-5) = (-5 + 2)^2 - 9 = -9 - 9 = -18$"],
    ["ex. 13 : la pleine mer changée dans le tableau", "[\"Hauteur (m)\", 2, 4, 7, 8, 7, 4, 2]", "[\"Hauteur (m)\", 2, 4, 7, 9, 7, 4, 2]"],
    ["ex. 14 : le tableau B n'est plus affine", "[\"B\", 4, 6, 8]", "[\"B\", 4, 6, 9]"],
    ["ex. 15 : le signe de −2 oublié", "$x = 5$ ou $x = 1$", "$x = 5$ ou $x = -1$"],
    ["ex. 16 : le tableau à deux images déclaré fonction", "c) Non. Le nombre $2$", "c) Oui. Le nombre $2$"],
    ["ex. 17 : le sommet mal calculé", "+ 22{,}5 = 11{,}25$", "+ 22{,}5 = 12{,}25$"],
    ["ex. 18 : un antécédent de 1 000 m disparaît", "[6, 9], [8, 10], [10, 6]", "[6, 9], [8, 9], [10, 6]"],
    ["ex. 19 : V(2) faux", "2 \\\\times 64 = 128$", "2 \\\\times 64 = 118$"],
    ["ex. 20 : la courbe de la crue modifiée", "[1, 2], [2, 4], [3, 6]", "[1, 2], [2, 3], [3, 6]"],
    ["une micro d'une autre notion", "micros: [\"fonction_affine_lineaire\"],", "micros: [\"affine_fonction_reconnaitre\"],"],
    ["un $ dans un canvas", "label: \"minimum\"", "label: \"$m$\""],
  ],
});
