// Énigmes à projeter — première (sans spé maths), notion alea_conditionnelle
// (le magasin de sport, le car scolaire, le cinéma en VO, le club de tennis,
// piège des basketteurs, défi de l'internat et du théâtre). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const bulle = (y: number, s: string, c: string = C.craie) => r(30, y - 34, 420, 52, c, 0.08, 2, 12) + t(240, y, s, c, 19);

const magasin = svg("Trois phrases d'un magasin de sport : A 40 % des clients achètent des chaussures ; B parmi ceux qui achètent des chaussures, 25 % prennent des chaussettes ; C 10 % paient en liquide",
  bulle(80, "A · 40 % des clients achètent des chaussures") +
    r(30, 126, 420, 84, C.craie, 0.08, 2, 12) + t(240, 160, "B · parmi ceux qui achètent des chaussures,", C.craie, 19) + t(240, 190, "25 % prennent des chaussettes", C.craie, 19) +
    bulle(275, "C · 10 % des clients paient en liquide") +
    t(240, 385, `laquelle est conditionnelle${NB}?`, C.rose, 24));

const car = svg("Deux évènements : C « prend le car », R « est en retard » ; phrase : parmi ceux qui prennent le car, 20 % sont en retard",
  r(40, 50, 180, 70, C.bleu, 0.15, 3, 12) + t(130, 95, "C : prend le car", C.bleu, 20) +
    r(260, 50, 180, 70, C.jaune, 0.15, 3, 12) + t(350, 95, "R : en retard", C.jaune, 20) +
    t(240, 190, "« Parmi les élèves qui prennent", C.craie, 21) + t(240, 222, "le car, 20 % sont en retard. »", C.craie, 21) +
    t(240, 290, "0,2 = probabilité de … ?", C.pale, 21) +
    t(240, 385, `comment lire ce 0,2${NB}?`, C.rose, 24));

const cinema = svg("Tableau de 400 spectateurs : VO 96 de moins de 25 ans et 64 de 25 ans et plus ; VF 104 et 136",
  tableau(20, 60, [110, 130, 130, 70], 56, [["", "- de 25 ans", "25 ans et +", "total"], ["VO", 96, 64, 160], ["VF", 104, 136, 240], ["total", 200, 200, 400]], coul([[1, 1], [1, 3]]), 20) +
    t(240, 330, "on choisit un spectateur de VO", C.craie, 20) + t(240, 385, `P(moins de 25 ans)${NB}?`, C.rose, 24));

const tennis = svg("Tableau de 250 membres d'un club de tennis : gauchers 20 en compétition et 30 en loisir ; droitiers 80 et 120",
  tableau(20, 60, [130, 130, 100, 80], 56, [["", "compétition", "loisir", "total"], ["gauchers", 20, 30, 50], ["droitiers", 80, 120, 200], ["total", 100, 150, 250]], coul([[1, 1], [1, 3]]), 20) +
    t(240, 330, "sachant que le joueur est gaucher", C.craie, 20) + t(240, 385, `P(compétition)${NB}?`, C.rose, 24));

const basket = svg("Une ville de 10 000 habitants : 2 000 mesurent plus de 1,90 m ; 50 sont basketteurs, dont 45 de plus de 1,90 m",
  tableau(20, 60, [150, 110, 100, 80], 56, [["", "+ de 1,90 m", "autres", "total"], ["basketteurs", 45, 5, 50], ["autres", "1 955", "7 995", "9 950"], ["total", "2 000", "8 000", "10 000"]], coul([[1, 1], [3, 1]]), 19) +
    t(240, 330, "on croise une personne de plus de 1,90 m", C.craie, 19) + t(240, 385, `P(basketteur)${NB}?`, C.rose, 24));

const internat = svg("Un lycée : 40 % d'internes dont 30 % font du théâtre ; 60 % d'externes dont 10 % font du théâtre ; tableau à compléter pour 1 000 élèves",
  tableau(20, 60, [120, 120, 120, 80], 56, [["", "théâtre", "autre", "total"], ["internes", "?", "…", 400], ["externes", "?", "…", 600], ["total", "?", "…", "1 000"]], coul([]), 19) +
    t(240, 315, "30 % des internes, 10 % des externes", C.craie, 19) + t(240, 345, "font du théâtre", C.craie, 19) +
    t(240, 395, `P(interne) sachant théâtre${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_conditionnelle",
  titre: "Énigmes des probabilités conditionnelles",
  description: "Le magasin de sport, le car scolaire, le cinéma en VO, le club de tennis, le piège des basketteurs, le défi de l'internat et du théâtre : reconnaître une probabilité conditionnelle, la noter, la calculer dans un tableau croisé.",
  problemes: [
    {
      tag: "Énigme 1 · Le magasin de sport",
      titre: "Reconnaître une condition",
      question: `Un magasin de sport publie trois phrases sur ses clients.<br><br><b>Laquelle</b> parle d'une probabilité conditionnelle ?`,
      reponse: `Le mot « <b>parmi</b> » restreint le groupe : on ne regarde plus tous les clients, mais seulement ceux qui achètent des chaussures.<br>C'est <span class="big">la phrase B</span>.`,
      consigne: "Laquelle des trois phrases parle d'une probabilité conditionnelle ?",
      verification: { type: "qcm", choix: ["La phrase A", "La phrase B", "La phrase C"], bonne: 1 },
      dessin: magasin,
    },
    {
      tag: "Énigme 2 · Le car scolaire",
      titre: "Lire la notation",
      question: `On choisit un élève au hasard. C : « il prend le car » ; R : « il est en retard ».<br>« Parmi les élèves qui prennent le car, 20 % sont en retard. »<br><br><b>Que vaut 0,2</b> ?`,
      reponse: `On sait que l'élève prend le car (C), et on regarde s'il est en retard (R).<br>C'est <span class="big">la probabilité de R sachant C</span> : P<sub>C</sub>(R) = 0,2.`,
      consigne: "« Parmi ceux qui prennent le car, 20 % sont en retard » : 0,2 est la probabilité de quoi ?",
      verification: { type: "qcm", choix: ["De R sachant C", "De C sachant R", "De C et R à la fois"], bonne: 0 },
      dessin: car,
    },
    {
      tag: "Énigme 3 · Le cinéma",
      titre: "Dans un tableau croisé",
      question: `Un cinéma a accueilli 400 spectateurs, en version originale (VO) ou en français (VF).<br><br>On choisit un spectateur de la VO. <b>Quelle est la probabilité</b> qu'il ait moins de 25 ans ?`,
      reponse: `On ne garde que la ligne VO : 96 jeunes sur 160 spectateurs.<br>P<sub>VO</sub>(moins de 25 ans) = 96 ÷ 160 = <span class="big">0,6</span>.`,
      consigne: "96 jeunes parmi les 160 spectateurs de la VO : quelle probabilité ?",
      verification: { type: "courte", attendus: ["0,6", "0.6", "60%"] },
      dessin: cinema,
    },
    {
      tag: "Énigme 4 · Le club de tennis",
      titre: "Sachant que…",
      question: `Un club de tennis a 250 membres, gauchers ou droitiers, en compétition ou en loisir.<br><br>Sachant qu'un joueur est gaucher, <b>quelle est la probabilité</b> qu'il fasse de la compétition ?`,
      reponse: `On ne garde que les 50 gauchers, dont 20 en compétition.<br>P<sub>gaucher</sub>(compétition) = 20 ÷ 50 = <span class="big">0,4</span>.`,
      consigne: "20 en compétition parmi les 50 gauchers : quelle probabilité ?",
      verification: { type: "courte", attendus: ["0,4", "0.4", "40%"] },
      dessin: tennis,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les basketteurs",
      sorte: "piege",
      question: `Dans une ville, 90 % des basketteurs mesurent plus de 1,90 m (45 sur 50).<br><br>On croise une personne de plus de 1,90 m. <b>Quelle est la probabilité</b> qu'elle soit basketteuse ?`,
      reponse: `Ce n'est pas la même condition ! On ne garde que les 2 000 personnes de plus de 1,90 m : 45 sont basketteuses.<br>45 ÷ 2 000 = <span class="big">0,0225</span>, environ 2 %. P<sub>B</sub>(grand) = 0,9 mais P<sub>grand</sub>(B) ≈ 0,02.`,
      consigne: "45 basketteurs parmi les 2 000 personnes de plus de 1,90 m : quelle probabilité ?",
      verification: { type: "qcm", choix: ["0,9 (90 %)", "0,5 (50 %)", "0,0225 (environ 2 %)"], bonne: 2 },
      dessin: basket,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'internat et le théâtre",
      sorte: "defi",
      question: `Dans un lycée, 40 % des élèves sont internes. 30 % des internes et 10 % des externes font du théâtre.<br><br>On choisit un élève qui fait du théâtre. <b>Quelle est la probabilité</b> qu'il soit interne ?`,
      reponse: `Sur 1 000 élèves : 30 % de 400 = 120 internes au théâtre ; 10 % de 600 = 60 externes. En tout, 180.<br>P<sub>théâtre</sub>(interne) = 120 ÷ 180 = <span class="big">2/3</span>, environ 0,67.`,
      consigne: "120 internes parmi les 180 élèves qui font du théâtre : quelle probabilité ? (fraction ou arrondi au centième)",
      verification: { type: "courte", attendus: ["2/3", "0,67", "0.67", "0,667"] },
      dessin: internat,
    },
  ],
};

export default problemes;
