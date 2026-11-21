// Énigmes à projeter — CE1, notion trier et classer (l'intrus du panier,
// les animaux qui volent, ranger les nombres, les grands ronds, le piège des
// deux intrus possibles, le défi du nombre mystère). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, p } from "../dessins-ecole";

const panier = svg(
  "Un panier : une pomme, une banane, une carotte, une poire",
  ["🍎", "🍌", "🥕", "🍐"].map((e, i) => t(90 + i * 100, 190, e, C.craie, 66)).join("") +
    p("M50 220 L430 220 L400 300 L80 300 Z", C.jaune, 4, 0.25) +
    t(240, 375, `Quel est l'intrus${NB}?`, C.rose, 30)
);

const animaux = svg(
  "Des animaux : un oiseau, un chat, un papillon, un chien, une abeille, un poisson",
  ["🐦", "🐈", "🦋", "🐕", "🐝", "🐟"].map((e, i) => t(100 + (i % 3) * 140, 130 + Math.floor(i / 3) * 120, e, C.craie, 70)).join("") +
    t(240, 370, `Combien d'animaux volent${NB}?`, C.rose, 30)
);

const nombres = svg(
  "Trois étiquettes : 45, 12, 30",
  [["45", C.bleu], ["12", C.jaune], ["30", C.rose]].map(([n, c], i) => r(70 + i * 120, 120, 100, 80, c, 0.2, 4, 10) + t(120 + i * 120, 175, n, C.craie, 38)).join("") +
    t(240, 290, "du plus petit au plus grand", C.pale, 24) + t(240, 360, `Le bon rangement${NB}?`, C.rose, 30)
);

const formes = svg(
  "Des formes : 3 grands ronds, 2 petits ronds, 2 grands carrés, 1 petit carré",
  o(80, 120, 40, C.bleu, 0.3, 4) + o(330, 230, 40, C.bleu, 0.3, 4) + o(200, 250, 40, C.rose, 0.3, 4) +
    o(190, 110, 18, C.bleu, 0.3, 3) + o(420, 120, 18, C.rose, 0.3, 3) +
    r(250, 70, 80, 80, C.jaune, 0.3, 4) + r(40, 200, 80, 80, C.bleu, 0.3, 4) + r(400, 200, 36, 36, C.jaune, 0.3, 3) +
    t(240, 370, `Combien de grands ronds${NB}?`, C.rose, 30)
);

const intrus = svg(
  "Quatre formes : rond rouge, rond rouge, carré rouge, rond bleu",
  o(80, 170, 45, C.rose, 0.45, 4) + o(190, 170, 45, C.rose, 0.45, 4) + r(255, 125, 90, 90, C.rose, 0.45, 4) + o(410, 170, 45, C.bleu, 0.45, 4) +
    t(240, 330, `Quel est l'intrus${NB}?`, C.rose, 30)
);

const mystere = svg(
  "Des cartes : 12, 15, 16, 26, 6",
  ["12", "15", "16", "26", "6"].map((n, i) => r(35 + i * 86, 80, 74, 90, C.bleu, 0.2, 4, 10) + t(72 + i * 86, 138, n, C.craie, 32)).join("") +
    t(240, 230, "• entre 10 et 20", C.craie, 24) + t(240, 265, "• pair", C.craie, 24) + t(240, 300, "• il finit par 6", C.craie, 24) +
    t(240, 370, `Le nombre mystère${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "trier_classer",
  titre: "Énigmes pour trier et classer",
  description: "L'intrus du panier de fruits, les animaux qui volent, ranger trois nombres, compter les grands ronds, le piège des deux intrus possibles, le défi du nombre mystère.",
  problemes: [
    {
      tag: "Énigme 1 · Le marché",
      titre: "Le panier",
      question: `Dans le panier : une pomme, une banane, une carotte, une poire.<br><br>Quel est l'intrus ?`,
      reponse: `La pomme, la banane et la poire sont des fruits.<br>La carotte est un légume.<br>L'intrus : <span class="big">la carotte</span>.`,
      consigne: "Quel est l'intrus ?",
      verification: { type: "qcm", choix: ["La banane", "La poire", "La carotte"], bonne: 2 },
      dessin: panier,
    },
    {
      tag: "Énigme 2 · La nature",
      titre: "Les animaux qui volent",
      question: `On trie les animaux.<br>D'un côté, ceux qui <b>volent</b>.<br><br>Combien d'animaux volent ?`,
      reponse: `L'oiseau, le papillon, l'abeille volent.<br>Le chat, le chien, le poisson ne volent pas.<br><span class="big">3 animaux</span>.`,
      consigne: "Combien d'animaux volent ?",
      verification: { type: "courte", attendus: ["3"], unite: "animaux" },
      dessin: animaux,
    },
    {
      tag: "Énigme 3 · Les étiquettes",
      titre: "Ranger les nombres",
      question: `Trois étiquettes : <b>45</b>, <b>12</b>, <b>30</b>.<br>On les range du plus petit au plus grand.<br><br>Quel est le bon rangement ?`,
      reponse: `Le plus petit : 12. Puis 30. Puis 45.<br><span class="big">12, 30, 45</span>.`,
      consigne: "Range 45, 12 et 30 du plus petit au plus grand.",
      verification: { type: "qcm", choix: ["45, 30, 12", "12, 30, 45", "12, 45, 30"], bonne: 1 },
      dessin: nombres,
    },
    {
      tag: "Énigme 4 · Les formes",
      titre: "Les grands ronds",
      question: `On trie les formes.<br>Rond ou carré ? Grand ou petit ?<br><br>Combien de <b>grands ronds</b> ?`,
      reponse: `Ronds : 3 grands et 2 petits.<br>La couleur ne compte pas ici.<br><span class="big">3 grands ronds</span>.`,
      consigne: "Combien de grands ronds ?",
      verification: { type: "courte", attendus: ["3"], unite: "ronds" },
      dessin: formes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux intrus",
      sorte: "piege",
      question: `Voici 4 formes.<br><br>Quel est l'intrus ?`,
      reponse: `Par la forme : le carré est l'intrus.<br>Par la couleur : le rond bleu est l'intrus.<br>Le piège : <span class="big">les deux sont possibles</span>. Il faut dire comment on trie !`,
      consigne: "Quel est l'intrus ?",
      verification: { type: "qcm", choix: ["Le carré", "Le rond bleu", "Les deux sont possibles"], bonne: 2 },
      dessin: intrus,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre mystère",
      sorte: "defi",
      question: `Je suis entre <b>10 et 20</b>.<br>Je suis <b>pair</b>.<br>Je finis par <b>6</b>.<br><br>Qui suis-je ?`,
      reponse: `Entre 10 et 20 : 12, 15, 16.<br>Pair : 12 ou 16.<br>Finit par 6 : <span class="big">16</span>.`,
      consigne: "Quel est le nombre mystère ?",
      verification: { type: "courte", attendus: ["16"] },
      dessin: mystere,
    },
  ],
};

export default problemes;
