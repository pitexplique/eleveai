// Recalcul indépendant de la feuille « Problèmes à nombres inconnus et motifs »
// de 6e (30/09/2026) : lib/fiches-exercices/maths-6e-algebre-probleme.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (barres, motif,
// table), jamais recopiés ici. Le script résout chaque problème À SA FAÇON :
// il ESSAIE tous les nombres entiers (ou tous les centimes) jusqu'à trouver
// celui qui vérifie l'énoncé — une méthode qui n'a rien à voir avec le schéma
// en barres du corrigé. Puis il cherche la réponse écrite dans le corrigé.
// Les motifs : il RECOMPTE les allumettes, les carreaux et les chaises sur une
// construction géométrique à lui (arêtes, cases, places), étape par étape.
// Chaque schéma en barres est relu : ses nombres font les totaux de l'énoncé,
// et chaque nombre tient dans son morceau.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-algebre-probleme.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-algebre-probleme.tsx", "algebre_probleme", ["barres", "motif", "table"], "6e");
const { e, vrai, dit, enonceDit, dessin, appels, essai } = f;

const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", ".").replace("−", "-").replace(/[^\d]+$/, ""));
const r2 = (x) => Math.round(x * 100) / 100;
const eur = (x) => (Number.isInteger(r2(x)) ? t(r2(x)) : r2(x).toFixed(2).replace(".", "{,}"));
const L = (s) => s.length * 8.8;
/** Les nombres $…$ d'un texte, dans l'ordre. */
const nombres = (texte) => [...texte.matchAll(/\$([\d\\,{} ]+)\$/g)].map((m) => nb(m[1]));
/** Essaie les valeurs de `de` à `a` (pas `pas`) : toutes celles qui vérifient `ok`. */
const essaie = (ok, de = 0, a = 2000, pas = 1) => {
  const sol = [];
  for (let k = Math.round(de / pas); k <= Math.round(a / pas); k++) if (ok(r2(k * pas))) sol.push(r2(k * pas));
  return sol;
};
/** Une seule solution, sinon erreur. */
const unique = (sol, nom) => {
  if (sol.length !== 1) throw new Error(`${nom} : ${sol.length} solutions (${sol.slice(0, 5)})`);
  return sol[0];
};

/* ═════ Tous les schémas en barres : chaque nombre tient dans son morceau ═════ */
const lignesDe = (lignes) => lignes.map((l) => ({ ...l, somme: l.morceaux.filter((m) => m.sorte !== "moins").reduce((s, m) => s + nb(m.label), 0) }));
for (const { args } of appels("barres").filter((a) => a.args)) {
  const [lignes, total] = args;
  const nomW = Math.max(20, ...lignes.map((l) => L(l.nom) + 10));
  const droiteW = Math.max(0, ...lignes.map((l) => (l.total ? L(l.total) + 10 : 0)));
  const W = 296 - nomW - droiteW;
  const u = W / Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.n, 0)));
  vrai(`barres ${total ?? lignes[0].nom} : assez de place pour les barres (${Math.round(W)})`, W >= 150);
  if (total) vrai(`barres ${total} : le total tient`, L(`total : ${total}`) <= 290);
  for (const l of lignes) for (const m of l.morceaux) vrai(`barres ${l.nom} : « ${m.label} » tient dans son morceau`, L(m.label) <= m.n * u - 4);
  // Les nombres du dessin font le total de chaque ligne, et le total de tout.
  const ls = lignesDe(lignes);
  for (const l of ls) if (l.total) vrai(`barres ${l.nom} : ${l.somme} = ${l.total}`, r2(l.somme) === nb(l.total));
  // Le total est celui de toutes les lignes ensemble, ou — quand les lignes
  // montrent la MÊME chose avant et après un échange — celui de chaque ligne.
  if (total) vrai(`barres ${total} : les lignes font le total`, r2(ls.reduce((s, l) => s + l.somme, 0)) === nb(total) || (ls.length > 1 && ls.every((l) => r2(l.somme) === nb(total))));
}

/* ═════ Les motifs : recomptés sur une construction à part ═════ */
const compte = {
  carres: (n) => {
    const a = new Set();
    for (let k = 0; k < n; k++) a.add(`h${k},0`).add(`h${k},1`);
    for (let k = 0; k <= n; k++) a.add(`v${k}`);
    return a.size;
  },
  triangles: (n) => {
    const a = new Set();
    const arete = (p, q) => a.add([p, q].map((x) => x.join(",")).sort().join("|"));
    for (let i = 0; i < n; i++) {
      const [p, q, r] = i % 2 === 0 ? [[i, 0], [i + 2, 0], [i + 1, 1]] : [[i, 1], [i + 2, 1], [i + 1, 0]];
      arete(p, q), arete(q, r), arete(r, p);
    }
    return a.size;
  },
  L: (n) => {
    const c = new Set();
    for (let k = 0; k < n; k++) c.add(`0,${k}`).add(`${k},0`);
    return c.size;
  },
  tables: (n) => {
    const places = new Set(["gauche", "droite"]);
    for (let k = 0; k < n; k++) places.add(`haut${k}`).add(`bas${k}`);
    return places.size;
  },
};
for (const { args } of appels("motif").filter((a) => a.args)) {
  const [forme, etapes] = args;
  const s = { carres: 18, triangles: 24, L: 14, tables: 22 }[forme];
  const larg = (n) => (forme === "carres" || forme === "L" ? n * s : forme === "triangles" ? ((n + 1) * s) / 2 : n * s + 20);
  const ecarts = etapes.slice(1).map((n, i) => Math.max(24, 58 - (larg(etapes[i]) + larg(n)) / 2));
  const W = etapes.reduce((a, n) => a + larg(n), 0) + ecarts.reduce((a, g) => a + g, 0);
  const centres = etapes.map((n, i) => (300 - W) / 2 + etapes.slice(0, i).reduce((a, m) => a + larg(m), 0) + ecarts.slice(0, i).reduce((a, g) => a + g, 0) + larg(n) / 2);
  vrai(`motif ${forme} : tient dans 300 (${Math.round(W)})`, W <= 290);
  vrai(`motif ${forme} : « étape n » dans le cadre`, centres[0] - 30 >= 0 && centres.at(-1) + 30 <= 300);
  centres.slice(1).forEach((c, i) => vrai(`motif ${forme} : « étape ${etapes[i]} » et « étape ${etapes[i + 1]} » ne se touchent pas`, c - centres[i] >= 58));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [tot, plus] = nombres(e(1));
  const leo = unique(essaie((x) => x + (x + plus) === tot), "1");
  dit(1, `$${tot} - ${plus} = ${tot - plus}$`);
  dit(1, `$${tot - plus} \\div 2 = ${leo}$`);
  dit(1, `Mia a $${leo} + ${plus} = ${leo + plus}$ billes`);
  dit(1, `Réponse : Léo a $${leo}$ billes, Mia a $${leo + plus}$ billes.`);
  dit(1, `partager $${tot}$ en deux, $${tot / 2}$ et $${tot / 2}$`);
  const [lignes] = dessin("barres", 1);
  vrai("1. le schéma : Léo, puis Léo + 6", nb(lignes[0].morceaux[0].label) === leo && nb(lignes[1].morceaux[1].label) === plus);
});
essai("2", () => {
  const [tot, plus] = nombres(e(2));
  const cahier = unique(essaie((x) => x + x + plus === tot), "2");
  dit(2, `$${tot} - ${plus} = ${tot - plus}$`);
  dit(2, `$${tot - plus} \\div 2 = ${cahier}$`);
  dit(2, `Réponse : le cahier coûte $${cahier}$ €, le livre $${cahier + plus}$ €.`);
  const [lignes] = dessin("barres", 2);
  vrai("2. le schéma", nb(lignes[0].morceaux[0].label) === cahier && nb(lignes[1].morceaux[1].label) === plus);
});
essai("3", () => {
  const [tot] = nombres(e(3));
  enonceDit(3, "deux fois plus de filles que de garçons");
  const g = unique(essaie((x) => x + 2 * x === tot), "3");
  dit(3, `$${tot} \\div 3 = ${g}$`);
  dit(3, `Réponse : $${g}$ garçons et $${2 * g}$ filles.`);
  const [lignes] = dessin("barres", 3);
  vrai("3. le schéma : 1 part, puis 2 parts", lignes[0].morceaux.length === 1 && lignes[1].morceaux.length === 2 && lignes[1].morceaux.every((m) => nb(m.label) === g));
});
essai("4", () => {
  const [n, , sac, melon] = nombres(e(4));
  const pomme = unique(essaie((x) => n * x + melon === sac), "4");
  dit(4, `$${sac} - ${melon} = ${sac - melon}$ g`);
  dit(4, `$${sac - melon} \\div ${n} = ${pomme}$ g`);
  dit(4, `Réponse : une pomme pèse $${pomme}$ g.`);
});
essai("5", () => {
  const [forme, etapes] = dessin("motif", 5, "figure");
  const c = (n) => compte[forme](n);
  dit(5, `Étape $1$ : $${c(1)}$ allumettes. Étape $2$ : $${c(2)}$. Étape $3$ : $${c(3)}$.`);
  vrai("5. le dessin montre les étapes 1 à 3", JSON.stringify(etapes) === "[1,2,3]");
  const pas = c(2) - c(1);
  vrai("5. l'ajout est constant", c(3) - c(2) === pas && c(5) - c(4) === pas);
  dit(5, `j'ajoute $${pas}$ allumettes`);
  dit(5, `Étape $4$ : $${c(3)} + ${pas} = ${c(4)}$. Étape $5$ : $${c(4)} + ${pas} = ${c(5)}$.`);
  dit(5, `Réponse : $${c(1)}$, $${c(2)}$, $${c(3)}$ ; $${pas}$ de plus à chaque étape ; $${c(4)}$ et $${c(5)}$.`);
  const [, lignes] = dessin("table", 5);
  vrai("5. le tableau", lignes.every((l) => nb(l[1]) === c(nb(l[0]))));
});
essai("6", () => {
  const [forme] = dessin("motif", 6, "figure");
  const c = (n) => compte[forme](n);
  dit(6, `Étape $1$ : $${c(1)}$ carreau. Étape $2$ : $${c(2)}$. Étape $3$ : $${c(3)}$.`);
  const pas = c(2) - c(1);
  dit(6, `j'ajoute $${pas}$ carreaux`);
  dit(6, `Étape $4$ : $${c(3)} + ${pas} = ${c(4)}$ carreaux.`);
  dit(6, `$${c(1)} + 9 \\times ${pas} = ${c(10)}$ carreaux`);
  dit(6, `Réponse : $${c(1)}$, $${c(2)}$, $${c(3)}$ ; $${c(4)}$ ; $${c(10)}$.`);
});
essai("7", () => {
  const [s1, , p1, s2, , p2] = nombres(e(7));
  const sol = [];
  for (let st = 0; st <= 1000; st++) for (let g = 0; g <= 1000; g++) if (s1 * st + g === p1 * 100 && s2 * st + g === p2 * 100) sol.push([st / 100, g / 100]);
  const [stylo, gomme] = unique(sol, "7");
  dit(7, `$${eur(p2)} - ${eur(p1)} = ${eur(stylo)}$ €`);
  dit(7, `$2 \\times ${eur(stylo)} = ${eur(2 * stylo)}$ €`);
  dit(7, `La gomme coûte $${eur(p1)} - ${eur(2 * stylo)} = ${eur(gomme)}$ €`);
  dit(7, `Réponse : un stylo coûte $${eur(stylo)}$ €, la gomme $${eur(gomme)}$ €.`);
});
essai("8", () => {
  const [forme, etapes] = dessin("motif", 8, "figure");
  const c = (n) => compte[forme](n);
  dit(8, `a) ${etapes.map((n) => `Étape $${n}$ : $${c(n)}$.`).join(" ")}`);
  const pas = c(2) - c(1);
  dit(8, `J'ajoute $${pas}$ allumettes`);
  dit(8, `Étape $5$ : $${c(4)} + ${pas} = ${c(5)}$ allumettes.`);
  dit(8, `$5 \\times 3 = 15$`);
  dit(8, `Réponse : ${etapes.map((n) => `$${c(n)}$`).join(", ")} ; $${pas}$ ; $${c(5)}$ allumettes.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [tot, v, r] = nombres(e(9));
  const b = unique(essaie((x) => x + (x + v) + (x + r) === tot), "9");
  dit(9, `$${tot} - ${v} - ${r} = ${tot - v - r}$`);
  dit(9, `$${tot - v - r} \\div 3 = ${b}$`);
  dit(9, `Réponse : Bleus $${b}$ km, Verts $${b + v}$ km, Rouges $${b + r}$ km.`);
});
essai("10", () => {
  const [tot, moins] = nombres(e(10));
  const grand = unique(essaie((x) => x + (x - moins) === tot), "10");
  dit(10, `$${tot} + ${moins} = ${tot + moins}$`);
  dit(10, `$${tot + moins} \\div 2 = ${grand}$`);
  dit(10, `Le petit pèse $${grand} - ${moins} = ${grand - moins}$ kg`);
  dit(10, `$${tot} - ${moins} = ${tot - moins}$, et $${tot - moins} \\div 2 = ${grand - moins}$`);
  dit(10, `Réponse : le grand sac pèse $${grand}$ kg, le petit $${grand - moins}$ kg.`);
  const [lignes] = dessin("barres", 10);
  vrai("10. le schéma : ce qui manque au petit", lignes[1].morceaux[1].sorte === "moins" && nb(lignes[1].morceaux[1].label) === -moins && nb(lignes[0].morceaux[0].label) === grand);
});
essai("11", () => {
  const [c1, j1, p1, c2, j2, p2] = nombres(e(11));
  const sol = [];
  for (let c = 0; c <= 1000; c++) for (let j = 0; j <= 1000; j++) if (c1 * c + j1 * j === p1 * 100 && c2 * c + j2 * j === p2 * 100) sol.push([c / 100, j / 100]);
  const [cr, jus] = unique(sol, "11");
  dit(11, `$${eur(p2)} - ${eur(p1)} = ${eur(p2 - p1)}$ €`);
  dit(11, `$${eur(p2 - p1)} \\div ${j2 - j1} = ${eur(jus)}$ €`);
  dit(11, `$${eur(p1)} - ${eur(jus)} = ${eur(p1 - jus)}$ €`);
  dit(11, `$${eur(p1 - jus)} \\div 2 = ${eur(cr)}$ €`);
  dit(11, `Réponse : un jus coûte $${eur(jus)}$ €, un croissant $${eur(cr)}$ €.`);
});
essai("12", () => {
  const [k, g, p, tot] = nombres(e(12));
  const pomme = unique(essaie((x) => g * k * x + p * x === tot), "12");
  dit(12, `$${g} \\times ${k} = ${g * k}$ pommes`);
  dit(12, `$${g * k} + ${p} = ${g * k + p}$ pommes`);
  dit(12, `$${t(tot)} \\div ${g * k + p} = ${pomme}$ g`);
  dit(12, `$${k} \\times ${pomme} = ${k * pomme}$ g`);
  dit(12, `Réponse : une pomme pèse $${pomme}$ g, un gâteau $${k * pomme}$ g.`);
  const [lignes] = dessin("barres", 12);
  vrai("12. après l'échange : 7 pommes", lignes[1].morceaux.length === g * k + p);
});
essai("13", () => {
  const c = (n) => compte.carres(n);
  vrai("13. l'énoncé redit le motif de l'exercice 5", e(13).includes(`$${c(1)}$ allumettes à l'étape $1$, puis $${c(2) - c(1)}$ de plus`));
  dit(13, `$${c(1)} + 19 \\times ${c(2) - c(1)} = ${c(1)} + ${19 * (c(2) - c(1))} = ${c(20)}$ allumettes`);
  enonceDit(13, `$20 \\times 4 = 80$`);
  dit(13, `$1 + 20 \\times 3 = ${c(20)}$`);
  dit(13, `Réponse : $${c(20)}$ allumettes`);
  const [, lignes] = dessin("table", 13);
  vrai("13. le tableau", lignes.every((l) => nb(l[1]) === c(nb(l[0]))));
});
essai("14", () => {
  const c = (n) => compte.triangles(n);
  vrai("14. l'énoncé redit le motif de l'exercice 8", e(14).includes(`$${c(1)}$ allumettes à l'étape $1$, puis $${c(2) - c(1)}$ de plus`));
  const boite = nombres(e(14)).at(-1);
  let etape = 0;
  while (c(etape + 1) <= boite) etape++;
  dit(14, `$${boite} - ${c(1)} = ${boite - c(1)}$`);
  dit(14, `il arrive à l'étape $${etape}$`);
  dit(14, `$${c(1)} + ${etape - 1} \\times 2 = ${c(etape)}$ allumettes`);
  dit(14, `Réponse : l'étape $${etape}$ ; il reste $${boite - c(etape)}$ allumette.`);
  const [, lignes] = dessin("table", 14);
  vrai("14. le tableau", lignes.every((l) => nb(l[1]) === c(nb(l[0]))));
});
essai("15", () => {
  const [tot, k] = nombres(e(15));
  const petit = unique(essaie((x) => x + k * x === tot), "15");
  dit(15, `$${tot} \\div ${k + 1} = ${petit}$`);
  dit(15, `Réponse : $${petit}$ cm et $${k * petit}$ cm.`);
});
essai("16", () => {
  const [c1, b1, c2, b2, boule] = nombres(e(16));
  const cube = unique(essaie((x) => c1 * x + b1 * boule === c2 * x + b2 * boule), "16");
  dit(16, `un cube pèse autant que $${cube / boule}$ boules`);
  dit(16, `$${cube / boule} \\times ${boule} = ${cube}$ g`);
  dit(16, `$${c1} \\times ${cube} + ${boule} = ${c1 * cube + b1 * boule}$ et $${c2} \\times ${cube} + ${b2} \\times ${boule} = ${c2 * cube + b2 * boule}$`);
  const [lignes] = dessin("barres", 16);
  const [g, d] = lignesDe(lignes);
  vrai("16. les deux plateaux pèsent pareil sur le dessin", g.somme === d.somme && g.somme === c1 * cube + b1 * boule);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [tot, plus, don, jeu] = nombres(e(17));
  const hugo = unique(essaie((x) => x + x + plus === tot), "17");
  const zoe = hugo + plus;
  dit(17, `$${tot} - ${plus} = ${tot - plus}$`);
  dit(17, `Hugo a $${hugo}$ €. Zoé a $${hugo} + ${plus} = ${zoe}$ €.`);
  dit(17, `Zoé : $${zoe} - ${don} = ${zoe - don}$ €. Hugo : $${hugo} + ${don} = ${hugo + don}$ €.`);
  vrai("17. ils ont la même somme après le don", zoe - don === hugo + don);
  dit(17, `$${jeu} \\div 2 = ${jeu / 2}$ €`);
  dit(17, `$${hugo + don} - ${jeu / 2} = ${hugo + don - jeu / 2}$ €`);
  dit(17, `Réponse : Hugo $${hugo}$ €, Zoé $${zoe}$ € ; puis $${hugo + don}$ € chacun ; il reste $${hugo + don - jeu / 2}$ € à chacun.`);
});
essai("18", () => {
  const [forme, etapes] = dessin("motif", 18, "figure");
  const c = (n) => compte[forme](n);
  dit(18, `${etapes.map((n) => `$${n}$ table${n > 1 ? "s" : ""} : $${c(n)}$ chaises.`).join(" ")}`);
  const pas = c(2) - c(1);
  dit(18, `ajoute $${pas}$ chaises`);
  dit(18, `$${c(1)} + 9 \\times ${pas} = ${c(10)}$ chaises`);
  const invites = nombres(e(18)).at(-1);
  let tables = 1;
  while (c(tables) < invites) tables++;
  vrai("18. juste assez de chaises", c(tables) === invites);
  dit(18, `Il faut $1 + ${tables - 1} = ${tables}$ tables.`);
  dit(18, `Réponse : $${c(1)}$, $${c(2)}$, $${c(3)}$ ; $${pas}$ ; $${c(10)}$ chaises ; $${tables}$ tables.`);
  const [, lignes] = dessin("table", 18);
  vrai("18. le tableau", lignes.every((l) => nb(l[1]) === c(nb(l[0]))));
});
essai("19", () => {
  const [tot, plus] = nombres(e(19));
  const ben = unique(essaie((x) => x + (x + plus) + 2 * x === tot), "19");
  const [ana, chloe] = [ben + plus, 2 * ben];
  dit(19, `$${tot} - ${plus} = ${tot - plus}$`);
  dit(19, `$${tot - plus} \\div 4 = ${ben}$`);
  dit(19, `Réponse : Ben $${ben}$ kg, Ana $${ana}$ kg, Chloé $${chloe}$ kg.`);
  dit(19, `Chloé donne $${tot / 3 - ben}$ kg à Ben et $${tot / 3 - ana}$ kg à Ana.`);
  vrai("19. après le partage, Chloé garde le tiers", chloe - (tot / 3 - ben) - (tot / 3 - ana) === tot / 3);
});
essai("20", () => {
  const [a, en, tot, plus, a2, e2, budget, a3, e3] = nombres(e(20));
  const enfant = unique(essaie((x) => a * (x + plus) + en * x === tot), "20");
  const adulte = enfant + plus;
  dit(20, `$${tot} - ${a * plus} = ${tot - a * plus}$, et $${tot - a * plus} \\div ${a + en} = ${enfant}$.`);
  dit(20, `$${a2} \\times ${adulte} + ${e2} \\times ${enfant} = ${a2 * adulte} + ${e2 * enfant} = ${a2 * adulte + e2 * enfant}$ €`);
  const c = a3 * adulte + e3 * enfant;
  vrai("20. la famille peut payer", c <= budget);
  dit(20, `$${a3} \\times ${adulte} + ${e3} \\times ${enfant} = ${a3 * adulte} + ${e3 * enfant} = ${c}$ €`);
  dit(20, `Réponse : $${enfant}$ € et $${adulte}$ € ; $${a2 * adulte + e2 * enfant}$ € ; oui, et il reste $${budget - c}$ €.`);
});

f.fin();
