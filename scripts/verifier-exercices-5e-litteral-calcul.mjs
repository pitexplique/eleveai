// Recalcul indépendant de la feuille « Le calcul littéral » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-litteral-calcul.tsx.
//
// ⭐ Le script LIT les expressions telles qu'elles sont écrites (« 5(x + 4) »,
// « 2L + 2l », « 4 \times 2{,}5 + 7 ») et les évalue lui-même, lettres
// remplacées par des nombres : une réduction ou un développement est juste
// quand les deux écritures coïncident sur plusieurs valeurs ; une chaîne
// « A = … = … » est juste quand tous ses membres sont égaux. Les tests
// d'égalité sont refaits valeur par valeur, les dessins (tuiles, aire,
// balance, machine, allumettes, bordure, triangle, tableaux) relus dans le
// source et recomptés.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-litteral-calcul.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-litteral-calcul.tsx", "litteral_calcul", ["tuiles", "aire", "balance", "machine", "allumettes", "bordure", "table"]);
const { c, e, vrai, dit, dessin, essai } = f;

/** Valeur d'une écriture (LaTeX ou texte de dessin), lettres remplacées par `vars`. */
function val(expr, vars = {}) {
  let s = String(expr)
    .replace(/\\left|\\right/g, "")
    .replace(/\\times|×/g, "*")
    .replace(/\{,\}/g, ".")
    .replace(/\\,/g, "")
    .replace(/−/g, "-")
    .replace(/(\d),(\d)/g, "$1.$2");
  s = s.replace(/([0-9a-zA-Z)])(?=[a-zA-Z(])/g, "$1*");
  s = s.replace(/[a-zA-Z]/g, (m) => {
    if (!(m in vars)) throw new Error(`lettre ${m} sans valeur dans « ${expr} »`);
    return `(${vars[m]})`;
  });
  return Function(`return ${s}`)();
}
const proche = (a, b) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b));
const VALEURS = [0, 1, 2, 3, 7, 0.5, 10];
/** Deux écritures en une lettre sont-elles égales pour toutes les valeurs ? */
const identiques = (a, b, l = "x") => VALEURS.every((v) => proche(val(a, { [l]: v }), val(b, { [l]: v })));
/** Une formule du corrigé k commence par `debut` ; ses membres (sauf un nom seul comme « A ») sont égaux. Rend la valeur. */
function chaine(k, debut, vars = {}) {
  const fo = [...c(k).matchAll(/\$([^$]*)\$/g)].map((m) => m[1]).find((x) => x.startsWith(debut) && x.includes(" = "));
  if (!fo) {
    vrai(`${k}. une formule « ${debut}… »`, false);
    return NaN;
  }
  const membres = fo.split(" = ").filter((m) => !/^[A-Z]$/.test(m.trim()));
  const v = membres.map((m) => val(m, vars));
  vrai(`${k}. ${fo} : membres égaux`, v.every((x) => proche(x, v[0])));
  return v[0];
}
/** Écrit un nombre comme la feuille : 2{,}5. */
const T = (x) => String(x).replace(".", "{,}");

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [lettre, rangees, legende] = dessin("tuiles", 1);
  vrai("1. les tuiles : 5 barres y et 8 carrés", lettre === "y" && rangees[0][0] === 5 && rangees[0][1] === 8 && legende === "5y + 8");
  dit(1, "coefficient $5$, terme constant $8$");
  for (const [g, d] of [["7 \\times a", "7a"], ["b \\times 4", "4b"], ["2 \\times x + 3 \\times y", "2x + 3y"]]) {
    const vars = { a: 3, b: 5, x: 2, y: 7 };
    vrai(`1c. ${g} = ${d}`, proche(val(g, vars), val(d, vars)));
    dit(1, `$${g} = ${d}$`);
  }
});
essai("2", () => {
  const rep = { a: "3a", b: "b - 6", c: "2t - 10", d: "2(x + 9)" };
  const sens = { a: (v) => 3 * v, b: (v) => v - 6, c: (v) => 2 * v - 10, d: (v) => (v + 9) * 2 };
  const lettres = { a: "a", b: "b", c: "t", d: "x" };
  for (const q of "abcd") vrai(`2${q}. ${rep[q]} traduit la phrase`, VALEURS.every((v) => proche(val(rep[q], { [lettres[q]]: v }), sens[q](v))));
  dit(2, `Réponse : a) $${rep.a}$ ; b) $${rep.b}$ ; c) $${rep.c}$ ; d) $${rep.d}$.`);
  vrai("2d. sans parenthèses, ce n'est pas pareil", !identiques("x + 9 \\times 2", "2(x + 9)"));
  const [, lignes] = dessin("table", 2);
  lignes.forEach((l, i) => vrai(`2. tableau ligne ${i + 1}`, l[1].replace(/−/g, "-") === rep["abcd"[i]]));
});
essai("3", () => {
  const expr = /\$A = ([^$]*)\$/.exec(e(3))[1];
  const xs = [...e(3).matchAll(/\$x = ([\d{},]+)\$/g)].map((m) => val(m[1]));
  const vals = xs.map((x) => val(expr, { x }));
  xs.forEach((x, i) => {
    const v = chaine(3, `A = 4 \\times ${T(x)}`);
    vrai(`3. A(${x}) = ${vals[i]}`, proche(v, vals[i]));
  });
  dit(3, `Réponse : a) $${T(vals[0])}$ ; b) $${T(vals[1])}$ ; c) $${T(vals[2])}$.`);
  const [ent, lig] = dessin("tableau", 3);
  vrai("3. tableau : x et A", ent.slice(1).every((s, i) => proche(val(s), xs[i])) && lig.slice(1).every((s, i) => proche(val(s), vals[i])) && lig[0] === "4x + 7");
});
essai("4", () => {
  const rep = [["6a + 4a", "10a", "a"], ["9y - 2y", "7y", "y"], ["t + t + t + t + t", "5t", "t"], ["3x + 5 + 2x", "5x + 5", "x"], ["7m + 2", "7m + 2", "m"]];
  rep.forEach(([a, b, l]) => {
    vrai(`4. ${a} = ${b}`, identiques(a, b, l) && e(4).includes(`$${a}$`));
    if (a !== b) dit(4, `$${a} = ${b}$`);
  });
  dit(4, `Réponse : ${rep.map(([, b], i) => `${"abcde"[i]}) $${b}$`).join(" ; ")}.`);
  const [l, rangees, leg] = dessin("tuiles", 4);
  const [g, d] = leg.split(" = ");
  vrai("4. les tuiles du d)", l === "x" && identiques(rangees.map(([b, u]) => `${b}x + ${u}`).join(" + "), g) && identiques(g, d));
});
essai("5", () => {
  const [g, d] = /\$([^$]*) = ([^$]*)\$ est-elle/.exec(e(5)).slice(1);
  for (const x of [2, 5]) {
    const [vg, vd] = [val(g, { x }), val(d, { x })];
    const vg2 = chaine(5, `5 \\times ${x}`), vd2 = chaine(5, `3 \\times ${x}`);
    vrai(`5. x = ${x} : ${vg} et ${vd} lus`, proche(vg2, vg) && proche(vd2, vd));
    dit(5, `l'égalité est ${proche(vg, vd) ? "vraie" : "fausse"} pour $x = ${x}$`);
  }
  const [titre, bg, bd, eq] = dessin("balance", 5);
  const x = Number(/x = (\d+)/.exec(titre)[1]);
  vrai("5. la balance : x = 5, deux plateaux à 21, équilibre", Number(bg.split(" = ")[1]) === val(g, { x }) && Number(bd.split(" = ")[1]) === val(d, { x }) && eq === proche(val(g, { x }), val(d, { x })));
});
essai("6", () => {
  const ls = e(6).split("\\n").slice(1).map((l) => /\$(.*)\$/.exec(l)[1]);
  const rep = ["5x + 20", "6a + 3", "7y - 14", "8 + 6t"];
  ls.forEach((a, i) => {
    const l = a.match(/[a-z]/)[0];
    vrai(`6. ${a} = ${rep[i]}`, identiques(a, rep[i], l));
    const fo = [...c(6).matchAll(/\$([^$]*)\$/g)].map((m) => m[1]).find((x) => x.startsWith(`${a} = `));
    vrai(`6. chaîne ${fo}`, !!fo && fo.split(" = ").every((m) => identiques(m, a, l)) && fo.endsWith(rep[i]));
  });
  dit(6, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) $${r}$`).join(" ; ")}.`);
  const [k, parts, aires] = dessin("aire", 6);
  vrai("6. le rectangle du a)", identiques(`${k}(${parts[0]} + ${parts[1]})`, `${aires[0]} + ${aires[1]}`) && identiques(`${k}${parts[0]}`, aires[0]) && val(aires[1]) === Number(k) * Number(parts[1]));
});
essai("7", () => {
  vrai("7a. 4x ≠ 4 + x (x = 10)", val("4x", { x: 10 }) === 40 && val("4 + x", { x: 10 }) === 14);
  dit(7, "$4x = 40$, alors que $4 + x = 14$");
  vrai("7b. 3 × a × b = 3ab", proche(val("3 \\times a \\times b", { a: 2, b: 7 }), val("3ab", { a: 2, b: 7 })));
  vrai("7c. 2x + 3 = 5x vrai pour 1, faux pour 2", val("2x + 3", { x: 1 }) === val("5x", { x: 1 }) && val("2x + 3", { x: 2 }) === 7 && val("5x", { x: 2 }) === 10);
  dit(7, "pour $x = 2$, $2x + 3 = 7$ alors que $5x = 10$");
  vrai("7d. a + a + a = 3a", identiques("a + a + a", "3a", "a"));
  dit(7, "Réponse : a) faux ; b) vrai ; c) faux ; d) vrai.");
  const [l, r] = dessin("tuiles", 7);
  vrai("7. tuiles : 2x + 3", l === "x" && r[0][0] === 2 && r[0][1] === 3);
});
essai("8", () => {
  const cas = [{ L: 7, l: 4.5 }, { L: 12, l: 12 }];
  const P = cas.map((v) => val("2L + 2l", v));
  cas.forEach((v, i) => vrai(`8. P(${v.L}, ${v.l}) = ${P[i]}`, proche(chaine(8, `P = 2 \\times ${T(v.L)}`), P[i])));
  dit(8, `Réponse : a) $2 \\times L$ ; b) $${T(P[0])}$ cm ; c) $${T(P[1])}$ cm, c'est un carré.`);
  vrai("8c. un carré : 4 × 12", P[1] === 4 * 12);
  const [, lignes] = dessin("table", 8);
  lignes.forEach((l, i) => vrai(`8. tableau ligne ${i + 1}`, proche(val(l[0]), cas[i].L) && proche(val(l[1]), cas[i].l) && proche(val(l[2]), P[i])));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [etapes] = dessin("machine", 9, "figure");
  const prog = (x) => etapes.slice(1).reduce((v, op) => val(`${v} ${op.replace("×", "*")}`), x);
  vrai("9. la machine suit l'énoncé", JSON.stringify(etapes) === JSON.stringify(["x", "× 4", "+ 6", "× 2"]));
  const r3 = prog(3);
  dit(9, `Le résultat est $${r3}$.`);
  vrai("9b. 2(4x + 6) est le programme", VALEURS.every((v) => proche(val("2(4x + 6)", { x: v }), prog(v))));
  const fo = [...c(9).matchAll(/\$([^$]*)\$/g)].map((m) => m[1]).find((x) => x.startsWith("2(4x + 6) = "));
  vrai(`9c. ${fo}`, !!fo && fo.split(" = ").every((m) => identiques(m, "2(4x + 6)")) && fo.endsWith("8x + 12"));
  vrai("9d. 8x + 12 pour 3", proche(chaine(9, "8 \\times 3"), r3));
  vrai("9. le piège : 4x + 6 × 2 donne 24 pour 3", val("4x + 6 \\times 2", { x: 3 }) === 24);
  dit(9, `Réponse : a) $${r3}$ ; b) $2(4x + 6)$ ; c) $8x + 12$.`);
});
essai("10", () => {
  const donnes = [...e(10).split("\\n")[0].matchAll(/\$(\d+)\$ (?:allumettes )?pour \$(\d+)\$ carr/g)].map((m) => [Number(m[2]), Number(m[1])]);
  vrai("10. les trois données suivent 3n + 1", donnes.length === 3 && donnes.every(([n, a]) => val("3n + 1", { n }) === a));
  const [n] = dessin("allumettes", 10);
  // Compte des allumettes du dessin, fait à part : n + 1 verticales, n en haut, n en bas.
  vrai("10a. 4 carrés dessinés, 13 allumettes", n === 4 && (n + 1) + n + n === 13);
  dit(10, `$10 + 3 = ${3 * 4 + 1}$`);
  vrai("10c. 151", proche(chaine(10, "3 \\times 50 + 1"), 151));
  vrai("10d. 33 carrés : exactement 100", proche(chaine(10, "3 \\times 33 + 1"), 100));
  vrai("10. le piège : 4 × 50", 4 * 50 === 200);
  dit(10, "Réponse : a) $13$ ; c) $151$ ; d) oui, $33$ carrés, et il ne lui reste rien.");
});
essai("11", () => {
  const ls = e(11).split("\\n").slice(1).map((l) => /\$(.*)\$/.exec(l)[1]);
  const rep = ["7a + 11", "6x + 1", "y + 4", "5t + 4"];
  ls.forEach((a, i) => {
    const l = a.match(/[a-z]/)[0];
    vrai(`11. ${a} = ${rep[i]}`, identiques(a, rep[i], l));
    dit(11, `$${a} = ${rep[i]}$`);
  });
  dit(11, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) $${r}$`).join(" ; ")}.`);
  vrai("11. le piège : 2y − y n'est pas 2", !identiques("2y - y", "2", "y"));
  const [l, rangees, leg] = dessin("tuiles", 11);
  const [g, d] = leg.split(" = ");
  vrai("11. les tuiles du a)", l === "a" && identiques(rangees.map(([b, u]) => `${b}a + ${u}`).join(" + "), g, "a") && identiques(g, d, "a") && g === ls[0]);
});
essai("12", () => {
  const [g, d] = /\$([^$]*) = ([^$]*)\$ \?/.exec(e(12)).slice(1);
  const xs = [0, 1, 2, 3, 4];
  const sol = xs.filter((x) => val(g, { x }) === val(d, { x }));
  vrai("12. seul 4", sol.join() === "4");
  xs.forEach((x) => dit(12, `Pour $x = ${x}$ : $${x} + 8 = ${val(g, { x })}$ et $3 \\times ${x} = ${val(d, { x })}$. ${sol.includes(x) ? "Oui" : "Non"}.`));
  dit(12, `Réponse : seul $x = ${sol[0]}$ vérifie l'égalité.`);
  const [, lignes] = dessin("table", 12);
  vrai("12. tableau", lignes.every((l, i) => Number(l[0]) === xs[i] && Number(l[1]) === val(g, { x: xs[i] }) && Number(l[2]) === val(d, { x: xs[i] })));
});
essai("13", () => {
  const fautes = [...e(13).matchAll(/\$([^$]*) = ([^$]*)\$\./g)].map((m) => m.slice(1));
  vrai("13. deux erreurs lues", fautes.length === 2);
  const bons = ["4x + 20", "10y + 15"];
  fautes.forEach(([a, b], i) => {
    const l = a.match(/[a-z]/)[0];
    vrai(`13. ${a} = ${b} est faux, ${bons[i]} est juste`, !identiques(a, b, l) && identiques(a, bons[i], l));
    dit(13, `$${a} = ${bons[i]}$`);
  });
  vrai("13c. x = 1 : 24 contre 9", val("4(x + 5)", { x: 1 }) === 24 && val("4x + 5", { x: 1 }) === 9 && val("4x + 20", { x: 1 }) === 24);
  dit(13, "Réponse : a) $4x + 20$ ; b) $10y + 15$ ; c) $24$ contre $9$.");
  const [k, parts, aires] = dessin("aire", 13);
  vrai("13. le rectangle de Nora corrigé", identiques(`${k}(${parts[0]} + ${parts[1]})`, `${aires[0]} + ${aires[1]}`) && identiques(`${aires[0]} + ${aires[1]}`, bons[0]));
});
essai("14", () => {
  const [pts, opts] = dessin("triangle", 14, "figure");
  const d = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  vrai("14. le triangle est isocèle, base 5", proche(d(pts.A, pts.B), d(pts.A, pts.C)) && proche(d(pts.B, pts.C), 5) && opts.cotes.AB === "a" && opts.cotes.CA === "a" && opts.cotes.BC === "5 cm");
  vrai("14. dessiné avec a = 6,5", proche(d(pts.A, pts.B), 6.5));
  vrai("14a. a + a + 5 = 2a + 5", identiques("a + a + 5", "2a + 5", "a"));
  vrai("14b. 18 pour 6,5", proche(chaine(14, "2 \\times 6{,}5"), 18));
  const sol = [4, 5, 6].filter((a) => val("2a + 5", { a }) === 17);
  vrai("14c. a = 6", sol.join() === "6");
  [4, 5, 6].forEach((a) => dit(14, `$2 \\times ${a} + 5 = ${val("2a + 5", { a })}$`));
  dit(14, `Réponse : a) $2a + 5$ ; b) $18$ cm ; c) $a = ${sol[0]}$.`);
});
essai("15", () => {
  const paires = [...e(15).matchAll(/\$([A-F]) = ([^$]*)\$ et \$([A-F]) = ([^$]*)\$/g)].map((m) => [m[2], m[4]]);
  vrai("15. trois paires", paires.length === 3);
  const verdicts = paires.map(([a, b]) => identiques(a, b));
  vrai("15. égales, pas égales, pas égales", verdicts.join() === "true,false,false");
  dit(15, "Réponse : a) égales ; b) pas égales ; c) pas égales.");
  vrai("15b. 2(x + 4) = 2x + 8", identiques("2(x + 4)", "2x + 8"));
  const [, lignes] = dessin("table", 15);
  lignes.forEach((l, i) => {
    const [a0, b0] = l[1].split(" et ").map(Number), [a1, b1] = l[2].split(" et ").map(Number);
    vrai(`15. tableau ${l[0]}`, a0 === val(paires[i][0], { x: 0 }) && b0 === val(paires[i][1], { x: 0 }) && a1 === val(paires[i][0], { x: 1 }) && b1 === val(paires[i][1], { x: 1 }));
  });
});
essai("16", () => {
  const [fixe, parH] = [...e(16).matchAll(/\$(\d+)\$ €/g)].map((m) => Number(m[1]));
  const P = (h) => parH * h + fixe;
  vrai("16a. P = 2h + 3", VALEURS.every((h) => val("2h + 3", { h }) === P(h)));
  dit(16, "$P = 2h + 3$");
  vrai("16b. 11 et 6", proche(chaine(16, "P = 2 \\times 4"), P(4)) && proche(chaine(16, "P = 2 \\times 1{,}5"), P(1.5)));
  const ok = [5, 6, 7].filter((h) => P(h) <= 15);
  vrai("16c. 6 heures au plus", Math.max(...ok) === 6 && P(6) === 15);
  [5, 6, 7].forEach((h) => dit(16, `$2 \\times ${h} + 3 = ${P(h)}$`));
  const [ent, lig] = dessin("tableau", 16);
  vrai("16. tableau h → P", ent.slice(1).every((s, i) => proche(val(lig[i + 1]), P(val(s)))));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [larg, pel] = [6, 10];
  vrai("17. largeur 6, pelouse 10 lues", e(17).includes(`largeur de $${larg}$ m`) && e(17).includes(`pelouse de $${pel}$ m`));
  vrai("17b. 6(x + 10) = 6x + 60", identiques(`${larg}(x + ${pel})`, "6x + 60"));
  dit(17, "$6(x + 10) = 6x + 60$");
  const a8 = larg * (8 + pel);
  vrai("17c. deux calculs, 108", proche(chaine(17, "6 \\times (8 + 10)"), a8) && proche(chaine(17, "6 \\times 8 + 60"), a8));
  const sol = [6, 7, 8].filter((x) => larg * x === 42);
  vrai("17d. x = 7", sol.join() === "7");
  dit(17, `Réponse : a) $6x$ et $60$ ; b) $6(x + 10) = 6x + 60$ ; c) $${a8}$ m² ; d) $x = ${sol[0]}$.`);
  const [k, parts, aires] = dessin("aire", 17);
  vrai("17. le jardin dessiné", Number(k) === larg && parts[1] === String(pel) && identiques(`${k}(${parts[0]} + ${parts[1]})`, `${aires[0]} + ${aires[1]}`));
});
essai("18", () => {
  const [etapes] = dessin("machine", 18, "figure");
  const prog = (x) => etapes.slice(1).reduce((v, op) => val(`${v} ${op.replace("×", "*")}`), x);
  vrai("18. la machine suit l'énoncé", JSON.stringify(etapes) === JSON.stringify(["x", "+ 3", "× 4", "− 12"]));
  const r = [5, 2.5].map(prog);
  vrai("18a. 20 et 10", r[0] === 20 && r[1] === 10);
  dit(18, `$32 - 12 = ${r[0]}$`);
  dit(18, `$22 - 12 = ${r[1]}$`);
  vrai("18c. 4(x + 3) − 12 = 4x pour tout x", identiques("4(x + 3) - 12", "4x") && VALEURS.every((v) => proche(prog(v), 4 * v)));
  dit(18, "$4x + 12 - 12 = 4x$");
  dit(18, "Réponse : a) $20$ et $10$ ; c) $4(x + 3) - 12 = 4x$.");
});
essai("19", () => {
  const A = (n) => val("4n", { n }), B = (n) => val("18 + 2{,}5n", { n });
  for (const n of [10, 15, 12, 13]) {
    vrai(`19. A(${n})`, proche(chaine(19, `4 \\times ${n}`), A(n)));
    vrai(`19. B(${n})`, proche(chaine(19, `18 + 2{,}5 \\times ${n}`), B(n)));
  }
  vrai("19c. égaux pour 12", A(12) === B(12));
  let n0 = 1;
  while (!(B(n0) < A(n0))) n0++;
  vrai(`19d. B moins cher à partir de ${n0}`, n0 === 13);
  dit(19, `À partir de $${n0}$ entrées, B est le moins cher.`);
  const [, lignes] = dessin("table", 19);
  vrai("19. tableau", lignes.every((l) => proche(val(l[1]), A(Number(l[0]))) && proche(val(l[2]), B(Number(l[0])))));
});
essai("20", () => {
  const [n] = dessin("bordure", 20, "figure");
  // Compte des carreaux gris sur le dessin, case par case.
  let gris = 0;
  for (let l = 0; l < n + 2; l++) for (let k = 0; k < n + 2; k++) if (l === 0 || k === 0 || l === n + 1 || k === n + 1) gris++;
  vrai(`20a. ${gris} carreaux gris pour n = ${n}`, gris === 16 && n === 3);
  dit(20, `$5 + 5 + 3 + 3 = ${gris}$`);
  vrai("20b. Léo et Zoé : 16, Hugo : 12", val("4n + 4", { n }) === gris && val("4(n + 1)", { n }) === gris && val("4n", { n }) === 12);
  vrai("20c. 4(n + 1) = 4n + 4", identiques("4(n + 1)", "4n + 4", "n"));
  vrai("20d. 44", proche(chaine(20, "4 \\times 10 + 4"), 44));
  dit(20, "Réponse : a) $16$ ; b) Léo et Zoé : $16$, Hugo : $12$ ; c) $4(n + 1) = 4n + 4$ ; d) $44$.");
});

f.fin();
