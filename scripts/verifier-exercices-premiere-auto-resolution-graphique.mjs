// Recalcul indépendant de la feuille « Résolution graphique » (1re,
// automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-resolution-graphique.tsx
//
// Les courbes sont RELUES dans les appels `repere(…)` du source et évaluées en
// fractions exactes. Chaque ensemble de solutions annoncé (équation ou
// inéquation, crochets compris) est RETROUVÉ en testant la condition sur une
// grille au huitième d'unité, bornes et voisins à 1/1000 compris, puis comparé
// à l'ensemble écrit. Chaque tableau de signes est relu case par case contre la
// courbe ; chaque tableau de variations, flèche par flèche (`accord`). Les
// égalités du corrigé sont évaluées ; chaque point marqué est sur sa courbe.
// Plus le socle commun (8 + 8 + 4, dollars, LaTeX, canvas, micros de la
// notion, exactement 20 `correction:`).
// Usage : node scripts/verifier-exercices-premiere-auto-resolution-graphique.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, moins, fois, egal, inf, lireFeuille, controlesCommuns, outilsCourbes, outilsEgalites, outilsSignes } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-resolution-graphique.tsx";
const NOTION = "auto_resolution_graphique";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

let justes = 0;
const fausses = [];
const v = {
  ok(nom, condition, detail = "") {
    if (condition) justes++;
    else fausses.push(`${nom}${detail ? " — " + detail : ""}`);
  },
  titre() {},
};
const f = lireFeuille(source);
const c = (k) => f.corrections[k - 1] ?? "";
const egalites = outilsEgalites(v, f);
const { courbes, controlerTout, tableauVariationsDe, accord } = outilsCourbes(v, f, source);
const { tableau: tableauSignesDe } = outilsSignes(v, f);

const n = (x) => (typeof x === "object" ? x : D(String(x)));
const txt = (q) => (q.d === 1n ? `${q.n}` : `${q.n}/${q.d}`);
const vaut = (nom, a, b) => v.ok(nom, a !== null && egal(n(a), n(b)), a === null ? "hors courbe" : `${txt(n(a))} ≠ ${txt(n(b))}`);
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));

/** Un ensemble écrit comme une liste de morceaux : { de, a, deInclus, aInclus }
 *  (un point isolé : de = a, inclus). */
const dans = (x, m) => (m.deInclus ? !inf(x, n(m.de)) : inf(n(m.de), x)) && (m.aInclus ? !inf(n(m.a), x) : inf(x, n(m.a)));
/** La condition, testée sur [a ; b] au huitième (plus chaque borne ± 1/1000),
 *  donne-t-elle exactement la réunion des morceaux ? */
function ensemble(k, quoi, cond, [a, b], morceaux, phrase) {
  const xs = [];
  for (let m = 8 * a; m <= 8 * b; m++) xs.push(Q(m, 8));
  for (const mo of morceaux) for (const bo of [mo.de, mo.a]) for (const e of [Q(-1, 1000), Q(0), Q(1, 1000)]) {
    const x = plus(n(bo), e);
    if (!inf(x, Q(a)) && !inf(Q(b), x)) xs.push(x);
  }
  const faux = xs.filter((x) => cond(x) !== morceaux.some((mo) => dans(x, mo)));
  v.ok(`${k}. ${quoi}`, faux.length === 0 && (!phrase || c(k).includes(phrase)), faux.length ? `désaccord en x = ${txt(faux[0])}` : `phrase absente : ${phrase}`);
}
const I = (de, a, deInclus = true, aInclus = true) => ({ de, a, deInclus, aInclus });
const P = (x) => I(x, x);

/** Le tableau de signes de l'exercice k dit-il le signe de F, case par case ? */
function signesDeLaCourbe(k, F) {
  const t = tableauSignesDe(k);
  const [, signes, marques = []] = t.lignes[0];
  const fautes = [];
  const signe = (x) => (egal(F(x), Q(0)) ? "0" : inf(F(x), Q(0)) ? "-" : "+");
  // Sur chaque colonne, le signe écrit tient en TOUT point de la grille au huitième.
  signes.forEach((s, j) => {
    for (let x = plus(t.bornes[j], Q(1, 8)); inf(x, t.bornes[j + 1]); x = plus(x, Q(1, 8))) if (signe(x) !== s) fautes.push(`colonne ${j + 1}, x = ${txt(x)}`);
  });
  for (let j = 1; j + 1 < t.bornes.length; j++) if ((signe(t.bornes[j]) === "0" ? "0" : "") !== (marques[j - 1] ?? "")) fautes.push(`sous la borne ${j}`);
  v.ok(`${k}. tableau de signes relu contre la courbe`, fautes.length === 0, fautes.slice(0, 2).join(" ; "));
}

try {
  /* ── ★ ── */
  const [F1] = courbes(1);
  ensemble(1, "f(x) = 0", (x) => egal(F1(x), Q(0)), [-3, 5], [P(-1), P(3)], "$S = \\{-1 ; 3\\}$");
  ensemble(1, "f(x) = −3", (x) => egal(F1(x), Q(-3)), [-3, 5], [P(0), P(2)], "$S = \\{0 ; 2\\}$");
  ensemble(1, "f(x) = −5", (x) => egal(F1(x), Q(-5)), [-3, 5], [], "$S = \\varnothing$");
  vaut("1. le point le plus bas", F1(Q(1)), -4);
  ensemble(2, "f(x) < 0", (x) => inf(F1(x), Q(0)), [-3, 5], [I(-1, 3, false, false)], "$S = ]-1 ; 3[$");
  ensemble(2, "f(x) ≥ 5", (x) => !inf(F1(x), Q(5)), [-3, 5], [I(-3, -2), I(4, 5)], "$S = [-3 ; -2] \\cup [4 ; 5]$");
  {
    const [F] = courbes(3);
    ensemble(3, "zéros en −2 et 3", (x) => egal(F(x), Q(0)), [-4, 5], [P(-2), P(3)]);
    signesDeLaCourbe(3, F);
  }
  const [F4] = courbes(4);
  accord(4, tableauVariationsDe(4, "schema"), F4, "le tableau de variations suit la courbe");
  {
    const [bleue, orange] = courbes(5);
    vaut("5. bleue 0 → 2", moins(bleue(Q(2)), bleue(Q(0))), 2);
    vaut("5. bleue 4 → 6", moins(bleue(Q(6)), bleue(Q(4))), 2);
    vaut("5. orange 0 → 2", moins(orange(Q(2)), orange(Q(0))), 1);
    vaut("5. orange 4 → 6", moins(orange(Q(6)), orange(Q(4))), 5);
    dit(5, "de $1$ à $3$, puis de $5$ à $7$", "de $1$ à $2$", "de $5$ à $10$");
  }
  signesDeLaCourbe(6, F1);
  {
    const g = (x) => moins(moins(fois(x, x), fois(Q(2), x)), Q(3));
    [-3, 0, 1, 2, 5].forEach((x) => vaut(`7. la formule suit la courbe en ${x}`, g(Q(x)), F1(Q(x))));
    eg(7, "9 + 6 - 3 = 12", "25 - 10 - 3 = 12");
    accord(7, tableauVariationsDe(7, "schema"), F1, "le tableau de variations suit la courbe");
  }
  ensemble(8, "f(x) = 2", (x) => egal(F4(x), Q(2)), [-2, 2], [P(-1), P(2)], "$S = \\{-1 ; 2\\}$");
  ensemble(8, "f(x) ≤ −2", (x) => !inf(Q(-2), F4(x)), [-2, 2], [P(-2), P(1)], "$S = \\{-2 ; 1\\}$");
  ensemble(8, "f(x) > 2", (x) => inf(Q(2), F4(x)), [-2, 2], [], "$S = \\varnothing$");

  /* ── ★★ ── */
  {
    const [T] = courbes(9);
    signesDeLaCourbe(9, T);
    ensemble(9, "T(x) < 0", (x) => inf(T(x), Q(0)), [0, 8], [I(0, 3, true, false), I(7, 8, false, true)], "$[0 ; 3[$ et dans $]7 ; 8]$");
    ensemble(9, "T(x) ≥ 3", (x) => !inf(T(x), Q(3)), [0, 8], [I(4, "5,5")], "$S = [4 ; 5{,}5]$");
    eg(9, "3 \\times 3 = 9");
    v.ok("9. heures : 3 × 3 = 9 h, 7 × 3 = 21 h, 4 × 3 = 12 h, 5,5 × 3 = 16,5 h", 3 * 3 === 9 && 7 * 3 === 21 && 4 * 3 === 12 && 5.5 * 3 === 16.5);
  }
  {
    const [B] = courbes(10);
    ensemble(10, "B(x) > 0", (x) => inf(Q(0), B(x)), [0, 6], [I(1, 5, false, false)], "$S = ]1 ; 5[$");
    ensemble(10, "B(x) ≥ 3", (x) => !inf(B(x), Q(3)), [0, 6], [I(2, 4)], "$S = [2 ; 4]$");
    ensemble(10, "B(x) < 0", (x) => inf(B(x), Q(0)), [0, 6], [I(0, 1, true, false), I(5, 6, false, true)], "négatif sur $[0 ; 1[$");
  }
  {
    const [Pop] = courbes(11);
    const m = /tableauVariations\(\[([^\]]*)\], \[([^\]]*)\]/.exec(f.blocs[10]);
    const annees = [...m[1].matchAll(/"(\d+)"/g)].map((x) => (Number(x[1]) - 1900) / 10);
    const valeurs = [...m[2].matchAll(/"([\d ]+)"/g)].map((x) => Q(Number(x[1].replace(/ /g, "")), 10000));
    accord(11, { bornes: annees.map((a) => Q(a)), valeurs }, Pop, "le tableau de variations (années, habitants) suit la courbe");
    vaut("11. sommet en 1960", Pop(Q(6)), 8);
    ensemble(11, "P(x) = 5 : trois solutions", (x) => egal(Pop(x), Q(5)), [0, 12], [P(3), P(9), P(12)]);
  }
  {
    const [A, B] = courbes(12);
    [[0, 2, 1], [1, 3, 2], [2, 4, 4], [3, 5, 8]].forEach(([x, a, b]) => {
      vaut(`12. A(${x})`, A(Q(x)), a);
      vaut(`12. B(${x})`, B(Q(x)), b);
    });
    ensemble(12, "B(x) ≥ A(x)", (x) => !inf(B(x), A(x)), [0, 3], [I(2, 3)]);
  }
  {
    const [S] = courbes(13);
    signesDeLaCourbe(13, S);
    ensemble(13, "déficit", (x) => inf(S(x), Q(0)), [0, 6], [I(2, 5, false, false)], "$]2 ; 5[$");
    v.ok("13. en 4, le solde monte mais reste négatif", inf(S(Q(4)), Q(0)) && inf(S(Q(3)), S(Q(4))));
  }
  {
    const [V] = courbes(14);
    const hausses = [1, 2, 3, 4].map((x) => moins(V(Q(x)), V(Q(x - 1))));
    [4, 3, 2, 1].forEach((h, i) => vaut(`14. ventes de l'année ${i + 1}`, hausses[i], h));
    const bloc = f.blocs[13];
    const barres = [...bloc.matchAll(/label: "année (\d)", value: (\d+)/g)].map((x) => Number(x[2]));
    v.ok("14. le diagramme redit les hausses", barres.join() === "4,3,2,1", barres.join());
    ensemble(14, "7 millions", (x) => egal(V(x), Q(7)), [0, 4], [P(2)]);
  }
  {
    const [C] = courbes(15);
    ensemble(15, "C(x) > 5", (x) => inf(Q(5), C(x)), [0, 8], [I(2, 4, false, false), I(6, "7,5", false, false)], "$S = ]2 ; 4[ \\cup ]6 ; 7{,}5[$");
    v.ok("15. heures : 2 → 6 h, 4 → 12 h, 6 → 18 h, 7,5 → 22,5 h", 2 * 3 === 6 && 4 * 3 === 12 && 6 * 3 === 18 && 7.5 * 3 === 22.5);
  }
  {
    const [H] = courbes(16);
    accord(16, tableauVariationsDe(16, "schema"), H, "le tableau de variations suit la courbe");
    ensemble(16, "h(t) ≥ 5", (x) => !inf(H(x), Q(5)), [0, 9], [I("1,5", "4,5"), I("7,5", 9)], "$S = [1{,}5 ; 4{,}5] \\cup [7{,}5 ; 9]$");
  }

  /* ── ★★★ ── */
  {
    const [L, E] = courbes(17);
    [[0, 1, 1], [1, 3, 2], [2, 5, 4], [3, 7, 8]].forEach(([x, l, e]) => {
      vaut(`17. L(${x})`, L(Q(x)), l);
      vaut(`17. E(${x})`, E(Q(x)), e);
    });
    ensemble(17, "E(x) ≥ 4", (x) => !inf(E(x), Q(4)), [0, 3], [I(2, 3)], "$S = [2 ; 3]$");
  }
  {
    const [B] = courbes(18);
    accord(18, tableauVariationsDe(18, "schema"), B, "le tableau de variations suit la courbe");
    signesDeLaCourbe(18, B);
    ensemble(18, "B(x) ≥ 1,5", (x) => !inf(B(x), D("1,5")), [0, 8], [I(3, 5)], "$S = [3 ; 5]$");
    vaut("18. maximum en 4", B(Q(4)), 2);
  }
  {
    const [Pr] = courbes(19);
    ensemble(19, "P(x) ≥ 5", (x) => !inf(Pr(x), Q(5)), [0, 10], [P(3), I(5, 7)], "$S = \\{3\\} \\cup [5 ; 7]$");
    vaut("19. maximum en 1960", Pr(Q(6)), 7);
  }
  {
    const [T] = courbes(20);
    ensemble(20, "T décroît", (x) => inf(T(plus(x, Q(1, 1000000))), T(x)), [0, 9], [I(0, 2, true, false), I(6, 8, true, false)]);
    ensemble(20, "T(x) ≥ 8", (x) => !inf(T(x), Q(8)), [0, 10], [P(0), I(3, 7)], "$S = \\{0\\} \\cup [3 ; 7]$");
    vaut("20. hausse 2004 → 2008", moins(T(Q(4)), T(Q(2))), 4);
    vaut("20. hausse 2016 → 2020", moins(T(Q(10)), T(Q(8))), 1);
    vaut("20. palier 2008 → 2012", moins(T(Q(6)), T(Q(4))), 0);
    eg(20, "2000 + 3 \\times 2 = 2006");
  }
  controlerTout();
} catch (e) {
  v.ok("le recalcul s'exécute", false, String(e?.stack ?? e));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Résolution graphique (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
