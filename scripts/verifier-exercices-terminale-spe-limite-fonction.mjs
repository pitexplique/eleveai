// Recalcul indépendant de la feuille « Limites de fonctions » de terminale spé
// (29/09/2026) : lib/fiches-exercices/maths-terminale-limite-fonction.tsx.
//
// ⭐ Chaque limite annoncée est confirmée par ÉVALUATION NUMÉRIQUE de
// l'expression de départ (jamais de la forme simplifiée du corrigé) : loin
// (x = 10⁶, 10⁸) pour l'infini, tout près (a ± 10⁻⁶) pour un point, avec le
// côté. Les courbes dessinées sont relues et recalculées point par point ; les
// asymptotes (droites grises, horizontales) relues dans le dessin ; les dérivées
// admises vérifiées par dérivation numérique ; les seuils cherchés par
// dichotomie ou pas à pas ; les tableaux de valeurs recalculés.
// Usage : node scripts/verifier-exercices-terminale-spe-limite-fonction.mjs

import { feuilleTerminale, derivee, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-limite-fonction.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "limite_fonction" });
const { dit, enonceDit, verif, vrai, courbes, termes, dessin, tableauDe, arrondi } = F;

const LOIN = 1e8;
const PRES = 1e-6;
/** « tend vers +∞ » numériquement : très grand, et qui grandit encore. */
const versPlusInf = (f, x1, x2) => f(x1) > 1e3 && f(x2) > f(x1);
const versMoinsInf = (f, x1, x2) => f(x1) < -1e3 && f(x2) < f(x1);
/** La courbe (ligne brisée) suit-elle f ? */
const surCourbe = (nom, pts, f) => {
  const fautes = pts.filter(([x, y]) => Math.abs(y - f(x)) > 6e-4);
  vrai(`${nom} : ${pts.length} points sur la courbe`, pts.length > 0 && fautes.length === 0, JSON.stringify(fautes[0]));
};
/** Une droite grise verticale x = a. */
const verticale = (nom, cb, a) => vrai(`${nom} : verticale grise x = ${a}`, cb.couleur === "#94a3b8" && cb.pts.every(([x]) => x === a) && cb.pts.length === 2);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const f = (x) => 2 + 1 / (x - 1);
  const [g, d, v] = courbes(1, "figure");
  surCourbe("1. branche gauche", g.pts, f);
  surCourbe("1. branche droite", d.pts, f);
  verticale("1", v, 1);
  vrai("1. horizontale 2", dessin("repere", 1, "figure")[3] === 2);
  verif("1. limite en +∞", f(LOIN), 2, 1e-6);
  verif("1. limite en −∞", f(-LOIN), 2, 1e-6);
  vrai("1. +∞ à droite de 1, −∞ à gauche", versPlusInf(f, 1 + 1e-4, 1 + 1e-6) && versMoinsInf(f, 1 - 1e-4, 1 - 1e-6));
}
{
  vrai("2. a) x³ en −∞", versMoinsInf((x) => x ** 3, -1e3, -1e4));
  vrai("2. b) 1/x² en 0 des deux côtés", versPlusInf((x) => 1 / x ** 2, 1e-3, 1e-5) && versPlusInf((x) => 1 / x ** 2, -1e-3, -1e-5));
  vrai("2. c) √x", versPlusInf(Math.sqrt, 1e8, 1e10));
  verif("2. d) e^x en −∞", Math.exp(-50), 0, 1e-12);
  vrai("2. e) 1/x en 0⁻", versMoinsInf((x) => 1 / x, -1e-4, -1e-6));
  const [a, b, c, d] = courbes(2);
  surCourbe("2. 1/x gauche", a.pts, (x) => 1 / x);
  surCourbe("2. 1/x droite", b.pts, (x) => 1 / x);
  surCourbe("2. 1/x² gauche", c.pts, (x) => 1 / x ** 2);
  surCourbe("2. 1/x² droite", d.pts, (x) => 1 / x ** 2);
  dit(2, "$(-10)^3 = -1\\,000$");
}
{
  const g = (x) => (3 - 1 / x) * (x + 2);
  const t = tableauDe(3);
  t.en.forEach((x, i) => arrondi(`3. b) f(${x})`, t.nombres[i], g(x), x === 1000 ? 1 : 0.01));
  vrai("3. a) x² + 1/x → +∞", versPlusInf((x) => x * x + 1 / x, 1e3, 1e5));
  vrai("3. b) → +∞", versPlusInf(g, 1e4, 1e6));
  verif("3. c) 5/(x² + 1) en −∞", 5 / (LOIN ** 2 + 1), 0, 1e-12);
  vrai("3. d) 7 − 2√x → −∞", versMoinsInf((x) => 7 - 2 * Math.sqrt(x), 1e8, 1e10));
  dit(3, "$34{,}8$, puis $304{,}98$, puis environ $3\\,005$");
}
{
  const f = (x) => x ** 3 - 4 * x ** 2 + 1;
  vrai("4. le dessin est x³ − 4x² + 1", JSON.stringify(courbes(4)[0].p) === "[1,-4,0,1]");
  vrai("4. +∞ en +∞, −∞ en −∞", versPlusInf(f, 1e3, 1e5) && versMoinsInf(f, -1e3, -1e5));
  const xmin = dichotomie((x) => derivee(f, x), 1, 4);
  arrondi("4. minimum local vers x ≈ 2,7", 2.7, xmin, 0.1);
  vrai(`4. f(xmin) = ${f(xmin).toFixed(2)} < −8`, f(xmin) < -8 && f(xmin) > -10);
}
{
  const f = (x) => (2 * x * x - 3 * x) / (x * x + 1);
  surCourbe("5. courbe", courbes(5)[0].pts, f);
  verif("5. limite en +∞", f(LOIN), 2, 1e-6);
  verif("5. limite en −∞", f(-LOIN), 2, 1e-6);
  verif("5. f(−2/3) = 2", f(-2 / 3), 2, 1e-12);
  vrai("5. horizontale 2", dessin("repere", 5)[3] === 2);
  dit(5, "$f(x) = 2$ pour $x = -\\dfrac{2}{3}$");
}
{
  const f = (x) => (x + 1) / (x - 2);
  vrai("6. +∞ en 2⁺, −∞ en 2⁻", versPlusInf(f, 2 + 1e-4, 2 + 1e-6) && versMoinsInf(f, 2 - 1e-4, 2 - 1e-6));
  const [bornes, lignes] = dessin("tableauSignes", 6);
  const [, signes, marques] = lignes[0];
  vrai("6. tableau : x − 2 négatif puis positif, 0 en 2", bornes[1] === "$2$" && signes.join() === "-,+" && marques.join() === "0" && 1.9 - 2 < 0 && 2.1 - 2 > 0);
}
{
  const g = (x) => (x * x - 9) / (x - 3);
  const t = tableauDe(7);
  t.en.forEach((x, i) => arrondi(`7. g(${x})`, t.nombres[i], g(x), 0.01));
  verif("7. a) limite 6", g(3 + PRES), 6, 1e-5);
  verif("7. a) limite 6 à gauche", g(3 - PRES), 6, 1e-5);
  vrai("7. b) +∞ à droite de 3", versPlusInf((x) => (x * x + 9) / (x - 3), 3 + 1e-4, 3 + 1e-6));
}
{
  verif("8. a) √(4 + 1/x) → 2", Math.sqrt(4 + 1 / LOIN), 2, 1e-8);
  verif("8. b) e^(−x²) → 0", Math.exp(-(30 ** 2)), 0, 1e-12);
  const h = (x) => Math.exp(-1 / x);
  verif("8. c) 0 à droite", h(1e-3), 0, 1e-12);
  vrai("8. c) +∞ à gauche", versPlusInf(h, -0.1, -0.05));
  verif("8. horizontale 1 : limite en ±∞", h(LOIN), 1, 1e-6);
  const [g, d] = courbes(8);
  surCourbe("8. branche gauche", g.pts, h);
  surCourbe("8. branche droite", d.pts, h);
  vrai("8. horizontale 1", dessin("repere", 8)[3] === 1);
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const f = (x) => (3 * x - 1) / (x + 2);
  const [g, d, v] = courbes(9);
  surCourbe("9. branche gauche", g.pts, f);
  surCourbe("9. branche droite", d.pts, f);
  verticale("9", v, -2);
  vrai("9. horizontale 3", dessin("repere", 9)[3] === 3);
  verif("9. limite 3 en ±∞", (f(LOIN) + f(-LOIN)) / 2, 3, 1e-6);
  vrai("9. −∞ en −2⁺, +∞ en −2⁻", versMoinsInf(f, -2 + 1e-4, -2 + 1e-6) && versPlusInf(f, -2 - 1e-4, -2 - 1e-6));
  vrai("9. f(x) − 3 = −7/(x + 2)", [-8, -3, 0, 4.5].every((x) => Math.abs(f(x) - 3 + 7 / (x + 2)) < 1e-12));
  vrai("9. sous y = 3 à droite, au-dessus à gauche", d.pts.every(([, y]) => y < 3) && g.pts.every(([, y]) => y > 3));
  vrai("9. deux branches croissantes", [g, d].every((b) => b.pts.every(([, y], i) => i === 0 || y > b.pts[i - 1][1])));
}
{
  const f = (x) => Math.sqrt(x * x + 1) - x;
  surCourbe("10. courbe", courbes(10)[0].pts, f);
  vrai("10. +∞ en −∞", versPlusInf(f, -1e4, -1e6));
  vrai("10. → 0 en +∞ (f(10⁴) ≈ 1/(2 × 10⁴))", Math.abs(f(1e4) - 5e-5) < 1e-7);
  verif("10. forme conjuguée", f(3.7), 1 / (Math.sqrt(3.7 ** 2 + 1) + 3.7), 1e-12);
}
{
  const f = (x) => x + Math.sin(x);
  surCourbe("11. courbe", courbes(11)[0].pts, f);
  vrai("11. droite orange y = x − 1", JSON.stringify(courbes(11)[1].q) === "[0,1,-1]");
  vrai("11. au-dessus de x − 1", courbes(11)[0].pts.every(([x, y]) => y >= x - 1 - 1e-3));
  const g = (x) => (2 * x + Math.cos(x)) / x;
  vrai("11. b) encadrement (x de 0,5 à 200)", Array.from({ length: 400 }, (_, i) => 0.5 + i / 2).every((x) => 2 - 1 / x <= g(x) + 1e-12 && g(x) <= 2 + 1 / x + 1e-12));
  verif("11. b) limite 2", g(1e7), 2, 1e-6);
}
{
  const u = (t) => 6 * (1 - Math.exp(-0.5 * t));
  surCourbe("12. courbe", courbes(12)[0].pts, u);
  verif("12. limite 6", u(200), 6, 1e-12);
  vrai("12. horizontale 6", dessin("repere", 12)[3] === 6);
  verif("12. u' = 3e^(−0,5t)", derivee(u, 1.3), 3 * Math.exp(-0.65), 1e-7);
  arrondi("12. u(9) ≈ 5,933", 5.933, u(9), 0.001);
  arrondi("12. u(10) ≈ 5,960", 5.96, u(10), 0.001);
  const t99 = dichotomie((t) => u(t) - 0.99 * 6, 0, 50);
  vrai(`12. seuil de 99 % entre 9 et 10 s (${t99.toFixed(2)})`, t99 > 9 && t99 < 10);
  dit(12, "$u(9) \\approx 5{,}933$");
  dit(12, "entre $9$ et $10$ secondes");
}
{
  const C = (q) => (200 + 3 * q) / q;
  surCourbe("13. courbe C(100x)", courbes(13)[0].pts, (x) => C(100 * x));
  verif("13. limite 3", C(LOIN), 3, 1e-6);
  vrai("13. +∞ en 0⁺", versPlusInf(C, 1e-2, 1e-4));
  vrai("13. point (400 ; 3,5)", termes(13)[0].x * 100 === 400 && C(400) === 3.5 && termes(13)[0].y === 3.5);
  const premier = (() => { let q = 1; while (C(q) >= 3.5) q++; return q; })();
  vrai(`13. premier q sous 3,50 € : ${premier}`, premier === 401);
  dit(13, "À partir de $401$ lampes");
}
{
  const f = (x) => (Math.sqrt(x + 4) - 2) / x;
  const t = tableauDe(14);
  t.en.forEach((x, i) => arrondi(`14. f(${x})`, t.nombres[i], f(x), 0.0001));
  verif("14. limite 1/4 à droite", f(1e-7), 0.25, 1e-6);
  verif("14. limite 1/4 à gauche", f(-1e-7), 0.25, 1e-6);
  verif("14. nombre dérivé de √ en 4", derivee(Math.sqrt, 4), 0.25, 1e-8);
}
{
  const P = (R) => (36 * R) / (R + 2) ** 2;
  verif("15. P(0) = 0", P(0), 0);
  verif("15. limite 0 en +∞", P(LOIN), 0, 1e-6);
  vrai("15. P' admise = dérivée numérique", [0.5, 1.9, 3, 10].every((R) => Math.abs(derivee(P, R) - (36 * (2 - R)) / (R + 2) ** 3) < 1e-7));
  verif("15. P(2) = 4,5", P(2), 4.5);
  const [bornes, valeurs, label, variable] = dessin("tableauVariations", 15);
  vrai("15. tableau : 0, 2, +∞ → 0, 4,5, 0 (P en R)", bornes.join() === "0,2,+∞" && valeurs.join() === "0,4,5,0" && label === "P" && variable === "R");
  surCourbe("15. courbe", courbes(15)[0].pts, P);
  vrai("15. maximum en R = 2", [0, 1, 1.9, 2.1, 5, 14].every((R) => P(R) <= P(2)));
}
{
  const f = (x) => (3 * x + 1) / (x - 2);
  const [g, d, v] = courbes(16);
  surCourbe("16. branche gauche", g.pts, f);
  surCourbe("16. branche droite", d.pts, f);
  verticale("16", v, 2);
  vrai("16. horizontale 3", dessin("repere", 16)[3] === 3);
  verif("16. limite a = 3", f(LOIN), 3, 1e-6);
  vrai("16. +∞ en 2⁺", versPlusInf(f, 2 + 1e-4, 2 + 1e-6));
  vrai("16. ab ≠ −1 : 3 × 2 + 1 = 7", 3 * 2 + 1 === 7);
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const E = (x) => 1 / Math.sqrt(1 - x * x) - 1;
  verif("17. E(0) = 0", E(0), 0);
  arrondi("17. E(0,5) ≈ 0,15", 0.15, E(0.5));
  arrondi("17. E(0,9) ≈ 1,29", 1.29, E(0.9));
  arrondi("17. E(0,99) ≈ 6,09", 6.09, E(0.99));
  dit(17, "$E(0{,}5) \\approx 0{,}15$, $E(0{,}9) \\approx 1{,}29$ et $E(0{,}99) \\approx 6{,}09$");
  vrai("17. +∞ en 1⁻", versPlusInf(E, 1 - 1e-7, 1 - 1e-9));
  verif("17. E(x)/x² → 1/2", E(1e-4) / 1e-8, 0.5, 1e-6);
  vrai("17. formule de d)", [0.1, 0.5, 0.93].every((x) => Math.abs(E(x) / x ** 2 - 1 / (Math.sqrt(1 - x * x) * (1 + Math.sqrt(1 - x * x)))) < 1e-12));
  vrai("17. croissante sur [0 ; 1[", Array.from({ length: 99 }, (_, i) => E((i + 1) / 100) > E(i / 100)).every(Boolean));
  const [courbe, parabole, v] = courbes(17);
  surCourbe("17. courbe (x = X/10)", courbe.pts, (X) => E(X / 10));
  vrai("17. parabole orange x²/2 (x = X/10)", JSON.stringify(parabole.q) === JSON.stringify([0.005, 0, 0]) && Math.abs(0.005 * 36 - (0.6 ** 2) / 2) < 1e-12);
  verticale("17", v, 10);
  F.pointsSur("17. points de a)", termes(17), (X) => E(X / 10));
}
{
  const c = (t) => (150 * t) / (100 + 5 * t);
  // Un autre chemin : on simule la cuve minute par minute (masse et volume).
  const cuve = (t) => (30 * 5 * t) / (100 + 5 * t);
  verif("18. formule = masse / volume", c(37), cuve(37), 1e-12);
  verif("18. limite 30", c(LOIN), 30, 1e-6);
  verif("18. c' = 15000/(100 + 5t)²", derivee(c, 12), 15000 / (160 ** 2), 1e-7);
  verif("18. 20 g/L à 40 min", dichotomie((t) => c(t) - 20, 0, 1000), 40, 1e-9);
  verif("18. 29 g/L à 580 min", dichotomie((t) => c(t) - 29, 0, 5000), 580, 1e-9);
  verif("18. cuve pleine à 180 min", (1000 - 100) / 5, 180);
  verif("18. c(180) = 27", c(180), 27, 1e-12);
  surCourbe("18. courbe (t = 20x, c/5)", courbes(18)[0].pts, (x) => c(20 * x) / 5);
  verticale("18", courbes(18)[1], 180 / 20);
  vrai("18. horizontale 6 = 30/5", dessin("repere", 18)[3] * 5 === 30);
  vrai("18. point (40 min ; 20 g/L)", termes(18)[0].x * 20 === 40 && termes(18)[0].y * 5 === 20);
  dit(18, "au bout de $580$ minutes");
  dit(18, "$c(180) = \\dfrac{27\\,000}{1\\,000} = 27$ g/L");
}
{
  const d = (x) => (2 * x) / (x - 2);
  // L'autre chemin : la relation de conjugaison 1/x + 1/d = 1/f, avec f = 2.
  vrai("19. 1/x + 1/d(x) = 1/2", [2.5, 3, 7, 40].every((x) => Math.abs(1 / x + 1 / d(x) - 0.5) < 1e-12));
  verif("19. limite 2 en +∞", d(LOIN), 2, 1e-6);
  vrai("19. +∞ en 2⁺", versPlusInf(d, 2 + 1e-4, 2 + 1e-6));
  vrai("19. d(x) − 2 = 4/(x − 2) > 0", [2.1, 3, 9, 100].every((x) => Math.abs(d(x) - 2 - 4 / (x - 2)) < 1e-9 && d(x) > 2));
  verif("19. d(x) = x en x = 4", dichotomie((x) => d(x) - x, 2.5, 10), 4, 1e-9);
  const [courbe, v, diag] = courbes(19);
  surCourbe("19. courbe", courbe.pts, d);
  verticale("19", v, 2);
  vrai("19. droite grise y = x", JSON.stringify(diag.q) === "[0,1,0]");
  vrai("19. horizontale 2 et point (4 ; 4)", dessin("repere", 19)[3] === 2 && termes(19)[0].x === 4 && termes(19)[0].y === 4);
}
{
  const f = (t) => 100 / (1 + 9 * Math.exp(-0.5 * t));
  verif("20. f(0) = 10", f(0), 10, 1e-12);
  verif("20. limite 100", f(200), 100, 1e-9);
  verif("20. limite 0 en −∞", f(-200), 0, 1e-9);
  vrai("20. f' admise = dérivée numérique", [-3, 0, 2.5, 7].every((t) => Math.abs(derivee(f, t) - (450 * Math.exp(-0.5 * t)) / (1 + 9 * Math.exp(-0.5 * t)) ** 2) < 1e-6));
  arrondi("20. f(8) ≈ 85,8", 85.8, f(8), 0.1);
  arrondi("20. f(9) ≈ 90,9", 90.9, f(9), 0.1);
  const t90 = dichotomie((t) => f(t) - 90, 0, 30);
  vrai(`20. 90 % atteint à t = ${t90.toFixed(2)}, entre 8 et 9`, t90 > 8 && t90 < 9);
  surCourbe("20. courbe (f/10)", courbes(20)[0].pts, (t) => f(t) / 10);
  vrai("20. horizontale 10 et point (0 ; 1)", dessin("repere", 20)[3] === 10 && termes(20)[0].x === 0 && termes(20)[0].y === 1);
  dit(20, "$f(8) \\approx 85{,}8$ et $f(9) \\approx 90{,}9$");
}

enonceDit(18, "$c(t) = \\dfrac{150t}{100 + 5t}$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce qu'on voit (⭐ dans les 20)", F.feuille.corrections.every((t) => /⭐/.test(t)));
F.fin();
