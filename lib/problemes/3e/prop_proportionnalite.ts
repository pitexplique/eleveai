// Énigmes à projeter — 3e, notion prop_proportionnalite (coefficient
// multiplicateur d'une hausse, d'une baisse, retrouver le prix de départ,
// taux d'évolution, piège +50 % puis −50 %, défi de la photo agrandie).
// 21/11/2026. ⛔ Ne reprend pas la 4e (vélo soldé, flamants, casque, bambou).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, fleche } from "../dessins-ecole";

const etiquette = (x: number, y: number, texte: string, c: string) =>
  p(`M${x} ${y} l110 0 l30 30 l-30 30 l-110 0 Z`, c, 4, 0.15) + `<circle cx="${x + 115}" cy="${y + 30}" r="6" fill="none" stroke="${c}" stroke-width="3"/>` + t(x + 55, y + 40, texte, c, 26);

const abonnement = svg(
  "Un abonnement de 35 euros qui augmente de 20 %",
  etiquette(40, 150, "35 €", C.craie) + fleche(200, 180, 290, 180, C.rose, 4) + t(245, 160, "+20 %", C.rose, 24) + etiquette(300, 150, "? €", C.rose) +
    t(240, 290, "× ?", C.bleu, 34).replace("× ?", `×${NB}?`) + t(240, 360, "abonnement de musique", C.pale, 20)
);

const telephone = svg(
  "Un téléphone à 250 euros, soldé de 12 %",
  `<rect x="70" y="80" width="120" height="220" rx="18" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>` + l(110, 280, 150, 280, C.craie, 4) +
    etiquette(240, 110, "250 €", C.craie) + t(310, 220, "−12 %", C.rose, 40) + t(310, 290, "? €", C.rose, 34) + t(240, 380, "soldes", C.pale, 22)
);

const concert = svg(
  "Une place de concert qui coûte 50 euros après une hausse de 25 %",
  etiquette(40, 150, "? €", C.rose) + fleche(200, 180, 290, 180, C.craie, 4) + t(245, 160, "+25 %", C.craie, 24) + etiquette(300, 150, "50 €", C.craie) +
    t(240, 300, "🎤 🎸 🥁", C.craie, 40) + t(240, 370, `prix d'avant${NB}?`, C.rose, 26)
);

// Village : 1 200 puis 1 380 habitants (1 habitant = 0,2 px).
const village = svg(
  "Deux barres : 1 200 habitants en 2016, 1 380 habitants en 2026",
  l(60, 340, 420, 340, C.craie, 3) + r(110, 340 - 240, 100, 240, C.pale, 0.3, 3) + r(270, 340 - 276, 100, 276, C.bleu, 0.3, 3) +
    t(160, 90, "1 200", C.craie, 26) + t(320, 54, "1 380", C.bleu, 26) + t(160, 375, "2016", C.craie, 22) + t(320, 375, "2026", C.craie, 22) +
    t(240, 412, `évolution en %${NB}?`, C.rose, 24)
);

// Piège : 100 € → 150 € → ? (1 € = 1,6 px).
const piege = svg(
  "Un prix de 100 euros augmente de 50 %, puis baisse de 50 %",
  l(40, 340, 440, 340, C.craie, 3) + r(70, 340 - 160, 90, 160, C.pale, 0.3, 3) + r(195, 100, 90, 240, C.bleu, 0.3, 3) + r(320, 340 - 120, 90, 120, C.rose, 0.3, 3).replace("/>", ' stroke-dasharray="10 6"/>') +
    t(115, 165, "100 €", C.craie, 24) + t(240, 85, "150 €", C.bleu, 24) + t(365, 205, "? €", C.rose, 26) +
    t(178, 375, "+50 %", C.bleu, 22) + t(303, 375, "−50 %", C.rose, 22) + t(240, 412, "barres au bon rapport", C.pale, 16)
);

// Photo 10 × 15 agrandie de 20 % : 12 × 18 (1 cm = 10 px).
const photo = svg(
  "Une photo de 10 cm sur 15 cm et son agrandissement de 12 cm sur 18 cm",
  r(40, 210, 150, 100, C.jaune, 0.25, 3) + p("M60 290 l35 -40 l25 25 l30 -35 l30 50", C.craie, 3) + t(115, 335, "15 × 10", C.craie, 20) +
    r(250, 190, 180, 120, C.bleu, 0.15, 3) + p("M270 290 l42 -48 l30 30 l36 -42 l36 60", C.bleu, 3) + t(340, 335, "18 × 12", C.bleu, 20) + t(240, 150, "+20 % sur chaque côté", C.bleu, 20) +
    t(240, 90, `et l'aire${NB}?`, C.rose, 30) + t(240, 390, "au bon rapport", C.pale, 16)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "prop_proportionnalite",
  titre: "Énigmes de proportionnalité et de pourcentages",
  description: "L'abonnement qui augmente, le téléphone soldé, la place de concert d'avant, le village qui grandit, le piège +50 % puis −50 %, le défi de la photo agrandie : coefficient multiplicateur, taux d'évolution, retrouver la valeur de départ.",
  problemes: [
    {
      tag: "Énigme 1 · Une hausse",
      titre: "L'abonnement de musique",
      question: `Un abonnement de musique coûte <b>35 €</b> par an. Son prix augmente de <b>20 %</b>.<br><br><b>Quel est</b> le nouveau prix ?`,
      reponse: `Augmenter de 20 %, c'est multiplier par 1 + 0,20 = <b>1,2</b>.<br>35 × 1,2 = <span class="big">42 €</span>.`,
      consigne: "Quel est le nouveau prix après +20 % ?",
      verification: {"type":"courte","attendus":["42"],"unite":"€"},
      dessin: abonnement,
    },
    {
      tag: "Énigme 2 · Une baisse",
      titre: "Le téléphone soldé",
      question: `Un téléphone coûte <b>250 €</b>. Pendant les soldes, son prix baisse de <b>12 %</b>.<br><br><b>Par combien</b> multiplie-t-on le prix ?`,
      reponse: `Baisser de 12 %, c'est multiplier par 1 − 0,12 = <span class="big">0,88</span>.<br>Nouveau prix : 250 × 0,88 = 220 €.`,
      consigne: "Par quel nombre multiplie-t-on un prix qui baisse de 12 % ?",
      verification: {"type":"qcm","choix":["0,88","0,12","1,12"],"bonne":0},
      dessin: telephone,
    },
    {
      tag: "Énigme 3 · Remonter le temps",
      titre: "La place de concert",
      question: `Après une hausse de <b>25 %</b>, une place de concert coûte <b>50 €</b>.<br><br><b>Combien coûtait-elle</b> avant la hausse ?`,
      reponse: `Prix d'avant × 1,25 = 50, donc prix d'avant = 50 ÷ 1,25 = <span class="big">40 €</span>.<br>Vérif : 25 % de 40 € font 10 €, et 40 + 10 = 50.<br>⚠ Enlever 25 % à 50 € donnerait 37,50 € : faux !`,
      consigne: "Combien coûtait la place avant la hausse ?",
      verification: {"type":"courte","attendus":["40"],"unite":"€"},
      dessin: concert,
    },
    {
      tag: "Énigme 4 · Le village",
      titre: "Un village qui grandit",
      question: `En 2016, un village avait <b>1 200 habitants</b>. En 2026, il en a <b>1 380</b>.<br><br>De <b>quel pourcentage</b> la population a-t-elle augmenté ?`,
      reponse: `Hausse : 1 380 − 1 200 = 180 habitants. Taux : 180 ÷ 1 200 = 0,15 = <span class="big">15 %</span>.<br>Autre chemin : 1 380 ÷ 1 200 = 1,15, le coefficient d'une hausse de 15 %.`,
      consigne: "De quel pourcentage la population a-t-elle augmenté ?",
      verification: {"type":"courte","attendus":["15"],"unite":"%"},
      dessin: village,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Aller et retour",
      sorte: "piege",
      question: `Un jeu vidéo coûte <b>100 €</b>. Son prix augmente de <b>50 %</b>, puis il baisse de <b>50 %</b>.<br><br>Que devient le prix ?`,
      reponse: `100 × 1,5 = 150 €, puis 150 × 0,5 = 75 €.<br>Le prix <span class="big">baisse de 25 %</span> ! Les deux 50 % ne portent pas sur le même prix.<br>Coefficient total : 1,5 × 0,5 = 0,75.`,
      consigne: "Que devient le prix après +50 % puis −50 % ?",
      verification: {"type":"qcm","choix":["Il revient à 100 €","Il augmente de 25 %","Il baisse de 25 %"],"bonne":2},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La photo agrandie",
      sorte: "defi",
      question: `On agrandit une photo de 10 cm sur 15 cm : sa longueur et sa largeur augmentent toutes les deux de <b>20 %</b>.<br><br>De <b>quel pourcentage</b> augmente son aire ?`,
      reponse: `Nouvelle photo : 12 cm sur 18 cm. Aires : 10 × 15 = 150 cm² et 12 × 18 = 216 cm².<br>216 ÷ 150 = 1,44 : l'aire augmente de <span class="big">44 %</span>, pas de 20 % ni de 40 %.<br>C'est 1,2 × 1,2 = 1,44 : les longueurs sont multipliées par 1,2, l'aire par 1,2².`,
      consigne: "De quel pourcentage l'aire augmente-t-elle ?",
      verification: {"type":"courte","attendus":["44"],"unite":"%"},
      dessin: photo,
    },
  ],
};

export default problemes;
