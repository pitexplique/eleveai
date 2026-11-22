// Énigmes à projeter — seconde, notion croisement_variables_2de (le
// petit-déjeuner, la médiathèque, le festival, les deux lycées, piège du club
// théâtre, défi des deux basketteurs : le paradoxe de Simpson). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const petitDej = svg(
  "Tableau croisé : 200 élèves, filles et garçons, prennent ou non un petit-déjeuner",
  tableau(40, 50, [130, 90, 90, 90], 56, [["", "oui", "non", "total"], ["filles", 72, 28, 100], ["garçons", 60, 40, 100], ["total", "?", 68, 200]],
    (i, j) => (i === 0 || j === 0 ? C.pale : i === 3 && j === 1 ? C.rose : C.craie)) +
    t(240, 340, "petit-déjeuner le matin", C.pale, 20) + t(240, 385, `quelle part des 200${NB}?`, C.rose, 26)
);

const mediatheque = svg(
  "Tableau croisé de 400 prêts d'une médiathèque : romans et BD, adultes et enfants",
  tableau(40, 50, [130, 90, 90, 90], 56, [["", "romans", "BD", "total"], ["adultes", 120, 40, 160], ["enfants", 80, 160, 240], ["total", 200, 200, 400]],
    (i, j) => (i === 0 || j === 0 ? C.pale : j === 2 && (i === 2 || i === 3) ? C.bleu : C.craie)) +
    t(240, 370, `parmi les BD, part des enfants${NB}?`, C.rose, 24)
);

const festival = svg(
  "Tableau des 500 billets d'un festival, samedi et dimanche, tarif plein ou réduit, avec des cases vides",
  tableau(40, 50, [130, 90, 90, 90], 56, [["", "plein", "réduit", "total"], ["samedi", 170, "", 280], ["dimanche", "?", 90, ""], ["total", "", "", 500]],
    (i, j) => (i === 0 || j === 0 ? C.pale : i === 2 && j === 1 ? C.rose : C.craie)) +
    t(240, 370, `billets plein tarif le dimanche${NB}?`, C.rose, 24)
);

const lycees = svg(
  "Lycée A : 180 reçus sur 240 élèves. Lycée B : 120 reçus sur 150 élèves",
  r(40, 90, 180, 150, C.bleu, 0.12, 3, 12) + r(260, 90, 180, 150, C.jaune, 0.12, 3, 12) +
    t(130, 135, "Lycée A", C.bleu, 26) + t(130, 180, "180 reçus", C.craie, 22) + t(130, 215, "sur 240", C.pale, 22) +
    t(350, 135, "Lycée B", C.jaune, 26) + t(350, 180, "120 reçus", C.craie, 22) + t(350, 215, "sur 150", C.pale, 22) +
    t(240, 330, `le meilleur taux de réussite${NB}?`, C.rose, 24)
);

const theatre = svg(
  "Tableau croisé de 1 000 élèves : filles et garçons, au club théâtre ou non",
  tableau(30, 50, [120, 100, 120, 80], 56, [["", "théâtre", "pas théâtre", "total"], ["filles", 30, 470, 500], ["garçons", 20, 480, 500], ["total", 50, 950, 1000]],
    (i, j) => (i === 0 || j === 0 ? C.pale : i === 1 && (j === 1 || j === 3) ? C.rose : C.craie), 20) +
    t(240, 370, `quel % des filles fait du théâtre${NB}?`, C.rose, 24)
);

const basket = svg(
  "Tirs réussis : Lou 40 sur 50 à 2 points et 15 sur 50 à 3 points ; Max 75 sur 100 à 2 points et 1 sur 5 à 3 points",
  tableau(40, 60, [100, 150, 150], 64, [["", "à 2 points", "à 3 points"], ["Lou", "40 sur 50", "15 sur 50"], ["Max", "75 sur 100", "1 sur 5"]],
    (i, j) => (i === 0 ? C.pale : j === 0 ? (i === 1 ? C.bleu : C.jaune) : C.craie)) +
    t(240, 320, "tirs réussis", C.pale, 20) + t(240, 375, `le meilleur au total${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "croisement_variables_2de",
  titre: "Énigmes des tableaux croisés",
  description: "Le petit-déjeuner, la médiathèque, le festival, les deux lycées, le piège du club théâtre, le défi des deux basketteurs : tableau croisé d'effectifs, fréquences marginales et conditionnelles, paradoxe de Simpson.",
  problemes: [
    {
      tag: "Énigme 1 · Le petit-déjeuner",
      titre: "La ligne du total",
      question: `On a interrogé <b>200 élèves</b> : prennent-ils un petit-déjeuner le matin ?<br>Filles : 72 oui, 28 non. Garçons : 60 oui, 40 non.<br><br><b>Quel pourcentage</b> des 200 élèves prend un petit-déjeuner ?`,
      reponse: `Total des « oui » : 72 + 60 = 132.<br>Fréquence : 132 ÷ 200 = 0,66, soit <span class="big">66 %</span>.`,
      consigne: "Quel pourcentage des 200 élèves prend un petit-déjeuner ?",
      verification: { type: "courte", attendus: ["66"], unite: "%" },
      dessin: petitDej,
    },
    {
      tag: "Énigme 2 · La médiathèque",
      titre: "Parmi les BD",
      question: `Une médiathèque a prêté <b>400</b> livres : 200 romans et 200 BD.<br>Les enfants ont emprunté <b>160 BD</b>.<br><br><b>Parmi les BD</b>, quelle part a été empruntée par des enfants ?`,
      reponse: `« Parmi les BD » : on divise par le total des BD, pas par 400.<br>160 ÷ 200 = 0,8, soit <span class="big">80 %</span>.`,
      consigne: "Parmi les BD prêtées, quelle part a été empruntée par des enfants ?",
      verification: { type: "qcm", choix: ["80 %", "40 %", "66,7 %"], bonne: 0 },
      dessin: mediatheque,
    },
    {
      tag: "Énigme 3 · Le festival",
      titre: "Les cases vides",
      question: `Un festival a vendu <b>500 billets</b>. Le samedi : 280 billets, dont 170 plein tarif.<br>Le dimanche : 90 billets à tarif réduit.<br><br><b>Combien de billets plein tarif</b> le dimanche ?`,
      reponse: `Billets du dimanche : 500 − 280 = 220.<br>Plein tarif le dimanche : 220 − 90 = <span class="big">130</span> billets.`,
      consigne: "Combien de billets plein tarif ont été vendus le dimanche ?",
      verification: { type: "courte", attendus: ["130"], unite: "billets" },
      dessin: festival,
    },
    {
      tag: "Énigme 4 · Les deux lycées",
      titre: "Plus de reçus, meilleur taux ?",
      question: `Au bac blanc : <b>lycée A</b>, 180 reçus sur 240 élèves ; <b>lycée B</b>, 120 reçus sur 150 élèves.<br><br><b>Quel lycée</b> a le meilleur taux de réussite ?`,
      reponse: `A : 180 ÷ 240 = 0,75, soit 75 %. B : 120 ÷ 150 = 0,8, soit 80 %.<br>C'est le <span class="big">lycée B</span>, même s'il a moins de reçus.`,
      consigne: "Quel lycée a le meilleur taux de réussite ?",
      verification: { type: "qcm", choix: ["Lycée A", "Lycée B", "Autant l'un que l'autre"], bonne: 1 },
      dessin: lycees,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le club théâtre",
      sorte: "piege",
      question: `Le lycée compte <b>1 000 élèves</b>, dont 500 filles. Au club théâtre, <b>60 %</b> des 50 membres sont des filles.<br><br>Quel <b>pourcentage des filles</b> du lycée fait du théâtre ?`,
      reponse: `Ce n'est pas 60 % ! 60 % de 50 = 30 filles au théâtre.<br>Parmi les 500 filles : 30 ÷ 500 = 0,06, soit <span class="big">6 %</span>. « Parmi les filles » et « parmi le club » : deux calculs différents.`,
      consigne: "Quel pourcentage des filles du lycée fait du théâtre ?",
      verification: { type: "courte", attendus: ["6"], unite: "%" },
      dessin: theatre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Meilleure partout, moins bonne au total ?",
      sorte: "defi",
      question: `Lou réussit 40 tirs sur 50 à 2 points et 15 sur 50 à 3 points.<br>Max réussit 75 tirs sur 100 à 2 points et 1 sur 5 à 3 points.<br>Lou est meilleure <b>dans les deux cas</b>.<br><br><b>Qui a le meilleur pourcentage au total</b> ?`,
      reponse: `À 2 points : Lou 80 %, Max 75 %. À 3 points : Lou 30 %, Max 20 %.<br>Au total : Lou 55 sur 100 = 55 % ; Max 76 sur 105 ≈ 72 %.<br>C'est <span class="big">Max</span> ! Il tire surtout à 2 points, les plus faciles : c'est le paradoxe de Simpson.`,
      consigne: "Qui a le meilleur pourcentage de tirs réussis au total ?",
      verification: { type: "qcm", choix: ["Égalité", "Lou", "Max"], bonne: 2 },
      dessin: basket,
    },
  ],
};

export default problemes;
