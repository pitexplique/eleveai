// Énigmes à projeter — seconde, notion probabilites_conditionnelles_2de
// (l'usine aux deux machines, le bus sous la pluie, le club de musique, les
// chaussettes dans le noir, piège de l'alarme, défi des trois portes).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p } from "../dessins-ecole";
import { frac } from "../outils";
import { arbre2, tableau } from "../dessins-2de";

const usine = svg(
  "Arbre : machine A 0,6, machine B 0,4 ; défaut 0,05 pour A, 0,1 pour B",
  arbre2([["A", "0,6"], ["B", "0,4"]], [[["D", "0,05"], ["non D", "0,95"]], [["D", "0,1"], ["non D", "0,9"]]], { yh: 40, yb: 300 }) +
    t(240, 360, "D = pièce défectueuse", C.pale, 20) + t(240, 400, `P(A et D)${NB}?`, C.rose, 26)
);

const bus = svg(
  "Arbre : pluie 0,3, sec 0,7 ; retard 0,4 s'il pleut, 0,1 sinon",
  arbre2([["pluie", "0,3"], ["sec", "0,7"]], [[["retard", "0,4"], ["à l'heure", "0,6"]], [["retard", "0,1"], ["à l'heure", "0,9"]]], { yh: 40, yb: 300, x2: 350 }) +
    t(240, 375, `P(retard)${NB}?`, C.rose, 28)
);

const musique = svg(
  "Tableau des 150 inscrits d'une école de musique : guitare ou autre instrument, chante ou ne chante pas",
  tableau(30, 60, [110, 100, 130, 80], 56, [["", "chante", "ne chante pas", "total"], ["guitare", 36, 54, 90], ["autre", 24, 36, 60], ["total", 60, 90, 150]],
    (i, j) => (i === 0 || j === 0 ? C.pale : i === 1 ? C.bleu : C.craie), 20) +
    t(240, 365, `un guitariste chante${NB}?`, C.rose, 26)
);

// Le tiroir : 3 chaussettes noires, 2 blanches.
const chaussette = (x: number, noire: boolean) =>
  p(`M${x} 120 h30 v76 q0 26 -26 26 h-22 q-12 0 -12 -12 q0 -12 12 -14 h18 Z`, C.craie, 3, noire ? 0.85 : 0);
const tiroir = svg(
  "Un tiroir avec 3 chaussettes noires et 2 blanches, on en prend deux dans le noir",
  r(30, 90, 420, 170, C.jaune, 0.08, 3, 10) + chaussette(75, true) + chaussette(155, true) + chaussette(235, true) + chaussette(315, false) + chaussette(395, false) +
    t(240, 310, "on en prend 2, sans regarder", C.pale, 22) + t(240, 370, `P(deux noires)${NB}?`, C.rose, 28)
);

const alarme = svg(
  "Tableau de 1 000 nuits : l'alarme sonne 25 fois, dont 5 fois pour un vrai cambriolage",
  tableau(20, 60, [170, 80, 130, 60], 56, [["", "sonne", "ne sonne pas", "total"], ["cambriolage", 5, 0, 5], ["pas de voleur", 20, 975, 995], ["total", 25, 975, 1000]],
    (i, j) => (i === 0 || j === 0 ? C.pale : j === 1 && (i === 1 || i === 3) ? C.rose : C.craie), 20) +
    t(240, 365, `elle sonne : un voleur${NB}?`, C.rose, 26)
);

// Trois portes : la 1 choisie, la 3 ouverte sur une chèvre.
const porte = (x: number, n: number, c: string) => r(x, 90, 110, 190, c, 0.15, 3, 6) + t(x + 55, 75, `porte ${n}`, C.craie, 20);
const portes = svg(
  "Trois portes : tu as choisi la porte 1, l'animateur ouvre la porte 3, il y a une chèvre derrière",
  porte(30, 1, C.bleu) + porte(185, 2, C.pale) + r(340, 90, 110, 190, C.craie, 0, 3, 6) + r(340, 90, 40, 190, C.pale, 0.3, 2, 4) +
    t(415, 200, "chèvre", C.jaune, 17) + t(85, 310, "ton choix", C.bleu, 20) + t(240, 375, `changer pour la 2${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "probabilites_conditionnelles_2de",
  titre: "Énigmes des probabilités conditionnelles",
  description: "L'usine aux deux machines, le bus sous la pluie, le club de musique, les chaussettes dans le noir, le piège de l'alarme, le défi des trois portes : arbres pondérés, tableaux, probabilité sachant un événement.",
  problemes: [
    {
      tag: "Énigme 1 · L'usine",
      titre: "On multiplie le long d'une branche",
      question: `Une usine a deux machines. A fait <b>60 %</b> des pièces, B en fait 40 %.<br>5 % des pièces de A sont défectueuses.<br><br>On prend une pièce au hasard. <b>Quelle est la probabilité</b> qu'elle vienne de A <b>et</b> soit défectueuse ?`,
      reponse: `On suit la branche A puis D, et on multiplie :<br>P(A et D) = 0,6 × 0,05 = <span class="big">0,03</span>, soit 3 % des pièces.`,
      consigne: "Probabilité qu'une pièce vienne de A et soit défectueuse ?",
      verification: { type: "courte", attendus: ["0,03", "0.03", "3%"] },
      dessin: usine,
    },
    {
      tag: "Énigme 2 · Le bus sous la pluie",
      titre: "Deux chemins pour le retard",
      question: `Il pleut un matin sur trois environ : P(pluie) = <b>0,3</b>.<br>S'il pleut, le bus est en retard avec la probabilité <b>0,4</b> ; sinon, <b>0,1</b>.<br><br><b>Quelle est la probabilité</b> que le bus soit en retard ?`,
      reponse: `Deux branches mènent au retard, on les additionne :<br>0,3 × 0,4 + 0,7 × 0,1 = 0,12 + 0,07 = <span class="big">0,19</span>.`,
      consigne: "Quelle est la probabilité que le bus soit en retard ?",
      verification: { type: "courte", attendus: ["0,19", "0.19"] },
      dessin: bus,
    },
    {
      tag: "Énigme 3 · Le club de musique",
      titre: "Sachant qu'il joue de la guitare",
      question: `Une école de musique a <b>150 inscrits</b>. 90 jouent de la guitare, et <b>36</b> d'entre eux chantent aussi.<br><br>On choisit <b>un guitariste</b> au hasard. Quelle est la probabilité qu'il chante ?`,
      reponse: `On ne regarde que les guitaristes : 90 élèves.<br>P = 36 ÷ 90 = <span class="big">0,4</span>. (36 ÷ 150 = 0,24 répond à une autre question.)`,
      consigne: "Un guitariste est choisi au hasard : probabilité qu'il chante ?",
      verification: { type: "qcm", choix: ["0,4", "0,24", "0,6"], bonne: 0 },
      dessin: musique,
    },
    {
      tag: "Énigme 4 · Les chaussettes",
      titre: "Sans remise",
      question: `Dans le noir, Nina prend <b>deux chaussettes</b> dans un tiroir qui en contient 3 noires et 2 blanches.<br><br><b>Quelle est la probabilité</b> d'avoir deux noires ?`,
      reponse: `1<sup>re</sup> noire : ${frac(3, 5)}. Il reste 2 noires sur 4 : ${frac(2, 4)}.<br>P = ${frac(3, 5)} × ${frac(2, 4)} = ${frac(6, 20)} = <span class="big">${frac(3, 10)}</span>.`,
      consigne: "Deux chaussettes prises sans remise : probabilité d'avoir deux noires ?",
      verification: { type: "qcm", choix: ["9/25", "3/10", "1/2"], bonne: 1 },
      dessin: tiroir,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'alarme",
      sorte: "piege",
      question: `L'alarme d'un magasin sonne à <b>chaque</b> cambriolage. Sur 1 000 nuits, elle a sonné <b>25 fois</b>, dont 5 pour un vrai cambriolage.<br><br>Elle sonne cette nuit. Est-ce sûrement un voleur ?`,
      reponse: `P(sonne sachant voleur) = 1, mais la question est l'inverse !<br>P(voleur sachant qu'elle sonne) = 5 ÷ 25 = 0,2 : <span class="big">non, 20 %</span>. Il ne faut pas inverser la condition.`,
      consigne: "L'alarme sonne : quelle est la probabilité que ce soit un vrai cambriolage ?",
      verification: { type: "qcm", choix: ["Oui, à 100 %", "Non : 0,5 %", "Non : 20 %"], bonne: 2 },
      dessin: alarme,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois portes",
      sorte: "defi",
      question: `Une voiture est cachée derrière une porte sur trois, des chèvres derrière les autres. Tu choisis la porte 1.<br>L'animateur, qui sait tout, ouvre la porte 3 : une chèvre.<br><br>Si tu <b>changes</b> pour la porte 2, quelle est ta probabilité de gagner ?`,
      reponse: `Ta porte 1 avait ${frac(1, 3)} de chance, et l'animateur n'y change rien.<br>Les ${frac(2, 3)} restants vont tous à la porte 2. En changeant : <span class="big">${frac(2, 3)}</span>. Il vaut mieux changer !`,
      consigne: "En changeant de porte, quelle est la probabilité de gagner ?",
      verification: { type: "courte", attendus: ["2/3"] },
      dessin: portes,
    },
  ],
};

export default problemes;
