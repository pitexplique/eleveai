// Recalcul indépendant de la feuille « Calculer avec les nombres relatifs » de
// 4e (29/09/2026, feuille étalon de la 4e) : lib/fiches-exercices/maths-4e-relatifs.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (droiteRel,
// axeVertical, table, tableau, etapes, programme, pyramide, cartes, barresRel),
// jamais recopiés ici. Chaque calcul « a = b = c » d'un corrigé est LU par
// `ev` (évaluation exacte, × ÷ et trait de fraction compris) et ses membres
// comparés en fractions exactes ; la pyramide, le programme de calcul et le jeu
// de cartes sont RÉSOLUS par le script lui-même.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs
// (le socle sert toutes les classes : `ouvrir(…, "4e")`).
// Usage : node scripts/verifier-exercices-4e-relatif-operation.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { evalTex, tex, Q, D, plus, moins, fois, div, egal, inf } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-4e-relatifs.tsx", "relatif_operation", ["droiteRel", "axeVertical", "table", "etapes", "pyramide", "cartes", "barresRel"], "4e");
const { c, e, vrai, dit, enonceDit, dessin, essai } = f;

/** Une écriture LaTeX → fraction exacte. `a \div b` devient `a × 1/b` (même priorité, de gauche à droite). */
const ev = (s) => evalTex(String(s).replace(/\\div\s*(\([^()]*\)|[\d{},]+)/g, "*F{1}{$1}"), Q(0));
/** Un texte de dessin (« (−8) × 9 », « −2,5 ») → fraction exacte. */
const deSvg = (s) => ev(String(s).replace(/−/g, "-").replace(/,/g, "{,}").replace(/×/g, "\\times").replace(/÷/g, "\\div").trim());
const N = (x) => D(String(x));
const T = (q) => tex(q);
const O = Q(0);
const meme = (nom, a, b) => vrai(`${nom} : ${a && T(a)} = ${b && T(b)}`, !!a && !!b && egal(a, b));
const signe = (q) => (egal(q, O) ? "nul" : inf(q, O) ? "négatif" : "positif");

/** La formule « $debut = … = …$ » du corrigé k : ses membres sont-ils tous égaux ? Rend leur valeur. */
function formule(k, debut) {
  const i = c(k).indexOf(`$${debut} = `);
  if (i < 0) {
    vrai(`${k}. formule « ${debut} = … » écrite`, false);
    return null;
  }
  const j = c(k).indexOf("$", i + 1);
  const membres = c(k).slice(i + 1, j).split(" = ");
  const vals = membres.map(ev);
  vrai(`${k}. ${membres.join(" = ")} : membres égaux`, vals.every((v) => egal(v, vals[0])));
  return vals[0];
}
/** Les lignes « a) $…$ » d'un énoncé. */
const lignesCalcul = (k) => e(k).split("\\n").map((l) => /^([a-d])\) \$([^$]*)\$/.exec(l)).filter(Boolean).map((m) => ({ q: m[1], expr: m[2] }));
/** Chaque étape d'un dessin `etapes` garde la valeur du calcul. */
const etapesJustes = (k, valeur) => {
  const [lignes] = dessin("etapes", k);
  lignes.forEach((l, i) => meme(`${k}. étape ${i + 1} « ${l} » garde la valeur`, deSvg(l), valeur));
  return lignes;
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ls = lignesCalcul(1);
  vrai("1. quatre calculs", ls.length === 4);
  const vals = ls.map(({ expr }) => ev(expr));
  dit(1, `$${ls[0].expr} = ${T(vals[0])}$`);
  ls.slice(1).forEach(({ expr }, i) => meme(`1${ls[i + 1].q}. ${expr}`, formule(1, expr), vals[i + 1]));
  dit(1, `Réponse : ${ls.map(({ q }, i) => `${q}) $${T(vals[i])}$`).join(" ; ")}.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 1);
  const [a, b] = ls[3].expr.split(" - ");
  meme("1. le saut du d) part du premier nombre", N(sauts[0].de), ev(a));
  meme("1. il arrive au résultat", N(sauts[0].vers), vals[3]);
  meme("1. sa longueur = l'opposé du nombre enlevé", moins(N(sauts[0].vers), N(sauts[0].de)), moins(O, ev(b)));
  meme("1. son étiquette le dit", deSvg(sauts[0].label.split(" = ")[1]), moins(O, ev(b)));
  vrai("1. départ et arrivée marqués", points.some((p) => p.value === sauts[0].de) && points.some((p) => p.value === sauts[0].vers));
});
essai("2", () => {
  const [, , , points, { sauts }] = dessin("droiteRel", 2, "figure");
  const dep = N(points.find((p) => p.label === "départ").value);
  const A = N(points.find((p) => p.label === "A").value);
  enonceDit(2, `je pars de $${T(dep)}$`);
  vrai("2. quatre sauts, annoncés dans l'énoncé", sauts.length === 4 && e(2).includes("quatre sauts"));
  const L = moins(N(sauts[0].vers), N(sauts[0].de));
  vrai("2. sauts identiques et bout à bout, du départ à A", sauts.every((s, i) => egal(moins(N(s.vers), N(s.de)), L) && (i === 0 ? egal(N(s.de), dep) : s.de === sauts[i - 1].vers)) && egal(N(sauts.at(-1).vers), A));
  vrai("2. les arcs ne donnent pas la réponse", sauts.every((s) => s.label === "?"));
  vrai("2. vers la gauche", inf(L, O));
  const P = fois(Q(4), L);
  meme("2. le produit = A", plus(dep, P), A);
  dit(2, `$4 \\times (${T(L)}) = ${T(P)}$`);
  const sept = fois(Q(7), L);
  dit(2, `$7 \\times (${T(L)}) = ${T(sept)}$`);
  dit(2, `Réponse : a) $${T(L)}$ ; b) $4 \\times (${T(L)}) = ${T(P)}$ ; c) $${T(sept)}$.`);
});
essai("3", () => {
  const ls = lignesCalcul(3);
  const vals = ls.map(({ expr }) => ev(expr));
  ls.forEach(({ expr }, i) => dit(3, `$${expr} = ${T(vals[i])}$`));
  dit(3, `Réponse : ${ls.map(({ q }, i) => `${q}) $${T(vals[i])}$`).join(" ; ")}.`);
  // La table de la règle des signes : relue case par case contre 1 et −1.
  const [entete, lignes] = dessin("table", 3);
  const val = { positif: Q(1), négatif: Q(-1) };
  lignes.forEach((l) => l.slice(1).forEach((cas, j) => vrai(`3. règle : ${l[0]} × ${entete[j + 1]} = ${cas}`, signe(fois(val[l[0]], val[entete[j + 1]])) === cas)));
});
essai("4", () => {
  const ls = lignesCalcul(4);
  const vals = ls.map(({ expr }) => ev(expr));
  ls.forEach(({ expr }, i) => dit(4, `$${expr} = ${T(vals[i])}$`));
  dit(4, `Réponse : ${ls.map(({ q }, i) => `${q}) $${T(vals[i])}$`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 4);
  lignes.forEach((l, i) => {
    meme(`4. tableau ligne ${i + 1} : la division de l'énoncé`, deSvg(l[0]), vals[i]);
    const [g, d] = l[1].split(" = ");
    meme(`4. tableau ligne ${i + 1} : le contrôle est juste`, deSvg(g), deSvg(d));
    meme(`4. tableau ligne ${i + 1} : il redonne le dividende`, deSvg(d), ev(ls[i].expr.split(" \\div ")[0]));
    meme(`4. tableau ligne ${i + 1} : le résultat`, deSvg(l[2]), vals[i]);
  });
});
essai("5", () => {
  const produits = [...e(5).matchAll(/\$([ABC]) = ([^$]*)\$/g)].map((m) => ({ nom: m[1], expr: m[2] }));
  vrai("5. trois produits", produits.length === 3);
  const [, lignes] = dessin("table", 5);
  produits.forEach(({ nom, expr }, i) => {
    const v = ev(expr);
    const facteurs = expr.split(" \\times ").map(ev);
    const nNeg = facteurs.filter((x) => inf(x, O)).length;
    dit(5, `$${nom} = ${T(v)}$`);
    vrai(`5. ${nom} : ${nNeg} négatifs, ${nNeg % 2 ? "impair" : "pair"} → ${signe(v)}`, (nNeg % 2 === 1) === inf(v, O));
    vrai(`5. tableau ${nom} : « ${lignes[i][1]} »`, lignes[i][0] === nom && lignes[i][1] === `${nNeg} : ${nNeg % 2 ? "impair" : "pair"}` && lignes[i][2] === signe(v));
    dit(5, `$${nom} = ${T(v)}$, ${signe(v)}`);
  });
});
essai("6", () => {
  const expr = /\$E = ([^$]*)\$/.exec(e(6))[1];
  const E = ev(expr);
  dit(6, `$3 \\times (-7) = ${T(fois(Q(3), Q(-7)))}$`);
  dit(6, `$-9 + (-21) = ${T(E)}$`);
  dit(6, `Réponse : $E = ${T(E)}$.`);
  const faux = formule(6, "(-9 + 3) \\times (-7)");
  vrai("6. le piège donne bien autre chose", !egal(faux, E));
  etapesJustes(6, E);
});
essai("7", () => {
  const [pas, minutes, cible] = [ev("-12"), ev("7"), ev("-150")];
  enonceDit(7, "$-12$ m chaque minute");
  enonceDit(7, "$7$ minutes");
  enonceDit(7, "$-150$ m");
  const a = formule(7, "7 \\times (-12)");
  meme("7a. position", a, fois(minutes, pas));
  const b = formule(7, "(-150) \\div (-12)");
  meme("7b. durée", b, div(cible, pas));
  dit(7, `Réponse : a) $${T(a)}$ m ; b) $${T(b)}$ minutes.`);
  const [, , , points] = dessin("axeVertical", 7);
  vrai("7. l'axe porte 0, a) et −150", [O, a, cible].every((v) => points.some((p) => egal(N(p.value), v))));
  vrai("7. l'étiquette de −150 dit la durée", points.some((p) => egal(N(p.value), cible) && p.label.startsWith("12,5 min")));
});
essai("8", () => {
  const rep = [];
  for (const { q, expr } of lignesCalcul(8)) {
    const [g, d] = expr.split(" = ");
    const r = ev(d);
    let x;
    if (g.startsWith("\\ldots \\times ")) x = div(r, ev(g.slice(14)));
    else if (g.endsWith(" \\times \\ldots")) x = div(r, ev(g.slice(0, -14)));
    else if (g.startsWith("\\ldots \\div ")) x = fois(r, ev(g.slice(12)));
    else x = div(ev(g.slice(0, -12)), r);
    const complet = g.replace("\\ldots", inf(x, O) ? `(${T(x)})` : T(x));
    meme(`8${q}. ${complet} = ${T(r)}`, ev(complet), r);
    dit(8, `$${complet} = ${T(r)}$`);
    rep.push({ q, x });
  }
  vrai("8. quatre trous", rep.length === 4);
  dit(8, `Réponse : ${rep.map(({ q, x }) => `${q}) $${T(x)}$`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 8);
  lignes.forEach((l, i) => {
    meme(`8. tableau ligne ${i + 1} : le nombre`, deSvg(l[2]), rep[i].x);
    vrai(`8. tableau ligne ${i + 1} : son signe`, l[1] === signe(rep[i].x));
  });
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const expr = /\$F = ([^$]*)\$/.exec(e(9))[1];
  const F = ev(expr);
  meme("9. réécriture 1", ev("7 - (-12) + (-4)"), F);
  dit(9, "$F = 7 - (-12) + (-4)$");
  dit(9, "$F = 7 + 12 - 4$");
  dit(9, `$19 - 4 = ${T(F)}$`);
  dit(9, `Réponse : $F = ${T(F)}$.`);
  etapesJustes(9, F);
});
essai("10", () => {
  const expr = /\$G = ([^$]*)\$/.exec(e(10))[1];
  const G = ev(expr);
  meme("10. après les parenthèses", ev("(-2) \\times (-5) - (-5) \\times (-6)"), G);
  dit(10, "$G = (-2) \\times (-5) - (-5) \\times (-6)$");
  meme("10. G = 10 − 30", ev("10 - 30"), G);
  dit(10, `$G = 10 - 30 = ${T(G)}$`);
  dit(10, `Réponse : $G = ${T(G)}$.`);
  etapesJustes(10, G);
});
essai("11", () => {
  const expr = /\$H = ([^$]*)\$/.exec(e(11))[1];
  const H = ev(expr);
  const [, haut, bas] = /\\dfrac\{(.*)\}\{(.*)\}/.exec(expr);
  dit(11, `$${haut.split(" + ")[0]} = ${T(ev(haut.split(" + ")[0]))}$`);
  dit(11, `$${bas} = ${T(ev(bas))}$`);
  meme("11. le quotient", formule(11, `(${T(ev(haut))}) \\div (${T(ev(bas))})`), H);
  dit(11, `Réponse : $H = ${T(H)}$.`);
  const [, lignes] = dessin("table", 11);
  meme("11. tableau : en haut", deSvg(lignes[0][1]), ev(haut));
  meme("11. tableau : sa valeur", deSvg(lignes[0][2]), ev(haut));
  meme("11. tableau : en bas", deSvg(lignes[1][1]), ev(bas));
  meme("11. tableau : sa valeur", deSvg(lignes[1][2]), ev(bas));
  meme("11. tableau : H", deSvg(lignes[2][1]), H);
  meme("11. tableau : H écrit", deSvg(lignes[2][2]), H);
});
essai("12", () => {
  const fautes = [...e(12).matchAll(/\$([^$]*) = ([^$=]*)\$/g)].map((m) => ({ expr: m[1], faux: ev(m[2]) }));
  vrai("12. trois erreurs lues", fautes.length === 3);
  const vals = fautes.map(({ expr, faux }) => {
    const v = ev(expr);
    vrai(`12. ${expr} : le résultat de l'élève est bien faux`, !egal(faux, v));
    return v;
  });
  dit(12, `$(-6) \\times (-7) = ${T(vals[0])}$`);
  meme("12b. corrigé", formule(12, "-8 - (-6)"), vals[1]);
  meme("12b. l'erreur de Maya", fois(ev("-8 - 2"), ev("-3")), fautes[1].faux);
  meme("12c. l'erreur de Hugo", div(ev("-24"), fois(ev("-4"), Q(2))), fautes[2].faux);
  dit(12, `$6 \\times 2 = ${T(vals[2])}$`);
  dit(12, `Réponse : ${vals.map((v, i) => `${"abc"[i]}) $${T(v)}$`).join(" ; ")}.`);
  etapesJustes(12, vals[1]);
});
essai("13", () => {
  const [bonne, mauvaise, rien] = [4, -3, -1].map((n) => Q(n));
  enonceDit(13, "rapporte $4$ points");
  enonceDit(13, "perdre $3$");
  enonceDit(13, "perdre $1$");
  const [, lignes] = dessin("table", 13, "figure");
  const score = (col) => plus(plus(fois(deSvg(lignes[0][col]), bonne), fois(deSvg(lignes[1][col]), mauvaise)), fois(deSvg(lignes[2][col]), rien));
  vrai("13. vingt réponses chacun", [1, 2].every((col) => egal(lignes.reduce((s, l) => plus(s, deSvg(l[col])), O), Q(20))));
  const [nina, karim] = [score(1), score(2)];
  dit(13, `$48 - 15 - 3 = ${T(nina)}$`);
  meme("13a. Nina : le calcul écrit", ev("12 \\times 4 + 5 \\times (-3) + 3 \\times (-1)"), nina);
  dit(13, "$12 \\times 4 + 5 \\times (-3) + 3 \\times (-1)$");
  meme("13b. Karim", formule(13, "8 \\times 4 + 10 \\times (-3) + 2 \\times (-1)"), karim);
  const jBonnes = moins(moins(Q(20), Q(9)), Q(1));
  dit(13, `$20 - 9 - 1 = ${T(jBonnes)}$`);
  const jade = formule(13, `${T(jBonnes)} \\times 4 + 9 \\times (-3) + 1 \\times (-1)`);
  meme("13c. Jade", jade, plus(plus(fois(jBonnes, bonne), fois(Q(9), mauvaise)), rien));
  dit(13, `Réponse : a) $${T(nina)}$ points ; b) $${T(karim)}$ point ; c) $${T(jade)}$ points.`);
});
essai("14", () => {
  const [, ligne] = dessin("tableau", 14, "figure");
  const t = ligne.slice(1).map(deSvg);
  const [mx, mn] = [t.reduce((a, b) => (inf(a, b) ? b : a)), t.reduce((a, b) => (inf(a, b) ? a : b))];
  const ecart = formule(14, `${T(mx)} - (${T(mn)})`);
  meme("14a. écart", ecart, moins(mx, mn));
  const S = t.reduce(plus, O);
  const pos = t.filter((x) => !inf(x, O)).reduce(plus, O);
  const neg = t.filter((x) => inf(x, O)).reduce(plus, O);
  dit(14, `$${T(pos)} + (${T(neg)}) = ${T(S)}$`);
  const moy = formule(14, `(${T(S)}) \\div ${t.length}`);
  meme("14b. moyenne", moy, div(S, Q(t.length)));
  const cible = fois(Q(7), Q(-4));
  dit(14, `$7 \\times (-4) = ${T(cible)}$`);
  const manque = formule(14, `${T(cible)} - (${T(S)})`);
  meme("14c. septième nuit", manque, moins(cible, S));
  const distances = t.reduce((s, x) => plus(s, inf(x, O) ? moins(O, x) : x), O);
  meme("14. le piège : la moyenne des distances", div(distances, Q(6)), Q(4));
  dit(14, `Réponse : a) $${T(ecart)}$ °C ; b) $${T(moy)}$ °C ; c) $${T(manque)}$ °C.`);
  const [, , , points] = dessin("droiteRel", 14);
  meme("14. droite : min", N(points.find((p) => p.label === "min").value), mn);
  meme("14. droite : moyenne", N(points.find((p) => p.label === "moyenne").value), moy);
  meme("14. droite : max", N(points.find((p) => p.label === "max").value), mx);
});
essai("15", () => {
  const [lignes] = dessin("programme", 15, "figure");
  const fac1 = deSvg(/par (.*)$/.exec(lignes[1])[1]);
  const ajout = deSvg(/Ajouter (.*)$/.exec(lignes[2])[1]);
  const fac2 = deSvg(/par (.*)$/.exec(lignes[3])[1]);
  const prog = (x) => {
    const a = fois(x, fac1);
    const b = plus(a, ajout);
    return [a, b, fois(b, fac2)];
  };
  const [x1, x2] = [Q(-4), ev("2{,}5")];
  const [r1, r2] = [prog(x1), prog(x2)];
  dit(15, `$18 \\times (-2) = ${T(r1[2])}$`);
  dit(15, `$(-1{,}5) \\times (-2) = ${T(r2[2])}$`);
  // b) et c) : le programme est affine, je le résous pour 0 et pour 12.
  const [p0, p1] = [prog(O)[2], prog(Q(1))[2]];
  const inverse = (y) => div(moins(y, p0), moins(p1, p0));
  const zero = inverse(O);
  const douze = inverse(Q(12));
  vrai("15b. 2 donne bien 0", egal(prog(zero)[2], O));
  dit(15, `$${T(zero)} \\times (-3) = -6$`);
  meme("15c. remonter : 12 ÷ (−2)", formule(15, "12 \\div (-2)"), div(Q(12), fac2));
  meme("15c. puis − 6", formule(15, "-6 - 6"), moins(div(Q(12), fac2), ajout));
  meme("15c. puis ÷ (−3)", formule(15, "(-12) \\div (-3)"), douze);
  dit(15, `Réponse : a) $${T(r1[2])}$ et $${T(r2[2])}$ ; b) $${T(zero)}$ ; c) $${T(douze)}$.`);
  const [, tab] = dessin("table", 15);
  tab.forEach((l, i) => {
    meme(`15. tableau ligne ${i + 1}, avec −4`, deSvg(l[1]), r1[i]);
    meme(`15. tableau ligne ${i + 1}, avec 2,5`, deSvg(l[2]), r2[i]);
  });
});
essai("16", () => {
  const [etages] = dessin("pyramide", 16, "figure");
  const P = etages.map((l) => l.map((v) => (v === "?" ? null : deSvg(v))));
  let change = true;
  while (change) {
    change = false;
    for (let i = 0; i + 1 < P.length; i++)
      for (let j = 0; j < P[i].length; j++) {
        const [h, a, b] = [P[i][j], P[i + 1][j], P[i + 1][j + 1]];
        if (h === null && a && b) (P[i][j] = fois(a, b)), (change = true);
        else if (h && a === null && b) (P[i + 1][j] = div(h, b)), (change = true);
        else if (h && a && b === null) (P[i + 1][j + 1] = div(h, a)), (change = true);
      }
  }
  vrai("16. la pyramide se résout entièrement", P.every((l) => l.every((v) => v !== null)));
  for (let i = 0; i + 1 < P.length; i++)
    for (let j = 0; j < P[i].length; j++) {
      meme(`16. brique (${i}, ${j}) = produit du dessous`, P[i][j], fois(P[i + 1][j], P[i + 1][j + 1]));
      const par = (q) => (inf(q, O) ? `(${T(q)})` : T(q));
      dit(16, `$${par(P[i + 1][j])} \\times ${par(P[i + 1][j + 1])} = ${T(P[i][j])}$`);
    }
  const [sol, trouvees] = dessin("pyramide", 16, "schema");
  vrai("16. la solution dessinée = la pyramide résolue", sol.every((l, i) => l.every((v, j) => egal(deSvg(v), P[i][j]))));
  const aTrouver = etages.flatMap((l, i) => l.map((v, j) => (v === "?" ? `${i},${j}` : null))).filter(Boolean);
  vrai("16. en vert : les briques trouvées, et elles seules", JSON.stringify(trouvees.map(String).sort()) === JSON.stringify(aTrouver.sort()));
  dit(16, `au sommet, $${T(P[0][0])}$.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [mer, baisse] = [ev("15"), ev("-6{,}5")];
  enonceDit(17, "il fait $15$ °C au niveau de la mer");
  enonceDit(17, "baisse de $6{,}5$ °C");
  const temp = (km) => plus(mer, fois(Q(km), baisse));
  const [t4, t10] = [temp(4), temp(10)];
  dit(17, `$15 + (-26) = ${T(t4)}$`);
  dit(17, `$15 + (-65) = ${T(t10)}$`);
  const ecart = formule(17, `${T(t4)} - (${T(t10)})`);
  meme("17c. écart", ecart, moins(t4, t10));
  meme("17c. contrôle 6 × 6,5", fois(Q(6), moins(O, baisse)), ecart);
  const chg = formule(17, "-30{,}5 - 15");
  const km = formule(17, "(-45{,}5) \\div (-6{,}5)");
  meme("17d. l'altitude", km, div(chg, baisse));
  meme("17d. la température à cette altitude", temp(Number(T(km))), ev("-30{,}5"));
  dit(17, `Réponse : a) $${T(t4)}$ °C ; b) $${T(t10)}$ °C ; c) $${T(ecart)}$ °C ; d) à $${T(km)}$ km.`);
  const [, , , points, fleches] = dessin("axeVertical", 17);
  vrai("17. l'axe porte 15, a), b) et d)", [mer, t4, t10, ev("-30{,}5")].every((v) => points.some((p) => egal(N(p.value), v))));
  meme("17. la flèche : l'écart", deSvg(fleches[0].label), ecart);
  meme("17. la flèche va de b) à a)", moins(N(fleches[0].vers), N(fleches[0].de)), ecart);
});
essai("18", () => {
  const depart = ev("-150");
  enonceDit(18, "$-150$ €");
  const [cot, ent, loc] = [Q(90), Q(-40), Q(-35)];
  const solde = plus(plus(plus(depart, fois(Q(4), cot)), fois(Q(4), ent)), fois(Q(3), loc));
  meme("18. le calcul écrit", ev("-150 + 4 \\times 90 + 4 \\times (-40) + 3 \\times (-35)"), solde);
  dit(18, "$-150 + 4 \\times 90 + 4 \\times (-40) + 3 \\times (-35)$");
  dit(18, `$360 + (-415) = ${T(solde)}$`);
  meme("18. les négatifs", formule(18, "-150 + (-160) + (-105)"), ev("-415"));
  const sem = plus(cot, ent);
  dit(18, `$90 + (-40) = ${T(sem)}$`);
  let s = solde, n = 0;
  while (inf(s, O)) (s = plus(s, sem)), n++;
  dit(18, `$${T(moins(s, sem))} + ${T(sem)} = ${T(s)}$`);
  meme("18. le piège : 245", formule(18, "150 + 360 - 160 - 105"), Q(245));
  dit(18, `Réponse : b) $${T(solde)}$ €, encore à découvert ; c) après $${n}$ semaines.`);
  const [, , , points, fleches] = dessin("axeVertical", 18);
  vrai("18. l'axe porte le départ, avril et les deux semaines de mai", [depart, solde, plus(solde, sem), s].every((v) => points.some((p) => egal(N(p.value), v))));
  meme("18. la flèche : deux semaines de mai", deSvg(fleches[0].label), fois(Q(n), sem));
  meme("18. posée de fin avril au bout de deux semaines", moins(N(fleches[0].vers), N(fleches[0].de)), fois(Q(n), sem));
});
essai("19", () => {
  const [vals] = dessin("cartes", 19, "figure");
  const jeu = vals.map(deSvg);
  const trios = [];
  for (let a = 0; a < jeu.length; a++) for (let b = a + 1; b < jeu.length; b++) for (let d = b + 1; d < jeu.length; d++) trios.push([a, b, d]);
  const prod = (t) => t.map((i) => jeu[i]).reduce(fois, Q(1));
  const max = trios.map(prod).reduce((m, x) => (inf(m, x) ? x : m));
  const min = trios.map(prod).reduce((m, x) => (inf(x, m) ? x : m));
  const emma = formule(19, "(-2) \\times 3 \\times (-4)");
  const leo = formule(19, "(-1) \\times (-3) \\times 2");
  vrai("19a. Emma gagne", inf(leo, emma));
  meme("19b. le plus grand, par le calcul écrit", formule(19, "(-4) \\times (-3) \\times 4"), max);
  meme("19c. le plus petit, par le calcul écrit", formule(19, "(-4) \\times 4 \\times 3"), min);
  formule(19, "4 \\times 3 \\times 2");
  formule(19, "(-4) \\times (-3) \\times (-2)");
  dit(19, `Réponse : a) Emma $${T(emma)}$, Léo $${T(leo)}$ : Emma gagne ; b) $${T(max)}$ ; c) $${T(min)}$.`);
  const [solution, vertes] = dessin("cartes", 19, "schema");
  vrai("19. le schéma montre le même jeu", JSON.stringify(solution) === JSON.stringify(vals));
  meme("19. les cartes vertes font le plus grand score", vertes.map((i) => jeu[i]).reduce(fois, Q(1)), max);
});
essai("20", () => {
  const [, , , barres] = dessin("barresRel", 20);
  const b = barres.map((x) => N(x.value));
  const gains = b.filter((x) => !inf(x, O)).reduce(plus, O);
  const pertes = b.filter((x) => inf(x, O)).reduce(plus, O);
  meme("20. les pertes", formule(20, "-1{,}2 + (-2{,}6) + (-1{,}4) + (-0{,}7)"), pertes);
  const total = formule(20, `${T(gains)} + (${T(pertes)})`);
  meme("20a. le total", total, b.reduce(plus, O));
  const moy = formule(20, `(${T(total)}) \\div ${b.length}`);
  meme("20b. la moyenne", moy, div(total, Q(b.length)));
  const ans = formule(20, `(-22) \\div (${T(moy)})`);
  meme("20c. les années", ans, div(Q(-22), moy));
  meme("20. le piège : 6,3", formule(20, "1{,}2 + 2{,}6 + 1{,}4 + 0{,}4 + 0{,}7"), ev("6{,}3"));
  vrai("20. 2024 est le gain", barres.find((x) => x.value > 0)?.label === "2024");
  dit(20, `Réponse : a) il a perdu $${T(moins(O, total))}$ m ; b) $${T(moy)}$ m par an ; c) $${T(ans)}$ ans.`);
});

f.fin();
