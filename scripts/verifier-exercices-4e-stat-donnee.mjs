// Recalcul indépendant de la feuille « Lire et interpréter des données » de 4e
// (21/10/2026) : lib/fiches-exercices/maths-4e-stat-donnee.tsx.
//
// ⭐ L'AUTRE CHEMIN : les valeurs des barres, des bâtons, des disques et des
// tableaux sont RELUES dans les appels de dessin ; celles des exercices sans
// figure imprimée sont relues dans l'ÉNONCÉ (et le schéma d'écran doit porter
// les mêmes). Le script refait chaque total, effectif, fréquence (fraction
// simplifiée, décimal, pourcentage), pourcentage d'un total, angle, et cherche
// le résultat dans le corrigé. Il recompte aussi les lettres du proverbe (4) et
// les choix des vingt joueurs (12) à partir du texte de l'énoncé. Il vérifie :
//   · l'axe gradué : aucune valeur écrite sur une figure graduée, chaque
//     valeur sur une graduation OU au milieu de deux, et toute valeur au milieu
//     LUE par l'élève annoncée « au milieu, entre a et b » dans le corrigé ;
//   · le rendu : libellés qui tiennent dans leur colonne, 8 intervalles au
//     plus, légendes courtes, tableaux réguliers de 5 colonnes au plus ;
//   · les données réelles (tennis, départements, RTE, os, EFS, piano) ;
//   · le texte : « ÷ » et jamais a/b hors fraction, virgule décimale, aucune
//     médiane ni étendue (notion voisine).
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe 4e).
// Usage : node scripts/verifier-exercices-4e-stat-donnee.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-4e-stat-donnee.tsx", "stat_donnee", ["barres", "camembert", "grille"], "4e");
const { e, vrai, dit, enonceDit, dessin, appels, essai, src, feuille } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const val = (data, l) => data.find((d) => d.label === l).value;
const vals = (data) => data.map((d) => d.value);
const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
const arrondi = (x, n = 6) => Math.round(x * 10 ** n) / 10 ** n;
/** 0.375 → « 0{,}375 » (dans une formule) ; `plat` → « 0,375 » (dans le texte). */
const tx = (x) => String(arrondi(x)).replace(".", "{,}");
const plat = (x) => String(arrondi(x)).replace(".", ",");
const pc = (x) => plat(x * 100);
const frac = (a, b) => `\\dfrac{${a}}{${b}}`;
const simple = (a, b) => frac(a / pgcd(a, b), b / pgcd(a, b));
/** « 10, 3, 7 et 4 ». */
const liste = (xs) => `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
const plus = (xs) => xs.join(" + ");
const milieu = (v, pas, debut = 0) => `au milieu, entre ${v - pas / 2} et ${v + pas / 2}`;
/** La case (ligne de titre t, colonne c) d'un tableau `grille`. */
const caseDe = ([ent, lignes], t, c) => lignes.find((l) => l[0] === t)[ent.indexOf(c)];
/** Les nombres entiers d'un texte, dans l'ordre. */
const nombres = (texte) => [...texte.matchAll(/\d+/g)].map((m) => Number(m[0]));

/* ═══ Rendu des aides locales ═══ */
for (const { args } of appels("barres").filter((a) => a.args)) {
  const [data, o = {}] = args;
  const G = o.pas ? 44 : 16;
  const slot = (300 - G - 10) / data.length;
  for (const d of data) vrai(`barres : « ${d.label} » tient dans sa colonne (${slot.toFixed(0)})`, d.label.length * 8.2 <= slot - 4);
  if (o.pas) {
    const debut = o.debut ?? 0;
    const vmax = debut + Math.ceil((Math.max(...vals(data)) - debut) / o.pas) * o.pas;
    vrai(`barres graduées : ${(vmax - debut) / o.pas} intervalles, 8 au plus`, (vmax - debut) / o.pas <= 8);
    vrai("barres graduées : chaque valeur sur une graduation ou au milieu", data.every((d) => (2 * (d.value - debut)) % o.pas === 0 && d.value >= debut));
  }
  if (o.batons) vrai("bâtons : des valeurs numériques en bas", data.every((d) => /^\d+$/.test(d.label)));
}
for (const { args } of appels("camembert").filter((a) => a.args)) {
  const [data, valeurs = true, pourcent = false] = args;
  const tot = somme(vals(data));
  if (pourcent) {
    vrai("camembert en pourcentages : 100 % en tout", tot === 100);
    for (const d of data) vrai(`camembert : « ${d.label} : ${d.value} % » ≤ 24 signes`, `${d.label} : ${d.value} %`.length <= 24);
  } else {
    for (const d of data) vrai(`camembert : « ${d.label} » ≤ 12 signes`, d.label.length <= 12);
    if (valeurs) {
      const petit = data.map((d) => d.value / tot < 0.15);
      data.forEach((d, i) => vrai(`camembert : « ${d.label} » et son voisin ne sont pas deux petits secteurs`, data.length < 3 || !(petit[i] && petit[(i + 1) % data.length])));
    }
  }
}
for (const { args } of appels("grille").filter((a) => a.args)) {
  const [ent, lignes] = args;
  vrai(`grille « ${ent[0]} » : 5 colonnes au plus`, ent.length <= 5);
  vrai(`grille « ${ent[0]} » : lignes de la largeur de l'entête`, lignes.every((l) => l.length === ent.length));
  vrai(`grille « ${ent[0]} » : texte nu, sans $`, !JSON.stringify(args).includes("$"));
}

/* ═══ Le texte de la 4e ═══ */
const textes = feuille.textes.join(" ");
vrai("aucune médiane ni étendue (notion stat_statistique)", !/médiane|étendue/i.test(textes));
vrai("pas de « évidemment »", !/évidemment/i.test(textes));
vrai("pas de « / » comme division", !/\d ?\/ ?\d/.test(textes));
vrai("virgule décimale, jamais de point", !/\d\.\d/.test(textes));
vrai("les figures graduées n'écrivent pas leurs valeurs (pas de showValues)", !/showValues/.test(src));

/** Une figure graduée de l'exercice k : chaque valeur « au milieu » que la question fait lire est annoncée. */
const milieuxDits = (k, aLire) => {
  const [data, o] = dessin("barres", k, "figure");
  for (const d of data) if ((d.value - (o.debut ?? 0)) % o.pas !== 0 && aLire.includes(d.label)) dit(k, milieu(d.value, o.pas));
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const g = dessin("grille", 1, "figure");
  const [ent, lignes] = g;
  // ⭐ Données réelles : titres du Grand Chelem à la fin de 2025.
  vrai("1. les palmarès : 24, 22, 20", memes(["Djokovic", "Nadal", "Federer"].map((j) => somme(lignes.map((l) => l[ent.indexOf(j)]))), [24, 22, 20]));
  dit(1, `Ligne « Roland-Garros », colonne « Nadal » : je lis ${caseDe(g, "Roland-Garros", "Nadal")}.`);
  dit(1, `Ligne « Wimbledon », colonne « Federer » : je lis ${caseDe(g, "Wimbledon", "Federer")}.`);
  dit(1, `lire ${caseDe(g, "Wimbledon", "Djokovic")}, la case de Djokovic`);
  const dj = lignes.map((l) => l[ent.indexOf("Djokovic")]);
  dit(1, `colonne « Djokovic » : ${liste(dj)}. Le plus grand est ${Math.max(...dj)} : l'Open d'Australie`);
  vrai("1. c) l'Open d'Australie, seul en tête", lignes[dj.indexOf(Math.max(...dj))][0] === "Open d'Australie" && dj.filter((x) => x === Math.max(...dj)).length === 1);
  const us = lignes.find((l) => l[0] === "US Open").slice(1);
  dit(1, `ligne « US Open » : ${liste(us)}. Le plus grand est ${Math.max(...us)} : Federer`);
  vrai("1. d) Federer, seul en tête", ent[1 + us.indexOf(Math.max(...us))] === "Federer" && us.filter((x) => x === Math.max(...us)).length === 1);
});
essai("2", () => {
  const [data, o] = dessin("barres", 2, "figure");
  vrai("2. gradué de 10 en 10", o.pas === 10);
  dit(2, `sur la ligne ${val(data, "M")} : ${val(data, "M")} T-shirts`);
  milieuxDits(2, ["S", "XL", "L"]);
  dit(2, `${milieu(val(data, "S"), 10)} : ${val(data, "S")} T-shirts`);
  dit(2, `${milieu(val(data, "XL"), 10)} : ${val(data, "XL")} T-shirts`);
  dit(2, `${milieu(val(data, "L"), 10)} : ${val(data, "L")}. La barre XS est sur la ligne ${val(data, "XS")}`);
  dit(2, `$${val(data, "L")} - ${val(data, "XS")} = ${val(data, "L") - val(data, "XS")}$ T-shirts de plus`);
  dit(2, `Réponse : a) ${val(data, "M")} ; b) ${val(data, "S")} ; c) ${val(data, "XL")} ; d) ${val(data, "L") - val(data, "XS")} de plus.`);
});
essai("3", () => {
  const [data, o] = dessin("barres", 3, "figure");
  vrai("3. bâtons gradués de 2 en 2", o.batons === true && o.pas === 2);
  enonceDit(3, `fait ${somme(vals(data))} sorties`);
  milieuxDits(3, ["2", "3"]);
  dit(3, `Le bâton de 2 clients s'arrête ${milieu(val(data, "2"), 2)} : ${val(data, "2")} sorties`);
  dit(3, `Le bâton de 3 clients s'arrête ${milieu(val(data, "3"), 2)} : ${val(data, "3")} sorties`);
  dit(3, `Le bâton de 4 clients est sur la ligne ${val(data, "4")} : ${val(data, "4")} sorties`);
  dit(3, `$${plus(vals(data))} = ${somme(vals(data))}$ sorties`);
  const max = Math.max(...vals(data));
  vrai("3. d) 2 clients, seul en tête", data.filter((d) => d.value === max).map((d) => d.label).join() === "2");
  dit(3, `répondre ${max}. ${max} est l'effectif`);
});
essai("4", () => {
  const phrase = e(4).match(/« ([^»]+) »/)[1];
  const mots = phrase.toLowerCase().split(/[^a-zàéèêîôûç]+/).filter(Boolean);
  const lettres = mots.join("").replace(/à/g, "a");
  const n = {};
  for (const l of lettres) n[l] = (n[l] ?? 0) + 1;
  dit(4, mots.map((m) => `${m} (${m.length})`).join(", "));
  dit(4, `$${plus(mots.map((m) => m.length))} = ${lettres.length}$ lettres`);
  dit(4, `$2 + 2 + 1 = ${n.t}$`);
  vrai("4. b) cinq t", n.t === 5);
  dit(4, `« nid » : $1 + 1 + 1 + 1 + 1 = ${n.i}$`);
  const max = Math.max(...Object.values(n));
  vrai("4. c) le t et le i, seuls en tête", memes(Object.keys(n).filter((l) => n[l] === max).sort(), ["i", "t"]));
  dit(4, `un dans « oiseau » : ${n.e}.`);
  const [d] = dessin("barres", 4, "schema");
  vrai("4. le schéma : chaque lettre, dans l'ordre d'apparition", memes(d.map((x) => [x.label, x.value]), [...new Set(lettres)].map((l) => [l, n[l]])));
  dit(4, `Réponse : a) ${lettres.length} lettres ; b) ${n.t} ; c) le t et le i, ${max} chacun ; d) ${n.e}.`);
});
essai("5", () => {
  const [, lignes] = dessin("grille", 5, "figure");
  enonceDit(5, "les 30 jours d'avril");
  const connus = lignes.filter((l) => typeof l[1] === "number").map((l) => l[1]);
  const manque = 30 - somme(connus);
  dit(5, `$${plus(connus)} = ${somme(connus)}$`);
  dit(5, `$30 - ${somme(connus)} = ${manque}$ jours « mauvais »`);
  const B = (t) => (lignes.find((l) => l[0] === t)[1] === "?" ? manque : lignes.find((l) => l[0] === t)[1]);
  const pire = B("dégradé") + B("mauvais") + B("très mauvais");
  dit(5, `$${B("dégradé")} + ${B("mauvais")} + ${B("très mauvais")} = ${pire}$ jours`);
  dit(5, `$${B("bon")} + ${B("moyen")} = ${B("bon") + B("moyen")}$ jours`);
  dit(5, `$${B("bon") + B("moyen")} + ${pire} = 30$`);
  dit(5, `et trouver ${30 - (somme(connus) - B("très mauvais"))}`);
});
essai("6", () => {
  const [T, j] = nombres(e(6).split("\n")[0]);
  dit(6, `$${frac(j, T)} = ${simple(j, T)}$`);
  dit(6, `$${j} \\div ${T} = ${tx(j / T)}$`);
  dit(6, `soit ${pc(j / T)} %`);
  dit(6, `$${T} - ${j} = ${T - j}$ manchots. $${T - j} \\div ${T} = ${tx((T - j) / T)}$`);
  dit(6, `$${tx(j / T)} + ${tx((T - j) / T)} = 1$`);
  dit(6, `diviser ${j} par ${T - j}`);
  vrai("6. le schéma", memes(vals(dessin("camembert", 6, "schema")[0]), [j, T - j]));
});
essai("7", () => {
  const g = dessin("grille", 7, "figure");
  const v = g[1].map((l) => l[1]);
  const T = somme(v);
  const fb = caseDe(g, "framboise", "macarons"), pi = caseDe(g, "pistache", "macarons");
  dit(7, `$${plus(v)} = ${T}$ macarons`);
  dit(7, `$${frac(fb, T)} = ${simple(fb, T)}$, et $${fb} \\div ${T} = ${tx(fb / T)}$, soit ${pc(fb / T)} %`);
  dit(7, `$${pi} \\div ${T} = ${tx(pi / T)}$, soit ${pc(pi / T)} %`);
  dit(7, `diviser par ${caseDe(g, "chocolat", "macarons")}, le nombre de macarons au chocolat, ou par ${T - fb}`);
});
essai("8", () => {
  const [T, d] = nombres(e(8).split("\n")[0]);
  const seuil = Number(e(8).match(/plus de (\d+) %/)[1]);
  dit(8, `$${frac(d, T)}$.`);
  dit(8, `$${d} \\div ${T} = ${tx(d / T)}$`);
  dit(8, `soit ${pc(d / T)} %`);
  vrai("8. d) refusé", d / T > seuil / 100);
  dit(8, `${pc(d / T)} % est plus que ${seuil} % : oui, le lot est refusé`);
  vrai("8. le schéma", memes(vals(dessin("barres", 8, "schema")[0]), [d, T - d]));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = dessin("grille", 9, "figure");
  const [, lignes] = g;
  const v = lignes.map((l) => l[1]);
  const T = somme(v);
  // ⭐ Données réelles : 96 départements en métropole, 101 en tout (INSEE).
  vrai("9. 13 régions, 96 départements", lignes.length === 13 && T === 96);
  dit(9, `Ligne « Bretagne » : ${caseDe(g, "Bretagne", "départements")} départements`);
  const max = Math.max(...v);
  vrai("9. b) l'Occitanie, seule en tête", lignes.filter((l) => l[1] === max).map((l) => l[0]).join() === "Occitanie");
  dit(9, `Le plus grand nombre de la colonne est ${max} : l'Occitanie`);
  const cinq = lignes.filter((l) => l[1] === 5).map((l) => l[0]);
  dit(9, `Je cherche les 5 : ${cinq.join(", ")}. Cela fait ${cinq.length} régions`);
  dit(9, `$${plus(v)} = ${T}$ départements`);
  enonceDit(9, "101 départements en tout");
  dit(9, `$101 - ${T} = ${101 - T}$ départements d'outre-mer`);
  const idf = caseDe(g, "Île-de-France", "départements");
  dit(9, `$${frac(idf, T)}$. Je simplifie par ${pgcd(idf, T)} : $${frac(idf, T)} = ${simple(idf, T)}$`);
  dit(9, `répondre ${lignes.length}. ${lignes.length} est le nombre de LIGNES`);
});
essai("10", () => {
  const [data, o] = dessin("barres", 10, "figure");
  const n = (l) => val(data, l);
  enonceDit(10, "chaque jour de juin");
  vrai("10. 30 jours", somme(vals(data)) === 30);
  milieuxDits(10, ["5", "6"]);
  dit(10, `Le bâton de 4 est sur la ligne ${n("4")} : ${n("4")} jours`);
  dit(10, `Le bâton de 5 s'arrête ${milieu(n("5"), o.pas)} : ${n("5")} jours`);
  dit(10, `Je lis tous les bâtons : ${liste(vals(data))}`);
  const auMilieu = data.filter((d) => d.value % o.pas !== 0).map((d, i) => (i ? `de ${d.label}` : d.label));
  dit(10, `Les bâtons de ${liste(auMilieu)} s'arrêtent au milieu de deux graduations`);
  dit(10, `$${plus(vals(data))} = 30$ jours`);
  dit(10, `Le bâton de 6 s'arrête ${milieu(n("6"), o.pas)} : ${n("6")}. Celui de 7 est sur la ligne ${n("7")}`);
  dit(10, `$${n("6")} + ${n("7")} = ${n("6") + n("7")}$ jours`);
  const produits = data.map((d) => Number(d.label) * d.value);
  dit(10, `$${data.map((d) => `${d.label} \\times ${d.value}`).join(" + ")} = ${plus(produits)} = ${somme(produits)}$ interventions`);
  dit(10, `$2 \\times ${n("2")} = ${2 * n("2")}$`);
  const valeurs = data.map((d) => Number(d.label));
  dit(10, `$${plus(valeurs)} = ${somme(valeurs)}$`);
  dit(10, `d) ${n("6") + n("7")} jours ; e) ${somme(produits)} interventions`);
});
essai("11", () => {
  const [data, valeurs, pourcent] = dessin("camembert", 11, "figure");
  // ⭐ Données réelles : RTE, Bilan électrique 2023, parts arrondies.
  vrai("11. les parts de RTE", memes(vals(data), [65, 12, 15, 8]) && valeurs === false && pourcent === true);
  enonceDit(11, "environ 495 TWh");
  const nu = val(data, "nucléaire") / 100;
  dit(11, `65 % $= ${frac(65, 100)} = ${tx(nu)}$`);
  dit(11, `$${tx(nu)} \\times 495 = ${tx(nu * 495)}$, soit environ ${Math.round(nu * 495)} TWh`);
  vrai("11. b) tout près des 320,4 TWh mesurés", Math.abs(Math.round(nu * 495) - 320.4) / 320.4 < 0.01);
  const ren = val(data, "hydraulique") + val(data, "éolien, solaire");
  dit(11, `$${val(data, "hydraulique")} + ${val(data, "éolien, solaire")} = ${ren}$, soit ${ren} %`);
  vrai("11. c) un peu plus d'un quart", ren > 25 && ren < 30);
  dit(11, `$${tx(nu)} \\times 360 = ${arrondi(nu * 360)}$°`);
  dit(11, "répondre 65 TWh");
});
essai("12", () => {
  const choix = e(12).match(/dans l'ordre : ([A-Z, ]+)\./)[1].split(", ");
  vrai("12. vingt joueurs", choix.length === 20);
  const n = {};
  for (const c of choix) n[c] = (n[c] ?? 0) + 1;
  const ordre = ["G", "M", "A", "S"];
  dit(12, `G : ${n.G}. M : ${n.M}. A : ${n.A}. S : ${n.S}.`);
  dit(12, `$${plus(ordre.map((l) => n[l]))} = 20$ joueurs`);
  for (const l of ordre) dit(12, `${l} : $${n[l]} \\div 20 = ${tx(n[l] / 20)}$, soit ${pc(n[l] / 20)} %`);
  dit(12, "$100 \\div 20 = 5$ %");
  dit(12, `$${plus(ordre.map((l) => pc(n[l] / 20)))} = 100$`);
  const min = Math.min(...ordre.map((l) => n[l]));
  vrai("12. d) la soigneuse, seule en dernier", ordre.filter((l) => n[l] === min).join() === "S");
  dit(12, `Le plus petit effectif est ${min} : la soigneuse`);
  const [, lignes] = dessin("grille", 12, "schema");
  vrai("12. le schéma : effectifs et fréquences", memes(lignes.slice(0, 4), ordre.map((l) => [l, n[l], `${pc(n[l] / 20)} %`])));
});
essai("13", () => {
  const g = dessin("grille", 13, "figure");
  const c = (t, m) => caseDe(g, t, m);
  const tout = somme(g[1].flatMap((l) => l.slice(1)));
  vrai("13. 500 habitants", tout === 500);
  enonceDit(13, "500 habitants");
  dit(13, `Ligne « moins de 5 km », colonne « vélo » : ${c("moins de 5 km", "vélo")} habitants`);
  const velo = c("moins de 5 km", "vélo") + c("5 km ou plus", "vélo");
  dit(13, `$${c("moins de 5 km", "vélo")} + ${c("5 km ou plus", "vélo")} = ${velo}$ habitants`);
  const voit = c("moins de 5 km", "voiture") + c("5 km ou plus", "voiture");
  dit(13, `$${c("moins de 5 km", "voiture")} + ${c("5 km ou plus", "voiture")} = ${voit}$. Le total est 500`);
  dit(13, `$${voit} \\div 500 = ${tx(voit / 500)}$, soit ${pc(voit / 500)} %`);
  const court = g[1][0].slice(1);
  const C = somme(court);
  dit(13, `$${plus(court)} = ${C}$ trajets. $${court[0]} \\div ${C} = ${tx(court[0] / C)}$, soit ${pc(court[0] / C)} %`);
  vrai("13. e) près de la moitié, sans l'atteindre", court[0] / C < 0.5 && court[0] / C >= 0.45);
  dit(13, `diviser ${court[0]} par 500`);
});
essai("14", () => {
  const [data, o] = dessin("barres", 14, "figure");
  const [a, b] = [val(data, "2022"), val(data, "2025")];
  vrai("14. axe tronqué : de 5 en 5 à partir de 60", o.pas === 5 && o.debut === 60);
  const grads = Array.from({ length: (Math.max(...vals(data)) - o.debut) / o.pas + 1 }, (_, k) => o.debut + k * o.pas);
  dit(14, `Les nombres de l'axe sont ${grads.join(", ")} : il va de ${o.pas} en ${o.pas}, et il commence à ${o.debut}`);
  dit(14, `sur la ligne ${a} : ${a} 000 abonnés. Celle de 2025 sur la ligne ${b} : ${b} 000 abonnés`);
  dit(14, `$${a} - ${o.debut} = ${a - o.debut}$`);
  dit(14, `$${b} - ${o.debut} = ${b - o.debut}$`);
  const r = (b - o.debut) / (a - o.debut);
  dit(14, `$${b - o.debut} \\div ${a - o.debut} = ${tx(r)}$ : sur le dessin, elle paraît ${plat(r)} fois plus haute`);
  dit(14, `$2 \\times ${a} = ${2 * a}$ milliers. On n'en a que ${b} : non`);
  vrai("14. d) pas doublé", b < 2 * a);
  dit(14, `$${b} - ${a} = ${b - a}$ milliers`);
  dit(14, `$${b} \\div ${a} \\approx ${tx(arrondi(b / a, 1))}$`);
});
essai("15", () => {
  const [, lignes] = dessin("grille", 15, "figure");
  const T = somme(lignes.map((l) => l[1]));
  enonceDit(15, `ses ${T} candidats`);
  // ⭐ Donnée réelle : 40 questions, 35 bonnes réponses au moins, donc 5 fautes au plus.
  const s = Number(e(15).match(/réussi avec (\d+) fautes au plus/)[1]);
  vrai("15. la règle du code : 40 − 35 = 5", e(15).includes("40 questions") && 40 - 35 === s);
  dit(15, `Ligne « 3 fautes » : ${lignes.find((l) => l[0] === 3)[1]} candidats`);
  dit(15, `$${plus(lignes.map((l) => l[1]))} = ${T}$ candidats`);
  const ok = lignes.filter((l) => l[0] <= s).map((l) => l[1]);
  const R = somme(ok);
  dit(15, `$${plus(ok)} = ${R}$ candidats`);
  dit(15, `$${R} \\div ${T} = ${tx(R / T)}$, soit ${pc(R / T)} %`);
  dit(15, `$${T} - ${R} = ${T - R}$ candidats. $${T - R} \\div ${T} = ${tx((T - R) / T)}$, soit ${pc((T - R) / T)} %`);
  dit(15, `$${pc(R / T)} + ${pc((T - R) / T)} = 100$`);
  dit(15, `${R} et non ${R - lignes.find((l) => l[0] === s)[1]}`);
});
essai("16", () => {
  const [nA, mA, nB, mB] = nombres(e(16).split("\n")[0]);
  const [fA, fB] = [mA / nA, mB / nB];
  vrai("16. A a plus de malades, B est plus touchée", mA > mB && fB > fA);
  dit(16, `${mA} malades contre ${mB} : la serre A en a le plus`);
  dit(16, `$${mA} \\div ${nA} = ${tx(fA)}$, soit ${pc(fA)} %`);
  dit(16, `$${mB} \\div ${nB} = ${tx(fB)}$, soit ${pc(fB)} %`);
  dit(16, `${pc(fB)} % est plus que ${pc(fA)} % : la serre B est la plus touchée`);
  const [m, n] = [mA + mB, nA + nB];
  dit(16, `$${mA} + ${mB} = ${m}$ malades sur $${nA} + ${nB} = ${n}$ plants`);
  dit(16, `$${m} \\div ${n} = ${tx(m / n)}$, soit ${pc(m / n)} %`);
  const moy = (fA * 100 + fB * 100) / 2;
  vrai("16. d) la moyenne des pourcentages est fausse", arrondi(moy) !== arrondi((m / n) * 100));
  dit(16, `$(${pc(fA)} + ${pc(fB)}) \\div 2 = ${tx(moy)}$`);
  vrai("16. le schéma", memes(vals(dessin("barres", 16, "schema")[0]), [arrondi(fA * 100), arrondi(fB * 100)]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [, lignes] = dessin("grille", 17, "figure");
  enonceDit(17, "compte 206 os");
  const connus = lignes.filter((l) => typeof l[1] === "number").map((l) => l[1]);
  const S = somme(connus);
  const reste = 206 - S;
  // ⭐ Données réelles : 27 os par main, 26 par pied, 22 au crâne, 26 à la
  // colonne, 25 à la cage thoracique ; le reste : 4 + 6 + 2 + 8 + 1 + 6.
  vrai("17. les comptes de l'anatomie", memes(connus, [2 * 27, 2 * 26, 26, 25, 22]) && reste === 4 + 6 + 2 + 8 + 1 + 6);
  dit(17, `$${plus(connus)} = ${S}$`);
  dit(17, `$206 - ${S} = ${reste}$ os pour le reste du corps`);
  const [ma, pi] = connus;
  dit(17, `$${ma} \\div 206 \\approx ${tx((ma / 206).toFixed(3))}$, soit environ $${tx((ma / 206).toFixed(2))}$`);
  vrai("17. c) plus d'un quart", ma / 206 > 0.25 && Number((ma / 206).toFixed(2)) > 0.25);
  dit(17, `$206 \\div 4 = ${tx(206 / 4)}$, et ${ma} dépasse $${tx(206 / 4)}$`);
  dit(17, `$${ma} + ${pi} = ${ma + pi}$ os. La moitié de 206 est $206 \\div 2 = ${206 / 2}$`);
  vrai("17. d) plus de la moitié", ma + pi > 103);
  dit(17, `$${S} + ${reste} = 206$`);
});
essai("18", () => {
  const [data, valeurs, pourcent] = dessin("camembert", 18, "figure");
  // ⭐ Données réelles : groupes sanguins en France, EFS.
  vrai("18. les parts de l'EFS", memes(data.map((d) => [d.label, d.value]), [["A", 45], ["O", 42], ["B", 9], ["AB", 4]]) && !valeurs && pourcent);
  const N = Number(e(18).match(/attend (\d+) donneurs/)[1]);
  const p = (l) => val(data, l) / 100;
  const eff = (l) => arrondi(p(l) * N);
  dit(18, `La plus grande part est ${Math.max(...vals(data))} % : le groupe A`);
  dit(18, `$${tx(p("O"))} \\times ${N} = ${eff("O")}$ donneurs`);
  dit(18, `$${tx(p("AB"))} \\times ${N} = ${eff("AB")}$ donneurs`);
  const bo = val(data, "B") + val(data, "O");
  dit(18, `$${val(data, "B")} + ${val(data, "O")} = ${bo}$, soit ${bo} %`);
  vrai("18. d) plus de la moitié", bo > 50);
  dit(18, `$${tx(bo / 100)} \\times ${N} = ${arrondi((bo / 100) * N)}$ donneurs`);
  dit(18, `$${tx(p("A"))} \\times 360 = ${arrondi(p("A") * 360)}$°`);
  dit(18, `$${eff("A")} + ${eff("O")} + ${eff("B")} + ${eff("AB")} = ${N}$`);
  vrai("18. les effectifs refont le total", eff("A") + eff("O") + eff("B") + eff("AB") === N);
  dit(18, `répondre ${val(data, "O")} donneurs`);
});
essai("19", () => {
  const [N, oct, bl, no, k, bout, blB, noB] = nombres(e(19).split("\n")[0]);
  // ⭐ Données réelles : 88 touches, 52 blanches, 36 noires.
  vrai("19. le piano : 88 = 52 + 36", N === 88 && k * bl + blB === 52 && k * no + noB === 36 && bl + no === oct && blB + noB === bout);
  dit(19, `$${k} \\times ${oct} = ${k * oct}$ touches. Avec les ${bout} autres : $${k * oct} + ${bout} = ${N}$`);
  const [B, Nr] = [k * bl + blB, k * no + noB];
  dit(19, `Blanches : $${k} \\times ${bl} + ${blB} = ${B}$. Noires : $${k} \\times ${no} + ${noB} = ${Nr}$`);
  dit(19, `$${B} + ${Nr} = ${N}$`);
  vrai("19. 5/12 irréductible", pgcd(no, oct) === 1);
  dit(19, `$${frac(no, oct)}$ (on ne peut pas simplifier)`);
  dit(19, `$${frac(Nr, N)}$. Je simplifie par ${pgcd(Nr, N)} : $${frac(Nr, N)} = ${simple(Nr, N)}$`);
  dit(19, `$${no} \\div ${oct} \\approx ${tx((no / oct).toFixed(3))}$, soit environ $${tx((no / oct).toFixed(2))}$`);
  const [a, b] = [Nr / pgcd(Nr, N), N / pgcd(Nr, N)];
  dit(19, `$${a} \\div ${b} \\approx ${tx((a / b).toFixed(3))}$, soit environ $${tx((a / b).toFixed(2))}$`);
  vrai("19. d) pas égales au centième", (no / oct).toFixed(2) !== (a / b).toFixed(2));
  const [, lignes] = dessin("grille", 19, "schema");
  vrai("19. le schéma", memes(lignes, [["une octave", bl, no, oct], ["7 octaves", k * bl, k * no, k * oct], ["4 du bout", blB, noB, bout], ["le piano", B, Nr, N]]));
});
essai("20", () => {
  const g = dessin("grille", 20, "figure");
  const VAL = { "10 c": 0.1, "20 c": 0.2, "50 c": 0.5, "1 €": 1, "2 €": 2 };
  const euro = (x) => (Number.isInteger(arrondi(x)) ? String(arrondi(x)) : arrondi(x).toFixed(2).replace(".", "{,}"));
  const lignes = g[1];
  const n = lignes.map((l) => l[1]);
  const T = somme(n);
  dit(20, `$${plus(n)} = ${T}$ pièces`);
  const deux = caseDe(g, "2 €", "nombre");
  dit(20, `$${deux} \\div ${T} = ${tx(deux / T)}$, soit ${pc(deux / T)} %`);
  const montants = lignes.map((l) => arrondi(l[1] * VAL[l[0]]));
  lignes.forEach((l, i) => dit(20, `${l[0]} : $${l[1]} \\times ${euro(VAL[l[0]])} = ${euro(montants[i])}$ €`));
  const M = arrondi(somme(montants));
  dit(20, `$${montants.map(euro).join(" + ")} = ${euro(M)}$ €`);
  const part = montants[4] / M;
  dit(20, `$${euro(montants[4])} \\div ${euro(M)} \\approx ${tx(part.toFixed(3))}$, soit environ ${Math.round(part * 100)} %`);
  vrai("20. e) 13 % des pièces, bien plus de l'argent", Math.round(part * 100) > 3 * pc(deux / T));
  dit(20, `${pc(deux / T)} % des PIÈCES, mais elles valent environ ${Math.round(part * 100)} % de l'ARGENT`);
  vrai("20. le schéma : les montants", memes(vals(dessin("barres", 20, "schema")[0]), montants));
});

f.fin();
