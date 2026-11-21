// Énigmes à projeter — première (sans spé maths), notion auto_fractions_puissances
// (le loyer de la colocation, l'album photo du téléphone, l'étiquette du jus, le
// globule rouge, piège des tomates du marché 1/2 + 1/3, défi de la recette
// réduite trois fois de moitié). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, bande, secteursCouleurs } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

const coloc = svg("Le loyer coupé en 12 parts : 4 pour Hugo, 3 pour Jade, le reste pour Malo",
  bande(40, 90, 400, 60, 12, 0, C.craie) + r(40, 90, 400 / 3, 60, C.bleu, 0.35, 3) + r(40 + 400 / 3, 90, 100, 60, C.jaune, 0.35, 3) +
    r(40 + 400 / 3 + 100, 90, 400 - 400 / 3 - 100, 60, C.rose, 0.25, 3) +
    t(40 + 200 / 3, 185, "Hugo", C.bleu, 20) + svgFrac(40 + 200 / 3, 235, 1, 3, C.bleu, 26) +
    t(40 + 400 / 3 + 50, 185, "Jade", C.jaune, 20) + svgFrac(40 + 400 / 3 + 50, 235, 1, 4, C.jaune, 26) +
    t(370, 185, "Malo", C.rose, 20) + t(370, 250, "?", C.rose, 30) +
    t(240, 380, `la part de Malo${NB}?`, C.rose, 28));

const album = (() => {
  let s = "";
  for (let i = 0; i < 8; i++) s += r(50 + (i % 4) * 100, 70 + Math.floor(i / 4) * 100, 80, 80, i % 2 ? C.bleu : C.jaune, 0.25, 3, 8) + t(90 + (i % 4) * 100, 118 + Math.floor(i / 4) * 100, "2<tspan dy='-12' font-size='16'>5</tspan>", C.craie, 24);
  return svg("Huit photos de 2 puissance 5 mégaoctets chacune",
    s + t(240, 310, `2<tspan dy='-14' font-size='18'>3</tspan><tspan dy='14'>${NB}photos de 2</tspan><tspan dy='-14' font-size='18'>5</tspan><tspan dy='14'>${NB}Mo</tspan>`, C.craie, 26) +
      t(240, 390, `en tout${NB}?`, C.rose, 28));
})();

const jus = svg("Une brique de jus : trois quarts de jus de pomme, un quart d'autre chose",
  secteursCouleurs(160, 200, 120, [C.jaune, C.jaune, C.jaune, ""]) +
    r(320, 110, 120, 70, C.jaune, 0.2, 3, 8) + svgFrac(380, 150, 3, 4, C.jaune, 30) + t(380, 220, "de pomme", C.craie, 20) +
    t(240, 385, `en pourcentage${NB}?`, C.rose, 28));

const globule = (() => {
  let s = "";
  for (let i = 0; i < 6; i++) s += `<ellipse cx="${80 + i * 50}" cy="170" rx="22" ry="22" fill="${C.rose}" fill-opacity="0.3" stroke="${C.rose}" stroke-width="3"/>`;
  return svg("Des globules rouges alignés, chacun de 7 fois 10 puissance moins 6 mètre ; on en met 1 000 côte à côte",
    s + t(400, 178, "…", C.rose, 30) + l(58, 225, 422, 225, C.craie, 2) + l(58, 215, 58, 235, C.craie, 2) + l(422, 215, 422, 235, C.craie, 2) +
      t(240, 260, "1 000 globules", C.craie, 22) + t(240, 110, `7 × 10<tspan dy='-12' font-size='16'>−6</tspan><tspan dy='12'>${NB}m chacun</tspan>`, C.pale, 22) +
      t(240, 385, `la longueur${NB}?`, C.rose, 28));
})();

const tomates = svg("Une balance : un demi-kilo de tomates puis un tiers de kilo",
  r(90, 210, 300, 30, C.craie, 0.1, 3, 6) + l(240, 240, 240, 300, C.craie, 4) + r(170, 300, 140, 20, C.craie, 0.1, 3, 4) +
    `<circle cx="190" cy="185" r="24" fill="${C.rose}" fill-opacity="0.35" stroke="${C.rose}" stroke-width="3"/>` +
    `<circle cx="240" cy="180" r="28" fill="${C.rose}" fill-opacity="0.35" stroke="${C.rose}" stroke-width="3"/>` +
    `<circle cx="290" cy="185" r="24" fill="${C.rose}" fill-opacity="0.35" stroke="${C.rose}" stroke-width="3"/>` +
    svgFrac(120, 90, 1, 2, C.bleu, 28) + t(175, 100, "+", C.craie, 28) + svgFrac(230, 90, 1, 3, C.bleu, 28) + t(290, 100, "=", C.craie, 28) + svgFrac(350, 90, 2, 5, C.pale, 28) +
    t(400, 100, "?", C.rose, 28) + t(240, 385, `le vrai total${NB}?`, C.rose, 28));

const recette = svg("La recette divisée par 2, puis par 2, puis par 2",
  r(40, 100, 96, 96, C.jaune, 0.3, 3, 6) + r(190, 124, 48, 48, C.jaune, 0.3, 3, 6) + r(300, 136, 24, 24, C.jaune, 0.3, 3, 4) + r(390, 142, 12, 12, C.jaune, 0.3, 3, 2) +
    t(162, 155, "÷ 2", C.craie, 20) + t(270, 155, "÷ 2", C.craie, 20) + t(358, 155, "÷ 2", C.craie, 20) +
    t(88, 240, "1", C.craie, 24) + t(396, 240, "?", C.rose, 28) +
    t(240, 320, "0,125 = 2 puissance ?", C.craie, 24) + t(240, 390, `l'exposant${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_fractions_puissances",
  titre: "Énigmes des fractions et des puissances",
  description: "Le loyer de la colocation, l'album photo du téléphone, l'étiquette du jus, le globule rouge, le piège des tomates du marché, le défi de la recette réduite : opérations sur les fractions, puissances, passer d'une écriture à une autre.",
  problemes: [
    {
      tag: "Énigme 1 · La colocation",
      titre: "Ce qui reste du loyer",
      question: `Dans une colocation, Hugo paie ${frac(1, 3)} du loyer et Jade ${frac(1, 4)}. Malo paie le reste.<br><br><b>Quelle fraction</b> du loyer paie Malo ?`,
      reponse: `Au dénominateur 12 : 1 − ${frac(4, 12)} − ${frac(3, 12)} = <span class="big">${frac(5, 12)}</span>.<br>Malo paie un peu moins de la moitié.`,
      consigne: "Hugo paie 1/3 du loyer, Jade 1/4, Malo le reste. Quelle fraction paie Malo ?",
      verification: { type: "courte", attendus: ["5/12"] },
      dessin: coloc,
    },
    {
      tag: "Énigme 2 · L'album photo",
      titre: "Des puissances de 2",
      question: `Sur un téléphone, un album contient 2<sup>3</sup> photos. Chaque photo pèse 2<sup>5</sup> Mo.<br><br><b>Combien pèse</b> l'album ?`,
      reponse: `On multiplie : 2<sup>3</sup> × 2<sup>5</sup> = 2<sup>3 + 5</sup> = <span class="big">2<sup>8</sup> Mo</span>, soit 256 Mo.<br>Les exposants s'ajoutent, ils ne se multiplient pas.`,
      consigne: "2³ photos de 2⁵ Mo chacune : combien pèse l'album ?",
      verification: { type: "qcm", choix: ["2¹⁵ Mo", "2⁸ Mo", "2² Mo"], bonne: 1 },
      dessin: album,
    },
    {
      tag: "Énigme 3 · L'étiquette du jus",
      titre: "Une fraction en pourcentage",
      question: `Sur une brique de jus, on lit : « ${frac(3, 4)} de jus de pomme ».<br><br><b>Quel pourcentage</b> de jus de pomme cela fait-il ?`,
      reponse: `${frac(3, 4)} = 3 ÷ 4 = 0,75 = ${frac(75, 100)} = <span class="big">75 %</span>.`,
      consigne: "3/4 de jus de pomme : quel pourcentage ?",
      verification: { type: "qcm", choix: ["0,34 %", "34 %", "75 %"], bonne: 2 },
      dessin: jus,
    },
    {
      tag: "Énigme 4 · Le globule rouge",
      titre: "Une puissance de 10 négative",
      question: `Un globule rouge mesure environ 7 × 10<sup>−6</sup> m.<br><br>On en aligne <b>1 000</b> côte à côte. <b>Quelle longueur</b> obtient-on ?`,
      reponse: `1 000 = 10<sup>3</sup>, donc 7 × 10<sup>−6</sup> × 10<sup>3</sup> = 7 × 10<sup>−3</sup> m = <span class="big">7 mm</span>.`,
      consigne: "1 000 globules de 7 × 10⁻⁶ m alignés : quelle longueur ?",
      verification: { type: "qcm", choix: ["7 mm", "7 cm", "0,7 mm"], bonne: 0 },
      dessin: globule,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les tomates du marché",
      sorte: "piege",
      question: `Au marché, Lina pèse ${frac(1, 2)} kg de tomates, puis ${frac(1, 3)} kg de plus.<br>Son ami dit : « ${frac(1, 2)} + ${frac(1, 3)} = ${frac(2, 5)} ».<br><br><b>Quelle masse</b> a-t-elle vraiment ?`,
      reponse: `${frac(2, 5)} kg est moins que ${frac(1, 2)} kg : impossible !<br>On met au même dénominateur : ${frac(3, 6)} + ${frac(2, 6)} = <span class="big">${frac(5, 6)} kg</span>.`,
      consigne: "1/2 kg puis 1/3 kg : quelle masse en tout, en fraction de kg ?",
      verification: { type: "courte", attendus: ["5/6"], unite: "kg" },
      dessin: tomates,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La recette réduite",
      sorte: "defi",
      question: `Un cuisinier divise sa recette par 2, puis encore par 2, puis encore par 2. Il garde donc 0,125 de la recette.<br><br>0,125 = 2<sup>n</sup>. <b>Que vaut n</b> ?`,
      reponse: `0,125 = ${frac(1, 8)} = ${frac(1, "2<sup>3</sup>")} = <span class="big">2<sup>−3</sup></span>.<br>Donc n = −3 : diviser par 2 trois fois, c'est multiplier par 2<sup>−3</sup>.`,
      consigne: "0,125 = 2ⁿ : que vaut n ?",
      verification: { type: "courte", attendus: ["-3", "−3"] },
      dessin: recette,
    },
  ],
};

export default problemes;
