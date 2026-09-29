// Recalcul indépendant de la feuille « La proportionnalité » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-prop-proportionnalite.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (tableau, table,
// tableauCoef, partage), jamais recopiés ici : le script calcule les quotients,
// le coefficient, les cases manquantes, puis cherche la réponse écrite dans le
// corrigé. Chaque `tableauCoef` est aussi contrôlé colonne par colonne :
// bas = haut × coefficient écrit ; chaque `partage` : total ÷ n = une part.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-prop-proportionnalite.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-prop-proportionnalite.tsx", "prop_proportionnalite", ["tableauCoef", "table", "partage"], "6e");
const { e, vrai, dit, enonceDit, dessin, appels, essai } = f;

/** « 2 400 », « 2,40 », « !45 », « 35 g », « 2{,}5 », « 1,50 € » → nombre. */
const nb = (s) => Number(String(s).replace(/^!/, "").replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", ".").replace(/[a-zA-Zé€.]+$/, (m) => (/^\.\d/.test(m) ? m : "")));
/** Un prix comme la feuille l'écrit : 9{,}90, 25, 1{,}50. */
const eur = (x) => {
  const r = Math.round(x * 100) / 100;
  return Number.isInteger(r) ? t(r) : r.toFixed(2).replace(".", "{,}");
};
const r6 = (x) => Math.round(x * 1e6) / 1e6;
/** Le premier nombre $…$ qui suit un morceau de texte. */
const apres = (texte, morceau) => {
  const i = texte.indexOf(morceau);
  if (i < 0) throw new Error(`« ${morceau} » introuvable`);
  const m = /\$([\d\\,{} ]+)\$/.exec(texte.slice(i + morceau.length));
  return nb(m[1]);
};
const L = (s) => s.length * 8.8;

/* ═════ Tous les tableaux fléchés : bas = haut × coefficient ═════ */
for (const { args } of appels("tableauCoef").filter((a) => a.args)) {
  const [titres, haut, bas, coef] = args;
  vrai(`tableauCoef ${titres} : autant de cases en haut qu'en bas`, haut.length === bas.length);
  haut.forEach((h, i) => vrai(`tableauCoef ${titres} : ${h} × ${coef} = ${bas[i]}`, Math.abs(nb(h) * nb(coef) - nb(bas[i])) < 1e-9));
}
/* ═════ Toutes les barres de partage : total ÷ n = une part, et tout tient ═════ */
for (const { args } of appels("partage").filter((a) => a.args)) {
  const [total, n, part] = args;
  vrai(`partage ${total} : ${total} ÷ ${n} = ${part}`, r6(nb(total) / n) === nb(part));
  vrai(`partage ${total} : le titre et la phrase tiennent`, L(`total : ${total}`) <= 270 && `${n} parts égales : 1 part = ${part}`.length * 7.6 <= 270);
}
/* ═════ Tables : trois colonnes au plus ═════ */
for (const { args } of appels("table").filter((a) => a.args)) {
  const [entete, lignes] = args;
  vrai(`table ${entete[0]} : 3 colonnes au plus, lignes pleines`, entete.length <= 3 && lignes.every((l) => l.length === entete.length));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [ent, lig] = dessin("tableau", 1, "figure");
  const q = ent.slice(1).map(nb), p = lig.slice(1).map(nb);
  const quot = p.map((x, i) => r6(x / q[i]));
  vrai("1. quotients égaux", quot.every((x) => x === quot[0]));
  p.forEach((x, i) => dit(1, `$${t(x)} \\div ${q[i]} = ${t(quot[i])}$`));
  dit(1, `Réponse : oui, c'est proportionnel, avec le coefficient $${t(quot[0])}$.`);
  const [, haut, bas, coef] = dessin("tableauCoef", 1);
  vrai("1. le schéma porte le tableau de l'énoncé", JSON.stringify(haut.map(nb)) === JSON.stringify(q) && JSON.stringify(bas.map(nb)) === JSON.stringify(p) && nb(coef) === quot[0]);
});
essai("2", () => {
  const [ent, lig] = dessin("tableau", 2, "figure");
  const b = ent.slice(1).map(nb), p = lig.slice(1).map(nb);
  vrai("2. une boule, puis deux, puis trois", JSON.stringify(b) === "[1,2,3]");
  const u = p[0];
  dit(2, `$2 \\times ${t(u)} = ${t(2 * u)}$ €`);
  dit(2, `Or $2$ boules coûtent $${eur(p[1])}$ €`);
  dit(2, `$3 \\times ${t(u)} = ${t(3 * u)}$ €. Or le prix est $${t(p[2])}$ €`);
  vrai("2. ce n'est pas proportionnel", p[1] !== 2 * u && p[2] !== 3 * u);
  dit(2, "Réponse : non");
  const [, lignes] = dessin("table", 2);
  vrai("2. le schéma : prix affiché et prix si proportionnel", lignes.every((l, i) => nb(l[1]) === p[i] && nb(l[2]) === u * b[i]));
});
essai("3", () => {
  const [ent, lig] = dessin("tableau", 3, "figure");
  const [g1, g2, g3, g4] = ent.slice(1).map(nb);
  const [f1, f2] = lig.slice(1).map(nb);
  vrai("3. 5 = 2 + 3 ; 10 = 2 × 5", g3 === g1 + g2 && g4 === 2 * g3);
  vrai("3. les données sont proportionnelles", f1 / g1 === f2 / g2);
  const f3 = f1 + f2, f4 = 2 * f3;
  dit(3, `$${t(f1)} + ${t(f2)} = ${t(f3)}$`);
  dit(3, `$2 \\times ${t(f3)} = ${t(f4)}$`);
  dit(3, `$${t(f1)} \\div ${g1} = ${t(f1 / g1)}$ g, et $${g4} \\times ${t(f1 / g1)} = ${t(g4 * f1 / g1)}$`);
  vrai("3. contrôle", g4 * f1 / g1 === f4);
  dit(3, `Réponse : $${t(f3)}$ g et $${t(f4)}$ g.`);
  const [, haut, bas] = dessin("tableauCoef", 3);
  vrai("3. le schéma", JSON.stringify(haut.map(nb)) === JSON.stringify([g1, g2, g3, g4]) && JSON.stringify(bas.map(nb)) === JSON.stringify([f1, f2, f3, f4]));
});
essai("4", () => {
  const p = apres(e(4), ""), b = apres(e(4), "paquets de biscuits contiennent");
  const k = b / p;
  const n1 = apres(e(4), "dans $5$".slice(0, 5)), n2 = apres(e(4), "Dans ");
  vrai("4. 5 et 7 paquets", n1 === 5 && n2 === 7);
  dit(4, `$${b} \\div ${p} = ${k}$`);
  dit(4, `$${n1} \\times ${k} = ${n1 * k}$ et $${n2} \\times ${k} = ${n2 * k}$`);
  dit(4, `$${p} \\div ${b}$`);
  dit(4, `Réponse : le coefficient est $${k}$ ; $${n1 * k}$ biscuits et $${n2 * k}$ biscuits.`);
});
essai("5", () => {
  const n = apres(e(5), ""), prix = apres(e(5), "coûtent"), m = apres(e(5), "Combien coûtent");
  const u = prix / n;
  dit(5, `$${t(prix)} \\div ${n} = ${eur(u)}$`);
  dit(5, `$${m} \\times ${eur(u)} = ${eur(m * u)}$`);
  vrai("5. un peu moins que 12 bouteilles, donc moins que 18 €", m < 2 * n && m * u < 2 * prix);
  dit(5, `moins que $${t(2 * prix)}$ €`);
  dit(5, `répondre $${t(prix + (m - n))}$ €`);
  dit(5, `Réponse : $${m}$ bouteilles coûtent $${eur(m * u)}$ €.`);
  const [total, parts, part] = dessin("partage", 5);
  vrai("5. la barre : le total et les bouteilles de l'énoncé", nb(total) === prix && parts === n && nb(part) === u);
});
essai("6", () => {
  const b = apres(e(6), "Pour"), p = apres(e(6), "elle utilise"), m = apres(e(6), "perles lui faut-il pour");
  const u = p / b;
  dit(6, `$${p} \\div ${b} = ${u}$`);
  dit(6, `$${m} \\times ${u} = ${m * u}$`);
  dit(6, `plus que $${2 * p}$ perles`);
  dit(6, `Réponse : il lui faut $${m * u}$ perles.`);
  const [, haut, bas] = dessin("tableauCoef", 6);
  vrai("6. le schéma", JSON.stringify(haut.map(nb)) === JSON.stringify([b, 1, m]) && JSON.stringify(bas.map(nb)) === JSON.stringify([p, u, m * u]));
});
essai("7", () => {
  const [ent, lig] = dessin("tableau", 7, "figure");
  const c = ent.slice(1), k = lig.slice(1);
  vrai("7. cases vides : 2e en haut, 3e en bas", c[1] === "?" && k[2] === "?");
  const coef = nb(k[0]) / nb(c[0]);
  dit(7, `$${nb(k[0])} \\div ${nb(c[0])} = ${coef}$`);
  dit(7, `$${nb(c[2])} \\times ${coef} = ${nb(c[2]) * coef}$`);
  dit(7, `$${nb(k[1])} \\div ${coef} = ${nb(k[1]) / coef}$`);
  dit(7, `Réponse : $${nb(k[1]) / coef}$ caisses et $${nb(c[2]) * coef}$ kg.`);
  vrai("7. un nombre entier de caisses", Number.isInteger(nb(k[1]) / coef));
});
essai("8", () => {
  const n = apres(e(8), ""), p = apres(e(8), "coûtent");
  for (const [m, x] of [[6, 2], [9, 3], [12, 4]]) {
    vrai(`8. ${m} = ${x} × ${n}`, m === x * n);
    enonceDit(8, `$${m}$ tickets`);
    dit(8, `$${x} \\times ${eur(p)} = ${eur(x * p)}$`);
  }
  dit(8, `$${eur(2 * p)} + ${eur(2 * p)} = ${eur(4 * p)}$`);
  dit(8, `Réponse : $${eur(2 * p)}$ €, $${eur(3 * p)}$ € et $${eur(4 * p)}$ €.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const a = apres(e(9), "Tarif A :"), casque = apres(e(9), "Tarif B :"), b = apres(e(9), "pour le casque, puis");
  const A = (h) => h * a, B = (h) => casque + h * b;
  const [, lignesF] = dessin("table", 9, "figure");
  const heures = lignesF.map((l) => nb(l[0]));
  heures.forEach((h) => {
    dit(9, `$${h} \\times ${a} = ${A(h)}$`);
    dit(9, `$${casque} + ${h * b} = ${B(h)}$`);
  });
  vrai("9. B n'est pas proportionnel", B(2) !== 2 * B(1));
  dit(9, `$1$ h coûte $${B(1)}$ €, mais $2$ h ne coûtent pas $${2 * B(1)}$ €`);
  vrai("9. A pour 4 h, B pour 6 h", A(4) < B(4) && B(6) < A(6));
  dit(9, `Pour $4$ h : A coûte $${A(4)}$ €, B coûte $${B(4)}$ €`);
  dit(9, `Pour $6$ h : A coûte $${A(6)}$ €, B coûte $${B(6)}$ €`);
  const [, lignesS] = dessin("table", 9, "schema");
  vrai("9. le tableau rempli", lignesS.every((l, i) => nb(l[0]) === heures[i] && nb(l[1]) === A(heures[i]) && nb(l[2]) === B(heures[i])));
});
essai("10", () => {
  const [entete, lignes] = dessin("table", 10, "figure");
  const base = [nb(entete[1]), ...lignes.map((l) => nb(l[1]))];
  const demi = base.map((x) => x / 2);
  const six = base.map((x, i) => x + demi[i]), dix = base.map((x, i) => 2 * x + demi[i]);
  vrai("10. 6 et 10 personnes demandées", e(10).includes(`$${six[0]}$ personnes`) && e(10).includes(`$${dix[0]}$ personnes`));
  dit(10, `$${t(demi[1])}$ carottes, $${t(demi[2])}$ poireau, $${t(demi[3])}$ L d'eau`);
  const u = [" carottes", " poireaux", " L"];
  for (const i of [1, 2, 3]) {
    dit(10, `$${t(base[i])} + ${t(demi[i])} = ${t(six[i])}$${u[i - 1]}`);
    dit(10, `$${t(base[i])} + ${t(base[i])} + ${t(demi[i])} = ${t(dix[i])}$${u[i - 1]}`);
  }
  dit(10, `Réponse : $6$ personnes, $${t(six[1])}$ carottes, $${t(six[2])}$ poireaux, $${t(six[3])}$ L.`);
  dit(10, `$10$ personnes, $${t(dix[1])}$ carottes, $${t(dix[2])}$ poireaux, $${t(dix[3])}$ L.`);
  const [, sch] = dessin("table", 10, "schema");
  vrai("10. le schéma", sch.every((l, i) => nb(l[1]) === six[i + 1] && nb(l[2]) === dix[i + 1] && l[0] === lignes[i][0]));
});
essai("11", () => {
  const ta = apres(e(11), "Pour"), po = apres(e(11), "il faut"), m = apres(e(11), "« ");
  const u = po / ta;
  enonceDit(11, `c'est $${m - ta}$ tartes de plus. Donc il faut $${m - ta}$ pommes de plus : $${po + m - ta}$ pommes.`);
  dit(11, `$${po} \\div ${ta} = ${u}$`);
  dit(11, `$${m} \\times ${u} = ${m * u}$`);
  dit(11, `$${m - ta} \\times ${u} = ${(m - ta) * u}$ pommes de plus. Et $${po} + ${(m - ta) * u} = ${m * u}$`);
  dit(11, `Réponse : il faut $${m * u}$ pommes.`);
});
essai("12", () => {
  const g1 = apres(e(12), "gâteaux de"), p1 = apres(e(12), "g coûte"), g2 = apres(e(12), "Un paquet de"), p2 = apres(e(12), `$${g2}$ g coûte`);
  const c1 = p1 / (g1 / 100), c2 = p2 / (g2 / 100);
  dit(12, `$${eur(p1)} \\div ${g1 / 100} = ${eur(c1)}$`);
  dit(12, `$${eur(p2)} \\div ${g2 / 100} = ${eur(c2)}$`);
  vrai("12. le grand paquet est moins cher", c2 < c1);
  dit(12, `Réponse : le paquet de $${g2}$ g est le moins cher.`);
  const [, lignes] = dessin("table", 12);
  vrai("12. le tableau", nb(lignes[0][0]) === g1 && nb(lignes[0][1]) === p1 && nb(lignes[0][2]) === r6(c1) && nb(lignes[1][0]) === g2 && nb(lignes[1][1]) === p2 && nb(lignes[1][2]) === r6(c2));
});
essai("13", () => {
  const [ent, lig] = dessin("tableau", 13, "figure");
  const m = ent.slice(1).map(nb), a = lig.slice(1);
  const k = nb(a[0]) / m[0];
  const a2 = m[1] * k, a3 = m[2] * k;
  dit(13, `$${m[1] / m[0]} \\times ${nb(a[0])} = ${a2}$ cm`);
  dit(13, `$${nb(a[0])} \\div 2 = ${a3}$ cm`);
  vrai("13. 50 est la moitié de 100", m[2] * 2 === m[0]);
  const cible = nb(a[3]);
  vrai("13. 7 = 6 + 1", a2 + a3 === cible);
  dit(13, `$${m[1]} + ${m[2]} = ${m[1] + m[2]}$ g`);
  vrai("13. contrôle", r6((m[1] + m[2]) * k) === cible);
  dit(13, `Réponse : $${a2}$ cm ; $${a3}$ cm ; $${m[1] + m[2]}$ g.`);
  const [, lignes] = dessin("table", 13);
  vrai("13. le schéma", lignes.every((l) => r6(nb(l[0]) * k) === nb(l[1])));
});
essai("14", () => {
  const kg = apres(e(14), ""), p = apres(e(14), "coûtent");
  const u = p / kg;
  dit(14, `$${eur(p)} \\div ${kg} = ${eur(u)}$`);
  dit(14, `$3 \\times ${eur(u)} = ${eur(3 * u)}$ € et $5 \\times ${eur(u)} = ${eur(5 * u)}$ €`);
  const budget = apres(e(14), "Avec");
  vrai("14. 9 € = le prix de 5 kg", r6(5 * u) === budget);
  dit(14, `$${t(budget)} \\div ${eur(u)} = ${t(budget / u)}$`);
  dit(14, `Réponse : $${eur(u)}$ € ; $${eur(3 * u)}$ € et $${eur(5 * u)}$ € ; $${t(r6(budget / u))}$ kg.`);
});
essai("15", () => {
  const d = apres(e(15), "allure :"), m = apres(e(15), "cm en");
  const u = d / m;
  dit(15, `$${d} \\div ${m} = ${t(u)}$`);
  dit(15, `$10 \\times ${t(u)} = ${t(10 * u)}$ cm`);
  dit(15, `$60 \\times ${t(u)} = ${t(60 * u)}$ cm`);
  dit(15, `$${t(60 * u)}$ cm $= ${t(60 * u / 100)}$ m`);
  dit(15, `Réponse : $${t(u)}$ cm ; $${t(10 * u)}$ cm ; $${t(60 * u)}$ cm, soit $${t(60 * u / 100)}$ m.`);
});
essai("16", () => {
  const d = apres(e(16), "pelouse en");
  enonceDit(16, `il faudra $${2 * d}$ minutes`);
  dit(16, `$${d} \\div 2 = ${d / 2}$ minutes`);
  dit(16, `$${d} \\div 3 = ${d / 3}$ minutes`);
  dit(16, `Réponse : Léna a tort ; $${d / 2}$ minutes à $2$, $${d / 3}$ minutes à $3$.`);
  const [, lignes] = dessin("table", 16);
  vrai("16. le tableau : durée = 60 ÷ jardiniers", lignes.every((l) => nb(l[1]) === d / nb(l[0])));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const el = apres(e(17), "chacun des"), s = apres(e(17), "Pour"), g = apres(e(17), "baguette et");
  const pb = apres(e(17), "Une baguette coûte"), pf = apres(e(17), "Le fromage coûte");
  const k = el / s;
  dit(17, `$${el} \\div ${s} = ${k}$. Il faut $${k}$ baguettes`);
  dit(17, `$${k} \\times ${g} = ${k * g}$ g`);
  const pain = k * pb, from = (k * g / 100) * pf, tot = pain + from;
  dit(17, `$${k} \\times ${eur(pb)} = ${eur(pain)}$ €`);
  dit(17, `$${k * g / 100} \\times ${eur(pf)} = ${eur(from)}$ €`);
  dit(17, `$${eur(pain)} + ${eur(from)} = ${eur(tot)}$ €`);
  dit(17, `$${eur(tot)} \\div ${el} = ${eur(tot / el)}$ €`);
  vrai("17. un prix par élève exact au centime", r6(tot / el * 100) === Math.round(tot / el * 100));
  dit(17, `Réponse : $${k}$ baguettes ; $${k * g}$ g ; $${eur(tot)}$ € ; $${eur(tot / el)}$ € par élève.`);
  const [, haut, bas] = dessin("tableauCoef", 17);
  vrai("17. le schéma", nb(haut[0]) === s && nb(haut[1]) === el && nb(bas[0]) === g && nb(bas[1]) === k * g);
});
essai("18", () => {
  const m = apres(e(18), "le vélo avance de");
  const tours = [10, 50, 500];
  tours.forEach((n) => enonceDit(18, `$${n}$ tours`));
  tours.forEach((n) => dit(18, `$${n} \\times ${m} = ${t(n * m)}$ m`));
  dit(18, `il faut $${1000 / m}$ tours`);
  const soir = apres(e(18), "la roue a fait");
  dit(18, `$${t(soir)} \\times ${m} = ${t(soir * m)}$ m, soit $${t(soir * m / 1000)}$ km`);
  dit(18, `Réponse : $${t(10 * m)}$ m, $${t(50 * m)}$ m, $${t(500 * m)}$ m ; $${1000 / m}$ tours ; $${t(soir * m / 1000)}$ km.`);
  const [, haut, bas] = dessin("tableauCoef", 18);
  vrai("18. le schéma", JSON.stringify(haut.map(nb)) === JSON.stringify([1, ...tours, soir]));
  vrai("18. le schéma (bas)", JSON.stringify(bas.map(nb)) === JSON.stringify([m, ...tours.map((n) => n * m), soir * m]));
});
essai("19", () => {
  const p = apres(e(19), "l'essence coûte"), b = apres(e(19), "Avec"), l = apres(e(19), "consomme"), km = apres(e(19), "L pour faire");
  dit(19, `$10 \\times ${eur(p)} = ${eur(10 * p)}$ € et $45 \\times ${eur(p)} = ${eur(45 * p)}$ €`);
  const litres = r6(b / p);
  dit(19, `$${t(b)} \\div ${eur(p)} = ${t(litres)}$ L`);
  dit(19, `$${t(litres)} \\times ${eur(p)} = ${t(b)}$`);
  vrai("19. 15 L = 3 × 5 L", litres === 3 * l);
  dit(19, `$3 \\times ${km} = ${3 * km}$ km`);
  dit(19, `Réponse : $${eur(10 * p)}$ € et $${eur(45 * p)}$ € ; $${t(litres)}$ L ; $${3 * km}$ km.`);
  const [, haut, bas] = dessin("tableauCoef", 19);
  vrai("19. le schéma", JSON.stringify(haut.map(nb)) === JSON.stringify([1, 10, 45, litres]) && nb(bas[3]) === b);
});
essai("20", () => {
  const a = apres(e(20), "Tarif A :"), carte = apres(e(20), "une carte à"), b = apres(e(20), "€, puis");
  const A = (n) => n * a, B = (n) => carte + n * b;
  dit(20, `Tarif A : $5 \\times ${a} = ${A(5)}$ €. Tarif B : $${carte} + 5 \\times ${b} = ${B(5)}$ €`);
  for (const n of [8, 10, 12]) {
    dit(20, `$${n} \\times ${a} = ${A(n)}$`);
    dit(20, `$${carte} + ${n} \\times ${b} = ${B(n)}$`);
  }
  let seuil = null;
  for (let n = 1; n < 100; n++) if (B(n) < A(n)) { seuil = n; break; }
  vrai("20. B moins cher à partir de 11", seuil === 11 && A(10) === B(10));
  dit(20, `A, $${seuil} \\times ${a} = ${A(seuil)}$ € ; B, $${carte} + ${seuil} \\times ${b} = ${B(seuil)}$ €`);
  dit(20, `Réponse : $${A(5)}$ € et $${B(5)}$ € ; A ; B devient moins cher à partir de $${seuil}$ séances.`);
  const [, lignes] = dessin("table", 20);
  vrai("20. le tableau des deux tarifs", lignes.every((l) => nb(l[1]) === A(nb(l[0])) && nb(l[2]) === B(nb(l[0]))));
});

f.fin();
