// Recalcul indépendant de la feuille « Ratios, pourcentages et coefficient » de 5e
// (29/09/2026) : lib/fiches-exercices/maths-5e-prop-ratio-pourcentage.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (barre, pourcents,
// evolution, camembert, tableau, table), jamais recopiés ici : le script
// simplifie les ratios (pgcd), partage, prend les pourcentages, applique les
// coefficients, puis cherche la réponse écrite dans le corrigé.
// Chaque dessin de la feuille est aussi contrôlé pour lui-même : les parts
// d'une barre redonnent son total, chaque étape d'une évolution est la
// précédente × (1 + taux ÷ 100), un camembert fait 100 %, et les textes
// tiennent dans leur case (8,8 par signe en corps 14 gras, 9 en corps 15).
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-prop-ratio-pourcentage.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-prop-ratio-pourcentage.tsx", "prop_ratio_pourcentage", ["barre", "pourcents", "evolution", "camembert", "table"]);
const { e, vrai, dit, enonceDit, dessin, dessins, appels, essai } = f;

/** « 1 040 € », « 7,5 L », « 2{,}5 », « 1\,200 » → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/[^\d,.]/g, "").replace(",", "."));
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
/** Le premier nombre $…$ qui suit un morceau de texte. */
const apres = (texte, morceau) => {
  const i = texte.indexOf(morceau);
  if (i < 0) throw new Error(`« ${morceau} » introuvable`);
  const m = /\$([\d\\,{} ]+)(?:\\,\\%)?\$/.exec(texte.slice(i + morceau.length));
  return nb(m[1]);
};
const P = (p) => `$${t(p)}\\,\\%$`;
const L = (s) => s.length * 8.8;

/* ═════ Les dessins, chacun pour lui-même ═════ */
for (const { args } of appels("barre").filter((a) => a.args)) {
  const [segs, total, unePart] = args;
  const somme = segs.reduce((s, x) => s + x.parts, 0);
  const u = 260 / somme;
  vrai(`barre ${total} : les parts redonnent le total`, r9(segs.reduce((s, x) => s + nb(x.valeur), 0)) === nb(total));
  let x = 10, finPrec = 0;
  for (const s of segs) {
    vrai(`barre ${total} : ${s.nom} = ${s.parts} × ${unePart}`, r9(s.parts * nb(unePart)) === nb(s.valeur));
    vrai(`barre ${total} : « ${s.nom} » tient dans sa part`, L(s.nom) <= s.parts * u - 4);
    const c = x + (s.parts * u) / 2;
    vrai(`barre ${total} : la valeur « ${s.valeur} » ne touche pas sa voisine`, c - L(s.valeur) / 2 >= finPrec + 3 && c + L(s.valeur) / 2 <= 280);
    finPrec = c + L(s.valeur) / 2;
    x += s.parts * u;
  }
  vrai(`barre ${total} : titre et bas dans le cadre`, L(`total : ${total}`) <= 270 && L(`1 part = ${unePart}`) <= 270);
}
for (const { args } of appels("pourcents").filter((a) => a.args)) {
  const [total, unite, marques] = args;
  let fin = 0;
  for (const [p, v] of marques) {
    vrai(`pourcents ${total} : ${p} % de ${total} = ${v}`, r9((p * nb(total)) / 100) === nb(v));
    const X = 14 + (252 * p) / 100;
    const demi = Math.max(L(`${p} %`), L(v)) / 2;
    vrai(`pourcents ${total} : l'étiquette ${p} % ne touche pas sa voisine`, X - demi >= fin + 3);
    fin = X + demi;
  }
  vrai(`pourcents ${total} : la dernière étiquette ne touche pas « 100 % » ni le total`, fin + 3 <= 266 - Math.max(L("100 %"), L(total)));
  vrai(`pourcents ${total} : « en ${unite} » tient`, L(`en ${unite}`) <= 270);
}
for (const { args } of appels("evolution").filter((a) => a.args)) {
  const [unite, lignes] = args;
  lignes.forEach((l, i) => {
    vrai(`évolution : le nom « ${l.nom} » tient dans sa colonne`, L(l.nom) <= 58);
    vrai(`évolution : « ${l.valeur} ${unite} » tient avant le bord`, 214 + L(`${l.valeur} ${unite}`.trim()) <= 280);
    if (i > 0) vrai(`évolution : ${lignes[i - 1].valeur} × (1 + ${l.taux} %) = ${l.valeur}`, r9(nb(lignes[i - 1].valeur) * (1 + l.taux / 100)) === nb(l.valeur));
  });
}
for (const { args } of appels("camembert").filter((a) => a.args)) {
  const [parts] = args;
  vrai("camembert : les parts font 100 %", parts.reduce((s, p) => s + p.valeur, 0) === 100 && parts.every((p) => p.valeur > 0));
  for (const p of parts) vrai(`camembert : la légende « ${p.nom} » tient`, 162 + p.nom.length * 9 <= 240);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const a = apres(e(1), "il y a"), b = apres(e(1), "poules et");
  const g = pgcd(a, b);
  dit(1, `les poules d'abord : $${a} : ${b}$`);
  dit(1, `$${a} \\div ${g} = ${a / g}$ et $${b} \\div ${g} = ${b / g}$`);
  dit(1, `canards : poules $= ${b / g} : ${a / g}$`);
  dit(1, `Réponse : poules : canards $= ${a} : ${b} = ${a / g} : ${b / g}$ ; canards : poules $= ${b / g} : ${a / g}$.`);
  const [segs] = dessin("barre", 1);
  vrai("1. la barre : 7 parts de poules, 3 de canards", segs[0].parts === a / g && segs[1].parts === b / g && nb(segs[0].valeur) === a && nb(segs[1].valeur) === b);
});
essai("2", () => {
  const [rf, rc] = /au citron est \$(\d+) : (\d+)\$/.exec(e(2)).slice(1).map(Number), fr =apres(e(2), "Un sachet contient"), cit = apres(e(2), "Un autre sachet contient");
  enonceDit(2, `est $${rf} : ${rc}$`);
  const u1 = fr / rf, c1 = rc * u1, u2 = cit / rc;
  dit(2, `$${fr} \\div ${rf} = ${u1}$`);
  dit(2, `$${rc} \\times ${u1} = ${c1}$`);
  dit(2, `$${fr} + ${c1} = ${fr + c1}$`);
  dit(2, `$${cit} \\div ${rc} = ${u2}$`);
  dit(2, `$${rf} \\times ${u2} = ${rf * u2}$`);
  dit(2, `$${rc} + ${fr - rf} = ${rc + fr - rf}$`);
  dit(2, `Réponse : a) $${c1}$ bonbons au citron ; b) $${fr + c1}$ bonbons ; c) $${rf * u2}$ bonbons à la fraise.`);
  const [segs, , unePart] = dessin("barre", 2);
  vrai("2. la barre du a)", nb(segs[0].valeur) === fr && nb(segs[1].valeur) === c1 && nb(unePart) === u1);
});
essai("3", () => {
  const lignes = e(3).split("\\n").slice(1).map((l) => [nb(/\$(\d+)\\,\\%\$/.exec(l)[1]), nb(/de \$(\d+)\$/.exec(l)[1])]);
  const res = lignes.map(([p, n]) => r9((p * n) / 100));
  const [[, a], [, b], [, c], [, d]] = lignes;
  dit(3, `$${a} \\div 2 = ${t(res[0])}$`);
  dit(3, `$${b} \\div 4 = ${t(res[1])}$`);
  dit(3, `$${c} \\div 10 = ${t(res[2])}$`);
  dit(3, `$${d} \\div 4 = ${d / 4}$, puis $3 \\times ${d / 4} = ${t(res[3])}$`);
  dit(3, `Réponse : a) $${t(res[0])}$ ; b) $${t(res[1])}$ ; c) $${t(res[2])}$ ; d) $${t(res[3])}$.`);
  vrai("3. pourcentages faciles : 50, 25, 10, 75", JSON.stringify(lignes.map((l) => l[0])) === "[50,25,10,75]");
  const [, rows] = dessin("table", 3);
  vrai("3. le tableau", rows.every((r, i) => nb(r[2]) === res[i] && r[0] === `${lignes[i][0]} % de ${lignes[i][1]}`));
});
essai("4", () => {
  const S = apres(e(4), "Une forêt de"), p = apres(e(4), "composée à");
  const r = (S * p) / 100;
  dit(4, `$${S} \\times ${p} = ${t(S * p)}$, puis $${t(S * p)} \\div 100 = ${t(r)}$`);
  dit(4, `$10\\,\\%$ de $${S}$ font $${S / 10}$, donc $${p}\\,\\%$ font $${p / 10} \\times ${S / 10} = ${t(r)}$`);
  dit(4, `Réponse : les chênes occupent $${t(r)}$ hectares.`);
  const [total, , marques] = dessin("pourcents", 4);
  vrai("4. la barre des pourcentages", nb(total) === S && marques.some(([q, v]) => q === p && nb(v) === r));
});
essai("5", () => {
  const n = apres(e(5), "Jade tire"), b = apres(e(5), "et marque");
  const k = 100 / n, p = b * k;
  vrai("5. 20 × 5 = 100", Number.isInteger(k));
  dit(5, `Or $${n} \\times ${k} = 100$`);
  dit(5, `$\\dfrac{${b}}{${n}} = \\dfrac{${b} \\times ${k}}{${n} \\times ${k}} = \\dfrac{${p}}{100}$`);
  dit(5, `Réponse : Jade réussit ${P(p)} de ses tirs.`);
  const [total, , marques] = dessin("pourcents", 5);
  vrai("5. la barre", nb(total) === n && marques[0][0] === p && nb(marques[0][1]) === b);
});
essai("6", () => {
  const lignes = e(6).split("\\n").slice(1).map((l) => ({ hausse: l.includes("hausse"), p: nb(/\$(\d+)\\,\\%\$/.exec(l)[1]) }));
  const coefs = lignes.map(({ hausse, p }) => r9(1 + ((hausse ? 1 : -1) * p) / 100));
  lignes.forEach(({ hausse, p }, i) => dit(6, `$1 ${hausse ? "+" : "-"} ${t(p / 100)} = ${t(coefs[i])}$`));
  dit(6, `Réponse : ${coefs.map((c, i) => `${"abcd"[i]}) $\\times ${t(c)}$`).join(" ; ")}.`);
  const [ent, lig] = dessin("tableau", 6);
  vrai("6. le tableau", ent.slice(1).every((x, i) => x === `${lignes[i].hausse ? "+" : "−"}${lignes[i].p} %`) && lig.slice(1).every((x, i) => nb(x) === coefs[i]));
});
essai("7", () => {
  const prix = apres(e(7), "coûte"), p = apres(e(7), "baisse de");
  const c = r9(1 - p / 100), np = r9(prix * c), red = r9((prix * p) / 100);
  dit(7, `$1 - ${t(p / 100)} = ${t(c)}$`);
  dit(7, `$${prix} \\times ${t(c)} = ${t(np)}$`);
  dit(7, `$${prix} \\times ${t(p / 100)} = ${t(red)}$ €, et $${prix} - ${t(red)} = ${t(np)}$ €`);
  dit(7, `Réponse : le jeu coûte $${t(np)}$ € pendant les soldes.`);
});
essai("8", () => {
  const h = apres(e(8), "mesure"), p = apres(e(8), "augmente de");
  const c = r9(1 + p / 100), nh = r9(h * c), gain = r9((h * p) / 100);
  dit(8, `$1 + ${t(p / 100)} = ${t(c)}$`);
  dit(8, `$${h} \\times ${t(c)} = ${t(nh)}$`);
  dit(8, `$${h} \\times ${t(p / 100)} = ${t(gain)}$ cm de plus, et $${h} + ${t(gain)} = ${t(nh)}$ cm`);
  dit(8, `Réponse : le plant mesure $${t(nh)}$ cm.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [a, b] = /farine : beurre \$= (\d+) : (\d+)\$/.exec(e(9)).slice(1).map(Number);
  const T = apres(e(9), "Lina veut");
  const u = T / (a + b);
  dit(9, `$${a} + ${b} = ${a + b}$ parts`);
  dit(9, `$${T} \\div ${a + b} = ${u}$`);
  dit(9, `Farine : $${a} \\times ${u} = ${a * u}$ g. Beurre : $${b} \\times ${u} = ${b * u}$ g.`);
  dit(9, `Réponse : $${a * u}$ g de farine et $${b * u}$ g de beurre.`);
  enonceDit(9, `ratio farine : beurre $= ${a} : ${b}$`);
});
essai("10", () => {
  const [A, B] = dessins("barre", 10).map((d) => d.args[0].map((s) => s.parts));
  vrai("10. les barres portent les doses de l'énoncé", e(10).includes(`avec $${A[0]}$ doses de sirop et $${A[1]}$ doses d'eau`) && e(10).includes(`avec $${B[0]}$ doses de sirop et $${B[1]}$ doses d'eau`));
  const [gA, gB] = [pgcd(A[0], A[1]), pgcd(B[0], B[1])];
  dit(10, `Verre A : $${A[0]} : ${A[1]}$. Je divise par $${gA}$ : $${A[0] / gA} : ${A[1] / gA}$`);
  dit(10, `Verre B : $${B[0]} : ${B[1]}$. Je divise par $${gB}$ : $${B[0] / gB} : ${B[1] / gB}$`);
  const eauParSirop = [A[1] / A[0], B[1] / B[0]];
  vrai("10. le verre B a moins d'eau par dose de sirop", eauParSirop[1] < eauParSirop[0]);
  const [pA, pB] = [(100 * A[0]) / (A[0] + A[1]), (100 * B[0]) / (B[0] + B[1])];
  dit(10, `c'est ${P(pA)}`);
  dit(10, `c'est ${P(pB)}`);
  dit(10, `$${A[1]} - ${A[0]} = ${A[1] - A[0]}$ et $${B[1]} - ${B[0]} = ${B[1] - B[0]}$`);
  dit(10, `Réponse : A est au ratio $${A[0] / gA} : ${A[1] / gA}$, B au ratio $${B[0] / gB} : ${B[1] / gB}$ ; le verre B est le plus sucré ; ${P(pA)} de sirop dans A, ${P(pB)} dans B.`);
});
essai("11", () => {
  const prix = apres(e(11), "Un vélo coûte"), p = nb(/affiché à \$-(\d+)\\,\\%\$/.exec(e(11))[1]);
  vrai("11. 15 = 10 + 5", p === 15);
  const dix = prix / 10, cinq = dix / 2, red = dix + cinq;
  dit(11, `$${prix} \\div 10 = ${dix}$ €`);
  dit(11, `la moitié : $${cinq}$ €`);
  dit(11, `$${dix} + ${cinq} = ${red}$ €`);
  dit(11, `$${prix} - ${red} = ${prix - red}$ €`);
  dit(11, `$${prix} \\times ${t(1 - p / 100)} = ${t(r9(prix * (1 - p / 100)))}$ €`);
  vrai("11. les deux chemins d'accord", r9(prix * (1 - p / 100)) === prix - red);
  dit(11, `Réponse : $${red}$ € de réduction ; le vélo coûte $${prix - red}$ €.`);
});
essai("12", () => {
  const T = apres(e(12), "compte"), h = apres(e(12), "oiseaux :"), c = apres(e(12), "hérons,");
  const k = T - h - c;
  dit(12, `$${T} - ${h} - ${c} = ${k}$ canards`);
  const pc = [h, c, k].map((x) => (100 * x) / T);
  [h, c, k].forEach((x, i) => {
    const g = pgcd(x, T);
    dit(12, `$\\dfrac{${x}}{${T}} = \\dfrac{${x / g}}{${T / g}} = \\dfrac{${pc[i]}}{100}$, soit ${P(pc[i])}`);
  });
  dit(12, `$${pc.join(" + ")} = 100$`);
  const g = pgcd(h, c);
  dit(12, `$${h} : ${c}$. Les deux nombres se divisent par $${g}$ : $${h / g} : ${c / g}$`);
  dit(12, `Réponse : $${k}$ canards ; ${P(pc[0])} de hérons, ${P(pc[1])} de cigognes, ${P(pc[2])} de canards ; hérons : cigognes $= ${h / g} : ${c / g}$.`);
  const [parts] = dessin("camembert", 12);
  vrai("12. le camembert", JSON.stringify(parts.map((p) => p.valeur)) === JSON.stringify(pc));
});
essai("13", () => {
  const coefs = e(13).split("\\n").slice(1).map((l) => nb(/times ([\d{},]+)\$/.exec(l)[1]));
  const evo = coefs.map((c) => r9((c - 1) * 100));
  coefs.forEach((c, i) => {
    if (c === 2) return dit(13, `$2 = 1 + 1$ : une hausse de $100\\,\\%$`);
    const ecart = r9(Math.abs(c - 1));
    dit(13, `$${t(c)} = 1 ${c > 1 ? "+" : "-"} ${t(ecart)}$ : une ${c > 1 ? "hausse" : "baisse"} de ${P(Math.abs(evo[i]))}`);
  });
  dit(13, `Réponse : ${evo.map((x, i) => `${"abcde"[i]}) $${x > 0 ? "+" : "-"}${t(Math.abs(x))}\\,\\%$`).join(" ; ")}.`);
  const [ent, lig] = dessin("tableau", 13);
  vrai("13. le tableau", ent.slice(1).every((x, i) => nb(x) === coefs[i]) && lig.slice(1).every((x, i) => x === `${evo[i] > 0 ? "+" : "−"}${Math.abs(evo[i])} %`));
});
essai("14", () => {
  const prix = apres(e(14), "coûte"), p = apres(e(14), "augmente de");
  const aug = (prix * p) / 100;
  dit(14, `$${prix} \\times ${p} = ${t(prix * p)}$, puis $${t(prix * p)} \\div 100 = ${aug}$ €`);
  dit(14, `$${prix} + ${aug} = ${prix + aug}$ €`);
  dit(14, `$${prix} \\times ${t(1 + p / 100)} = ${t(r9(prix * (1 + p / 100)))}$ €`);
  dit(14, `$${prix} \\times ${t(1 - p / 100)} = ${t(r9(prix * (1 - p / 100)))}$ €`);
  dit(14, `répondre $${prix + p}$ €`);
  dit(14, `Réponse : a) et b) $${prix + aug}$ € ; c) $${t(r9(prix * (1 - p / 100)))}$ €.`);
});
essai("15", () => {
  const prix = apres(e(15), "coûte"), p = apres(e(15), "augmente de");
  const j = r9(prix * (1 + p / 100)), s = r9(j * (1 - p / 100));
  dit(15, `$${prix} \\times ${t(1 + p / 100)} = ${t(j)}$ €`);
  dit(15, `$${t(j)} \\times ${t(1 - p / 100)} = ${t(s)}$ €`);
  vrai("15. on ne revient pas au départ", s !== prix);
  dit(15, `La hausse vaut $${p}\\,\\%$ de $${prix}$, soit $${t((prix * p) / 100)}$ €. La baisse vaut $${p}\\,\\%$ de $${t(j)}$, soit $${t((j * p) / 100)}$ €.`);
  dit(15, `Réponse : $${t(j)}$ € en juillet ; $${t(s)}$ € en septembre ; Nino a tort.`);
  enonceDit(15, `le nouveau prix baisse de $${p}\\,\\%$`);
});
essai("16", () => {
  const [a, b] = /adultes : enfants est \$(\d+) : (\d+)\$/.exec(e(16)).slice(1).map(Number);
  const T = apres(e(16), "Le club compte");
  const pe = (100 * b) / (a + b), u = T / (a + b);
  dit(16, `$\\dfrac{${b}}{${a + b}} = \\dfrac{${pe}}{100}$, soit ${P(pe)}`);
  dit(16, `$${T} \\div ${a + b} = ${u}$ membres. Adultes : $${a} \\times ${u} = ${a * u}$. Enfants : $${b} \\times ${u} = ${b * u}$.`);
  dit(16, `$${T} \\times ${t(pe / 100)} = ${t(r9((T * pe) / 100))}$`);
  vrai("16. les deux chemins d'accord", r9((T * pe) / 100) === b * u);
  dit(16, `Réponse : ${P(pe)} d'enfants ; $${a * u}$ adultes et $${b * u}$ enfants.`);
  const [segs] = dessin("barre", 16);
  vrai("16. la barre", nb(segs[0].valeur) === a * u && nb(segs[1].valeur) === b * u);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [a, b] = /blanc : bleu \$= (\d+) : (\d+)\$/.exec(e(17)).slice(1).map(Number);
  const blanc = apres(e(17), "Avec"), T = apres(e(17), "Il faut"), [lb, lbl] = [apres(e(17), "Léa mélange"), apres(e(17), "L de blanc et")];
  const u1 = blanc / a;
  dit(17, `$${blanc} \\div ${a} = ${u1}$ L`);
  const u = T / (a + b);
  dit(17, `$${a} + ${b} = ${a + b}$ parts. Une part vaut $${T} \\div ${a + b} = ${t(u)}$ L.`);
  dit(17, `Blanc : $${a} \\times ${t(u)} = ${t(a * u)}$ L. Bleu : $${b} \\times ${t(u)} = ${t(b * u)}$ L.`);
  const pb = (100 * b) / (a + b), pl = (100 * lbl) / (lb + lbl);
  dit(17, `$\\dfrac{${b}}{${a + b}} = \\dfrac{${pb}}{100}$, soit ${P(pb)}`);
  dit(17, `$\\dfrac{${lbl}}{${lb + lbl}} = \\dfrac{${pl}}{100}$, soit ${P(pl)} de bleu`);
  vrai("17. Léa : moins de bleu, plus clair", pl < pb && c17().includes("plus CLAIRE"));
  dit(17, `Réponse : a) $${b * u1}$ L ; b) $${t(a * u)}$ L de blanc et $${t(b * u)}$ L de bleu ; c) ${P(pb)} ; d) plus claire.`);
  const [segs, total] = dessin("barre", 17);
  vrai("17. la barre du b)", nb(total) === T && nb(segs[0].valeur) === a * u && nb(segs[1].valeur) === b * u);
});
function c17() {
  return f.c(17);
}
essai("18", () => {
  const budget = apres(e(18), "Tom a"), prix = apres(e(18), "course à"), p = nb(/soldées à \$-(\d+)\\,\\%\$/.exec(e(18))[1]), [s1, s2] = [apres(e(18), "passe de"), apres(e(18), "€ à")];
  const c = r9(1 - p / 100), ch = r9(prix * c);
  dit(18, `$1 - ${t(p / 100)} = ${t(c)}$. $${prix} \\times ${t(c)} = ${t(ch)}$ €`);
  const red = s1 - s2, g = pgcd(red, s1), pc = (100 * red) / s1;
  dit(18, `$${s1} - ${s2} = ${red}$ €`);
  dit(18, `$\\dfrac{${red}}{${s1}} = \\dfrac{${pc}}{100}$, soit ${P(pc)}`);
  dit(18, `$${t(ch)} + ${s2} = ${t(ch + s2)}$ €`);
  vrai("18. trop cher", ch + s2 > budget);
  dit(18, `il lui manque $${t(ch + s2 - budget)}$ €`);
  dit(18, `$\\dfrac{${red}}{${s2}} = ${t((100 * red) / s2)}\\,\\%$`);
  dit(18, `Réponse : a) $${t(ch)}$ € ; b) une baisse de ${P(pc)} ; c) non, il lui manque $${t(ch + s2 - budget)}$ €.`);
  vrai("18. la fraction se simplifie", g > 1);
});
essai("19", () => {
  const T = apres(e(19), "compte"), pp = apres(e(19), "rues :"), pt = apres(e(19), "platanes,"), pe = 100 - pp - pt;
  const [np, nt, ne] = [pp, pt, pe].map((p) => r9((T * p) / 100));
  dit(19, `$100 - ${pp} - ${pt} = ${pe}\\,\\%$ d'érables`);
  dit(19, `$${t(T)} \\times ${t(pp / 100)} = ${np}$`);
  dit(19, `Tilleuls : $${t(T)} \\times ${t(pt / 100)} = ${nt}$. Érables : $${t(T)} \\times ${t(pe / 100)} = ${ne}$.`);
  dit(19, `$${np} + ${nt} + ${ne} = ${t(T)}$`);
  const g = pgcd(np, nt);
  dit(19, `$${np} : ${nt}$. Je divise les deux nombres par $${g}$ : $${np / g} : ${nt / g}$`);
  const h = apres(e(19), "augmenter de"), N = r9(T * (1 + h / 100));
  dit(19, `$${t(T)} \\times ${t(1 + h / 100)} = ${t(N)}$ arbres`);
  dit(19, `$${t(N)} - ${t(T)} = ${t(N - T)}$`);
  dit(19, `Réponse : a) ${P(pe)} ; b) $${np}$ platanes, $${nt}$ tilleuls, $${ne}$ érables ; c) $${np / g} : ${nt / g}$ ; d) $${t(N)}$ arbres, soit $${t(N - T)}$ à planter.`);
  const [parts] = dessin("camembert", 19);
  vrai("19. le camembert", JSON.stringify(parts.map((p) => p.valeur)) === JSON.stringify([pp, pt, pe]));
});
essai("20", () => {
  const T = apres(e(20), "qui coûte"), pc = apres(e(20), "représente"), pe = apres(e(20), "les entrées"), pr = 100 - pc - pe;
  const [car, ent, rep] = [pc, pe, pr].map((p) => r9((T * p) / 100));
  dit(20, `Car : $${t(T)} \\times ${t(pc / 100)} = ${car}$ €. Entrées : $${t(T)} \\times ${t(pe / 100)} = ${ent}$ €.`);
  dit(20, `Repas : $100 - ${pc} - ${pe} = ${pr}\\,\\%$, soit $${t(T)} \\times ${t(pr / 100)} = ${rep}$ €.`);
  dit(20, `$${car} + ${ent} + ${rep} = ${t(T)}$ €`);
  const h = apres(e(20), "augmente de"), car2 = r9(car * (1 + h / 100)), T2 = T + car2 - car;
  dit(20, `$${car} \\times ${t(1 + h / 100)} = ${car2}$ €, soit $${car2 - car}$ € de plus. La sortie coûte $${t(T)} + ${car2 - car} = ${t(T2)}$ €.`);
  const [a, b] = /collège : familles \$= (\d+) : (\d+)\$/.exec(e(20)).slice(1).map(Number);
  const u = T2 / (a + b);
  dit(20, `$${a} + ${b} = ${a + b}$ parts. Une part vaut $${t(T2)} \\div ${a + b} = ${u}$ €. Les familles ont $${b}$ parts : $${b} \\times ${u} = ${t(b * u)}$ €.`);
  const n = apres(e(20), "La classe compte");
  dit(20, `$${t(b * u)} \\div ${n} = ${t((b * u) / n)}$ € par famille`);
  vrai("20. un prix rond par famille", Number.isInteger((b * u) / n));
  dit(20, `TOUTE la sortie ($${t(r9(T * (1 + h / 100)))}$ €)`);
  dit(20, `Réponse : a) $${car}$ €, $${ent}$ € et $${rep}$ € ; b) $${car2}$ €, et $${t(T2)}$ € en tout ; c) $${t(b * u)}$ € ; d) $${t((b * u) / n)}$ € par famille.`);
  const [segs, total, unePart] = dessin("barre", 20);
  vrai("20. la barre du partage", nb(total) === T2 && nb(unePart) === u && nb(segs[1].valeur) === b * u);
});

f.fin();
