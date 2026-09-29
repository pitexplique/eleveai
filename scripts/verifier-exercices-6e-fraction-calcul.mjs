// Recalcul indépendant de la feuille « Calculer avec les fractions » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-fraction-calcul.tsx.
//
// ⭐ Deux étages :
//   1. TOUTE formule « A = B = C » d'un corrigé est relue membre à membre (en
//      flottant, \dfrac, ×, ÷, +, − et {,} compris) : une étape fausse au
//      milieu d'une chaîne se voit, même si le script ne la cite pas.
//   2. Chaque exercice est refait en fractions EXACTES (BigInt) à partir des
//      nombres relus dans l'énoncé ; la réponse écrite est cherchée dans le
//      corrigé ; les dessins (barres, partage, grille, droite, tableau) sont
//      relus et comparés aux nombres de l'énoncé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-fraction-calcul.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf, plus, moins, fois, texFrac, tex } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-fraction-calcul.tsx", "fraction_calcul", ["droiteRel", "table", "barres", "partage", "grille"], "6e");
const { c, e, vrai, dit, dessin, essai, feuille } = f;

const F = (a, b = 1) => Q(a, b);
const brut = (a, b) => `\\dfrac{${a}}{${b}}`;
const TD = (q) => tex(q);
const TF = (q) => texFrac(q);
const couples = (texte) => [...texte.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
const lignes = (k) => e(k).split("\\n");
const deLabel = (s) => {
  const m = /(\d+)\/(\d+)/.exec(s);
  return F(Number(m[1]), Number(m[2]));
};
const pres = (x, q) => Math.abs(x - Number(q.n) / Number(q.d)) < 1e-9;
/** Une part d'une quantité : (N ÷ d) × n, avec N divisible par d. */
const part = (n, d, N) => {
  vrai(`${N} divisible par ${d}`, N % d === 0);
  return (N / d) * n;
};

/* ═══ 1. Toutes les égalités des corrigés, membre à membre ═══ */
const fl = (s) =>
  Function(
    `return ${s
      .replace(/\{,\}/g, ".")
      .replace(/\\,/g, "")
      .replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
      .replace(/\\times/g, "*")
      .replace(/\\div/g, "/")}`,
  )();
let relues = 0;
feuille.corrections.forEach((corr, i) => {
  // ⛔ La ligne du piège peut écrire une égalité FAUSSE exprès : on ne la relit pas.
  const sansPiege = corr.split("\\n").filter((l) => !l.startsWith("⛔")).join("\\n");
  for (const [, fo] of sansPiege.matchAll(/\$([^$]*)\$/g)) {
    if (!fo.includes(" = ")) continue;
    let v;
    try {
      v = fo.split(" = ").map(fl);
    } catch {
      continue;
    }
    if (!v.every((x) => typeof x === "number" && Number.isFinite(x))) continue;
    relues++;
    vrai(`${i + 1}. ${fo} : membres égaux`, v.every((x) => Math.abs(x - v[0]) < 1e-9 * Math.max(1, Math.abs(v[0]))));
  }
});
vrai(`plus de 80 égalités relues (${relues})`, relues > 80);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ls = lignes(1).slice(1).map((l) => [...couples(l)[0], Number(/de \$(\d+)\$/.exec(l)[1])]);
  const r = ls.map(([n, d, N]) => part(n, d, N));
  ls.forEach(([, d, N], i) => dit(1, `$${N} \\div ${d} = ${r[i]}$`));
  dit(1, `Réponse : ${r.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  dit(1, `$${ls[0][2]} \\times ${ls[0][1]} = ${ls[0][2] * ls[0][1]}$`);
  const [tot, d, val, g] = dessin("partage", 1);
  vrai("1. le partage : 28 en 4 parts de 7, une prise", Number(tot) === ls[0][2] && d === ls[0][1] && Number(val) === r[0] && g.join() === "1");
});
essai("2", () => {
  const ls = lignes(2).slice(1).map((l) => [...couples(l)[0], Number(/de \$(\d+)\$/.exec(l)[1])]);
  const r = ls.map(([n, d, N]) => part(n, d, N));
  ls.forEach(([n, d, N], i) => dit(2, `$${N} \\div ${d} = ${N / d}$, puis $${n} \\times ${N / d} = ${r[i]}$`));
  dit(2, `Réponse : ${r.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  const [tot, d, val, g] = dessin("partage", 2);
  const [n, dd, N] = ls[1];
  vrai("2. le partage : le b)", Number(tot) === N && d === dd && Number(val) === N / dd && g.join() === String(n));
});
essai("3", () => {
  const ls = lignes(3).slice(1).map((l) => couples(l));
  const r = ls.map(([a, b]) => plus(F(...a), F(...b)));
  ls.forEach(([a, b], i) => dit(3, `$${brut(...a)} + ${brut(...b)} = ${brut(a[0] + b[0], a[1])}`));
  dit(3, `Réponse : ${r.map((q, i) => `${"abcd"[i]}) $${TF(q)}$`).join(" ; ")}.`);
  vrai("3. le piège 5/14", c(3).includes(brut(5, 14)) && !egal(F(5, 14), r[0]));
  const [liste] = dessin("barres", 3);
  vrai("3. les barres : a) et d) bout à bout", liste[0].d === ls[0][0][1] && liste[0].parts.join() === `${ls[0][0][0]},${ls[0][1][0]}` && liste[1].d === ls[3][0][1] && liste[1].parts.join() === `${ls[3][0][0]},${ls[3][1][0]}`);
});
essai("4", () => {
  const ls = lignes(4).slice(1);
  const r = ls.map((l) => {
    const fr = couples(l);
    const a = fr.length === 2 ? F(...fr[0]) : F(1);
    return moins(a, F(...fr.at(-1)));
  });
  dit(4, `Réponse : a) $${TF(r[0])}$ ; b) $${brut(5, 10)} = ${TF(r[1])}$ ; c) $${TF(r[2])}$ ; d) $${TF(r[3])}$.`);
  vrai("4b. 9/10 − 4/10 = 5/10", egal(r[1], F(5, 10)));
  const [liste] = dessin("barres", 4);
  vrai("4. barre b) : 9 dixièmes, 4 barrés", liste[0].d === 10 && liste[0].parts[0] === 9 && liste[0].retire === 4);
  vrai("4. barre d) : 8 huitièmes, 3 barrés, il en reste 5", liste[1].d === 8 && liste[1].parts[0] === 8 && liste[1].retire === 3 && egal(F(liste[1].parts[0] - liste[1].retire, 8), r[3]));
});
essai("5", () => {
  const ls = lignes(5).slice(1).map((l) => {
    const k = Number(/\$(\d+) \\times|\\times (\d+)\$/.exec(l).slice(1).find(Boolean));
    return [k, couples(l)[0]];
  });
  const r = ls.map(([k, fr]) => fois(F(k), F(...fr)));
  dit(5, `Réponse : ${r.map((q, i) => `${"abcd"[i]}) $${TF(q)}$`).join(" ; ")}.`);
  vrai("5. le piège : 8/36 = 2/9", egal(F(8, 36), F(2, 9)) && c(5).includes(brut(8, 36)));
  const [, , pas, points, { sauts }] = dessin("droiteRel", 5);
  vrai("5. la droite en neuvièmes", Math.abs(pas - 1 / 9) < 1e-12);
  vrai("5. quatre bonds de 2/9 bout à bout, jusqu'à 8/9", sauts.length === ls[0][0] && sauts.every((s, i) => pres(s.de, F(2 * i, 9)) && pres(s.vers, F(2 * i + 2, 9)) && s.label === "2/9") && pres(points[0].value, r[0]) && egal(deLabel(points[0].label), r[0]));
});
essai("6", () => {
  const ls = lignes(6).slice(1).map((l) => [couples(l), l.includes(" - ") ? moins : plus]);
  const r = ls.map(([[a, b], op]) => op(F(...a), F(...b)));
  dit(6, `Réponse : ${r.map((q, i) => `${"abcd"[i]}) $${TF(q)}$`).join(" ; ")}.`);
  ls.forEach(([[a, b]]) => vrai(`6. ${a[1]} et ${b[1]} : l'un multiple de l'autre`, a[1] % b[1] === 0 || b[1] % a[1] === 0));
  const [liste] = dessin("barres", 6);
  vrai("6. les barres : 1/4 = 2/8, puis 3/8 + 2/8 = 5/8", egal(F(liste[0].parts[0], liste[0].d), F(liste[1].parts[0], liste[1].d)) && egal(F(liste[2].parts[0] + liste[2].parts[1], liste[2].d), r[1]));
});
essai("7", () => {
  const [fr] = couples(lignes(7)[0]);
  const k = Number(/\$(\d+) \\times/.exec(lignes(7)[0])[1]);
  const p = fois(F(k), F(...fr));
  dit(7, `$${k} \\times ${brut(...fr)} = ${brut(`${k} \\times ${fr[0]}`, fr[1])} = ${TF(p)}$`);
  dit(7, `Et $${brut(...fr)} \\times ${k} = ${TF(p)}$`);
  const ent = p.n / p.d, r = p.n % p.d;
  dit(7, `$${TF(p)} = ${ent} + ${brut(r, p.d)}$`);
  const [fr2] = couples(lignes(7)[2]);
  const k2 = Number(/\$(\d+) \\times/.exec(lignes(7)[2])[1]);
  const p2 = fois(F(k2), F(...fr2));
  dit(7, `$${k2} \\times ${brut(...fr2)} = ${brut(k2 * fr2[0], fr2[1])}$`);
  dit(7, `Réponse : a) $${TF(p)}$ dans les deux cas ; b) oui, $${ent} + ${brut(r, p.d)}$ ; c) $${TF(p2)}$.`);
  const [liste] = dessin("barres", 7);
  const total = liste.reduce((s, b) => plus(s, F(b.parts[0], b.d)), F(0));
  vrai("7. les barres font 12/5 : deux pleines et 2/5", egal(total, p) && liste.slice(0, -1).every((b) => b.parts[0] === b.d && b.label === "1") && liste.at(-1).label === `${r}/${p.d}`);
});
essai("8", () => {
  const conv = { km: [1000, "m"], kg: [1000, "g"], L: [100, "cL"], m: [100, "cm"] };
  const ls = lignes(8).slice(1).map((l) => {
    const [fr] = couples(l);
    const u = /de \$1\$ (\w+) \$= \\ldots\$ (\w+)/.exec(l);
    vrai(`8. ${u[1]} → ${u[2]}`, conv[u[1]][1] === u[2]);
    return [fr, conv[u[1]][0], u[2]];
  });
  const r = ls.map(([[n, d], N]) => part(n, d, N));
  dit(8, `Réponse : ${r.map((x, i) => `${"abcd"[i]}) $${x}$ ${ls[i][2]}`).join(" ; ")}.`);
  const [tot, d, val, g] = dessin("partage", 8);
  vrai("8. le partage : 1 000 m en 5 parts de 200 m, 2 prises", tot === "1 000 m" && d === ls[0][0][1] && val === `${ls[0][1] / d} m` && g.join() === String(ls[0][0][0]));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [paul, zoe] = couples(lignes(9)[0]).map((x) => F(...x));
  const en8 = Number((paul.n * 8n) / paul.d);
  dit(9, `$${brut(1, 4)} = ${brut(en8, 8)}$`);
  const mange = plus(paul, zoe);
  dit(9, `$${brut(en8, 8)} + ${brut(Number(zoe.n), 8)} = ${brut(Number(mange.n), 8)}$`);
  const reste = moins(F(1), mange);
  dit(9, `Réponse : a) $${brut(en8, 8)}$ ; b) $${TF(mange)}$ ; c) $${TF(reste)}$.`);
  const [liste] = dessin("barres", 9);
  vrai("9. les barres : Paul 1/4 = 2/8, puis 2/8 + 3/8", egal(F(liste[0].parts[0], liste[0].d), paul) && egal(F(liste[1].parts[0], liste[1].d), paul) && liste[2].d === 8 && egal(F(liste[2].parts[1], 8), zoe) && egal(F(liste[2].parts[0] + liste[2].parts[1], 8), mange));
});
essai("10", () => {
  const [a, b, faux] = couples(lignes(10)[1]);
  const s = plus(F(...a), F(...b));
  vrai("10a. 3/10 est faux et plus petit que 2/5", !egal(F(...faux), s) && inf(F(...faux), F(...a)));
  const [fr, fx] = couples(lignes(10)[2]);
  const k = Number(/\$(\d+) \\times/.exec(lignes(10)[2])[1]);
  const p = fois(F(k), F(...fr));
  vrai("10b. 6/21 = 2/7 : rien multiplié", egal(F(...fx), F(...fr)) && !egal(F(...fx), p));
  dit(10, `Réponse : a) $${TF(s)}$ ; b) $${TF(p)}$.`);
  const [liste] = dessin("barres", 10);
  vrai("10. les barres : 2/5 + 1/5 contre 3/10", egal(F(liste[0].parts[0] + liste[0].parts[1], liste[0].d), s) && egal(F(liste[1].parts[0], liste[1].d), F(...faux)));
});
essai("11", () => {
  const N = Number(/compte \$(\d+)\$/.exec(e(11))[1]);
  const [velo] = couples(e(11));
  const v = part(velo[0], velo[1], N);
  const bus = part(1, 4, N);
  const pied = N - v - bus;
  dit(11, `$${v} + ${bus} = ${v + bus}$`);
  dit(11, `$${N} - ${v + bus} = ${pied}$`);
  dit(11, `Réponse : a) $${v}$ élèves ; b) $${bus}$ élèves ; c) $${pied}$ élèves.`);
  const [li, co, groupes, reste] = dessin("grille", 11);
  vrai("11. la grille : 28 élèves, vélo, bus, à pied", li * co === N && groupes[0].n === v && groupes[1].n === bus && reste === "à pied");
});
essai("12", () => {
  const ls = lignes(12).slice(1).map((l) => [couples(l), l.includes(" - ") ? moins : plus, { sixièmes: 6, douzièmes: 12, dixièmes: 10 }[/en (\S+)$/.exec(l)[1]]]);
  const r = ls.map(([[a, b], op]) => op(F(...a), F(...b)));
  ls.forEach(([[a, b], , D], i) => {
    vrai(`12. ${D} : multiple commun de ${a[1]} et ${b[1]}`, D % a[1] === 0 && D % b[1] === 0 && a[1] % b[1] !== 0 && b[1] % a[1] !== 0);
    dit(12, `$${brut(...a)} = ${brut((a[0] * D) / a[1], D)}$ et $${brut(...b)} = ${brut((b[0] * D) / b[1], D)}$`);
  });
  dit(12, `Réponse : ${r.map((q, i) => `${"abc"[i]}) $${TF(q)}$`).join(" ; ")}.`);
  vrai("12. le piège 2/5 < 1/2", inf(F(2, 5), F(1, 2)));
  const [liste] = dessin("barres", 12);
  vrai("12. les barres : 1/2, 1/3, puis 3/6 + 2/6", egal(F(liste[0].parts[0], liste[0].d), F(1, 2)) && egal(F(liste[1].parts[0], liste[1].d), F(1, 3)) && egal(F(liste[2].parts[0] + liste[2].parts[1], liste[2].d), r[0]));
});
essai("13", () => {
  const k = Number(/\$(\d+) \\times/.exec(lignes(13)[0])[1]);
  const [fr] = couples(lignes(13)[0]);
  const p = fois(F(k), F(...fr));
  vrai("13a. plus petit que 5", inf(p, F(k)));
  const ent = p.n / p.d;
  dit(13, `$${k} \\times ${brut(...fr)} = ${TF(p)}$`);
  dit(13, `$${TF(p)} = ${ent} + ${brut(Number(p.n % p.d), Number(p.d))}$`);
  const k2 = Number(/\$(\d+) \\times/.exec(lignes(13)[2])[1]);
  const [fr2] = couples(lignes(13)[2]);
  const p2 = fois(F(k2), F(...fr2));
  vrai("13c. plus grand que 4", inf(F(k2), p2));
  const b2 = k2 * fr2[0];
  dit(13, `$${k2} \\times ${brut(...fr2)} = ${brut(b2, fr2[1])}$`);
  dit(13, `$${brut(b2, fr2[1])} = ${Math.floor(b2 / fr2[1])} + ${brut(b2 % fr2[1], fr2[1])}$`);
  dit(13, `Réponse : a) plus petit ; b) $${TF(p)} = ${ent} + ${brut(Number(p.n % p.d), Number(p.d))}$ ; c) plus grand, $${brut(b2, fr2[1])} = ${Math.floor(b2 / fr2[1])} + ${brut(b2 % fr2[1], fr2[1])}$.`);
  const [, max, , points] = dessin("droiteRel", 13);
  vrai("13. la droite : 15/4 avant 5", max === k && pres(points[0].value, p) && egal(deLabel(points[0].label), p));
});
essai("14", () => {
  const [fr] = couples(e(14));
  const k = Number(/fait \$(\d+)\$ fois/.exec(e(14))[1]);
  const p = fois(F(k), F(...fr));
  dit(14, `$${k} \\times ${brut(...fr)} = ${TF(p)}$ L`);
  const ent = p.n / p.d;
  dit(14, `$${TF(p)} = ${ent} + ${brut(Number(p.n % p.d), Number(p.d))}$`);
  dit(14, `c'est $${TD(p)}$ L`);
  const bouteille = Number(/bouteille de \$(\d+)\$ L/.exec(e(14))[1]);
  vrai("14c. pas assez", inf(F(bouteille), p));
  dit(14, `il manque $${TF(moins(p, F(bouteille)))}$ L`);
  const [liste] = dessin("barres", 14);
  vrai("14. les barres : 3 recettes de 3/4", liste.length === k && liste.every((b) => egal(F(b.parts[0], b.d), F(...fr))));
});
essai("15", () => {
  const A = Number(/aire de \$(\d+)\$/.exec(e(15))[1]);
  const [pot, ver] = couples(e(15));
  const ens = plus(F(...pot), F(...ver));
  dit(15, `$${brut(...pot)} + ${brut(...ver)} = ${brut(pot[0] + ver[0], 9)}$`);
  const pel = moins(F(1), ens);
  dit(15, `$${brut(9, 9)} - ${brut(pot[0] + ver[0], 9)} = ${brut(Number(pel.n) * (9 / Number(pel.d)), 9)}$`);
  const u = A / 9;
  const aires = [pot[0] * u, ver[0] * u, (9 - pot[0] - ver[0]) * u];
  vrai("15. aires = 720", aires.reduce((s, x) => s + x, 0) === A);
  dit(15, `Réponse : a) $${brut(pot[0] + ver[0], 9)}$ ; b) $${brut(9 - pot[0] - ver[0], 9)}$ ; c) $${aires[0]}$ m², $${aires[1]}$ m² et $${aires[2]}$ m².`);
  const [tot, d, val, g, noms] = dessin("partage", 15);
  vrai("15. le partage : 720 m² en 9 parts de 80, potager 2, verger 4", tot === `${A} m²` && d === 9 && Number(val) === u && g.join() === `${pot[0]},${ver[0]}` && noms.length === 3);
});
essai("16", () => {
  const [fr] = couples(lignes(16)[0]);
  const k = Number(/après \$(\d+)\$ bonds/.exec(lignes(16)[1])[1]);
  const p = fois(F(k), F(...fr));
  dit(16, `a) $${k} \\times ${brut(...fr)} = ${TF(p)}$ m.`);
  dit(16, `c'est $${TD(p)}$ m`);
  const but = Number(/dépasser \$(\d+)\$ m/.exec(e(16))[1]);
  let n = 0;
  while (!inf(F(but), fois(F(n), F(...fr)))) n++;
  dit(16, `Il faut donc $${n}$ bonds pour DÉPASSER $${but}$ m.`);
  vrai("16c. avec n − 1 bonds, pile au but", egal(fois(F(n - 1), F(...fr)), F(but)));
  dit(16, `Réponse : a) $${TF(p)}$ m ; b) $2 + ${brut(2, 5)} = ${TD(p)}$ m ; c) $${n}$ bonds.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 16);
  vrai("16. quatre bonds de 3/5 jusqu'à 12/5", sauts.length === k && sauts.every((s, i) => pres(s.de, fois(F(i), F(...fr))) && pres(s.vers, fois(F(i + 1), F(...fr))) && egal(deLabel(s.label), F(...fr))) && pres(points[0].value, p));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const fr = couples(lignes(17)[0]).map((x) => F(...x));
  const en12 = fr.map((q) => Number((q.n * 12n) / q.d));
  fr.forEach((q, i) => dit(17, `$${TF(q)} = ${brut(en12[i], 12)}$`));
  const tot = fr.reduce(plus, F(0));
  const reste = moins(F(1), tot);
  dit(17, `Réponse : a) $${en12.map((x) => brut(x, 12)).join("$, $")}$ ; b) $${brut(en12.reduce((s, x) => s + x, 0), 12)}$ ; c) $${brut(12 - en12.reduce((s, x) => s + x, 0), 12)}$ ; d) $${12 - en12.reduce((s, x) => s + x, 0)}$ parts.`);
  vrai("17. 9/12 = 3/4 et reste 1/4", egal(tot, F(3, 4)) && egal(reste, F(1, 4)));
  const [li, co, groupes] = dessin("grille", 17);
  vrai("17. la grille : 12 parts, 4 + 2 + 3", li * co === 12 && groupes.map((g) => g.n).join() === en12.join());
});
essai("18", () => {
  const km = Number(/fait \$(\d+)\$ km/.exec(e(18))[1]);
  const [j1, j2] = couples(e(18)).map((x) => F(...x));
  const reste = moins(F(1), plus(j1, j2));
  dit(18, `Il reste $${brut(9, 9)} - ${brut(7, 9)} = ${TF(reste)}$ du trajet.`);
  const kms = [j1, j2, reste].map((q) => Number((q.n * BigInt(km)) / q.d));
  vrai("18. somme = 18 km", kms.reduce((s, x) => s + x, 0) === km);
  dit(18, `Réponse : a) $${TF(reste)}$ ; b) $${kms[0]}$ km, $${kms[1]}$ km et $${kms[2]}$ km ; c) oui.`);
  const [tot, d, val, g] = dessin("partage", 18);
  vrai("18. le partage : 18 km en 9 parts de 2, 3 + 4", tot === `${km} km` && d === 9 && Number(val) === km / 9 && g[0] * (km / 9) === kms[0] && g[1] * (km / 9) === kms[1]);
});
essai("19", () => {
  const N = Number(/a \$(\d+)\$ €/.exec(e(19))[1]);
  const [livre] = couples(e(19));
  const l = part(livre[0], livre[1], N);
  const cine = part(1, 4, N);
  const reste = N - l - cine;
  dit(19, `Il lui reste $${N} - ${l + cine} = ${reste}$ €`);
  const q = F(reste, N);
  dit(19, `$${brut(reste, N)} = ${TF(q)}$`);
  vrai("19. autre chemin : 1 − 2/5 − 1/4 = 7/20", egal(moins(moins(F(1), F(...livre)), F(1, 4)), q));
  dit(19, `Réponse : a) $${l}$ € et $${cine}$ € ; b) $${reste}$ € ; c) $${brut(reste, N)} = ${TF(q)}$.`);
  const [li, co, groupes] = dessin("grille", 19);
  const carreau = N / (li * co);
  vrai("19. la grille : 20 carreaux de 3 €, livre 8, ciné 5, reste 7", li * co === Number(q.d) && groupes[0].n * carreau === l && groupes[1].n * carreau === cine && (li * co - groupes[0].n - groupes[1].n) * carreau === reste);
  dit(19, `$${li * co}$ carreaux de $${carreau}$ €`);
});
essai("20", () => {
  const [fr] = couples(e(20));
  const j = Number(/en \$(\d+)\$ jours/.exec(e(20))[1]);
  const p = fois(F(j), F(...fr));
  dit(20, `a) $${j} \\times ${brut(...fr)} = ${TF(p)}$ L, soit $${TD(p)}$ L.`);
  const arrosoir = Number(/contient \$(\d+)\$ L/.exec(e(20))[1]);
  let n = 0;
  while (!inf(F(arrosoir), fois(F(n + 1), F(...fr)))) n++;
  dit(20, `On peut arroser pendant $${n}$ jours entiers.`);
  dit(20, `Réponse : a) $${TF(p)}$ L, soit $${TD(p)}$ L ; b) plus ; c) $${n}$ jours.`);
  const [, tab] = dessin("table", 20);
  vrai("20. le tableau : jours × 3/10", tab.every((l) => egal(deLabel(l[1]), fois(F(Number(l[0])), F(...fr))) && l[2] === TD(fois(F(Number(l[0])), F(...fr))).replace("{,}", ",")));
  vrai("20. le tableau montre 16 et 17 jours", tab.some((l) => Number(l[0]) === n) && tab.some((l) => Number(l[0]) === n + 1));
});

/* ═══ Rendu : légendes, noms des barres, valeurs dans leur case ═══ */
for (const { args } of f.appels("grille").filter((a) => a.args)) {
  const [, , groupes, reste = ""] = args;
  const noms = [...groupes.map((g) => g.nom), reste].filter(Boolean);
  vrai(`légende « ${noms.join(", ")} » : 6 signes au plus, 4 noms au plus`, noms.every((n) => n.length * 8.5 < 56) && noms.length <= 4);
}
for (const { args } of f.appels("barres").filter((a) => a.args)) for (const b of args[0]) vrai(`barres : « ${b.label} » ≤ 10 signes`, b.label.length <= 10);
for (const { args } of f.appels("partage").filter((a) => a.args)) {
  const [, d, valeur, , noms = []] = args;
  vrai(`partage : « ${valeur} » tient dans une case de ${(260 / d).toFixed(0)}`, valeur.length * 8.6 <= 260 / d - 4);
  vrai(`partage : légende de 8 signes au plus, 3 noms au plus`, noms.every((n) => n.length <= 8) && noms.length <= 3);
}

f.fin();
