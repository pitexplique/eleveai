// Recalcul indépendant de la feuille « Sommes de variables aléatoires » de
// terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-variable-aleatoire.tsx.
//
// ⭐ Un AUTRE chemin que le corrigé : les lois des sommes sont refaites par
// ÉNUMÉRATION des issues (dés, cartes, répartitions des manteaux) ou par
// CONVOLUTION exacte (100 parties, 30 clients), jamais par les formules
// E(S) = nE(X) et V(S) = nV(X) que le corrigé applique. Les dessins (tableaux,
// barres, arbres, triangle, points) sont relus dans le source ; le programme
// Python est EXÉCUTÉ (graine fixée).
// Usage : node scripts/verifier-exercices-terminale-spe-variable-aleatoire.mjs

import { feuilleTerminale, executerPython, binom } from "./verifier-exercices-terminale-commun.mjs";

const F = feuilleTerminale({ fichier: "lib/fiches-exercices/maths-terminale-variable-aleatoire.tsx", notion: "variable_aleatoire" });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, courbes, dessin, tableauDe, nombre } = F;

/** Une loi = liste de [valeur, probabilité]. */
const E = (loi) => loi.reduce((s, [x, p]) => s + x * p, 0);
const V = (loi) => loi.reduce((s, [x, p]) => s + x * x * p, 0) - E(loi) ** 2;
/** Loi de X + Y (indépendantes), par produit des cases puis regroupement. */
const somme = (a, b) => {
  const m = new Map();
  for (const [x, p] of a) for (const [y, q] of b) m.set(x + y, (m.get(x + y) ?? 0) + p * q);
  return [...m.entries()].sort((u, v) => u[0] - v[0]);
};
const puissance = (loi, n) => { let r = [[0, 1]]; for (let i = 0; i < n; i++) r = somme(r, loi); return r; };
const de = (k) => Array.from({ length: k }, (_, i) => [i + 1, 1 / k]);
const barres = (k, role) => dessin("diagramme", k, role)[1];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const [entetes, lignes, surligne] = dessin("tableauProba", 1, "figure");
  vrai("1. tableau des sommes : case = ligne + colonne", lignes.every((l) => l.slice(1).every((c, j) => Number(c) === Number(l[0]) + Number(entetes[j + 1]))));
  vrai("1. cases surlignées = S = 5", surligne.length === 4 && surligne.every(([r, c]) => Number(lignes[r][c]) === 5));
  const S = somme(de(4), de(4));
  vrai("1. barres en seizièmes = loi énumérée", JSON.stringify(barres(1).map((b) => [Number(b.label), b.value])) === JSON.stringify(S.map(([s, p]) => [s, Math.round(p * 16)])));
  verif("1. E(S) = 5", E(S), 5);
  verif("1. E(X1) = 2,5", E(de(4)), 2.5);
  dit(1, "= \\dfrac{80}{16} = 5$");
  dit(1, "$P(S = 5) = \\dfrac{4}{16}$");
}
{
  const t = dessin("trace", 2)[1];
  verif("2. 1,2 × 30", 1.2 * 30, nombre(t[0][3]));
  verif("2. 1,5 × 18", 1.5 * 18, nombre(t[1][3]));
  verif("2. E(R) = 63", 1.2 * 30 + 1.5 * 18, nombre(t[2][3]), 1e-12);
  dit(2, "= 36 + 27 = 63$ €");
}
{
  const X = barres(3, "figure").map((b) => [Number(b.label), b.value / 100]);
  verif("3. E(X) = 1,1", E(X), 1.1, 1e-12);
  verif("3. V(X) = 0,49", V(X), 0.49, 1e-12);
  const Y = X.map(([x, p]) => [10 * x - 4, p]);
  vrai("3. barres de Y = image de X", JSON.stringify(barres(3, "schema").map((b) => [nombre(b.label), b.value / 100])) === JSON.stringify(Y));
  verif("3. E(Y) = 7 (par la loi de Y)", E(Y), 7, 1e-12);
  verif("3. V(Y) = 49 (par la loi de Y)", V(Y), 49, 1e-9);
  dit(3, "$\\sigma(Y) = \\sqrt{49} = 7$");
  dit(3, "$E(Y) = -0{,}8 + 3 + 4{,}8 = 7$");
}
{
  // X, Y indépendantes d'écarts types 3 et 4 : on en prend deux concrètes (±3, ±4 à 1/2).
  const X = [[-3, 0.5], [3, 0.5]], Y = [[-4, 0.5], [4, 0.5]];
  verif("4. σ(X + Y) = 5", Math.sqrt(V(somme(X, Y))), 5, 1e-12);
  verif("4. σ(X − Y) = 5", Math.sqrt(V(somme(X, Y.map(([y, p]) => [-y, p])))), 5, 1e-12);
  const [pts, opts] = dessin("triangle", 4);
  const d = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  vrai("4. triangle 3-4-5 rectangle en A", d(pts.A, pts.B) === 4 && d(pts.A, pts.C) === 3 && d(pts.B, pts.C) === 5 && opts.droit === "A");
  vrai("4. côtés étiquetés comme les longueurs", opts.cotes.AB.endsWith("4") && opts.cotes.CA.endsWith("3") && opts.cotes.BC.endsWith("5"));
  dit(4, "$\\sigma(X + Y) = \\sqrt{25} = 5$");
}
{
  const X = [[0, 0.7], [1, 0.3]], Y = [[0, 0.5], [1, 0.3], [2, 0.2]];
  const [entetes, lignes, surligne] = dessin("tableauProba", 5);
  vrai("5. cases = produits", lignes.every((l, i) => l.slice(1).every((c, j) => Math.abs(nombre(c) - X[i][1] * Y[j][1]) < 1e-12)));
  vrai("5. entêtes : probabilités de Y", entetes.slice(1).every((e, j) => e.includes(String(Y[j][1]).replace(".", ","))));
  vrai("5. cases surlignées = S = 1", surligne.every(([r, c]) => r + (c - 1) === 1) && surligne.length === 2);
  const S = somme(X, Y);
  vrai("5. loi de S : 0,35 ; 0,36 ; 0,23 ; 0,06", S.map(([, p]) => p.toFixed(2)).join() === "0.35,0.36,0.23,0.06");
  verif("5. E(S) = 1", E(S), 1, 1e-12);
  dit(5, "$P(S = 1) = 0{,}21 + 0{,}15 = 0{,}36$");
  dit(5, "$P(S = 2) = 0{,}14 + 0{,}09 = 0{,}23$");
}
{
  const A = de(6).map(([x, p]) => [2 * x, p]);
  const B = somme(de(6), de(6));
  verif("6. V(X) = 35/12", V(de(6)), 35 / 12, 1e-12);
  verif("6. E(A) = E(B) = 7", E(A), E(B), 1e-12);
  verif("6. V(A) = 35/3", V(A), 35 / 3, 1e-12);
  verif("6. V(B) = 35/6", V(B), 35 / 6, 1e-12);
  arrondi("6. σ(A) ≈ 3,42", 3.42, Math.sqrt(V(A)));
  arrondi("6. σ(B) ≈ 2,42", 2.42, Math.sqrt(V(B)));
  arrondi("6. 35/3 ≈ 11,67", 11.67, 35 / 3);
  arrondi("6. 35/6 ≈ 5,83", 5.83, 35 / 6);
  const [bA, bB] = F.dessins("diagramme", 6).map((a) => a.args[1]);
  vrai("6. barres de A en 36es", JSON.stringify(bA.map((b) => [Number(b.label), b.value])) === JSON.stringify(A.map(([x, p]) => [x, Math.round(p * 36)])));
  vrai("6. barres de B en 36es", JSON.stringify(bB.map((b) => [Number(b.label), b.value])) === JSON.stringify(B.map(([x, p]) => [x, Math.round(p * 36)])));
}
{
  pointsSur("7. écart type de n paquets, en unités de 5 g", termes(7), (n) => Math.sqrt(n));
  vrai("7. droite orange y = x", JSON.stringify(courbes(7)[0].q) === "[0,1,0]");
  // Un paquet modèle : 1000 ± 5 g à 1/2 ; 12 paquets par convolution.
  const S = puissance([[995, 0.5], [1005, 0.5]], 12);
  verif("7. E(S) = 12 000", E(S), 12000, 1e-12);
  verif("7. V(S) = 300", V(S), 300, 1e-8);
  vrai("7. σ(S) ≈ 17 g", Math.round(Math.sqrt(V(S))) === 17);
  dit(7, "$\\sigma(S) = \\sqrt{300} \\approx 17$ g");
}
{
  const t = tableauDe(8);
  t.en.forEach((x, i) => verif(`8. Z(${x})`, t.nombres[i], (x - 11) / 4));
  verif("8. Tom : (13 − 9)/2", (13 - 9) / 2, 2);
  // Z de moyenne 0 et d'écart type 1, sur une note modèle 11 ± 4.
  const Z = [[7, 0.5], [15, 0.5]].map(([x, p]) => [(x - 11) / 4, p]);
  vrai("8. E(Z) = 0, σ(Z) = 1", E(Z) === 0 && V(Z) === 1);
  dit(8, "= 1{,}5$ : Léa");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  // Les 52 cartes, une à une.
  const cartes = ["pique", "trefle", "carreau", "coeur"].flatMap((c) => Array.from({ length: 13 }, () => c));
  const X = cartes.map((c) => (c === "coeur" ? 1 : 0)), Y = cartes.map((c) => (c === "coeur" || c === "carreau" ? 1 : 0));
  const moy = (t) => t.reduce((s, x) => s + x, 0) / t.length;
  const vari = (t) => moy(t.map((x) => x * x)) - moy(t) ** 2;
  const S = X.map((x, i) => x + Y[i]);
  verif("9. E(S) = 3/4", moy(S), 0.75, 1e-12);
  verif("9. V(X) = 3/16", vari(X), 3 / 16, 1e-12);
  verif("9. V(Y) = 4/16", vari(Y), 4 / 16, 1e-12);
  verif("9. V(S) = 11/16", vari(S), 11 / 16, 1e-12);
  vrai("9. V(S) ≠ V(X) + V(Y)", Math.abs(vari(S) - vari(X) - vari(Y)) > 0.1);
  const t = tableauDe(9);
  vrai("9. tableau : S par couleur", t.nombres.join() === "0,0,1,2");
  dit(9, "$V(S) = \\dfrac{5}{4} - \\dfrac{9}{16} = \\dfrac{11}{16}$");
}
{
  const N = Array.from({ length: 21 }, (_, k) => [k, binom(20, k, 0.25)]);
  verif("10. E(N) = 5", E(N), 5, 1e-12);
  verif("10. V(N) = 3,75", V(N), 3.75, 1e-10);
  arrondi("10. σ(N) ≈ 1,94", 1.94, Math.sqrt(3.75));
  const T = N.map(([k, p]) => [4 * k - 20, p]);
  verif("10. E(T) = 0", E(T), 0, 1e-10);
  arrondi("10. σ(T) ≈ 7,75", 7.75, Math.sqrt(V(T)));
  barres(10).forEach((b) => arrondi(`10. barre ${b.label} (%)`, b.value, binom(20, Number(b.label), 0.25) * 100, 1));
  vrai("10. P(N ≥ 11) < 0,5 %", N.slice(11).reduce((s, [, p]) => s + p, 0) < 0.005);
  dit(10, "$T = 3N - (20 - N) = 4N - 20$");
  dit(10, "$\\sigma(N) = \\sqrt{3{,}75} \\approx 1{,}94$");
}
{
  const D = [[4, 0.5], [8, 0.5]]; // une distance modèle : E = 6, σ = 2
  const P = D.map(([d, p]) => [2.5 * d + 4, p]), Q = D.map(([d, p]) => [30 - 2 * d, p]);
  verif("11. E(P) = 19", E(P), 19);
  verif("11. σ(P) = 5", Math.sqrt(V(P)), 5, 1e-12);
  verif("11. σ(Q) = 4", Math.sqrt(V(Q)), 4, 1e-12);
  const t = dessin("trace", 11)[1];
  vrai("11. tableau : P = 2,5D + 4", t[0].slice(1).every((d, i) => 2.5 * Number(d) + 4 === Number(t[1][i + 1])));
  dit(11, "$\\sigma(Q) = |-2| \\times 2 = 4$ €");
}
{
  const G = barres(12, "figure").map((b) => [nombre(b.label), b.value / 100]);
  verif("12. E(G) = 0,1", E(G), 0.1, 1e-12);
  verif("12. V(G) = 10,29", V(G), 10.29, 1e-12);
  arrondi("12. σ(G) ≈ 3,21", 3.21, Math.sqrt(V(G)));
  // 100 parties : S = 7K − 200, K ~ B(100 ; 0,3) (nombre de parties gagnées).
  const S = Array.from({ length: 101 }, (_, k) => [7 * k - 200, binom(100, k, 0.3)]);
  verif("12. E(S) = 10", E(S), 10, 1e-9);
  arrondi("12. σ(S) ≈ 32,1", 32.1, Math.sqrt(V(S)), 0.1);
  vrai("12. perdre sur 100 parties n'est pas rare (P(S < 0) > 30 %)", S.filter(([s]) => s < 0).reduce((a, [, p]) => a + p, 0) > 0.3);
  vrai("12. √102 900 ≈ 321", Math.round(Math.sqrt(102900)) === 321);
  dit(12, "$\\sigma(S) = \\sqrt{1\\,029} \\approx 32{,}1$ €");
}
{
  const racine = dessin("arbre", 13, "figure")[0];
  const loi = new Map();
  for (const bus of racine) for (const f of bus.enfants) {
    const [marche, t] = f.label.split(" : T = ").map(Number);
    vrai(`13. feuille ${f.label} : bus + marche`, Number(bus.label.split(" ")[1]) + marche === t);
    loi.set(t, (loi.get(t) ?? 0) + nombre(bus.proba) * nombre(f.proba));
  }
  const T = [...loi.entries()].sort((a, b) => a[0] - b[0]);
  vrai("13. loi de T : 0,3 ; 0,38 ; 0,12 ; 0,12 ; 0,08", T.map(([, p]) => p.toFixed(2)).join() === "0.30,0.38,0.12,0.12,0.08");
  verif("13. E(T) = 21,5", E(T), 21.5, 1e-12);
  verif("13. V(T) = 38,25", V(T), 38.25, 1e-9);
  arrondi("13. σ(T) ≈ 6,2", 6.2, Math.sqrt(V(T)), 0.1);
  verif("13. P(T ≤ 25) = 0,8", T.filter(([t]) => t <= 25).reduce((s, [, p]) => s + p, 0), 0.8, 1e-12);
  dit(13, "$E(T) = 4{,}5 + 7{,}6 + 3 + 3{,}6 + 2{,}8 = 21{,}5$ min");
}
{
  verif("14. σ(J) = 0,05", Math.sqrt(0.03 ** 2 + 0.04 ** 2), 0.05, 1e-12);
  arrondi("14. σ(J) ≈ 0,032 avec le nouveau tenon", 0.032, Math.sqrt(0.03 ** 2 + 0.01 ** 2), 0.001);
  vrai("14. plus de 3 écarts types", 0.1 / Math.sqrt(0.001) > 3);
  const [min, max, ivs, pas, pts] = dessin("intervalles", 14);
  vrai("14. droite en centièmes : [0 ; 20] centré sur 10", ivs[0].de === 0 && ivs[0].a === 20 && pts[0].value === 10 && min < 0 && max > 20 && pas === 5);
  dit(14, "donc $\\sigma(J) = 0{,}05$ mm");
}
{
  const lignes = dessin("programme", 15, "figure")[0];
  const sortie = executerPython(lignes, "from random import seed\nseed(2026)\nprint(ecart(200000))");
  if (sortie === null) console.log("  (Python absent : ecart(200000) non exécuté)");
  else verif(`15. Python : ecart(200000) = ${Number(sortie).toFixed(3)} ≈ 35/6`, Number(sortie), 35 / 6, 0.02);
  verif("15. V(X1 + X2) = 35/6 (énumération)", V(somme(de(6), de(6))), 35 / 6, 1e-12);
  verif("15. E(X²) = 91/6", de(6).reduce((s, [x, p]) => s + x * x * p, 0), 91 / 6, 1e-12);
  verif("15. (182 − 147)/12", (182 - 147) / 12, 35 / 12);
  dit(15, "\\approx 5{,}83$");
}
{
  const permutations = (t) => (t.length <= 1 ? [t] : t.flatMap((x, i) => permutations([...t.slice(0, i), ...t.slice(i + 1)]).map((p) => [x, ...p])));
  const fixes = (p) => p.filter((x, i) => x === i + 1).length;
  const lignes = dessin("trace", 16)[1];
  const p3 = permutations([1, 2, 3]);
  vrai("16. tableau : les 6 répartitions et leur X", p3.every((p, i) => lignes[i][0] === p.join(" ") && Number(lignes[i][1]) === fixes(p)));
  vrai("16. moyenne = 1 (n = 3)", p3.reduce((s, p) => s + fixes(p), 0) / 6 === 1 && lignes[6][1] === "1");
  vrai("16. E(X) = 1 pour n = 4, 5, 6", [4, 5, 6].every((n) => { const ps = permutations(Array.from({ length: n }, (_, i) => i + 1)); return ps.reduce((s, p) => s + fixes(p), 0) === ps.length; }));
  vrai("16. X = 2 impossible pour n = 3", p3.every((p) => fixes(p) !== 2));
  dit(16, "$E(X) = n \\times \\dfrac{1}{n} = 1$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const D = barres(17, "figure").map((b) => [Number(b.label.split(" ")[0]), b.value / 100]);
  verif("17. E(D) = 2,1", E(D), 2.1, 1e-12);
  verif("17. V(D) = 1,09", V(D), 1.09, 1e-12);
  const T = puissance(D, 30);
  verif("17. E(T) = 63 (convolution)", E(T), 63, 1e-9);
  verif("17. V(T) = 32,7 (convolution)", V(T), 32.7, 1e-8);
  arrondi("17. σ(T) ≈ 5,7", 5.7, Math.sqrt(V(T)), 0.1);
  arrondi("17. rapport n = 30 ≈ 0,09", 0.09, Math.sqrt(32.7) / 63);
  arrondi("17. √130,8 ≈ 11,4", 11.4, Math.sqrt(130.8), 0.1);
  arrondi("17. rapport n = 120 ≈ 0,045", 0.045, Math.sqrt(120 * 1.09) / 252, 0.001);
  vrai("17. 70 − 63 : un peu plus d'un écart type", (70 - 63) / Math.sqrt(32.7) > 1 && (70 - 63) / Math.sqrt(32.7) < 1.5);
  dit(17, "$V(T) = 30 \\times 1{,}09 = 32{,}7$");
}
{
  const racine = dessin("arbre", 18, "figure")[0];
  const N = racine.flatMap((p) => p.enfants.map((f) => [nombre(f.label.split("N = ")[1]), nombre(p.proba) * nombre(f.proba)]));
  const direct = somme(somme([[0, 0.5], [2, 0.5]], [[0, 5 / 6], [6, 1 / 6]]), [[-3, 1]]);
  vrai("18. feuilles = gain net pièce + dé − 3", JSON.stringify(N.map(([x]) => x).sort((a, b) => a - b)) === JSON.stringify(direct.map(([x]) => x)));
  verif("18. E(N) = −1", E(N), -1, 1e-12);
  verif("18. V(N) = 6", V(N), 6, 1e-12);
  verif("18. E(N²) = 7", N.reduce((s, [x, p]) => s + x * x * p, 0), 7, 1e-12);
  arrondi("18. σ(B) ≈ 77,5", 77.5, Math.sqrt(6000), 0.1);
  arrondi("18. perte à près de 13 écarts types", 13, 1000 / Math.sqrt(6000), 1);
  verif("18. P(perte du joueur) = 10/12", N.filter(([x]) => x < 0).reduce((s, [, p]) => s + p, 0), 10 / 12, 1e-12);
  dit(18, "$E(N^2) = \\dfrac{25 + 9 + 5 + 45}{12} = 7$");
}
{
  pointsSur("19. E + 3σ en centaines de kg", termes(19), (n) => (75 * n + 36 * Math.sqrt(n)) / 100);
  vrai("19. horizontale 6,3", dessin("repere", 19)[3] === 6.3);
  arrondi("19. σ(S8) ≈ 33,9", 33.9, Math.sqrt(8 * 144), 0.1);
  arrondi("19. 0,88 écart type", 0.88, 30 / Math.sqrt(1152));
  arrondi("19. n = 7 : 620,2", 620.2, 525 + 36 * Math.sqrt(7), 0.1);
  arrondi("19. n = 8 : 701,8", 701.8, 600 + 36 * Math.sqrt(8), 0.1);
  let n = 0;
  while (75 * (n + 1) + 36 * Math.sqrt(n + 1) <= 630) n++;
  vrai(`19. au plus ${n} usagers`, n === 7);
  dit(19, "au plus $7$ usagers");
}
{
  pointsSur("20. σ(Mn) = 2/√n", termes(20), (n) => 2 / Math.sqrt(n));
  vrai("20. horizontale 0,5", dessin("repere", 20)[3] === 0.5);
  // Une mesure modèle r ± 2 à 1/2 ; M4 par convolution de 4 mesures.
  const M4 = puissance([[-2, 0.5], [2, 0.5]], 4).map(([s, p]) => [s / 4, p]);
  verif("20. σ(M4) = 1", Math.sqrt(V(M4)), 1, 1e-12);
  let n = 1;
  while (2 / Math.sqrt(n) > 0.5) n++;
  vrai(`20. premier n : ${n}`, n === 16);
  dit(20, "soit $n \\geqslant 16$");
}

enonceDit(3, "$Y = 10X - 4$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
F.fin();
