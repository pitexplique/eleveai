// Recalcul indépendant de la feuille « Épreuves de Bernoulli : reconnaître »
// (1re, 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-bernoulli.tsx.
// La roue, l'urne et les arbres sont RELUS dans le source : p est recompté sur
// les secteurs et les billes ; chaque arbre « sans remise » est reconstruit en
// retirant la bille (la carte, le numéro…) tirée, et comparé branche par
// branche ; chaque arbre « avec remise » doit reproduire les mêmes branches.
// Usage : node scripts/verifier-exercices-premiere-alea-bernoulli.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, arbresDe, lit, roues, billes, diagrammes, appels, fin } = creer("lib/fiches-exercices/maths-premiere-alea-bernoulli.tsx", "alea_bernoulli");

/** L'arbre de deux tirages SANS remise dans une urne de `a` succès (label S) et `b` échecs (label E). */
const sansRemise = (k, r, S, E, a, b) => {
  const n = a + b;
  verif(`${k}. 1er ${S}`, lit(r, S), a / n);
  verif(`${k}. ${S} puis ${S}`, lit(r, S, S), (a - 1) / (n - 1));
  verif(`${k}. ${S} puis ${E}`, lit(r, S, E), b / (n - 1));
  verif(`${k}. ${E} puis ${S}`, lit(r, E, S), a / (n - 1));
  verif(`${k}. ${E} puis ${E}`, lit(r, E, E), (b - 1) / (n - 1));
};
/** Avec remise : les mêmes branches derrière chaque nœud, égales au premier niveau. */
// (les étiquettes du second niveau peuvent changer : T1 puis T2)
const avecRemise = (k, r) => {
  const premier = r.map((n) => n.proba);
  for (const n of r) vrai(`${k}. derrière ${n.label} : les branches du premier niveau`, n.enfants.map((x) => x.proba).join() === premier.join());
};

/* ═══ ★ ═══ */
{
  const r = roues[0];
  verif("2. huit secteurs", r.length, 8);
  vrai("2. poids égaux", r.every((s) => s.poids === 1));
  verif("2. p = 3/8", r.filter((s) => s.label === "R").length / r.length, 3 / 8);
  vrai("2. rouges rouges", r.every((s) => (s.label === "R") === (s.couleur === "#dc2626")));
  dit(2, "$p = \\dfrac{3}{8}$");
}
{
  const u = billes[0];
  verif("3. p", u.filter((x) => x.label === "R").length / u.length, 0.6);
  vrai("3. rouges rouges", u.every((x) => (x.label === "R") === (x.couleur === "#dc2626")));
  const rouges = u.filter((x) => x.label === "R").length, bleues = u.length - rouges;
  avecRemise(5, arbresDe(5).schema);
  verif("5. p", lit(arbresDe(5).schema, "R"), rouges / u.length);
  sansRemise(6, arbresDe(6).schema, "R", "B", rouges, bleues);
  vrai("6. pas indépendants", lit(arbresDe(6).schema, "R", "R") !== lit(arbresDe(6).schema, "B", "R"));
}
verif("7. p", 1 / 4, 0.25);
verif("8. p", 1 / 6, 1 / 6);

/* ═══ ★★ ═══ */
{
  const r = arbresDe(9).figure;
  avecRemise(9, r);
  verif("9. p", lit(r, "T1"), 0.8);
  vrai("9. même p au 2e tir", lit(r, "T1", "T2") === lit(r, "non T1", "T2") && lit(r, "T1", "T2") === 0.8);
}
{
  const s = 39999 / 99999;
  vrai("11 a ≈ 0,399994", Math.round(s * 1e6) === 399994);
  // Les deux `tableau(…)` de la feuille, dans l'ordre : exercice 11, puis 13.
  const [t11, t13] = appels("tableau").map((a) => a.args[1]);
  vrai("11 tableau : 0,4 et ≈ 0,399994", t11[1] === "0,4" && t11[2] === "≈ 0,399994");
  vrai("13 tableau : ≈ 0,11 et ≈ 0,0199", t13[1] === "≈ 0,11" && t13[2] === "≈ 0,0199");
}
{
  const r = arbresDe(12).schema;
  avecRemise(12, r);
  verif("12 p", lit(r, "G1"), 0.8);
}
{
  verif("13 a", 1 / 9, 0.1111111111111111);
  vrai("13 a ≈ 0,11", Math.round(100 / 9) === 11);
  verif("13 a départ", 2 / 10, 0.2);
  vrai("13 b ≈ 0,0199", Math.round((199 / 9999) * 1e4) === 199);
  verif("13 b départ", 200 / 10000, 0.02);
}
{
  const r = arbresDe(14).figure;
  vrai("14. pas indépendants : 0,6 ≠ 0,15", lit(r, "P1", "P2") === 0.6 && lit(r, "non P1", "P2") === 0.15);
}
{
  verif("16 p", 2 / 6, 1 / 3);
  dit(16, "$p = \\dfrac{2}{6} = \\dfrac{1}{3}$");
}

/* ═══ ★★★ ═══ */
{
  const r = arbresDe(17).schema;
  sansRemise(17, r, "Mauvais", "Bon", 30, 70);
  verif("17 c", 0.3 * (29 / 99), 29 / 330);
  vrai("17 c ≈ 0,088", Math.round((29 / 330) * 1000) === 88);
  verif("17 c avec remise", 0.3 * 0.3, 0.09);
}
{
  const r = arbresDe(18).schema;
  sansRemise(18, r, "D", "non D", 4, 16);
  verif("18 b", 0.2 * (3 / 19), 3 / 95);
  vrai("18 b ≈ 0,032", Math.round((3 / 95) * 1000) === 32);
  verif("18 c", 0.2 * 0.2, 0.04);
}
{
  const d = diagrammes.find((x) => x.data[0].label === "Nid chaud (%)").data;
  vrai("19 chaud 60, frais 90", d[0].value === 60 && d[1].value === 90);
}
{
  const r = arbresDe(20).schema;
  sansRemise(20, r, "As", "non As", 4, 28);
  verif("20 a", 0.125 ** 2, 0.015625);
  verif("20 b", (4 / 32) * (3 / 31), 3 / 248);
  vrai("20 b ≈ 0,012", Math.round((3 / 248) * 1000) === 12);
}

fin();
