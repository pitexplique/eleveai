// Recalcul indépendant de la feuille « Ajustement affine » de Tle STMG
// (22/10/2026) : lib/fiches-exercices/maths-stmg-stat-ajustement.tsx.
//
// ⭐ L'AUTRE CHEMIN : données relues dans les dessins ou l'énoncé ; chaque
// point moyen, coefficient directeur (deux points, ou G et a), ordonnée à
// l'origine, valeur calculée (y depuis x, x depuis y) est refait. Chaque droite
// présentée comme une BONNE droite au jugé est comparée à la vraie droite des
// moindres carrés (calculée ici, jamais lue) : pente à 10 % près et passage à
// moins de 2 % de l'étendue des y au point moyen. Les droites dessinées sont
// celles de l'énoncé. La pertinence est jugée par les hausses (même ordre ou
// non) et par le coefficient de corrélation.
// Socle : scripts/verifier-exercices-stmg-deux-variables-commun.mjs.
// Usage : node scripts/verifier-exercices-stmg-stat-ajustement.mjs

import { ouvrirStmg, moyenne, somme, tx, pl, hausses, plus, r, mc, arr } from "./verifier-exercices-stmg-deux-variables-commun.mjs";

const s = ouvrirStmg("lib/fiches-exercices/maths-stmg-stat-ajustement.tsx", "stat_ajustement");
const { vrai, verif, dit, enonceDit, dessin, essai, e, pointsDe, colonnes, listeEnonce, memes, fin } = s;

/** y = ax + b, écrit comme dans la feuille. */
const eq = (a, b) => `y = ${tx(a)}x ${b < 0 ? "-" : "+"} ${tx(Math.abs(b))}`;
/** La droite (a, b) est une bonne droite au jugé pour (xs, ys). */
const bonne = (k, xs, ys, a, b) => {
  const m = mc(xs, ys);
  const etendue = Math.max(...ys) - Math.min(...ys);
  vrai(`${k}. ${eq(a, b)} : pente proche des moindres carrés (${m.a.toFixed(3)})`, Math.abs(a - m.a) <= 0.1 * Math.abs(m.a));
  vrai(`${k}. ${eq(a, b)} : passe près de G`, Math.abs(a * m.mx + b - m.my) <= 0.02 * etendue);
};
const droitesDe = (k, role) => dessin("nuage", k, role)[2].droites;
/** « Les valeurs, de 1 à 7 tonnes : … » et autres listes de l'énoncé. */
const L = listeEnonce;
const ditMoy = (k, xs, d, nom) => dit(k, `\\bar{${nom}} = \\dfrac{${plus(xs)}}{${xs.length}}`);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ys = L(1, "de 1 à 7 tonnes");
  const [xs, fy] = pointsDe(1, "figure");
  vrai("1. la figure porte les valeurs de l'énoncé", memes(fy, ys));
  dit(1, hausses(ys).map((h, i) => `$${ys[i + 1]} - ${ys[i]} = ${h}$`).join(" ; "));
  vrai("1. hausses de 1 ou 2, presque alignés", hausses(ys).every((h) => h === 1 || h === 2) && r(xs, ys) > 0.99);
});
essai("2", () => {
  const ys = L(2, "pendant six mois");
  const [, fy] = pointsDe(2, "figure");
  vrai("2. la figure porte les valeurs de l'énoncé", memes(fy, ys));
  const h = hausses(ys);
  dit(2, h.map((v, i) => `$${ys[i + 1]} - ${ys[i]} = ${v}$`).join(" ; "));
  vrai("2. hausses croissantes", h.every((v, i) => i === 0 || v > h[i - 1]));
  dit(2, `de ${h[0]} à ${h.at(-1)}`);
});
essai("3", () => {
  const xs = L(3, "Températures"), ys = L(3, "Nuitées");
  const [fx, fy] = pointsDe(3, "figure");
  vrai("3. la figure porte les données", memes(fx, xs) && memes(fy, ys));
  const [d1, d2] = droitesDe(3, "figure");
  vrai("3. droites dessinées = énoncé", memes(d1, [1.4, -7.6]) && memes(d2, [1.4, -3]));
  enonceDit(3, `$${eq(...d1)}$`);
  enonceDit(3, `$${eq(...d2)}$`);
  ditMoy(3, xs, 0, "x");
  dit(3, `\\dfrac{${somme(xs)}}{7} = ${moyenne(xs)}$`);
  dit(3, `\\dfrac{${somme(ys)}}{7} \\approx ${tx(moyenne(ys), 2)}$`);
  dit(3, `$G(${moyenne(xs)} ; ${tx(moyenne(ys), 2)})$`);
  dit(3, `$d_1$ donne $1{,}4 \\times 20 - 7{,}6 = ${tx(1.4 * 20 - 7.6)}$ ; $d_2$ donne $1{,}4 \\times 20 - 3 = ${tx(1.4 * 20 - 3)}$`);
  bonne(3, xs, ys, ...d1);
  vrai("3. d2 : tous les points en dessous", xs.every((x, i) => ys[i] < d2[0] * x + d2[1]));
});
essai("4", () => {
  const [A, B] = [[2, 30], [8, 60]];
  enonceDit(4, `$A(${A[0]} ; ${A[1]})$ et $B(${B[0]} ; ${B[1]})$`);
  const a = (B[1] - A[1]) / (B[0] - A[0]), b = A[1] - a * A[0];
  dit(4, `$a = \\dfrac{${B[1]} - ${A[1]}}{${B[0]} - ${A[0]}} = \\dfrac{${B[1] - A[1]}}{${B[0] - A[0]}} = ${a}$`);
  dit(4, `$b = ${A[1]} - ${a * A[0]} = ${b}$`);
  dit(4, `$${eq(a, b)}$`);
  dit(4, `$${a} \\times ${B[0]} + ${b} = ${a * B[0] + b}$`);
  vrai("4. le schéma : la droite et A, B", memes(droitesDe(4, "schema")[0], [a, b]));
});
essai("5", () => {
  const [xs, ys] = pointsDe(5, "figure");
  const [a, b] = droitesDe(5, "figure")[0];
  enonceDit(5, `$${eq(a, b)}$`);
  bonne(5, xs, ys, a, b);
  dit(5, `$y = ${tx(a)} \\times 6 + ${b} = ${tx(a * 6)} + ${b} = ${tx(a * 6 + b)}$`);
  dit(5, `soit ${String(arr((a * 6 + b) * 1000)).replace(/\B(?=(\d{3})+$)/g, " ")} €`);
  dit(5, `$${tx(-a)} \\times 6 + ${b} = ${tx(-a * 6 + b)}$`);
  vrai("5. le schéma : même droite, lecture en 6", memes(droitesDe(5, "schema")[0], [a, b]) && dessin("nuage", 5, "schema")[2].lectures[0].x === 6);
});
essai("6", () => {
  const [a, b] = [4, 25];
  enonceDit(6, `$${eq(a, b)}$`);
  dit(6, `$y = ${a} \\times 3 + ${b} = ${a * 3} + ${b} = ${a * 3 + b}$`);
  dit(6, `$${a}x = 65 - ${b} = ${65 - b}$, donc $x = ${65 - b} \\div ${a} = ${(65 - b) / a}$`);
  vrai("6. rang 10 = octobre", (65 - b) / a === 10);
  dit(6, `$${a} \\times 65 + ${b} = ${a * 65 + b}$`);
  vrai("6. le schéma", memes(droitesDe(6, "schema")[0], [a, b]));
});
essai("7", () => {
  const xs = L(7, "Pas"), ys = L(7, "Perte");
  const [sx, sy] = pointsDe(7, "schema");
  vrai("7. le schéma porte les données", memes(sx, xs) && memes(sy, ys));
  const [d1, d2] = droitesDe(7, "schema");
  vrai("7. droites du schéma = énoncé", memes(d1, [0.6, -0.6]) && memes(d2, [0.5, 0.5]));
  dit(7, `\\dfrac{${somme(xs)}}{5} = ${moyenne(xs)}$`);
  dit(7, `\\dfrac{${somme(ys)}}{5} = ${moyenne(ys)}$`);
  dit(7, `$0{,}6 \\times 6 - 0{,}6 = ${tx(0.6 * 6 - 0.6)}$`);
  dit(7, `$0{,}5 \\times 6 + 0{,}5 = ${tx(0.5 * 6 + 0.5)}$`);
  bonne(7, xs, ys, ...d1);
});
essai("8", () => {
  const [xs, ys] = pointsDe(8, "figure");
  const [a, b] = droitesDe(8, "figure")[0];
  vrai("8. (0 ; 10) et (4 ; 30) sur la droite", b === 10 && a * 4 + b === 30);
  dit(8, `$a = \\dfrac{30 - 10}{4 - 0} = \\dfrac{20}{4} = ${a}$`);
  dit(8, `$${eq(a, b)}$`);
  bonne(8, xs, ys, a, b);
  vrai("8. aucun point rouge sur la droite", xs.every((x, i) => ys[i] !== a * x + b));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [an, ys] = colonnes(9);
  // ⭐ Données réelles : NOAA, Mauna Loa.
  vrai("9. NOAA 1960 → 2020", memes(ys, [316.9, 325.7, 338.8, 354.4, 369.7, 389.9, 414.2]));
  const xs = an.map((x) => (x - 1960) / 10);
  const [sx, sy] = pointsDe(9, "schema");
  vrai("9. le schéma porte les données", memes(sx, xs) && memes(sy, ys));
  dit(9, hausses(ys).map((h) => `$${tx(h, 1)}$`).join(" ; "));
  vrai("9. hausses globalement croissantes", hausses(ys).at(-1) > 2 * hausses(ys)[0]);
  const my = arr(moyenne(ys), 1);
  dit(9, `\\dfrac{${tx(somme(ys), 1)}}{7} \\approx ${tx(my)}$`);
  dit(9, `$G(3 ; ${tx(my)})$`);
  const a = arr((ys[6] - ys[0]) / 6, 1);
  dit(9, `$a = \\dfrac{${tx(ys[6])} - ${tx(ys[0])}}{6 - 0} = \\dfrac{${tx(ys[6] - ys[0], 1)}}{6} \\approx ${tx(a)}$`);
  dit(9, `$${eq(a, ys[0])}$`);
  const en3 = arr(a * 3 + ys[0], 6);
  dit(9, `$${tx(a)} \\times 3 + ${tx(ys[0])} = ${tx(en3)}$`);
  dit(9, `passe ${pl(arr(en3 - my, 1))} ppm au-dessus`);
  const b2 = arr(my - a * 3, 1);
  dit(9, `$b = ${tx(my)} - ${tx(a)} \\times 3 = ${tx(my)} - ${tx(a * 3, 1)} = ${tx(b2)}$`);
  dit(9, `$${eq(a, b2)}$`);
  const y6 = arr(a * 6 + b2, 1);
  dit(9, `$${tx(a)} \\times 6 + ${tx(b2)} = ${tx(y6)}$ ppm, contre ${pl(ys[6])} mesurés : ${pl(arr(ys[6] - y6, 1))} ppm`);
  bonne(9, xs, ys, a, b2);
  const [d1, d2] = droitesDe(9, "schema");
  vrai("9. le schéma : d' et d", memes(d1, [a, b2]) && memes(d2, [a, ys[0]]));
  vrai("9. G dessiné", memes(dessin("nuage", 9, "schema")[2].moyen, [3, my]));
});
essai("10", () => {
  const xs = L(10, "Ventes"), ys = L(10, "Appels");
  const [fx, fy] = pointsDe(10, "figure");
  vrai("10. la figure porte les données", memes(fx, xs) && memes(fy, ys));
  const iS = dessin("nuage", 10, "figure")[1].findIndex((p) => p.label === "S");
  dit(10, `$S(${xs[iS]} ; ${ys[iS]})$`);
  const X = xs.filter((_, i) => i !== iS), Y = ys.filter((_, i) => i !== iS);
  vrai("10. sans S, presque alignés ; avec, non", r(X, Y) > 0.98 && r(xs, ys) < 0.9);
  dit(10, `\\dfrac{${plus(X)}}{6} = \\dfrac{${somme(X)}}{6} = ${moyenne(X)}$`);
  dit(10, `\\dfrac{${plus(Y)}}{6} = \\dfrac{${somme(Y)}}{6} = ${moyenne(Y)}$`);
  const b = arr(moyenne(Y) - 1.7 * moyenne(X), 6);
  dit(10, `$b = ${moyenne(Y)} - 1{,}7 \\times ${moyenne(X)} = ${moyenne(Y)} - ${tx(1.7 * moyenne(X))} = ${tx(b)}$`);
  bonne(10, X, Y, 1.7, b);
  dit(10, `$y = 1{,}7 \\times 9 + ${tx(b)} = ${tx(1.7 * 9 + b)}$ dizaines, soit environ ${arr((1.7 * 9 + b) * 10)} appels`);
  dit(10, `$\\bar{y} \\approx ${tx(moyenne(ys), 1)}$`);
});
essai("11", () => {
  const xs = L(11, "Distance"), ys = L(11, "Prix");
  const [sx, sy] = pointsDe(11, "schema");
  vrai("11. le schéma porte les données", memes(sx, xs) && memes(sy, ys));
  const [a, b] = [9, 17];
  vrai("11. droite du schéma", memes(droitesDe(11, "schema")[0], [a, b]));
  dit(11, `\\dfrac{${somme(ys)}}{7} = ${moyenne(ys)}$`);
  dit(11, `$9 \\times 5 + 17 = ${a * 5 + b}$`);
  const pred = xs.map((x) => a * x + b);
  dit(11, `La droite donne ${pred.slice(0, -1).join(", ")} et ${pred.at(-1)}`);
  const sur = ys.filter((y, i) => y === pred[i]).length, dessous = ys.filter((y, i) => y < pred[i]), dessus = ys.filter((y, i) => y > pred[i]);
  dit(11, `${sur} points sur la droite, ${dessous.length} en dessous (${dessous.join(" et ")}), ${dessus.length} au-dessus (${dessus.join(" et ")})`);
  dit(11, `$y = 9 \\times 5{,}5 + 17 = ${tx(a * 5.5 + b)}$ €`);
  bonne(11, xs, ys, a, b);
});
essai("12", () => {
  const xs = L(12, "Factures"), ys = L(12, "Heures");
  const [fx, fy] = pointsDe(12, "figure");
  vrai("12. la figure porte les données", memes(fx, xs) && memes(fy, ys));
  const [d1, d2] = droitesDe(12, "figure");
  vrai("12. droites = énoncé", memes(d1, [2.8, 5.2]) && memes(d2, [2, 9]));
  dit(12, `\\dfrac{${somme(ys)}}{6} = ${moyenne(ys)}$. Donc $G(${tx(moyenne(xs))} ; ${moyenne(ys)})$`);
  dit(12, `$2{,}8 \\times 3{,}5 + 5{,}2 = ${tx(2.8 * 3.5)} + 5{,}2 = ${tx(2.8 * 3.5 + 5.2)}$`);
  dit(12, `$2 \\times 3{,}5 + 9 = ${2 * 3.5 + 9}$`);
  dit(12, `$2 \\times 1 + 9 = ${2 + 9}$ heures au lieu de ${ys[0]}`);
  dit(12, `$2 \\times 6 + 9 = ${12 + 9}$ au lieu de ${ys[5]}`);
  dit(12, `$y = 2{,}8 \\times 4{,}5 + 5{,}2 = ${tx(2.8 * 4.5)} + 5{,}2 = ${tx(2.8 * 4.5 + 5.2)}$ heures`);
  bonne(12, xs, ys, ...d1);
  vrai("12. Tom : pente trop faible", d2[0] < 0.9 * mc(xs, ys).a);
});
essai("13", () => {
  const [G, P] = [[22, 45], [30, 61]];
  const a = (P[1] - G[1]) / (P[0] - G[0]), b = G[1] - a * G[0];
  dit(13, `$a = \\dfrac{${P[1]} - ${G[1]}}{${P[0]} - ${G[0]}} = \\dfrac{${P[1] - G[1]}}{${P[0] - G[0]}} = ${a}$`);
  dit(13, `$b = ${G[1]} - ${a * G[0]} = ${b}$. Donc $${eq(a, b)}$`);
  dit(13, `$y = ${a} \\times 26 + ${b} = ${a * 26 + b}$ hectolitres`);
  dit(13, `$x = ${40 - b} \\div ${a} = ${tx((40 - b) / a)}$ °C`);
  const [, pts, o] = dessin("nuage", 13, "schema");
  vrai("13. le schéma : P, G et la droite", memes([pts[0].x, pts[0].y], P) && memes(o.moyen, G) && memes(o.droites[0], [a, b]));
});
essai("14", () => {
  const [a, b] = [6.5, 20];
  dit(14, `$y = 6{,}5 \\times 12 + 20 = ${a * 12} + 20 = ${a * 12 + b}$ €`);
  dit(14, `$6{,}5x = ${150 - b}$, donc $x = ${150 - b} \\div 6{,}5 = ${(150 - b) / a}$ m²`);
  dit(14, `$6{,}5 \\times 15 + 20 = ${tx(a * 15 + b)}$ €`);
  dit(14, `$${tx(a * 15 + b)} - 100 = ${tx(a * 15 + b - 100)}$ €`);
  vrai("14. le schéma", memes(droitesDe(14, "schema")[0], [a, b]));
});
essai("15", () => {
  const [xs, ys] = pointsDe(15, "figure");
  const [a, b] = droitesDe(15, "figure")[0];
  vrai("15. (0 ; 80) et (10 ; 30) sur la droite", b === 80 && a * 10 + b === 30);
  dit(15, `$${eq(a, b)}$`);
  bonne(15, xs, ys, a, b);
  dit(15, `$y = -5 \\times 12 + 80 = -60 + 80 = ${a * 12 + b}$ kilotonnes`);
  vrai("15. sous 50 à partir du rang 7", (50 - b) / a === 6);
});
essai("16", () => {
  const [a, b] = [-12, 450];
  dit(16, `$y = -12 \\times 20 + 450 = -240 + 450 = ${a * 20 + b}$`);
  dit(16, `$-12x = ${300 - b}$, donc $x = ${tx((300 - b) / a)}$`);
  dit(16, `$y = -12 \\times 40 + 450 = -480 + 450 = ${a * 40 + b}$ kWh`);
  vrai("16. le schéma", memes(droitesDe(16, "schema")[0], [a, b]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [xs, ys] = colonnes(17);
  const [sx, sy] = pointsDe(17, "schema");
  vrai("17. le schéma porte les données", memes(sx, xs) && memes(sy, ys));
  const [mx, my] = [arr(moyenne(xs), 1), arr(moyenne(ys), 1)];
  dit(17, `\\dfrac{${somme(xs)}}{7} \\approx ${tx(mx)}$`);
  dit(17, `\\dfrac{${somme(ys)}}{7} \\approx ${tx(my)}$`);
  const b = my - 2.5 * mx;
  dit(17, `$b = ${tx(my)} - 2{,}5 \\times ${tx(mx)} = ${tx(my)} - ${tx(2.5 * mx)} = ${tx(b)}$, soit environ ${arr(b)}`);
  bonne(17, xs, ys, 2.5, arr(b));
  dit(17, `$y = 2{,}5 \\times 26 + 25 = 65 + 25 = ${2.5 * 26 + 25}$ repas`);
  dit(17, `$2{,}5x = ${95 - 25}$, donc $x = ${95 - 25} \\div 2{,}5 = ${(95 - 25) / 2.5}$ °C`);
  dit(17, `$${tx(my)} - ${tx(2.5 * arr(mx))} = ${tx(my - 2.5 * arr(mx))}$`);
});
essai("18", () => {
  const [xs, ys] = colonnes(18);
  const [sx, sy] = pointsDe(18, "schema");
  vrai("18. le schéma porte les données", memes(sx, xs) && memes(sy, ys));
  dit(18, `\\dfrac{${somme(xs)}}{6} \\approx ${tx(moyenne(xs), 1)}$`);
  dit(18, `\\dfrac{${somme(ys)}}{6} \\approx ${tx(moyenne(ys), 1)}$`);
  const b = moyenne(ys) - 40 * moyenne(xs);
  vrai("18. b = 5 exactement", Math.abs(b - 5) < 1e-9 && somme(ys) - 40 * somme(xs) === 30);
  dit(18, `\\dfrac{${somme(ys)} - ${40 * somme(xs)}}{6} = 5$`);
  bonne(18, xs, ys, 40, 5);
  dit(18, `$y = 40 \\times 35 + 5 = ${40 * 35 + 5}$ k€`);
  dit(18, `$40x = ${1300 - 5}$, donc $x = ${1300 - 5} \\div 40 = ${tx((1300 - 5) / 40)}$`);
  dit(18, `$${tx(moyenne(ys), 1)} - 40 \\times ${tx(moyenne(xs), 1)} = ${tx(arr(moyenne(ys), 1) - 40 * arr(moyenne(xs), 1), 1)}$`);
});
essai("19", () => {
  const xs = L(19, "Artistes"), ys = L(19, "Spectateurs");
  const [fx, fy] = pointsDe(19, "figure");
  vrai("19. la figure porte les données", memes(fx, xs) && memes(fy, ys));
  dit(19, `\\dfrac{${somme(ys)}}{6} \\approx ${tx(moyenne(ys), 1)}$. Donc $G(${moyenne(xs)} ; ${tx(moyenne(ys), 1)})$`);
  const a = (ys.at(-1) - ys[0]) / (xs.at(-1) - xs[0]), b = arr(ys[0] - a * xs[0], 6);
  dit(19, `$a = \\dfrac{${ys.at(-1)} - ${ys[0]}}{${xs.at(-1)} - ${xs[0]}} = \\dfrac{${ys.at(-1) - ys[0]}}{${xs.at(-1) - xs[0]}} = ${tx(a)}$`);
  dit(19, `$${eq(a, b)}$`);
  dit(19, `$1{,}6 \\times 9 + 2{,}6 = ${tx(a * 9 + b)}$, à $${tx(arr(moyenne(ys), 1) - (a * 9 + b), 1)}$ de`);
  bonne(19, xs, ys, a, b);
  dit(19, `$y = 1{,}6 \\times 16 + 2{,}6 = ${tx(a * 16 + b)}$ milliers`);
  dit(19, `$1{,}6x = ${tx(20 - b)}$, donc $x = ${tx(20 - b)} \\div 1{,}6 = ${tx((20 - b) / a)}$`);
  vrai("19. le schéma", memes(droitesDe(19, "schema")[0], [a, b]));
});
essai("20", () => {
  const [xs, ys] = colonnes(20);
  const h = hausses(ys);
  dit(20, h.map((v, i) => `$${ys[i + 1]} - ${ys[i]} = ${v}$`).join(" ; "));
  const a = (ys.at(-1) - ys[0]) / (xs.at(-1) - xs[0]), b = ys[0] - a * xs[0];
  dit(20, `$a = \\dfrac{${ys.at(-1)} - ${ys[0]}}{${xs.at(-1)} - ${xs[0]}} = \\dfrac{${ys.at(-1) - ys[0]}}{${xs.at(-1) - xs[0]}} = ${tx(a)}$`);
  dit(20, `$b = ${ys[0]} - ${tx(a)} \\times ${xs[0]} = ${ys[0]} - ${tx(a * xs[0])} = ${tx(b)}$`);
  dit(20, `$y = 0{,}175 \\times 90 + 3{,}25 = ${tx(a * 90)} + 3{,}25 = ${tx(a * 90 + b)}$ kWh, contre ${ys[2]}`);
  dit(20, `\\dfrac{${somme(ys)}}{5} = ${moyenne(ys)}$`);
  vrai("20. la droite des extrêmes n'est pas une bonne droite", Math.abs(a * moyenne(xs) + b - moyenne(ys)) >= 1);
  vrai("20. hausses croissantes", h.every((v, i) => i === 0 || v > h[i - 1]));
  vrai("20. le schéma", memes(droitesDe(20, "schema")[0], [a, b]));
});

fin();
