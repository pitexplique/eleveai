// Énigmes à projeter — seconde, notion racines_denominateur (le carré de
// diagonale 1 m, le rectangle d'aire 1, la pente de la rampe, le terrain de
// 10 m², piège du conjugué, défi du nombre d'or). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

const carre = svg(
  "Un carré dont la diagonale mesure 1 mètre",
  r(140, 50, 200, 200, C.bleu, 0.12, 3) + l(140, 250, 340, 50, C.jaune, 4) + t(272, 172, "1 m", C.jaune, 24) + t(240, 280, "côté c", C.craie, 22) +
    t(150, 345, "c =", C.craie, 30, "end") + svgFrac(200, 335, 1, "√2", C.bleu, 30) + t(250, 345, `= ${NB}?`, C.rose, 30, "start")
);

const rectangle = svg(
  "Un rectangle de côtés racine de 5 moins 2 et racine de 5 plus 2",
  r(130, 120, 300, 60, C.jaune, 0.2, 3) + t(280, 105, "√5 + 2", C.craie, 24) + t(120, 158, "√5 − 2", C.craie, 22, "end") +
    t(240, 290, "(a − b)(a + b) = a² − b²", C.pale, 22) + t(240, 360, `aire${NB}?`, C.rose, 30)
);

const rampe = svg(
  "Une rampe : 1 sur racine de 3 moins 1, à rendre sans racine au dénominateur",
  p("M60 260 L420 260 L420 120 Z", C.bleu, 3, 0.12) + svgFrac(240, 330, 1, "√3 − 1", C.craie, 30) + t(320, 340, `= ${NB}?`, C.rose, 30, "start")
);

const terrain = svg(
  "Un terrain rectangulaire d'aire 10 mètres carrés et de largeur racine de 5 mètres",
  r(80, 80, 320, 140, C.jaune, 0.15, 3) + t(240, 160, "10 m²", C.craie, 30) + t(76, 158, "√5 m", C.craie, 22, "end") +
    t(240, 255, "longueur L", C.craie, 22) + t(240, 330, `L = a√5${NB}: a${NB}?`, C.rose, 28)
);

const conjugue = svg(
  "Au tableau : 1 sur 1 plus racine de 2, on multiplie en haut et en bas par 1 plus racine de 2",
  svgFrac(110, 140, 1, "1 + √2", C.craie, 30) + t(180, 150, "=", C.craie, 30) + svgFrac(310, 140, "1 + √2", "(1 + √2)²", C.craie, 28) +
    t(240, 280, "plus de racine en bas", C.craie, 22) + t(240, 330, `ça marche${NB}?`, C.rose, 30)
);

// Le rectangle d'or : rapport φ.
const or = svg(
  "Un rectangle d'or, découpé en un carré et un plus petit rectangle d'or",
  r(60, 60, 360, 222, C.jaune, 0.12, 3) + l(282, 60, 282, 282, C.jaune, 3) + p("M282 282 A222 222 0 0 1 60 60", C.bleu, 3) +
    t(240, 320, "φ = (1 + √5) ÷ 2 ≈ 1,618", C.craie, 22) + t(240, 375, `1 ÷ φ − φ${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "racines_denominateur",
  titre: "Énigmes des racines au dénominateur",
  description: "Le carré de diagonale 1 m, le rectangle d'aire 1, la pente de la rampe, le terrain de 10 m², le piège du conjugué, le défi du nombre d'or : rendre rationnel un dénominateur, expression conjuguée.",
  problemes: [
    {
      tag: "Énigme 1 · Le carré",
      titre: "Diagonale de 1 m",
      question: `Un carré a une diagonale de <b>1 m</b>. Son côté vaut ${frac(1, "√2")} m.<br><br><b>Comment l'écrire</b> sans racine au dénominateur ?`,
      reponse: `On multiplie en haut et en bas par √2 : ${frac("1 × √2", "√2 × √2")} = ${frac("√2", 2)}.<br>Côté : <span class="big">${frac("√2", 2)} m</span>, environ 0,707 m.`,
      consigne: "Écrire 1/√2 sans racine au dénominateur.",
      verification: { type: "qcm", choix: ["√2/2", "√2", "2√2"], bonne: 0 },
      dessin: carre,
    },
    {
      tag: "Énigme 2 · Le rectangle",
      titre: "L'expression conjuguée",
      question: `Un rectangle a pour côtés <b>√5 − 2</b> et <b>√5 + 2</b>.<br><br><b>Quelle est son aire</b> ?`,
      reponse: `(√5 − 2)(√5 + 2) = (√5)² − 2² = 5 − 4 = <span class="big">1</span>.<br>Deux nombres conjugués : leur produit n'a plus de racine.`,
      consigne: "Que vaut (√5 − 2)(√5 + 2) ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: rectangle,
    },
    {
      tag: "Énigme 3 · La rampe",
      titre: "Multiplier par le conjugué",
      question: `La pente d'une rampe vaut ${frac(1, "√3 − 1")}.<br><br><b>Comment l'écrire</b> sans racine au dénominateur ?`,
      reponse: `On multiplie en haut et en bas par le conjugué √3 + 1 :<br>(√3 − 1)(√3 + 1) = 3 − 1 = 2. Donc ${frac(1, "√3 − 1")} = <span class="big">${frac("√3 + 1", 2)}</span> ≈ 1,37.`,
      consigne: "Écrire 1/(√3 − 1) sans racine au dénominateur.",
      verification: { type: "qcm", choix: ["√3 + 1", "(√3 + 1)/2", "(√3 − 1)/2"], bonne: 1 },
      dessin: rampe,
    },
    {
      tag: "Énigme 4 · Le terrain",
      titre: "Simplifier 10 ÷ √5",
      question: `Un terrain rectangulaire a une aire de <b>10 m²</b> et une largeur de <b>√5 m</b>.<br>Sa longueur s'écrit a√5 m.<br><br><b>Que vaut a</b> ?`,
      reponse: `L = ${frac(10, "√5")} = ${frac("10√5", 5)} = 2√5.<br>Donc <span class="big">a = 2</span>. Vérification : √5 × 2√5 = 2 × 5 = 10.`,
      consigne: "10/√5 = a√5 : que vaut a ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: terrain,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le mauvais conjugué",
      sorte: "piege",
      question: `Pour ${frac(1, "1 + √2")}, Léa multiplie en haut et en bas par <b>1 + √2</b>. En bas : (1 + √2)² = 3 + 2√2. Il reste une racine !<br><br><b>Que vaut</b> ${frac(1, "1 + √2")} sans racine en bas ?`,
      reponse: `Il fallait le <b>conjugué</b> √2 − 1 : (√2 + 1)(√2 − 1) = 2 − 1 = 1.<br>Donc ${frac(1, "1 + √2")} = <span class="big">√2 − 1</span> ≈ 0,414.`,
      consigne: "Écrire 1/(1 + √2) sans racine au dénominateur.",
      verification: { type: "qcm", choix: ["1 + √2", "(1 + √2)/3", "√2 − 1"], bonne: 2 },
      dessin: conjugue,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre d'or",
      sorte: "defi",
      question: `Le nombre d'or φ = ${frac("1 + √5", 2)} ≈ 1,618 se cache dans les façades et les tournesols.<br><br><b>Que vaut exactement</b> ${frac(1, "φ")} − φ ?`,
      reponse: `${frac(1, "φ")} = ${frac(2, "1 + √5")} = ${frac("2(√5 − 1)", "5 − 1")} = ${frac("√5 − 1", 2)} ≈ 0,618.<br>${frac("√5 − 1", 2)} − ${frac("1 + √5", 2)} = ${frac("−2", 2)} = <span class="big">−1</span>.`,
      consigne: "φ = (1 + √5)/2. Que vaut exactement 1/φ − φ ?",
      verification: { type: "courte", attendus: ["−1", "-1"] },
      dessin: or,
    },
  ],
};

export default problemes;
