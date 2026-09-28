// Recalcul indépendant de la feuille « Les formules de base de la dérivée »
// (1re sans spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-der-formules.tsx
//
// Chaque dérivée écrite (« g'(x) = 4 », « A_2'(t) = 3t^2 ») est LUE et comparée
// au taux d'accroissement de la fonction de l'énoncé, en onze points ; chaque
// nombre dérivé annoncé est refait ; chaque tangente dessinée est testée ;
// chaque tableau relu case par case. Plus les règles de rendu et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-der-formules.mjs

import { ouvrir, d, poly } from "./verifier-exercices-premiere-der-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-der-formules.tsx", "der_formules");
const { exercice, estLaCourbe, tangente, annonce, derivee, dit, vaut, vrai, dessin } = F;
const carre = (x) => x * x;
const cube = (x) => x * x * x;
/** Le tableau de l'exercice k : chaque case de la ligne est G(entête). */
const tableauSuit = (k, role, G) => {
  const [entete, ligne] = dessin(k, role, "tableau").args;
  entete.slice(1).forEach((x, i) => vaut(`${k}. tableau, ${entete[0]} = ${x}`, G(Number(String(x).replace(",", "."))), ligne[i + 1], 1e-9));
};

/* ── ★ ── */
exercice(1, () => {
  for (const [g, val] of [["f'(x)", 2], ["g'(x)", -2], ["h'(x)", Math.SQRT2], ["k'(x)", 0]]) derivee(1, g, "0", () => val);
  estLaCourbe(1, "schema", 0, () => 2, "f");
  estLaCourbe(1, "schema", 1, () => -2, "g");
});
exercice(2, () => {
  derivee(2, "f'(x)", "1", (x) => x);
  derivee(2, "g'(x)", "4", (x) => 4 * x - 1);
  derivee(2, "h'(x)", "-1", (x) => -x + 5);
  derivee(2, "k'(x)", "0{,}5", (x) => 0.5 * x);
  estLaCourbe(2, "schema", 0, (x) => 4 * x - 1, "g");
  estLaCourbe(2, "schema", 1, (x) => -x + 5, "h");
});
exercice(3, () => {
  derivee(3, "f'(x)", "2x", carre);
  annonce(3, "f'(3) = 2 \\times 3 = 6", d(carre, 3), { eps: 1e-5 });
  annonce(3, "f'(-1) = 2 \\times (-1) = -2", d(carre, -1), { eps: 1e-5 });
  annonce(3, "f'(0) = 2 \\times 0 = 0", d(carre, 0), { eps: 1e-5 });
  estLaCourbe(3, "schema", 0, carre);
  tangente(3, "schema", 1, carre, -1);
  tangente(3, "schema", 2, carre, 1);
});
exercice(4, () => {
  derivee(4, "f'(x)", "3x^2", cube);
  annonce(4, "f'(2) = 3 \\times 2^2 = 3 \\times 4 = 12", d(cube, 2), { eps: 1e-5 });
  annonce(4, "f'(-2) = 3 \\times (-2)^2 = 3 \\times 4 = 12", d(cube, -2), { eps: 1e-5 });
  annonce(4, "f'(0) = 3 \\times 0^2 = 0", d(cube, 0), { eps: 1e-5 });
  estLaCourbe(4, "schema", 0, cube);
  tangente(4, "schema", 1, cube, 1);
  tangente(4, "schema", 2, cube, -1);
});
exercice(5, () => {
  // (A) 1, (B) 3x², (C) 0, (D) 2x : chaque association recalculée en x = 2.
  const derivees = { A: () => 1, B: (x) => 3 * x * x, C: () => 0, D: (x) => 2 * x };
  for (const [nom, fn, lettre] of [["f_1", carre, "D"], ["f_2", cube, "B"], ["f_3", (x) => x, "A"], ["f_4", () => 5, "C"]]) {
    vaut(`5. ${nom} → (${lettre})`, derivees[lettre](2), d(fn, 2), 1e-5);
    dit(5, `$${nom}$ va avec (${lettre})`);
  }
});
exercice(6, () => {
  vaut("6. (x²)' nulle en 0", d(carre, 0), 0, 1e-5);
  vaut("6. (x³)' nulle en 0", d(cube, 0), 0, 1e-5);
  vrai("6. le carré a un creux en 0", carre(-0.5) > 0 && carre(0.5) > 0);
  vrai("6. le cube monte avant et après 0 (pas d'extremum)", cube(-0.5) < 0 && cube(0.5) > 0);
  estLaCourbe(6, "schema", 0, cube);
  tangente(6, "schema", 1, cube, 0);
});
exercice(7, () => {
  derivee(7, "f'(x)", "-2", (x) => 3 - 2 * x);
  dit(7, "$f'(100) = -2$");
});
exercice(8, () => {
  annonce(8, "f'(1{,}5) = 2 \\times 1{,}5 = 3", d(carre, 1.5), { eps: 1e-5 });
  annonce(8, "1{,}5^2 = 2{,}25", carre(1.5));
});

/* ── ★★ ── */
exercice(9, () => derivee(9, "x'(t)", "80", (t) => 80 * t + 12, { variable: "t" }));
exercice(10, () => {
  derivee(10, "C'(x)", "0", () => 8);
  derivee(10, "D'(x)", "0{,}5", (x) => 0.5 * x + 4);
  estLaCourbe(10, "figure", 0, () => 8, "C");
  estLaCourbe(10, "figure", 1, (x) => 0.5 * x + 4, "D");
  vaut("10. croisement en 8", 0.5 * 8 + 4, 8);
  vrai("10. illimité meilleur après 8", 0.5 * 9 + 4 > 8 && 0.5 * 7 + 4 < 8);
});
exercice(11, () => {
  derivee(11, "A'(x)", "2x", carre);
  annonce(11, "A'(5) = 2 \\times 5 = 10", d(carre, 5), { eps: 1e-5 });
  annonce(11, "A(5{,}1) - A(5) = 26{,}01 - 25 = 1{,}01", carre(5.1) - carre(5), { eps: 1e-9 });
  annonce(11, "10 \\times 0{,}1 = 1", 1);
  vaut("11. deux bandes + le coin", 2 * 5 * 0.1 + 0.1 * 0.1, carre(5.1) - carre(5), 1e-9);
});
exercice(12, () => {
  derivee(12, "V'(x)", "3x^2", cube);
  annonce(12, "V'(2) = 3 \\times 2^2 = 12", d(cube, 2), { eps: 1e-5 });
  annonce(12, "12 \\times 0{,}1 = 1{,}2", 1.2);
  annonce(12, "V(2) - V(1{,}9) = 8 - 6{,}859 = 1{,}141", cube(2) - cube(1.9), { eps: 1e-9 });
  vrai("12. écart ≈ 0,06", Math.abs(1.2 - (cube(2) - cube(1.9)) - 0.06) < 0.005);
  estLaCourbe(12, "schema", 0, cube, "V");
  tangente(12, "schema", 1, cube, 2);
});
exercice(13, () => {
  derivee(13, "d'(t)", "2t", carre, { variable: "t" });
  annonce(13, "d'(5) = 10", d(carre, 5), { eps: 1e-5 });
  annonce(13, "d'(10) = 20", d(carre, 10), { eps: 1e-5 });
  annonce(13, "10 \\times 3{,}6 = 36", 36);
  annonce(13, "20 \\times 3{,}6 = 72", 72);
  annonce(13, "d(5) = 25", carre(5));
  annonce(13, "d(10) = 100", carre(10));
  tableauSuit(13, "schema", (t) => d(carre, t));
});
exercice(14, () => {
  derivee(14, "a'(x)", "0", () => 350);
  dit(14, "la dérivée vaut $0{,}08$");
  vaut("14. pente de la montée", d((x) => 0.08 * x + 350, 100), 0.08, 1e-5);
  vaut("14. 8 m pour 100 m", 0.08 * 100, 8, 1e-9);
});
exercice(15, () => {
  derivee(15, "P'(x)", "2", (x) => 2 * x + 4);
  annonce(15, "P(10) = 24", 2 * 10 + 4);
});
exercice(16, () => {
  derivee(16, "A_1'(t)", "2t", carre, { variable: "t" });
  derivee(16, "A_2'(t)", "3t^2", cube, { variable: "t" });
  annonce(16, "A_1'(0{,}5) = 2 \\times 0{,}5 = 1", d(carre, 0.5), { eps: 1e-5 });
  annonce(16, "A_2'(0{,}5) = 3 \\times 0{,}5^2 = 0{,}75", d(cube, 0.5), { eps: 1e-5 });
  annonce(16, "A_1'(2) = 2 \\times 2 = 4", d(carre, 2), { eps: 1e-5 });
  annonce(16, "A_2'(2) = 3 \\times 2^2 = 12", d(cube, 2), { eps: 1e-5 });
  vaut("16. trois fois plus vite", d(cube, 2) / d(carre, 2), 3, 1e-5);
  estLaCourbe(16, "figure", 0, carre, "A_1");
  estLaCourbe(16, "figure", 1, cube, "A_2");
  dit(16, "$4$ m² avec $A_1$", "$8$ m² avec $A_2$");
});

/* ── ★★★ ── */
exercice(17, () => {
  derivee(17, "d'(t)", "2t", carre, { variable: "t" });
  tableauSuit(17, "figure", carre);
  annonce(17, "d'(1) = 2", d(carre, 1), { eps: 1e-5 });
  annonce(17, "d'(2) = 4", d(carre, 2), { eps: 1e-5 });
  annonce(17, "d'(3) = 6", d(carre, 3), { eps: 1e-5 });
  annonce(17, "\\dfrac{4}{2} = 2", (carre(2) - carre(0)) / 2);
  dit(17, "$t = 5$ s");
  estLaCourbe(17, "schema", 0, carre, "d");
  tangente(17, "schema", 1, carre, 1);
  vaut("17. corde parallèle à la tangente", (carre(2) - carre(0)) / 2, d(carre, 1), 1e-5);
});
exercice(18, () => {
  const c = (t) => 2 * t + 1;
  derivee(18, "c'(t)", "2", c, { variable: "t" });
  derivee(18, "s'(t)", "2t", carre, { variable: "t" });
  annonce(18, "200 \\times 60 = 12\\,000", 12000);
  annonce(18, "c(3) = 7", c(3));
  annonce(18, "s(3) = 9", carre(3));
  annonce(18, "s'(3) = 6", d(carre, 3), { eps: 1e-5 });
  vaut("18. 6 hm/min = 36 km/h", (6 * 100 * 60) / 1000, 36);
  annonce(18, "s'(1) = 2 \\times 1 = 2", d(carre, 1), { eps: 1e-5 });
  annonce(18, "c(1) = 3", c(1));
  annonce(18, "s(1) = 1", carre(1));
  estLaCourbe(18, "figure", 0, carre, "s");
  estLaCourbe(18, "figure", 1, c, "c");
  tangente(18, "figure", 2, carre, 1);
});
exercice(19, () => {
  const s = (h) => (carre(3 + h) - carre(3)) / h;
  annonce(19, "\\dfrac{16 - 9}{1} = 7", s(1));
  annonce(19, "\\dfrac{9{,}61 - 9}{0{,}1} = 6{,}1", s(0.1));
  annonce(19, "\\dfrac{9{,}0601 - 9}{0{,}01} = 6{,}01", s(0.01));
  vaut("19. 3,1² = 9,61", carre(3.1), 9.61, 1e-9);
  vaut("19. 3,01² = 9,0601", carre(3.01), 9.0601, 1e-9);
  annonce(19, "\\dfrac{1{,}331 - 1}{0{,}1} = 3{,}31", (cube(1.1) - 1) / 0.1);
  vaut("19. 1,1³ = 1,331", cube(1.1), 1.331, 1e-9);
  annonce(19, "f'(3) = 6", d(carre, 3), { eps: 1e-5 });
  annonce(19, "g'(1) = 3 \\times 1^2 = 3", d(cube, 1), { eps: 1e-5 });
  tableauSuit(19, "schema", s);
});
exercice(20, () => {
  derivee(20, "A'(x)", "2x", carre);
  derivee(20, "L'(x)", "4", (x) => 4 * x);
  derivee(20, "P'(x)", "0", () => 150);
  annonce(20, "A'(10) = 20", d(carre, 10), { eps: 1e-5 });
  annonce(20, "A(11) - A(10) = 121 - 100 = 21", carre(11) - carre(10));
  annonce(20, "L'(10) = 4", 4);
  dit(20, "$x = 2$");
  estLaCourbe(20, "schema", 0, carre, "A");
  estLaCourbe(20, "schema", 1, (x) => 4 * x, "L");
  tangente(20, "schema", 2, carre, 2);
});

/* ── Les dessins d'appoint (28/09 au soir) ── */
const { courbe } = F;
const escalier = (k, i, A, B) => {
  const pts = dessin(k, "schema").args[1][i].pts;
  vrai(`${k}. escalier de (${A}) à (${B})`, JSON.stringify(pts) === JSON.stringify([A, [B[0], A[1]], B]), JSON.stringify(pts));
};
exercice(5, () => {
  const [entete, ligne] = dessin(5, "schema", "tableau").args;
  vrai("5. le tableau reprend les quatre associations", JSON.stringify(entete.slice(1)) === '["x²","x³","x","5"]' && JSON.stringify(ligne.slice(1)) === '["2x","3x²","1","0"]');
});
exercice(7, () => {
  estLaCourbe(7, "schema", 0, (x) => 3 - 2 * x);
  escalier(7, 1, [0, 3], [1, 1]);
  vaut("7. l'escalier descend de la pente", 1 - 3, d((x) => 3 - 2 * x, 0), 1e-5);
});
exercice(8, () => {
  estLaCourbe(8, "schema", 0, carre);
  tangente(8, "schema", 1, carre, 1.5);
  escalier(8, 2, [1.5, 2.25], [2.5, 5.25]);
  vaut("8. l'escalier arrive sur la tangente", courbe(8, "schema", 1)(2.5), 5.25);
});
exercice(9, () => tableauSuit(9, "schema", (t) => 80 * t + 12));
exercice(11, () => tableauSuit(11, "schema", carre));
exercice(14, () => tableauSuit(14, "schema", (x) => 0.08 * x + 350));
exercice(15, () => {
  estLaCourbe(15, "schema", 0, (x) => 2 * x + 4, "P");
  escalier(15, 1, [1, 6], [2, 8]);
});

F.fin("Les formules de base de la dérivée (1re)");
