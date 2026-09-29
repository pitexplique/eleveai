// Recalcul indépendant de la feuille « Lire et interpréter des données » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-stat-donnee.tsx.
//
// ⭐ L'AUTRE CHEMIN : les valeurs des barres, des disques, des points reliés et
// des tableaux sont RELUES dans les appels de dessin ; celles des exercices sans
// figure imprimée sont relues dans l'ÉNONCÉ (et le schéma d'écran doit porter
// les mêmes). Le script refait chaque total, écart, moitié, quart, tiers, et
// cherche le résultat dans le corrigé. Il vérifie aussi le rendu propre aux
// aides locales : libellés qui tiennent dans leur colonne, noms de légende
// courts, petits secteurs jamais voisins, graduations espacées.
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe 6e).
// Usage : node scripts/verifier-exercices-6e-stat-donnee.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-stat-donnee.tsx", "stat_donnee", ["barres", "camembert", "pointsRelies", "grille"], "6e");
const { e, vrai, dit, enonceDit, dessin, dessins, appels, essai } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const N = (x) => (x >= 1000 ? t(x) : String(x)); // 1050 → « 1\,050 »
/** Les nombres $…$ d'un texte, dans l'ordre. */
const nombresDe = (texte) => [...texte.matchAll(/\$(\d+(?:\\,\d{3})*)\$/g)].map((m) => Number(m[1].replace(/\\,/g, "")));
const val = (data, l) => data.find((d) => d.label === l).value;

/* ═══ Rendu des aides locales ═══ */
for (const { args } of appels("barres").filter((a) => a.args)) {
  const [data, opts = {}] = args;
  const G = opts.pas ? 44 : 16;
  const slot = (300 - G - 10) / data.length;
  for (const d of data) {
    vrai(`barres : « ${d.label} » tient dans sa colonne (${slot.toFixed(0)})`, d.label.length * 8.2 <= slot - 4);
    if (!opts.pas) vrai(`barres : la valeur ${d.value} tient dans sa colonne`, String(d.value).length * 8.5 <= slot);
  }
  if (opts.pas) {
    const vmax = Math.ceil(Math.max(...data.map((d) => d.value)) / opts.pas) * opts.pas;
    vrai(`barres graduées : ${vmax / opts.pas} intervalles, 6 au plus`, vmax / opts.pas <= 6);
    vrai("barres graduées : chaque valeur tombe sur une graduation", data.every((d) => d.value % opts.pas === 0));
  }
}
for (const { args } of appels("camembert").filter((a) => a.args)) {
  const [data] = args;
  const tot = somme(data.map((d) => d.value));
  for (const d of data) vrai(`camembert : « ${d.label} » ≤ 12 signes`, d.label.length <= 12);
  const petit = data.map((d) => d.value / tot < 0.15);
  data.forEach((d, i) => vrai(`camembert : « ${d.label} » et son voisin ne sont pas deux petits secteurs`, !(petit[i] && petit[(i + 1) % data.length])));
}
for (const { args } of appels("pointsRelies").filter((a) => a.args)) {
  const [etiq, vals, pas] = args;
  const slot = 242 / etiq.length;
  for (const l of etiq) vrai(`points reliés : « ${l} » tient dans sa colonne`, l.length * 8.2 <= slot - 4);
  const vmax = Math.ceil(Math.max(...vals) / pas) * pas;
  vrai(`points reliés : ${vmax / pas} graduations, 7 au plus`, vmax / pas <= 7);
  vrai("points reliés : autant d'étiquettes que de valeurs", etiq.length === vals.length);
}
for (const { args } of appels("grille").filter((a) => a.args)) {
  const [ent, lignes] = args;
  vrai(`grille (${ent[0]}) : trois colonnes au plus, lignes pleines`, ent.length <= 3 && lignes.every((l) => l.length === ent.length));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [data, o] = dessin("barres", 1, "figure");
  const v = data.map((d) => d.value);
  vrai("1. graduée de 2 en 2", o.pas === 2);
  dit(1, `je lis $${val(data, "avril")}$`);
  vrai("1. mai le plus, mars le moins", Math.max(...v) === val(data, "mai") && Math.min(...v) === val(data, "mars"));
  dit(1, `celle de mai : $${val(data, "mai")}$ hérissons`);
  dit(1, `celle de mars : $${val(data, "mars")}$ hérissons`);
  dit(1, `$${v.join(" + ")} = ${somme(v)}$`);
});
essai("2", () => {
  const [data, valeurs] = dessin("camembert", 2, "figure");
  const tot = somme(data.map((d) => d.value));
  vrai("2. le disque de l'énoncé est muet", valeurs === false);
  enonceDit(2, `compte $${tot}$ arbres`);
  vrai("2. chênes = moitié, érables = quart, pins = tilleuls", val(data, "chênes") * 2 === tot && val(data, "érables") * 4 === tot && val(data, "pins") === val(data, "tilleuls"));
  dit(2, `$${tot} \\div 2 = ${tot / 2}$ chênes`);
  dit(2, `$${tot} \\div 4 = ${tot / 4}$ érables`);
  const reste = tot - tot / 2 - tot / 4;
  dit(2, `$${tot} - ${tot / 2} - ${tot / 4} = ${reste}$ arbres`);
  dit(2, `$${reste} \\div 2 = ${val(data, "pins")}$ pins`);
  const [data2] = dessin("camembert", 2, "schema");
  vrai("2. le schéma : mêmes secteurs", memes(data2, data));
});
essai("3", () => {
  const [ent, lignes] = dessin("grille", 3, "figure");
  const g = (l, c) => lignes.find((x) => x[0] === l)[ent.indexOf(c)];
  dit(3, `colonne « 6e B » : je lis $${g("BD", "6e B")}$`);
  dit(3, `colonne « 6e A » : je lis $${g("romans", "6e A")}$`);
  dit(3, `Ligne « albums », colonne « 6e A » : je lis $${g("albums", "6e A")}$`);
  const neufs = lignes.flatMap((l) => l.slice(1).map((c, j) => [l[0], ent[j + 1], c])).filter((x) => x[2] === "9");
  vrai("3. un seul 9 : romans, 6e B", neufs.length === 1 && neufs[0][0] === "romans" && neufs[0][1] === "6e B");
});
essai("4", () => {
  const v = nombresDe(e(4).split("\\n")[0]);
  const [data] = dessin("barres", 4, "schema");
  vrai("4. le schéma porte les nombres de l'énoncé", memes(data.map((d) => d.value), v));
  const noms = ["6e A", "6e B", "6e C", "6e D"];
  vrai("4. la 6e B en tête", Math.max(...v) === v[1]);
  dit(4, `$${v[1]} - ${v[2]} = ${v[1] - v[2]}$ sacs`);
  const ordre = noms.map((n, i) => [n, v[i]]).sort((a, b) => b[1] - a[1]);
  dit(4, `$${ordre[0][1]}$, puis $${ordre[1][1]}$, puis $${ordre[2][1]}$, puis $${ordre[3][1]}$`);
  dit(4, `L'ordre est : ${ordre.map((o) => o[0]).join(", ")}`);
  dit(4, `$${v[3]} - ${v[2]} = ${v[3] - v[2]}$ sacs`);
});
essai("5", () => {
  const [tot, hand, foot, tennis, judo] = nombresDe(e(5).split("\\n")[0]);
  vrai("5. le total", hand + foot + tennis + judo === tot);
  const [data] = dessin("barres", 5, "schema");
  vrai("5. le schéma", memes(data.map((d) => d.value), [hand, foot, tennis, judo]));
  vrai("5. a) le foot en tête", foot === Math.max(hand, foot, tennis, judo));
  dit(5, `$2 \\times ${tennis} = ${2 * tennis}$`);
  vrai("5. b) faux", hand !== 2 * tennis);
  dit(5, `$${tot} \\div 2 = ${tot / 2}$`);
  vrai("5. c) faux", foot < tot / 2);
  dit(5, `$2 \\times ${judo} = ${2 * judo}$. C'est le tennis`);
  vrai("5. d) vrai", tennis === 2 * judo);
  dit(5, "Réponse : a) vrai ; b) faux ; c) faux ; d) vrai.");
});
essai("6", () => {
  const [et, v] = dessin("pointsRelies", 6, "figure");
  const T = (h) => v[et.indexOf(h)];
  dit(6, `le point porte $${T("12 h")}$`);
  const imax = v.indexOf(Math.max(...v));
  vrai("6. le plus chaud à 14 h", et[imax] === "14 h");
  dit(6, `à $14$ h : $${T("14 h")}$ °C`);
  dit(6, `$${T("14 h")} - ${T("8 h")} = ${T("14 h") - T("8 h")}$`);
  vrai("6. baisse après 14 h", T("16 h") < T("14 h"));
  dit(6, `de $${T("14 h")}$ °C à $${T("16 h")}$ °C, elle baisse de $${T("14 h") - T("16 h")}$ °C`);
});
essai("7", () => {
  const [data, valeurs] = dessin("camembert", 7, "figure");
  vrai("7. le disque porte ses valeurs", valeurs !== false);
  const v = data.map((d) => d.value), tot = somme(v);
  dit(7, `Son secteur porte $${val(data, "verre")}$`);
  vrai("7. les épluchures en tête", Math.max(...v) === val(data, "épluchures"));
  dit(7, `$${v.join(" + ")} = ${tot}$ kg`);
  dit(7, `$${tot} \\div 4 = ${tot / 4}$`);
  vrai("7. un seul quart : autres", memes(data.filter((d) => d.value * 4 === tot).map((d) => d.label), ["autres"]));
});
essai("8", () => {
  const [tot, pomme, banane, poire] = nombresDe(e(8));
  const orange = tot - pomme - banane - poire;
  dit(8, `$${pomme} + ${banane} + ${poire} = ${pomme + banane + poire}$`);
  dit(8, `$${tot} - ${pomme + banane + poire} = ${orange}$ oranges`);
  dit(8, `$${pomme} + ${banane} + ${poire} + ${orange} = ${tot}$`);
  dit(8, `$${tot} - ${pomme} = ${tot - pomme}$`);
  dit(8, `$${banane} + ${poire} + ${orange} = ${tot - pomme}$`);
  const [, ligne] = dessin("tableau", 8, "schema");
  vrai("8. le tableau complété", memes(ligne.slice(1), [pomme, banane, poire, orange]));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const v = nombresDe(e(9).split("\\n")[0]);
  const [data] = dessin("barres", 9, "schema");
  vrai("9. le schéma", memes(data.map((d) => d.value), v));
  const mn = Math.min(...v), mx = Math.max(...v);
  vrai("9. le moins : match 3, un seul", v.indexOf(mn) === 2 && v.filter((x) => x === mn).length === 1);
  vrai("9. le plus : matchs 2 et 5", memes(v.map((x, i) => (x === mx ? i + 1 : 0)).filter(Boolean), [2, 5]));
  dit(9, `Le plus petit nombre est $${mn}$ : c'est le match $3$`);
  dit(9, `$${mx} - ${mn} = ${mx - mn}$ buts`);
  dit(9, `$${v.join(" + ")} = ${somme(v)}$ buts`);
});
essai("10", () => {
  const [data, valeurs] = dessin("camembert", 10, "figure");
  const tot = somme(data.map((d) => d.value));
  vrai("10. disque muet", valeurs === false);
  enonceDit(10, `$${tot}$ €`);
  enonceDit(10, `coûtent $${val(data, "entrées")}$ €`);
  vrai("10. car = moitié, repas = quart", val(data, "car") * 2 === tot && val(data, "repas") * 4 === tot);
  dit(10, `$${tot} \\div 2 = ${tot / 2}$ €`);
  dit(10, `$${tot} \\div 4 = ${tot / 4}$ €`);
  const g = tot - tot / 2 - tot / 4 - val(data, "entrées");
  vrai("10. le goûter du dessin", g === val(data, "goûter"));
  dit(10, `$${tot} - ${tot / 2} - ${tot / 4} - ${val(data, "entrées")} = ${g}$ €`);
  vrai("10. le goûter est le plus petit", g === Math.min(...data.map((d) => d.value)));
  const [data2] = dessin("camembert", 10, "schema");
  vrai("10. le schéma : mêmes secteurs", memes(data2, data));
});
essai("11", () => {
  const [ent, lignes] = dessin("grille", 11, "figure");
  const g = (l, c) => Number(lignes.find((x) => x[0] === l)[ent.indexOf(c)]);
  dit(11, `Ligne « papillons », colonne « soir » : $${g("papillons", "soir")}$`);
  dit(11, `$${g("écureuils", "matin")} + ${g("écureuils", "soir")} = ${g("écureuils", "matin") + g("écureuils", "soir")}$ écureuils`);
  const m = lignes.map((l) => Number(l[1])), s = lignes.map((l) => Number(l[2]));
  dit(11, `Matin : $${m.join(" + ")} = ${somme(m)}$ animaux. Soir : $${s.join(" + ")} = ${somme(s)}$ animaux`);
  dit(11, `$${somme(m)} - ${somme(s)} = ${somme(m) - somme(s)}$ animaux de plus`);
  vrai("11. plus le soir : les écureuils seuls", memes(lignes.filter((l) => Number(l[2]) > Number(l[1])).map((l) => l[0]), ["écureuils"]));
});
essai("12", () => {
  const [A, B] = dessins("barres", 12).map((d) => d.args[0].map((x) => x.value));
  vrai("12. B = 3 × A, mois par mois", B.every((b, i) => b === 3 * A[i]));
  dit(12, `En janvier, A vend $${A[0]}$ vélos et B en vend $${B[0]}$`);
  dit(12, `$${B[1]} - ${A[1]} = ${B[1] - A[1]}$ vélos`);
  dit(12, `A : $${A.join(" + ")} = ${somme(A)}$ vélos. B : $${B.join(" + ")} = ${somme(B)}$ vélos`);
  dit(12, A.map((a, i) => `$3 \\times ${a} = ${B[i]}$`).join(", "));
});
essai("13", () => {
  const n = nombresDe(e(13).split("\\n")[0]);
  // 24 ; 20 h 30 : 3 ; 21 h : 9 ; 21 h 30 : 8 ; 22 h : 4
  const tot = n[0];
  const eff = [n[3], n[5], n[8], n[10]];
  vrai("13. le total", somme(eff) === tot);
  const [data] = dessin("barres", 13, "schema");
  vrai("13. le schéma", memes(data.map((d) => d.value), eff));
  vrai("13. a) 21 h en tête", Math.max(...eff) === eff[1]);
  dit(13, `Cela fait $${eff[2]} + ${eff[3]} = ${eff[2] + eff[3]}$ élèves`);
  dit(13, `$${tot} \\div 2 = ${tot / 2}$`);
  vrai("13. b) la moitié tout juste", eff[2] + eff[3] === tot / 2);
  dit(13, `$${tot} \\div 8 = ${tot / 8}$`);
  vrai("13. c) un sur huit", eff[0] === tot / 8);
});
essai("14", () => {
  const [et, v] = dessin("pointsRelies", 14, "figure");
  const A = (a) => v[et.indexOf(String(a))];
  dit(14, `je lis $${A(2022)}$ nids`);
  const d = v.slice(1).map((x, i) => x - v[i]);
  vrai("14. une seule baisse : 2023", memes(d.map((x, i) => (x < 0 ? et[i + 1] : null)).filter(Boolean), ["2023"]));
  dit(14, `de $${A(2022)}$ en $2022$ à $${A(2023)}$ en $2023$`);
  dit(14, `$${A(2024)} - ${A(2020)} = ${A(2024) - A(2020)}$ nids`);
  dit(14, `$${v[1]} - ${v[0]} = ${d[0]}$`);
  dit(14, `$${v[2]} - ${v[1]} = ${d[1]}$`);
  dit(14, `$${v[4]} - ${v[3]} = ${d[3]}$`);
  const imax = d.indexOf(Math.max(...d));
  vrai("14. plus forte hausse 2021 → 2022, pas au point le plus haut", imax === 1 && d.filter((x) => x === d[imax]).length === 1 && v.indexOf(Math.max(...v)) === 4);
});
essai("15", () => {
  const v = nombresDe(e(15).split("\\n")[0]);
  const [data] = dessin("barres", 15, "schema");
  vrai("15. le schéma", memes(data.map((d) => d.value), v));
  const [douche, wc, linge, cuisine] = v;
  dit(15, `$${v.join(" + ")} = ${somme(v)}$ litres`);
  dit(15, `$2 \\times ${wc} = ${2 * wc}$. C'est la douche : vrai`);
  vrai("15. c) vrai", douche === 2 * wc);
  dit(15, `$${wc} + ${linge} + ${cuisine} = ${wc + linge + cuisine}$ litres`);
  vrai("15. d) faux", douche < wc + linge + cuisine);
});
essai("16", () => {
  const [data, valeurs] = dessin("camembert", 16, "figure");
  const tot = somme(data.map((d) => d.value));
  vrai("16. disque muet", valeurs === false);
  enonceDit(16, `gagné $${tot}$ médailles`);
  enonceDit(16, `$${val(data, "or")}$ sont en or`);
  vrai("16. bronze = moitié, argent = tiers", val(data, "bronze") * 2 === tot && val(data, "argent") * 3 === tot);
  dit(16, `$${tot} \\div 2 = ${tot / 2}$ médailles`);
  dit(16, `$${tot} - ${tot / 2} - ${val(data, "or")} = ${val(data, "argent")}$ médailles d'argent`);
  dit(16, `$${tot} \\div 3 = ${tot / 3}$`);
  dit(16, `$${val(data, "bronze") / val(data, "or")} \\times ${val(data, "or")} = ${val(data, "bronze")}$`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [data] = dessin("barres", 17, "figure");
  const v = data.map((d) => d.value);
  vrai("17. dimanche en tête", Math.max(...v) === val(data, "dim"));
  dit(17, `$${val(data, "dim")} - ${val(data, "mer")} = ${val(data, "dim") - val(data, "mer")}$ vélos`);
  const we = val(data, "sam") + val(data, "dim"), sem = somme(v.slice(0, 5));
  dit(17, `$${val(data, "sam")} + ${val(data, "dim")} = ${N(we)}$ vélos`);
  dit(17, `$${v.slice(0, 5).join(" + ")} = ${N(sem)}$ vélos`);
  vrai("17. d) faux", sem > we);
  vrai("17. chaque jour du week-end dépasse chaque jour de semaine", Math.min(val(data, "sam"), val(data, "dim")) > Math.max(...v.slice(0, 5)));
});
essai("18", () => {
  const [tot, gat, yao, fru, fro] = nombresDe(e(18).split("\\n")[0]).filter((x) => x !== 6);
  vrai("18. le total", gat + yao + fru + fro === tot);
  const [data] = dessin("camembert", 18, "schema");
  vrai("18. le schéma", memes(data.map((d) => d.value), [gat, yao, fru, fro]));
  dit(18, `$${tot} \\div 2 = ${tot / 2}$. C'est le gâteau`);
  vrai("18. gâteau = moitié", gat === tot / 2);
  dit(18, `$${tot} \\div 4 = ${tot / 4}$. Il y a bien $${fru}$ fruits`);
  vrai("18. un sur quatre", fru === tot / 4);
  dit(18, `$${fru} + ${yao} = ${fru + yao}$`);
  dit(18, `Il manque seulement $${tot / 2 - fru - yao}$ élèves`);
});
essai("19", () => {
  const [ent, lignes] = dessin("grille", 19, "figure");
  const g = (l, c) => Number(lignes.find((x) => x[0] === l)[ent.indexOf(c)]);
  dit(19, `$${g("juillet", "mer")}$ au bord de la mer, $${g("juillet", "intérieur")}$ à l'intérieur`);
  dit(19, `$${g("juillet", "intérieur")} - ${g("juillet", "mer")} = ${g("juillet", "intérieur") - g("juillet", "mer")}$ °C`);
  dit(19, `$${g("janvier", "mer")} - ${g("janvier", "intérieur")} = ${g("janvier", "mer") - g("janvier", "intérieur")}$ °C`);
  const mer = lignes.map((l) => Number(l[1])), int = lignes.map((l) => Number(l[2]));
  const em = Math.max(...mer) - Math.min(...mer), ei = Math.max(...int) - Math.min(...int);
  dit(19, `Écart : $${Math.max(...mer)} - ${Math.min(...mer)} = ${em}$ °C`);
  dit(19, `Écart : $${Math.max(...int)} - ${Math.min(...int)} = ${ei}$ °C`);
  vrai("19. d) vrai", em < ei);
  dit(19, `$${em}$ °C d'écart contre $${ei}$ °C`);
});
essai("20", () => {
  const [et, v, pas] = dessin("pointsRelies", 20, "figure");
  vrai("20. S1 à S5, graduation 10", memes(et, ["S1", "S2", "S3", "S4", "S5"]) && pas === 10);
  dit(20, `je lis $${v[2]}$ kg`);
  dit(20, `$${v[0]} - ${v[4]} = ${v[0] - v[4]}$ kg`);
  const b = v.slice(1).map((x, i) => v[i] - x);
  dit(20, b.map((x, i) => `$${v[i]} - ${v[i + 1]} = ${x}$`).join(", puis "));
  vrai("20. plus forte baisse S2 → S3, seule", b.indexOf(Math.max(...b)) === 1 && b.filter((x) => x === Math.max(...b)).length === 1);
  dit(20, `$${v[0]} \\div 3 = ${v[0] / 3}$ kg`);
  vrai("20. défi réussi", v[0] - v[4] >= v[0] / 3);
});

f.fin();
