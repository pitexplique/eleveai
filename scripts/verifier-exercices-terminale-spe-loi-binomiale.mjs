// Recalcul indépendant de la feuille « Loi binomiale » de terminale spé
// (29/09/2026) : lib/fiches-exercices/maths-terminale-loi-binomiale.tsx.
//
// ⭐ Toutes les probabilités sont EXACTES (`binom`, `binomCumul`, coefficients
// en BigInt) ; chaque barre dessinée est relue et comparée à 100 × P(X = k)
// arrondi ; les espérances et variances sont recalculées en SOMMANT sur la loi
// (Σ k P(X = k)), pas par np ; l'arbre de Bernoulli et la liste des chemins
// sont recomptés par énumération ; les seuils (n, k, billets, éoliennes) sont
// cherchés pas à pas ; le maximum de 10p(1 − p)⁹ par balayage et par la dérivée
// numérique ; le programme Python est EXÉCUTÉ.
// Usage : node scripts/verifier-exercices-terminale-spe-loi-binomiale.mjs

import { feuilleTerminale, executerPython, binom, binomCumul, binome, derivee } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-loi-binomiale.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "loi_binomiale", dessinsEnPlus: ["arbre3"] });
const { dit, enonceDit, verif, vrai, arrondi, dessin, tableauDe, courbes, termes } = F;

/** La loi entière, en tableau : loi(n, p)[k] = P(X = k). */
const loi = (n, p) => Array.from({ length: n + 1 }, (_, k) => binom(n, k, p));
/** Espérance et variance en SOMMANT sur la loi. */
const moments = (n, p, g = (k) => k) => {
  const L = loi(n, p);
  const E = L.reduce((s, q, k) => s + q * g(k), 0);
  return { E, V: L.reduce((s, q, k) => s + q * (g(k) - E) ** 2, 0) };
};
/** Les barres du diagramme de l'exercice k : chaque hauteur = 100 × P(X = valeur), arrondie à l'unité. */
const barres = (k, n, p, couleurAttendue) => {
  const [, data, surligne] = dessin("diagramme", k);
  const fautes = data.filter((b) => b.value !== Math.round(100 * binom(n, Number(b.label), p)));
  vrai(`${k}. ${data.length} barres de B(${n} ; ${p}) en % arrondis`, fautes.length === 0, fautes.map((b) => `${b.label} : ${b.value} au lieu de ${(100 * binom(n, Number(b.label), p)).toFixed(2)}`).join(" ; "));
  if (couleurAttendue !== undefined) vrai(`${k}. barre en couleur : ${data[surligne]?.label}`, data[surligne]?.label === String(couleurAttendue));
  return data;
};
const nb = (s) => {
  const t = String(s).replace(",", ".");
  const f = /^(\d+)\/(\d+)$/.exec(t);
  return f ? Number(f[1]) / Number(f[2]) : Number(t);
};
const feuilles = (noeuds, chemin = [], p = 1) =>
  noeuds.flatMap((n) => {
    const q = p * nb(n.proba);
    const ch = [...chemin, n.label.split(" → ")[0]];
    return n.enfants?.length ? feuilles(n.enfants, ch, q) : [{ chemin: ch, p: q, label: n.label }];
  });
const sommesDe1 = (k, noeuds) => {
  let ok = true;
  const tour = (ns) => {
    if (ns.length > 1 && Math.abs(ns.reduce((s, n) => s + nb(n.proba), 0) - 1) > 1e-12) ok = false;
    ns.forEach((n) => n.enfants && tour(n.enfants));
  };
  tour(noeuds);
  vrai(`${k}. arbre : branches de somme 1`, ok);
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const a = dessin("arbre3", 1, "figure")[0];
  sommesDe1(1, a);
  const fs_ = feuilles(a);
  vrai("1. huit feuilles, nommées par leur chemin", fs_.length === 8 && fs_.every((f) => f.label === f.chemin.slice(0, 2).join("") + f.label.slice(2) && f.label.length === 3 && f.label.startsWith(f.chemin[0] + f.chemin[1])));
  vrai("1. chaque feuille : S porte 0,2, E porte 0,8", fs_.every((f) => Math.abs(f.p - [...f.label].reduce((s, c) => s * (c === "S" ? 0.2 : 0.8), 1)) < 1e-12));
  const deux = fs_.filter((f) => [...f.label].filter((c) => c === "S").length === 2);
  vrai(`1. ${deux.length} chemins à deux succès : ${deux.map((f) => f.label).join(", ")}`, deux.length === 3 && deux.map((f) => f.label).join() === "SSE,SES,ESS");
  verif("1. chacun 0,032", deux[0].p, 0.032, 1e-12);
  verif("1. P(X = 2) = 0,096", binom(3, 2, 0.2), 0.096, 1e-12);
  verif("1. P(X = 0) = 0,512", binom(3, 0, 0.2), 0.512, 1e-12);
  dit(1, "$P(X = 2) = 3 \\times 0{,}032 = 0{,}096$");
  dit(1, "$P(X = 0) = 0{,}8^3 = 0{,}512$");
}
{
  const a = dessin("arbre", 2)[0];
  sommesDe1(2, a);
  // Énumération : 32 cartes dont 4 as, deux tirages ordonnés sans remise.
  let as1 = 0, as2sachantAs = 0, as2sachantAutre = 0, autre1 = 0;
  for (let i = 0; i < 32; i++) for (let j = 0; j < 32; j++) {
    if (i === j) continue;
    if (i < 4) { as1++; if (j < 4) as2sachantAs++; } else { autre1++; if (j < 4) as2sachantAutre++; }
  }
  verif("2. P_As(As) = 3/31", as2sachantAs / as1, nb(a[0].enfants[0].proba), 1e-12);
  verif("2. P_Autre(As) = 4/31", as2sachantAutre / autre1, nb(a[1].enfants[0].proba), 1e-12);
  dit(2, "$X \\sim \\mathcal{B}(5 ; 0{,}3)$");
  dit(2, "$X \\sim \\mathcal{B}\\left(10 ; \\dfrac{1}{6}\\right)$");
}
{
  const data = barres(3, 8, 0.3, 2);
  vrai("3. la barre en couleur est la plus haute", Math.max(...data.map((b) => b.value)) === data[2].value);
  vrai("3. C(8, 2) = 28", binome(8, 2) === 28);
  arrondi("3. P(X = 2) ≈ 0,2965", 0.2965, binom(8, 2, 0.3), 0.0001);
  arrondi("3. P(X = 0) ≈ 0,0576", 0.0576, binom(8, 0, 0.3), 0.0001);
  verif("3. E(X) = 2,4", moments(8, 0.3).E, 2.4, 1e-12);
  dit(3, "\\approx 0{,}2965$");
  dit(3, "\\approx 0{,}0576$");
}
{
  const t = tableauDe(4, "figure");
  t.en.forEach((k, i) => vrai(`4. chemins vers ${k} piles = C(5, ${k})`, t.nombres[i] === binome(5, k)));
  vrai("4. 32 chemins en tout", t.nombres.reduce((s, x) => s + x, 0) === 32);
  verif("4. P(X = 3) = 0,3125", binom(5, 3, 0.5), 0.3125, 1e-12);
  verif("4. P(X ≥ 4) = 0,1875", 1 - binomCumul(5, 3, 0.5), 0.1875, 1e-12);
  dit(4, "= \\dfrac{10}{32} = 0{,}3125$");
  dit(4, "= \\dfrac{6}{32} = 0{,}1875$");
}
{
  barres(5, 50, 0.2, 10);
  const { E, V } = moments(50, 0.2);
  verif("5. E = 10", E, 10, 1e-9);
  verif("5. V = 8", V, 8, 1e-9);
  arrondi("5. σ ≈ 2,83", 2.83, Math.sqrt(V), 0.01);
  const entre = binomCumul(50, 13, 0.2) - binomCumul(50, 6, 0.2);
  arrondi("5. P(7 ≤ X ≤ 13) ≈ 79 %", 79, 100 * entre, 1);
  dit(5, "$\\sigma(X) = \\sqrt{8} \\approx 2{,}83$");
  dit(5, "environ $79$ %");
}
{
  barres(6, 10, 0.05, 0);
  arrondi("6. 1 − 0,95^10 ≈ 0,401", 0.401, 1 - binom(10, 0, 0.05), 0.001);
  arrondi("6. la barre de 0 ≈ 60 %", 60, 100 * binom(10, 0, 0.05), 1);
  dit(6, "\\approx 0{,}401$");
}
{
  barres(7, 6, 0.4, 2);
  const L = loi(6, 0.4);
  verif("7. P(0) = 0,046656", L[0], 0.046656, 1e-12);
  verif("7. P(1) = 0,186624", L[1], 0.186624, 1e-12);
  verif("7. P(2) = 0,31104", L[2], 0.31104, 1e-12);
  verif("7. P(X ≤ 2) = 0,54432", binomCumul(6, 2, 0.4), 0.54432, 1e-12);
  verif("7. P(X > 2) = 0,45568", 1 - binomCumul(6, 2, 0.4), 0.45568, 1e-12);
  verif("7. P(X ≤ 4) = 0,95904", binomCumul(6, 4, 0.4), 0.95904, 1e-12);
  verif("7. P(X ≤ 1) = 0,23328", binomCumul(6, 1, 0.4), 0.23328, 1e-12);
  verif("7. P(2 ≤ X ≤ 4) = 0,72576 (somme directe)", L[2] + L[3] + L[4], 0.72576, 1e-12);
  dit(7, "on obtient $0{,}72576$");
  dit(7, "$0{,}046656 + 0{,}186624 + 0{,}31104 = 0{,}54432$");
}
{
  // Recherche de (n, p) parmi n ≤ 100 et p au centième.
  const sol = [];
  for (let n = 1; n <= 100; n++) for (let c = 1; c < 100; c++) {
    const { E, V } = { E: n * c / 100, V: (n * c / 100) * (1 - c / 100) };
    if (Math.abs(E - 6) < 1e-9 && Math.abs(V - 4.2) < 1e-9) sol.push([n, c / 100]);
  }
  vrai(`8. seule solution (n ; p) = ${JSON.stringify(sol)}`, sol.length === 1 && sol[0][0] === 20 && sol[0][1] === 0.3);
  const m = moments(20, 0.3);
  verif("8. par la loi : E = 6", m.E, 6, 1e-9);
  verif("8. par la loi : V = 4,2", m.V, 4.2, 1e-9);
  const data = barres(8, 20, 0.3, 6);
  vrai("8. la barre de 6 est la plus haute", Math.max(...data.map((b) => b.value)) === data[6].value);
  dit(8, "$X \\sim \\mathcal{B}(20 ; 0{,}3)$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const [entete, lignes] = dessin("trace", 9);
  vrai("9. deux colonnes", entete.length === 2);
  const mots = lignes.slice(0, -1).map((l) => l[0]);
  const attendus = [];
  for (let m = 0; m < 16; m++) {
    const mot = [3, 2, 1, 0].map((b) => ((m >> b) & 1 ? "S" : "E")).join("");
    if ([...mot].filter((c) => c === "S").length === 2) attendus.push(mot);
  }
  vrai(`9. les ${attendus.length} chemins à deux succès, sans oubli ni doublon`, mots.length === attendus.length && new Set(mots).size === mots.length && mots.every((m) => attendus.includes(m)));
  vrai("9. C(4, 2) = 6", binome(4, 2) === 6 && lignes.at(-1)[0] === "6 chemins");
  vrai("9. chaque chemin : p²q²", lignes.slice(0, -1).every((l) => l[1] === "p²q²"));
  verif("9. P(X = 2) = 0,375", binom(4, 2, 0.5), 0.375, 1e-12);
  // La formule générale contre l'énumération des 2^n chemins, pour n ≤ 8.
  let ok = true;
  for (let n = 1; n <= 8; n++) for (let k = 0; k <= n; k++) {
    let s = 0;
    for (let m = 0; m < 2 ** n; m++) {
      let succes = 0, pr = 1;
      for (let b = 0; b < n; b++) { if ((m >> b) & 1) { succes++; pr *= 0.37; } else pr *= 0.63; }
      if (succes === k) s += pr;
    }
    if (Math.abs(s - binom(n, k, 0.37)) > 1e-12) ok = false;
  }
  vrai("9. formule = somme des chemins (n ≤ 8, p = 0,37)", ok);
  dit(9, "= \\dfrac{6}{16} = 0{,}375$");
}
{
  barres(10, 12, 0.8, 10);
  arrondi("10. P(X = 12) ≈ 0,0687", 0.0687, binom(12, 12, 0.8), 0.0001);
  arrondi("10. P(X = 10) ≈ 0,2835", 0.2835, binom(12, 10, 0.8), 0.0001);
  arrondi("10. P(X = 11) ≈ 0,2062", 0.2062, binom(12, 11, 0.8), 0.0001);
  const ex = 1 - binomCumul(12, 9, 0.8);
  arrondi("10. P(X ≥ 10) ≈ 0,558", 0.558, ex, 0.001);
  arrondi("10. exact ≈ 0,5583", 0.5583, ex, 0.0001);
  verif("10. somme des arrondis = 0,5584", 0.2835 + 0.2062 + 0.0687, 0.5584, 1e-9);
  vrai("10. C(12, 10) = 66", binome(12, 10) === 66);
  verif("10. E = 9,6", moments(12, 0.8).E, 9.6, 1e-9);
  dit(10, "\\approx 0{,}558$");
  dit(10, "$E(X) = 12 \\times 0{,}8 = 9{,}6$");
}
{
  barres(11, 200, 0.02, 4);
  const m = moments(200, 0.02);
  verif("11. E = 4", m.E, 4, 1e-9);
  verif("11. V = 3,92", m.V, 3.92, 1e-9);
  arrondi("11. σ ≈ 1,98", 1.98, Math.sqrt(m.V), 0.01);
  arrondi("11. P(X ≤ 4) ≈ 0,629", 0.629, binomCumul(200, 4, 0.02), 0.001);
  arrondi("11. P(X > 8) ≈ 0,020", 0.02, 1 - binomCumul(200, 8, 0.02), 0.001);
  dit(11, "$P(X \\leqslant 4) \\approx 0{,}629$");
  dit(11, "= 1 - P(X \\leqslant 8) \\approx 0{,}020$");
}
{
  const lignes = dessin("programme", 12, "figure")[0];
  const sortie = executerPython(lignes, "print(seuil())");
  if (sortie === null) console.log("  (Python absent : seuil() non exécuté)");
  else vrai(`12. Python : seuil() = ${sortie}`, sortie === "59");
  let n = 1;
  while (1 - binom(n, 0, 0.05) < 0.95) n++;
  vrai(`12. premier n par la loi : ${n}`, n === 59);
  arrondi("12. ln 0,05 / ln 0,95 ≈ 58,4", 58.4, Math.log(0.05) / Math.log(0.95), 0.1);
  const t = tableauDe(12);
  t.en.forEach((m, i) => arrondi(`12. tableau n = ${m}`, t.nombres[i], 1 - 0.95 ** m, 0.0001));
  dit(12, "\\approx 58{,}4$");
  dit(12, "Le plus petit entier est $n = 59$");
}
{
  const t = tableauDe(13);
  t.en.forEach((k, i) => arrondi(`13. P(X ≤ ${k})`, t.nombres[i], binomCumul(100, k, 0.05), 0.001));
  let k = 0;
  while (binomCumul(100, k, 0.05) < 0.95) k++;
  vrai(`13. plus petit k : ${k}`, k === 9);
  vrai("13. P(X ≥ 12) < 5 %", 1 - binomCumul(100, 11, 0.05) < 0.05);
  verif("13. E = 5", moments(100, 0.05).E, 5, 1e-9);
  dit(13, "$k = 9$");
}
{
  barres(14, 20, 0.15, 2);
  const m = moments(20, 0.15);
  verif("14. E(X) = 3", m.E, 3, 1e-9);
  verif("14. V(X) = 2,55", m.V, 2.55, 1e-9);
  const prime = moments(20, 0.15, (k) => 30 - 4 * k); // la prime, sommée sur la loi
  verif("14. E(prime) = 18", prime.E, 18, 1e-9);
  verif("14. V(prime) = 40,8", prime.V, 40.8, 1e-9);
  arrondi("14. σ(prime) ≈ 6,39", 6.39, Math.sqrt(prime.V), 0.01);
  const L = loi(20, 0.15);
  arrondi("14. P(prime ≥ 22) ≈ 0,405", 0.405, L.reduce((s, q, k) => s + (30 - 4 * k >= 22 ? q : 0), 0), 0.001);
  dit(14, "$\\sqrt{40{,}8} \\approx 6{,}39$");
  dit(14, "$P(X \\leqslant 2) \\approx 0{,}405$");
}
{
  barres(15, 50, 0.03, 1);
  arrondi("15. 299/9999 ≈ 0,0299", 0.0299, 299 / 9999, 0.0001);
  arrondi("15. P(X = 0) ≈ 0,218", 0.218, binom(50, 0, 0.03), 0.001);
  arrondi("15. P(X ≤ 2) ≈ 0,811", 0.811, binomCumul(50, 2, 0.03), 0.001);
  // La vraie loi (sans remise, hypergéométrique) : l'approximation est bonne.
  const hyper = (k) => (binome(300, k) * binome(9700, 50 - k)) / binome(10000, 50);
  vrai("15. sans remise, P(X = 0) diffère de moins de 0,002", Math.abs(hyper(0) - binom(50, 0, 0.03)) < 0.002);
  verif("15. E = 1,5", moments(50, 0.03).E, 1.5, 1e-9);
  dit(15, "\\approx 0{,}218$");
  dit(15, "$P(X \\leqslant 2) \\approx 0{,}811$");
}
{
  const f = (p) => binom(10, 1, p);
  const cb = courbes(16)[0];
  vrai("16. courbe : y = 10 f(t/10)", cb.pts.every(([t, y]) => Math.abs(y - 10 * f(t / 10)) < 6e-4));
  let meilleur = 0;
  for (let i = 0; i <= 10000; i++) if (f(i / 10000) > f(meilleur)) meilleur = i / 10000;
  verif("16. maximum en p = 0,1 (balayage)", meilleur, 0.1, 1e-9);
  arrondi("16. f(0,1) ≈ 0,387", 0.387, f(0.1), 0.001);
  vrai("16. f′ = 10(1 − p)⁸(1 − 10p)", [0.03, 0.2, 0.55].every((p) => Math.abs(derivee(f, p) - 10 * (1 - p) ** 8 * (1 - 10 * p)) < 1e-6));
  const pt = termes(16)[0];
  vrai("16. le point marqué est le sommet (1 ; 3,87)", pt.x === 1 && Math.abs(pt.y - 10 * f(0.1)) <= 0.005);
  dit(16, "$f(0{,}1) = 0{,}9^9 \\approx 0{,}387$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  barres(17, 20, 0.25, 5);
  const m = moments(20, 0.25);
  verif("17. E = 5", m.E, 5, 1e-9);
  arrondi("17. σ ≈ 1,94", 1.94, Math.sqrt(m.V), 0.01);
  arrondi("17. P(X ≥ 10) ≈ 0,0139", 0.0139, 1 - binomCumul(20, 9, 0.25), 0.0001);
  verif("17. a = 1/3 : E(N) = 0 (sommée sur la loi)", moments(20, 0.25, (k) => k - (20 - k) / 3).E, 0, 1e-9);
  verif("17. E(N) = 5 − 15a pour a = 0,5", moments(20, 0.25, (k) => k - 0.5 * (20 - k)).E, 5 - 7.5, 1e-9);
  dit(17, "\\approx 0{,}0139$");
  dit(17, "$E(N) = 0$ pour $a = \\dfrac{1}{3}$");
}
{
  arrondi("18. P(Y = 12) ≈ 0,282", 0.282, binom(12, 12, 0.9), 0.001);
  arrondi("18. P(Y = 10) ≈ 0,230", 0.23, binom(12, 10, 0.9), 0.001);
  arrondi("18. P(Y = 11) ≈ 0,377", 0.377, binom(12, 11, 0.9), 0.001);
  verif("18. E(Y) = 10,8", moments(12, 0.9).E, 10.8, 1e-9);
  const t = tableauDe(18);
  t.en.forEach((n, i) => arrondi(`18. n = ${n}`, t.nombres[i], 1 - binomCumul(n, 9, 0.9), 0.001));
  let n = 10;
  while (1 - binomCumul(n, 9, 0.9) < 0.95) n++;
  vrai(`18. premier n : ${n}`, n === 13);
  vrai("18. plus d'un jour sur dix sans assez d'énergie (n = 12)", binomCumul(12, 9, 0.9) > 0.1);
  dit(18, "Il faut au moins $13$ éoliennes");
  dit(18, "\\approx 0{,}889$");
}
{
  const a = dessin("arbre", 19)[0];
  sommesDe1(19, a);
  for (const f of feuilles(a).filter((f) => f.label.includes(" → "))) verif(`19. chemin ${f.chemin.join("-")}`, f.p, nb(f.label.split(" → ")[1]), 1e-12);
  const pD = feuilles(a).filter((f) => f.chemin[1] === "D").reduce((s, f) => s + f.p, 0);
  verif("19. P(D) = 0,04", pD, 0.04, 1e-12);
  barres(19, 25, 0.04, 3);
  arrondi("19. P(X = 0) ≈ 0,360", 0.36, binom(25, 0, 0.04), 0.001);
  arrondi("19. P(X ≤ 2) ≈ 0,924", 0.924, binomCumul(25, 2, 0.04), 0.001);
  arrondi("19. P(X ≥ 3) ≈ 0,076", 0.076, 1 - binomCumul(25, 2, 0.04), 0.001);
  verif("19. E = 1", moments(25, 0.04).E, 1, 1e-9);
  dit(19, "\\approx 0{,}076$");
  dit(19, "$= 0{,}018 + 0{,}022 = 0{,}04$");
}
{
  const m = moments(158, 0.92);
  verif("20. E = 145,36", m.E, 145.36, 1e-9);
  arrondi("20. V ≈ 11,63", 11.63, m.V, 0.01);
  arrondi("20. σ ≈ 3,41", 3.41, Math.sqrt(m.V), 0.01);
  const t = tableauDe(20);
  t.en.forEach((b, i) => arrondi(`20. ${b} billets`, t.nombres[i], 1 - binomCumul(b, 150, 0.92), 0.001));
  let b = 150;
  while (1 - binomCumul(b + 1, 150, 0.92) <= 0.05) b++;
  vrai(`20. au plus ${b} billets`, b === 157);
  const r = [156, 157, 158].map((x) => 1 - binomCumul(x, 150, 0.92));
  vrai("20. chaque billet de plus fait plus que doubler le risque", r[1] > 2 * r[0] && r[2] > 2 * r[1]);
  const z = (151 - m.E) / Math.sqrt(m.V);
  vrai(`20. 151 est à ${z.toFixed(2)} écart-type au-dessus (entre 1,5 et 2)`, z > 1.5 && z < 2);
  dit(20, "peut en vendre $157$ au plus");
  dit(20, "\\approx 0{,}058$");
}

enonceDit(20, "La compagnie vend $158$ billets");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce qu'on voit (« Sur le dessin », « Sur le tableau » ou « Dans le programme »)", F.feuille.corrections.every((t) => /Sur le (dessin|tableau)|Dans le programme/.test(t)));
F.fin();
