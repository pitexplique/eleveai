// Énigmes à projeter — première spé maths, notion second_degre
// (la bâche du stand du marché, la plaque du plaquiste, la fabrique de
// casquettes, l'atelier de ukulélés, piège de la catapulte du château,
// défi de la règle posée sur la parabole). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const bache = svg("La bâche rectangulaire du stand : une largeur de x mètres, une longueur de x + 2 mètres, une aire de 48 mètres carrés",
  r(90, 80, 300, 220, C.bleu, 0.15, 4, 4) + l(90, 80, 240, 40, C.bleu, 3) + l(390, 80, 240, 40, C.bleu, 3) +
    t(240, 200, "aire : 48 m²", C.craie, 28) + t(240, 330, "x + 2", C.bleu, 26) + t(75, 198, "x", C.bleu, 26, "end") +
    t(240, 395, `x =${NB}?`, C.rose, 30));

const plaque = svg("La plaque de plâtre rectangulaire : son périmètre vaut 34 décimètres et son aire 72 décimètres carrés ; ses côtés sont inconnus",
  r(100, 70, 280, 210, C.craie, 0.08, 4, 2) +
    t(240, 160, "périmètre : 34 dm", C.craie, 26) + t(240, 210, "aire : 72 dm²", C.craie, 26) +
    t(240, 315, "? dm", C.bleu, 24) + t(85, 182, "? dm", C.bleu, 24, "end") +
    t(240, 395, `les deux côtés${NB}?`, C.rose, 28));

const casquettes = (() => {
  const R = repereXY(0, 30, 0, 450, { gx: 80, gy: 40, gl: 360, gh: 270, px: 5, py: 50, ex: 5, ey: 100 });
  return svg("Le bénéfice de la fabrique de casquettes, B(x) = −2x² + 60x − 50 en centaines d'euros, selon le prix de vente x : une parabole tournée vers le bas",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => -2 * x * x + 60 * x - 50, 0.9, 29.1, C.bleu, 4) +
      t(260, 30, "B(x) = −2x² + 60x − 50", C.bleu, 22) +
      t(240, 400, `B maximal pour x =${NB}?`, C.rose, 26));
})();

const ukuleles = (() => {
  const R = repereXY(0, 12, -20, 20, { gx: 80, gy: 50, gl: 360, gh: 280, px: 1, py: 5, ex: 4, ey: 10 });
  return svg("Le bénéfice de l'atelier de ukulélés, B(x) = −x² + 12x − 20 : la parabole coupe l'axe en 2 et en 10",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => -x * x + 12 * x - 20, 0, 12, C.bleu, 4) +
      t(260, 40, "B(x) = −x² + 12x − 20", C.bleu, 22) +
      t(240, 405, `B(x) > 0 pour x dans${NB}?`, C.rose, 24));
})();

const catapulte = (() => {
  const R = repereXY(0, 4, 0, 30, { gx: 80, gy: 50, gl: 340, gh: 280, px: 0.5, py: 5, ex: 1, ey: 5 });
  return svg("La pierre de la catapulte : hauteur h(t) = −5t² + 20t + 1 ; le sommet est à 21 mètres, sous la ligne pointillée des 25 mètres du rempart",
    R.fond.replace(">0</text>", "></text>") + l(R.X(0), R.Y(25), R.X(4), R.Y(25), C.rose, 3, "10 8") +
      R.courbe((x) => -5 * x * x + 20 * x + 1, 0, 4.04, C.bleu, 4) +
      t(R.X(4) - 4, R.Y(25) - 8, "rempart : 25 m", C.rose, 20, "end") + t(250, 32, "h(t) = −5t² + 20t + 1", C.bleu, 22) +
      t(240, 400, `h(t) = 25 : quand${NB}?`, C.rose, 26));
})();

const regle = (() => {
  const R = repereXY(-2, 3, -2, 5, { gx: 90, gy: 40, gl: 320, gh: 300, px: 1, py: 1 });
  return svg("La parabole y = x² et une règle posée selon la droite y = 2x − c ; pour une valeur de c, la règle ne touche la parabole qu'en un point",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x * x, -2.2, 2.2, C.bleu, 4) +
      R.courbe((x) => 2 * x - 1, -0.5, 3, C.jaune, 4) +
      t(R.X(-1.75), R.Y(4.6), "y = x²", C.bleu, 22, "start") + t(R.X(1.55), R.Y(-1.4), "y = 2x − c", C.jaune, 22, "start") +
      t(240, 405, `un seul point commun : c =${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "second_degre",
  titre: "Énigmes du second degré",
  description: "La bâche du stand du marché, la plaque du plaquiste, la fabrique de casquettes, l'atelier de ukulélés, le piège de la catapulte, le défi de la règle sur la parabole : discriminant, somme et produit, sommet, signe d'un trinôme.",
  problemes: [
    {
      tag: "Énigme 1 · La bâche du stand",
      titre: "Résoudre une équation du second degré",
      question: `La bâche d'un stand du marché est un rectangle. Sa longueur mesure 2 m de plus que sa largeur x, et son aire vaut 48 m².<br><br><b>Combien mesure sa largeur x</b> ?`,
      reponse: `x(x + 2) = 48, soit x² + 2x − 48 = 0. Δ = 2² − 4 × 1 × (−48) = 4 + 192 = 196 = 14².<br>x = ${frac("−2 + 14", 2)} = 6 ou x = ${frac("−2 − 14", 2)} = −8 (impossible). Largeur : <span class="big">6 m</span> (et 8 m de long).`,
      consigne: "x(x + 2) = 48 avec x > 0 : que vaut x ?",
      verification: { type: "courte", attendus: ["6"], unite: "m" },
      dessin: bache,
    },
    {
      tag: "Énigme 2 · La plaque du plaquiste",
      titre: "Somme et produit des racines",
      question: `Un plaquiste découpe une plaque de plâtre rectangulaire de périmètre 34 dm et d'aire 72 dm².<br><br><b>Quelles sont ses dimensions</b> ?`,
      reponse: `Les côtés ont pour somme 17 et pour produit 72 : ce sont les racines de X² − 17X + 72 = 0.<br>Δ = 289 − 288 = 1, donc X = ${frac("17 ± 1", 2)} : <span class="big">8 dm et 9 dm</span>.`,
      consigne: "Rectangle de périmètre 34 dm et d'aire 72 dm² : ses côtés ?",
      verification: { type: "qcm", choix: ["8 dm et 9 dm", "6 dm et 12 dm", "4 dm et 18 dm"], bonne: 0 },
      dessin: plaque,
    },
    {
      tag: "Énigme 3 · La fabrique de casquettes",
      titre: "Le sommet d'une parabole",
      question: `Une fabrique de casquettes vend chaque casquette x €. Son bénéfice, en centaines d'euros, vaut B(x) = −2x² + 60x − 50.<br><br><b>À quel prix x le bénéfice est-il maximal</b> ?`,
      reponse: `a = −2 &lt; 0 : la parabole est tournée vers le bas, son sommet est un maximum. α = −${frac("b", "2a")} = −${frac(60, "−4")} = 15.<br>Prix : <span class="big">15 €</span>, pour un bénéfice B(15) = −450 + 900 − 50 = 400, soit 40 000 €.`,
      consigne: "B(x) = −2x² + 60x − 50 : pour quel x B est-il maximal ?",
      verification: { type: "courte", attendus: ["15"], unite: "€" },
      dessin: casquettes,
    },
    {
      tag: "Énigme 4 · L'atelier de ukulélés",
      titre: "Le signe d'un trinôme",
      question: `Un atelier fabrique x ukulélés par semaine. Son bénéfice, en centaines d'euros, vaut B(x) = −x² + 12x − 20.<br><br><b>Pour quelles valeurs de x l'atelier gagne-t-il de l'argent</b> (B(x) > 0) ?`,
      reponse: `B(x) = −(x − 2)(x − 10) : les racines sont 2 et 10 (2 + 10 = 12, 2 × 10 = 20).<br>a = −1 &lt; 0 : le trinôme est positif entre les racines. B(x) > 0 pour x dans <span class="big">]2 ; 10[</span>.`,
      consigne: "B(x) = −x² + 12x − 20 : pour quels x a-t-on B(x) > 0 ?",
      verification: { type: "qcm", choix: ["]−∞ ; 2[ ∪ ]10 ; +∞[", "]2 ; 10[", "[0 ; 12]"], bonne: 1 },
      dessin: ukuleles,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La catapulte du château",
      sorte: "piege",
      question: `Lors d'une fête médiévale, une catapulte lance une pierre en mousse. Sa hauteur, en mètres, au bout de t secondes vaut h(t) = −5t² + 20t + 1.<br>Le rempart mesure 25 m. Léo : « La pierre passe à 25 m de haut à t = 2 s. »<br><br><b>Quand la pierre atteint-elle 25 m</b> ?`,
      reponse: `h(t) = 25 ⟺ −5t² + 20t − 24 = 0. Δ = 20² − 4 × (−5) × (−24) = 400 − 480 = −80 &lt; 0 : aucune solution.<br><span class="big">Jamais</span> : le sommet est h(2) = −20 + 40 + 1 = 21 m, sous le rempart.`,
      consigne: "h(t) = −5t² + 20t + 1 : quand la pierre atteint-elle 25 m ?",
      verification: { type: "qcm", choix: ["à t = 2 s", "deux fois", "jamais"], bonne: 2 },
      dessin: catapulte,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La règle sur la parabole",
      sorte: "defi",
      question: `Au tableau, la parabole y = x². On pose une règle le long de la droite y = 2x − c.<br><br><b>Pour quelle valeur de c</b> la règle touche-t-elle la parabole en un seul point ?`,
      reponse: `x² = 2x − c ⟺ x² − 2x + c = 0. Un seul point commun quand Δ = 4 − 4c = 0.<br>Donc <span class="big">c = 1</span> : la règle touche la parabole en (1 ; 1), c'est la tangente.`,
      consigne: "Pour quel c la droite y = 2x − c touche-t-elle y = x² en un seul point ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: regle,
    },
  ],
};

export default problemes;
