// Énigmes à projeter — CE1, notion tableaux et graphiques simples (le
// tableau des fruits du goûter, les glaces vendues en images, les couleurs
// préférées en barres, les anniversaires par saison, le piège du ballon qui
// vaut 2 buts, le défi des livres lus en deux semaines). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Un tableau à 2 colonnes : lignes [étiquette, valeur], cases de h px. */
const tableau = (x: number, y: number, l1: number, l2: number, h: number, lignes: [string, string][], taille = 24) =>
  lignes.map(([a, b], i) => r(x, y + i * h, l1, h, i ? C.craie : C.bleu, i ? 0 : 0.15, 3) + r(x + l1, y + i * h, l2, h, i ? C.craie : C.bleu, i ? 0 : 0.15, 3) +
    t(x + l1 / 2, y + i * h + h / 2 + 8, a, C.craie, taille) + t(x + l1 + l2 / 2, y + i * h + h / 2 + 8, b, C.craie, taille)).join("");

const fruits = svg(
  "Tableau du goûter : pommes 8, bananes 5, oranges 6",
  tableau(90, 50, 180, 120, 56, [["Fruit", "Nombre"], ["🍎 pommes", "8"], ["🍌 bananes", "5"], ["🍊 oranges", "6"]]) +
    t(240, 370, `Le fruit le plus nombreux${NB}?`, C.rose, 28)
);

const glaces = svg(
  "Glaces vendues : chocolat 4 cornets, vanille 2 cornets, fraise 3 cornets ; 1 cornet = 1 glace",
  [["chocolat", 4], ["vanille", 2], ["fraise", 3]].map(([nom, n], i) =>
    t(150, 108 + i * 75, nom as string, C.craie, 24, "end") + [...Array(n as number)].map((_, k) => t(195 + k * 55, 112 + i * 75, "🍦", C.craie, 40)).join("")).join("") +
    t(240, 320, "🍦 = 1 glace", C.pale, 22) + t(240, 385, `Combien de glaces en tout${NB}?`, C.rose, 28)
);

const couleurs = svg(
  "Diagramme en barres des couleurs préférées : rouge 7, bleu 9, vert 4",
  l(80, 300, 440, 300, C.craie, 3) + l(80, 300, 80, 60, C.craie, 3) +
    [0, 2, 4, 6, 8, 10].map((v) => l(74, 300 - v * 22, 86, 300 - v * 22, C.craie, 2) + t(62, 307 - v * 22, v, C.pale, 18, "end")).join("") +
    [0, 2, 4, 6, 8, 10].map((v) => l(86, 300 - v * 22, 440, 300 - v * 22, C.pale, 1, "4 6")).join("") +
    r(120, 300 - 7 * 22, 70, 7 * 22, C.rose, 0.45, 3) + r(230, 300 - 9 * 22, 70, 9 * 22, C.bleu, 0.45, 3) + r(340, 300 - 4 * 22, 70, 4 * 22, C.jaune, 0.45, 3) +
    t(155, 330, "rouge", C.craie, 22) + t(265, 330, "bleu", C.craie, 22) + t(375, 330, "vert", C.craie, 22) +
    t(240, 390, `Bleu : combien de plus que vert${NB}?`, C.rose, 26)
);

const saisons = svg(
  "Tableau des anniversaires : printemps 6, été 3, automne 5, hiver 4",
  tableau(90, 50, 180, 120, 52, [["Saison", "Élèves"], ["🌸 printemps", "6"], ["☀️ été", "3"], ["🍂 automne", "5"], ["❄️ hiver", "4"]], 22) +
    t(240, 365, `La saison avec le moins d'anniversaires${NB}?`, C.rose, 24)
);

const buts = svg(
  "Les buts de Lou : 3 ballons ; 1 ballon = 2 buts",
  t(110, 160, "Lou", C.craie, 30) + [0, 1, 2].map((k) => t(220 + k * 70, 172, "⚽", C.craie, 56)).join("") +
    r(130, 230, 220, 50, C.jaune, 0.25, 3, 10) + t(240, 264, "⚽ = 2 buts", C.craie, 26) +
    t(240, 360, `Combien de buts${NB}?`, C.rose, 30)
);

const livres = svg(
  "Livres lus : Léa 3 puis 5 ; Ali 6 puis 1 ; Max 4 puis 5",
  [["", "1re sem.", "2e sem."], ["Léa", "3", "5"], ["Ali", "6", "1"], ["Max", "4", "5"]].map((ligne, i) =>
    ligne.map((c, j) => r(70 + j * 115, 50 + i * 56, 115, 56, i && j ? C.craie : C.bleu, i && j ? 0 : 0.15, 3) + t(127 + j * 115, 86 + i * 56, c, C.craie, 22)).join("")).join("") +
    t(240, 330, "En tout, sur les 2 semaines", C.pale, 22) + t(240, 385, `Qui a lu le plus de livres${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "donnees",
  titre: "Énigmes sur les tableaux et les graphiques",
  description: "Le tableau des fruits du goûter, les glaces vendues en images, les couleurs préférées en barres, les anniversaires par saison, le piège du ballon qui vaut 2 buts, le défi des livres lus en deux semaines.",
  problemes: [
    {
      tag: "Énigme 1 · Le goûter",
      titre: "Les fruits",
      question: `Le tableau montre les fruits du goûter.<br><br>Quel fruit est le plus nombreux ?`,
      reponse: `Pommes : 8. Bananes : 5. Oranges : 6.<br>8 est le plus grand.<br>Ce sont <span class="big">les pommes</span>.`,
      consigne: "Quel fruit est le plus nombreux ?",
      verification: { type: "qcm", choix: ["Les pommes", "Les oranges", "Les bananes"], bonne: 0 },
      dessin: fruits,
    },
    {
      tag: "Énigme 2 · Le marchand de glaces",
      titre: "Les glaces vendues",
      question: `Chaque cornet dessiné = <b>1 glace</b> vendue.<br><br>Combien de glaces en tout ?`,
      reponse: `Chocolat : 4. Vanille : 2. Fraise : 3.<br>4 + 2 + 3 = <span class="big">9 glaces</span>.`,
      consigne: "Combien de glaces vendues en tout ?",
      verification: { type: "courte", attendus: ["9"], unite: "glaces" },
      dessin: glaces,
    },
    {
      tag: "Énigme 3 · La classe",
      titre: "Les couleurs préférées",
      question: `Le graphique montre les couleurs préférées.<br><br>Combien d'élèves de plus pour le <b>bleu</b> que pour le <b>vert</b> ?`,
      reponse: `Bleu : 9. Vert : 4.<br>9 − 4 = <span class="big">5 élèves</span> de plus.`,
      consigne: "Combien d'élèves de plus pour le bleu que pour le vert ?",
      verification: { type: "courte", attendus: ["5"], unite: "élèves" },
      dessin: couleurs,
    },
    {
      tag: "Énigme 4 · Les anniversaires",
      titre: "Les saisons",
      question: `Le tableau montre les anniversaires de la classe.<br><br>Quelle saison en a <b>le moins</b> ?`,
      reponse: `6, 3, 5, 4 : le plus petit est 3.<br>C'est <span class="big">l'été</span>.`,
      consigne: "Quelle saison a le moins d'anniversaires ?",
      verification: { type: "qcm", choix: ["L'hiver", "Le printemps", "L'été"], bonne: 2 },
      dessin: saisons,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les buts de Lou",
      sorte: "piege",
      question: `Lou a <b>3 ballons</b> dans le graphique.<br>Un ballon = <b>2 buts</b>.<br><br>Combien de buts a marqué Lou ?`,
      reponse: `Le piège : compter les ballons et dire 3.<br>Mais chaque ballon vaut 2 buts.<br>2 + 2 + 2 = <span class="big">6 buts</span>.`,
      consigne: "Combien de buts a marqué Lou ?",
      verification: { type: "qcm", choix: ["6", "3", "5"], bonne: 0 },
      dessin: buts,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les livres lus",
      sorte: "defi",
      question: `Le tableau montre les livres lus en <b>2 semaines</b>.<br><br>Qui a lu le plus de livres en tout ?`,
      reponse: `Léa : 3 + 5 = 8. Ali : 6 + 1 = 7. Max : 4 + 5 = 9.<br>Ali a lu le plus la 1<sup>re</sup> semaine, mais pas en tout !<br>C'est <span class="big">Max</span>.`,
      consigne: "Qui a lu le plus de livres en tout ?",
      verification: { type: "qcm", choix: ["Léa", "Ali", "Max"], bonne: 2 },
      dessin: livres,
    },
  ],
};

export default problemes;
