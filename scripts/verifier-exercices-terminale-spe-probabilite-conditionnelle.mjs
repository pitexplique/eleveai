// Recalcul indépendant de la feuille « Probabilités conditionnelles » de
// terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-probabilite-conditionnelle.tsx.
//
// ⭐ Les arbres sont RELUS dans le source : chaque nœud a des branches de somme
// 1, et les probabilités des chemins sont recalculées en multipliant le long
// de l'arbre (fractions exactes quand l'arbre en porte). Les inversions de
// conditionnement sont refaites par DÉNOMBREMENT sur une population entière
// (10⁶ personnes, sans arrondi), les deux lancers et l'urne de Pólya par
// ÉNUMÉRATION des issues, les suites de probabilités en itérant l'arbre, et le
// programme Python est EXÉCUTÉ.
// Usage : node scripts/verifier-exercices-terminale-spe-probabilite-conditionnelle.mjs

import { feuilleTerminale, executerPython, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-probabilite-conditionnelle.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "probabilite_conditionnelle", dessinsEnPlus: ["arbre3"] });
const { dit, enonceDit, verif, vrai, arrondi, pointsSur, termes, dessin, tableauDe } = F;

/* ── Les arbres ─────────────────────────────────────────────────────────── */
/** « 0,02 » → 0.02 ; « 5/8 » → 0.625 ; « ? », « x » → NaN. */
const nb = (s) => {
  const t = String(s).replace(",", ".");
  const f = /^(\d+)\/(\d+)$/.exec(t);
  return f ? Number(f[1]) / Number(f[2]) : /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
};
/** Les feuilles d'un arbre : { chemin: ["M", "T"], p: produit }. */
const feuilles = (noeuds, chemin = [], p = 1) =>
  noeuds.flatMap((n) => {
    const q = p * nb(n.proba);
    const ch = [...chemin, n.label.split(" → ")[0]];
    return n.enfants?.length ? feuilles(n.enfants, ch, q) : [{ chemin: ch, p: q, label: n.label }];
  });
/** Chaque nœud : branches de somme 1 (quand toutes sont connues). */
const sommes = (k, noeuds, role) => {
  const fautes = [];
  const tour = (ns) => {
    const ps = ns.map((n) => nb(n.proba));
    if (ps.every((x) => !Number.isNaN(x)) && Math.abs(ps.reduce((s, x) => s + x, 0) - 1) > 1e-12 && ns.length > 1) fautes.push(ns.map((n) => n.proba).join(" + "));
    ns.forEach((n) => n.enfants && tour(n.enfants));
  };
  tour(noeuds);
  vrai(`${k}. arbre${role ? " (" + role + ")" : ""} : branches de somme 1`, fautes.length === 0, fautes.join(" ; "));
};
/** L'arbre de l'exercice k : le canvas du coach (2 niveaux) ou l aide locale arbre3 (3 niveaux). */
const arbreDe = (k, role) => {
  const nom = F.dessins("arbre3", k).length ? "arbre3" : "arbre";
  const a = dessin(nom, k, role)[0];
  sommes(k, a, role);
  return a;
};
/** Les étiquettes « X → 0,019 » d'une feuille : la probabilité du chemin, relue et recalculée. */
const etiquettesDeChemins = (k, a) => {
  for (const f of feuilles(a).filter((f) => f.label.includes(" → "))) {
    const lu = nb(f.label.split(" → ")[1]);
    verif(`${k}. chemin ${f.chemin.join("-")} = ${lu}`, f.p, lu, 1e-12);
  }
};
const P = (a, test) => feuilles(a).filter((f) => test(f.chemin)).reduce((s, f) => s + f.p, 0);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const a = arbreDe(1, "figure");
  vrai("1. trois usines, trois « ? » de défauts et un d'usine", JSON.stringify(a.map((n) => n.proba)) === '["0,5","0,3","?"]' && a.every((n) => n.enfants[1].proba === "?"));
  const complet = a.map((n, i) => ({ ...n, proba: i === 2 ? "0,2" : n.proba, enfants: [n.enfants[0], { ...n.enfants[1], proba: String(1 - nb(n.enfants[0].proba)) }] }));
  verif("1. P(U3) = 1 − 0,5 − 0,3", 1 - 0.5 - 0.3, 0.2, 1e-12);
  verif("1. P(U3 ∩ D̄) = 0,19", P(complet, (c) => c[0] === "U3" && c[1] === "D̄"), 0.19, 1e-12);
  dit(1, "$P_{U_1}(\\overline{D}) = 0{,}98$, $P_{U_2}(\\overline{D}) = 0{,}97$ et $P_{U_3}(\\overline{D}) = 0{,}95$");
  dit(1, "= 0{,}2 \\times 0{,}95 = 0{,}19$");
}
{
  const t = dessin("tableauProba", 2, "figure");
  const [, l1, l2, l3] = [t[0], ...t[1]];
  const v = (l) => l.slice(1).map(nb);
  // Les marges : chaque ligne et chaque colonne s'additionnent.
  vrai("2. tableau : lignes additives", [l1, l2, l3].every((l) => Math.abs(v(l)[0] + v(l)[1] - v(l)[2]) < 1e-12));
  vrai("2. tableau : colonnes additives", [0, 1, 2].every((j) => Math.abs(v(l1)[j] + v(l2)[j] - v(l3)[j]) < 1e-12));
  // Par effectifs : 1000 abonnés.
  const CM = 1000 * v(l1)[0], C = 1000 * v(l1)[2], M = 1000 * v(l3)[0];
  verif("2. P_C(M) = 100/400", CM / C, 0.25, 1e-12);
  verif("2. P_M(C) = 100/160", CM / M, 0.625, 1e-12);
  dit(2, "= \\dfrac{0{,}1}{0{,}4} = 0{,}25$");
  dit(2, "= \\dfrac{0{,}1}{0{,}16} = 0{,}625$");
}
{
  const a = arbreDe(3);
  const rrr = P(a, (c) => c.join() === "R1,R2,R3");
  // Énumération : toutes les suites ordonnées de 3 boules distinctes parmi 8 (5 rouges).
  let total = 0, bons = 0, deux = 0;
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) for (let k = 0; k < 8; k++) {
    if (i === j || j === k || i === k) continue;
    total++;
    if (i < 5 && j < 5 && k < 5) bons++;
    if (i < 5 && j < 5) deux++;
  }
  verif("3. P(RRR) par énumération = 5/28", bons / total, 5 / 28, 1e-12);
  verif("3. arbre : P(RRR)", rrr, 5 / 28, 1e-12);
  verif("3. P(R1 ∩ R2) = 5/14", deux / total, 5 / 14, 1e-12);
  arrondi("3. 5/28 ≈ 0,179", 0.179, 5 / 28, 0.001);
  dit(3, "= \\dfrac{60}{336} = \\dfrac{5}{28} \\approx 0{,}179$");
  dit(3, "= \\dfrac{20}{56} = \\dfrac{5}{14}$");
}
{
  const a = arbreDe(4);
  etiquettesDeChemins(4, a);
  verif("4. P(R) = 0,083", P(a, (c) => c[1] === "R"), 0.083, 1e-12);
  enonceDit(4, "$45$ % des colis viennent de $F_1$, $35$ % de $F_2$ et $20$ % de $F_3$");
  dit(4, "Donc $P(R) = 0{,}018 + 0{,}035 + 0{,}03 = 0{,}083$");
}
{
  const a = arbreDe(5, "figure");
  const pA = nb(a[0].proba), pAB = pA * nb(a[0].enfants[0].proba);
  const pB = 0.3;
  verif("5. P(A ∩ B) = 0,18", pAB, 0.18, 1e-12);
  const x = dichotomie((t) => pAB + (1 - pA) * t - pB, 0, 1); // P_Ā(B) inconnue, par l'équation
  verif("5. P_Ā(B) = 0,15", x, 0.15, 1e-9);
  verif("5. P_B(A) = 0,6", pAB / pB, 0.6, 1e-12);
  enonceDit(5, "$P(A) = 0{,}2$, $P_A(B) = 0{,}9$ et $P(B) = 0{,}3$");
  dit(5, "= \\dfrac{0{,}12}{0{,}8} = 0{,}15$");
  dit(5, "= \\dfrac{0{,}18}{0{,}3} = 0{,}6$");
}
{
  const a = arbreDe(6);
  const pV = P(a, (c) => c[1] === "V");
  verif("6. P(V) = 0,12", pV, 0.12, 1e-12);
  verif("6. P_V(A) = 1", P(a, (c) => c.join() === "A,V") / pV, 1, 1e-12);
  dit(6, "$P(V) = 0{,}4 \\times 0{,}3 + 0{,}6 \\times 0 = 0{,}12$");
}
{
  const a = arbreDe(7);
  const pV = P(a, (c) => c[1] === "V");
  verif("7. P(V) = 0,25", pV, 0.25, 1e-12);
  verif("7. P(N ∩ V) = P(N) P(V)", P(a, (c) => c.join() === "N,V"), nb(a[0].proba) * pV, 1e-12);
  dit(7, "$= 0{,}15 + 0{,}1 = 0{,}25$");
}
{
  const a = dessin("arbre", 8, "figure")[0];
  vrai("8. l'arbre porte x et 1 − x", a[0].proba === "x" && a[1].proba === "1 − x");
  const x = dichotomie((t) => t * nb(a[0].enfants[0].proba) + (1 - t) * nb(a[1].enfants[0].proba) - 0.5, 0, 1);
  verif("8. x = 0,4 (dichotomie)", x, 0.4, 1e-9);
  dit(8, "donc $x = 0{,}4$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
/** Une population de N personnes, compte exact : [effectif de la branche, effectif de la sous-branche]. */
const N = 1e6;
{
  const a = arbreDe(9);
  etiquettesDeChemins(9, a);
  const malades = N * 0.02, mPos = malades * 0.95, sPos = (N - malades) * 0.1, sNeg = (N - malades) * 0.9, mNeg = malades - mPos;
  verif("9. P(T) = 0,117", (mPos + sPos) / N, 0.117, 1e-12);
  arrondi("9. P_T(M) ≈ 0,162", 0.162, mPos / (mPos + sPos), 0.001);
  arrondi("9. P_T̄(M̄) ≈ 0,9989", 0.9989, sNeg / (sNeg + mNeg), 0.0001);
  verif("9. sur 10 000 : 190 et 980", mPos / 100, 190, 1e-9);
  verif("9. sur 10 000 : 980 sains positifs", sPos / 100, 980, 1e-9);
  dit(9, "= \\dfrac{0{,}019}{0{,}117} \\approx 0{,}162$");
  dit(9, "= \\dfrac{0{,}882}{0{,}883} \\approx 0{,}9989$");
  dit(9, "$190$ malades sont positifs, mais aussi $980$ personnes saines");
}
{
  const a = arbreDe(10);
  etiquettesDeChemins(10, a);
  const pJ = P(a, (c) => c[1] === "J");
  verif("10. P(J) = 0,083", pJ, 0.083, 1e-12);
  arrondi("10. P_J(D̄) ≈ 0,458", 0.458, P(a, (c) => c.join() === "D̄,J") / pJ, 0.001);
  arrondi("10. P_J̄(D) ≈ 0,0055", 0.0055, P(a, (c) => c.join() === "D,J̄") / (1 - pJ), 0.0001);
  dit(10, "= \\dfrac{0{,}038}{0{,}083} \\approx 0{,}458$");
  dit(10, "= \\dfrac{0{,}005}{0{,}917} \\approx 0{,}0055$");
}
{
  const a = arbreDe(11);
  // Énumération : pièce, lancer 1, lancer 2.
  let p1 = 0, p12 = 0;
  for (const [piece, pp, pile] of [["E", 0.5, 0.5], ["T", 0.5, 0.8]]) {
    void piece;
    p1 += pp * pile;
    p12 += pp * pile * pile;
  }
  verif("11. P(P1) = 0,65", p1, 0.65, 1e-12);
  verif("11. P(P1 ∩ P2) = 0,445", p12, 0.445, 1e-12);
  verif("11. arbre : P(P1 ∩ P2)", P(a, (c) => c[1] === "P1" && c[2] === "P2"), 0.445, 1e-12);
  verif("11. 0,65² = 0,4225", 0.65 ** 2, 0.4225, 1e-12);
  arrondi("11. P_P1(P2) ≈ 0,685", 0.685, p12 / p1, 0.001);
  dit(11, "$P(P_1 \\cap P_2) = 0{,}125 + 0{,}32 = 0{,}445$");
  dit(11, "\\approx 0{,}685 > 0{,}65$");
}
{
  // L'arbre du jour n au jour n + 1, itéré.
  const p = [NaN, 1];
  while (p.length < 12) { const q = p[p.length - 1]; p.push(q * 0.7 + (1 - q) * 0.4); }
  pointsSur("12. p(n) × 10", termes(12, "schema"), (n) => 10 * p[n]);
  arrondi("12. horizontale ≈ 40/7", dessin("repere", 12, "schema")[3], 40 / 7, 0.001);
  verif("12. p2 = 0,7", p[2], 0.7, 1e-12);
  verif("12. p3 = 0,61", p[3], 0.61, 1e-12);
  arrondi("12. p4 = 0,583", 0.583, p[4], 0.001);
  arrondi("12. p5 = 0,5749", 0.5749, p[5], 0.0001);
  arrondi("12. p6 = 0,57247", 0.57247, p[6], 0.00001);
  arrondi("12. p7 ≈ 0,57174", 0.57174, p[7], 0.00001);
  const premier = p.findIndex((x, n) => n >= 1 && x - 4 / 7 < 0.001);
  vrai(`12. premier rang à moins de 0,001 : ${premier}`, premier === 7);
  const lignes = dessin("programme", 12, "figure")[0];
  const sortie = executerPython(lignes, "print(rang())");
  if (sortie === null) console.log("  (Python absent : rang() non exécuté)");
  else vrai(`12. Python : rang() = ${sortie}`, sortie === "7");
  dit(12, "La fonction renvoie $7$");
  dit(12, "$p_3 = 0{,}3 \\times 0{,}7 + 0{,}4 = 0{,}61$");
  dit(12, "$0{,}7$ ; $0{,}61$ ; $0{,}583$ ; $0{,}5749$ ; $0{,}57247$ ; puis $p_7 \\approx 0{,}57174$");
}
{
  const a = arbreDe(13);
  etiquettesDeChemins(13, a);
  const pG = P(a, (c) => c[1] === "G");
  verif("13. P(G) = 0,134", pG, 0.134, 1e-12);
  arrondi("13. P_G(S) ≈ 0,896", 0.896, 0.12 / pG, 0.001);
  const f = (x) => (0.4 * x) / (0.4 * x + 0.02 * (1 - x)); // par l'arbre, pas par la formule simplifiée
  vrai("13. formule 0,4x/(0,38x + 0,02)", [0.1, 0.3, 0.7].every((x) => Math.abs(f(x) - (0.4 * x) / (0.38 * x + 0.02)) < 1e-12));
  const seuil = dichotomie((x) => f(x) - 0.99, 0.01, 1);
  arrondi("13. seuil x ≈ 0,832", 0.832, seuil, 0.001);
  vrai("13. f croissante (au-dessus du seuil, f ≥ 0,99)", f(0.9) > 0.99 && f(0.8) < 0.99);
  dit(13, "\\approx 0{,}832$");
  dit(13, "$0{,}0238x \\geqslant 0{,}0198$");
}
{
  const a = arbreDe(14);
  const t1 = P(a, (c) => c[1] === "T1");
  verif("14. P(T1) = 0,0594", t1, 0.0594, 1e-12);
  verif("14. P_T1(M) = 1/6", P(a, (c) => c[0] === "M" && c[1] === "T1") / t1, 1 / 6, 1e-12);
  const mm = P(a, (c) => c.join() === "M,T1,T2"), ss = P(a, (c) => c.join() === "M̄,T1,T2");
  verif("14. M ∩ T1 ∩ T2 = 0,009801", mm, 0.009801, 1e-12);
  verif("14. M̄ ∩ T1 ∩ T2 = 0,002475", ss, 0.002475, 1e-12);
  arrondi("14. ≈ 0,798", 0.798, mm / (mm + ss), 0.001);
  dit(14, "\\approx 0{,}798$");
  dit(14, "= 0{,}009801 + 0{,}002475 = 0{,}012276$");
}
{
  const parts = [0.5, 0.35, 0.15], risques = [0.01, 0.04, 0.1];
  const d = parts.map((p, i) => p * risques[i]);
  const pD = d.reduce((s, x) => s + x, 0);
  verif("15. P(D) = 0,034", pD, 0.034, 1e-12);
  const barres = dessin("diagramme", 15)[1];
  barres.forEach((b, i) => vrai(`15. barre ${b.label} = ${b.value} % (arrondi de ${((100 * d[i]) / pD).toFixed(2)})`, b.value === Math.round((100 * d[i]) / pD)));
  vrai("15. la barre en couleur est la plus haute", dessin("diagramme", 15)[2] === 2);
  arrondi("15. P_D(A) ≈ 0,147", 0.147, d[0] / pD, 0.001);
  arrondi("15. P_D(B) ≈ 0,412", 0.412, d[1] / pD, 0.001);
  arrondi("15. P_D(C) ≈ 0,441", 0.441, d[2] / pD, 0.001);
  dit(15, "\\approx 0{,}147$ ; $P_D(B)");
  dit(15, "\\approx 0{,}441$");
}
{
  const a = arbreDe(16);
  etiquettesDeChemins(16, a);
  // Énumération de l'urne de Pólya : 5 boules numérotées, puis 6.
  let r2 = 0, r1r2 = 0;
  for (let i = 0; i < 5; i++) {
    const rouge1 = i < 2;
    const rouges = rouge1 ? 3 : 2;
    for (let j = 0; j < 6; j++) {
      const p = (1 / 5) * (1 / 6);
      if (j < rouges) { r2 += p; if (rouge1) r1r2 += p; }
    }
  }
  verif("16. P(R2) = 2/5", r2, 2 / 5, 1e-12);
  verif("16. P_R2(R1) = 1/2", r1r2 / r2, 1 / 2, 1e-12);
  verif("16. arbre : P(R2)", P(a, (c) => c[1] === "R2"), 2 / 5, 1e-12);
  dit(16, "= \\dfrac{1}{5} + \\dfrac{1}{5} = \\dfrac{2}{5}$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const a = arbreDe(17);
  etiquettesDeChemins(17, a);
  const pG = P(a, (c) => c[1] === "G");
  verif("17. P(G) = 0,182", pG, 0.182, 1e-12);
  arrondi("17. P_G(V) ≈ 0,176", 0.176, 0.032 / pG, 0.001);
  const g = (x) => (x * 0.08) / (x * 0.08 + (1 - x) * 0.25);
  const t = tableauDe(17);
  t.en.forEach((x, i) => arrondi(`17. tableau : x = ${x}`, t.nombres[i], g(x), 0.001));
  arrondi("17. x ≈ 0,758 pour la moitié", 0.758, dichotomie((x) => g(x) - 0.5, 0, 1), 0.001);
  vrai("17. risque divisé par plus de 3", 0.25 / 0.08 > 3);
  dit(17, "\\approx 0{,}758$");
  dit(17, "= \\dfrac{0{,}032}{0{,}182} \\approx 0{,}176$");
}
{
  const a = arbreDe(18);
  // Énumération : dé, puis deux boules ordonnées distinctes de l'urne choisie.
  let rr = 0, rrU1 = 0, r1 = 0, r2 = 0;
  for (let face = 1; face <= 6; face++) {
    const [R, V] = face === 6 ? [3, 1] : [2, 3];
    const n = R + V;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const p = (1 / 6) / (n * (n - 1));
      if (i < R) r1 += p;
      if (j < R) r2 += p;
      if (i < R && j < R) { rr += p; if (face === 6) rrU1 += p; }
    }
  }
  verif("18. P(RR) = 1/6", rr, 1 / 6, 1e-12);
  verif("18. arbre : P(RR)", P(a, (c) => c[1] === "R1" && c[2] === "R2"), 1 / 6, 1e-12);
  verif("18. P_RR(U1) = 1/2", rrU1 / rr, 1 / 2, 1e-12);
  verif("18. P(R1) = 11/24", r1, 11 / 24, 1e-12);
  verif("18. P(R2) = P(R1) (admis dans l'énoncé)", r2, r1, 1e-12);
  arrondi("18. (11/24)² ≈ 0,210", 0.21, r1 * r2, 0.001);
  dit(18, "= \\dfrac{1}{12} + \\dfrac{1}{12} = \\dfrac{1}{6}$");
  dit(18, "= \\dfrac{1}{8} + \\dfrac{1}{3} = \\dfrac{11}{24}$");
}
{
  const a = arbreDe(19, "schema");
  verif("19. P(J) = 0,7", P(a, (c) => c[1] === "J"), 0.7, 1e-12);
  const h = (k) => 0.6 / (0.6 + 0.4 / k);
  arrondi("19. 6/7 ≈ 0,857", 0.857, h(4), 0.001);
  const t = tableauDe(19);
  t.en.forEach((k, i) => arrondi(`19. tableau : k = ${k}`, t.nombres[i], h(k), 0.001));
  let k = 1;
  while (h(k) < 0.95) k++;
  vrai(`19. premier k avec P ≥ 0,95 : ${k}`, k === 13);
  arrondi("19. 0,38/0,03 ≈ 12,7", 12.7, 0.38 / 0.03, 0.1);
  dit(19, "il faut au moins $13$ réponses");
}
{
  // Chaîne de relais simulée EXACTEMENT : loi du bit après n relais, par l'arbre à chaque relais.
  const p = [1];
  while (p.length < 12) { const q = p[p.length - 1]; p.push(q * 0.9 + (1 - q) * 0.1); }
  pointsSur("20. p(n) × 10", termes(20), (n) => 10 * p[n]);
  vrai("20. horizontale 5", dessin("repere", 20)[3] === 5);
  vrai("20. p(n) = 0,5 + 0,5 × 0,8^n", p.every((x, n) => Math.abs(x - (0.5 + 0.5 * 0.8 ** n)) < 1e-12));
  const dernier = p.reduce((m, x, n) => (x >= 0.75 ? n : m), -1);
  vrai(`20. au plus ${dernier} relais`, dernier === 3);
  verif("20. 0,8³ = 0,512", 0.8 ** 3, 0.512, 1e-12);
  verif("20. 0,8⁴ = 0,4096", 0.8 ** 4, 0.4096, 1e-12);
  verif("20. p2 = 0,82", p[2], 0.82, 1e-12);
  const recu1 = 0.5 * p[2] + 0.5 * (1 - p[2]);
  verif("20. P(envoyé 1 | reçu 1) = 0,82", (0.5 * p[2]) / recu1, 0.82, 1e-12);
  dit(20, "au plus $3$ relais");
  dit(20, "= 0{,}82$");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce qu'on voit (« Sur le dessin » ou « Sur le tableau » dans les 20)", F.feuille.corrections.every((t) => /Sur le (dessin|tableau)/.test(t)));
F.fin();
