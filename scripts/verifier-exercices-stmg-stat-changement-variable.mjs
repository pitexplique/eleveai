// Recalcul indépendant de la feuille « Changement de variable » de Tle STMG
// (22/10/2026) : lib/fiches-exercices/maths-stmg-stat-changement-variable.tsx.
//
// ⭐ L'AUTRE CHEMIN : les données sont relues dans les tableaux ou l'énoncé ;
// chaque variable transformée (x², 1/x, log y) est recalculée et arrondie
// comme l'énoncé l'annonce ; chaque droite « de la calculatrice » est
// recalculée par les moindres carrés SUR LES VALEURS ARRONDIES annoncées et
// comparée aux coefficients donnés ; chaque retour aux variables de départ
// (10^(ax + b), a ÷ x + b, a x² + b) et chaque seuil sont refaits ; chaque
// nuage transformé dit « aligné » l'est (|r| > 0,99) et chaque nuage dit
// « courbé » ne l'est pas autant ; les données réelles (RTE, Intel) sont
// contrôlées.
// Socle : scripts/verifier-exercices-stmg-deux-variables-commun.mjs.
// Usage : node scripts/verifier-exercices-stmg-stat-changement-variable.mjs

import { ouvrirStmg, tx, pl, mc, r, arr, hausses } from "./verifier-exercices-stmg-deux-variables-commun.mjs";

const s = ouvrirStmg("lib/fiches-exercices/maths-stmg-stat-changement-variable.tsx", "stat_changement_variable");
const { vrai, dit, enonceDit, dessin, essai, c, pointsDe, colonnes, listeEnonce: L, memes, fin } = s;

const lg = (v, d = 3) => arr(Math.log10(v), d);
const liste = (xs) => xs.map((x) => `$${tx(x)}$`).join(" ; ");
const num = (v) => (typeof v === "number" ? v : Number(String(v).replace(/\s/g, "").replace(",", ".")));
const calculatrice = (k, xs, ys, a, b, da, db = da) => {
  const m = mc(xs, ys);
  vrai(`${k}. calculatrice : a = ${a} (moindres carrés ${m.a.toFixed(6)})`, Math.abs(m.a - a) <= 0.5 * 10 ** -da + 1e-9);
  vrai(`${k}. calculatrice : b = ${b} (moindres carrés ${m.b.toFixed(6)})`, Math.abs(m.b - b) <= 0.5 * 10 ** -db + 1e-9);
  return m;
};
const aligne = (k, xs, ys, nom) => vrai(`${k}. ${nom} presque aligné (r = ${r(xs, ys).toFixed(4)})`, Math.abs(r(xs, ys)) > 0.99);
const droite0 = (k, role) => dessin("nuage", k, role)[2].droites[0];
/** 10^e arrondi à d décimales, écrit « \approx … ». */
const puiss = (e, d) => arr(10 ** e, d);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [cs, ps] = colonnes(1);
  const u = cs.map((v) => v * v);
  dit(1, cs.map((v, i) => `$${v}^2 = ${u[i]}$`).join(" ; "));
  aligne(1, u, ps, "(u ; prix)");
  vrai("1. prix = 8u + 3 exactement (repris en 7)", ps.every((p, i) => p === 8 * u[i] + 3));
});
essai("2", () => {
  const qs = L(2, "Quantité"), cs = L(2, "Coût moyen");
  vrai("2. c = 60 ÷ q + 2 à l'unité près", qs.every((q, i) => Math.abs(cs[i] - (60 / q + 2)) < 0.5));
  const z = qs.map((q) => arr(1 / q, 3));
  dit(2, `Réponse : ${z.map((v) => pl(v)).join(" ; ")}.`);
  const [, lignes] = dessin("grille", 2, "schema");
  vrai("2. le tableau du schéma", lignes.every((l, i) => l[0] === qs[i] && l[1] === cs[i] && l[2] === z[i]));
});
essai("3", () => {
  const ys = L(3, "jour après jour").map((v) => v);
  const vues = [200, 800, 3200, 12800];
  vrai("3. les vues de l'énoncé", c(3).includes("$\\log 12800"));
  const Y = vues.map((v) => lg(v));
  dit(3, vues.map((v, i) => `$\\log ${v} \\approx ${tx(Y[i])}$`).join(" ; "));
  const h = hausses(Y);
  vrai("3. hausses constantes = log 4", h.every((v) => Math.abs(v - lg(4)) < 1e-9));
  dit(3, h.map((v, i) => `$${tx(Y[i + 1])} - ${tx(Y[i])} = ${tx(v)}$`).join(" ; "));
  vrai("3. le schéma", memes(pointsDe(3, "schema")[1], Y));
});
essai("4", () => {
  const [z, cs] = pointsDe(4, "figure");
  vrai("4. z = 1 ÷ q des quantités 1 à 6", memes(z, [1, 2, 3, 4, 5, 6].map((q) => arr(1 / q, 3))));
  aligne(4, z, cs, "(z ; c)");
  vrai("4. (q ; c) bien moins aligné", Math.abs(r([1, 2, 3, 4, 5, 6], cs)) < 0.95);
  const m = mc(z, cs);
  vrai("4. c = 60z + 2 (à l'arrondi de z près)", Math.abs(m.a - 60) < 0.2 && Math.abs(m.b - 2) < 0.1);
  dit(4, `$a = \\dfrac{62 - 2}{1 - 0} = 60$`);
});
essai("5", () => {
  const [a, b] = [0.3, 1];
  dit(5, `$y = 10^{0{,}3 \\times 2 + 1} = 10^{${tx(a * 2 + b)}} \\approx ${Math.round(10 ** (a * 2 + b))}$ partages`);
  dit(5, `$y = 10^{0{,}3 \\times 5 + 1} = 10^{${tx(a * 5 + b)}} \\approx ${Math.round(10 ** (a * 5 + b))}$ partages`);
  vrai("5. le schéma", memes(droite0(5, "schema"), [a, b]));
});
essai("6", () => {
  const f = (q) => 60 / q + 2;
  dit(6, `$c = \\dfrac{60}{8} + 2 = 7{,}5 + 2 = ${tx(f(8))}$ €`);
  dit(6, `$c = \\dfrac{60}{1{,}5} + 2 = 40 + 2 = ${f(1.5)}$ €`);
  const [qs, cs] = pointsDe(6, "schema");
  vrai("6. le schéma : les points de la courbe c = 60 ÷ q + 2", qs.every((q, i) => Math.abs(cs[i] - f(q)) < 1e-9));
});
essai("7", () => {
  const p = (c0) => 8 * c0 * c0 + 3;
  dit(7, `$p = 8 \\times 49 + 3 = 392 + 3 = ${p(7)}$ €`);
  dit(7, `$p = 8 \\times 100 + 3 = ${p(10)}$ €`);
  dit(7, `$8 \\times 25 + 3 = ${p(5)}$ €`);
  vrai("7. presque 4 fois plus", Math.abs(p(10) / p(5) - 4) < 0.1);
  const [u, ps] = pointsDe(7, "schema");
  vrai("7. le schéma : les données de l'exercice 1", memes(u, [4, 9, 16, 25, 36]) && memes(ps, colonnes(1)[1]));
});
essai("8", () => {
  const ys = L(8, "six premiers mois");
  const Y = ys.map((v) => lg(v));
  enonceDit(8, Y.map((v) => pl(v)).join(" ; "));
  const [xs, fY] = pointsDe(8, "figure");
  vrai("8. la figure porte les Y", memes(fY, Y));
  aligne(8, xs, Y, "(x ; Y)");
  dit(8, liste(hausses(Y)));
  vrai("8. 10^0,176 ≈ 1,5", Math.abs(10 ** 0.176 - 1.5) < 0.01);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [ds, ps] = colonnes(9);
  const u = ds.map((d) => d * d);
  dit(9, ds.map((d, i) => `$${d}^2 = ${u[i]}$`).join(" ; "));
  aligne(9, u, ps, "(u ; p)");
  calculatrice(9, u, ps, 0.0108, 0.72, 4, 2);
  const p36 = 0.0108 * 1296 + 0.72;
  dit(9, `0{,}0108 \\times 1296 + 0{,}72 = ${tx(0.0108 * 1296)} + 0{,}72 \\approx ${tx(p36, 2)}$ €`);
  dit(9, `$18 \\div 8 = ${tx(18 / 8)}$`);
  dit(9, `$1600 \\div 676 \\approx ${tx(1600 / 676, 2)}$`);
  vrai("9. le schéma", memes(pointsDe(9, "schema")[0], u) && memes(droite0(9, "schema"), [0.0108, 0.72]));
});
essai("10", () => {
  const [, lignes] = dessin("grille", 10, "figure");
  const ys = lignes.map((l) => l[1]);
  // ⭐ Données réelles : RTE, électricité solaire.
  vrai("10. RTE 2015 → 2023", memes(ys, [7.4, 8.3, 9.2, 10.2, 11.6, 12.6, 14.3, 18.6, 21.6]));
  const Y = ys.map((v) => lg(v));
  vrai("10. les Y donnés du tableau", lignes.every((l, i) => l[2] === "?" || l[2] === Y[i]));
  dit(10, `$\\log 7{,}4 \\approx ${tx(Y[0])}$ et $\\log 21{,}6 \\approx ${tx(Y[8])}$`);
  const xs = ys.map((_, i) => i);
  // Le bond de 2022 (installations record) écarte un peu les points : seuil 0,98, dit dans le corrigé.
  vrai(`10. (x ; Y) presque aligné, avec un bond (r = ${r(xs, Y).toFixed(4)})`, r(xs, Y) > 0.98);
  dit(10, "avec un bond en 2022");
  calculatrice(10, xs, Y, 0.0564, 0.8503, 4);
  dit(10, `$10^{0{,}0564} \\approx ${tx(puiss(0.0564, 3))}$`);
  dit(10, `environ ${pl(arr((10 ** 0.0564 - 1) * 100, 1))} % par an`);
  const e = arr(0.0564 * 4 + 0.8503, 4);
  dit(10, `10^{${tx(e)}} \\approx ${tx(puiss(e, 1))}$ TWh`);
});
essai("11", () => {
  const [vs, ts] = colonnes(11);
  const z = vs.map((v) => 1 / v);
  dit(11, vs.map((v, i) => `$\\dfrac{1}{${v}} ${Number.isInteger(arr(z[i] * 1e4, 6)) ? "=" : "\\approx"} ${tx(z[i], 4)}$`).join(" ; "));
  aligne(11, z, ts, "(z ; t)");
  calculatrice(11, z, ts, 240, 0.5, 6);
  const t90 = 240 / 90 + 0.5;
  dit(11, `$t = \\dfrac{240}{90} + 0{,}5 \\approx ${tx(240 / 90, 3)} + 0{,}5 = ${tx(t90, 3)}$ h`);
  dit(11, `environ 3 h ${Math.round((t90 - 3) * 60)} min`);
  vrai("11. le schéma", memes(pointsDe(11, "schema")[0], z.map((v) => arr(v, 4))));
});
essai("12", () => {
  const ds = L(12, "Diamètre (cm)"), ys = L(12, "Fleurs");
  const u = ds.map((d) => d * d), Y = ys.map((v) => lg(v));
  dit(12, `$u$ : ${u.map((v) => String(v).replace(/\B(?=(\d{3})+$)/g, " ")).join(" ; ")}`);
  dit(12, `$Y$ : ${liste(Y)}`);
  const h = hausses(Y);
  dit(12, liste(h));
  vrai("12. hausses de Y décroissantes", h.every((v, i) => i === 0 || v < h[i - 1]));
  const q = ys.slice(1).map((y, i) => (y - ys[i]) / (u[i + 1] - u[i]));
  vrai("12. quotients autour de 0,031", q.every((v) => Math.abs(v - 0.031) < 0.0015));
  ys.slice(1).forEach((y, i) => dit(12, `\\dfrac{${y - ys[i]}}{${u[i + 1] - u[i]}} ${Number.isInteger(arr(q[i] * 1000, 6)) ? "=" : "\\approx"} ${tx(q[i], 3)}$`));
  aligne(12, u, ys, "(u ; y)");
  vrai("12. le schéma", memes(pointsDe(12, "schema")[0], u) && memes(pointsDe(12, "schema")[1], ys));
});
essai("13", () => {
  const [a, b] = [0.0414, 3];
  dit(13, `$y = 10^{3} = ${10 ** b}$ €`);
  dit(13, `$10^{0{,}0414} \\approx ${puiss(a, 2).toFixed(2).replace(".", "{,}")}$`);
  dit(13, `$y = 10^{0{,}0414 \\times 10 + 3} = 10^{${tx(a * 10 + b)}} \\approx ${Math.round(10 ** (a * 10 + b))}$ €`);
  const x = (3.301 - b) / a;
  dit(13, `$x = 0{,}301 \\div 0{,}0414 \\approx ${tx(x, 2)}$. Le placement double au cours de la ${Math.ceil(x)}e année`);
});
essai("14", () => {
  const [xs, ys] = colonnes(14);
  const Y = ys.map((v) => lg(v));
  dit(14, ys.map((v, i) => `$\\log ${v} \\approx ${tx(Y[i])}$`).join(" ; "));
  calculatrice(14, xs, Y, -0.0967, 2.9028, 4);
  dit(14, `$10^{-0{,}0967} \\approx ${puiss(-0.0967, 2).toFixed(2).replace(".", "{,}")}$`);
  const e = arr(-0.0967 * 6 + 2.9028, 4);
  dit(14, `$y = 10^{-0{,}0967 \\times 6 + 2{,}9028} = 10^{${tx(e)}} \\approx ${Math.round(10 ** e)}$ €`);
});
essai("15", () => {
  const [ts, cs] = colonnes(15);
  const Y = cs.map((v) => lg(v));
  dit(15, `a) ${liste(Y)}.`);
  calculatrice(15, ts, Y, -0.1551, 1.6022, 4);
  dit(15, `$10^{-0{,}1551} \\approx ${puiss(-0.1551, 2).toFixed(2).replace(".", "{,}")}$`);
  const t = (1.6022 - 0.699) / 0.1551;
  dit(15, `$0{,}1551t = ${tx(1.6022 - 0.699)}$, donc $t = ${tx(1.6022 - 0.699)} \\div 0{,}1551 \\approx ${tx(t, 2)}$ h`);
  dit(15, `environ 5 h ${Math.round((t - 5) * 60)} min`);
  vrai("15. log 5 ≈ 0,699", lg(5) === 0.699);
});
essai("16", () => {
  const [ns, cs] = colonnes(16);
  const z = ns.map((n) => 1 / n);
  dit(16, `a) ${liste(z)}.`);
  aligne(16, z, cs, "(z ; c)");
  calculatrice(16, z, cs, 8.22, 2.93, 2);
  dit(16, `$c = \\dfrac{8{,}22}{8} + 2{,}93 = ${tx(8.22 / 8)} + 2{,}93 \\approx ${tx(8.22 / 8 + 2.93, 2)}$ €`);
  vrai("16. le schéma", memes(pointsDe(16, "schema")[0], z) && memes(droite0(16, "schema"), [8.22, 2.93]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [vs, ds] = colonnes(17);
  const xs = vs.map((v) => v / 10), u = xs.map((x) => x * x);
  dit(17, `$x$ : ${xs.join(", ")}. $u = x^2$ : ${u.join(", ")}`);
  aligne(17, u, ds, "(u ; d)");
  calculatrice(17, u, ds, 0.49, -0.02, 2);
  const d = (x) => arr(0.49 * x * x - 0.02, 6);
  dit(17, `$d = 0{,}49 \\times 64 - 0{,}02 = ${tx(0.49 * 64)} - 0{,}02 = ${tx(d(8))}$ m`);
  dit(17, `$d = 0{,}49 \\times 25 - 0{,}02 = ${tx(d(5))}$ m`);
  dit(17, `$d = 0{,}49 \\times 100 - 0{,}02 = ${tx(d(10))}$ m. $${tx(d(10))} \\div ${tx(d(5))} \\approx ${Math.round(d(10) / d(5))}$`);
  vrai("17. le schéma", memes(pointsDe(17, "schema")[0], u) && memes(pointsDe(17, "schema")[1], ds));
});
essai("18", () => {
  const [ts, Ns] = colonnes(18);
  const N = Ns.map(num);
  const Y = N.map((v) => lg(v));
  dit(18, `a) ${liste(Y)}.`);
  dit(18, liste(hausses(Y)));
  calculatrice(18, ts, Y, 0.3006, 3.0024, 4);
  const e25 = arr(0.3006 * 2.5 + 3.0024, 4), e10 = arr(0.3006 * 10 + 3.0024, 4);
  dit(18, `= 10^{${tx(e25)}} \\approx ${Math.round(10 ** e25)}$ bactéries`);
  dit(18, `$N = 10^{${tx(e10)}} \\approx 1\\,${String(Math.round(10 ** e10 / 1e4) * 10).padStart(3, "0").slice(-3)}\\,000$`);
  vrai("18. le schéma", memes(pointsDe(18, "schema")[1], Y) && memes(droite0(18, "schema"), [0.3006, 3.0024]));
});
essai("19", () => {
  const [, lignes] = dessin("grille", 19, "figure");
  const xs = lignes.map((l) => l[0] - 1970), ys = lignes.map((l) => num(l[2]));
  // ⭐ Données réelles : transistors Intel.
  vrai("19. Intel 4004 → Core 2 Duo", memes(ys, [2300, 29000, 275000, 3100000, 42000000, 291000000]));
  const Y = ys.map((v) => lg(v));
  dit(19, `$x$ : ${xs.join(", ")}. $Y$ : ${liste(Y)}`);
  aligne(19, xs, Y, "(x ; Y)");
  calculatrice(19, xs, Y, 0.1447, 3.2483, 4);
  dit(19, `$10^{0{,}1447} \\approx ${tx(puiss(0.1447, 3))}$`);
  dit(19, `$0{,}301 \\div 0{,}1447 \\approx ${tx(0.301 / 0.1447, 2)}$ ans`);
  const e19 = arr(0.1447 * 19 + 3.2483, 4), e50 = arr(0.1447 * 50 + 3.2483, 4);
  dit(19, `10^{${tx(e19)}} \\approx ${Math.round(10 ** e19 / 1000)}\\,000$`);
  dit(19, `10^{${tx(e50)}} \\approx ${tx(arr(10 ** e50 / 1e10, 2))} \\times 10^{10}$`);
  vrai("19. le schéma", memes(pointsDe(19, "schema")[1], Y));
});
essai("20", () => {
  const ns = L(20, "Passagers"), ps = L(20, "Prix par passager (€)");
  vrai("20. la figure porte les données", memes(pointsDe(20, "figure")[0], ns) && memes(pointsDe(20, "figure")[1], ps));
  vrai("20. (n ; p) courbé", Math.abs(r(ns, ps)) < 0.95);
  const z = ns.map((n) => 1 / n);
  dit(20, `$z$ : ${liste(z.map((v) => arr(v, 3)))}`);
  aligne(20, z, ps, "(z ; p)");
  calculatrice(20, z, ps, 36, 2, 6);
  dit(20, `$n > 36 \\div 5 = ${tx(36 / 5)}$. Il faut au moins ${Math.floor(36 / 5) + 1} passagers`);
  dit(20, `$\\dfrac{36}{7} + 2 \\approx ${tx(36 / 7 + 2, 2)}$ €`);
  vrai("20. le schéma", memes(pointsDe(20, "schema")[0], z.map((v) => arr(v, 3))) && memes(droite0(20, "schema"), [36, 2]));
});

fin();
