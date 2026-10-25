// Recalcul indépendant de la feuille « Les fractions » de CM1 (25/10/2026) :
// lib/fiches-exercices/maths-cm1-fraction.tsx.
//
// ⭐ Les fractions sont EXACTES (BigInt, module commun). Le script relit les
// nombres dans l'énoncé ou dans le dessin (barres, rectangle, découpes, grille
// de 100, billes, carreaux, droite graduée), refait le geste (compter les
// parts, regrouper en paquets, comparer, ranger, passer en dixièmes) et
// cherche la réponse écrite dans le corrigé. Les points d'une droite sont
// comparés à leur étiquette, les légendes des dessins à l'énoncé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs
// (classe cm1 : les 9 micros de la notion `fraction` toutes servies).
// Usage : node scripts/verifier-exercices-cm1-fraction.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf } from "./verifier-exercices-commun.mjs";

const DESSINS = ["barres", "rect", "decoupes", "droiteRel", "cent", "comparer", "jetons", "carreaux"];
const f = ouvrir("lib/fiches-exercices/maths-cm1-fraction.tsx", "fraction", DESSINS, "cm1");
const { c, e, vrai, verif, dit, enonceDit, dessin, essai, appels } = f;

const F = (a, b = 1) => Q(a, b);
/** « \dfrac{3}{4} » tel quel, SANS simplifier. */
const brut = (a, b) => `\\dfrac{${a}}{${b}}`;
/** Les fractions \dfrac{a}{b} d'un texte, en couples d'entiers. */
const couples = (texte) => [...texte.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
/** Une étiquette de dessin « 3/4 » → fraction exacte. */
const deLabel = (s) => {
  const m = /(\d+)\/(\d+)/.exec(s);
  return F(Number(m[1]), Number(m[2]));
};
const pres = (x, q) => Math.abs(x - Number(q.n) / Number(q.d)) < 1e-9;
const lignes = (k) => e(k).split("\\n");
const signe = (a, b) => (inf(a, b) ? "<" : inf(b, a) ? ">" : "=");
/** 0,4 : un décimal écrit comme dans le texte simple de la feuille. */
const virgule = (x) => String(Math.round(x * 1000) / 1000).replace(".", ",");
const virguleTex = (x) => virgule(x).replace(",", "{,}");
const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const LETTRES = { 2: "demi", 3: "tiers", 4: "quart", 5: "cinquièmes", 6: "sixièmes", 8: "huitièmes" };
const NOMBRES = { 1: "un", 2: "deux", 3: "trois", 5: "cinq" };

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [liste] = dessin("barres", 1, "figure");
  for (const b of liste) {
    const n = b.parts[0];
    dit(1, `Barre ${b.label} : ${b.d} parts, ${n} ${n > 1 ? "bleues" : "bleue"}. $${brut(n, b.d)}$`);
    vrai(`1. ${b.label} en lettres`, c(1).includes(`$${brut(n, b.d)}$ : ${NOMBRES[n]} ${n === 1 ? LETTRES[b.d] : LETTRES[b.d]}`));
  }
  dit(1, `Réponse : ${liste.map((b) => `${b.label} : $${brut(b.parts[0], b.d)}$`).join(" ; ")}.`);
  const A = liste[0];
  dit(1, `Pour A, on écrirait $${brut(A.parts[0], A.d - A.parts[0])}$`);
});
essai("2", () => {
  const attendu = [[1, 2], [3, 4], [2, 3]];
  const mots = ["un demi", "trois quarts", "deux tiers"];
  mots.forEach((m, i) => vrai(`2. l'énoncé dit « ${m} »`, e(2).includes(m)));
  dit(2, `Réponse : a) $${brut(1, 2)}$ ; b) $${brut(3, 4)}$ ; c) $${brut(2, 3)}$ ; d) cinq sixièmes.`);
  enonceDit(2, `$${brut(5, 6)}$`);
  const [liste] = dessin("barres", 2);
  liste.forEach((b, i) => vrai(`2. schéma ${b.label}`, egal(deLabel(b.label), F(...attendu[i])) && egal(F(b.parts[0], b.d), F(...attendu[i]))));
});
essai("3", () => {
  const [li, co, n] = dessin("rect", 3, "figure");
  const tot = li * co;
  const [cible] = couples(e(3));
  dit(3, `${li} lignes de ${co} cases : ${li} × ${co} = ${tot} cases`);
  vrai("3. le dénominateur visé = toutes les cases", cible[1] === tot);
  dit(3, `${cible[0]} − ${n} = ${cible[0] - n} cases`);
  dit(3, `${tot} − ${n} = ${tot - n} cases blanches : $${brut(tot - n, tot)}$`);
  dit(3, `Réponse : a) ${tot} cases ; b) $${brut(n, tot)}$ ; c) ${cible[0] - n} cases ; d) $${brut(tot - n, tot)}$.`);
  dit(3, `écrire $${brut(n, tot - n)}$`);
});
essai("4", () => {
  const [cible] = couples(e(4)).map((x) => F(...x));
  const [liste] = dessin("decoupes", 4, "figure");
  const oui = liste.filter((b) => {
    const egales = b.largeurs.every((w) => w === b.largeurs[0]);
    const bleu = somme(b.largeurs.slice(0, b.colorie));
    return egales && egal(F(bleu, somme(b.largeurs)), cible);
  });
  dit(4, `Réponse : les barres ${oui.map((b) => b.label).join(" et ")}.`);
  const B = liste.find((b) => b.label === "B");
  vrai("4. B : 3 parts inégales, part bleue plus petite qu'un tiers", B.largeurs.length === 3 && inf(F(B.largeurs[0], somme(B.largeurs)), cible));
  const D = liste.find((b) => b.label === "D");
  vrai("4. D : 2/6 regroupé deux par deux = 1/3", egal(F(D.colorie, D.largeurs.length), cible) && D.largeurs.length / 2 === 3);
  dit(4, `$${brut(D.colorie, D.largeurs.length)} = ${brut(1, 3)}$`);
});
essai("5", () => {
  const [d, n] = [5, 2];
  enonceDit(5, `coupée en ${d} parts égales. Il en mange ${n}`);
  dit(5, `$${brut(n, d)}$`);
  dit(5, `${d} − ${n} = ${d - n} parts restent : $${brut(d - n, d)}$`);
  dit(5, `$${brut(d, d)} = 1$`);
  const [b] = dessin("barres", 5);
  vrai("5. schéma : 2 mangées + 3 restantes = la barre", b[0].d === d && b[0].parts[0] === n && somme(b[0].parts) === d);
});
essai("6", () => {
  const fr = lignes(6).slice(2).map((l) => couples(l)[0]);
  const mot = ([n, d]) => (n < d ? "plus petite" : n === d ? "égale à 1" : "plus grande");
  dit(6, `Réponse : ${fr.map((x, i) => `${"abcde"[i]}) ${mot(x)}`).join(" ; ")}.`);
  const [liste] = dessin("barres", 6, "figure");
  for (const b of liste) vrai(`6. barre ${b.label} : ${b.parts[0]} parts sur ${b.d} par unité, deux unités`, egal(deLabel(b.label), F(b.parts[0], b.d)) && b.fois === 2 && b.parts[0] <= 2 * b.d);
});
essai("7", () => {
  const [min, max, pas, points] = dessin("droiteRel", 7, "figure");
  const sauts = Math.round((max - min) / pas);
  dit(7, `${sauts} sauts. Chaque saut vaut $${brut(1, sauts)}$`);
  for (const p of points) {
    const k = Math.round(p.value / pas);
    dit(7, `${p.label} est à ${k} saut${k > 1 ? "s" : ""} de 0 : $${brut(k, sauts)}$`);
  }
  const milieu = points.find((p) => pres(p.value, F(1, 2)));
  dit(7, `c) le point ${milieu.label}.`);
  dit(7, `on trouverait ${Math.round(milieu.value / pas) + 1}`);
});
essai("8", () => {
  const fr = couples(lignes(8)[0]);
  const dec = fr.filter(([, d]) => [10, 100, 1000].includes(d));
  dit(8, `Réponse : a) ${dec.map((x) => `$${brut(...x)}$`).join(" et ")}`);
  const [n] = dessin("cent", 8, "figure");
  vrai("8. des lignes pleines", n % 10 === 0);
  dit(8, `$${brut(n, 100)}$`);
  dit(8, `$${brut(n / 10, 10)}$`);
  dit(8, `s'écrit ${virgule(n / 100)}`);
  dit(8, `${n} %`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [[L, M]] = dessin("barres", 9, "figure");
  const qL = F(L.parts[0], L.d), qM = F(M.parts[0], M.d);
  vrai("9. 6/8 = 3/4", egal(qL, qM));
  vrai("9. énoncé et dessin d'accord", e(9).includes(`a ${L.d} barres : il en mange ${L.parts[0]}`) && e(9).includes(`a ${M.d} barres : elle en mange ${M.parts[0]}`));
  dit(9, `${M.d} ÷ 2 = ${M.d / 2} paquets`);
  dit(9, `${M.parts[0]} ÷ 2 = ${M.parts[0] / 2} paquets mangés`);
  dit(9, `$${brut(M.parts[0], M.d)} = ${brut(L.parts[0], L.d)}$`);
  vrai("9. les paquets redonnent la tablette de Lucas", M.d / 2 === L.d && M.parts[0] / 2 === L.parts[0]);
});
essai("10", () => {
  const chaine = [[2, 4], [5, 10], [50, 100]];
  chaine.forEach((x) => vrai(`10. ${x} = 1/2`, egal(F(...x), F(1, 2))));
  chaine.forEach((x) => dit(10, `$${brut(1, 2)} = ${brut(...x)}$`));
  dit(10, `$${brut(5, 10)} = ${virguleTex(0.5)}$`);
  dit(10, "Réponse : a) 2 ; b) 5 ; c) 0,5 ; d) 50, c'est-à-dire 50 %.");
  const [liste] = dessin("barres", 10);
  liste.forEach((b) => vrai(`10. schéma ${b.label} = 1/2`, egal(deLabel(b.label), F(1, 2)) && egal(F(b.parts[0], b.d), F(1, 2))));
});
essai("11", () => {
  const paires = lignes(11).slice(1).map((l) => couples(l));
  const s = paires.map(([a, b]) => signe(F(...a), F(...b)));
  paires.forEach(([a, b], i) => dit(11, `$${brut(...a)} ${s[i]} ${brut(...b)}$`));
  dit(11, `Réponse : ${s.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  const [a, b] = dessin("comparer", 11);
  vrai("11. les barres : le b)", a.join() === paires[1][0].join() && b.join() === paires[1][1].join());
});
essai("12", () => {
  const fr = couples(lignes(12)[0]);
  const ranges = [...fr].sort((x, y) => (inf(F(...x), F(...y)) ? -1 : 1));
  const chaine = ranges.map((x) => brut(...x)).join(" < ");
  dit(12, `a) $${chaine}$`);
  dit(12, `Réponse : a) $${chaine}$`);
  const plus = fr.filter(([n, d]) => n > d);
  vrai("12b. une seule fraction plus grande que 1", plus.length === 1);
  dit(12, `b) $${brut(...plus[0])}$ seulement`);
  const moitie = fr.filter((x) => egal(F(...x), F(1, 2)));
  dit(12, `c) $${brut(...moitie[0])}$.`);
  const [, , , points] = dessin("droiteRel", 12);
  vrai("12. la droite : chaque étiquette à sa place", points.length === fr.length && points.every((p) => pres(p.value, deLabel(p.label))));
});
essai("13", () => {
  const fr = couples(lignes(13)[1]);
  const [, , , points] = dessin("droiteRel", 13, "schema");
  fr.forEach((x, i) => vrai(`13. point ${points[i].label} à $${x}$`, pres(points[i].value, F(...x))));
  const entier = fr.findIndex(([n, d]) => n % d === 0);
  dit(13, `b) le point ${points[entier].label}, sur ${fr[entier][0] / fr[entier][1]}`);
  dit(13, `$${brut(5, 4)} = 1 + ${brut(1, 4)}$`);
  const [min, max, pas] = dessin("droiteRel", 13, "figure");
  vrai("13. la figure : des quarts de 0 à 2", min === 0 && max === 2 && pas === 0.25);
});
essai("14", () => {
  const [r, p] = dessin("jetons", 14, "figure");
  const tot = r * p;
  enonceDit(14, `a ${tot} billes`);
  enonceDit(14, `en ${r} rangées égales`);
  dit(14, `${tot} ÷ ${r} = ${tot / r} billes par rangée`);
  dit(14, `3 × ${tot / r} = ${3 * (tot / r)} billes`);
  dit(14, `${tot / r} + ${3 * (tot / r)} = ${tot}`);
  dit(14, `Réponse : a) ${tot / r} ; b) ${tot / r} billes ; c) ${3 * (tot / r)} billes ; d) non.`);
});
essai("15", () => {
  vrai("15a. 3/4 < 1 < 3,4", inf(F(3, 4), F(1)) && 3.4 > 1);
  vrai("15a. 3/4 = 75/100", egal(F(3, 4), F(75, 100)));
  dit(15, `$${brut(3, 4)} = ${brut(75, 100)} = ${virguleTex(0.75)}$`);
  vrai("15b. 1/8 < 1/4", inf(F(1, 8), F(1, 4)));
  dit(15, `$${brut(1, 8)} < ${brut(1, 4)}$`);
  dit(15, `$${brut(4, 100)} = ${virguleTex(0.04)}$`);
  dit(15, `0,4, ce sont 4 dixièmes : $${brut(4, 10)}$`);
  const [a, b] = dessin("comparer", 15);
  vrai("15. les barres de Sam", a.join() === "1,8" && b.join() === "1,4");
});
essai("16", () => {
  const [[n, d]] = couples(e(16));
  const anais = n / d;
  const bilal = 1.6;
  dit(16, `$${brut(n, d)} = ${virguleTex(anais)}$`);
  dit(16, `$${virguleTex(bilal)} = ${brut(16, 10)}$`);
  vrai("16. 16/10 = 1,6", egal(F(16, 10), F(8, 5)));
  vrai("16c. Bilal plus loin", bilal > anais);
  dit(16, `A est ${Math.round((anais - 1) * 10)} graduations après 1. B est ${Math.round((bilal - 1) * 10)} graduations après 1.`);
  const [, , , points] = dessin("droiteRel", 16, "schema");
  vrai("16. la droite : A à 1,3, B à 1,6", pres(points[0].value, F(13, 10)) && pres(points[1].value, F(16, 10)));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [li, co, groupes, reste] = dessin("carreaux", 17, "figure");
  const tot = li * co;
  const [m30, m31] = groupes.map((g) => g.n);
  const fev = tot - m30 - m31;
  vrai("17. 12 mois sur le dessin, 1 février", tot === 12 && fev === 1 && reste === "fév.");
  vrai("17. le calendrier réel : 4 mois de 30 j, 7 de 31 j", m30 === 4 && m31 === 7);
  enonceDit(17, `${m30} mois ont 30 jours, ${m31} mois ont 31 jours`);
  vrai("17b. des paquets de 4 = une rangée", co === m30);
  dit(17, `${tot} ÷ ${co} = ${tot / co} paquets`);
  vrai("17b. 4/12 = 1/3", egal(F(m30, tot), F(1, 3)));
  dit(17, `$${brut(m30, tot)} = ${brut(1, 3)}$`);
  dit(17, `La moitié de ${tot}, c'est ${tot / 2}. Or ${m31} > ${tot / 2}`);
  dit(17, `$${brut(fev, tot)}$`);
  dit(17, `${m30} + ${m31} + ${fev} = ${tot} mois`);
  vrai("17. le piège : enlever 3 donne 1/9", m30 - 3 === 1 && tot - 3 === 9);
});
essai("18", () => {
  const match = 90, mi = 45;
  enonceDit(18, `dure ${match} minutes : deux mi-temps de ${mi} minutes`);
  vrai("18a. une mi-temps = 1/2", egal(F(mi, match), F(1, 2)));
  dit(18, `${match} ÷ 30 = ${match / 30} paquets`);
  vrai("18b. 30/90 = 1/3, 60/90 = 2/3", egal(F(30, match), F(1, 3)) && egal(F(60, match), F(2, 3)));
  dit(18, `$${brut(30, match)} = ${brut(1, 3)}$`);
  dit(18, `Or 60 > ${mi}`);
  const [min, max, pas, points, opts] = dessin("droiteRel", 18);
  vrai("18. la droite : 0 à 90 de 15 en 15", min === 0 && max === match && pas === 15 && opts.nombres === 15);
  for (const p of points) vrai(`18. ${p.value} min = ${p.label} du match`, egal(F(p.value, match), deLabel(p.label)));
});
essai("19", () => {
  const tot = 8, roches = 4;
  enonceDit(19, `${tot} planètes tournent autour du Soleil. Les ${roches} plus proches`);
  vrai("19. quatre planètes rocheuses nommées", ["Mercure", "Vénus", "la Terre", "Mars"].every((p) => e(19).includes(p)));
  dit(19, `$${brut(roches, tot)} = ${brut(1, 2)}$`);
  vrai("19c. 2 avant la Terre : 2/8 = 1/4", egal(F(2, tot), F(1, 4)));
  dit(19, `$${brut(2, tot)} = ${brut(1, 4)}$`);
  dit(19, `$${brut(1, 2)} = ${brut(50, 100)}$, soit 50 %`);
  const [li, co, groupes] = dessin("carreaux", 19);
  vrai("19. le dessin : 8 cases, 4 rocheuses", li * co === tot && groupes[0].n === roches);
});
essai("20", () => {
  const [li, co, groupes] = dessin("carreaux", 20, "figure");
  const tot = li * co;
  vrai("20. 100 carreaux en tout, toutes couleurs", tot === 100 && somme(groupes.map((g) => g.n)) === tot);
  enonceDit(20, `${groupes[0].n} bleus, ${groupes[1].n} orange et ${groupes[2].n} verts`);
  dit(20, `Bleu : $${brut(groupes[0].n, 100)}$ ; orange : $${brut(groupes[1].n, 100)}$ ; vert : $${brut(groupes[2].n, 100)}$`);
  const lignesBleues = groupes[0].n / co;
  enonceDit(20, `remplissent ${lignesBleues} lignes de ${co}`);
  dit(20, `$${brut(groupes[0].n, 100)} = ${brut(lignesBleues, 10)}$`);
  dit(20, `$${brut(lignesBleues, 10)} = ${virguleTex(lignesBleues / 10)}$`);
  dit(20, `Bleu : ${groupes[0].n} % ; orange : ${groupes[1].n} % ; vert : ${groupes[2].n} %`);
  dit(20, `${groupes.map((g) => g.n).join(" + ")} = 100`);
});

verif("contrôle de l'outil : 1/3 + 1/6 vaut 1/2 en flottant", 1 / 3 + 1 / 6, 0.5);

/* ═══ Les légendes des carreaux (un nom tous les 72) ne se touchent pas ═══ */
for (const { args } of appels("carreaux").filter((a) => a.args)) {
  const [, , groupes, reste = ""] = args;
  const noms = [...groupes.map((g) => g.nom), reste].filter(Boolean);
  vrai(`légende « ${noms.join(", ")} » : 6 signes au plus, 4 noms au plus`, noms.every((n) => n.length * 8.5 < 56) && noms.length <= 4);
}
/* ═══ Les noms des barres tiennent à gauche (10 signes au plus) ═══ */
for (const { args } of appels("barres").filter((a) => a.args)) for (const b of args[0]) vrai(`barres : « ${b.label} » ≤ 10 signes`, b.label.length <= 10);
/* ═══ Le signe de la division : « ÷ », jamais « : » entre deux nombres hors fraction ═══ */
for (const [k, t] of f.feuille.corrections.entries()) vrai(`${k + 1}. aucune division écrite « a : b »`, !/\d : \d/.test(t.replace(/\$[^$]*\$/g, "")));

f.fin();
