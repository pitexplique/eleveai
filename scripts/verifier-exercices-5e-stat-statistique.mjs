// Recalcul indépendant de la feuille « Les statistiques » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-stat-statistique.tsx.
//
// ⭐ L'AUTRE CHEMIN : les listes brutes (B V M B…) sont recomptées lettre par
// lettre dans l'ÉNONCÉ ; les données des tableaux, diagrammes, barres et du
// repère sont RELUES dans les appels de dessin ; le script refait effectifs,
// totaux, fréquences (fraction exacte), angles et moyennes, puis cherche chaque
// résultat dans le corrigé. Un dessin qui ne porte pas les données de l'énoncé
// (ou le mauvais tally, la mauvaise moyenne) : ça se voit.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-stat-statistique.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-stat-statistique.tsx", "stat_statistique", ["barres", "grille", "pointsRelies"]);
const { e, vrai, verif, dit, enonceDit, dessin, dessins, essai } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const T = (x) => t(r9(x));
const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
const frac = (a, b) => `\\dfrac{${a / pgcd(a, b)}}{${b / pgcd(a, b)}}`;
/** Les nombres $…$ d'un texte, dans l'ordre. */
const nombresDe = (texte) => [...texte.matchAll(/\$(\d+(?:\\,\d{3})*(?:\{,\}\d+)?)\$/g)].map((m) => Number(m[1].replace(/\\,/g, "").replace("{,}", ".")));
/** La liste brute de lettres (la ligne de l'énoncé faite de lettres seules). */
const liste = (k) => e(k).split("\\n").find((l) => /^([A-Z] )+[A-Z]$/.test(l)).split(" ");
const compte = (xs) => xs.reduce((m, x) => ({ ...m, [x]: (m[x] ?? 0) + 1 }), {});
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const L = liste(1);
  const n = compte(L);
  vrai("1. 20 réponses", L.length === 20);
  const [, lignes] = dessin("grille", 1, "schema");
  const cle = { bus: "B", "vélo": "V", marche: "M", voiture: "C" };
  for (const [nom, traits, eff] of lignes.slice(0, -1)) {
    vrai(`1. ${nom} : effectif ${n[cle[nom]]}`, Number(eff) === n[cle[nom]]);
    vrai(`1. ${nom} : ${n[cle[nom]]} traits`, traits.replace(/ /g, "").length === n[cle[nom]]);
  }
  vrai("1. ligne total", Number(lignes.at(-1)[2]) === L.length);
  dit(1, `Bus : $${n.B}$. Vélo : $${n.V}$. Marche : $${n.M}$. Voiture : $${n.C}$.`);
  dit(1, `$${n.B} + ${n.V} + ${n.M} + ${n.C} = ${L.length}$`);
  vrai("1. le bus en tête", Math.max(n.B, n.V, n.M, n.C) === n.B);
});
essai("2", () => {
  const [entete, ligne] = dessin("tableau", 2, "figure");
  const mois = entete.slice(1), v = ligne.slice(1);
  const imax = v.indexOf(Math.max(...v)), imin = v.indexOf(Math.min(...v));
  vrai("2. mai et février", mois[imax] === "mai" && mois[imin] === "févr.");
  dit(2, `Le plus grand nombre est $${v[imax]}$ : c'est mai. Le plus petit est $${v[imin]}$ : c'est février.`);
  dit(2, `lis la case des chats : $${v[mois.indexOf("avr.")]}$`);
  dit(2, `$${v.join(" + ")} = ${somme(v)}$ chats`);
  dit(2, `$${v[imax]} - ${v[imin]} = ${v[imax] - v[imin]}$ chats`);
});
essai("3", () => {
  const [, data] = dessin("diagramme", 3, "figure");
  const v = data.map((d) => d.value), tot = somme(v);
  dit(3, `$${v.join(" + ")} = ${tot}$ oiseaux`);
  const g = (l) => data.find((d) => d.label === l).value;
  dit(3, `$${g("Mésange")} - ${g("Merle")} = ${g("Mésange") - g("Merle")}$ mésanges`);
  const quart = data.filter((d) => d.value * 4 === tot).map((d) => d.label);
  vrai("3. un seul quart : le pigeon", memes(quart, ["Pigeon"]));
  dit(3, `$${tot} \\div 4 = ${tot / 4}$`);
  vrai("3. le moineau en tête", Math.max(...v) === g("Moineau"));
});
essai("4", () => {
  const [tot, eff] = nombresDe(e(4));
  dit(4, `$\\dfrac{${eff}}{${tot}} = ${frac(eff, tot)}$`);
  dit(4, `$${eff} \\div ${tot} = ${T(eff / tot)}$`);
  dit(4, `soit $${T((100 * eff) / tot)}$ %`);
  const [, data] = dessin("diagramme", 4, "schema");
  vrai("4. le disque : 14 et 26", memes(data.map((d) => d.value), [eff, tot - eff]));
});
essai("5", () => {
  const v = nombresDe(e(5)).filter((x) => x > 20);
  const m = somme(v) / v.length;
  dit(5, `$${v.join(" + ")} = ${somme(v)}$ points`);
  dit(5, `$${somme(v)} \\div ${v.length} = ${m}$`);
  const [data, o] = dessin("barres", 5, "schema");
  vrai("5. les barres portent les scores et la moyenne", memes(data.map((d) => d.value), v) && o.moyenne === m);
});
essai("6", () => {
  const [, data] = dessin("diagramme", 6, "schema");
  const v = data.map((d) => d.value);
  enonceDit(6, `$${v[0]}$ élèves n'en ont aucun, $${v[1]}$ en ont $1$, $${v[2]}$ en ont $2$, $${v[3]}$ en ont $3$ et $${v[4]}$ élève en a $4$`);
  vrai("6. libellés 0 à 4", memes(data.map((d) => d.label), ["0", "1", "2", "3", "4"]));
  dit(6, `$${v.join(" + ")} = ${somme(v)}$ élèves`);
  dit(6, `$${v.slice(2).join(" + ")} = ${somme(v.slice(2))}$ élèves`);
});
essai("7", () => {
  const [, data] = dessin("diagramme", 7, "schema");
  vrai("7. la journée fait 24 h", somme(data.map((d) => d.value)) === 24);
  dit(7, "Réponse : a) points reliés ; b) circulaire ; c) barres ; d) tableau.");
});
essai("8", () => {
  const [, data] = dessin("diagramme", 8, "figure");
  const g = (l) => data.find((d) => d.label === l).value;
  const tot = somme(data.map((d) => d.value));
  vrai("8. total 200 dans l'énoncé", e(8).includes(`$${tot}$ élèves`) && e(8).includes(`obtenu $${g("Hibou")}$ votes`));
  vrai("8. Aigle = moitié, Faucon = quart", g("Aigle") * 2 === tot && g("Faucon") * 4 === tot);
  dit(8, `$${tot} \\div 2 = ${g("Aigle")}$ votes, soit $50$ %`);
  dit(8, `$${tot} \\div 4 = ${g("Faucon")}$ votes, soit $25$ %`);
  dit(8, `$${g("Hibou")} \\div ${tot} = ${T(g("Hibou") / tot)}$, soit $${(100 * g("Hibou")) / tot}$ %`);
  dit(8, `$${tot} - ${g("Aigle")} - ${g("Faucon")} - ${g("Hibou")} = ${g("Milan")}$ votes`);
  dit(8, `$${g("Milan")} \\div ${tot} = ${T(g("Milan") / tot)}$, soit $${(100 * g("Milan")) / tot}$ %`);
  dit(8, `$${["Aigle", "Faucon", "Hibou", "Milan"].map((l) => (100 * g(l)) / tot).join(" + ")} = 100$`);
  // Les petits secteurs ne sont pas voisins (leurs noms se chevauchaient, mesuré à 375 px).
  vrai("8. Hibou et Milan séparés", Math.abs(data.findIndex((d) => d.label === "Hibou") - data.findIndex((d) => d.label === "Milan")) === 2);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const L = liste(9);
  const n = compte(L);
  vrai("9. 25 voitures", L.length === 25);
  const [, lignes] = dessin("grille", 9, "schema");
  const cle = { gris: "G", blanc: "B", noir: "N", rouge: "R", bleu: "U" };
  for (const [nom, eff, fq] of lignes.slice(0, -1)) {
    vrai(`9. ${nom} : ${n[cle[nom]]}`, Number(eff) === n[cle[nom]]);
    vrai(`9. ${nom} : ${(100 * n[cle[nom]]) / 25} %`, fq === `${(100 * n[cle[nom]]) / 25} %`);
  }
  dit(9, `gris $${n.G}$, blanc $${n.B}$, noir $${n.N}$, rouge $${n.R}$, bleu $${n.U}$. Contrôle : $${[n.G, n.B, n.N, n.R, n.U].join(" + ")} = 25$`);
  dit(9, `$\\dfrac{${n.G}}{25} = \\dfrac{${4 * n.G}}{100}$`);
  dit(9, `$\\dfrac{${n.B}}{25} = \\dfrac{${4 * n.B}}{100}$`);
  dit(9, `$${[n.G, n.B, n.N, n.R, n.U].map((x) => 4 * x).join(" + ")} = 100$`);
  vrai("9. plus d'une sur trois", n.G / 25 > 1 / 3);
});
essai("10", () => {
  const [, lignes] = dessin("grille", 10, "figure");
  const S = Object.fromEntries(lignes.map(([s, fi, g]) => [s, [Number(fi), Number(g)]]));
  dit(10, `Ligne « judo », colonne « garçons » : $${S.judo[1]}$`);
  dit(10, `$${S.danse[0]} + ${S.danse[1]} = ${somme(S.danse)}$ licenciés`);
  const filles = lignes.map((l) => Number(l[1]));
  dit(10, `$${filles.join(" + ")} = ${somme(filles)}$ filles`);
  dit(10, `$${S.football[0]} + ${S.football[1]} = ${somme(S.football)}$ licenciés, dont $${S.football[0]}$ filles : $\\dfrac{${S.football[0]}}{${somme(S.football)}} = ${frac(S.football[0], somme(S.football))}$, soit $${(100 * S.football[0]) / somme(S.football)}$ %`);
  vrai("10. filles majoritaires : la danse seule", memes(lignes.filter((l) => Number(l[1]) > Number(l[2])).map((l) => l[0]), ["danse"]));
});
essai("11", () => {
  const [data] = dessin("barres", 11, "figure");
  const v = data.map((d) => d.value), m = somme(v) / v.length;
  dit(11, `$${v.join(" + ")} = ${somme(v)}$`);
  dit(11, `$${somme(v)} \\div ${v.length} = ${m}$ °C`);
  const dessus = data.filter((d) => d.value > m);
  vrai("11. mar, ven, sam", memes(dessus.map((d) => d.label), ["mar", "ven", "sam"]));
  dit(11, `soit $${dessus.length}$ jours`);
  const [data2, o] = dessin("barres", 11, "schema");
  vrai("11. le schéma : mêmes barres, moyenne 14", memes(data2, data) && o.moyenne === m);
  dit(11, `vendredi, $${Math.max(...v)}$ °C ; la plus basse mercredi, $${Math.min(...v)}$ °C`);
});
essai("12", () => {
  const [a, b, c, cible] = nombresDe(e(12));
  const tot = 4 * cible, deja = a + b + c;
  dit(12, `$${a} + ${b} + ${c} = ${deja}$, et $${deja} \\div 3 = ${deja / 3}$`);
  dit(12, `$4 \\times ${cible} = ${tot}$ points`);
  dit(12, `$${tot} - ${deja} = ${tot - deja}$`);
  dit(12, `total ferait $${deja + cible}$, et $${deja + cible} \\div 4 = ${T((deja + cible) / 4)}$`);
  const [data, o] = dessin("barres", 12, "schema");
  vrai("12. le schéma", memes(data.map((d) => d.value), [a, b, c, tot - deja]) && o.moyenne === cible);
});
essai("13", () => {
  const v = nombresDe(e(13));
  const [tot, ...parts] = v;
  vrai("13. le total", somme(parts) === tot);
  const noms = ["matériel", "trajets", "goûters", "affiches"];
  parts.forEach((p, i) => {
    dit(13, `$${p} \\div 1\\,200 = ${T(p / tot)}$, soit $${T((100 * p) / tot)}$ %`);
    dit(13, `${noms[i]} $${T(p / tot)} \\times 360 = ${T((360 * p) / tot)}$°`);
  });
  dit(13, `$${parts.map((p) => T((360 * p) / tot)).join(" + ")} = 360$°`);
  const [, data] = dessin("diagramme", 13, "schema");
  vrai("13. le disque", noms.every((nom, i) => data.find((d) => d.label === nom)?.value === parts[i]) && data.length === 4);
});
essai("14", () => {
  const ds = dessins("diagramme", 14).map((d) => d.args);
  vrai("14. deux diagrammes, mêmes données", ds.length === 2 && memes(ds[0][1], ds[1][1]) && ds[0][0] === "barres" && ds[1][0] === "camembert");
  const data = ds[0][1], v = data.map((d) => d.value), tot = somme(v);
  dit(14, `$${v.join(" + ")} = ${tot}$ minutes`);
  const vid = data[0].value;
  dit(14, `$\\dfrac{${vid}}{${tot}} = ${frac(vid, tot)}$`);
  dit(14, `soit $${T((100 * vid) / tot)}$ %`);
  vrai("14. un quart : les jeux", memes(data.filter((d) => d.value * 4 === tot).map((d) => d.label), ["Jeux"]));
  dit(14, `$${tot} \\div 4 = ${tot / 4}$ minutes`);
});
essai("15", () => {
  const v = nombresDe(e(15).split("\\n")[0]).slice(0, 5);
  const [objectif] = nombresDe(e(15).split("\\n")[3]);
  const jours = 6;
  vrai("15. l'énoncé : en six jours", e(15).includes(`$${objectif}$ arbres en six jours`));
  dit(15, `$${v.join(" + ")} = ${somme(v)}$ arbres, en $5$ jours : $${somme(v)} \\div 5 = ${somme(v) / 5}$`);
  dit(15, `$${somme(v)} \\div 4 = ${T(somme(v) / 4)}$`);
  vrai("15. l'énoncé cite 11,25", e(15).includes(`$${T(somme(v) / 4)}$`));
  dit(15, `$${objectif} - ${somme(v)} = ${objectif - somme(v)}$ arbres`);
  dit(15, `$${objectif} \\div ${jours} = ${objectif / jours}$`);
  const [data, o] = dessin("barres", 15, "schema");
  vrai("15. le schéma", memes(data.map((d) => d.value), v) && o.moyenne === somme(v) / 5);
});
essai("16", () => {
  const h = [...e(16).split("\\n")[0].matchAll(/: \$(\d+)\$ cm/g)].map((m) => Number(m[1]));
  vrai("16. six mesures", h.length === 6);
  const [etiq, vals, pas] = dessin("pointsRelies", 16, "schema");
  vrai("16. les points portent les six mesures", memes(vals, h) && memes(etiq, h.map((_, i) => `s${i + 1}`)));
  vrai("16. graduation de 25 cm, annoncée dans l'énoncé", pas === 25 && e(16).includes(`graduée de $${pas}$ cm en $${pas}$ cm`));
  dit(16, `$${h[0]}$ cm au-dessus de la semaine $1$, $${h[1]}$ cm au-dessus de la semaine $2$`);
  const pousses = h.slice(1).map((x, i) => x - h[i]);
  dit(16, `$${h[3]} - ${h[2]} = ${h[3] - h[2]}$ cm`);
  dit(16, `$${pousses.join("$, $").replace(/, \$(\d+)$/, " et $$$1")}$ cm`);
  const imax = pousses.indexOf(Math.max(...pousses));
  vrai("16. la plus grande pousse, unique, entre 4 et 5", pousses.filter((p) => p === pousses[imax]).length === 1 && imax === 3);
  dit(16, `$${pousses.join(" + ")} = ${somme(pousses)}$, et $${somme(pousses)} \\div 5 = ${somme(pousses) / 5}$ cm`);
  dit(16, `$${h[5]} - ${h[0]} = ${h[5] - h[0]}$ cm`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const L = liste(17);
  const n = compte(L);
  vrai("17. 25 élèves", L.length === 25);
  const [, lignes] = dessin("grille", 17, "schema");
  const cle = { tartines: "T", "céréales": "C", rien: "R", fruit: "F", brioche: "B" };
  for (const [nom, eff, fq] of lignes.slice(0, -1)) vrai(`17. ${nom} : ${n[cle[nom]]}, ${4 * n[cle[nom]]} %`, Number(eff) === n[cle[nom]] && fq === `${4 * n[cle[nom]]} %`);
  const ordre = ["T", "C", "R", "F", "B"].map((k) => n[k]);
  dit(17, `Contrôle : $${ordre.join(" + ")} = 25$`);
  dit(17, `$${ordre.map((x) => 4 * x).join(" + ")} = 100$`);
  dit(17, `sans petit-déjeuner font $${4 * n.R}$ %`);
  vrai("17. près d'un sur quatre, un peu moins", 4 * n.R < 25 && 4 * n.R >= 20);
});
essai("18", () => {
  const [, lignes] = dessin("grille", 18, "figure");
  const g = Object.fromEntries(lignes.map(([s, a, b]) => [s, [Number(a), Number(b)]]));
  vrai("18. totaux", somme(lignes.slice(0, -1).map((l) => Number(l[1]))) === g.total[0] && somme(lignes.slice(0, -1).map((l) => Number(l[2]))) === g.total[1]);
  const pc = (x, tot) => T((100 * x) / tot);
  dit(18, `$${g.moineau[0]} \\div ${g.total[0]} = ${T(g.moineau[0] / g.total[0])}$, soit $${pc(g.moineau[0], g.total[0])}$ %`);
  dit(18, `$${g.moineau[1]} \\div ${g.total[1]} = ${T(g.moineau[1] / g.total[1])}$, soit $${pc(g.moineau[1], g.total[1])}$ %`);
  vrai("18. moineaux : plus en A, proportionnellement plus en B", g.moineau[0] > g.moineau[1] && g.moineau[1] / g.total[1] > g.moineau[0] / g.total[0]);
  dit(18, `jardin A, $${g["mésange"][0]} \\div ${g.total[0]} = ${T(g["mésange"][0] / g.total[0])}$, soit $${pc(g["mésange"][0], g.total[0])}$ %`);
  dit(18, `jardin B, $${g["mésange"][1]} \\div ${g.total[1]} = ${T(g["mésange"][1] / g.total[1])}$, soit $${pc(g["mésange"][1], g.total[1])}$ %`);
  vrai("18. mésanges : A", g["mésange"][0] / g.total[0] > g["mésange"][1] / g.total[1]);
});
essai("19", () => {
  const nb = nombresDe(e(19).split("\\n")[0]);
  const [A, B] = [nb.slice(0, 4), nb.slice(4, 8)];
  const [data, o] = dessin("barres", 19, "figure");
  vrai("19. les barres : A puis B, moyenne 15", memes(data.map((d) => d.value), [...A, ...B]) && o.moyenne === somme(A) / 4 && somme(A) === somme(B));
  dit(19, `Anaïs : $${A.join(" + ")} = ${somme(A)}$, et $${somme(A)} \\div 4 = ${somme(A) / 4}$`);
  dit(19, `Bérénice : $${B.join(" + ")} = ${somme(B)}$, et $${somme(B)} \\div 4 = ${somme(B) / 4}$`);
  dit(19, `de $${Math.min(...B)}$ à $${Math.max(...B)}$`);
  dit(19, `de $${Math.min(...A)}$ à $${Math.max(...A)}$`);
  dit(19, `$5 \\times 16 = 80$ points. Anaïs en a $${somme(A)}$ : il lui faut $80 - ${somme(A)} = ${80 - somme(A)}$ points`);
  dit(19, `$${somme(B)} + 10 = ${somme(B) + 10}$ points en $5$ matchs, et $${somme(B) + 10} \\div 5 = ${(somme(B) + 10) / 5}$ points`);
});
essai("20", () => {
  const v = nombresDe(e(20).split("\\n")[0]);
  const m = somme(v) / 6;
  dit(20, `$${v.join(" + ")} = ${somme(v)}$ mm, en $6$ mois : $${somme(v)} \\div 6 = ${m}$ mm`);
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin"];
  const dessus = mois.filter((_, i) => v[i] > m);
  vrai("20. janvier, avril, mai", memes(dessus, ["janvier", "avril", "mai"]));
  dit(20, `soit $${dessus.length}$ mois`);
  const [data, o] = dessin("barres", 20, "schema");
  vrai("20. le schéma", memes(data.map((d) => d.value), v) && o.moyenne === m);
});

f.fin();
