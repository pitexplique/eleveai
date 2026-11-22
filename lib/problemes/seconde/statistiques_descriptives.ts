// Énigmes à projeter — seconde, notion statistiques_descriptives (la moyenne
// à coefficients, la recharge des téléphones, l'écart interquartile des SMS,
// les deux archers, piège de la moyenne des deux classes, défi des quatre
// nombres mystère). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

const bulletin = svg(
  "Trois notes avec coefficients : 12 coefficient 2, 16 coefficient 3, 9 coefficient 1",
  r(80, 60, 320, 210, C.craie, 0.05, 3, 10) + l(80, 110, 400, 110, C.craie, 2) + l(240, 60, 240, 270, C.craie, 2) +
    t(160, 95, "note", C.pale, 22) + t(320, 95, "coef", C.pale, 22) +
    [[12, 2], [16, 3], [9, 1]].map(([n, c], k) => t(160, 155 + 50 * k, n, C.craie, 28) + t(320, 155 + 50 * k, c, C.bleu, 28)).join("") +
    t(240, 350, `moyenne${NB}?`, C.rose, 30)
);

const recharge = svg(
  "Neuf durées de recharge en minutes, rangées dans l'ordre",
  [25, 8, 45, 12, 15, 5, 30, 20, 12].map((v, k) => r(30 + 47 * k, 120, 40, 60, C.bleu, 0.15, 2, 6) + t(50 + 47 * k, 160, v, C.craie, 20)).join("") +
    t(240, 90, "durées de recharge (min)", C.pale, 20) + t(240, 290, `médiane${NB}?`, C.rose, 30)
);

const sms = svg(
  "Douze nombres de SMS envoyés dans la journée, rangés dans l'ordre",
  [2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 15, 20].map((v, k) => r(24 + 37 * k, 140, 32, 50, k === 2 || k === 8 ? C.jaune : C.pale, k === 2 || k === 8 ? 0.4 : 0.12, 2, 5) + t(40 + 37 * k, 173, v, C.craie, 18)).join("") +
    t(240, 110, "SMS par jour, 12 élèves", C.pale, 20) + t(240, 290, `écart interquartile${NB}?`, C.rose, 28)
);

// Deux cibles : Alice serrée, Bilal dispersé.
const cible = (cx: number, pts: [number, number][], c: string, nom: string) =>
  o(cx, 180, 90, C.craie, 0, 2) + o(cx, 180, 60, C.craie, 0, 2) + o(cx, 180, 30, C.craie, 0, 2) +
  pts.map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${180 + dy}" r="7" fill="${c}"/>`).join("") + t(cx, 300, nom, c, 24);
const archers = svg(
  "Deux cibles : les flèches d'Alice sont groupées, celles de Bilal sont éparpillées",
  cible(130, [[-12, 5], [8, -10], [3, 14], [-5, -6], [14, 6]], C.bleu, "Alice") + cible(350, [[-60, 20], [55, -40], [10, 60], [-40, -55], [62, 30]], C.jaune, "Bilal") +
    t(240, 360, `le plus régulier${NB}?`, C.rose, 26)
);

const piege = svg(
  "Deux classes : 20 élèves de moyenne 12, et 30 élèves de moyenne 10",
  r(50, 90, 170, 150, C.bleu, 0.15, 3, 10) + t(135, 140, "20 élèves", C.craie, 24) + t(135, 195, "moy. 12", C.bleu, 28) +
    r(260, 90, 170, 150, C.jaune, 0.15, 3, 10) + t(345, 140, "30 élèves", C.craie, 24) + t(345, 195, "moy. 10", C.jaune, 28) + t(240, 320, `moyenne des 50${NB}?`, C.rose, 28)
);

const mystere = svg(
  "Quatre nombres cachés : moyenne 5, médiane 4, un seul mode qui vaut 3",
  [0, 1, 2, 3].map((k) => r(60 + 95 * k, 90, 75, 75, C.bleu, 0.15, 3, 10) + t(97 + 95 * k, 140, "?", C.rose, 34)).join("") +
    t(240, 230, "moyenne 5 · médiane 4", C.craie, 24) + t(240, 270, "mode 3, et lui seul", C.craie, 24) + t(240, 350, `le plus grand${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "statistiques_descriptives",
  titre: "Énigmes de statistiques",
  description: "La moyenne à coefficients, la recharge des téléphones, l'écart interquartile des SMS, les deux archers, le piège de la moyenne de deux classes, le défi des quatre nombres mystère : moyenne pondérée, médiane, quartiles, dispersion.",
  problemes: [
    {
      tag: "Énigme 1 · Les coefficients",
      titre: "La moyenne du bulletin",
      question: `Inès a eu <b>12</b> (coefficient 2), <b>16</b> (coefficient 3) et <b>9</b> (coefficient 1).<br><br><b>Quelle est sa moyenne</b> ?`,
      reponse: `(12 × 2 + 16 × 3 + 9 × 1) ÷ (2 + 3 + 1) = (24 + 48 + 9) ÷ 6 = 81 ÷ 6.<br>Moyenne : <span class="big">13,5</span>.`,
      consigne: "Quelle est la moyenne pondérée ?",
      verification: { type: "courte", attendus: ["13,5", "13.5"] },
      dessin: bulletin,
    },
    {
      tag: "Énigme 2 · La recharge",
      titre: "Neuf téléphones",
      question: `Durées de recharge de 9 téléphones, en minutes :<br>25 ; 8 ; 45 ; 12 ; 15 ; 5 ; 30 ; 20 ; 12.<br><br><b>Quelle est la médiane</b> ?`,
      reponse: `On range d'abord : 5 ; 8 ; 12 ; 12 ; <b>15</b> ; 20 ; 25 ; 30 ; 45.<br>9 valeurs : la médiane est la 5e, <span class="big">15 min</span>. Autant de valeurs au-dessous qu'au-dessus.`,
      consigne: "Quelle est la médiane des 9 durées ?",
      verification: { type: "courte", attendus: ["15"], unite: "min" },
      dessin: recharge,
    },
    {
      tag: "Énigme 3 · Les SMS",
      titre: "L'écart interquartile",
      question: `Nombre de SMS envoyés par 12 élèves, rangés :<br>2 ; 3 ; 5 ; 6 ; 7 ; 8 ; 9 ; 10 ; 12 ; 13 ; 15 ; 20.<br><br><b>Quel est l'écart interquartile</b> Q3 − Q1 ?`,
      reponse: `Q1 : le quart de 12 vaut 3, c'est la 3e valeur, 5.<br>Q3 : les trois quarts de 12 valent 9, c'est la 9e valeur, 12.<br>Q3 − Q1 = 12 − 5 = <span class="big">7</span>.`,
      consigne: "Quel est l'écart interquartile Q3 − Q1 ?",
      verification: { type: "qcm", choix: ["18", "8", "7"], bonne: 2 },
      dessin: sms,
    },
    {
      tag: "Énigme 4 · Les archers",
      titre: "Le plus régulier",
      question: `Scores de deux archers sur 5 flèches :<br>Alice : 8 ; 9 ; 10 ; 11 ; 12. Bilal : 6 ; 6 ; 10 ; 14 ; 14.<br>Même moyenne, 10.<br><br><b>Qui a le plus petit écart-type</b> ?`,
      reponse: `L'écart-type mesure l'écart moyen à la moyenne.<br>Alice s'écarte de 10 de 2 au plus ; Bilal de 4 souvent.<br><span class="big">Alice</span> : ses scores sont plus serrés autour de 10.`,
      consigne: "Qui a le plus petit écart-type ?",
      verification: { type: "qcm", choix: ["Alice", "Bilal", "Ils sont pareils"], bonne: 0 },
      dessin: archers,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux classes",
      sorte: "piege",
      question: `Une classe de <b>20</b> élèves a <b>12</b> de moyenne ; une classe de <b>30</b> élèves a <b>10</b>.<br><br><b>Quelle est la moyenne</b> des 50 élèves ?<br>A. 11 B. 10,8 C. 22`,
      reponse: `Pas 11 : les classes n'ont pas le même effectif !<br>Total des notes : 20 × 12 + 30 × 10 = 240 + 300 = 540. Moyenne : 540 ÷ 50 = <span class="big">10,8</span>.`,
      consigne: "Quelle est la moyenne des 50 élèves ?",
      verification: { type: "qcm", choix: ["11", "10,8", "22"], bonne: 1 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Quatre nombres mystère",
      sorte: "defi",
      question: `Quatre nombres entiers ont pour <b>moyenne 5</b> et pour <b>médiane 4</b>. Le nombre le plus fréquent est <b>3</b>, et lui seul.<br><br><b>Quel est le plus grand</b> des quatre ?`,
      reponse: `Rangés a ≤ b ≤ c ≤ d. Le 3 doit apparaître deux fois, et la médiane (b + c) ÷ 2 = 4 interdit c = 3 : donc a = b = 3, puis c = 5.<br>La somme vaut 4 × 5 = 20 : d = 20 − 3 − 3 − 5 = <span class="big">9</span>.<br>Les nombres : 3 ; 3 ; 5 ; 9.`,
      consigne: "Quel est le plus grand des quatre nombres ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: mystere,
    },
  ],
};

export default problemes;
