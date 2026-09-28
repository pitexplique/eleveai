// Recalcul indépendant de la feuille « Lire un nombre dérivé sur un graphique »
// (1re sans spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-der-graphique.tsx
//
// Les courbes sont RELUES dans les appels `repere(…)` et comparées à la
// fonction du modèle ; chaque tangente tracée est testée (pente = taux
// d'accroissement de la courbe, point de contact sur la courbe) ; chaque
// nombre dérivé annoncé est refait par taux d'accroissement. Plus les règles
// de rendu et le socle commun (voir verifier-exercices-premiere-der-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-der-graphique.mjs

import { ouvrir, d, poly } from "./verifier-exercices-premiere-der-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-der-graphique.tsx", "der_graphique");
const { exercice, estLaCourbe, tangente, annonce, dit, vaut, vrai } = F;
const pente = (a, b) => (b[1] - a[1]) / (b[0] - a[0]);

/* ── ★ ── */
exercice(1, () => {
  const f = poly(0.5, 0, -2);
  estLaCourbe(1, "figure", 0, f);
  tangente(1, "figure", 1, f, 2);
  annonce(1, "f(2) = 0", f(2));
  annonce(1, "f'(2) = 2", d(f, 2));
});
exercice(2, () => {
  const f = poly(1, 0, -3, 0);
  estLaCourbe(2, "figure", 0, f);
  vrai("2. f'(−2) > 0", d(f, -2) > 0);
  vrai("2. f'(0) < 0", d(f, 0) < 0);
  annonce(2, "f'(1) = 0", d(f, 1), { eps: 1e-5 });
  tangente(2, "schema", 1, f, -2);
  tangente(2, "schema", 2, f, 0);
  tangente(2, "schema", 3, f, 1);
});
exercice(3, () => {
  const f = poly(1, -6, 9, 0);
  estLaCourbe(3, "figure", 0, f);
  annonce(3, "f'(1) = 0", d(f, 1), { eps: 1e-5 });
  annonce(3, "f(1) = 4", f(1));
  annonce(3, "f'(3) = 0", d(f, 3), { eps: 1e-5 });
  annonce(3, "f(3) = 0", f(3));
  tangente(3, "schema", 1, f, 1);
});
exercice(4, () => {
  annonce(4, "f'(2) = -2", pente([2, 2], [3, 0]));
  const f = poly(-0.5, 0, 4);
  estLaCourbe(4, "schema", 0, f);
  tangente(4, "schema", 1, f, 2);
});
exercice(5, () => {
  const f = poly(0.25, 0, 0.75);
  estLaCourbe(5, "figure", 0, f);
  tangente(5, "figure", 1, f, 1);
  vaut("5. f(1) = 1", f(1), 1);
  annonce(5, "f'(1) = \\dfrac{1}{2} = 0{,}5", d(f, 1), { eps: 1e-5 });
  vaut("5. (3 ; 2) sur la tangente", 0.5 * 3 + 0.5, 2);
});
exercice(6, () => {
  const f = poly(-1, 6, -4);
  estLaCourbe(6, "schema", 0, f);
  tangente(6, "schema", 1, f, 3);
  annonce(6, "f(3) = 5", f(3));
  annonce(6, "f'(3) = 0", d(f, 3), { eps: 1e-5 });
  dit(6, "$y = 5$");
});
exercice(7, () => {
  const f = poly(-0.25, 2, 0);
  estLaCourbe(7, "schema", 0, f);
  vrai("7. le modèle monte sur [0 ; 4] et descend sur [4 ; 7]", d(f, 2) > 0 && d(f, 6) < 0 && Math.abs(d(f, 4)) < 1e-6);
  annonce(7, "f'(4) = 0", d(f, 4), { eps: 1e-5 });
});
exercice(8, () => {
  const f = poly(0.5, 0, 0);
  estLaCourbe(8, "figure", 0, f);
  tangente(8, "figure", 1, f, -2);
  tangente(8, "figure", 2, f, 2);
  annonce(8, "f'(-2) = -2", d(f, -2), { eps: 1e-5 });
  annonce(8, "f'(0) = 0", d(f, 0), { eps: 1e-5 });
  annonce(8, "f'(2) = 2", d(f, 2), { eps: 1e-5 });
  vaut("8. aussi raide en A qu'en C", Math.abs(d(f, -2)), Math.abs(d(f, 2)), 1e-5);
});

/* ── ★★ ── */
exercice(9, () => {
  const h = poly(-1, 6, 0);
  estLaCourbe(9, "figure", 0, h, "h");
  tangente(9, "figure", 1, h, 1);
  tangente(9, "figure", 2, h, 2);
  annonce(9, "h'(1) = 4", d(h, 1), { eps: 1e-5 });
  annonce(9, "h'(2) = 2", d(h, 2), { eps: 1e-5 });
  vaut("9. h(1)", h(1), 5);
  vaut("9. h(2)", h(2), 8);
});
exercice(10, () => {
  const D = poly(0.5, 0, 0);
  estLaCourbe(10, "figure", 0, D, "d");
  tangente(10, "figure", 1, D, 2);
  annonce(10, "d'(2) = 2", d(D, 2), { eps: 1e-5 });
  annonce(10, "20 \\times 3{,}6 = 72", 20 * 3.6);
  vrai("10. plus raide en B", d(D, 4) > d(D, 2));
});
exercice(11, () => {
  const a = poly(-0.25, 2, 3);
  estLaCourbe(11, "figure", 0, a, "a");
  tangente(11, "figure", 1, a, 2);
  tangente(11, "figure", 2, a, 4);
  annonce(11, "a'(2) = 1", d(a, 2), { eps: 1e-5 });
  annonce(11, "a'(4) = 0", d(a, 4), { eps: 1e-5 });
  vaut("11. col à 700 m", a(4) * 100, 700);
  vaut("11. pente 10 %", (d(a, 2) * 100) / 1000, 0.1, 1e-5);
  vrai("11. a'(6) < 0", d(a, 6) < 0);
});
exercice(12, () => {
  const B = poly(-0.5, 5, -6.5);
  estLaCourbe(12, "schema", 0, B, "B");
  // Les tangentes décrites dans l'énoncé sont celles de la courbe du modèle.
  vaut("12. B(3) = 4", B(3), 4);
  vaut("12. B(5) = 6", B(5), 6);
  vaut("12. B(7) = 4", B(7), 4);
  annonce(12, "B'(3) = 2", pente([3, 4], [4, 6]));
  vaut("12. B'(3) du modèle", d(B, 3), 2, 1e-5);
  annonce(12, "B'(5) = 0", d(B, 5), { eps: 1e-5 });
  annonce(12, "B'(7) = -2", pente([7, 4], [8, 2]));
  vaut("12. B'(7) du modèle", d(B, 7), -2, 1e-5);
  tangente(12, "schema", 1, B, 3);
  tangente(12, "schema", 2, B, 5);
  tangente(12, "schema", 3, B, 7);
  dit(12, "$600$ euros");
});
exercice(13, () => {
  const h = poly(-0.5, 2, 2);
  estLaCourbe(13, "figure", 0, h, "h");
  tangente(13, "figure", 1, h, 0);
  tangente(13, "figure", 2, h, 4);
  annonce(13, "h'(0) = 2", d(h, 0), { eps: 1e-5 });
  annonce(13, "h'(4) = -2", d(h, 4), { eps: 1e-5 });
  annonce(13, "h'(2) = 0", d(h, 2), { eps: 1e-5 });
  vaut("13. sommet à 4 m", h(2), 4);
});
exercice(14, () => {
  const P = poly(0.25, -3, 11);
  estLaCourbe(14, "figure", 0, P, "P");
  tangente(14, "figure", 1, P, 2);
  tangente(14, "figure", 2, P, 6);
  annonce(14, "P'(2) = -2", d(P, 2), { eps: 1e-5 });
  annonce(14, "P'(6) = 0", d(P, 6), { eps: 1e-5 });
  vaut("14. 200 habitants en 1960", P(6) * 100, 200);
  vrai("14. P'(9) > 0", d(P, 9) > 0);
});
exercice(15, () => {
  const A = poly(-0.0625, 1, 3);
  const B = poly(0.125, 0, 1);
  estLaCourbe(15, "schema", 0, A, "la forêt A");
  estLaCourbe(15, "schema", 1, B, "la forêt B");
  tangente(15, "schema", 2, A, 4, "A");
  tangente(15, "schema", 3, B, 4, "B");
  annonce(15, "\\dfrac{7 - 6}{6 - 4} = 0{,}5", pente([4, 6], [6, 7]));
  vaut("15. pente A du modèle", d(A, 4), 0.5, 1e-5);
  vaut("15. pente B", pente([4, 3], [5, 4]), 1);
  vaut("15. pente B du modèle", d(B, 4), 1, 1e-5);
  vaut("15. (6 ; 7) sur la tangente de A", 0.5 * 6 + 4, 7);
});
exercice(16, () => {
  // Un modèle cohérent avec les trois mesures : T'(t) = −0,4 (t − 15).
  const Tp = (t) => -0.4 * (t - 15);
  vaut("16. T'(9)", Tp(9), 2.4);
  vaut("16. T'(15)", Tp(15), 0);
  vaut("16. T'(19)", Tp(19), -1.6);
  vrai("16. 9 h : le plus vite des trois", Math.abs(Tp(9)) > Math.abs(Tp(19)));
  F.signes.juste(16, { 0: "-0{,}4(t - 15)" });
});

/* ── ★★★ ── */
exercice(17, () => {
  const h = poly(-0.25, 1.5, 0, 2);
  estLaCourbe(17, "figure", 0, h, "h");
  tangente(17, "figure", 1, h, 2);
  tangente(17, "figure", 2, h, 4);
  annonce(17, "h'(2) = 3", d(h, 2), { eps: 1e-5 });
  annonce(17, "h'(4) = 0", d(h, 4), { eps: 1e-5 });
  vaut("17. A à 600 m", h(2) * 100, 600);
  vaut("17. sommet à 1 000 m", h(4) * 100, 1000);
  vrai("17. h' < 0 sur ]4 ; 6]", [4.5, 5, 5.5, 6].every((x) => d(h, x) < 0));
  vrai("17. de moins en moins raide de A à S", [2, 2.5, 3, 3.5, 4].every((x, i, t) => i === 0 || d(h, x) < d(h, t[i - 1])));
});
exercice(18, () => {
  const T = poly(0.125, -2, 10);
  estLaCourbe(18, "figure", 0, T, "T");
  tangente(18, "figure", 1, T, 0);
  tangente(18, "figure", 2, T, 4);
  tangente(18, "figure", 3, T, 8);
  annonce(18, "T'(0) = -2", d(T, 0), { eps: 1e-5 });
  annonce(18, "T'(4) = -1", d(T, 4), { eps: 1e-5 });
  annonce(18, "T'(8) = 0", d(T, 8), { eps: 1e-5 });
  vaut("18. 20 °C en C", T(8) * 10, 20);
  vrai("18. T' < 0 sur [0 ; 8[", [0, 1, 2, 3, 4, 5, 6, 7, 7.9].every((t) => d(T, t) < 0));
});
exercice(19, () => {
  const f = poly(0.5, -4.5, 12, 0);
  estLaCourbe(19, "figure", 0, f);
  tangente(19, "figure", 1, f, 2, "M");
  tangente(19, "figure", 2, f, 3, "C");
  tangente(19, "figure", 3, f, 4, "N");
  vaut("19. M : 1 000 visiteurs", f(2) * 100, 1000);
  vaut("19. N : 800 visiteurs", f(4) * 100, 800);
  annonce(19, "f'(3) = \\dfrac{-3}{2} = -1{,}5", d(f, 3), { eps: 1e-5 });
  vaut("19. (5 ; 6) sur la tangente en C", -1.5 * 5 + 13.5, 6);
  vrai("19. signes de f'", d(f, 1) > 0 && d(f, 3) < 0 && d(f, 4.5) > 0);
  vrai("19. personne à l'ouverture", f(0) === 0);
});
exercice(20, () => {
  annonce(20, "\\dfrac{6}{20} = 0{,}3", pente([60, 20], [80, 26]));
  annonce(20, "\\dfrac{7}{20} = 0{,}35", pente([60, 18], [80, 25]));
  annonce(20, "0{,}3 \\times 60 = 18", 0.3 * 60);
  annonce(20, "0{,}35 \\times 60 = 21", 0.35 * 60);
  annonce(20, "0{,}35 - 0{,}3 = 0{,}05", 0.35 - 0.3);
  annonce(20, "2 \\div 0{,}05 = 40", 2 / 0.05);
  vaut("20. Nadia encore en course à t = 100", 20 + 0.3 * 40 < 42.195 ? 1 : 0, 1);
  const [entete, ligne] = F.dessin(20, "schema", "tableau").args;
  entete.slice(1).forEach((t, i) => vaut(`20. avance à t = ${t}`, 20 + 0.3 * (t - 60) - (18 + 0.35 * (t - 60)), ligne[i + 1]));
});

F.fin("Lire un nombre dérivé sur un graphique (1re)");
