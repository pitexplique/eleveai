// Recalcul indépendant de la feuille « Le nuage de points » (1re, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-info-nuage.tsx.
// Les nuages sont RELUS dans le source (`repere(…)`, marques) et comparés aux
// données de l'énoncé : tableau relu (`tableauProba`), liste de couples relue
// dans le texte, ou mesures converties dans l'unité des axes. Chaque lecture
// est refaite sur les points ; la tendance annoncée (croissant, décroissant,
// aucune) est confrontée au coefficient de corrélation du nuage dessiné.
// Usage : node scripts/verifier-exercices-premiere-info-nuage.mjs

import { demarrer } from "./verifier-exercices-premiere-info-outils.mjs";

const V = demarrer("lib/fiches-exercices/maths-premiere-info-nuage.tsx", "info_nuage");
const { verif, vrai, dit, appels, bloc, e, c, tableauxDe } = V;

/** Les points du nuage de l'exercice k (le i-ième repère). */
const nuage = (k, i = 0) => appels("repere", bloc(k))[i][2].map((p) => [p.x, p.y]);
const memes = (k, a, b) => verif(`E${k} les points dessinés sont ceux des données`, JSON.stringify(a), JSON.stringify(b));
/** Les couples « (x ; y) » écrits dans un texte. */
const couples = (t) => [...t.matchAll(/\((\d+) ; (\d+)\)/g)].map((m) => [Number(m[1]), Number(m[2])]);
const y = (pts, x) => pts.filter((p) => p[0] === x).map((p) => p[1]);
/** Corrélation linéaire du nuage. */
const r = (pts) => {
  const n = pts.length, mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n;
  const sxy = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0);
  const sxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0), syy = pts.reduce((s, p) => s + (p[1] - my) ** 2, 0);
  return sxy / Math.sqrt(sxx * syy);
};
/** La tendance écrite dans le corrigé est-elle celle du nuage ? */
const tendance = (k, pts, sens) => {
  const rr = r(pts);
  if (sens === "croissant") vrai(`E${k} croissant (r = ${rr.toFixed(2)})`, rr > 0.8 && /croissant/.test(c(k)));
  if (sens === "décroissant") vrai(`E${k} décroissant (r = ${rr.toFixed(2)})`, rr < -0.8 && /décroissant/.test(c(k)));
  if (sens === "aucune") vrai(`E${k} aucune tendance (r = ${rr.toFixed(2)})`, Math.abs(rr) < 0.3 && /aucune tendance/.test(c(k)));
};
/** Des points presque alignés : écart à la droite des extrêmes ≤ 1 unité, sauf les isolés. */
const presqueAligne = (k, pts, sauf = []) => {
  const [a, b] = [pts[0], pts.at(-1)];
  const pente = (b[1] - a[1]) / (b[0] - a[0]);
  const ecart = Math.max(...pts.filter((p) => !sauf.some((s) => s[0] === p[0] && s[1] === p[1])).map((p) => Math.abs(p[1] - (a[1] + pente * (p[0] - a[0])))));
  vrai(`E${k} presque aligné (écart ${ecart.toFixed(2)})`, ecart <= 1 && /presque align/.test(c(k)));
};
/** Le tableau `tableauProba` de l'énoncé, en couples. */
const tableauCouples = (k) => {
  const [t] = tableauxDe(k);
  return t.entetes.slice(1).map((x, j) => [Number(x), Number(t.lignes[0][j + 1])]);
};

/* ═══════════════ ★ ═══════════════ */
{
  const p = nuage(1);
  const A = appels("repere", bloc(1))[0][2].find((m) => m.label === "A");
  vrai("E1 a", A.x === 5 && A.y === 4);
  dit(1, "$A(5 ; 4)$", "$50$ ans", "$40$ cm");
  verif("E1 c", p.filter(([, v]) => v * 10 > 50).length, 2);
}
{
  const p = nuage(2);
  verif("E2 a", y(p, 3)[0] * 100, 600);
  verif("E2 b", p.find(([, v]) => v === 2)[0], 5);
  tendance(2, p, "décroissant");
  presqueAligne(2, p);
}
{
  const d = tableauCouples(3);
  memes(3, nuage(3), d);
  dit(3, "$(0 ; 10)$, $(2 ; 9)$, $(4 ; 7)$, $(6 ; 5)$, $(8 ; 4)$");
  vrai("E3 le corrigé liste les couples du tableau", JSON.stringify(couples(c(3))) === JSON.stringify(d));
}
{
  const p = nuage(4);
  tendance(4, p, "décroissant");
  presqueAligne(4, p);
  verif("E4 b", y(p, 1)[0] - y(p, 9)[0], 6);
  dit(4, "$12 - 6 = 6$");
}
{
  const [P] = appels("repere", bloc(5))[0][2];
  vrai("E5 point (8 ; 4)", P.x === 8 && P.y === 40 / 10);
  dit(5, "Le point est $(8 ; 4)$");
}
{
  const p = nuage(6);
  tendance(6, p, "aucune");
  vrai("E6 entre 1 et 4", Math.min(...p.map((q) => q[1])) === 1 && Math.max(...p.map((q) => q[1])) === 4);
}
{
  const p = nuage(7);
  verif("E7 a", y(p, 6)[0] * 100, 500);
  verif("E7 b", p.filter(([, v]) => v * 100 > 600).length, 2);
  vrai("E7 un point à 600 exactement", p.some(([, v]) => v === 6));
  tendance(7, p, "croissant");
  presqueAligne(7, p);
}
{
  const mesures = [...e(8).matchAll(/semaine \$(\d)\$ : \$(\d+)\$ cm/gi)].map((m) => [Number(m[1]), Number(m[2]) / 10]);
  verif("E8 cinq mesures", mesures.length, 5);
  const p = nuage(8);
  const faux = p.filter((q, i) => q[1] !== mesures[i][1]);
  vrai("E8 un seul point faux, en semaine 3", faux.length === 1 && faux[0][0] === 3 && faux[0][1] === 5);
  vrai("E8 corrigé", JSON.stringify(couples(c(8)).slice(0, 5)) === JSON.stringify(mesures));
  dit(8, "le bon point est $(3 ; 4)$");
}

/* ═══════════════ ★★ ═══════════════ */
{
  const vent = [10, 20, 30, 40, 50], kw = [100, 300, 600, 900, 1100];
  const d = vent.map((v, i) => [v / 10, kw[i] / 100]);
  memes(9, nuage(9), d);
  vrai("E9 corrigé", JSON.stringify(couples(c(9))) === JSON.stringify(d));
  tendance(9, d, "croissant");
  const gains = d.slice(1).map((q, i) => q[1] - d[i][1]);
  verif("E9 gains", gains.join(), "2,3,3,2");
}
{
  const p = nuage(10);
  const P = appels("repere", bloc(10))[0][2].find((m) => m.label === "P");
  vrai("E10 P(4 ; 3)", P.x === 4 && P.y === 3);
  const sansP = p.filter(([x]) => x !== 4);
  tendance(10, sansP, "décroissant");
  presqueAligne(10, p, [[4, 3]]);
  verif("E10 attendu en 40 m", (y(p, 3)[0] + y(p, 5)[0]) / 2, 9);
}
{
  const d = couples(e(11));
  memes(11, nuage(11), d);
  verif("E11 b", y(d, 4)[0] * 100, 300);
  tendance(11, d, "croissant");
  presqueAligne(11, d);
}
{
  const p = nuage(12);
  verif("E12 a", p.filter(([, v]) => v > 6).length, 3);
  const plusRiche = p.reduce((m, q) => (q[0] > m[0] ? q : m));
  vrai("E12 b", plusRiche[1] === Math.max(...p.map((q) => q[1])));
  vrai("E12 c", y(p, 5)[0] < y(p, 4)[0] && y(p, 5)[0] === 8 && y(p, 4)[0] === 9);
  tendance(12, p, "croissant");
}
{
  const p = nuage(13);
  verif("E13 10→30 ans", y(p, 3)[0] - y(p, 1)[0], 6);
  verif("E13 50→80 ans", y(p, 8)[0] - y(p, 5)[0], 2);
  tendance(13, p, "croissant");
  const gains = p.slice(1).map((q, i) => q[1] - p[i][1]);
  vrai("E13 ralentit (non aligné)", gains[0] >= 3 && gains.at(-1) <= 1 && /pas aligné/.test(c(13)));
}
{
  const d = couples(e(14));
  memes(14, nuage(14), d);
  const max = d.reduce((m, q) => (q[1] > m[1] ? q : m));
  vrai("E14 maximum à 80 mm", max[0] === 8 && max[1] === 8);
  vrai("E14 redescend", d.at(-1)[1] < max[1]);
}
{
  const d = couples(e(15));
  memes(15, nuage(15), d);
  const haut = d.reduce((m, q) => (q[1] > m[1] ? q : m));
  vrai("E15 b", haut[0] * 10 === 20 && haut[1] * 10 === 60);
  tendance(15, d, "décroissant");
  presqueAligne(15, d);
}
{
  const vit = [50, 70, 90, 110, 130], conso = [5, 5, 6, 7, 9];
  const d = vit.map((v, i) => [v / 10, conso[i]]);
  memes(16, nuage(16), d);
  vrai("E16 corrigé", JSON.stringify(couples(c(16))) === JSON.stringify(d));
  tendance(16, d, "croissant");
  verif("E16 c", (y(d, 13)[0] - y(d, 11)[0]) * 5, 10);
  dit(16, "$2 \\times 5 = 10$");
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const [t] = tableauxDe(17);
  const d = t.entetes.slice(1).map((a, j) => [(Number(a) - 1980) / 10, Number(t.lignes[0][j + 1])]);
  memes(17, nuage(17), d);
  vrai("E17 corrigé", JSON.stringify(couples(c(17))) === JSON.stringify(d));
  verif("E17 a", (2010 - 1980) / 10, 3);
  tendance(17, d, "décroissant");
  presqueAligne(17, d);
  verif("E17 recul", d[0][1] - d.at(-1)[1], 5);
  verif("E17 par décennie", 5 / 4, 1.25);
  dit(17, "$12 - 7 = 5$", "$5 \\div 4 = 1{,}25$");
}
{
  const p = nuage(18);
  verif("E18 a", y(p, 4)[0], 7);
  verif("E18 b", p.filter(([, v]) => v >= 6).length, 6);
  tendance(18, p, "décroissant");
  presqueAligne(18, p);
}
{
  const d = tableauCouples(19);
  memes(19, nuage(19), d);
  vrai("E19 corrigé", JSON.stringify(couples(c(19)).slice(0, 9)) === JSON.stringify(d));
  const isole = [2, 9];
  tendance(19, d.filter((q) => !(q[0] === 2 && q[1] === 9)), "croissant");
  vrai("E19 le point isolé", d.some((q) => q[0] === 2 && q[1] === 9) && y(d, 2).includes(4));
  presqueAligne(19, d.filter((q) => !(q[0] === isole[0] && q[1] === isole[1])));
  verif("E19 d", y(d, 8)[0], 9);
}
{
  const d = [...e(20).matchAll(/\$(\d+)\\,000\$ habitants et \$(\d+)\$|\$(\d+)\\,000\$ et \$(\d+)\$/g)].map((m) => [Number(m[1] ?? m[3]), Number(m[2] ?? m[4])]);
  verif("E20 six villes", d.length, 6);
  memes(20, nuage(20), d);
  vrai("E20 corrigé", JSON.stringify(couples(c(20))) === JSON.stringify(d));
  tendance(20, d, "croissant");
  const surDroite = d.filter(([a, b]) => a === b).length;
  verif("E20 sur y = x", surDroite, 5);
  vrai("E20 sous-dotée", d.filter(([a, b]) => b < a).map((q) => q[0]).join() === "5");
}

V.reglesDeRendu();
V.finir();
