// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Nombres réels,
// intervalles et valeur absolue » de seconde (lib/fiches-exercices/maths-seconde-reels.tsx).
//
// ⭐ L'AUTRE CHEMIN :
//   · le plus petit ensemble d'un nombre est DÉDUIT de sa fraction réduite
//     (entier ? dénominateur fait de 2 et de 5 ?), pas relu dans le corrigé ;
//   · les solutions de |x − a| = r, les intervalles de |x − a| ≤ r, les
//     intersections et réunions sont RETROUVÉS sur une grille de nombres
//     (`outilsIntervalles` du module commun), puis comparés au corrigé et au dessin ;
//   · « √2 n'est pas une fraction » est recoupé par une recherche exhaustive :
//     aucun couple p, q ≤ 2 000 ne vérifie p² = 2q².
//
//   node scripts/verifier-exercices-reels.mjs

import { Q, D, egal, inf, fois, moins, tex, dans, grille, lireFeuille, outilsAlgebre, outilsIntervalles, lancer } from "./verifier-exercices-commun.mjs";

const abs = (a) => (inf(a, Q(0)) ? moins(Q(0), a) : a);
/** Le plus petit ensemble d'une fraction : N, Z, D ou Q. */
function ensembleDe(a) {
  if (a.d === 1n) return a.n >= 0n ? "N" : "Z";
  let d = a.d;
  while (d % 2n === 0n) d /= 2n;
  while (d % 5n === 0n) d /= 5n;
  return d === 1n ? "D" : "Q";
}
const TEX = { N: "$\\mathbb{N}$", Z: "$\\mathbb{Z}$", D: "$\\mathbb{D}$", Q: "$\\mathbb{Q}$" };
const vrg = (x, d) => x.toFixed(d).replace(".", "{,}");

function verifier(source, v) {
  const f = lireFeuille(source);
  const { dit } = outilsAlgebre(v, f);
  const { ensemble, dessin } = outilsIntervalles(v, f);
  const bloc = (k) => f.blocs[k - 1] ?? "";
  /** Les solutions de |x − a| = r, retrouvées sur la grille. */
  const solAbs = (a, r) => grille(-40, 40, Q(1, 4), []).filter((x) => egal(abs(moins(x, nb(a))), nb(r)));
  const nb = (x) => (typeof x === "object" ? x : typeof x === "string" ? D(x) : Q(x));

  v.titre("★ Un seul geste");
  const nombres1 = [["7", Q(7), "N"], ["-4", Q(-4), "Z"], ["0,35", D("0,35"), "D"], ["3/8", Q(3, 8), "D"], ["2/3", Q(2, 3), "Q"], ["√16", Q(4), "N"]];
  for (const [nom, val, att] of nombres1) v.ok(`1. ${nom} : plus petit ensemble ${att} (déduit de la fraction réduite)`, ensembleDe(val) === att);
  dit(1, `$7$ est un entier positif : ${TEX.N}`);
  dit(1, `$-4$ est un entier négatif : ${TEX.Z}`);
  dit(1, `$0{,}35$ a une écriture décimale qui s'arrête : ${TEX.D}`);
  dit(1, `$\\dfrac{3}{8} = ${tex(Q(3, 8))}$ : ${TEX.D}`);
  dit(1, `c'est une fraction, ${TEX.Q}`);
  dit(1, `$\\sqrt{16} = 4$ : ${TEX.N}`);
  dit(1, "ne sont pas des fractions : $\\mathbb{R}$");
  for (const [lab, ens] of [["3/8", "D"], ["2/3", "Q"], ["√16", "N"], ["√2", "R"]]) v.ok(`1. le tableau : ${lab} → ${ens}`, new RegExp(`label: "${lab}", values: \\["${ens}"`).test(bloc(1)));

  const vf2 = [ensembleDe(Q(-3)) === "N", ["N", "Z", "D"].includes(ensembleDe(Q(1, 4))), ["N", "Z", "D"].includes(ensembleDe(Q(1, 3))), [-5, 0, 5, 12].every((n) => ["N", "Z", "D"].includes(ensembleDe(Q(n))))];
  v.ok("2. faux, vrai, faux, vrai", JSON.stringify(vf2) === "[false,true,false,true]");
  ["a) FAUX.", "b) VRAI.", "c) FAUX.", "d) VRAI."].forEach((p) => dit(2, p));
  dit(2, `$\\dfrac{1}{4} = ${tex(Q(1, 4))}$`);

  v.ok("3. l'ordre −1,5 < 0,5 < √2 < 7/4 = 1,75", -1.5 < 0.5 && 0.5 < Math.SQRT2 && Math.SQRT2 < 1.75 && egal(Q(7, 4), D("1,75")));
  dit(3, "$\\dfrac{7}{4} = 1{,}75$");
  dit(3, `$\\sqrt{2} \\approx ${vrg(Math.SQRT2, 2)}$`);
  v.ok("3. le dessin place A, B, C, D aux bonnes abscisses", ["value: -1.5, label: \"A\"", "value: 0.5, label: \"B\"", "value: 1.75, label: \"C\"", "value: Math.SQRT2, label: \"D\""].every((s) => bloc(3).includes(s)));

  const iv4 = { de: -1, a: 4, deInclus: true, aInclus: false };
  ensemble(4, "[−1 ; 4[ ⇔ −1 ≤ x < 4", (x) => !inf(x, Q(-1)) && inf(x, Q(4)), iv4, { phrase: "$-1 \\leqslant x < 4$" });
  ensemble(4, "]−∞ ; 3] ⇔ x ≤ 3", (x) => !inf(Q(3), x), { a: 3, aInclus: true }, { phrase: "$x \\leqslant 3$" });
  ensemble(4, "]0 ; +∞[ ⇔ x > 0", (x) => inf(Q(0), x), { de: 0, deInclus: false }, { phrase: "$x > 0$" });
  dessin(4, iv4);

  const vf5 = [dans(Q(3), { de: -2, a: 3 }), dans(Q(-2), { de: -2, a: 5, deInclus: true, aInclus: true }), dans(D("2,99"), { de: -2, a: 3 }), Math.PI >= 3.14 && Math.PI <= 3.15];
  v.ok("5. faux, vrai, vrai, vrai", JSON.stringify(vf5) === "[false,true,true,true]");
  ["a) FAUX.", "b) VRAI.", "c) VRAI.", "d) VRAI."].forEach((p) => dit(5, p));

  v.ok("6. 25 < 30 < 36 ; 5,4² = 29,16 < 30 < 30,25 = 5,5²", 25 < 30 && 30 < 36 && egal(fois(D("5,4"), D("5,4")), D("29,16")) && egal(fois(D("5,5"), D("5,5")), D("30,25")));
  dit(6, "$5 < \\sqrt{30} < 6$");
  dit(6, "$5{,}4 < \\sqrt{30} < 5{,}5$");
  dit(6, `$\\dfrac{22}{7} \\approx ${vrg(Math.floor((22 / 7) * 1e4) / 1e4, 4)}$`);
  dit(6, `$\\pi \\approx ${vrg(Math.PI, 4)}$`);
  v.ok("6. 22/7 > π, d'environ 0,0013", 22 / 7 > Math.PI && vrg(22 / 7 - Math.PI, 4) === "0{,}0013");
  dit(6, "d'environ $0{,}0013$");

  v.ok("7. |−8| = 8 et |3 − 7| = 4", egal(abs(Q(-8)), Q(8)) && egal(abs(Q(3 - 7)), Q(4)));
  dit(7, "$|-8| = 8$");
  dit(7, "$|3 - 7| = 4$");
  v.ok("7. π − 4 < 0 et √2 − 1 > 0", Math.PI - 4 < 0 && Math.SQRT2 - 1 > 0);
  dit(7, `$|\\pi - 4| = 4 - \\pi \\approx ${vrg(4 - Math.PI, 2)}$`);
  dit(7, `$|\\sqrt{2} - 1| = \\sqrt{2} - 1 \\approx ${vrg(Math.SQRT2 - 1, 2)}$`);

  for (const [a, b, d] of [[-3, 5, 8], [-7, -2, 5], ["2,5", "-1,5", 4]]) {
    v.ok(`8. distance entre ${a} et ${b} = ${d}`, egal(abs(moins(nb(b), nb(a))), Q(d)));
  }
  ["= |8| = 8$", "= |5| = 5$", "= |4| = 4$"].forEach((p) => dit(8, p));

  v.titre("★★ Type devoir");
  const s9 = solAbs(3, 5).map((x) => Number(x.n));
  v.ok("9. |x − 3| = 5 : exactement −2 et 8 sur la grille", JSON.stringify(s9) === "[-2,8]");
  dit(9, "Les solutions sont $-2$ et $8$");
  v.ok("9. le dessin montre −2, 3 et 8", ["value: -2,", "value: 3,", "value: 8,"].every((s) => bloc(9).includes(s)));

  const s10 = solAbs(-2, 4).map((x) => Number(x.n));
  v.ok("10. |x + 2| = 4 : exactement −6 et 2", JSON.stringify(s10) === "[-6,2]");
  dit(10, "Les solutions sont $-6$ et $2$");
  v.ok("10. |x| = −3 n'a aucune solution sur la grille", grille(-40, 40, Q(1, 4), []).every((x) => !egal(abs(x), Q(-3))));
  dit(10, "l'équation n'a AUCUNE solution");
  dit(10, "$|6 + 2| = 8$");

  const iv11 = { de: -2, a: 4, deInclus: true, aInclus: true };
  ensemble(11, "|x − 1| ≤ 3 ⇔ [−2 ; 4]", (x) => !inf(Q(3), abs(moins(x, Q(1)))), iv11, { phrase: "$[-2\\,;\\,4]$" });
  ensemble(11, "|x + 3| < 2 ⇔ ]−5 ; −1[", (x) => inf(abs(moins(x, Q(-3))), Q(2)), { de: -5, a: -1 }, { phrase: "$]{-5}\\,;\\,-1[$" });
  dessin(11, iv11);

  ensemble(12, "[2 ; 8] ⇔ |x − 5| ≤ 3", (x) => !inf(Q(3), abs(moins(x, Q(5)))), { de: 2, a: 8, deInclus: true, aInclus: true }, { phrase: "$|x - 5| \\leqslant 3$" });
  ensemble(12, "]−4 ; 0[ ⇔ |x + 2| < 2", (x) => inf(abs(moins(x, Q(-2))), Q(2)), { de: -4, a: 0 }, { phrase: "$|x + 2| < 2$" });

  const I = { de: -3, a: 4, deInclus: true, aInclus: false };
  const J = { de: 1, a: 6, deInclus: false, aInclus: true };
  ensemble(13, "I ∩ J = ]1 ; 4[", (x) => dans(x, I) && dans(x, J), { de: 1, a: 4 }, { phrase: "$I \\cap J = ]1\\,;\\,4[$" });
  ensemble(13, "I ∪ J = [−3 ; 6]", (x) => dans(x, I) || dans(x, J), { de: -3, a: 6, deInclus: true, aInclus: true }, { phrase: "$I \\cup J = [-3\\,;\\,6]$" });
  for (const n of [-3, 1, 2, 4, 6]) {
    const att = `label: "${n < 0 ? "−" + -n : n}", values: ["${dans(Q(n), I) ? "oui" : "non"}", "${dans(Q(n), J) ? "oui" : "non"}"]`;
    v.ok(`13. le tableau : ${n} dans I ? dans J ?`, bloc(13).includes(att), att);
  }

  ensemble(14, "|L − 12,4| ≤ 0,1 ⇔ [12,3 ; 12,5]", (x) => !inf(D("0,1"), abs(moins(x, D("12,4")))), { de: "12,3", a: "12,5", deInclus: true, aInclus: true }, { phrase: "$L \\in [12{,}3\\,;\\,12{,}5]$", de: 11, a: 14, pas: Q(1, 100) });
  v.ok("14. 12,45 possible (écart 0,05), 12,55 impossible (0,15)", egal(abs(moins(D("12,45"), D("12,4"))), D("0,05")) && egal(abs(moins(D("12,55"), D("12,4"))), D("0,15")));
  dit(14, "= 0{,}05$");
  dit(14, "= 0{,}15$");

  v.ok("15. 10ⁿ n'est jamais un multiple de 3 (n = 1 à 30)", Array.from({ length: 30 }, (_, i) => 10n ** BigInt(i + 1) % 3n).every((r) => r === 1n));
  v.ok("15. 7/40 et 13/20 décimaux, 5/12 non (déduit des dénominateurs)", ensembleDe(Q(7, 40)) === "D" && ensembleDe(Q(13, 20)) === "D" && ensembleDe(Q(5, 12)) === "Q");
  dit(15, `$\\dfrac{7}{40} = ${tex(Q(7, 40))}$ : décimal`);
  dit(15, `$\\dfrac{13}{20} = ${tex(Q(13, 20))}$ : décimal`);
  dit(15, ": pas décimal");

  for (const [a, b, n] of [["2", "3", "7"], ["2,6", "2,7", "7"], ["2,64", "2,65", "7"]]) {
    v.ok(`16. ${a}² < 7 < ${b}²`, inf(fois(D(a), D(a)), D(n)) && inf(D(n), fois(D(b), D(b))));
    dit(16, `$${a.replace(",", "{,}")} < \\sqrt{7} < ${b.replace(",", "{,}")}$`);
  }
  dit(16, `$2{,}64^2 = ${tex(fois(D("2,64"), D("2,64")))}$`);
  dit(16, `$2{,}65^2 = ${tex(fois(D("2,65"), D("2,65")))}$`);

  v.titre("★★★ Problèmes");
  let aucun = true;
  for (let q = 1n; q <= 2000n && aucun; q++) {
    const p2 = 2n * q * q;
    let p = BigInt(Math.floor(Math.sqrt(Number(p2))));
    while (p * p < p2) p++;
    if (p * p === p2) aucun = false;
  }
  v.ok("17. aucun couple p, q ≤ 2 000 ne vérifie p² = 2q² (recherche exhaustive)", aucun);
  ["$p^2 = 2q^2$", "$4k^2 = 2q^2$", "$q^2 = 2k^2$", "se simplifie par $2$"].forEach((p) => dit(17, p));

  const iv18 = { de: "49,8", a: "50,2", deInclus: true, aInclus: true };
  ensemble(18, "|L − 50| ≤ 0,2 ⇔ [49,8 ; 50,2]", (x) => !inf(D("0,2"), abs(moins(x, Q(50)))), iv18, { phrase: "$[49{,}8\\,;\\,50{,}2]$", de: 49, a: 51, pas: Q(1, 100) });
  const acceptees = ["49,75", "50,1", "50,25", "49,8"].filter((l) => dans(D(l), iv18));
  v.ok("18. acceptées : 50,1 et 49,8", JSON.stringify(acceptees) === '["50,1","49,8"]');
  dit(18, "$50{,}1$ et $49{,}8$");
  dessin(18, { de: 49.8, a: 50.2, deInclus: true, aInclus: true });

  const iv19 = { de: 49, a: 55, deInclus: true, aInclus: true };
  ensemble(19, "|p − 52| ≤ 3 ⇔ [49 ; 55]", (x) => !inf(Q(3), abs(moins(x, Q(52)))), iv19, { phrase: "$p \\in [49\\,;\\,55]$" });
  v.ok("19. 49 est possible, donc on ne peut pas conclure", dans(Q(49), iv19) && inf(Q(49), Q(50)));
  v.ok("19. toutes les valeurs dépassent 50 exactement quand m < 2", [D("1,9"), D("1,99")].every((m) => inf(Q(50), moins(Q(52), m))) && !inf(Q(50), moins(Q(52), Q(2))));
  dit(19, "soit $m < 2$");
  dessin(19, iv19);

  const A = { de: 7, a: 17 };
  const B = { de: 12, a: 28 };
  ensemble(20, "|x − 12| < 5 ⇔ ]7 ; 17[", (x) => inf(abs(moins(x, Q(12))), Q(5)), A, { phrase: "$x \\in ]7\\,;\\,17[$" });
  ensemble(20, "|x − 20| < 8 ⇔ ]12 ; 28[", (x) => inf(abs(moins(x, Q(20))), Q(8)), B, { phrase: "$x \\in ]12\\,;\\,28[$" });
  ensemble(20, "les deux : ]12 ; 17[", (x) => dans(x, A) && dans(x, B), { de: 12, a: 17 }, { phrase: "l'intersection, $]12\\,;\\,17[$" });
  ensemble(20, "au moins un : ]7 ; 28[", (x) => dans(x, A) || dans(x, B), { de: 7, a: 28 }, { phrase: "la réunion, $]7\\,;\\,28[$" });
  v.ok("20. à la borne 12, on ne capte pas B", !dans(Q(12), B) && egal(abs(moins(Q(12), Q(20))), Q(8)));}

lancer({
  nom: "NOMBRES RÉELS, INTERVALLES ET VALEUR ABSOLUE · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-reels.tsx",
  notionId: "reels_intervalles",
  verifier,
  casses: [
    ["ex. 1 : √16 rangé dans R", "$\\\\sqrt{16} = 4$ : $\\\\mathbb{N}$", "$\\\\sqrt{16} = 4$ : $\\\\mathbb{R}$"],
    ["ex. 1 : le tableau range 2/3 dans D", "label: \"2/3\", values: [\"Q\"", "label: \"2/3\", values: [\"D\""],
    ["ex. 3 : C placé à 1,5", "value: 1.75, label: \"C\"", "value: 1.5, label: \"C\""],
    ["ex. 4 : le crochet du dessin inversé", "{ de: -1, a: 4, deInclus: true, aInclus: false", "{ de: -1, a: 4, deInclus: false, aInclus: false"],
    ["ex. 5 : 3 déclaré dans ]−2 ; 3[", "a) FAUX. Le crochet", "a) VRAI. Le crochet"],
    ["ex. 7 : |π − 4| = π − 4", "$|\\\\pi - 4| = 4 - \\\\pi", "$|\\\\pi - 4| = \\\\pi - 4"],
    ["ex. 9 : une solution oubliée", "Les solutions sont $-2$ et $8$", "La solution est $8$"],
    ["ex. 10 : partir de 2 au lieu de −2", "Les solutions sont $-6$ et $2$", "Les solutions sont $-2$ et $6$"],
    ["ex. 11 : les bornes gardées au b)", "$]{-5}\\\\,;\\\\,-1[$", "$[-5\\\\,;\\\\,-1]$"],
    ["ex. 13 : l'intersection fermée", "$I \\\\cap J = ]1\\\\,;\\\\,4[$", "$I \\\\cap J = [1\\\\,;\\\\,4]$"],
    ["ex. 16 : un encadrement faux", "$2{,}6 < \\\\sqrt{7} < 2{,}7$", "$2{,}7 < \\\\sqrt{7} < 2{,}8$"],
    ["ex. 18 : 49,8 refusée", "$50{,}1$ et $49{,}8$", "$50{,}1$ seule"],
    ["ex. 19 : une marge fausse", "soit $m < 2$", "soit $m < 3$"],
    ["ex. 20 : la réunion avec un trou", "la réunion, $]7\\\\,;\\\\,28[$", "la réunion, $]7\\\\,;\\\\,12[$"],
  ],
});
