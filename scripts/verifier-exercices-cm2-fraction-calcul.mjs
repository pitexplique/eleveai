// Recalcul indépendant de la feuille « Calculer avec les fractions » de CM2
// (25/10/2026) : lib/fiches-exercices/maths-cm2-fraction-calcul.tsx.
//
// ⭐ L'AUTRE CHEMIN : les sommes et les produits sont refaits en fractions
// EXACTES (BigInt) ; la fraction d'une quantité est refaite par la
// multiplication d'abord (a × N ÷ b), quand la feuille divise d'abord. Les
// dessins sont relus : parts colorées des barres, billes, sauts de la droite.
// Le script vérifie aussi les bornes du CM2 : à chaque addition, un
// dénominateur est un multiple de l'autre.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs (classe cm2).
// Usage : node scripts/verifier-exercices-cm2-fraction-calcul.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf, plus, moins, fois, tex } from "./verifier-exercices-commun.mjs";

const DESSINS = ["barres", "cent", "disque", "droiteRel", "jetons"];
const f = ouvrir("lib/fiches-exercices/maths-cm2-fraction-calcul.tsx", "fraction_calcul", DESSINS, "cm2");
const { vrai, verif, dit, enonceDit, e, src, dessin, appels, essai } = f;

const F = (a, b = 1) => Q(a, b);
const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
const frQ = (q) => (q.d === 1n ? String(q.n) : fr(q.n, q.d));
const txt = (q) => tex(q).replace("{,}", ",");
const couples = (t) => [...t.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
const lignes = (k) => e(k).split("\\n");
const pres = (x, q) => Math.abs(x - Number(q.n) / Number(q.d)) < 1e-9;
/** Fraction d'une quantité par L'AUTRE ordre : (a × N) ÷ b. */
const de = (a, b, N) => {
  vrai(`${a}/${b} de ${N} tombe juste`, (a * N) % b === 0);
  return (a * N) / b;
};

/* ═══ Les bornes du CM2 : une addition ne mêle que des dénominateurs multiples l'un de l'autre ═══ */
for (const m of src.matchAll(/\\\\dfrac\{(\d+)\}\{(\d+)\} [+-] \\\\dfrac\{(\d+)\}\{(\d+)\}/g)) {
  const [b, d] = [Number(m[2]), Number(m[4])];
  vrai(`borne CM2 : ${m[1]}/${b} ± ${m[3]}/${d}, dénominateurs multiples`, b % d === 0 || d % b === 0);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [[b]] = dessin("barres", 1, "figure");
  const [e1, n1] = b.parts;
  dit(1, `Elsa : ${e1} parts, $${fr(e1, b.d)}$. Noah : ${n1} parts, $${fr(n1, b.d)}$`);
  dit(1, `$${fr(e1, b.d)} + ${fr(n1, b.d)} = ${fr(e1 + n1, b.d)}$`);
  dit(1, `Il reste ${b.d} − ${e1 + n1} = ${b.d - e1 - n1} parts : $${fr(b.d - e1 - n1, b.d)}$`);
  dit(1, `écrire $${fr(e1 + n1, 2 * b.d)}$`);
});
essai("2", () => {
  const paires = lignes(2).slice(1).map((l) => couples(l));
  const rep = paires.map(([a, b]) => {
    const s = plus(F(...a), F(...b));
    dit(2, `$${fr(...a)} + ${fr(...b)} = ${fr(a[0] + b[0], a[1])}`);
    return frQ(s);
  });
  dit(2, `Réponse : a) $${rep[0]}$ ; b) $${rep[1]}$ ; c) ${rep[2]} ; d) $${rep[3]}$.`);
  vrai("2. le piège 3/8 < 2/4", inf(F(3, 8), F(2, 4)));
});
essai("3", () => {
  const paires = lignes(3).slice(1).map((l) => {
    const cs = couples(l);
    return cs.length === 2 ? cs.map((x) => F(...x)) : [F(1), F(...cs[0])];
  });
  const rep = paires.map(([a, b]) => frQ(moins(a, b)));
  dit(3, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) $${r}$`).join(" ; ")}.`);
  dit(3, `$1 - ${fr(2, 5)} = ${fr(5, 5)} - ${fr(2, 5)} = ${fr(3, 5)}$`);
});
essai("4", () => {
  const items = lignes(4).slice(1).map((l) => {
    const m = /\$(\d+) \\times \\dfrac\{(\d+)\}\{(\d+)\}\$/.exec(l);
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  });
  const rep = items.map(([k, a, b], i) => {
    if (i < 3) dit(4, `$${k} \\times ${fr(a, b)} = ${Array(k).fill(fr(a, b)).join(" + ")} = ${fr(k * a, b)}$`);
    else dit(4, `$${k} \\times ${fr(a, b)} = ${fr(k * a, b)} = 1$`);
    return frQ(fois(F(k), F(a, b)));
  });
  dit(4, `Réponse : a) $${rep[0]}$ ; b) $${rep[1]}$ ; c) $${rep[2]}$ ; d) ${rep[3]}.`);
  dit(4, `n'est pas $${fr(items[0][0] * items[0][1], items[0][0] * items[0][2])}$`);
  const [[b]] = dessin("barres", 4);
  vrai("4. la barre : 3 groupes de 2 septièmes", b.d === 7 && b.parts.join() === "2,2,2");
});
essai("5", () => {
  const items = lignes(5).slice(1).map((l) => {
    const [[a, b]] = couples(l);
    return [a, b, Number(/de (\d+)/.exec(l)[1])];
  });
  const rep = items.map(([a, b, N]) => {
    const r = de(a, b, N);
    dit(5, `${N} ÷ ${b} = ${r}`);
    return r;
  });
  dit(5, `Réponse : a) ${rep[0]} ; b) ${rep[1]} ; c) ${rep[2]} ; d) ${rep[3]}.`);
  const [ra, pr, g] = dessin("jetons", 5);
  vrai("5. les billes : 3 rangées de 7, une prise", ra === 3 && ra * pr === 21 && g[0].n === pr);
});
essai("6", () => {
  const [ra, pr] = dessin("jetons", 6, "figure");
  const N = ra * pr;
  enonceDit(6, `Les ${N} billes`);
  const deux = de(2, 3, N);
  dit(6, `${N} ÷ 3 = ${N / 3} billes`);
  dit(6, `2 × ${N / 3} = ${deux} billes`);
  dit(6, `${N} − ${deux} = ${N - deux} billes`);
  const [, , g, reste] = dessin("jetons", 6, "schema");
  vrai("6. le corrigé : 8 billes données", g[0].n === deux && reste === "gardée");
});
essai("7", () => {
  const paires = lignes(7).slice(2).map((l) => couples(l));
  const ops = ["+", "+", "-"];
  const rep = paires.map(([a, b], i) => {
    const r = ops[i] === "+" ? plus(F(...a), F(...b)) : moins(F(...a), F(...b));
    vrai(`7. ${a[1]} et ${b[1]} multiples`, b[1] % a[1] === 0);
    const k = b[1] / a[1];
    dit(7, `$${fr(...a)} = ${fr(a[0] * k, b[1])}$`);
    return frQ(r);
  });
  dit(7, `Réponse : a) $${rep[0]}$ ; b) $${rep[1]}$ ; c) $${rep[2]}$.`);
  const [liste] = dessin("barres", 7);
  vrai("7. les barres : 1/2 = 2/4, puis 1/4 de plus", egal(F(liste[0].parts[0], liste[0].d), F(liste[1].parts[0], liste[1].d)) && liste[1].parts[1] === 1);
});
essai("8", () => {
  const k = Number(/fait (\d+) sauts/.exec(e(8))[1]);
  const [[a, b]] = couples(e(8));
  const d = fois(F(k), F(a, b));
  dit(8, `$${k} \\times ${fr(a, b)} = ${fr(k * a, b)}$ m`);
  dit(8, `$${fr(k * a, b)} = 2 + ${fr((k * a) % b, b)}$`);
  vrai("8. entre 2 et 3", inf(F(2), d) && inf(d, F(3)));
  const [, , , , opts] = dessin("droiteRel", 8, "figure");
  vrai("8. les sauts : 3 sauts de 3/4 bout à bout", opts.sauts.length === k && opts.sauts.every((s, i) => pres(s.de, fois(F(i), F(a, b))) && pres(s.vers, fois(F(i + 1), F(a, b))) && s.label === `${a}/${b}`));
});
/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const paires = lignes(9).slice(1).map((l) => couples(l));
  const rep = paires.map(([a, b]) => {
    const s = plus(F(...a), F(...b));
    dit(9, `${frQ(s)} = ${tex(s)}$`);
    return txt(s);
  });
  dit(9, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) ${r}`).join(" ; ")}.`);
  const [n] = dessin("cent", 9);
  vrai("9. la grille : 1/2 + 1/4 = 75 cases", n === Number(plus(F(1, 2), F(1, 4)).n * 100n / plus(F(1, 2), F(1, 4)).d));
});
essai("10", () => {
  const justes = [plus(F(1, 4), F(2, 4)), fois(F(3), F(2, 5)), plus(F(1, 2), F(1, 4))];
  vrai("10. les trois erreurs sont des erreurs", !egal(justes[0], F(3, 8)) && !egal(justes[1], F(6, 15)) && !egal(justes[2], F(2, 6)));
  vrai("10b. 6/15 = 2/5 : la réponse de Léa n'a pas grandi", egal(F(6, 15), F(2, 5)));
  dit(10, `Et $${fr(6, 15)} = ${fr(2, 5)}$`);
  dit(10, `Réponse : a) $${frQ(justes[0])}$ ; b) $${frQ(justes[1])}$ ; c) $${frQ(justes[2])}$.`);
  dit(10, `= ${fr(6, 5)}$`);
});
essai("11", () => {
  const [[a, b]] = couples(e(11));
  const q4 = fois(F(4), F(a, b)), q6 = fois(F(6), F(a, b));
  dit(11, `= ${fr(4 * a, b)}$`);
  dit(11, `$${fr(4 * a, b)} = ${frQ(q4)}$. Il faut ${frQ(q4)} litres`);
  dit(11, `$6 \\times ${fr(a, b)} = ${fr(6 * a, b)}$`);
  dit(11, `= ${tex(q6)}$ litres`);
  dit(11, `soit ${txt(q6)} litres`);
  const [[bb]] = dessin("barres", 11);
  vrai("11. la barre : 4 fois 3 quarts sur 3 unités", bb.parts.length === 4 && bb.parts.every((p) => p === a) && bb.d === b && bb.fois === 3);
});
essai("12", () => {
  const N = Number(/classe de (\d+) élèves/.exec(e(12))[1]);
  const [[a, b], [c2, d2]] = couples(e(12));
  const pied = de(a, b, N), velo = de(c2, d2, N);
  dit(12, `${N} ÷ ${b} = ${N / b}. Je prends ${a} parts : ${a} × ${N / b} = ${pied} élèves à pied`);
  dit(12, `${N} − ${pied} = ${N - pied} élèves en bus`);
  vrai("12b. le bus = 1/4", egal(F(N - pied, N), F(1, 4)));
  dit(12, `${N} ÷ ${d2} = ${N / d2}. Je prends ${c2} parts : ${c2} × ${N / d2} = ${velo} élèves`);
  const [, , g] = dessin("jetons", 12);
  vrai("12. les billes : 21 à pied", g[0].n === pied);
});
essai("13", () => {
  const N = 20;
  dit(13, `${N} ÷ 4 = ${de(1, 4, N)}`);
  vrai("13b. 25 % = 1/4", egal(F(25, 100), F(1, 4)));
  dit(13, `3 × 5 = ${de(3, 4, N)} €`);
  vrai("13d. 10 % de 20 = 2", de(10, 100, N) === 2);
  dit(13, `Réponse : a) 5 € ; b) 5 € ; c) 15 €, 75 % ; d) 2 €.`);
});
essai("14", () => {
  const [a, b, c3] = couples(e(14));
  const s = plus(F(...a), F(...b));
  dit(14, `$${fr(...a)} + ${fr(...b)} = ${fr(a[0] + b[0], a[1])}$ km`);
  dit(14, `$${fr(8, 8)} - ${fr(a[0] + b[0], 8)} = ${frQ(moins(F(1), s))}$ km`);
  const t = plus(s, F(...c3));
  dit(14, `= ${fr(Number(t.n), Number(t.d))}$ km. Et $${fr(Number(t.n), Number(t.d))} = 1 + ${frQ(moins(t, F(1)))}$`);
  const [, , , , opts] = dessin("droiteRel", 14, "figure");
  vrai("14. les sauts : 3/8 puis 4/8", pres(opts.sauts[0].vers, F(...a)) && pres(opts.sauts[1].vers, s));
});
essai("15", () => {
  const [[a, b]] = couples(e(15));
  const k = Number(/(\d+) jours/.exec(e(15))[1]);
  dit(15, `$${k} \\times ${fr(a, b)} = ${fr(k * a, b)}$ d'heure`);
  dit(15, `$${fr(k * a, b)} = 1 + ${fr(k * a - b, b)}$ heure`);
  dit(15, `${k} × 15 = ${k * 15} minutes`);
  verif("15. 5 quarts d'heure = 75 min", (k * 60 * a) / b, 75);
  const [, , , , opts] = dessin("droiteRel", 15);
  vrai("15. la droite : 5 sauts d'un quart", opts.sauts.length === k && opts.sauts.every((s) => pres(s.vers - s.de, F(1, 4))));
});
essai("16", () => {
  const items = lignes(16).slice(1).map((l) => {
    const [[a, b]] = couples(l);
    return [a, b, Number(/de (\d+)/.exec(l)[1])];
  });
  const rep = items.map(([a, b, N]) => de(a, b, N));
  dit(16, `Réponse : ${rep.map((r, i) => `${"abcde"[i]}) ${r}`).join(" ; ")}.`);
  items.slice(1).forEach(([a, b, N], i) => a > 1 && dit(16, `${N} ÷ ${b} = ${N / b}, puis ${a} × ${N / b} = ${rep[i + 1]}`));
  dit(16, `30 ÷ 2 = 15`);
  const [ra, pr, g] = dessin("jetons", 16);
  vrai("16. les billes : 2 rangées sur 3", ra === 3 && ra * pr === 30 && g[0].n === rep[1]);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const N = Number(/dure (\d+) minutes/.exec(e(17))[1]);
  vrai("17. 2 × 45 = 90 (IFAB, loi 7)", N === 90);
  dit(17, `${N} ÷ 2 = ${N / 2} minutes`);
  const theo = de(2, 3, N);
  dit(17, `2 × 30 = ${theo} minutes`);
  const kenza = plus(F(1, 2), F(1, 6));
  vrai("17c. 1/2 + 1/6 = 2/3", egal(kenza, F(2, 3)));
  dit(17, `$${fr(4, 6)} = ${frQ(kenza)}$`);
  dit(17, `45 + ${de(1, 6, N)} = ${theo}`);
  const [n, d] = dessin("disque", 17);
  vrai("17. le disque : 2/3", n === 2 && d === 3);
});
essai("18", () => {
  const lait = fois(F(3), F(1, 2));
  dit(18, `$3 \\times ${fr(1, 2)} = ${frQ(lait)}$ litres`);
  dit(18, `soit ${txt(lait)} litre`);
  dit(18, `$${fr(4, 2)} - ${fr(3, 2)} = ${frQ(moins(F(2), lait))}$ litre reste`);
  dit(18, `3 × 12 = 36 crêpes`);
  dit(18, `36 ÷ 3 = ${de(1, 3, 36)} crêpes au sucre`);
  const [[b]] = dessin("barres", 18);
  vrai("18. la barre : 3 demis sur 2 litres", b.d === 2 && b.parts.reduce((s, x) => s + x, 0) === 3 && b.fois === 2);
});
essai("19", () => {
  const N = Number(/soigne (\d+) tortues/.exec(e(19))[1]);
  const [[a, b], [c4, d4]] = couples(e(19));
  const mer = de(a, b, N), douce = de(c4, d4, N), terre = N - mer - douce;
  dit(19, `${N} ÷ ${b} = ${N / b}, puis ${a} × ${N / b} = ${mer} tortues de mer`);
  dit(19, `${N} ÷ ${d4} = ${douce} tortues d'eau douce`);
  dit(19, `${N} − ${mer} − ${douce} = ${terre} tortues de terre`);
  const eau = plus(F(a, b), F(c4, d4));
  dit(19, `= ${frQ(eau)}$`);
  vrai("19. 5/8 de 24 = 9 + 6", de(5, 8, N) === mer + douce);
  const [ra, pr, g, reste] = dessin("jetons", 19, "figure");
  vrai("19. les billes : 24, 9 de mer, 6 d'eau douce", ra * pr === N && g[0].n === mer && g[1].n === douce && reste === "terre");
});
essai("20", () => {
  const L = Number(/haie de (\d+) mètres/.exec(e(20))[1]);
  const [[a, b], [c5, d5]] = couples(e(20));
  const deuxJours = plus(F(a, b), F(c5, d5));
  dit(20, `= ${frQ(deuxJours)}$`);
  const reste = moins(F(1), deuxJours);
  dit(20, `= ${frQ(reste)}$`);
  const m = de(Number(reste.n), Number(reste.d), L);
  dit(20, `${L} ÷ 8 = ${L / 8}, puis 3 × ${L / 8} = ${m} mètres`);
  dit(20, `$${fr(a, b)} = ${fr(25, 100)}$ : 25 %`);
  const [[bb]] = dessin("barres", 20, "figure");
  vrai("20. la barre : 2 huitièmes lundi, 3 mardi", bb.d === 8 && egal(F(bb.parts[0], 8), F(a, b)) && bb.parts[1] === c5);
});

/* ═══ Les dessins tiennent ═══ */
for (const { args } of appels("barres").filter((a) => a.args))
  for (const b of args[0]) {
    vrai(`barres : « ${b.label} » ≤ 10 signes`, b.label.length <= 10);
    vrai(`barres : « ${b.label} » ne déborde pas`, b.parts.reduce((s, x) => s + x, 0) <= b.d * (b.fois ?? 1) && b.parts.length <= 4);
  }
for (const { args } of appels("jetons").filter((a) => a.args)) {
  const [, pr, groupes, reste = ""] = args;
  vrai("jetons : 10 billes par rangée au plus", pr <= 10);
  vrai("jetons : légende de 7 signes au plus", [...groupes.map((g) => g.nom), reste].every((n) => n.length <= 7));
}

f.fin();
