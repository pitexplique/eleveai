// Énigmes à projeter — seconde, notion systemes_determinant (cafés et
// croissants, le déterminant du marché, la formule de Cramer, le caissier qui
// s'est trompé, piège du déterminant nul, défi du paramètre m). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p } from "../dessins-ecole";
import { repere, systeme } from "../dessins-2de";

// Une tasse et un croissant.
const tasse = (x: number, y: number) => r(x, y, 50, 46, C.jaune, 0.3, 3, 6) + p(`M${x + 50} ${y + 10} q20 0 20 14 q0 14 -20 14`, C.jaune, 3);
const croissant = (x: number, y: number) => p(`M${x} ${y + 40} q35 -55 70 0 q-35 -22 -70 0 Z`, C.jaune, 3, 0.45);
const cafe = svg(
  "Commande 1 : 2 cafés et 1 croissant pour 5,40 euros. Commande 2 : 1 café et 2 croissants pour 4,80 euros",
  tasse(40, 70) + tasse(120, 70) + croissant(210, 76) + t(400, 105, "5,40 €", C.bleu, 28) +
    tasse(40, 180) + croissant(130, 186) + croissant(215, 186) + t(400, 215, "4,80 €", C.bleu, 28) +
    t(240, 320, `le prix d'un café${NB}?`, C.rose, 28)
);

const marche = svg(
  "Le système 3x plus 2y égale 12 et x moins y égale 1, et la formule du déterminant ad moins bc",
  systeme(110, 110, "3x + 2y = 12", "x − y = 1", C.craie, 30) +
    t(240, 240, "ax + by = e", C.pale, 20) + t(240, 268, "cx + dy = f", C.pale, 20) + t(240, 310, "det = ad − bc", C.bleu, 26) + t(240, 375, `det${NB}?`, C.rose, 30)
);

const cramer = svg(
  "Le même système et la formule de Cramer : x égale e d moins b f, divisé par le déterminant",
  systeme(110, 100, "3x + 2y = 12", "x − y = 1", C.craie, 30) + t(240, 220, "det = −5", C.pale, 24) +
    t(130, 300, "x =", C.bleu, 30, "end") + t(255, 284, "ed − bf", C.bleu, 28) + p("M150 296 H360", C.bleu, 3) + t(255, 330, "det", C.bleu, 28) + t(240, 395, `x${NB}?`, C.rose, 30)
);

const paralleles = (() => {
  const R = repere(-2, 4, -3, 4, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 1 });
  return svg("Deux droites parallèles : 2x plus 3y égale 7 et 4x plus 6y égale 1",
    R.fond + R.courbe((x) => (7 - 2 * x) / 3, -2, 4, C.bleu, 4) + R.courbe((x) => (1 - 4 * x) / 6, -2, 4, C.jaune, 4) +
      t(R.X(1), R.Y(2.4), "2x + 3y = 7", C.bleu, 17, "start") + t(R.X(-1.9), R.Y(-1.3), "4x + 6y = 1", C.jaune, 17, "start") +
      t(240, 400, `combien de solutions${NB}?`, C.rose, 24));
})();

const confondues = (() => {
  const R = repere(-1, 4, -1, 3, { gl: 330, gh: 280, gy: 20, gx: 90, pasE: 1 });
  return svg("Les droites x plus 2y égale 3 et 2x plus 4y égale 6, tracées l'une sur l'autre",
    R.fond + R.courbe((x) => (3 - x) / 2, -1, 4, C.bleu, 9) + p(`M${R.X(-1)} ${R.Y(2)} L${R.X(4)} ${R.Y(-0.5)}`, C.jaune, 3).replace("/>", ` stroke-dasharray="12 10"/>`) +
      t(240, 340, "det = 1 × 4 − 2 × 2 = 0", C.craie, 22) + t(240, 395, `donc aucune solution${NB}?`, C.rose, 24));
})();

const parametre = svg(
  "Le système m x plus 2y égale 1 et 2x plus m y égale 3",
  systeme(120, 130, "mx + 2y = 1", "2x + my = 3", C.craie, 32) + t(240, 290, "pas de solution unique", C.craie, 24) + t(240, 350, `pour quelles valeurs de m${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "systemes_determinant",
  titre: "Énigmes des systèmes et du déterminant",
  description: "Cafés et croissants, le déterminant du marché, la formule de Cramer, le caissier qui s'est trompé, le piège du déterminant nul, le défi du paramètre m : systèmes de deux équations, déterminant, formules de Cramer.",
  problemes: [
    {
      tag: "Énigme 1 · Cafés et croissants",
      titre: "Deux commandes, deux inconnues",
      question: `Au café : 2 cafés et 1 croissant coûtent <b>5,40 €</b> ; 1 café et 2 croissants coûtent <b>4,80 €</b>.<br><br><b>Quel est le prix</b> d'un café ?`,
      reponse: `2c + k = 5,4 et c + 2k = 4,8. On double la 2<sup>e</sup> : 2c + 4k = 9,6. On soustrait : 3k = 4,2, k = 1,4.<br>2c = 5,4 − 1,4 = 4 : un café coûte <span class="big">2 €</span> (et un croissant 1,40 €).`,
      consigne: "Quel est le prix d'un café, en € ?",
      verification: { type: "courte", attendus: ["2"], unite: "€" },
      dessin: cafe,
    },
    {
      tag: "Énigme 2 · Le marché",
      titre: "Le déterminant",
      question: `Au marché, 3 kg de mangues et 2 kg de litchis coûtent 12 €, et le kilo de mangues coûte 1 € de plus que celui de litchis :<br>3x + 2y = 12 et x − y = 1.<br><br><b>Quel est le déterminant</b> de ce système ?`,
      reponse: `a = 3, b = 2, c = 1, d = −1.<br>det = ad − bc = 3 × (−1) − 2 × 1 = <span class="big">−5</span>. Il n'est pas nul : une seule solution.`,
      consigne: "Déterminant du système 3x + 2y = 12 et x − y = 1 ?",
      verification: { type: "courte", attendus: ["−5", "-5"] },
      dessin: marche,
    },
    {
      tag: "Énigme 3 · La formule de Cramer",
      titre: "Le prix des mangues",
      question: `Même système : 3x + 2y = 12 et x − y = 1, avec det = −5.<br><br>Avec la formule de Cramer, <b>que vaut x</b>, le prix d'un kilo de mangues ?`,
      reponse: `ed − bf = 12 × (−1) − 2 × 1 = −14.<br>x = −14 ÷ (−5) = <span class="big">2,8</span> : 2,80 € le kilo. Vérification : y = 1,8 et 3 × 2,8 + 2 × 1,8 = 12.`,
      consigne: "Que vaut x, en € ?",
      verification: { type: "courte", attendus: ["2,8", "2.8", "2,80", "14/5"], unite: "€" },
      dessin: cramer,
    },
    {
      tag: "Énigme 4 · Le caissier",
      titre: "Deux tickets incompatibles",
      question: `Ticket 1 : 2 stylos et 3 cahiers, <b>7 €</b>. Ticket 2 : 4 stylos et 6 cahiers, <b>1 €</b>.<br>2x + 3y = 7 et 4x + 6y = 1.<br><br><b>Combien de solutions</b> a ce système ?`,
      reponse: `det = 2 × 6 − 3 × 4 = 0. Et le ticket 2, c'est le ticket 1 en double : il devrait coûter 14 €, pas 1 €.<br>Droites parallèles : <span class="big">aucune solution</span>. Le caissier s'est trompé !`,
      consigne: "2x + 3y = 7 et 4x + 6y = 1 : combien de solutions ?",
      verification: { type: "qcm", choix: ["Une seule", "Aucune", "Une infinité"], bonne: 1 },
      dessin: paralleles,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Déterminant nul",
      sorte: "piege",
      question: `Système : x + 2y = 3 et 2x + 4y = 6. Son déterminant vaut 0.<br>Sam : « Donc il n'a aucune solution. »<br><br><b>Combien de solutions</b> a-t-il vraiment ?`,
      reponse: `La 2<sup>e</sup> équation, c'est la 1<sup>re</sup> multipliée par 2 : c'est la <b>même droite</b>.<br>Tous ses points conviennent : <span class="big">une infinité</span>. det = 0 veut dire « pas une seule solution » : aucune <b>ou</b> une infinité.`,
      consigne: "x + 2y = 3 et 2x + 4y = 6 : combien de solutions ?",
      verification: { type: "qcm", choix: ["Aucune", "Une seule", "Une infinité"], bonne: 2 },
      dessin: confondues,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le paramètre m",
      sorte: "defi",
      question: `Système : mx + 2y = 1 et 2x + my = 3.<br><br><b>Pour quelles valeurs de m</b> n'a-t-il pas une solution unique ?`,
      reponse: `det = m × m − 2 × 2 = m² − 4.<br>Pas de solution unique quand det = 0 : m² = 4, donc <span class="big">m = 2 ou m = −2</span>.`,
      consigne: "Pour quelles valeurs de m le système n'a-t-il pas une solution unique ?",
      verification: { type: "qcm", choix: ["m = 2 ou m = −2", "m = 4", "m = 0"], bonne: 0 },
      dessin: parametre,
    },
  ],
};

export default problemes;
