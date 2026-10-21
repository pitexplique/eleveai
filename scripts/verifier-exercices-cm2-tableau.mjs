// Recalcul indépendant de la feuille « Lire, compléter et interpréter un
// tableau » de CM2 (21/10/2026) : lib/fiches-exercices/maths-cm2-tableau.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque case est RELUE dans l'appel `grille(…)` de la
// figure ; celles des exercices sans figure imprimée sont relues dans l'ÉNONCÉ
// (et le tableau du corrigé, à l'écran, doit porter les mêmes). Le script refait
// chaque total, écart, case manquante et classement, et cherche le résultat
// dans le corrigé. Il vérifie aussi le tableau complété du corrigé : mêmes
// cases que la figure, et chaque « ? » remplacé par la valeur recalculée.
// Rendu : cinq colonnes au plus, largeur estimée ≤ 245 px (rien ne défile à
// 375 px), milliers en espace fine insécable, signe moins « − ».
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe cm2).
// Usage : node scripts/verifier-exercices-cm2-tableau.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-cm2-tableau.tsx", "tableau", ["grille"], "cm2");
const { src, e, vrai, dit, enonceDit, dessin, appels, essai, feuille } = f;

const FINE = " ";
const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/** 1240 → « 1 240 » (espace fine insécable), comme dans la feuille. */
const N = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, FINE);
const num = (c) => Number(String(c).replace(new RegExp(FINE, "g"), ""));
/** « a + b + c = s » écrit comme dans la feuille. */
const plus = (xs) => `${xs.map(N).join(" + ")} = ${N(somme(xs))}`;
const moins = (a, b) => `${N(a)} − ${N(b)} = ${N(a - b)}`;
/** Les lignes de l'énoncé k (séparées par `\n` dans la source). */
const lignesEnonce = (k) => e(k).split("\\n");
/** Les nombres entiers d'un texte, dans l'ordre (milliers compris). */
const nombres = (t) => [...t.matchAll(new RegExp(`\\d+(?:${FINE}\\d{3})*`, "g"))].map((m) => num(m[0]));

/** Le tableau `grille` de l'exercice k : en-têtes, lignes, et une case par (ligne, colonne). */
function T(k, role = "figure") {
  const [ent, lignes, opts = {}] = dessin("grille", k, role);
  const ligne = (l) => {
    const r = lignes.find((x) => x[0] === l);
    if (!r) throw new Error(`exercice ${k} : pas de ligne « ${l} »`);
    return r;
  };
  const col = (c) => {
    const j = ent.indexOf(c);
    if (j < 0) throw new Error(`exercice ${k} : pas de colonne « ${c} »`);
    return j;
  };
  return {
    ent,
    lignes,
    opts,
    brut: (l, c) => ligne(l)[col(c)],
    v: (l, c) => num(ligne(l)[col(c)]),
    L: (l) => ligne(l).slice(1).map(num),
    C: (c) => lignes.map((r) => num(r[col(c)])),
  };
}

/** Le tableau du corrigé = la figure, chaque « ? » remplacé par sa valeur recalculée. */
function completeLaFigure(k, attendus) {
  const fig = T(k, "figure"), sch = T(k, "schema");
  vrai(`${k}. le corrigé reprend les en-têtes de la figure`, sch.ent.slice(0, fig.ent.length).every((x, j) => x === fig.ent[j]));
  fig.lignes.forEach((r, i) =>
    r.forEach((c, j) => {
      const s = sch.lignes[i]?.[j];
      if (c === "?") {
        const cle = `${r[0]}|${fig.ent[j]}`;
        vrai(`${k}. la case « ? » ${cle} est recalculée (${attendus[cle]})`, attendus[cle] !== undefined && num(s) === attendus[cle], `écrit ${s}`);
      } else vrai(`${k}. case ${r[0]} / ${fig.ent[j]} recopiée`, s === c, `${c} → ${s}`);
    }),
  );
}

/* ═══ Rendu de l'aide `grille` ═══ */
const LARGEUR = (txt) => {
  const t = String(txt);
  // Une case courte ne se coupe pas ; une longue se coupe aux espaces ordinaires.
  const mot = t.length <= 6 ? t.length : Math.max(...t.split(" ").map((m) => m.length));
  return mot * 7.2 + 12;
};
for (const { args } of appels("grille").filter((a) => a.args)) {
  const [ent, lignes, opts = {}] = args;
  vrai(`grille (${ent.join(", ")}) : cinq colonnes au plus, lignes pleines`, ent.length <= 5 && lignes.every((l) => l.length === ent.length));
  const larg = somme(ent.map((h, j) => Math.max(LARGEUR(h), ...lignes.map((l) => LARGEUR(l[j])))));
  vrai(`grille (${ent.join(", ")}) : ${Math.round(larg)} px estimés, 245 au plus`, larg <= 245);
  for (const [i, j] of opts.cases ?? []) vrai(`grille (${ent[0]}) : case surlignée [${i}, ${j}] dans le tableau`, i < lignes.length && j < ent.length);
  if (opts.total) vrai(`grille (${ent[0]}) : la dernière ligne s'appelle « total »`, lignes[lignes.length - 1][0] === "total");
  // Une ligne et une colonne « total » se vérifient : chaque total = la somme de ses cases.
  const jt = ent.indexOf("total");
  const pleine = (r) => r.slice(1).every((c) => c !== "?");
  // (Le corrigé de l'ex. 17 ne garde que l'or et le total : il est vérifié plus bas.)
  if (jt > 0 && ent[0] !== "pays") for (const r of lignes) if (pleine(r) && r[0] !== "total") vrai(`grille (${ent[0]}) : total de la ligne « ${r[0]} »`, somme(r.slice(1, jt).map(num)) === num(r[jt]));
  if (opts.total) {
    const corps = lignes.slice(0, -1), tot = lignes[lignes.length - 1];
    for (let j = 1; j < ent.length; j++) {
      const colonne = corps.map((r) => r[j]);
      // ⛔ Ex. 19 : le total « 107 » du CM2 est FAUX exprès (le bibliothécaire s'est trompé).
      if (colonne.every((c) => c !== "?") && tot[j] !== "?" && !(ent[0] === "livres" && ent[j] === "CM2" && tot[j] === "107"))
        vrai(`grille (${ent[0]}) : total de la colonne « ${ent[j]} »`, somme(colonne.map(num)) === num(tot[j]));
    }
  }
}

/* ═══ Texte : milliers, signe moins, pas de « évidemment » ═══ */
for (const t of feuille.textes) {
  vrai(`milliers en espace fine (${t.slice(0, 40)})`, !/\d{4,}/.test(t.replace(/2024/g, "")) && !/\d \d{3}(?!\d)/.test(t));
  vrai(`signe moins « − » (${t.slice(0, 40)})`, !/\d - \d/.test(t));
  vrai(`ni « évidemment » ni KaTeX (${t.slice(0, 40)})`, !/évidemment|\$/i.test(t));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const t = T(1);
  dit(1, `colonne « 20 h » : je lis ${t.v("aventure", "20 h")}`);
  dit(1, `colonne « 17 h » : je lis ${t.v("documentaire", "17 h")}`);
  const ou = t.lignes.flatMap((r) => r.slice(1).map((c, j) => [r[0], t.ent[j + 1], c])).filter((x) => x[2] === "112");
  vrai("1. un seul 112 : animation, 17 h", ou.length === 1 && ou[0][0] === "animation" && ou[0][1] === "17 h");
  vrai("1. d) 74 est l'aventure à 17 h, pas à 20 h", t.v("aventure", "17 h") === 74 && t.v("aventure", "20 h") !== 74);
  dit(1, `d) Non. 74, c'est l'aventure à 17 h`);
  vrai("1. le corrigé reprend la figure", memes(T(1, "schema").lignes, t.lignes));
});
essai("2", () => {
  const t = T(2);
  dit(2, `ligne « gare » : ${t.brut("gare", "car 2")}`);
  dit(2, `ligne « école » : ${t.brut("école", "car 3")}`);
  vrai("2. c) 7 h 42 à la mairie : le car 2 seul", t.ent.filter((c, j) => j > 0 && t.brut("mairie", c) === "7 h 42").join() === "car 2");
  const arrivee = t.brut("école", "car 2");
  const [h, m] = arrivee.split(" h ").map(Number);
  vrai("2. d) le car 2 arrive avant 8 h", h * 60 + m < 8 * 60);
  dit(2, `jusqu'à « école » : ${arrivee}`);
  // Les horaires montent de haut en bas et de gauche à droite.
  for (const c of t.ent.slice(1)) {
    const mins = t.lignes.map((r) => r[t.ent.indexOf(c)].split(" h ").map(Number)).map(([a, b]) => a * 60 + b);
    vrai(`2. ${c} : les heures montent d'arrêt en arrêt`, mins.every((x, i) => i === 0 || x > mins[i - 1]));
  }
  vrai("2. le corrigé reprend la figure", memes(T(2, "schema").lignes, t.lignes));
});
essai("3", () => {
  const L = lignesEnonce(3);
  const lu = (prefixe) => {
    const l = L.find((x) => x.startsWith(prefixe));
    const sol = Number(l.match(/(\d+) au soleil/)[1]), omb = Number(l.match(/(\d+) à l'ombre/)[1]);
    return [sol, omb];
  };
  const s = T(3, "schema");
  vrai("3. haricot", memes(s.L("haricot"), lu("Haricots")));
  vrai("3. lentille", memes(s.L("lentille"), lu("Lentilles")));
  vrai("3. radis (l'ombre donnée en premier)", memes(s.L("radis"), lu("Radis")) && /^Radis : \d+ à l'ombre/.test(L.find((x) => x.startsWith("Radis"))));
  dit(3, `J'écris ${s.v("radis", "soleil")} dans « soleil » et ${s.v("radis", "ombre")} dans « ombre »`);
  vrai("3. b) 16 = lentilles à l'ombre, un seul 16", s.v("lentille", "ombre") === 16 && s.lignes.flat().filter((c) => c === "16").length === 1);
});
essai("4", () => {
  const n = nombres(lignesEnonce(4)[1]); // Manche 1 : 14 … Manche 3 : 19 … Manche 4 : 17
  const [m1, , m3, , m4] = [n[1], n[2], n[3], n[4], n[5]];
  const tot = nombres(lignesEnonce(4)[2]).at(-1);
  const m2 = tot - m1 - m3 - m4;
  dit(4, plus([m1, m3, m4]));
  dit(4, `Il manque ${moins(tot, m1 + m3 + m4)} points`);
  dit(4, plus([m1, m2, m3, m4]));
  const s = T(4, "schema");
  vrai("4. le corrigé : manches et total", memes(s.C("points"), [m1, m2, m3, m4, tot]));
  vrai("4. c) la manche 3 en tête, seule", Math.max(m1, m2, m3, m4) === m3 && [m1, m2, m4].every((x) => x < m3));
  dit(4, moins(tot, m1));
});
essai("5", () => {
  const t = T(5);
  const mardi = t.C("mardi"), villes = t.lignes.map((r) => r[0]);
  dit(5, `de haut en bas : ${mardi.join(", ")}`);
  vrai("5. a) Nice le plus chaud mardi", villes[mardi.indexOf(Math.max(...mardi))] === "Nice");
  vrai("5. b) Lille le moins chaud mardi", villes[mardi.indexOf(Math.min(...mardi))] === "Lille");
  vrai("5. c) Lyon plus chaud que Brest lundi", t.v("Lyon", "lundi") > t.v("Brest", "lundi"));
  dit(5, `Brest ${t.v("Brest", "lundi")}, Lyon ${t.v("Lyon", "lundi")}`);
  vrai("5. d) Nice en tête chaque jour", t.ent.slice(1).every((c) => Math.max(...t.C(c)) === t.v("Nice", c)));
  dit(5, `sur la ligne « Nice » : ${t.L("Nice").join(", ")}`);
  vrai("5. le corrigé reprend la figure", memes(T(5, "schema").lignes, t.lignes));
});
essai("6", () => {
  const sa = nombres(lignesEnonce(6)[1]), di = nombres(lignesEnonce(6)[2]);
  const s = T(6, "schema");
  vrai("6. le corrigé porte les nombres de l'énoncé", memes(s.C("samedi"), sa) && memes(s.C("dimanche"), di));
  dit(6, moins(di[0], sa[0]));
  dit(6, moins(sa[1], sa[2]));
  vrai("6. c) seule la mésange baisse", memes(s.lignes.filter((r) => num(r[2]) < num(r[1])).map((r) => r[0]), ["mésange"]));
  dit(6, `${plus(di)} oiseaux`);
});
essai("7", () => {
  const t = T(7);
  const tl = t.lignes.map((r) => somme(r.slice(1).map(num)));
  const tc = t.ent.slice(1).map((c) => somme(t.C(c)));
  dit(7, `${plus(t.L("CM2"))} kg`);
  for (const r of t.lignes.filter((x) => x[0] !== "CM2")) dit(7, `${r[0]} : ${plus(r.slice(1).map(num))}`);
  dit(7, `CM2 : ${N(somme(t.L("CM2")))} kg.\\nPuis`);
  dit(7, `${plus(tl)} kg`);
  vrai("7. lignes et colonnes donnent le même total", somme(tl) === somme(tc));
  t.ent.slice(1).forEach((c) => dit(7, plus(t.C(c))));
  dit(7, `${plus(tc)} kg`);
  const s = T(7, "schema");
  vrai("7. le corrigé : totaux de lignes", memes(s.C("total").slice(0, 3), tl) && s.v("total", "total") === somme(tl));
});
essai("8", () => {
  const t = T(8);
  dit(8, `colonne « 8 personnes » : ${t.brut("lait (mL)", "8 personnes")} mL`);
  dit(8, `colonne « 4 personnes » : ${t.v("œufs", "4 personnes")} œufs`);
  const cinqCents = t.lignes.flatMap((r) => r.slice(1).map((c, j) => (c === "500" ? `${r[0]}|${t.ent[j + 1]}` : null))).filter(Boolean);
  vrai("8. c) 500 deux fois : farine pour 8, lait pour 4", memes(cinqCents, ["farine (g)|8 personnes", "lait (mL)|4 personnes"]));
  // La recette double : chaque case de 8 personnes vaut deux fois celle de 4.
  vrai("8. pour 8 = 2 × pour 4", t.lignes.every((r) => num(r[2]) === 2 * num(r[1])));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const t = T(9);
  dit(9, `colonne « adultes » : ${N(t.v("juin", "adultes"))}`);
  const mai = t.v("mai", "enfants") + t.v("mai", "adultes");
  dit(9, plus([t.v("mai", "enfants"), t.v("mai", "adultes")]));
  for (const m of ["avril", "juin"]) vrai(`9. total de ${m}`, t.v(m, "enfants") + t.v(m, "adultes") === t.v(m, "total"));
  const tots = [t.v("avril", "total"), mai, t.v("juin", "total")];
  dit(9, `colonne « total » : ${tots.map(N).join(", ")}`);
  vrai("9. c) juin en tête", Math.max(...tots) === tots[2]);
  dit(9, moins(t.v("avril", "adultes"), t.v("avril", "enfants")));
  completeLaFigure(9, { "mai|total": mai });
});
essai("10", () => {
  const L = lignesEnonce(10);
  const jour = (j) => {
    const l = L.find((x) => x.startsWith(j));
    return [Number(l.match(/(\d+) poissons/)[1]), Number(l.match(/(\d+) végétariens/)[1])];
  };
  const jours = ["Lundi", "Mardi", "Jeudi", "Vendredi"].map(jour);
  enonceDit(10, "Jeudi : 33 végétariens et 51 poissons.");
  const s = T(10, "schema");
  vrai("10. le corrigé : poisson et végétarien de chaque jour", memes(s.lignes.slice(0, 4).map((r) => [num(r[1]), num(r[2])]), jours));
  const parJour = nombres(L.find((x) => x.startsWith("b)")))[0];
  jours.forEach(([p, v]) => {
    vrai("10. chaque jour fait 84", p + v === parJour);
    dit(10, plus([p, v]));
  });
  const vg = jours.map((x) => x[1]), po = jours.map((x) => x[0]);
  dit(10, `Colonne « végétarien » : ${vg.join(", ")}`);
  vrai("10. c) mardi en tête", Math.max(...vg) === vg[1]);
  dit(10, `Poisson : ${plus(po)}. Végétarien : ${plus(vg)}`);
  dit(10, moins(somme(vg), somme(po)));
  vrai("10. chaque plat gagne deux jours", jours.filter(([p, v]) => p > v).length === 2 && jours.filter(([p, v]) => v > p).length === 2);
  vrai("10. le total général du corrigé", s.v("total", "total") === somme(po) + somme(vg) && somme(po) + somme(vg) === 4 * parJour);
});
essai("11", () => {
  const t = T(11);
  const ce2f = t.v("CE2", "total") - t.v("CE2", "janvier");
  const cm1j = t.v("CM1", "total") - t.v("CM1", "février");
  const cm2t = t.v("CM2", "janvier") + t.v("CM2", "février");
  const janv = t.v("CE2", "janvier") + cm1j + t.v("CM2", "janvier");
  const fevr = ce2f + t.v("CM1", "février") + t.v("CM2", "février");
  const g1 = t.v("CE2", "total") + t.v("CM1", "total") + cm2t, g2 = janv + t.v("total", "février");
  dit(11, moins(t.v("CE2", "total"), t.v("CE2", "janvier")));
  dit(11, moins(t.v("CM1", "total"), t.v("CM1", "février")));
  dit(11, plus([t.v("CM2", "janvier"), t.v("CM2", "février")]));
  dit(11, plus([t.v("CE2", "janvier"), cm1j, t.v("CM2", "janvier")]));
  dit(11, plus([t.v("CE2", "total"), t.v("CM1", "total"), cm2t]));
  dit(11, plus([janv, t.v("total", "février")]));
  vrai("11. les deux chemins du total général", g1 === g2);
  vrai("11. février colle", fevr === t.v("total", "février"));
  dit(11, plus([ce2f, t.v("CM1", "février"), t.v("CM2", "février")]));
  completeLaFigure(11, { "CE2|février": ce2f, "CM1|janvier": cm1j, "CM2|total": cm2t, "total|janvier": janv, "total|total": g1 });
});
essai("12", () => {
  const t = T(12);
  const am = t.C("après-midi"), noms = t.lignes.map((r) => r[0]);
  dit(12, `Colonne « après-midi » : ${am.join(", ")}`);
  vrai("12. a) les quilles l'après-midi", noms[am.indexOf(Math.max(...am))] === "quilles");
  dit(12, `${plus(t.C("matin"))} tickets`);
  const tl = t.lignes.map((r) => num(r[1]) + num(r[2]));
  t.lignes.forEach((r) => dit(12, plus([num(r[1]), num(r[2])])));
  vrai("12. c) la pêche, seule en tête", noms[tl.indexOf(Math.max(...tl))] === "pêche" && tl.filter((x) => x === Math.max(...tl)).length === 1);
  const grande = Math.max(...t.lignes.flatMap((r) => r.slice(1).map(num)));
  vrai("12. d) la plus grande case n'est pas sur la meilleure ligne", t.lignes.find((r) => r.slice(1).map(num).includes(grande))[0] === "quilles");
  vrai("12. le corrigé : totaux", memes(T(12, "schema").C("total"), tl));
});

/* ═════ ★★ (suite) ═════ */
essai("13", () => {
  const t = T(13);
  dit(13, `colonne « dimanche » : ${t.v("Formica Léo", "dimanche")}`);
  vrai("13. b) 185 n'est pas le cratère samedi, c'est la ligne du dessous", t.v("cratère", "samedi") !== 185 && t.v("Formica Léo", "samedi") === 185 && t.lignes[1][0] === "Formica Léo");
  dit(13, `colonne « samedi » : je lis ${t.v("cratère", "samedi")}`);
  dit(13, moins(t.v("cratère", "dimanche"), t.v("cratère", "samedi")));
  dit(13, `${plus(t.C("dimanche"))} randonneurs`);
  vrai("13. le corrigé reprend la figure", memes(T(13, "schema").lignes, t.lignes));
});
essai("14", () => {
  const t = T(14);
  const L = lignesEnonce(14);
  // « Indice 1 : mardi, … 15 bouquets … » : le premier nombre est le numéro de l'indice.
  const [, dRoses] = nombres(L[1]), [, dTulipes] = nombres(L[2]), [, totMardi] = nombres(L[3]);
  const rM = t.v("roses", "lundi") + dRoses;
  const tJ = t.v("tulipes", "mardi") - dTulipes;
  const tsM = totMardi - rM - t.v("tulipes", "mardi");
  dit(14, `${t.v("roses", "lundi")} + ${dRoses} = ${rM} roses mardi`);
  dit(14, `${moins(t.v("tulipes", "mardi"), dTulipes)} tulipes jeudi`);
  dit(14, plus([rM, t.v("tulipes", "mardi")]));
  dit(14, `${moins(totMardi, rM + t.v("tulipes", "mardi"))} tournesols`);
  dit(14, plus([rM, t.v("tulipes", "mardi"), tsM]));
  const roses = [t.v("roses", "lundi"), rM, t.v("roses", "jeudi")];
  vrai("14. d) mardi en tête", Math.max(...roses) === rM);
  completeLaFigure(14, { "roses|mardi": rM, "tulipes|jeudi": tJ, "tournesols|mardi": tsM });
});
essai("15", () => {
  const t = T(15);
  vrai("15. a) vrai", t.v("guitare", "garçons") > t.v("guitare", "filles"));
  vrai("15. b) vrai", t.v("piano", "filles") === 2 * t.v("piano", "garçons"));
  dit(15, `2 × ${t.v("piano", "garçons")} = ${2 * t.v("piano", "garçons")}`);
  const fi = t.C("filles"), ga = t.C("garçons");
  dit(15, `Filles : ${plus(fi)}. Garçons : ${plus(ga)}`);
  vrai("15. c) faux : plus de filles", somme(fi) > somme(ga));
  const tl = t.lignes.map((r) => num(r[1]) + num(r[2]));
  t.lignes.forEach((r) => dit(15, plus([num(r[1]), num(r[2])])));
  const noms = t.lignes.map((r) => r[0]);
  vrai("15. d) le violon le moins choisi, la batterie a la plus petite case des filles", noms[tl.indexOf(Math.min(...tl))] === "violon" && Math.min(...fi) === t.v("batterie", "filles"));
  vrai("15. le corrigé : totaux", memes(T(15, "schema").C("total"), [...tl, somme(tl)]));
});
essai("16", () => {
  const L = lignesEnonce(16);
  const sc = { Inès: nombres(L[1]), Malo: nombres(L[2]), Sacha: nombres(L[3]) };
  const s = T(16, "schema");
  for (const [n, v] of Object.entries(sc)) vrai(`16. le corrigé : ${n}`, memes(s.L(n), [...v, somme(v)]));
  for (let m = 0; m < 3; m++) {
    const col = Object.values(sc).map((v) => v[m]);
    dit(16, `Manche ${m + 1} : ${col.join(", ")}`);
  }
  const gagnant = (m) => Object.keys(sc).reduce((a, b) => (sc[b][m] > sc[a][m] ? b : a));
  vrai("16. b) Malo gagne 2 manches", [0, 1, 2].filter((m) => gagnant(m) === "Malo").length === 2);
  for (const [n, v] of Object.entries(sc)) dit(16, `${n} : ${plus(v)}`);
  const tots = Object.values(sc).map(somme);
  vrai("16. d) Inès gagne la partie", Math.max(...tots) === somme(sc.Inès));
  dit(16, `${moins(somme(sc.Inès), somme(sc.Malo))} points`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const t = T(17);
  // Le fait réel : tableau officiel des médailles de Paris 2024.
  const reel = { France: [16, 26, 22], "Royaume-Uni": [14, 22, 29], Australie: [18, 19, 16], Japon: [20, 12, 13] };
  for (const [p, v] of Object.entries(reel)) vrai(`17. ${p} : les vraies médailles`, memes(t.L(p), v));
  dit(17, `colonne « argent » : ${t.v("France", "argent")}`);
  const pays = t.lignes.map((r) => r[0]);
  for (const p of pays) dit(17, `${p} : ${plus(t.L(p))}`);
  const parOr = [...pays].sort((a, b) => t.v(b, "or") - t.v(a, "or"));
  const parTotal = [...pays].sort((a, b) => somme(t.L(b)) - somme(t.L(a)));
  dit(17, `L'ordre est : ${parOr.join(", ")}`);
  dit(17, `L'ordre est : ${parTotal.join(", ")}`);
  dit(17, `Colonne « or » : ${parOr.map((p) => `${p} ${t.v(p, "or")}`).join(", ")}`);
  dit(17, `Les totaux : ${parTotal.map((p) => `${p} ${somme(t.L(p))}`).join(", ")}`);
  vrai("17. e) le premier à l'or est dernier au total", parOr[0] === parTotal[parTotal.length - 1] && parOr[0] === "Japon");
  const s = T(17, "schema");
  vrai("17. le corrigé : l'or et le total de chaque pays, rangés par l'or", memes(s.lignes.map((r) => r[0]), parOr) && parOr.every((p) => s.v(p, "or") === t.v(p, "or") && s.v(p, "total") === somme(t.L(p))));
});
essai("18", () => {
  const t = T(18);
  const chJ = t.v("chiens", "total") - t.v("chiens", "juin") - t.v("chiens", "août");
  const chaA = t.v("total", "août") - t.v("chiens", "août") - t.v("lapins", "août");
  const chaT = t.v("chats", "juin") + t.v("chats", "juil.") + chaA;
  const g1 = t.v("chiens", "total") + chaT + t.v("lapins", "total");
  const g2 = somme(["juin", "juil.", "août"].map((m) => t.v("total", m)));
  dit(18, `${N(t.v("chiens", "total"))} − ${t.v("chiens", "juin")} − ${t.v("chiens", "août")} = ${chJ} chiens`);
  dit(18, `${t.v("total", "août")} − ${t.v("chiens", "août")} − ${t.v("lapins", "août")} = ${chaA} chats`);
  dit(18, `${plus([t.v("chats", "juin"), t.v("chats", "juil."), chaA])} chats`);
  dit(18, plus([t.v("chiens", "total"), chaT, t.v("lapins", "total")]));
  dit(18, plus(["juin", "juil.", "août"].map((m) => t.v("total", m))));
  vrai("18. les deux chemins du total", g1 === g2);
  vrai("18. juin et juillet collent", t.v("chiens", "juin") + t.v("chats", "juin") + t.v("lapins", "juin") === t.v("total", "juin") && chJ + t.v("chats", "juil.") + t.v("lapins", "juil.") === t.v("total", "juil."));
  vrai("18. les lapins collent", t.v("lapins", "juin") + t.v("lapins", "juil.") + t.v("lapins", "août") === t.v("lapins", "total"));
  vrai("18. la ligne des chats a deux trous, la colonne d'août un seul", t.lignes[1].filter((c) => c === "?").length === 2 && t.C("août").filter(Number.isNaN).length === 1);
  const obj = nombres(lignesEnonce(18).find((x) => x.startsWith("e)")))[0];
  dit(18, `${moins(obj, g1)} adoptions manquent`);
  completeLaFigure(18, { "chiens|juil.": chJ, "chats|août": chaA, "chats|total": chaT, "total|total": g1 });
});
essai("19", () => {
  const t = T(19);
  const genres = ["BD", "romans", "albums"];
  for (const g of genres) {
    vrai(`19. total de la ligne ${g} juste`, t.v(g, "CM1") + t.v(g, "CM2") === t.v(g, "total"));
    dit(19, plus([t.v(g, "CM1"), t.v(g, "CM2")]));
  }
  const cm1 = somme(genres.map((g) => t.v(g, "CM1"))), cm2 = somme(genres.map((g) => t.v(g, "CM2")));
  dit(19, `CM1 : ${plus(genres.map((g) => t.v(g, "CM1")))}`);
  dit(19, `CM2 : ${plus(genres.map((g) => t.v(g, "CM2")))}`);
  vrai("19. CM1 juste, CM2 faux (et un seul total faux)", cm1 === t.v("total", "CM1") && cm2 !== t.v("total", "CM2"));
  dit(19, `Le tableau écrit ${t.v("total", "CM2")} : c'est faux`);
  dit(19, `${t.v("total", "CM1")} + ${t.v("total", "CM2")} = ${t.v("total", "CM1") + t.v("total", "CM2")}, pas ${t.v("total", "total")}`);
  vrai("19. le total général colle avec les lignes", somme(genres.map((g) => t.v(g, "total"))) === t.v("total", "total"));
  dit(19, `${t.v("total", "CM1")} + ${cm2} = ${t.v("total", "total")}`);
  vrai("19. c) le CM2 emprunte le plus ; d) les BD", cm2 > cm1 && Math.max(...genres.map((g) => t.v(g, "total"))) === t.v("BD", "total"));
  const s = T(19, "schema");
  vrai("19. le corrigé : 117 à la place de 107, le reste identique", s.v("total", "CM2") === cm2 && s.lignes.every((r, i) => r.every((c, j) => c === t.lignes[i][j] || (i === 3 && j === 2))));
});
essai("20", () => {
  const L = lignesEnonce(20);
  const rel = { cantine: nombres(L[1]), gymnase: nombres(L[2]), classes: nombres(L[3]) };
  const s = T(20, "schema");
  for (const [b, v] of Object.entries(rel)) vrai(`20. le corrigé : ${b}`, memes(s.L(b), [...v, somme(v)]));
  const mois = [0, 1, 2].map((m) => Object.values(rel).map((v) => v[m]));
  const tm = mois.map(somme);
  mois.forEach((xs) => dit(20, plus(xs)));
  vrai("20. b) juin en tête", Math.max(...tm) === tm[2]);
  const g = somme(tm);
  dit(20, `${plus(tm)} kWh`);
  const obj = nombres(L.find((x) => x.startsWith("c)")))[0];
  vrai("20. c) objectif atteint", g >= obj);
  dit(20, `avec ${g - obj} kWh de plus`);
  const gy = somme(rel.gymnase), ca = somme(rel.cantine), cl = somme(rel.classes);
  dit(20, `Gymnase : ${plus(rel.gymnase)}`);
  dit(20, `Cantine : ${plus(rel.cantine)}. Classes : ${plus(rel.classes)}`);
  dit(20, plus([ca, cl]));
  vrai("20. d) le gymnase produit moins que les deux autres réunis", gy < ca + cl);
  dit(20, `${plus([gy, ca + cl])}. Je retrouve le total`);
  vrai("20. le corrigé : ligne total", memes(s.L("total"), [...tm, g]));
});

f.fin();
