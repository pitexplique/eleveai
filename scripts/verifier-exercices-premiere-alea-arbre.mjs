// Recalcul indépendant de la feuille « Arbre pondéré : lire et construire »
// (1re, 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-arbre.tsx.
// Chaque arbre est RELU dans le source. Arbres à compléter : chaque « ? » du
// dessin de l'énoncé doit être rempli, dans l'arbre du corrigé, par 1 moins les
// autres branches du même nœud, et les nombres connus doivent être gardés.
// Arbres construits : chaque nombre de l'énoncé doit être sur la bonne branche.
// Puis règles de rendu et contrôles de texte communs.
// Usage : node scripts/verifier-exercices-premiere-alea-arbre.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, arbresDe, lit, memeArbre, fin } = creer("lib/fiches-exercices/maths-premiere-alea-arbre.tsx", "alea_arbre");

/** Toutes les branches annoncées [chemin…, valeur] sont-elles sur l'arbre ? */
const porte = (k, racine, attendus) => {
  for (const [...t] of attendus) {
    const v = t.pop();
    verif(`${k}. branche ${t.join(" → ")}`, lit(racine, ...t), v);
  }
};

/* ═══ ★ ═══ */
{
  const a = arbresDe(1).figure;
  porte(1, a, [["A", 0.7], ["non A", 0.3], ["A", "B", 0.4], ["non A", "non B", 0.1]]);
  dit(1, "$P_A(B) = 0{,}4$");
  dit(1, "$P_{\\overline{A}}(\\overline{B}) = 0{,}1$");
  dit(3, "$P_A(B)$");
}
{
  const s = memeArbre(2);
  porte(2, s, [["non A", 1 - 0.35], ["A", "non B", 1 - 0.2], ["non A", "B", 1 - 0.45]]);
  dit(2, "= 0{,}65$");
  dit(2, "= 0{,}8$");
  dit(2, "= 0{,}55$");
}
porte(4, arbresDe(4).schema, [["R", 0.25], ["R", "S", 0.8], ["non R", "S", 0.1], ["non R", 0.75]]);
{
  const f = arbresDe(5).figure;
  verif("5. vert = 1 − 0,5 − 0,3", 1 - lit(f, "Rouge") - lit(f, "Bleu"), 0.2);
  verif("5. rouge non G", 1 - lit(f, "Rouge", "G"), 0.9);
  verif("5. bleu G", 1 - lit(f, "Bleu", "non G"), 0.4);
  verif("5. vert non G", 1 - lit(f, "Vert", "G"), 0.3);
  dit(5, "= 0{,}2$");
  dit(5, "= 0{,}9$");
  dit(5, "= 0{,}4$");
  dit(5, "= 0{,}3$");
}
{
  const f = arbresDe(6).figure;
  porte(6, f, [["P", "R", 0.3], ["non P", "non R", 0.95]]);
  dit(6, "$P_P(R) = 0{,}3$");
}
porte(7, arbresDe(7).schema, [["F", 0.4], ["F", "M", 0.15], ["non F", "M", 0.25], ["non F", 0.6]]);
{
  const s = arbresDe(8).schema;
  porte(8, s, [["A", 0.3], ["A", "B", 0.4], ["non A", "B", 0.2]]);
  verif("8. l'erreur de Léa : 0,3 + 0,6", 0.3 + 0.6, 0.9);
  dit(8, "$0{,}3 + 0{,}6 = 0{,}9$");
}

/* ═══ ★★ ═══ */
porte(9, arbresDe(9).schema, [["P", 0.7], ["P", "T", 0.9], ["non P", "T", 0.95], ["non P", "non T", 0.05]]);
{
  const s = arbresDe(10).schema;
  porte(10, s, [["Émis 1", 0.6], ["Émis 1", "Reçu 1", 0.95], ["Émis 0", "Reçu 0", 0.9], ["Émis 0", "Reçu 1", 0.1], ["Émis 1", "Reçu 0", 0.05]]);
}
porte(11, arbresDe(11).schema, [["Région", 0.6], ["Autre région", 0.3], ["Étranger", 0.1], ["Région", "V", 0.5], ["Autre région", "V", 0.8], ["Étranger", "V", 0.9]]);
{
  const s = memeArbre(12);
  porte(12, s, [["Loin", 0.45], ["Près", "non R", 0.1], ["Loin", "R", 0.5]]);
}
{
  const s = arbresDe(13).schema;
  porte(13, s, [["M", 0.7], ["non M", 0.3], ["non M", "G", 0.4]]);
  vrai("13. rien derrière M", !s.find((n) => n.label === "M").enfants);
}
{
  const f = arbresDe(14).figure;
  porte(14, f, [["Panier", 0.2], ["Panier", "Achat", 0.4]]);
  vrai("14. rien derrière non Panier", !f.find((n) => n.label === "non Panier").enfants);
}
porte(15, arbresDe(15).schema, [["V", 0.4], ["V", "G", 0.05], ["non V", "G", 0.2], ["non V", "non G", 0.8]]);
{
  const s = memeArbre(16);
  porte(16, s, [["Voiture", 0.6], ["Pied", "non J", 0.2], ["Vélo", "J", 0.6], ["Voiture", "non J", 0.7]]);
  const j = ["Pied", "Vélo", "Voiture"].map((m) => lit(s, m, "J"));
  vrai("16. à pied, le plus souvent la journée", j[0] === Math.max(...j));
}

/* ═══ ★★★ ═══ */
porte(17, arbresDe(17).schema, [["F", 0.9], ["F", "C", 0.95], ["non F", "C", 0.6], ["non F", 0.1]]);
porte(18, arbresDe(18).schema, [["Le Havre", 0.5], ["Brême", 0.3], ["Autre", 0.2], ["Le Havre", "E", 0.9], ["Brême", "E", 0.8], ["Autre", "E", 0.6], ["Autre", "non E", 0.4]]);
{
  const s = memeArbre(19);
  porte(19, s, [["Centre", 0.15], ["Gauche", "non A", 0.7], ["Centre", "A", 0.4], ["Droite", "non A", 0.75]]);
  const marque = ["Gauche", "Centre", "Droite"].map((c) => lit(s, c, "non A"));
  vrai("19 b. à droite le plus souvent", marque[2] === Math.max(...marque));
  vrai("19 c. le centre est le plus bas", marque[1] === Math.min(...marque));
}
{
  const s = arbresDe(20).schema;
  porte(20, s, [["Plastique", 0.6], ["Verre", 0.1], ["Autre", 0.3], ["Plastique", "R", 0.5], ["Verre", "R", 0.9], ["Autre", "R", 0.2]]);
  const r = ["Plastique", "Verre", "Autre"].map((c) => lit(s, c, "R"));
  vrai("20 c. verre le mieux recyclable", r[1] === Math.max(...r));
}

fin();
