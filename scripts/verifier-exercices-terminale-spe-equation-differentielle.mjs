// Recalcul indépendant de la feuille « Équations différentielles » de terminale
// spé (29/09/2026) : lib/fiches-exercices/maths-terminale-equation-differentielle.tsx.
//
// ⭐ Un AUTRE chemin que le corrigé : chaque solution annoncée est DÉRIVÉE
// numériquement et remise dans l'équation, en 40 points ; la condition
// initiale est vérifiée ; les fausses solutions sont reconnues fausses ; les
// instants (demi-vie, seuils, décès) sont retrouvés par dichotomie sur la
// solution, et les solutions du ★★★ sont aussi REFAITES par la méthode d'Euler
// (pas 10⁻⁴), sans formule. Les dessins sont relus : chaque courbe sur sa
// solution, chaque point marqué, chaque trait du champ de pentes à la pente
// que l'équation impose.
// Usage : node scripts/verifier-exercices-terminale-spe-equation-differentielle.mjs

import { feuilleTerminale, derivee, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-equation-differentielle.tsx";

/** La même aide que la feuille (réécrite ici, en JS) : le champ de pentes. */
const champ = (pente, xs, ys) =>
  xs.flatMap((x) =>
    ys.map((y) => {
      const s = pente(x, y);
      const d = 0.3 / Math.hypot(1, s);
      const r = (v) => Math.round(v * 1000) / 1000;
      return { pts: [[r(x - d), r(y - s * d)], [r(x + d), r(y + s * d)]], couleur: "#94a3b8" };
    }),
  );

const F = feuilleTerminale({ fichier: FICHIER, notion: "equation_differentielle", contexte: { champ } });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, courbes, dessin, tableauDe } = F;
const ORANGE = "#ea580c", GRIS = "#94a3b8";

/** y est-elle solution de y' = eq(x, y) sur [a ; b] ? (dérivée numérique en 40 points) */
const solution = (nom, y, eq, a, b) => {
  const xs = Array.from({ length: 40 }, (_, i) => a + ((b - a) * (i + 0.5)) / 40);
  const faute = xs.find((x) => Math.abs(derivee(y, x) - eq(x, y(x))) > 1e-5 * Math.max(1, Math.abs(y(x))));
  vrai(`${nom} : solution vérifiée en dérivant`, faute === undefined, faute === undefined ? "" : `en x = ${faute} : y′ = ${derivee(y, faute)}, équation ${eq(faute, y(faute))}`);
};
const pasSolution = (nom, y, eq) => {
  const faute = [-1, 0.3, 1.7].some((x) => Math.abs(derivee(y, x) - eq(x, y(x))) > 1e-3);
  vrai(`${nom} : n'est PAS solution`, faute);
};
/** Méthode d'Euler, de x0 à x1, pas h : la solution sans formule. */
const euler = (eq, x0, y0, x1, h = 1e-4) => {
  let [x, y] = [x0, y0];
  const n = Math.round(Math.abs(x1 - x0) / h), s = Math.sign(x1 - x0) * h;
  for (let i = 0; i < n; i++) {
    // Heun (Euler amélioré) : erreur en h², largement assez fine.
    const k1 = eq(x, y), k2 = eq(x + s, y + s * k1);
    y += (s * (k1 + k2)) / 2;
    x += s;
  }
  return y;
};
/** La courbe n° i de l'exercice k suit-elle f ? */
const courbeSur = (k, i, f, role) => {
  const pts = courbes(k, role)[i].pts;
  const fautes = pts.filter(([x, y]) => Math.abs(y - f(x)) > 6e-4);
  vrai(`${k}. courbe ${i} sur sa formule (${pts.length} points)`, pts.length > 5 && fautes.length === 0, JSON.stringify(fautes[0]));
};
/** Les traits gris du champ : centrés sur la grille, de pente eq(x, y). */
const champSur = (k, eq, role) => {
  const traits = courbes(k, role).filter((c) => c.pts && c.pts.length === 2 && c.couleur === GRIS);
  const fautes = traits.filter(({ pts: [[x1, y1], [x2, y2]] }) => {
    const [cx, cy] = [(x1 + x2) / 2, (y1 + y2) / 2];
    return Math.abs((y2 - y1) / (x2 - x1) - eq(cx, cy)) > 0.02 * Math.max(1, Math.abs(eq(cx, cy)));
  });
  vrai(`${k}. champ de pentes : ${traits.length} traits à la pente de l'équation`, traits.length >= 25 && fautes.length === 0, JSON.stringify(fautes[0]));
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const eq = (x, y) => 0.5 * y;
  solution("1. f1", (x) => Math.exp(0.5 * x), eq, -3, 3);
  solution("1. f2", (x) => -3 * Math.exp(0.5 * x), eq, -3, 3);
  pasSolution("1. f3", (x) => Math.exp(2 * x), eq);
  pasSolution("1. f4", (x) => 0.5 * Math.exp(x), eq);
  solution("1. f5", () => 0, eq, -3, 3);
  champSur(1, eq, "figure");
  const cb = courbes(1, "figure");
  courbeSur(1, cb.length - 2, (x) => Math.exp(0.5 * x), "figure");
  courbeSur(1, cb.length - 1, (x) => Math.exp(2 * x), "figure");
  vrai("1. f3 en orange", cb[cb.length - 1].couleur === ORANGE);
  dit(1, "$f_2'(x) = -1{,}5\\mathrm{e}^{0{,}5x} = 0{,}5f_2(x)$ : solution");
  dit(1, "la fonction nulle est solution");
}
{
  const cas = [[(x, y) => -2 * y, -2], [(x, y) => y / 3, 1 / 3], [(x, y) => -4 * y, -4], [(x, y) => 2.5 * y, 2.5]];
  cas.forEach(([eq, a], i) => solution(`2${"abcd"[i]}. C e^(${a}x)`, (x) => 1.7 * Math.exp(a * x), eq, -1, 1));
  const t = tableauDe(2);
  vrai("2. tableau des a", t.nombres.every((v, i) => Math.abs(v - cas[i][1]) < 1e-12));
  dit(2, "$y(x) = C\\mathrm{e}^{\\frac{x}{3}}$");
  dit(2, "$y(x) = C\\mathrm{e}^{\\frac{5x}{2}}$");
  dit(2, "$y(x) = C\\mathrm{e}^{-4x}$");
}
{
  const ya = (x) => 4 * Math.exp(-0.5 * x);
  solution("3a", ya, (x, y) => -0.5 * y, -2, 5);
  verif("3a. y(0) = 4", ya(0), 4);
  const yb = (x) => 3 * Math.exp(2 * x - 4);
  solution("3b", yb, (x, y) => 2 * y, 0, 3);
  verif("3b. y(2) = 3", yb(2), 3);
  [1, 2, -2, 4].forEach((C, i) => courbeSur(3, i, (x) => C * Math.exp(-0.5 * x)));
  vrai("3. l'orange est C = 4, par (0 ; 4)", courbes(3)[3].couleur === ORANGE && termes(3)[0].x === 0 && termes(3)[0].y === 4);
  dit(3, "$y(x) = 3\\mathrm{e}^{-4}\\mathrm{e}^{2x} = 3\\mathrm{e}^{2x - 4}$");
  dit(3, "$y(x) = 4\\mathrm{e}^{-0{,}5x}$");
}
{
  const cas = [["a", (x, y) => 2 * y - 6, 2, 3], ["b", (x, y) => -3 * y + 12, -3, 4], ["c", (x, y) => 5 - y, -1, 5], ["d", (x, y) => (y + 1) / 2, 0.5, -1]];
  for (const [l, eq, a, cst] of cas) {
    solution(`4${l}. C e^(${a}x) + ${cst}`, (x) => -2.3 * Math.exp(a * x) + cst, eq, -1, 1);
    verif(`4${l}. constante ${cst} solution`, eq(0, cst), 0);
  }
  [3, -4, 2].forEach((C, i) => courbeSur(4, i, (x) => C * Math.exp(-3 * x) + 4));
  vrai("4. droite y = 4", dessin("repere", 4)[3] === 4);
  dit(4, "$y(x) = C\\mathrm{e}^{2x} + 3$");
  dit(4, "$y(x) = C\\mathrm{e}^{-3x} + 4$");
  dit(4, "$y(x) = C\\mathrm{e}^{-x} + 5$");
  dit(4, "$y(x) = C\\mathrm{e}^{0{,}5x} - 1$");
}
{
  const eq = (x, y) => -y + 2 * x + 3;
  solution("5a. g = 2x + 1", (x) => 2 * x + 1, eq, -2, 4);
  for (const C of [3, -2, 17]) solution(`5b. C = ${C}`, (x) => C * Math.exp(-x) + 2 * x + 1, eq, -2, 4);
  vrai("5. droite orange y = 2x + 1", JSON.stringify(courbes(5)[0]) === JSON.stringify({ q: [0, 2, 1], couleur: ORANGE }));
  courbeSur(5, 1, (x) => 3 * Math.exp(-x) + 2 * x + 1);
  courbeSur(5, 2, (x) => -2 * Math.exp(-x) + 2 * x + 1);
  dit(5, "$y(x) = C\\mathrm{e}^{-x} + 2x + 1$");
}
{
  const f = (x) => 2 * Math.exp(0.5 * x);
  courbeSur(6, 0, f, "figure");
  verif("6. f(0) = 2", f(0), 2);
  verif("6. f′(0) = 1 (dérivée numérique)", derivee(f, 0), 1, 1e-8);
  const [, b, c] = courbes(6, "figure")[1].q;
  vrai("6. la tangente orange est y = f′(0)x + f(0)", Math.abs(b - derivee(f, 0)) < 1e-8 && c === f(0));
  verif("6. elle coupe l'axe en −2 = −1/a", -c / b, -1 / 0.5);
  solution("6. f", f, (x, y) => 0.5 * y, -3, 3);
  dit(6, "Donc $f(x) = 2\\mathrm{e}^{0{,}5x}$");
  dit(6, "soit $1 = 2a$ : $a = 0{,}5$");
}
{
  const y = (x) => 6 - 5 * Math.exp(-0.5 * x);
  solution("7", y, (x, v) => -0.5 * v + 3, 0, 8);
  verif("7. y(0) = 1", y(0), 1);
  verif("7. y(60) ≈ 6", y(60), 6, 1e-9);
  courbeSur(7, 0, y);
  pointsSur("7. point (0 ; 1)", termes(7), y);
  vrai("7. droite y = 6", dessin("repere", 7)[3] === 6);
  dit(7, "$y(x) = 6 - 5\\mathrm{e}^{-0{,}5x}$");
}
{
  const eq = (x, y) => y;
  champSur(8, eq);
  const cb = courbes(8);
  [1, 0.5, -1].forEach((C, i) => courbeSur(8, cb.length - 3 + i, (x) => C * Math.exp(x)));
  // z = y e^(−ax) est constante pour une solution : on le mesure sur y = 2,5 eˣ.
  const z = (x) => 2.5 * Math.exp(x) * Math.exp(-x);
  verif("8. z′ = 0 le long d'une solution", derivee(z, 0.8), 0, 1e-9);
  dit(8, "$z'(x) = (y'(x) - a\\,y(x))\\mathrm{e}^{-ax} = 0$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const l = 1.21e-4;
  const N = (t) => 1000 * Math.exp(-l * t);
  solution("9. N0 e^(−λt)", N, (t, y) => -l * y, 0, 20000);
  const T = dichotomie((t) => N(t) - 500, 0, 20000);
  arrondi("9b. demi-vie ≈ 5 730", 5730, T, 10);
  const age = dichotomie((t) => N(t) - 250, 0, 40000);
  arrondi("9c. âge ≈ 11 457", 11457, age, 1);
  arrondi("9c. à la centaine : 11 500", 11500, age, 100);
  verif("9c. deux demi-vies", age, 2 * T, 1e-9);
  courbeSur(9, 0, (x) => 10 * Math.exp(-l * 1000 * x));
  pointsSur("9. points (T ; 50 %) et (2T ; 25 %)", termes(9), (x) => 10 * Math.exp(-l * 1000 * x), 0.02);
  vrai("9. droites y = 5 et y = 2,5", JSON.stringify(dessin("repere", 9)[3]) === "[5,2.5]");
  dit(9, "\\approx 5\\,730$ ans");
  dit(9, "soit environ $11\\,500$ ans");
}
{
  const th = (t) => 20 + 60 * Math.exp(-0.1 * t);
  solution("10", th, (t, y) => -0.1 * (y - 20), 0, 60);
  verif("10. θ(0) = 80", th(0), 80);
  const t40 = dichotomie((t) => th(t) - 40, 0, 60);
  verif("10c. 10 ln 3", t40, 10 * Math.log(3), 1e-9);
  arrondi("10c. ≈ 11 min", 11, t40, 1);
  courbeSur(10, 0, (x) => (th(5 * x) - 0) / 10);
  pointsSur("10. point à 40 °C (graduations 5 min, 10 °C)", termes(10), (x) => th(5 * x) / 10);
  arrondi("10. abscisse du point = t/5", 2.2, t40 / 5, 0.01);
  vrai("10. droites y = 2 et y = 4", JSON.stringify(dessin("repere", 10)[3]) === "[2,4]");
  dit(10, "$\\theta(t) = 20 + 60\\mathrm{e}^{-0{,}1t}$");
  dit(10, "$t = 10\\ln 3 \\approx 11$ min");
}
{
  const u = (t) => 5 * (1 - Math.exp(-0.5 * t));
  solution("11", u, (t, y) => (5 - y) / 2, 0, 20);
  verif("11. u(0) = 0", u(0), 0);
  arrondi("11b. u(τ) ≈ 3,16", 3.16, u(2));
  arrondi("11b. ≈ 63 %", 63, (100 * u(2)) / 5, 1);
  const t99 = dichotomie((t) => u(t) - 4.95, 0, 30);
  arrondi("11c. ≈ 9,2 ms", 9.2, t99, 0.1);
  arrondi("11c. ≈ 4,6 τ", 4.6, t99 / 2, 0.1);
  courbeSur(11, 0, u);
  pointsSur("11. point en τ", termes(11), u);
  dit(11, "\\approx 3{,}16$ V");
  dit(11, "\\approx 9{,}2$ ms");
}
{
  const v = (t) => 50 * (1 - Math.exp(-0.2 * t));
  solution("12", v, (t, y) => 10 - 0.2 * y, 0, 40);
  verif("12. v(0) = 0", v(0), 0);
  verif("12b. 50 m/s = 180 km/h", 50 * 3.6, 180, 1e-12);
  const t90 = dichotomie((t) => v(t) - 45, 0, 60);
  arrondi("12c. ≈ 11,5 s", 11.5, t90, 0.1);
  courbeSur(12, 0, (t) => v(t) / 10);
  pointsSur("12. point à 90 %", termes(12), (t) => v(t) / 10);
  dit(12, "$v(t) = 50(1 - \\mathrm{e}^{-0{,}2t})$");
  dit(12, "\\approx 11{,}5$ s");
}
{
  const eq = (x, y) => 2 * y - 4 * x;
  solution("13a. g = 2x + 1", (x) => 2 * x + 1, eq, -3, 2);
  const y = (x) => -Math.exp(2 * x) + 2 * x + 1;
  solution("13c", y, eq, -3, 2);
  verif("13c. y(0) = 0", y(0), 0);
  pasSolution("13. g = 2x (mauvais p)", (x) => 2 * x, eq);
  courbeSur(13, 1, y);
  dit(13, "$y(x) = -\\mathrm{e}^{2x} + 2x + 1$");
  dit(13, "Donc $g(x) = 2x + 1$");
}
{
  const eq = (t, y) => -y + 10 * Math.exp(-t);
  const q = (t) => 10 * t * Math.exp(-t);
  solution("14", q, eq, 0, 7);
  solution("14b. C = 3", (t) => 3 * Math.exp(-t) + q(t), eq, 0, 7);
  verif("14. q(0) = 0", q(0), 0);
  const tm = dichotomie((t) => derivee(q, t), 0.1, 5);
  verif("14c. maximum en 1 jour", tm, 1, 1e-6);
  arrondi("14c. ≈ 3,68 kg", 3.68, q(1));
  courbeSur(14, 0, q);
  pointsSur("14. le pic", termes(14), q);
  dit(14, "$q(1) = 10\\mathrm{e}^{-1} \\approx 3{,}68$ kg");
}
{
  const K = (t) => 40000 * (Math.exp(0.03 * t) - 1);
  solution("15", K, (t, y) => 0.03 * y + 1200, 0, 30);
  verif("15. K(0) = 0", K(0), 0);
  arrondi("15b. K(10) ≈ 13 994", 13994, K(10), 1);
  arrondi("15b. intérêts ≈ 1 994", 1994, K(10) - 12000, 1);
  verif("15b. par Euler, sans formule", euler((t, y) => 0.03 * y + 1200, 0, 0, 10), K(10), 1e-6);
  courbeSur(15, 0, (t) => K(t) / 5000);
  vrai("15. droite grise des versements 1 200 t / 5 000", JSON.stringify(courbes(15)[1].q) === JSON.stringify([0, 1200 / 5000, 0]));
  pointsSur("15. point en 10 ans", termes(15), (t) => K(t) / 5000);
  dit(15, "\\approx 13\\,994$ euros");
  dit(15, "environ $1\\,994$ euros");
}
{
  const f = (x) => 3 - 2 * Math.exp(-0.5 * x);
  solution("16", f, (x, y) => -0.5 * y + 1.5, -2, 7);
  verif("16. f(0) = 1", f(0), 1);
  verif("16. f′(0) = 1", derivee(f, 0), 1, 1e-8);
  verif("16. −b/a = 3", -1.5 / -0.5, 3);
  courbeSur(16, 0, f, "figure");
  vrai("16. tangente y = x + 1 et droite y = 3", JSON.stringify(courbes(16, "figure")[1].q) === "[0,1,1]" && dessin("repere", 16, "figure")[3] === 3);
  dit(16, "Donc $a = -0{,}5$ et $b = 1{,}5$");
  dit(16, "Donc $f(x) = 3 - 2\\mathrm{e}^{-0{,}5x}$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const eq = (t, y) => 0.05 * y * (10 - y);
  const y = (t) => 10 / (1 + 9 * Math.exp(-0.5 * t));
  solution("17", y, eq, 0, 14);
  verif("17. y(0) = 1", y(0), 1);
  verif("17. par Euler, sans formule : y(6)", euler(eq, 0, 1, 6), y(6), 1e-7);
  solution("17b. z = 1/y", (t) => 1 / y(t), (t, z) => -0.5 * z + 0.05, 0, 14);
  const t5 = dichotomie((t) => y(t) - 5, 0, 14);
  verif("17e. 2 ln 9", t5, 2 * Math.log(9), 1e-9);
  arrondi("17e. ≈ 4,4 ans", 4.4, t5, 0.1);
  courbeSur(17, 0, y);
  pointsSur("17. point à 500 individus", termes(17), y, 0.02);
  dit(17, "$t = 2\\ln 9 \\approx 4{,}4$ ans");
}
{
  const q1 = (t) => 20 * (1 - Math.exp(-0.2 * t));
  solution("18a", q1, (t, y) => -0.2 * y + 4, 0, 10);
  const q10 = q1(10);
  arrondi("18c. q(10) ≈ 17,29", 17.29, q10);
  verif("18c. par Euler : q(10)", euler((t, y) => -0.2 * y + 4, 0, 0, 10), q10, 1e-7);
  const q2 = (t) => q10 * Math.exp(-0.2 * (t - 10));
  solution("18c. après l'arrêt", q2, (t, y) => -0.2 * y, 10, 20);
  verif("18c. continuité en 10", q2(10), q10);
  const t1 = dichotomie((t) => q1(t) - 15, 0, 10), t2 = dichotomie((t) => q2(t) - 15, 10, 20);
  arrondi("18b. ≈ 6,93 h", 6.93, t1);
  arrondi("18d. ≈ 10,71 h", 10.71, t2);
  arrondi("18d. durée ≈ 3,78 h", 3.78, t2 - t1);
  vrai("18d. 3 h 47 min", Math.round((t2 - t1) * 60) === 227);
  const g = (t) => (t <= 10 ? q1(t) : q2(t)) / 5;
  courbeSur(18, 0, g);
  pointsSur("18. entrée et sortie de la zone efficace", termes(18), g);
  vrai("18. droite y = 3 (15 mg)", dessin("repere", 18)[3] === 3);
  dit(18, "\\approx 6{,}93$ h");
  dit(18, "$3$ h $47$ min");
}
{
  const k = Math.log(1.25);
  const th = (t) => 20 + 10 * Math.exp(-k * t);
  solution("19", th, (t, y) => -k * (y - 20), -4, 6);
  verif("19. 30 °C à 8 h, 28 °C à 9 h", th(0) + th(1), 58, 1e-12);
  arrondi("19b. k ≈ 0,223", 0.223, k, 0.001);
  const td = dichotomie((t) => th(t) - 37, -10, 0);
  arrondi("19c. t ≈ −2,38", -2.38, td);
  const minutes = Math.round((8 + td) * 60);
  vrai(`19c. décès à ${Math.floor(minutes / 60)} h ${minutes % 60}`, minutes === 5 * 60 + 37);
  courbeSur(19, 0, (t) => (th(t) - 20) / 2);
  pointsSur("19. mesures et décès (écart / 2)", termes(19), (t) => (th(t) - 20) / 2);
  vrai("19. droite y = 8,5", dessin("repere", 19)[3] === 8.5);
  dit(19, "vers $5$ h $37$");
  dit(19, "\\approx -2{,}38$ h");
}
{
  const eq = (t, y) => -0.5 * (y - (10 + t));
  solution("20a. g = t + 8", (t) => t + 8, eq, 0, 10);
  const th = (t) => 12 * Math.exp(-0.5 * t) + t + 8;
  solution("20b", th, eq, 0, 10);
  verif("20. θ(0) = 20", th(0), 20);
  verif("20b. par Euler, sans formule : θ(5)", euler(eq, 0, 20, 5), th(5), 1e-7);
  const tm = dichotomie((t) => derivee(th, t), 0.5, 9);
  verif("20c. minimum en 2 ln 6", tm, 2 * Math.log(6), 1e-6);
  arrondi("20c. ≈ 13,6 °C", 13.6, th(tm), 0.1);
  vrai("20c. vers 9 h 35", Math.round((6 + tm) * 60) === 9 * 60 + 35);
  verif("20d. écart à t + 8 en t = 30", th(30) - 38, 0, 1e-5);
  courbeSur(20, 0, (t) => th(t) / 2);
  vrai("20. droites (t + 8)/2 orange et (10 + t)/2 grise", JSON.stringify(courbes(20)[1].q) === "[0,0.5,4]" && JSON.stringify(courbes(20)[2].q) === "[0,0.5,5]");
  pointsSur("20. minimum", termes(20), (t) => th(t) / 2);
  dit(20, "\\approx 13{,}6$ °C, vers $9$ h $35$");
}

enonceDit(10, "$\\theta' = -0{,}1(\\theta - 20)$");
enonceDit(17, "$y' = 0{,}05y(10 - y)$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("chaque corrigé dit ce que montre son dessin", F.feuille.corrections.every((t) => /Sur le dessin|Le tableau/.test(t)));
F.fin();
