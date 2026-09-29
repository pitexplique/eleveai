// Recalcul indépendant de la feuille « Les fractions » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-fraction-nombre.tsx.
//
// ⭐ Les fractions sont EXACTES (BigInt, module commun) : le script simplifie,
// redécoupe et compare lui-même, puis cherche la réponse écrite. Chaque formule
// « A = B = C » du corrigé que le script cite est relue MEMBRE À MEMBRE (en
// flottant, ÷ et × compris) : une étape fausse au milieu d'une chaîne se voit.
// Les dessins (comparer, barres, droiteRel, disque, parcelles, table) sont
// relus dans le source et comparés aux nombres de l'énoncé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-fraction-nombre.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf, texFrac, tex, D } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-fraction-nombre.tsx", "fraction_nombre", ["comparer", "barres", "droiteRel", "disque", "parcelles", "table"]);
const { c, e, vrai, dit, dessin, essai } = f;

const F = (a, b) => Q(a, b);
const TF = (q) => texFrac(q);
/** « \dfrac{3}{4} » tel que l'énoncé l'écrit, SANS simplifier. */
const brut = (a, b) => `\\dfrac{${a}}{${b}}`;
/** Valeur flottante d'une écriture LaTeX : \dfrac, \times, \div, {,}, parenthèses. */
const fl = (s) =>
  Function(
    `return ${s
      .replace(/\\left|\\right/g, "")
      .replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
      .replace(/\\times/g, "*")
      .replace(/\\div/g, "/")
      .replace(/\{,\}/g, ".")
      .replace(/\\,/g, "")}`,
  )();
const proche = (a, b) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b));
/** Une formule du corrigé k contient A puis B, avec « = », et tous ses membres sont égaux. */
function chaine(k, A, B) {
  const formules = [...c(k).matchAll(/\$([^$]*)\$/g)].map((m) => m[1]);
  const fo = formules.find((x) => x.includes(A) && x.includes(" = ") && x.lastIndexOf(B) > x.indexOf(A));
  if (!fo) return vrai(`${k}. une formule « ${A} = … ${B} »`, false);
  const membres = fo.split(" = ");
  const v = membres.map(fl);
  vrai(`${k}. ${fo} : membres égaux`, v.every((x) => proche(x, v[0])));
}
/** Un décimal exact → « 1{,}75 ». */
const TD = (q) => tex(q);
/** Une étiquette de dessin « −3/4 », « 7/10 » → fraction exacte. */
const deLabel = (s) => {
  const m = /(−?)(\d+)\/(\d+)/.exec(s);
  return F((m[1] ? -1 : 1) * Number(m[2]), Number(m[3]));
};
const N = (x) => D(String(x));
const fracs = (texte) => [...texte.matchAll(/(-?)\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => F((m[1] ? -1 : 1) * Number(m[2]), Number(m[3])));
const signe = (a, b) => (inf(a, b) ? "<" : inf(b, a) ? ">" : "=");

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const rep = [];
  for (const l of e(1).split("\\n").slice(1)) {
    const m = /\$\\dfrac\{([^}]*)\}\{([^}]*)\} = \\dfrac\{([^}]*)\}\{([^}]*)\}\$/.exec(l);
    const v = m.slice(1).map((x) => (x === "\\ldots" ? null : Number(x)));
    const i = v.indexOf(null);
    const [a, b, cc, d] = v;
    const x = i === 0 ? (cc * b) / d : i === 1 ? (a * d) / cc : i === 2 ? (a * d) / b : (b * cc) / a;
    vrai(`1. le trou ${l} vaut un entier (${x})`, Number.isInteger(x));
    v[i] = x;
    vrai(`1. ${v} : fractions égales`, egal(F(v[0], v[1]), F(v[2], v[3])));
    dit(1, `Donc $${brut(v[0], v[1])} = ${brut(v[2], v[3])}$.`);
    rep.push(x);
  }
  dit(1, `Réponse : ${rep.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  const [a, b] = dessin("comparer", 1);
  vrai("1. les barres montrent le a)", a[0] === 2 && a[1] === 3 && egal(F(...a), F(...b)) && b[1] === 12);
});
essai("2", () => {
  const [base, ...cand] = fracs(e(2));
  const brutes = [...e(2).split("\\n")[1].matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
  const egales = brutes.filter(([n, d]) => egal(F(n, d), base));
  vrai("2. trois fractions égales", egales.length === 3 && cand.length === 5);
  dit(2, `Réponse : ${egales.slice(0, -1).map(([n, d]) => `$${brut(n, d)}$`).join(", ")} et $${brut(...egales.at(-1))}$.`);
  vrai("2. 12/30 vaut 2/5", egal(F(12, 30), F(2, 5)));
  dit(2, `elle vaut $${TF(F(12, 30))}$`);
  const [a, b] = dessin("comparer", 2);
  vrai("2. les barres : 3/8 et une égale", egal(F(...a), base) && egal(F(...b), base));
});
essai("3", () => {
  const brutes = e(3).split("\\n").slice(1).map((l) => /\\dfrac\{(\d+)\}\{(\d+)\}/.exec(l).slice(1).map(Number));
  const simples = brutes.map(([n, d]) => F(n, d));
  brutes.forEach(([n, d], i) => chaine(3, `${brut(n, d)} = `, `${TF(simples[i])}`));
  dit(3, `Réponse : ${simples.map((q, i) => `${"abcd"[i]}) $${TF(q)}$`).join(" ; ")}.`);
  chaine(3, `${brut(36, 48)} = ${brut(18, 24)}`, TF(F(3, 4)));
  const [a, b] = dessin("comparer", 3);
  vrai("3. les barres : 14/21 et sa forme simple", a[0] === brutes[0][0] && a[1] === brutes[0][1] && egal(F(...b), simples[0]) && egal(F(b[0], b[1]), F(b[0], b[1])) && b[1] === Number(simples[0].d));
});
essai("4", () => {
  const ls = e(4).split("\\n").slice(1).map((l) => /\$(\d+) \\div (\d+)\$/.exec(l).slice(1).map(Number));
  const [, , , points] = dessin("droiteRel", 4);
  ls.forEach(([a, b], i) => {
    const q = F(a, b);
    dit(4, `$${a} \\div ${b} = ${brut(a, b)}`);
    chaine(4, brut(a, b), TD(q));
    dit(4, `${"abcd"[i]}) $${brut(a, b)} = ${TD(q)}$`);
    const p = points.find((x) => x.label === `${a}/${b}`);
    vrai(`4. ${a}/${b} placé en ${p?.value}`, !!p && egal(N(p.value), q));
  });
});
essai("5", () => {
  const ls = e(5).split("\\n").slice(1).map((l) => /\$(-?[\d{},]+)\$/.exec(l)[1]);
  const vals = ls.map((s) => D(s.replace("{,}", ".")));
  dit(5, `Réponse : ${vals.map((q, i) => `${"abcde"[i]}) $${q.d === 1n ? brut(q.n, 1) : TF(q)}$`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 5);
  lignes.forEach((l, i) => {
    vrai(`5. tableau ligne ${i + 1} : ${l[0]}`, egal(D(l[0].replace("−", "-").replace(",", ".")), vals[i]));
    vrai(`5. tableau ligne ${i + 1} : ${l[1]} = ${l[2]}`, egal(deLabel(l[1]), vals[i]) && egal(deLabel(l[2]), vals[i]));
  });
  chaine(5, brut(12, 10), TF(F(6, 5)));
  chaine(5, brut(8, 100), TF(F(2, 25)));
});
essai("6", () => {
  const ls = e(6).split("\\n").slice(1).map((l) => /\$([^$]*)\$ et \$([^$]*)\$/.exec(l).slice(1));
  const s = ls.map(([A, B]) => signe(F(...(/\\dfrac\{(\d+)\}\{(\d+)\}/.exec(A) ?? [0, A, 1]).slice(1).map(Number)), F(...(/\\dfrac\{(\d+)\}\{(\d+)\}/.exec(B) ?? [0, B, 1]).slice(1).map(Number))));
  ls.forEach(([A, B], i) => dit(6, `$${A} ${s[i]} ${B}$`));
  dit(6, `Réponse : ${s.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  const [a, b] = dessin("comparer", 6);
  vrai("6. les barres : le c) redécoupé en douzièmes", egal(F(...a), F(3, 4)) && a[1] === 12 && b[0] === 11 && b[1] === 12);
});
essai("7", () => {
  const xs = e(7).split("\\n").slice(1).map((l) => fracs(l)[0]);
  const ops = xs.map((x) => Q(-x.n, x.d));
  xs.forEach((x, i) => dit(7, `L'opposé de $${TF(x)}$ est $${TF(ops[i])}$`));
  dit(7, `Réponse : ${ops.map((x, i) => `${"abc"[i]}) $${TF(x)}$`).join(" ; ")}.`);
  const [, , , points] = dessin("droiteRel", 7);
  vrai("7. la droite porte les trois nombres et leurs opposés", [...xs, ...ops].every((q) => points.some((p) => egal(N(p.value), q) && egal(deLabel(p.label), q))) && points.length === 6);
});
essai("8", () => {
  const brutes = [...e(8).split("\\n")[1].matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
  const un = F(1, 1);
  const petites = brutes.filter(([n, d]) => inf(F(n, d), un)), egales = brutes.filter(([n, d]) => egal(F(n, d), un)), grandes = brutes.filter(([n, d]) => inf(un, F(n, d)));
  const L = (xs) => xs.map(([n, d]) => `$${brut(n, d)}$`).join(" et ");
  dit(8, `Réponse : plus petites que $1$ : ${L(petites)} ; égale à $1$ : ${L(egales)} ; plus grandes que $1$ : ${L(grandes)}.`);
  const [, , , points] = dessin("droiteRel", 8);
  vrai("8. la droite porte les cinq fractions", brutes.every(([n, d]) => points.some((p) => p.label === `${n}/${d}` && egal(N(p.value), F(n, d)))));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [a, b] = e(9).split("\\n")[0].match(/\\dfrac\{\d+\}\{\d+\}/g).map((s) => /\{(\d+)\}\{(\d+)\}/.exec(s).slice(1).map(Number));
  const qa = F(...a), qb = F(...b);
  vrai("9. égales", egal(qa, qb));
  chaine(9, `${brut(...a)} = `, TF(qa));
  chaine(9, `${brut(...b)} = `, TF(qb));
  chaine(9, `${brut(28, 70)} = ${brut(14, 35)}`, TF(qb));
  const cent = F(Number(qa.n) * (100 / Number(qa.d)), 100);
  vrai("9. dénominateur 100 possible", 100 % Number(qa.d) === 0);
  chaine(9, `${TF(qa)} = `, brut(Number(qa.n) * (100 / Number(qa.d)), 100));
  dit(9, `Réponse : a) $${TF(qa)}$ et $${TF(qb)}$ ; b) elles sont égales ; c) $${brut(Number(qa.n) * (100 / Number(qa.d)), 100)} = ${TD(cent)}$.`);
  const [, lignes] = dessin("table", 9);
  lignes.forEach((l) => {
    const [n, d] = l[0].split("/").map(Number);
    const k = Number(l[1]);
    vrai(`9. tableau : ${l[0]} ÷ ${k} = ${l[2]}`, n % k === 0 && d % k === 0 && `${n / k}/${d / k}` === l[2] && egal(deLabel(l[2]), qa));
  });
});
essai("10", () => {
  const brutes = [...e(10).split("\\n")[1].matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
  const tri = [...brutes].sort((x, y) => (inf(F(...x), F(...y)) ? -1 : 1));
  dit(10, `Réponse : $${tri.map((x) => brut(...x)).join(" < ")}$.`);
  brutes.filter(([, d]) => d !== 16).forEach(([n, d]) => dit(10, `$${brut(n, d)} = ${brut((n * 16) / d, 16)}$`));
  const [, , , points] = dessin("droiteRel", 10);
  vrai("10. la droite range les cinq fractions", tri.every(([n, d], i) => points[i].label === `${n}/${d}` && egal(N(points[i].value), F(n, d))));
});
essai("11", () => {
  vrai("11a. 5/12 < 1/2", inf(F(5, 12), F(1, 2)));
  dit(11, `$${brut(1, 2)} = ${brut(6, 12)}$`);
  dit(11, `$${brut(5, 12)} < ${brut(6, 12)}$`);
  vrai("11b. 2/3 ≠ 3/4 et 2/3 < 3/4", !egal(F(2, 3), F(3, 4)) && inf(F(2, 3), F(3, 4)));
  dit(11, `$${brut(2, 3)} = ${brut(8, 12)}$ et $${brut(3, 4)} = ${brut(9, 12)}$`);
  dit(11, `Réponse : a) $${brut(5, 12)} < ${brut(1, 2)}$ ; b) $${brut(2, 3)} < ${brut(3, 4)}$, elles ne sont pas égales.`);
  const [a, b] = dessin("comparer", 11);
  vrai("11. les barres : 5/12 et 6/12", a.join() === "5,12" && b.join() === "6,12");
});
essai("12", () => {
  const n = [...e(12).matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const cl = [[n[0], n[1]], [n[2], n[3]], [n[4], n[5]]];
  const q = cl.map((x) => F(...x));
  cl.forEach((x, i) => dit(12, `$${brut(...x)} = ${TF(q[i])}$`));
  vrai("12b. A et C égales, B différente", egal(q[0], q[2]) && !egal(q[0], q[1]));
  vrai("12c. B la plus petite", inf(q[1], q[0]) && inf(q[1], q[2]));
  dit(12, `Réponse : a) $${TF(q[0])}$, $${TF(q[1])}$, $${TF(q[2])}$ ; b) la 5e A et la 5e C ; c) la 5e B.`);
  const [, lignes] = dessin("table", 12);
  lignes.forEach((l, i) => vrai(`12. tableau ${l[0]}`, l[1] === `${cl[i][0]}/${cl[i][1]}` && egal(deLabel(l[2]), q[i]) && l[2] === `${q[i].n}/${q[i].d}`));
});
essai("13", () => {
  const xs = fracs(e(13).split("\\n")[0]);
  const ops = xs.map((x) => Q(-x.n, x.d));
  dit(13, `L'opposé de $${brut(7, 10).replace(/^/, "-")}$ est $${TF(ops[0])}$`);
  dit(13, `L'opposé de $${brut(13, 4)}$ est $${TF(ops[1])}$`);
  vrai("13. −6/6 = −1, opposé 1", egal(xs[2], Q(-1)) && egal(ops[2], Q(1)));
  dit(13, `Réponse : a) $${TF(ops[0])}$ ; $${TF(ops[1])}$ ; $1$ ; b) $${TD(xs[0])}$ et $${TD(ops[0])}$ ; c) faux.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 13);
  vrai("13. la droite : −7/10 et 7/10", points.every((p) => egal(N(p.value), deLabel(p.label))) && points.some((p) => egal(N(p.value), xs[0])) && points.some((p) => egal(N(p.value), ops[0])));
  vrai("13. deux arcs de même longueur, depuis 0", sauts.every((s) => s.de === 0 && egal(D(s.label.replace(",", ".")), ops[0]) && Math.abs(s.vers) === Number(TD(ops[0]).replace("{,}", "."))));
});
essai("14", () => {
  const q = fracs(e(14));
  vrai("14. trois fractions", q.length === 3);
  const en24 = q.map((x) => Number(x.n) * (24 / Number(x.d)));
  q.forEach((x, i) => chaine(14, `${TF(x)} = `, brut(en24[i], 24)));
  dit(14, `Inès a mangé $${en24[0]}$ carreaux, Hugo $${en24[1]}$, Sam $${en24[2]}$.`);
  vrai("14. Inès < Hugo < Sam", en24[0] < en24[1] && en24[1] < en24[2]);
  dit(14, `Réponse : a) $${en24.map((n) => brut(n, 24)).join("$, $")}$ ; b) $${en24[0]}$, $${en24[1]}$ et $${en24[2]}$ carreaux ; c) Inès, Hugo, Sam.`);
  const [liste] = dessin("barres", 14);
  vrai("14. les barres : 24 parts, les bons carreaux, les bonnes fractions", liste.every((b, i) => b.d === 24 && b.n === en24[i] && egal(deLabel(b.label), q[i])));
});
essai("15", () => {
  const [base] = fracs(e(15));
  const somme = Number(/vaut \$(\d+)\$/.exec(e(15))[1]);
  const k = somme / Number(base.n + base.d);
  vrai("15. k entier", Number.isInteger(k));
  const sol = [Number(base.n) * k, Number(base.d) * k];
  dit(15, `Réponse : je suis $${brut(...sol)}$.`);
  for (let j = 1; j <= k; j++) dit(15, `$${Number(base.n) * j} + ${Number(base.d) * j} = ${Number(base.n + base.d) * j}$`);
  vrai("15. 20/20 vaut 1", egal(F(20, 20), Q(1)));
  const [, lignes] = dessin("table", 15);
  vrai("15. tableau : la famille de 3/5 et ses sommes", lignes.every((l, i) => egal(deLabel(l[0]), base) && l[0] === `${Number(base.n) * (i + 1)}/${Number(base.d) * (i + 1)}` && Number(l[1]) === Number(base.n + base.d) * (i + 1)) && Number(lignes.at(-1)[1]) === somme);
});
essai("16", () => {
  const [q] = fracs(e(16));
  const ent = q.n / q.d, reste = q.n % q.d;
  dit(16, `$${brut(Number(q.n), Number(q.d))} = ${TD(q)}$`);
  dit(16, `$${brut(Number(q.n), Number(q.d))} = ${ent} + ${brut(Number(reste), Number(q.d))}$`);
  dit(16, `Réponse : a) $${q.n} \\div ${q.d} = ${TD(q)}$ ; b) entre $${ent}$ et $${ent + 1n}$ ; c) $${brut(Number(reste), Number(q.d))}$.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 16);
  vrai("16. le point 17/4", egal(N(points[0].value), q) && points[0].label === "17/4");
  vrai("16. l'arc : de 4 à 17/4, un quart", sauts[0].de === Number(ent) && egal(N(sauts[0].vers), q) && egal(deLabel(sauts[0].label), F(Number(reste), Number(q.d))));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const n = [...e(17).split("\\n")[0].matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const j = { Emma: [n[0], n[1]], Lou: [n[2], n[3]], Nina: [n[4], n[5]] };
  const q = Object.fromEntries(Object.entries(j).map(([k, v]) => [k, F(...v)]));
  dit(17, `Emma : $${brut(...j.Emma)}$ ; Lou : $${brut(...j.Lou)}$ ; Nina : $${brut(...j.Nina)}$.`);
  const v20 = (x) => brut(Number(x.n) * (20 / Number(x.d)), 20);
  dit(17, `$${brut(...j.Emma)} = ${v20(q.Emma)}$ et $${brut(...j.Nina)} = ${v20(q.Nina)}$`);
  const v80 = (x) => brut(Number(x.n) * (80 / Number(x.d)), 80);
  dit(17, `$${brut(...j.Emma)} = ${v80(q.Emma)}$ et $${brut(...j.Lou)} = ${v80(q.Lou)}$`);
  const ordre = Object.keys(q).sort((a, b) => (inf(q[b], q[a]) ? -1 : 1));
  dit(17, `d) ${ordre[0]}, puis ${ordre[1]}, puis ${ordre[2]}.`);
  const apres = [j.Lou[0] + 4, j.Lou[1] + 4];
  vrai("17e. Lou rattrape Nina exactement", egal(F(...apres), q.Nina));
  dit(17, `$${brut(...apres)} = ${TF(F(...apres))}$`);
  const [liste] = dessin("barres", 17);
  vrai("17. les barres, de la plus adroite à la moins adroite", liste.every((b, i) => b.label.startsWith(ordre[i]) && b.n === j[ordre[i]][0] && b.d === j[ordre[i]][1] && egal(deLabel(b.label), q[ordre[i]])));
});
essai("18", () => {
  const n = [...e(18).matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const [tot, m, dl, ec] = n;
  const q = [m, dl, ec].map((x) => F(x, tot));
  [m, dl, ec].forEach((x, i) => dit(18, `$${brut(x, tot)} = ${TF(q[i])}$`));
  vrai("18b. l'école a la plus grande part", inf(q[0], q[1]) && inf(q[1], q[2]));
  const prairie = tot - m - dl - ec;
  dit(18, `$${m} + ${dl} + ${ec} = ${m + dl + ec}$`);
  dit(18, `$${tot} - ${m + dl + ec} = ${prairie}$`);
  vrai("18c. 13/60 irréductible", egal(F(prairie, tot), { n: BigInt(prairie), d: BigInt(tot) }));
  dit(18, `Réponse : a) $${q.map(TF).join("$, $")}$ ; b) l'école ; c) $${prairie}$ parcelles, $${brut(prairie, tot)}$, qui ne se simplifie pas.`);
  const [li, co, groupes] = dessin("parcelles", 18);
  vrai("18. le jardin dessiné : 60 parcelles, les trois groupes", li * co === tot && groupes.map((g) => g.n).join() === [m, dl, ec].join());
});
essai("19", () => {
  const q20 = F(20, 60), q45 = F(45, 60), q90 = F(90, 60);
  chaine(19, `${brut(20, 60)} = `, TF(q20));
  chaine(19, `${brut(45, 60)} = `, TF(q45));
  chaine(19, `${brut(90, 60)} = `, TF(q90));
  dit(19, `$3 \\div 2 = ${TD(q90)}$`);
  const minutes = 1.3 * 60;
  vrai("19d. 1,3 h = 78 min = 1 h 18 min", Math.round(minutes) === 78);
  dit(19, "$60 \\div 10 = 6$");
  dit(19, `Réponse : a) $${TF(q20)}$ ; b) $${TF(q45)}$ ; c) $${TF(q90)}$ h, soit $${TD(q90)}$ h ; d) non, $1{,}3$ h, c'est $1$ h $18$ min.`);
  const [n, d, leg] = dessin("disque", 19);
  vrai("19. le cadran : 45 min en douzièmes d'heure", egal(F(n, d), q45) && d === 12 && egal(deLabel(leg), q45));
});
essai("20", () => {
  const [bas, haut] = fracs(e(20)).slice(0, 2);
  const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
  const possibles = Array.from({ length: 11 }, (_, i) => i + 1).filter((k) => inf(bas, F(k, 12)) && inf(F(k, 12), haut));
  const impairs = possibles.filter((k) => k % 2 === 1);
  const sol = impairs.filter((k) => pgcd(k, 12) > 1);
  vrai(`20. une seule fraction (${sol})`, sol.length === 1);
  dit(20, `mon numérateur est ${possibles.slice(0, -1).map((k) => `$${k}$`).join(", ")} ou $${possibles.at(-1)}$.`);
  dit(20, `il reste $${impairs.join("$ ou $")}$.`);
  const s = F(sol[0], 12);
  dit(20, `Réponse : b) $${brut(sol[0], 12)}$ ; c) $${TF(s)}$ ; d) $${TF(Q(-s.n, s.d))}$.`);
  dit(20, `$${TF(bas)} = ${brut(Number(bas.n) * (12 / Number(bas.d)), 12)}$ et $${TF(haut)} = ${brut(Number(haut.n) * (12 / Number(haut.d)), 12)}$`);
  const [liste] = dessin("barres", 20);
  vrai("20. les barres : 1/2, moi, 5/6 en douzièmes", liste.length === 3 && liste.every((b) => b.d === 12) && egal(F(liste[0].n, 12), bas) && liste[1].n === sol[0] && egal(F(liste[2].n, 12), haut));
});

f.fin();
