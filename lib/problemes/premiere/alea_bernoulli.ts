// Énigmes à projeter — première (sans spé maths), notion alea_bernoulli
// (le lancer franc, le sondage au téléphone, le quiz aux cartes, la punaise,
// piège des tickets à gratter, défi de l'exposé tiré au sort). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 ? C.pale : C.craie;

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 19) =>
  r(30, y, 420, 22 + 30 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 32 + 30 * k, s, c, taille)).join("");

const situations = svg("Trois situations : A la météo soleil, nuages ou pluie ; B un lancer franc réussi ou raté ; C l'heure d'arrivée d'un bus",
  cadre(30, ["A · la météo : soleil, nuages ou pluie"]) + cadre(110, ["B · un lancer franc : réussi ou raté"]) + cadre(190, ["C · l'heure d'arrivée du bus"]) +
    t(240, 320, "deux issues seulement : succès ou échec", C.pale, 19) +
    t(240, 385, `laquelle est une épreuve de Bernoulli${NB}?`, C.rose, 22));

const sondage = svg("Une épreuve de Bernoulli : un appel téléphonique ; succès S la personne décroche, probabilité 0,3 ; échec E, probabilité inconnue",
  r(60, 160, 70, 70, C.craie, 0.1, 3, 35) + t(95, 205, "☎", C.craie, 34) +
    `<path d="M130 195 L250 110" stroke="${C.craie}" stroke-width="3" fill="none"/><path d="M130 195 L250 280" stroke="${C.craie}" stroke-width="3" fill="none"/>` +
    t(260, 118, "S : décroche", C.craie, 21, "start") + t(260, 288, "E : ne décroche pas", C.craie, 19, "start") +
    t(175, 135, "0,3", C.bleu, 22) + t(175, 278, "?", C.rose, 26) +
    t(240, 385, `P(E)${NB}?`, C.rose, 26));

const cartes = (() => {
  let s = "";
  for (let k = 0; k < 10; k++) s += r(28 + 43 * k, 60, 36, 54, k < 4 ? C.bleu : C.pale, k < 4 ? 0.45 : 0.15, 2, 5);
  return svg("Dix cartes de quiz, dont 4 bleues ; on tire deux cartes",
    s + t(240, 160, "4 cartes « sport » sur 10", C.bleu, 21) +
      t(240, 230, "on veut 2 tirages identiques", C.craie, 21) + t(240, 262, "et indépendants", C.craie, 21) +
      t(240, 385, `comment tirer${NB}?`, C.rose, 24));
})();

const punaise = svg("Tableau de lancers d'une punaise : 10 lancers, fréquence pointe en haut 0,7 ; 100 lancers, 0,58 ; 10 000 lancers, 0,612",
  tableau(70, 60, [160, 180], 56, [["lancers", "fréquence"], [10, "0,7"], [100, "0,58"], ["10 000", "0,612"]], coul([]), 22) +
    t(240, 320, "« pointe en haut » : fréquence observée", C.pale, 19) +
    t(240, 385, `la meilleure estimation de p${NB}?`, C.rose, 22));

const tickets = (() => {
  let s = "";
  for (let k = 0; k < 10; k++) s += r(30 + 43 * k, 80, 36, 60, C.pale, 0.15, 2, 5) + t(48 + 43 * k, 120, "✗", C.rose, 22);
  return svg("Dix tickets à gratter perdants d'affilée ; chaque ticket gagne avec la probabilité 0,1",
    s + r(225, 180, 36, 60, C.jaune, 0.3, 3, 5) + t(243, 220, "?", C.jaune, 26) +
      t(240, 290, "chaque ticket : gagnant avec p = 0,1", C.craie, 20) +
      t(240, 385, `le 11e ticket${NB}?`, C.rose, 24));
})();

const expose = (() => {
  const noms = ["Lina", "Sam", "Jade", "Omar", "Tom"];
  return svg("Cinq élèves : Lina, Sam, Jade, Omar, Tom ; on en tire deux au sort pour un exposé",
    noms.map((n, k) => r(22 + 90 * k, 90, 76, 60, k < 2 ? C.bleu : C.pale, k < 2 ? 0.35 : 0.12, 2, 10) + t(60 + 90 * k, 128, n, C.craie, 19)).join("") +
      t(240, 230, "on tire 2 élèves sur 5", C.craie, 21) + t(240, 262, "(sans remise)", C.pale, 19) +
      t(240, 385, `P(Lina et Sam)${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_bernoulli",
  titre: "Énigmes de l'épreuve de Bernoulli",
  description: "Le lancer franc, le sondage au téléphone, le quiz aux cartes, la punaise, le piège des tickets à gratter, le défi de l'exposé tiré au sort : reconnaître une épreuve de Bernoulli, des répétitions identiques et indépendantes, un tirage avec ou sans remise, et voir la fréquence approcher la probabilité.",
  problemes: [
    {
      tag: "Énigme 1 · Le lancer franc",
      titre: "Succès ou échec",
      question: `Une épreuve de Bernoulli n'a que deux issues : succès ou échec.<br><br><b>Quelle situation</b> est une épreuve de Bernoulli ?`,
      reponse: `La météo a trois issues ; l'heure du bus en a beaucoup.<br><span class="big">Le lancer franc</span> : réussi (succès) ou raté (échec).`,
      consigne: "Laquelle de ces situations est une épreuve de Bernoulli ?",
      verification: { type: "qcm", choix: ["La météo : soleil, nuages ou pluie", "Un lancer franc : réussi ou raté", "L'heure d'arrivée du bus"], bonne: 1 },
      dessin: situations,
    },
    {
      tag: "Énigme 2 · Le sondage au téléphone",
      titre: "La probabilité de l'échec",
      question: `Un institut de sondage appelle des numéros au hasard. La personne décroche avec la probabilité p = 0,3 : c'est le succès.<br><br><b>Quelle est la probabilité</b> de l'échec ?`,
      reponse: `Les deux issues font 1 en tout.<br>P(E) = 1 − 0,3 = <span class="big">0,7</span>. Sept appels sur dix tombent dans le vide.`,
      consigne: "Le succès a la probabilité 0,3 : quelle est la probabilité de l'échec ?",
      verification: { type: "courte", attendus: ["0,7", "0.7", "70%"] },
      dessin: sondage,
    },
    {
      tag: "Énigme 3 · Le quiz aux cartes",
      titre: "Avec ou sans remise",
      question: `Un jeu de quiz a 10 cartes, dont 4 cartes « sport ». On tire deux cartes. On veut que les deux tirages soient identiques et indépendants.<br><br><b>Comment faut-il tirer</b> ?`,
      reponse: `Si on ne remet pas la carte, il ne reste que 9 cartes : le 2<sup>e</sup> tirage dépend du 1<sup>er</sup>.<br><span class="big">On remet la carte et on mélange</span> : à chaque tirage, p = 4/10.`,
      consigne: "Comment tirer deux cartes pour que les tirages soient identiques et indépendants ?",
      verification: { type: "qcm", choix: ["On tire une carte, on la remet, on mélange, puis on retire", "On tire 2 cartes sans remettre la 1re", "On tire 2 cartes en même temps"], bonne: 0 },
      dessin: cartes,
    },
    {
      tag: "Énigme 4 · La punaise",
      titre: "La fréquence approche p",
      question: `Une punaise tombe pointe en haut ou pointe en bas. On ne connaît pas p, la probabilité de « pointe en haut ». On la lance 10, 100 puis 10 000 fois.<br><br><b>Quelle fréquence</b> estime le mieux p ?`,
      reponse: `Plus on fait d'essais, plus la fréquence se rapproche de la probabilité.<br>Sur 10 000 lancers : <span class="big">0,612</span>. Sur 10 lancers, 0,7 peut être un hasard.`,
      consigne: "Fréquences 0,7 (10 lancers), 0,58 (100 lancers), 0,612 (10 000 lancers) : laquelle estime le mieux p ?",
      verification: { type: "courte", attendus: ["0,612", "0.612"] },
      dessin: punaise,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les tickets à gratter",
      sorte: "piege",
      question: `Chaque ticket à gratter gagne avec la probabilité 0,1, sans lien avec les autres. Max a gratté 10 tickets : tous perdants.<br>« Le prochain, c'est sûr, il va gagner ! »<br><br><b>Quelle est la probabilité</b> que le 11<sup>e</sup> ticket gagne ?`,
      reponse: `Les tickets sont indépendants : le ticket ne « sait » pas que les 10 autres ont perdu.<br>La probabilité reste <span class="big">0,1</span>. Il n'y a pas de « tour » qui arrive.`,
      consigne: "Après 10 tickets perdants, quelle est la probabilité que le 11e gagne ?",
      verification: { type: "qcm", choix: ["Plus de 0,1 : c'est son tour", "Moins de 0,1 : la série continue", "Toujours 0,1"], bonne: 2 },
      dessin: tickets,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'exposé tiré au sort",
      sorte: "defi",
      question: `Une prof tire au sort 2 élèves parmi 5 pour un exposé : Lina, Sam, Jade, Omar et Tom. On ne peut pas tirer deux fois le même élève.<br><br><b>Quelle est la probabilité</b> que ce soient Lina et Sam ?`,
      reponse: `1<sup>er</sup> tirage : Lina ou Sam, 2 chances sur 5. 2<sup>e</sup> tirage : il reste 4 élèves, dont l'autre : 1 chance sur 4.<br>2/5 × 1/4 = <span class="big">1/10</span>. Sans remise, les tirages ne sont pas indépendants.`,
      consigne: "On tire 2 élèves sur 5, sans remise : quelle probabilité que ce soient Lina et Sam ?",
      verification: { type: "courte", attendus: ["1/10", "0,1", "0.1", "10%"] },
      dessin: expose,
    },
  ],
};

export default problemes;
