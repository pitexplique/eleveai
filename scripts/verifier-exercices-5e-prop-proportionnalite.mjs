// Recalcul indépendant de la feuille « La proportionnalité » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-prop-proportionnalite.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (tableau, table,
// tableauCoef, repere), jamais recopiés ici : le script calcule les quotients,
// le coefficient, les cases manquantes, puis cherche la réponse écrite dans le
// corrigé. Chaque `tableauCoef` de la feuille est aussi contrôlé colonne par
// colonne : bas = haut × coefficient écrit.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-prop-proportionnalite.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-prop-proportionnalite.tsx", "prop_proportionnalite", ["tableauCoef", "table"]);
const { e, vrai, verif, dit, enonceDit, dessin, dessins, appels, essai } = f;

/** « 2 400 », « 2,40 », « !45 », « 35 g », « 2{,}5 » → nombre (NaN si ce n'en est pas un). */
const nb = (s) => Number(String(s).replace(/^!/, "").replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", ".").replace(/[a-zA-Z€]+$/, ""));
/** Un prix comme la feuille l'écrit : 9{,}90, 25, 1{,}20. */
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
/** La pente d'une droite `pts: [[0, 0], [x, y]]` relue dans un repère. */
const pente = (courbe) => {
  const [[x0, y0], [x1, y1]] = courbe.pts;
  vrai("droite par l'origine", x0 === 0 && y0 === 0);
  return (y1 - y0) / (x1 - x0);
};

/* ═════ Tous les tableaux fléchés : bas = haut × coefficient ═════ */
for (const { args } of appels("tableauCoef").filter((a) => a.args)) {
  const [titres, haut, bas, coef] = args;
  vrai(`tableauCoef ${titres} : autant de cases en haut qu'en bas`, haut.length === bas.length);
  haut.forEach((h, i) => vrai(`tableauCoef ${titres} : ${h} × ${coef} = ${bas[i]}`, Math.abs(nb(h) * nb(coef) - nb(bas[i])) < 1e-9));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [ent, lig] = dessin("tableau", 1, "figure");
  const q = ent.slice(1).map(nb), p = lig.slice(1).map(nb);
  const quot = p.map((x, i) => r6(x / q[i]));
  vrai("1. quotients égaux", quot.every((x) => x === quot[0]));
  p.forEach((x, i) => dit(1, `$${eur(x)} \\div ${q[i]} = ${eur(quot[i])}$`));
  dit(1, `Le coefficient est $${t(quot[0])}$`);
  dit(1, `Réponse : oui, le prix est proportionnel, avec le coefficient $${t(quot[0])}$.`);
  const [, haut, bas, coef] = dessin("tableauCoef", 1);
  vrai("1. le schéma porte le tableau de l'énoncé", JSON.stringify(haut.map(nb)) === JSON.stringify(q) && JSON.stringify(bas.map(nb)) === JSON.stringify(p) && nb(coef) === quot[0]);
});
essai("2", () => {
  const [ent, lig] = dessin("tableau", 2, "figure");
  const a = ent.slice(1).map(nb), b = lig.slice(1).map(nb);
  vrai("2. l'âge de Léa double de la 1re à la 2e colonne", a[1] === 2 * a[0]);
  dit(2, `$${b[0]} \\times 2 = ${2 * b[0]}$`);
  dit(2, `Or il a $${b[1]}$ ans`);
  vrai("2. le frère ne double pas", b[1] !== 2 * b[0]);
  const ecarts = b.map((x, i) => x - a[i]);
  vrai("2. écart constant", ecarts.every((x) => x === ecarts[0]));
  dit(2, `le frère a toujours $${ecarts[0]}$ ans de plus`);
  dit(2, "Réponse : non");
  const [, l2] = dessin("tableau", 2, "schema");
  vrai("2. le schéma porte les écarts", JSON.stringify(l2.slice(1).map(nb)) === JSON.stringify(ecarts));
});
essai("3", () => {
  const [ent, lig] = dessin("tableau", 3, "figure");
  const [t1, t2, t3, t4] = ent.slice(1).map(nb);
  const d1 = nb(lig[1]);
  vrai("3. 6 = 3 × 2 ; 8 = 2 + 6 ; 16 = 2 × 8", t2 === 3 * t1 && t3 === t1 + t2 && t4 === 2 * t3);
  const coef = d1 / t1;
  const [d2, d3, d4] = [t2, t3, t4].map((x) => x * coef);
  dit(3, `$3 \\times ${t(d1)} = ${t(d2)}$`);
  dit(3, `$${t(d1)} + ${t(d2)} = ${t(d3)}$`);
  dit(3, `$2 \\times ${t(d3)} = ${t(d4)}$`);
  dit(3, `$${t(d1)} \\div ${t1} = ${t(coef)}$`);
  dit(3, `Réponse : $${t(d2)}$ m, $${t(d3)}$ m et $${t(d4)}$ m.`);
  const [, haut, bas] = dessin("tableauCoef", 3);
  vrai("3. le schéma : les cases trouvées", JSON.stringify(bas.map(nb)) === JSON.stringify([d1, d2, d3, d4]) && JSON.stringify(haut.map(nb)) === JSON.stringify([t1, t2, t3, t4]));
});
essai("4", () => {
  const duree = apres(e(4), "En "), vol = apres(e(4), "il coule "), d2 = apres(e(4), "coule en ");
  const coef = vol / duree;
  dit(4, `$${vol} \\div ${duree} = ${t(coef)}$`);
  dit(4, `$${d2} \\times ${t(coef)} = ${t(d2 * coef)}$`);
  dit(4, `Réponse : le coefficient est $${t(coef)}$, soit $${t(coef)}$ L par minute ; en $${d2}$ minutes, il coule $${t(d2 * coef)}$ L.`);
});
essai("5", () => {
  const n = apres(e(5), "Un pack de"), prix = apres(e(5), "briques de lait coûte"), m = apres(e(5), "Combien coûtent");
  const u = prix / n;
  dit(5, `$${eur(prix)} \\div ${n} = ${eur(u)}$`);
  dit(5, `$${m} \\times ${eur(u)} = ${eur(m * u)}$`);
  dit(5, `$2 \\times ${eur(prix)} = ${eur(2 * prix)}$`);
  vrai("5. un peu moins que le double", m * u < 2 * prix);
  dit(5, `répondre $${eur(prix + (m - n))}$ €`);
  dit(5, `Réponse : $${m}$ briques coûtent $${eur(m * u)}$ €.`);
});
essai("6", () => {
  const L = apres(e(6), "consomme"), km = apres(e(6), "L d'essence pour"), a = apres(e(6), "consomme-t-elle pour"), b = apres(e(6), "b) Pour");
  vrai("6. 50 et 250 dans l'énoncé", e(6).includes("$50$ km ?") && e(6).includes("$250$ km ?") && a === 50);
  vrai("6. 250 = 100 + 100 + 50", b === km + km + a);
  const la = (a / km) * L, lb = (b / km) * L;
  dit(6, `soit $${t(la)}$ L`);
  dit(6, `$${L} + ${L} + ${t(la)} = ${t(lb)}$ L`);
  dit(6, `$2{,}5 \\times ${L} = ${t(lb)}$`);
  dit(6, `Réponse : $${t(la)}$ L pour $${a}$ km, $${t(lb)}$ L pour $${b}$ km.`);
});
essai("7", () => {
  const [, lig] = dessin("tableau", 7, "figure");
  const [ent] = dessin("tableau", 7, "figure");
  const r = ent.slice(1), m = lig.slice(1);
  const coef = nb(m[0]) / nb(r[0]);
  dit(7, `$${nb(m[0])} \\div ${nb(r[0])} = ${t(coef)}$`);
  dit(7, `$${nb(r[2])} \\times ${t(coef)} = ${t(nb(r[2]) * coef)}$`);
  dit(7, `$${nb(m[1])} \\div ${t(coef)} = ${t(nb(m[1]) / coef)}$`);
  vrai("7. cases vides : ? en 2e colonne haut et 3e colonne bas", r[1] === "?" && m[2] === "?");
  dit(7, `les cases valent $${t(nb(m[1]) / coef)}$ ruches et $${t(nb(r[2]) * coef)}$ kg`);
});
essai("8", () => {
  const [cadre, courbes] = dessin("repere", 8, "figure");
  const k = pente(courbes[0]);
  dit(8, `sur l'axe vertical : $${t(3 * k)}$ €`);
  dit(8, `puis je descends : $${t(8 / k)}$ kg`);
  dit(8, `$${t(3 * k)} \\div 3 = ${t(k)}$`);
  dit(8, `Réponse : $${t(3 * k)}$ € ; $${t(8 / k)}$ kg ; oui, avec le coefficient $${t(k)}$`);
  vrai("8. 8 € tombe dans le cadre", 8 <= cadre[3] && 8 / k <= cadre[1]);
  const [, , marques] = dessin("repere", 8, "schema");
  vrai("8. les points marqués sont sur la droite", marques.every((p) => p.y === k * p.x && p.label === `(${p.x} ; ${p.y})`));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [A, B] = dessins("tableau", 9).map((d) => d.args);
  const q = (tab) => tab[1].slice(1).map((x, i) => r6(nb(x) / nb(tab[0][i + 1])));
  const qa = q(A), qb = q(B);
  vrai("9. A proportionnel, B non", qa.every((x) => x === qa[0]) && !qb.every((x) => x === qb[0]));
  dit(9, `$${nb(B[1][2])} \\div ${nb(B[0][2])} = ${t(qb[1])}$`);
  dit(9, `$${nb(B[1][3])} \\div ${nb(B[0][3])} = ${t(qb[2])}$`);
  dit(9, `revient à $${eur(qb[2])}$ €`);
  const eco = nb(A[1][3]) - nb(B[1][3]);
  dit(9, `$${nb(A[1][3])} - ${nb(B[1][3])} = ${eco}$`);
  dit(9, `Réponse : A oui, B non ; $${eur(qb[2])}$ € l'entrée ; Mia économise $${eco}$ €.`);
});
essai("10", () => {
  const [ent, lig] = dessin("tableau", 10, "figure");
  const coef = nb(lig[1]);
  enonceDit(10, `environ $${coef}$ g de sel par litre`);
  const v = ent.slice(2).map(nb);
  const g = v.map((x) => x * coef);
  v.forEach((x, i) => dit(10, `$${t(x)} \\times ${coef} = ${t(g[i])}$`));
  dit(10, `Réponse : $${t(g[0])}$ g ; $${t(g[1] / 1000)}$ kg ; $${t(g[2] / 1000)}$ kg.`);
  vrai("10. les cases à trouver : g, kg, kg", lig[2] === "? g" && lig[3] === "? kg" && lig[4] === "? kg");
  const [, haut, bas] = dessin("tableauCoef", 10);
  vrai("10. le schéma porte les volumes et les grammes", JSON.stringify(haut.slice(1).map(nb)) === JSON.stringify(v) && JSON.stringify(bas.slice(1).map(nb)) === JSON.stringify(g));
});
essai("11", () => {
  const m = apres(e(11), "vend au mètre."), p = apres(e(11), "de corde coûtent"), m2 = apres(e(11), "de $6$ m à");
  const coef = p / m;
  dit(11, `$${p} \\div ${m} = ${t(coef)}$`);
  dit(11, `$${m2} \\times ${t(coef)} = ${t(m2 * coef)}$`);
  dit(11, `$${p} \\div 3 = ${t(p / 3)}$`);
  dit(11, `$5 \\times ${t(p / 3)} = ${t(5 * p / 3)}$`);
  dit(11, `$4 \\times ${t(coef)} = ${t(4 * coef)}$`);
  const sami = p + (m2 - m);
  enonceDit(11, `$${m2}$ m coûtent $${sami}$ €`);
  dit(11, `$${eur(sami / m2)}$ € le mètre`);
  dit(11, `$${p} \\div ${m} = ${eur(coef)}$ € le mètre`);
  dit(11, `Réponse : $${m2}$ m de corde coûtent $${t(m2 * coef)}$ €.`);
});
essai("12", () => {
  const [entete, lignes] = dessin("table", 12, "figure");
  // base[0] = le nombre de verres, puis bananes, lait, fraises (relus dans la recette).
  const base = [nb(entete[1]), ...lignes.map((l) => nb(l[1]))];
  const moitie = base.map((x) => x / 2);
  dit(12, `$${t(moitie[1])}$ banane, $${t(moitie[2])}$ mL de lait, $${t(moitie[3])}$ g de fraises`);
  const six = base.map((x, i) => x + moitie[i]), dix = base.map((x, i) => 2 * x + moitie[i]);
  vrai("12. 6 et 10 verres demandés", e(12).includes(`$${six[0]}$ verres`) && e(12).includes(`$${dix[0]}$ verres`));
  const unites = ["", " bananes", " mL", " g"];
  for (const i of [1, 2, 3]) {
    dit(12, `$${base[i]} + ${moitie[i]} = ${six[i]}$${unites[i]}`);
    dit(12, `$${base[i]} + ${base[i]} + ${moitie[i]} = ${dix[i]}$${unites[i]}`);
  }
  dit(12, `Réponse : pour $6$ verres, $${six[1]}$ bananes, $${six[2]}$ mL et $${six[3]}$ g ; pour $10$ verres, $${dix[1]}$ bananes, $${dix[2]}$ mL et $${dix[3]}$ g.`);
  const [schEnt, sch] = dessin("table", 12, "schema");
  vrai("12. le schéma : 6 et 10 verres", nb(schEnt[1]) === six[0] && nb(schEnt[2]) === dix[0] && sch.every((l, i) => nb(l[1]) === six[i + 1] && nb(l[2]) === dix[i + 1] && l[0] === lignes[i][0]));
});
essai("13", () => {
  const [, courbes] = dessin("repere", 13, "figure");
  const [ka, kn] = courbes.map(pente);
  const D = apres(e(13), "Le refuge est à");
  dit(13, `Aya : $${t(2 * ka)}$ km. Noé : $${t(2 * kn)}$ km.`);
  dit(13, `Aya : $${t(2 * ka)} \\div 2 = ${t(ka)}$. Noé : $${t(2 * kn)} \\div 2 = ${t(kn)}$.`);
  dit(13, `Aya : $${D} \\div ${t(ka)} = ${t(D / ka)}$ h. Noé : $${D} \\div ${t(kn)} = ${t(D / kn)}$ h.`);
  vrai("13. Noé arrive une heure après", D / kn - D / ka === 1);
  vrai("13. la couleur orange est Noé (le plus lent)", courbes[1].couleur === f.constantes.ORANGE && kn < ka);
});
essai("14", () => {
  const forfait = apres(e(14), "fait payer"), h = apres(e(14), "la pagaie, puis");
  const [ent, lig] = dessin("tableau", 14, "figure");
  ent.slice(1).forEach((d, i) => vrai(`14. ${d} h → ${lig[i + 1]} €`, forfait + h * nb(d) === nb(lig[i + 1])));
  dit(14, `$${forfait} + ${h} = ${forfait + h}$`);
  dit(14, `$${forfait} + 2 \\times ${h} = ${forfait + 2 * h}$`);
  dit(14, `$2 \\times ${forfait + h} = ${2 * (forfait + h)}$`);
  dit(14, `$${forfait} + 4 \\times ${h} = ${forfait + 4 * h}$`);
  vrai("14. Léo trouve le double de 17", e(14).includes(`$${2 * (forfait + 2 * h)}$ €`));
  dit(14, `Réponse : non, ce n'est pas proportionnel ; $4$ h coûtent $${forfait + 4 * h}$ €.`);
  const [, l2] = dessin("tableau", 14, "schema");
  vrai("14. le schéma : 4 h", nb(l2[3]) === forfait + 4 * h);
});
essai("15", () => {
  const g = apres(e(15), "un paquet de riz de"), p1 = apres(e(15), "g coûte"), kg = apres(e(15), "un sac de"), p2 = apres(e(15), "kg coûte");
  const n = (kg * 1000) / g;
  dit(15, `soit $${n}$ paquets`);
  dit(15, `$${n} \\times ${eur(p1)} = ${eur(n * p1)}$`);
  vrai("15. le grand sac est moins cher", p2 < n * p1);
  dit(15, `$2 \\times ${eur(p1)} = ${eur(2 * p1)}$`);
  dit(15, `$${eur(p2)} \\div ${kg} = ${eur(p2 / kg)}$`);
  dit(15, `Réponse : le sac de $${kg}$ kg est le plus avantageux.`);
});
essai("16", () => {
  const n1 = apres(e(16), "même prix."), p1 = apres(e(16), "plants coûtent"), n2 = apres(e(16), "€ et"), p2 = apres(e(16), `$${n2}$ plants coûtent`);
  vrai("16. même prix d'un plant", r6(p1 / n1) === r6(p2 / n2));
  dit(16, `$${eur(p1)} + ${eur(p2)} = ${eur(p1 + p2)}$`);
  dit(16, `$${eur(p1)} - ${eur(p2)} = ${eur(p1 - p2)}$`);
  dit(16, `$${eur(p1 - p2)} - ${eur(p2)} = ${eur(p1 - 2 * p2)}$`);
  vrai("16. 1 = 4 − 3 = (7 − 3) − 3", n1 - 2 * n2 === 1);
  dit(16, `Réponse : $${eur(p1 + p2)}$ € ; $${eur(p1 - p2)}$ € ; un plant coûte $${eur(p1 - 2 * p2)}$ €.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const kg = apres(e(17), "d'un village,"), L = apres(e(17), "kg de pommes donnent"), fam = apres(e(17), "Une famille apporte"), veut = apres(e(17), "Un voisin veut"), cl = apres(e(17), "bouteilles de");
  const c = L / kg;
  dit(17, `$${L} \\div ${kg} = ${t(c)}$`);
  dit(17, `$${fam} \\times ${t(c)} = ${t(fam * c)}$`);
  dit(17, `$${veut} \\div ${t(c)} = ${t(veut / c)}$`);
  const cL = fam * c * 100;
  dit(17, `$${t(fam * c)}$ L $= ${t(cL)}$ cL`);
  dit(17, `$${t(cL)} \\div ${cl} = ${t(cL / cl)}$`);
  dit(17, `Réponse : $${t(c)}$ L ; $${t(fam * c)}$ L ; $${t(veut / c)}$ kg ; $${t(cL / cl)}$ bouteilles.`);
  vrai("17. un nombre entier de bouteilles", Number.isInteger(cL / cl));
});
essai("18", () => {
  const L = apres(e(18), "goutte perd"), min = apres(e(18), "d'eau en"), jours = apres(e(18), "soit"), douche = apres(e(18), "utilise");
  const h = (60 / min) * L, j = 24 * h, an = jours * j;
  dit(18, `$3 \\times ${t(L)} = ${t(h)}$ L`);
  dit(18, `$24 \\times ${t(h)} = ${t(j)}$ L`);
  dit(18, `$${jours} \\times ${t(j)} = ${t(an)}$ L`);
  dit(18, `$${t(an)} \\div ${douche} = ${t(an / douche)}$`);
  dit(18, `Réponse : $${t(h)}$ L ; $${t(j)}$ L ; $${t(an)}$ L ; $${t(an / douche)}$ douches.`);
  const d4 = [apres(e(4), "En "), apres(e(4), "il coule ")];
  vrai("18. la douche de l'exercice 4 : 5 minutes, 60 L", d4[0] === 5 && d4[1] === douche);
  const [, lignes] = dessin("table", 18);
  vrai("18. le schéma", JSON.stringify(lignes.map((l) => nb(l[1]))) === JSON.stringify([L, h, j, an]));
});
essai("19", () => {
  const a = apres(e(19), "Tarif A :"), frais = apres(e(19), "Tarif B :"), b = apres(e(19), "d'envoi, puis");
  const A = (n) => r6(n * a), B = (n) => r6(frais + n * b);
  for (const n of [10, 40, 100]) {
    dit(19, `$${n} \\times ${eur(a)} = ${eur(A(n))}$ €`);
    dit(19, `$${frais} + ${n} \\times ${eur(b)} = ${eur(B(n))}$ €`);
  }
  vrai("19. A moins cher à 40, B à 100", A(40) < B(40) && B(100) < A(100));
  let seuil = null;
  for (let n = 0; n <= 1000; n++) if (A(n) === B(n)) { seuil = n; break; }
  vrai(`19. même prix pour ${seuil} photos`, seuil === 60);
  dit(19, `$${frais} \\div ${eur(r6(a - b))} = ${seuil}$`);
  dit(19, `A, $${seuil} \\times ${eur(a)} = ${eur(A(seuil))}$ € ; B, $${frais} + ${seuil} \\times ${eur(b)} = ${eur(B(seuil))}$ €`);
  dit(19, `les deux coûtent $${eur(A(seuil))}$ € pour $${seuil}$ photos`);
  const [, lignes] = dessin("table", 19);
  vrai("19. le tableau des deux tarifs", lignes.every((l) => nb(l[1]) === A(nb(l[0])) && nb(l[2]) === B(nb(l[0]))));
});
essai("20", () => {
  const n = apres(e(20), "compte ses pas :"), m = apres(e(20), "pas mesurent"), tour = apres(e(20), "piste d'athlétisme mesure"), montre = apres(e(20), "a compté"), km = apres(e(20), "Il veut marcher");
  const p = m / n;
  dit(20, `$${m} \\div ${n} = ${t(p)}$`);
  dit(20, `soit $${t(p * 100)}$ cm`);
  dit(20, `$${tour} \\div ${t(p)} = ${t(tour / p)}$ pas`);
  dit(20, `$${t(montre)} \\times ${t(p)} = ${t(montre * p)}$ m, soit $${t((montre * p) / 1000)}$ km`);
  dit(20, `$${t(km * 1000)} \\div ${t(p)} = ${t((km * 1000) / p)}$ pas`);
  dit(20, `$${t((km * 1000) / tour)} \\times ${t(tour / p)} = ${t((km * 1000) / p)}$`);
  dit(20, `Réponse : $${t(p)}$ m soit $${t(p * 100)}$ cm ; $${t(tour / p)}$ pas ; $${t((montre * p) / 1000)}$ km ; $${t((km * 1000) / p)}$ pas.`);
  const [, haut, bas] = dessin("tableauCoef", 20);
  vrai("20. le schéma porte les quatre questions", JSON.stringify(haut.map(nb)) === JSON.stringify([n, 1, tour / p, montre, (km * 1000) / p]) && JSON.stringify(bas.map(nb)) === JSON.stringify([m, p, tour, montre * p, km * 1000]));
});

f.fin();
