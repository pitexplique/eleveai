// Énigmes à projeter — STMG (1re), notion coefficient multiplicateur
// (le lave-linge, les baskets en soldes, l'agence de voyages, l'assurance,
// piège de l'imprimante 3D, défi du prix de la maison). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

/** Une étiquette de prix, pointe à droite, coin haut gauche (x, y). */
const etiquette = (x: number, y: number, w: number, txt: string, c: string) =>
  p(`M${x} ${y} L${x + w} ${y} L${x + w + 30} ${y + 35} L${x + w} ${y + 70} L${x} ${y + 70} Z`, c, 3, 0.2) +
  o(x + w + 6, y + 35, 5, c, 0, 3) + t(x + w / 2, y + 45, txt, C.craie, 26);

const laveLinge = svg("Le lave-linge : 500 €, son prix augmente de 8 %",
  r(60, 110, 150, 190, C.craie, 0, 4, 12) + o(135, 215, 50, C.bleu, 0.2, 4) + l(80, 135, 120, 135, C.craie, 4) +
    etiquette(250, 140, 130, "500 €", C.jaune) +
    t(330, 265, "+ 8 %", C.rose, 30) + t(330, 330, `×${NB}?`, C.rose, 32));

const baskets = svg("Les baskets : 90 €, soldées à moins 30 %",
  p("M60 300 L60 240 Q90 230 120 200 L170 220 Q200 260 260 270 Q300 280 300 300 Z", C.bleu, 4, 0.25) +
    l(60, 300, 300, 300, C.craie, 6) +
    etiquette(290, 110, 110, "90 €", C.jaune) +
    t(360, 235, "soldes : − 30 %", C.rose, 24) +
    t(240, 375, `nouveau prix :${NB}?`, C.rose, 28));

const voyage = svg("L'agence de voyages : un séjour à 1 200 € augmente de 15 %",
  r(80, 180, 140, 120, C.jaune, 0.3, 4, 10) + r(120, 155, 60, 25, C.jaune, 0, 4, 6) +
    l(115, 180, 115, 300, C.craie, 3) + l(185, 180, 185, 300, C.craie, 3) +
    etiquette(250, 110, 140, "1 200 €", C.bleu) +
    t(330, 250, "+ 15 %", C.rose, 30) +
    t(240, 375, `nouveau prix :${NB}?`, C.rose, 28));

const assurance = svg("L'assurance auto : après une hausse de 4 %, elle coûte 624 € par an",
  p("M150 100 L230 130 L230 220 Q230 290 150 330 Q70 290 70 220 L70 130 Z", C.bleu, 4, 0.2) +
    t(150, 235, "auto", C.craie, 24) +
    t(345, 150, "+ 4 %", C.rose, 30) +
    etiquette(280, 190, 110, "624 €", C.jaune) +
    t(345, 330, `avant :${NB}?`, C.rose, 28));

const imprimante = svg("L'imprimante 3D : 240 € après une remise de 20 %",
  r(70, 120, 170, 170, C.craie, 0, 4, 8) + r(95, 200, 120, 60, C.pale, 0.2, 3) + l(100, 150, 210, 150, C.bleu, 6) +
    etiquette(275, 120, 110, "240 €", C.jaune) +
    t(345, 250, "après − 20 %", C.rose, 24) +
    t(240, 375, `prix avant la remise :${NB}?`, C.rose, 26));

const maison = svg("La maison : son prix a été multiplié par 2,5 en 20 ans",
  p("M70 330 L70 200 L160 120 L250 200 L250 330 Z", C.jaune, 4, 0.2) + r(140, 260, 40, 70, C.craie, 0, 3) +
    r(95, 210, 35, 35, C.craie, 0, 3) + r(190, 210, 35, 35, C.craie, 0, 3) +
    t(370, 150, "en 20 ans", C.craie, 24) + t(370, 215, "× 2,5", C.bleu, 36) +
    t(370, 290, `+${NB}?${NB}%`, C.rose, 34));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_evo_coefficient",
  titre: "Énigmes de coefficient multiplicateur",
  description: "Le lave-linge, les baskets en soldes, l'agence de voyages, l'assurance auto, le piège de l'imprimante 3D, le défi du prix de la maison : passer de + 8 % à × 1,08, valeur finale, valeur initiale.",
  problemes: [
    {
      tag: "Énigme 1 · Le lave-linge",
      titre: "Le bon multiplicateur",
      question: `Un lave-linge coûte 500 €. Son prix augmente de 8 %.<br><br><b>Par quel nombre faut-il multiplier</b> 500 pour trouver le nouveau prix ?`,
      reponse: `+ 8 %, c'est 100 % + 8 % = 108 % = 1,08.<br>On multiplie par <span class="big">1,08</span> : 500 × 1,08 = 540 €.`,
      consigne: "Un prix augmente de 8 %. Par quel nombre le multiplier ?",
      verification: { type: "qcm", choix: ["0,08", "1,08", "1,8"], bonne: 1 },
      dessin: laveLinge,
    },
    {
      tag: "Énigme 2 · Les baskets",
      titre: "Les soldes",
      question: `Des baskets coûtent 90 €. Pendant les soldes, leur prix baisse de 30 %.<br><br><b>Combien coûtent-elles</b> en soldes ?`,
      reponse: `− 30 %, c'est 100 % − 30 % = 70 % = 0,7.<br>90 × 0,7 = <span class="big">63 €</span>.`,
      consigne: "90 € avec une baisse de 30 %. Quel est le nouveau prix ?",
      verification: { type: "courte", attendus: ["63"], unite: "€" },
      dessin: baskets,
    },
    {
      tag: "Énigme 3 · L'agence de voyages",
      titre: "Le séjour plus cher",
      question: `Une agence de voyages vendait un séjour 1 200 €. Cet été, le prix augmente de 15 %.<br><br><b>Quel est le nouveau prix</b> ?`,
      reponse: `Coefficient : 1 + 0,15 = 1,15.<br>1 200 × 1,15 = <span class="big">1 380 €</span>.`,
      consigne: "1 200 € avec une hausse de 15 %. Quel est le nouveau prix ?",
      verification: { type: "qcm", choix: ["1 215 €", "1 800 €", "1 380 €"], bonne: 2 },
      dessin: voyage,
    },
    {
      tag: "Énigme 4 · L'assurance",
      titre: "Le prix d'avant",
      question: `L'assurance de la voiture de Nadia a augmenté de 4 %. Elle paie maintenant 624 € par an.<br><br><b>Combien payait-elle avant</b> la hausse ?`,
      reponse: `Avant × 1,04 = 624.<br>Donc avant = 624 ÷ 1,04 = <span class="big">600 €</span>.<br>Vérification : 600 × 1,04 = 624.`,
      consigne: "Après une hausse de 4 %, on paie 624 €. Combien payait-on avant ?",
      verification: { type: "courte", attendus: ["600"], unite: "€" },
      dessin: assurance,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'imprimante 3D",
      sorte: "piege",
      question: `Après une remise de 20 %, une imprimante 3D coûte 240 €.<br>Léa : « Avant, elle coûtait 240 + 20 % de 240 = 288 €. »<br><br><b>Quel était le prix avant la remise</b> ?`,
      reponse: `Avant × 0,8 = 240, donc avant = 240 ÷ 0,8 = <span class="big">300 €</span>.<br>Les 20 % se calculent sur l'ancien prix, pas sur 240 €.<br>Vérification : 300 × 0,8 = 240.`,
      consigne: "Après une remise de 20 %, le prix est 240 €. Quel était le prix avant ?",
      verification: { type: "qcm", choix: ["300 €", "288 €", "260 €"], bonne: 0 },
      dessin: imprimante,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La maison",
      sorte: "defi",
      question: `En 20 ans, le prix d'une maison a été multiplié par 2,5.<br><br><b>De quel pourcentage</b> le prix a-t-il augmenté ?`,
      reponse: `Coefficient 2,5 = 1 + 1,5.<br>Le prix a augmenté de 1,5 = <span class="big">150 %</span>, pas de 250 %.<br>Exemple : 100 000 € → 250 000 €, soit 150 000 € de plus.`,
      consigne: "Un prix est multiplié par 2,5. De quel pourcentage a-t-il augmenté ?",
      verification: { type: "courte", attendus: ["150", "150%", "+150"], unite: "%" },
      dessin: maison,
    },
  ],
};

export default problemes;
