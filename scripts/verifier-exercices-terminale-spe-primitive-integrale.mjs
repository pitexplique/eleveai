// Recalcul indépendant de la feuille « Primitives et intégrales » de terminale
// spé (29/09/2026) : lib/fiches-exercices/maths-terminale-primitive-integrale.tsx.
//
// ⭐ Un AUTRE chemin que le corrigé : chaque primitive annoncée est DÉRIVÉE
// numériquement et comparée à la fonction ; chaque intégrale est recalculée par
// Simpson (`integrale`), sans primitive ; les équations par dichotomie ; le
// programme Python est EXÉCUTÉ. Les dessins sont relus dans le source : courbes
// sur leur formule, aires hachurées (`bande`) entre les bonnes courbes et les
// bonnes bornes, points marqués.
// Usage : node scripts/verifier-exercices-terminale-spe-primitive-integrale.mjs

import { feuilleTerminale, integrale, derivee, dichotomie, executerPython } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-primitive-integrale.tsx";

/** La même aide que la feuille (réécrite ici, en JS) : le hachurage entre deux courbes. */
const bande = (haut, bas, a, b, pas = 0.1) => {
  const n = Math.max(1, Math.round((b - a) / pas));
  const r = (v) => Math.round(v * 1000) / 1000;
  const pts = [];
  for (let k = 0; k <= n; k++) {
    const x = r(a + ((b - a) * k) / n);
    const [y1, y2] = [r(bas(x)), r(haut(x))];
    if (k % 2 === 0) pts.push([x, y1], [x, y2]);
    else pts.push([x, y2], [x, y1]);
  }
  return pts;
};

const F = feuilleTerminale({ fichier: FICHIER, notion: "primitive_integrale", contexte: { bande } });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, courbes, dessin } = F;
const ORANGE = "#ea580c", VERT = "#16a34a", GRIS = "#94a3b8";
const E = Math.E;

/** F est-elle une primitive de f ? (dérivée numérique en 40 points de [a ; b]) */
const primitive = (nom, Fp, f, a, b) => {
  const xs = Array.from({ length: 40 }, (_, i) => a + ((b - a) * (i + 0.5)) / 40);
  const faute = xs.find((x) => Math.abs(derivee(Fp, x) - f(x)) > 1e-5 * Math.max(1, Math.abs(f(x))));
  vrai(`${nom} : primitive vérifiée en dérivant`, faute === undefined, faute === undefined ? "" : `en x = ${faute}`);
};
/** La courbe (ligne brisée) n° i de l'exercice k suit-elle f ? */
const courbeSur = (k, i, f, role) => {
  const pts = courbes(k, role)[i].pts;
  const fautes = pts.filter(([x, y]) => Math.abs(y - f(x)) > 6e-4);
  vrai(`${k}. courbe ${i} sur sa formule (${pts.length} points)`, pts.length > 5 && fautes.length === 0, JSON.stringify(fautes[0]));
};
/** L'aire hachurée de couleur donnée : entre `bas` et `haut`, de a à b, en segments verticaux. */
const hachure = (k, couleur, haut, bas, a, b, role) => {
  const cb = courbes(k, role).filter((c) => c.couleur === couleur && c.pts && c.pts.length > 8);
  vrai(`${k}. une seule aire hachurée ${couleur}`, cb.length === 1);
  const pts = cb[0]?.pts ?? [];
  const bornes = Math.abs(pts[0][0] - a) < 1e-3 && Math.abs(pts[pts.length - 1][0] - b) < 1e-3;
  const verticales = pts.every((p, i) => i % 2 === 1 || Math.abs(pts[i + 1][0] - p[0]) < 1e-9);
  const surLesCourbes = pts.every(([x, y]) => Math.abs(y - haut(x)) < 6e-4 || Math.abs(y - bas(x)) < 6e-4);
  const touteLaHauteur = pts.every((p, i) => i % 2 === 1 || Math.abs(Math.abs(pts[i + 1][1] - p[1]) - Math.abs(haut(p[0]) - bas(p[0]))) < 1.2e-3);
  vrai(`${k}. hachures de ${a} à ${b}, verticales, entre les deux courbes`, bornes && verticales && surLesCourbes && touteLaHauteur, JSON.stringify(pts.slice(0, 4)));
};
const zero = () => 0;

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const f = (x) => (x + 1) * Math.exp(x), Fp = (x) => x * Math.exp(x);
  primitive("1. x eˣ", Fp, f, -4, 2);
  courbeSur(1, 0, f);
  courbeSur(1, 1, Fp);
  vrai("1. F en orange", courbes(1)[1].couleur === ORANGE);
  pointsSur("1. minimum de F", termes(1), Fp);
  const xmin = dichotomie((x) => derivee(Fp, x), -3, 0);
  verif("1. le minimum de F est en −1 (dichotomie sur F′)", xmin, -1, 1e-6);
  arrondi("1. F(−1) ≈ −0,37", -0.37, Fp(-1));
  dit(1, "$F(-1) = -\\mathrm{e}^{-1} \\approx -0{,}37$");
}
{
  primitive("2a", (x) => x ** 3 - 2 * x * x + 5 * x, (x) => 3 * x * x - 4 * x + 5, -3, 3);
  primitive("2b", (x) => Math.exp(2 * x) / 2, (x) => Math.exp(2 * x), -2, 2);
  primitive("2c", (x) => -1 / x, (x) => 1 / (x * x), 0.2, 5);
  primitive("2d", (x) => Math.log(x * x + 1), (x) => (2 * x) / (x * x + 1), -3, 3);
  courbeSur(2, 0, (x) => (2 * x) / (x * x + 1));
  courbeSur(2, 1, (x) => Math.log(x * x + 1));
  dit(2, "$F(x) = x^3 - 2x^2 + 5x$");
  dit(2, "$G(x) = \\dfrac{1}{2}\\mathrm{e}^{2x}$");
  dit(2, "$H(x) = -\\dfrac{1}{x}$");
  dit(2, "$K(x) = \\ln(x^2 + 1)$");
}
{
  const Fp = (x) => 2 * x ** 3 - x * x + x + 2;
  primitive("3", Fp, (x) => 6 * x * x - 2 * x + 1, -2, 2);
  verif("3. F(1) = 4", Fp(1), 4);
  const cb = courbes(3);
  vrai("3. trois primitives décalées, l'orange passe par (1 ; 4)", cb.length === 3 && cb.every((c) => c.p.slice(0, 3).join() === "2,-1,1") && cb[2].couleur === ORANGE && cb[2].p[3] === 2);
  vrai("3. le point (1 ; 4)", termes(3).length === 1 && termes(3)[0].x === 1 && termes(3)[0].y === 4);
  dit(3, "$F(x) = 2x^3 - x^2 + x + 2$");
}
{
  primitive("4a", (x) => Math.exp(x * x), (x) => 2 * x * Math.exp(x * x), -1.5, 1.5);
  primitive("4b", (x) => Math.log(x ** 3 + 1), (x) => (3 * x * x) / (x ** 3 + 1), 0.1, 4);
  primitive("4c", (x) => (x * x + x) ** 4 / 4, (x) => (2 * x + 1) * (x * x + x) ** 3, -2, 1.5);
  primitive("4d", (x) => Math.sin(x) ** 2 / 2, (x) => Math.cos(x) * Math.sin(x), -4, 4);
  const t = dessin("tableau", 4);
  vrai("4. tableau des formes", t[1].join("|") === "forme|u′eᵘ|u′/u|u′u³|u′u");
  dit(4, "$F(x) = \\mathrm{e}^{x^2}$");
  dit(4, "$G(x) = \\ln(x^3 + 1)$");
  dit(4, "$H(x) = \\dfrac{(x^2 + x)^4}{4}$");
  dit(4, "$K(x) = \\dfrac{\\sin^2(x)}{2}$");
}
{
  verif("5a. ∫₀² (x² + 1) = 14/3", integrale((x) => x * x + 1, 0, 2), 14 / 3, 1e-10);
  arrondi("5a. ≈ 4,67", 4.67, 14 / 3);
  verif("5b. ∫₀¹ e^{2x} = (e² − 1)/2", integrale((x) => Math.exp(2 * x), 0, 1), (E * E - 1) / 2, 1e-10);
  arrondi("5b. ≈ 3,19", 3.19, (E * E - 1) / 2);
  arrondi("5b. le piège : e²/2 ≈ 3,69", 3.69, (E * E) / 2);
  verif("5c. ∫₁ᵉ 1/x = 1", integrale((x) => 1 / x, 1, E), 1, 1e-10);
  hachure(5, ORANGE, (x) => x * x + 1, zero, 0, 2);
  dit(5, "\\dfrac{14}{3} \\approx 4{,}67$");
  dit(5, "$\\dfrac{\\mathrm{e}^{2} - 1}{2} \\approx 3{,}19$");
}
{
  const f = (x) => -x * x + 4 * x;
  vrai("6. f ≥ 0 sur [0 ; 4]", Array.from({ length: 41 }, (_, i) => f(i / 10)).every((y) => y >= 0));
  verif("6. aire = 32/3", integrale(f, 0, 4), 32 / 3, 1e-10);
  arrondi("6. ≈ 10,67", 10.67, 32 / 3);
  arrondi("6. en cm² (unité 2 cm) ≈ 42,67", 42.67, integrale(f, 0, 4) * 2 * 2);
  verif("6. Archimède : 2/3 du carré 4 × 4", (2 / 3) * 16, 32 / 3, 1e-12);
  vrai("6. la parabole", JSON.stringify(courbes(6, "figure")[0].q) === "[-1,4,0]");
  hachure(6, ORANGE, f, zero, 0, 4, "figure");
  dit(6, "= \\dfrac{128}{3} \\approx 42{,}67$ cm²");
  dit(6, "\\dfrac{32}{3} \\approx 10{,}67$ unités d'aire");
}
{
  const f = (x) => Math.sqrt(Math.max(0, 4 - x * x));
  verif("7a. ∫ √(4 − x²) = 2π (Simpson fin : racine au bord)", integrale(f, -2, 2, 200000), 2 * Math.PI, 1e-6);
  arrondi("7a. ≈ 6,28", 6.28, 2 * Math.PI);
  verif("7b. ∫₋₁¹ x³ = 0", integrale((x) => x ** 3, -1, 1), 0, 1e-12);
  verif("7b. aire = 1/2", integrale((x) => Math.abs(x ** 3), -1, 1), 0.5, 1e-9);
  courbeSur(7, 0, f, "figure");
  hachure(7, ORANGE, f, zero, -2, 2, "figure");
  dit(7, "= 2\\pi \\approx 6{,}28$");
  dit(7, "$2 \\times \\dfrac{1}{4} = \\dfrac{1}{2}$");
}
{
  const mu = integrale((x) => x * x, 0, 2) / 2;
  verif("8. μ = 4/3", mu, 4 / 3, 1e-10);
  const c = dichotomie((x) => x * x - mu, 0, 2);
  arrondi("8. c ≈ 1,15", 1.15, c);
  const rect = courbes(8)[1].pts;
  vrai("8. rectangle orange de hauteur 4/3 sur [0 ; 2]", rect[1][1] === 1.333 && rect[2][0] === 2 && Math.abs(rect[1][1] * 2 - integrale((x) => x * x, 0, 2)) < 2e-3);
  pointsSur("8. point (c ; μ)", termes(8), (x) => x * x, 0.02);
  dit(8, "$\\mu = \\dfrac{4}{3} \\approx 1{,}33$");
  dit(8, "$x = \\dfrac{2}{\\sqrt{3}} \\approx 1{,}15$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const c = (t) => 5 * t * Math.exp(-t);
  verif("9a. ∫₀⁴ t e^{−t} = 1 − 5e^{−4}", integrale((t) => t * Math.exp(-t), 0, 4), 1 - 5 * Math.exp(-4), 1e-10);
  const auc = integrale(c, 0, 4);
  arrondi("9b. AUC ≈ 4,54", 4.54, auc);
  arrondi("9c. moyenne ≈ 1,14", 1.14, auc / 4);
  courbeSur(9, 0, c);
  hachure(9, ORANGE, c, zero, 0, 4);
  arrondi("9. horizontale = moyenne", dessin("repere", 9)[3], auc / 4);
  dit(9, "= 5 - 25\\mathrm{e}^{-4} \\approx 4{,}54$");
  dit(9, "\\approx 1{,}14$ mg/L");
}
{
  primitive("10a. x ln x − x", (x) => x * Math.log(x) - x, Math.log, 0.2, 5);
  verif("10b. ∫₁ᵉ ln = 1", integrale(Math.log, 1, E), 1, 1e-10);
  const j = integrale((x) => x * Math.log(x), 1, E);
  verif("10c. ∫₁ᵉ x ln x = (e² + 1)/4", j, (E * E + 1) / 4, 1e-10);
  arrondi("10c. ≈ 2,10", 2.1, j);
  hachure(10, ORANGE, Math.log, zero, 1, 2.718);
  dit(10, "= \\dfrac{\\mathrm{e}^2 + 1}{4} \\approx 2{,}10$");
}
{
  const f = (x) => Math.sqrt(2 * x), g = (x) => (x * x) / 2;
  verif("11a. intersection en 2", f(2), g(2));
  vrai("11b. f ≥ g sur ]0 ; 2[", Array.from({ length: 199 }, (_, i) => (i + 1) / 100).every((x) => f(x) > g(x)));
  primitive("11c. (2/3) x √x pour √x", (x) => (2 / 3) * x * Math.sqrt(x), Math.sqrt, 0.1, 3);
  const A = integrale((x) => f(x) - g(x), 0, 2, 200000);
  verif("11c. aire = 4/3", A, 4 / 3, 1e-6);
  arrondi("11c. ≈ 33,3 cm²", 33.3, A * 25, 0.1);
  courbeSur(11, 0, f, "figure");
  vrai("11. la parabole verte y = x²/2", JSON.stringify(courbes(11, "figure")[1]) === JSON.stringify({ q: [0.5, 0, 0], couleur: VERT }));
  hachure(11, ORANGE, f, g, 0, 2, "figure");
  dit(11, "$\\dfrac{100}{3} \\approx 33{,}3$ cm²");
  dit(11, "$\\dfrac{8}{3} - \\dfrac{4}{3} = \\dfrac{4}{3}$ u.a.");
}
{
  const g = (t) => Math.exp(-t * t);
  const G1 = integrale(g, 0, 1);
  arrondi("12. G(1) ≈ 0,747", 0.747, G1, 0.001);
  vrai("12. 2/3 ≤ G(1) ≤ 1", G1 >= 2 / 3 && G1 <= 1);
  vrai("12. 1 − t² ≤ e^{−t²} ≤ 1 sur [0 ; 1]", Array.from({ length: 101 }, (_, i) => i / 100).every((t) => 1 - t * t <= g(t) + 1e-15 && g(t) <= 1));
  verif("12. G′ = e^{−x²} (dérivée de ∫₀ˣ)", derivee((x) => integrale(g, 0, x), 0.7, 1e-4), g(0.7), 1e-6);
  courbeSur(12, 0, g);
  vrai("12. parabole grise 1 − t²", JSON.stringify(courbes(12)[1].q) === "[-1,0,1]");
  hachure(12, ORANGE, g, zero, 0, 1);
  vrai("12. droite y = 1", dessin("repere", 12)[3] === 1);
  dit(12, "$\\dfrac{2}{3} \\leqslant G(1) \\leqslant 1$");
}
{
  const d = (t) => 4 - 2 * t;
  verif("13a. ∫₀² = 4", integrale(d, 0, 2), 4, 1e-12);
  verif("13b. ∫₂³ = −1", integrale(d, 2, 3), -1, 1e-12);
  verif("13c. ∫₀³ = 3", integrale(d, 0, 3), 3, 1e-12);
  verif("13d. ∫₀³ (d + 0,5) = 4,5", integrale((t) => d(t) + 0.5, 0, 3), 4.5, 1e-12);
  verif("13. eau déplacée = 5", integrale((t) => Math.abs(d(t)), 0, 3, 3000), 5, 1e-9);
  hachure(13, VERT, d, zero, 0, 2, "figure");
  hachure(13, ORANGE, d, zero, 2, 3, "figure");
  dit(13, "= 4 + (-1) = 3$");
  dit(13, "= 3 + 0{,}5 \\times 3 = 4{,}5$ m³");
}
{
  const P = (t) => -0.1 * t * t + 1.2 * t;
  const Ej = integrale(P, 0, 12);
  verif("14a. énergie 28,8 kWh", Ej, 28.8, 1e-10);
  verif("14b. moyenne 2,4 kW", Ej / 12, 2.4, 1e-10);
  const t1 = dichotomie((t) => P(t) - 2.4, 0, 6), t2 = dichotomie((t) => P(t) - 2.4, 6, 12);
  arrondi("14c. t1 ≈ 2,54", 2.54, t1);
  arrondi("14c. t2 ≈ 9,46", 9.46, t2);
  vrai("14c. 8 h 32 et 15 h 28", Math.round((t1 % 1) * 60) === 32 && Math.round((t2 % 1) * 60) === 28);
  pointsSur("14. les deux instants", termes(14), P, 0.02);
  hachure(14, ORANGE, P, zero, 0, 12);
  vrai("14. horizontale 2,4", dessin("repere", 14)[3] === 2.4);
  dit(14, "= 28{,}8$ kWh");
  dit(14, "$8$ h $32$ et vers $15$ h $28$");
}
{
  const f = (t) => 1 + (t * t) / 4;
  const exact = integrale(f, 2, 2.5);
  arrondi("15c. exact ≈ 1,135", 1.135, exact, 0.001);
  vrai("15c. 0,5 f(2) ≤ exact ≤ 0,5 f(2,5)", 0.5 * f(2) <= exact && exact <= 0.5 * f(2.5));
  verif("15c. f(2,5) = 2,5625", f(2.5), 2.5625);
  arrondi("15c. 1,28", 1.28, 0.5 * f(2.5));
  const cb = courbes(15);
  vrai("15. grand rectangle de hauteur f(2,5)", cb[1].pts[1][1] === 2.563 && cb[1].pts[2][0] === 2.5);
  vrai("15. petit rectangle de hauteur f(2) = 2", cb[2].pts.every(([, y]) => y === f(2)));
  hachure(15, ORANGE, f, zero, 2, 2.5);
  dit(15, "\\approx 1{,}135$");
}
{
  const Cm = (q) => 0.3 * q * q - 1.2 * q + 1.5, C = (q) => 0.1 * q ** 3 - 0.6 * q * q + 1.5 * q + 1;
  primitive("16a. coût total", C, Cm, 0, 5);
  verif("16a. C(0) = 1", C(0), 1);
  verif("16b. C(5) = 6", C(5), 6, 1e-12);
  verif("16c. ∫₂⁴ Cm = 1,4", integrale(Cm, 2, 4), 1.4, 1e-10);
  vrai("16. Cm > 0 (discriminant < 0) et minimum en 2", 1.44 - 4 * 0.3 * 1.5 < 0 && Math.abs(dichotomie((q) => derivee(Cm, q), 0, 5) - 2) < 1e-6);
  vrai("16. courbes : Cm bleue, C orange", JSON.stringify(courbes(16)[0].q) === "[0.3,-1.2,1.5]" && JSON.stringify(courbes(16)[1].p) === "[0.1,-0.6,1.5,1]");
  dit(16, "$C(q) = 0{,}1q^3 - 0{,}6q^2 + 1{,}5q + 1$");
  dit(16, "$= 3{,}8 - 2{,}4 = 1{,}4$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const I = (n) => integrale((x) => x ** n / (1 + x), 0, 1);
  verif("17a. I0 = ln 2", I(0), Math.LN2, 1e-10);
  vrai("17b. I(n) + I(n+1) = 1/(n + 1) pour n ≤ 20", Array.from({ length: 21 }, (_, n) => Math.abs(I(n) + I(n + 1) - 1 / (n + 1)) < 1e-9).every(Boolean));
  arrondi("17b. I1 ≈ 0,307", 0.307, I(1), 0.001);
  arrondi("17b. I2 ≈ 0,193", 0.193, I(2), 0.001);
  vrai("17c. 0 ≤ I(n) ≤ 1/(n + 1)", Array.from({ length: 30 }, (_, n) => I(n) >= 0 && I(n) <= 1 / (n + 1)).every(Boolean));
  const S = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += (-1) ** (k + 1) / k; return s; };
  vrai("17d. ln 2 − S(n) = (−1)^n I(n)", Array.from({ length: 15 }, (_, n) => Math.abs(Math.LN2 - S(n) - (-1) ** n * I(n)) < 1e-9).every(Boolean));
  pointsSur("17. les sommes S(n)", termes(17), S);
  arrondi("17. horizontale ln 2", dessin("repere", 17)[3], Math.LN2, 0.001);
  const lignes = dessin("programme", 17, "figure")[0];
  const sortie = executerPython(lignes, "print(round(approx(4), 4))");
  if (sortie === null) console.log("  (Python absent : approx(4) non exécuté)");
  else vrai(`17e. Python : approx(4) = ${sortie}`, sortie === "0.5833");
  verif("17e. S4 = 7/12", S(4), 7 / 12, 1e-12);
  vrai("17e. n = 999 : 1/(n + 1) ≤ 10⁻³, pas n = 998", 1 / 1000 <= 1e-3 && 1 / 999 > 1e-3);
  vrai("17e. erreur réelle en 999 < 10⁻³", Math.abs(Math.LN2 - S(999)) < 1e-3);
  dit(17, "= \\dfrac{7}{12} \\approx 0{,}5833$");
  dit(17, "$I_1 = 1 - \\ln 2 \\approx 0{,}307$");
  dit(17, "avec $n = 999$");
}
{
  const d = (t) => (2 * t + 1) * Math.exp(-t);
  const D = (t) => -(2 * t + 3) * Math.exp(-t);
  primitive("18b", D, d, 0, 8);
  const tmax = dichotomie((t) => derivee(d, t), 0, 3);
  verif("18a. maximum en 0,5", tmax, 0.5, 1e-6);
  arrondi("18a. d(0,5) ≈ 1,21", 1.21, d(0.5));
  verif("18c. V(2) par Simpson = formule", integrale(d, 0, 2), 3 - 7 * Math.exp(-2), 1e-10);
  verif("18d. V(60) ≈ 3", integrale(d, 0, 60, 20000), 3, 1e-8);
  const l = dichotomie((x) => integrale(d, 0, x) - 1.5, 0, 5);
  arrondi("18e. λ ≈ 1,327", 1.327, l, 0.001);
  vrai("18e. ≈ 1 h 20 min", Math.round(l * 60) === 80);
  courbeSur(18, 0, d);
  hachure(18, ORANGE, d, zero, 0, 1.327);
  pointsSur("18. le point du maximum", termes(18), d);
  dit(18, "$\\lambda \\approx 1{,}327$ h, soit environ $1$ h $20$ min");
  dit(18, "$d(0{,}5) = 2\\mathrm{e}^{-0{,}5} \\approx 1{,}21$");
}
{
  const L = (x) => (Math.exp(x) - 1) / (E - 1);
  verif("19a. L(0) = 0 et L(1) = 1", L(0) + (L(1) - 1), 0, 1e-15);
  arrondi("19a. L(0,5) ≈ 0,378", 0.378, L(0.5), 0.001);
  const J = integrale(L, 0, 1);
  verif("19b. ∫ L = (e − 2)/(e − 1)", J, (E - 2) / (E - 1), 1e-10);
  arrondi("19b. ≈ 0,418", 0.418, J, 0.001);
  vrai("19c. L(x) ≤ x", Array.from({ length: 101 }, (_, i) => i / 100).every((x) => L(x) <= x + 1e-15));
  const gini = 2 * integrale((x) => x - L(x), 0, 1);
  verif("19c. Gini = (3 − e)/(e − 1)", gini, (3 - E) / (E - 1), 1e-10);
  arrondi("19c. ≈ 0,164", 0.164, gini, 0.001);
  const L4 = (x) => 4 * L(x / 4);
  courbeSur(19, 1, L4);
  hachure(19, ORANGE, (x) => x, L4, 0, 4);
  pointsSur("19. le point (2 ; 4 L(0,5))", termes(19), L4);
  dit(19, "\\approx 0{,}164$");
  dit(19, "environ $37{,}8$ % des revenus");
}
{
  const moy = (f, a, b) => integrale(f, a, b) / (b - a);
  verif("20a. moyenne de sin sur [0 ; π] = 2/π", moy(Math.sin, 0, Math.PI), 2 / Math.PI, 1e-10);
  verif("20a. moyenne de sin sur [0 ; 2π] = 0", moy(Math.sin, 0, 2 * Math.PI), 0, 1e-10);
  verif("20b. moyenne de sin² = 1/2", moy((t) => Math.sin(t) ** 2, 0, 2 * Math.PI), 0.5, 1e-10);
  primitive("20b", (t) => t / 2 - Math.sin(2 * t) / 4, (t) => Math.sin(t) ** 2, 0, 6.3);
  const U = 3.7;
  verif("20c. U_eff = U/√2", Math.sqrt(moy((t) => (U * Math.sin(t)) ** 2, 0, 2 * Math.PI)), U / Math.SQRT2, 1e-10);
  arrondi("20d. 230√2 ≈ 325", 325, 230 * Math.SQRT2, 1);
  arrondi("20. moyenne de |sin| ≈ 0,64", 0.64, moy((t) => Math.abs(Math.sin(t)), 0, 2 * Math.PI));
  arrondi("20. 1/√2 ≈ 0,71", 0.71, 1 / Math.SQRT2);
  courbeSur(20, 0, (t) => Math.sin(t) ** 2);
  courbeSur(20, 1, Math.sin);
  vrai("20. horizontale 1/2", dessin("repere", 20)[3] === 0.5);
  dit(20, "$U = 230\\sqrt{2} \\approx 325$ V");
}

enonceDit(14, "$P(t) = -0{,}1t^2 + 1{,}2t$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("chaque corrigé qui a un dessin le dit (⭐ Sur le dessin / Le tableau)", F.feuille.corrections.every((t) => /Sur le dessin|Le tableau/.test(t)));
void GRIS;
F.fin();
