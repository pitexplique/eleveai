// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Calculer avec les
// fractions » de 4e (lib/fiches-exercices/maths-4e-fractions-calcul.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque résultat est refait ici en fractions EXACTES (Q,
// plus, moins, fois, div du module commun), à partir des nombres de l'énoncé —
// le corrigé redécoupe au plus petit dénominateur commun et retourne le
// diviseur, le script passe par le produit en croix et réduit par le PGCD. Puis
// le corrigé doit ÉCRIRE ce résultat dans sa phrase « Réponse : … ». Les
// chaînes « a = b = c » du corrigé sont relues telles qu'elles sont écrites
// (`outilsEgalites`) : tous leurs membres doivent être égaux.
//
// ⭐ ET LES DESSINS SONT RELUS DANS LE SOURCE : chaque point d'une droite
// graduée doit être à la place de son étiquette (« −11/18 » en −0,611), chaque
// intervalle entre les bons nombres ; chaque case d'un tableau (inverse,
// opposé, effectifs, litres, débits) et chaque ligne d'une trace (priorités,
// programme de calcul) est recalculée. Vingt corrigés, vingt schémas.
//
//   node scripts/verifier-exercices-fractions-calcul-4e.mjs

import { Q, D, plus, moins, fois, div, oppose, egal, inf, versNombre, texFrac, lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

/** « −5/12 », « 0,875 », « 1 170 », « 4/3 (faux) » → une fraction exacte (ou null). */
function lab(s) {
  const t = s.replace(/−/g, "-").replace(/\s*\(faux\)/, "").replace(/ /g, "").trim();
  const m = /^(-?\d+)\/(\d+)$/.exec(t);
  if (m) return Q(m[1], m[2]);
  if (/^-?\d+(,\d+)?$/.test(t)) return D(t);
  return null;
}
const proche = (x, q, tol = 0.001) => Math.abs(x - versNombre(q)) < tol;
const pointsDe = (bloc) => [...bloc.matchAll(/\{ value: (-?[\d.]+), label: "([^"]+)"/g)].map((m) => ({ value: Number(m[1]), label: m[2] }));
const ivsDe = (bloc) => [...bloc.matchAll(/\{ de: (-?[\d.]+), a: (-?[\d.]+),[^}]*label: "([^"]*)"/g)].map((m) => ({ de: Number(m[1]), a: Number(m[2]), label: m[3] }));
/** `tableau([...], [...])` : l'entête et la ligne, sans leur première case. */
function tableauDe(bloc) {
  const m = /tableau\(\[([^\]]*)\], \[([^\]]*)\]/.exec(bloc);
  if (!m) return null;
  const [h, r] = [m[1], m[2]].map((l) => [...l.matchAll(/"([^"]*)"/g)].map((x) => x[1]));
  return { h: h.slice(1), r: r.slice(1), tete: r[0] };
}
/** `trace([entête], [[ligne], …])` : les lignes, en chaînes. */
function traceDe(bloc) {
  const i = bloc.indexOf("trace([");
  if (i < 0) return null;
  const fin = bloc.indexOf("]]),", i);
  const corps = bloc.slice(bloc.indexOf("], [", i) + 4, fin + 1);
  const entete = [...bloc.slice(i, bloc.indexOf("], [", i)).matchAll(/"([^"]*)"/g)].map((x) => x[1]);
  return { entete, lignes: [...corps.matchAll(/\[([^[\]]*)\]/g)].map((m) => [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1])) };
}
/** « 2/3 × 9/4 », « 5/3 − 3/2 », « −1/12 × (−8/5) » : un calcul d'une trace. */
function calc(s) {
  const t = s.replace(/−/g, "-").replace(/[()]/g, "");
  const [a, op, b] = t.split(" ");
  const [x, y] = [lab(a), lab(b)];
  return op === "×" ? fois(x, y) : op === "+" ? plus(x, y) : op === "-" ? moins(x, y) : null;
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const bloc = (k) => f.blocs[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit « ${texte} »`, c(k).includes(texte), texte);
  const pointsFideles = (k) => {
    const ps = pointsDe(bloc(k));
    v.ok(`${k}. des points posés sur la droite`, ps.length > 0);
    for (const { value, label } of ps) {
      const q = lab(label);
      if (q === null) continue;
      v.ok(`${k}. le point « ${label} » est en ${value}`, proche(value, q), String(value));
    }
  };
  const intervalle = (k, de, a, i = 0) => {
    const iv = ivsDe(bloc(k))[i];
    v.ok(`${k}. l'intervalle « ${iv?.label} » va de ${versNombre(de).toFixed(3)} à ${versNombre(a).toFixed(3)}`, !!iv && proche(iv.de, de) && proche(iv.a, a), JSON.stringify(iv));
  };
  const tab = (k) => tableauDe(bloc(k)) ?? { h: [], r: [] };

  v.titre("★ Un seul geste");
  // 1
  const r1 = plus(Q(-5, 12), Q(3, 4));
  egalites(1, "\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}");
  egalites(1, "-\\dfrac{5}{12} + \\dfrac{9}{12} = \\dfrac{4}{12}");
  egalites(1, `\\dfrac{4}{12} = ${texFrac(r1)}`);
  egalites(1, "\\dfrac{-5 + 3}{12 + 4} = \\dfrac{-2}{16}");
  v.ok("1. le faux −2/16 est négatif, le vrai positif", inf(Q(-2, 16), Q(0)) && inf(Q(0), r1));
  ecrit(1, `Réponse : $-\\dfrac{5}{12} + \\dfrac{3}{4} = ${texFrac(r1)}$`);
  pointsFideles(1);
  intervalle(1, Q(-5, 12), r1);
  v.ok("1. l'intervalle dessiné mesure 3/4", proche(ivsDe(bloc(1))[0]?.a - ivsDe(bloc(1))[0]?.de, Q(3, 4), 0.002));
  // 2
  const r2 = moins(Q(1, 6), Q(7, 9));
  egalites(2, "\\dfrac{1}{6} = \\dfrac{3}{18}");
  egalites(2, "\\dfrac{7}{9} = \\dfrac{14}{18}");
  egalites(2, "\\dfrac{3}{18} - \\dfrac{14}{18} = \\dfrac{-11}{18}");
  v.ok("2. −11/18 est irréductible", r2.n === -11n && r2.d === 18n);
  ecrit(2, `Réponse : $\\dfrac{1}{6} - \\dfrac{7}{9} = ${texFrac(r2)}$`);
  pointsFideles(2);
  intervalle(2, r2, Q(1, 6));
  // 3
  const r3 = fois(Q(-4, 15), Q(5, 8));
  egalites(3, "\\dfrac{4}{15} \\times \\dfrac{5}{8} = \\dfrac{4 \\times 5}{15 \\times 8} = \\dfrac{20}{120}");
  egalites(3, "\\dfrac{20}{120} = \\dfrac{1}{6}");
  egalites(3, "\\dfrac{1 \\times 1}{3 \\times 2} = \\dfrac{1}{6}");
  ecrit(3, `Réponse : $-\\dfrac{4}{15} \\times \\dfrac{5}{8} = ${texFrac(r3)}$`);
  {
    const t = tab(3);
    const sg = (q) => (inf(q, Q(0)) ? "−" : "+");
    v.ok("3. le tableau des signes : chaque facteur et le produit", t.h.length === 3 && sg(lab(t.h[0])) === t.r[0] && sg(lab(t.h[1])) === t.r[1] && sg(fois(lab(t.h[0]), lab(t.h[1]))) === t.r[2] && sg(r3) === t.r[2], JSON.stringify(t));
  }
  // 4
  const r4 = fois(Q(-6), Q(7, 9));
  egalites(4, "\\dfrac{-6}{1} \\times \\dfrac{7}{9} = \\dfrac{-6 \\times 7}{1 \\times 9} = \\dfrac{-42}{9}");
  egalites(4, `\\dfrac{-42}{9} = ${texFrac(r4).replace("-\\dfrac{14}", "\\dfrac{-14}")}`);
  egalites(4, "\\dfrac{-6 \\times 7}{6 \\times 9} = \\dfrac{-42}{54}");
  v.ok("4. le faux −42/54 vaut encore −7/9", egal(Q(-42, 54), Q(-7, 9)));
  ecrit(4, `-\\dfrac{14}{3} \\approx ${(Math.round(versNombre(r4) * 100) / 100).toString().replace(".", "{,}")}$`);
  ecrit(4, `Réponse : $-6 \\times \\dfrac{7}{9} = ${texFrac(r4)}$`);
  pointsFideles(4);
  intervalle(4, r4, Q(0));
  // 5
  {
    const nombres = [Q(4, 9), Q(-6), Q(-7, 2)];
    const inverses = nombres.map((q) => div(Q(1), q));
    egalites(5, "\\dfrac{4}{9} \\times \\dfrac{9}{4} = \\dfrac{36}{36} = 1");
    egalites(5, "-6 \\times \\left(-\\dfrac{1}{6}\\right) = 1");
    egalites(5, "-\\dfrac{7}{2} \\times \\left(-\\dfrac{2}{7}\\right) = \\dfrac{14}{14} = 1");
    ecrit(5, `Réponse : $${inverses.map(texFrac).join("$ ; $")}$ ; $0$ n'a pas d'inverse.`);
    let zero = false;
    try {
      div(Q(1), Q(0));
    } catch {
      zero = true;
    }
    v.ok("5. 0 n'a pas d'inverse", zero);
    const t = tab(5);
    v.ok("5. le tableau : chaque nombre fois son inverse fait 1", t.h.length === 3 && t.h.every((x, i) => egal(lab(x), nombres[i]) && egal(fois(lab(x), lab(t.r[i])), Q(1))), JSON.stringify(t));
    v.ok("5. un nombre et son inverse ont le même signe", nombres.every((q, i) => inf(q, Q(0)) === inf(inverses[i], Q(0))));
  }
  // 6
  egalites(6, "\\dfrac{5}{8} + \\left(-\\dfrac{5}{8}\\right) = 0");
  egalites(6, "-\\dfrac{11}{4} + \\dfrac{11}{4} = 0");
  v.ok("6. 5/8 + 8/5 ne fait pas 0", !egal(plus(Q(5, 8), Q(8, 5)), Q(0)));
  ecrit(6, `Réponse : $${texFrac(oppose(Q(5, 8)))}$ ; $${texFrac(oppose(Q(-11, 4)))}$ ; $0$.`);
  pointsFideles(6);
  {
    const ps = pointsDe(bloc(6)).map((p) => p.value);
    v.ok("6. les points vont par paires symétriques autour de 0", ps.length === 4 && ps.every((x) => ps.some((y) => Math.abs(x + y) < 1e-9)), JSON.stringify(ps));
    intervalle(6, Q(-11, 4), Q(11, 4));
  }
  // 7
  const r7 = div(Q(5, 6), Q(10, 9));
  egalites(7, "\\dfrac{5}{6} \\times \\dfrac{9}{10} = \\dfrac{45}{60}");
  egalites(7, `\\dfrac{45}{60} = ${texFrac(r7)}`);
  const faux7 = fois(Q(6, 5), Q(10, 9));
  egalites(7, "\\dfrac{6}{5} \\times \\dfrac{10}{9} = \\dfrac{60}{45} = \\dfrac{4}{3}");
  v.ok("7. le faux est exactement l'inverse du vrai", egal(fois(faux7, r7), Q(1)));
  v.ok("7. le résultat est plus petit que 5/6", inf(r7, Q(5, 6)));
  ecrit(7, `Réponse : $\\dfrac{5}{6} \\div \\dfrac{10}{9} = ${texFrac(r7)}$`);
  pointsFideles(7);
  intervalle(7, Q(0), Q(5, 6));
  // 8
  {
    const feuillus = fois(Q(5, 9), Q(450));
    const resineux = moins(Q(450), feuillus);
    ecrit(8, `$450 \\div 9 = ${450 / 9}$ ha`);
    ecrit(8, `$${450 / 9} \\times 5 = ${texFrac(feuillus)}$ ha`);
    ecrit(8, `$450 - ${texFrac(feuillus)} = ${texFrac(resineux)}$ ha, soit les $${texFrac(moins(Q(1), Q(5, 9)))}$`);
    ecrit(8, `$450 \\div 5 \\times 9 = ${(450 / 5) * 9}$ ha`);
    ecrit(8, `Réponse : les feuillus couvrent $${texFrac(feuillus)}$ ha et les résineux $${texFrac(resineux)}$ ha.`);
    const b = /barre\((\d+), (\d+)\)/.exec(bloc(8));
    v.ok("8. la bande dessine 5/9", !!b && egal(Q(b[1], b[2]), Q(5, 9)) && b[2] === "9", b?.[0]);
  }

  v.titre("★★ Type devoir");
  /** Une trace de priorités : chaque « calcul » donne son « résultat ». */
  const traceJuste = (k, fin) => {
    const t = traceDe(bloc(k));
    v.ok(`${k}. la trace : chaque ligne recalculée`, !!t && t.lignes.length > 0 && t.lignes.every(([, cal, res]) => { const q = calc(cal); return q && egal(q, lab(res)); }), JSON.stringify(t?.lignes));
    v.ok(`${k}. la trace finit sur le résultat`, !!t && egal(lab(t.lignes.at(-1)[2]), fin));
  };
  // 9
  const d9 = div(Q(2, 3), Q(4, 9));
  const A = moins(Q(5, 3), d9);
  egalites(9, "\\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}");
  egalites(9, "\\dfrac{10}{6} - \\dfrac{9}{6} = \\dfrac{1}{6}");
  egalites(9, "\\dfrac{5}{3} - \\dfrac{2}{3} = 1");
  const faux9 = div(moins(Q(5, 3), Q(2, 3)), Q(4, 9));
  v.ok("9. de gauche à droite on trouve autre chose, et c'est écrit", !egal(faux9, A) && c(9).includes(`donne $${texFrac(faux9)}$`));
  ecrit(9, `Réponse : $A = ${texFrac(A)}$`);
  traceJuste(9, A);
  // 10
  const p10 = moins(Q(3, 4), Q(5, 6));
  const B = fois(p10, Q(-8, 5));
  egalites(10, "\\dfrac{3}{4} - \\dfrac{5}{6} = \\dfrac{9}{12} - \\dfrac{10}{12} = -\\dfrac{1}{12}");
  egalites(10, "-\\dfrac{1}{12} \\times \\left(-\\dfrac{8}{5}\\right) = \\dfrac{1 \\times 8}{12 \\times 5} = \\dfrac{8}{60}");
  egalites(10, "\\dfrac{8}{60} = \\dfrac{2}{15}");
  v.ok("10. B est positif", inf(Q(0), B));
  ecrit(10, `Réponse : $B = ${texFrac(B)}$`);
  traceJuste(10, B);
  // 11
  const s11 = plus(Q(2, 3), Q(1, 4));
  const C = div(s11, Q(11, 6));
  egalites(11, "\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}");
  egalites(11, "\\dfrac{11}{12} \\times \\dfrac{6}{11} = \\dfrac{66}{132}");
  egalites(11, "\\dfrac{66}{132} = \\dfrac{1}{2}");
  egalites(11, "\\dfrac{1}{4} \\times \\dfrac{6}{11} = \\dfrac{3}{22}");
  egalites(11, "\\dfrac{2}{3} + \\dfrac{3}{22} = \\dfrac{53}{66}");
  v.ok("11. sans parenthèses, autre chose", !egal(plus(Q(2, 3), div(Q(1, 4), Q(11, 6))), C));
  ecrit(11, `Réponse : $C = ${texFrac(C)}$`);
  traceJuste(11, C);
  // 12
  {
    const x = Q(-5, 4);
    const op = oppose(x), inv = div(Q(1), x);
    egalites(12, "-\\dfrac{5}{4} + \\dfrac{5}{4} = 0");
    egalites(12, "-\\dfrac{5}{4} \\times \\left(-\\dfrac{4}{5}\\right) = \\dfrac{20}{20} = 1");
    egalites(12, "-\\dfrac{5}{4} \\times \\dfrac{4}{5} = -1");
    v.ok("12. 1 et −1 sont leurs propres inverses, 0 son propre opposé", egal(div(Q(1), Q(1)), Q(1)) && egal(div(Q(1), Q(-1)), Q(-1)) && egal(oppose(Q(0)), Q(0)));
    ecrit(12, `Réponse : l'opposé de $x$ est $${texFrac(op)}$ et son inverse est $${texFrac(inv)}$.`);
    const t = tab(12);
    v.ok("12. le tableau : x, son opposé, son inverse", t.r.length === 3 && egal(lab(t.r[0]), x) && egal(lab(t.r[1]), op) && egal(lab(t.r[2]), inv), JSON.stringify(t));
  }
  // 13
  {
    const Dv = div(Q(-9, 10), Q(3, 5));
    const E = div(Q(7, 4), Q(-14));
    egalites(13, "-\\dfrac{9}{10} \\times \\dfrac{5}{3} = -\\dfrac{45}{30} = -\\dfrac{3}{2}");
    egalites(13, "\\dfrac{7}{4} \\times \\left(-\\dfrac{1}{14}\\right) = -\\dfrac{7}{56} = -\\dfrac{1}{8}");
    egalites(13, "\\dfrac{7}{4} \\times (-14) = -\\dfrac{49}{2}");
    ecrit(13, `Réponse : $D = ${texFrac(Dv)}$`);
    ecrit(13, `Réponse : $E = ${texFrac(E)}$`);
    const t = tab(13);
    v.ok("13. le tableau : chaque diviseur et son inverse", t.h.length === 2 && t.h.every((h, i) => egal(fois(lab(h), lab(t.r[i])), Q(1))) && egal(lab(t.h[0]), Q(3, 5)) && egal(lab(t.h[1]), Q(-14)), JSON.stringify(t));
  }
  // 14
  {
    const r = div(Q(3, 5), Q(3, 10));
    v.ok("14. l'énoncé : le calcul de Nina donne bien 1/2", egal(fois(Q(5, 3), Q(3, 10)), Q(1, 2)) && e(14).includes("\\dfrac{5}{3} \\times \\dfrac{3}{10} = \\dfrac{1}{2}"));
    egalites(14, "\\dfrac{3}{5} \\times \\dfrac{10}{3} = \\dfrac{30}{15} = 2");
    egalites(14, "\\dfrac{3}{5} = \\dfrac{6}{10}");
    ecrit(14, `Réponse : ${["zéro", "un", "deux", "trois"][Number(r.n)]} fractionnés`);
    const ps = pointsDe(bloc(14));
    v.ok("14. un point par fractionné, le k-ième en k × 3/10", ps.length === Number(r.n) && ps.every((p, i) => p.label === String(i + 1) && proche(p.value, fois(Q(i + 1), Q(3, 10)))), JSON.stringify(ps));
    intervalle(14, Q(0), Q(3, 5));
  }
  // 15
  {
    const jeunes = fois(Q(5, 8), Q(360));
    const filles = fois(Q(2, 5), jeunes);
    const part = fois(Q(2, 5), Q(5, 8));
    ecrit(15, `Réponse : le club compte $${texFrac(jeunes)}$ jeunes.`);
    ecrit(15, `Réponse : il y a $${texFrac(filles)}$ jeunes filles.`);
    egalites(15, "\\dfrac{2}{5} \\times \\dfrac{5}{8} = \\dfrac{10}{40} = \\dfrac{1}{4}");
    egalites(15, "\\dfrac{90}{360} = \\dfrac{1}{4}");
    v.ok("15. les deux chemins se rejoignent", egal(div(filles, Q(360)), part));
    egalites(15, `\\dfrac{2}{5} \\times 360 = ${texFrac(fois(Q(2, 5), Q(360)))}`);
    ecrit(15, "Réponse : les jeunes filles sont le quart du club.");
    v.ok("15. « le quart » dit 1/4", egal(part, Q(1, 4)));
    const t = tab(15);
    v.ok("15. le tableau : 360, les 5/8, puis les 2/5 de ceux-là", t.r.length === 3 && egal(lab(t.r[0]), Q(360)) && egal(lab(t.r[1]), jeunes) && egal(lab(t.r[2]), filles), JSON.stringify(t));
  }
  // 16
  {
    const r = plus(Q(-2, 3), Q(2, 5));
    v.ok("16. l'énoncé : le calcul de Léa, faux, et c'est bien le sien", e(16).includes("\\dfrac{-2 + 2}{3 + 5} = 0") && !egal(r, Q(0)));
    egalites(16, "-\\dfrac{2}{3} = -\\dfrac{10}{15}");
    egalites(16, "\\dfrac{2}{5} = \\dfrac{6}{15}");
    egalites(16, `-\\dfrac{10}{15} + \\dfrac{6}{15} = ${texFrac(r)}`);
    ecrit(16, `Réponse : $-\\dfrac{2}{3} + \\dfrac{2}{5} = ${texFrac(r)}$ ; pour trouver $0$, il faut ajouter $${texFrac(oppose(Q(-2, 3)))}$.`);
    pointsFideles(16);
    intervalle(16, Q(-2, 3), r);
  }

  v.titre("★★★ Problèmes");
  // 17
  {
    const km = fois(Q(2, 5), Q(80));
    const reste = moins(Q(3, 4), Q(2, 5));
    const manque = moins(Q(1), reste);
    const blocs = div(manque, Q(1, 8));
    const minutes = fois(blocs, Q(10));
    ecrit(17, `Réponse : l'aller-retour fait $${texFrac(km)}$ km.`);
    egalites(17, `\\dfrac{3}{4} - \\dfrac{2}{5} = \\dfrac{15}{20} - \\dfrac{8}{20} = ${texFrac(reste)}`);
    egalites(17, `1 - \\dfrac{7}{20} = ${texFrac(manque)}`);
    egalites(17, "\\dfrac{13}{20} \\times 8 = \\dfrac{104}{20} = 5{,}2");
    v.ok("17. 5,2 blocs de 10 minutes = 52 minutes", egal(minutes, Q(52)));
    ecrit(17, `Réponse : la recharge complète dure $${texFrac(minutes)}$ minutes.`);
    const deux = fois(Q(2), Q(2, 5));
    egalites(17, "2 \\times \\dfrac{2}{5} = \\dfrac{4}{5}");
    const manque2 = moins(deux, Q(3, 4));
    v.ok("17. deux allers-retours dépassent la charge de 1/20, soit 4 km", inf(Q(3, 4), deux) && egal(manque2, Q(1, 20)) && egal(fois(manque2, Q(80)), Q(4)));
    ecrit(17, "il manque $\\dfrac{1}{20}$ de batterie, soit $4$ km");
    pointsFideles(17);
    intervalle(17, reste, Q(3, 4), 0);
    intervalle(17, reste, Q(1), 1);
    v.ok("17. le premier intervalle mesure 2/5", proche(ivsDe(bloc(17))[0]?.a - ivsDe(bloc(17))[0]?.de, Q(2, 5)));
  }
  // 18
  {
    const douce = Q(1, 40), gelee = fois(Q(2, 3), douce), liquide = moins(douce, gelee), salee = moins(Q(1), douce);
    const fois18 = div(salee, liquide);
    egalites(18, "\\dfrac{2}{3} \\times \\dfrac{1}{40} = \\dfrac{2}{120} = \\dfrac{1}{60}");
    egalites(18, "\\dfrac{1}{40} - \\dfrac{1}{60} = \\dfrac{3}{120} - \\dfrac{2}{120} = \\dfrac{1}{120}");
    egalites(18, "\\dfrac{1}{3} \\times \\dfrac{1}{40} = \\dfrac{1}{120}");
    egalites(18, "\\dfrac{39}{40} \\times 120 = 117");
    ecrit(18, `Réponse : $${texFrac(gelee)}$ de l'eau de la Terre est gelée.`);
    ecrit(18, `Réponse : $${texFrac(liquide)}$ seulement.`);
    const L = (q) => texFrac(fois(q, Q(1200)));
    ecrit(18, `$1\\,200 \\div 40 = ${L(douce)}$ L d'eau douce ; $1\\,200 \\div 60 = ${L(gelee)}$ L gelés ; $1\\,200 \\div 120 = ${L(liquide)}$ L`);
    ecrit(18, `$1\\,200 - 30 = 1\\,170$ L d'eau salée, et $1\\,170 \\div 10 = ${texFrac(fois18)}$`);
    ecrit(18, `Réponse : il y a environ $${texFrac(fois18)}$ fois plus d'eau salée`);
    v.ok("18. 1/40 = 2,5 % exactement (USGS)", egal(douce, D("0,025")));
    const t = tab(18);
    const attendu = [douce, gelee, liquide, salee].map((q) => fois(q, Q(1200)));
    v.ok("18. le tableau : les litres de la cuve", t.r.length === 4 && t.r.every((x, i) => egal(lab(x), attendu[i])), JSON.stringify(t));
  }
  // 19
  {
    const prog = (x) => {
      const inv = div(Q(1), x);
      const m = moins(inv, Q(3, 4));
      return [inv, m, fois(m, Q(-2))];
    };
    const a = prog(Q(4, 5)), b = prog(Q(-2, 3)), cc = prog(Q(4, 3));
    egalites(19, "\\dfrac{5}{4} - \\dfrac{3}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}");
    egalites(19, "\\dfrac{1}{2} \\times (-2) = -1");
    egalites(19, "-\\dfrac{3}{2} - \\dfrac{3}{4} = -\\dfrac{6}{4} - \\dfrac{3}{4} = -\\dfrac{9}{4}");
    egalites(19, "-\\dfrac{9}{4} \\times (-2) = \\dfrac{18}{4} = \\dfrac{9}{2}");
    egalites(19, "0 \\times (-2) = 0");
    ecrit(19, `Réponse : on obtient $${texFrac(a[2])}$.`);
    ecrit(19, `Réponse : on obtient $${texFrac(b[2])}$.`);
    v.ok("19. 4/3 donne 0, et c'est le seul (l'inverse vaut 3/4)", egal(cc[2], Q(0)) && egal(div(Q(1), Q(3, 4)), Q(4, 3)));
    ecrit(19, "Réponse : il faut choisir $\\dfrac{4}{3}$.");
    const t = traceDe(bloc(19));
    const cols = [a, b, cc];
    v.ok("19. la trace : trois colonnes recalculées étape par étape", !!t && t.lignes.length === 3 && t.lignes.every((l, i) => cols.every((col, j) => egal(lab(l[j + 1]), col[i]))), JSON.stringify(t?.lignes));
    v.ok("19. les colonnes de la trace sont les nombres de l'énoncé", !!t && ["4/5", "−2/3", "4/3"].every((n, j) => t.entete[j + 1] === `avec ${n}`));
  }
  // 20
  {
    const A20 = Q(1, 3), B20 = Q(1, 6), ens = plus(A20, B20), fuite = moins(ens, Q(1, 12));
    const t1 = div(Q(1), ens), t2 = div(Q(1), fuite);
    egalites(20, "\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}");
    ecrit(20, `$1 \\div \\dfrac{1}{2} = ${texFrac(t1)}$`);
    ecrit(20, `Réponse : ensemble, elles remplissent la citerne en $${texFrac(t1)}$ heures.`);
    egalites(20, "\\dfrac{1}{2} - \\dfrac{1}{12} = \\dfrac{6}{12} - \\dfrac{1}{12} = \\dfrac{5}{12}");
    egalites(20, "\\dfrac{12}{5} = 2{,}4");
    v.ok("20. le temps est l'inverse du débit : 12/5 h", egal(t2, Q(12, 5)));
    egalites(20, "0{,}4 \\times 60 = 24");
    const min = fois(moins(t2, Q(2)), Q(60));
    ecrit(20, `Réponse : il faut $2$ h $${texFrac(min)}$ min.`);
    v.ok("20. à deux, plus vite que la plus rapide seule", inf(t1, Q(3)));
    const t = tab(20);
    const attendu = [A20, B20, ens, fuite];
    v.ok("20. le tableau des débits", t.r.length === 4 && t.r.every((x, i) => egal(lab(x), attendu[i])), JSON.stringify(t));
  }

  v.titre("Les schémas");
  const dessines = f.blocs.filter((b) => /schema: (intervalles|tableau|trace|barre)\(/.test(b)).length;
  v.ok(`${dessines} corrigés sur 20 ont leur schéma`, dessines === 20);
}

lancer({
  nom: "CALCULER AVEC LES FRACTIONS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-fractions-calcul.tsx",
  notionId: "fraction_calcul",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : les dénominateurs additionnés", "Réponse : $-\\\\dfrac{5}{12} + \\\\dfrac{3}{4} = \\\\dfrac{1}{3}$", "Réponse : $-\\\\dfrac{5}{12} + \\\\dfrac{3}{4} = -\\\\dfrac{1}{8}$"],
    ["ex. 1 : 1/3 mal placé sur la droite", "{ value: 0.333, label: \"1/3\"", "{ value: 0.25, label: \"1/3\""],
    ["ex. 2 : le signe perdu", "Réponse : $\\\\dfrac{1}{6} - \\\\dfrac{7}{9} = -\\\\dfrac{11}{18}$", "Réponse : $\\\\dfrac{1}{6} - \\\\dfrac{7}{9} = \\\\dfrac{11}{18}$"],
    ["ex. 3 : le produit pris positif dans le tableau", "[\"signe\", \"−\", \"+\", \"−\"]", "[\"signe\", \"−\", \"+\", \"+\"]"],
    ["ex. 4 : −42/9 mal simplifié", "$\\\\dfrac{-42}{9} = \\\\dfrac{-14}{3}$", "$\\\\dfrac{-42}{9} = \\\\dfrac{-14}{9}$"],
    ["ex. 5 : l'inverse de −6 pris pour 6", "[\"inverse\", \"9/4\", \"−1/6\", \"−2/7\"]", "[\"inverse\", \"9/4\", \"6\", \"−2/7\"]"],
    ["ex. 6 : l'opposé confondu avec l'inverse", "Réponse : $-\\\\dfrac{5}{8}$ ; $\\\\dfrac{11}{4}$", "Réponse : $\\\\dfrac{8}{5}$ ; $\\\\dfrac{11}{4}$"],
    ["ex. 6 : −5/8 posé hors de sa place", "{ value: -0.625, label: \"−5/8\"", "{ value: -0.5, label: \"−5/8\""],
    ["ex. 7 : la première fraction retournée", "Réponse : $\\\\dfrac{5}{6} \\\\div \\\\dfrac{10}{9} = \\\\dfrac{3}{4}$", "Réponse : $\\\\dfrac{5}{6} \\\\div \\\\dfrac{10}{9} = \\\\dfrac{4}{3}$"],
    ["ex. 8 : la bande dessine 5/8", "schema: barre(5, 9)", "schema: barre(5, 8)"],
    ["ex. 8 : les feuillus faux", "les feuillus couvrent $250$ ha et", "les feuillus couvrent $810$ ha et"],
    ["ex. 9 : calculé de gauche à droite", "Réponse : $A = \\\\dfrac{1}{6}$", "Réponse : $A = \\\\dfrac{9}{4}$"],
    ["ex. 9 : une ligne de la trace fausse", "\"2/3 × 9/4\", \"3/2\"", "\"2/3 × 9/4\", \"6/12\""],
    ["ex. 10 : la règle des signes oubliée", "Réponse : $B = \\\\dfrac{2}{15}$", "Réponse : $B = -\\\\dfrac{2}{15}$"],
    ["ex. 11 : la division mal simplifiée", "$\\\\dfrac{66}{132} = \\\\dfrac{1}{2}$", "$\\\\dfrac{66}{132} = \\\\dfrac{1}{3}$"],
    ["ex. 12 : l'inverse de x qui perd son signe", "[\"valeur\", \"−5/4\", \"5/4\", \"−4/5\"]", "[\"valeur\", \"−5/4\", \"5/4\", \"4/5\"]"],
    ["ex. 13 : multiplier par −14", "Réponse : $E = -\\\\dfrac{1}{8}$", "Réponse : $E = -\\\\dfrac{49}{2}$"],
    ["ex. 14 : un fractionné de trop sur la droite", "{ value: 0.6, label: \"2\"", "{ value: 0.7, label: \"2\""],
    ["ex. 15 : les 2/5 pris sur tout le club", "Réponse : il y a $90$ jeunes filles.", "Réponse : il y a $144$ jeunes filles."],
    ["ex. 16 : la somme de Léa gardée", "-\\\\dfrac{10}{15} + \\\\dfrac{6}{15} = -\\\\dfrac{4}{15}$", "-\\\\dfrac{10}{15} + \\\\dfrac{6}{15} = 0$"],
    ["ex. 17 : on recharge ce qui est déjà là", "Réponse : la recharge complète dure $52$ minutes.", "Réponse : la recharge complète dure $28$ minutes."],
    ["ex. 17 : le reste dessiné faux", "{ de: 0.35, a: 0.75,", "{ de: 0.4, a: 0.75,"],
    ["ex. 18 : 1/40 + 2/3 au lieu de 1/40 × 2/3", "Réponse : $\\\\dfrac{1}{60}$ de l'eau", "Réponse : $\\\\dfrac{83}{120}$ de l'eau"],
    ["ex. 18 : une case de la cuve fausse", "\"30\", \"20\", \"10\", \"1 170\"", "\"30\", \"20\", \"10\", \"1 200\""],
    ["ex. 19 : l'inverse de −2/3 sans son signe", "[\"l'inverse\", \"5/4\", \"−3/2\", \"3/4\"]", "[\"l'inverse\", \"5/4\", \"3/2\", \"3/4\"]"],
    ["ex. 20 : 2,4 h lu 2 h 40", "Réponse : il faut $2$ h $24$ min.", "Réponse : il faut $2$ h $40$ min."],
    ["ex. 20 : le débit avec fuite faux", "\"1/2\", \"5/12\"]", "\"1/2\", \"7/12\"]"],
    ["un schéma retiré", "schema: tableau([\"diviser par\"", "figure: tableau([\"diviser par\""],
    ["une micro d'une autre notion", "micros: [\"fraction_oppose\"],", "micros: [\"fraction_comparer\"],"],
  ],
});
