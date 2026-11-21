// Énigmes à projeter — CM1, notion problèmes (le zoo en famille, les étagères
// de la bibliothèque, la tirelire pour le vélo, la boulangerie du matin, le
// piège de l'escalier, le défi des vélos et des tricycles). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

const zoo = svg(
  "Au zoo : adulte 12 €, enfant 7 € ; 2 adultes et 3 enfants",
  r(60, 60, 360, 110, C.jaune, 0.2, 4, 12) + t(240, 105, "adulte : 12 €", C.craie, 28) + t(240, 150, "enfant : 7 €", C.craie, 28) +
    t(240, 250, "🧑 🧑 👧 👦 🧒", C.craie, 46) + t(240, 360, `Prix total${NB}?`, C.rose, 30)
);

const etageres = svg(
  "5 étagères de 24 livres ; on en prête 37",
  Array.from({ length: 5 }, (_, j) => l(90, 80 + j * 50, 390, 80 + j * 50, C.craie, 5) +
    Array.from({ length: 12 }, (_, i) => r(96 + i * 24, 80 + j * 50 - 36, 18, 36, [C.bleu, C.rose, C.jaune][(i + j) % 3], 0.4, 2, 2)).join("")).join("") +
    t(240, 340, "5 étagères de 24 livres", C.craie, 24) + t(240, 385, `37 prêtés${NB}: il en reste${NB}?`, C.rose, 24)
);

const velo = svg(
  "Un vélo à 180 € ; Hugo a 60 € et met 15 € par mois",
  t(130, 180, "🚲", C.craie, 110) + r(270, 90, 170, 60, C.jaune, 0.25, 3, 10) + t(355, 130, "180 €", C.craie, 30) +
    t(355, 200, "Hugo : 60 €", C.bleu, 24) + t(355, 240, "+ 15 € par mois", C.bleu, 22) + t(240, 360, `Combien de mois${NB}?`, C.rose, 28)
);

const boulangerie = svg(
  "La boulangère fait 6 plaques de 18 croissants ; elle en vend 95",
  Array.from({ length: 6 }, (_, i) => r(40 + (i % 3) * 140, 70 + Math.floor(i / 3) * 100, 120, 80, C.jaune, 0.2, 3, 6) + t(100 + (i % 3) * 140, 122 + Math.floor(i / 3) * 100, "🥐 18", C.craie, 24)).join("") +
    t(240, 310, "vendus : 95", C.craie, 26) + t(240, 370, `Il en reste${NB}?`, C.rose, 28)
);

// L'escalier : 4 étages, on monte du rez-de-chaussée au 4e.
const escalier = svg(
  "Un immeuble : rez-de-chaussée puis étages 1 à 4",
  r(150, 60, 180, 300, C.craie, 0.05, 4) + [0, 1, 2, 3, 4].map((k) => l(150, 360 - k * 60, 330, 360 - k * 60, C.pale, 2) + t(345, 345 - k * 60, k === 0 ? "RDC" : `${k}e`, C.craie, 20, "start")).join("") +
    t(240, 345, "🧍", C.craie, 34) + t(80, 150, "20 marches", C.bleu, 20) + t(80, 175, "par étage", C.bleu, 20) + t(240, 400, `Jusqu'au 4e${NB}?`, C.rose, 26)
);

const velos = svg(
  "Des vélos et des tricycles : 7 en tout, 17 roues",
  o(90, 180, 34, C.bleu, 0, 5) + o(190, 180, 34, C.bleu, 0, 5) + t(140, 260, "vélo : 2 roues", C.bleu, 22) +
    o(300, 180, 26, C.rose, 0, 5) + o(380, 160, 26, C.rose, 0, 5) + o(380, 220, 26, C.rose, 0, 5) + t(340, 290, "tricycle : 3 roues", C.rose, 22) +
    t(240, 80, "7 engins · 17 roues", C.craie, 30) + t(240, 370, `Combien de tricycles${NB}?`, C.craie, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "probleme",
  titre: "Énigmes : des problèmes à résoudre",
  description: "Le zoo en famille, les étagères de la bibliothèque, la tirelire pour le vélo, les croissants de la boulangerie, le piège des étages, le défi des vélos et des tricycles.",
  problemes: [
    {
      tag: "Énigme 1 · Au zoo",
      titre: "Les billets de la famille",
      question: `Au zoo, un billet adulte coûte <b>12 €</b>.<br>Un billet enfant coûte <b>7 €</b>.<br>La famille a <b>2 adultes</b> et <b>3 enfants</b>.<br><br>Combien paie-t-elle ?`,
      reponse: `Adultes : 2 × 12 = 24 €. Enfants : 3 × 7 = 21 €.<br>24 + 21 = <span class="big">45 €</span>.`,
      consigne: "Combien la famille paie-t-elle ?",
      verification: { type: "courte", attendus: ["45"], unite: "€" },
      dessin: zoo,
    },
    {
      tag: "Énigme 2 · La bibliothèque",
      titre: "Les livres prêtés",
      question: `La bibliothèque a <b>5 étagères</b> de <b>24 livres</b>.<br>Ce matin, on prête <b>37 livres</b>.<br><br>Combien de livres <b>restent</b> sur les étagères ?`,
      reponse: `Tous les livres : 5 × 24 = 120.<br>120 − 37 = <span class="big">83 livres</span>.`,
      consigne: "Combien de livres restent sur les étagères ?",
      verification: { type: "courte", attendus: ["83"], unite: "livres" },
      dessin: etageres,
    },
    {
      tag: "Énigme 3 · Le vélo",
      titre: "La tirelire d'Hugo",
      question: `Le vélo coûte <b>180 €</b>.<br>Hugo a déjà <b>60 €</b>.<br>Il met <b>15 €</b> de côté chaque mois.<br><br>Dans <b>combien de mois</b> peut-il l'acheter ?`,
      reponse: `Il manque 180 − 60 = 120 €.<br>120 ÷ 15 = 8.<br>Dans <span class="big">8 mois</span>.`,
      consigne: "Dans combien de mois Hugo peut-il acheter le vélo ?",
      verification: { type: "qcm", choix: ["12 mois", "8 mois", "4 mois"], bonne: 1 },
      dessin: velo,
    },
    {
      tag: "Énigme 4 · La boulangerie",
      titre: "Les croissants du matin",
      question: `La boulangère cuit <b>6 plaques</b> de <b>18 croissants</b>.<br>Elle en vend <b>95</b>.<br><br><b>Combien</b> en reste-t-il ?`,
      reponse: `6 × 18 = 108 croissants.<br>108 − 95 = <span class="big">13 croissants</span>.`,
      consigne: "Combien de croissants reste-t-il ?",
      verification: { type: "courte", attendus: ["13"], unite: "croissants" },
      dessin: boulangerie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les marches de l'immeuble",
      sorte: "piege",
      question: `Il y a <b>20 marches</b> entre deux étages.<br>Sami part du <b>rez-de-chaussée</b>.<br>Il monte au <b>4e étage</b>.<br><br><b>Combien de marches</b> monte-t-il ?`,
      reponse: `Le piège : compter 5 niveaux.<br>Du rez-de-chaussée au 4e, il y a 4 escaliers.<br>4 × 20 = <span class="big">80 marches</span>.`,
      consigne: "Combien de marches Sami monte-t-il ?",
      verification: { type: "qcm", choix: ["100", "60", "80"], bonne: 2 },
      dessin: escalier,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Vélos et tricycles",
      sorte: "defi",
      question: `Dans la cour, il y a <b>7 engins</b> : des vélos et des tricycles.<br>On compte <b>17 roues</b>.<br><br>Combien de <b>tricycles</b> ?`,
      reponse: `Si les 7 étaient des vélos : 14 roues.<br>Il y a 3 roues de plus. Chaque tricycle ajoute 1 roue.<br><span class="big">3 tricycles</span> (et 4 vélos : 8 + 9 = 17).`,
      consigne: "Combien de tricycles ?",
      verification: { type: "courte", attendus: ["3"], unite: "tricycles" },
      dessin: velos,
    },
  ],
};

export default problemes;
