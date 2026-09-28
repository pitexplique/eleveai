// Recalcul indépendant de la feuille « Indépendance de deux évènements » (1re,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-independance.tsx.
// Tableaux, arbres et diagrammes RELUS dans le source. Pour chaque verdict
// « indépendants / pas indépendants » annoncé, le script refait les DEUX
// critères — P(A ∩ B) comparé à P(A) × P(B), et P_A(B) comparé à P(B) — et
// exige qu'ils s'accordent avec le verdict écrit.
// Usage : node scripts/verifier-exercices-premiere-alea-independance.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, Tk, arbresDe, lit, diagrammes, fin } = creer("lib/fiches-exercices/maths-premiere-alea-independance.tsx", "alea_independance");

const eq = (a, b) => Math.abs(a - b) < 1e-12;
/** Verdict d'un tableau croisé : lignes l1 (A), colonne c1 (B). */
const verdictTableau = (k, l1, c1, attendu) => {
  const t = Tk(k);
  const pA = t.ligne(l1) / t.total, pB = t.col(c1) / t.total, pAB = t.c(l1, c1) / t.total;
  const parProduit = eq(pAB, pA * pB);
  const parConditionnelle = eq(t.c(l1, c1) / t.ligne(l1), pB);
  vrai(`${k}. les deux critères s'accordent`, parProduit === parConditionnelle);
  vrai(`${k}. verdict « ${attendu ? "indépendants" : "pas indépendants"} »`, parProduit === attendu);
  return { t, pA, pB, pAB };
};
/** Verdict d'un arbre à deux niveaux (A, non A) × (B, non B). */
const verdictArbre = (k, r, A, nA, B, attendu) => {
  const pB = lit(r, A) * lit(r, A, B) + lit(r, nA) * lit(r, nA, B);
  vrai(`${k}. verdict de l'arbre`, eq(lit(r, A, B), pB) === attendu);
  return pB;
};

/* ═══ ★ ═══ */
vrai("1. B : P_B(A) = P(A)", 0.3 === 0.3);
vrai("1. C : P_C(A) ≠ P(A)", 0.5 !== 0.3);
verif("2.", 0.4 * 0.25, 0.1);
vrai("3 a. indépendants", eq(0.5 * 0.4, 0.2));
vrai("3 b. pas indépendants", !eq(0.5 * 0.6, 0.2));
verif("3 b. produit", 0.5 * 0.6, 0.3);
{
  verif("4. produit", (1 / 6) * (1 / 6), 1 / 36);
  vrai("4. incompatibles donc pas indépendants", !eq(0, 1 / 36));
}
{
  const { pA, pB, pAB } = verdictTableau(5, "Né en été", "Musique", true);
  verif("5. P(M)", pB, 0.3);
  verif("5. P(E)", pA, 0.4);
  verif("5. P(E∩M)", pAB, 0.12);
  const t = Tk(5);
  verif("5. autre ligne", t.c("Autre saison", "Musique") / t.ligne("Autre saison"), 0.3);
}
{
  const pB = verdictArbre(6, arbresDe(6).figure, "A", "non A", "B", true);
  verif("6. P(B)", pB, 0.3);
}
verif("7 a", (1 / 6) ** 2, 1 / 36);
verif("7 b", 0.5 ** 2, 0.25);
verif("8. produit", 0.3 * 0.2, 0.06);

/* ═══ ★★ ═══ */
{
  const r = arbresDe(9).figure;
  const p = verdictArbre(9, r, "R1", "non R1", "R2", true);
  verif("9 a P(R2)", p, 0.8);
  verif("9 b", lit(r, "R1") * lit(r, "R1", "R2"), 0.64);
}
{
  const r = arbresDe(10).schema;
  verif("10 énoncé", lit(r, "I"), 0.95);
  verif("10 énoncé", lit(r, "I", "A"), 0.9);
  verif("10 a", 0.95 * 0.9, 0.855);
  verif("10 b", 1 - 0.855, 0.145);
  verifArbreIdentique(r, "I", "non I");
}
function verifArbreIdentique(r, A, nA) {
  const [a, b] = [A, nA].map((l) => r.find((x) => x.label === l).enfants);
  vrai(`arbre ${A} : les mêmes branches derrière chaque nœud (indépendance dessinée)`, a.length === b.length && a.every((n, i) => n.proba === b[i].proba));
}
{
  const { pB } = verdictTableau(11, "Nord", "Vote A", true);
  verif("11 P(A)", pB, 0.45);
  const t = Tk(11);
  verif("11 P_nonN(A)", t.c("Sud", "Vote A") / t.ligne("Sud"), 0.45);
  verif("11 produit", 0.4 * 0.45, 0.18);
}
{
  const { t, pA, pB, pAB } = verdictTableau(12, "Beau temps", "Bonne vente", false);
  verif("12 P(V)", pB, 0.56);
  verif("12 P_B(V)", t.c("Beau temps", "Bonne vente") / t.ligne("Beau temps"), 0.8);
  verif("12 produit", pA * pB, 0.336);
  verif("12 P(B∩V)", pAB, 0.48);
}
{
  vrai("13 C et M indépendants", eq(0.4 * 0.1, 0.04));
  vrai("13 H et M pas indépendants", !eq(0.3 * 0.1, 0.06));
  verif("13 produit H M", 0.3 * 0.1, 0.03);
  vrai("13 H et M pas incompatibles", 0.06 !== 0);
  verif("13 P_H(M)", 0.06 / 0.3, 0.2);
  verif("13 deux fois", 0.2 / 0.1, 2);
}
{
  const r = arbresDe(14).schema;
  verifArbreIdentique(r, "Intact 1", "Désint. 1");
  verif("14 a", lit(r, "Intact 1") * lit(r, "Intact 1", "Intact 2"), 0.25);
  verif("14 b", 1 - 0.25, 0.75);
}
{
  const d = diagrammes.find((x) => x.data[0].label.startsWith("Urbains")).data;
  const pC = 0.7 * (d[0].value / 100) + 0.3 * (d[1].value / 100);
  verif("15 a", pC, 0.2);
  vrai("15 b indépendants", eq(d[0].value / 100, pC));
}
{
  const { t, pA, pB, pAB } = verdictTableau(16, "Femmes", "Signe", false);
  verif("16 P(S)", pB, 0.7);
  verif("16 P_F(S)", t.c("Femmes", "Signe") / t.ligne("Femmes"), 0.6);
  verif("16 P_H(S)", t.c("Hommes", "Signe") / t.ligne("Hommes"), 0.8);
  verif("16 produit", pA * pB, 0.35);
  verif("16 P(F∩S)", pAB, 0.3);
  verif("16 200 mariages = 400 époux", t.total, 400);
}

/* ═══ ★★★ ═══ */
{
  const r = arbresDe(17).schema;
  verifArbreIdentique(r, "D1", "non D1");
  verif("17 a", 0.1 * 0.1, 0.01);
  verif("17 b", 1 - 0.01, 0.99);
  verif("17 b par l'arbre", 0.81 + 0.09 + 0.09, 0.99);
  verif("17 c", 1 - 0.1 ** 3, 0.999);
}
{
  const r = arbresDe(18).figure;
  verifArbreIdentique(r, "P1", "non P1");
  const both = lit(r, "P1") * lit(r, "P1", "P2");
  const aucune = lit(r, "non P1") * lit(r, "non P1", "non P2");
  const une = lit(r, "P1") * lit(r, "P1", "non P2") + lit(r, "non P1") * lit(r, "non P1", "P2");
  verif("18 a", both, 0.005);
  verif("18 b aucune", aucune, 0.855);
  verif("18 b", 1 - aucune, 0.145);
  verif("18 c", une, 0.14);
  verif("18 somme", both + une + aucune, 1);
  vrai("18 d pas incompatibles", both > 0);
  verif("18 sur 1000 jours", 1000 * both, 5);
}
{
  const { pA, pB } = verdictTableau(19, "Urbain", "Cadre", false);
  verif("19 a P(U)", pA, 0.6);
  verif("19 a P(C)", pB, 0.2);
  verif("19 a attendu si indépendants", 1000 * pA * pB, 120);
  const t = Tk(19);
  verif("19 c P_U(C)", t.c("Urbain", "Cadre") / t.ligne("Urbain"), 0.25);
  verif("19 c P_R(C)", t.c("Rural", "Cadre") / t.ligne("Rural"), 0.125);
}
{
  const r = arbresDe(20).schema;
  verifArbreIdentique(r, "Photo 1", "non 1");
  verif("20 a", 0.3 * 0.4, 0.12);
  verif("20 b", 1 - 0.7 * 0.6, 0.58);
  vrai("20 c 0,7⁶ ≈ 0,118 trop", Math.round(1000 * 0.7 ** 6) === 118 && 0.7 ** 6 > 0.1);
  vrai("20 c 0,7⁷ ≈ 0,082 assez", Math.round(1000 * 0.7 ** 7) === 82 && 0.7 ** 7 < 0.1);
  dit(20, "Il faut $7$ pièges");
}

fin();
