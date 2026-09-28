// Recalcul indépendant de la feuille « Arbre pondéré : calculer » (1re,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-arbre-calcul.tsx.
// Arbres et tableaux RELUS dans le source : chaque chemin (produit) et chaque
// somme de chemins sont refaits à partir des branches dessinées ; chaque
// tableau croisé est reconstruit depuis l'arbre (ou les nombres de l'énoncé) et
// comparé case par case. Le corrigé doit écrire chaque résultat.
// Usage : node scripts/verifier-exercices-premiere-alea-arbre-calcul.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, T, Tk, arbresDe, lit, fin } = creer("lib/fiches-exercices/maths-premiere-alea-arbre-calcul.tsx", "alea_arbre_calcul");

/** Probabilité du chemin l1 → l2 dans l'arbre r. */
const ch = (r, l1, l2) => lit(r, l1) * lit(r, l1, l2);
/** Le tableau `tab` (sur N) est-il l'arbre r multiplié par N ? lignes = branches du 1er niveau. */
const tableauDeLArbre = (k, r, t, N, lignes, colonnes) => {
  for (const [l1, ligne] of lignes) for (const [l2, col] of colonnes) verif(`${k}. case ${ligne} × ${col}`, t.c(ligne, col), N * ch(r, l1, l2), 1e-9);
  verif(`${k}. total ${N}`, t.total, N);
};
const arrondi = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;

/* ═══ ★ ═══ */
{
  const r = arbresDe(1).figure;
  verif("1. P(A∩B)", ch(r, "A", "B"), 0.2);
  verif("1. P(nonA∩nonB)", ch(r, "non A", "non B"), 0.1);
  verif("2. P(B)", ch(r, "A", "B") + ch(r, "non A", "B"), 0.3);
  dit(2, "$P(B) = 0{,}2 + 0{,}1 = 0{,}3$");
}
verif("3.", 0.9 * 0.7, 0.63);
{
  const r = arbresDe(4).figure;
  verif("4. P(R)", ["Bus", "Pied", "Voiture"].reduce((s, m) => s + ch(r, m, "R"), 0), 0.105);
  dit(4, "= 0{,}105$");
}
{
  const t = Tk(5);
  const r = [{ label: "A", proba: "0,4", enfants: [{ label: "B", proba: "0,5" }, { label: "non B", proba: "0,5" }] }, { label: "non A", proba: "0,6", enfants: [{ label: "B", proba: "0,25" }, { label: "non B", proba: "0,75" }] }];
  tableauDeLArbre(5, r, t, 100, [["A", "A"], ["non A", "non A"]], [["B", "B"], ["non B", "non B"]]);
  verif("5. P(B)", t.col("B") / 100, 0.35);
}
{
  // E6 : l'arbre du corrigé retrouvé depuis le tableau de l'énoncé.
  const tab = Tk(6);
  const tables = tab.t.lignes.map((l) => l[0]);
  vrai("6. tableau sur 200", tab.total === 200 && tables.includes("A"));
  const r = arbresDe(6).schema;
  verif("6. P(A)", lit(r, "A"), tab.ligne("A") / tab.total);
  verif("6. P_A(B)", lit(r, "A", "B"), tab.c("A", "B") / tab.ligne("A"));
  verif("6. P_nonA(B)", lit(r, "non A", "B"), tab.c("non A", "B") / tab.ligne("non A"));
}
{
  const r = arbresDe(7).figure;
  verif("7. exactement un vert", ch(r, "V1", "R2") + ch(r, "R1", "V2"), 0.24);
}
{
  const c = [0.3 * 0.6, 0.3 * 0.4, 0.7 * 0.2, 0.7 * 0.8];
  verif("8. chemins", c[0], 0.18);
  verif("8. chemins", c[1], 0.12);
  verif("8. chemins", c[2], 0.14);
  verif("8. chemins", c[3], 0.56);
  verif("8. somme", c.reduce((s, x) => s + x), 1);
}

/* ═══ ★★ ═══ */
{
  const r = arbresDe(9).figure;
  verif("9 a", ch(r, "Alpha", "D"), 0.27);
  verif("9 b", ch(r, "Alpha", "D") + ch(r, "Bêta", "D"), 0.69);
  tableauDeLArbre(9, r, T("Alpha", "Détectée"), 1000, [["Alpha", "Alpha"], ["Bêta", "Bêta"]], [["D", "Détectée"], ["non D", "Non"]]);
}
{
  const r = arbresDe(10).figure;
  verif("10 a", ch(r, "B", "Vote A"), 0.035);
  const a = ["A", "B", "Autre"].reduce((s, m) => s + ch(r, m, "Vote A"), 0);
  verif("10 b", a, 0.54);
  vrai("10 b A gagne", a > 0.5);
}
{
  const r = arbresDe(11).schema;
  verif("11 énoncé", lit(r, "LED"), 0.6);
  verif("11 énoncé", lit(r, "LED", "P"), 0.02);
  verif("11 énoncé", lit(r, "Halogène", "P"), 0.2);
  verif("11 a", ch(r, "LED", "P") + ch(r, "Halogène", "P"), 0.092);
  verif("11 b LED en panne", 1000 * ch(r, "LED", "P"), 12);
  verif("11 b halogènes en panne", 1000 * ch(r, "Halogène", "P"), 80);
  dit(11, "dont $12$ en panne et $588$ non");
  dit(11, "dont $80$ en panne et $320$ non");
}
{
  const r = arbresDe(12).figure;
  const deux = ch(r, "C", "D"), une = ch(r, "C", "non D") + ch(r, "non C", "D"), aucune = ch(r, "non C", "non D");
  verif("12 a", deux, 0.3);
  verif("12 b", une, 0.42);
  verif("12 c", aucune, 0.28);
  verif("12 c somme", deux + une + aucune, 1);
}
{
  const r = [{ label: "J", proba: "0,3", enfants: [{ label: "M", proba: "0,6" }, { label: "non M", proba: "0,4" }] }, { label: "non J", proba: "0,7", enfants: [{ label: "M", proba: "0,4" }, { label: "non M", proba: "0,6" }] }];
  tableauDeLArbre(13, r, T("Jeunes", "Appli"), 1000, [["J", "Jeunes"], ["non J", "Autres"]], [["M", "Appli"], ["non M", "Pas d'appli"]]);
  verif("13 b", ch(r, "J", "M") + ch(r, "non J", "M"), 0.46);
}
{
  const r = arbresDe(14).schema;
  verif("14 énoncé", lit(r, "Ouest"), 0.7);
  verif("14 énoncé", lit(r, "Ouest", "S"), 0.8);
  verif("14 énoncé", lit(r, "Est", "S"), 0.6);
  verif("14 b", ch(r, "Est", "S"), 0.18);
  verif("14 c", ch(r, "Ouest", "S") + ch(r, "Est", "S"), 0.74);
}
{
  const t = T("Moins de 60", "Seul");
  const r = arbresDe(15).schema;
  verif("15 a P(J)", lit(r, "Moins de 60"), t.ligne("Moins de 60") / t.total);
  verif("15 a P_J(S)", lit(r, "Moins de 60", "S"), t.c("Moins de 60", "Seul") / t.ligne("Moins de 60"));
  verif("15 a P_nonJ(S)", lit(r, "60 et plus", "S"), t.c("60 et plus", "Seul") / t.ligne("60 et plus"));
  verif("15 b", ch(r, "Moins de 60", "S") + ch(r, "60 et plus", "S"), t.col("Seul") / t.total);
  verif("15 b", t.col("Seul") / t.total, 0.2);
}
{
  const r = arbresDe(16).schema;
  const zones = ["Ville", "Périurbain", "Campagne"];
  vrai("16 énoncé premier niveau", zones.map((z) => lit(r, z)).join() === "0.5,0.3,0.2");
  vrai("16 énoncé retards", zones.map((z) => lit(r, z, "R")).join() === "0.1,0.2,0.4");
  const c = zones.map((z) => ch(r, z, "R"));
  verif("16 b", c[0] + c[1] + c[2], 0.19);
  vrai("16 c campagne : le plus de retards et le taux le plus haut", c[2] === Math.max(...c) && lit(r, "Campagne", "R") === 0.4);
}

/* ═══ ★★★ ═══ */
{
  const ef = 0.1 * 0.95, nef = 0.9 * 0.01;
  verif("17 b", ef, 0.095);
  verif("17 b", nef, 0.009);
  verif("17 b P(F)", ef + nef, 0.104);
  const t = T("Excès", "Flash");
  verif("17 c excès flashées", t.c("Excès", "Flash"), 10000 * ef);
  verif("17 c en règle flashées", t.c("En règle", "Flash"), 10000 * nef);
  verif("17 c excès", t.ligne("Excès"), 1000);
  verif("17 d", t.c("Excès", "Flash") / t.col("Flash"), 950 / 1040);
  vrai("17 d ≈ 0,91", arrondi(950 / 1040) === 0.91);
}
{
  const r = arbresDe(18).figure;
  const q = ["Centre", "Faubourgs", "Ouest"];
  const c = q.map((z) => ch(r, z, "M"));
  verif("18 a", c[0], 0.02);
  verif("18 a", c[1], 0.0105);
  verif("18 a", c[2], 0.0025);
  verif("18 a P(M)", c[0] + c[1] + c[2], 0.033);
  const t = T("Centre", "Malade");
  q.forEach((z, i) => {
    verif(`18 b ${z} malades`, t.c(z, "Malade"), 10000 * c[i]);
    verif(`18 b ${z} habitants`, t.ligne(z), 10000 * lit(r, z));
  });
  verif("18 c", t.c("Centre", "Malade") / t.col("Malade"), 20 / 33);
  vrai("18 c ≈ 0,61", arrondi(20 / 33) === 0.61);
}
{
  const r = arbresDe(19).schema;
  verif("19 énoncé", lit(r, "Sud"), 0.4);
  verif("19 énoncé", lit(r, "Sud", "A"), 0.9);
  verif("19 énoncé", lit(r, "Est-ouest", "A"), 0.5);
  verif("19 a", ch(r, "Sud", "A") + ch(r, "Est-ouest", "A"), 0.66);
  const sudNon = 200 * ch(r, "Sud", "non A"), eoNon = 200 * ch(r, "Est-ouest", "non A");
  verif("19 b sud insuffisantes", sudNon, 8);
  verif("19 b est-ouest insuffisantes", eoNon, 60);
  verif("19 c", sudNon / (sudNon + eoNon), 2 / 17);
  vrai("19 c ≈ 0,12", arrondi(2 / 17) === 0.12);
}
{
  const r = [{ label: "F", proba: "0,3", enfants: [{ label: "S", proba: "0,5" }, { label: "non S", proba: "0,5" }] }, { label: "non F", proba: "0,7", enfants: [{ label: "S", proba: "0,9" }, { label: "non S", proba: "0,1" }] }];
  verif("20 a", ch(r, "F", "S") + ch(r, "non F", "S"), 0.78);
  tableauDeLArbre(20, r, T("Attaquée", "Survit"), 200, [["F", "Attaquée"], ["non F", "Épargnée"]], [["S", "Survit"], ["non S", "Meurt"]]);
  const t = T("Attaquée", "Survit");
  verif("20 c", t.c("Attaquée", "Meurt") / t.col("Meurt"), 15 / 22);
  vrai("20 c ≈ 0,68", arrondi(15 / 22) === 0.68);
}

fin();
