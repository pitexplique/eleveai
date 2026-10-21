// Recalcul indépendant de la feuille « Lire un graphique » de CM2 (21/10/2026) :
// lib/fiches-exercices/maths-cm2-graphique.tsx.
//
// ⭐ L'AUTRE CHEMIN : les valeurs des barres, des courbes et des disques sont
// RELUES dans les appels de dessin ; celles des exercices sans figure imprimée
// sont relues dans l'ÉNONCÉ (et le schéma d'écran doit porter les mêmes). Le
// script refait chaque total, écart, double, moitié, quart, et cherche le
// résultat dans le corrigé (texte simple, sans KaTeX). Il vérifie aussi :
//   · l'axe gradué : aucune valeur écrite sur une figure graduée, chaque
//     valeur sur une graduation OU au milieu de deux (CM2), et toute valeur
//     au milieu LUE par l'élève annoncée « au milieu » dans le corrigé ;
//   · le rendu : libellés qui tiennent dans leur colonne, 8 intervalles au
//     plus, petits secteurs jamais voisins ;
//   · au moins deux courbes ; ni moyenne ni pourcentage ; « ÷ » et « − ».
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe cm2).
// Usage : node scripts/verifier-exercices-cm2-graphique.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-cm2-graphique.tsx", "graphique", ["barres", "courbe", "camembert"], "cm2");
const { e, c, vrai, dit, enonceDit, dessin, appels, essai, src, feuille } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const val = (data, l) => data.find((d) => d.label === l).value;
const vals = (data) => data.map((d) => d.value);
/** Les nombres entiers d'un texte, dans l'ordre (« 8 h » compte pour 8). */
const nombres = (texte) => [...texte.matchAll(/\d+/g)].map((m) => Number(m[0]));
/** Ce que dit un « milieu » : « au milieu, entre a et b ». */
const milieu = (v, pas) => `au milieu, entre ${v - pas / 2} et ${v + pas / 2}`;

/* ═══ Rendu des aides locales ═══ */
for (const { args } of appels("barres").filter((a) => a.args)) {
  const [data, opts = {}] = args;
  const G = opts.pas ? 44 : 16;
  const slot = (300 - G - 10) / data.length;
  for (const d of data) vrai(`barres : « ${d.label} » tient dans sa colonne (${slot.toFixed(0)})`, d.label.length * 8.2 <= slot - 4);
  if (opts.pas) {
    const vmax = Math.ceil(Math.max(...vals(data)) / opts.pas) * opts.pas;
    vrai(`barres graduées : ${vmax / opts.pas} intervalles, 8 au plus`, vmax / opts.pas <= 8);
    vrai("barres graduées : chaque valeur sur une graduation ou au milieu", data.every((d) => (2 * d.value) % opts.pas === 0));
  }
}
for (const { args } of appels("courbe").filter((a) => a.args)) {
  const [etiq, v, pas, opts = {}] = args;
  const slot = 242 / etiq.length;
  for (const l of etiq) vrai(`courbe : « ${l} » tient dans sa colonne`, l.length * 8.2 <= slot - 4);
  const vmax = Math.ceil(Math.max(...v, opts.seuil ?? 0) / pas) * pas;
  vrai(`courbe : ${vmax / pas} intervalles, 8 au plus`, vmax / pas <= 8);
  vrai("courbe : autant d'étiquettes que de valeurs", etiq.length === v.length);
  vrai("courbe : chaque valeur sur une graduation ou au milieu", v.every((x) => (2 * x) % pas === 0));
}
vrai("au moins deux courbes imprimées", appels("courbe").length >= 2);
for (const { args } of appels("camembert").filter((a) => a.args)) {
  const [data] = args;
  const tot = somme(vals(data));
  for (const d of data) vrai(`camembert : « ${d.label} » ≤ 12 signes`, d.label.length <= 12);
  const petit = data.map((d) => d.value / tot < 0.15);
  data.forEach((d, i) => vrai(`camembert : « ${d.label} » et son voisin ne sont pas deux petits secteurs`, !(petit[i] && petit[(i + 1) % data.length])));
}

/* ═══ Le texte du CM2 ═══ */
const textes = feuille.textes.join(" ");
vrai("ni moyenne ni pourcentage", !/moyenne|%|pourcent/i.test(textes));
vrai("pas de « évidemment »", !/évidemment/i.test(textes));
vrai("pas de « : » ni « / » comme division", !/\d ?\/ ?\d/.test(textes));
vrai("vrai signe moins dans les calculs", !/\d - \d/.test(textes));
vrai("aucun KaTeX (texte simple au CM)", !textes.includes("$"));

/** Une figure graduée de l'exercice k : chaque valeur « au milieu » que la question fait lire est annoncée. */
const milieuxDits = (k, nom, aLire) => {
  const a = dessin(nom, k, "figure");
  const [etiq, v, pas] = nom === "courbe" ? a : [a[0].map((d) => d.label), vals(a[0]), a[1].pas];
  etiq.forEach((l, i) => {
    if (v[i] % pas !== 0 && aLire.includes(l)) dit(k, `${milieu(v[i], pas)}`);
  });
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [data, o] = dessin("barres", 1, "figure");
  vrai("1. graduée de 2 en 2", o.pas === 2);
  dit(1, `Je lis ${val(data, "chats")}.`);
  dit(1, `sur la ligne ${val(data, "chiens")}. Je lis ${val(data, "chiens")}`);
  milieuxDits(1, "barres", ["lapins"]);
  dit(1, `c'est ${val(data, "lapins")}. Il y a ${val(data, "lapins")} lapins`);
  vrai("1. les furets le moins", Math.min(...vals(data)) === val(data, "furets"));
  dit(1, `celle des furets : ${val(data, "furets")}`);
});
essai("2", () => {
  const [et, v, pas] = dessin("courbe", 2, "figure");
  const T = (h) => v[et.indexOf(h)];
  vrai("2. gradué de 1 en 1", pas === 1);
  dit(2, `je lis ${T("8 h")}.`);
  const imax = v.indexOf(Math.max(...v)), imin = v.indexOf(Math.min(...v));
  vrai("2. un seul plus haut (12 h), un seul plus bas (6 h)", et[imax] === "12 h" && et[imin] === "6 h" && v.filter((x) => x === v[imax]).length === 1);
  dit(2, `celui de 12 h : ${T("12 h")} mètres`);
  dit(2, `celui de 6 h : ${T("6 h")} mètre`);
  vrai("2. ça descend de 12 h à 16 h", T("14 h") < T("12 h") && T("16 h") < T("14 h"));
  dit(2, `de ${T("12 h")} mètres à ${T("16 h")} mètres`);
});
essai("3", () => {
  const [data, o] = dessin("barres", 3, "figure");
  vrai("3. la barre du lundi manque", memes(o.manque, [3]) && data[3].label === "lun");
  enonceDit(3, `Le lundi, ${val(data, "lun")} spectateurs`);
  dit(3, `sur la ligne ${val(data, "ven")}. Je lis ${val(data, "ven")}`);
  milieuxDits(3, "barres", ["sam", "lun"]);
  dit(3, `Je lis ${val(data, "sam")}.`);
  dit(3, `Je compare ${vals(data).join(", ").replace(/, (\d+)$/, " et $1")}`);
  vrai("3. le lundi le plus petit", Math.min(...vals(data)) === val(data, "lun"));
  const [d2] = dessin("barres", 3, "schema");
  vrai("3. le schéma : mêmes barres", memes(d2, data));
});
essai("4", () => {
  const [data, valeurs] = dessin("camembert", 4, "figure");
  const tot = somme(vals(data));
  vrai("4. disque muet", valeurs === false);
  enonceDit(4, `vendu ${tot} fromages`);
  enonceDit(4, `vendu ${val(data, "chèvre")} chèvres`);
  vrai("4. comté = moitié, brie = quart", val(data, "comté") * 2 === tot && val(data, "brie") * 4 === tot);
  dit(4, `${tot} ÷ 2 = ${tot / 2} comtés`);
  dit(4, `${tot} ÷ 4 = ${tot / 4} bries`);
  const reste = tot - tot / 2 - tot / 4;
  dit(4, `${tot} − ${tot / 2} − ${tot / 4} = ${reste}`);
  dit(4, `${reste} − ${val(data, "chèvre")} = ${val(data, "roquefort")} roqueforts`);
  vrai("4. le reste", reste === val(data, "chèvre") + val(data, "roquefort"));
  vrai("4. le schéma : mêmes secteurs", memes(dessin("camembert", 4, "schema")[0], data));
});
essai("5", () => {
  const [lun, mar, mer, jeu] = nombres(e(5).split("\n")[0]);
  vrai("5. le schéma porte les nombres de l'énoncé", memes(vals(dessin("barres", 5, "schema")[0]), [lun, mar, mer, jeu]));
  vrai("5. a) le jeudi en tête", jeu === Math.max(lun, mar, mer, jeu));
  dit(5, `${jeu} − ${mar} = ${jeu - mar} retards de plus`);
  dit(5, `2 × ${mer} = ${2 * mer}. C'est bien le jeudi : vrai`);
  vrai("5. c) vrai", jeu === 2 * mer);
  dit(5, `2 × ${mar} = ${2 * mar}. Le lundi en a ${lun}, pas ${2 * mar} : faux`);
  vrai("5. d) faux", lun !== 2 * mar);
});
essai("6", () => {
  const [data, o] = dessin("barres", 6, "figure");
  vrai("6. graduée de 10 en 10", o.pas === 10);
  const vmax = Math.ceil(Math.max(...vals(data)) / 10) * 10;
  dit(6, `Les nombres de l'axe sont ${Array.from({ length: vmax / 10 + 1 }, (_, k) => k * 10).join(", ")}.`);
  dit(6, `sur la ligne ${val(data, "verger")}. Je lis ${val(data, "verger")} kilos`);
  milieuxDits(6, "barres", ["prairie", "forêt"]);
  dit(6, `Je lis ${val(data, "prairie")} kilos`);
  dit(6, `Je lis ${val(data, "forêt")} kilos`);
  vrai("6. la forêt monte d'une case et demie", val(data, "forêt") === 1.5 * o.pas);
});
essai("7", () => {
  const [bl, gr, no, ro] = nombres(e(7).split("\n")[0]);
  const [data, o] = dessin("barres", 7, "figure");
  const fausses = data.filter((d, i) => d.value !== [bl, gr, no, ro][i]).map((d) => d.label);
  vrai("7. une seule barre fausse : noir", memes(fausses, ["noir"]));
  dit(7, `Blanc : ${bl}, c'est juste`);
  dit(7, `${milieu(gr, o.pas)}. Elle vaut ${gr}`);
  dit(7, `monte jusqu'à ${val(data, "noir")}. Le texte dit ${no}`);
  dit(7, `${no} est ${milieu(no, o.pas)}`);
  dit(7, `${bl} + ${gr} + ${no} + ${ro} = ${bl + gr + no + ro} voitures`);
  vrai("7. le schéma corrigé", memes(vals(dessin("barres", 7, "schema")[0]), [bl, gr, no, ro]));
});
essai("8", () => {
  const v = nombres(e(8).split("\n")[0]);
  const [cartes, plateau, puzzles, briques] = v;
  vrai("8. le schéma", memes(vals(dessin("barres", 8, "schema")[0]), v));
  const tot = somme(v);
  dit(8, `${v.join(" + ")} = ${tot} jeux`);
  dit(8, `${tot} − ${puzzles} = ${tot - puzzles} jeux`);
  dit(8, `${cartes} + ${plateau} + ${briques} = ${tot - puzzles}`);
  dit(8, `${plateau} − ${puzzles} = ${plateau - puzzles} jeux`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [et, v, pas] = dessin("courbe", 9, "figure");
  const T = (m) => v[et.indexOf(String(m))];
  dit(9, `Je lis ${T(0)} °C`);
  milieuxDits(9, "courbe", ["20", "50"]);
  dit(9, `Je lis ${T(20)} °C`);
  dit(9, `${T(0)} − ${T(10)} = ${T(0) - T(10)} °C de moins`);
  dit(9, `À 40 minutes, je lis ${T(40)}`);
  dit(9, `${T(40)} − ${T(50)} = ${T(40) - T(50)} °C de moins`);
  const baisses = v.slice(1).map((x, i) => v[i] - x);
  vrai("9. toujours en baisse, la plus forte au début", baisses.every((b) => b > 0) && baisses[0] === Math.max(...baisses) && baisses[4] === Math.min(...baisses));
  vrai("9. gradué de 10", pas === 10);
});
essai("10", () => {
  const [jan, fev, mar, avr] = nombres(e(10).split("\n")[0]);
  vrai("10. le schéma", memes(vals(dessin("barres", 10, "schema")[0]), [jan, fev, mar, avr]));
  dit(10, `2 × ${jan} = ${2 * jan}. C'est bien mars : vrai`);
  vrai("10. a) vrai", mar === 2 * jan);
  dit(10, `2 × ${avr} = ${2 * avr}. Février en a ${fev}, pas ${2 * avr} : faux`);
  vrai("10. b) faux", fev !== 2 * avr);
  const tot = jan + fev + mar + avr;
  dit(10, `${jan} + ${fev} + ${mar} + ${avr} = ${tot}`);
  vrai("10. c) vrai", tot > 30);
  vrai("10. d) mars seul au-dessus de 10", [jan, fev, mar, avr].filter((x) => x > 10).length === 1 && mar > 10);
});
essai("11", () => {
  const [data, valeurs] = dessin("camembert", 11, "figure");
  const tot = somme(vals(data));
  vrai("11. disque muet", valeurs === false);
  enonceDit(11, `vendu ${tot} fleurs`);
  enonceDit(11, `vendu ${val(data, "lys")} lys`);
  vrai("11. roses = moitié, tulipes = quart", val(data, "roses") * 2 === tot && val(data, "tulipes") * 4 === tot);
  dit(11, `${tot} ÷ 2 = ${tot / 2} roses`);
  dit(11, `${tot} ÷ 4 = ${tot / 4} tulipes`);
  const reste = tot - tot / 2 - tot / 4;
  dit(11, `${tot} − ${tot / 2} − ${tot / 4} = ${reste} fleurs`);
  dit(11, `${reste} − ${val(data, "lys")} = ${val(data, "iris")} iris`);
  dit(11, `${tot / 2} + ${tot / 4} + ${val(data, "lys")} + ${val(data, "iris")} = ${tot}`);
  dit(11, `${tot} − ${tot / 2} = ${tot / 2} compte encore`);
  vrai("11. le schéma : mêmes secteurs", memes(dessin("camembert", 11, "schema")[0], data));
});
essai("12", () => {
  const [data, o] = dessin("barres", 12, "figure");
  vrai("12. S3 et S4 manquent", memes(o.manque, [2, 3]));
  enonceDit(12, `Semaine 3 : ${val(data, "S3")} paniers. Semaine 4 : ${val(data, "S4")} paniers`);
  dit(12, `${milieu(val(data, "S1"), 10)} : ${val(data, "S1")} paniers`);
  dit(12, `sur la ligne ${val(data, "S2")} : ${val(data, "S2")} paniers`);
  dit(12, `${val(data, "S3")} est ${milieu(val(data, "S3"), 10)}`);
  dit(12, `${val(data, "S4")} est ${milieu(val(data, "S4"), 10)}`);
  const v = vals(data);
  vrai("12. S4 en tête, S2 la plus haute des barres dessinées", Math.max(...v) === val(data, "S4") && val(data, "S2") === Math.max(val(data, "S1"), val(data, "S2")));
  dit(12, `${v.join(" + ")} = ${somme(v)} paniers`);
  vrai("12. le schéma : mêmes barres", memes(dessin("barres", 12, "schema")[0], data));
});
essai("13", () => {
  const [et, v] = dessin("courbe", 13, "figure");
  const M = (m) => v[et.indexOf(m)];
  dit(13, `Je suis la ligne jusqu'à l'axe : ${M("jan")} cm`);
  milieuxDits(13, "courbe", ["mar"]);
  dit(13, `Je lis ${M("mar")} cm`);
  vrai("13. février le plus haut, seul", v.indexOf(Math.max(...v)) === et.indexOf("fév") && v.filter((x) => x === Math.max(...v)).length === 1);
  dit(13, `celui de février : ${M("fév")} cm`);
  dit(13, `${M("fév")} − ${M("avr")} = ${M("fév") - M("avr")} cm de moins`);
  const montees = v.slice(1).map((x, i) => x - v[i]);
  dit(13, `${M("déc")} − ${M("nov")} = ${montees[0]}`);
  dit(13, `${M("jan")} − ${M("déc")} = ${montees[1]}`);
  dit(13, `${M("fév")} − ${M("jan")} = ${montees[2]}`);
  const imax = montees.indexOf(Math.max(...montees));
  vrai("13. plus forte montée déc → jan, seule, pas au point le plus haut", imax === 1 && montees.filter((x) => x === montees[imax]).length === 1);
  dit(13, `La plus forte montée est ${montees[imax]} cm`);
});
essai("14", () => {
  const [data, o] = dessin("barres", 14, "figure");
  // ⭐ Données réelles : médailles d'or, JO de Paris 2024 (CIO).
  vrai("14. les chiffres du CIO", memes(vals(data), [40, 40, 20, 15]));
  dit(14, `sur la ligne ${val(data, "USA")}. Je lis ${val(data, "USA")}`);
  vrai("14. b) égalité USA - Chine", val(data, "USA") === val(data, "Chine") && val(data, "USA") === Math.max(...vals(data)));
  dit(14, `monte aussi jusqu'à ${val(data, "Chine")}`);
  milieuxDits(14, "barres", ["P.-Bas"]);
  dit(14, `${val(data, "Japon")} − ${val(data, "P.-Bas")} = ${val(data, "Japon") - val(data, "P.-Bas")} médailles`);
  enonceDit(14, "La France a gagné 16 médailles");
  vrai("14. d) 16 entre le milieu 15 et 20", 16 > 15 && 16 < 20 && o.pas === 10);
  dit(14, "16 est entre 15 et 20");
  dit(14, `2 × ${val(data, "Japon")} = ${val(data, "Chine")}`);
});
essai("15", () => {
  // « cinq poules » est écrit en lettres : le total 100 vient en premier.
  const v = nombres(e(15).split("\\n")[0]);
  vrai("15. six nombres dans l'énoncé", v.length === 6);
  const [T, L, Z, N, P, A] = v;
  vrai("15. le schéma", memes(vals(dessin("barres", 15, "schema")[0]), [L, Z, N, P, A]));
  vrai("15. le total", L + Z + N + P + A === T);
  dit(15, `${L} + ${Z} + ${N} + ${P} + ${A} = ${T}`);
  dit(15, `${T} ÷ 4 = ${T / 4}. C'est Nina`);
  vrai("15. Nina seule au quart", [L, Z, N, P, A].filter((x) => x * 4 === T).length === 1 && N * 4 === T);
  dit(15, `${L} + ${P} = ${L + P}. La moitié de ${T} : ${T} ÷ 2 = ${T / 2}`);
  vrai("15. c) non", L + P < T / 2);
  dit(15, `${L} − ${Z} = ${L - Z} œufs`);
});
essai("16", () => {
  const [data, o] = dessin("barres", 16, "figure");
  enonceDit(16, "nos 50 employés");
  milieuxDits(16, "barres", ["voiture", "vélo", "bus"]);
  dit(16, `sur la ligne ${val(data, "à pied")} : ${val(data, "à pied")}`);
  const tot = somme(vals(data));
  dit(16, `${vals(data).join(" + ")} = ${tot} employés`);
  vrai("16. le total ne colle pas", tot !== 50);
  dit(16, `${tot} − 50 = ${tot - 50} employés de trop`);
  vrai("16. gradué de 10", o.pas === 10);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [et, v, pas] = dessin("courbe", 17, "figure");
  // ⭐ Données réelles : durée du jour à Paris le 15 du mois, arrondie (IMCCE).
  vrai("17. les durées de l'IMCCE", memes(v, [9, 10, 12, 14, 15, 16]) && pas === 2);
  const M = (m) => v[et.indexOf(m)];
  milieuxDits(17, "courbe", ["jan", "mai"]);
  dit(17, `Je lis ${M("jan")} heures`);
  dit(17, `sur la ligne ${M("juin")} : ${M("juin")} heures`);
  dit(17, `${M("juin")} − ${M("jan")} = ${M("juin") - M("jan")} heures de plus`);
  const gains = v.slice(1).map((x, i) => x - v[i]);
  gains.forEach((g, i) => dit(17, `${v[i + 1]} − ${v[i]} = ${g}`));
  const gmax = Math.max(...gains);
  vrai("17. deux gains maximaux : fév → mar et mar → avr", memes(gains.map((g, i) => (g === gmax ? et[i + 1] : null)).filter(Boolean), ["mar", "avr"]));
  dit(17, `Deux gains sont à égalité, ${gmax} heures chacun`);
  dit(17, "24 ÷ 2 = 12 heures");
  vrai("17. d) juin au-dessus de 12, janvier en dessous", M("juin") > 12 && M("jan") < 12);
});
essai("18", () => {
  const [et, v, pas, o] = dessin("courbe", 18, "figure");
  const H = (h) => v[et.indexOf(h)];
  enonceDit(18, `Au-dessus de ${o.seuil} cm`);
  milieuxDits(18, "courbe", ["10 h", "16 h", "18 h"]);
  dit(18, `Je lis ${H("10 h")} cm`);
  const imax = v.indexOf(Math.max(...v));
  vrai("18. le plus haut : 14 h, seul", et[imax] === "14 h" && v.filter((x) => x === v[imax]).length === 1);
  dit(18, `celui de 14 h : ${H("14 h")} cm`);
  const d = v.slice(1).map((x, i) => x - v[i]);
  for (let i = 0; i < imax; i++) dit(18, `${v[i + 1]} − ${v[i]} = ${d[i]}`);
  vrai("18. que des baisses après 14 h", d.slice(imax).every((x) => x < 0));
  vrai("18. plus forte montée 10 h → 12 h", d.indexOf(Math.max(...d)) === 1 && d.filter((x) => x === Math.max(...d)).length === 1);
  dit(18, `La plus forte montée est ${d[1]} cm, de 10 h à 12 h`);
  const dessus = et.filter((_, i) => v[i] > o.seuil);
  vrai("18. trois relevés au-dessus : 12 h, 14 h, 16 h", memes(dessus, ["12 h", "14 h", "16 h"]));
  dit(18, `Cela fait ${dessus.length} relevés`);
  dit(18, `${H("18 h")} − ${H("8 h")} = ${H("18 h") - H("8 h")} cm`);
  vrai("18. gradué de 10, aucune valeur sur le seuil", pas === 10 && v.every((x) => x !== o.seuil));
});
essai("19", () => {
  const n = nombres(e(19).split("\n")[0]);
  // « Inès, 10 ans » vient avant les cinq durées.
  const [, som, eco, loi, rep, tra] = n;
  const v = [som, eco, loi, rep, tra];
  const [data] = dessin("camembert", 19, "schema");
  vrai("19. le schéma porte les durées de l'énoncé", val(data, "sommeil") === som && val(data, "école") === eco && val(data, "loisirs") === loi && val(data, "repas") === rep && val(data, "trajets") === tra);
  dit(19, `${v.join(" + ")} = ${somme(v)} heures`);
  vrai("19. 24 heures", somme(v) === 24);
  dit(19, `24 ÷ 4 = ${24 / 4}. C'est l'école`);
  vrai("19. l'école seule au quart", v.filter((x) => x * 4 === 24).length === 1 && eco * 4 === 24);
  dit(19, `24 ÷ 2 = 12. Inès dort ${som} heures`);
  vrai("19. sommeil < moitié, entre 9 et 12, le plus grand", som < 12 && som >= 9 && som <= 12 && som === Math.max(...v));
  enonceDit(19, "de 9 à 12 heures");
});
essai("20", () => {
  const n = nombres(e(20).split("\n")[0]);
  const [tot, br, ar, or] = n;
  const cu = tot - br - ar - or;
  dit(20, `${br} + ${ar} + ${or} = ${br + ar + or}`);
  dit(20, `${tot} − ${br + ar + or} = ${cu} pièces en cuivre`);
  dit(20, `${br} + ${ar} + ${or} + ${cu} = ${tot}`);
  dit(20, `${cu} est ${milieu(cu, 10)}`);
  dit(20, `${or} est ${milieu(or, 10)}`);
  dit(20, `7 × ${or} = ${7 * or}. C'est le bronze : vrai`);
  vrai("20. c) vrai", br === 7 * or);
  dit(20, `${ar} + ${or} + ${cu} = ${ar + or + cu}`);
  vrai("20. d) faux", br < ar + or + cu);
  const [data, o] = dessin("barres", 20, "schema");
  vrai("20. le schéma : les quatre métaux, gradué de 10", memes(vals(data), [br, ar, or, cu]) && o.pas === 10);
});

/* ═══ Pas une valeur écrite sur une figure graduée de l'énoncé ═══ */
vrai("les figures graduées n'écrivent pas leurs valeurs (pas de showValues)", !/showValues|valeurs: true/.test(src));
void c;

f.fin();
