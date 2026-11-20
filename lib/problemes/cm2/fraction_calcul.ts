// Énigmes à projeter — CM2, notion fraction_calcul (ajouter des quarts de lait,
// ce qui reste de la pizza, 3/2 + 7/8 en huitièmes, 5 fois 3/4 d'heure, le
// piège 1/4 + 1/4 = 2/8, le défi 5/6 − 1/12). 20/11/2026.
// ⛔ Borne du BO : dénominateurs égaux ou l'un multiple de l'autre.
import type { ProblemesNotion } from "../types";
import { frac, svgFrac } from "../outils";
import { C, NB, svg, t, r, l, secteurs, bande } from "../dessins-ecole";

// Deux verres doseurs gradués en quarts de litre (1/4 L = 50 px).
const verre = (x: number, k: number, c: string) =>
  r(x, 100, 100, 200, C.craie, 0, 4, 6) + r(x, 300 - k * 50, 100, k * 50, c, 0.35, 0) +
  [1, 2, 3].map((i) => l(x, 300 - i * 50, x + 18, 300 - i * 50, C.pale, 2)).join("");
const lait = svg(
  "Deux verres doseurs : trois quarts de litre de lait, puis deux quarts de litre",
  verre(70, 3, C.bleu) + verre(310, 2, C.bleu) + t(240, 210, "+", C.craie, 50) +
    svgFrac(120, 60, 3, 4, C.bleu, 26).replace(/y="(\d+)"/g, (_m, y) => `y="${Number(y) - 12}"`) + t(150, 60, "L", C.bleu, 22, "start") +
    svgFrac(360, 60, 2, 4, C.bleu, 26).replace(/y="(\d+)"/g, (_m, y) => `y="${Number(y) - 12}"`) + t(390, 60, "L", C.bleu, 22, "start") +
    t(240, 360, `en tout${NB}?`, C.rose, 28) + t(240, 400, "chaque trait = un quart de litre", C.pale, 18)
);

const pizza = svg(
  "Une pizza en 8 parts : Léa en mange 1, puis 3",
  secteurs(240, 180, 130, 8, 4, C.rose) + t(240, 360, "Léa mange 1 part, puis 3 parts", C.craie, 24) + t(240, 400, `Que reste-t-il${NB}?`, C.rose, 24)
);

// Bande de 400 px : 1 L = 400 px ; on voit 1 L puis 1 L en huitièmes.
const peinture = svg(
  "Deux pots de peinture : trois demis de litre de bleu et sept huitièmes de litre de blanc",
  bande(40, 80, 400, 40, 2, 2, C.bleu) + bande(40, 130, 400, 40, 2, 1, C.bleu) + t(40, 70, "bleu", C.bleu, 22, "start") +
    bande(40, 230, 400, 40, 8, 7, C.pale) + t(40, 220, "blanc", C.pale, 22, "start") +
    svgFrac(240, 330, 3, 2, C.bleu, 30) + t(285, 352, "+", C.craie, 30) + svgFrac(330, 330, 7, 8, C.pale, 30) + t(380, 352, `= ${NB}?`, C.rose, 30, "start")
);

const piano = svg(
  "Cinq jours de la semaine, trois quarts d'heure de piano chaque jour",
  ["lun", "mar", "mer", "jeu", "ven"].map((j, i) => secteurs(60 + i * 90, 160, 38, 4, 3, C.jaune) + t(60 + i * 90, 240, j, C.craie, 22)).join("") +
    t(240, 70, "🎹 chaque jour", C.craie, 26) + svgFrac(420, 60, 3, 4, C.jaune, 26).replace(/y="(\d+)"/g, (_m, y) => `y="${Number(y) - 10}"`) +
    t(240, 330, `en tout${NB}: ? heures`, C.rose, 28)
);

const leo = svg(
  "Deux quarts de gâteau réunis : le calcul de Léo dit deux huitièmes",
  secteurs(130, 160, 90, 4, 1, C.jaune) + t(250, 175, "+", C.craie, 44) + secteurs(370, 160, 90, 4, 1, C.jaune) +
    svgFrac(140, 330, 1, 4, C.craie, 30) + t(185, 352, "+", C.craie, 30) + svgFrac(230, 330, 1, 4, C.craie, 30) + t(275, 352, "=", C.craie, 30) + svgFrac(320, 330, 2, 8, C.rose, 30) + t(380, 352, "?", C.rose, 34)
);

const gourde = svg(
  "Une gourde graduée en douzièmes : elle contient cinq sixièmes de litre, on boit un douzième",
  r(180, 60, 120, 300, C.craie, 0, 4, 20) + r(180, 110, 120, 250, C.bleu, 0.3, 0) +
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => l(180, 360 - i * 25, i % 2 ? 192 : 204, 360 - i * 25, C.pale, 2)).join("") +
    svgFrac(100, 200, 5, 6, C.bleu, 30) + t(100, 160, "il y a", C.pale, 20) + svgFrac(390, 200, 1, 12, C.rose, 30) + t(390, 160, "on boit", C.pale, 20) +
    t(240, 405, "1 L en tout, petit trait = un douzième", C.pale, 18)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "fraction_calcul",
  titre: "Énigmes : calculer avec les fractions",
  description: "Les quarts de litre de lait, ce qui reste de la pizza, la peinture en huitièmes, les quarts d'heure de piano, le piège de Léo, le défi de la gourde.",
  problemes: [
    {
      tag: "Énigme 1 · En cuisine",
      titre: "Le lait de la recette",
      question: `Pour une crème, on verse ${frac(3, 4)} L de lait.<br>Puis on ajoute ${frac(2, 4)} L.<br><br><b>Combien de lait</b> en tout ?`,
      reponse: `Des quarts plus des quarts, ce sont des quarts.<br>3 quarts + 2 quarts = 5 quarts.<br><span class="big">${frac(5, 4)} L</span>, soit 1 L et ${frac(1, 4)}.`,
      consigne: "3/4 + 2/4 = ? (écris une fraction avec /)",
      verification: { type: "courte", attendus: ["5/4"], unite: "L" },
      dessin: lait,
    },
    {
      tag: "Énigme 2 · À la pizzeria",
      titre: "Ce qui reste de la pizza",
      question: `Une pizza a <b>8 parts</b>.<br>Léa mange ${frac(1, 8)}, puis ${frac(3, 8)}.<br><br><b>Quelle fraction reste</b> ?`,
      reponse: `Léa mange ${frac(1, 8)} + ${frac(3, 8)} = ${frac(4, 8)}.<br>${frac(8, 8)} − ${frac(4, 8)} = ${frac(4, 8)}.<br>Il reste <span class="big">${frac(4, 8)}</span>, c'est la moitié.`,
      consigne: "Quelle fraction de la pizza reste ?",
      verification: { type: "qcm", choix: ["4/8", "3/8", "5/8"], bonne: 0 },
      dessin: pizza,
    },
    {
      tag: "Énigme 3 · Chez le peintre",
      titre: "Le mélange de peinture",
      question: `Un peintre mélange ${frac(3, 2)} L de bleu et ${frac(7, 8)} L de blanc.<br><br><b>Combien de litres</b> de peinture ?`,
      reponse: `On change les demis en huitièmes : 1 demi = 4 huitièmes.<br>${frac(3, 2)} = ${frac(12, 8)}. Puis ${frac(12, 8)} + ${frac(7, 8)} = <span class="big">${frac(19, 8)} L</span>.`,
      consigne: "3/2 + 7/8 = ? (écris une fraction en huitièmes avec /)",
      verification: { type: "courte", attendus: ["19/8"], unite: "L" },
      dessin: peinture,
    },
    {
      tag: "Énigme 4 · En musique",
      titre: "Les séances de piano",
      question: `Nina joue du piano ${frac(3, 4)} d'heure par jour.<br>Elle joue <b>5 jours</b>.<br><br><b>Combien d'heures</b> en tout ?`,
      reponse: `5 fois 3 quarts = 15 quarts : 5 × ${frac(3, 4)} = ${frac(15, 4)}.<br>${frac(15, 4)} = 3 + ${frac(3, 4)}.<br><span class="big">${frac(15, 4)} h</span>, soit 3 h 45 min.`,
      consigne: "5 × 3/4 = ? (écris une fraction avec /)",
      verification: { type: "courte", attendus: ["15/4"], unite: "h" },
      dessin: piano,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Léo",
      sorte: "piege",
      question: `Léo écrit : ${frac(1, 4)} + ${frac(1, 4)} = ${frac(2, 8)}.<br><br><b>A-t-il raison</b> ? Sinon, quel est le bon résultat ?`,
      reponse: `Non ! ${frac(2, 8)}, c'est plus petit que ${frac(1, 4)}. Impossible !<br>Un quart + un quart = deux quarts.<br>On n'ajoute pas les dénominateurs : <span class="big">${frac(2, 4)}</span>, la moitié.`,
      consigne: "1/4 + 1/4 = ?",
      verification: { type: "qcm", choix: ["2/8", "1/8", "2/4"], bonne: 2 },
      dessin: leo,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La gourde",
      sorte: "defi",
      question: `La gourde contient ${frac(5, 6)} L d'eau.<br>Tim boit ${frac(1, 12)} L.<br><br><b>Combien reste-t-il</b> ?`,
      reponse: `1 sixième = 2 douzièmes, donc ${frac(5, 6)} = ${frac(10, 12)}.<br>${frac(10, 12)} − ${frac(1, 12)} = <span class="big">${frac(9, 12)} L</span>, soit ${frac(3, 4)} L.`,
      consigne: "5/6 − 1/12 = ? (écris une fraction avec /)",
      verification: { type: "courte", attendus: ["9/12", "3/4"], unite: "L" },
      dessin: gourde,
    },
  ],
};

export default problemes;
