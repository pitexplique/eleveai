// Recalcul indépendant de la feuille « Dérivation et variations » de terminale
// spé (29/09/2026) : lib/fiches-exercices/maths-terminale-derivation-fonction.tsx.
//
// ⭐ Chaque dérivée annoncée est comparée à une dérivée NUMÉRIQUE (`derivee`,
// différence centrée) en plusieurs points ; chaque maximum ou minimum est
// retrouvé par un balayage fin de la fonction (pas par le signe de f′) ; les
// solutions d'équations par `dichotomie` ; le programme Python est EXÉCUTÉ ;
// les tangentes, courbes, points et tableaux de variations des dessins sont
// relus dans le source et recalculés.
// Usage : node scripts/verifier-exercices-terminale-spe-derivation-fonction.mjs

import { feuilleTerminale, executerPython, dichotomie, derivee } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-derivation-fonction.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "derivation_fonction", dessinsEnPlus: ["tabVar", "chaine", "lampe"] });
const { dit, enonceDit, verif, vrai, arrondi, termes, courbes, dessin } = F;
const E = Math.exp;

/** Un nombre écrit à la française dans un dessin : « −0,5 », « +∞ ». */
const lu = (s) => {
  const t = String(s).replace(/−/g, "-").replace(",", ".").replace(/\s/g, "");
  if (/^\+?∞$/.test(t)) return Infinity;
  if (t === "-∞") return -Infinity;
  return Number(t);
};
const grille = (a, b, n = 2000) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
/** La dérivée annoncée fp coïncide-t-elle avec la dérivée numérique de f aux points xs ? */
const memeDerivee = (nom, f, fp, xs) => {
  const faute = xs.find((x) => Math.abs(derivee(f, x) - fp(x)) > 1e-5 * Math.max(1, Math.abs(fp(x))));
  vrai(`${nom} : dérivée annoncée = dérivée numérique (${xs.length} points)`, faute === undefined, faute === undefined ? "" : `en ${faute} : ${derivee(f, faute)} ≠ ${fp(faute)}`);
};
/** Abscisse du maximum (ou du minimum) de f sur [a ; b], par balayage fin. */
const argmax = (f, a, b) => grille(a, b, 20000).reduce((m, x) => (f(x) > f(m) ? x : m), a);
const argmin = (f, a, b) => argmax((x) => -f(x), a, b);
/** Une ligne brisée relue suit-elle sa formule (arrondi 0,001 du fichier) ? */
const suit = (nom, pts, f) => vrai(`${nom} (${pts.length} points)`, pts.length > 0 && pts.every(([x, y]) => Math.abs(y - f(x)) < 6e-4), JSON.stringify(pts.find(([x, y]) => Math.abs(y - f(x)) >= 6e-4)));
/** Une droite `q: [0, m, p]` relue est-elle la tangente à f en a (à la précision écrite) ? */
const tangente = (nom, q, f, a, eps = 2e-3) => vrai(`${nom} : y = ${q[1]}x + ${q[2]} est la tangente en ${a}`, q[0] === 0 && Math.abs(q[1] - derivee(f, a)) < eps && Math.abs(q[1] * a + q[2] - f(a)) < eps, `pente ${derivee(f, a)}, f(a) = ${f(a)}`);
/** Le tableau de variations maison (`tabVar`) : format, flèches d'accord avec les signes, valeurs recalculées. */
const tabVar = (k, f, xs) => {
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
  if (f) {
    const abs = xs ?? bornes.map(lu);
    abs.forEach((x, i) => {
      if (Number.isFinite(lu(valeurs[i]))) arrondi(`${k}. tabVar : ${F_nom(k)}(${x})`, lu(valeurs[i]), f(x));
    });
    // Le signe de f′ au milieu de chaque intervalle, par la dérivée numérique.
    signes.forEach((sg, i) => {
      const m = (abs[i] + abs[i + 1]) / 2;
      if (Number.isFinite(m)) vrai(`${k}. tabVar : signe « ${sg} » de f′ vers ${m.toFixed(2)}`, sg === "+" ? derivee(f, m) > 0 : derivee(f, m) < 0);
    });
  }
};
const F_nom = (k) => dessin("tabVar", k)[3] ?? "f";

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const xs = [0.3, 0.7, 1, 2.5, 4];
  memeDerivee("1. a) 1/x⁴", (x) => 1 / x ** 4, (x) => -4 / x ** 5, xs);
  memeDerivee("1. b) 2√x − 5/x", (x) => 2 * Math.sqrt(x) - 5 / x, (x) => 1 / Math.sqrt(x) + 5 / x ** 2, xs);
  memeDerivee("1. c) 3 sin x + cos x", (x) => 3 * Math.sin(x) + Math.cos(x), (x) => 3 * Math.cos(x) - Math.sin(x), [-2, 0, 1, 3]);
  const [s, t] = courbes(1, "figure");
  suit("1. courbe du sinus", s.pts, Math.sin);
  tangente("1. d)", t.q, Math.sin, 0);
  dit(1, "$f'(x) = -4x^{-5} = -\\dfrac{4}{x^5}$");
  dit(1, "$h'(x) = 3\\cos x - \\sin x$");
}
{
  const xs = [-1.5, -0.4, 0.3, 1.2];
  memeDerivee("2. a) e^(3x − 1)", (x) => E(3 * x - 1), (x) => 3 * E(3 * x - 1), xs);
  memeDerivee("2. b) e^(−x²)", (x) => E(-x * x), (x) => -2 * x * E(-x * x), xs);
  memeDerivee("2. c) e^(1/x)", (x) => E(1 / x), (x) => (-1 / x ** 2) * E(1 / x), [-2, -0.7, 0.8, 3]);
  suit("2. la cloche", courbes(2)[0].pts, (x) => E(-x * x));
  tangente("2. tangente horizontale", courbes(2)[1].q, (x) => E(-x * x), 0);
}
{
  const xs = [-1, 0.2, 0.8, 1.5];
  memeDerivee("3. a) (x³ + 2x)⁴", (x) => (x ** 3 + 2 * x) ** 4, (x) => 4 * (3 * x * x + 2) * (x ** 3 + 2 * x) ** 3, xs);
  memeDerivee("3. b) 1/(2x + 1)³", (x) => 1 / (2 * x + 1) ** 3, (x) => -6 / (2 * x + 1) ** 4, [-0.3, 0, 0.8, 2]);
  memeDerivee("3. c) (e^x + 1)²", (x) => (E(x) + 1) ** 2, (x) => 2 * E(x) * (E(x) + 1), xs);
  memeDerivee("3. chaîne : g(u) = 1/u³ a pour dérivée −3/u⁴", (u) => 1 / u ** 3, (u) => -3 / u ** 4, [0.5, 1, 2]);
  const [cases, der] = dessin("chaine", 3);
  vrai("3. chaîne : x → u = 2x + 1 → 1/u³, u′ = 2, g′(u) = −3/u⁴", JSON.stringify(cases) === '["x","u = 2x + 1","g(u) = 1/u³"]' && JSON.stringify(der) === '["u′ = 2","g′(u) = −3/u⁴"]');
  vrai("3. chaîne : texte nu, vrai signe moins", [...cases, ...der].every((s) => !s.includes("$") && !s.includes("-")));
}
{
  const f = (x) => Math.sqrt(4 - x * x);
  memeDerivee("4. √(4 − x²)", f, (x) => -x / Math.sqrt(4 - x * x), [-1.5, -0.5, 0, 1, 1.7]);
  arrondi("4. f′(1) ≈ −0,58", -0.58, derivee(f, 1));
  const [c, t, r] = courbes(4);
  suit("4. demi-cercle", c.pts, (x) => Math.sqrt(Math.max(0, 4 - x * x)));
  tangente("4. tangente en A", t.q, f, 1);
  vrai("4. rayon gris de O à A(1 ; √3)", JSON.stringify(r.pts[0]) === "[0,0]" && r.pts[1][0] === 1 && Math.abs(r.pts[1][1] - Math.sqrt(3)) < 1e-3);
  verif("4. produit scalaire tangente · OA = 0", 1 * 1 + derivee(f, 1) * Math.sqrt(3), 0, 1e-6);
  dit(4, "$f'(x) = \\dfrac{-2x}{2\\sqrt{4 - x^2}} = -\\dfrac{x}{\\sqrt{4 - x^2}}$");
}
{
  const f = (x) => (2 * x - 1) * E(x), g = (x) => E(x) / (x * x + 1);
  memeDerivee("5. a) (2x − 1)e^x", f, (x) => (2 * x + 1) * E(x), [-2, -0.5, 0.4, 1.3]);
  memeDerivee("5. b) e^x/(x² + 1)", g, (x) => (E(x) * (x - 1) ** 2) / (x * x + 1) ** 2, [-2, 0, 1, 2.5]);
  vrai("5. g′ ≥ 0 sur [−5 ; 5], nulle seulement vers 1", grille(-5, 5).every((x) => derivee(g, x) >= -1e-9) && grille(-5, 5).filter((x) => Math.abs(derivee(g, x)) < 1e-6).every((x) => Math.abs(x - 1) < 0.01));
  suit("5. courbe de g", courbes(5)[0].pts, g);
  tangente("5. palier en 1", courbes(5)[1].q, g, 1);
  arrondi("5. point (1 ; e/2)", termes(5)[0].y, E(1) / 2);
}
{
  const f = (x) => E(2 * x) - 3 * x;
  tangente("6.", courbes(6)[1].q, f, 0, 1e-9);
  suit("6. courbe", courbes(6)[0].pts, f);
  dit(6, "soit $y = -x + 1$");
}
{
  const f = (x) => (x * x - 3) * E(x);
  memeDerivee("7. (x² − 3)e^x", f, (x) => (x + 3) * (x - 1) * E(x), [-3.5, -2, 0, 1.5]);
  tabVar(7, f);
  vrai("7. max local en −3, min en 1 (balayage)", Math.abs(argmax(f, -4, 0) - -3) < 1e-3 && Math.abs(argmin(f, -4, 2) - 1) < 1e-3);
}
{
  const f = (x) => 4 * x * E(-x);
  const m = argmax(f, 0, 10);
  verif("8. maximum en x = 1", m, 1, 1e-3);
  verif("8. maximum 4/e", f(m), 4 / Math.E, 1e-6);
  arrondi("8. point rouge (1 ; 1,47)", termes(8)[0].y, 4 / Math.E);
  suit("8. courbe", courbes(8)[0].pts, f);
  dit(8, "$f(1) = 4\\mathrm{e}^{-1} = \\dfrac{4}{\\mathrm{e}} \\approx 1{,}47$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const x = (t) => 3 * Math.cos(2 * t + Math.PI / 4), v = (t) => -6 * Math.sin(2 * t + Math.PI / 4);
  memeDerivee("9. vitesse", x, v, [0, 0.5, 1.3, 2.2]);
  verif("9. v(0) = −3√2", v(0), -3 * Math.SQRT2);
  arrondi("9. v(0) ≈ −4,24", -4.24, v(0));
  const tMax = argmax((t) => Math.abs(derivee(x, t)), 0, Math.PI);
  arrondi("9. vitesse max 6", 6, Math.abs(derivee(x, tMax)));
  arrondi("9. à vitesse max, x = 0", 0, x(tMax));
  const t1 = dichotomie(v, 0.5, 1.5);
  verif("9. premier arrêt en 3π/8", t1, (3 * Math.PI) / 8, 1e-9);
  vrai("9. aucun arrêt avant", grille(0, t1 - 0.01).every((t) => v(t) < 0));
  verif("9. x(3π/8) = −3", x(t1), -3, 1e-9);
  arrondi("9. point rouge (1,18 ; −3)", termes(9)[0].x, t1);
  suit("9. courbe", courbes(9)[0].pts, x);
  dit(9, "soit $t = \\dfrac{3\\pi}{8} \\approx 1{,}18$ s");
}
{
  const P = (t) => 10 / (1 + 9 * E(-0.5 * t));
  memeDerivee("10. P′", P, (t) => (45 * E(-0.5 * t)) / (1 + 9 * E(-0.5 * t)) ** 2, [0, 2, 5, 9]);
  verif("10. P(0) = 1", P(0), 1);
  verif("10. P(10⁴) → 10", P(1e4), 10, 1e-12);
  tangente("10.", courbes(10)[1].q, P, 0, 1e-6);
  suit("10. courbe", courbes(10)[0].pts, P);
  vrai("10. horizontale 10", dessin("repere", 10)[3] === 10);
  dit(10, "la tangente a pour équation $y = 0{,}45t + 1$");
}
{
  const f = (x) => E(x) - x - 1;
  verif("11. minimum en 0 (balayage)", argmin(f, -5, 5), 0, 1e-3);
  vrai("11. e^x ≥ x + 1 sur [−10 ; 10]", grille(-10, 10).every((x) => f(x) >= -1e-15));
  vrai("11. (1 + 1/n)^n ≤ e pour n ≤ 1000", Array.from({ length: 1000 }, (_, i) => (1 + 1 / (i + 1)) ** (i + 1)).every((u) => u <= Math.E));
  arrondi("11. 1,1^10 ≈ 2,594", 2.594, 1.1 ** 10, 0.001);
  tangente("11.", courbes(11)[1].q, E, 0, 1e-9);
  suit("11. exponentielle", courbes(11)[0].pts, E);
  dit(11, "$1{,}1^{10} \\approx 2{,}594$");
}
{
  const d = (x) => Math.hypot(x - 3, x * x);
  memeDerivee("12. d′ = (2x³ + x − 3)/√u", d, (x) => (2 * x ** 3 + x - 3) / d(x), [-1, 0, 0.5, 1.5, 2.5]);
  vrai("12. (x − 1)(2x² + 2x + 3) = 2x³ + x − 3", grille(-3, 3, 60).every((x) => Math.abs((x - 1) * (2 * x * x + 2 * x + 3) - (2 * x ** 3 + x - 3)) < 1e-9));
  verif("12. point le plus proche en x = 1", argmin(d, -3, 4), 1, 1e-3);
  verif("12. distance √5", d(1), Math.sqrt(5));
  arrondi("12. √5 ≈ 2,24", 2.24, Math.sqrt(5));
  const [para, tan, seg] = courbes(12);
  vrai("12. parabole y = x²", JSON.stringify(para.q) === "[1,0,0]");
  tangente("12. tangente en P", tan.q, (x) => x * x, 1, 1e-9);
  vrai("12. segment A(3 ; 0) → P(1 ; 1)", JSON.stringify(seg.pts) === "[[3,0],[1,1]]");
  verif("12. AP · t = 0", (1 - 3) * 1 + (1 - 0) * 2, 0);
  vrai("12. points A et P", JSON.stringify(termes(12).map((p) => [p.x, p.y])) === "[[3,0],[1,1]]");
  dit(12, "$d(1) = \\sqrt{4 + 1} = \\sqrt{5} \\approx 2{,}24$ km");
}
{
  const u = (t) => 12 * (1 - E(-t / 2));
  memeDerivee("13. u′ = 6e^(−t/2)", u, (t) => 6 * E(-t / 2), [0, 1, 3, 7]);
  tangente("13. tangente à l'origine", courbes(13)[1].q, u, 0, 1e-6);
  verif("13. 6t = 12 en t = 2", 12 / 6, 2);
  arrondi("13. u(2) ≈ 7,59", 7.59, u(2));
  arrondi("13. 63 %", 0.632, u(2) / 12, 0.001);
  vrai("13. point rouge (2 ; 12) et horizontale 12", termes(13)[0].x === 2 && termes(13)[0].y === 12 && dessin("repere", 13)[3] === 12);
  suit("13. courbe", courbes(13)[0].pts, u);
  dit(13, "$6t = 12$ donne $t = 2$ ms");
}
{
  const fp = (x) => x * x - x - 2, f = (x) => x ** 3 / 3 - (x * x) / 2 - 2 * x + 1;
  suit("14. courbe de f′", courbes(14, "figure")[0].pts, fp);
  vrai("14. points rouges : zéros de f′", termes(14, "figure").every((p) => p.y === 0 && fp(p.x) === 0));
  memeDerivee("14. f a bien f′ pour dérivée", f, fp, [-1.5, 0, 1, 2.5]);
  verif("14. f(0) = 1", f(0), 1);
  verif("14. f′(0) = −2", fp(0), -2);
  tabVar(14, f);
  vrai("14. max local en −1, min local en 2 (balayage)", Math.abs(argmax(f, -2, 0.5) - -1) < 1e-3 && Math.abs(argmin(f, 0, 3) - 2) < 1e-3);
  dit(14, "soit $y = -2x + 1$");
}
{
  // Tangente en a : passe par O ssi e^a(1 − a) = 0 ; on balaie a.
  const passeParO = (a) => E(a) * (0 - a) + E(a);
  const zeros = grille(-10, 10, 20000)
    .filter((a, i, g) => i > 0 && passeParO(g[i - 1]) * passeParO(a) <= 0)
    .filter((a, i, z) => i === 0 || a - z[i - 1] > 0.01);
  vrai(`15. une seule tangente par O, en a = 1 (${zeros.length})`, zeros.length === 1 && Math.abs(zeros[0] - 1) < 1e-3);
  tangente("15. tangente y = ex", courbes(15)[1].q, E, 1, 1e-3);
  const h = (x) => E(x) - Math.E * x;
  verif("15. min de h en 1", argmin(h, -5, 5), 1, 1e-3);
  verif("15. h(1) = 0", h(1), 0, 1e-12);
  arrondi("15. point (1 ; e)", termes(15)[0].y, Math.E);
  dit(15, "soit $y = \\mathrm{e}x$");
}
{
  const f = (x) => E(-x * x);
  const lignes = dessin("programme", 16, "figure")[0];
  const sortie = executerPython(lignes);
  const [, rangees] = dessin("trace", 16);
  if (sortie === null) console.log("  (Python absent : programme non exécuté)");
  else vrai(`16. Python affiche ${sortie.split(/\r?\n/).join(" ; ")}`, sortie.split(/\r?\n/).join(" ") === rangees.map((r) => String(lu(r[1]))).join(" "));
  rangees.forEach((r) => arrondi(`16. taux(1, ${r[0]})`, lu(r[1]), (f(1 + lu(r[0])) - f(1)) / lu(r[0]), 0.0001));
  arrondi("16. f′(1) = −2/e ≈ −0,7358", -0.7358, derivee(f, 1), 0.0001);
  verif("16. f′(1) = −2/e", derivee(f, 1), -2 / Math.E, 1e-8);
  arrondi("16. écart restant ≈ 0,0004", 0.0004, Math.abs(lu(rangees[2][1]) - -2 / Math.E), 0.0001);
  dit(16, "$-0{,}6968$, puis $-0{,}7321$, puis $-0{,}7354$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const C = (t) => 5 * t * t * E(-t);
  memeDerivee("17. C′", C, (t) => 5 * t * (2 - t) * E(-t), [0.5, 1.5, 3, 6]);
  verif("17. pic en t = 2", argmax(C, 0, 8), 2, 1e-3);
  arrondi("17. C(2) ≈ 2,71", 2.71, C(2));
  arrondi("17. C(8) ≈ 0,11", 0.11, C(8));
  arrondi("17. C′(4) ≈ −0,73", -0.73, derivee(C, 4));
  const [t1, t2] = [dichotomie((t) => C(t) - 2, 0, 2), dichotomie((t) => C(t) - 2, 2, 8)];
  vrai(`17. t1 = ${t1.toFixed(4)} dans ]1,09 ; 1,10[`, t1 > 1.09 && t1 < 1.1);
  vrai(`17. t2 = ${t2.toFixed(4)} dans ]3,31 ; 3,32[`, t2 > 3.31 && t2 < 3.32);
  vrai("17. C > 2 exactement entre t1 et t2", grille(0, 8, 8000).every((t) => (C(t) > 2) === (t > t1 && t < t2)));
  arrondi("17. C(1,09) ≈ 1,997", 1.997, C(1.09), 0.001);
  arrondi("17. C(1,10) ≈ 2,014", 2.014, C(1.1), 0.001);
  arrondi("17. C(3,31) ≈ 2,0004", 2.0004, C(3.31), 0.0001);
  arrondi("17. C(3,32) ≈ 1,992", 1.992, C(3.32), 0.001);
  vrai(`17. durée ${(t2 - t1).toFixed(3)} h ≈ 2 h 13 min`, Math.round((t2 - t1) * 60) === 133);
  suit("17. courbe", courbes(17)[0].pts, C);
  vrai("17. horizontale 2, sommet (2 ; 2,71)", dessin("repere", 17)[3] === 2 && termes(17)[0].x === 2 && Math.abs(termes(17)[0].y - C(2)) < 0.005);
  tabVar(17, C);
  dit(17, "$1{,}09 < t_1 < 1{,}10$");
  dit(17, "$3{,}31 < t_2 < 3{,}32$");
  dit(17, "environ $2$ h $13$ min");
}
{
  const C = (x) => E(0.5 * x) + 2, M = (x) => C(x) / x, g = (x) => (0.5 * x - 1) * E(0.5 * x) - 2;
  memeDerivee("18. M′ = g/x²", M, (x) => g(x) / (x * x), [0.5, 1.5, 3, 5.5]);
  memeDerivee("18. g′ = 0,25x e^(0,5x)", g, (x) => 0.25 * x * E(0.5 * x), [0.5, 2, 4, 5.8]);
  verif("18. g(0) = −3", g(0), -3);
  arrondi("18. g(6) ≈ 38,17", 38.17, g(6));
  const a = dichotomie(g, 0, 6);
  vrai(`18. α = ${a.toFixed(4)} dans ]2,92 ; 2,93[`, a > 2.92 && a < 2.93);
  arrondi("18. g(2,92) ≈ −0,019", -0.019, g(2.92), 0.001);
  arrondi("18. g(2,93) ≈ 0,012", 0.012, g(2.93), 0.001);
  verif("18. le coût moyen est minimal en α (balayage)", argmin(M, 0.1, 6), a, 1e-3);
  arrondi("18. M(α) ≈ 2,16", 2.16, M(a));
  arrondi("18. 21,60 € par objet", 21.6, (M(a) * 1000) / 100, 0.1);
  verif("18. C′(α) = M(α)", derivee(C, a), M(a), 1e-6);
  vrai("18. environ 293 objets", Math.round(a * 100) === 293);
  tabVar(18);
  const [, , vals] = dessin("tabVar", 18);
  arrondi("18. tabVar : M(α)", lu(vals[1]), M(a));
  arrondi("18. tabVar : M(6)", lu(vals[2]), M(6));
  vrai("18. tabVar : M → +∞ en 0", M(1e-9) > 1e8);
  suit("18. courbe de M", courbes(18)[0].pts, M);
  arrondi("18. point rouge : abscisse α", termes(18)[0].x, a);
  arrondi("18. point rouge : M(α)", termes(18)[0].y, M(a));
  dit(18, "$2{,}92 < \\alpha < 2{,}93$");
  dit(18, "environ $293$ objets par jour");
}
{
  // L'éclairement depuis la géométrie : L(0 ; h), M(1 ; 0), cos θ = h/d.
  const Egeo = (h) => { const d = Math.hypot(1, h); return (10 * (h / d)) / (d * d); };
  const Eh = (h) => (10 * h) / ((h * h + 1) * Math.sqrt(h * h + 1));
  vrai("19. formule de E = 10 cos θ / d²", grille(0.1, 5, 50).every((h) => Math.abs(Egeo(h) - Eh(h)) < 1e-12));
  const w = (h) => (h * h + 1) * Math.sqrt(h * h + 1);
  memeDerivee("19. w′ = 3h√(h² + 1)", w, (h) => 3 * h * Math.sqrt(h * h + 1), [0.2, 0.7, 1.5, 3]);
  memeDerivee("19. E′", Eh, (h) => (10 * (1 - 2 * h * h)) / ((h * h + 1) ** 2 * Math.sqrt(h * h + 1)), [0.2, 0.7, 1.5, 3]);
  const hm = argmax(Eh, 0, 5);
  verif("19. maximum en √2/2", hm, Math.SQRT1_2, 1e-3);
  verif("19. E max = 20√3/9", Eh(Math.SQRT1_2), (20 * Math.sqrt(3)) / 9, 1e-12);
  arrondi("19. E max ≈ 3,85", 3.85, Eh(Math.SQRT1_2));
  arrondi("19. E(1) ≈ 3,54", 3.54, Eh(1));
  arrondi("19. perte ≈ 8 %", 0.08, 1 - Eh(1) / Eh(Math.SQRT1_2), 0.01);
  vrai("19. lampe dessinée à 1,2 m", dessin("lampe", 19, "figure")[0] === 1.2);
  suit("19. courbe de E", courbes(19)[0].pts, Eh);
  arrondi("19. point rouge (0,71 ; 3,85)", termes(19)[0].x, Math.SQRT1_2);
  dit(19, "$E_{\\max} = \\dfrac{20}{3\\sqrt{3}} = \\dfrac{20\\sqrt{3}}{9} \\approx 3{,}85$");
  dit(19, "environ $8$ % de l'éclairement");
}
{
  const f = (k) => (t) => 10 * t * E(-k * t);
  const [c1, c2, c3, delta] = courbes(20);
  [[c1, 0.5], [c2, 1], [c3, 2]].forEach(([c, k], i) => {
    memeDerivee(`20. f′ pour k = ${k}`, f(k), (t) => 10 * (1 - k * t) * E(-k * t), [0.3, 1.2, 3]);
    suit(`20. courbe k = ${k}`, c.pts, f(k));
    const s = argmax(f(k), 0, 9);
    verif(`20. k = ${k} : sommet en 1/k`, s, 1 / k, 1e-3);
    verif(`20. k = ${k} : hauteur 10/(ke)`, f(k)(s), 10 / (k * Math.E), 1e-6);
    arrondi(`20. k = ${k} : sommet sur Δ`, f(k)(s), delta.q[1] * s, 0.01);
    arrondi(`20. k = ${k} : point rouge`, termes(20)[i].y, 10 / (k * Math.E));
    verif(`20. k = ${k} : f′(0) = 10`, derivee(f(k), 0), 10, 1e-6);
  });
  arrondi("20. Δ : pente 10/e", delta.q[1], 10 / Math.E, 0.001);
  dit(20, "$\\dfrac{20}{\\mathrm{e}} \\approx 7{,}36$ milliers de vues");
  dit(20, "$\\dfrac{10}{\\mathrm{e}} \\approx 3{,}68$ milliers");
  dit(20, "$\\dfrac{5}{\\mathrm{e}} \\approx 1{,}84$ millier");
}

enonceDit(16, "$f(x) = \\mathrm{e}^{-x^2}$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce qu'on voit (⭐ dans les 20)", F.feuille.corrections.every((t) => /⭐/.test(t)));
F.fin();
