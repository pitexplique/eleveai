// Recalcul indépendant de la feuille « Dénombrement et combinatoire » de
// terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-denombrement-combinatoire.tsx.
//
// ⭐ Un AUTRE chemin que les formules du corrigé : le script ÉNUMÈRE les objets
// comptés (tenues, mots, anagrammes, comités, mains de cartes, trajets,
// tirages, répartitions en poules) et les compte un par un, par masques de
// bits quand c'est une partie. Les grands nombres (mains de 32 cartes, mots de
// passe) sont faits en BigInt ; les probabilités par énumération ou par la loi
// exacte. Les dessins sont relus : feuilles des arbres, cases, triangle,
// barres, boules, quadrillage, graphe du tournoi, courbe des anniversaires.
// Usage : node scripts/verifier-exercices-terminale-spe-denombrement-combinatoire.mjs

import { feuilleTerminale, binome, binom } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-denombrement-combinatoire.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "denombrement_combinatoire" });
const { dit, verif, vrai, arrondi, termes, courbes, dessin, tableauDe } = F;

/* ── Énumérations ───────────────────────────────────────────────────────── */
/** Toutes les listes de longueur k sur un alphabet (répétitions permises). */
const listes = (alphabet, k) => (k === 0 ? [[]] : listes(alphabet, k - 1).flatMap((l) => alphabet.map((a) => [...l, a])));
/** Toutes les permutations d'un tableau. */
const permutations = (t) => (t.length <= 1 ? [t] : t.flatMap((x, i) => permutations([...t.slice(0, i), ...t.slice(i + 1)]).map((p) => [x, ...p])));
/** Le nombre de parties à k éléments d'un ensemble à n éléments, par masques de bits. */
const partiesDeTaille = (n, k) => {
  let c = 0;
  for (let m = 0; m < 1 << n; m++) {
    let b = 0;
    for (let x = m; x; x &= x - 1) b++;
    if (b === k) c++;
  }
  return c;
};
const arrangements = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; };
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
/** Les feuilles d'un arbre (labels). */
const feuilles = (noeuds) => noeuds.flatMap((n) => (n.enfants?.length ? feuilles(n.enfants) : [n.label]));
const arbreDe = (k) => dessin("arbre", k)[0];
const barres = (k) => dessin("diagramme", k)[1];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const tenues = listes(["T1", "T2", "T3"], 1).flatMap(([t]) => ["P1", "P2"].map((p) => [t, p]));
  vrai("1. 6 tenues t-shirt + pantalon", tenues.length === 6);
  vrai("1. l'arbre a 6 feuilles", feuilles(arbreDe(1)).length === 6);
  const hauts = [...tenues.map((t) => t.join("-")), "C1", "C2", "C3", "C4"];
  vrai("1. 10 hauts, 20 tenues complètes", hauts.length === 10 && hauts.flatMap((h) => ["S1", "S2"].map((s) => h + s)).length === 20);
  dit(1, "$6 \\times 2 = 12$ tenues");
  dit(1, "$6 + 4 = 10$");
  dit(1, "$10 \\times 2 = 20$ tenues complètes");
}
{
  const mots = listes(["A", "B", "C"], 2).map((l) => l.join(""));
  vrai("2. 9 mots", mots.length === 9);
  vrai("2. les feuilles de l'arbre sont ces 9 mots", JSON.stringify(feuilles(arbreDe(2)).sort()) === JSON.stringify([...mots].sort()));
  vrai("2. 10 000 codes", listes([..."0123456789"], 4).length === 10000);
  vrai("2. 32 résultats", listes(["P", "F"], 5).length === 32);
  dit(2, "$10^4 = 10\\,000$ codes");
  dit(2, "$2^5 = 32$ résultats");
}
{
  const p = permutations(["A", "B", "C"]).map((l) => l.join(""));
  vrai("3. 6 rangements de A, B, C = feuilles de l'arbre", JSON.stringify(feuilles(arbreDe(3)).sort()) === JSON.stringify([...p].sort()));
  vrai("3. 6! = 720 (énumération)", permutations([1, 2, 3, 4, 5, 6]).length === 720);
  vrai("3. anagrammes de MATHS = 120", new Set(permutations([..."MATHS"]).map((l) => l.join(""))).size === 120);
  verif("3. 10!/8! = 90", fact(10) / fact(8), 90);
  dit(3, "$5! = 120$");
  dit(3, "= 90$");
}
{
  const coureurs = [...Array(8).keys()];
  const podiums = listes(coureurs, 3).filter((l) => new Set(l).size === 3);
  vrai("4. 336 podiums (énumération)", podiums.length === 336);
  vrai("4. 1 320 bureaux", listes([...Array(12).keys()], 3).filter((l) => new Set(l).size === 3).length === 1320);
  const t = tableauDe(4);
  vrai("4. cases 8, 7, 6", t.nombres.join() === "8,7,6");
  dit(4, "$8 \\times 7 \\times 6 = 336$ podiums");
  dit(4, "$12 \\times 11 \\times 10 = 1\\,320$ bureaux");
}
{
  vrai("5. 120 comités (masques)", partiesDeTaille(10, 3) === 120);
  vrai("5. 190 poignées de main (masques)", partiesDeTaille(20, 2) === 190);
  const tr = dessin("trace", 5)[1];
  vrai("5. la trace liste les 6 ordres de A, B, C", JSON.stringify(tr.map((l) => l[0]).sort()) === JSON.stringify(permutations(["A", "B", "C"]).map((l) => l.join("")).sort()));
  dit(5, "$\\dfrac{720}{6} = 120$ comités");
  dit(5, "$\\dbinom{20}{2} = \\dfrac{20 \\times 19}{2} = 190$");
}
{
  verif("6. tiercé 2 730", arrangements(15, 3), 2730);
  verif("6. mains C(32, 5) = 201 376", binome(32, 5), 201376);
  verif("6. codes 26³ = 17 576", 26 ** 3, 17576);
  vrai("6. 7! = 5 040 (énumération)", permutations([1, 2, 3, 4, 5, 6, 7]).length === 5040);
  vrai("6. l'arbre de décision a 3 issues", feuilles(arbreDe(6)).length === 3);
  for (const m of ["$15 \\times 14 \\times 13 = 2\\,730$", "$\\dbinom{32}{5} = 201\\,376$", "$26^3 = 17\\,576$", "$7! = 5\\,040$"]) dit(6, m);
}
{
  // Le triangle par la relation de Pascal, contre les factorielles.
  const tr = dessin("trace", 7)[1];
  vrai("7. triangle : C(n, k) par factorielles", tr.every((ligne) => ligne.slice(1).every((v, k) => (k > ligne[0] ? v === "" : v === fact(ligne[0]) / (fact(k) * fact(ligne[0] - k))))));
  vrai("7. largeur des lignes", tr.every((l) => l.length === 8));
  verif("7. C(7, 3) = 35", partiesDeTaille(7, 3), 35);
  dit(7, "$\\dbinom{6}{2} = 15$ et $\\dbinom{6}{3} = 20$");
  dit(7, "= 15 + 20 = 35$");
}
{
  vrai("8. 6 parties à 2 éléments, 16 parties en tout", partiesDeTaille(4, 2) === 6 && 1 << 4 === 16);
  const t = tableauDe(8);
  t.en.forEach((k, i) => verif(`8. parties à ${k} éléments`, t.nombres[i], partiesDeTaille(4, k)));
  dit(8, "$1 + 4 + 6 + 4 + 1 = 16$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  // Mains de 5 cartes : 4 as (0 à 3) et 28 autres (4 à 31), comptées par le nombre d'as.
  const parAs = [0, 1, 2, 3, 4].map((a) => binome(4, a) * binome(28, 5 - a));
  vrai("9. total = somme par nombre d'as = 201 376", parAs.reduce((s, x) => s + x, 0) === 201376);
  verif("9. exactement 2 as", parAs[2], 19656);
  verif("9. aucun as", parAs[0], 98280);
  verif("9. au moins un as", parAs.slice(1).reduce((s, x) => s + x, 0), 103096);
  arrondi("9. P ≈ 0,512", 0.512, 103096 / 201376, 0.001);
  vrai("9. le piège 4 × C(31, 4) compte trop", 4 * binome(31, 4) > 103096);
  const tr = dessin("trace", 9)[1];
  vrai("9. cases du jeu et de la main", JSON.stringify(tr) === JSON.stringify([["le jeu", 4, 28, 32], ["la main", 2, 3, 5]]));
  dit(9, "$\\dbinom{4}{2} \\times \\dbinom{28}{3} = 6 \\times 3\\,276 = 19\\,656$ mains");
  dit(9, "$201\\,376 - 98\\,280 = 103\\,096$");
}
{
  const mots = new Set(permutations([..."ANANAS"]).map((l) => l.join("")));
  vrai("10. 60 mots distincts (énumération des 720 ordres)", mots.size === 60);
  vrai("10. 10 commencent par S", [...mots].filter((m) => m[0] === "S").length === 10);
  const t = dessin("tableau", 10)[1].slice(1).join("");
  vrai("10. le mot dessiné est une anagramme de ANANAS", mots.has(t));
  dit(10, "Total : $20 \\times 3 = 60$ mots");
  dit(10, "$\\dbinom{5}{3} = 10$ mots");
}
{
  const n36 = 36n ** 8n, n26 = 26n ** 8n, n62 = 62n ** 8n;
  arrondi("11. 36⁸ ≈ 2,82 × 10¹²", 2.82, Number(n36) / 1e12);
  arrondi("11. 26⁸ ≈ 2,09 × 10¹¹", 2.09, Number(n26) / 1e11);
  arrondi("11. 36⁸ − 26⁸ ≈ 2,61 × 10¹²", 2.61, Number(n36 - n26) / 1e12);
  arrondi("11. proportion ≈ 92,6 %", 92.6, (100 * Number(n36 - n26)) / Number(n36), 0.1);
  arrondi("11. 2 821 s", 2821, Number(n36) / 1e9, 1);
  vrai("11. environ 47 min", Math.round(Number(n36) / 1e9 / 60) === 47);
  arrondi("11. 62⁸ ≈ 2,18 × 10¹⁴", 2.18, Number(n62) / 1e14);
  vrai("11. plus de 60 h", Number(n62) / 1e9 / 3600 > 60);
  vrai("11. rapport ≈ 77", Math.round(Number(n62) / Number(n36)) === 77);
  const t = dessin("tableau", 11)[1];
  vrai("11. tableau cohérent", t[1] === "2,09 × 10¹¹" && t[2] === "2,82 × 10¹²" && t[3] === "2,18 × 10¹⁴");
}
{
  // Trajets : tous les mots de 7 lettres D/H à 4 D, suivis sur le quadrillage.
  const trajets = listes(["D", "H"], 7).filter((m) => m.filter((x) => x === "D").length === 4);
  vrai("12. 35 trajets", trajets.length === 35);
  const passe = (m) => { let x = 0, y = 0; for (const s of m) { if (x === 2 && y === 1) return true; s === "D" ? x++ : y++; } return x === 2 && y === 1; };
  vrai("12. 18 passent par P", trajets.filter(passe).length === 18);
  arrondi("12. 18/35 ≈ 0,514", 0.514, 18 / 35, 0.001);
  // Le trajet dessiné : DDHDHHD, pas unités, de A à B.
  const pts = courbes(12, "figure")[0].pts;
  const mot = pts.slice(1).map(([x, y], i) => "D".repeat(x - pts[i][0]) + "H".repeat(y - pts[i][1])).join("");
  vrai(`12. le trajet dessiné est DDHDHHD (${mot})`, mot === "DDHDHHD");
  vrai("12. il passe par P", passe([...mot]));
  vrai("12. points A, B, P", JSON.stringify(termes(12, "figure").map((p) => [p.x, p.y])) === "[[0,0],[4,3],[2,1]]");
  F.enonceDit(12, "DDHDHHD");
  dit(12, "$\\dbinom{7}{3} = \\dfrac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$ trajets");
  dit(12, "$3 \\times 6 = 18$ trajets");
}
{
  vrai("13. symétrie C(n, k) = C(n, n − k) jusqu'à 12 (masques)", Array.from({ length: 13 }, (_, n) => Array.from({ length: n + 1 }, (_, k) => partiesDeTaille(n, k) === partiesDeTaille(n, n - k)).every(Boolean)).every(Boolean));
  vrai("13. Pascal jusqu'à 12", Array.from({ length: 12 }, (_, n) => Array.from({ length: n }, (_, k) => binome(n + 1, k + 1) === binome(n, k) + binome(n, k + 1)).every(Boolean)).every(Boolean));
  const t = tableauDe(13);
  t.en.forEach((k, i) => verif(`13. C(5, ${k})`, t.nombres[i], partiesDeTaille(5, k)));
  verif("13. somme 32", t.nombres.reduce((s, x) => s + x, 0), 32);
}
{
  const suites = listes(["S", "E"], 5);
  const trois = suites.filter((s) => s.filter((x) => x === "S").length === 3);
  vrai("14. 10 suites à 3 succès", trois.length === 10);
  const P = (k) => suites.filter((s) => s.filter((x) => x === "S").length === k).reduce((acc, s) => acc + s.reduce((p, x) => p * (x === "S" ? 0.8 : 0.2), 1), 0);
  verif("14. P(X = 3) = 0,2048 (par les 32 suites)", P(3), 0.2048, 1e-12);
  verif("14. P(X ≥ 4) = 0,73728", P(4) + P(5), 0.73728, 1e-12);
  barres(14).forEach((b, k) => arrondi(`14. barre ${k}`, b.value, binom(5, k, 0.8), 0.001));
  dit(14, "$P(X = 3) = 10 \\times 0{,}512 \\times 0{,}04 = 0{,}2048$");
  dit(14, "$P(X \\geqslant 4) = 0{,}4096 + 0{,}32768 = 0{,}73728$");
}
{
  const urne = dessin("billes", 15, "figure")[0].map((b) => b.label);
  vrai("15. l'urne : 5 R et 3 V", urne.filter((c) => c === "R").length === 5 && urne.filter((c) => c === "V").length === 3);
  const idx = [...urne.keys()];
  const deuxR = (l) => l.filter((i) => urne[i] === "R").length === 2;
  // Simultané : parties de 3 boules (masques).
  let tot = 0, fav = 0;
  for (let m = 0; m < 256; m++) {
    const l = idx.filter((i) => m & (1 << i));
    if (l.length === 3) { tot++; if (deuxR(l)) fav++; }
  }
  vrai("15. simultané : 56 et 30", tot === 56 && fav === 30);
  const sans = listes(idx, 3).filter((l) => new Set(l).size === 3);
  vrai("15. sans remise : 336 et 180", sans.length === 336 && sans.filter(deuxR).length === 180);
  const avec = listes(idx, 3);
  vrai("15. avec remise : 512 et 225", avec.length === 512 && avec.filter(deuxR).length === 225);
  verif("15. 30/56 = 180/336 = 15/28", 30 / 56, 180 / 336, 1e-12);
  arrondi("15. 15/28 ≈ 0,536", 0.536, 15 / 28, 0.001);
  arrondi("15. 225/512 ≈ 0,439", 0.439, 225 / 512, 0.001);
}
{
  vrai("16. 11 000 codes", listes([..."0123456789"], 3).length + listes([..."0123456789"], 4).length === 11000);
  const q = listes([..."0123456789"], 4).filter((l) => new Set(l).size === 4);
  vrai("16. 5 040 codes à chiffres distincts", q.length === 5040);
  vrai("16. 4 536 nombres (premier ≠ 0)", q.filter((l) => l[0] !== "0").length === 4536);
  vrai("16. nombres : énumération de 1000 à 9999", Array.from({ length: 9000 }, (_, i) => String(1000 + i)).filter((s) => new Set(s).size === 4).length === 4536);
  vrai("16. cases 9, 9, 8, 7", tableauDe(16).nombres.join() === "9,9,8,7");
  dit(16, "$9 \\times 9 \\times 8 \\times 7 = 4\\,536$ nombres");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  vrai("17. 45 matchs", partiesDeTaille(10, 2) === 45);
  vrai("17. 720 podiums", listes([...Array(10).keys()], 3).filter((l) => new Set(l).size === 3).length === 720);
  // Répartitions en deux poules de 5 sans nom : les masques de 5 équipes qui CONTIENNENT l'équipe 0.
  let poules = 0;
  for (let m = 0; m < 1024; m++) { let b = 0; for (let x = m; x; x &= x - 1) b++; if (b === 5 && m & 1) poules++; }
  vrai("17. 126 répartitions", poules === 126 && binome(10, 5) / 2 === 126);
  // Le graphe : 5 sommets, 10 segments distincts, toutes les paires.
  const pts = courbes(17)[0].pts;
  const cle = ([x, y]) => `${x};${y}`;
  const aretes = new Set(pts.slice(1).map((p, i) => [cle(p), cle(pts[i])].sort().join("|")));
  vrai("17. 10 segments tous différents", aretes.size === 10 && pts.length === 11);
  vrai("17. 5 sommets marqués, sur un cercle de rayon 2", termes(17).length === 5 && termes(17).every((p) => Math.abs(Math.hypot(p.x, p.y) - 2) < 1e-3));
  vrai("17. pentagone régulier (côtés égaux)", (() => { const s = termes(17); const d = s.map((p, i) => Math.hypot(p.x - s[(i + 1) % 5].x, p.y - s[(i + 1) % 5].y)); return d.every((x) => Math.abs(x - d[0]) < 2e-3); })());
  dit(17, "$\\dbinom{10}{2} = \\dfrac{10 \\times 9}{2} = 45$ matchs");
  dit(17, "$\\dbinom{9}{4} = 126$");
  dit(17, "$\\dfrac{252}{2} = 126$");
}
{
  verif("18. C(30, 5)", binome(30, 5), 142506);
  verif("18. grilles", binome(30, 5) * 5, 712530);
  const loi = [0, 1, 2, 3, 4, 5].map((k) => binome(5, k) * binome(25, 5 - k));
  vrai("18. termes 53 130 ; 63 250 ; 23 000 ; 3 000 ; 125 ; 1", loi.join() === "53130,63250,23000,3000,125,1");
  vrai("18. Vandermonde : somme = C(30, 5)", loi.reduce((s, x) => s + x, 0) === 142506);
  arrondi("18. P(3 bons) ≈ 0,021", 0.021, 3000 / 142506, 0.001);
  arrondi("18. P(au moins 1) ≈ 0,627", 0.627, 1 - 53130 / 142506, 0.001);
  arrondi("18. P(gros lot) ≈ 1,4 × 10⁻⁶", 1.4, 1e6 / 712530, 0.1);
  barres(18).forEach((b, k) => arrondi(`18. barre ${k}`, b.value, loi[k] / 142506, 0.001));
  vrai("18. 0 ou 1 bon numéro : plus de 80 %", (loi[0] + loi[1]) / 142506 > 0.8);
  dit(18, "$142\\,506 \\times 5 = 712\\,530$ grilles");
  dit(18, "$\\dbinom{5}{3} \\times \\dbinom{25}{2} = 10 \\times 300 = 3\\,000$");
}
{
  const chemins = listes(["G", "D"], 6);
  vrai("19. 64 chemins", chemins.length === 64);
  const parCase = [0, 1, 2, 3, 4, 5, 6].map((k) => chemins.filter((c) => c.filter((x) => x === "D").length === k).length);
  vrai("19. ligne 6 : 1, 6, 15, 20, 15, 6, 1", parCase.join() === "1,6,15,20,15,6,1");
  barres(19).forEach((b, k) => verif(`19. case ${k} : chemins sur 64`, b.value, parCase[k]));
  verif("19. 20/64 = 0,3125", 20 / 64, 0.3125);
  verif("19. espérance 3", parCase.reduce((s, n, k) => s + (k * n) / 64, 0), 3, 1e-12);
  dit(19, "$\\dfrac{20}{64} = 0{,}3125$");
}
{
  const p = (n) => { let q = 1; for (let i = 0; i < n; i++) q *= (365 - i) / 365; return 1 - q; };
  // Contrôle par simulation déterministe (générateur congruentiel) : 20 000 classes de 23.
  let graine = 2026, succes = 0;
  const alea = () => (graine = (graine * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let e = 0; e < 20000; e++) {
    const vu = new Set();
    let double = false;
    for (let i = 0; i < 23; i++) { const d = Math.floor(alea() * 365); if (vu.has(d)) double = true; vu.add(d); }
    if (double) succes++;
  }
  vrai(`20. simulation : ${succes / 20000} proche de p23`, Math.abs(succes / 20000 - p(23)) < 0.02);
  arrondi("20. p23 ≈ 0,507", 0.507, p(23), 0.001);
  arrondi("20. p30 ≈ 0,706", 0.706, p(30), 0.001);
  vrai("20. 23 est le premier n avec p > 1/2", p(22) < 0.5 && p(23) > 0.5);
  verif("20. 253 paires", binome(23, 2), 253);
  const pts = courbes(20)[0].pts;
  vrai("20. courbe : (n/10 ; p(n))", pts.every(([x, y]) => Math.abs(y - p(Math.round(x * 10))) <= 0.0005 + 1e-12));
  vrai("20. point (2,3 ; p23) et droite y = 0,5", termes(20)[0].x === 2.3 && Math.abs(termes(20)[0].y - p(23)) < 0.0005 && dessin("repere", 20)[3] === 0.5);
  dit(20, "$p_{23} \\approx 0{,}507$ et $p_{30} \\approx 0{,}706$");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce que montre le dessin (⭐ Sur le dessin)", F.feuille.corrections.every((t) => /Sur le dessin/.test(t)));
F.fin();
