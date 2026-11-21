// Énigmes à projeter — première (sans spé maths), notion auto_proportion
// (l'orchestre, les places du train, le verger de citronniers, le parc national
// de La Réunion (974), piège des deux équipes de bénévoles, défi de la salle de
// concert à 99 % d'adultes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, bande } from "../dessins-ecole";
import { frac } from "../outils";

const orchestre = (() => {
  let s = "";
  for (let i = 0; i < 40; i++) {
    const x = 70 + (i % 10) * 38, y = 80 + Math.floor(i / 10) * 50;
    s += o(x, y, 14, i < 14 ? C.jaune : C.pale, i < 14 ? 0.5 : 0.1, 3);
  }
  return svg("Un orchestre de 40 musiciens dont 14 violonistes en jaune",
    s + t(240, 320, "14 violons sur 40 musiciens", C.craie, 22) + t(240, 390, `quelle proportion${NB}?`, C.rose, 26));
})();

const train = svg("Un train dont 6 places sur 10 sont réservées",
  r(40, 120, 400, 110, C.bleu, 0.1, 4, 30) + bande(70, 150, 340, 50, 10, 6, C.rose) +
    o(110, 250, 18, C.craie, 0, 4) + o(370, 250, 18, C.craie, 0, 4) +
    t(240, 100, "0,6 des places réservées", C.craie, 22) + t(240, 380, `en fraction irréductible${NB}?`, C.rose, 24));

const verger = (() => {
  let s = "";
  for (let i = 0; i < 20; i++) {
    const x = 70 + (i % 5) * 85, y = 80 + Math.floor(i / 5) * 60;
    s += o(x, y, 18, i < 3 ? C.jaune : C.bleu, 0.35, 3) + l(x, y + 18, x, y + 30, C.craie, 3);
  }
  return svg("Un verger : 3 arbres sur 20 sont des citronniers, en jaune",
    s + t(240, 345, "2 400 arbres, 15 % de citronniers", C.craie, 20) + t(240, 395, `combien de citronniers${NB}?`, C.rose, 24));
})();

const parc = svg("La carte simplifiée de l'île de La Réunion, avec le cœur du parc national au centre",
  p("M120 120 C150 60 290 50 350 90 C410 130 430 220 390 280 C350 340 220 350 160 310 C90 270 80 180 120 120 Z", C.bleu, 4, 0.12) +
    p("M180 150 C210 110 300 110 330 150 C360 200 320 270 260 275 C200 280 160 230 180 150 Z", C.jaune, 3, 0.4) +
    t(255, 205, "parc", C.craie, 20) + t(255, 230, "1 050 km²", C.craie, 18) + t(240, 360, "île : 2 512 km²", C.craie, 22) +
    t(240, 400, `quel pourcentage${NB}?`, C.rose, 26) + t(400, 60, "pas à l'échelle", C.pale, 14));

const benevoles = svg("Deux équipes : 12 femmes sur 20, puis 12 femmes sur 30",
  r(40, 80, 180, 140, C.bleu, 0.15, 3, 10) + t(130, 120, "équipe A", C.bleu, 20) + t(130, 160, "20 bénévoles", C.craie, 18) + t(130, 195, "60 % de femmes", C.craie, 18) +
    r(260, 80, 180, 140, C.jaune, 0.15, 3, 10) + t(350, 120, "équipe B", C.jaune, 20) + t(350, 160, "30 bénévoles", C.craie, 18) + t(350, 195, "40 % de femmes", C.craie, 18) +
    t(240, 290, "(60 + 40) ÷ 2 = 50 % ?", C.pale, 22) + t(240, 380, `la vraie proportion${NB}?`, C.rose, 26));

const concert = (() => {
  let s = "";
  for (let i = 0; i < 100; i++) {
    const x = 60 + (i % 20) * 19, y = 70 + Math.floor(i / 20) * 34;
    s += `<circle cx="${x}" cy="${y}" r="7" fill="${i === 57 ? C.rose : C.bleu}" fill-opacity="${i === 57 ? 1 : 0.4}"/>`;
  }
  return svg("Cent personnes dans une salle : 99 adultes en bleu, 1 enfant en rose",
    s + t(240, 270, "99 adultes, 1 enfant", C.craie, 22) + t(240, 320, "on veut 98 % d'adultes", C.craie, 22) +
      t(240, 390, `combien d'adultes sortent${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_proportion",
  titre: "Énigmes des proportions",
  description: "L'orchestre, les places du train, le verger de citronniers, le parc national de La Réunion, le piège des deux équipes de bénévoles, le défi de la salle de concert : calculer une proportion, l'écrire en fraction, en décimal, en pourcentage, appliquer un pourcentage.",
  problemes: [
    {
      tag: "Énigme 1 · L'orchestre",
      titre: "La part des violons",
      question: `Un orchestre compte <b>40</b> musiciens, dont <b>14</b> violonistes.<br><br><b>Quelle proportion</b> de violonistes, en pourcentage ?`,
      reponse: `${frac(14, 40)} = 14 ÷ 40 = 0,35 = <span class="big">35 %</span>.`,
      consigne: "14 violonistes sur 40 musiciens : quelle proportion en % ?",
      verification: { type: "courte", attendus: ["35"], unite: "%" },
      dessin: orchestre,
    },
    {
      tag: "Énigme 2 · Les places du train",
      titre: "Du décimal à la fraction",
      question: `Dans un train, <b>0,6</b> des places sont réservées.<br><br><b>Quelle fraction irréductible</b> cela fait-il ?`,
      reponse: `0,6 = ${frac(6, 10)} = <span class="big">${frac(3, 5)}</span> (on simplifie par 2). C'est aussi 60 %.`,
      consigne: "0,6 en fraction irréductible ?",
      verification: { type: "qcm", choix: ["3/5", "6/100", "1/6"], bonne: 0 },
      dessin: train,
    },
    {
      tag: "Énigme 3 · Le verger",
      titre: "Appliquer un pourcentage",
      question: `Un verger compte <b>2 400</b> arbres. <b>15 %</b> sont des citronniers.<br><br><b>Combien</b> y a-t-il de citronniers ?`,
      reponse: `15 % de 2 400 = 0,15 × 2 400 = <span class="big">360</span> citronniers.<br>Astuce : 10 % = 240 et 5 % = 120.`,
      consigne: "15 % de 2 400 arbres : combien de citronniers ?",
      verification: { type: "qcm", choix: ["160", "360", "2 040"], bonne: 1 },
      dessin: verger,
    },
    {
      tag: "Énigme 4 · Le parc national",
      titre: "Le cœur de l'île",
      question: `L'île de La Réunion couvre environ <b>2 512 km²</b>. Le cœur du parc national en couvre environ <b>1 050 km²</b>.<br><br><b>Quel pourcentage</b> de l'île est-ce, arrondi à l'unité ?`,
      reponse: `${frac("1 050", "2 512")} ≈ 0,418, soit environ <span class="big">42 %</span>.<br>Plus de deux cinquièmes de l'île sont protégés.`,
      consigne: "1 050 km² sur 2 512 km² : quel pourcentage, arrondi à l'unité ?",
      verification: { type: "courte", attendus: ["42"], unite: "%" },
      dessin: parc,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux équipes",
      sorte: "piege",
      question: `Pour une course, l'équipe A a <b>20</b> bénévoles, dont <b>60 %</b> de femmes. L'équipe B a <b>30</b> bénévoles, dont <b>40 %</b> de femmes.<br><br><b>Quelle est la proportion de femmes</b> sur les deux équipes ensemble ?`,
      reponse: `On ne fait pas la moyenne des pourcentages : les équipes n'ont pas le même effectif !<br>A : 12 femmes. B : 12 femmes. ${frac(24, 50)} = <span class="big">48 %</span>.`,
      consigne: "20 bénévoles à 60 % de femmes, 30 à 40 % : quelle proportion de femmes en tout ?",
      verification: { type: "qcm", choix: ["50 %", "100 %", "48 %"], bonne: 2 },
      dessin: benevoles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La salle de concert",
      sorte: "defi",
      question: `Dans une salle de concert, il y a <b>100</b> personnes : <b>99 %</b> sont des adultes.<br><br><b>Combien d'adultes</b> doivent sortir pour qu'il reste <b>98 %</b> d'adultes ?`,
      reponse: `Il y a 1 enfant, qui reste. Pour qu'il fasse 2 % de la salle, il faut 50 personnes (1 ÷ 0,02 = 50).<br>Il reste 49 adultes : <span class="big">50 adultes</span> sortent ! Presque la moitié, pour 1 point de moins.`,
      consigne: "100 personnes, 99 % d'adultes : combien d'adultes doivent sortir pour arriver à 98 % ?",
      verification: { type: "courte", attendus: ["50"] },
      dessin: concert,
    },
  ],
};

export default problemes;
