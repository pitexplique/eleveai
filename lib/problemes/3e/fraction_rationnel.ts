// Énigmes à projeter — 3e, notion fraction_rationnel (diviser par une
// fraction, priorités, fraction d'un reste, remonter au départ, piège
// 1/2 + 1/3 = 2/5, défi 1/2 + 1/4 + … + 1/64). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, bande } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

// Une bouteille de 1,5 L et des verres de 0,25 L : 1 L = 120 px de haut.
const bouteille = svg(
  "Une bouteille de trois demis de litre et des verres d'un quart de litre",
  p("M70 380 L70 200 Q70 170 95 160 L95 120 L125 120 L125 160 Q150 170 150 200 L150 380 Z", C.bleu, 4, 0.12) +
    r(70, 200, 80, 180, C.bleu, 0.3, 0) + svgFrac(110, 70, 3, 2, C.bleu, 26) + t(150, 95, "L", C.bleu, 24) +
    [0, 1, 2, 3, 4, 5].map((k) => p(`M${200 + 70 * (k % 3)} ${k < 3 ? 210 : 300} l6 70 l32 0 l6 -70 Z`, C.jaune, 3, 0.25)).join("") +
    t(330, 130, "un verre", C.jaune, 22) + svgFrac(330, 165, 1, 4, C.jaune, 22) + t(380, 180, "L", C.jaune, 22) +
    t(345, 400, `combien de verres${NB}?`, C.rose, 22)
);

// A = 2/3 + 1/3 × 3/5 écrit au tableau.
const calcul = svg(
  "Le calcul deux tiers plus un tiers fois trois cinquièmes",
  t(70, 215, "A =", C.craie, 40, "start") + svgFrac(185, 205, 2, 3, C.craie, 40) + t(235, 215, "+", C.craie, 40) +
    svgFrac(285, 205, 1, 3, C.craie, 40) + t(335, 215, "×", C.rose, 40) + svgFrac(385, 205, 3, 5, C.craie, 40) +
    t(240, 350, `par quoi commencer${NB}?`, C.rose, 26)
);

// Le trajet en 6 parts : 2 le matin, 3 l'après-midi, 1 reste (bande de 360 px).
const trajet = svg(
  "Un trajet partagé en 6 parts égales : 2 parts le matin, 3 parts l'après-midi, 1 part reste",
  bande(60, 150, 360, 70, 6, 2, C.jaune) + r(180, 150, 180, 70, C.bleu, 0.35, 3) +
    t(120, 130, "matin", C.jaune, 22) + t(270, 130, "après-midi", C.bleu, 22) + t(390, 130, "reste", C.rose, 22) +
    t(390, 195, "?", C.rose, 34) + t(240, 290, "24 km en tout", C.craie, 26) + t(240, 380, "6 parts égales", C.pale, 18)
);

// Le bus : 35 places en cercles, puis les arrêts.
const bus = svg(
  "Un bus scolaire qui s'arrête deux fois ; à la fin, 20 élèves restent",
  r(50, 140, 360, 130, C.jaune, 0.2, 4, 18) + r(80, 165, 60, 45, C.craie, 0, 3, 6) + r(160, 165, 60, 45, C.craie, 0, 3, 6) + r(240, 165, 60, 45, C.craie, 0, 3, 6) + r(320, 165, 60, 45, C.craie, 0, 3, 6) +
    `<circle cx="120" cy="280" r="22" fill="${C.craie}"/><circle cx="340" cy="280" r="22" fill="${C.craie}"/>` +
    t(240, 100, `au départ${NB}: ? élèves`, C.rose, 26) + t(130, 340, "arrêt 1", C.pale, 20) + t(130, 365, "2/7 descendent", C.bleu, 20) +
    t(330, 340, "arrêt 2", C.pale, 20) + t(330, 365, "1/5 des restants", C.bleu, 20) + t(240, 405, "il reste 20 élèves", C.craie, 22)
);

// Le cahier de Tom.
const tom = svg(
  "Le cahier de Tom : un demi plus un tiers égale deux cinquièmes",
  r(60, 80, 360, 220, C.craie, 0, 3, 10) + [120, 160, 200, 240].map((y) => l(80, y + 40, 400, y + 40, C.pale, 1)).join("") +
    svgFrac(120, 185, 1, 2, C.bleu, 40) + t(170, 195, "+", C.bleu, 40) + svgFrac(220, 185, 1, 3, C.bleu, 40) + t(270, 195, "=", C.bleu, 40) + svgFrac(320, 185, 2, 5, C.bleu, 40) +
    t(390, 160, "✓ ?", C.rose, 32) + t(240, 360, "le cahier de Tom", C.pale, 22)
);

// Le carré coupé en deux, puis encore en deux : 1/2, 1/4, 1/8… (carré de 256 px).
const moities = svg(
  "Un carré partagé en une moitié, un quart, un huitième, un seizième, et ainsi de suite",
  r(112, 60, 128, 256, C.bleu, 0.35, 3) + r(240, 60, 128, 128, C.jaune, 0.35, 3) + r(240, 188, 64, 128, C.rose, 0.35, 3) +
    r(304, 188, 64, 64, C.bleu, 0.2, 3) + r(304, 252, 32, 64, C.jaune, 0.2, 3) + r(336, 252, 32, 32, C.rose, 0.2, 3) + r(336, 284, 16, 32, C.pale, 0.3, 2) + r(352, 284, 16, 16, C.pale, 0.15, 2) +
    r(112, 60, 256, 256, C.craie, 0, 4) + svgFrac(176, 185, 1, 2, C.craie, 30) + svgFrac(304, 120, 1, 4, C.craie, 26) + svgFrac(272, 250, 1, 8, C.craie, 20) +
    t(240, 370, "on s'arrête à 1/64", C.pale, 20)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "fraction_rationnel",
  titre: "Énigmes des nombres rationnels",
  description: "La bouteille et ses verres, la priorité au tableau, la randonnée en trois temps, le bus scolaire, le piège du cahier de Tom, le défi des moitiés de moitiés : diviser par une fraction, respecter les priorités, prendre une fraction d'un reste.",
  problemes: [
    {
      tag: "Énigme 1 · Les verres d'eau",
      titre: "Combien de verres ?",
      question: `Une bouteille contient ${frac(3, 2)} L d'eau. On remplit des verres de ${frac(1, 4)} L.<br><br><b>Combien de verres</b> peut-on remplir ?`,
      reponse: `On cherche combien de fois ${frac(1, 4)} entre dans ${frac(3, 2)} : ${frac(3, 2)} ÷ ${frac(1, 4)} = ${frac(3, 2)} × 4 = ${frac(12, 2)} = <span class="big">6 verres</span>.<br>Diviser par ${frac(1, 4)}, c'est multiplier par 4, son inverse.`,
      consigne: "Combien de verres de 1/4 L remplit-on avec 3/2 L ?",
      verification: {"type":"courte","attendus":["6"],"unite":"verres"},
      dessin: bouteille,
    },
    {
      tag: "Énigme 2 · La priorité",
      titre: "Par quoi commencer ?",
      question: `Calcule et donne le résultat sous forme d'une fraction irréductible :<br><br><b>A = ${frac(2, 3)} + ${frac(1, 3)} × ${frac(3, 5)}</b>`,
      reponse: `La multiplication passe avant l'addition : ${frac(1, 3)} × ${frac(3, 5)} = ${frac(3, 15)} = ${frac(1, 5)}.<br>Puis ${frac(2, 3)} + ${frac(1, 5)} = ${frac(10, 15)} + ${frac(3, 15)} = <span class="big">${frac(13, 15)}</span>.`,
      consigne: "Combien vaut A = 2/3 + 1/3 × 3/5 ?",
      verification: {"type":"qcm","choix":["3/5","13/15","1"],"bonne":1},
      dessin: calcul,
    },
    {
      tag: "Énigme 3 · La randonnée",
      titre: "Ce qu'il reste à marcher",
      question: `Une randonnée fait <b>24 km</b>. Le matin, Inès marche ${frac(1, 3)} du trajet. L'après-midi, elle marche les ${frac(3, 4)} <b>de ce qui reste</b>.<br><br><b>Combien de kilomètres</b> lui reste-t-il pour le lendemain ?`,
      reponse: `Après le matin, il reste ${frac(2, 3)} du trajet. L'après-midi : ${frac(3, 4)} × ${frac(2, 3)} = ${frac(6, 12)} = ${frac(1, 2)} du trajet.<br>Elle a marché ${frac(1, 3)} + ${frac(1, 2)} = ${frac(5, 6)}. Il reste ${frac(1, 6)} de 24 km = <span class="big">4 km</span>.`,
      consigne: "Combien de kilomètres reste-t-il à Inès ?",
      verification: {"type":"courte","attendus":["4"],"unite":"km"},
      dessin: trajet,
    },
    {
      tag: "Énigme 4 · Le bus scolaire",
      titre: "Combien au départ ?",
      question: `Au premier arrêt, ${frac(2, 7)} des élèves descendent du bus. Au deuxième arrêt, ${frac(1, 5)} des élèves <b>restants</b> descendent. Il reste alors <b>20 élèves</b>.<br><br><b>Combien</b> d'élèves étaient dans le bus au départ ?`,
      reponse: `Après l'arrêt 1, il reste ${frac(5, 7)} des élèves. Après l'arrêt 2, il en reste ${frac(4, 5)} × ${frac(5, 7)} = ${frac(4, 7)}.<br>${frac(4, 7)} des élèves = 20, donc ${frac(1, 7)} = 5 et le bus avait <span class="big">35 élèves</span>.<br>Vérif : 35 − 10 = 25, puis 25 − 5 = 20.`,
      consigne: "Combien d'élèves étaient dans le bus au départ ?",
      verification: {"type":"courte","attendus":["35"],"unite":"élèves"},
      dessin: bus,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cahier de Tom",
      sorte: "piege",
      question: `Tom a écrit : <b>${frac(1, 2)} + ${frac(1, 3)} = ${frac(2, 5)}</b>. « J'ai ajouté les numérateurs, puis les dénominateurs. »<br><br><b>A-t-il raison ?</b> Sinon, quel est le bon résultat ?`,
      reponse: `Non ! ${frac(2, 5)} est plus petit que ${frac(1, 2)} : en ajoutant un nombre positif, on ne peut pas obtenir moins.<br>Il faut le même dénominateur : ${frac(3, 6)} + ${frac(2, 6)} = <span class="big">${frac(5, 6)}</span>.`,
      consigne: "Combien vaut 1/2 + 1/3 ?",
      verification: {"type":"qcm","choix":["2/5","2/6","5/6"],"bonne":2},
      dessin: tom,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Des moitiés de moitiés",
      sorte: "defi",
      question: `Calcule la somme :<br><br><b>${frac(1, 2)} + ${frac(1, 4)} + ${frac(1, 8)} + ${frac(1, 16)} + ${frac(1, 32)} + ${frac(1, 64)}</b><br><br>Astuce : regarde le carré. Que manque-t-il pour le remplir ?`,
      reponse: `Chaque part remplit la moitié de ce qui reste. À la fin, il manque juste la dernière petite part : ${frac(1, 64)}.<br>La somme vaut 1 − ${frac(1, 64)} = <span class="big">${frac(63, 64)}</span>.<br>Si on continuait sans fin, on s'approcherait de 1 sans jamais le dépasser.`,
      consigne: "Combien vaut 1/2 + 1/4 + 1/8 + 1/16 + 1/32 + 1/64 ?",
      verification: {"type":"courte","attendus":["63/64"]},
      dessin: moities,
    },
  ],
};

export default problemes;
