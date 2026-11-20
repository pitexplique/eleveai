// Énigmes à projeter — CM2, notion fraction (lire une part de pizza, fraction
// d'une quantité, comparer deux bouteilles, placer sur une droite, le piège
// « 1/8 plus grand que 1/4 car 8 > 4 », le défi du ruban entier). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { frac, svgFrac } from "../outils";
import { C, NB, svg, t, r, l, secteurs, bande, droiteGraduee } from "../dessins-ecole";

const pizza = svg(
  "Une pizza coupée en 8 parts égales, 3 parts mangées",
  secteurs(240, 190, 140, 8, 3, C.jaune) + t(240, 380, `Quelle part a mangé Léo${NB}?`, C.rose, 26)
);

const cantine = svg(
  "28 élèves, partagés en 4 groupes égaux : 3 groupes vont à la cantine",
  bande(40, 120, 400, 70, 4, 3, C.bleu) + [0, 1, 2, 3].map((i) => t(90 + i * 100, 165, "?", C.craie, 26)).join("") +
    t(240, 95, "28 élèves", C.craie, 28) + svgFrac(240, 270, 3, 4, C.bleu, 34) + t(240, 380, "vont à la cantine", C.pale, 24)
);

// Deux bouteilles identiques, 12 cm de haut (1 cm = 20 px) : 2/3 = 8 cm, 3/4 = 9 cm.
const bouteilles = svg(
  "Deux bouteilles identiques : Sam a bu les deux tiers de la sienne, Lou les trois quarts",
  r(90, 80, 90, 240, C.craie, 0, 4, 10) + r(90, 80, 90, 160, C.rose, 0.35, 0) + t(135, 360, "Sam", C.rose, 26) + svgFrac(135, 50, 2, 3, C.rose, 24).replace(/y="(\d+)"/g, (_m, y) => `y="${Number(y) - 10}"`) +
    r(300, 80, 90, 240, C.craie, 0, 4, 10) + r(300, 80, 90, 180, C.bleu, 0.35, 0) + t(345, 360, "Lou", C.bleu, 26) + svgFrac(345, 50, 3, 4, C.bleu, 24).replace(/y="(\d+)"/g, (_m, y) => `y="${Number(y) - 10}"`) +
    t(240, 405, "la partie colorée = ce qui a été bu", C.pale, 18)
);

const droite = svg(
  "Une droite graduée de 0 à 1 partagée en 5, le point A sur la 3e graduation",
  droiteGraduee(200, 60, 420, 0, 1, 0.2, 1) + l(276, 170, 276, 188, C.rose, 4) + t(276, 160, "A", C.rose, 32) + t(240, 340, `A = ${NB}?`, C.rose, 30)
);

const gateaux = svg(
  "Deux gâteaux identiques : l'un coupé en 4, l'autre en 8, une part de chaque coloriée",
  secteurs(130, 180, 100, 4, 1, C.jaune) + secteurs(350, 180, 100, 8, 1, C.rose) +
    svgFrac(130, 340, 1, 4, C.jaune, 30) + svgFrac(350, 340, 1, 8, C.rose, 30) + t(240, 60, "Tom veut le plus gros morceau", C.craie, 22)
);

// Le ruban : 5 parts de 70 px ; 2 parts = 10 cm.
const ruban = svg(
  "Un ruban partagé en 5 parts égales : 2 parts mesurent 10 cm",
  bande(65, 160, 350, 50, 5, 2, C.rose) + l(65, 140, 205, 140, C.rose, 3) + t(135, 125, "10 cm", C.rose, 26) +
    l(65, 240, 415, 240, C.craie, 3, "8 6") + t(240, 280, "le ruban entier = ? cm", C.craie, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "fraction",
  titre: "Énigmes sur les fractions",
  description: "La pizza de Léo, la cantine des trois quarts, deux bouteilles à comparer, un point sur la droite, le piège des gâteaux, le défi du ruban entier.",
  problemes: [
    {
      tag: "Énigme 1 · À la pizzeria",
      titre: "La pizza de Léo",
      question: `Une pizza est coupée en <b>8 parts égales</b>.<br>Léo mange <b>3 parts</b>.<br><br><b>Quelle fraction</b> de la pizza a-t-il mangée ?`,
      reponse: `La pizza a 8 parts : c'est le dénominateur.<br>Léo en mange 3 : c'est le numérateur.<br>Il a mangé <span class="big">${frac(3, 8)}</span> de la pizza.`,
      consigne: "Quelle fraction de la pizza Léo a-t-il mangée ?",
      verification: { type: "qcm", choix: ["3/8", "5/8", "3/5"], bonne: 0 },
      dessin: pizza,
    },
    {
      tag: "Énigme 2 · À la cantine",
      titre: "Les trois quarts de la classe",
      question: `Une classe a <b>28 élèves</b>.<br>Les ${frac(3, 4)} de la classe mangent à la cantine.<br><br><b>Combien d'élèves</b> mangent à la cantine ?`,
      reponse: `Un quart : 28 ÷ 4 = 7 élèves.<br>Trois quarts : 3 × 7 = <span class="big">21 élèves</span>.`,
      consigne: "Combien d'élèves mangent à la cantine ?",
      verification: { type: "courte", attendus: ["21"], unite: "élèves" },
      dessin: cantine,
    },
    {
      tag: "Énigme 3 · Au goûter",
      titre: "Les deux bouteilles",
      question: `Sam et Lou ont la même bouteille de jus.<br>Sam a bu les ${frac(2, 3)} de la sienne. Lou a bu les ${frac(3, 4)}.<br><br><b>Qui a bu le plus</b> ?`,
      reponse: `On partage en 12 : ${frac(2, 3)} = ${frac(8, 12)} et ${frac(3, 4)} = ${frac(9, 12)}.<br>9 douzièmes, c'est plus que 8 douzièmes.<br><span class="big">Lou a bu le plus</span>.`,
      consigne: "Qui a bu le plus ?",
      verification: { type: "qcm", choix: ["Sam", "Lou", "Ils ont bu autant"], bonne: 1 },
      dessin: bouteilles,
    },
    {
      tag: "Énigme 4 · Sur la droite",
      titre: "Le point A",
      question: `De 0 à 1, la droite est partagée en <b>5 parts égales</b>.<br>Le point A est sur la <b>3e graduation</b>.<br><br><b>Quelle fraction</b> repère le point A ?`,
      reponse: `Une part, c'est ${frac(1, 5)}.<br>A est à 3 parts de 0 : <span class="big">A = ${frac(3, 5)}</span>.`,
      consigne: "Quelle fraction repère le point A ? (écris-la avec /)",
      verification: { type: "courte", attendus: ["3/5"] },
      dessin: droite,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le morceau de gâteau",
      sorte: "piege",
      question: `Tom peut avoir ${frac(1, 4)} ou ${frac(1, 8)} du même gâteau.<br>Il dit : « Je prends ${frac(1, 8)}, car 8 est plus grand que 4. »<br><br><b>Quel morceau est le plus gros</b> ?`,
      reponse: `Non ! Plus on coupe de parts, plus elles sont petites.<br>En 4 parts, chaque part est deux fois plus grosse qu'en 8.<br><span class="big">${frac(1, 4)} est le plus gros morceau</span>.`,
      consigne: "Quel morceau est le plus gros ?",
      verification: { type: "qcm", choix: ["1/8", "Ils sont pareils", "1/4"], bonne: 2 },
      dessin: gateaux,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le ruban entier",
      sorte: "defi",
      question: `Les ${frac(2, 5)} d'un ruban mesurent <b>10 cm</b>.<br><br>Combien mesure le <b>ruban entier</b> ?`,
      reponse: `2 parts = 10 cm, donc 1 part = 5 cm.<br>Le ruban a 5 parts : 5 × 5 = <span class="big">25 cm</span>.`,
      consigne: "Combien mesure le ruban entier ?",
      verification: { type: "courte", attendus: ["25"], unite: "cm" },
      dessin: ruban,
    },
  ],
};

export default problemes;
