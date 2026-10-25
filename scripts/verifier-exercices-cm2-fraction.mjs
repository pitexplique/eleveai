// Recalcul indépendant de la feuille « Les fractions » de CM2 (25/10/2026) :
// lib/fiches-exercices/maths-cm2-fraction.tsx.
//
// ⭐ Les fractions sont EXACTES (BigInt, module commun). Le script relit les
// nombres dans le DESSIN (barres, disque, rectangle, grille de 100, droite,
// carreaux, billes) ou dans l'énoncé, refait le geste (compter les parts,
// redécouper, simplifier, passer en centièmes, prendre une fraction d'un
// nombre) et cherche la réponse écrite dans le corrigé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs (classe cm2).
// Usage : node scripts/verifier-exercices-cm2-fraction.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf, tex, D } from "./verifier-exercices-commun.mjs";

const DESSINS = ["barres", "carreaux", "cent", "comparer", "deuxDisques", "disque", "droiteRel", "jetons", "rect"];
const f = ouvrir("lib/fiches-exercices/maths-cm2-fraction.tsx", "fraction", DESSINS, "cm2");
const { c, e, vrai, verif, dit, enonceDit, dessin, appels, essai } = f;

const F = (a, b = 1) => Q(a, b);
/** « \dfrac{3}{4} » tel quel, SANS simplifier. */
const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
/** 0,25 en texte simple ; 0{,}25 dans une formule. */
const txt = (q) => tex(q).replace("{,}", ",");
const couples = (t) => [...t.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
const lignes = (k) => e(k).split("\\n");
const pres = (x, q) => Math.abs(x - Number(q.n) / Number(q.d)) < 1e-9;
const signe = (a, b) => (inf(a, b) ? "<" : inf(b, a) ? ">" : "=");
/** La fraction simplifiée au maximum, en couple. */
const simple = (a, b) => {
  const q = F(a, b);
  return [Number(q.n), Number(q.d)];
};
/** En centièmes : [numérateur sur 100, multiplicateur]. */
const centiemes = (a, b) => [(a * 100) / b, 100 / b];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [liste] = dessin("barres", 1, "figure");
  const rep = liste.map((b) => `${b.label} : $${fr(b.parts[0], b.d)}$`);
  liste.forEach((b) => dit(1, `Barre ${b.label} : ${b.d} parts, ${b.parts[0]} bleue${b.parts[0] > 1 ? "s" : ""}. $${fr(b.parts[0], b.d)}$`));
  dit(1, `Réponse : ${rep.join(" ; ")}.`);
  const B = liste[1];
  dit(1, `Pour B, on écrirait $${fr(B.parts[0], B.d - B.parts[0])}$`);
});
essai("2", () => {
  const [n, d] = dessin("disque", 2, "figure");
  enonceDit(2, `en ${d} parts égales`);
  dit(2, `Je compte ${n} parts bleues : $${fr(n, d)}$`);
  dit(2, `${d} − ${n} = ${d - n} parts restent : $${fr(d - n, d)}$`);
  dit(2, `$${fr(n, d - n)}$`);
  dit(2, `Réponse : a) $${fr(n, d)}$ ; b) $${fr(d - n, d)}$ ; c) numérateur ${n}, dénominateur ${d}.`);
});
essai("3", () => {
  const [li, co, n] = dessin("rect", 3, "figure");
  const tot = li * co;
  const [sal] = couples(e(3));
  vrai("3. la fraction des salades est en vingtièmes", sal[1] === tot);
  dit(3, `${li} lignes de ${co} carrés : ${li} × ${co} = ${tot} carrés`);
  dit(3, `Je compte ${n} carrés bleus sur ${tot} : $${fr(n, tot)}$`);
  const vide = tot - n - sal[0];
  dit(3, `${tot} − ${n} − ${sal[0]} = ${vide} carrés vides : $${fr(vide, tot)}$`);
  vrai("3. la moitié", egal(F(vide, tot), F(1, 2)));
  dit(3, `Réponse : a) ${tot} ; b) $${fr(n, tot)}$ ; c) ${sal[0]} carrés ; d) $${fr(vide, tot)}$, la moitié.`);
});
essai("4", () => {
  const [min, max, pas, points] = dessin("droiteRel", 4, "figure");
  const d = Math.round((max - min) / pas);
  dit(4, `${d} sauts. Chaque saut vaut $${fr(1, d)}$`);
  const s = points.map((p) => [p.label, Math.round(p.value / pas)]);
  s.forEach(([l, k]) => dit(4, `${l} est à ${k} sauts de 0 : $${fr(k, d)}$`));
  dit(4, `on trouverait ${s[0][1] + 1}`);
  dit(4, `Réponse : a) ${d} parts ; b) ${s.map(([l, k]) => `${l} : $${fr(k, d)}$`).join(" ; ")}.`);
});
essai("5", () => {
  const vals = couples(lignes(5)[1]);
  const [, , pas, pts] = dessin("droiteRel", 5, "schema");
  vrai("5. graduée en tiers", Math.abs(pas - 1 / 3) < 1e-12);
  vrai("5. la droite du corrigé place chaque balise", vals.every(([a, b]) => pts.some((p) => p.label === `${a}/${b}` && pres(p.value, F(a, b)))));
  const apres = vals.filter(([a, b]) => inf(F(1), F(a, b)));
  dit(5, `Réponse : b) les balises à ${apres.map((x) => `$${fr(...x)}$`).join(" et ")} km.`);
  const [vide] = [dessin("droiteRel", 5, "figure")];
  vrai("5. la droite de l'énoncé est vide", vide[3].length === 0);
});
essai("6", () => {
  const paires = lignes(6).slice(1).map((l) => {
    const cs = couples(l);
    return cs.length === 2 ? cs.map((x) => F(...x)) : [F(...cs[0]), F(1)];
  });
  const s = paires.map(([a, b]) => signe(a, b));
  dit(6, `Réponse : ${s.map((x, i) => `${"abcd"[i]}) ${x}`).join(" ; ")}.`);
  dit(6, `$${fr(3, 7)} ${s[0]} ${fr(5, 7)}$`);
  dit(6, `$${fr(2, 3)} ${s[1]} ${fr(2, 5)}$`);
  dit(6, `$${fr(9, 8)} ${s[2]} 1$`);
  dit(6, `$${fr(6, 6)} ${s[3]} 1$`);
  const [a, b] = dessin("comparer", 6);
  vrai("6. les barres : le b)", a.join() === "2,3" && b.join() === "2,5");
});
essai("7", () => {
  const chA = [[1, 2], [2, 4], [4, 8], [5, 10]];
  const chB = [[1, 3], [2, 6], [3, 9]];
  vrai("7. chaînes égales", chA.every((x) => egal(F(...x), F(1, 2))) && chB.every((x) => egal(F(...x), F(1, 3))));
  vrai("7. 1/2 et 2/3 ne sont pas égales (le piège)", !egal(F(1, 2), F(2, 3)));
  dit(7, `Réponse : a) $${chA.map((x) => fr(...x)).join(" = ")}$ ; b) $${chB.map((x) => fr(...x)).join(" = ")}$.`);
  const [liste] = dessin("barres", 7);
  vrai("7. les barres : trois écritures de 1/2", liste.every((b) => egal(F(b.parts[0], b.d), F(1, 2)) && b.label === `${b.parts[0]}/${b.d}`));
});
essai("8", () => {
  const fs = couples(e(8));
  const rep = fs.map(([a, b]) => {
    const q = F(a, b);
    dit(8, `$${fr(a, b)} = ${tex(q)}$`);
    return txt(q);
  });
  dit(8, `Réponse : a) ${rep[0]} ; b) ${rep[1]} ; c) ${rep[2]} ; d) ${rep[3]}.`);
  dit(8, `écrire ${txt(F(fs[3][0], 10))}`);
  const [n] = dessin("cent", 8);
  vrai("8. la grille : 45 cases", n === fs[2][0] && fs[2][1] === 100);
});
/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [a, b, cc] = couples(e(9));
  [a, b, cc].forEach((x) => dit(9, `$${fr(...x)} = ${fr(...simple(...x))}$`));
  dit(9, `${a[0]} ÷ 2 = ${a[0] / 2} et ${a[1]} ÷ 2 = ${a[1] / 2}`);
  dit(9, `${b[0]} ÷ 5 = ${b[0] / 5} et ${b[1]} ÷ 5 = ${b[1] / 5}`);
  dit(9, `${cc[0]} ÷ 4 = ${cc[0] / 4} et ${cc[1]} ÷ 4 = ${cc[1] / 4}`);
  const [, malik] = couples(lignes(9)[3]);
  vrai("9c. Malik divise seulement le haut, et ce n'est pas égal", malik[0] === a[0] / 2 && malik[1] === a[1] && !egal(F(...malik), F(...a)));
  vrai("9c. 3/8 est la moitié de 6/8", egal(F(malik[0] * 2, malik[1]), F(...a)));
  dit(9, `Réponse : a) $${fr(...simple(...a))}$ ; b) $${fr(...simple(...b))}$ et $${fr(...simple(...cc))}$ ; c) non, $${fr(...a)} = ${fr(...simple(...a))}$.`);
  const [liste] = dessin("barres", 9);
  vrai("9. les barres : 6/8, 3/4 (même longueur), 3/8", liste.every((x) => x.label === `${x.parts[0]}/${x.d}`) && egal(F(liste[0].parts[0], liste[0].d), F(liste[1].parts[0], liste[1].d)));
});
essai("10", () => {
  const fs = couples(e(10));
  const rep = fs.map(([a, b]) => {
    const [n, k] = centiemes(a, b);
    vrai(`10. ${a}/${b} tombe en centièmes`, Number.isInteger(n));
    dit(10, `${b} × ${k} = 100. $${fr(a, b)} = ${fr(n, 100)} = ${tex(F(a, b))}$, soit ${n} %`);
    return `${txt(F(a, b))} et ${n} %`;
  });
  dit(10, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) ${r}`).join(" ; ")}.`);
  dit(10, `3 ÷ 4 = ${txt(F(3, 4))}`);
  const [n] = dessin("cent", 10);
  vrai("10. la grille : un quart = 25 cases", n === 25 && n === centiemes(1, 4)[0]);
});
essai("11", () => {
  const paires = lignes(11).slice(1).map((l) => couples(l));
  paires.forEach(([a, b]) => {
    const [p, g] = a[1] < b[1] ? [a, b] : [b, a];
    const k = g[1] / p[1];
    vrai(`11. ${g[1]} multiple de ${p[1]}`, Number.isInteger(k));
    dit(11, `${p[1]} × ${k} = ${g[1]} : $${fr(...p)} = ${fr(p[0] * k, g[1])}$`);
    dit(11, `donc $${fr(...a)} ${signe(F(...a), F(...b))} ${fr(...b)}$`);
  });
  dit(11, `Réponse : ${paires.map(([a, b], i) => `${"abc"[i]}) $${fr(...a)} ${signe(F(...a), F(...b))} ${fr(...b)}$`).join(" ; ")}.`);
  const [x, y] = dessin("comparer", 11);
  vrai("11. les barres : le a)", x.join() === paires[0][0].join() && y.join() === paires[0][1].join());
});
essai("12", () => {
  const vals = [...couples(lignes(12)[1]).map((x) => [fr(...x), F(...x)]), ["1", F(1)]];
  const tri = [...vals].sort((x, y) => (inf(x[1], y[1]) ? -1 : 1));
  dit(12, `Réponse : $${tri.map((x) => x[0]).join(" < ")}$.`);
  const quarts = tri.map((x) => Number((x[1].n * 4n) / x[1].d));
  dit(12, `Je range les numérateurs : ${quarts.join(" < ")}.`);
  const [, , , pts] = dessin("droiteRel", 12);
  vrai("12. la droite : chaque fraction à sa place", pts.every((p) => pres(p.value, F(...p.label.split("/").map(Number)))));
});
essai("13", () => {
  const [h, j] = couples(lignes(13)[0]);
  vrai("13a. 3/9 = 1/3", egal(F(...h), F(...j)));
  dit(13, `$${fr(...h)} = ${fr(...simple(...h))}$`);
  dit(13, `$${fr(1, 3)} = ${fr(4, 12)}$`);
  const [il] = couples(lignes(13)[3]);
  dit(13, `$${fr(...il)} = ${fr(...simple(...il))}$`);
  dit(13, `Réponse : a) autant tous les deux ; b) $${fr(4, 12)}$ ; c) $${fr(...simple(...il))}$.`);
  const [a, b] = dessin("deuxDisques", 13, "figure");
  vrai("13. les disques : 3/9 et 1/3", a.join() === h.join() && b.join() === j.join());
});
essai("14", () => {
  const p = Number(/environ (\d+) %/.exec(e(14))[1]);
  dit(14, `$${fr(p, 100)} = ${tex(F(p, 100))}$`);
  vrai("14b. 71 % < 3/4", inf(F(p, 100), F(3, 4)));
  dit(14, `$${fr(3, 4)} = ${fr(75, 100)}$, soit 75 %. Et ${p} < 75`);
  vrai("14c. 71 % > 7/10", inf(F(7, 10), F(p, 100)));
  dit(14, `$${fr(7, 10)} = ${fr(70, 100)}$, soit 70 %. Et ${p} > 70`);
  dit(14, `100 − ${p} = ${100 - p}`);
  dit(14, `Réponse : a) $${fr(p, 100)}$ et ${txt(F(p, 100))} ; b) moins ; c) plus ; d) ${100 - p} %.`);
  const [n] = dessin("cent", 14);
  vrai("14. la grille : 71 cases", n === p);
});
essai("15", () => {
  vrai("15a. 3/4 = 0,75, pas 3,4", egal(F(3, 4), D("0.75")) && !egal(F(3, 4), D("3.4")));
  dit(15, `$${fr(3, 4)} = ${fr(75, 100)} = ${tex(F(3, 4))}$`);
  vrai("15b. 2/3 ≠ 3/4 ; 2/3 = 8/12 ; 3/4 = 9/12 ; 2/3 = 4/6", !egal(F(2, 3), F(3, 4)) && egal(F(2, 3), F(8, 12)) && egal(F(3, 4), F(9, 12)) && egal(F(2, 3), F(4, 6)));
  dit(15, `$${fr(2, 3)} = ${fr(8, 12)}$ et $${fr(3, 4)} = ${fr(9, 12)}$`);
  vrai("15c. 1/4 = 25 %", centiemes(1, 4)[0] === 25);
  dit(15, `100 ÷ 4 = 25 cases : 25 %`);
  dit(15, `Réponse : a) ${txt(F(3, 4))} ; b) $${fr(2, 3)} = ${fr(4, 6)}$ ; c) 25 %.`);
});
essai("16", () => {
  const [, , pas, pts] = dessin("droiteRel", 16, "figure");
  const d = Math.round(1 / pas);
  const s = pts.map((p) => [p.label, Math.round(p.value / pas)]);
  s.forEach(([l, k], i) => dit(16, `${l} est à ${k} saut${k > 1 ? "s" : ""}${i === 0 ? " de 0" : ""} : $${fr(k, d)}$`));
  const grands = s.filter(([, k]) => k > d).map(([l]) => l);
  dit(16, `b) ${grands.join(" et ")} : leur numérateur dépasse ${d}`);
  dit(16, `$${fr(3, 2)} = ${tex(F(3, 2))}$`);
  dit(16, `Réponse : a) ${s.map(([l, k]) => `${l} : $${fr(k, d)}$`).join(" ; ")} ; b) ${grands.join(" et ")} ; c) ${txt(F(3, 2))}.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [duree, nb, qt] = [...lignes(17)[0].matchAll(/(\d+) (?:minutes|quarts-temps)/g)].map((m) => Number(m[1]));
  vrai("17. 4 × 10 = 40 (FIBA)", nb * qt === duree && duree === 40);
  dit(17, `$${fr(1, nb)} = ${fr(centiemes(1, nb)[0], 100)}$ : ${centiemes(1, nb)[0]} % du match`);
  dit(17, `3 × ${qt} = ${3 * qt} minutes`);
  dit(17, `$${fr(3, nb)} = ${fr(centiemes(3, nb)[0], 100)}$ : ${centiemes(3, nb)[0]} % du match`);
  dit(17, `$${fr(2, 4)} = ${fr(...simple(2, 4))}$. C'est la moitié du match : ${duree / 2} minutes`);
  const [n, d] = dessin("disque", 17);
  vrai("17. le disque : 3 quarts-temps sur 4", n === 3 && d === nb);
});
essai("18", () => {
  const [li, co, groupes, reste] = dessin("carreaux", 18, "figure");
  const tot = li * co;
  enonceDit(18, `une fresque de ${tot} carreaux égaux`);
  const vide = tot - groupes.reduce((s, g) => s + g.n, 0);
  vrai("18. un carreau vide", vide === 1 && reste === "vide");
  dit(18, `Mer : $${fr(groupes[0].n, tot)}$ ; sable : $${fr(groupes[1].n, tot)}$ ; forêt : $${fr(groupes[2].n, tot)}$ ; vide : $${fr(vide, tot)}$`);
  dit(18, `$${fr(groupes[0].n, tot)} = ${fr(...simple(groupes[0].n, tot))}$`);
  dit(18, `$${fr(groupes[1].n, tot)} = ${fr(...simple(groupes[1].n, tot))}$`);
  dit(18, `$${fr(1, 2)} = ${fr(50, 100)}$ : 50 %`);
  const ens = groupes[0].n + groupes[1].n;
  vrai("18d. mer + sable = exactement 3/4", egal(F(ens, tot), F(3, 4)));
  dit(18, `${groupes[0].n} + ${groupes[1].n} = ${ens} carreaux, soit $${fr(ens, tot)}$`);
});
essai("19", () => {
  const [liste] = dessin("barres", 19, "figure");
  vrai("19. ronde, blanche, noire, croche : 1, 2, 4, 8", liste.map((b) => b.d).join() === "1,2,4,8");
  vrai("19. une croche = 1/8 ; 3 croches > 1 noire", egal(F(1, 2 * 4), F(1, 8)) && inf(F(2, 8), F(3, 8)) && egal(F(2, 8), F(1, 4)));
  dit(19, `Une croche dure $${fr(1, 8)}$ de ronde`);
  dit(19, `Et $${fr(2, 4)} = ${fr(...simple(2, 4))}$`);
  dit(19, `Et $${fr(3, 8)} > ${fr(2, 8)}$`);
  dit(19, `Réponse : a) $${fr(1, 8)}$ ; b) 2 noires, $${fr(1, 2)}$ ; c) plus long ; d) 8 croches.`);
});
essai("20", () => {
  const [ra, pr, groupes] = dessin("jetons", 20, "figure");
  const tot = ra * pr;
  enonceDit(20, `Lina a ${tot} billes, rangées par ${pr}`);
  const bleues = (tot / 4) * 1, orange = (tot / 5) * 2, vertes = tot - bleues - orange;
  verif("20. le dessin : bleues", groupes[0].n, bleues);
  verif("20. le dessin : orange", groupes[1].n, orange);
  verif("20. le dessin : vertes", groupes[2].n, vertes);
  dit(20, `${tot} ÷ 4 = ${bleues} billes bleues`);
  dit(20, `${tot} ÷ 5 = ${tot / 5}. J'en prends 2 : 2 × ${tot / 5} = ${orange} billes orange`);
  dit(20, `${tot} − ${bleues} − ${orange} = ${vertes} billes vertes : $${fr(vertes, tot)}$`);
  const [n, k] = centiemes(vertes, tot);
  dit(20, `${tot} × ${k} = 100 : $${fr(vertes, tot)} = ${fr(n, 100)}$, soit ${n} %`);
  dit(20, `Réponse : a) ${bleues} ; b) ${orange} ; c) ${vertes}, soit $${fr(vertes, tot)}$ ; d) ${n} %.`);
});

/* ═══ Les légendes (un nom tous les 72) ne se touchent pas ; les noms des barres tiennent ═══ */
for (const nom of ["carreaux", "jetons"])
  for (const { args } of appels(nom).filter((a) => a.args)) {
    const [, , groupes, reste = ""] = args;
    const noms = [...groupes.map((g) => g.nom), reste].filter(Boolean);
    vrai(`${nom} : légende « ${noms.join(", ")} » (7 signes, 4 noms au plus)`, noms.every((n) => n.length <= 7) && noms.length <= 4);
  }
for (const { args } of appels("barres").filter((a) => a.args)) for (const b of args[0]) vrai(`barres : « ${b.label} » ≤ 10 signes`, b.label.length <= 10);
for (const { args } of appels("jetons").filter((a) => a.args)) vrai("jetons : 10 billes par rangée au plus", args[1] <= 10);
for (const { args } of appels("disque").filter((a) => a.args)) vrai("disque : n ≤ d ≤ 12", args[0] <= args[1] && args[1] <= 12);

f.fin();
