// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Fonctions affines »
// de 3e (lib/fiches-exercices/maths-3e-fonctions-affines.tsx).
//
// ⭐ L'AUTRE CHEMIN :
//   · a et b ne sont jamais recopiés : a = f(1) − f(0) et b = f(0), calculés
//     sur la formule de l'ÉNONCÉ ; « affine » se teste par des écarts
//     constants, « linéaire » par f(0) = 0 ;
//   · une expression trouvée est confrontée aux DONNÉES (les deux points, les
//     deux courses, les deux températures) ;
//   · les droites dessinées sont RELUES dans le source et comparées à la
//     formule — en tenant compte des échelles (centaines de km, dizaines d'€) ;
//   · chaque « marche d'escalier » est relue : elle part de la droite, va
//     horizontalement, puis verticalement, et retombe SUR la droite ;
//   · chaque chaîne « a = b = c » écrite est réévaluée en fractions exactes.
//
//   node scripts/verifier-exercices-fonctions-affines-3e.mjs

import { Q, D, egal, inf, moins, div, fois, evalTex, lireFeuille, outilsAlgebre, outilsCourbes, outilsEgalites, racines, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : D(String(x).replace(/−/g, "-")));
const txt = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, vaut } = outilsAlgebre(v, f);
  const { reperes, courbes, controlerTout } = outilsCourbes(v, f, source);
  const egalites = outilsEgalites(v, f);
  const F = (t) => (x) => evalTex(t, nb(x));
  const pas = (t) => moins(F(t)(1), F(t)(0));

  /** Affine : écarts f(x) − f(x − 1) tous égaux, de 1 à 6 (0 évité : 2/x). */
  const affine = (t) => [3, 4, 5, 6].every((x) => egal(moins(F(t)(x), F(t)(x - 1)), moins(F(t)(2), F(t)(1))));
  /** a et b de la formule t, recalculés, et la phrase qui les dit. */
  const ab = (k, t, a, b, phrase = `$a = ${a}$ et $b = ${b}$`) =>
    v.ok(`${k}. ${t} : a = ${a}, b = ${b}`, affine(t) && egal(pas(t), evalTex(a, Q(0))) && egal(F(t)(0), evalTex(b, Q(0))) && c(k).includes(phrase), `a calculé ${txt(pas(t))}, b calculé ${txt(F(t)(0))} ; phrase : ${c(k).includes(phrase)}`);
  /** La courbe G (lue dans le source) est-elle la droite t, à l'échelle (ex, ey) ? */
  const memeDroite = (k, G, t, quoi, ex = 1, ey = 1) =>
    v.ok(`${k}. ${quoi}`, [-2, -1, 0, 1, 2, 3, "0.5"].every((X) => egal(G(nb(X)), div(F(t)(fois(Q(ex), nb(X))), Q(ey)))));
  /** La droite t passe-t-elle par ces points ? */
  const passe = (k, t, pts) => v.ok(`${k}. ${t} passe par ${pts.map(([x, y]) => `(${x} ; ${y})`).join(", ")}`, pts.every(([x, y]) => egal(F(t)(x), nb(y))));
  /** L'unique solution de gauche = droite, et la phrase. */
  const seule = (k, gauche, droite, s, phrase) => {
    const r = racines((x) => moins(evalTex(gauche, x), evalTex(droite, x)));
    v.ok(`${k}. ${gauche} = ${droite} : x = ${s} seulement`, r && r.length === 1 && egal(r[0], nb(s)) && c(k).includes(phrase), `racines : ${r ? r.map(txt) : "toutes"} ; phrase : ${c(k).includes(phrase)}`);
  };
  /** La marche d'escalier n° i du schéma de k : relue, horizontale puis
   *  verticale, ses deux bouts sur la droite t. Renvoie la pente qu'elle montre. */
  const marche = (k, i, t) => {
    const r = reperes(k).find((x) => x.role === "schema");
    const p = r.courbes[i]?.pts;
    const ok = p && p.length === 3 && p[0][1] === p[1][1] && p[1][0] === p[2][0] && p[1][0] > p[0][0] && egal(F(t)(nb(p[0][0])), nb(p[0][1])) && egal(F(t)(nb(p[2][0])), nb(p[2][1]));
    const pente = ok ? div(moins(nb(p[2][1]), nb(p[1][1])), moins(nb(p[1][0]), nb(p[0][0]))) : null;
    v.ok(`${k}. la marche ${JSON.stringify(p)} est sur la droite ${t}, pente ${pente ? txt(pente) : "?"}`, ok && egal(pente, pas(t)));
  };
  /** Tous les `tableau([entête], [ligne])` de l'exercice k, dans l'ordre. */
  const tableaux = (k) =>
    [...(f.blocs[k - 1] ?? "").matchAll(/\btableau\((\[[^\]]*\]), (\[[^\]]*\])/g)].map((m) => ({
      entete: JSON.parse(m[1].replace(/−/g, "-")),
      ligne: JSON.parse(m[2].replace(/−/g, "-")),
    }));
  const tableauJuste = (k, t, G, quoi) => {
    const fautes = t.entete.slice(1).filter((x, i) => t.ligne[i + 1] !== "…" && !egal(G(nb(x)), nb(t.ligne[i + 1])));
    v.ok(`${k}. ${quoi}`, fautes.length === 0, `cases fausses sous ${fautes.join(", ")}`);
  };

  controlerTout();

  v.titre("★ Un seul geste");
  const fs1 = { f: "-3x + 2", g: "0{,}5x", h: "6", k: "x^2 + 1", m: "\\dfrac{2}{x}" };
  v.ok("1. affines : f, g, h ; pas k ni m", ["f", "g", "h"].every((n) => affine(fs1[n])) && !affine(fs1.k) && !affine(fs1.m));
  v.ok("1. linéaire (affine et f(0) = 0) : g seule", ["f", "g", "h"].filter((n) => egal(F(fs1[n])(0), Q(0))).join() === "g" && c(1).includes("seule $g$ est linéaire"));
  ab(1, fs1.f, "-3", "2", "affine, avec $a = -3$ et $b = 2$");
  ab(1, fs1.g, "0{,}5", "0", "affine, avec $a = 0{,}5$ et $b = 0$");
  ab(1, fs1.h, "0", "6", "affine, avec $a = 0$ et $b = 6$");
  v.ok("1. m(1) = 2, m(2) = 1, m(4) = 0,5", egal(F(fs1.m)(1), Q(2)) && egal(F(fs1.m)(2), Q(1)) && egal(F(fs1.m)(4), Q(1, 2)) && c(1).includes("$m(4) = 0{,}5$"));
  const r1 = courbes(1, "schema");
  memeDroite(1, r1[0], fs1.f, "le bleu du schéma est f");
  memeDroite(1, r1[1], fs1.g, "l'orange du schéma est g");
  memeDroite(1, r1[2], fs1.h, "le vert du schéma est h");

  ab(2, "5 - 2x", "-2", "5", "= -2x + 5$ : $a = -2$ et $b = 5$");
  ab(2, "x - 4", "1", "-4", "= 1x - 4$ : $a = 1$ et $b = -4$");
  ab(2, "-x", "-1", "0", "= -1x + 0$ : $a = -1$ et $b = 0$");
  ab(2, "3(x + 2)", "3", "6", "= 3x + 6$ : $a = 3$ et $b = 6$");
  vaut(2, "5 - 2x", "-2x + 5", "$f(x) = 5 - 2x = -2x + 5$");
  vaut(2, "3(x + 2)", "3x + 6", "$k(x) = 3(x + 2) = 3x + 6$");
  const r2 = courbes(2, "schema");
  memeDroite(2, r2[0], "5 - 2x", "le bleu du schéma est f");
  memeDroite(2, r2[1], "3(x + 2)", "l'orange du schéma est k");
  marche(2, 2, "5 - 2x");

  const f3 = "2{,}5x - 4";
  egalites(3, "2{,}5 \\times 2 - 4 = 5 - 4 = 1");
  egalites(3, "2{,}5 \\times (-2) - 4 = -5 - 4 = -9");
  egalites(3, "2{,}5 \\times 0 - 4 = -4");
  egalites(3, "2{,}5 \\times 1{,}2 - 4 = 3 - 4 = -1");
  v.ok("3. ce sont bien f(2), f(−2), f(0), f(1,2)", [[2, 1], [-2, -9], [0, -4], ["1.2", -1]].every(([x, y]) => egal(F(f3)(x), nb(y))));
  v.ok("3. le piège : −5 − 4 ≠ −1", !egal(Q(-9), Q(-1)) && c(3).includes("$-5 - 4 = -1$"));
  memeDroite(3, courbes(3, "schema")[0], f3, "la droite du schéma est 2,5x − 4");

  const [D4] = courbes(4);
  memeDroite(4, D4, "3x - 2", "la droite de l'énoncé est 3x − 2");
  memeDroite(4, courbes(4, "schema")[0], "3x - 2", "la droite du corrigé est celle de l'énoncé");
  v.ok("4. b = f(0) = −2, a = 3 lus sur la droite", egal(D4(Q(0)), Q(-2)) && egal(moins(D4(Q(1)), D4(Q(0))), Q(3)) && c(4).includes("$f(x) = 3x - 2$"));
  egalites(4, "3 \\times 2 - 2 = 4");
  marche(4, 1, "3x - 2");
  v.ok("4. l'axe horizontal est coupé en 2/3 ≈ 0,7 (le piège)", egal(div(Q(2), Q(3)), Q(2, 3)) && c(4).includes("vers $0{,}7$"));

  const r5 = courbes(5);
  const fs5 = { u: "-x + 3", v: "0{,}5x - 2", w: "2x + 1" };
  const couleurs = ["bleue", "orange", "verte"];
  const assoc = Object.fromEntries(Object.entries(fs5).map(([n, t]) => [n, couleurs[r5.findIndex((G) => [-2, -1, 0, 1, 2].every((x) => egal(G(Q(x)), F(t)(x))))]]));
  v.ok(`5. association relue sur la figure : ${JSON.stringify(assoc)}`, assoc.u === "orange" && assoc.v === "verte" && assoc.w === "bleue" && c(5).includes("$u$ est l'orange, $v$ la verte, $w$ la bleue"));
  v.ok("5. la verte coupe l'axe horizontal en 4 (le piège)", egal(F(fs5.v)(4), Q(0)) && c(5).includes("La verte le coupe en $4$"));
  v.ok("5. seule u descend", Object.entries(fs5).filter(([, t]) => inf(pas(t), Q(0))).map(([n]) => n).join() === "u");

  const [fig6, sch6] = tableaux(6);
  v.ok("6. le tableau de l'énoncé et celui du corrigé ont les mêmes volumes", JSON.stringify(fig6.entete) === JSON.stringify(sch6.entete));
  tableauJuste(6, sch6, F("1{,}8x"), "le tableau du corrigé vaut 1,8x");
  for (const ch of ["1{,}8 \\times 10 = 18", "1{,}8 \\times 25 = 45", "1{,}8 \\times 40 = 72", "1{,}8 \\times 50 = 90", "1{,}8 \\times 10 + 2 = 20", "1{,}8 \\times 20 + 2 = 38"]) egalites(6, ch);
  v.ok("6. q(20) ≠ 2 q(10), p(20) = 2 p(10)", !egal(F("1{,}8x + 2")(20), Q(40)) && egal(F("1{,}8x")(20), Q(36)));
  dit(6, "Donc $p(x) = 1{,}8x$");

  const t7 = tableaux(7)[0];
  tableauJuste(7, t7, F("2x - 1"), "le tableau de l'énoncé est celui de 2x − 1");
  const ecarts7 = t7.entete.slice(2).map((x, i) => div(moins(nb(t7.ligne[i + 2]), nb(t7.ligne[i + 1])), moins(nb(x), nb(t7.entete[i + 1]))));
  v.ok(`7. pentes entre colonnes : ${ecarts7.map(txt)}`, ecarts7.every((p) => egal(p, Q(2))));
  for (const ch of ["3 - (-1) = 4", "\\dfrac{4}{2} = 2", "\\dfrac{6}{3} = 2", "\\dfrac{10}{5} = 2", "2 \\times 10 - 1 = 19"]) egalites(7, ch);
  dit(7, "$f(x) = 2x - 1$");
  memeDroite(7, courbes(7, "schema")[0], "2x - 1", "la droite du schéma est 2x − 1");
  marche(7, 1, "2x - 1");

  const T8 = "15 - 6{,}5x";
  ab(8, T8, "-6{,}5", "15");
  for (const ch of ["15 - 6{,}5 \\times 2 = 15 - 13 = 2", "15 - 6{,}5 \\times 4{,}8 = 15 - 31{,}2 = -16{,}2", "15 - 6{,}5 \\times 8{,}8 = 15 - 57{,}2 = -42{,}2", "(15 - 6{,}5) \\times 2 = 17"]) egalites(8, ch);
  tableauJuste(8, tableaux(8)[0], F(T8), "le tableau du corrigé vaut 15 − 6,5h");

  v.titre("★★ Type devoir");
  const f9 = "3x - 4";
  passe(9, f9, [[1, -1], [4, 8], [-2, -10]]);
  for (const ch of ["\\dfrac{8 - (-1)}{4 - 1} = \\dfrac{9}{3} = 3", "-1 - 3 = -4", "3 \\times 4 - 4 = 8", "3 \\times 10 - 4 = 26", "3 \\times (-2) - 4 = -6 - 4 = -10", "\\dfrac{4 - 1}{8 - (-1)} = \\dfrac{3}{9}"]) egalites(9, ch);
  dit(9, "Ainsi $f(x) = 3x - 4$");
  memeDroite(9, courbes(9, "schema")[0], f9, "la droite du schéma est 3x − 4");
  marche(9, 1, f9);

  const f10 = "-1{,}5x + 3";
  const [D10] = courbes(10);
  memeDroite(10, D10, f10, "la droite de l'énoncé est −1,5x + 3");
  v.ok("10. la droite passe par (2 ; 0) : la marche de 2 tombe sur un nœud", egal(D10(Q(2)), Q(0)) && D10(Q(1)).d !== 1n);
  for (const ch of ["\\dfrac{-3}{2} = -1{,}5", "-1{,}5 \\times (-2) + 3 = 3 + 3 = 6", "-1{,}5 \\times 10 + 3 = -15 + 3 = -12"]) egalites(10, ch);
  dit(10, "c) $f(x) = -1{,}5x + 3$.");
  memeDroite(10, courbes(10, "schema")[0], f10, "la droite du corrigé est celle de l'énoncé");
  marche(10, 1, f10);

  const c11 = "0{,}06x";
  const r11 = "50 - 0{,}06x";
  v.ok("11. 6 L aux 100 km : c(100) = 6, c(250) = 15", egal(F(c11)(100), Q(6)) && egal(F(c11)(250), Q(15)));
  for (const ch of ["6 \\times 2{,}5 = 15", "\\dfrac{6}{100} = 0{,}06", "50 - 0{,}06 \\times 250 = 50 - 15 = 35", "50 - 0{,}06 \\times 500 = 50 - 30 = 20"]) egalites(11, ch);
  vaut(11, r11, "-0{,}06x + 50", "$r(x) = 50 - 0{,}06x = -0{,}06x + 50$");
  v.ok("11. r(500) ≠ r(250) / 2 (le piège)", !egal(F(r11)(500), div(F(r11)(250), Q(2))));
  const s11 = courbes(11, "schema");
  memeDroite(11, s11[0], c11, "le bleu du schéma est c (centaines de km, dizaines de L)", 100, 10);
  memeDroite(11, s11[1], r11, "l'orange du schéma est r (centaines de km, dizaines de L)", 100, 10);

  const A12 = "12x";
  const B12 = "7x + 40";
  for (const ch of ["12 \\times 5 = 60", "12 \\times 10 = 120", "40 + 7 \\times 5 = 75", "40 + 7 \\times 10 = 110", "12 \\times 8 = 96"]) egalites(12, ch);
  seule(12, A12, B12, 8, "donc $x = 8$");
  const premier12 = [...Array(30).keys()].find((n) => inf(F(B12)(n), F(A12)(n)));
  v.ok(`12. B strictement moins cher à partir de ${premier12} entrées`, premier12 === 9 && c(12).includes("le plus avantageux à partir de $9$ entrées"));
  const s12 = courbes(12, "schema");
  memeDroite(12, s12[0], A12, "le bleu du schéma est A (dizaines d'€)", 1, 10);
  memeDroite(12, s12[1], B12, "l'orange du schéma est B (dizaines d'€)", 1, 10);

  const f13 = "-0{,}5x + 3";
  for (const ch of ["-0{,}5 \\times 4 + 3 = -2 + 3 = 1", "-0{,}5 \\times (-2) + 3 = 1 + 3 = 4", "2 \\times (-0{,}5) = -1"]) egalites(13, ch);
  const verdicts13 = [egal(F(f13)(4), Q(1)), egal(F(f13)(-2), Q(4)), egal(F(f13)(0), Q(0)), egal(moins(F(f13)(5), F(f13)(3)), Q(-1)), inf(Q(0), pas(f13))];
  ["a", "b", "c", "d", "e"].forEach((l, i) => dit(13, `${l}) ${verdicts13[i] ? "VRAI" : "FAUX"}.`));
  memeDroite(13, courbes(13, "schema")[0], f13, "la droite du schéma est −0,5x + 3");
  marche(13, 1, f13);

  const f14 = "0{,}25x + 1";
  for (const ch of ["0{,}25 \\times 20 + 1 = 5 + 1 = 6", "2 \\times 6 = 12", "\\dfrac{7}{0{,}25} = 28"]) egalites(14, ch);
  ab(14, f14, "0{,}25", "1", "$a = 0{,}25$, le prix d'une minute ; $b = 1$");
  tableauJuste(14, tableaux(14)[1], F(f14), "le tableau du corrigé vaut 0,25t + 1");
  seule(14, f14, "8", 28, "On peut rouler $28$ minutes");
  v.ok("14. f(40) ≠ 2 f(20)", !egal(F(f14)(40), Q(12)) && egal(F(f14)(40), Q(11)));

  const [F15, G15] = courbes(15);
  memeDroite(15, F15, "0{,}5x", "la bleue de l'énoncé est 0,5x");
  memeDroite(15, G15, "2x - 3", "l'orange de l'énoncé est 2x − 3");
  seule(15, "0{,}5x", "2x - 3", 2, "se croisent en $I(2\\,;\\,1)$");
  for (const ch of ["\\dfrac{1}{2} = 0{,}5", "0{,}5 \\times 2 = 1", "2 \\times 2 - 3 = 1"]) egalites(15, ch);
  dit(15, "$f(x) = 0{,}5x$ et $g(x) = 2x - 3$");
  marche(15, 2, "0{,}5x");
  marche(15, 3, "2x - 3");

  for (const ch of ["\\dfrac{7 - 7}{5 - 2} = \\dfrac{0}{3} = 0", "\\dfrac{0 - 6}{3 - 0} = -2", "-2 \\times 3 + 6 = 0", "\\dfrac{10}{4} = 2{,}5"]) egalites(16, ch);
  passe(16, "7", [[2, 7], [5, 7]]);
  passe(16, "-2x + 6", [[0, 6], [3, 0]]);
  passe(16, "2{,}5x", [[4, 10], [0, 0]]);
  v.ok("16. k : écarts 2 puis 3, pas affine", 4 - 2 !== 7 - 4 && c(16).includes("$k$ n'existe pas"));
  dit(16, "Réponse : $f(x) = 7$ ; $g(x) = -2x + 6$ ; $h(x) = 2{,}5x$");
  const s16 = courbes(16, "schema");
  memeDroite(16, s16[0], "7", "le bleu du schéma est f = 7");
  memeDroite(16, s16[1], "-2x + 6", "l'orange du schéma est g");
  memeDroite(16, s16[2], "2{,}5x", "le vert du schéma est h");

  v.titre("★★★ Problèmes");
  const A17 = "0{,}3x + 40";
  const B17 = "0{,}15x + 70";
  for (const ch of ["40 + 0{,}3 \\times 150 = 40 + 45 = 85", "70 + 0{,}15 \\times 150 = 70 + 22{,}5 = 92{,}5", "\\dfrac{30}{0{,}15} = 200", "0{,}3 \\times 200 + 40 = 100", "0{,}3 \\times 350 + 40 = 145", "0{,}15 \\times 350 + 70 = 122{,}5"]) egalites(17, ch);
  seule(17, A17, B17, 200, "$x = \\dfrac{30}{0{,}15} = 200$");
  v.ok("17. à 350 km, B est moins chère", inf(F(B17)(350), F(A17)(350)) && c(17).includes("Je choisis B"));
  for (const role of ["figure", "schema"]) {
    const [a, b] = courbes(17, role);
    memeDroite(17, a, A17, `le bleu (${role}) est A (centaines de km, dizaines d'€)`, 100, 10);
    memeDroite(17, b, B17, `l'orange (${role}) est B (centaines de km, dizaines d'€)`, 100, 10);
  }

  const F18 = "1{,}8x + 32";
  const R18 = "2x + 30";
  passe(18, F18, [[0, 32], [100, 212]]);
  dit(18, "Donc $F(x) = 1{,}8x + 32$");
  for (const ch of ["\\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1{,}8", "1{,}8 \\times 37 + 32 = 66{,}6 + 32 = 98{,}6", "1{,}8 \\times 10 + 32 = 50", "1{,}8 \\times 20 + 32 = 68", "2 \\times 50 = 100", "2 \\times 30 + 30 = 90", "1{,}8 \\times 30 + 32 = 86", "\\dfrac{212}{100} = 2{,}12"]) egalites(18, ch);
  seule(18, R18, F18, 10, "donc $x = 10$");
  v.ok("18. erreur de 4 °F à 30 °C", egal(moins(F(R18)(30), F(F18)(30)), Q(4)) && c(18).includes("se trompe de $4$ °F"));
  const s18 = courbes(18, "schema");
  memeDroite(18, s18[0], F18, "le bleu du schéma est F (dizaines de degrés)", 10, 10);
  memeDroite(18, s18[1], R18, "l'orange du schéma est R (dizaines de degrés)", 10, 10);

  const n19 = "3{,}3x";
  const m19 = "4{,}7x + 99";
  for (const ch of ["2050 - 1993 = 57", "3{,}3 \\times 30 = 99", "3{,}3 \\times 57 = 188{,}1", "4{,}7 \\times 27 + 99 = 126{,}9 + 99 = 225{,}9", "225{,}9 - 188{,}1 = 37{,}8"]) egalites(19, ch);
  v.ok("19. m part de n(2023) : m(0) = n(30)", egal(F(m19)(0), F(n19)(30)));
  const [tn, tm] = tableaux(19);
  tableauJuste(19, tn, (an) => F(n19)(moins(an, Q(1993))), "le tableau de n, année par année");
  tableauJuste(19, tm, (an) => F(m19)(moins(an, Q(2023))), "le tableau de m, année par année");
  v.ok("19. le piège (x = 57 dans m) donne autre chose", !egal(F(m19)(57), F(m19)(27)));

  const f20 = "1{,}2x + 5";
  passe(20, f20, [[6, "12.2"], [10, 17]]);
  dit(20, "$f(x) = 1{,}2x + 5$");
  v.ok("20. pas proportionnel : 12,2/6 ≠ 17/10", !egal(div(D("12.2"), Q(6)), div(Q(17), Q(10))));
  for (const ch of ["\\dfrac{17}{10} = 1{,}7", "17 - 12{,}2 = 4{,}8", "\\dfrac{4{,}8}{4} = 1{,}2", "1{,}2 \\times 6 = 7{,}2", "12{,}2 - 7{,}2 = 5", "1{,}2 \\times 10 + 5 = 17", "1{,}2 \\times 15 + 5 = 18 + 5 = 23", "30 - 5 = 25", "1{,}2 \\times 20 + 5 = 29", "1{,}2 \\times 21 + 5 = 30{,}2"]) egalites(20, ch);
  const max20 = [...Array(100).keys()].filter((n) => !inf(Q(30), F(f20)(n))).pop();
  v.ok(`20. distance entière maximale pour 30 € : ${max20} km`, max20 === 20 && c(20).includes("On peut faire $20$ km au plus"));
  tableauJuste(20, tableaux(20)[0], F(f20), "le tableau du corrigé vaut 1,2x + 5");
}

lancer({
  nom: "FONCTIONS AFFINES · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-fonctions-affines.tsx",
  notionId: "affine_fonction",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : h déclarée non affine", "affine, avec $a = 0$ et $b = 6$", "affine, avec $a = 6$ et $b = 0$"],
    ["ex. 2 : a pris pour le premier nombre", "$f(x) = 5 - 2x = -2x + 5$ : $a = -2$ et $b = 5$", "$f(x) = 5 - 2x = -2x + 5$ : $a = 5$ et $b = -2$"],
    ["ex. 2 : la marche verte fausse", "{ pts: [[0, 5], [1, 5], [1, 3]], couleur: VERT }", "{ pts: [[0, 5], [1, 5], [1, 2]], couleur: VERT }"],
    ["ex. 3 : −5 − 4 = −1", "= -5 - 4 = -9$.", "= -5 - 4 = -1$."],
    ["ex. 4 : la droite de l'énoncé modifiée", "figure: repere([-2, 3, -4, 6], [{ q: [0, 3, -2] }]),", "figure: repere([-2, 3, -4, 6], [{ q: [0, 2, -2] }]),"],
    ["ex. 5 : une droite de l'énoncé échangée", "figure: repere([-3, 4, -5, 7], [{ q: [0, 2, 1] }, { q: [0, -1, 3], couleur: ORANGE }", "figure: repere([-3, 4, -5, 7], [{ q: [0, -1, 3] }, { q: [0, 2, 1], couleur: ORANGE }"],
    ["ex. 6 : une case du tableau fausse", "[\"Prix (€)\", 18, 45, 72, 90]", "[\"Prix (€)\", 18, 45, 70, 90]"],
    ["ex. 7 : a = 4, l'écart entre deux colonnes", "c'est deux fois moins : $a = \\\\dfrac{4}{2} = 2$", "c'est deux fois moins : $a = \\\\dfrac{4}{2} = 4$"],
    ["ex. 8 : la priorité oubliée", "15 - 6{,}5 \\\\times 2 = 15 - 13 = 2", "15 - 6{,}5 \\\\times 2 = 15 - 13 = 17"],
    ["ex. 9 : b faux", "Ainsi $f(x) = 3x - 4$", "Ainsi $f(x) = 3x + 4$"],
    ["ex. 10 : le signe de a oublié", "$f(x) = -1{,}5x + 3$.\\nd)", "$f(x) = 1{,}5x + 3$.\\nd)"],
    ["ex. 11 : la droite orange ne part plus du plein", "{ q: [0, -0.6, 5], couleur: ORANGE }", "{ q: [0, -0.6, 4], couleur: ORANGE }"],
    ["ex. 12 : « à partir de 8 entrées »", "le plus avantageux à partir de $9$ entrées", "le plus avantageux à partir de $8$ entrées"],
    ["ex. 13 : d) déclaré faux", "d) VRAI. À chaque pas", "d) FAUX. À chaque pas"],
    ["ex. 14 : le déverrouillage oublié", "donc $t = \\\\dfrac{7}{0{,}25} = 28$. On peut rouler $28$ minutes", "donc $t = \\\\dfrac{7}{0{,}25} = 32$. On peut rouler $32$ minutes"],
    ["ex. 15 : la marche de la bleue lue à l'envers", "{ pts: [[0, 0], [2, 0], [2, 1]], couleur: VERT }", "{ pts: [[0, 0], [1, 0], [1, 2]], couleur: VERT }"],
    ["ex. 16 : g faux", "Réponse : $f(x) = 7$ ; $g(x) = -2x + 6$", "Réponse : $f(x) = 7$ ; $g(x) = -2x + 3$"],
    ["ex. 17 : le croisement mal calculé", "\\\\dfrac{30}{0{,}15} = 200$", "\\\\dfrac{30}{0{,}15} = 20$"],
    ["ex. 18 : a sans enlever 32", "Donc $F(x) = 1{,}8x + 32$", "Donc $F(x) = 2{,}12x + 32$"],
    ["ex. 18 : la droite orange du schéma décalée", "{ q: [0, 2, 3], couleur: ORANGE }", "{ q: [0, 2, 3.2], couleur: ORANGE }"],
    ["ex. 19 : une prévision fausse dans le tableau", "[\"m (mm)\", 99, 225.9]", "[\"m (mm)\", 99, 366.9]"],
    ["ex. 20 : 21 km déclarés possibles", "On peut faire $20$ km au plus", "On peut faire $21$ km au plus"],
    ["un point marqué hors de sa droite", "{ x: 1.2, y: -1 }", "{ x: 1.2, y: -2 }"],
    ["une micro d'une autre notion", "micros: [\"affine_calcul_image\"],", "micros: [\"fonction_image\"],"],
    ["un $ dans un canvas", "label: \"plein\"", "label: \"$plein$\""],
  ],
});
