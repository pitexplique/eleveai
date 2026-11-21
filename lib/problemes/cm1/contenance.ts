// Énigmes à projeter — CM1, notion contenances (les biberons du bébé,
// l'arrosoir rempli à la bouteille, la cuillère à café, la carafe et les verres,
// le piège des deux demi-litres, le défi des gourdes de la sortie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const biberons = svg(
  "4 biberons de 250 mL",
  [0, 1, 2, 3].map((i) => r(55 + i * 100, 130, 60, 130, C.bleu, 0.15, 4, 14) + r(70 + i * 100, 100, 30, 30, C.jaune, 0.3, 3, 8) + r(59 + i * 100, 180, 52, 76, C.craie, 0.08, 0)).join("") +
    t(240, 70, "250 mL chacun 🍼", C.craie, 26) + t(240, 330, "4 biberons par jour", C.pale, 24) + t(240, 385, `en litres${NB}?`, C.rose, 28)
);

const arrosoir = svg(
  "Un arrosoir de 10 L et une bouteille de 2 L",
  p("M80 150 L240 150 L230 320 L90 320 Z", C.bleu, 4, 0.2) + p("M240 190 L330 130", C.bleu, 8) + t(160, 250, "10 L", C.craie, 34) +
    r(360, 170, 60, 150, C.craie, 0.08, 4, 10) + r(375, 145, 30, 25, C.craie, 0.2, 3, 4) + t(390, 260, "2 L", C.craie, 26) +
    t(240, 390, `Combien de bouteilles${NB}?`, C.rose, 26)
);

const cuillere = svg(
  "Une cuillère à café : 5 quoi ?",
  `<ellipse cx="160" cy="180" rx="70" ry="40" fill="${C.pale}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4"/>` + l(225, 190, 420, 250, C.craie, 10) +
    t(240, 320, "5 ?", C.rose, 40) + t(240, 380, `mL${NB}? dL${NB}? L${NB}?`, C.pale, 24)
);

const carafe = svg(
  "Une carafe de 1 L ; on verse 3 verres de 20 cL",
  p("M100 110 L220 110 L240 320 L80 320 Z", C.bleu, 4, 0.2) + t(160, 230, "1 L", C.craie, 34) +
    [0, 1, 2].map((i) => p(`M${290 + i * 60} 230 L${330 + i * 60} 230 L${325 + i * 60} 310 L${295 + i * 60} 310 Z`, C.bleu, 3, 0.25)).join("") + t(350, 210, "20 cL chacun", C.craie, 20) +
    t(240, 385, `Reste dans la carafe${NB}?`, C.rose, 26)
);

const bouteilles = svg(
  "Deux bouteilles de 50 cL et une bouteille de 1 L",
  r(60, 150, 60, 160, C.craie, 0.08, 4, 12) + r(140, 150, 60, 160, C.craie, 0.08, 4, 12) + t(90, 240, "50", C.craie, 24) + t(170, 240, "50", C.craie, 24) + t(130, 350, "cL", C.pale, 22) +
    r(300, 90, 90, 220, C.bleu, 0.15, 4, 14) + t(345, 220, "1 L", C.craie, 30) + t(240, 60, `Le plus d'eau${NB}?`, C.rose, 28)
);

const gourdes = svg(
  "6 gourdes de 75 cL ; des bouteilles de 1 L",
  [0, 1, 2, 3, 4, 5].map((i) => r(40 + i * 70, 110, 50, 110, C.jaune, 0.25, 3, 12) + t(65 + i * 70, 175, "75", C.craie, 20)).join("") + t(240, 90, "cL", C.pale, 20) +
    r(210, 260, 60, 110, C.bleu, 0.2, 4, 10) + t(240, 325, "1 L", C.craie, 22) + t(380, 325, `combien${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "contenance",
  titre: "Énigmes sur les contenances",
  description: "Les biberons du bébé, l'arrosoir rempli à la bouteille, la cuillère à café, la carafe et les verres, le piège des deux demi-litres, le défi des gourdes de la sortie.",
  problemes: [
    {
      tag: "Énigme 1 · Le bébé",
      titre: "Les biberons",
      question: `Le bébé boit <b>4 biberons</b> par jour.<br>Chaque biberon contient <b>250 mL</b>.<br><br>Combien de <b>litres</b> par jour ?`,
      reponse: `4 × 250 mL = 1 000 mL.<br>1 000 mL = <span class="big">1 L</span>.`,
      consigne: "Combien de litres le bébé boit-il par jour ?",
      verification: { type: "courte", attendus: ["1"], unite: "L" },
      dessin: biberons,
    },
    {
      tag: "Énigme 2 · Le potager",
      titre: "L'arrosoir",
      question: `L'arrosoir contient <b>10 L</b>.<br>On le remplit avec une bouteille de <b>2 L</b>.<br><br><b>Combien de bouteilles</b> faut-il verser ?`,
      reponse: `2 + 2 + 2 + 2 + 2 = 10.<br>10 ÷ 2 = <span class="big">5 bouteilles</span>.`,
      consigne: "Combien de bouteilles de 2 L pour remplir l'arrosoir ?",
      verification: { type: "courte", attendus: ["5"], unite: "bouteilles" },
      dessin: arrosoir,
    },
    {
      tag: "Énigme 3 · Le sirop",
      titre: "La cuillère à café",
      question: `Une cuillère à café contient environ <b>5…</b><br><br>Quelle est la <b>bonne unité</b> ?`,
      reponse: `5 L : un seau ! 5 dL : un grand bol.<br>Une cuillère à café : <span class="big">5 mL</span>.`,
      consigne: "Que contient une cuillère à café ?",
      verification: { type: "qcm", choix: ["5 mL", "5 dL", "5 L"], bonne: 0 },
      dessin: cuillere,
    },
    {
      tag: "Énigme 4 · À table",
      titre: "La carafe",
      question: `La carafe contient <b>1 L</b> d'eau.<br>On sert <b>3 verres</b> de <b>20 cL</b>.<br><br>Combien de <b>centilitres</b> reste-t-il ?`,
      reponse: `1 L = 100 cL. 3 × 20 = 60 cL.<br>100 − 60 = <span class="big">40 cL</span>.`,
      consigne: "Combien de centilitres reste-t-il dans la carafe ?",
      verification: { type: "courte", attendus: ["40"], unite: "cL" },
      dessin: carafe,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux petites ou une grande ?",
      sorte: "piege",
      question: `Sacha a <b>2 bouteilles de 50 cL</b>.<br>Maé a <b>1 bouteille de 1 L</b>.<br><br><b>Qui a le plus d'eau</b> ?`,
      reponse: `Le piège : 2 bouteilles, ça semble plus.<br>50 + 50 = 100 cL, et 1 L = 100 cL.<br><span class="big">Ils en ont autant</span>.`,
      consigne: "Qui a le plus d'eau ?",
      verification: { type: "qcm", choix: ["Sacha", "Maé", "Autant"], bonne: 2 },
      dessin: bouteilles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les gourdes de la sortie",
      sorte: "defi",
      question: `Il faut remplir <b>6 gourdes</b> de <b>75 cL</b>.<br>On achète des bouteilles d'eau de <b>1 L</b>.<br><br>Combien de bouteilles, <b>au moins</b> ?`,
      reponse: `6 × 75 = 450 cL, soit 4 L et 50 cL.<br>4 bouteilles ne suffisent pas : il manque 50 cL.<br>Il faut <span class="big">5 bouteilles</span>.`,
      consigne: "Combien de bouteilles de 1 L faut-il acheter, au moins ?",
      verification: { type: "courte", attendus: ["5"], unite: "bouteilles" },
      dessin: gourdes,
    },
  ],
};

export default problemes;
