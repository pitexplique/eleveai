// Recalcul indépendant de la feuille « La méthode des moindres carrés » de Tle
// STMG (22/10/2026) : lib/fiches-exercices/maths-stmg-stat-moindres-carres.tsx.
//
// ⭐ L'AUTRE CHEMIN : données relues dans les dessins ou l'énoncé. Pour chaque
// droite testée, le script refait la valeur de la droite en chaque x, chaque
// écart (observé − droite), chaque carré et leur somme, et les cherche dans le
// corrigé. Chaque droite « de la calculatrice » ou « du tableur » est
// RECALCULÉE par les moindres carrés (a = cov ÷ var, b = ȳ − a x̄) et comparée
// aux coefficients arrondis annoncés (tolérance : un demi-cran de l'arrondi).
// Chaque comparaison (« la plus petite somme ») et chaque affirmation (« elle
// ne passe par aucun point », « aucune droite ne fait mieux ») est vérifiée.
// Socle : scripts/verifier-exercices-stmg-deux-variables-commun.mjs.
// Usage : node scripts/verifier-exercices-stmg-stat-moindres-carres.mjs

import { ouvrirStmg, moyenne, somme, tx, pl, plus, mc, sce, arr } from "./verifier-exercices-stmg-deux-variables-commun.mjs";

const s = ouvrirStmg("lib/fiches-exercices/maths-stmg-stat-moindres-carres.tsx", "stat_moindres_carres");
const { vrai, dit, enonceDit, dessin, essai, c, pointsDe, colonnes, listeEnonce: L, memes, fin } = s;

/** Le corrigé de k contient AU MOINS un des morceaux. */
const ditUn = (k, morceaux, nom) => vrai(`${k}. le corrigé écrit ${nom ?? `« ${morceaux[0]} »`}`, morceaux.some((m) => c(k).includes(m)), morceaux.join(" | "));
const liste = (xs) => xs.map((x) => `$${tx(x)}$`).join(" ; ");
const listePlate = (xs) => `${xs.slice(0, -1).map((x) => pl(x)).join(", ")}, ${pl(xs.at(-1))}`;
/** Le tableau des écarts de la droite (a, b) : valeurs, écarts, somme des carrés. */
function ecarts(k, xs, ys, a, b, { valeurs = true, carres = false, listeEcarts = true, total = true } = {}) {
  const p = xs.map((x) => arr(a * x + b, 6));
  const e = ys.map((y, i) => arr(y - p[i], 6));
  const S = arr(somme(e.map((v) => v * v)), 6);
  vrai(`${k}. somme des carrés (${a} ; ${b}) = ${S}`, Math.abs(S - sce(xs, ys, a, b)) < 1e-6);
  if (valeurs) ditUn(k, [liste(p), listePlate(p)], `les valeurs de y = ${a}x + ${b} : ${p.join(", ")}`);
  if (listeEcarts) ditUn(k, [liste(e), listePlate(e)], `les écarts ${e.join(", ")}`);
  if (carres) ditUn(k, [liste(e.map((v) => arr(v * v, 6))), listePlate(e.map((v) => arr(v * v, 6))), e.map((v) => tx(v * v)).join(" + ")], `les carrés`);
  if (total) ditUn(k, [`$${tx(S)}$`, ` ${pl(S)}.`, ` ${pl(S)} `, `= ${tx(S)}$`, `Somme : ${pl(S)}`, `Somme : ${String(S).replace(/\B(?=(\d{3})+$)/g, " ")}`], `la somme ${S}`);
  return S;
}
/** La droite annoncée (a, b), arrondie à d décimales, est celle des moindres carrés. */
function calculatrice(k, xs, ys, a, b, d) {
  const m = mc(xs, ys);
  vrai(`${k}. calculatrice : a = ${a} (moindres carrés ${m.a.toFixed(5)})`, Math.abs(m.a - a) <= 0.5 * 10 ** -d + 1e-9);
  vrai(`${k}. calculatrice : b = ${b} (moindres carrés ${m.b.toFixed(5)})`, Math.abs(m.b - b) <= 0.5 * 10 ** -d + 1e-9);
  return m;
}
const droitesDe = (k, role) => dessin("nuage", k, role)[2].droites;

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [xs, ys] = pointsDe(1, "figure");
  const [[a, b]] = droitesDe(1, "figure");
  calculatrice(1, xs, ys, a, b, 1);
  vrai("1. écarts dessinés", dessin("nuage", 1, "figure")[2].ecarts === true);
  vrai("1. des écarts des deux signes", ys.some((y, i) => y > a * xs[i] + b) && ys.some((y, i) => y < a * xs[i] + b));
});
essai("2", () => {
  const xs = L(2, "Épisodes"), ys = L(2, "Écoutes");
  vrai("2. le schéma porte les données", memes(pointsDe(2, "schema")[1], ys) && memes(pointsDe(2, "schema")[0], xs));
  dit(2, xs.map((x) => `$5 \\times ${x} + 8 = ${5 * x + 8}$`).join(" ; "));
  dit(2, ys.map((y, i) => `$${y} - ${5 * xs[i] + 8} = ${y - 5 * xs[i] - 8}$`).join(" ; "));
  const S = ecarts(2, xs, ys, 5, 8, { valeurs: false, listeEcarts: false });
  dit(2, `la somme des carrés des écarts vaut ${S}`);
});
essai("3", () => {
  const [xs, ys] = colonnes(3);
  const S = ecarts(3, xs, ys, -2, 30, { valeurs: false, listeEcarts: false });
  xs.forEach((x, i) => dit(3, `Pour ${x} € : $-2 \\times ${x} + 30 = ${-2 * x + 30}$, écart $${ys[i]} - ${-2 * x + 30} = ${ys[i] + 2 * x - 30}$`));
  dit(3, `la somme des carrés des écarts vaut ${S}`);
  const [, lignes] = dessin("grille", 3, "schema");
  vrai("3. le tableau du schéma", lignes.every((l, i) => l[2] === -2 * xs[i] + 30 && String(l[3]).replace("−", "-") === String(ys[i] + 2 * xs[i] - 30)));
});
essai("4", () => {
  const xs = L(4, "Minutes"), ys = L(4, "Points");
  calculatrice(4, xs, ys, 3.2, 1.4, 1);
  vrai("4. SCE(d1) = 4", arr(sce(xs, ys, 3, 2), 6) === 4);
  vrai("4. SCE(d2) = 3,6", arr(sce(xs, ys, 3.2, 1.4), 6) === 3.6);
  enonceDit(4, "somme des carrés des écarts : 3,6");
  dit(4, "aucune droite ne fait mieux que 3,6");
  vrai("4. le schéma porte les données et les droites", memes(pointsDe(4, "schema")[1], ys) && memes(droitesDe(4, "schema").flat(), [3.2, 1.4, 3, 2]));
});
essai("5", () => {
  const xs = L(5, "Semaine"), ys = L(5, "Missions");
  calculatrice(5, xs, ys, 1.5, 4, 6);
  dit(5, `\\dfrac{${somme(xs)}}{5} = ${moyenne(xs)}$ et $\\bar{y} = \\dfrac{${plus(ys)}}{5} = \\dfrac{${somme(ys)}}{5} = ${moyenne(ys)}$`);
  dit(5, `$1{,}5 \\times 6 + 4 = 9 + 4 = ${1.5 * 6 + 4}$`);
  dit(5, `$(${xs[2]} ; ${ys[2]})$`);
  vrai("5. le point du milieu n'est pas G", ys[2] !== moyenne(ys));
});
essai("6", () => {
  const [xs, ys] = colonnes(6);
  const m = calculatrice(6, xs, ys, 2.11, 7.08, 2);
  enonceDit(6, `$G(5{,}5 ; ${tx(m.my, 2)})$`);
  vrai("6. x̄ = 5,5", m.mx === 5.5);
  dit(6, `$y = 2{,}11 \\times 7 + 7{,}08 = ${tx(2.11 * 7)} + 7{,}08 = ${tx(2.11 * 7 + 7.08)}$ milliers`);
  dit(6, `$2{,}11 \\times 5{,}5 + 7{,}08 = ${tx(2.11 * 5.5)} + 7{,}08 = ${tx(2.11 * 5.5 + 7.08)}$, soit environ $${tx(2.11 * 5.5 + 7.08, 2)}$`);
});
essai("7", () => {
  const pts = [[1, 13], [2, 15], [3, 15], [4, 18]];
  enonceDit(7, pts.map(([x, y]) => `$(${x} ; ${y})$`).join(", "));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const e1 = ys.map((y, i) => arr(y - (0.5 * xs[i] + 14), 6)), e2 = ys.map((y, i) => arr(y - (2 * xs[i] + 10), 6));
  dit(7, `Écarts : ${liste(e1)}. Somme : $${tx(somme(e1))}$`);
  dit(7, `Écarts : ${liste(e2)}. Somme : $${tx(somme(e2))}$`);
  const [S1, S2] = [sce(xs, ys, 0.5, 14), sce(xs, ys, 2, 10)];
  dit(7, `$d_1$ : $${e1.map((v) => tx(v * v)).join(" + ")} = ${tx(S1)}$`);
  dit(7, `$d_2$ : $${e2.map((v) => tx(v * v)).join(" + ")} = ${tx(S2)}$`);
  vrai("7. somme des écarts de d1 nulle, mais d2 meilleure", arr(somme(e1), 6) === 0 && S2 < S1);
  vrai("7. le schéma", memes(pointsDe(7, "schema")[1], ys) && memes(droitesDe(7, "schema").flat(), [2, 10, 0.5, 14]));
});
essai("8", () => {
  const [xs, ys] = pointsDe(8, "figure");
  const [[a, b]] = droitesDe(8, "figure");
  dit(8, xs.map((x) => `$(${x} ; ${a * x + b})$`).join(", ").replace(/, (\$\(5)/, " et $1"));
  const e = ys.map((y, i) => y - (a * xs[i] + b));
  dit(8, `Réponse : a) ${liste(e)} ; b) ${somme(e.map((v) => v * v))}.`);
  dit(8, "au milieu, entre 4 et 6 : 5");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const xs = L(9, "Visites"), ys = L(9, "Commandes");
  vrai("9. la figure porte les données", memes(pointsDe(9, "figure")[1], ys));
  vrai("9. droites dessinées", memes(droitesDe(9, "figure").flat(), [1.8, 1.2, 2, 1]));
  const S1 = ecarts(9, xs, ys, 2, 1, { carres: true });
  const S2 = ecarts(9, xs, ys, 1.8, 1.2, { carres: true });
  calculatrice(9, xs, ys, 1.8, 1.2, 6);
  vrai("9. d2 meilleure", S2 < S1);
});
essai("10", () => {
  const ys = L(10, "Commandes");
  const xs = ys.map((_, i) => i + 1);
  vrai("10. la figure porte les données", memes(pointsDe(10, "figure")[1], ys));
  calculatrice(10, xs.slice(0, 5), ys.slice(0, 5), 2.2, 7.8, 6);
  calculatrice(10, xs, ys, 4.91, 1.47, 2);
  dit(10, `$2{,}2 \\times 4 + 7{,}8 = ${tx(2.2 * 4 + 7.8)}$ centaines. Avec $B$ : $4{,}91 \\times 4 + 1{,}47 = ${tx(4.91 * 4 + 1.47)}$`);
  dit(10, `On a observé ${ys[3]}`);
  const p6 = 2.2 * 6 + 7.8;
  dit(10, `$2{,}2 \\times 6 + 7{,}8 = ${tx(p6)}$ centaines en semaine 6 : $B$ est $${ys[5]} - ${tx(p6)} = ${tx(ys[5] - p6)}$ centaines au-dessus, et $${tx(ys[5] - p6)}^2 = ${tx((ys[5] - p6) ** 2)}$`);
  const autres = sce(xs.slice(0, 5), ys.slice(0, 5), 2.2, 7.8);
  vrai("10. le carré de B dépasse tous les autres réunis", (ys[5] - p6) ** 2 > autres);
});
essai("11", () => {
  const [xs, ys] = colonnes(11);
  calculatrice(11, xs, ys, -2.7, 79, 6);
  const S1 = ecarts(11, xs, ys, -2.7, 79, { carres: true });
  const S2 = ecarts(11, xs, ys, -2.5, 76);
  vrai("11. d1 meilleure", S1 < S2);
  dit(11, `$-2{,}7 \\times 12 + 79 = ${tx(-2.7 * 12)} + 79 = ${tx(-2.7 * 12 + 79)}$`);
  const [, lignes] = dessin("grille", 11, "schema");
  vrai("11. le tableau du schéma", lignes.every((l, i) => Math.abs(l[2] - (-2.7 * xs[i] + 79)) < 1e-9 && Math.abs(Number(String(l[3]).replace("−", "-").replace(",", ".")) - (ys[i] - (-2.7 * xs[i] + 79))) < 1e-9 && Math.abs(l[4] - (ys[i] - (-2.7 * xs[i] + 79)) ** 2) < 1e-9));
});
essai("12", () => {
  const [xs, ys] = pointsDe(12, "figure");
  const [[a, b]] = droitesDe(12, "figure");
  const m = calculatrice(12, xs, ys, a, b, 6);
  vrai("12. G dessiné", memes(dessin("nuage", 12, "figure")[2].moyen, [m.mx, arr(m.my, 6)]));
  dit(12, `$0{,}8 \\times 3 + 1{,}8 = 2{,}4 + 1{,}8 = ${tx(a * 3 + b)}$`);
  ecarts(12, xs, ys, a, b, { total: false });
  vrai("12. b) faux : aucun point sur la droite", xs.every((x, i) => Math.abs(ys[i] - (a * x + b)) > 1e-9));
});
essai("13", () => {
  const [xs, ys] = colonnes(13);
  const m = calculatrice(13, xs, ys, 0.192, 0.22, 6);
  dit(13, `\\dfrac{${tx(somme(ys), 1)}}{5} = ${tx(m.my)}$`);
  dit(13, `$0{,}192 \\times 20 + 0{,}22 = ${tx(0.192 * 20)} + 0{,}22 = ${tx(0.192 * 20 + 0.22)}$`);
  ecarts(13, xs, ys, 0.192, 0.22, { carres: true });
  dit(13, `soit ${arr(0.192 * 1000)} kg pour 1 000 km : ${arr(0.192 * 1000)} grammes par kilomètre`);
});
essai("14", () => {
  const xs = L(14, "Budget"), ys = L(14, "Ventes");
  const m = calculatrice(14, xs, ys, 1.15, 4.3, 6);
  enonceDit(14, `somme des carrés des écarts : $${tx(sce(xs, ys, m.a, m.b), 6)}$`);
  const a1 = (ys.at(-1) - ys[0]) / (xs.at(-1) - xs[0]), b1 = ys[0] - a1 * xs[0];
  enonceDit(14, `$y = ${tx(a1)}x + ${tx(b1)}$`);
  const S1 = ecarts(14, xs, ys, a1, b1, { carres: true });
  vrai("14. d2 meilleure, 1,5 impossible", sce(xs, ys, m.a, m.b) < S1 && sce(xs, ys, m.a, m.b) > 1.5);
  vrai("14. le schéma", memes(pointsDe(14, "schema")[1], ys) && memes(droitesDe(14, "schema").flat(), [1.15, 4.3, a1, b1]));
});
essai("15", () => {
  const xs = L(15, "Heures"), ys = L(15, "Temps");
  calculatrice(15, xs, ys, -11, 300, 6);
  ecarts(15, xs, ys, -11, 300, { carres: false });
  dit(15, `\\dfrac{${somme(ys)}}{5} = ${moyenne(ys)}$`);
  ecarts(15, xs, ys, 0, moyenne(ys), { valeurs: false });
  dit(15, `Carrés : ${ys.map((y) => (y - moyenne(ys)) ** 2).join(", ")}`);
  vrai("15. le schéma", memes(droitesDe(15, "schema").flat(), [-11, 300, 0, moyenne(ys)]));
});
essai("16", () => {
  const xs = L(16, "Surface"), ys = L(16, "Prix");
  vrai("16. la figure porte les données", memes(pointsDe(16, "figure")[1], ys));
  const m = calculatrice(16, xs, ys, 1.9, 3.6, 6);
  enonceDit(16, `$G(${m.mx} ; ${tx(m.my)})$`);
  vrai("16. les deux droites passent par G", Math.abs(1.9 * m.mx + 3.6 - m.my) < 1e-9 && Math.abs(2 * m.mx + 2.6 - m.my) < 1e-9);
  const S1 = ecarts(16, xs, ys, 1.9, 3.6, { carres: true });
  const S2 = ecarts(16, xs, ys, 2, 2.6, { carres: true });
  vrai("16. d1 meilleure", S1 < S2);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [an, ys] = colonnes(17);
  // ⭐ Données réelles : abonnés payants Spotify (millions).
  vrai("17. Spotify 2017 → 2024", memes(ys, [71, 96, 124, 155, 180, 205, 236, 263]) && an[0] === 2017);
  const xs = an.map((_, i) => i + 1);
  const m = calculatrice(17, xs, ys, 27.52, 42.39, 2);
  dit(17, `\\dfrac{${plus(ys)}}{8} = \\dfrac{${somme(ys)}}{8} = ${tx(m.my)}$`);
  const g = 27.52 * 4.5 + 42.39;
  dit(17, `$27{,}52 \\times 4{,}5 + 42{,}39 = ${tx(27.52 * 4.5)} + 42{,}39 = ${tx(g)}$, à $${tx(m.my - g)}$`);
  const p4 = 27.52 * 4 + 42.39;
  dit(17, `$27{,}52 \\times 4 + 42{,}39 = ${tx(p4)}$. Écart : $${ys[3]} - ${tx(p4)} = ${tx(ys[3] - p4)}$`);
  const a1 = (ys.at(-1) - ys[0]) / 7, b1 = ys[0] - a1;
  dit(17, `\\approx ${tx(a1, 2)}$ et $b = ${ys[0]} - \\dfrac{192}{7} \\approx ${tx(b1, 2)}$`);
  const [Smc, S1] = [sce(xs, ys, m.a, m.b), sce(xs, ys, a1, b1)];
  enonceDit(17, `d'environ ${S1.toFixed(1).replace(".", ",")}, contre ${Smc.toFixed(1).replace(".", ",")} pour celle de la calculatrice`);
  vrai("17. 192 ÷ 7", ys.at(-1) - ys[0] === 192);
});
essai("18", () => {
  const [xs, ys] = colonnes(18);
  const m = calculatrice(18, xs, ys, 5.2, 20, 6);
  dit(18, `\\dfrac{${somme(ys)}}{4} = ${m.my}$`);
  dit(18, `$5 \\times 5 + 21 = ${5 * 5 + 21}$`);
  const S1 = ecarts(18, xs, ys, 5, 21, { valeurs: false });
  dit(18, `Elle donne ${xs.map((x) => 5 * x + 21).join(", ")}`);
  const S2 = ecarts(18, xs, ys, 5.2, 20, { carres: true });
  vrai("18. d2 meilleure", S2 < S1);
  dit(18, `$y = 5{,}2 \\times 7 + 20 = ${tx(5.2 * 7)} + 20 = ${tx(5.2 * 7 + 20)}$ m³`);
});
essai("19", () => {
  const [xs, ys] = colonnes(19);
  const m = calculatrice(19, xs, ys, 3.2, 14.8, 6);
  dit(19, `\\dfrac{${somme(ys)}}{6} = ${m.my}$`);
  ecarts(19, xs, ys, 3.2, 14.8, { carres: true });
  const seuil = 14.8 / (5 - 3.2);
  dit(19, `$x > 14{,}8 \\div 1{,}8 \\approx ${tx(seuil, 2)}$ centaines. À partir de ${Math.ceil(seuil * 100)} casques`);
});
essai("20", () => {
  const xs = L(20, "Clients"), ys = L(20, "Attente");
  vrai("20. la figure porte les données", memes(pointsDe(20, "figure")[1], ys));
  calculatrice(20, xs, ys, 1.7, -0.8, 6);
  const S = [[2, -2], [1.5, 0], [1.7, -0.8]].map(([a, b]) => ecarts(20, xs, ys, a, b));
  vrai("20. classement : calculatrice, Inès, Paul", S[2] < S[1] && S[1] < S[0]);
  vrai("20. Paul : trois points sur sa droite", xs.filter((x, i) => ys[i] === 2 * x - 2).length === 3);
  dit(20, `$y = 1{,}7 \\times 4{,}5 - 0{,}8 = ${tx(1.7 * 4.5)} - 0{,}8 = ${tx(1.7 * 4.5 - 0.8)}$ minutes`);
});

fin();
