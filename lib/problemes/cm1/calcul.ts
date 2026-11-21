// Énigmes à projeter — CM1, notion calculs (la collecte de bouchons, les pages
// du roman, l'astuce 25 + 37 + 75, le car qui s'arrête, le piège du « de plus
// que », le défi des deux frères). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, fleche } from "../dessins-ecole";

const bouchons = svg(
  "Une collecte de bouchons : 145 lundi, 98 mardi",
  [0, 1].map((k) => r(60 + k * 210, 120, 150, 150, C.bleu, 0.15, 4, 12) +
    Array.from({ length: 9 }, (_, i) => o(95 + k * 210 + (i % 3) * 40, 155 + Math.floor(i / 3) * 40, 14, [C.rose, C.jaune, C.bleu][(i + k) % 3], 0.5, 2)).join("")).join("") +
    t(135, 100, "lundi 145", C.craie, 26) + t(345, 100, "mardi 98", C.craie, 26) + t(240, 350, `En tout${NB}?`, C.rose, 30)
);

const roman = svg(
  "Un roman de 320 pages ; Inès a lu 185 pages",
  r(130, 60, 220, 260, C.rose, 0.15, 4, 8) + r(150, 60, 16, 260, C.rose, 0.35, 0) + t(250, 160, "320", C.craie, 52) + t(250, 210, "pages 📖", C.pale, 26) +
    t(240, 370, `lu${NB}: 185 · reste${NB}: ?`, C.rose, 26)
);

const astuce = svg(
  "Le calcul 25 + 37 + 75",
  t(240, 170, "25 + 37 + 75", C.craie, 52) + p2() + t(240, 340, `=${NB}?`, C.rose, 44)
);
function p2() {
  return `<path d="M120 190 Q240 260 360 190" fill="none" stroke="${C.jaune}" stroke-width="4" stroke-dasharray="8 6"/>`;
}

const car = svg(
  "Un car avec 52 passagers ; 18 descendent, 9 montent",
  r(60, 120, 360, 130, C.jaune, 0.25, 4, 18) + Array.from({ length: 5 }, (_, i) => r(85 + i * 66, 140, 50, 46, C.bleu, 0.3, 3, 6)).join("") +
    o(130, 255, 22, C.craie, 0.3, 4) + o(350, 255, 22, C.craie, 0.3, 4) + t(240, 225, "52 passagers", C.craie, 26) +
    fleche(110, 320, 50, 360, C.rose) + t(150, 360, "18 descendent", C.rose, 20, "start") + fleche(430, 360, 380, 320, C.bleu) + t(370, 395, "9 montent", C.bleu, 20, "end")
);

const lisa = svg(
  "Lisa a 15 € ; c'est 3 € de plus que Tom",
  t(130, 160, "👧", C.craie, 90) + t(350, 160, "👦", C.craie, 90) + t(130, 240, "Lisa", C.craie, 26) + t(350, 240, "Tom", C.craie, 26) +
    t(130, 290, "15 €", C.bleu, 34) + t(350, 290, "? €", C.rose, 34) + t(240, 375, "Lisa a 3 € de plus que Tom", C.pale, 22)
);

const freres = svg(
  "Deux frères ont 50 billes à eux deux ; le grand en a 10 de plus",
  r(130, 110, 200, 50, C.bleu, 0.3, 3, 6) + r(330, 110, 90, 50, C.rose, 0.3, 3, 6) + t(375, 145, "10", C.craie, 24) + t(118, 145, "grand", C.craie, 22, "end") +
    r(130, 200, 200, 50, C.bleu, 0.3, 3, 6) + t(118, 235, "petit", C.craie, 22, "end") + t(240, 80, "50 billes en tout", C.craie, 26) +
    t(240, 330, `Combien pour le grand${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "calcul",
  titre: "Énigmes sur les calculs",
  description: "La collecte de bouchons, les pages du roman, l'astuce de 25 + 37 + 75, le car qui s'arrête, le piège du « de plus que », le défi des billes des deux frères.",
  problemes: [
    {
      tag: "Énigme 1 · La collecte",
      titre: "Les bouchons",
      question: `L'école collecte des bouchons.<br>Lundi : <b>145</b> bouchons. Mardi : <b>98</b> bouchons.<br><br><b>Combien</b> en tout ?`,
      reponse: `98, c'est 100 − 2.<br>145 + 100 = 245, puis 245 − 2 = 243.<br><span class="big">243 bouchons</span>.`,
      consigne: "Combien de bouchons en tout ?",
      verification: { type: "courte", attendus: ["243"], unite: "bouchons" },
      dessin: bouchons,
    },
    {
      tag: "Énigme 2 · La lecture",
      titre: "Les pages du roman",
      question: `Le roman a <b>320 pages</b>.<br>Inès a déjà lu <b>185 pages</b>.<br><br>Combien de pages lui <b>reste-t-il</b> ?`,
      reponse: `185 + 15 = 200, puis 200 + 120 = 320.<br>15 + 120 = <span class="big">135 pages</span>.`,
      consigne: "Combien de pages reste-t-il à lire ?",
      verification: { type: "courte", attendus: ["135"], unite: "pages" },
      dessin: roman,
    },
    {
      tag: "Énigme 3 · Calcul malin",
      titre: "Le bon ordre",
      question: `Calcule <b>25 + 37 + 75</b> de tête.<br><br>Quel est le résultat ?`,
      reponse: `Astuce : 25 + 75 = 100.<br>100 + 37 = <span class="big">137</span>.`,
      consigne: "Combien font 25 + 37 + 75 ?",
      verification: { type: "qcm", choix: ["137", "127", "147"], bonne: 0 },
      dessin: astuce,
    },
    {
      tag: "Énigme 4 · Le car",
      titre: "L'arrêt du car",
      question: `Le car transporte <b>52 passagers</b>.<br>À l'arrêt, <b>18</b> descendent et <b>9</b> montent.<br><br><b>Combien de passagers</b> maintenant ?`,
      reponse: `52 − 18 = 34.<br>34 + 9 = <span class="big">43 passagers</span>.`,
      consigne: "Combien de passagers dans le car maintenant ?",
      verification: { type: "courte", attendus: ["43"], unite: "passagers" },
      dessin: car,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "De plus que Tom",
      sorte: "piege",
      question: `Lisa a <b>15 €</b>.<br>C'est <b>3 € de plus</b> que Tom.<br><br><b>Combien a Tom</b> ?`,
      reponse: `Le piège : « de plus » fait penser à 15 + 3.<br>Mais c'est Lisa qui a plus ! Tom a moins.<br>15 − 3 = <span class="big">12 €</span>.`,
      consigne: "Combien d'euros a Tom ?",
      verification: { type: "courte", attendus: ["12"], unite: "€" },
      dessin: lisa,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les billes des deux frères",
      sorte: "defi",
      question: `Deux frères ont <b>50 billes</b> à eux deux.<br>Le grand a <b>10 billes de plus</b> que le petit.<br><br>Combien de billes a <b>le grand</b> ?`,
      reponse: `On enlève les 10 en plus : 50 − 10 = 40.<br>On partage : 40 ÷ 2 = 20 pour le petit.<br>Le grand : 20 + 10 = <span class="big">30 billes</span>.`,
      consigne: "Combien de billes a le grand frère ?",
      verification: { type: "courte", attendus: ["30"], unite: "billes" },
      dessin: freres,
    },
  ],
};

export default problemes;
