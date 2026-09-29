// Recalcul indépendant de la feuille « Concentration et loi des grands
// nombres » de terminale spé (29/09/2026) :
// lib/fiches-exercices/maths-terminale-concentration-echantillonnage.tsx.
//
// ⭐ Un AUTRE chemin que le corrigé : chaque majorant annoncé est recalculé,
// puis CONFRONTÉ à la probabilité exacte (loi binomiale, convolution de 50 dés)
// — le majorant doit être au-dessus ; les tailles d'échantillon sont cherchées
// pas à pas (premier n qui convient), pas par l'algèbre du corrigé ; les
// dessins (intervalles, barres, courbes, points) sont relus dans le source ;
// les deux programmes Python sont EXÉCUTÉS (graine fixée).
// Usage : node scripts/verifier-exercices-terminale-spe-concentration-echantillonnage.mjs

import { feuilleTerminale, executerPython, binom, integrale } from "./verifier-exercices-terminale-commun.mjs";

const F = feuilleTerminale({ fichier: "lib/fiches-exercices/maths-terminale-concentration-echantillonnage.tsx", notion: "concentration_echantillonnage" });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, courbes, dessin, tableauDe } = F;

const E = (loi) => loi.reduce((s, [x, p]) => s + x * p, 0);
const V = (loi) => loi.reduce((s, [x, p]) => s + x * x * p, 0) - E(loi) ** 2;
/** Premier entier n ≥ 1 qui vérifie la condition (tolérance des flottants). */
const premier = (ok, depart = 1) => { let n = depart; while (!ok(n)) n++; return n; };
const leq = (a, b) => a <= b + 1e-12;
/** P(X = k) pour X ~ B(n, p), en logarithmes : `binom` (BigInt) est trop lent à n = 10 000, et p^n y tombe à 0. */
const lnFact = [0];
const lnF = (m) => { while (lnFact.length <= m) lnFact.push(lnFact[lnFact.length - 1] + Math.log(lnFact.length)); return lnFact[m]; };
const pmf = (n, k, p) => Math.exp(lnF(n) - lnF(k) - lnF(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
/** P(|X − c| ≥ d) pour X ~ B(n, p), exacte. */
const ecartBinom = (n, p, c, d) => { let s = 0; for (let k = 0; k <= n; k++) if (Math.abs(k - c) >= d - 1e-9) s += pmf(n, k, p); return s; };
vrai("pmf en logarithmes = binom exacte (n = 100)", Array.from({ length: 101 }, (_, k) => Math.abs(pmf(100, k, 0.3) - binom(100, k, 0.3)) < 1e-12).every(Boolean));
const inter = (k) => { const [min, max, ivs, pas, pts = []] = dessin("intervalles", k); return { min, max, ivs, pas, pts }; };

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const t = tableauDe(1);
  t.en.forEach((n, i) => verif(`1. σ(M) pour n = ${n}`, t.nombres[i], 3 / Math.sqrt(n), 1e-12));
  verif("1. V(M25) = 0,36", 9 / 25, 0.36, 1e-12);
  vrai("1. n = 100 pour σ = 0,3", premier((n) => leq(3 / Math.sqrt(n), 0.3)) === 100);
  dit(1, "soit $n = 100$");
}
{
  // Une loi de variance 16 qui ATTEINT le majorant : l'inégalité est optimale.
  const X = [[40, 0.08], [50, 0.84], [60, 0.08]];
  verif("2. loi extrême : E = 50, V = 16", V(X), 16, 1e-12);
  verif("2. elle atteint 0,16", X.filter(([x]) => Math.abs(x - 50) >= 10).reduce((s, [, p]) => s + p, 0), 16 / 100, 1e-12);
  const d = inter(2);
  vrai("2. droite : ]40 ; 60[ autour de 50", d.ivs[0].de === 40 && d.ivs[0].a === 60 && d.pts[0].value === 50 && !d.ivs[0].deInclus && !d.ivs[0].aInclus);
  vrai("2. étiquette : au moins 84 %", d.ivs[0].label === "au moins 84 %");
  dit(2, "\\geqslant 1 - 0{,}16 = 0{,}84$");
}
{
  const [cb] = courbes(3);
  vrai("3. courbe y = 1/x²", cb.pts.every(([x, y]) => Math.abs(y - 1 / (x * x)) < 6e-4));
  pointsSur("3. majorants 1/k²", termes(3), (k) => 1 / (k * k));
  arrondi("3. 1/9 ≈ 0,11", 0.11, 1 / 9);
  vrai("3. horizontale y = 1", dessin("repere", 3)[3] === 1);
  // Chebychev sur une loi concrète (dé) : P(|X − 3,5| ≥ 2σ) ≤ 1/4.
  const de = Array.from({ length: 6 }, (_, i) => [i + 1, 1 / 6]);
  const s = Math.sqrt(V(de));
  vrai("3. vérifié sur un dé pour k = 1, 1,5, 2", [1, 1.5, 2].every((k) => de.filter(([x]) => Math.abs(x - 3.5) >= k * s).length / 6 <= 1 / (k * k)));
}
{
  const exact = ecartBinom(100, 0.5, 50, 10);
  arrondi("4. P(X ≤ 40) ≈ 0,0284", 0.0284, ecartBinom(100, 0.5, 50, 10) / 2, 0.0001);
  arrondi("4. P(|X − 50| ≥ 10) ≈ 0,057", 0.057, exact, 0.001);
  vrai("4. majorant 0,25 plus de 4 fois la vraie valeur", 25 / 100 > 4 * exact);
  const P = (a, b) => { let s = 0; for (let k = a; k <= b; k++) s += binom(100, k, 0.5); return s * 100; };
  const attendu = [P(0, 40), P(41, 49), P(50, 50), P(51, 59), P(60, 100)];
  F.dessin("diagramme", 4)[1].forEach((b, i) => arrondi(`4. classe « ${b.label} » (%)`, b.value, attendu[i], 1));
  dit(4, "\\approx 2 \\times 0{,}0284 \\approx 0{,}057$");
}
{
  const t = tableauDe(5);
  t.en.forEach((n, i) => verif(`5. majorant n = ${n}`, t.nombres[i], 4 / (n * 0.5 ** 2), 1e-12));
  dit(5, "= 0{,}16$");
}
{
  vrai("6. premier n : 4 500", premier((n) => leq(9 / (n * 0.2 ** 2), 0.05)) === 4500);
  const t = tableauDe(6);
  t.en.forEach((n, i) => verif(`6. majorant n = ${n}`, t.nombres[i], 9 / (n * 0.04), 1e-12));
  dit(6, "donc $n \\geqslant 4\\,500$");
}
{
  pointsSur("7. P(|Fn − 0,5| ≥ 0,1) exacte, n = 10 à 100", termes(7, "figure"), (x) => ecartBinom(10 * x, 0.5, 5 * x, x));
  vrai("7. décroissante", termes(7, "figure").every((p, i, t) => i === 0 || p.y < t[i - 1].y));
  dit(7, "environ $0{,}75$ pour $n = 10$, $0{,}20$ pour $n = 50$, $0{,}06$ pour $n = 100$");
}
{
  const loi = Array.from({ length: 401 }, (_, k) => [k / 400, pmf(400, k, 0.3)]);
  verif("8. E(F) = 0,3", E(loi), 0.3, 1e-10);
  verif("8. V(F) = 0,000525", V(loi), 0.000525, 1e-8);
  verif("8. majorant 0,21", 0.000525 / 0.0025, 0.21, 1e-12);
  vrai("8. vraie probabilité sous le majorant", ecartBinom(400, 0.3, 120, 20) <= 0.21);
  const d = inter(8);
  vrai("8. droite : ]25 ; 35[ autour de 30", d.ivs[0].de === 25 && d.ivs[0].a === 35 && d.pts[0].value === 30);
  dit(8, "= 0{,}21$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  verif("9. V(M) = 25", 40 ** 2 / 64, 25);
  verif("9. majorant 1/9", 1600 / (64 * 225), 1 / 9, 1e-12);
  const d = inter(9);
  vrai("9. droite : ]185 ; 215[ autour de 200", d.ivs[0].de === 185 && d.ivs[0].a === 215 && d.pts[0].value === 200);
  dit(9, "= \\dfrac{1}{9} \\approx 0{,}11$");
}
{
  verif("10. majorant 7/30", (35 / 12) / (50 * 0.25), 7 / 30, 1e-12);
  // Loi EXACTE de la somme de 50 dés, par convolution : P(150 < S < 200).
  let loi = [1];
  for (let i = 0; i < 50; i++) {
    const suivante = new Array(loi.length + 6).fill(0);
    loi.forEach((p, s) => { for (let f = 1; f <= 6; f++) suivante[s + f] += p / 6; });
    loi = suivante;
  }
  const exact = loi.reduce((a, p, s) => a + (s > 150 && s < 200 ? p : 0), 0);
  vrai(`10. P(3 < M50 < 4) exacte = ${exact.toFixed(3)} ≥ 23/30`, exact >= 23 / 30);
  arrondi("10. 7/30 ≈ 0,23", 0.23, 7 / 30);
  arrondi("10. 23/30 ≈ 0,77", 0.77, 23 / 30);
  const d = inter(10);
  vrai("10. droite : ]3 ; 4[ autour de 3,5", d.ivs[0].de === 3 && d.ivs[0].a === 4 && d.pts[0].value === 3.5);
  dit(10, "= \\dfrac{7}{30} \\approx 0{,}23$");
}
{
  verif("11. V(F) = 0,0002496", (0.52 * 0.48) / 1000, 0.0002496, 1e-12);
  arrondi("11. σ(F) ≈ 0,016", 0.016, Math.sqrt(0.0002496), 0.001);
  arrondi("11. majorant ≈ 0,0998", 0.0998, 0.0002496 / 0.0025, 0.0001);
  vrai("11. vraie probabilité sous le majorant", ecartBinom(1000, 0.52, 520, 50) <= 0.0998);
  verif("11. avec p(1 − p) ≤ 1/4 : 0,1", 1 / (4 * 1000) / 0.0025, 0.1, 1e-12);
  const d = inter(11);
  vrai("11. droite : ]47 ; 57[ autour de 52, qui déborde sous 50", d.ivs[0].de === 47 && d.ivs[0].a === 57 && d.pts[0].value === 52 && d.ivs[0].de < 50);
}
{
  vrai("12. parabole p(1 − p)", JSON.stringify(courbes(12)[0].q) === "[-1,1,0]");
  vrai("12. sommet (0,5 ; 0,25) marqué", termes(12)[0].x === 0.5 && termes(12)[0].y === 0.25);
  vrai("12. p(1 − p) ≤ 1/4 sur [0 ; 1]", Array.from({ length: 1001 }, (_, i) => i / 1000).every((p) => p * (1 - p) <= 0.25 + 1e-15));
  verif("12. 1/(4 × 0,0004) = 625", 1 / (4 * 0.0004), 625, 1e-12);
  vrai("12. premier n : 12 500", premier((n) => leq(625 / n, 0.05), 10000) === 12500);
  dit(12, "donne $n \\geqslant 12\\,500$");
}
{
  const lignes = dessin("programme", 13, "figure")[0];
  const sortie = executerPython(lignes, "from random import seed\nseed(2026)\nprint(freq(100000))");
  if (sortie === null) console.log("  (Python absent : freq(100000) non exécuté)");
  else vrai(`13. Python : freq(100000) = ${sortie}, à moins de 0,01 de 1/6`, Math.abs(Number(sortie) - 1 / 6) < 0.01);
  verif("13. majorant 1/72", (5 / 36) / (100000 * 0.0001), 1 / 72, 1e-12);
  arrondi("13. 1/72 ≈ 0,014", 0.014, 1 / 72, 0.001);
  arrondi("13. 1 − 1/72 ≈ 0,986", 0.986, 1 - 1 / 72, 0.001);
  dit(13, "$\\dfrac{5}{360} = \\dfrac{1}{72} \\approx 0{,}014$");
}
{
  verif("14. majorant 0,01", (0.25 / 10000) / 0.0025, 0.01, 1e-12);
  const d = inter(14);
  vrai("14. F = 57 hors de ]45 ; 55[", d.pts[0].value === 5700 / 100 && !(d.pts[0].value > d.ivs[0].de && d.pts[0].value < d.ivs[0].a));
  vrai("14. si la pièce est équilibrée, P(|F − 0,5| ≥ 0,07) est infime", ecartBinom(10000, 0.5, 5000, 700) < 1e-30);
  dit(14, "= 0{,}01$");
}
{
  const t = tableauDe(15);
  t.en.forEach((n, i) => verif(`15. majorant n = ${n}`, t.nombres[i], 0.64 / (n * 0.04), 1e-12));
  vrai("15. premier n : 160", premier((n) => leq(0.64 / (n * 0.04), 0.1)) === 160);
  verif("15. δ garanti avec 40 mesures", Math.sqrt(0.64 / (40 * 0.1)), 0.4, 1e-12);
  dit(15, "donne $n \\geqslant 160$");
}
{
  const G = [[1, 18 / 37], [-1, 19 / 37]];
  verif("16. E(G) = −1/37", E(G), -1 / 37, 1e-12);
  arrondi("16. −1/37 ≈ −0,027", -0.027, -1 / 37, 0.001);
  arrondi("16. V(G) ≈ 0,999", 0.999, V(G), 0.001);
  arrondi("16. majorant n = 10 000 ≈ 0,25", 0.25, V(G) / (10000 * 0.0004));
  arrondi("16. majorant n = 100 000 ≈ 0,025", 0.025, V(G) / (100000 * 0.0004), 0.001);
  F.dessin("diagramme", 16)[1].forEach((b, i) => arrondi(`16. barre ${b.label} (%)`, b.value, G[i][1] * 100, 1));
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  verif("17. 1/0,0036 = 2500/9", 1 / (4 * 0.03 ** 2), 2500 / 9, 1e-9);
  vrai("17. premier n : 5 556", premier((n) => leq(2500 / (9 * n), 0.05), 5000) === 5556);
  arrondi("17. 2500/0,45 ≈ 5 555,6", 5555.6, 2500 / 0.45, 0.1);
  arrondi("17. n = 1 000 : majorant ≈ 0,28", 0.28, 2500 / 9000);
  arrondi("17. exact, p = 0,5 : ≈ 94 %", 0.94, 1 - ecartBinom(1000, 0.5, 500, 30), 0.01);
  vrai("17. courbe 250/(9x) en %", courbes(17)[0].pts.every(([x, y]) => Math.abs(y - 250 / (9 * x)) < 6e-4));
  vrai("17. point marqué au croisement y = 5", Math.abs(250 / (9 * termes(17)[0].x) - 5) < 0.01 && termes(17)[0].y === 5 && dessin("repere", 17)[3] === 5);
  dit(17, "Il suffit d'interroger $5\\,556$ personnes");
}
{
  verif("18. σ(M) = 0,8", Math.sqrt(16 / 25), 0.8, 1e-12);
  verif("18. b) 0,16", 16 / 100, 0.16);
  verif("18. c) 0,16", 16 / (25 * 4), 0.16);
  vrai("18. premier n : 400", premier((n) => leq(16 / n, 0.04)) === 400);
  const d = inter(18);
  vrai("18. droite : X dans ]140 ; 160[, M dans ]148 ; 152[", d.ivs[0].de === 140 && d.ivs[0].a === 160 && d.ivs[1].de === 148 && d.ivs[1].a === 152);
  vrai("18. rapport des écarts = √25", (160 - 140) / (152 - 148) === Math.sqrt(25));
  dit(18, "donne $n \\geqslant 400$");
}
{
  verif("19. 1500²/900 = 2500", 1500 ** 2 / 900, 2500, 1e-12);
  const t = tableauDe(19);
  t.en.forEach((n, i) => verif(`19. majorant n = ${n}`, t.nombres[i], 2500 / n, 1e-12));
  vrai("19. premier n : 250 000", premier((n) => leq(2500 / n, 0.01), 200000) === 250000);
  dit(19, "donne $n \\geqslant 250\\,000$");
}
{
  const lignes = dessin("programme", 20, "figure")[0];
  const sortie = executerPython(lignes, "from random import seed\nseed(2026)\nprint(estime(250000))");
  if (sortie === null) console.log("  (Python absent : estime(250000) non exécuté)");
  else vrai(`20. Python : estime(250000) = ${sortie}, à moins de 0,04 de π`, Math.abs(Number(sortie) - Math.PI) < 0.04);
  const aire = integrale((x) => Math.sqrt(Math.max(0, 1 - x * x)), 0, 1, 20000);
  arrondi("20. aire du quart de disque ≈ 78,5 %", 78.5, aire * 100, 0.1);
  verif("20. 1/(4 × 0,0001) = 2500", 1 / (4 * 0.0001), 2500, 1e-9);
  vrai("20. premier n : 250 000", premier((n) => leq(2500 / n, 0.01), 200000) === 250000);
  const [cercle, carre] = courbes(20);
  vrai("20. quart de cercle y = √(1 − x²)", cercle.pts.every(([x, y]) => Math.abs(y - Math.sqrt(1 - x * x)) < 6e-4));
  vrai("20. carré de côté 1", JSON.stringify(carre.pts) === "[[0,1],[1,1],[1,0]]");
  dit(20, "donne $n \\geqslant 250\\,000$");
}

enonceDit(16, "$18$ rouges, $18$ noires et le zéro");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
F.fin();
