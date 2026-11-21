// Énigmes à projeter — première (sans spé maths), notion auto_taux_evolution (le
// club d'échecs, le salaire + 10 % puis + 20 %, le billet de concert, l'eau de la
// famille, piège du jeu en ligne − 50 % puis + 50 %, défi du café plus cher).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";

const barres = (label: string, a: number, b: number, ea: string, eb: string, na: string, nb: string, q: string, echelle = 1.6) =>
  svg(label,
    r(110, 320 - a * echelle, 100, a * echelle, C.bleu, 0.3, 3, 4) + r(270, 320 - b * echelle, 100, b * echelle, C.jaune, 0.3, 3, 4) +
      t(160, 310 - a * echelle, ea, C.craie, 22) + t(320, 310 - b * echelle, eb, C.craie, 22) +
      l(80, 320, 400, 320, C.craie, 3) + t(160, 350, na, C.bleu, 20) + t(320, 350, nb, C.jaune, 20) + t(240, 400, q, C.rose, 26));

const echecs = barres("Le club d'échecs passe de 80 à 100 adhérents", 80, 100, "80", "100", "l'an dernier", "cette année", `quel taux${NB}?`, 2.2);
const eau = barres("La consommation d'eau passe de 150 à 120 mètres cubes", 150, 120, "150 m³", "120 m³", "2025", "2026", `quel taux${NB}?`, 1.5);

const salaire = svg("Un salaire augmente de 10 %, puis de 20 %",
  r(20, 130, 110, 70, C.bleu, 0.15, 3, 10) + t(75, 173, "S", C.craie, 26) +
    fleche(135, 165, 195, 165, C.rose, 4) + t(165, 145, "+ 10 %", C.rose, 18) +
    r(200, 130, 80, 70, C.bleu, 0.15, 3, 10) + t(240, 173, "…", C.craie, 26) +
    fleche(285, 165, 345, 165, C.rose, 4) + t(315, 145, "+ 20 %", C.rose, 18) +
    r(350, 130, 110, 70, C.jaune, 0.15, 3, 10) + t(405, 173, "?", C.rose, 26) +
    t(240, 290, "10 + 20 = 30 % ?", C.pale, 24) + t(240, 385, `le taux global${NB}?`, C.rose, 26));

const billet = svg("Le billet baisse de 20 % ; quelle hausse pour revenir au prix de départ ?",
  r(40, 90, 150, 80, C.jaune, 0.2, 3, 10) + t(115, 140, "50 €", C.craie, 26) +
    r(290, 90, 150, 80, C.bleu, 0.2, 3, 10) + t(365, 140, "40 €", C.craie, 26) +
    fleche(195, 115, 285, 115, C.rose, 4) + t(240, 100, "− 20 %", C.rose, 18) +
    fleche(285, 155, 195, 155, C.bleu, 4) + t(240, 190, "+ ? %", C.bleu, 22) +
    t(240, 280, "exemple : 50 € → 40 €", C.pale, 20) + t(240, 385, `quelle hausse${NB}?`, C.rose, 26));

const jeu = svg("Le prix d'un jeu en ligne : moins 50 %, puis plus 50 %",
  r(60, 320 - 200, 90, 200, C.bleu, 0.3, 3, 4) + r(195, 320 - 100, 90, 100, C.jaune, 0.3, 3, 4) + r(330, 320 - 150, 90, 150, C.rose, 0.3, 3, 4) +
    t(105, 108, "40 €", C.craie, 22) + t(240, 208, "20 €", C.craie, 22) + t(375, 158, "30 €", C.craie, 22) +
    t(172, 70, "− 50 %", C.jaune, 20) + t(308, 70, "+ 50 %", C.rose, 20) + l(40, 320, 440, 320, C.craie, 3) +
    t(240, 385, `revenu au départ${NB}?`, C.rose, 26));

const cafe = svg("Le prix du café augmente de 50 % ; la famille veut dépenser autant",
  r(60, 100, 150, 120, C.jaune, 0.2, 3, 10) + t(135, 150, "prix", C.craie, 22) + t(135, 190, "+ 50 %", C.rose, 24) +
    r(270, 100, 150, 120, C.bleu, 0.2, 3, 10) + t(345, 150, "quantité", C.craie, 22) + t(345, 190, "− ? %", C.bleu, 24) +
    t(240, 280, "dépense = prix × quantité : la même", C.craie, 20) + t(240, 385, `la baisse${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_taux_evolution",
  titre: "Énigmes des taux d'évolution",
  description: "Le club d'échecs, le salaire augmenté deux fois, le billet de concert, l'eau de la famille, le piège du jeu en ligne, le défi du café : calculer un taux d'évolution, enchaîner des évolutions, taux réciproque.",
  problemes: [
    {
      tag: "Énigme 1 · Le club d'échecs",
      titre: "Calculer un taux",
      question: `Un club d'échecs passe de <b>80</b> à <b>100</b> adhérents en un an.<br><br><b>Quel est le taux d'évolution</b>, en pourcentage ?`,
      reponse: `Taux = (arrivée − départ) ÷ départ = (100 − 80) ÷ 80 = 20 ÷ 80 = 0,25.<br>C'est <span class="big">+ 25 %</span>.`,
      consigne: "De 80 à 100 adhérents : quel taux d'évolution en % ?",
      verification: { type: "courte", attendus: ["25", "+25"], unite: "%" },
      dessin: echecs,
    },
    {
      tag: "Énigme 2 · Deux hausses",
      titre: "Des évolutions successives",
      question: `Un salaire augmente de <b>10 %</b>, puis l'année suivante de <b>20 %</b>.<br><br><b>Quel est le taux global</b> ?`,
      reponse: `On multiplie les coefficients : 1,10 × 1,20 = 1,32.<br>Le taux global est <span class="big">+ 32 %</span>, pas + 30 %.`,
      consigne: "+ 10 % puis + 20 % : quel taux global ?",
      verification: { type: "qcm", choix: ["+ 30 %", "+ 32 %", "+ 2 %"], bonne: 1 },
      dessin: salaire,
    },
    {
      tag: "Énigme 3 · Le billet de concert",
      titre: "Le taux réciproque",
      question: `Le prix d'un billet de concert baisse de <b>20 %</b>.<br><br><b>De quel pourcentage</b> doit-il remonter pour revenir à son prix de départ ?`,
      reponse: `Le coefficient est 0,80 ; pour revenir, il faut × (1 ÷ 0,80) = × 1,25.<br>Il doit remonter de <span class="big">25 %</span>. Exemple : 50 € → 40 € → 50 €.`,
      consigne: "Après une baisse de 20 %, quelle hausse fait revenir au prix de départ ?",
      verification: { type: "qcm", choix: ["+ 20 %", "+ 80 %", "+ 25 %"], bonne: 2 },
      dessin: billet,
    },
    {
      tag: "Énigme 4 · L'eau de la famille",
      titre: "Un taux négatif",
      question: `Une famille consommait <b>150 m³</b> d'eau par an. Elle n'en consomme plus que <b>120 m³</b>.<br><br><b>Quel est le taux d'évolution</b> ?`,
      reponse: `(120 − 150) ÷ 150 = −30 ÷ 150 = −0,20.<br>C'est <span class="big">− 20 %</span> : une baisse d'un cinquième.`,
      consigne: "De 150 m³ à 120 m³ : quel taux d'évolution en % ?",
      verification: { type: "courte", attendus: ["-20", "−20"], unite: "%" },
      dessin: eau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Moins 50 %, plus 50 %",
      sorte: "piege",
      question: `Un jeu en ligne coûte <b>40 €</b>. Son prix baisse de <b>50 %</b>, puis remonte de <b>50 %</b>.<br><br><b>Que s'est-il passé</b> en tout ?`,
      reponse: `40 × 0,5 = 20 €, puis 20 × 1,5 = 30 €.<br>0,5 × 1,5 = 0,75 : le prix <span class="big">a baissé de 25 %</span>. Les 50 % ne portent pas sur le même prix.`,
      consigne: "− 50 % puis + 50 % : quel est le bilan ?",
      verification: { type: "qcm", choix: ["Il a baissé de 25 %", "Il est revenu au même prix", "Il a augmenté de 25 %"], bonne: 0 },
      dessin: jeu,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le café plus cher",
      sorte: "defi",
      question: `Le prix du café augmente de <b>50 %</b>. Une famille veut dépenser la même somme qu'avant.<br><br><b>De quel pourcentage</b> doit-elle baisser sa quantité de café, arrondi au dixième ?`,
      reponse: `Prix × 1,5 et quantité × q, avec 1,5 × q = 1. Donc q = 1 ÷ 1,5 ≈ 0,667.<br>Elle doit baisser sa quantité de <span class="big">33,3 %</span> environ : un tiers.`,
      consigne: "Le prix monte de 50 % : de combien de % baisser la quantité pour dépenser autant (au dixième) ?",
      verification: { type: "courte", attendus: ["33,3", "-33,3", "−33,3"], unite: "%" },
      dessin: cafe,
    },
  ],
};

export default problemes;
