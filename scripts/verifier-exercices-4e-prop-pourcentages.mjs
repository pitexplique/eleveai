// Recalcul indépendant de la feuille « Pourcentages : de tête, coefficient,
// évolutions » de 4e (02/10/2026) : lib/fiches-exercices/maths-4e-prop-pourcentages.tsx.
//
// ⭐ Deux étages :
//   1. TOUTE égalité numérique d'un corrigé (« $a = b = c$ », sans lettre) est
//      lue et ses membres comparés en fractions exactes ; « 12 % » s'y lit
//      12/100, si bien que « $0{,}36 = 36\,\%$ » est contrôlé aussi ;
//   2. chaque exercice est RECALCULÉ à partir des nombres de son énoncé (jamais
//      recopiés ici) ou des arguments de ses dessins (dix, fleche, pourcents,
//      evolution, camembert, tableau, table), et le corrigé doit écrire ce que le
//      script trouve, « Réponse : » comprise.
// Chaque dessin est aussi contrôlé pour lui-même (dixième = total ÷ 10, départ ×
// coefficient = arrivée, étape = précédente × (1 + taux ÷ 100), camembert à
// 100 %), et ses textes doivent tenir dans le cadre (8,8 par signe en corps 14
// gras, 9 en corps 15).
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-4e-prop-pourcentages.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";
import { evalTex, Q, egal } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-4e-prop-pourcentages.tsx", "prop_pourcentages", ["dix", "fleche", "pourcents", "evolution", "camembert", "table"], "4e");
const { e, vrai, dit, enonceDit, dessin, appels, essai, feuille } = f;

/** « 1 040 € », « 7,5 L », « 2{,}5 », « 1\,200 », « × 0,94 » → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/[^\d,.]/g, "").replace(",", "."));
const r9 = (x) => Math.round(x * 1e9) / 1e9;
/** Le premier nombre $…$ qui suit un morceau de texte. */
const apres = (texte, morceau) => {
  const i = texte.indexOf(morceau);
  if (i < 0) throw new Error(`« ${morceau} » introuvable`);
  const m = /\$([\d\\,{} ]+)(?:\\,\\%)?\$/.exec(texte.slice(i + morceau.length));
  return nb(m[1]);
};
/** Un pourcentage écrit $p\,\%$ dans le texte. */
const P = (p) => `$${t(p)}\\,\\%$`;
/** Une somme en euros écrite avec ses centimes : 5,4 → « 5{,}40 ». */
const eur = (x) => (Number.isInteger(r9(x)) ? t(r9(x)) : r9(x).toFixed(2).replace(".", "{,}"));
const L = (s, corps = 14) => s.length * (corps === 15 ? 9 : 8.8);
const lignes = (k) => e(k).split("\\n");

/* ═══ 1. Toutes les égalités numériques des corrigés ═══ */
const ev = (s) =>
  evalTex(
    String(s)
      .replace(/([\d{},\\]*\d)\\,\\%/g, "\\dfrac{$1}{100}")
      .replace(/\\div\s*(\([^()]*\)|[\d{},\\]+)/g, "*F{1}{$1}"),
    Q(0),
  );
feuille.corrections.forEach((txt, i) => {
  for (const [, m] of txt.matchAll(/\$([^$]*)\$/g)) {
    if (!m.includes(" = ")) continue;
    const membres = m.split(" = ");
    const lu = membres.join(" ").replace(/([\d{},\\]*\d)\\,\\%/g, "").replace(/\\(times|div|dfrac|,)/g, "");
    if (/\\approx|[a-zA-Z]/.test(lu)) continue;
    let vals;
    try {
      vals = membres.map(ev);
    } catch {
      vrai(`${i + 1}. « ${m} » lisible`, false);
      continue;
    }
    vrai(`${i + 1}. « ${m} » : membres égaux`, vals.every((v) => egal(v, vals[0])));
  }
});

/* ═══ 2. Les dessins, chacun pour lui-même ═══ */
for (const { args } of appels("dix").filter((a) => a.args)) {
  const [total, dixieme, pris, resultat] = args;
  vrai(`dix ${total} : 10 % = ${dixieme}`, r9(nb(total) / 10) === nb(dixieme));
  vrai(`dix ${total} : ${pris * 10} % = ${resultat}`, r9(pris * nb(dixieme)) === nb(resultat));
  vrai(`dix ${total} : de 0,5 à 20 cases`, pris >= 0.5 && pris <= 20 && Number.isInteger(pris * 2));
  vrai(`dix ${total} : les textes tiennent`, L(`100 % = ${total}`) <= 270 && 20 + L(`10 % = ${dixieme}`) <= 278 && L(`${pris * 10} % = ${resultat}`, 15) <= 270);
}
for (const { args } of appels("fleche").filter((a) => a.args)) {
  const [dep, coef, arr] = args;
  vrai(`flèche ${dep} × ${coef} = ${arr}`, r9(nb(dep) * nb(coef)) === nb(arr));
  vrai(`flèche ${dep} : 9 signes au plus par case`, [dep, arr].every((s) => s.length <= 9) && `× ${coef}`.length <= 8);
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
  const [unite, ls] = args;
  ls.forEach((l, i) => {
    vrai(`évolution : le nom « ${l.nom} » tient dans sa colonne`, L(l.nom) <= 58);
    vrai(`évolution : « ${l.valeur} ${unite} » tient avant le bord`, 214 + L(`${l.valeur} ${unite}`.trim()) <= 280);
    if (i > 0) vrai(`évolution : ${ls[i - 1].valeur} × (1 + ${l.taux} %) = ${l.valeur}`, r9(nb(ls[i - 1].valeur) * (1 + l.taux / 100)) === nb(l.valeur));
  });
  const coefs = ls.slice(1).map((l) => `× ${String(r9(1 + l.taux / 100)).replace(".", ",")}`).join(" puis ");
  vrai(`évolution : « ${coefs} » tient`, L(coefs, 15) <= 276);
}
for (const { args } of appels("camembert").filter((a) => a.args)) {
  const [parts] = args;
  vrai("camembert : les parts font 100 %", parts.reduce((s, p) => s + p.valeur, 0) === 100 && parts.every((p) => p.valeur > 0));
  for (const p of parts) vrai(`camembert : la légende « ${p.nom} » tient`, 162 + p.nom.length * 9 <= 240);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ns = lignes(1).slice(1).map((l) => nb(/de \$([\d{},\\]+)\$/.exec(l)[1]));
  vrai("1. quatre nombres", ns.length === 4);
  const r = ns.map((n) => r9(n / 10));
  ns.forEach((n, i) => dit(1, `$${t(n)} \\div 10 = ${t(r[i])}$`));
  dit(1, `trouver $${t(r9(ns[1] / 100))}$ au b)`);
  dit(1, `Réponse : a) $${t(r[0])}$ ; b) $${t(r[1])}$ ; c) $${t(r[2])}$ ; d) $${t(r[3])}$.`);
  const [total, , pris] = dessin("dix", 1);
  vrai("1. le dessin est celui du b)", nb(total) === ns[1] && pris === 1);
});
essai("2", () => {
  const ls = lignes(2).slice(1).map((l) => /\$(\d+)\\,\\%\$ de \$([\d{},]+)\$/.exec(l).slice(1).map(nb));
  const res = ls.map(([p, n]) => r9((p * n) / 100));
  ls.forEach(([p, n], i) => {
    const d = r9(n / 10);
    dit(2, `$10\\,\\%$ de $${t(n)}$ font $${t(d)}$`);
    if (p === 5) dit(2, `$${t(d)} \\div 2 = ${t(res[i])}$`);
    else dit(2, `$${p / 10} \\times ${t(d)} = ${t(res[i])}$`);
  });
  const c = ls.find(([p]) => p === 5);
  dit(2, `On trouverait $${t(c[1] / 5)}$, c'est-à-dire $20\\,\\%$`);
  dit(2, `Réponse : a) $${t(res[0])}$ ; b) $${t(res[1])}$ ; c) $${t(res[2])}$ ; d) $${t(res[3])}$.`);
  const [total, , pris, resultat] = dessin("dix", 2);
  vrai("2. le dessin est celui du b)", nb(total) === ls[1][1] && pris * 10 === ls[1][0] && nb(resultat) === res[1]);
});
essai("3", () => {
  const N = apres(e(3), "a accueilli"), p = apres(e(3), "il en accueille");
  vrai("3. 200 % puis 100 %", p === 200 && e(3).includes("$100\\,\\%$ du nombre de juillet"));
  const a = r9((N * p) / 100);
  dit(3, `$2 \\times ${N} = ${t(a)}$ randonneurs`);
  enonceDit(3, `$${N} + 200 = ${N + 200}$`);
  vrai("3. 265 arbres, c'est plus de 400 %", (N + 200) / N > 4);
  dit(3, `$100\\,\\%$ de $${t(a)}$, c'est $${t(a)}$ lui-même`);
  dit(3, `$10\\,\\%$ de $${N}$ font $${t(N / 10)}$`);
  dit(3, `$20 \\times ${t(N / 10)} = ${t(a)}$`);
  dit(3, `Réponse : a) $${t(a)}$ randonneurs ; b) Léo a tort ; c) $${t(a)}$ randonneurs.`);
  const [total, , pris, res] = dessin("dix", 3);
  vrai("3. le dessin : 200 % de 65", nb(total) === N && pris === 20 && nb(res) === a);
});
essai("4", () => {
  const N = apres(e(4), "collège de"), p = nb(/\$(\d+)\\,\\%\$ viennent/.exec(e(4))[1]);
  const x = r9((N * p) / 100), d = N / 10;
  dit(4, `$${N} \\times ${t(p / 100)} = ${t(x)}$`);
  dit(4, `$10\\,\\%$ de $${N}$ font $${t(d)}$, donc $30\\,\\%$ font $3 \\times ${t(d)} = ${t(3 * d)}$, et $5\\,\\%$ font $${t(d)} \\div 2 = ${t(d / 2)}$. En tout : $${t(3 * d)} + ${t(d / 2)} = ${t(x)}$.`);
  vrai("4. 35 = 30 + 5", p === 35 && r9(3 * d + d / 2) === x);
  dit(4, `Réponse : $${t(x)}$ élèves viennent à pied ou à vélo.`);
  const [total, , marques] = dessin("pourcents", 4);
  vrai("4. la barre", nb(total) === N && marques.some(([q, v]) => q === p && nb(v) === x));
});
essai("5", () => {
  const T = apres(e(5), "trajet de"), part = apres(e(5), "roule");
  const k = 100 / T, p = r9((100 * part) / T);
  vrai("5. le tout se ramène à 100 par un entier", Number.isInteger(k));
  dit(5, `$${T} \\times ${k} = 100$`);
  dit(5, `$\\dfrac{${part}}{${T}} = \\dfrac{${t(p)}}{100}$`);
  dit(5, `$${part} \\div ${T} = ${t(p / 100)}$, et $${t(p / 100)} = ${t(p)}\\,\\%$`);
  dit(5, `Réponse : ${P(p)} du trajet est sur piste cyclable.`);
  const [total, , marques] = dessin("pourcents", 5);
  vrai("5. la barre", nb(total) === T && marques[0][0] === p && nb(marques[0][1]) === part);
});
essai("6", () => {
  const part = apres(e(6), "comptent"), p = nb(/représentent \$(\d+)\\,\\%\$/.exec(e(6))[1]);
  const T = r9((part * 100) / p), d = r9(part / (p / 10));
  dit(6, `$${part} \\div 2 = ${t(d)}$ oiseaux`);
  vrai("6. 20 % = 2 fois 10 %", p === 20);
  dit(6, `$10 \\times ${t(d)} = ${t(T)}$ oiseaux`);
  dit(6, `$${t(T)} \\times ${t(p / 100)} = ${part}$`);
  dit(6, `soit $${t(r9((part * p) / 100))}$ oiseaux`);
  dit(6, `Réponse : il y a $${t(T)}$ oiseaux d'eau sur le lac.`);
  const [total, dixieme, pris, res] = dessin("dix", 6);
  vrai("6. le dessin", nb(total) === T && nb(dixieme) === d && pris * 10 === p && nb(res) === part);
});
essai("7", () => {
  const ls = lignes(7).slice(1);
  const a = 1 + apres(ls[0], "hausse de") / 100, b = 1 - apres(ls[1], "baisse de") / 100;
  const [c, d, ee] = [ls[2], ls[3], ls[4]].map((l) => nb(/par \$([\d{},]+)\$/.exec(l)[1]));
  const evo = [c, d, ee].map((k) => r9((k - 1) * 100));
  dit(7, `$1 + ${t(r9(a - 1))} = ${t(r9(a))}$`);
  dit(7, `$1 - ${t(r9(1 - b))} = ${t(r9(b))}$`);
  dit(7, `c'est une hausse de ${P(evo[0])}`);
  dit(7, `$1 - ${t(d)} = ${t(r9(1 - d))}$, c'est une baisse de ${P(-evo[1])}`);
  dit(7, `c'est une hausse de ${P(evo[2])}. La valeur double.`);
  dit(7, `« une baisse de ${P(r9(d * 100))} »`);
  dit(7, `Réponse : a) $\\times ${t(r9(a))}$ ; b) $\\times ${t(r9(b))}$ ; c) une hausse de ${P(evo[0])} ; d) une baisse de ${P(-evo[1])} ; e) une hausse de ${P(evo[2])}.`);
  const [ent, lig] = dessin("tableau", 7);
  const signe = (s) => (s.startsWith("−") ? -1 : 1) * nb(s);
  vrai("7. le tableau : chaque évolution donne son coefficient", ent.slice(1).every((x, i) => r9(1 + signe(x) / 100) === nb(lig[i + 1])));
  vrai("7. le tableau : les coefficients de l'exercice", JSON.stringify(lig.slice(1).map(nb)) === JSON.stringify([r9(a), r9(b), c, d, ee]));
});
essai("8", () => {
  const t0 = apres(e(8), "km en"), p = apres(e(8), "baisse de");
  const k = r9(1 - p / 100), n = r9(t0 * k), g = r9((t0 * p) / 100);
  dit(8, `$1 - ${t(p / 100)} = ${t(k)}$`);
  dit(8, `$${t0} \\times ${t(k)} = ${t(n)}$`);
  dit(8, `$${t0} \\times ${t(p / 100)} = ${t(g)}$ minutes, et $${t0} - ${t(g)} = ${t(n)}$ minutes`);
  dit(8, `Réponse : son nouveau temps est $${t(n)}$ minutes.`);
  const [dep, coef, arr] = dessin("fleche", 8);
  vrai("8. la flèche", nb(dep) === t0 && nb(coef) === k && nb(arr) === n);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const prix = apres(e(9), "coûte"), p = nb(/soldée à \$-(\d+)\\,\\%\$/.exec(e(9))[1]);
  vrai("9. 15 = 10 + 5", p === 15);
  const dx = prix / 10, cq = dx / 2, red = r9(dx + cq), paye = r9(prix - red);
  dit(9, `$${prix} \\div 10 = ${t(dx)}$, soit $${eur(dx)}$ €`);
  dit(9, `$${t(dx)} \\div 2 = ${t(cq)}$, soit $${eur(cq)}$ €`);
  dit(9, `$${eur(dx)} + ${eur(cq)} = ${eur(red)}$ €`);
  dit(9, `$${prix} - ${eur(red)} = ${eur(paye)}$ €`);
  dit(9, `$${prix} \\times ${t(1 - p / 100)} = ${t(r9(prix * (1 - p / 100)))}$`);
  vrai("9. les deux chemins d'accord", r9(prix * (1 - p / 100)) === paye);
  dit(9, `Réponse : a) $${eur(dx)}$ € et $${eur(cq)}$ € ; b) $${eur(red)}$ € de réduction, et un prix de $${eur(paye)}$ €`);
  const [, ls] = dessin("evolution", 9);
  vrai("9. le dessin", nb(ls[0].valeur) === prix && nb(ls[1].valeur) === paye && ls[1].taux === -p);
});
essai("10", () => {
  const a = apres(e(10), "contenait environ"), b = apres(e(10), "mesure environ"), faux = apres(e(10), "a augmenté de");
  const ecart = b - a, taux = r9((100 * ecart) / a), k = r9(b / a);
  dit(10, `$${b} - ${a} = ${ecart}$ ppm`);
  dit(10, `$\\dfrac{${ecart}}{${a}} = ${t(taux / 100)}$, et $${t(taux / 100)} = ${t(taux)}\\,\\%$`);
  dit(10, `$${b} \\div ${a} = ${t(k)}$`);
  vrai("10. le faux pourcentage est l'écart", faux === ecart);
  dit(10, `ce serait $\\times ${t(r9(1 + faux / 100))}$, soit $${a} \\times ${t(r9(1 + faux / 100))} = ${t(r9(a * (1 + faux / 100)))}$ ppm`);
  dit(10, `Réponse : a) $${ecart}$ ppm ; b) une hausse de ${P(taux)} ; c) $\\times ${t(k)}$ ; d) $${ecart}$ ppm de plus, c'est $+${t(taux)}\\,\\%$, pas $+${faux}\\,\\%$.`);
  const [, ls] = dessin("evolution", 10);
  vrai("10. le dessin", nb(ls[0].valeur) === a && nb(ls[1].valeur) === b && ls[1].taux === taux);
});
essai("11", () => {
  const p = apres(e(11), "hausse de"), arr = apres(e(11), "coûte");
  const k = r9(1 + p / 100), dep = r9(arr / k);
  dit(11, `$${arr} \\div ${t(k)} = ${t(dep)}$`);
  dit(11, `$${t(dep)} + ${t(r9((dep * p) / 100))} = ${arr}$ €`);
  dit(11, `$${arr} \\times ${t(r9(1 - p / 100))} = ${t(r9(arr * (1 - p / 100)))}$`);
  dit(11, `Réponse : l'abonnement coûtait $${t(dep)}$ € avant la hausse.`);
  const [d, c, a, retour] = dessin("fleche", 11);
  vrai("11. la flèche aller-retour", nb(d) === dep && nb(c) === k && nb(a) === arr && retour === true);
});
essai("12", () => {
  const prix = apres(e(12), "coûte");
  const pa = nb(/Magasin A : \$-(\d+)\\,\\%\$/.exec(e(12))[1]);
  const [p1, p2] = /Magasin B : \$-(\d+)\\,\\%\$, puis encore \$-(\d+)\\,\\%\$/.exec(e(12)).slice(1).map(Number);
  const A = r9(prix * (1 - pa / 100)), B1 = r9(prix * (1 - p1 / 100)), B = r9(B1 * (1 - p2 / 100));
  const g = r9((1 - p1 / 100) * (1 - p2 / 100));
  dit(12, `$${prix} \\times ${t(1 - pa / 100)} = ${t(A)}$ €`);
  dit(12, `$${prix} \\times ${t(1 - p1 / 100)} = ${t(B1)}$ €`);
  dit(12, `$${t(B1)} \\times ${t(1 - p2 / 100)} = ${t(B)}$, soit $${eur(B)}$ €`);
  dit(12, `$${t(1 - p1 / 100)} \\times ${t(1 - p2 / 100)} = ${t(g)}$`);
  vrai("12. A est moins cher", A < B);
  dit(12, `Réponse : a) $${t(A)}$ € en A, $${eur(B)}$ € en B ; b) $\\times ${t(g)}$, une baisse de ${P(r9((1 - g) * 100))} ; c) le magasin A.`);
});
essai("13", () => {
  const T = apres(e(13), "produit"), co = apres(e(13), "déchets :"), tri = apres(e(13), "au compost,");
  const ord = T - co - tri;
  dit(13, `$${T} - ${co} - ${tri} = ${ord}$ kg`);
  const pc = [co, tri, ord].map((x) => r9((100 * x) / T));
  [co, tri, ord].forEach((x, i) => dit(13, `$\\dfrac{${x}}{${T}} = \\dfrac{${t(pc[i])}}{100}$, soit ${P(pc[i])}`));
  const p = apres(e(13), "ménagères de"), reste = r9(ord * (1 - p / 100));
  dit(13, `$${ord} \\times ${t(1 - p / 100)} = ${t(reste)}$ kg`);
  dit(13, `$${p}\\,\\%$ de $${ord}$ kg, soit $${t(r9((ord * p) / 100))}$ kg`);
  dit(13, `Réponse : a) $${ord}$ kg ; b) ${P(pc[0])} au compost, ${P(pc[1])} au tri, ${P(pc[2])} aux ordures ; c) $${t(reste)}$ kg.`);
  const [parts] = dessin("camembert", 13);
  vrai("13. le camembert", JSON.stringify(parts.map((x) => x.valeur)) === JSON.stringify(pc));
});
essai("14", () => {
  const d = apres(e(14), "cela fait");
  vrai("14. on connaît 10 %", e(14).includes("$10\\,\\%$ d'entre eux"));
  const [a, b, c] = [3 * d, d / 2, 10 * d], dd = 2 * c;
  dit(14, `$3 \\times ${d} = ${a}$ oiseaux`);
  dit(14, `$${d} \\div 2 = ${t(b)}$ oiseaux`);
  dit(14, `$10 \\times ${d} = ${c}$ oiseaux`);
  dit(14, `$2 \\times ${c} = ${dd}$ oiseaux`);
  dit(14, `Réponse : a) $${a}$ ; b) $${t(b)}$ ; c) $${c}$ oiseaux ; d) $${dd}$ oiseaux.`);
  const [total, dixieme, pris, res] = dessin("dix", 14);
  vrai("14. le dessin", nb(total) === c && nb(dixieme) === d && pris === 3 && nb(res) === a);
});
essai("15", () => {
  const P0 = apres(e(15), "coûte"), p = apres(e(15), "augmente de"), p2 = apres(e(15), "puis encore de");
  vrai("15. deux fois la même hausse", p === p2);
  const k = r9(1 + p / 100), a = r9(P0 * k), b = r9(a * k), g = r9(k * k);
  dit(15, `$${P0} \\times ${t(k)} = ${t(a)}$ €`);
  dit(15, `$${t(a)} \\times ${t(k)} = ${t(b)}$ €`);
  dit(15, `$${t(k)} \\times ${t(k)} = ${t(g)}$`);
  dit(15, `$${P0} \\times ${t(1 + (2 * p) / 100)} = ${t(r9(P0 * (1 + (2 * p) / 100)))}$ €`);
  dit(15, `Réponse : a) $${t(a)}$ € en 2025, $${t(b)}$ € en 2026 ; b) $\\times ${t(g)}$ ; c) non, c'est une hausse de ${P(r9((g - 1) * 100))}.`);
  vrai("15. Nina a tort", r9((g - 1) * 100) !== 2 * p);
});
essai("16", () => {
  const N = apres(e(16), "a reçu"), h = apres(e(16), "augmente de"), bs = apres(e(16), "il baisse de");
  const a = r9(N * (1 + h / 100)), s = r9(a * (1 - bs / 100)), g = r9((1 + h / 100) * (1 - bs / 100));
  dit(16, `$${t(N)} \\times ${t(1 + h / 100)} = ${t(a)}$ visiteurs`);
  dit(16, `$${t(a)} \\times ${t(1 - bs / 100)} = ${t(s)}$ visiteurs`);
  dit(16, `La hausse vaut $${h}\\,\\%$ de $${t(N)}$, soit $${t((N * h) / 100)}$ visiteurs. La baisse vaut $${bs}\\,\\%$ de $${t(a)}$, soit $${t((a * bs) / 100)}$ visiteurs.`);
  dit(16, `$${t(1 + h / 100)} \\times ${t(1 - bs / 100)} = ${t(g)}$`);
  vrai("16. on ne revient pas en juillet", s !== N);
  dit(16, `Réponse : a) $${t(a)}$ en août, $${t(s)}$ en septembre ; b) non ; c) $\\times ${t(g)}$, une baisse de ${P(r9((1 - g) * 100))}.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const p = apres(e(17), "en moyenne de"), N = apres(e(17), "imaginaire de"), g20 = apres(e(17), "compte");
  const k = r9(1 - p / 100), n20 = r9(N * k), g70 = r9(g20 / k), remonte = r9(n20 * (1 + p / 100));
  dit(17, `$1 - ${t(p / 100)} = ${t(k)}$`);
  dit(17, `$${t(N)} \\times ${t(k)} = ${t(n20)}$ hérissons`);
  dit(17, `$${g20} \\div ${t(k)} = ${t(g70)}$ grenouilles`);
  dit(17, `$${t(n20)} \\times ${t(1 + p / 100)} = ${t(remonte)}$`);
  vrai("17. même pas la moitié", remonte < N / 2);
  vrai("17. des animaux entiers à chaque étape", [n20, g70, remonte].every(Number.isInteger));
  vrai("17. environ 3,7, soit +270 %", Math.abs(N / n20 - 3.7) < 0.05);
  dit(17, `$${p}\\,\\%$ de $${t(N)}$ font $${t(r9((N * p) / 100))}$, mais $${p}\\,\\%$ de $${t(n20)}$ ne font que $${t(r9((n20 * p) / 100))}$`);
  dit(17, `Réponse : a) $\\times ${t(k)}$ ; b) $${t(n20)}$ hérissons ; c) $${t(g70)}$ grenouilles ; d) non, $${t(remonte)}$ hérissons seulement.`);
  const [, ls] = dessin("evolution", 17);
  vrai("17. le dessin", nb(ls[0].valeur) === N && nb(ls[1].valeur) === n20 && nb(ls[2].valeur) === remonte);
});
essai("18", () => {
  const n = apres(e(18), "solidaire,"), prix = apres(e(18), "chacun"), pf = apres(e(18), "garde"), hn = apres(e(18), "il y aura"), prix2 = apres(e(18), "passera à");
  const T = n * prix, d = T / 10, frais = r9((T * pf) / 100), don = T - frais;
  dit(18, `$${n} \\times ${prix} = ${t(T)}$ €`);
  dit(18, `$${pf / 10} \\times ${t(d)} = ${t(frais)}$ € de frais`);
  dit(18, `$${t(T)} - ${t(frais)} = ${t(don)}$ €`);
  dit(18, `$${(100 - pf) / 10} \\times ${t(d)} = ${t(don)}$ €`);
  const n2 = r9(n * (1 + hn / 100)), T2 = n2 * prix2, k = r9(T2 / T), ki = r9(prix2 / prix);
  dit(18, `$${n} \\times ${t(1 + hn / 100)} = ${t(n2)}$. L'argent : $${t(n2)} \\times ${prix2} = ${t(T2)}$ €`);
  dit(18, `$${t(T2)} \\div ${t(T)} = ${t(k)}$`);
  dit(18, `$${prix2} \\div ${prix} = ${t(ki)}$, une hausse de ${P(r9((ki - 1) * 100))}`);
  vrai("18. les coefficients se multiplient", r9((1 + hn / 100) * ki) === k);
  dit(18, `« $${hn}\\,\\% + ${t(r9((ki - 1) * 100))}\\,\\% = ${t(r9(hn + (ki - 1) * 100))}\\,\\%$ »`);
  dit(18, `Réponse : a) $${t(T)}$ € ; b) $${t(frais)}$ € ; c) $${t(don)}$ €, soit ${P(100 - pf)} ; d) une hausse de ${P(r9((k - 1) * 100))}.`);
  const [total, , marques] = dessin("pourcents", 18);
  vrai("18. la barre", nb(total) === T && marques.some(([q, v]) => q === pf && nb(v) === frais));
});
essai("19", () => {
  const C = apres(e(19), "voiture d'occasion à"), p = apres(e(19), "baisse de"), seuil = apres(e(19), "moins de");
  const k = r9(1 - p / 100);
  const v = [C];
  for (let i = 0; i < 3; i++) v.push(r9(v[i] * k));
  for (let i = 0; i < 3; i++) dit(19, `$${t(v[i])} \\times ${t(k)} = ${t(v[i + 1])}$ €`);
  const g = r9(k * k);
  dit(19, `$${t(k)} \\times ${t(k)} = ${t(g)}$`);
  dit(19, `la valeur a baissé de ${P(r9((1 - g) * 100))}, pas de $${2 * p}\\,\\%$`);
  const lim = r9((C * seuil) / 100);
  dit(19, `= ${t(lim)}$ €`);
  vrai("19. sous le seuil après 3 ans, pas après 2", v[3] < lim && v[2] >= lim);
  dit(19, `Après $2$ ans, $${t(v[2])}$ €`);
  dit(19, `$\\dfrac{${t(v[3])}}{${t(C)}} = ${t(r9(v[3] / C))}$, soit $${t(r9((100 * v[3]) / C))}\\,\\%$`);
  dit(19, `soit $${t(r9((v[1] * p) / 100))}$ €, et non $${t((C * p) / 100)}$`);
  dit(19, `Réponse : a) $${t(v[1])}$ €, $${t(v[2])}$ € et $${t(v[3])}$ € ; b) une baisse de ${P(r9((1 - g) * 100))}, pas de $${2 * p}\\,\\%$ ; c) oui, elle vaut moins de $${t(lim)}$ €.`);
  const [, ls] = dessin("evolution", 19);
  vrai("19. le dessin", ls.every((l, i) => nb(l.valeur) === v[i]));
});
essai("20", () => {
  const m = apres(e(20), "chocolat de"), prix = apres(e(20), "coûte"), gA = apres(e(20), "Magasin A : « "), mA = apres(e(20), "la tablette pèse");
  vrai("20. A : 25 % de plus", r9(m * (1 + gA / 100)) === mA);
  const pb = nb(/Magasin B : la tablette de \$\d+\$ g à \$-(\d+)\\,\\%\$/.exec(e(20))[1]);
  const pc = nb(/deuxième tablette à \$-(\d+)\\,\\%\$/.exec(e(20))[1]);
  const A = r9(prix / (mA / m)), B = r9(prix * (1 - pb / 100)), Cp = r9((prix + prix * (1 - pc / 100)) / 2);
  dit(20, `$${prix} \\div ${t(mA / m)} = ${t(A)}$, soit $${eur(A)}$ €`);
  dit(20, `$${prix} \\times ${t(1 - pb / 100)} = ${t(B)}$, soit $${eur(B)}$ €`);
  dit(20, `$${prix} + ${t(prix * (1 - pc / 100))} = ${t(prix * (2 - pc / 100))}$ €`);
  dit(20, `$${t(prix * (2 - pc / 100))} \\div 2 = ${t(Cp)}$, soit $${eur(Cp)}$ €`);
  vrai("20. A et B au même prix", A === B);
  const k = r9(Cp / prix);
  dit(20, `$${t(Cp)} \\div ${prix} = ${t(k)}$`);
  dit(20, `c'est une baisse de ${P(r9((1 - k) * 100))}`);
  dit(20, `Réponse : a) $${eur(A)}$ € en A, $${eur(B)}$ € en B, $${eur(Cp)}$ € en C ; b) oui, le même prix pour $100$ g ; c) non, c'est une baisse de ${P(r9((1 - k) * 100))}.`);
  const [, rows] = dessin("table", 20);
  vrai("20. le tableau", nb(rows[0][1]) === A && nb(rows[1][1]) === B && nb(rows[2][1]) === Cp);
});

f.fin();
