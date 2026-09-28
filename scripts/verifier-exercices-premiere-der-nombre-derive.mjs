// Recalcul indépendant de la feuille « Nombre dérivé et tangente » (1re sans
// spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-der-nombre-derive.tsx
//
// Chaque coefficient directeur est refait à partir des deux points ; chaque
// équation réduite est testée sur ses deux points ; chaque tangente dessinée
// est comparée au taux d'accroissement de la courbe tracée ; chaque escalier
// vert part du point A et arrive au point B de SA tangente. Chaque
// approximation f(a) + f′(a) h est recalculée, et comparée à la vraie valeur
// quand le modèle est connu. Plus les règles de rendu et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-der-nombre-derive.mjs

import { ouvrir, d, poly } from "./verifier-exercices-premiere-der-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-der-nombre-derive.tsx", "der_nombre_derive");
const { exercice, estLaCourbe, tangente, annonce, dit, vaut, vrai, dessin, courbe } = F;
const pente = (a, b) => (b[1] - a[1]) / (b[0] - a[0]);
/** La droite y = m x + p passe-t-elle par les points donnés ? */
const passe = (nom, m, p, ...pts) => pts.forEach(([x, y]) => vaut(`${nom} passe par (${x} ; ${y})`, m * x + p, y));
/** L'escalier (ligne brisée) de l'exercice k va de A à B en passant par le coin (xB ; yA). */
const escalier = (k, role, i, A, B) => {
  const pts = dessin(k, role).args[1][i].pts;
  vrai(`${k}. escalier de (${A}) à (${B})`, JSON.stringify(pts) === JSON.stringify([A, [B[0], A[1]], B]), JSON.stringify(pts));
};

/* ── ★ ── */
exercice(1, () => {
  annonce(1, "\\dfrac{6}{2} = 3", pente([0, 1], [2, 7]));
  const T = courbe(1, "schema", 0);
  vaut("1. la tangente dessinée passe par A", T(0), 1);
  vaut("1. la tangente dessinée passe par B", T(2), 7);
  escalier(1, "schema", 1, [0, 1], [2, 7]);
});
exercice(2, () => {
  annonce(2, "\\dfrac{-6}{3} = -2", pente([1, 5], [4, -1]));
  dit(2, "$y = -2x + 7$", "$p = 7$");
  passe("2. y = −2x + 7", -2, 7, [1, 5], [4, -1]);
  const T = courbe(2, "schema", 0);
  vaut("2. la tangente dessinée passe par B", T(4), -1);
  escalier(2, "schema", 1, [1, 5], [4, -1]);
});
exercice(3, () => dit(3, "$25$ km/h"));
exercice(4, () => {
  annonce(4, "f(3{,}1) \\approx 10 + 4 \\times 0{,}1 = 10{,}4", 10 + 4 * 0.1);
  annonce(4, "f(2{,}9) \\approx 10 + 4 \\times (-0{,}1) = 9{,}6", 10 - 4 * 0.1);
});
exercice(5, () => {
  const f = poly(1, -2, 2);
  estLaCourbe(5, "figure", 0, f);
  tangente(5, "figure", 1, f, 2);
  vaut("5. A(2 ; 2) sur la courbe", f(2), 2);
  annonce(5, "f'(2) = \\dfrac{4 - 2}{3 - 2} = 2", d(f, 2), { eps: 1e-5 });
  dit(5, "$y = 2x - 2$");
  passe("5. y = 2x − 2", 2, -2, [2, 2], [3, 4]);
});
exercice(6, () => {
  annonce(6, "$f'(4) = -0{,}5", -0.5);
  annonce(6, "f(4) = -0{,}5 \\times 4 + 3 = -2 + 3 = 1", -0.5 * 4 + 3);
  const f = poly(0.25, -2.5, 7);
  estLaCourbe(6, "schema", 0, f);
  tangente(6, "schema", 1, f, 4);
});
exercice(7, () => dit(7, "$0{,}30$ €"));
exercice(8, () => annonce(8, "m(7) \\approx 5 + 0{,}2 \\times 1 = 5{,}2", 5 + 0.2));

/* ── ★★ ── */
exercice(9, () => {
  annonce(9, "-3 \\times 0{,}1 = -0{,}3", -3 * 0.1);
  dit(9, "$30$ habitants", "$500$ habitants", "1960");
  const T = courbe(9, "schema", 0);
  vaut("9. la tangente dessinée passe par (2 ; 5)", T(2), 5);
  vaut("9. sa pente est −3", T(3) - T(2), -3);
});
exercice(10, () => {
  annonce(10, "\\dfrac{4}{2} = 2", pente([1, 3], [3, 7]));
  dit(10, "$y = 2x + 1$", "$2\\,000$ euros", "$20$ euros par sac");
  passe("10. y = 2x + 1", 2, 1, [1, 3], [3, 7]);
});
exercice(11, () => {
  const D = poly(0.5, 0, 0);
  estLaCourbe(11, "figure", 0, D, "d");
  tangente(11, "figure", 1, D, 2);
  annonce(11, "d'(2) = \\dfrac{4 - 2}{3 - 2} = 2", d(D, 2), { eps: 1e-5 });
  annonce(11, "20 \\times 3{,}6 = 72", 72);
  annonce(11, "\\dfrac{2 - 0}{2 - 0} = 1", (D(2) - D(0)) / 2);
  vaut("11. la corde va de O à A", courbe(11, "figure", 2)(2), D(2));
  vaut("11. instantanée = 2 × moyenne", d(D, 2) / ((D(2) - D(0)) / 2), 2, 1e-5);
});
exercice(12, () => {
  const C = poly(0.5, 1, 2);
  estLaCourbe(12, "figure", 0, C, "C");
  tangente(12, "figure", 1, C, 2);
  annonce(12, "C'(2) = \\dfrac{9 - 6}{3 - 2} = 3", d(C, 2), { eps: 1e-5 });
  annonce(12, "9{,}5", C(3), { ou: "enonce" });
  annonce(12, "C(3) - C(2) = 9{,}5 - 6 = 3{,}5", C(3) - C(2));
  dit(12, "$3\\,000$ €", "$30$ € par vélo", "$3\\,500$ €");
  vrai("12. la courbe est au-dessus de la tangente en 3", C(3) > 3 * 3);
});
exercice(13, () => {
  annonce(13, "d(1{,}25) \\approx 12 + 12 \\times 0{,}25 = 15", 12 + 12 * 0.25);
  dit(13, "$y = 12t$", "$p = 0$");
  passe("13. y = 12t", 12, 0, [1, 12]);
});
exercice(14, () => {
  annonce(14, "C(2024) \\approx 415 + 2{,}5 \\times 4 = 425", 415 + 2.5 * 4);
  annonce(14, "\\dfrac{2{,}5}{415} \\approx 0{,}006", 2.5 / 415, { eps: 0.01 });
  vrai("14. environ 0,6 %", Math.abs((2.5 / 415) * 100 - 0.6) < 0.05);
});
exercice(15, () => {
  const L = poly(-0.25, 0, 8);
  estLaCourbe(15, "figure", 0, L, "L");
  tangente(15, "figure", 1, L, 2);
  tangente(15, "figure", 2, L, 4);
  annonce(15, "L'(2) = \\dfrac{6 - 7}{3 - 2} = -1", pente([2, L(2)], [3, 6]));
  annonce(15, "L'(4) = \\dfrac{2 - 4}{5 - 4} = -2", pente([4, L(4)], [5, 2]));
  vaut("15. L'(2) du modèle", d(L, 2), -1, 1e-5);
  vaut("15. L'(4) du modèle", d(L, 4), -2, 1e-5);
  vaut("15. (3 ; 6) sur la tangente en A", courbe(15, "figure", 1)(3), 6);
  vaut("15. (5 ; 2) sur la tangente en B", courbe(15, "figure", 2)(5), 2);
  dit(15, "$10$ m par an", "$20$ m par an");
});
exercice(16, () => {
  annonce(16, "\\dfrac{3}{2} = 1{,}5", pente([2, 3], [4, 6]));
  annonce(16, "1{,}5 \\times 0{,}20 = 0{,}30", 1.5 * 0.2);
  const T = courbe(16, "schema", 0);
  vaut("16. la tangente dessinée passe par A", T(2), 3);
  vaut("16. la tangente dessinée passe par B", T(4), 6);
  const pts = dessin(16, "schema").args[1][1].pts;
  vrai("16. escalier de A à B", JSON.stringify(pts) === JSON.stringify([[2, 3], [4, 3], [4, 6]]));
});

/* ── ★★★ ── */
exercice(17, () => {
  const x = poly(0.25, 0, 0);
  estLaCourbe(17, "figure", 0, x, "x");
  tangente(17, "figure", 1, x, 2);
  tangente(17, "figure", 2, x, 4);
  vaut("17. x'(2) = 1", d(x, 2), 1, 1e-5);
  vaut("17. x'(4) = 2", d(x, 4), 2, 1e-5);
  annonce(17, "1 \\times 60 = 60", 60);
  annonce(17, "2 \\times 60 = 120", 120);
  annonce(17, "\\dfrac{4}{4} = 1", (x(4) - x(0)) / 4);
  vaut("17. moyenne sur [0 ; 4] = x'(2)", (x(4) - x(0)) / 4, d(x, 2), 1e-5);
  dit(17, "$y = 2t - 4$", "$p = -4$");
  passe("17. y = 2t − 4", 2, -4, [4, 4], [5, 6]);
  annonce(17, "x(4{,}5) \\approx 2 \\times 4{,}5 - 4 = 5", 2 * 4.5 - 4);
  vrai("17. l'approximation est proche (écart < 0,1)", Math.abs(x(4.5) - 5) < 0.1);
});
exercice(18, () => {
  const Cp = (q) => 4 * q + 400;
  annonce(18, "C'(20) = 4 \\times 20 + 400 = 480", Cp(20));
  annonce(18, "C'(40) = 4 \\times 40 + 400 = 560", Cp(40));
  annonce(18, "500 - 480 = 20", 500 - Cp(20));
  annonce(18, "500 - 560 = -60", 500 - Cp(40));
  annonce(18, "q = 25", 25);
  vaut("18. à q = 25, coût marginal = recette marginale", Cp(25), 500);
  const [entete, ligne] = dessin(18, "schema", "tableau").args;
  entete.slice(1).forEach((q, i) => vaut(`18. tableau, q = ${q}`, 500 - Cp(Number(q)), ligne[i + 1]));
});
exercice(19, () => {
  annonce(19, "\\dfrac{-13}{2} = -6{,}5", pente([2, 7], [4, -6]));
  dit(19, "$y = -6{,}5z + 20$", "$p = 20$");
  passe("19. y = −6,5z + 20", -6.5, 20, [2, 7], [4, -6]);
  annonce(19, "T(2{,}4) \\approx -6{,}5 \\times 2{,}4 + 20 = 4{,}4", -6.5 * 2.4 + 20);
});
exercice(20, () => {
  const V = poly(0.25, -3, 9);
  estLaCourbe(20, "figure", 0, V, "V");
  tangente(20, "figure", 1, V, 2);
  tangente(20, "figure", 2, V, 4);
  annonce(20, "V'(2) = -2", d(V, 2), { eps: 1e-5 });
  annonce(20, "V'(4) = -1", d(V, 4), { eps: 1e-5 });
  vaut("20. 400 L à t = 2", V(2) * 100, 400);
  vaut("20. la tangente en A coupe l'axe en 4", courbe(20, "figure", 1)(4), 0);
  vaut("20. la cuve est vide à t = 6", V(6), 0);
  vrai("20. pas vide avant 6", [4, 5, 5.9].every((t) => V(t) > 0));
});

/* ── Les tableaux d'appoint (28/09 au soir) : chaque case = l'approximation f(a) + f′(a) h ── */
const tableauSuit = (k, G) => {
  const [entete, ligne] = dessin(k, "schema", "tableau").args;
  entete.slice(1).forEach((x, i) => vaut(`${k}. tableau, ${entete[0]} = ${x}`, G(x, i), ligne[i + 1], 1e-9));
};
const num = (s) => Number(String(s).replace(",", "."));
exercice(3, () => {
  tableauSuit(3, (_, i) => 25 * [0, 0.1, 0.2][i]);
  annonce(3, "25 \\times 0{,}1 = 2{,}5", 2.5);
});
exercice(4, () => tableauSuit(4, (x) => 10 + 4 * (num(x) - 3)));
exercice(7, () => {
  tableauSuit(7, (x) => 0.3 * (num(x) - 200));
  annonce(7, "10 \\times 0{,}3 = 3", 3);
});
exercice(8, () => tableauSuit(8, (x) => 5 + 0.2 * (num(x) - 6)));
exercice(13, () => tableauSuit(13, (x) => 12 + 12 * (num(x) - 1)));
exercice(14, () => tableauSuit(14, (x) => 415 + 2.5 * (num(x) - 2020)));
exercice(19, () => {
  const T = courbe(19, "schema", 0);
  vaut("19. la tangente dessinée passe par A", T(2), 7);
  vaut("19. la tangente dessinée passe par B", T(4), -6);
  escalier(19, "schema", 1, [2, 7], [4, -6]);
});

F.fin("Nombre dérivé et tangente (1re)");
