// Énigmes à projeter — CE2, notion résolution de problèmes (les places du
// car, les cartes de Nina et Sam, les boîtes d'œufs au marché, les courses
// de Maman, le piège de l'âge du capitaine, le défi des âges de Léo et Mia).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const car = svg(
  "Un car de 32 places ; 27 enfants sont montés",
  r(30, 90, 420, 60, C.craie, 0.05, 3) + r(30, 90, 354, 60, C.jaune, 0.4, 3) + t(207, 130, "27 enfants", C.craie, 24) + t(417, 132, "?", C.rose, 32) +
    l(30, 180, 450, 180, C.craie, 3) + l(30, 170, 30, 190, C.craie, 3) + l(450, 170, 450, 190, C.craie, 3) + t(240, 215, "32 places", C.craie, 26) +
    t(240, 300, "🚌", C.craie, 64) + t(240, 385, `Places libres${NB}?`, C.rose, 28)
);

const cartes = svg(
  "Nina a 48 cartes ; Sam en a 15 de plus",
  t(60, 140, "Nina", C.craie, 26, "start") + r(140, 110, 200, 50, C.bleu, 0.35, 3) + t(240, 145, "48", C.craie, 28) +
    t(60, 240, "Sam", C.craie, 26, "start") + r(140, 210, 200, 50, C.bleu, 0.35, 3) + t(240, 245, "48", C.craie, 28) +
    r(340, 210, 70, 50, C.rose, 0.3, 3) + t(375, 245, "15", C.craie, 26) +
    t(240, 350, `Combien de cartes a Sam${NB}?`, C.rose, 28)
);

const marche = svg(
  "Une boîte de 6 œufs coûte 3 € ; on achète 4 boîtes",
  [0, 1, 2, 3].map((i) => r(30 + i * 110, 120, 95, 70, C.jaune, 0.25, 3, 8) + t(77 + i * 110, 165, "3 €", C.craie, 26)).join("") +
    t(240, 270, "🥚 4 boîtes", C.craie, 30) + t(240, 370, `À payer${NB}?`, C.rose, 30)
);

const courses = svg(
  "3 cahiers à 2 €, un stylo à 4 € ; Maman paie avec un billet de 20 €",
  [0, 1, 2].map((i) => r(40 + i * 75, 90, 60, 80, C.bleu, 0.25, 3, 4) + t(70 + i * 75, 140, "2 €", C.craie, 22)).join("") +
    r(290, 110, 150, 34, C.rose, 0.25, 3, 14) + t(365, 136, "4 €", C.craie, 22) +
    r(140, 220, 200, 90, C.jaune, 0.2, 4, 6) + t(240, 280, "20 €", C.craie, 44) + t(240, 380, `Combien lui rend-on${NB}?`, C.rose, 28)
);

const capitaine = svg(
  "Un bateau avec 12 moutons et 8 chèvres",
  `<path d="M50 220 L430 220 L380 300 L100 300 Z" fill="${C.bleu}" fill-opacity="0.3" stroke="${C.bleu}" stroke-width="4"/>` + l(240, 220, 240, 70, C.craie, 4) +
    `<path d="M240 80 L330 200 L240 200 Z" fill="${C.jaune}" fill-opacity="0.3" stroke="${C.jaune}" stroke-width="3"/>` +
    t(140, 210, "🐑 × 12", C.craie, 26) + t(340, 270, "🐐 × 8", C.craie, 26) + t(240, 375, `L'âge du capitaine${NB}?`, C.rose, 30)
);

const ages = svg(
  "Léo a 3 ans de plus que Mia ; ensemble, ils ont 15 ans",
  t(60, 140, "Mia", C.craie, 26, "start") + r(140, 110, 150, 50, C.rose, 0.3, 3) + t(215, 145, "?", C.rose, 28) +
    t(60, 230, "Léo", C.craie, 26, "start") + r(140, 200, 150, 50, C.bleu, 0.3, 3) + t(215, 235, "?", C.bleu, 28) + r(290, 200, 70, 50, C.jaune, 0.35, 3) + t(325, 235, "3", C.craie, 26) +
    l(410, 110, 410, 250, C.craie, 3) + t(440, 190, "15", C.craie, 28) + t(240, 340, "ensemble : 15 ans", C.craie, 26) + t(240, 390, `L'âge de Léo${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "probleme",
  titre: "Énigmes : des problèmes à résoudre",
  description: "Les places libres du car, les cartes de Nina et Sam, les boîtes d'œufs au marché, la monnaie des courses, le piège de l'âge du capitaine, le défi des âges de Léo et Mia.",
  problemes: [
    {
      tag: "Énigme 1 · La sortie",
      titre: "Les places du car",
      question: `Le car a <b>32 places</b>.<br><b>27 enfants</b> sont assis.<br><br>Combien de places sont libres ?`,
      reponse: `On cherche le morceau qui manque : 27 + ? = 32.<br>32 − 27 = <span class="big">5 places</span>.`,
      consigne: "Combien de places sont libres ?",
      verification: { type: "courte", attendus: ["5"], unite: "places" },
      dessin: car,
    },
    {
      tag: "Énigme 2 · Les collections",
      titre: "Les cartes de Sam",
      question: `Nina a <b>48 cartes</b>.<br>Sam en a <b>15 de plus</b> que Nina.<br><br>Combien de cartes a Sam ?`,
      reponse: `Sam a autant que Nina, plus 15.<br>48 + 15 = <span class="big">63 cartes</span>.`,
      consigne: "Combien de cartes a Sam ?",
      verification: { type: "courte", attendus: ["63"], unite: "cartes" },
      dessin: cartes,
    },
    {
      tag: "Énigme 3 · Le marché",
      titre: "Les boîtes d'œufs",
      question: `Une boîte d'œufs coûte <b>3 €</b>.<br>Papi achète <b>4 boîtes</b>.<br><br>Combien paie-t-il ?`,
      reponse: `4 fois 3 € : 4 × 3 = <span class="big">12 €</span>.`,
      consigne: "Combien coûtent 4 boîtes à 3 € ?",
      verification: { type: "courte", attendus: ["12"], unite: "€" },
      dessin: marche,
    },
    {
      tag: "Énigme 4 · Les courses",
      titre: "La monnaie",
      question: `Maman achète <b>3 cahiers à 2 €</b> et <b>un stylo à 4 €</b>.<br>Elle paie avec <b>20 €</b>.<br><br>Combien lui rend-on ?`,
      reponse: `Cahiers : 3 × 2 = 6 €. Avec le stylo : 6 + 4 = 10 €.<br>20 − 10 = <span class="big">10 €</span>.`,
      consigne: "Combien d'euros rend-on à Maman ?",
      verification: { type: "qcm", choix: ["14 €", "10 €", "6 €"], bonne: 1 },
      dessin: courses,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'âge du capitaine",
      sorte: "piege",
      question: `Sur le bateau, il y a <b>12 moutons</b> et <b>8 chèvres</b>.<br><br>Quel âge a le capitaine ?`,
      reponse: `Le piège : calculer 12 + 8 = 20.<br>Les moutons ne disent rien sur le capitaine !<br><span class="big">On ne peut pas savoir</span>.`,
      consigne: "Quel âge a le capitaine ?",
      verification: { type: "qcm", choix: ["20 ans", "4 ans", "On ne peut pas savoir"], bonne: 2 },
      dessin: capitaine,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Léo et Mia",
      sorte: "defi",
      question: `Léo a <b>3 ans de plus</b> que Mia.<br>Ensemble, ils ont <b>15 ans</b>.<br><br>Quel âge a Léo ?`,
      reponse: `On enlève les 3 ans de plus : 15 − 3 = 12.<br>Il reste deux parts égales : 6 + 6 = 12. Mia a 6 ans.<br>Léo : 6 + 3 = <span class="big">9 ans</span>.`,
      consigne: "Quel âge a Léo ?",
      verification: { type: "courte", attendus: ["9"], unite: "ans" },
      dessin: ages,
    },
  ],
};

export default problemes;
