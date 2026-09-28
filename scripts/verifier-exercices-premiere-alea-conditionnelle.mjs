// Recalcul indépendant de la feuille « Probabilité conditionnelle :
// reconnaître » (1re, 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-conditionnelle.tsx.
// Chaque tableau croisé est RELU dans le source (totaux refaits), chaque P_A(B)
// annoncé est recalculé sur SES cases ; les tableaux construits dans le corrigé
// sont reconstruits depuis les nombres de l'énoncé. Puis les règles de rendu et
// les contrôles de texte (scripts/verifier-exercices-premiere-alea-outils.mjs).
// Usage : node scripts/verifier-exercices-premiere-alea-conditionnelle.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, enonceDit, T, roues, fin } = creer("lib/fiches-exercices/maths-premiere-alea-conditionnelle.tsx", "alea_conditionnelle");

/* ═══ ★ ═══ */
verif("E1 cohérence P(I∩S) = P(I) × P_I(S)", 0.3 * 0.8, 0.24);
dit(1, "$P_I(S) = 0{,}8$");
dit(1, "$P_S(I) = 0{,}5$");
{
  const f = T("Feuillus", "Malade");
  verif("E3 P_F(M)", f.c("Feuillus", "Malade") / f.ligne("Feuillus"), 0.1);
  verif("E3 total 200", f.total, 200);
  verif("E4 P_M(F)", f.c("Feuillus", "Malade") / f.col("Malade"), 3 / 7);
  vrai("E4 ≈ 0,43", Math.round(100 * (3 / 7)) === 43);
  verif("E4 P_R(M)", f.c("Résineux", "Malade") / f.ligne("Résineux"), 0.2);
  dit(3, "\\dfrac{12}{120}");
  dit(4, "\\dfrac{12}{28} = \\dfrac{3}{7}");
}
{
  const o = T("Mésanges", "Jeunes");
  verif("E6 total", o.total, 220);
  verif("E6 P_J(M)", o.c("Mésanges", "Jeunes") / o.col("Jeunes"), 0.75);
  verif("E6 P_M(J)", o.c("Mésanges", "Jeunes") / o.ligne("Mésanges"), 0.6);
}
{
  // Dé : faces paires 2, 4, 6.
  const pairs = [1, 2, 3, 4, 5, 6].filter((x) => x % 2 === 0);
  verif("E7 P_A(B)", pairs.filter((x) => x === 6).length / pairs.length, 1 / 3);
  dit(7, "$P_A(B) = \\dfrac{1}{3}$");
}
{
  const m = T("Maison", "Trie");
  verif("E8 énoncé maison", m.ligne("Maison"), 30);
  verif("E8 énoncé maison trie", m.c("Maison", "Trie"), 27);
  verif("E8 énoncé appartement", m.ligne("Appartement"), 50);
  verif("E8 énoncé appartement trie", m.c("Appartement", "Trie"), 35);
  verif("E8 sachant maison", m.c("Maison", "Trie") / m.ligne("Maison"), 0.9);
  verif("E8 sachant appartement", m.c("Appartement", "Trie") / m.ligne("Appartement"), 0.7);
  enonceDit(8, "$80$ foyers");
}

/* ═══ ★★ ═══ */
{
  const g = T("Train", "Gobelet");
  verif("E9 a", g.col("Gobelet") / g.total, 0.66);
  verif("E9 b train", g.c("Train", "Gobelet") / g.ligne("Train"), 0.9);
  verif("E9 b voiture", g.c("Voiture", "Gobelet") / g.ligne("Voiture"), 0.5);
  verif("E9 c", g.c("Train", "Gobelet") / g.col("Gobelet"), 6 / 11);
  vrai("E9 c ≈ 0,55", Math.round(100 * (6 / 11)) === 55);
}
{
  const a = T("Sans pesticide", "Survit");
  verif("E10 énoncé", a.ligne("Sans pesticide"), 160);
  verif("E10 énoncé", a.c("Sans pesticide", "Survit"), 144);
  verif("E10 énoncé", a.ligne("Cultures"), 240);
  verif("E10 énoncé", a.c("Cultures", "Survit"), 180);
  verif("E10 b P_B(S)", a.c("Sans pesticide", "Survit") / a.ligne("Sans pesticide"), 0.9);
  verif("E10 b P_nonB(S)", a.c("Cultures", "Survit") / a.ligne("Cultures"), 0.75);
  verif("E10 c", a.c("Sans pesticide", "Survit") / a.col("Survit"), 4 / 9);
  vrai("E10 c < 1/2 et ≈ 0,44", 4 / 9 < 0.5 && Math.round(100 * (4 / 9)) === 44);
  dit(10, "Survivantes : $324$ ; mortes : $76$");
}
{
  const h = T("Nés campagne", "Ouvriers");
  verif("E11 a P_O(C)", h.c("Nés campagne", "Ouvriers") / h.col("Ouvriers"), 0.6);
  verif("E11 b P_C(O)", h.c("Nés campagne", "Ouvriers") / h.ligne("Nés campagne"), 0.72);
  verif("E11 c P(O∩C)", h.c("Nés campagne", "Ouvriers") / h.total, 0.36);
}
{
  const t = T("Gauche", "Arrêté");
  verif("E12 P_G(A)", t.c("Gauche", "Arrêté") / t.ligne("Gauche"), 0.25);
  verif("E12 P_D(A)", t.c("Droite", "Arrêté") / t.ligne("Droite"), 0.125);
  vrai("E12 b tirer à droite", t.c("Droite", "Arrêté") / t.ligne("Droite") < t.c("Gauche", "Arrêté") / t.ligne("Gauche"));
  verif("E12 c P_A(G)", t.c("Gauche", "Arrêté") / t.col("Arrêté"), 0.75);
}
{
  const c = T("Cadres", "Télétravail");
  verif("E13 énoncé", c.ligne("Cadres"), 60);
  verif("E13 énoncé", c.ligne("Non-cadres"), 190);
  verif("E13 a P_C(T)", c.c("Cadres", "Télétravail") / c.ligne("Cadres"), 0.75);
  verif("E13 a P_nonC(T)", c.c("Non-cadres", "Télétravail") / c.ligne("Non-cadres"), 0.2);
  verif("E13 b 83", c.col("Télétravail"), 83);
  vrai("E13 b ≈ 0,54", Math.round((100 * 45) / 83) === 54);
}
{
  const p = T("A", "Défaillant");
  verif("E14 a P_A(D)", p.c("A", "Défaillant") / p.ligne("A"), 0.05);
  verif("E14 a P_B(D)", p.c("B", "Défaillant") / p.ligne("B"), 0.15);
  verif("E14 b P_D(A)", p.c("A", "Défaillant") / p.col("Défaillant"), 1 / 3);
}
{
  verif("E15 P_T(F)", 108 / 180, 0.6);
  verif("E15 P_nonT(F)", 36 / 120, 0.3);
  verif("E15 P_F(T)", 108 / (108 + 36), 0.75);
  enonceDit(15, "$300$ élèves");
  vrai("E15 énoncé 180 + 120 = 300", 180 + 120 === 300);
  dit(15, "$P_T(F) = \\dfrac{108}{180} = 0{,}6$");
}
{
  const r = roues[0];
  const rouge = r.filter((s) => s.couleur === "#dc2626");
  verif("E16 8 secteurs égaux", r.length, 8);
  vrai("E16 poids égaux", r.every((s) => s.poids === 1));
  verif("E16 a P(G)", r.filter((s) => s.label === "G").length / r.length, 3 / 8);
  verif("E16 b P_R(G)", rouge.filter((s) => s.label === "G").length / rouge.length, 1 / 2);
  verif("E16 c P_G(R)", rouge.filter((s) => s.label === "G").length / r.filter((s) => s.label === "G").length, 2 / 3);
}

/* ═══ ★★★ ═══ */
{
  const m = T("Météo lue", "Demi-tour");
  verif("E17 a P_M(D)", m.c("Météo lue", "Demi-tour") / m.ligne("Météo lue"), 0.1);
  verif("E17 a P_nonM(D)", m.c("Pas lue", "Demi-tour") / m.ligne("Pas lue"), 0.3);
  verif("E17 b P_D(M)", m.c("Météo lue", "Demi-tour") / m.col("Demi-tour"), 7 / 16);
  vrai("E17 b ≈ 0,44", Math.round(100 * (7 / 16)) === 44);
  const nonM = m.c("Pas lue", "Demi-tour") / m.col("Demi-tour");
  vrai("E17 c plus de la moitié, ≈ 0,56", nonM > 0.5 && Math.round(100 * nonM) === 56);
}
{
  const v = T("Ville", "Électrique");
  verif("E18 a P_V(E)", v.c("Ville", "Électrique") / v.ligne("Ville"), 0.3);
  verif("E18 a P_nonV(E)", v.c("Campagne", "Électrique") / v.ligne("Campagne"), 0.15);
  verif("E18 b P_E(V)", v.c("Ville", "Électrique") / v.col("Électrique"), 0.75);
}
{
  const t = T("Protégé", "Éclos");
  verif("E19 énoncé", t.ligne("Protégé"), 120);
  verif("E19 énoncé", t.c("Protégé", "Éclos"), 102);
  verif("E19 énoncé", t.ligne("Non protégé"), 80);
  verif("E19 énoncé", t.c("Non protégé", "Éclos"), 48);
  verif("E19 b P_P(E)", t.c("Protégé", "Éclos") / t.ligne("Protégé"), 0.85);
  verif("E19 b P_nonP(E)", t.c("Non protégé", "Éclos") / t.ligne("Non protégé"), 0.6);
  verif("E19 c P_E(P)", t.c("Protégé", "Éclos") / t.col("Éclos"), 0.68);
  verif("E19 c P_nonE(P)", t.c("Protégé", "Pas éclos") / t.col("Pas éclos"), 0.36);
}
{
  const s = T("1re balle", "Gagné");
  verif("E20 énoncé", s.ligne("1re balle"), 120);
  verif("E20 énoncé", s.c("1re balle", "Gagné"), 90);
  verif("E20 énoncé", s.c("2e balle", "Gagné"), 40);
  verif("E20 a P_R(G)", s.c("1re balle", "Gagné") / s.ligne("1re balle"), 0.75);
  verif("E20 a P_nonR(G)", s.c("2e balle", "Gagné") / s.ligne("2e balle"), 0.5);
  verif("E20 b P(G)", s.col("Gagné") / s.total, 0.65);
  verif("E20 c P_G(R)", s.c("1re balle", "Gagné") / s.col("Gagné"), 9 / 13);
  vrai("E20 c ≈ 0,69", Math.round(100 * (9 / 13)) === 69);
  verif("E20 d quotient", 0.75 / 0.5, 1.5);
}

fin();
