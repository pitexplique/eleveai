// Énigmes à projeter — CM2, notion calcul (le ticket de caisse, la monnaie
// rendue, 4 × 99 par 4 × 100 − 4, × 100 par la valeur des chiffres, le piège
// 5,3 + 2,7 = 7,10, le défi des trois nombres qui se suivent). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const ticket = svg(
  "Un ticket de caisse : pain 1,20 €, fromage 3,45 €, pommes 2,35 €",
  r(120, 40, 240, 320, C.craie, 0.04, 3, 4) + t(240, 80, "SUPÉRETTE", C.pale, 22) +
    [["pain 🥖", "1,20 €"], ["fromage 🧀", "3,45 €"], ["pommes 🍎", "2,35 €"]].map(([a, b], i) => t(140, 140 + i * 50, a, C.craie, 22, "start") + t(340, 140 + i * 50, b, C.craie, 22, "end")).join("") +
    l(140, 270, 340, 270, C.pale, 2, "6 5") + t(140, 310, "TOTAL", C.rose, 24, "start") + t(340, 310, "? €", C.rose, 26, "end")
);

const monnaie = svg(
  "Un livre à 6,75 € et un billet de 10 €",
  r(60, 90, 140, 190, C.bleu, 0.2, 4, 6) + t(130, 200, "📘", C.craie, 60) + t(130, 320, "6,75 €", C.craie, 30) +
    r(260, 140, 170, 90, C.jaune, 0.25, 4, 6) + t(345, 200, "10 €", C.craie, 38) + t(240, 390, `Combien te rend-on${NB}?`, C.rose, 26)
);

const cartes = svg(
  "Quatre cartes de jeu qui valent chacune 99 points",
  [0, 1, 2, 3].map((i) => r(30 + i * 110, 100, 90, 130, C.rose, 0.12, 4, 10) + t(75 + i * 110, 180, "99", C.craie, 36)).join("") +
    t(240, 300, "astuce : 99 = 100 − 1", C.pale, 24) + t(240, 360, `total${NB}?`, C.rose, 30)
);

const gommes = svg(
  "Une gomme de 12,5 g, et une boîte de 100 gommes",
  r(60, 140, 100, 60, C.rose, 0.3, 4, 10) + t(110, 240, "12,5 g", C.craie, 28) +
    r(240, 90, 200, 160, C.jaune, 0.15, 4, 8) + t(340, 185, "× 100", C.craie, 36) + t(340, 290, `? g`, C.rose, 32) +
    t(240, 370, "chaque chiffre prend 100 fois plus de valeur", C.pale, 18)
);

// Deux planches bout à bout : 1 m = 50 px (5,3 m = 265 px, 2,7 m = 135 px).
const planches = svg(
  "Deux planches bout à bout : 5,3 m et 2,7 m, au bon rapport",
  r(40, 160, 265, 40, C.jaune, 0.35, 3) + r(305, 160, 135, 40, C.bleu, 0.35, 3) +
    t(172, 145, "5,3 m", C.craie, 26) + t(372, 145, "2,7 m", C.craie, 26) +
    t(240, 290, "5,3 + 2,7 = 7,10", C.rose, 36) + t(240, 340, "dit Tom", C.pale, 22)
);

const suivis = svg(
  "Trois cases qui se suivent, leur somme vaut 72",
  [0, 1, 2].map((i) => r(70 + i * 120, 110, 100, 100, [C.bleu, C.jaune, C.rose][i], 0.15, 4, 12) + t(120 + i * 120, 180, "?", C.craie, 50)).join("") +
    t(180, 260, "+ 1", C.pale, 22) + t(300, 260, "+ 1", C.pale, 22) + t(240, 340, "somme = 72", C.craie, 34)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "calcul",
  titre: "Énigmes de calcul",
  description: "Le ticket de caisse, la monnaie du livre, 4 cartes à 99 points, 100 gommes, le piège des planches de Tom, le défi des trois nombres qui se suivent.",
  problemes: [
    {
      tag: "Énigme 1 · À la supérette",
      titre: "Le ticket de caisse",
      question: `Inès achète un pain à <b>1,20 €</b>, un fromage à <b>3,45 €</b> et des pommes à <b>2,35 €</b>.<br><br><b>Combien paie-t-elle</b> ?`,
      reponse: `On regroupe : 3,45 + 2,35 = 5,80.<br>5,80 + 1,20 = <span class="big">7 €</span>.`,
      consigne: "Combien paie Inès, en euros ?",
      verification: { type: "courte", attendus: ["7", "7,00", "7.00", "7,0"], unite: "€" },
      dessin: ticket,
    },
    {
      tag: "Énigme 2 · À la librairie",
      titre: "La monnaie",
      question: `Un livre coûte <b>6,75 €</b>.<br>Tu paies avec un billet de <b>10 €</b>.<br><br><b>Combien te rend-on</b> ?`,
      reponse: `On complète : 6,75 + 0,25 = 7, puis 7 + 3 = 10.<br>0,25 + 3 = <span class="big">3,25 €</span>.`,
      consigne: "Combien te rend-on ?",
      verification: { type: "qcm", choix: ["3,25 €", "4,25 €", "3,35 €"], bonne: 0 },
      dessin: monnaie,
    },
    {
      tag: "Énigme 3 · Le jeu de cartes",
      titre: "Quatre cartes à 99",
      question: `Tu as <b>4 cartes</b>. Chaque carte vaut <b>99 points</b>.<br><br>Calcule <b>de tête</b> : combien de points en tout ?`,
      reponse: `99, c'est 100 − 1.<br>4 × 100 = 400, puis 400 − 4 = <span class="big">396 points</span>.`,
      consigne: "Combien de points en tout ?",
      verification: { type: "courte", attendus: ["396"], unite: "points" },
      dessin: cartes,
    },
    {
      tag: "Énigme 4 · À la papeterie",
      titre: "La boîte de 100 gommes",
      question: `Une gomme pèse <b>12,5 g</b>.<br><br>Combien pèse une boîte de <b>100 gommes</b> ?<br>(On oublie le carton.)`,
      reponse: `× 100 : chaque chiffre prend une valeur 100 fois plus grande.<br>Le 5 des dixièmes devient 5 dizaines.<br>12,5 × 100 = <span class="big">1 250 g</span>.`,
      consigne: "Combien pèsent 100 gommes, en grammes ?",
      verification: { type: "courte", attendus: ["1250"], unite: "g" },
      dessin: gommes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les planches de Tom",
      sorte: "piege",
      question: `Tom met deux planches bout à bout : <b>5,3 m</b> et <b>2,7 m</b>.<br>Il écrit : 5,3 + 2,7 = 7,10.<br><br><b>Quelle est la vraie longueur</b> ?`,
      reponse: `3 dixièmes + 7 dixièmes = 10 dixièmes = 1 unité !<br>5 + 2 + 1 = 8.<br>La longueur est <span class="big">8 m</span>.`,
      consigne: "Quelle est la longueur des deux planches ?",
      verification: { type: "qcm", choix: ["8 m", "7,10 m", "7,1 m"], bonne: 0 },
      dessin: planches,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Trois nombres qui se suivent",
      sorte: "defi",
      question: `Trois nombres entiers <b>se suivent</b>.<br>Leur somme est <b>72</b>.<br><br>Quel est le <b>plus grand</b> des trois ?`,
      reponse: `Le nombre du milieu : 72 ÷ 3 = 24.<br>Les trois nombres sont 23, 24, 25.<br>Le plus grand est <span class="big">25</span>.`,
      consigne: "Quel est le plus grand des trois nombres ?",
      verification: { type: "courte", attendus: ["25"] },
      dessin: suivis,
    },
  ],
};

export default problemes;
