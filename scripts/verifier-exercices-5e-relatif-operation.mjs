// Recalcul indépendant de la feuille « Les opérations sur les nombres relatifs »
// de 5e (29/09/2026) : lib/fiches-exercices/maths-5e-relatif-operation.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (droiteRel,
// axeVertical, tableau, table, pyramide, grille), jamais recopiés ici. Chaque
// calcul écrit « a = b = c » dans un corrigé est LU par `evalTex` et ses
// membres comparés en fractions exactes ; la pyramide, la table d'addition et
// le carré magique sont RÉSOLUS par le script lui-même, puis comparés au
// dessin de la solution.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-relatif-operation.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";
import { evalTex, tex, Q, D, plus, moins, egal, inf } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-relatif-operation.tsx", "relatif_operation", ["droiteRel", "axeVertical", "table", "pyramide", "grille"]);
const { c, e, vrai, dit, enonceDit, dessin, essai } = f;

/** Une écriture LaTeX (« -3 - (-7) », « 2{,}5 ») → fraction exacte. */
const ev = (s) => evalTex(s, Q(0));
/** Un texte de dessin (« 3 − (−7) », « −2,5 ») → fraction exacte. */
const deSvg = (s) => ev(String(s).replace(/−/g, "-").replace(/,/g, ".").trim());
/** Un nombre JS du dessin → fraction exacte. */
const N = (x) => D(String(x));
const T = (q) => tex(q);
/** « (-4) » pour un négatif, « 4 » sinon : comme on l'écrit après un « + ». */
const par = (q) => (inf(q, Q(0)) ? `(${T(q)})` : T(q));
const O = Q(0);
const meme = (nom, a, b) => vrai(`${nom} : ${a && T(a)} = ${b && T(b)}`, !!a && !!b && egal(a, b));

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
/** Les nombres $…$ d'un texte (signe + permis). */
const nombresDe = (texte) => [...texte.matchAll(/\$([+-]?\d+(?:\{,\}\d+)?)\$/g)].map((m) => ev(m[1]));
/** Une somme algébrique « -6 + 9 - 11 + 4 » → ses termes signés. */
const termes = (expr) => [...expr.replace(/\s/g, "").matchAll(/([+-]?)(\d+(?:\{,\}\d+)?)/g)].map((m) => (m[1] === "-" ? moins(O, ev(m[2])) : ev(m[2])));
/** Écrit « a + (b) = s » ou « a - b = s », comme les corrigés de gauche à droite. */
const pas = (a, b, s) => `$${T(a)} ${inf(b, O) ? "-" : "+"} ${T(inf(b, O) ? moins(O, b) : b)} = ${T(s)}$`;

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ls = lignesCalcul(1);
  vrai("1. quatre calculs", ls.length === 4);
  const vals = ls.map(({ expr }) => ev(expr));
  ls.forEach(({ expr }, i) => dit(1, `$${expr} = ${T(vals[i])}$`));
  dit(1, `Réponse : ${ls.map(({ q }, i) => `${q}) $${T(vals[i])}$`).join(" ; ")}.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 1);
  const s = sauts[0];
  meme("1. le saut du c) part de 6", N(s.de), termes(ls[2].expr)[0]);
  meme("1. le saut du c) arrive au résultat", N(s.vers), vals[2]);
  meme("1. l'étiquette du saut = le nombre ajouté", deSvg(s.label), moins(N(s.vers), N(s.de)));
  vrai("1. départ et arrivée marqués", points.some((p) => p.value === s.de) && points.some((p) => p.value === s.vers));
});
essai("2", () => {
  const [, , , points, { sauts }] = dessin("droiteRel", 2, "figure");
  const dep = N(points.find((p) => p.label === "départ").value);
  const A = N(points.find((p) => p.label === "A").value);
  const saut = moins(A, dep);
  enonceDit(2, `je pars de $${T(dep)}$`);
  meme("2. l'arc va du départ à A", moins(N(sauts[0].vers), N(sauts[0].de)), saut);
  vrai("2. l'arc ne donne pas la réponse", sauts[0].label === "?");
  dit(2, `L'addition est $${T(dep)} + ${par(saut)}$.`);
  dit(2, `$${T(dep)} + ${par(saut)} = ${T(A)}$`);
  dit(2, `$${T(A)} + ${T(moins(O, saut))} = ${T(dep)}$`);
  dit(2, `b) A a pour abscisse $${T(A)}$ ; c) un saut de $+${T(moins(O, saut))}$.`);
});
essai("3", () => {
  const ls = lignesCalcul(3);
  const vals = ls.map(({ expr }) => formule(3, expr));
  ls.forEach(({ expr }, i) => meme(`3${ls[i].q}. ${expr}`, vals[i], ev(expr)));
  dit(3, `Réponse : ${ls.map(({ q, expr }) => `${q}) $${T(ev(expr))}$`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 3);
  lignes.forEach((l, i) => {
    meme(`3. tableau ligne ${i + 1} : « ${l[0]} » est le calcul de l'énoncé`, deSvg(l[0]), ev(ls[i].expr));
    meme(`3. tableau ligne ${i + 1} : l'addition`, deSvg(l[1]), ev(ls[i].expr));
    meme(`3. tableau ligne ${i + 1} : le résultat`, deSvg(l[2]), ev(ls[i].expr));
  });
});
essai("4", () => {
  const rep = [];
  for (const { q, expr } of lignesCalcul(4)) {
    const [gauche, droite] = expr.split(" = ");
    const r = ev(droite);
    let x, ecrit;
    if (gauche.startsWith("\\ldots + ")) {
      const b = gauche.slice("\\ldots + ".length);
      x = moins(r, ev(b));
      ecrit = `$${T(x)} + ${b} = ${T(r)}$`;
    } else {
      const a = gauche.replace(" + \\ldots", "");
      x = moins(r, ev(a));
      ecrit = `$${a} + ${par(x)} = ${T(r)}$`;
    }
    dit(4, ecrit);
    rep.push(`${q}) $${T(x)}$`);
  }
  vrai("4. quatre trous", rep.length === 4);
  dit(4, `Réponse : ${rep.join(" ; ")}.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 4);
  const [, d] = /d\) \$(.*) \+ \\ldots = (.*)\$/.exec(e(4)) ? [null, /d\) \$(.*) \+ \\ldots = (.*)\$/.exec(e(4))] : [null, null];
  meme("4. le saut du d) part de −3", N(sauts[0].de), ev(d[1]));
  meme("4. le saut du d) arrive à 5", N(sauts[0].vers), ev(d[2]));
  meme("4. son étiquette = le nombre qui manque", deSvg(sauts[0].label), moins(ev(d[2]), ev(d[1])));
  vrai("4. les deux bouts marqués", points.length === 2);
});
essai("5", () => {
  const [congel, frigo] = nombresDe(e(5));
  const ecart = formule(5, `${T(frigo)} - ${par(congel)}`);
  meme("5a. écart", ecart, moins(frigo, congel));
  const monte = formule(5, `0 - ${par(congel)}`);
  meme("5b. hausse jusqu'à 0", monte, moins(O, congel));
  dit(5, `Réponse : a) l'écart est de $${T(ecart)}$ °C ; b) sa température a monté de $${T(monte)}$ °C.`);
  const [, , , points, fleches] = dessin("axeVertical", 5);
  vrai("5. l'axe porte −18, 0 et 4", [congel, O, frigo].every((v) => points.some((p) => egal(N(p.value), v))));
  fleches.forEach((fl, i) => meme(`5. flèche ${i + 1} : sa longueur = son étiquette`, deSvg(fl.label), moins(N(fl.vers), N(fl.de))));
  meme("5. la flèche du a)", deSvg(fleches[0].label), ecart);
});
essai("6", () => {
  const expr = /\$D = ([^$]*)\$/.exec(e(6))[1];
  const ts = termes(expr);
  const cum = [ts[0]];
  for (let i = 1; i < ts.length; i++) cum.push(plus(cum[i - 1], ts[i]));
  meme("6. D de gauche à droite = D lu d'un coup", cum.at(-1), ev(expr));
  for (let i = 1; i < ts.length; i++) dit(6, pas(cum[i - 1], ts[i], cum[i]));
  dit(6, `Réponse : $D = ${T(cum.at(-1))}$.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 6);
  vrai("6. un saut par terme", sauts.length === ts.length - 1);
  sauts.forEach((s, i) => {
    meme(`6. saut ${i + 1} : départ`, N(s.de), cum[i]);
    meme(`6. saut ${i + 1} : arrivée`, N(s.vers), cum[i + 1]);
    meme(`6. saut ${i + 1} : étiquette`, deSvg(s.label), ts[i + 1]);
  });
  meme("6. le point d'arrivée", N(points.find((p) => p.label === "arrivée").value), cum.at(-1));
});
essai("7", () => {
  const expr = /\$B = ([^$]*)\$/.exec(e(7))[1];
  const ts = expr.split(" + ").map(ev);
  const B = ev(expr);
  const i = ts.findIndex((a) => ts.some((b) => egal(plus(a, b), O)));
  const j = ts.findIndex((b) => egal(plus(ts[i], b), O));
  dit(7, `$${T(ts[i])} + ${par(ts[j])} = 0$`);
  const reste = ts.filter((_, k) => k !== i && k !== j);
  meme("7. le reste vaut B", reste.reduce(plus, O), B);
  let cum = ts[0];
  for (let k = 1; k < ts.length; k++) {
    const s = plus(cum, ts[k]);
    dit(7, `$${T(cum)} + ${par(ts[k])} = ${T(s)}$`);
    cum = s;
  }
  dit(7, `Réponse : $B = ${T(B)}$.`);
  const [, lignes] = dessin("table", 7);
  const [pa, pb] = lignes[0][1].split(" = ");
  meme("7. tableau : les opposés s'annulent", deSvg(pa), O);
  meme("7. tableau : 0 écrit", deSvg(pb), O);
  const [ra, rb] = lignes[1][1].split(" = ");
  meme("7. tableau : le reste vaut B", deSvg(ra), B);
  meme("7. tableau : le reste écrit", deSvg(rb), B);
  meme("7. tableau : B", deSvg(lignes[2][1]), B);
});
essai("8", () => {
  const ls = lignesCalcul(8);
  const vals = ls.map(({ expr }) => formule(8, expr));
  ls.forEach(({ expr }, i) => meme(`8${ls[i].q}. ${expr}`, vals[i], ev(expr)));
  dit(8, `Réponse : ${ls.map(({ q, expr }) => `${q}) $${T(ev(expr))}$`).join(" ; ")}.`);
  const [, , , , { sauts }] = dessin("droiteRel", 8);
  meme("8. le saut du c)", moins(N(sauts[0].vers), N(sauts[0].de)), deSvg(sauts[0].label));
  meme("8. arrivée du c)", N(sauts[0].vers), ev(ls[2].expr));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const expr = /\$C = ([^$]*)\$/.exec(e(9))[1];
  const C = ev(expr);
  const simple = /\$C = ([^$]*)\$\./.exec(c(9))[1];
  vrai("9. sans parenthèses", !simple.includes("("));
  meme("9. l'écriture sans parenthèses garde la valeur", ev(simple), C);
  const ts = termes(simple);
  let cum = ts[0];
  for (let k = 1; k < ts.length; k++) {
    const s = plus(cum, ts[k]);
    dit(9, pas(cum, ts[k], s));
    cum = s;
  }
  dit(9, `Réponse : $C = ${T(C)}$.`);
  const [, lignes] = dessin("table", 9);
  meme("9. tableau : l'énoncé", deSvg(lignes[0][1]), C);
  lignes.forEach((l, i) => meme(`9. tableau ligne ${i + 1} garde la valeur`, deSvg(l[1]), C));
});
essai("10", () => {
  const fautes = [...e(10).matchAll(/\$([^$]*) = ([^$=]*)\$/g)].map((m) => ({ expr: m[1], faux: ev(m[2]) }));
  vrai("10. trois erreurs lues", fautes.length === 3);
  const vals = fautes.map(({ expr, faux }) => {
    const v = formule(10, expr);
    vrai(`10. ${expr} : le résultat de l'élève est bien faux`, !egal(faux, ev(expr)));
    meme(`10. ${expr} corrigé`, v, ev(expr));
    return ev(expr);
  });
  dit(10, `Réponse : ${vals.map((v, i) => `${"abc"[i]}) $${T(v)}$`).join(" ; ")}.`);
  const [, , , , { sauts }] = dessin("droiteRel", 10);
  meme("10. le saut du c) arrive au bon résultat", N(sauts[0].vers), vals[2]);
});
essai("11", () => {
  const [entete, ligne] = dessin("tableau", 11, "figure");
  const mois = entete.slice(1);
  const vars = ligne.slice(1).map(deSvg);
  const cum = [];
  let niv = O;
  vars.forEach((v) => {
    const s = plus(niv, v);
    dit(11, `$${T(niv)} + ${par(v)} = ${T(s)}$`);
    cum.push(s);
    niv = s;
  });
  const bas = cum.reduce((m, x) => (inf(x, m) ? x : m));
  vrai("11. le plus bas : fin août", mois[cum.findIndex((x) => egal(x, bas))] === "août");
  dit(11, `Le plus bas est $${T(bas)}$`);
  const remonte = formule(11, `0 - ${par(niv)}`);
  meme("11d. remonter", remonte, moins(O, niv));
  dit(11, `$${vars.map((v) => T(inf(v, O) ? moins(O, v) : v)).join(" + ")} = ${T(vars.reduce((s, v) => plus(s, inf(v, O) ? moins(O, v) : v), O))}$`);
  dit(11, `Réponse : a) $${T(cum[1])}$ m ; b) $${T(niv)}$ m ; c) fin août ; d) $${T(remonte)}$ m.`);
  const [, , , points, fleches] = dessin("axeVertical", 11);
  vrai("11. l'axe porte le départ et les quatre fins de mois", [O, ...cum].every((v) => points.some((p) => egal(N(p.value), v))) && points.length === 5);
  vrai("11. chaque étiquette porte sa valeur", points.every((p) => p.label.endsWith(String(p.value).replace("-", "−").replace(".", ","))));
  meme("11. la flèche du d)", deSvg(fleches[0].label), remonte);
});
essai("12", () => {
  const dates = [...e(12).matchAll(/\$(\d+)\$ av\. J\.-C\./g)].map((m) => moins(O, ev(m[1])));
  vrai("12. trois dates lues", dates.length === 3);
  const [rome, hannibal, alesia] = dates;
  dit(12, `Rome $${T(rome)}$, Hannibal $${T(hannibal)}$, Alésia $${T(alesia)}$`);
  const d1 = formule(12, `${T(hannibal)} - ${par(rome)}`);
  const d2 = formule(12, `${T(alesia)} - ${par(hannibal)}`);
  const d3 = formule(12, `${T(alesia)} - ${par(rome)}`);
  meme("12. les durées s'ajoutent", plus(d1, d2), d3);
  dit(12, `$${T(d1)} + ${T(d2)} = ${T(d3)}$`);
  dit(12, `Réponse : b) $${T(d1)}$ ans ; c) $${T(d2)}$ ans ; d) $${T(d3)}$ ans.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 12);
  vrai("12. la frise porte les trois dates", dates.every((d) => points.some((p) => egal(N(p.value), d))));
  meme("12. arc 1", deSvg(sauts[0].label.replace(" ans", "")), d1);
  meme("12. arc 2", deSvg(sauts[1].label.replace(" ans", "")), d2);
  vrai("12. arcs posés sur les dates", egal(N(sauts[0].de), rome) && egal(N(sauts[0].vers), hannibal) && egal(N(sauts[1].de), hannibal) && egal(N(sauts[1].vers), alesia));
});
essai("13", () => {
  const [etages] = dessin("pyramide", 13, "figure");
  const P = etages.map((l) => l.map((v) => (v === "?" ? null : deSvg(v))));
  let change = true;
  while (change) {
    change = false;
    for (let i = 0; i + 1 < P.length; i++)
      for (let j = 0; j < P[i].length; j++) {
        const [h, a, b] = [P[i][j], P[i + 1][j], P[i + 1][j + 1]];
        if (h === null && a && b) (P[i][j] = plus(a, b)), (change = true);
        else if (h && a === null && b) (P[i + 1][j] = moins(h, b)), (change = true);
        else if (h && a && b === null) (P[i + 1][j + 1] = moins(h, a)), (change = true);
      }
  }
  vrai("13. la pyramide se résout entièrement", P.every((l) => l.every((v) => v !== null)));
  for (let i = 0; i + 1 < P.length; i++)
    for (let j = 0; j < P[i].length; j++) {
      meme(`13. brique (${i}, ${j}) = somme du dessous`, P[i][j], plus(P[i + 1][j], P[i + 1][j + 1]));
      dit(13, `$${T(P[i + 1][j])} + ${par(P[i + 1][j + 1])} = ${T(P[i][j])}$`);
    }
  const [sol, trouvees] = dessin("pyramide", 13, "schema");
  vrai("13. la solution dessinée = la pyramide résolue", sol.every((l, i) => l.every((v, j) => egal(deSvg(v), P[i][j]))));
  const aTrouver = etages.flatMap((l, i) => l.map((v, j) => (v === "?" ? `${i},${j}` : null))).filter(Boolean);
  vrai("13. en vert : les briques trouvées, et elles seules", JSON.stringify(trouvees.map(String).sort()) === JSON.stringify(aTrouver.sort()));
  dit(13, `au sommet, $${T(P[0][0])}$.`);
});
essai("14", () => {
  const [entete, lignes] = dessin("table", 14, "figure");
  const col = entete.slice(1).map((v) => (v === "…" ? null : deSvg(v)));
  const lig = lignes.map((l) => (l[0] === "…" ? null : deSvg(l[0])));
  const cases = lignes.map((l) => l.slice(1).map((v) => (v === "…" ? null : deSvg(v))));
  cases.forEach((l, i) =>
    l.forEach((v, j) => {
      if (v === null) return;
      if (lig[i] && col[j] === null) (col[j] = moins(v, lig[i])), dit(14, `$${T(v)} - ${par(lig[i])} = `);
      else if (col[j] && lig[i] === null) (lig[i] = moins(v, col[j])), dit(14, `$${T(v)} - ${par(col[j])} = `);
    }),
  );
  vrai("14. les deux bords retrouvés", col.every(Boolean) && lig.every(Boolean));
  cases.forEach((l, i) =>
    l.forEach((v, j) => {
      const s = plus(lig[i], col[j]);
      if (v) meme(`14. case donnée (${i}, ${j})`, v, s);
      dit(14, `$${T(lig[i])} + ${par(col[j])} = ${T(s)}$`);
    }),
  );
  dit(14, `Réponse : la colonne $${T(col[entete.indexOf("…") - 1])}$, la ligne $${T(lig[lignes.findIndex((l) => l[0] === "…")])}$`);
});
essai("15", () => {
  const ls = e(15).split("\\n").slice(1).map(nombresDe);
  const calc = [
    [`${T(ls[0][0])} + ${T(ls[0][1])}`, plus(ls[0][0], ls[0][1])],
    [`${T(ls[1][0])} - ${par(ls[1][1])}`, moins(ls[1][0], ls[1][1])],
    [`${T(moins(O, ls[2][1]))} + ${par(ls[2][0])}`, plus(moins(O, ls[2][1]), ls[2][0])],
    [`${T(ls[3][1])} - ${T(ls[3][0])}`, moins(ls[3][1], ls[3][0])],
  ];
  calc.forEach(([expr, v], i) => meme(`15${"abcd"[i]}. ${expr}`, formule(15, expr), v));
  dit(15, `Réponse : ${calc.map(([, v], i) => `${"abcd"[i]}) $${T(v)}$`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 15);
  lignes.forEach((l, i) => {
    meme(`15. tableau ligne ${i + 1} : le calcul`, deSvg(l[1]), calc[i][1]);
    meme(`15. tableau ligne ${i + 1} : le résultat`, deSvg(l[2]), calc[i][1]);
  });
});
essai("16", () => {
  const ls = lignesCalcul(16);
  const vals = ls.map(({ expr }) => ev(expr));
  const mot = (v) => (egal(v, O) ? "nul" : inf(v, O) ? "négatif" : "positif");
  ls.forEach(({ expr }, i) => dit(16, `$${expr} = ${T(vals[i])}$`));
  dit(16, `Réponse : ${ls.map(({ q }, i) => `${q}) ${mot(vals[i])}, $${T(vals[i])}$`).join(" ; ")}.`);
  const [, lignes] = dessin("table", 16);
  lignes.forEach((l, i) => {
    meme(`16. tableau ligne ${i + 1} : l'addition`, deSvg(l[0]), vals[i]);
    meme(`16. tableau ligne ${i + 1} : le résultat`, deSvg(l[2]), vals[i]);
  });
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  // Les décalages sont les nombres SIGNÉS de la première ligne : « on note $+1$ », « : $-5$ », « : $+9$ ».
  const [paris, ny, tokyo] = [...e(17).split("\\n")[0].matchAll(/\$([+-]\d+)\$/g)].map((m) => ev(m[1]));
  const a = formule(17, `${T(ny)} - (+${T(paris)})`);
  meme("17a. New York − Paris", a, moins(ny, paris));
  const b = formule(17, `${T(tokyo)} - ${par(ny)}`);
  meme("17b. Tokyo − New York", b, moins(tokyo, ny));
  const avance = moins(tokyo, paris);
  dit(17, `$${T(tokyo)} - ${T(paris)} = ${T(avance)}$`);
  const h = plus(Q(20), avance);
  dit(17, `$20 + ${T(avance)} = ${T(h)}$`);
  dit(17, `$${T(h)} - 24 = ${T(moins(h, Q(24)))}$`);
  const arrivee = plus(Q(10), Q(8));
  dit(17, `$10 + 8 = ${T(arrivee)}$`);
  dit(17, `$${T(arrivee)} - ${T(moins(O, a))} = ${T(plus(arrivee, a))}$`);
  dit(17, `Réponse : a) $${T(a)}$ ; b) $${T(b)}$ heures ; c) $${T(moins(h, Q(24)))}$ h du matin, le lendemain ; d) midi.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 17);
  vrai("17. les trois villes à leur décalage", [["Paris", paris], ["New York", ny], ["Tokyo", tokyo]].every(([n, v]) => egal(N(points.find((p) => p.label === n).value), v)));
  meme("17. arc Paris → New York", deSvg(sauts[0].label), a);
  meme("17. arc New York → Tokyo", deSvg(sauts[1].label), b);
});
essai("18", () => {
  const [d1, m, d2] = nombresDe(e(18)).slice(1, 4);
  const ts = [moins(O, d1), m, moins(O, d2)];
  let alt = O;
  const etapes = ts.map((x) => {
    const s = plus(alt, x);
    dit(18, `$${T(alt)} + ${par(x)} = ${T(s)}$`);
    alt = s;
    return s;
  });
  const equipe = nombresDe(e(18))[4];
  const ecart = formule(18, `${T(equipe)} - ${par(alt)}`);
  meme("18b. écart", ecart, moins(equipe, alt));
  const sortir = formule(18, `0 - ${par(alt)}`);
  meme("18c. remonter", sortir, moins(O, alt));
  dit(18, `$${T(d1)} + ${T(d2)} = ${T(plus(d1, d2))}$`);
  dit(18, `$${T(plus(d1, d2))} - ${T(m)} = ${T(sortir)}$`);
  dit(18, `Réponse : a) $${T(alt)}$ m ; b) $${T(ecart)}$ m ; c) $${T(sortir)}$ m.`);
  const [, , , points, fleches] = dessin("axeVertical", 18);
  vrai("18. l'axe porte l'entrée, les étapes et l'équipe", [O, ...etapes, equipe].every((v) => points.some((p) => egal(N(p.value), v))));
  vrai("18. une seule flèche (à 375 px, une seconde débordait)", fleches.length === 1);
  meme("18. flèche : l'écart", deSvg(fleches[0].label), ecart);
  meme("18. flèche posée de la rivière à l'équipe", moins(N(fleches[0].vers), N(fleches[0].de)), ecart);
});
essai("19", () => {
  const [cases] = dessin("grille", 19, "figure");
  const G = cases.map((l) => l.map((v) => (v === "?" ? null : deSvg(v))));
  const lignes = [0, 1, 2].flatMap((i) => [[[i, 0], [i, 1], [i, 2]], [[0, i], [1, i], [2, i]]]).concat([[[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]]);
  const pleine = lignes.find((l) => l.every(([i, j]) => G[i][j] !== null));
  const S = pleine.reduce((s, [i, j]) => plus(s, G[i][j]), O);
  dit(19, `$${pleine.map(([i, j]) => T(G[i][j])).join(" + ")} = ${T(S)}$`.replace(/\+ -/g, "+ -"));
  let change = true;
  while (change) {
    change = false;
    for (const l of lignes) {
      const vides = l.filter(([i, j]) => G[i][j] === null);
      if (vides.length === 1) {
        const [i, j] = vides[0];
        G[i][j] = moins(S, l.filter(([a, b]) => G[a][b] !== null).reduce((s, [a, b]) => plus(s, G[a][b]), O));
        change = true;
      }
    }
  }
  vrai("19. le carré se complète", G.every((l) => l.every((v) => v !== null)));
  vrai("19. les huit sommes valent la somme magique", lignes.every((l) => egal(l.reduce((s, [i, j]) => plus(s, G[i][j]), O), S)));
  const [sol, trouvees] = dessin("grille", 19, "schema");
  vrai("19. la solution dessinée = le carré complété", sol.every((l, i) => l.every((v, j) => egal(deSvg(v), G[i][j]))));
  const aTrouver = cases.flatMap((l, i) => l.map((v, j) => (v === "?" ? `${i},${j}` : null))).filter(Boolean);
  vrai("19. en vert : les cases trouvées", JSON.stringify(trouvees.map(String).sort()) === JSON.stringify(aTrouver.sort()));
  for (const [i, j] of trouvees) vrai(`19. la case (${i}, ${j}) = ${T(G[i][j])} est écrite`, c(19).includes(`$${T(G[i][j])}$`) || c(19).includes(`${par(G[i][j])}`));
  const ajout = ev(/On ajoute \$([^$]*)\$/.exec(e(19))[1]);
  const change3 = plus(plus(ajout, ajout), ajout);
  dit(19, `$(${T(ajout)}) + (${T(ajout)}) + (${T(ajout)}) = ${T(change3)}$`);
  dit(19, `$${T(S)} + ${par(change3)} = ${T(plus(S, change3))}$`);
  dit(19, `Réponse : a) $${T(S)}$ ; c) oui, la nouvelle somme magique est $${T(plus(S, change3))}$.`);
});
essai("20", () => {
  const [tomTxt, inesTxt] = e(20).split("Inès a tiré");
  const tom = nombresDe(tomTxt.split("Tom a tiré")[1]);
  const ines = nombresDe(inesTxt.split("\\n")[0]);
  const somme = (xs, nom) => {
    let s = xs[0];
    for (const x of xs.slice(1)) {
      const n = plus(s, x);
      dit(20, `$${T(s)} + ${par(x)} = ${T(n)}$`);
      s = n;
    }
    return s;
  };
  const sT = somme(tom), sI = somme(ines);
  vrai("20. Inès mène", inf(sT, sI));
  const avance = formule(20, `${T(sI)} - ${par(sT)}`);
  meme("20. l'avance", avance, moins(sI, sT));
  const cartes = Array.from({ length: 41 }, (_, i) => Q(-20 + i, 2));
  const gagnantes = cartes.filter((x) => inf(sI, plus(sT, x)));
  const petite = gagnantes[0];
  dit(20, `La plus petite est $${T(petite)}$ : $${T(sT)} + ${T(petite)} = ${T(plus(sT, petite))}$`);
  dit(20, `$${T(sT)} + ${T(avance)} = ${T(sI)}$ : égalité`);
  dit(20, `Réponse : a) Tom $${T(sT)}$, Inès $${T(sI)}$ ; b) Inès, avec $${T(avance)}$ point d'avance ; c) les cartes de $${T(petite)}$ à $10$, la plus petite est $${T(petite)}$.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 20);
  meme("20. Tom sur la droite", N(points.find((p) => p.label === "Tom").value), sT);
  meme("20. Inès sur la droite", N(points.find((p) => p.label === "Inès").value), sI);
  meme("20. Tom après la carte", N(points.find((p) => p.label.startsWith("Tom +")).value), plus(sT, petite));
  meme("20. l'arc = la carte", deSvg(sauts[0].label), petite);
});

f.fin();
