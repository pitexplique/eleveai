// Énigmes à projeter — CM2, notion fraction_mixte (fractions plus grandes que 1 :
// les demi-baguettes, les tartes en quarts, entier + fraction en une fraction,
// un point entre 2 et 3, le piège « une fraction est toujours plus petite que 1 »,
// le défi 58/7 par la table de 7). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { frac, svgFrac } from "../outils";
import { C, NB, svg, t, r, l, secteurs, bande, droiteGraduee } from "../dessins-ecole";

const baguettes = svg(
  "Sept demi-baguettes posées sur la table",
  [0, 1, 2, 3, 4, 5, 6].map((i) => r(40 + (i % 4) * 105, 90 + Math.floor(i / 4) * 90, 90, 36, C.jaune, 0.35, 3, 16)).join("") +
    t(240, 300, "7 demi-baguettes 🥖", C.craie, 28) + t(240, 360, `= combien de baguettes${NB}?`, C.rose, 26)
);

const tartes = svg(
  "Onze quarts de tarte : deux tartes entières et trois quarts",
  secteurs(90, 170, 70, 4, 4, C.jaune) + secteurs(240, 170, 70, 4, 4, C.jaune) + secteurs(390, 170, 70, 4, 3, C.jaune) +
    t(240, 300, "11 quarts de tarte", C.craie, 28) + t(240, 360, `tartes entières${NB}?`, C.rose, 26)
);

// 3 rubans entiers et 2/5 : chaque ruban = 5 cases de 24 px.
const rubans = svg(
  "Trois rubans entiers partagés en cinquièmes, et deux cinquièmes d'un autre ruban",
  [0, 1, 2].map((i) => bande(60, 70 + i * 60, 360, 36, 5, 5, C.rose)).join("") + bande(60, 250, 360, 36, 5, 2, C.rose) +
    r(60, 250, 360, 36, C.pale, 0, 2).replace("/>", ' stroke-dasharray="6 6"/>') +
    t(240, 340, "3 rubans et 2 cinquièmes", C.craie, 26) + t(240, 385, `= ? cinquièmes`, C.rose, 26)
);

const droite = svg(
  "Une droite graduée de 0 à 3, chaque unité partagée en 3, un point B entre 2 et 3",
  droiteGraduee(200, 40, 430, 0, 3, 1 / 3, 1) + l(343, 170, 343, 188, C.rose, 4) + t(343, 160, "B", C.rose, 32) +
    t(240, 330, `B = ${NB}? (en tiers)`, C.rose, 28)
);

const zoe = svg(
  "Neuf quarts de pizza : deux pizzas entières et un quart",
  secteurs(100, 160, 75, 4, 4, C.rose) + secteurs(260, 160, 75, 4, 4, C.rose) + secteurs(410, 160, 55, 4, 1, C.rose) +
    svgFrac(240, 300, 9, 4, C.craie, 34) + t(240, 395, `«${NB}plus petit que 1${NB}», dit Zoé`, C.pale, 22)
);

const table7 = svg(
  "La table de 7 jusqu'à 7 × 9, pour trouver combien d'unités dans 58 septièmes",
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => t(k <= 5 ? 130 : 350, 70 + ((k - 1) % 5) * 52, `7 × ${k} = ${7 * k}`, k === 8 ? C.rose : C.craie, 28)).join("") +
    svgFrac(350, 320, 58, 7, C.bleu, 34)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "fraction_mixte",
  titre: "Énigmes sur les fractions plus grandes que 1",
  description: "Les demi-baguettes, les quarts de tarte, rubans et cinquièmes, le point B entre 2 et 3, le piège de Zoé, le défi des 58 septièmes.",
  problemes: [
    {
      tag: "Énigme 1 · À la boulangerie",
      titre: "Les demi-baguettes",
      question: `Sur la table, il y a <b>7 demi-baguettes</b>.<br><br>Cela fait <b>combien de baguettes</b> ?`,
      reponse: `2 demis font 1 baguette.<br>6 demis font 3 baguettes, plus 1 demi.<br>${frac(7, 2)} = <span class="big">3 baguettes et demie</span>.`,
      consigne: "7 demi-baguettes, cela fait combien de baguettes ?",
      verification: { type: "qcm", choix: ["3 baguettes et demie", "7 baguettes", "2 baguettes et demie"], bonne: 0 },
      dessin: baguettes,
    },
    {
      tag: "Énigme 2 · À la fête de l'école",
      titre: "Les quarts de tarte",
      question: `Il reste <b>11 quarts</b> de tarte : ${frac(11, 4)}.<br><br>Combien de <b>tartes entières</b> peut-on refaire ?`,
      reponse: `4 quarts font 1 tarte. 8 quarts font 2 tartes.<br>${frac(11, 4)} = 2 + ${frac(3, 4)}.<br>On refait <span class="big">2 tartes entières</span>, et il reste ${frac(3, 4)}.`,
      consigne: "Combien de tartes entières dans 11 quarts ?",
      verification: { type: "courte", attendus: ["2"], unite: "tartes" },
      dessin: tartes,
    },
    {
      tag: "Énigme 3 · À la mercerie",
      titre: "Les rubans en cinquièmes",
      question: `On a <b>3 rubans entiers</b> et ${frac(2, 5)} de ruban.<br><br>Écris cette longueur avec <b>une seule fraction</b>.`,
      reponse: `1 ruban = 5 cinquièmes. 3 rubans = 15 cinquièmes.<br>15 + 2 = 17. C'est <span class="big">${frac(17, 5)}</span> de ruban.`,
      consigne: "3 + 2/5 = ? (écris une fraction avec /)",
      verification: { type: "courte", attendus: ["17/5"] },
      dessin: rubans,
    },
    {
      tag: "Énigme 4 · Sur la droite",
      titre: "Le point B",
      question: `Chaque unité est partagée en <b>3 parts</b>.<br>Le point B est à la 1re graduation après 2.<br><br><b>Quelle fraction</b> repère B ?`,
      reponse: `2 unités = 6 tiers. Une graduation de plus : 7 tiers.<br><span class="big">B = ${frac(7, 3)}</span>, soit 2 + ${frac(1, 3)}.`,
      consigne: "Quelle fraction repère le point B ? (écris-la avec /)",
      verification: { type: "courte", attendus: ["7/3"] },
      dessin: droite,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les pizzas de Zoé",
      sorte: "piege",
      question: `Zoé dit : « ${frac(9, 4)}, c'est plus petit que 1. Une fraction, c'est toujours une petite part ! »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Non ! 4 quarts font 1 pizza.<br>9 quarts = 8 quarts + 1 quart = 2 pizzas et ${frac(1, 4)}.<br><span class="big">${frac(9, 4)} est plus grand que 2</span>.`,
      consigne: "Que vaut 9/4 ?",
      verification: { type: "qcm", choix: ["Plus petit que 1", "Plus grand que 2", "Égal à 1"], bonne: 1 },
      dessin: zoe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les 58 septièmes",
      sorte: "defi",
      question: `Combien d'<b>unités entières</b> y a-t-il dans ${frac(58, 7)} ?<br><br>Astuce : la table de 7 t'aide.`,
      reponse: `7 × 8 = 56, et 7 × 9 = 63 : c'est trop.<br>${frac(58, 7)} = ${frac(56, 7)} + ${frac(2, 7)} = 8 + ${frac(2, 7)}.<br>Il y a <span class="big">8 unités</span>.`,
      consigne: "Combien d'unités entières dans 58/7 ?",
      verification: { type: "courte", attendus: ["8"], unite: "unités" },
      dessin: table7,
    },
  ],
};

export default problemes;
