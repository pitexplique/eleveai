// Recalcul indépendant de la feuille « Continuité et valeurs intermédiaires »
// de terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-continuite-tvi.tsx.
//
// ⭐ Chaque solution annoncée est retrouvée par `dichotomie` sur la fonction
// elle-même ; les nombres de solutions sont COMPTÉS par un balayage fin (pas le
// raisonnement « morceau par morceau » du corrigé) ; les deux programmes
// Python sont EXÉCUTÉS ; les tableaux de valeurs, de variations et les traces
// sont relus dans le source et recalculés ; les courbes relues sont comparées
// à leur formule.
// Usage : node scripts/verifier-exercices-terminale-spe-continuite-tvi.mjs

import { feuilleTerminale, executerPython, dichotomie, derivee } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-continuite-tvi.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "continuite_tvi", dessinsEnPlus: ["tabVar", "cuve"] });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, courbes, dessin, tableauDe } = F;
const E = Math.exp;

/** Un nombre écrit à la française dans un dessin : « −0,5 », « +∞ ». */
const lu = (s) => {
  const t = String(s).replace(/−/g, "-").replace(",", ".").replace(/\s/g, "");
  if (/^\+?∞$/.test(t)) return Infinity;
  if (t === "-∞") return -Infinity;
  return Number(t);
};
/** Une ligne brisée relue suit-elle sa formule (arrondi 0,001 du fichier) ? */
const suit = (nom, pts, f) => vrai(`${nom} (${pts.length} points)`, pts.length > 0 && pts.every(([x, y]) => Math.abs(y - f(x)) < 6e-4), JSON.stringify(pts.find(([x, y]) => Math.abs(y - f(x)) >= 6e-4)));
/** Le tableau de variations maison (`tabVar`) : format, et flèches d'accord avec les signes de f′. */
const tabVar = (k, attendu) => {
  const [bornes, signes, valeurs] = dessin("tabVar", k);
  vrai(`${k}. tabVar : ${bornes.length} bornes, ${valeurs.length} valeurs, ${signes.length} signes`, bornes.length === valeurs.length && signes.length === bornes.length - 1 && bornes.length <= 4);
  for (const s of [...bornes, ...valeurs]) {
    vrai(`${k}. tabVar : « ${s} » sans $ ni tiret-moins`, !s.includes("$") && !/(^|\s)-(\d|∞)/.test(s));
    if (/∞/.test(s)) vrai(`${k}. tabVar : infini écrit « +∞ » ou « −∞ » (${s})`, s === "+∞" || s === "−∞");
  }
  signes.forEach((sg, i) => {
    const [a, b] = [lu(valeurs[i]), lu(valeurs[i + 1])];
    vrai(`${k}. tabVar : la flèche ${i + 1} dit « ${sg} » (${valeurs[i]} → ${valeurs[i + 1]})`, sg === "+" ? b > a : b < a);
  });
  if (attendu) attendu(bornes.map(lu), valeurs.map(lu), signes);
};
/** Nombre de solutions de f(x) = k sur [a ; b], par balayage fin (changements de signe et zéros exacts). */
const nbSolutions = (f, a, b, k, pas = 1e-3) => {
  const racines = [];
  const n = Math.round((b - a) / pas);
  let prec = null;
  for (let i = 0; i <= n; i++) {
    const x = a + i * pas;
    const g = f(x) - k;
    if (Math.abs(g) < 1e-9) racines.push(x);
    else if (prec && prec.g * g < 0 && Math.abs(prec.g) >= 1e-9) racines.push(dichotomie((t) => f(t) - k, prec.x, x));
    prec = { x, g };
  }
  return racines.filter((r, i) => i === 0 || Math.abs(r - racines[i - 1]) > 1e-2).length;
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const marches = courbes(1, "figure");
  vrai("1. cinq marches [k ; k + 1] à la hauteur k, pour k = −1 … 3", marches.length === 5 && marches.every((c, i) => JSON.stringify(c.pts) === JSON.stringify([[i - 1, i - 1], [i, i - 1]])));
  vrai("1. points rouges (k ; E(k))", termes(1, "figure").every((p) => p.y === Math.floor(p.x)));
  vrai("1. horizontale 1,5, entre deux marches", dessin("repere", 1, "figure")[3] === 1.5 && !Number.isInteger(1.5));
  vrai("1. E(2,7) = 2 et E(−0,5) = −1", Math.floor(2.7) === 2 && Math.floor(-0.5) === -1);
  vrai("1. limites en 2 : 1 à gauche, 2 à droite", Math.floor(2 - 1e-9) === 1 && Math.floor(2 + 1e-9) === 2);
  vrai("1. E(x) = 1,5 sans solution sur [0 ; 3]", Array.from({ length: 3001 }, (_, i) => Math.floor(i / 1000)).every((v) => v !== 1.5));
  enonceDit(1, "$E(2{,}7) = 2$ et $E(-0{,}5) = -1$");
  dit(1, "la limite à gauche vaut $1$");
  dit(1, "la limite à droite vaut $2$");
}
{
  const [g, d] = courbes(2);
  suit("2. branche gauche de 1/(x − 3)", g.pts, (x) => 1 / (x - 3));
  suit("2. branche droite de 1/(x − 3)", d.pts, (x) => 1 / (x - 3));
  vrai("2. les deux branches ne se touchent pas (coupure en 3)", Math.max(...g.pts.map(([x]) => x)) < 3 && Math.min(...d.pts.map(([x]) => x)) > 3);
}
{
  const [bleu, orange] = courbes(3);
  const fb = (x) => x * x - x - 2, fo = (x) => -5 * x * x + 23 * x - 20;
  suit("3. courbe bleue x² − x − 2", bleu.pts, fb);
  suit("3. courbe orange −5x² + 23x − 20", orange.pts, fo);
  vrai("3. les deux valent −2 en 1 et 4 en 3", [fb, fo].every((f) => f(1) === -2 && f(3) === 4));
  vrai("3. horizontales 3 et 5", JSON.stringify(dessin("repere", 3)[3]) === "[3,5]");
  vrai("3. bleue : une fois y = 3, jamais y = 5", nbSolutions(fb, 1, 3, 3) === 1 && nbSolutions(fb, 1, 3, 5) === 0);
  vrai("3. orange : une fois y = 3, deux fois y = 5", nbSolutions(fo, 1, 3, 3) === 1 && nbSolutions(fo, 1, 3, 5) === 2);
}
{
  const [bornes, valeurs] = dessin("tableauVariations", 4, "figure");
  const [x, y] = [bornes.map(lu), valeurs.map(lu)];
  // Une fonction qui respecte le tableau : affine par morceaux entre les points lus.
  const f = (t) => (t <= x[1] ? y[0] + ((y[1] - y[0]) * (t - x[0])) / (x[1] - x[0]) : y[1] + ((y[2] - y[1]) * (t - x[1])) / (x[2] - x[1]));
  vrai("4. f(x) = 0 : deux solutions", nbSolutions(f, -2, 4, 0) === 2);
  vrai("4. f(x) = 3 : une solution", nbSolutions(f, -2, 4, 3) === 1);
  vrai("4. f(x) = −4 : aucune", nbSolutions(f, -2, 4, -4) === 0);
  dit(4, "Au total : deux solutions.");
  dit(4, "Au total : une solution.");
  dit(4, "$-4 < -3$ : aucune solution");
}
{
  const f = (x) => x ** 3 + x - 1;
  const a = dichotomie(f, 0, 1);
  arrondi("5. α ≈ 0,68", 0.68, a);
  vrai("5. le point rouge est (0,68 ; 0)", termes(5)[0].x === 0.68 && termes(5)[0].y === 0);
  vrai("5. la courbe est x³ + x − 1", JSON.stringify(courbes(5)[0].p) === "[1,0,1,-1]");
  vrai("5. f′ > 0 sur [0 ; 1]", Array.from({ length: 101 }, (_, i) => derivee(f, i / 100)).every((d) => d > 0));
  vrai("5. f(0) = −1 et f(1) = 1", f(0) === -1 && f(1) === 1);
  dit(5, "$f(0) = -1 < 0$ et $f(1) = 1 > 0$");
  dit(5, "$\\alpha \\approx 0{,}68$");
}
{
  const f = (x) => x ** 3 - 3 * x + 1;
  const t = tableauDe(6, "figure");
  t.en.forEach((x, i) => arrondi(`6. f(${x})`, t.nombres[i], f(x), 0.001));
  const a = dichotomie(f, 0, 1);
  vrai(`6. α = ${a.toFixed(4)} dans ]0,34 ; 0,35[`, a > 0.34 && a < 0.35);
  vrai("6. une seule racine dans [0 ; 1]", nbSolutions(f, 0, 1, 0) === 1);
  dit(6, "$0{,}3 < \\alpha < 0{,}4$");
  dit(6, "$0{,}34 < \\alpha < 0{,}35$");
}
{
  // Trois étapes de dichotomie, refaites ici.
  const f = (x) => x * x - 2;
  let [a, b] = [1, 2];
  const lignes = [];
  for (let e = 1; e <= 3; e++) {
    const m = (a + b) / 2;
    lignes.push([a, b, m, f(m)]);
    if (f(a) * f(m) <= 0) b = m;
    else a = m;
  }
  const [entete, rangees] = dessin("trace", 7);
  vrai("7. trace : 5 colonnes", entete.length === 5);
  lignes.forEach(([aa, bb, m, fm], i) => {
    const r = rangees[i].map(lu);
    vrai(`7. étape ${i + 1} : a, b, m`, r[1] === aa && r[2] === bb && r[3] === m);
    arrondi(`7. étape ${i + 1} : f(m)`, r[4], fm, 0.001);
  });
  vrai("7. encadrement final [1,375 ; 1,5] autour de √2", a === 1.375 && b === 1.5 && a < Math.SQRT2 && Math.SQRT2 < b);
  dit(7, "$f(1{,}375) = -0{,}109375 < 0$");
  dit(7, "Donc $1{,}375 < \\sqrt{2} < 1{,}5$");
}
{
  const f = (x) => (x * x - 1) / (x - 1);
  verif("8. limite en 1 : 2", f(1 + 1e-7), 2, 1e-6);
  verif("8. limite en 1 par la gauche : 2", f(1 - 1e-7), 2, 1e-6);
  vrai("8. droite y = x + 1 et point (1 ; 2)", JSON.stringify(courbes(8)[0].q) === "[0,1,1]" && termes(8)[0].x === 1 && termes(8)[0].y === 2);
  dit(8, "c'est-à-dire si $a = 2$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const f = (x) => E(x) + x;
  const a = dichotomie(f, -1, 0);
  vrai(`9. α = ${a.toFixed(4)} dans ]−0,57 ; −0,56[`, a > -0.57 && a < -0.56);
  arrondi("9. f(−0,57) ≈ −0,0045", -0.0045, f(-0.57), 0.0001);
  arrondi("9. f(−0,56) ≈ 0,0112", 0.0112, f(-0.56), 0.0001);
  vrai("9. f(−50) très négatif, f(50) très grand", f(-50) < -49 && f(50) > 1e20);
  tabVar(9);
  dit(9, "$-0{,}57 < \\alpha < -0{,}56$");
}
{
  const [g, d] = courbes(10);
  const h1 = (x) => 3 - 0.5 * x * x, h2 = (x) => 0.25 * (x - 4) ** 2;
  suit("10. premier morceau 3 − 0,5x²", g.pts, h1);
  suit("10. second morceau 0,25(x − 4)²", d.pts, h2);
  verif("10. raccord en 2 : h(2) = 1 des deux côtés", h2(2), h1(2));
  verif("10. a = 1/4 (4a = 1)", 1 / 4, 0.25);
  verif("10. pente à gauche −2", derivee(h1, 2), -2, 1e-6);
  verif("10. pente à droite −1", derivee(h2, 2), -1, 1e-6);
  vrai("10. point rouge (2 ; 1)", termes(10)[0].x === 2 && termes(10)[0].y === 1);
  dit(10, "soit $a = 0{,}25$");
}
{
  const lignes = dessin("programme", 11, "figure")[0];
  const sortie = executerPython(lignes, "print(dicho(0, 1, 0.1))");
  if (sortie === null) console.log("  (Python absent : dicho non exécutée)");
  else vrai(`11. Python : dicho(0, 1, 0.1) = ${sortie}`, sortie === "(0.625, 0.6875)");
  const passages = executerPython(lignes, "a, b, n = 0, 1, 0\nwhile b - a > 0.001:\n    m = (a + b) / 2\n    if f(a) * f(m) <= 0:\n        b = m\n    else:\n        a = m\n    n = n + 1\nprint(n)");
  if (passages !== null) vrai(`11. Python : ${passages} passages pour 0,001`, passages === "10");
  const f = (x) => x ** 3 + x - 1;
  const [, rangees] = dessin("trace", 11);
  rangees.slice(0, 4).forEach((r, i) => arrondi(`11. trace, passage ${i + 1} : f(m)`, lu(r[4]), f(lu(r[3])), 0.001));
  vrai("11. α dans l'intervalle final", dichotomie(f, 0, 1) > 0.625 && dichotomie(f, 0, 1) < 0.6875);
  vrai("11. 2⁹ < 1000 < 2¹⁰", 2 ** 9 < 1000 && 2 ** 10 > 1000);
  dit(11, "il faut $10$ passages");
}
{
  const C = (t) => 20 * t * E(-t);
  suit("12. courbe de C", courbes(12)[0].pts, C);
  vrai("12. horizontale 5", dessin("repere", 12)[3] === 5);
  arrondi("12. maximum C(1) ≈ 7,36", termes(12)[0].y, C(1));
  verif("12. C′(t) = 20(1 − t)e^(−t) (en 0,4)", derivee(C, 0.4), 20 * 0.6 * E(-0.4), 1e-6);
  const [t1, t2] = [dichotomie((t) => C(t) - 5, 0, 1), dichotomie((t) => C(t) - 5, 1, 5)];
  vrai(`12. t1 = ${t1.toFixed(4)} dans ]0,35 ; 0,36[`, t1 > 0.35 && t1 < 0.36);
  vrai(`12. t2 = ${t2.toFixed(4)} dans ]2,15 ; 2,16[`, t2 > 2.15 && t2 < 2.16);
  vrai("12. exactement deux solutions sur [0 ; 5]", nbSolutions(C, 0, 5, 5) === 2);
  for (const [t, v] of [[0.35, 4.93], [0.36, 5.02], [2.15, 5.01], [2.16, 4.98]]) arrondi(`12. C(${t}) ≈ ${v}`, v, C(t));
  vrai(`12. durée ${(t2 - t1).toFixed(3)} h ≈ 1 h 48`, t2 - t1 > 1.79 && t2 - t1 < 1.81 && Math.round((t2 - t1) * 60) === 108);
  arrondi("12. C(5) ≈ 0,67", 0.67, C(5));
  tabVar(12, (b, v) => {
    arrondi("12. tabVar : C(1)", v[1], C(1));
    arrondi("12. tabVar : C(5)", v[2], C(5));
  });
  dit(12, "$0{,}35 < t_1 < 0{,}36$");
  dit(12, "$2{,}15 < t_2 < 2{,}16$");
}
{
  const f = (x) => x ** 3 - 3 * x;
  const [bornes, valeurs] = dessin("tableauVariations", 13, "figure");
  bornes.map(lu).forEach((x, i) => verif(`13. f(${x})`, lu(valeurs[i]), f(x)));
  suit("13. courbe x³ − 3x", courbes(13)[0].pts, f);
  const cas = [[-3, 0], [-2, 2], [0, 3], [1, 3], [2, 2], [5, 1], [8.125, 1], [9, 0]];
  for (const [k, n] of cas) vrai(`13. f(x) = ${k} : ${n} solution(s)`, nbSolutions(f, -2, 2.5, k) === n);
  dit(13, "Si $k = -2$ : deux solutions, $x = -2$ et $x = 1$");
  dit(13, "Si $-2 < k < 2$ : trois solutions");
  dit(13, "Si $k = 2$ : deux solutions, $x = -1$ et $x = 2$");
  dit(13, "Si $2 < k \\leqslant 8{,}125$ : une solution");
}
{
  const f = (x) => x ** 3 + x * x + x - 3.3;
  const t = tableauDe(14, "figure");
  t.en.forEach((x, i) => arrondi(`14. f(${x})`, t.nombres[i], f(x), 0.001));
  // Le placement, année par année : on ajoute 100 €, puis tout est multiplié par x.
  const capital = (x) => { let c = 0; for (let an = 0; an < 3; an++) c = (c + 100) * x; return c; };
  const x0 = dichotomie((x) => capital(x) - 330, 1, 1.1);
  vrai(`14. x = ${x0.toFixed(4)} dans ]1,04 ; 1,05[`, x0 > 1.04 && x0 < 1.05);
  arrondi("14. x ≈ 1,0484", 1.0484, x0, 0.0001);
  verif("14. même racine que f", f(x0), 0, 1e-9);
  dit(14, "le taux est compris entre $4$ % et $5$ %");
  dit(14, "un taux d'environ $4{,}8$ %");
}
{
  const h = (t) => 2 * E(0.3 * t) - 2 * t - 10;
  vrai("15. h < 0 sur [0 ; 5]", Array.from({ length: 501 }, (_, i) => h(i / 100)).every((v) => v < 0));
  arrondi("15. 2e^1,5 ≈ 8,96", 8.96, 2 * E(1.5));
  arrondi("15. e^1,5 ≈ 4,48", 4.48, E(1.5));
  vrai("15. h′ ≥ 0,69 sur [5 ; 15]", Array.from({ length: 1001 }, (_, i) => derivee(h, 5 + i / 100)).every((d) => d > 0.689));
  const T = dichotomie(h, 5, 15);
  vrai(`15. T = ${T.toFixed(3)} dans ]8,7 ; 8,8[`, T > 8.7 && T < 8.8);
  vrai("15. un seul zéro sur [0 ; 15]", nbSolutions(h, 0, 15, 0) === 1);
  arrondi("15. h(8,7) ≈ −0,20", -0.2, h(8.7));
  arrondi("15. h(8,8) ≈ 0,43", 0.43, h(8.8));
  vrai("15. h′(0) = −1,4", Math.abs(derivee(h, 0) + 1.4) < 1e-6);
  vrai(`15. T ≈ 8 h ${Math.round((T % 1) * 60)} min, « un peu moins de 8 h 45 »`, Math.round((T % 1) * 60) === 44);
  tabVar(15, (b, v) => {
    arrondi("15. tabVar : h(5)", v[0], h(5));
    arrondi("15. tabVar : h(15)", v[1], h(15));
  });
  dit(15, "$8{,}7 < T < 8{,}8$");
}
{
  const c = dichotomie((x) => Math.cos(x) - x, 0, 1);
  vrai(`16. c = ${c.toFixed(4)} dans ]0,73 ; 0,74[`, c > 0.73 && c < 0.74);
  arrondi("16. point rouge ≈ (c ; c)", termes(16)[0].x, c);
  arrondi("16. cos 0,73 ≈ 0,745", 0.745, Math.cos(0.73), 0.001);
  arrondi("16. cos 0,74 ≈ 0,738", 0.738, Math.cos(0.74), 0.001);
  arrondi("16. cos 1 ≈ 0,54", 0.54, Math.cos(1));
  suit("16. courbe du cosinus", courbes(16)[0].pts, Math.cos);
  vrai("16. droite y = x", JSON.stringify(courbes(16)[1].q) === "[0,1,0]");
  vrai("16. une seule solution sur [0 ; 1]", nbSolutions((x) => Math.cos(x) - x, 0, 1, 0) === 1);
  dit(16, "$0{,}73 < c < 0{,}74$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const O = (p) => E(0.2 * p) - 1, D = (p) => 10 / (p + 1), g = (p) => O(p) - D(p);
  const lignes = dessin("programme", 17, "figure")[0];
  const s1 = executerPython(lignes, "print(balayage(0.1))");
  const s2 = executerPython(lignes, "print(balayage(0.01))");
  if (s1 === null) console.log("  (Python absent : balayage non exécuté)");
  else {
    vrai(`17. Python : balayage(0.1) = ${s1}`, s1 === "5.0");
    vrai(`17. Python : balayage(0.01) = ${s2}`, s2 === "4.94");
  }
  const p0 = dichotomie(g, 0, 10);
  vrai(`17. p0 = ${p0.toFixed(4)} dans ]4,93 ; 4,94]`, p0 > 4.93 && p0 <= 4.94);
  vrai("17. g croissante sur [0 ; 10]", Array.from({ length: 1001 }, (_, i) => derivee(g, i / 100 + 1e-4)).every((d) => d > 0));
  verif("17. g(0) = −10", g(0), -10);
  arrondi("17. g(10) ≈ 5,48", 5.48, g(10));
  arrondi("17. O(4,93) ≈ 1,68", 1.68, O(4.93));
  arrondi("17. O(4,94) ≈ 1,69", 1.69, O(4.94));
  arrondi("17. O(p0) ≈ 1,68", 1.68, O(p0));
  const [co, cd] = courbes(17);
  suit("17. courbe de l'offre", co.pts, O);
  suit("17. courbe de la demande", cd.pts, D);
  arrondi("17. point rouge : abscisse p0", termes(17)[0].x, p0);
  arrondi("17. point rouge : ordonnée O(p0)", termes(17)[0].y, O(p0));
  dit(17, "balayage(0.1) affiche 5.0");
  dit(17, "balayage(0.01) affiche 4.94");
  dit(17, "environ $1\\,680$ à $1\\,690$ unités");
}
{
  const V = (h) => (Math.PI * h * h * (6 - h)) / 3;
  // Autre chemin : le volume d'eau comme somme de disques (Simpson sur les sections π(4 − (y − 2)²)).
  const Vdisques = (h) => { const n = 2000; let s = 0; for (let i = 0; i < n; i++) { const y = ((i + 0.5) * h) / n; s += Math.PI * (4 - (y - 2) ** 2) * (h / n); } return s; };
  verif("18. formule admise = somme des disques (h = 1,3)", V(1.3), Vdisques(1.3), 1e-6);
  arrondi("18. V(2) ≈ 16,76", 16.76, V(2));
  arrondi("18. V(4) ≈ 33,51", 33.51, V(4));
  verif("18. V(4) = volume de la boule", V(4), (4 / 3) * Math.PI * 8, 1e-12);
  const h10 = dichotomie((h) => V(h) - 10, 0, 4), h20 = dichotomie((h) => V(h) - 20, 0, 4);
  vrai(`18. h(10 m³) = ${h10.toFixed(4)} dans ]1,44 ; 1,45[`, h10 > 1.44 && h10 < 1.45);
  vrai(`18. h(20 m³) = ${h20.toFixed(4)} dans ]2,25 ; 2,26[`, h20 > 2.25 && h20 < 2.26);
  for (const [h, v] of [[1.44, 9.9], [1.45, 10.02], [2.25, 19.88], [2.26, 20]]) arrondi(`18. V(${h}) ≈ ${v}`, v, V(h));
  vrai("18. V(2,26) un peu plus que 20", V(2.26) > 20);
  arrondi("18. écart des traits 10 → 20 ≈ 0,81 m", 0.81, h20 - h10);
  vrai("18. V strictement croissante sur [0 ; 4]", Array.from({ length: 400 }, (_, i) => V((i + 1) / 100) > V(i / 100)).every(Boolean));
  const hDessin = dessin("cuve", 18, "figure")[0];
  vrai(`18. la cuve dessinée est au trait des 10 m³ (h = ${hDessin})`, Math.abs(V(hDessin) - 10) < 0.05);
  dit(18, "entre $1{,}44$ m et $1{,}45$ m");
  dit(18, "entre $2{,}25$ m et $2{,}26$ m");
}
{
  const a = (t) => 500 + 1500 * Math.sin((Math.PI * t) / 20), d = (t) => 2000 - 15 * t * t, g = (t) => a(t) - d(t);
  vrai("19. altitudes : 500 → 2000, 2000 → 500", Math.abs(a(0) - 500) < 1e-9 && Math.abs(a(10) - 2000) < 1e-9 && d(0) === 2000 && d(10) === 500);
  vrai("19. g′ > 0 sur [0 ; 10]", Array.from({ length: 1001 }, (_, i) => derivee(g, Math.min(9.9999, i / 100 + 1e-4))).every((v) => v > 0));
  verif("19. g′(t) = 75π cos(πt/20) + 30t (en 3)", derivee(g, 3), 75 * Math.PI * Math.cos((3 * Math.PI) / 20) + 90, 1e-6);
  const t0 = dichotomie(g, 0, 10);
  vrai(`19. t0 = ${t0.toFixed(4)} dans ]5,20 ; 5,21[`, t0 > 5.2 && t0 < 5.21);
  arrondi("19. g(5,20) ≈ −0,95", -0.95, g(5.2));
  arrondi("19. g(5,21) ≈ 2,2", 2.2, g(5.21), 0.1);
  vrai(`19. heure : 13 h ${Math.floor((t0 % 1) * 60)}`, Math.floor((t0 % 1) * 60) === 12);
  arrondi("19. altitude ≈ 1 594 m", 1594, a(t0), 1);
  const [cm, cd] = courbes(19);
  suit("19. montée en km", cm.pts, (t) => a(t) / 1000);
  suit("19. descente en km", cd.pts, (t) => d(t) / 1000);
  arrondi("19. point rouge ≈ (t0 ; a(t0)/1000)", termes(19)[0].y, a(t0) / 1000);
  arrondi("19. point rouge, abscisse", termes(19)[0].x, t0, 0.01);
  dit(19, "il est à $13$ h $12$");
}
{
  const v = (t) => 50 * (1 - E(-0.2 * t)), d = (t) => 50 * t - 250 * (1 - E(-0.2 * t));
  verif("20. d′ = v (en 7)", derivee(d, 7), v(7), 1e-6);
  const t = tableauDe(20, "figure");
  t.en.forEach((x, i) => arrondi(`20. d(${x})`, t.nombres[i], d(x), 0.1));
  const T = dichotomie((x) => d(x) - 1000, 0, 60);
  vrai(`20. T = ${T.toFixed(3)} dans ]24,9 ; 25[`, T > 24.9 && T < 25);
  vrai("20. d(t) ≥ 50t − 250 jusqu'à 200 s", Array.from({ length: 2001 }, (_, i) => d(i / 10) >= 50 * (i / 10) - 250).every(Boolean));
  arrondi("20. v(25) ≈ 49,7 m/s", 49.7, v(25), 0.1);
  vrai("20. v(25) proche de 180 km/h", Math.abs(v(25) * 3.6 - 180) < 2);
  tabVar(20);
  dit(20, "$24{,}9 < T < 25$");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce qu'on voit (⭐ dans les 20)", F.feuille.corrections.every((t) => /⭐/.test(t)));
F.fin();
