// Énigmes à projeter — première (sans spé maths), notion alea_bernoulli_calcul
// (la pétanque, le livreur, le QCM au hasard, les bichiques de la rivière des
// Roches (974), piège du téléphone pas chargé, défi du tigre filmé). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { arbre2 } from "../dessins-2de";

const petanque = svg("Arbre de deux boules de pétanque : carreau S 0,6, raté E 0,4 à chaque boule",
  arbre2([["S", "0,6"], ["E", "0,4"]], [[["S", "0,6"], ["E", "0,4"]], [["S", "0,6"], ["E", "0,4"]]], { yb: 300 }) +
    t(240, 350, "S : carreau · E : raté · 2 boules", C.pale, 18) +
    t(240, 400, `P(S puis S)${NB}?`, C.rose, 26));

const livreur = svg("Arbre de deux livraisons : client présent P 0,7, absent A 0,3 à chaque livraison",
  arbre2([["P", "0,7"], ["A", "0,3"]], [[["P", "0,7"], ["A", "0,3"]], [["P", "0,7"], ["A", "0,3"]]], { yb: 300 }) +
    t(240, 350, "P : client présent · A : absent", C.pale, 18) +
    t(240, 400, `un seul client présent${NB}?`, C.rose, 24));

const qcm = (() => {
  let s = "";
  for (let q = 0; q < 3; q++) {
    s += t(90, 90 + 80 * q, `Q${q + 1}`, C.craie, 22);
    for (let k = 0; k < 4; k++) s += r(140 + 75 * k, 60 + 80 * q, 60, 44, C.pale, 0.1, 2, 8) + t(170 + 75 * k, 90 + 80 * q, "ABCD"[k], C.craie, 20);
  }
  return svg("Un QCM de 3 questions à 4 choix A B C D, une seule bonne réponse par question, réponses au hasard",
    s + t(240, 320, "réponses au hasard · 1 bonne sur 4", C.pale, 19) +
      t(240, 385, `3 bonnes réponses${NB}?`, C.rose, 24));
})();

const bichiques = (() => {
  const jours = ["lundi", "mardi", "mercredi"];
  return svg("Trois jours de pêche aux bichiques ; chaque jour, bonne pêche avec la probabilité 0,5",
    jours.map((j, k) => r(40 + 140 * k, 80, 120, 90, C.bleu, 0.15, 2, 12) + t(100 + 140 * k, 118, j, C.craie, 20) + t(100 + 140 * k, 152, "p = 0,5", C.bleu, 20)).join("") +
      t(240, 240, "contraire de « au moins une bonne pêche » :", C.pale, 19) + t(240, 272, "« aucune bonne pêche »", C.pale, 19) +
      t(240, 385, `au moins une bonne pêche${NB}?`, C.rose, 22));
})();

const telephone = (() => {
  const jours = ["J1", "J2", "J3", "J4"];
  return svg("Quatre jours ; chaque jour, Noé oublie de charger son téléphone avec la probabilité 0,2 ; il dit 4 fois 0,2 = 0,8",
    jours.map((j, k) => r(40 + 105 * k, 70, 85, 80, C.pale, 0.12, 2, 12) + t(82 + 105 * k, 102, j, C.craie, 20) + t(82 + 105 * k, 134, "0,2", C.bleu, 20)).join("") +
      t(240, 210, "oubli de charger : p = 0,2 chaque jour", C.craie, 19) +
      t(240, 270, "Noé : « 4 × 0,2 = 0,8 »", C.jaune, 22) +
      t(240, 385, `au moins un oubli${NB}?`, C.rose, 24));
})();

const tigre = svg("Un caméraman filme un tigre avec la probabilité 0,5 chaque nuit ; on cherche le nombre de nuits pour dépasser 0,9 d'au moins un film",
  r(40, 50, 400, 90, C.jaune, 0.12, 2, 14) + t(240, 88, "chaque nuit : tigre filmé", C.craie, 21) + t(240, 122, "avec p = 0,5", C.jaune, 21) +
    t(240, 200, "n nuits : P(au moins un film) = 1 − 0,5ⁿ", C.craie, 20) +
    t(240, 260, "on veut plus de 0,9", C.pale, 20) +
    t(240, 385, `combien de nuits au moins${NB}?`, C.rose, 22));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_bernoulli_calcul",
  titre: "Énigmes des épreuves répétées",
  description: "La pétanque, le livreur, le QCM au hasard, les bichiques de la rivière des Roches, le piège du téléphone pas chargé, le défi du tigre filmé : représenter des épreuves répétées par un arbre, calculer une probabilité, passer par le contraire pour « au moins un succès ».",
  problemes: [
    {
      tag: "Énigme 1 · La pétanque",
      titre: "Deux succès de suite",
      question: `À la pétanque, Rose fait un carreau avec la probabilité 0,6, à chaque boule, sans lien entre les boules. Elle joue 2 boules.<br><br><b>Quelle est la probabilité</b> de faire 2 carreaux ?`,
      reponse: `On suit le chemin S puis S et on multiplie : 0,6 × 0,6 = <span class="big">0,36</span>.<br>Pas 0,6 + 0,6 = 1,2 : une probabilité ne dépasse jamais 1.`,
      consigne: "Carreau avec p = 0,6 à chaque boule, 2 boules indépendantes : quelle probabilité de 2 carreaux ?",
      verification: { type: "qcm", choix: ["1,2", "0,6", "0,36"], bonne: 2 },
      dessin: petanque,
    },
    {
      tag: "Énigme 2 · Le livreur",
      titre: "Exactement un succès",
      question: `Un livreur a 2 colis. Chaque client est présent avec la probabilité 0,7, sans lien entre eux.<br><br><b>Quelle est la probabilité</b> qu'un seul des deux clients soit présent ?`,
      reponse: `Deux chemins : P puis A, ou A puis P. Chacun vaut 0,7 × 0,3 = 0,21.<br>0,21 + 0,21 = <span class="big">0,42</span>.`,
      consigne: "Client présent avec p = 0,7, 2 livraisons : quelle probabilité qu'un seul soit présent ?",
      verification: { type: "qcm", choix: ["0,42", "0,21", "0,49"], bonne: 0 },
      dessin: livreur,
    },
    {
      tag: "Énigme 3 · Le QCM au hasard",
      titre: "Trois épreuves",
      question: `Un QCM a 3 questions, chacune avec 4 choix et une seule bonne réponse. Ali répond au hasard.<br><br><b>Quelle est la probabilité</b> qu'il ait les 3 bonnes réponses ?`,
      reponse: `À chaque question : p = 1/4. Les 3 réponses sont indépendantes.<br>1/4 × 1/4 × 1/4 = <span class="big">1/64</span>, environ 0,016. Moins de 2 chances sur 100 !`,
      consigne: "3 questions à 4 choix, réponses au hasard : quelle probabilité d'avoir 3 bonnes réponses ? (fraction ou arrondi au millième)",
      verification: { type: "courte", attendus: ["1/64", "0,016", "0.016", "0,0156"] },
      dessin: qcm,
    },
    {
      tag: "Énigme 4 · Les bichiques",
      titre: "Au moins un succès",
      question: `À l'embouchure de la rivière des Roches, un pêcheur de bichiques fait une bonne pêche avec la probabilité 0,5 chaque jour, sans lien d'un jour à l'autre. Il pêche 3 jours.<br><br><b>Quelle est la probabilité</b> d'au moins une bonne pêche ?`,
      reponse: `Le contraire : « aucune bonne pêche », 0,5 × 0,5 × 0,5 = 0,125.<br>1 − 0,125 = <span class="big">0,875</span>.`,
      consigne: "Bonne pêche avec p = 0,5 chaque jour, 3 jours : quelle probabilité d'au moins une bonne pêche ?",
      verification: { type: "courte", attendus: ["0,875", "0.875", "7/8"] },
      dessin: bichiques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le téléphone pas chargé",
      sorte: "piege",
      question: `Chaque soir, Noé oublie de charger son téléphone avec la probabilité 0,2, sans lien d'un soir à l'autre.<br>Il dit : « Sur 4 soirs, 4 × 0,2 = 0,8 de chances d'au moins un oubli. »<br><br><b>Quelle est</b> la vraie probabilité ?`,
      reponse: `On ne multiplie pas par 4 : avec 6 soirs, on dépasserait 1 !<br>« Aucun oubli » : 0,8⁴ = 0,4096. Donc 1 − 0,4096 = <span class="big">0,5904</span>.`,
      consigne: "Oubli avec p = 0,2 chaque soir, 4 soirs : quelle probabilité d'au moins un oubli ?",
      verification: { type: "qcm", choix: ["0,8", "0,5904", "0,0016"], bonne: 1 },
      dessin: telephone,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tigre filmé",
      sorte: "defi",
      question: `Un caméraman animalier filme le tigre avec la probabilité 0,5 chaque nuit, sans lien d'une nuit à l'autre.<br><br><b>Combien de nuits</b> doit-il rester, au minimum, pour avoir plus de 90 % de chances de le filmer au moins une fois ?`,
      reponse: `Il faut 0,5ⁿ plus petit que 0,1. 0,5³ = 0,125 : pas assez. 0,5⁴ = 0,0625 : c'est bon.<br>Il faut <span class="big">4 nuits</span> : 1 − 0,0625 = 0,9375.`,
      consigne: "p = 0,5 chaque nuit : combien de nuits au minimum pour plus de 90 % de chances d'au moins un film ?",
      verification: { type: "courte", attendus: ["4"], unite: "nuits" },
      dessin: tigre,
    },
  ],
};

export default problemes;
