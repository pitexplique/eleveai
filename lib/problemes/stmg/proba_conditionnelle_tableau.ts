// Énigmes à projeter — STMG (1re), notion probabilité conditionnelle sur un tableau
// (le vendeur de voitures sans permis, l'assureur habitation, la compagnie de
// trains de nuit, le self d'entreprise, piège du fournisseur d'accès internet,
// défi du vendeur de cuisines équipées). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { ind } from "../dessins-tle";

const coul = (rose: [number, number][]) => (i: number, j: number) =>
  rose.some(([a, b]) => a === i && b === j) ? C.rose : i === 0 || j === 0 ? C.pale : C.craie;

const voitures = svg("Ventes de voitures sans permis : neuves 30 électriques, 50 essence ; occasion 10 électriques, 60 essence",
  tableau(25, 50, [130, 110, 100, 90], 55, [["", "électrique", "essence", "total"], ["neuve", 30, 50, 80], ["occasion", 10, 60, 70], ["total", 40, 110, 150]], coul([]), 21) +
    t(240, 340, `laquelle est conditionnelle${NB}?`, C.rose, 25));

const assureur = svg("Contrats de l'assureur : appartements 30 sinistres sur 120, maisons 20 sinistres sur 80",
  tableau(25, 50, [140, 100, 100, 90], 55, [["", "sinistre", "aucun", "total"], ["appartement", 30, 90, 120], ["maison", 20, 60, 80], ["total", 50, 150, 200]], coul([[2, 1], [2, 3]]), 21) +
    t(240, 340, `parmi les maisons${NB}: sinistre${NB}?`, C.rose, 25));

const trains = svg("P indice A de B, avec A : le voyageur est abonné, B : il voyage en 1re classe",
  r(90, 60, 300, 110, C.bleu, 0.15, 3, 10) + t(240, 135, `${ind("P", "A", "(B)")}`, C.craie, 48) +
    t(240, 230, "A : le voyageur est abonné", C.pale, 22) + t(240, 265, "B : il voyage en 1re classe", C.pale, 22) +
    t(240, 350, `comment le lire${NB}?`, C.rose, 28));

const self = svg("Repas du self : femmes 32 végétariens, 48 viande ; hommes 18 végétariens, 52 viande ; 50 végétariens en tout",
  tableau(25, 50, [130, 120, 90, 90], 55, [["", "végétarien", "viande", "total"], ["femme", 32, 48, 80], ["homme", 18, 52, 70], ["total", 50, 100, 150]], coul([[1, 1], [3, 1]]), 21) +
    t(240, 340, `parmi les végétariens${NB}: femme${NB}?`, C.rose, 24));

const internet = svg("Clients du fournisseur d'accès : fibre 240 satisfaits sur 300, ADSL 80 sur 100 ; 320 satisfaits sur 400",
  tableau(25, 50, [100, 110, 130, 80], 55, [["", "satisfait", "pas satisfait", "total"], ["fibre", 240, 60, 300], ["ADSL", 80, 20, 100], ["total", 320, 80, 400]], coul([]), 20) +
    t(240, 320, "Inès : « 240 ÷ 320 »", C.pale, 23) +
    t(240, 375, `client fibre${NB}: satisfait${NB}?`, C.rose, 25));

const cuisines = svg("Cuisines : 200 clients, 80 avec pose ; 3 sur 4 des clients avec pose prennent le four ; 90 fours en tout ; cases à compléter",
  tableau(25, 50, [130, 90, 130, 80], 55, [["", "four", "pas de four", "total"], ["avec pose", "?", "?", 80], ["sans pose", "?", "?", "?"], ["total", 90, "?", 200]], coul([]), 21) +
    t(240, 300, "avec pose : 3 clients sur 4 prennent le four", C.pale, 19) +
    t(240, 370, `sans pose${NB}: four${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "proba_conditionnelle_tableau",
  titre: "Énigmes de la probabilité conditionnelle sur un tableau",
  description: "Le vendeur de voitures sans permis, l'assureur habitation, la compagnie de trains de nuit, le self d'entreprise, le piège du fournisseur d'accès internet, le défi du vendeur de cuisines équipées : reconnaître « parmi » et « sachant que », lire la notation P_A(B) et calculer sur un tableau croisé.",
  problemes: [
    {
      tag: "Énigme 1 · Les voitures sans permis",
      titre: "Reconnaître une probabilité conditionnelle",
      question: `Un vendeur de voitures sans permis a vendu 150 voitures.<br>On tire une vente au hasard.<br><br><b>Laquelle de ces probabilités est conditionnelle</b> ?`,
      reponse: `« Parmi les voitures d'occasion » : on se limite à une ligne du tableau.<br><span class="big">Parmi les occasions, la proba d'une électrique</span>.<br>Elle vaut 10 ÷ 70.`,
      consigne: "Laquelle est une probabilité conditionnelle ?",
      verification: { type: "qcm", choix: ["la proba d'une électrique", "la proba d'une électrique d'occasion", "parmi les occasions, la proba d'une électrique"], bonne: 2 },
      dessin: voitures,
    },
    {
      tag: "Énigme 2 · L'assureur habitation",
      titre: "Calculer sur une ligne",
      question: `Un assureur habitation a 200 contrats.<br>On choisit au hasard un contrat de maison.<br><br><b>Quelle est la probabilité</b> qu'il ait eu un sinistre ?`,
      reponse: `On ne garde que la ligne « maison » : 80 contrats.<br>20 ont eu un sinistre : 20 ÷ 80 = <span class="big">0,25</span>.`,
      consigne: "Contrat de maison : probabilité d'un sinistre ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "1/4", "25 %", "25%"] },
      dessin: assureur,
    },
    {
      tag: "Énigme 3 · Les trains de nuit",
      titre: "Lire la notation",
      question: `Une compagnie de trains de nuit étudie ses voyageurs.<br>A : « le voyageur est abonné ». B : « il voyage en 1re classe ».<br><br><b>Que veut dire P<sub>A</sub>(B)</b> ?`,
      reponse: `La lettre en bas, c'est ce que l'on sait déjà : A.<br><span class="big">La proba d'être en 1re classe sachant qu'il est abonné</span>.`,
      consigne: "Que veut dire P_A(B) ?",
      verification: { type: "qcm", choix: ["la proba d'être en 1re classe sachant qu'il est abonné", "la proba d'être abonné sachant qu'il est en 1re classe", "la proba d'être abonné et en 1re classe"], bonne: 0 },
      dessin: trains,
    },
    {
      tag: "Énigme 4 · Le self d'entreprise",
      titre: "Calculer sur une colonne",
      question: `Le self d'une entreprise a servi 150 repas.<br>On choisit au hasard un repas végétarien.<br><br><b>Quelle est la probabilité</b> qu'il ait été pris par une femme ?`,
      reponse: `On ne garde que la colonne « végétarien » : 50 repas.<br>32 sont pris par des femmes : 32 ÷ 50 = <span class="big">0,64</span>.`,
      consigne: "Repas végétarien : probabilité que ce soit une femme ?",
      verification: { type: "courte", attendus: ["0,64", "0.64", "64 %", "64%", "32/50", "16/25"] },
      dessin: self,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le fournisseur d'accès internet",
      sorte: "piege",
      question: `Un fournisseur d'accès internet interroge 400 clients.<br>On choisit au hasard un client fibre.<br>Inès calcule 240 ÷ 320.<br><br><b>Quelle est la probabilité</b> qu'il soit satisfait ?`,
      reponse: `On sait qu'il a la fibre : on divise par le total de la ligne fibre, 300.<br>240 ÷ 300 = <span class="big">0,8</span>.<br>Inès a calculé « fibre sachant satisfait » : 0,75.`,
      consigne: "Client fibre : probabilité qu'il soit satisfait ?",
      verification: { type: "qcm", choix: ["0,75", "0,8", "0,6"], bonne: 1 },
      dessin: internet,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le vendeur de cuisines équipées",
      sorte: "defi",
      question: `Un vendeur de cuisines équipées a 200 clients. 80 ont pris la pose.<br>Avec la pose, 3 clients sur 4 ont pris un four.<br>En tout, 90 clients ont pris un four.<br><br>On choisit un client sans pose.<br><b>Quelle est la probabilité</b> qu'il ait pris un four ?`,
      reponse: `Avec pose et four : 80 × 3 ÷ 4 = 60. Sans pose et four : 90 − 60 = 30.<br>Sans pose : 200 − 80 = 120 clients.<br>30 ÷ 120 = <span class="big">0,25</span>.`,
      consigne: "Client sans pose : probabilité d'un four ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "1/4", "25 %", "25%"] },
      dessin: cuisines,
    },
  ],
};

export default problemes;
