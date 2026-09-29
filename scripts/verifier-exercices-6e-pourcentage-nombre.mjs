// Recalcul indépendant de la feuille « Les pourcentages » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-pourcentage-nombre.tsx.
//
// ⭐ Deux étages :
//   1. TOUTE formule « A = B = C » d'un corrigé est relue membre à membre (en
//      flottant ; « p\,\% » vaut p centièmes, \dfrac, ×, ÷ et {,} compris) :
//      37 % + 63 % = 100 %, 7/10 = 70/100 = 70 %… une étape fausse se voit.
//   2. Chaque exercice est refait à partir des nombres relus dans l'énoncé ou
//      dans le dessin (grille de 100, barre de 0 à 100 %, camembert, droite,
//      tableaux), et la réponse écrite est cherchée dans le corrigé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-pourcentage-nombre.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, tex, D, texFrac } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-pourcentage-nombre.tsx", "pourcentage_nombre", ["droiteRel", "table", "pourcents", "camembert", "grille"], "6e");
const { c, e, vrai, dit, dessin, essai, feuille } = f;

const F = (a, b = 1) => Q(a, b);
const brut = (a, b) => `\\dfrac{${a}}{${b}}`;
const TD = (q) => tex(q);
const pc = (p) => `${p}\\,\\%`;
const lignes = (k) => e(k).split("\\n");
/** p % de N, exact. */
const de = (p, N) => F(p * N, 100);
const num = (q) => Number(q.n) / Number(q.d);
/** « 1,5 » ou « 480 » d'un dessin → nombre. */
const lu = (s) => Number(String(s).replace(/\s/g, "").replace(",", "."));

/* ═══ 1. Toutes les égalités des corrigés, membre à membre ═══ */
const fl = (s) =>
  Function(
    `return ${s
      .replace(/\{,\}/g, ".")
      .replace(/\\,\\%/g, "*0.01")
      .replace(/\\,/g, "")
      .replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
      .replace(/\\times/g, "*")
      .replace(/\\div/g, "/")}`,
  )();
let relues = 0;
feuille.corrections.forEach((corr, i) => {
  // ⛔ La ligne du piège écrit l'égalité FAUSSE exprès (« 8 % = 0,8 ») : on ne la relit pas.
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
vrai(`plus de 60 égalités relues (${relues})`, relues > 60);

/** Contrôles d'une barre `pourcents` : valeur = p × total ÷ 100, repères écartés. */
function barreJuste(k, total, marques) {
  marques.forEach(([p, v]) => vrai(`${k}. barre : ${p} % de ${total} = ${v}`, Math.abs(lu(v) - (p * lu(total)) / 100) < 1e-9));
  const ps = marques.map(([p]) => p).sort((a, b) => a - b);
  vrai(`${k}. barre : repères à 20 % l'un de l'autre au moins, 90 % au plus`, ps.every((p, i) => i === 0 || p - ps[i - 1] >= 20) && ps.at(-1) <= 90);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [li, co, groupes] = dessin("grille", 1, "figure");
  vrai("1. la grille : 100 carreaux", li * co === 100);
  const n = groupes[0].n;
  dit(1, `$${Math.floor(n / co)}$ lignes de $${co}$, soit $${Math.floor(n / co) * co}$ carreaux. Plus $${n % co}$ carreaux`);
  dit(1, `Réponse : a) $${n}$ ; b) $${pc(n)}$ ; c) $${pc(100 - n)}$.`);
});
essai("2", () => {
  const ps = lignes(2).slice(1).map((l) => Number(/\$(\d+)\\,\\%\$/.exec(l)[1]));
  ps.forEach((p) => dit(2, `$${pc(p)} = ${brut(p, 100)}`));
  const simples = ps.map((p) => F(p, 100));
  dit(2, `Réponse : a) $${brut(ps[0], 100)} = ${texFrac(simples[0])}$ ; b) $${brut(ps[1], 100)}$ ; c) $${brut(ps[2], 100)} = ${texFrac(simples[2])}$ ; d) $${brut(ps[3], 100)} = ${texFrac(simples[3])}$.`);
  vrai("2b. 7/100 irréductible", simples[1].d === 100n);
  const [, tab] = dessin("table", 2);
  tab.forEach((l, i) => vrai(`2. tableau ${l[0]}`, lu(l[0].replace(" %", "")) === ps[i] && l[1] === `${ps[i]}/100` && (l[2] === "1" ? egal(simples[i], F(1)) : egal(F(...l[2].split("/").map(Number)), simples[i]))));
});
essai("3", () => {
  const fr = lignes(3).slice(1).map((l) => /\\dfrac\{(\d+)\}\{(\d+)\}/.exec(l).slice(1).map(Number));
  const ps = fr.map(([n, d]) => (100 % d === 0 ? (n * 100) / d : NaN));
  vrai("3. tous les dénominateurs divisent 100", ps.every(Number.isInteger));
  fr.forEach(([n, d], i) => dit(3, `$${brut(n, d)} = ${brut(ps[i], 100)} = ${pc(ps[i])}$`));
  dit(3, `Réponse : ${ps.map((p, i) => `${"abcde"[i]}) $${pc(p)}$`).join(" ; ")}.`);
  const [, tab] = dessin("table", 3);
  tab.forEach((l, i) => vrai(`3. tableau ${l[0]}`, l[0] === `${fr[i][0]}/${fr[i][1]}` && l[1] === `${ps[i]}/100` && l[2] === `${ps[i]} %`));
});
essai("4", () => {
  const vals = lignes(4).slice(1).map((l) => {
    const m = /\$(\d+)\\,\\%\$/.exec(l);
    return m ? { p: Number(m[1]) } : { d: D(/\$([\d{},]+)\$/.exec(l)[1].replace("{,}", ",")) };
  });
  const rep = vals.map((v, i) => {
    if (v.p !== undefined) {
      const q = F(v.p, 100);
      dit(4, `$${pc(v.p)} = ${brut(v.p, 100)} = ${TD(q)}$`);
      return `${"abcd"[i]}) $${TD(q)}$`;
    }
    const p = num(v.d) * 100;
    dit(4, `= ${pc(Math.round(p))}$`);
    return `${"abcd"[i]}) $${pc(Math.round(p))}$`;
  });
  dit(4, `Réponse : ${rep.join(" ; ")}.`);
  const [, , , points] = dessin("droiteRel", 4);
  vrai("4. la droite : chaque « p % » à p centièmes", points.every((p) => Math.abs(p.value * 100 - lu(p.label.replace(" %", ""))) < 1e-9));
  vrai("4. les quatre nombres sont sur la droite", [0.65, 0.08, 0.3, 0.04].every((x) => points.some((p) => Math.abs(p.value - x) < 1e-12)));
});
essai("5", () => {
  const ps = [...lignes(5)[0].matchAll(/\$(\d+)\\,\\%\$/g)].map((m) => Number(m[1]));
  const N = Number(/compte \$(\d+)\$ arbres/.exec(e(5))[1]);
  vrai("5. 100 arbres", N === 100);
  const reste = 100 - ps.reduce((s, x) => s + x, 0);
  dit(5, `$100 - ${ps.join(" - ")} = ${reste}$`);
  const nb = ps.map((p) => num(de(p, N)));
  dit(5, `Réponse : a) $${nb[0]}$ chênes, $${nb[1]}$ hêtres et $${nb[2]}$ pins ; b) $${pc(reste)}$, soit $${num(de(reste, N))}$ bouleaux.`);
  const [li, co, groupes, r] = dessin("grille", 5);
  vrai("5. la grille : 100 carreaux, 45 + 30 + 15, bouleaux", li * co === 100 && groupes.map((g) => g.n).join() === ps.join() && r === "bouleau");
});
essai("6", () => {
  const ls = lignes(6).slice(1).map((l) => /\$(\d+)\\,\\%\$ de \$(\d+)\$/.exec(l).slice(1).map(Number));
  const r = ls.map(([p, N]) => num(de(p, N)));
  vrai("6. résultats entiers", r.every(Number.isInteger));
  dit(6, `Réponse : ${r.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  const [total, , marques] = dessin("pourcents", 6);
  vrai("6. la barre porte le d) : 40", lu(total) === ls[3][1] && marques.some(([p, v]) => p === ls[3][0] && lu(v) === r[3]));
  barreJuste(6, total, marques);
});
essai("7", () => {
  const ls = lignes(7).slice(1).map((l) => /\$(\d+)\\,\\%\$ de \$(\d+)\$/.exec(l).slice(1).map(Number));
  const r = ls.map(([p, N]) => num(de(p, N)));
  dit(7, `Réponse : ${r.map((x, i) => `${"abcd"[i]}) $${tex(D(String(x)))}$`).join(" ; ")}.`);
  const [, tab] = dessin("table", 7);
  tab.forEach((l, i) => vrai(`7. tableau ${l[0]}`, l[0] === `${ls[i][0]} % de ${ls[i][1]}` && lu(l[1]) === ls[i][1] / 10 && lu(l[2]) === r[i]));
});
essai("8", () => {
  vrai("8b. 50 % de 30 = 15", num(de(50, 30)) === 15);
  dit(8, "$30 \\div 2 = 15$ élèves");
  vrai("8c. 10/100 = 1/10", egal(F(10, 100), F(1, 10)));
  vrai("8d. 60 % = 0,6", egal(F(60, 100), D("0.6")));
  dit(8, "Réponse : a) vrai ; b) faux, ce sont $15$ élèves ; c) vrai ; d) vrai.");
  const [li, co, groupes] = dessin("grille", 8);
  vrai("8. la grille : 10 carreaux sur 100 = une ligne", li * co === 100 && groupes[0].n === co && groupes[0].nom === "10 %");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [N, g] = [...lignes(9)[0].matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const p = (g * 100) / N;
  vrai("9. pourcentage entier", Number.isInteger(p));
  dit(9, `$${brut(g, N)} = ${brut(p, 100)}$, soit $${pc(p)}$`);
  dit(9, `Réponse : a) $${brut(g, N)}$ ; b) $${pc(p)}$ ; c) $${pc(100 - p)}$.`);
  dit(9, `C'est $${N - g}$ graines sur $${N}$`);
  const [total, , marques] = dessin("pourcents", 9);
  vrai("9. la barre : 50 graines, 84 % et 16 %", lu(total) === N && marques.some(([q, v]) => q === p && lu(v) === g) && marques.some(([q, v]) => q === 100 - p && lu(v) === N - g));
  barreJuste(9, total, marques);
});
essai("10", () => {
  const [prix] = [...lignes(10)[0].matchAll(/\$(\d+)\$ €/g)].map((m) => Number(m[1]));
  const [p1] = [...lignes(10)[0].matchAll(/\$-(\d+)\\,\\%\$/g)].map((m) => Number(m[1]));
  const p2 = Number(/\$-(\d+)\\,\\%\$/.exec(lignes(10)[3])[1]);
  const r1 = num(de(p1, prix)), r2 = num(de(p2, prix));
  dit(10, `Réponse : a) $${r1}$ € ; b) $${prix - r1}$ € ; c) $${prix - r2}$ €.`);
  const [total, , marques] = dessin("pourcents", 10);
  vrai("10. la barre : 25 % = 10 €, 75 % = 30 €", lu(total) === prix && marques.some(([q, v]) => q === p1 && lu(v) === r1) && marques.some(([q, v]) => q === 100 - p1 && lu(v) === prix - r1));
  barreJuste(10, total, marques);
});
essai("11", () => {
  const paires = lignes(11).slice(1).map((l) => [...l.matchAll(/\$(\d+)\\,\\%\$ de \$(\d+)\$/g)].map((m) => [Number(m[1]), Number(m[2])]));
  const rep = paires.map(([a, b]) => {
    const [ra, rb] = [num(de(...a)), num(de(...b))];
    vrai(`11. ${a} contre ${b} : pas d'égalité`, ra !== rb);
    return ra > rb ? a : b;
  });
  dit(11, `Réponse : a) $${pc(rep[0][0])}$ de $${rep[0][1]}$ ; b) $${pc(rep[1][0])}$ de $${rep[1][1]}$.`);
  vrai("11. le plus grand pourcentage perd les deux fois", paires.every(([a, b], i) => rep[i][0] === Math.min(a[0], b[0])));
  const [, tab] = dessin("table", 11);
  const toutes = paires.flat();
  tab.forEach((l, i) => vrai(`11. tableau ${l[0]}`, l[0] === `${toutes[i][0]} % de ${toutes[i][1]}` && lu(l[2]) === num(de(...toutes[i]))));
});
essai("12", () => {
  const cas = [F(40, 100), F(15, 100), D("0.2"), F(3, 25)];
  vrai("12. l'énoncé : 40 %, 15/100, 0,2, 3/25", e(12).includes(pc(40)) && e(12).includes(brut(15, 100)) && e(12).includes("0{,}2") && e(12).includes(brut(3, 25)));
  const ps = cas.map((q) => num(q) * 100).map((x) => Math.round(x));
  cas.forEach((q, i) => vrai(`12. ${ps[i]} % exact`, egal(q, F(ps[i], 100))));
  dit(12, `Réponse : a) $${brut(ps[0], 100)}$ et $${TD(cas[0])}$ ; b) $${pc(ps[1])}$ et $${TD(cas[1])}$ ; c) $${brut(ps[2], 100)}$ et $${pc(ps[2])}$ ; d) $${brut(ps[3], 100)}$, $${pc(ps[3])}$ et $${TD(cas[3])}$.`);
  const [, tab] = dessin("table", 12);
  tab.forEach((l, i) => vrai(`12. tableau ${l[0]}`, l[0] === `${ps[i]} %` && l[1] === `${ps[i]}/100` && egal(D(l[2]), cas[i])));
});
essai("13", () => {
  const N = Number(/a \$(\d+)\$ livres/.exec(e(13))[1]);
  const [pr, pb] = [...e(13).matchAll(/\$(\d+)\\,\\%\$/g)].map((m) => Number(m[1]));
  const pd = 100 - pr - pb;
  const nb = [pr, pb, pd].map((p) => num(de(p, N)));
  vrai("13. total 300", nb.reduce((s, x) => s + x, 0) === N);
  dit(13, `Réponse : a) $${pc(pd)}$ ; b) $${nb[0]}$ romans, $${nb[1]}$ BD et $${nb[2]}$ documentaires.`);
  const [parts] = dessin("camembert", 13);
  vrai("13. le camembert : 40, 35, 25", parts.map((p) => p.valeur).join() === [pr, pb, pd].join() && parts.reduce((s, p) => s + p.valeur, 0) === 100);
});
essai("14", () => {
  const N = Number(/pèse \$(\d+)\$ Mo/.exec(e(14))[1]);
  const [p1, p2] = [...e(14).matchAll(/\$(\d+)\\,\\%\$/g)].map((m) => Number(m[1]));
  const [r1, r2] = [num(de(p1, N)), num(de(p2, N))];
  dit(14, `Réponse : a) $${r1}$ Mo ; b) $${r2}$ Mo ; c) $${N - r2}$ Mo.`);
  vrai("14c. le reste vaut 40 %", num(de(100 - p2, N)) === N - r2 && c(14).includes(pc(100 - p2)));
  const [total, , marques] = dessin("pourcents", 14);
  vrai("14. la barre : 800 Mo, 25 % et 60 %", lu(total) === N && marques.map(([p]) => p).join() === `${p1},${p2}`);
  barreJuste(14, total, marques);
});
essai("15", () => {
  const [p, N] = /\$(\d+)\\,\\%\$ de \$(\d+)\$/.exec(lignes(15)[1]).slice(1).map(Number);
  const r = num(de(p, N));
  const [n, d] = /\\dfrac\{(\d+)\}\{(\d+)\}/.exec(lignes(15)[2]).slice(1).map(Number);
  const pJ = (n * 100) / d;
  const pM = num(D("0.7")) * 100;
  dit(15, `Réponse : a) $${r}$ ; b) $${pc(pJ)}$ ; c) $${pc(Math.round(pM))}$.`);
  vrai("15b. Jade : 2/5 n'est pas 25 %", pJ !== 25);
  const [, , groupes] = dessin("grille", 15);
  vrai("15. la grille : 70 carreaux pour 0,7", groupes[0].n === Math.round(pM) && groupes[0].nom === `${Math.round(pM)} %`);
});
essai("16", () => {
  const N = Number(/contient \$(\d+)\$ L/.exec(e(16))[1]);
  const p = Number(/rempli à \$(\d+)\\,\\%\$/.exec(e(16))[1]);
  const r = num(de(p, N));
  dit(16, `Réponse : a) $${num(de(10, N))}$ L et $${num(de(5, N))}$ L ; b) $${r}$ L ; c) $${N - r}$ L.`);
  vrai("16. contrôle : 65 % de 60 = 39", num(de(100 - p, N)) === N - r);
  const [total, , marques] = dessin("pourcents", 16);
  vrai("16. la barre : 60 L, 10 % = 6, 35 % = 21", lu(total) === N && marques.some(([q, v]) => q === 10 && lu(v) === num(de(10, N))) && marques.some(([q, v]) => q === p && lu(v) === r));
  barreJuste(16, total, marques);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const N = Number(/classe de \$(\d+)\$ élèves/.exec(e(17))[1]);
  const nb = [...lignes(17)[0].matchAll(/\$(\d+)\$ (?:élèves choisissent le football|la natation|le basket|le handball)/g)].map((m) => Number(m[1]));
  vrai("17. quatre sports, 20 élèves", nb.length === 4 && nb.reduce((s, x) => s + x, 0) === N);
  const ps = nb.map((x) => (x * 100) / N);
  nb.forEach((x, i) => dit(17, `$${brut(x, N)} = ${brut(ps[i], 100)}$, soit $${pc(ps[i])}$`));
  const college = Number(/collège de \$(\d+)\$ élèves/.exec(e(17))[1]);
  dit(17, `Réponse : a) $${ps.slice(0, 3).map(pc).join("$, $")}$ et $${pc(ps[3])}$ ; b) oui ; c) $${num(de(ps[0], college))}$ élèves.`);
  const [parts] = dessin("camembert", 17);
  vrai("17. le camembert : les quatre pourcentages", parts.map((p) => p.valeur).join() === ps.join());
  vrai("17. pas deux petits secteurs voisins (< 20)", parts.every((p, i) => !(p.valeur < 20 && parts[(i + 1) % parts.length].valeur < 20)));
});
essai("18", () => {
  const B = Number(/est de \$(\d+)\$ €/.exec(e(18))[1]);
  const ps = [...lignes(18)[0].matchAll(/\$(\d+)\\,\\%\$/g)].map((m) => Number(m[1]));
  const boissons = 100 - ps.reduce((s, x) => s + x, 0);
  const euros = [...ps, boissons].map((p) => num(de(p, B)));
  vrai("18. total 150 €", euros.reduce((s, x) => s + x, 0) === B);
  const moins = Number(/coûte \$(\d+)\$ € de moins/.exec(e(18))[1]);
  const musique = euros[2] - moins;
  const p = (musique * 100) / B;
  vrai("18c. pourcentage entier", Number.isInteger(p));
  dit(18, `Sa part : $${brut(musique, B)}$`);
  dit(18, `Réponse : a) $${pc(boissons)}$ ; b) $${euros[0]}$ €, $${euros[1]}$ €, $${euros[2]}$ € et $${euros[3]}$ € ; c) $${pc(p)}$.`);
  const [li, co, groupes, reste] = dessin("grille", 18);
  vrai("18. la grille : 100 carreaux, 40 + 30 + 10, le reste à boire", li * co === 100 && groupes.map((g) => g.n).join() === ps.join() && reste === "à boire");
});
essai("19", () => {
  const [vA, pA, vB, pB] = [...lignes(19)[0].matchAll(/\$(\d+)\$ cL|\$(\d+)\\,\\%\$/g)].map((m) => Number(m[1] ?? m[2]));
  const [jA, jB] = [num(de(pA, vA)), num(de(pB, vB))];
  vrai("19. B a plus de jus, A est plus riche", jB > jA && pA > pB);
  dit(19, `Réponse : a) $${jA}$ cL ; b) $${jB}$ cL ; c) B contient le plus de jus ; A est la plus riche en jus.`);
  const [, tab] = dessin("table", 19);
  vrai("19. le tableau", tab[0][1] === `${vA} cL` && tab[0][2] === `${vB} cL` && tab[1][1] === `${pA} %` && tab[1][2] === `${pB} %` && tab[2][1] === `${jA} cL` && tab[2][2] === `${jB} cL`);
});
essai("20", () => {
  const P = Number(/coûte \$(\d+)\$ €/.exec(e(20))[1]);
  const p = Number(/A fait \$-(\d+)\\,\\%\$/.exec(e(20))[1]);
  const rB = Number(/B fait \$-(\d+)\$ €/.exec(e(20))[1]);
  const rA = num(de(p, P));
  dit(20, `Réponse : a) $${P - rA}$ € ; b) $${P - rB}$ € ; c) le magasin ${P - rA < P - rB ? "A" : "B"} ; d) $${pc((rB * 100) / P)}$.`);
  dit(20, `$${brut(rB, P)}$`);
  const [, tab] = dessin("table", 20);
  vrai("20. le tableau", tab[0][0] === `A : −${p} %` && lu(tab[0][1].replace(" €", "")) === rA && lu(tab[0][2].replace(" €", "")) === P - rA && tab[1][0] === `B : −${rB} €` && lu(tab[1][2].replace(" €", "")) === P - rB);
});

/* ═══ Les légendes des grilles tiennent dans le viewBox de 300 ═══ */
for (const { args } of f.appels("grille").filter((a) => a.args)) {
  const [, , groupes, reste = ""] = args;
  const noms = [...groupes.map((g) => g.nom), reste].filter(Boolean);
  const fin = 8 + noms.reduce((s, n) => s + 24 + n.length * 8.5, 0) - 8;
  vrai(`légende « ${noms.join(", ")} » : ${fin} ≤ 300`, fin <= 300);
}

f.fin();
