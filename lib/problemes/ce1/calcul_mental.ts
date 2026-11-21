// Énigmes à projeter — CE1, notion calcul mental (les deux paquets de 25
// gâteaux, la boîte de 10 macarons, le pot de crayons + 10, les points du jeu
// + 9, le piège des 60 places moins 1, le défi de la machine + 5 + 5).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, fleche } from "../dessins-ecole";

const gateaux = svg(
  "Deux paquets de 25 gâteaux",
  r(60, 110, 160, 130, C.jaune, 0.25, 4, 10) + t(140, 170, "🍪", C.craie, 40) + t(140, 220, "25", C.craie, 34) +
    r(260, 110, 160, 130, C.jaune, 0.25, 4, 10) + t(340, 170, "🍪", C.craie, 40) + t(340, 220, "25", C.craie, 34) +
    t(240, 330, `Combien de gâteaux${NB}?`, C.rose, 32)
);

const macarons = svg(
  "Une boîte de 10 cases : 7 macarons, 3 cases vides",
  r(70, 110, 340, 140, C.craie, 0, 4, 10) +
    [...Array(10)].map((_, i) => {
      const x = 104 + (i % 5) * 68, y = 145 + Math.floor(i / 5) * 70;
      return o(x, y, 24, i < 7 ? C.rose : C.pale, i < 7 ? 0.45 : 0, 3);
    }).join("") +
    t(240, 320, `Combien de cases vides${NB}?`, C.rose, 30)
);

const crayons = svg(
  "Un pot avec 46 crayons ; on ajoute un paquet de 10",
  r(80, 140, 120, 150, C.bleu, 0.2, 4, 8) + [0, 1, 2, 3].map((i) => r(95 + i * 25, 90, 12, 60, C.jaune, 0.5, 2)).join("") + t(140, 230, "46", C.craie, 40) +
    t(250, 225, "+", C.craie, 44) + r(300, 160, 110, 100, C.jaune, 0.25, 4, 8) + t(355, 225, "10", C.craie, 36) +
    t(240, 360, `Combien de crayons${NB}?`, C.rose, 30)
);

const jeu = svg(
  "Un écran de jeu : 34 points ; on gagne 9 points",
  r(90, 70, 300, 170, C.craie, 0.08, 5, 16) + t(240, 135, "🎮", C.craie, 44) + t(240, 205, "34 points", C.craie, 40) +
    t(240, 290, "+ 9", C.jaune, 40) + t(240, 370, `Combien de points${NB}?`, C.rose, 30)
);

const bus = svg(
  "Un bus de 60 places ; 1 place cassée",
  r(50, 100, 380, 140, C.bleu, 0.2, 5, 22) + [...Array(6)].map((_, i) => r(75 + i * 58, 125, 44, 44, C.craie, 0, 3, 4)).join("") +
    o(130, 245, 22, C.craie, 0.8, 3) + o(350, 245, 22, C.craie, 0.8, 3) + t(240, 215, "60 places", C.craie, 28) +
    t(240, 320, "1 place cassée", C.jaune, 26) + t(240, 380, `Combien de bonnes places${NB}?`, C.rose, 28)
);

const boite = (x: number, s: string, c: string) => r(x - 45, 160, 90, 70, c, 0.2, 4, 10) + t(x, 207, s, C.craie, 30);
const machine = svg(
  "Une machine : ? puis + 5 puis + 5 donne 30",
  boite(65, "?", C.rose) + fleche(112, 195, 168, 195, C.craie, 3) + t(140, 175, "+ 5", C.jaune, 24) +
    boite(215, "", C.pale) + fleche(262, 195, 318, 195, C.craie, 3) + t(290, 175, "+ 5", C.jaune, 24) +
    boite(410, "30", C.bleu) + t(240, 330, `Le nombre de départ${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "calcul_mental",
  titre: "Énigmes de calcul mental",
  description: "Les deux paquets de 25 gâteaux, la boîte de 10 macarons, le pot de crayons plus 10, les points du jeu plus 9, le piège des 60 places moins une, le défi de la machine à ajouter 5.",
  problemes: [
    {
      tag: "Énigme 1 · Le goûter",
      titre: "Deux paquets de gâteaux",
      question: `Deux paquets.<br><b>25 gâteaux</b> dans chacun.<br><br>Combien de gâteaux ?`,
      reponse: `Le double de 25.<br>25 + 25 = <span class="big">50 gâteaux</span>.`,
      consigne: "Combien font 25 + 25 ?",
      verification: { type: "courte", attendus: ["50"], unite: "gâteaux" },
      dessin: gateaux,
    },
    {
      tag: "Énigme 2 · La pâtisserie",
      titre: "Les macarons",
      question: `La boîte a <b>10 cases</b>.<br>Il y a <b>7 macarons</b>.<br><br>Combien de cases vides ?`,
      reponse: `7 + 3 = 10.<br>Il reste <span class="big">3 cases</span> vides.`,
      consigne: "Combien de cases vides ?",
      verification: { type: "courte", attendus: ["3"], unite: "cases" },
      dessin: macarons,
    },
    {
      tag: "Énigme 3 · La classe",
      titre: "Le pot de crayons",
      question: `Le pot a <b>46 crayons</b>.<br>On ajoute <b>10 crayons</b>.<br><br>Combien de crayons ?`,
      reponse: `+ 10 : le chiffre des dizaines avance de 1.<br>4 dizaines deviennent 5 dizaines.<br>46 + 10 = <span class="big">56</span>.`,
      consigne: "Combien font 46 + 10 ?",
      verification: { type: "qcm", choix: ["47", "56", "146"], bonne: 1 },
      dessin: crayons,
    },
    {
      tag: "Énigme 4 · Le jeu vidéo",
      titre: "Les points",
      question: `Lucas a <b>34 points</b>.<br>Il gagne <b>9 points</b>.<br><br>Combien de points ?`,
      reponse: `Ajouter 9, c'est ajouter 10 puis enlever 1.<br>34 + 10 = 44, puis 44 − 1 = <span class="big">43</span>.`,
      consigne: "Combien font 34 + 9 ?",
      verification: { type: "qcm", choix: ["43", "44", "33"], bonne: 0 },
      dessin: jeu,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les places du bus",
      sorte: "piege",
      question: `Le bus a <b>60 places</b>.<br><b>1 place</b> est cassée.<br><br>Combien de bonnes places ?`,
      reponse: `Le piège : on enlève 1 aux dizaines et on dit 50.<br>Mais on enlève seulement 1 place.<br>60 − 1 = <span class="big">59</span>.`,
      consigne: "Combien font 60 − 1 ?",
      verification: { type: "qcm", choix: ["50", "61", "59"], bonne: 2 },
      dessin: bus,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La machine",
      sorte: "defi",
      question: `Un nombre entre dans la machine.<br>Elle ajoute <b>5</b>, puis encore <b>5</b>.<br>Il sort <b>30</b>.<br><br>Quel nombre est entré ?`,
      reponse: `On remonte : 30 − 5 = 25, puis 25 − 5 = 20.<br>Vérifions : 20 + 5 + 5 = 30.<br>Le nombre : <span class="big">20</span>.`,
      consigne: "Quel nombre est entré dans la machine ?",
      verification: { type: "courte", attendus: ["20"] },
      dessin: machine,
    },
  ],
};

export default problemes;
