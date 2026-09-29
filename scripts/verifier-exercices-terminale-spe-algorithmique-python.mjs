// Recalcul indépendant de la feuille « Algorithmique et Python » de terminale
// spé (29/09/2026) : lib/fiches-exercices/maths-terminale-algorithmique-python.tsx.
//
// ⭐ Chaque programme est EXÉCUTÉ par Python : ceux des figures sont relus dans
// le source (`programme(…)`), ceux écrits dans l'énoncé entre « » sont recopiés
// ici, et le script vérifie que l'énoncé les écrit bien, ligne à ligne. Les
// simulations tournent avec une graine, sur un grand nombre de tirages, et
// leur moyenne est comparée à la valeur exacte. Les résultats annoncés sont
// refaits par un autre chemin (récurrence en JS, Simpson, lois exactes).
// Usage : node scripts/verifier-exercices-terminale-spe-algorithmique-python.mjs

import { feuilleTerminale, executerPython, integrale, derivee, binom, binome, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-algorithmique-python.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "algorithmique_python" });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, courbes, dessin, tableauDe } = F;

let pythonAbsent = false;
/** Exécute, et dit si Python manque (sans échouer). */
const py = (nom, lignes, suite, attendu) => {
  const sortie = executerPython(lignes, suite);
  if (sortie === null) {
    pythonAbsent = true;
    return null;
  }
  if (attendu !== undefined) vrai(`${nom} : Python affiche « ${sortie} »`, sortie === attendu, `attendu « ${attendu} »`);
  return sortie;
};
/** Le programme de la figure de l'exercice k. */
const prog = (k) => dessin("programme", k, "figure")[0];
/** Un programme écrit dans l'énoncé : chaque ligne y est citée entre « ». */
const enLigne = (k, lignes) => {
  for (const l of lignes) enonceDit(k, `« ${l.trim()} »`);
  return lignes;
};
/** Les lignes d'une trace. */
const lignesTrace = (k) => dessin("trace", k)[1];
/** Les valeurs d'un diagramme en barres. */
const barres = (k) => dessin("diagramme", k)[1];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const L = enLigne(1, ["def u(n):", "    v = 1", "    for k in range(n):", "        v = 0.5 * v + 3", "    return v"]);
  py("1. u(3) et u(0)", L, "print(u(3), u(0))", "5.375 1");
  const u = [1];
  while (u.length < 4) u.push(0.5 * u[u.length - 1] + 3);
  vrai("1. trace = récurrence", lignesTrace(1).every((l, i) => l[1] === u[i]));
  verif("1. formule 6 − 5 × 0,5³", 6 - 5 * 0.5 ** 3, u[3]);
  dit(1, "u(3) renvoie $5{,}375$");
  dit(1, "u(0) renvoie $1$");
}
{
  const L = enLigne(2, ["def S(n):", "    s = 0", "    for k in range(1, n + 1):", "        s = s + k**2", "    return s"]);
  py("2. S(4), S(10)", L, "print(S(4), S(10))", "30 385");
  py("2. version fautive range(n)", L.map((l) => l.replace("range(1, n + 1)", "range(n)")), "print(S(4))", "14");
  const somme = (n) => Array.from({ length: n }, (_, i) => (i + 1) ** 2).reduce((a, b) => a + b, 0);
  vrai("2. formule n(n+1)(2n+1)/6 jusqu'à 50", Array.from({ length: 50 }, (_, n) => somme(n + 1) === ((n + 1) * (n + 2) * (2 * n + 3)) / 6).every(Boolean));
  vrai("2. trace 0, 1, 5, 14, 30", lignesTrace(2).map((l) => l[1]).join() === [0, 1, 2, 3, 4].map(somme).join());
  dit(2, "S(4) renvoie $30$");
  dit(2, "$0 + 1 + 4 + 9 = 14$");
  dit(2, "S(10) renvoie bien $385$");
}
{
  py("3. seuil(0.1)", prog(3), "print(seuil(0.1))", "18");
  const u = (n) => 5 + 5 * 0.8 ** n;
  pointsSur("3. u(n) = 5 + 5 × 0,8^n", termes(3), u);
  let v = 10;
  for (let n = 0; n < 8; n++) v = 0.8 * v + 1;
  verif("3. la formule admise suit la récurrence (u8)", v, u(8), 1e-12);
  arrondi("3. ln 0,02 / ln 0,8 ≈ 17,53", 17.53, Math.log(0.02) / Math.log(0.8));
  vrai("3. horizontale 5", dessin("repere", 3)[3] === 5);
  arrondi("3. écart au rang 8 ≈ 0,84", 0.84, u(8) - 5);
  dit(3, "\\approx 17{,}53$");
  dit(3, "seuil(0.1) renvoie $18$");
}
{
  py("4. X(5, 0.3) en moyenne (graine 4, 200 000 appels) ≈ 1,5", prog(4), "from random import seed\nseed(4)\nN = 200000\nm = sum(X(5, 0.3) for _ in range(N)) / N\nprint(abs(m - 1.5) < 0.01)", "True");
  barres(4).forEach((b, k) => arrondi(`4. barre ${k}`, b.value, binom(5, k, 0.3), 0.001));
  verif("4. P(X = 2) = 0,3087", binom(5, 2, 0.3), 0.3087, 1e-12);
  dit(4, "$10 \\times 0{,}09 \\times 0{,}343 = 0{,}3087$");
  dit(4, "$E(X) = np = 5 \\times 0{,}3 = 1{,}5$");
}
{
  const L = enLigne(5, ["def termes(N):", "    L = [1]", "    for k in range(N):", "        L.append((L[-1] + 6)**0.5)", "    return L"]);
  py("5. termes(3)", L, "print([round(x, 3) for x in termes(3)])", "[1, 2.646, 2.94, 2.99]");
  const u = [1];
  while (u.length < 6) u.push(Math.sqrt(u[u.length - 1] + 6));
  pointsSur("5. u(n+1) = √(u(n) + 6)", termes(5), (n) => u[n]);
  vrai("5. ℓ = 3 : √(3 + 6) = 3", Math.sqrt(9) === 3);
  dit(5, "$u_1 = \\sqrt{7} \\approx 2{,}646$, $u_2 = \\sqrt{8{,}646} \\approx 2{,}940$, $u_3 \\approx 2{,}990$");
}
{
  const L = enLigne(6, ["def croissante(L):", "    for i in range(len(L) - 1):", "        if L[i + 1] < L[i]:", "            return False", "    return True"]);
  py("6. trois appels", L, "print(croissante([2, 5, 5, 9]), croissante([1, 4, 3, 8]), croissante([10*n - n**2 for n in range(6)]))", "True False True");
  enonceDit(6, "croissante([10*n - n**2 for n in range(6)])");
  const t = tableauDe(6);
  t.en.forEach((n, i) => verif(`6. u(${n})`, t.nombres[i], 10 * n - n * n));
  dit(6, "La liste vaut [0, 9, 16, 21, 24, 25]");
  dit(6, "$u_6 = 60 - 36 = 24 < u_5 = 25$");
}
{
  py("7. mc(300 000) ≈ 1/3 (graine 7)", prog(7), "from random import seed\nseed(7)\nprint(abs(mc(300000) - 1/3) < 0.005)", "True");
  verif("7. ∫ x² sur [0 ; 1] = 1/3 (Simpson)", integrale((x) => x * x, 0, 1), 1 / 3, 1e-12);
  vrai("7. parabole y = x²", JSON.stringify(courbes(7)[0].q) === "[1,0,0]");
  vrai("7. carré gris [0 ; 1]²", JSON.stringify(courbes(7)[1].pts) === "[[0,0],[1,0],[1,1],[0,1],[0,0]]");
}
{
  const L = enLigne(8, ["n = 0", "s = 0", "while s <= 3:", "    n = n + 1", "    s = s + 1 / n"]);
  py("8. premier H(n) > 3", L, "print(n)", "11");
  const H = (n) => Array.from({ length: n }, (_, i) => 1 / (i + 1)).reduce((a, b) => a + b, 0);
  pointsSur("8. H(n)", termes(8), H);
  arrondi("8. H10 ≈ 2,929", 2.929, H(10), 0.001);
  arrondi("8. H11 ≈ 3,020", 3.02, H(11), 0.001);
  let s = 0, n = 0;
  while (s <= 10) s += 1 / ++n;
  vrai(`8. H(n) > 10 dès n = ${n}`, n === 12367);
  dit(8, "$H_{10} \\approx 2{,}929$");
  dit(8, "$H_{11} \\approx 3{,}020$");
  dit(8, "le programme affiche $11$");
  dit(8, "$n = 12\\,367$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const C = (t) => 10 * t * Math.exp(-t);
  py("9. dicho(1, 5, 0.5)", prog(9), "print(dicho(1, 5, 0.5))", "(2.5, 3.0)");
  const alpha = dichotomie((t) => C(t) - 2, 1, 5);
  vrai(`9. α ≈ ${alpha.toFixed(4)} entre 2,5 et 3`, alpha > 2.5 && alpha < 3);
  py("9. dicho(1, 5, 0.001) encadre α", prog(9), `a, b = dicho(1, 5, 0.001)\nprint(a <= ${alpha} <= b, b - a <= 0.001)`, "True True");
  let tours = 0, l = 4;
  while (l > 0.001) { l /= 2; tours++; }
  vrai("9. 12 tours", tours === 12);
  vrai("9. C décroissante sur [1 ; 5] (C′ < 0)", [1.1, 2, 3, 4, 4.9].every((t) => derivee(C, t) < 0));
  const tr = lignesTrace(9).slice(1);
  tr.forEach(([m, c]) => arrondi(`9. C(${m})`, Number(c), C(m), 0.01));
  arrondi("9. C(1) ≈ 3,68", 3.68, C(1));
  arrondi("9. C(5) ≈ 0,34", 0.34, C(5));
  dit(9, "L'appel renvoie (2.5, 3.0)");
  dit(9, "il faut $12$ tours");
}
{
  py("10. rect(0, 2, 4)", prog(10), "print(rect(0, 2, 4))", "1.75");
  py("10. rectangles à droite", prog(10).map((l) => l.replace("f(a + k * h)", "f(a + (k + 1) * h)")), "print(rect(0, 2, 4))", "3.75");
  enonceDit(10, "rect(0, 2, 4)");
  verif("10. ∫ t² sur [0 ; 2] = 8/3 (Simpson)", integrale((t) => t * t, 0, 2), 8 / 3, 1e-12);
  vrai("10. écart 8/n ≤ 0,01 ⇔ n ≥ 800", 8 / 800 <= 0.01 && 8 / 799 > 0.01);
  const esc = courbes(10)[1].pts;
  const hauts = esc.filter((_, i) => i % 2 === 1 && i < esc.length - 1).map(([x, y]) => [x, y]);
  vrai("10. l'escalier orange : hauteur f(bord gauche) sur chaque bande", hauts.every(([x, y]) => Math.abs(y - (x - 0.5) ** 2) < 1e-9) && esc[0][1] === 0);
  dit(10, "l'appel renvoie $3{,}75$");
  dit(10, "$n \\geqslant 800$");
  dit(10, "$1{,}75 \\leqslant \\dfrac{8}{3} \\leqslant 3{,}75$");
}
{
  const u = (t) => 2 - 2 * Math.exp(-2 * t);
  py("11. euler(0.25, 1)", prog(11), "print(euler(0.25, 1))", "1.875");
  vrai("11. u vérifie u′ = 4 − 2u", [0, 0.3, 0.7, 1.5].every((t) => Math.abs(derivee(u, t) - (4 - 2 * u(t))) < 1e-6));
  arrondi("11. u(1) ≈ 1,729", 1.729, u(1), 0.001);
  py("11. le piège : h = 0,1 fait 11 tours", ["t = 0", "k = 0", "while t < 1:", "    t = t + 0.1", "    k = k + 1"], "print(k)", "11");
  const eu = courbes(11)[1].pts;
  let y = 0;
  vrai("11. ligne orange = pas d'Euler", eu.every(([t, v], i) => { if (i) y += 0.25 * (4 - 2 * y); return Math.abs(v - y) < 1e-12 && Math.abs(t - 0.25 * i) < 1e-12; }));
  vrai("11. courbe bleue = u(t)", courbes(11)[0].pts.every(([t, v]) => Math.abs(v - u(t)) < 6e-4));
  dit(11, "$t = 1$ : $1{,}75 + 0{,}25 \\times 0{,}5 = 1{,}875$");
  dit(11, "$u(1) = 2 - 2\\mathrm{e}^{-2} \\approx 1{,}729$");
}
{
  const L = enLigne(12, ["C = 20000", "n = 0", "while C > 0:", "    C = 1.02 * C - 2000", "    n = n + 1"]);
  py("12. années", L, "print(n)", "12");
  const C = (n) => (n === 0 ? 20000 : 1.02 * C(n - 1) - 2000);
  vrai("12. formule 100 000 − 80 000 × 1,02^n", Array.from({ length: 20 }, (_, n) => Math.abs(C(n) - (100000 - 80000 * 1.02 ** n)) < 1e-6).every(Boolean));
  const t = tableauDe(12);
  t.en.forEach((n, i) => arrondi(`12. C(${n})`, t.nombres[i], C(n), 1));
  arrondi("12. ln 1,25 / ln 1,02 ≈ 11,27", 11.27, Math.log(1.25) / Math.log(1.02));
  dit(12, "Le programme affiche $12$");
  dit(12, "$C_{11} \\approx 530$ €, puis $C_{12} \\approx -1\\,459$ €");
}
{
  py("13. moyenne(200 000) ≈ 7 (graine 13)", prog(13), "from random import seed\nseed(13)\nprint(abs(moyenne(200000) - 7) < 0.02)", "True");
  const issues = [];
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) issues.push(a + b);
  const E = issues.reduce((s, x) => s + x, 0) / 36;
  const V = issues.reduce((s, x) => s + (x - E) ** 2, 0) / 36;
  verif("13. E(S) = 7", E, 7, 1e-12);
  verif("13. V(S) = 35/6 (par les 36 issues)", V, 35 / 6, 1e-12);
  verif("13. borne BT = 35/1500", V / 1000 / 0.25, 35 / 1500, 1e-12);
  const d = [];
  for (let a = 1; a <= 6; a++) d.push(a * 2);
  const V2 = d.reduce((s, x) => s + (x - 7) ** 2, 0) / 6;
  verif("13. V(2X) = 35/3", V2, 35 / 3, 1e-12);
  barres(13).forEach((b) => verif(`13. cas sur 36 donnant S = ${b.label}`, b.value, issues.filter((x) => x === Number(b.label)).length));
  dit(13, "\\dfrac{35}{1\\,500} \\approx 0{,}023$");
}
{
  const L = enLigne(14, ["x = 0", "for k in range(10):", "    if random() < 0.5: x = x + 1", "    else: x = x - 1"]);
  const sorties = py("14. 300 marches : x pair entre −10 et 10", ["from random import random, seed", "seed(14)", "R = []", "for essai in range(300):", ...L.map((l) => "    " + l), "    R.append(x)"], "print(all(r % 2 == 0 and -10 <= r <= 10 for r in R))", "True");
  void sorties;
  barres(14).forEach((b) => {
    const x = Number(b.label.replace("−", "-"));
    verif(`14. chemins sur 1 024 menant à x = ${x}`, b.value, binome(10, (x + 10) / 2));
  });
  verif("14. C(10, 5) = 252", binome(10, 5), 252);
  arrondi("14. 252/1024 ≈ 0,246", 0.246, 252 / 1024, 0.001);
  // Variance de la position par la loi, un autre chemin que 4V(D).
  let Ex = 0, Ex2 = 0;
  for (let d = 0; d <= 10; d++) { const p = binom(10, d, 0.5); Ex += p * (2 * d - 10); Ex2 += p * (2 * d - 10) ** 2; }
  verif("14. E(x) = 0", Ex, 0, 1e-12);
  verif("14. V(x) = 10", Ex2 - Ex * Ex, 10, 1e-12);
  dit(14, "$V(x) = 2^2 \\times 2{,}5 = 10$");
}
{
  py("15. moyenne de attente() ≈ 6 (graine 15)", prog(15), "from random import seed\nseed(15)\nN = 200000\nprint(abs(sum(attente() for _ in range(N)) / N - 6) < 0.05)", "True");
  pointsSur("15. (5/6)^n", termes(15), (n) => (5 / 6) ** n);
  let n = 0;
  while ((5 / 6) ** n >= 0.01) n++;
  vrai("15. premier n : 26", n === 26);
  arrondi("15. ln 0,01 / ln(5/6) ≈ 25,26", 25.26, Math.log(0.01) / Math.log(5 / 6));
  dit(15, "Le plus petit entier est $n = 26$");
}
{
  const L = enLigne(16, ["s = 1", "f = 1", "for k in range(1, 9):", "    f = f * k", "    s = s + 1 / f"]);
  py("16. somme des 1/k!", L, "print(round(s, 6))", "2.718279");
  let s = 1;
  for (let k = 1, f = 1; k <= 8; k++) { f *= k; s += 1 / f; }
  vrai("16. e − s ≈ 3 × 10⁻⁶", Math.abs(Math.E - s - 3e-6) < 1e-6);
  const t = tableauDe(16);
  t.en.forEach((n, i) => arrondi(`16. (1 + 1/${n})^${n}`, t.nombres[i], (1 + 1 / n) ** n, n === 365 ? 0.0001 : 0.001));
  arrondi("16. e − (1 + 1/365)^365 ≈ 0,004", 0.004, Math.E - (1 + 1 / 365) ** 365, 0.001);
  dit(16, "\\approx 2{,}718279$");
  dit(16, "\\approx 2{,}7146$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const T = (t) => 20 + 70 * Math.exp(-0.1 * t);
  py("17. h = 1", prog(17), "", "12");
  py("17. h = 0,5", prog(17).map((l) => (l === "h = 1" ? "h = 0.5" : l)), "", "12.5");
  vrai("17. T vérifie T′ = −0,1(T − 20)", [0, 5, 12, 30].every((t) => Math.abs(derivee(T, t) + 0.1 * (T(t) - 20)) < 1e-6));
  const t40 = dichotomie((t) => T(t) - 40, 0, 60);
  arrondi("17. T = 40 en t ≈ 12,53 (dichotomie)", 12.53, t40);
  arrondi("17. ln(2/7)/ln 0,9 ≈ 11,89", 11.89, Math.log(2 / 7) / Math.log(0.9));
  arrondi("17. ln(2/7)/ln 0,95 ≈ 24,42", 24.42, Math.log(2 / 7) / Math.log(0.95));
  // Les points : Euler h = 1 aux minutes 0, 5, …, 25, en dizaines de degrés.
  let v = 90;
  const euler = [v];
  for (let k = 1; k <= 25; k++) { v = v + (2 - 0.1 * v); if (k % 5 === 0) euler.push(v); }
  pointsSur("17. Euler toutes les 5 min (÷10)", termes(17), (i) => euler[i] / 10);
  vrai("17. Euler sous la courbe", termes(17).every((p) => p.y <= T(5 * p.x) / 10 + 1e-9));
  vrai("17. courbe bleue = T (unités 5 min, 10 °C)", courbes(17)[0].pts.every(([x, y]) => Math.abs(y - T(5 * x) / 10) < 6e-4));
  vrai("17. horizontales 40 °C et 20 °C", JSON.stringify(dessin("repere", 17)[3]) === "[4,2]");
  dit(17, "Le programme affiche $12$");
  dit(17, "$t > 10\\ln(3{,}5) \\approx 12{,}53$ min");
  dit(17, "le programme affiche $12{,}5$");
}
{
  py("18. P(0) et seuil()", prog(18), "print(round(P(0), 3), seuil())", "0.077 5");
  const cumul = (k) => Array.from({ length: k + 1 }, (_, i) => binom(50, i, 0.05)).reduce((a, b) => a + b, 0);
  arrondi("18. P(X ≤ 4) ≈ 0,896", 0.896, cumul(4), 0.001);
  arrondi("18. P(X ≤ 5) ≈ 0,962", 0.962, cumul(5), 0.001);
  arrondi("18. P(X ≥ 6) ≈ 0,038", 0.038, 1 - cumul(5), 0.001);
  arrondi("18. σ ≈ 1,54", 1.54, Math.sqrt(50 * 0.05 * 0.95));
  barres(18).forEach((b, k) => arrondi(`18. P(X = ${k}) pour 1 000`, b.value, 1000 * binom(50, k, 0.05), 1));
  // Simulation : une autre voie que la formule, avec la graine 18.
  py("18. fréquence simulée de X ≥ 6 ≈ 0,038", [], "from random import random, seed\nseed(18)\nN = 100000\nc = sum(1 for _ in range(N) if sum(random() < 0.05 for _ in range(50)) >= 6)\nprint(abs(c / N - 0.038) < 0.004)", "True");
  dit(18, "seuil() renvoie $5$");
  dit(18, "$P(X \\geqslant 6) = 1 - P(X \\leqslant 5) \\approx 0{,}038$");
}
{
  const f = (x) => Math.exp(-x * x);
  py("19. encadre(4)", prog(19), "d, g = encadre(4)\nprint(round(d, 3), round(g, 3))", "0.664 0.822");
  py("19. encadre(64)", prog(19), "d, g = encadre(64)\nprint(round(d, 4), round(g, 4))", "0.7419 0.7517");
  const I = integrale(f, 0, 1);
  arrondi(`19. I ≈ 0,747 (Simpson : ${I.toFixed(6)})`, 0.747, I, 0.001);
  vrai("19. 0,7419 ≤ I ≤ 0,7517", I >= 0.7419 && I <= 0.7517);
  vrai("19. n = 64 suffit, pas 63", (1 - Math.exp(-1)) / 64 <= 0.01 && (1 - Math.exp(-1)) / 63 > 0.01);
  const esc = courbes(19)[1].pts;
  vrai("19. rectangles orange : hauteur f(bord gauche)", [1, 3, 5, 7].every((i) => Math.abs(esc[i][1] - f(esc[i][0])) < 6e-4 && esc[i + 1][1] === esc[i][1]));
  vrai("19. courbe bleue = e^(−x²)", courbes(19)[0].pts.every(([x, y]) => Math.abs(y - f(x)) < 6e-4));
  dit(19, "(0.664, 0.822)");
  dit(19, "n = $64$ suffit");
  dit(19, "$I \\approx 0{,}747$");
}
{
  py("20. jour(0.5) et jour(0.99)", prog(20), "print(jour(0.5), jour(0.99))", "11 19");
  const p = [0.01];
  while (p.length < 20) p.push(1.5 * p[p.length - 1] - 0.5 * p[p.length - 1] ** 2);
  pointsSur("20. p(n)", termes(20), (n) => p[n], 0.001);
  vrai("20. p(n) croissante et < 1 (200 rangs)", (() => { let a = 0.01; for (let i = 0; i < 200; i++) { const b = 1.5 * a - 0.5 * a * a; if (!(b >= a && b < 1)) return false; a = b; } return true; })());
  arrondi("20. p1 = 0,01495", 0.01495, p[1], 0.00001);
  for (const [n, val] of [[10, 0.411], [11, 0.532], [18, 0.988], [19, 0.994]]) arrondi(`20. p${n}`, val, p[n], 0.001);
  dit(20, "jour(0.5) renvoie $11$");
  dit(20, "jour(0.99) renvoie $19$");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce que montre le dessin (⭐ Sur le dessin)", F.feuille.corrections.every((t) => /Sur le dessin/.test(t)));
if (pythonAbsent) console.log("  (Python absent : programmes non exécutés)");
F.fin();
