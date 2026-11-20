// Énigmes à projeter — CM2, notion contenance (verres de 25 cL dans 1,5 L,
// bain ou douche, cuillères de 5 mL, choisir l'unité, le piège 1 L = 100 mL,
// le défi de l'aquarium en dm³). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const bouteille = svg(
  "Une bouteille de 1,5 L et des verres de 25 cL",
  p("M100 110 L100 80 L120 60 L140 60 L160 80 L160 110 L170 130 L170 350 L90 350 L90 130 Z", C.bleu, 4, 0.2) + t(130, 250, "1,5 L", C.craie, 26) +
    [0, 1, 2].map((i) => p(`M${230 + i * 75} 260 L${290 + i * 75} 260 L${282 + i * 75} 350 L${238 + i * 75} 350 Z`, C.jaune, 3, 0.2)).join("") +
    t(330, 230, "verres de 25 cL", C.craie, 22) + t(240, 400, `Combien de verres${NB}?`, C.rose, 26)
);

const bain = svg(
  "Un bain de 150 L et une douche de 60 L",
  p("M40 200 L240 200 L225 300 L55 300 Z", C.bleu, 4, 0.2) + t(140, 260, "150 L", C.craie, 30) + t(140, 340, "bain 🛁", C.pale, 22) +
    l(360, 80, 360, 300, C.craie, 4) + p("M360 80 L420 80 L420 110", C.craie, 4) + l(410, 120, 400, 200, C.bleu, 3, "6 8") + l(430, 120, 440, 200, C.bleu, 3, "6 8") +
    t(400, 260, "60 L", C.craie, 30) + t(400, 340, "douche 🚿", C.pale, 22) + t(240, 400, `litres économisés${NB}?`, C.rose, 24)
);

const sirop = svg(
  "Un flacon de sirop de 20 cL et une cuillère de 5 mL",
  p("M120 140 L120 110 L170 110 L170 140 L190 160 L190 340 L100 340 L100 160 Z", C.rose, 4, 0.2) + t(145, 260, "20 cL", C.craie, 26) +
    `<ellipse cx="310" cy="250" rx="34" ry="20" fill="${C.pale}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>` + l(340, 245, 440, 210, C.craie, 6) +
    t(330, 310, "5 mL", C.craie, 26) + t(240, 400, `Combien de cuillères${NB}?`, C.rose, 26)
);

const piscine = svg(
  "Une grande piscine gonflable de jardin",
  `<ellipse cx="240" cy="250" rx="190" ry="70" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="5"/>` +
    `<ellipse cx="240" cy="230" rx="190" ry="70" fill="none" stroke="${C.bleu}" stroke-width="5"/>` + t(240, 120, "🏊", C.craie, 60) +
    t(240, 370, `3 L${NB}? 30 cL${NB}? 3 000 L${NB}?`, C.pale, 24)
);

const ana = svg(
  "Deux bouteilles d'un litre ; Ana dit que cela fait 200 mL",
  [0, 1].map((i) => p(`M${110 + i * 160} 120 L${110 + i * 160} 95 L${150 + i * 160} 95 L${150 + i * 160} 120 L${170 + i * 160} 140 L${170 + i * 160} 320 L${90 + i * 160} 320 L${90 + i * 160} 140 Z`, C.bleu, 4, 0.2) + t(130 + i * 160, 240, "1 L", C.craie, 28)).join("") +
    t(240, 380, `«${NB}2 L = 200 mL${NB}», dit Ana`, C.rose, 26)
);

// L'aquarium en perspective : 50 cm × 30 cm × 20 cm (pas à l'échelle).
const aquarium = svg(
  "Un aquarium en forme de pavé : 50 cm de long, 30 cm de large, 20 cm de haut (pas à l'échelle)",
  r(80, 150, 250, 140, C.bleu, 0.2, 4) + p("M80 150 L150 90 L400 90 L330 150 M400 90 L400 230 L330 290", C.bleu, 4) +
    t(205, 320, "50 cm", C.craie, 24) + t(390, 280, "30 cm", C.craie, 22) + t(70, 226, "20 cm", C.craie, 22, "end") +
    t(240, 370, "1 L = 1 dm³", C.pale, 22) + t(240, 405, "pas à l'échelle", C.pale, 16)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "contenance",
  titre: "Énigmes sur les contenances",
  description: "Les verres de 25 cL, le bain et la douche, les cuillères de sirop, la piscine de jardin, le piège des bouteilles d'Ana, le défi de l'aquarium.",
  problemes: [
    {
      tag: "Énigme 1 · Au goûter",
      titre: "Les verres de jus",
      question: `Une bouteille contient <b>1,5 L</b> de jus.<br>On remplit des verres de <b>25 cL</b>.<br><br><b>Combien de verres</b> ?`,
      reponse: `1 L = 100 cL, donc 1,5 L = 150 cL.<br>4 verres font 100 cL, 2 verres font 50 cL.<br>Il y a <span class="big">6 verres</span>.`,
      consigne: "Combien de verres de 25 cL ?",
      verification: { type: "courte", attendus: ["6"], unite: "verres" },
      dessin: bouteille,
    },
    {
      tag: "Énigme 2 · Dans la salle de bain",
      titre: "Bain ou douche ?",
      question: `Un bain utilise <b>150 L</b> d'eau.<br>Une douche utilise <b>60 L</b>.<br><br>Combien de <b>litres</b> économise-t-on avec une douche ?`,
      reponse: `150 − 60 = <span class="big">90 L</span>.<br>La douche utilise moins de la moitié de l'eau du bain.`,
      consigne: "Combien de litres économise-t-on ?",
      verification: { type: "courte", attendus: ["90"], unite: "L" },
      dessin: bain,
    },
    {
      tag: "Énigme 3 · À la pharmacie",
      titre: "Les cuillères de sirop",
      question: `Un flacon contient <b>20 cL</b> de sirop.<br>Une cuillère contient <b>5 mL</b>.<br><br><b>Combien de cuillères</b> dans le flacon ?`,
      reponse: `1 cL = 10 mL, donc 20 cL = 200 mL.<br>200 ÷ 5 = <span class="big">40 cuillères</span>.`,
      consigne: "Combien de cuillères de 5 mL dans le flacon ?",
      verification: { type: "courte", attendus: ["40"], unite: "cuillères" },
      dessin: sirop,
    },
    {
      tag: "Énigme 4 · Au jardin",
      titre: "La piscine gonflable",
      question: `Une grande piscine gonflable de jardin, pour toute la famille.<br><br><b>Quelle est sa contenance</b>, à peu près ?`,
      reponse: `3 L, c'est deux bouteilles d'eau. 30 cL, c'est une canette !<br>La piscine contient environ <span class="big">3 000 L</span>.`,
      consigne: "Quelle est la contenance de la piscine gonflable ?",
      verification: { type: "qcm", choix: ["3 L", "30 cL", "3 000 L"], bonne: 2 },
      dessin: piscine,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les bouteilles d'Ana",
      sorte: "piege",
      question: `Ana a <b>2 bouteilles de 1 L</b>.<br>Elle dit : « 1 L = 100 mL, donc j'ai 200 mL. »<br><br><b>Combien de mL</b> a-t-elle vraiment ?`,
      reponse: `Non ! « milli » veut dire millième : 1 L = 1 000 mL.<br>2 L = <span class="big">2 000 mL</span>.<br>(C'est 1 L = 100 cL.)`,
      consigne: "2 L, c'est combien de millilitres ?",
      verification: { type: "qcm", choix: ["2 000 mL", "200 mL", "20 mL"], bonne: 0 },
      dessin: ana,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'aquarium",
      sorte: "defi",
      question: `Un aquarium a la forme d'un pavé.<br>Il mesure <b>50 cm</b> de long, <b>30 cm</b> de large et <b>20 cm</b> de haut.<br>Rappel : 1 L = 1 dm³.<br><br>Combien de <b>litres</b> peut-il contenir ?`,
      reponse: `En décimètres : 5 dm, 3 dm et 2 dm.<br>5 × 3 × 2 = 30 dm³.<br>Il contient <span class="big">30 L</span>.`,
      consigne: "Combien de litres contient l'aquarium ?",
      verification: { type: "courte", attendus: ["30"], unite: "L" },
      dessin: aquarium,
    },
  ],
};

export default problemes;
