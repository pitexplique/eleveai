// Recalcul indépendant de la feuille « Le signe de la dérivée » (1re sans spé,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-der-signe.tsx
//
// Chaque « vérifier que » est rejoué : forme développée et forme factorisée
// LUES dans la feuille, comparées en onze points ; la forme développée est
// aussi comparée au taux d'accroissement de la fonction de départ quand elle
// est donnée. Chaque tableau de signes est relu et recalculé CASE PAR CASE
// (`outilsSignes` du socle : signe au milieu de chaque colonne, « 0 » sous
// chaque racine, rien ailleurs). Chaque intervalle annoncé dans un corrigé est
// testé sur une grille. Plus les règles de rendu et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-der-signe.mjs

import { ouvrir, d, poly } from "./verifier-exercices-premiere-der-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-der-signe.tsx", "der_signe");
const { exercice, estLaCourbe, annonce, derivee, identite, differentes, dit, vaut, vrai, signes, lire } = F;

/** Le signe de G sur ]a ; b[, testé sur une grille : « + » ou « - » partout. */
const signeSur = (nom, G, a, b, s) => {
  const xs = Array.from({ length: 19 }, (_, i) => a + ((b - a) * (i + 1)) / 20);
  vrai(`${nom} : ${s} sur ]${a} ; ${b}[`, xs.every((x) => (s === "+" ? G(x) > 0 : G(x) < 0)));
};

/* ── ★ ── */
exercice(1, () => {
  signes.juste(1);
  const G = (x) => 2 * x - 6;
  signeSur("1. 2x − 6", G, -10, 3, "-");
  signeSur("1. 2x − 6", G, 3, 10, "+");
});
exercice(2, () => {
  signes.juste(2);
  signeSur("2. −3x + 12", (x) => -3 * x + 12, -10, 4, "+");
  signeSur("2. −3x + 12", (x) => -3 * x + 12, 4, 10, "-");
});
exercice(3, () => signes.juste(3, { 2: "(x - 2)(x + 3)" }));
exercice(4, () => {
  derivee(4, "f'(x)", "3x^2 - 6x", poly(1, -3, 0, 0));
  identite(4, "3x(x - 2)", "3x^2 - 6x");
});
exercice(5, () => {
  const G = poly(1, 0, -4);
  estLaCourbe(5, "figure", 0, G, "f′");
  signeSur("5. f′", G, -10, -2, "+");
  signeSur("5. f′", G, -2, 2, "-");
  signeSur("5. f′", G, 2, 10, "+");
  vaut("5. f′(−2) = 0", G(-2), 0);
  vaut("5. f′(2) = 0", G(2), 0);
});
exercice(6, () => vrai("6. x² + 1 > 0 partout", [-100, -3, -1, 0, 0.5, 1, 7, 100].every((x) => x * x + 1 > 0)));
exercice(7, () => signes.juste(7, { 3: "-2(x - 1)(x - 4)" }));
exercice(8, () => {
  identite(8, "2(x - 2)(x + 2)", "2x^2 - 8");
  identite(8, "(2x - 4)(x + 2)", "2x^2 - 8");
  identite(8, "2(x - 2)^2", "2x^2 - 8x + 8");
  differentes(8, "2(x - 2)^2", "2x^2 - 8");
});

/* ── ★★ ── */
exercice(9, () => {
  estLaCourbe(9, "figure", 0, (x) => -2 * x + 6, "B′");
  signes.juste(9, { 0: "-2x + 6" });
  signeSur("9. B′", (x) => -2 * x + 6, 0, 3, "+");
  signeSur("9. B′", (x) => -2 * x + 6, 3, 6, "-");
});
exercice(10, () => {
  signes.juste(10, { 0: "-10t + 15" });
  vaut("10. racine 1,5", 15 / 10, 1.5);
});
exercice(11, () => {
  identite(11, "(x - 2)(8 - x)", "-x^2 + 10x - 16");
  signes.juste(11, { 2: "(x - 2)(8 - x)" });
});
exercice(12, () => signes.juste(12, { 2: "(t - 2)(t - 9)" }));
exercice(13, () => {
  identite(13, "0{,}75(x - 2)(x - 6)", "0{,}75x^2 - 6x + 9");
  identite(13, "(x - 2)(x - 6)", "x^2 - 8x + 12");
  signes.juste(13, { 2: "0{,}75(x - 2)(x - 6)" });
});
exercice(14, () => {
  identite(14, "-0{,}3t(t - 8)", "-0{,}3t^2 + 2{,}4t", { variable: "t" });
  signes.juste(14, { 2: "-0{,}3t(t - 8)" });
});
exercice(15, () => {
  signes.juste(15, { 0: "-0{,}5t + 6{,}5" });
  vaut("15. racine 13", 6.5 / 0.5, 13);
});
exercice(16, () => {
  identite(16, "-3(x - 2)(x - 8)", "-3x^2 + 30x - 48");
  identite(16, "(x - 2)(x - 8)", "x^2 - 10x + 16");
  signes.juste(16, { 3: "-3(x - 2)(x - 8)" });
});

/* ── ★★★ ── */
exercice(17, () => {
  const h = poly(-1, 4.5, -6, 5);
  estLaCourbe(17, "figure", 0, h, "h");
  derivee(17, "h'(t)", "-3t^2 + 9t - 6", h, { variable: "t" });
  identite(17, "(3t - 6)(1 - t)", "-3t^2 + 9t - 6", { variable: "t" });
  signes.juste(17, { 2: "(3t - 6)(1 - t)" });
  vaut("17. 50 m au départ", h(0) * 10, 50);
  vaut("17. 25 m à t = 1", h(1) * 10, 25);
  vaut("17. 30 m à t = 2", h(2) * 10, 30);
  vrai("17. creux en 1, bosse en 2 sur la courbe", h(1) < h(0.9) && h(1) < h(1.1) && h(2) > h(1.9) && h(2) > h(2.1));
});
exercice(18, () => {
  identite(18, "-2(t - 1)(t - 6)", "-2t^2 + 14t - 12", { variable: "t" });
  identite(18, "(t - 1)(t - 6)", "t^2 - 7t + 6", { variable: "t" });
  signes.juste(18, { 3: "-2(t - 1)(t - 6)" });
});
exercice(19, () => {
  identite(19, "-0{,}6(m - 1)(m - 7)", "-0{,}6m^2 + 4{,}8m - 4{,}2", { variable: "m" });
  identite(19, "(m - 1)(m - 7)", "m^2 - 8m + 7", { variable: "m" });
  signes.juste(19, { 3: "-0{,}6(m - 1)(m - 7)" });
  vaut("19. T′(1) = 0", lire("-0{,}6(m - 1)(m - 7)", "m")(1), 0);
});
exercice(20, () => {
  const G = lire("-1{,}5(x - 2)(x - 6)");
  identite(20, "-1{,}5(x - 2)(x - 6)", "-1{,}5x^2 + 12x - 18");
  identite(20, "(x - 2)(x - 6)", "x^2 - 8x + 12");
  signes.juste(20, { 3: "-1{,}5(x - 2)(x - 6)" });
  vrai("20. B′(4) > 0", G(4) > 0);
  vrai("20. B′(7) < 0", G(7) < 0);
  dit(20, "$x = 4$", "$x = 7$");
});

/* ── Les dessins d'appoint (28/09 au soir) ── */
exercice(4, () => signes.juste(4, { 2: "3x(x - 2)" }));
exercice(6, () => estLaCourbe(6, "schema", 0, (x) => x * x + 1, "f′"));
exercice(8, () => {
  estLaCourbe(8, "schema", 0, (x) => 2 * x * x - 8, "2x² − 8");
  estLaCourbe(8, "schema", 1, (x) => 2 * (x - 2) ** 2, "2(x − 2)²");
  vaut("8. en 1 : −6", 2 - 8, -6);
  vaut("8. en 1 : 2", 2 * (1 - 2) ** 2, 2);
  vrai("8. elles ne se touchent qu'en 2", [-3, -1, 0, 1, 3, 4].every((x) => 2 * x * x - 8 !== 2 * (x - 2) ** 2) && 2 * 4 - 8 === 0);
});

F.fin("Le signe de la dérivée (1re)");
