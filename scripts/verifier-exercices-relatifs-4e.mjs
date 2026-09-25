// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Calculer avec les
// nombres relatifs » de 4e (lib/fiches-exercices/maths-4e-relatifs.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé raisonne en « signe d'abord, puis distances à
// zéro » ; le script, lui, LIT chaque calcul tel qu'il est écrit (énoncé,
// corrigé, cases des tableaux) avec son propre analyseur — parenthèses,
// priorités, × et ÷ de gauche à droite, moins unaire — en fractions EXACTES
// (Q du module commun). Aucune règle des signes n'y est codée : elle sort
// d'elle-même de l'arithmétique des fractions. Puis le corrigé doit ÉCRIRE le
// résultat dans sa phrase « Réponse : … », et chaque chaîne « a = b = c » du
// corrigé doit avoir tous ses membres égaux.
//
// ⭐ ET LES DESSINS SONT RELUS DANS LE SOURCE : chaque point posé sur une droite
// (`droiteRel`, `axeVertical`) est à la place du nombre de son étiquette, chaque
// saut va de son départ à son arrivée et porte la bonne valeur (« +9 » pour un
// saut de −13 à −4), les sauts qui se suivent s'enchaînent, et chaque case des
// tableaux est recalculée (signes, étapes d'un calcul, soldes, cumuls).
// Le nombre de corrigés dessinés est compté (« les élèves adorent les schémas »).
//
//   node scripts/verifier-exercices-relatifs-4e.mjs

import { Q, D, plus, moins, fois, div, oppose, egal, inf, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Un analyseur de calcul, écrit pour cette feuille ─────────────────────── */

/** « (−30) ÷ (−6) − 18 ÷ (−3) × 2 », « 8\,849 - (-440) », « \dfrac{a}{b} » → fraction exacte. */
function calc(texte) {
  const s = String(texte)
    .replace(/\\left|\\right/g, "")
    .replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
    .replace(/\\times|×/g, "*")
    .replace(/\\div|÷/g, "/")
    .replace(/−/g, "-")
    .replace(/\\,|[   ]/g, "")
    .replace(/\{,\}/g, ".")
    .replace(/,/g, ".");
  let i = 0;
  const somme = () => {
    let v = produit();
    while (s[i] === "+" || s[i] === "-") {
      const op = s[i++];
      const w = produit();
      v = op === "+" ? plus(v, w) : moins(v, w);
    }
    return v;
  };
  const produit = () => {
    let v = unaire();
    while (s[i] === "*" || s[i] === "/") {
      const op = s[i++];
      const w = unaire();
      v = op === "*" ? fois(v, w) : div(v, w);
    }
    return v;
  };
  const unaire = () => {
    if (s[i] === "-") {
      i++;
      return oppose(unaire());
    }
    if (s[i] === "+") {
      i++;
      return unaire();
    }
    if (s[i] === "(") {
      i++;
      const v = somme();
      if (s[i++] !== ")") throw new Error(`parenthèse non fermée : ${texte}`);
      return v;
    }
    const m = /^\d+(\.\d+)?/.exec(s.slice(i));
    if (!m) throw new Error(`illisible à la position ${i} : ${texte}`);
    i += m[0].length;
    return D(m[0]);
  };
  const v = somme();
  if (i !== s.length) throw new Error(`reste non lu « ${s.slice(i)} » : ${texte}`);
  return v;
}

/** Le dernier nombre d'une étiquette : « 6 h : −9 » → −9, « − (−9) = +9 » → 9, « Everest 8 849 » → 8849. */
function nombreDe(label) {
  const m = /([−+-]?\d[\d  ]*(?:,\d+)?)\D*$/.exec(label);
  return m ? calc(m[1].trim()) : null;
}
const n = (x) => (typeof x === "number" ? D(String(x)) : x);
const echappe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* ── Les dessins, relus dans le source d'un exercice ──────────────────────── */

function dessinsDe(bloc) {
  const res = [];
  for (const m of bloc.matchAll(/\b(droiteRel|axeVertical)\((-?[\d.]+), (-?[\d.]+), (-?[\d.]+), \[([\s\S]*?)\](?:, \[([\s\S]*?)\])?\)/g)) {
    res.push({
      type: m[1],
      min: Number(m[2]),
      max: Number(m[3]),
      pas: Number(m[4]),
      points: [...m[5].matchAll(/\{ value: (-?[\d.]+), label: "([^"]+)"/g)].map((p) => ({ value: Number(p[1]), label: p[2] })),
      sauts: [...(m[6] ?? "").matchAll(/\{ de: (-?[\d.]+), vers: (-?[\d.]+), label: "([^"]+)" \}/g)].map((p) => ({ de: Number(p[1]), vers: Number(p[2]), label: p[3] })),
    });
  }
  return res;
}

/** Les lignes d'un `table([entête], [[…], …])` : la première est l'entête. */
function tableDe(bloc) {
  const i = bloc.indexOf("table([");
  if (i < 0) return null;
  const fin = bloc.indexOf("]),", i);
  const morceau = bloc.slice(i, fin + 1);
  return [...morceau.matchAll(/\[("[^"]*"(?:, "[^"]*")*)\]/g)].map((m) => [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]));
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const bloc = (k) => f.blocs[k - 1] ?? "";
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit « ${texte} »`, c(k).includes(texte), texte);
  /** « a = b = c » écrit dans le corrigé k, tous les membres égaux. */
  const eg = (k, texte) => {
    let tous = false;
    try {
      const vals = texte.split(" = ").map(calc);
      tous = vals.every((x) => egal(x, vals[0]));
    } catch {
      tous = false;
    }
    v.ok(`${k}. ${texte}`, tous && c(k).includes(texte), `membres égaux : ${tous} ; écrit : ${c(k).includes(texte)}`);
  };
  /** L'expression `expr` et sa valeur `val` sont dans UNE même formule du corrigé : « $expr = … = val$ ». */
  const vaut = (k, expr, val) => {
    const re = new RegExp(`\\$${echappe(expr)}(?: = [^$]*)? = ${echappe(tex(val))}\\$`);
    v.ok(`${k}. ${expr} = ${tex(val)}`, egal(calc(expr), val) && re.test(c(k)), `calculé ${tex(calc(expr))}`);
  };
  /** Les items « a) $…$ » d'un énoncé, recalculés. */
  // Les `\n` du source restent écrits `\n` (deux signes) une fois lus.
  const items = (k) => e(k).split("\\n").map((l) => /^([a-d])\) \$(.+)\$$/.exec(l)).filter(Boolean).map((m) => ({ lettre: m[1], expr: m[2], val: calc(m[2]) }));
  /** « Réponse : a) $x$ ; b) $y$ … » avec les valeurs recalculées. */
  const reponseItems = (k) => {
    const its = items(k);
    const attendu = "Réponse : " + its.map((it) => `${it.lettre}) $${tex(it.val)}$`).join(" ; ") + ".";
    v.ok(`${k}. ${attendu}`, its.length === 4 && c(k).includes(attendu), `${its.length} items`);
    for (const it of its) vaut(k, it.expr, it.val);
    return its;
  };
  /** Tout dessin : points à la place de leur nombre, sauts de la bonne longueur, graduations lisibles. */
  const dessinFidele = (k) => {
    const ds = dessinsDe(bloc(k));
    v.ok(`${k}. un dessin relu`, ds.length > 0);
    for (const d of ds) {
      const nTicks = Math.round((d.max - d.min) / d.pas) + 1;
      v.ok(`${k}. ${d.type} : ${nTicks} graduations (onze au plus)`, nTicks <= 11 && nTicks >= 3);
      for (const p of d.points) {
        const lu = nombreDe(p.label);
        v.ok(`${k}. le point « ${p.label} » est en ${p.value}, dans le cadre`, lu !== null && egal(lu, n(p.value)) && p.value >= d.min && p.value <= d.max, String(p.value));
      }
      for (const s of d.sauts) {
        const lu = nombreDe(s.label);
        v.ok(`${k}. le saut « ${s.label} » va de ${s.de} à ${s.vers}`, lu !== null && egal(moins(n(s.vers), n(s.de)), lu) && [s.de, s.vers].every((x) => x >= d.min && x <= d.max), `longueur ${s.vers - s.de}`);
      }
    }
    return ds[0] ?? { points: [], sauts: [] };
  };
  const pointEn = (k, d, val) => v.ok(`${k}. un point posé en ${tex(val)}`, d.points.some((p) => egal(n(p.value), val)));
  const sautDe = (k, d, de, vers) => v.ok(`${k}. un saut de ${tex(de)} à ${tex(vers)}`, d.sauts.some((s) => egal(n(s.de), de) && egal(n(s.vers), vers)), JSON.stringify(d.sauts));
  /** Signes « identiques » / « contraires » des deux opérandes d'un produit ou d'un quotient. */
  const signes = (cellule) => {
    const [a, b] = cellule.split(/ [×÷] /).map(calc);
    return inf(a, Q(0)) === inf(b, Q(0)) ? "identiques" : "contraires";
  };
  const tableSignes = (k) => {
    const [ent, ...lignes] = tableDe(bloc(k)) ?? [[]];
    const its = items(k);
    v.ok(`${k}. le tableau : une ligne par calcul de l'énoncé`, ent.length === 3 && lignes.length === its.length && lignes.every((l, i) => egal(calc(l[0]), its[i].val)), JSON.stringify(lignes));
    v.ok(`${k}. le tableau : signes et résultats recalculés`, lignes.every((l) => signes(l[0]) === l[1] && egal(calc(l[0]), calc(l[2]))), JSON.stringify(lignes));
  };
  /** Un tableau d'étapes : toutes les lignes ont la même valeur que l'énoncé. */
  const etapes = (k, val, col = 1) => {
    const [, ...lignes] = tableDe(bloc(k)) ?? [[]];
    const vals = lignes.map((l) => calc(l[col]));
    v.ok(`${k}. le tableau d'étapes : ${lignes.length} lignes, toutes égales à ${tex(val)}`, lignes.length >= 3 && vals.every((x) => egal(x, val)), vals.map(tex).join(" | "));
  };

  // Les schémas : « les élèves adorent les schémas ».
  const dessines = f.blocs.filter((b) => /\n\s+schema:/.test(b)).length;
  // ⭐ Cette feuille les dessine TOUS : un dessin qui disparaît doit se voir.
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, String(dessines));

  v.titre("★ Un seul geste");
  // 1
  {
    const its = reponseItems(1);
    eg(1, "8 + 6 = 14");
    eg(1, "13 - 9 = 4");
    eg(1, "7{,}5 - 4{,}5 = 3");
    v.ok("1. le faux −22 : les distances ajoutées", egal(oppose(plus(Q(13), Q(9))), Q(-22)) && !egal(its[1]?.val ?? Q(0), Q(-22)) && c(1).includes("$-22$"));
    const d = dessinFidele(1);
    sautDe(1, d, Q(-13), its[1].val);
  }
  // 2
  {
    const its = reponseItems(2);
    eg(2, "3 - 10 = 3 + (-10) = -7");
    eg(2, "(-6) - 8 = (-6) + (-8) = -14");
    eg(2, "(-2) - (-9) = (-2) + 9 = 7");
    eg(2, "7 - (-4{,}5) = 7 + 4{,}5 = 11{,}5");
    eg(2, "2 + 9 = 11");
    v.ok("2. le faux 11 n'est pas la réponse du c)", !egal(its[2].val, Q(11)));
    const d = dessinFidele(2);
    sautDe(2, d, Q(-2), its[2].val);
  }
  // 3
  reponseItems(3);
  eg(3, "7 \\times 6 = 42");
  eg(3, "9 \\times 8 = 72");
  eg(3, "2{,}5 \\times 4 = 10");
  tableSignes(3);
  // 4
  reponseItems(4);
  eg(4, "(-8) \\times 7 = -56");
  eg(4, "5 \\times (-9) = -45");
  eg(4, "7 \\div 2 = 3{,}5");
  tableSignes(4);
  // 5
  {
    const expr = /\$A = ([^$]+)\$/.exec(e(5))?.[1] ?? "";
    const A = calc(expr);
    ecrit(5, `Réponse : $A = ${tex(A)}$`);
    eg(5, "12 + 4 = 16");
    eg(5, "(-5) + (-9) + (-7) = -21");
    eg(5, "16 + (-21) = -5");
    for (const t of ["-5 + 12 = 7", "7 - 9 = -2", "-2 + 4 = 2", "2 - 7 = -5"]) eg(5, t);
    const [, termes, total] = tableDe(bloc(5)) ?? [];
    const liste = (s) => s.split(" ; ").map(calc);
    const [pos, neg] = [liste(termes[1]), liste(termes[2])];
    const tous = [...pos, ...neg].map(tex).sort().join("|");
    const enonce = expr.split(" + ").map(calc).map(tex).sort().join("|");
    v.ok("5. le tableau : tous les termes de A, rangés par signe", tous === enonce && pos.every((x) => inf(Q(0), x)) && neg.every((x) => inf(x, Q(0))), tous);
    const sp = pos.reduce(plus, Q(0));
    const sn = neg.reduce(plus, Q(0));
    v.ok("5. le tableau : les deux totaux, et leur somme vaut A", egal(sp, calc(total[1])) && egal(sn, calc(total[2])) && egal(plus(sp, sn), A));
  }
  // 6
  {
    const B = calc(/\$B = ([^$]+)\$/.exec(e(6))?.[1] ?? "");
    ecrit(6, `Réponse : $B = ${tex(B)}$`);
    eg(6, "4 \\times (-3) = -12");
    eg(6, "10 + 12 = 22");
    eg(6, "(10 - 4) \\times (-3) = 6 \\times (-3) = -18");
    v.ok("6. le calcul de gauche à droite donne autre chose", !egal(calc("(10 - 4) \\times (-3)"), B));
    etapes(6, B);
  }
  // 7
  {
    const [dep, arr] = [Q(-9), Q(4)];
    v.ok("7. l'énoncé : −9 °C puis 4 °C", e(7).includes("$-9$ °C") && e(7).includes("$4$ °C"));
    const ecart = moins(arr, dep);
    eg(7, "4 - (-9) = 4 + 9 = 13");
    eg(7, "9 + 4 = 13");
    ecrit(7, `Réponse : la température a monté de $${tex(ecart)}$ °C`);
    eg(7, "4 - 9 = -5");
    const d = dessinFidele(7);
    pointEn(7, d, dep);
    pointEn(7, d, arr);
    sautDe(7, d, dep, arr);
  }
  // 8
  {
    const lignes = e(8).split("\\n");
    const exprA = /^\$A = (.+)\$$/.exec(lignes.find((l) => l.startsWith("$A =")) ?? "")?.[1] ?? "";
    const exprB = /^\$B = (.+)\$$/.exec(lignes.find((l) => l.startsWith("$B =")) ?? "")?.[1] ?? "";
    const facteurs = (x) => x.split(" \\times ").map(calc);
    const negA = facteurs(exprA).filter((x) => inf(x, Q(0))).length;
    const negB = facteurs(exprB).filter((x) => inf(x, Q(0))).length;
    const A = calc(exprA);
    const B = calc(exprB);
    v.ok(`8. A a ${negA} facteurs négatifs (pair), A > 0 ; B contient 0`, negA === 4 && inf(Q(0), A) && negB === 3 && facteurs(exprB).some((x) => egal(x, Q(0))) && egal(B, Q(0)));
    eg(8, "3 \\times 5 \\times 2 \\times 4 \\times 1 = 120");
    ecrit(8, `Réponse : $A$ est positif, $A = ${tex(A)}$ ; $B = ${tex(B)}$`);
    const [, lA, lB] = tableDe(bloc(8)) ?? [];
    v.ok("8. le tableau : le compte des facteurs négatifs et le signe", lA?.[1].startsWith(`${negA} : pair`) && lA?.[2] === "positif" && lB?.[1].startsWith(`${negB}, et un facteur 0`) && lB?.[2] === "nul", JSON.stringify([lA, lB]));
  }

  v.titre("★★ Type devoir");
  // 9
  {
    const expr = /\$C = ([^$]+)\$/.exec(e(9))?.[1] ?? "";
    const C = calc(expr);
    const reecrit = "(-7) + 12 + (-4{,}5) + (-6)";
    v.ok("9. la réécriture en additions vaut C", egal(calc(reecrit), C) && c(9).includes(`$${reecrit}$`));
    eg(9, "(-7) + (-4{,}5) + (-6) = -17{,}5");
    eg(9, "17{,}5 - 12 = 5{,}5");
    eg(9, "12 + (-17{,}5) = -5{,}5");
    ecrit(9, `Réponse : $C = ${tex(C)}$`);
    const d = dessinFidele(9);
    const termes = reecrit.split(" + ").map(calc);
    v.ok("9. les sauts s'enchaînent : de −7, un saut par terme, jusqu'à C", d.sauts.length === termes.length - 1 && egal(n(d.sauts[0].de), termes[0]) && d.sauts.every((s, i) => egal(moins(n(s.vers), n(s.de)), termes[i + 1]) && (i === 0 || s.de === d.sauts[i - 1].vers)) && egal(n(d.sauts[d.sauts.length - 1].vers), C), JSON.stringify(d.sauts));
    pointEn(9, d, C);
  }
  // 10
  {
    const D10 = calc(/\$D = ([^$]+)\$/.exec(e(10))?.[1] ?? "");
    ecrit(10, `Réponse : $D = ${tex(D10)}$`);
    for (const t of ["6 - 11 = -5", "(-4) \\times (-5) = 20", "3 \\times (-7) = -21", "20 + (-21) = -1", "(20 + 3) \\times (-7) = -161"]) eg(10, t);
    etapes(10, D10);
  }
  // 11
  {
    const E = calc(/\$E = ([^$]+)\$/.exec(e(11))?.[1] ?? "");
    ecrit(11, `Réponse : $E = ${tex(E)}$`);
    for (const t of ["(-30) \\div (-6) = 5", "18 \\div (-3) = -6", "(-6) \\times 2 = -12", "5 - (-12) = 5 + 12 = 17", "18 \\div ((-3) \\times 2) = 18 \\div (-6) = -3"]) eg(11, t);
    const faux = calc("(-30) \\div (-6) - 18 \\div ((-3) \\times 2)");
    v.ok(`11. la multiplication d'abord donne ${tex(faux)}, et c'est écrit`, !egal(faux, E) && c(11).includes(`et trouver $${tex(faux)}$`));
    etapes(11, E);
  }
  // 12
  {
    const expr = /\$F = ([^$]+)\$/.exec(e(12))?.[1] ?? "";
    const F = calc(expr);
    const [, haut, basTex] = /\\dfrac\{([^{}]*)\}\{([^{}]*)\}/.exec(expr) ?? [];
    ecrit(12, `Réponse : $F = ${tex(F)}$`);
    for (const t of ["(-8) \\times 9 = -72", "-72 + 12 = -60", "(-2) \\times 5 = -10", "60 \\div 10 = 6"]) eg(12, t);
    const [, lh, lb, lq] = tableDe(bloc(12)) ?? [];
    v.ok("12. le tableau : le haut, le bas, le quotient", egal(calc(lh[1]), calc(haut)) && egal(calc(lh[2]), calc(haut)) && egal(calc(lb[1]), calc(basTex)) && egal(calc(lb[2]), calc(basTex)) && egal(calc(lq[1]), F) && egal(calc(lq[2]), F), JSON.stringify([lh, lb, lq]));
  }
  // 13
  {
    const [, depart, ...ops] = tableDe(bloc(13)) ?? [];
    const montantsEnonce = { cotisations: "$150$ €", ballons: "$96{,}50$ €", remboursement: "$23$ €", gymnase: "$75$ €" };
    const signeAttendu = { cotisations: 1, ballons: -1, remboursement: 1, gymnase: -1 };
    let solde = calc(depart[2]);
    v.ok("13. le départ : −48 €, comme l'énoncé", egal(solde, Q(-48)) && e(13).includes("$-48$ €"));
    let fidele = true;
    for (const [nom, montant, s] of ops) {
      const m = calc(montant);
      const absEnonce = calc(montantsEnonce[nom].replace(/\$| €/g, ""));
      if (!(egal(m, signeAttendu[nom] > 0 ? absEnonce : oppose(absEnonce)) && e(13).includes(montantsEnonce[nom]))) fidele = false;
      solde = plus(solde, m);
      if (!egal(solde, calc(s))) fidele = false;
    }
    v.ok("13. le relevé : chaque montant signé comme l'énoncé, chaque solde recalculé", fidele && ops.length === 4);
    const exprA = "-48 + 150 + (-96{,}5) + 23 + (-75)";
    v.ok("13. le calcul du a) vaut le solde final", c(13).includes(`$${exprA}$`) && egal(calc(exprA), solde));
    for (const t of ["150 + 23 = 173", "(-48) + (-96{,}5) + (-75) = -219{,}5", "173 + (-219{,}5) = -46{,}5", "219{,}5 - 173 = 46{,}5"]) eg(13, t);
    v.ok("13. Réponse : le solde et le découvert", c(13).includes("Réponse : le solde au 31 mars est de $-46{,}50$ €") && egal(calc("-46{,}50"), solde) && inf(solde, Q(0)) && c(13).includes("encore à découvert"));
  }
  // 14
  {
    const nb = div(Q(120), Q(10));
    const prof = fois(nb, D("-1,5"));
    const pause = Q(-5);
    const remontee = moins(pause, prof);
    eg(14, "120 \\div 10 = 12");
    eg(14, "12 \\times (-1{,}5) = -18");
    eg(14, "12 \\times 1{,}5 = 18");
    eg(14, "-5 - (-18) = -5 + 18 = 13");
    eg(14, "-5 - 18 = -23");
    ecrit(14, `Réponse : au bout de $2$ minutes, elle est à $${tex(prof)}$ m`);
    ecrit(14, `Réponse : elle est remontée de $${tex(remontee)}$ m`);
    const d = dessinFidele(14);
    pointEn(14, d, prof);
    pointEn(14, d, pause);
    sautDe(14, d, prof, pause);
  }
  // 15
  {
    const negs = [-0.5, -1, -2, -3, -7.5, -8, -12].map((x) => D(String(x)));
    const paires = negs.flatMap((a) => negs.map((b) => [a, b]));
    const verdict = {
      a: paires.every(([a, b]) => inf(plus(a, b), Q(0))),
      b: paires.every(([a, b]) => inf(fois(a, b), Q(0))),
      c: paires.every(([a, b]) => inf(moins(a, b), Q(0))),
      d: [...negs, Q(0), Q(4), D("6,4")].every((x) => egal(fois(Q(-1), x), oppose(x))),
    };
    const mot = (b) => (b ? "vrai" : "faux");
    ecrit(15, `Réponse : a) ${mot(verdict.a)} ; b) ${mot(verdict.b)} ; c) ${mot(verdict.c)} ; d) ${mot(verdict.d)}.`);
    for (const t of ["(-3) + (-8) = -11", "(-2) \\times (-7) = 14", "(-3) - (-8) = (-3) + 8 = 5", "(-1) \\times 6{,}4 = -6{,}4", "(-1) \\times (-9) = 9"]) eg(15, t);
    v.ok("15. les contre-exemples contredisent b) et c)", inf(Q(0), fois(Q(-2), Q(-7))) && inf(Q(0), moins(Q(-3), Q(-8))));
    const d = dessinFidele(15);
    sautDe(15, d, Q(-3), moins(Q(-3), Q(-8)));
  }
  // 16
  {
    const m = /tableau\(\[([^\]]*)\], \["°C", ([^\]]*)\], true\)/.exec(bloc(16));
    const temps = m ? m[2].split(", ").map((x) => D(x)) : [];
    const jours = m ? [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]).slice(1) : [];
    v.ok("16. la figure : sept jours, sept températures", temps.length === 7 && jours.length === 7);
    const max = temps.reduce((a, b) => (inf(a, b) ? b : a));
    const min = temps.reduce((a, b) => (inf(b, a) ? b : a));
    const ecart = moins(max, min);
    const somme = temps.reduce(plus, Q(0));
    const moy = div(somme, Q(temps.length));
    v.ok("16. le plus haut samedi, le plus bas dimanche", jours[temps.findIndex((x) => egal(x, max))] === "sam." && jours[temps.findIndex((x) => egal(x, min))] === "dim.");
    eg(16, "3 - (-8) = 3 + 8 = 11");
    ecrit(16, `Réponse : l'écart est de $${tex(ecart)}$ °C`);
    eg(16, "2 + 3 = 5");
    eg(16, "(-4) + (-7) + (-1) + (-6) + (-8) = -26");
    eg(16, "5 + (-26) = -21");
    eg(16, "(-21) \\div 7 = -3");
    v.ok("16. la somme recalculée des sept valeurs", egal(somme, Q(-21)));
    ecrit(16, `Réponse : la température moyenne est de $${tex(moy)}$ °C`);
    const dist = temps.map((x) => (inf(x, Q(0)) ? oppose(x) : x)).reduce(plus, Q(0));
    eg(16, "4 + 7 + 2 + 1 + 6 + 3 + 8 = 31");
    v.ok("16. la somme des distances est bien celle du piège", egal(dist, Q(31)));
    const d = dessinFidele(16);
    pointEn(16, d, min);
    pointEn(16, d, max);
    pointEn(16, d, moy);
  }

  v.titre("★★★ Problèmes");
  // 17
  {
    const [ev, mm] = [Q(8849), Q(-440)];
    v.ok("17. l'énoncé : 8 849 m et −440 m", e(17).includes("$8\\,849$ m") && e(17).includes("$-440$ m"));
    const deniv = moins(ev, mm);
    const dans25 = plus(mm, fois(Q(25), Q(-1)));
    const rando = plus(mm, Q(1250));
    eg(17, "8\\,849 - (-440) = 8\\,849 + 440 = 9\\,289");
    ecrit(17, `Réponse : le dénivelé est de $${tex(deniv)}$ m`);
    eg(17, "25 \\times (-1) = -25");
    eg(17, "-440 + (-25) = -465");
    ecrit(17, `Réponse : dans $25$ ans, ses rives seraient vers $${tex(dans25)}$ m`);
    eg(17, "-440 + 1\\,250 = 810");
    ecrit(17, `Réponse : elle est à $${tex(rando)}$ m, au-dessus du niveau de la mer`);
    v.ok("17. elle est bien au-dessus de 0", inf(Q(0), rando));
    eg(17, "8\\,849 - 440 = 8\\,409");
    const d = dessinFidele(17);
    pointEn(17, d, ev);
    pointEn(17, d, mm);
    sautDe(17, d, mm, ev);
  }
  // 18
  {
    const T = (h) => plus(Q(15), fois(Q(h), D("-6,5")));
    for (const t of ["3 \\times (-6{,}5) = -19{,}5", "15 + (-19{,}5) = -4{,}5", "11 \\times (-6{,}5) = -71{,}5", "15 + (-71{,}5) = -56{,}5", "-4{,}5 - (-56{,}5) = -4{,}5 + 56{,}5 = 52", "8 \\times 6{,}5 = 52", "71{,}5 - 15 = 56{,}5"]) eg(18, t);
    ecrit(18, `Réponse : à $3$ km, il fait $${tex(T(3))}$ °C`);
    ecrit(18, `Réponse : dehors, il fait $${tex(T(11))}$ °C`);
    ecrit(18, `Réponse : la température monte de $${tex(moins(T(3), T(11)))}$ °C`);
    v.ok("18. −56,5 °C à 11 km : la valeur de l'atmosphère type (OACI)", egal(T(11), D("-56,5")));
    const [, ...lignes] = tableDe(bloc(18)) ?? [];
    v.ok("18. le tableau : chaque altitude, son calcul et sa température", lignes.length === 3 && lignes.every(([alt, cal, temp]) => {
      const h = Number(alt.replace(" km", ""));
      return egal(calc(cal), T(h)) && egal(calc(temp.replace(" °C", "")), T(h));
    }), JSON.stringify(lignes));
  }
  // 19
  {
    const R = { mouthe: D("-36,7"), verargues: Q(46), vostok: D("-89,2"), vallee: D("56,7") };
    v.ok("19. l'énoncé porte les quatre records", ["$-36{,}7$ °C", "$46$ °C", "$-89{,}2$ °C", "$56{,}7$ °C"].every((s) => e(19).includes(s)));
    const eF = moins(R.verargues, R.mouthe);
    const eT = moins(R.vallee, R.vostok);
    const moy = div(plus(R.verargues, R.mouthe), Q(2));
    const dbl = fois(Q(2), R.mouthe);
    for (const t of ["46 - (-36{,}7) = 46 + 36{,}7 = 82{,}7", "56{,}7 - (-89{,}2) = 56{,}7 + 89{,}2 = 145{,}9", "46 + (-36{,}7) = 9{,}3", "9{,}3 \\div 2 = 4{,}65", "2 \\times (-36{,}7) = -73{,}4", "46 - 36{,}7 = 9{,}3"]) eg(19, t);
    ecrit(19, `Réponse : $${tex(eF)}$ °C d'écart en France, $${tex(eT)}$ °C sur Terre`);
    ecrit(19, `Réponse : la moyenne des deux records de France est $${tex(moy)}$ °C`);
    v.ok("19. c) : −89,2 < −73,4, et c'est écrit", inf(R.vostok, dbl) && c(19).includes(`Réponse : oui, $${tex(R.vostok)} < ${tex(dbl)}$`));
    const d = dessinFidele(19);
    for (const r of Object.values(R)) pointEn(19, d, r);
    sautDe(19, d, R.mouthe, R.verargues);
    sautDe(19, d, R.vostok, R.vallee);
  }
  // 20
  {
    const par = 72;
    const cartes = [68, 71, 74];
    const ecarts = cartes.map((x) => Q(x - par));
    const total3 = ecarts.reduce(plus, Q(0));
    const vise = Q(-9);
    const quatrieme = moins(vise, total3);
    const coups4 = plus(Q(par), quatrieme);
    v.ok("20. l'énoncé : par 72, cartes 68, 71, 74, objectif −9", e(20).includes("par $72$") && e(20).includes("$68$, $71$ et $74$ coups") && e(20).includes("finir le tournoi à $-9$"));
    for (const t of ["68 - 72 = -4", "71 - 72 = -1", "74 - 72 = 2", "(-4) + (-1) + 2 = -5 + 2 = -3", "-9 - (-3) = -9 + 3 = -6", "72 + (-6) = 66", "68 + 71 + 74 + 66 = 279", "4 \\times 72 = 288", "279 - 288 = -9", "-9 - 3 = -12"]) eg(20, t);
    ecrit(20, `Réponse : après trois tours, elle est à $${tex(total3)}$`);
    ecrit(20, `Réponse : elle doit jouer $${tex(quatrieme)}$ au quatrième tour, soit une carte de $${tex(coups4)}$ coups`);
    const [, ...lignes] = tableDe(bloc(20)) ?? [];
    let cumul = Q(0);
    const ok = lignes.length === 4 && lignes.every(([tour, coups, ec, cu], i) => {
      cumul = plus(cumul, calc(ec));
      const coupsAttendus = i < 3 ? Q(cartes[i]) : coups4;
      return tour === String(i + 1) && egal(calc(coups), coupsAttendus) && egal(calc(ec), moins(calc(coups), Q(par))) && egal(calc(cu), cumul);
    });
    v.ok("20. la carte : écart au par et cumul recalculés, fin à −9", ok && egal(cumul, vise), JSON.stringify(lignes));
  }
}

lancer({
  nom: "NOMBRES RELATIFS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-relatifs.tsx",
  notionId: "relatif_operation",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le saut dessiné trop court", "{ de: -13, vers: -4, label: \"+9\" }", "{ de: -13, vers: -3, label: \"+9\" }"],
    ["ex. 1 : les distances ajoutées", "$(-13) + 9 = -4$", "$(-13) + 9 = -22$"],
    ["ex. 2 : le premier nombre changé de signe", "Réponse : a) $-7$ ; b) $-14$ ; c) $7$", "Réponse : a) $-7$ ; b) $-14$ ; c) $11$"],
    ["ex. 3 : moins par moins négatif", "[\"(−9) × (−8)\", \"identiques\", \"72\"]", "[\"(−9) × (−8)\", \"identiques\", \"−72\"]"],
    ["ex. 4 : les signes mal lus", "[\"(−45) ÷ (−9)\", \"identiques\", \"5\"]", "[\"(−45) ÷ (−9)\", \"contraires\", \"5\"]"],
    ["ex. 5 : le signe perdu", "Réponse : $A = -5$", "Réponse : $A = 5$"],
    ["ex. 6 : de gauche à droite", "Réponse : $B = 22$", "Réponse : $B = -18$"],
    ["ex. 7 : le point du matin mal placé", "{ value: -9, label: \"6 h : −9\"", "{ value: -8, label: \"6 h : −9\""],
    ["ex. 8 : A négatif", "$A = 120$ ; $B = 0$", "$A = -120$ ; $B = 0$"],
    ["ex. 9 : un saut dessiné faux", "{ de: 5, vers: 0.5, label: \"−4,5\" }", "{ de: 5, vers: 1, label: \"−4,5\" }"],
    ["ex. 10 : la dernière étape fausse", "[\"somme\", \"−1\"]", "[\"somme\", \"1\"]"],
    ["ex. 11 : la multiplication avant la division", "Réponse : $E = 17$", "Réponse : $E = 8$"],
    ["ex. 12 : le dénominateur sans son signe", "[\"en bas\", \"(−2) × 5\", \"−10\"]", "[\"en bas\", \"(−2) × 5\", \"10\"]"],
    ["ex. 13 : la dépense comptée en rentrée", "[\"ballons\", \"−96,50\", \"5,50\"]", "[\"ballons\", \"+96,50\", \"5,50\"]"],
    ["ex. 14 : la remontée fausse", "{ de: -18, vers: -5, label: \"+13\" }", "{ de: -18, vers: -5, label: \"+23\" }"],
    ["ex. 15 : un verdict renversé", "b) faux ; c) faux ; d) vrai.", "b) vrai ; c) faux ; d) vrai."],
    ["ex. 16 : une température changée dans l'énoncé", "[\"°C\", -4, -7, 2, -1, -6, 3, -8]", "[\"°C\", -4, -7, 2, -1, -6, 3, -9]"],
    ["ex. 17 : le dénivelé faux", "8\\\\,849 + 440 = 9\\\\,289$", "8\\\\,849 + 440 = 9\\\\,389$"],
    ["ex. 18 : le signe perdu à 11 km", "[\"11 km\", \"15 + 11 × (−6,5)\", \"−56,5 °C\"]", "[\"11 km\", \"15 + 11 × (−6,5)\", \"56,5 °C\"]"],
    ["ex. 19 : le record de Vérargues mal placé", "{ value: 46, label: \"Hérault 46\" }", "{ value: 36, label: \"Hérault 46\" }"],
    ["ex. 19 : la moyenne prise pour la somme", "records de France est $4{,}65$", "records de France est $9{,}3$"],
    ["ex. 20 : le cumul faux", "[\"4\", \"66\", \"−6\", \"−9\"]", "[\"4\", \"66\", \"−6\", \"−8\"]"],
    ["ex. 20 : −9 − 3 au lieu de −9 − (−3)", "soit une carte de $66$ coups", "soit une carte de $60$ coups"],
    ["un corrigé sans son dessin", "          schema: droiteRel(-4, 6, 2,", "          dessin: droiteRel(-4, 6, 2,"],
  ],
});
