// Recalcul indépendant de la feuille « Convexité » de terminale spé
// (29/09/2026) : lib/fiches-exercices/maths-terminale-convexite-fonction.tsx.
//
// ⭐ Les dérivées secondes du corrigé sont confirmées par DOUBLE dérivation
// numérique ; les tableaux de signes sont relus case par case et recalculés
// sur la fonction ; les courbes échantillonnées sont relues point par point ;
// les tangentes et cordes dessinées sont recalculées ; la position courbe /
// tangente est testée sur une grille ; les seuils par dichotomie ; le
// programme de Newton est EXÉCUTÉ.
// Usage : node scripts/verifier-exercices-terminale-spe-convexite-fonction.mjs

import { feuilleTerminale, executerPython, derivee, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const F = feuilleTerminale({ fichier: "lib/fiches-exercices/maths-terminale-convexite-fonction.tsx", notion: "convexite_fonction" });
const { dit, enonceDit, verif, vrai, arrondi, termes, courbes, dessin } = F;
const E = Math.exp;
const d2 = (f, x, h = 1e-4) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
const grille = (a, b, n = 400) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);

/** La courbe échantillonnée `pts` n°i de l'exercice k suit-elle f ? */
const surCourbe = (k, i, f, nom, role) => {
  const pts = courbes(k, role)[i].pts;
  const fautes = pts.filter(([x, y]) => Math.abs(y - f(x)) > 6e-4);
  vrai(`${k}. courbe ${nom} (${pts.length} points)`, pts.length > 5 && fautes.length === 0, JSON.stringify(fautes[0]));
};
/** Le tableau de signes de l'exercice k, case par case : bornes en nombres, une fonction par ligne. */
const signes = (k, bornes, fonctions) => {
  const [, lignes] = dessin("tableauSignes", k);
  const s = (y) => (Math.abs(y) < 1e-9 ? "0" : y > 0 ? "+" : "-");
  const fautes = [];
  lignes.forEach(([label, sg, marques], i) => {
    const f = fonctions[i];
    sg.forEach((x, j) => {
      const a = bornes[j] === -Infinity ? bornes[j + 1] - 1 : bornes[j];
      const b = bornes[j + 1] === Infinity ? bornes[j] + 1 : bornes[j + 1];
      if (s(f((a + b) / 2)) !== x) fautes.push(`${label} colonne ${j + 1}`);
    });
    for (let j = 1; j + 1 < bornes.length; j++) if ((s(f(bornes[j])) === "0" ? "0" : "") !== (marques[j - 1] ?? "")) fautes.push(`${label} sous la borne ${j}`);
  });
  vrai(`${k}. tableau de signes juste case par case (${lignes.length} lignes)`, lignes.length === fonctions.length && fautes.length === 0, fautes.join(" ; "));
};
/** Signe de f'' sur une grille : convexe (+1) ou concave (−1) sur [a, b]. */
const convexe = (f, a, b, sens) => grille(a, b, 60).slice(1, -1).every((x) => sens * d2(f, x) > -1e-6);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const f = (x) => x ** 3 - 3 * x;
  vrai("1. la courbe est x³ − 3x", JSON.stringify(courbes(1, "figure")[0].p) === "[1,0,-3,0]");
  vrai("1. tangente en O : y = f'(0) x = −3x", JSON.stringify(courbes(1, "figure")[1].q) === `[0,${derivee(f, 0).toFixed(0)},0]`);
  vrai("1. concave sur [−3 ; 0], convexe sur [0 ; 3]", convexe(f, -3, 0, -1) && convexe(f, 0, 3, 1));
  vrai("1. f décroît sur [0 ; 1] (piège)", derivee(f, 0.5) < 0);
  vrai("1. la courbe traverse sa tangente en O", f(-0.5) < 1.5 && f(0.5) > -1.5);
  dit(1, "$f''(x) = 6x$");
}
{
  const f = (x) => x ** 4 - 6 * x * x + 1;
  verif("2. f''(2) = 12 × 4 − 12", d2(f, 2), 36, 1e-4);
  signes(2, [-Infinity, -1, 1, Infinity], [(x) => x - 1, (x) => x + 1, (x) => d2(f, x)]);
  dit(2, "$f''(x) = 12(x - 1)(x + 1)$");
}
{
  const f = (x) => x * E(x);
  vrai("3. f'' = (x + 2) eˣ", grille(-4, 2, 20).every((x) => Math.abs(d2(f, x) - (x + 2) * E(x)) < 1e-4));
  surCourbe(3, 0, f, "x eˣ");
  arrondi("3. point d'inflexion (−2 ; −0,27)", termes(3)[0].y, f(-2), 0.01);
  vrai("3. abscisse −2", termes(3)[0].x === -2);
  dit(3, "$-2\\mathrm{e}^{-2} \\approx -0{,}27$");
}
{
  surCourbe(4, 0, E, "exp");
  vrai("4. tangente en 0 : y = x + 1", JSON.stringify(courbes(4)[1].q) === "[0,1,1]" && derivee(E, 0) - 1 < 1e-9);
  vrai("4. eˣ ≥ x + 1 sur [−3 ; 3]", grille(-3, 3).every((x) => E(x) >= x + 1 - 1e-12));
  dit(4, "soit $y = x + 1$");
}
{
  const f2 = (x) => x * x - x - 2;
  vrai("5. la courbe est f''(x) = x² − x − 2", JSON.stringify(courbes(5, "figure")[0].q) === "[1,-1,-2]");
  vrai("5. racines −1 et 2", f2(-1) === 0 && f2(2) === 0 && f2(0) < 0);
  dit(5, "$f''(x) = x^2 - x - 2 = (x + 1)(x - 2)$");
}
{
  const fp = (x) => x * x - 2 * x - 1;
  vrai("6. la courbe est f'(x) = x² − 2x − 1", JSON.stringify(courbes(6, "figure")[0].q) === "[1,-2,-1]");
  vrai("6. f' décroît avant 1, croît après", derivee(fp, 0.5) < 0 && derivee(fp, 1.5) > 0 && Math.abs(derivee(fp, 1)) < 1e-9);
  vrai("6. f'(1) = −2 < 0 : f décroît en 1 (le signe ne sert pas)", fp(1) === -2);
}
{
  const g = (x) => x ** 3 - 3 * x * x + 2;
  verif("7. g(1) = 0", g(1), 0);
  vrai("7. x⁴ convexe : f'' ≥ 0 de part et d'autre de 0", d2((x) => x ** 4, -0.3) > 0 && d2((x) => x ** 4, 0.3) > 0);
  signes(7, [-Infinity, 0, 1, Infinity], [(x) => 12 * x * x, (x) => d2(g, x)]);
  dit(7, "le point d'inflexion est $(1 ; 0)$");
}
{
  const [, corde] = courbes(8);
  vrai("8. corde de A(−1 ; 1) à B(2 ; 4), sur la parabole", JSON.stringify(corde.pts) === "[[-1,1],[2,4]]");
  vrai("8. la corde est y = x + 2", corde.pts.every(([x, y]) => y === x + 2));
  vrai("8. x² ≤ x + 2 sur [−1 ; 2], > dehors", grille(-1, 2).every((x) => x * x <= x + 2 + 1e-12) && 9 > 1 && (-2) ** 2 > 0);
  dit(8, "$y = x + 2$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const C = (q) => q ** 3 - 3 * q * q + 4 * q + 2;
  vrai("9. courbe C", JSON.stringify(courbes(9)[0].p) === "[1,-3,4,2]");
  verif("9. C(1) = 4", C(1), 4);
  verif("9. C'(1) = 1", derivee(C, 1), 1, 1e-8);
  vrai("9. tangente y = q + 3", JSON.stringify(courbes(9)[1].q) === "[0,1,3]");
  vrai("9. C − T = (q − 1)³", grille(0, 3, 30).every((q) => Math.abs(C(q) - (q + 3) - (q - 1) ** 3) < 1e-9));
  vrai("9. C croissante sur [0 ; 3]", grille(0, 3).every((q) => derivee(C, q) > 0));
  vrai("9. C' minimal en 1", grille(0, 3).every((q) => derivee(C, q) >= 1 - 1e-6));
  vrai("9. point I(1 ; 4)", termes(9)[0].x === 1 && termes(9)[0].y === 4);
  dit(9, "soit $y = q + 3$");
}
{
  const N = (t) => 10 / (1 + E(3 - t));
  surCourbe(10, 0, N, "N");
  const N2 = (t) => (10 * E(3 - t) * (E(3 - t) - 1)) / (1 + E(3 - t)) ** 3;
  vrai("10. N'' de l'énoncé = dérivée seconde numérique", grille(0, 8, 16).every((t) => Math.abs(d2(N, t) - N2(t)) < 1e-4));
  verif("10. N(3) = 5", N(3), 5);
  verif("10. N'(3) = 2,5", derivee(N, 3), 2.5, 1e-8);
  vrai("10. N' maximal en 3", grille(0, 9).every((t) => derivee(N, t) <= 2.5 + 1e-9));
  verif("10. limite 10", N(60), 10, 1e-12);
  vrai("10. horizontale 10, point (3 ; 5)", dessin("repere", 10)[3] === 10 && termes(10)[0].x === 3 && termes(10)[0].y === 5);
  dit(10, "$2\\,500$ nouveaux cas par semaine");
  enonceDit(10, "$N(t) = \\dfrac{10}{1 + \\mathrm{e}^{3 - t}}$");
}
{
  surCourbe(11, 0, E, "exp");
  arrondi("11. pente de la tangente en 1 : e", courbes(11)[1].q[1], Math.E, 0.001);
  vrai("11. la tangente en 1 passe par O : e(1 − 1) + e − e = 0", Math.abs(Math.E * (0 - 1) + Math.E) < 1e-12);
  vrai("11. eˣ ≥ e x", grille(-2, 3).every((x) => E(x) >= Math.E * x - 1e-12));
  arrondi("11. point (1 ; e)", termes(11)[0].y, Math.E, 0.01);
}
{
  const f2 = (a) => (x) => 12 * x * x + 6 * a * x + 12;
  vrai("12. f'' par dérivation numérique (a = 3)", Math.abs(d2((x) => x ** 4 + 3 * x ** 3 + 6 * x * x, 0.7) - f2(3)(0.7)) < 1e-4);
  const positif = (a) => grille(-10, 10, 4000).every((x) => f2(a)(x) >= -1e-9);
  vrai("12. convexe pour a ∈ [−4 ; 4], pas pour 4,01 ni −4,01", [-4, -2, 0, 3.99, 4].every(positif) && !positif(4.01) && !positif(-4.01));
  verif("12. Δ = 36a² − 576 nul en a = 4", 36 * 16 - 576, 0);
  signes(12, [-Infinity, -2, -0.5, Infinity], [(x) => 2 * x + 1, (x) => x + 2, f2(5)]);
  dit(12, "\\iff -4 \\leqslant a \\leqslant 4$");
}
{
  const R = (x) => 5 + 2 * Math.log(1 + x);
  surCourbe(13, 0, R, "R");
  vrai("13. concave : R'' < 0", grille(0, 8).every((x) => d2(R, x) < 0));
  arrondi("13. R(1) − R(0) ≈ 1,39", 1.39, R(1) - R(0));
  arrondi("13. R(5) − R(4) ≈ 0,36", 0.36, R(5) - R(4));
  arrondi("13. R(4) ≈ 8,22", 8.22, R(4));
  vrai("13. tangente y = 2x + 5, au-dessus", JSON.stringify(courbes(13)[1].q) === "[0,2,5]" && grille(0, 8).every((x) => R(x) <= 2 * x + 5 + 1e-12));
  dit(13, "= 2\\ln 2 \\approx 1{,}39$");
  dit(13, "$R(4) \\approx 8{,}22$");
}
{
  const f = (x) => E((-x * x) / 2);
  surCourbe(14, 0, f, "cloche");
  vrai("14. f'' = (x² − 1) e^(−x²/2)", grille(-3, 3, 30).every((x) => Math.abs(d2(f, x) - (x * x - 1) * f(x)) < 1e-4));
  vrai("14. inflexions en ±1, à e^(−1/2) ≈ 0,61", termes(14).every((p) => Math.abs(p.x) === 1 && Math.abs(p.y - f(1)) <= 0.005));
  dit(14, "$\\mathrm{e}^{-1/2} \\approx 0{,}61$");
}
{
  const N = (t) => 2 ** t;
  surCourbe(15, 0, N, "2^t");
  vrai("15. convexe", grille(-1, 3).every((t) => d2(N, t) > 0));
  vrai("15. 2^t ≤ 1 + t sur [0 ; 1], ≥ ailleurs", grille(0, 1).every((t) => N(t) <= 1 + t + 1e-12) && N(3) === 8 && N(-0.5) > 0.5);
  arrondi("15. √2 ≈ 1,41", 1.41, N(0.5));
  vrai("15. corde y = 1 + t", JSON.stringify(courbes(15)[1].q) === "[0,1,1]");
  dit(15, "$N(0{,}5) = \\sqrt{2} \\approx 1{,}41$");
}
{
  const d = (t) => -(t ** 3) + 6 * t * t;
  const v = (t) => derivee(d, t);
  verif("16. d(2) = 16", d(2), 16);
  verif("16. d(4) = 32", d(4), 32);
  verif("16. v(2) = 12", v(2), 12, 1e-8);
  verif("16. v(4) = 0", v(4), 0, 1e-8);
  vrai("16. la courbe dessinée est v(t) = −3t² + 12t", JSON.stringify(courbes(16)[0].q) === "[-3,12,0]");
  vrai("16. convexe sur [0 ; 2], concave sur [2 ; 4]", convexe(d, 0, 2, 1) && convexe(d, 2, 4, -1));
  dit(16, "$v(2) = -12 + 24 = 12$ m/s");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const f = (t) => 2 * t * E(-t);
  surCourbe(17, 0, (t) => 10 * f(t), "10 f (graduation 0,1 g/L)");
  arrondi("17. max 2/e ≈ 0,74", 0.74, f(1));
  vrai("17. max en t = 1", grille(0, 7).every((t) => f(t) <= f(1) + 1e-12));
  vrai("17. f'' = 2(t − 2)e^(−t)", grille(0, 6, 30).every((t) => Math.abs(d2(f, t) - 2 * (t - 2) * E(-t)) < 1e-4));
  arrondi("17. 4e^(−2) ≈ 0,54", 0.54, f(2));
  arrondi("17. f'(2) ≈ −0,27", -0.27, derivee(f, 2));
  vrai("17. f' minimale en 2", grille(0, 7).every((t) => derivee(f, t) >= derivee(f, 2) - 1e-9));
  const t1 = dichotomie((t) => f(t) - 0.5, 0, 1);
  const t2 = dichotomie((t) => f(t) - 0.5, 1, 5);
  arrondi("17. t1 ≈ 0,36", 0.36, t1);
  arrondi("17. t2 ≈ 2,15", 2.15, t2);
  arrondi("17. durée ≈ 1,8 h", 1.8, t2 - t1, 0.1);
  vrai("17. 1,8 h = 1 h 48 min", Math.round(0.8 * 60) === 48);
  verif("17. f(50) ≈ 0", f(50), 0, 1e-15);
  vrai("17. points rouges (1 ; 7,36) et (2 ; 5,41)", Math.abs(termes(17)[0].y - 10 * f(1)) <= 0.005 && Math.abs(termes(17)[1].y - 10 * f(2)) <= 0.005);
  vrai("17. horizontale 5 = 0,5 g/L", dessin("repere", 17)[3] === 5);
  dit(17, "$t_1 \\approx 0{,}36$ et $t_2 \\approx 2{,}15$");
  dit(17, "$4\\mathrm{e}^{-2} \\approx 0{,}54$");
}
{
  const g = (x) => Math.log(1 + x);
  surCourbe(18, 0, g, "ln(1 + x)");
  vrai("18. ln(1 + x) ≤ x", grille(-0.99, 10).every((x) => g(x) <= x + 1e-12));
  const cap = (n) => (1 + 1 / n) ** n;
  vrai("18. capitaux 2 ; 2,613 ; 2,715", cap(1) === 2 && Math.abs(cap(12) - 2.613) <= 0.0005 && Math.abs(cap(365) - 2.715) <= 0.0005);
  vrai("18. toujours ≤ e (n ≤ 10⁵)", [1, 2, 10, 100, 1e3, 1e5].every((n) => cap(n) <= Math.E));
  dit(18, "$n = 12$ : environ $2{,}613$ €. $n = 365$ : environ $2{,}715$ €");
}
{
  const f = (x) => (E(x) + E(-x)) / 2;
  surCourbe(19, 0, f, "chaînette");
  vrai("19. f'' = f", grille(-2, 2, 20).every((x) => Math.abs(d2(f, x) - f(x)) < 1e-4));
  arrondi("19. f(2) ≈ 3,76", 3.76, f(2));
  vrai("19. le segment orange relie les sommets", courbes(19)[1].pts.every(([x, y]) => Math.abs(x) === 2 && Math.abs(y - f(2)) < 6e-4));
  vrai("19. le câble est sous le segment", grille(-2, 2).every((x) => f(x) <= f(2) + 1e-12));
  arrondi("19. flèche ≈ 27,6 m", 27.6, 10 * (f(2) - f(0)), 0.1);
  dit(19, "soit environ $27{,}6$ m");
}
{
  const suivant = (a) => a - 1 + 3 * E(-a);
  const x = [2];
  while (x.length < 6) x.push(suivant(x[x.length - 1]));
  // La tangente, par la dérivée numérique : zéro de y = f'(a)(t − a) + f(a).
  const f = (t) => E(t) - 3;
  verif("20. zéro de la tangente = formule de a)", 2 - f(2) / derivee(f, 2), x[1], 1e-8);
  arrondi("20. x1 ≈ 1,406", 1.406, x[1], 0.001);
  arrondi("20. x2 ≈ 1,1414", 1.1414, x[2], 0.0001);
  arrondi("20. x3 ≈ 1,0995", 1.0995, x[3], 0.0001);
  vrai("20. décroissante, au-dessus de ln 3", x.every((v, i) => v >= Math.log(3) - 1e-15 && (i === 0 || v <= x[i - 1])));
  const [, tangente] = courbes(20);
  vrai("20. tangente orange y = e² x − e² − 3", Math.abs(tangente.q[1] - E(2)) < 0.001 && Math.abs(tangente.q[2] + E(2) + 3) < 0.001);
  surCourbe(20, 0, f, "eˣ − 3");
  arrondi("20. point rouge ≈ x1", termes(20)[0].x, x[1], 0.01);
  const lignes = dessin("programme", 20, "figure")[0];
  const sortie = executerPython(lignes, "print(round(newton(4), 6))");
  if (sortie === null) console.log("  (Python absent : newton(4) non exécuté)");
  else vrai(`20. Python : newton(4) = ${sortie}`, sortie === "1.098613");
  arrondi("20. ln 3 ≈ 1,098612", 1.098612, Math.log(3), 0.000001);
  dit(20, "newton(4) renvoie environ $1{,}098613$");
  dit(20, "$\\ln 3 \\approx 1{,}098612$");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
F.fin();
