// Recalcul indépendant de la feuille « Lire un graphique » de CM1 (21/10/2026) :
// lib/fiches-exercices/maths-cm1-graphique.tsx.
//
// ⭐ L'AUTRE CHEMIN : les hauteurs des barres et les parts du disque sont
// RELUES dans les appels de dessin ; celles des exercices sans figure imprimée
// sont relues dans l'ÉNONCÉ (et le schéma d'écran doit porter les mêmes). Le
// script refait chaque lecture, total, écart, double, nombre de graduations,
// et cherche le résultat dans le corrigé (texte simple, sans KaTeX).
// Rendu du CM1 : pas de 1, 2, 5 ou 10 ; six graduations au plus ; chaque barre
// sur une graduation ; AUCUNE valeur écrite sur une figure à lire ; libellés
// qui tiennent dans leur colonne ; petites parts du disque jamais voisines.
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe cm1).
// Usage : node scripts/verifier-exercices-cm1-graphique.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-cm1-graphique.tsx", "graphique", ["barres", "camembert"], "cm1");
const { e, c, vrai, dit, enonceDit, dessin, dessins, appels, essai } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const val = (data, l) => {
  const d = data.find((x) => x.label === l);
  if (!d) throw new Error(`pas de barre « ${l} »`);
  return d.value;
};
const vals = (data) => data.map((d) => d.value);
/** Le nombre de graduations d'une barre : sa valeur ÷ le pas. */
const grad = (v, pas) => v / pas;
/** Le nombre qui suit « mot : » dans un texte (« Mars : 15 jours »). */
const apres = (texte, mot) => {
  const m = texte.match(new RegExp(mot + " : ([0-9]+)"));
  if (!m) throw new Error(`« ${mot} : n » absent`);
  return Number(m[1]);
};
const MOINS = "−";

/* ═══ Rendu des aides locales ═══ */
for (const a of appels("barres").filter((x) => x.args)) {
  const [data, o] = a.args;
  const slot = (300 - 44 - 10) / data.length;
  for (const d of data) vrai(`barres : « ${d.label} » tient dans sa colonne (${slot.toFixed(0)})`, d.label.length * 8.2 <= slot - 4);
  vrai(`barres : pas de 1, 2, 5 ou 10 (${o.pas})`, [1, 2, 5, 10].includes(o.pas));
  const vmax = Math.ceil(Math.max(o.pas, o.haut ?? 0, ...vals(data)) / o.pas) * o.pas;
  vrai(`barres : ${vmax / o.pas} graduations, 6 au plus`, vmax / o.pas <= 6);
  vrai("barres : chaque valeur tombe sur une graduation", data.every((d) => d.value % o.pas === 0 && d.value >= 0));
}
for (const { args } of appels("camembert").filter((a) => a.args)) {
  const [data] = args;
  const tot = somme(vals(data));
  for (const d of data) vrai(`camembert : « ${d.label} » ≤ 12 signes`, d.label.length <= 12);
  const petit = data.map((d) => d.value / tot < 0.15);
  data.forEach((d, i) => vrai(`camembert : « ${d.label} » et sa voisine ne sont pas deux petites parts`, !(petit[i] && petit[(i + 1) % data.length])));
}
/** Une figure À LIRE n'écrit pas ses valeurs, et ne montre pas la ligne suivie. */
const aLire = (k) => {
  const [data, o] = dessin("barres", k, "figure");
  vrai(`${k}. la figure n'écrit pas les valeurs`, !o.valeurs && o.suivi === undefined);
  return [data, o];
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [data, o] = aLire(1);
  dit(1, `Une graduation vaut ${o.pas} oiseaux`);
  dit(1, `« merle ». Je suis la ligne jusqu'à l'axe : je lis ${val(data, "merle")}.`);
  dit(1, `La ligne arrive sur ${val(data, "mésange")}.`);
  const six = data.filter((d) => d.value === 6).map((d) => d.label);
  vrai("1. un seul oiseau à 6 : le moineau", memes(six, ["moineau"]));
  dit(1, `voisine, ${val(data, "mésange") - o.pas} ou ${val(data, "mésange") + o.pas}`);
  const [d2, o2] = dessin("barres", 1, "schema");
  vrai("1. le schéma : mêmes barres, la mésange suivie", memes(d2, data) && d2[o2.suivi].label === "mésange");
});
essai("2", () => {
  const [data, o] = aLire(2);
  dit(2, `Une graduation vaut ${o.pas} livres`);
  dit(2, `je lis ${val(data, "mar")}.`);
  dit(2, `« jeu » s'arrête sur ${val(data, "jeu")}.`);
  vrai("2. 30 : le vendredi seul", memes(data.filter((d) => d.value === 30).map((d) => d.label), ["ven"]));
  vrai("2. le moins : jeudi", Math.min(...vals(data)) === val(data, "jeu"));
  dit(2, `monte de ${grad(val(data, "jeu"), o.pas)} graduations. Mais elle vaut ${val(data, "jeu")} livres, pas ${grad(val(data, "jeu"), o.pas)}`);
});
essai("3", () => {
  const [data, o] = aLire(3);
  vrai("3. des bâtons", o.batons === true);
  dit(3, `Une graduation vaut ${o.pas} élèves`);
  dit(3, `je lis ${val(data, "guitare")}.`);
  dit(3, `« violon » s'arrête sur ${val(data, "violon")}.`);
  vrai("3. 30 : la flûte", memes(data.filter((d) => d.value === 30).map((d) => d.label), ["flûte"]));
  const au = data.filter((d) => d.value > 30).map((d) => d.label);
  vrai("3. au-dessus de 30 : piano et guitare", memes(au, ["piano", "guitare"]));
  dit(3, `« piano » s'arrête sur ${val(data, "piano")}`);
});
essai("4", () => {
  const [data] = dessin("camembert", 4, "figure");
  const v = vals(data);
  dit(4, `comédie porte ${val(data, "comédie")}`);
  vrai("4. la plus grande : animation, la plus petite : documentaire", Math.max(...v) === val(data, "animation") && Math.min(...v) === val(data, "documentaire"));
  dit(4, `plus grande part porte ${Math.max(...v)}`);
  dit(4, `plus petite part porte ${Math.min(...v)}`);
  dit(4, `${v.join(" + ")} = ${somme(v)} élèves`);
});
essai("5", () => {
  const pas = 2;
  enonceDit(5, `une graduation vaut ${pas} tours`);
  const zoe = apres(e(5).replace("Zoé a fait", "Zoé :"), "Zoé"), noah = apres(e(5).replace("Noah a fait", "Noah :"), "Noah");
  dit(5, `J'ai compté ${grad(zoe, pas)} graduations`);
  dit(5, `${grad(zoe, pas)} × ${pas} = ${zoe} tours`);
  dit(5, `Cela fait ${grad(noah, pas)} graduations`);
  dit(5, `${grad(noah, pas)} × ${pas} = ${noah} tours`);
  dit(5, `5 × ${pas} = ${5 * pas} tours`);
  const [data, o] = dessin("barres", 5, "schema");
  vrai("5. le schéma", o.pas === pas && memes(vals(data), [zoe, noah, 5 * pas]));
});
essai("6", () => {
  const [data, o] = aLire(6);
  dit(6, `Une graduation vaut ${o.pas} kilos`);
  dit(6, data.map((d) => `${d.label[0].toUpperCase() + d.label.slice(1)} : ${d.value}.`).join(" "));
  const ord = [...data].sort((a, b) => b.value - a.value);
  dit(6, `Le plus grand nombre est ${ord[0].value} : la ${ord[0].label}`);
  dit(6, `Le plus petit nombre est ${ord[3].value} : la ${ord[3].label}`);
  dit(6, `Je range les nombres : ${ord[0].value}, puis ${ord[1].value}, puis ${ord[2].value}, puis ${ord[3].value}.`);
  dit(6, `L'ordre est : ${ord.map((d) => d.label).join(", ")}.`);
});
essai("7", () => {
  const [data, o] = aLire(7);
  vrai("7. pas de 1", o.pas === 1);
  dit(7, `« mar » s'arrête sur ${val(data, "mar")}`);
  dit(7, `${val(data, "mar")} ${MOINS} ${val(data, "mer")} = ${val(data, "mar") - val(data, "mer")}`);
  dit(7, `${val(data, "mar")} ${MOINS} ${val(data, "lun")} = ${val(data, "mar") - val(data, "lun")}`);
  dit(7, `répondre ${val(data, "mer")}, le nombre du mercredi`);
  vrai("7. l'écart du b) n'est pas la valeur du mercredi", val(data, "mar") - val(data, "mer") !== val(data, "mer"));
});
essai("8", () => {
  const [data] = aLire(8);
  const v = vals(data), tot = somme(v);
  dit(8, `${v.join(" + ")} = ${tot} élèves`);
  enonceDit(8, "La classe compte 30 élèves");
  dit(8, `30 ${MOINS} ${tot} = ${30 - tot} élèves manquent`);
  dit(8, `il y en a ${data.length}`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [data, o] = aLire(9);
  dit(9, `Une graduation vaut ${o.pas} spectateurs`);
  dit(9, `« mer » s'arrête sur ${val(data, "mer")}`);
  vrai("9. le moins : jeudi", Math.min(...vals(data)) === val(data, "jeu"));
  dit(9, `${val(data, "mer")} ${MOINS} ${val(data, "jeu")} = ${val(data, "mer") - val(data, "jeu")} spectateurs`);
  dit(9, `2 × ${val(data, "jeu")} = ${2 * val(data, "jeu")}`);
  vrai("9. d) faux", val(data, "mar") !== 2 * val(data, "jeu"));
  dit(9, `s'arrête sur ${val(data, "mar")}, pas sur ${2 * val(data, "jeu")}. C'est faux`);
});
essai("10", () => {
  const [data, o] = aLire(10);
  vrai("10. la barre des lapins est effacée", val(data, "lapin") === 0);
  dit(10, `« chat » s'arrête sur ${val(data, "chat")}`);
  dit(10, `« oiseau » s'arrête sur ${val(data, "oiseau")}`);
  const lapins = 2 * val(data, "oiseau");
  dit(10, `2 × ${val(data, "oiseau")} = ${lapins} lapins`);
  dit(10, `La barre monte de ${grad(lapins, o.pas)} graduations`);
  dit(10, `monte de ${grad(val(data, "oiseau"), o.pas)} graduations, mais elle vaut ${val(data, "oiseau")}`);
  const [d2] = dessin("barres", 10, "schema");
  vrai("10. le schéma : la même figure, lapins tracés", memes(d2.map((d) => (d.label === "lapin" ? 0 : d.value)), vals(data)) && val(d2, "lapin") === lapins);
});
essai("11", () => {
  const [data, o] = aLire(11);
  dit(11, `Une graduation vaut ${o.pas} cm`);
  vrai("11. a) vrai", Math.max(...vals(data)) === val(data, "haricot"));
  vrai("11. b) faux", val(data, "radis") !== 15);
  dit(11, `s'arrête sur ${val(data, "radis")}, pas sur 15`);
  dit(11, `3 × ${val(data, "radis")} = ${3 * val(data, "radis")}`);
  vrai("11. c) vrai", 3 * val(data, "radis") === val(data, "haricot"));
  const tm = val(data, "tomate") + val(data, "maïs");
  dit(11, `${val(data, "tomate")} + ${val(data, "maïs")} = ${tm} cm`);
  vrai("11. d) vrai", tm > val(data, "haricot"));
  dit(11, "Réponse : a) vrai ; b) faux ; c) vrai ; d) vrai.");
});
essai("12", () => {
  const pas = 2;
  enonceDit(12, `Son axe va de ${pas} en ${pas}`);
  const lun = apres(e(12), "Lundi"), mar = apres(e(12), "Mardi");
  const mer = lun + 2, jeu = 2 * pas;
  dit(12, `${lun} + 2 = ${mer} sorties`);
  dit(12, `Cela fait ${grad(lun, pas)} graduations`);
  dit(12, `Cela fait ${grad(mar, pas)} graduations`);
  dit(12, `2 × ${pas} = ${jeu} sorties`);
  const [data, o] = dessin("barres", 12, "schema");
  vrai("12. le schéma", o.pas === pas && memes(vals(data), [lun, mar, mer, jeu]));
});
essai("13", () => {
  const [data, o] = aLire(13);
  const v = vals(data), tot = somme(v);
  dit(13, `Une graduation vaut ${o.pas} kilos`);
  dit(13, `« S2 » s'arrête sur ${val(data, "S2")}`);
  vrai("13. le plus : S4", Math.max(...v) === val(data, "S4"));
  dit(13, `${v.join(" + ")} = ${tot} kilos`);
  enonceDit(13, "L'objectif est de 100 kilos");
  dit(13, `100 ${MOINS} ${tot} = ${100 - tot} kilos manquent`);
});
essai("14", () => {
  const [data, o] = aLire(14);
  const g = (h) => val(data, `${h} h`);
  dit(14, `Une graduation vaut ${o.pas} crêpes`);
  vrai("14. le plus : 16 h", Math.max(...vals(data)) === g(16));
  const a = g(14) + g(15), b = g(17) + g(18);
  dit(14, `${g(14)} + ${g(15)} = ${a} crêpes. ${a} est plus petit que ${g(16)} : non`);
  vrai("14. b) non", a < g(16));
  dit(14, `${g(17)} + ${g(18)} = ${b} crêpes. Puis ${b} ${MOINS} ${g(16)} = ${b - g(16)} crêpes de plus`);
  dit(14, `${vals(data).join(" + ")} = ${somme(vals(data))} crêpes`);
});
essai("15", () => {
  const tot = 30;
  enonceDit(15, `${tot} élèves ont voté`);
  const p = apres(e(15).replace(/Pirate /, "Pirate : "), "Pirate"), co = apres(e(15).replace(/Comète /, "Comète : "), "Comète"), bi = apres(e(15).replace(/Biscuit /, "Biscuit : "), "Biscuit");
  dit(15, `${p} + ${co} + ${bi} = ${p + co + bi}`);
  vrai("15. le total ne colle pas", p + co + bi !== tot);
  dit(15, `Il manque ${tot} ${MOINS} ${p + co + bi} = ${tot - p - co - bi} votes`);
  const vraiCo = tot - p - bi;
  dit(15, `${tot} ${MOINS} ${p} ${MOINS} ${bi} = ${vraiCo} votes pour Comète`);
  dit(15, `${p} + ${vraiCo} + ${bi} = ${tot}`);
  const [data, o] = dessin("barres", 15, "schema");
  vrai("15. le schéma : les vraies barres", memes(vals(data), [p, vraiCo, bi]));
  vrai("15. Zoé a lu UNE graduation trop bas", vraiCo - co === o.pas);
  dit(15, `${co} au lieu de ${vraiCo}`);
});
essai("16", () => {
  const tot = 60, pas = 5;
  enonceDit(16, `${tot} pots de miel`);
  const av = apres(e(16), "Avril"), ma = apres(e(16), "Mai"), ju = apres(e(16), "Juin");
  const connus = av + ma + ju, jl = tot - connus;
  dit(16, `${av} + ${ma} + ${ju} = ${connus} pots`);
  dit(16, `Il reste ${tot} ${MOINS} ${connus} = ${jl} pots pour juillet`);
  dit(16, `${av} + ${ma} + ${ju} + ${jl} = ${tot}`);
  dit(16, `Cela fait ${grad(jl, pas)} graduations`);
  vrai("16. juillet le plus haut", jl > Math.max(av, ma, ju));
  const [data, o] = dessin("barres", 16, "schema");
  vrai("16. le schéma", o.pas === pas && memes(vals(data), [av, ma, ju, jl]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [data, o] = aLire(17);
  const fo = val(data, "fourmi"), ar = val(data, "araignée"), po = val(data, "poule");
  // ⭐ Le fait réel : insecte 6 pattes, araignée 8, oiseau 2.
  vrai("17. le fait réel : 6, 8, 2 pattes", fo === 6 && ar === 8 && po === 2);
  dit(17, `Une graduation vaut ${o.pas} pattes`);
  dit(17, `${ar} ${MOINS} ${fo} = ${ar - fo} pattes de plus`);
  enonceDit(17, "2 araignées et 3 fourmis");
  dit(17, `2 × ${ar} = ${2 * ar} pattes`);
  dit(17, `3 × ${fo} = ${3 * fo} pattes`);
  dit(17, `${2 * ar} + ${3 * fo} = ${2 * ar + 3 * fo} pattes`);
  dit(17, `4 × ${po} = ${4 * po}`);
  vrai("17. d) oui", 4 * po === ar);
});
essai("18", () => {
  const m = ["Mars", "Avril", "Mai", "Juin"].map((x) => apres(e(18), x));
  const max = Math.max(...m);
  const bons = [1, 2, 5, 10].filter((p) => m.every((v) => v % p === 0) && Math.ceil(max / p) <= 6);
  vrai("18. un seul pas convient : 5", memes(bons, [5]));
  dit(18, `il faudrait ${max} graduations pour mai`);
  vrai("18. pas de 2 et de 10 : 15 et 5 ne tombent pas", [2, 10].every((p) => m[0] % p && m[3] % p));
  dit(18, `Et ${max} demande ${max / 5} graduations`);
  dit(18, `Cela fait ${m[0] / 5} graduations`);
  dit(18, `${m.join(" + ")} = ${somme(m)} jours de pluie`);
  dit(18, `30 ${MOINS} ${m[3]} = ${30 - m[3]} jours sans pluie`);
  const [data, o] = dessin("barres", 18, "schema");
  vrai("18. le schéma", o.pas === 5 && memes(vals(data), m));
});
essai("19", () => {
  const [data, o] = aLire(19);
  const [ga, eg, ro, vi] = ["Gaulois", "Égypte", "Romains", "Vikings"].map((l) => val(data, l));
  const tot = ga + eg + ro + vi;
  dit(19, `Une graduation vaut ${o.pas} visiteurs`);
  vrai("19. le plus : Égypte", Math.max(ga, eg, ro, vi) === eg);
  dit(19, `${ga} + ${eg} + ${ro} + ${vi} = ${tot} visiteurs`);
  const g1 = ga + ro, g2 = eg + vi;
  dit(19, `Groupe 1 : ${ga} + ${ro} = ${g1}. Groupe 2 : ${eg} + ${vi} = ${g2}.`);
  dit(19, `${Math.max(g1, g2)} ${MOINS} ${Math.min(g1, g2)} = ${Math.abs(g1 - g2)} visiteurs`);
  dit(19, `${data.length} × 10 = ${data.length * 10}`);
  dit(19, `${tot} + ${data.length * 10} = ${tot + data.length * 10} visiteurs`);
});
essai("20", () => {
  const tot = 50, pas = 5;
  enonceDit(20, `${tot} élèves`);
  const [y, fr, ga] = ["Yaourt", "Fruit", "Gâteau"].map((x) => apres(e(20), x));
  const co = tot - y - fr - ga;
  dit(20, `${y} + ${fr} + ${ga} = ${y + fr + ga}`);
  dit(20, `${tot} ${MOINS} ${y + fr + ga} = ${co} compotes`);
  dit(20, `${y} + ${fr} + ${ga} + ${co} = ${tot}`);
  dit(20, `Cela fait ${grad(ga, pas)} graduations`);
  dit(20, `${fr} + ${co} = ${fr + co}. C'est le gâteau : vrai`);
  vrai("20. c) vrai", fr + co === ga);
  dit(20, `${y} + ${fr} + ${co} = ${y + fr + co} votes`);
  vrai("20. d) faux", y + fr + co > ga);
  const [data, o] = dessin("barres", 20, "schema");
  vrai("20. le schéma", o.pas === pas && memes(vals(data), [y, fr, ga, co]));
});

/* ═══ Texte du CM : pas de KaTeX, pas de « évidemment », de vrais signes ═══ */
const textes = f.feuille.textes;
vrai("aucun $ : texte simple au CM", textes.every((s) => !s.includes("$")));
vrai("jamais « évidemment »", !/évidemment/i.test(f.src));
vrai("soustractions avec le vrai signe « − »", textes.every((s) => !/\d - \d/.test(s)));
vrai("aucune moyenne, aucun pourcentage au CM1", textes.every((s) => !/moyenne|%|pourcent/i.test(s)));

f.fin();
