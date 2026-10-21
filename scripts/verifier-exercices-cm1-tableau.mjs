// Recalcul indépendant de la feuille « Lire et compléter un tableau » de CM1
// (21/10/2026) : lib/fiches-exercices/maths-cm1-tableau.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque case est RELUE dans les appels `grille(…)` de la
// feuille ; celles des exercices sans figure imprimée sont relues dans
// l'ÉNONCÉ (et le schéma d'écran doit porter les mêmes). Le script refait
// chaque total, case vide, écart et produit, et cherche le résultat dans le
// corrigé. Il vérifie aussi le rendu de l'aide locale : quatre colonnes au plus,
// des cases courtes (rien ne défile à 375 px), la case surlignée dans le cadre,
// et qu'un schéma complété redit bien la figure de l'énoncé.
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe cm1).
// Usage : node scripts/verifier-exercices-cm1-tableau.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-cm1-tableau.tsx", "tableau", ["grille"], "cm1");
const { e, c, vrai, dit, enonceDit, dessin, appels, essai, src } = f;

const NB = " ";
const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/** 1800 → « 1 800 » (espace insécable), comme dans la feuille. */
const N = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, NB);
/** Les nombres d'un texte (« 1 800 » compris), dans l'ordre. */
const nombresDe = (texte) => [...texte.matchAll(/\d+(?: \d{3})*/g)].map((m) => Number(m[0].replaceAll(NB, "")));
/** La première ligne de l'énoncé (avant les questions). */
const tete = (k) => e(k).split("\\n")[0];
/** Une case d'une grille : ligne nommée (1re colonne), colonne nommée (en-tête). */
const lecteur = ([ent, lignes]) => (l, col) => {
  const ligne = lignes.find((x) => x[0] === l);
  if (!ligne) throw new Error(`pas de ligne « ${l} »`);
  const j = ent.indexOf(col);
  if (j < 0) throw new Error(`pas de colonne « ${col} »`);
  return ligne[j] === "?" ? null : Number(ligne[j]);
};
const colonne = ([ent, lignes], col, sansTotal = true) =>
  lignes.filter((l) => !sansTotal || l[0] !== "total").map((l) => Number(l[ent.indexOf(col)]));
/** Le schéma redit la figure : mêmes cases, les « ? » remplacés par les valeurs données. */
const completeLaFigure = (k, valeurs) => {
  const [ent, lig] = dessin("grille", k, "figure");
  const [ent2, lig2] = dessin("grille", k, "schema");
  let n = 0;
  const attendu = lig.map((l) => l.map((x) => (x === "?" ? String(valeurs[n++]) : x)));
  vrai(`${k}. le schéma complète la figure (mêmes cases, « ? » remplis)`, memes(ent, ent2) && memes(attendu, lig2) && n === valeurs.length);
};

/* ═══ Rendu de l'aide locale ═══ */
const LIMITE = { 1: 20, 2: 16, 3: 10, 4: 7 };
for (const a of appels("grille")) {
  if (!a.args) continue;
  const [ent, lignes, opts = {}] = a.args;
  const n = ent.length;
  vrai(`grille (${ent.join(" | ")}) : quatre colonnes au plus`, n >= 2 && n <= 4);
  vrai(`grille (${ent[0]}) : lignes pleines`, lignes.every((l) => l.length === n));
  for (const x of [...ent, ...lignes.flat()]) vrai(`grille (${ent[0]}) : « ${x} » tient dans sa case (${LIMITE[n]} signes)`, x.length <= LIMITE[n]);
  for (const x of lignes.flatMap((l) => l.slice(1))) vrai(`grille (${ent[0]}) : « ${x} » est un nombre entier ou « ? »`, x === "?" || /^\d+$/.test(x));
  if (opts.case) vrai(`grille (${ent[0]}) : la case surlignée est dans le cadre`, opts.case[0] < lignes.length && opts.case[1] < n);
  if (opts.total) vrai(`grille (${ent[0]}) : la ligne total est la dernière`, lignes[lignes.length - 1][0] === "total");
}
const avant = src.slice(src.indexOf("series: ["));
vrai("aucun « évidemment »", !/évidemment/i.test(avant));
vrai("aucun tiret « - » pour une soustraction (« − » U+2212)", !/\d -\s?\d/.test(avant));
vrai("aucun KaTeX : au CM, du texte simple", !avant.includes("$"));
vrai("aucun « / » de division", !/\d\s?\/\s?\d/.test(avant));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const g = dessin("grille", 1, "figure");
  const L = lecteur(g);
  const v = colonne(g, "élèves");
  const noms = g[1].map((l) => l[0]);
  dit(1, `Je lis ${L("piano", "élèves")}.`);
  vrai("1. b) 11 une seule fois, sur la batterie", g[1].filter((l) => l[1] === "11").map((l) => l[0]).join() === "batterie");
  dit(1, `Le plus grand nombre est ${Math.max(...v)} : c'est la ${noms[v.indexOf(Math.max(...v))]}`);
  dit(1, `Le plus petit nombre est ${Math.min(...v)} : c'est le ${noms[v.indexOf(Math.min(...v))]}`);
  const i = noms.indexOf("piano");
  dit(1, `Juste en dessous du ${v[i]}, il y a le ${v[i + 1]} du ${noms[i + 1]}`);
  vrai("1. le schéma : mêmes cases", memes(dessin("grille", 1, "schema").slice(0, 2), g));
});
essai("2", () => {
  const g = dessin("grille", 2, "figure");
  const L = lecteur(g);
  dit(2, `Je lis ${L("mercredi", "adultes")}.`);
  dit(2, `Ligne « samedi », colonne « enfants » : je lis ${L("samedi", "enfants")}`);
  dit(2, `Ligne « lundi », colonne « enfants » : je lis ${L("lundi", "enfants")}`);
  const cases75 = g[1].flatMap((l) => l.slice(1).map((x, j) => [l[0], g[0][j + 1], x])).filter((x) => x[2] === "75");
  vrai("2. d) un seul 75 : adultes du samedi", cases75.length === 1 && cases75[0][0] === "samedi" && cases75[0][1] === "adultes");
  dit(2, `la case des enfants donne ${L("mercredi", "enfants")}, pas ${L("mercredi", "adultes")}`);
  const [, , o] = dessin("grille", 2, "schema");
  vrai("2. le schéma surligne la case du a)", memes(o.case, [1, 2]) && g[1][1][0] === "mercredi" && g[0][2] === "adultes");
});
essai("3", () => {
  const [a, b, cc] = nombresDe(tete(3));
  dit(3, `${a} + ${b} + ${cc} = ${a + b + cc} kg`);
  dit(3, `${cc} + ${a} = ${cc + a}, puis ${cc + a} + ${b} = ${a + b + cc}`);
  const [, lig] = dessin("grille", 3, "schema");
  vrai("3. le schéma porte les nombres de l'énoncé et le total", memes(lig.map((l) => Number(l[1])), [a, b, cc, a + b + cc]));
});
essai("4", () => {
  const g = dessin("grille", 4, "figure");
  const L = lecteur(g);
  const tot = L("total", "nombre"), p = L("poules", "nombre"), l = L("lapins", "nombre");
  enonceDit(4, `Elle a ${tot} animaux en tout`);
  const ch = tot - p - l;
  dit(4, `${p} + ${l} = ${p + l}`);
  dit(4, `${tot} − ${p + l} = ${ch} chèvres`);
  dit(4, `${p} + ${l} + ${ch} = ${tot}`);
  dit(4, `faire ${tot} − ${p} = ${tot - p}`);
  completeLaFigure(4, [ch]);
});
essai("5", () => {
  const g = dessin("grille", 5, "figure");
  const rang = [...g[1]].sort((x, y) => Number(y[1]) - Number(x[1]));
  dit(5, `${rang[0][1]} est le plus grand : c'est la ${rang[0][0]}`);
  dit(5, `${rang[3][1]} est le plus petit : c'est le ${rang[3][0]}`);
  dit(5, `Je range : ${rang.map((r) => r[1]).join(", puis ")}.`);
  dit(5, `L'ordre est : ${rang.map((r) => r[0]).join(", ")}.`);
  vrai("5. le piège : 98 (2 chiffres) < 124 (3 chiffres)", lecteur(g)("aventure", "entrées") === 98 && 98 < 124);
});
essai("6", () => {
  const [ines, tom, sacha] = nombresDe(tete(6));
  dit(6, `${ines} − ${tom} = ${ines - tom} pages de plus`);
  dit(6, `${sacha} − ${ines} = ${sacha - ines} pages de plus`);
  dit(6, `${sacha} − ${tom} = ${sacha - tom} pages de plus`);
  dit(6, `${ines - tom} + ${sacha - ines} = ${sacha - tom}`);
  const [, lig] = dessin("grille", 6, "schema");
  vrai("6. le schéma porte les nombres de l'énoncé", memes(lig.map((l) => Number(l[1])), [ines, tom, sacha]));
});
essai("7", () => {
  const g = dessin("grille", 7, "figure");
  const L = lecteur(g);
  // ⭐ Les règles officielles (IFAB loi 3, World Rugby règle 3, IHF règle 4, FIBA art. 4).
  vrai("7. les vrais nombres de joueurs", memes(g[1], [["football", "11"], ["rugby à XV", "15"], ["handball", "7"], ["basket", "5"]]));
  dit(7, `${L("football", "joueurs")} + ${L("football", "joueurs")} = ${2 * L("football", "joueurs")} joueurs`);
  dit(7, `2 × ${L("rugby à XV", "joueurs")} = ${2 * L("rugby à XV", "joueurs")} joueurs`);
  dit(7, `2 × ${L("basket", "joueurs")} = ${2 * L("basket", "joueurs")} joueurs`);
});
essai("8", () => {
  const g = dessin("grille", 8, "figure");
  const v = colonne(g, "vendus");
  const ecrit = lecteur(g)("total", "vendus");
  const juste = somme(v);
  vrai("8. le total écrit est FAUX", ecrit !== juste);
  dit(8, `${v.join(" + ")} = ${juste}`);
  dit(8, `${v[1]} + ${v[2]} = ${v[1] + v[2]}, puis ${v[1] + v[2]} + ${v[0]} = ${juste}`);
  dit(8, `Le boulanger a écrit ${ecrit}. Ce n'est pas ${juste}`);
  dit(8, `${juste} − ${ecrit} = ${juste - ecrit} produits`);
  const [, lig] = dessin("grille", 8, "schema");
  vrai("8. le schéma porte le total juste", lig[3][1] === String(juste) && memes(lig.slice(0, 3), g[1].slice(0, 3)));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const g = dessin("grille", 9, "figure");
  const L = lecteur(g);
  dit(9, `colonne « soir » : je lis ${L("voitures", "soir")}`);
  vrai("9. b) bus à égalité", L("bus", "matin") === L("bus", "soir"));
  dit(9, `Ligne « bus » : ${L("bus", "matin")} le matin, ${L("bus", "soir")} le soir`);
  dit(9, `${L("vélos", "matin")} + ${L("vélos", "soir")} = ${L("vélos", "matin") + L("vélos", "soir")} vélos`);
  const m = colonne(g, "matin");
  dit(9, `${m.join(" + ")} = ${somme(m)} véhicules`);
  dit(9, `lire ${L("voitures", "matin")}, la case du matin`);
});
essai("10", () => {
  const g = dessin("grille", 10, "figure");
  const L = lecteur(g);
  const gl = L("lundi", "total") - L("lundi", "filles");
  const tm = L("mardi", "filles") + L("mardi", "garçons");
  dit(10, `Garçons : ${L("lundi", "total")} − ${L("lundi", "filles")} = ${gl}`);
  dit(10, `${L("lundi", "filles")} + ${gl} = ${L("lundi", "total")}`);
  dit(10, `${L("mardi", "filles")} + ${L("mardi", "garçons")} = ${tm} élèves`);
  vrai("10. c) les garçons du mardi l'emportent", L("mardi", "garçons") > L("mardi", "filles"));
  dit(10, `${L("mardi", "garçons")} − ${L("mardi", "filles")} = ${L("mardi", "garçons") - L("mardi", "filles")} de plus`);
  completeLaFigure(10, [gl, tm]);
});
essai("11", () => {
  const v = nombresDe(tete(11));
  const [jan, avr, jui, oct] = v;
  const [, lig] = dessin("grille", 11, "schema");
  vrai("11. le schéma porte les nombres de l'énoncé", memes(lig.map((l) => Number(l[1])), v));
  vrai("11. a) faux : janvier en tête, juillet le moins", Math.max(...v) === jan && Math.min(...v) === jui);
  dit(11, `2 × ${jui} = ${2 * jui}. Avril a bien ${avr} jours : vrai`);
  vrai("11. b) vrai", avr === 2 * jui);
  enonceDit(11, `il a plu 36 jours`);
  dit(11, `${v.join(" + ")} = ${somme(v)} jours, pas 36 : faux`);
  vrai("11. c) faux", somme(v) !== 36);
  dit(11, `${jan} − ${oct} = ${jan - oct} : vrai`);
  vrai("11. d) vrai", jan - oct === 1);
});
essai("12", () => {
  const [obj, ...v] = nombresDe(tete(12));
  const t = somme(v);
  dit(12, `${v.join(" + ")} = ${t} €`);
  dit(12, `${v[0]} + ${v[1]} = ${v[0] + v[1]}, ${v[2]} + ${v[3]} = ${v[2] + v[3]}, puis ${v[0] + v[1]} + ${v[2] + v[3]} = ${t}`);
  vrai("12. b) objectif non atteint", t < obj);
  dit(12, `${obj} − ${t} = ${obj - t} €`);
  const [, lig] = dessin("grille", 12, "schema");
  vrai("12. le schéma porte les nombres et le total", memes(lig.map((l) => Number(l[1])), [...v, t]));
});
essai("13", () => {
  const [jt, jf, dt, df] = nombresDe(tete(13));
  const g = dessin("grille", 13, "figure");
  const L = lecteur(g);
  vrai("13. la figure porte les nombres de l'énoncé", L("judo", "total") === jt && L("judo", "filles") === jf && L("danse", "total") === dt && L("danse", "filles") === df);
  const jg = jt - jf, dg = dt - df;
  dit(13, `Judo : ${jt} − ${jf} = ${jg} garçons. Danse : ${dt} − ${df} = ${dg} garçons`);
  dit(13, `${jf} + ${df} = ${jf + df} filles`);
  dit(13, `${jg} + ${dg} = ${jg + dg} garçons`);
  dit(13, `${jt} + ${dt} = ${jt + dt} élèves`);
  dit(13, `${jf + df} filles + ${jg + dg} garçons = ${jt + dt}`);
  vrai("13. le contrôle tient", jf + df + jg + dg === jt + dt);
  completeLaFigure(13, [jg, dg, jf + df, jg + dg, jt + dt]);
});
essai("14", () => {
  const g = dessin("grille", 14, "figure");
  const L = lecteur(g);
  const v = colonne(g, "visiteurs");
  const mx = Math.max(...v);
  vrai("14. a) deux salles à égalité en tête : Égypte, Vikings", memes(g[1].filter((l) => Number(l[1]) === mx).map((l) => l[0]), ["Égypte", "Vikings"]));
  dit(14, `Le plus grand nombre est ${mx}. Il est écrit DEUX fois`);
  dit(14, `${L("Égypte", "visiteurs")} − ${L("Romains", "visiteurs")} = ${L("Égypte", "visiteurs") - L("Romains", "visiteurs")} visiteurs de plus`);
  dit(14, `${v.join(" + ")} = ${somme(v)} visiteurs`);
  const rang = [...v].sort((a, b) => b - a);
  dit(14, `Je range : ${rang[0]}, ${rang[1]}, puis ${rang[2]}, puis ${rang[3]}.`);
});
essai("15", () => {
  const [tot, alt, ten, bas] = nombresDe(tete(15));
  const connues = alt + ten + bas, sop = tot - connues;
  dit(15, `${alt} + ${ten} + ${bas} = ${connues}`);
  dit(15, `Sopranos : ${tot} − ${connues} = ${sop}`);
  dit(15, `${sop} + ${alt} = ${sop + alt} voix aiguës`);
  dit(15, `${ten} + ${bas} = ${ten + bas} voix graves`);
  dit(15, `${sop + alt} − ${ten + bas} = ${sop + alt - ten - bas} voix aiguës de plus`);
  dit(15, `${sop + alt} + ${ten + bas} = ${tot}`);
  const [, lig] = dessin("grille", 15, "schema");
  vrai("15. le schéma porte les voix et le total", memes(lig.map((l) => Number(l[1])), [sop, alt, ten, bas, tot]));
});
essai("16", () => {
  const [na, np, pp, pa] = nombresDe(tete(16));
  // ⭐ Faits réels : un insecte (le phasme) a 6 pattes, une araignée 8.
  vrai("16. les vrais nombres de pattes", pp === 6 && pa === 8);
  enonceDit(16, `${na} araignées et ${np} phasmes`);
  dit(16, `${na} araignées : ${na} × ${pa} = ${na * pa} pattes`);
  dit(16, `${np} phasmes : ${np} × ${pp} = ${np * pp} pattes`);
  dit(16, `${na * pa} + ${np * pp} = ${na * pa + np * pp} pattes en tout`);
  dit(16, `${na} + ${np} = ${na + np}, c'est le nombre d'ANIMAUX`);
  const [, lig] = dessin("grille", 16, "schema");
  vrai("16. le schéma", memes(lig, [["araignées", String(na), String(na * pa)], ["phasmes", String(np), String(np * pp)], ["total", String(na + np), String(na * pa + np * pp)]]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const g = dessin("grille", 17, "figure");
  const L = lecteur(g);
  const m = colonne(g, "mars"), a = colonne(g, "avril");
  dit(17, `colonne « avril » : je lis ${L("Saint-Leu", "avril")}`);
  dit(17, `Mars : ${m.join(" + ")} = ${somme(m)} tortues. Avril : ${a.join(" + ")} = ${somme(a)} tortues`);
  const baisses = g[1].filter((l) => Number(l[2]) < Number(l[1])).map((l) => l[0]);
  vrai("17. c) une seule baisse : Étang-Salé", memes(baisses, ["Étang-Salé"]));
  dit(17, `${L("Étang-Salé", "mars")} − ${L("Étang-Salé", "avril")} = ${L("Étang-Salé", "mars") - L("Étang-Salé", "avril")} tortues de moins`);
  vrai("17. d) faux, et le total monte pourtant", somme(a) > somme(m) && baisses.length > 0);
  dit(17, `de ${somme(m)} à ${somme(a)}`);
});
essai("18", () => {
  const g = dessin("grille", 18, "figure");
  const L = lecteur(g);
  enonceDit(18, "Un match gagné rapporte 3 points. Un match nul rapporte 1 point");
  const pts = {};
  for (const [eq] of g[1]) {
    const [G, Nn, P] = ["gagnés", "nuls", "perdus"].map((col) => L(eq, col));
    vrai(`18. ${eq} : 6 matchs`, G + Nn + P === 6);
    dit(18, `${eq} : ${G} + ${Nn} + ${P} = 6`);
    pts[eq] = 3 * G + Nn;
  }
  dit(18, `Lions : 4 × 3 = 12, plus 1 nul : 12 + 1 = ${pts.Lions} points`);
  dit(18, `Aigles : 3 × 3 = 9, plus 3 nuls : 9 + 3 = ${pts.Aigles} points`);
  dit(18, `Loups : 4 × 3 = 12, et aucun nul : ${pts.Loups} points`);
  vrai("18. c) Lions premiers, Aigles et Loups à égalité", pts.Lions > pts.Aigles && pts.Aigles === pts.Loups);
  vrai("18. d) même nombre de victoires, pas les mêmes points", L("Lions", "gagnés") === L("Loups", "gagnés") && pts.Lions !== pts.Loups);
  dit(18, `Réponse : a) oui ; b) Lions ${pts.Lions}, Aigles ${pts.Aigles}, Loups ${pts.Loups}`);
});
essai("19", () => {
  const g = dessin("grille", 19, "figure");
  const mo = colonne(g, "montent"), de = colonne(g, "descendent");
  dit(19, `${mo.join(" + ")} = ${somme(mo)} passagers`);
  let bord = 0;
  const apres = [];
  g[1].forEach((l, i) => {
    const avant = bord;
    bord = bord + mo[i] - de[i];
    vrai(`19. le bus n'a jamais un nombre négatif (${l[0]})`, bord >= 0 && de[i] <= avant + mo[i]);
    apres.push(bord);
    if (i > 0) dit(19, `${avant} + ${mo[i]} − ${de[i]} = ${bord}`);
  });
  dit(19, `Après la gare : 0 + ${mo[0]} − ${de[0]} = ${apres[0]}`);
  const imax = apres.indexOf(Math.max(...apres));
  vrai("19. c) le plus rempli : après la mairie, seul", g[1][imax][0] === "mairie" && apres.filter((x) => x === apres[imax]).length === 1);
  dit(19, `Le plus grand nombre est ${apres[imax]} : c'est après la mairie`);
  dit(19, `Il reste ${bord} passagers`);
  dit(19, `${de.join(" + ")} = ${somme(de)}. Et ${somme(de)} + ${bord} = ${somme(mo)}`);
  dit(19, `répondre ${mo[0] + mo[1]}, tous ceux qui sont montés`);
  const [, lig] = dessin("grille", 19, "schema");
  vrai("19. le schéma : les passagers à bord", memes(lig.map((l) => Number(l[1])), apres) && memes(lig.map((l) => l[0]), g[1].map((l) => l[0])));
});
essai("20", () => {
  const g = dessin("grille", 20, "figure");
  const L = lecteur(g);
  const en = colonne(g, "enfants"), ad = colonne(g, "adultes");
  const T = somme(en) + somme(ad);
  dit(20, `${L("samedi", "enfants")} + ${L("samedi", "adultes")} = ${L("samedi", "enfants") + L("samedi", "adultes")} billets`);
  dit(20, `${en.join(" + ")} = ${N(somme(en))} billets enfants`);
  dit(20, `${ad.join(" + ")} = ${N(somme(ad))} billets adultes`);
  dit(20, `${N(somme(en))} + ${N(somme(ad))} = ${N(T)} billets`);
  const jours = g[1].map((l) => Number(l[1]) + Number(l[2]));
  dit(20, `Vendredi : ${en[0]} + ${ad[0]} = ${jours[0]}`);
  dit(20, `Dimanche : ${en[2]} + ${ad[2]} = ${jours[2]}`);
  dit(20, `${jours.join(" + ")} = ${N(T)}`);
  vrai("20. les deux chemins donnent le même total", somme(jours) === T);
  enonceDit(20, `Plus de ${N(2000)} billets`);
  vrai("20. d) non", T < 2000);
  dit(20, `${N(2000)} − ${N(T)} = ${2000 - T} billets`);
});

// Les corrigés restent courts : 10 mots par phrase en moyenne (élèves de CM1).
const phrases = Array.from({ length: 20 }, (_, i) => c(i + 1))
  .join("\\n")
  .split(/\\n|(?<=[.!?])\s+/)
  .map((p) => p.replace(/^[a-d]\)\s*/, "").trim())
  .filter(Boolean);
const moy = somme(phrases.map((p) => p.split(/\s+/).length)) / phrases.length;
console.log(`corrigés : ${phrases.length} phrases, ${moy.toFixed(1)} mots en moyenne`);
vrai(`corrigés : 12 mots par phrase au plus en moyenne (${moy.toFixed(1)})`, moy <= 12);

f.fin();
