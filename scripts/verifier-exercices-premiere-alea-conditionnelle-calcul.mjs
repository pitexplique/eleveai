// Recalcul indépendant de la feuille « Probabilité conditionnelle : calculer »
// (1re, 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-conditionnelle-calcul.tsx.
// Les arbres, tableaux et diagrammes sont RELUS dans le source ; chaque résultat
// annoncé est refait à partir d'eux (ou des nombres de l'énoncé), et le corrigé
// doit ÉCRIRE le résultat. Puis règles de rendu et contrôles de texte communs.
// Usage : node scripts/verifier-exercices-premiere-alea-conditionnelle-calcul.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, T, arbresDe, diagrammes, fin } = creer("lib/fiches-exercices/maths-premiere-alea-conditionnelle-calcul.tsx", "alea_conditionnelle_calcul");

const nombre = (s) => Number(String(s).replace(",", "."));
/** Branche de l'arbre n° k (0 : exercice 9, 1 : 10, 2 : 12, 3 : 14, 4 : 17) : premier niveau, puis deuxième. */
const b = (k, l1, l2) => {
  const [ex, role] = { 0: [9, "figure"], 1: [10, "schema"], 2: [12, "schema"], 3: [14, "figure"], 4: [17, "figure"] }[k];
  const n1 = arbresDe(ex)[role].find((n) => n.label === l1 || n.label.startsWith(`${l1} →`));
  return l2 ? nombre(n1.enfants.find((n) => n.label === l2 || n.label.startsWith(`${l2} →`)).proba) : nombre(n1.proba);
};
const arrondi = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;

/* ═══ ★ ═══ */
verif("E1", 0.1 / 0.4, 0.25);
dit(1, "= 0{,}25$");
verif("E2", 0.3 * 0.6, 0.18);
dit(2, "= 0{,}18$");
{
  const p = T("non A", "B");
  verif("E3 P_A(B)", p.c("A", "B") / p.ligne("A"), 0.8);
  verif("E3 P_nonA(B)", p.c("non A", "B") / p.ligne("non A"), 0.2);
  verif("E3 total 1", p.total, 1);
  verif("E4 P_B(A)", p.c("A", "B") / p.col("B"), 12 / 19);
  vrai("E4 ≈ 0,63", arrondi(12 / 19) === 0.63);
}
verif("E5", 0.45 * 0.2, 0.09);
verif("E6", 0.12 / 0.4, 0.3);
verif("E6 vérification", 0.3 * 0.4, 0.12);
verif("E8 b", 0.3 / 0.75, 0.4);
dit(8, "= 0{,}4$");

/* ═══ ★★ ═══ */
{
  // E9 : l'arbre de l'énoncé, puis le tableau du corrigé reconstruit depuis lui.
  const pM = b(0, "M"), sens = b(0, "M", "T"), fp = b(0, "non M", "T");
  const t = T("Malade", "Positif");
  verif("E9 malades", 10000 * pM, t.ligne("Malade"));
  verif("E9 vrais positifs", 10000 * pM * sens, t.c("Malade", "Positif"));
  verif("E9 faux positifs", 10000 * (1 - pM) * fp, t.c("Sain", "Positif"));
  verif("E9 P_M(T)", sens, 0.95);
  verif("E9 P_T(M)", t.c("Malade", "Positif") / t.col("Positif"), 19 / 117);
  vrai("E9 ≈ 0,16", arrondi(19 / 117) === 0.16);
  vrai("E9 cinq fois plus", Math.round(980 / 190) === 5);
}
{
  const dr = b(1, "D") * b(1, "D", "R"), ndr = b(1, "non D") * b(1, "non D", "R");
  verif("E10 P(D∩R)", dr, 0.036);
  verif("E10 P(nonD∩R)", ndr, 0.048);
  verif("E10 P(R) donnée", dr + ndr, 0.084);
  verif("E10 P_R(D)", dr / 0.084, 3 / 7);
  vrai("E10 ≈ 0,43 < 0,5", arrondi(3 / 7) === 0.43 && 3 / 7 < 0.5);
  vrai("E10 énoncé 4 % / 90 % / 5 %", b(1, "D") === 0.04 && b(1, "D", "R") === 0.9 && b(1, "non D", "R") === 0.05);
}
{
  const c = T("Pompe", "Malade");
  verif("E11 P_E(C)", c.c("Pompe", "Malade") / c.ligne("Pompe"), 0.25);
  verif("E11 P_nonE(C)", c.c("Autre eau", "Malade") / c.ligne("Autre eau"), 0.01);
  verif("E11 rapport", 0.25 / 0.01, 25);
  verif("E11 P_C(E)", c.c("Pompe", "Malade") / c.col("Malade"), 25 / 29);
  vrai("E11 ≈ 0,86", arrondi(25 / 29) === 0.86);
}
{
  const fm = b(2, "F") * b(2, "F", "M");
  verif("E12 P(F∩M)", fm, 0.12);
  verif("E12 pas de médaille sans finale", b(2, "non F", "M"), 0);
  verif("E12 P_M(F)", fm / (fm + b(2, "non F") * b(2, "non F", "M")), 1);
}
{
  const t = T("Primo", "Acceptée");
  verif("E13 énoncé P(A)", t.ligne("Primo"), 0.3);
  verif("E13 énoncé P(A∩K)", t.c("Primo", "Acceptée"), 0.18);
  verif("E13 énoncé P(K)", t.col("Acceptée"), 0.72);
  verif("E13 a", 0.18 / 0.3, 0.6);
  verif("E13 b", (0.72 - 0.18) / 0.7, 27 / 35);
  vrai("E13 b ≈ 0,77", arrondi(27 / 35) === 0.77);
}
{
  const si = b(3, "S") * b(3, "S", "I"), nsi = b(3, "non S") * b(3, "non S", "I");
  verif("E14 P(S∩I)", si, 0.2);
  verif("E14 P(nonS∩I)", nsi, 0.06);
  verif("E14 P(I) admise", si + nsi, 0.26);
  verif("E14 P_I(S)", si / 0.26, 10 / 13);
  vrai("E14 ≈ 0,77", arrondi(10 / 13) === 0.77);
}
{
  const malades = 100000 / 1000, vp = 0.99 * malades, sains = 100000 - malades, fp = 0.02 * sains;
  verif("E15 malades", malades, 100);
  verif("E15 vrais positifs", vp, 99);
  verif("E15 faux positifs", fp, 1998);
  const d = diagrammes.find((x) => x.data[0].label === "Vrais positifs").data;
  verif("E15 diagramme vrais", d[0].value, vp);
  verif("E15 diagramme faux", d[1].value, fp);
  vrai("E15 ≈ 0,05 et < 1/20", arrondi(vp / (vp + fp)) === 0.05 && vp / (vp + fp) < 1 / 20);
  dit(15, "2\\,097");
}
{
  verif("E16 a", 0.35 * 0.8, 0.28);
  verif("E16 b", 0.28 / 0.6, 7 / 15);
  vrai("E16 ≈ 0,47", arrondi(7 / 15) === 0.47);
}

/* ═══ ★★★ ═══ */
{
  const pM = b(4, "M"), sens = b(4, "M", "T"), fp = b(4, "non M", "T");
  const vp1 = 10000 * pM * sens, fp1 = 10000 * (1 - pM) * fp;
  verif("E17 a vrais positifs", vp1, 400);
  verif("E17 a faux positifs", fp1, 190);
  verif("E17 b P(T)", (vp1 + fp1) / 10000, 0.059);
  verif("E17 b P_T(M)", vp1 / (vp1 + fp1), 40 / 59);
  const vp2 = 10000 * 0.005 * sens, fp2 = 10000 * 0.995 * fp;
  verif("E17 c vrais positifs", vp2, 40);
  verif("E17 c faux positifs", fp2, 199);
  verif("E17 c P_T(M)", vp2 / (vp2 + fp2), 40 / 239);
  const d = diagrammes.find((x) => x.data[0].label.startsWith("Épidémie")).data;
  verif("E17 diagramme épidémie", d[0].value, Math.round((100 * 40) / 59));
  verif("E17 diagramme hors épidémie", d[1].value, Math.round((100 * 40) / 239));
}
{
  const d = diagrammes.find((x) => x.data[0].label === "Jour 0").data.map((x) => x.value / 1000);
  verif("E18 moitié tous les 8 jours", d[1], d[0] / 2);
  verif("E18 a P(S16)", d[2], 0.25);
  verif("E18 a P(S24)", d[3], 0.125);
  verif("E18 c P_S8(S16)", d[2] / d[1], 0.5);
  verif("E18 c P_S16(S24)", d[3] / d[2], 0.5);
}
{
  const t = T("Ingénieur", "Embauché");
  verif("E19 a P(I∩E)", 0.2 * 0.3, t.c("Ingénieur", "Embauché"));
  verif("E19 a P(nonI∩E)", 0.8 * 0.05, t.c("Autre", "Embauché"));
  verif("E19 b P(E)", t.col("Embauché"), 0.1);
  verif("E19 c P_E(I)", t.c("Ingénieur", "Embauché") / t.col("Embauché"), 0.6);
  verif("E19 six fois", 0.3 / 0.05, 6);
}
{
  const d = diagrammes.find((x) => x.data[0].label === "60 ans").data.map((x) => x.value / 100);
  verif("E20 b", d[1] / d[0], 2 / 3);
  vrai("E20 b ≈ 0,67", arrondi(2 / 3) === 0.67);
  verif("E20 c", d[2] / d[1], 0.4);
  vrai("E20 d monte", d[1] / d[0] > d[1]);
}

fin();
